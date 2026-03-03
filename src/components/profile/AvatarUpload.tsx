/**
 * AvatarUpload Component
 * Handles avatar upload with preview, cropping, and rotation
 */

import React, { useState, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Camera, Upload, X, Loader2, AlertCircle, RotateCw, Crop, Check } from 'lucide-react';
import ReactCrop, { type Crop as CropType, centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { validateImageFile, uploadAvatar, type UploadProgress } from '@/services/avatarService';
import { toast } from 'sonner';

export interface AvatarUploadProps {
  userId: string;
  currentAvatarUrl?: string;
  isAdmin?: boolean;
  onUploadComplete?: (url: string) => void;
  onUploadError?: (error: Error) => void;
  onCancel?: () => void;
}

export const AvatarUpload: React.FC<AvatarUploadProps> = ({
  userId,
  currentAvatarUrl,
  isAdmin = false,
  onUploadComplete,
  onUploadError,
  onCancel
}) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  // State
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [showCropTools, setShowCropTools] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [crop, setCrop] = useState<CropType>();
  const [completedCrop, setCompletedCrop] = useState<CropType>();

  // Handle file selection
  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset error
    setError(null);

    // Validate file
    const validation = validateImageFile(file);
    if (!validation.isValid) {
      setError(validation.error || (isRTL ? 'ملف غير صالح' : 'Invalid file'));
      toast.error(validation.error || (isRTL ? 'ملف غير صالح' : 'Invalid file'));
      return;
    }

    // Set file and create preview
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  }, [isRTL]);

  // Initialize crop when image loads
  const onImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    const crop = centerCrop(
      makeAspectCrop(
        {
          unit: '%',
          width: 90,
        },
        1, // aspect ratio 1:1 for avatar
        width,
        height
      ),
      width,
      height
    );
    setCrop(crop);
  }, []);

  // Handle drag and drop
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    // Reset error
    setError(null);

    // Validate file
    const validation = validateImageFile(file);
    if (!validation.isValid) {
      setError(validation.error || (isRTL ? 'ملف غير صالح' : 'Invalid file'));
      toast.error(validation.error || (isRTL ? 'ملف غير صالح' : 'Invalid file'));
      return;
    }

    // Set file and create preview
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  }, [isRTL]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  // Handle upload confirmation
  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setError(null);
    setUploadProgress(0);

    try {
      // If crop is active, create cropped image
      let fileToUpload = selectedFile;
      
      if (showCropTools && completedCrop && imgRef.current) {
        fileToUpload = await getCroppedImg(imgRef.current, completedCrop, rotation);
      } else if (rotation !== 0) {
        // Apply rotation only
        fileToUpload = await getRotatedImg(selectedFile, rotation);
      }

      const downloadURL = await uploadAvatar(
        userId,
        fileToUpload,
        (progress: UploadProgress) => {
          setUploadProgress(progress.percentage);
        }
      );

      toast.success(isRTL ? 'تم رفع الصورة بنجاح' : 'Avatar uploaded successfully');
      
      if (onUploadComplete) {
        onUploadComplete(downloadURL);
      }

      // Reset state
      handleCancel();
    } catch (err: any) {
      console.error('Error uploading avatar:', err);
      const errorMessage = err.message || (isRTL ? 'فشل رفع الصورة' : 'Failed to upload avatar');
      setError(errorMessage);
      toast.error(errorMessage);
      
      if (onUploadError) {
        onUploadError(err);
      }
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setError(null);
    setUploadProgress(0);
    setRotation(0);
    setShowCropTools(false);
    setCrop(undefined);
    setCompletedCrop(undefined);
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    if (onCancel) {
      onCancel();
    }
  };

  // Handle rotation
  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  // Toggle crop tools
  const toggleCropTools = () => {
    setShowCropTools((prev) => !prev);
  };

  // Apply crop
  const applyCrop = () => {
    if (crop) {
      setCompletedCrop(crop);
      setShowCropTools(false);
      toast.success(isRTL ? 'تم تطبيق القص' : 'Crop applied');
    }
  };

  // Trigger file input
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
        onChange={handleFileSelect}
        className="hidden"
        disabled={isUploading}
      />

      {!previewUrl ? (
        /* Upload Area */
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-8 text-center hover:border-blue-500 dark:hover:border-blue-400 transition-colors cursor-pointer"
          onClick={triggerFileInput}
        >
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <Upload className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            
            <div>
              <p className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                {isRTL ? 'اختر صورة أو اسحبها هنا' : 'Choose an image or drag it here'}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {isRTL 
                  ? 'JPEG, PNG, GIF, WebP - حتى 5MB' 
                  : 'JPEG, PNG, GIF, WebP - up to 5MB'}
              </p>
            </div>

            <button
              type="button"
              onClick={triggerFileInput}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Camera className="w-4 h-4" />
              {isRTL ? 'اختر صورة' : 'Choose Image'}
            </button>
          </div>
        </div>
      ) : (
        /* Preview Area */
        <div className="space-y-4">
          {/* Preview Image */}
          <div className="relative rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
            {showCropTools ? (
              <ReactCrop
                crop={crop}
                onChange={(c) => setCrop(c)}
                onComplete={(c) => setCompletedCrop(c)}
                aspect={1}
                circularCrop
              >
                <img
                  ref={imgRef}
                  src={previewUrl}
                  alt="Preview"
                  onLoad={onImageLoad}
                  className="max-w-full h-auto"
                  style={{ transform: `rotate(${rotation}deg)` }}
                />
              </ReactCrop>
            ) : (
              <img
                ref={imgRef}
                src={previewUrl}
                alt="Preview"
                onLoad={onImageLoad}
                className="w-full h-64 object-contain"
                style={{ transform: `rotate(${rotation}deg)` }}
              />
            )}
          </div>

          {/* Tools */}
          <div className="flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={handleRotate}
              disabled={isUploading}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
              title={isRTL ? 'تدوير' : 'Rotate'}
            >
              <RotateCw className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </button>

            {!showCropTools ? (
              <button
                type="button"
                onClick={toggleCropTools}
                disabled={isUploading}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
                title={isRTL ? 'قص' : 'Crop'}
              >
                <Crop className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </button>
            ) : (
              <button
                type="button"
                onClick={applyCrop}
                disabled={isUploading}
                className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30 hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors disabled:opacity-50"
                title={isRTL ? 'تطبيق القص' : 'Apply Crop'}
              >
                <Check className="w-5 h-5 text-green-700 dark:text-green-300" />
              </button>
            )}
          </div>

          {/* Progress Bar */}
          {isUploading && uploadProgress > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  {isRTL ? 'جاري الرفع...' : 'Uploading...'}
                </span>
                <span className="text-blue-600 dark:text-blue-400 font-medium">
                  {uploadProgress.toFixed(0)}%
                </span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="flex items-start gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={handleCancel}
              disabled={isUploading}
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              {isRTL ? 'إلغاء' : 'Cancel'}
            </button>

            <button
              type="button"
              onClick={handleUpload}
              disabled={isUploading || !selectedFile}
              className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {isRTL ? 'جاري الرفع...' : 'Uploading...'}
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  {isRTL ? 'رفع الصورة' : 'Upload Image'}
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper function to create cropped image
async function getCroppedImg(
  image: HTMLImageElement,
  crop: CropType,
  rotation: number = 0
): Promise<File> {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('No 2d context');
  }

  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;

  // Set canvas size to crop size
  canvas.width = crop.width! * scaleX;
  canvas.height = crop.height! * scaleY;

  // Apply rotation
  if (rotation !== 0) {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    ctx.translate(centerX, centerY);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.translate(-centerX, -centerY);
  }

  // Draw cropped image
  ctx.drawImage(
    image,
    crop.x! * scaleX,
    crop.y! * scaleY,
    crop.width! * scaleX,
    crop.height! * scaleY,
    0,
    0,
    crop.width! * scaleX,
    crop.height! * scaleY
  );

  // Convert canvas to blob
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('Canvas is empty'));
          return;
        }
        const file = new File([blob], 'avatar.jpg', { type: 'image/jpeg' });
        resolve(file);
      },
      'image/jpeg',
      0.95
    );
  });
}

// Helper function to rotate image
async function getRotatedImg(file: File, rotation: number): Promise<File> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          reject(new Error('No 2d context'));
          return;
        }

        // Set canvas size based on rotation
        if (rotation === 90 || rotation === 270) {
          canvas.width = img.height;
          canvas.height = img.width;
        } else {
          canvas.width = img.width;
          canvas.height = img.height;
        }

        // Apply rotation
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        ctx.translate(centerX, centerY);
        ctx.rotate((rotation * Math.PI) / 180);
        ctx.drawImage(img, -img.width / 2, -img.height / 2);

        // Convert to blob
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Canvas is empty'));
              return;
            }
            const rotatedFile = new File([blob], file.name, { type: file.type });
            resolve(rotatedFile);
          },
          file.type,
          0.95
        );
      };
      img.onerror = reject;
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default AvatarUpload;
