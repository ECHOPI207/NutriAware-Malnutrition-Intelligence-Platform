import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Download, BookOpen, ChevronRight, ChevronLeft, Loader2 } from 'lucide-react';
import { getStoryBySlug } from '@/data/storiesData';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();

const StoryReader: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const { i18n } = useTranslation();
    const isRTL = i18n.language === 'ar';

    const story = slug ? getStoryBySlug(decodeURIComponent(slug)) : undefined;

    // Construct an absolute URL using window.location.origin to force a proper fetch request
    // Load the .data extension to completely bypass IDM intercepting .pdf requests
    const pdfUrl = story ? `${window.location.origin}/stories/${encodeURIComponent(story.pdf_filename.replace('.pdf', '.data'))}` : '';

    const [numPages, setNumPages] = useState<number | null>(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageWidth, setPageWidth] = useState(800);
    const [pdfError, setPdfError] = useState<Error | null>(null);

    useEffect(() => {
        const updateWidth = () => {
            const width = window.innerWidth;
            if (width < 640) setPageWidth(width - 40); // Mobile
            else if (width < 1024) setPageWidth(width - 80); // Tablet
            else setPageWidth(800); // Desktop
        };

        updateWidth();
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    }, []);

    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages);
        setPageNumber(1);
        setPdfError(null);
    }

    function onDocumentLoadError(error: Error) {
        setPdfError(error);
        console.error("React-PDF load error:", error);
    }

    const previousPage = () => {
        setPageNumber(prev => Math.max(prev - 1, 1));
    };

    const nextPage = () => {
        if (numPages) {
            setPageNumber(prev => Math.min(prev + 1, numPages));
        }
    };

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
                        <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" className="gap-2 border-primary/20 text-primary hover:bg-primary/5">
                                <BookOpen className="h-4 w-4" />
                                {isRTL ? 'فتح في علامة تبويب جديدة' : 'Open in New Tab'}
                            </Button>
                        </a>
                        <a href={pdfUrl} download>
                            <Button variant="default" className="gap-2 shadow-md">
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

                {/* Reader Note for Mobile */}
                <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg text-sm text-blue-700 dark:text-blue-300 flex items-center gap-2">
                    <BookOpen className="h-4 w-4 flex-shrink-0" />
                    <p>
                        {isRTL
                            ? 'نصيحة: إذا كنت تستخدم هاتفاً محموماً، يفضل الضغط على "فتح في علامة تبويب جديدة" لقراءة أفضل.'
                            : 'Tip: If you are using a mobile phone, click "Open in New Tab" for a better reading experience.'}
                    </p>
                </div>

                {/* PDF Viewer - React PDF */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-muted rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 flex flex-col items-center justify-center min-h-[500px]"
                >
                    <Document
                        file={pdfUrl}
                        onLoadSuccess={onDocumentLoadSuccess}
                        onLoadError={onDocumentLoadError}
                        loading={
                            <div className="flex flex-col items-center justify-center p-12 h-64">
                                <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
                                <p className="text-muted-foreground">{isRTL ? 'جاري تحميل القصة...' : 'Loading story...'}</p>
                            </div>
                        }
                        error={
                            <div className="flex flex-col items-center justify-center p-12 text-center h-full bg-slate-100 dark:bg-slate-900 w-full">
                                <BookOpen className="h-20 w-20 text-red-400 mb-4" />
                                <h3 className="text-xl font-bold mb-4">
                                    {isRTL ? 'حدث خطأ أثناء تحميل القصة' : 'Error loading story'}
                                </h3>
                                <p className="text-muted-foreground mb-4">
                                    {isRTL ? 'يرجى تحميل الملف بدلاً من ذلك، أو قد يكون اتصال الإنترنت ضعيفاً.' : 'Please download the file instead, or check your internet connection.'}
                                </p>
                                {pdfError && (
                                    <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-md text-sm text-left font-mono w-full max-w-2xl overflow-auto border border-red-200 dark:border-red-800">
                                        {pdfError.message || 'Unknown error occurred'}
                                    </div>
                                )}
                            </div>
                        }
                        className="flex justify-center bg-white dark:bg-slate-950 w-full relative"
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={pageNumber}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                                className="flex justify-center w-full"
                            >
                                <Page
                                    pageNumber={pageNumber}
                                    renderTextLayer={false}
                                    renderAnnotationLayer={false}
                                    width={pageWidth}
                                    className="max-w-full"
                                />
                            </motion.div>
                        </AnimatePresence>
                    </Document>

                    {/* Book Navigation */}
                    {numPages && (
                        <div className="w-full bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 p-4 flex items-center justify-between">
                            <Button
                                variant="outline"
                                onClick={isRTL ? nextPage : previousPage}
                                disabled={isRTL ? pageNumber >= numPages : pageNumber <= 1}
                                className="gap-2"
                            >
                                <ChevronRight className="h-4 w-4" />
                                {isRTL ? 'التالي' : 'Previous'}
                            </Button>

                            <div className="text-sm font-medium">
                                {pageNumber} / {numPages}
                            </div>

                            <Button
                                variant="outline"
                                onClick={isRTL ? previousPage : nextPage}
                                disabled={isRTL ? pageNumber <= 1 : pageNumber >= numPages}
                                className="gap-2"
                            >
                                {isRTL ? 'السابق' : 'Next'}
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                        </div>
                    )}
                </motion.div>

                {/* Secondary Fallback */}
                <div className="text-center mt-8">
                    <p className="text-muted-foreground mb-4">
                        {isRTL
                            ? 'إذا واجهت مشكلة في عرض القصة، يمكنك استخدام الأزرار في الأعلى.'
                            : 'If you have trouble viewing the story, use the buttons above.'}
                    </p>
                    <Button
                        variant="outline"
                        onClick={() => window.location.reload()}
                        className="text-sm"
                    >
                        {isRTL ? 'إعادة تحميل الصفحة' : 'Refresh Page'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default StoryReader;
