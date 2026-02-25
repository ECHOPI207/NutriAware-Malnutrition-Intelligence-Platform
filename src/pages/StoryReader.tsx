import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Download, BookOpen, ChevronRight } from 'lucide-react';
import { getStoryBySlug } from '@/data/storiesData';

const StoryReader: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const { i18n } = useTranslation();
    const isRTL = i18n.language === 'ar';

    const story = slug ? getStoryBySlug(decodeURIComponent(slug)) : undefined;

    if (!story) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <BookOpen className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                    <h2 className="text-2xl font-bold mb-2">
                        {isRTL ? 'القصة غير موجودة' : 'Story Not Found'}
                    </h2>
                    <Link to="/stories">
                        <Button variant="outline">
                            {isRTL ? 'العودة لمكتبة القصص' : 'Back to Stories Library'}
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    const title = isRTL ? story.title_ar : story.title_en;
    const pdfUrl = `/stories/${encodeURIComponent(story.pdf_filename)}`;

    return (
        <div className={`min-h-screen py-8 ${isRTL ? 'rtl' : 'ltr'}`}>
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumb */}
                <motion.nav
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2 text-sm text-muted-foreground mb-6 flex-wrap"
                >
                    <Link to="/stories" className="hover:text-primary transition-colors font-medium">
                        {isRTL ? 'مكتبة القصص' : 'Stories Library'}
                    </Link>
                    <ChevronRight className="h-4 w-4 rtl:rotate-180" />
                    <span className="text-foreground font-medium">{title}</span>
                </motion.nav>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between flex-wrap gap-4 mb-6"
                >
                    <h1 className="text-3xl font-bold">{title}</h1>
                    <div className="flex gap-3">
                        <a href={pdfUrl} download>
                            <Button variant="outline" className="gap-2">
                                <Download className="h-4 w-4" />
                                {isRTL ? 'تحميل PDF' : 'Download PDF'}
                            </Button>
                        </a>
                        <Link to="/stories">
                            <Button variant="ghost" className="gap-2">
                                {isRTL ? <ArrowRight className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />}
                                {isRTL ? 'رجوع' : 'Back'}
                            </Button>
                        </Link>
                    </div>
                </motion.div>

                {/* PDF Viewer */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-muted rounded-xl overflow-hidden shadow-lg"
                >
                    <iframe
                        src={pdfUrl}
                        title={title}
                        className="w-full border-0"
                        style={{ height: 'calc(100vh - 200px)', minHeight: '600px' }}
                    />
                </motion.div>

                {/* Fallback download */}
                <div className="text-center mt-6 text-sm text-muted-foreground">
                    <p>
                        {isRTL
                            ? 'إذا لم يظهر ملف PDF أعلاه، يمكنك '
                            : 'If the PDF doesn\'t display above, you can '}
                        <a href={pdfUrl} download className="text-primary underline hover:no-underline font-medium">
                            {isRTL ? 'تحميل الملف مباشرة' : 'download it directly'}
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default StoryReader;
