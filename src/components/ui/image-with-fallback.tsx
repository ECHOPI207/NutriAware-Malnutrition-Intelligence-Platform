import React, { useState, useEffect } from 'react';
import { User } from 'lucide-react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  showIcon?: boolean;
}

/**
 * Image component with automatic fallback handling
 * - Retries loading on failure
 * - Shows fallback image or icon if loading fails
 * - Handles missing images gracefully
 */
export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  fallbackSrc,
  showIcon = true,
  className = '',
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState<string>(src);
  const [isError, setIsError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    setImgSrc(src);
    setIsError(false);
    setRetryCount(0);
  }, [src]);

  const handleError = () => {
    console.error(`Failed to load image: ${imgSrc}`);

    // Try fallback image first
    if (fallbackSrc && imgSrc !== fallbackSrc) {
      console.log(`Trying fallback image: ${fallbackSrc}`);
      setImgSrc(fallbackSrc);
      return;
    }

    // Retry loading original image up to 2 times
    if (retryCount < 2) {
      const delay = (retryCount + 1) * 1000; // 1s, 2s
      console.log(`Retrying image load in ${delay}ms... (attempt ${retryCount + 1}/2)`);
      setTimeout(() => {
        setRetryCount(retryCount + 1);
        setImgSrc(`${src}?retry=${retryCount + 1}`); // Add cache-busting parameter
      }, delay);
      return;
    }

    // All retries failed, show error state
    setIsError(true);
  };

  const handleLoad = () => {
    console.log(`Image loaded successfully: ${imgSrc}`);
    setIsError(false);
  };

  if (isError) {
    if (showIcon) {
      return (
        <div
          className={`flex items-center justify-center bg-muted ${className}`}
          title={`Failed to load: ${alt}`}
        >
          <User className="w-1/2 h-1/2 text-muted-foreground" />
        </div>
      );
    }
    return null;
  }

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={handleError}
      onLoad={handleLoad}
      loading="lazy"
      {...props}
    />
  );
};

export default ImageWithFallback;
