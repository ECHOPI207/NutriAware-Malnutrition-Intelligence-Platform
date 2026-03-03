/**
 * Avatar Service
 * Handles avatar upload, validation, and management for user profiles
 */

import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { db } from '@/lib/firebase';

// Types
export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export interface UploadProgress {
  bytesTransferred: number;
  totalBytes: number;
  percentage: number;
}

export type UploadProgressCallback = (progress: UploadProgress) => void;

// Constants
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_RETRY_ATTEMPTS = 3;
const RETRY_DELAY_BASE = 1000; // 1 second

// Error types for better error handling
export enum AvatarErrorType {
  VALIDATION_ERROR = 'validation_error',
  NETWORK_ERROR = 'network_error',
  STORAGE_ERROR = 'storage_error',
  FIRESTORE_ERROR = 'firestore_error',
  PERMISSION_ERROR = 'permission_error',
  UNKNOWN_ERROR = 'unknown_error'
}

export class AvatarError extends Error {
  constructor(
    message: string,
    public type: AvatarErrorType,
    public originalError?: any,
    public retryable: boolean = false
  ) {
    super(message);
    this.name = 'AvatarError';
  }
}

/**
 * Determines if an error is retryable
 */
function isRetryableError(error: any): boolean {
  // Network errors are retryable
  if (error.code === 'storage/retry-limit-exceeded' ||
      error.code === 'storage/server-file-wrong-size' ||
      error.code === 'unavailable' ||
      error.message?.includes('network') ||
      error.message?.includes('timeout')) {
    return true;
  }
  
  // Permission and authorization errors are not retryable
  if (error.code === 'storage/unauthorized' ||
      error.code === 'permission-denied' ||
      error.code === 'storage/canceled' ||
      error.code === 'unauthenticated') {
    return false;
  }
  
  // Unknown errors might be retryable
  return true;
}

/**
 * Categorizes an error into a specific type
 */
function categorizeError(error: any): AvatarErrorType {
  if (!error) return AvatarErrorType.UNKNOWN_ERROR;
  
  const errorCode = error.code || '';
  const errorMessage = error.message || '';
  
  // Storage errors
  if (errorCode.startsWith('storage/')) {
    if (errorCode === 'storage/unauthorized') {
      return AvatarErrorType.PERMISSION_ERROR;
    }
    return AvatarErrorType.STORAGE_ERROR;
  }
  
  // Firestore errors
  if (errorCode === 'permission-denied' || errorCode === 'unauthenticated') {
    return AvatarErrorType.PERMISSION_ERROR;
  }
  if (errorCode === 'unavailable' || errorCode === 'deadline-exceeded') {
    return AvatarErrorType.NETWORK_ERROR;
  }
  if (errorCode.includes('firestore') || errorMessage.includes('Firestore')) {
    return AvatarErrorType.FIRESTORE_ERROR;
  }
  
  // Network errors
  if (errorMessage.includes('network') || 
      errorMessage.includes('timeout') ||
      errorMessage.includes('fetch') ||
      errorCode === 'unavailable') {
    return AvatarErrorType.NETWORK_ERROR;
  }
  
  return AvatarErrorType.UNKNOWN_ERROR;
}

/**
 * Creates a user-friendly error message
 */
function getUserFriendlyErrorMessage(error: any, operation: string): string {
  const errorType = categorizeError(error);
  
  switch (errorType) {
    case AvatarErrorType.VALIDATION_ERROR:
      return error.message || 'الملف المحدد غير صالح';
    
    case AvatarErrorType.NETWORK_ERROR:
      return 'فشل الاتصال بالشبكة. يرجى التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى';
    
    case AvatarErrorType.STORAGE_ERROR:
      return 'حدث خطأ أثناء رفع الصورة. يرجى المحاولة مرة أخرى';
    
    case AvatarErrorType.FIRESTORE_ERROR:
      return 'حدث خطأ أثناء حفظ البيانات. يرجى المحاولة مرة أخرى';
    
    case AvatarErrorType.PERMISSION_ERROR:
      return 'ليس لديك صلاحية لتنفيذ هذا الإجراء';
    
    case AvatarErrorType.UNKNOWN_ERROR:
    default:
      return `حدث خطأ غير متوقع أثناء ${operation}. يرجى المحاولة مرة أخرى`;
  }
}

/**
 * Validates an image file for upload
 * @param file - The file to validate
 * @returns ValidationResult indicating if the file is valid
 */
export function validateImageFile(file: File): ValidationResult {
  console.log('[avatarService] Validating image file:', {
    name: file.name,
    type: file.type,
    size: file.size
  });

  try {
    // Check if file exists
    if (!file) {
      const error = 'No file provided';
      console.error('[avatarService] Validation failed:', error);
      return { isValid: false, error };
    }

    // Check file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      const error = `Invalid file type. Allowed types: ${ALLOWED_TYPES.join(', ')}`;
      console.error('[avatarService] Validation failed:', error);
      return { isValid: false, error };
    }

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      const error = `File size exceeds maximum allowed size of ${MAX_FILE_SIZE / (1024 * 1024)}MB`;
      console.error('[avatarService] Validation failed:', error);
      return { isValid: false, error };
    }

    // Check for zero-byte files
    if (file.size === 0) {
      const error = 'File is empty (0 bytes)';
      console.error('[avatarService] Validation failed:', error);
      return { isValid: false, error };
    }

    console.log('[avatarService] Validation passed');
    return { isValid: true };
  } catch (error: any) {
    console.error('[avatarService] Unexpected error during validation:', error);
    return { 
      isValid: false, 
      error: 'حدث خطأ أثناء التحقق من الملف' 
    };
  }
}

/**
 * Deletes an old avatar from Firebase Storage
 * @param storagePath - The storage path of the avatar to delete
 */
export async function deleteOldAvatar(storagePath: string): Promise<void> {
  if (!storagePath) {
    console.log('[avatarService] No storage path provided, skipping deletion');
    return;
  }

  try {
    console.log('[avatarService] Deleting old avatar:', storagePath);
    const storage = getStorage();
    const avatarRef = ref(storage, storagePath);
    await deleteObject(avatarRef);
    console.log('[avatarService] Old avatar deleted successfully');
  } catch (error: any) {
    // If file doesn't exist, that's okay
    if (error.code === 'storage/object-not-found') {
      console.log('[avatarService] Old avatar not found, skipping deletion');
      return;
    }
    
    // Log error but don't throw - deletion failure shouldn't block the upload
    const errorType = categorizeError(error);
    console.error('[avatarService] Error deleting old avatar:', {
      errorType,
      code: error.code,
      message: error.message,
      storagePath
    });
    
    // Only throw for permission errors
    if (errorType === AvatarErrorType.PERMISSION_ERROR) {
      throw new AvatarError(
        getUserFriendlyErrorMessage(error, 'حذف الصورة القديمة'),
        errorType,
        error,
        false
      );
    }
    
    // For other errors, just log and continue
    console.warn('[avatarService] Continuing despite deletion error');
  }
}

/**
 * Updates user profile in Firestore with new avatar URL
 * @param userId - The user ID
 * @param avatarUrl - The new avatar URL
 * @param storagePath - The storage path of the avatar
 */
export async function updateUserProfile(
  userId: string,
  avatarUrl: string,
  storagePath: string
): Promise<void> {
  console.log('[avatarService] Updating user profile:', { userId, avatarUrl, storagePath });

  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      photoURL: avatarUrl,
      avatarStoragePath: storagePath,
      updatedAt: new Date()
    });
    console.log('[avatarService] User profile updated successfully');
  } catch (error: any) {
    const errorType = categorizeError(error);
    console.error('[avatarService] Error updating user profile:', {
      errorType,
      code: error.code,
      message: error.message,
      userId
    });
    
    throw new AvatarError(
      getUserFriendlyErrorMessage(error, 'تحديث الملف الشخصي'),
      errorType,
      error,
      isRetryableError(error)
    );
  }
}

/**
 * Retries an operation with exponential backoff
 * @param operation - The operation to retry
 * @param maxAttempts - Maximum number of retry attempts
 * @param operationName - Name of the operation for logging
 * @returns The result of the operation
 */
async function retryOperation<T>(
  operation: () => Promise<T>,
  maxAttempts: number = MAX_RETRY_ATTEMPTS,
  operationName: string = 'operation'
): Promise<T> {
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      console.log(`[avatarService] ${operationName}: Attempt ${attempt}/${maxAttempts}`);
      return await operation();
    } catch (error: any) {
      lastError = error;
      const errorType = categorizeError(error);
      const retryable = isRetryableError(error);
      
      console.error(`[avatarService] ${operationName}: Attempt ${attempt} failed:`, {
        errorType,
        code: error.code,
        message: error.message,
        retryable
      });

      // Don't retry on non-retryable errors
      if (!retryable) {
        console.error(`[avatarService] ${operationName}: Non-retryable error, aborting`);
        throw new AvatarError(
          getUserFriendlyErrorMessage(error, operationName),
          errorType,
          error,
          false
        );
      }

      // If not the last attempt, wait before retrying with exponential backoff
      if (attempt < maxAttempts) {
        const delay = RETRY_DELAY_BASE * Math.pow(2, attempt - 1);
        console.log(`[avatarService] ${operationName}: Waiting ${delay}ms before retry`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  console.error(`[avatarService] ${operationName}: All retry attempts failed`);
  const errorType = lastError ? categorizeError(lastError) : AvatarErrorType.UNKNOWN_ERROR;
  throw new AvatarError(
    getUserFriendlyErrorMessage(lastError, operationName),
    errorType,
    lastError,
    false
  );
}

/**
 * Uploads an avatar to Firebase Storage
 * @param userId - The user ID
 * @param file - The file to upload
 * @param onProgress - Optional callback for upload progress
 * @returns The download URL of the uploaded avatar
 */
export async function uploadAvatar(
  userId: string,
  file: File,
  onProgress?: UploadProgressCallback
): Promise<string> {
  console.log('[avatarService] Starting avatar upload for user:', userId);

  try {
    // Validate file
    const validation = validateImageFile(file);
    if (!validation.isValid) {
      throw new AvatarError(
        validation.error || 'Invalid file',
        AvatarErrorType.VALIDATION_ERROR,
        null,
        false
      );
    }

    // Get old avatar path before uploading new one
    let oldAvatarPath: string | null = null;
    try {
      const userRef = doc(db, 'users', userId);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        oldAvatarPath = userSnap.data().avatarStoragePath || null;
        console.log('[avatarService] Found old avatar path:', oldAvatarPath);
      }
    } catch (error: any) {
      console.warn('[avatarService] Could not fetch old avatar path:', error);
      // Continue anyway - this is not critical
    }

    // Create storage reference
    const storage = getStorage();
    const fileExtension = file.name.split('.').pop() || 'jpg';
    const storagePath = `avatars/${userId}/avatar.${fileExtension}`;
    const storageRef = ref(storage, storagePath);

    console.log('[avatarService] Uploading to:', storagePath);

    // Upload with retry logic
    const downloadURL = await retryOperation(async () => {
      return new Promise<string>((resolve, reject) => {
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress: UploadProgress = {
              bytesTransferred: snapshot.bytesTransferred,
              totalBytes: snapshot.totalBytes,
              percentage: (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            };
            console.log('[avatarService] Upload progress:', progress.percentage.toFixed(2) + '%');
            if (onProgress) {
              try {
                onProgress(progress);
              } catch (callbackError) {
                console.error('[avatarService] Error in progress callback:', callbackError);
                // Don't let callback errors stop the upload
              }
            }
          },
          (error) => {
            console.error('[avatarService] Upload error:', error);
            reject(error);
          },
          async () => {
            try {
              const url = await getDownloadURL(uploadTask.snapshot.ref);
              console.log('[avatarService] Upload complete, download URL:', url);
              resolve(url);
            } catch (error) {
              console.error('[avatarService] Error getting download URL:', error);
              reject(error);
            }
          }
        );
      });
    }, MAX_RETRY_ATTEMPTS, 'رفع الصورة');

    // Update user profile with new avatar URL
    await retryOperation(
      () => updateUserProfile(userId, downloadURL, storagePath),
      MAX_RETRY_ATTEMPTS,
      'تحديث الملف الشخصي'
    );

    // Delete old avatar if it exists (non-blocking)
    if (oldAvatarPath) {
      try {
        await deleteOldAvatar(oldAvatarPath);
      } catch (error) {
        console.warn('[avatarService] Failed to delete old avatar, continuing anyway:', error);
        // Don't throw - the new avatar is already uploaded
      }
    }

    console.log('[avatarService] Avatar upload completed successfully');
    return downloadURL;
  } catch (error: any) {
    // If it's already an AvatarError, rethrow it
    if (error instanceof AvatarError) {
      throw error;
    }
    
    // Otherwise, wrap it in an AvatarError
    const errorType = categorizeError(error);
    console.error('[avatarService] Avatar upload failed:', {
      errorType,
      code: error.code,
      message: error.message
    });
    
    throw new AvatarError(
      getUserFriendlyErrorMessage(error, 'رفع الصورة'),
      errorType,
      error,
      isRetryableError(error)
    );
  }
}

/**
 * Deletes a user's avatar and sets it to default
 * @param userId - The user ID
 */
export async function deleteAvatar(userId: string): Promise<void> {
  console.log('[avatarService] Deleting avatar for user:', userId);

  try {
    // Get current avatar path
    const userRef = doc(db, 'users', userId);
    const userSnap = await retryOperation(
      () => getDoc(userRef),
      MAX_RETRY_ATTEMPTS,
      'جلب بيانات المستخدم'
    );
    
    if (!userSnap.exists()) {
      throw new AvatarError(
        'المستخدم غير موجود',
        AvatarErrorType.UNKNOWN_ERROR,
        null,
        false
      );
    }

    const userData = userSnap.data();
    const storagePath = userData.avatarStoragePath;

    // Delete from storage if exists (non-blocking)
    if (storagePath) {
      try {
        await deleteOldAvatar(storagePath);
      } catch (error) {
        console.warn('[avatarService] Failed to delete avatar from storage:', error);
        // Continue anyway - we'll still set the default avatar
      }
    }

    // Set to default avatar
    const defaultAvatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.displayName || 'User')}&background=random`;
    await retryOperation(
      () => updateDoc(userRef, {
        photoURL: defaultAvatarUrl,
        avatarStoragePath: null,
        updatedAt: new Date()
      }),
      MAX_RETRY_ATTEMPTS,
      'تحديث الملف الشخصي'
    );

    console.log('[avatarService] Avatar deleted successfully');
  } catch (error: any) {
    // If it's already an AvatarError, rethrow it
    if (error instanceof AvatarError) {
      throw error;
    }
    
    const errorType = categorizeError(error);
    console.error('[avatarService] Error deleting avatar:', {
      errorType,
      code: error.code,
      message: error.message
    });
    
    throw new AvatarError(
      getUserFriendlyErrorMessage(error, 'حذف الصورة'),
      errorType,
      error,
      isRetryableError(error)
    );
  }
}

/**
 * Gets the avatar URL for a user
 * @param userId - The user ID
 * @returns The avatar URL or null if not found
 */
export async function getAvatarUrl(userId: string): Promise<string | null> {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await retryOperation(
      () => getDoc(userRef),
      2, // Fewer retries for read operations
      'جلب رابط الصورة'
    );
    
    if (!userSnap.exists()) {
      return null;
    }

    return userSnap.data().photoURL || null;
  } catch (error: any) {
    console.error('[avatarService] Error getting avatar URL:', {
      errorType: categorizeError(error),
      code: error.code,
      message: error.message
    });
    // Return null instead of throwing for read operations
    return null;
  }
}
