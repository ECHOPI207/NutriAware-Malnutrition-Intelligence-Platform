import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, ClipboardList, ArrowRight, ArrowLeft, Info, CheckCircle2 } from 'lucide-react';
import html2canvas from 'html2canvas';

type FoodGroup = 'grains' | 'legumes' | 'dairy' | 'meat' | 'eggs' | 'vitaminA' | 'otherVeg' | 'otherFruit';

const FOOD_GROUPS: FoodGroup[] = [
    'grains', 'legumes', 'dairy', 'meat', 'eggs', 'vitaminA', 'otherVeg', 'otherFruit'
];

export const DietaryDiversityTab: React.FC = () => {
    const { t, i18n } = useTranslation();
    const isRTL = i18n.language === 'ar';

    const [answers, setAnswers] = useState<Record<FoodGroup, boolean>>({
        grains: false, legumes: false, dairy: false, meat: false,
        eggs: false, vitaminA: false, otherVeg: false, otherFruit: false
    });

    const [showResults, setShowResults] = useState(false);
    const resultRef = useRef<HTMLDivElement>(null);

    const toggleAnswer = (group: FoodGroup) => {
        setAnswers(prev => ({ ...prev, [group]: !prev[group] }));
    };

    const calculateScore = () => {
        setShowResults(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const resetAssessment = () => {
        setAnswers({
            grains: false, legumes: false, dairy: false, meat: false,
            eggs: false, vitaminA: false, otherVeg: false, otherFruit: false
        });
        setShowResults(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const score = Object.values(answers).filter(Boolean).length;
    const isAdequate = score >= 5;
    const category = isAdequate ? 'adequate' : 'low';

    const progressPercent = Math.round((score / 8) * 100);

    const downloadPDF = async () => {
        if (!resultRef.current) return;
        try {
            const canvas = await html2canvas(resultRef.current, { scale: 2 });
            const imgData = canvas.toDataURL('image/png');

            const pdfMake = (await import('pdfmake/build/pdfmake')).default;
            const pdfFonts = (await import('pdfmake/build/vfs_fonts')).default;
            (pdfMake as any).vfs = (pdfFonts as any).pdfMake.vfs;

            const docDefinition = {
                content: [
                    {
                        image: imgData,
                        width: 500,
                        alignment: 'center'
                    }
                ],
                defaultStyle: {
                    font: 'Roboto'
                }
            };

            pdfMake.createPdf(docDefinition as any).download('Dietary-Diversity-Score.pdf');
        } catch (error) {
            console.error('Error generating PDF', error);
            alert(isRTL ? 'حدث خطأ أثناء تحميل الملف' : 'Error downloading PDF');
        }
    };

    if (showResults) {
        return (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 max-w-3xl mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-2">
                    <Button variant="ghost" onClick={resetAssessment} className="text-muted-foreground mr-auto sm:mr-0 rtl:mr-auto rtl:ml-0 gap-2 font-semibold hover:bg-primary/10 hover:text-primary">
                        {isRTL ? <ArrowRight className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />}
                        {isRTL ? 'إعادة التقييم' : 'Retake Assessment'}
                    </Button>
                    <div className="flex gap-3 w-full sm:w-auto">
                        <Button onClick={downloadPDF} className="flex-1 sm:flex-none btn-gradient gap-2">
                            <Download className="h-4 w-4" />
                            {isRTL ? 'تحميل PDF' : 'Download PDF'}
                        </Button>
                    </div>
                </div>

                <div ref={resultRef} className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl overflow-hidden border border-border/50">
                    <div className={`p-8 md:p-12 text-center text-white relative overflow-hidden ${isAdequate ? 'bg-gradient-to-br from-emerald-500 to-teal-700' : 'bg-gradient-to-br from-amber-500 to-orange-600'}`}>
                        {/* Background abstract shapes */}
                        <div className="absolute top-0 right-0 -m-8 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                        <div className="absolute bottom-0 left-0 -m-8 w-32 h-32 bg-black/10 rounded-full blur-2xl" />

                        <div className="relative z-10">
                            <h2 className="text-xl md:text-2xl font-bold opacity-90 mb-4 tracking-wide">
                                {t('assessment.dds.resultTitle')}
                            </h2>
                            <div className="flex items-baseline justify-center gap-2 mb-6">
                                <span className="text-7xl md:text-8xl font-black tracking-tighter drop-shadow-md">
                                    {score}
                                </span>
                                <span className="text-3xl md:text-4xl font-bold opacity-70">/8</span>
                            </div>
                            <div className="inline-flex items-center gap-2 px-6 py-2.5 bg-white/20 backdrop-blur-md rounded-full text-lg md:text-xl font-bold shadow-sm ring-1 ring-white/30">
                                {isAdequate && <CheckCircle2 className="w-5 h-5 opacity-90" />}
                                {t(`assessment.dds.categories.${category}`)}
                            </div>
                        </div>
                    </div>

                    <div className="p-6 md:p-10 space-y-8">
                        {/* Progress Bar Container */}
                        <div className="space-y-3">
                            <div className="flex justify-between text-sm font-semibold text-muted-foreground">
                                <span>{isRTL ? 'النتيجة من 8 مجموعات' : 'Score out of 8 groups'}</span>
                                <span>{Math.round(progressPercent)}%</span>
                            </div>
                            <div className="h-4 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner flex">
                                <div
                                    className={`h-full rounded-full transition-all duration-1000 ease-out ${isAdequate ? 'bg-gradient-to-r from-emerald-400 to-teal-500' : 'bg-gradient-to-r from-amber-400 to-orange-500'}`}
                                    style={{ width: `${progressPercent}%` }}
                                />
                            </div>
                            <div className="flex justify-between text-xs font-medium text-slate-400 pt-1">
                                <span>0</span>
                                <span>4</span>
                                <span>8</span>
                            </div>
                        </div>

                        {/* Tips Card */}
                        <div className={`rounded-2xl p-6 border-2 flex flex-col md:flex-row gap-5 items-start ${isAdequate ? 'bg-emerald-50/50 dark:bg-emerald-900/10 border-emerald-100 dark:border-emerald-800/30' : 'bg-amber-50/50 dark:bg-amber-900/10 border-amber-100 dark:border-amber-800/30'}`}>
                            <div className={`p-3 rounded-xl shrink-0 ${isAdequate ? 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600' : 'bg-amber-100 dark:bg-amber-900/50 text-amber-600'}`}>
                                <Info className="h-6 w-6" />
                            </div>
                            <div>
                                <h4 className={`font-bold text-lg mb-2 ${isAdequate ? 'text-emerald-800 dark:text-emerald-300' : 'text-amber-800 dark:text-amber-300'}`}>
                                    {isRTL ? 'توصية تهمك' : 'Key Recommendation'}
                                </h4>
                                <p className={`font-medium leading-relaxed ${isAdequate ? 'text-emerald-700/80 dark:text-emerald-400/80' : 'text-amber-700/80 dark:text-amber-400/80'}`}>
                                    {t(`assessment.dds.tips.${category}`)}
                                </p>
                            </div>
                        </div>

                        {/* Selected Foods Summary */}
                        <div className="pt-6 border-t border-border/40">
                            <h4 className="font-bold text-base mb-4 text-foreground/80">
                                {isRTL ? 'المجموعات الغذائية التي تم استهلاكها:' : 'Consumed Food Groups:'}
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {FOOD_GROUPS.filter(g => answers[g]).map(group => (
                                    <span key={group} className="px-3 py-1.5 bg-secondary/10 border border-secondary/20 text-secondary-foreground rounded-lg text-sm font-medium">
                                        {t(`assessment.dds.groups.${group}`)}
                                    </span>
                                ))}
                                {score === 0 && (
                                    <span className="text-muted-foreground text-sm italic">
                                        {isRTL ? 'لم يتم تحديد أي مجموعات.' : 'No groups selected.'}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
                <Card className="border-0 shadow-xl bg-card/60 backdrop-blur-xl ring-1 ring-border/20 overflow-hidden rounded-3xl">
                    <div className="h-1.5 w-full bg-gradient-to-r from-emerald-500 to-teal-400" />
                    <CardHeader className="pb-4 pt-8 px-6 md:px-10">
                        <CardTitle className="text-2xl md:text-3xl flex items-center gap-4 mb-2">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/20 flex items-center justify-center shrink-0 border border-emerald-500/10">
                                <ClipboardList className="h-6 w-6 text-emerald-600" />
                            </div>
                            <span className="font-extrabold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                                {t('assessment.dds.title')}
                            </span>
                        </CardTitle>
                        <CardDescription className="text-base text-muted-foreground/90 font-medium">
                            {t('assessment.dds.description')}
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-8 px-6 md:px-10 pb-10">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                            {FOOD_GROUPS.map((group) => (
                                <motion.div
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                    key={group}
                                    onClick={() => toggleAnswer(group)}
                                    className={`p-4 md:p-5 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between group ${answers[group] ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 shadow-md' : 'border-border/50 bg-background/50 hover:border-emerald-300 dark:hover:border-emerald-700 hover:shadow-sm'}`}
                                >
                                    <span className={`font-semibold text-base md:text-lg transition-colors duration-300 ${answers[group] ? 'text-emerald-800 dark:text-emerald-300' : 'text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white'}`}>
                                        {t(`assessment.dds.groups.${group}`)}
                                    </span>
                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-300 ${answers[group] ? 'border-emerald-500 bg-emerald-500' : 'border-slate-300 dark:border-slate-600 group-hover:border-emerald-400'}`}>
                                        <AnimatePresence>
                                            {answers[group] && (
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    exit={{ scale: 0 }}
                                                    className="w-2.5 h-2.5 rounded-full bg-white"
                                                />
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <Button
                            size="lg"
                            onClick={calculateScore}
                            className="w-full h-16 text-lg font-bold rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl shadow-emerald-500/20 transition-all hover:-translate-y-0.5"
                        >
                            {t('assessment.dds.calculate')}
                        </Button>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
};
