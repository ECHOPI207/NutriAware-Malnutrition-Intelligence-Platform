import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Download, Clock, Users as UsersIcon } from 'lucide-react';
import { stories } from '@/data/storiesData';

const Stories: React.FC = () => {
    const { i18n } = useTranslation();
    const isRTL = i18n.language === 'ar';

    return (
        <div className={`min-h-screen py-12 ${isRTL ? 'rtl' : 'ltr'}`}>
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-6">
                        <BookOpen className="h-8 w-8 text-primary" />
                    </div>
                    <h1 className="text-4xl font-bold mb-4">
                        <span className="gradient-text">
                            {isRTL ? 'مكتبة القصص' : 'Stories Library'}
                        </span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        {isRTL
                            ? 'قصص مصورة تعليمية للأطفال عن التغذية الصحية وسلامة الغذاء'
                            : 'Educational illustrated stories for children about healthy nutrition and food safety'}
                    </p>
                </motion.div>

                {/* Stories Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {stories.map((story, index) => (
                        <motion.div
                            key={story.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.15 }}
                        >
                            <Link to={`/stories/${isRTL ? story.slug_ar : story.slug_en}`} className="block h-full">
                                <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 group border-0 shadow-md cursor-pointer">
                                    {/* Cover */}
                                    <div
                                        className="h-48 flex items-center justify-center relative overflow-hidden"
                                        style={{ background: `linear-gradient(135deg, ${story.cover_color}22, ${story.cover_color}44)` }}
                                    >
                                        {story.cover_image ? (
                                            <img
                                                src={story.cover_image}
                                                alt=""
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        ) : (
                                            <>
                                                <BookOpen className="h-20 w-20 opacity-20" style={{ color: story.cover_color }} />
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <span className="text-5xl font-bold opacity-10" style={{ color: story.cover_color }}>
                                                        {story.id === 'story-1' ? '📖' : '🍱'}
                                                    </span>
                                                </div>
                                            </>
                                        )}
                                    </div>

                                    <CardHeader className="pb-2">
                                        <div className="flex items-center gap-2 flex-wrap mb-2">
                                            <Badge variant="secondary" className="text-xs">
                                                <UsersIcon className="h-3 w-3 mr-1 rtl:ml-1 rtl:mr-0" />
                                                {isRTL ? `مناسب للأعمار ${story.age_range}` : `Ages ${story.age_range}`}
                                            </Badge>
                                            <Badge variant="outline" className="text-xs">
                                                <Clock className="h-3 w-3 mr-1 rtl:ml-1 rtl:mr-0" />
                                                {isRTL ? `${story.reading_time_minutes} دقائق` : `${story.reading_time_minutes} min`}
                                            </Badge>
                                        </div>
                                        <CardTitle className="text-xl group-hover:text-primary transition-colors">
                                            {isRTL ? story.title_ar : story.title_en}
                                        </CardTitle>
                                    </CardHeader>

                                    <CardContent className="pt-0">
                                        <p className="text-muted-foreground mb-6 line-clamp-2">
                                            {isRTL ? story.description_ar : story.description_en}
                                        </p>

                                        <div className="flex gap-3">
                                            <div className="flex-1">
                                                <Button className="w-full btn-gradient gap-2">
                                                    <BookOpen className="h-4 w-4" />
                                                    {isRTL ? 'اقرأ القصة' : 'Read Story'}
                                                </Button>
                                            </div>
                                            <a
                                                href={`/stories/${encodeURIComponent(story.pdf_filename)}`}
                                                download
                                                className="flex-shrink-0"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <Button variant="outline" size="icon" title={isRTL ? 'تحميل PDF' : 'Download PDF'}>
                                                    <Download className="h-4 w-4" />
                                                </Button>
                                            </a>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Coming Soon */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-center mt-12 py-8"
                >
                    <p className="text-muted-foreground text-lg">
                        {isRTL ? 'المزيد من القصص قريباً...' : 'More stories coming soon...'}
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default Stories;
