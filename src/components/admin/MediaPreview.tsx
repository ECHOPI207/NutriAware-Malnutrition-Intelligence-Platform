import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Image, Video, Trash2, ExternalLink } from 'lucide-react';

interface MediaPreviewProps {
  featuredImage?: string;
  gallery?: string[];
  videoUrl?: string;
  onRemoveFeaturedImage?: () => void;
  onRemoveGalleryImage?: (index: number) => void;
  onRemoveVideo?: () => void;
  isRTL?: boolean;
}

const MediaPreview: React.FC<MediaPreviewProps> = ({
  featuredImage,
  gallery = [],
  videoUrl,
  onRemoveFeaturedImage,
  onRemoveGalleryImage,
  onRemoveVideo,
  isRTL = false
}) => {
  const getVideoThumbnail = (url: string) => {
    // Extract YouTube video ID and create thumbnail URL
    const youtubeMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    if (youtubeMatch) {
      return `https://img.youtube.com/vi/${youtubeMatch[1]}/maxresdefault.jpg`;
    }
    return null;
  };

  const hasMedia = featuredImage || gallery.length > 0 || videoUrl;

  if (!hasMedia) {
    return null;
  }

  return (
    <Card>
      <CardContent className="p-4">
        <h4 className="font-semibold mb-4 flex items-center gap-2">
          <Image className="h-4 w-4" />
          {isRTL ? 'معاينة الوسائط' : 'Media Preview'}
        </h4>

        <div className="space-y-4">
          {/* Featured Image */}
          {featuredImage && (
            <div>
              <p className="text-sm font-medium mb-2">
                {isRTL ? 'الصورة الرئيسية' : 'Featured Image'}
              </p>
              <div className="relative inline-block">
                <img 
                  src={featuredImage} 
                  alt="Featured" 
                  className="w-32 h-24 object-cover rounded-lg"
                />
                {onRemoveFeaturedImage && (
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute -top-2 -right-2 h-6 w-6 p-0"
                    onClick={onRemoveFeaturedImage}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* Gallery */}
          {gallery.length > 0 && (
            <div>
              <p className="text-sm font-medium mb-2">
                {isRTL ? 'معرض الصور' : 'Image Gallery'} ({gallery.length})
              </p>
              <div className="grid grid-cols-4 gap-2">
                {gallery.map((image, index) => (
                  <div key={index} className="relative">
                    <img 
                      src={image} 
                      alt={`Gallery ${index + 1}`} 
                      className="w-full h-16 object-cover rounded-lg"
                    />
                    {onRemoveGalleryImage && (
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute -top-1 -right-1 h-4 w-4 p-0"
                        onClick={() => onRemoveGalleryImage(index)}
                      >
                        <Trash2 className="h-2 w-2" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Video */}
          {videoUrl && (
            <div>
              <p className="text-sm font-medium mb-2">
                {isRTL ? 'الفيديو' : 'Video'}
              </p>
              <div className="relative inline-block">
                {getVideoThumbnail(videoUrl) ? (
                  <div className="relative">
                    <img 
                      src={getVideoThumbnail(videoUrl)!} 
                      alt="Video thumbnail" 
                      className="w-32 h-24 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-lg">
                      <Video className="h-8 w-8 text-white" />
                    </div>
                  </div>
                ) : (
                  <div className="w-32 h-24 bg-muted rounded-lg flex items-center justify-center">
                    <Video className="h-8 w-8 text-muted-foreground" />
                  </div>
                )}
                <div className="flex items-center gap-2 mt-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(videoUrl, '_blank')}
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    {isRTL ? 'فتح' : 'Open'}
                  </Button>
                  {onRemoveVideo && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={onRemoveVideo}
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      {isRTL ? 'حذف' : 'Remove'}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MediaPreview;