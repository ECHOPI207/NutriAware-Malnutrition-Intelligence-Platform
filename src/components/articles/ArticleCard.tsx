import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Eye, User, Image, Video, ArrowLeft, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Article {
  id: string;
  title: {
    ar: string;
    en: string;
  };
  content: {
    ar: string;
    en: string;
  };
  category: {
    ar: string;
    en: string;
  };
  status: 'draft' | 'published' | 'archived';
  author: string;
  createdAt: any;
  updatedAt: any;
  views: number;
  featuredImage?: string;
  imageUrl?: string;
  gallery?: string[];
  videoUrl?: string;
  tags: {
    ar: string[];
    en: string[];
  };
}

interface ArticleCardProps {
  article: Article;
  onReadMore?: (article: Article) => void;
  variant?: 'default' | 'compact' | 'featured';
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  onReadMore,
  variant = 'default'
}) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const currentLang = isRTL ? 'ar' : 'en';

  const formatDate = (date: any) => {
    if (!date) return '';
    const dateObj = date.toDate ? date.toDate() : new Date(date);
    return dateObj.toLocaleDateString(isRTL ? 'ar-EG' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getExcerpt = (content: string, maxLength: number = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  if (variant === 'compact') {
    return (
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardContent className="p-4">
          <div className="flex gap-4">
            {(article.featuredImage || article.imageUrl) && (
              <div className="flex-shrink-0">
                <img
                  src={article.featuredImage || article.imageUrl}
                  alt={article.title[currentLang]}
                  className="w-20 h-20 object-cover rounded-lg"
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                {article.title[currentLang]}
              </h3>
              <p className="text-muted-foreground text-sm mb-2 line-clamp-2">
                {getExcerpt(article.content[currentLang], 100)}
              </p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {formatDate(article.createdAt)}
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  {article.views}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (variant === 'featured') {
    return (
      <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
        {(article.featuredImage || article.imageUrl) && (
          <div className="relative h-64">
            <img
              src={article.featuredImage || article.imageUrl}
              alt={article.title[currentLang]}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <Badge className="mb-2 bg-primary/80">
                {article.category[currentLang]}
              </Badge>
              <h2 className="text-2xl font-bold mb-2 line-clamp-2">
                {article.title[currentLang]}
              </h2>
            </div>
          </div>
        )}
        <CardContent className="p-6">
          <p className="text-muted-foreground mb-4 line-clamp-3">
            {getExcerpt(article.content[currentLang], 200)}
          </p>

          {/* Tags */}
          {article.tags[currentLang].length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {article.tags[currentLang].slice(0, 3).map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <User className="h-3 w-3" />
                {article.author}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {formatDate(article.createdAt)}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                {article.views}
              </span>
            </div>

            {onReadMore && (
              <Button
                size="sm"
                className="btn-gradient shadow-md"
                onClick={() => onReadMore(article)}
              >
                {isRTL ? 'اقرأ المزيد' : 'Read More'}
                {isRTL ? <ArrowLeft className="h-4 w-4 mr-2" /> : <ArrowRight className="h-4 w-4 ml-2" />}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Default variant
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {(article.featuredImage || article.imageUrl) && (
        <div className="relative h-48">
          <img
            src={article.featuredImage || article.imageUrl}
            alt={article.title[currentLang]}
            className="w-full h-full object-cover"
          />
          {/* Media indicators */}
          <div className="absolute top-2 right-2 flex gap-1">
            {article.gallery && article.gallery.length > 0 && (
              <Badge variant="secondary" className="text-xs">
                <Image className="h-3 w-3 mr-1" />
                {article.gallery.length}
              </Badge>
            )}
            {article.videoUrl && (
              <Badge variant="secondary" className="text-xs">
                <Video className="h-3 w-3" />
              </Badge>
            )}
          </div>
        </div>
      )}

      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <Badge variant="outline" className="mb-2">
            {article.category[currentLang]}
          </Badge>
        </div>
        <CardTitle className="line-clamp-2">
          {article.title[currentLang]}
        </CardTitle>
        <CardDescription className="line-clamp-3">
          {getExcerpt(article.content[currentLang])}
        </CardDescription>
      </CardHeader>

      <CardContent>
        {/* Tags */}
        {article.tags[currentLang].length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {article.tags[currentLang].slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {article.tags[currentLang].length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{article.tags[currentLang].length - 3}
              </Badge>
            )}
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <User className="h-3 w-3" />
              {article.author}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {formatDate(article.createdAt)}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              {article.views}
            </span>
          </div>

          {onReadMore && (
            <Button
              size="sm"
              className="btn-gradient shadow-md"
              onClick={() => onReadMore(article)}
            >
              {isRTL ? 'اقرأ المزيد' : 'Read More'}
              {isRTL ? <ArrowLeft className="h-4 w-4 mr-2" /> : <ArrowRight className="h-4 w-4 ml-2" />}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ArticleCard;