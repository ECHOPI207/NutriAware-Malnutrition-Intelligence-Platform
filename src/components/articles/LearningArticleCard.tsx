import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, ArrowLeft, ArrowRight, BookOpen } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { InterventionArticle } from '@/data/interventionArticles';

interface LearningArticleCardProps {
    article: InterventionArticle;
}

const axisColors: Record<number, string> = {
    1: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
    2: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
    3: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
};

const axisBorderColors: Record<number, string> = {
    1: 'border-l-emerald-500',
    2: 'border-l-amber-500',
    3: 'border-l-purple-500',
};

const LearningArticleCard: React.FC<LearningArticleCardProps> = ({ article }) => {
    const { i18n } = useTranslation();
    const isRTL = i18n.language === 'ar';
    const lang = isRTL ? 'ar' : 'en';

    const slug = isRTL ? article.slug_ar : article.slug_en;
    const title = isRTL ? article.title_ar : article.title_en;
    const axisLabel = isRTL ? article.axis_ar : article.axis_en;
    const summaryItems = isRTL ? article.quick_summary_ar : article.quick_summary_en;
    const tags = isRTL ? article.tags_ar : article.tags_en;

    return (
        <Link to={`/learning-path/${slug}`} className="block group">
            <Card className={`overflow-hidden h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-l-4 ${axisBorderColors[article.axis] || 'border-l-gray-500'}`}>
                <CardHeader className="pb-3">
                    <div className="flex items-center justify-between gap-2 mb-2">
                        <Badge className={`${axisColors[article.axis] || 'bg-gray-100'} text-xs font-medium`}>
                            {axisLabel}
                        </Badge>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>
                                {article.meta.reading_time_minutes} {isRTL ? 'دقائق' : 'min'}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                            <span className="text-sm font-bold text-primary">{article.id}</span>
                        </div>
                        <CardTitle className="text-base leading-snug group-hover:text-primary transition-colors">
                            {title}
                        </CardTitle>
                    </div>
                </CardHeader>

                <CardContent className="pt-0">
                    {/* Quick summary — first 2 bullets */}
                    <ul className="space-y-1.5 mb-4">
                        {summaryItems.slice(0, 2).map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <span className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/60" />
                                <span className="line-clamp-2">{item}</span>
                            </li>
                        ))}
                    </ul>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                        {tags.slice(0, 3).map((tag, idx) => (
                            <Badge key={idx} variant="outline" className="text-[10px] px-1.5 py-0">
                                {tag}
                            </Badge>
                        ))}
                        {tags.length > 3 && (
                            <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                                +{tags.length - 3}
                            </Badge>
                        )}
                    </div>

                    {/* Week badge + Read arrow */}
                    <div className="flex items-center justify-between mt-4 pt-3 border-t">
                        <Badge variant="secondary" className="text-xs">
                            <BookOpen className="h-3 w-3 mr-1" />
                            {isRTL ? `الأسبوع ${article.week_range}` : `Week ${article.week_range}`}
                        </Badge>
                        <div className="text-primary group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform">
                            {isRTL ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
};

export default LearningArticleCard;
