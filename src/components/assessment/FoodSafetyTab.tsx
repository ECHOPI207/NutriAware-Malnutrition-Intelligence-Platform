import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ShieldAlert, Info, Download, Share2, ClipboardCheck, ArrowRight, ArrowLeft, Droplets, SplitSquareHorizontal, Flame, Thermometer, Hand, CheckCircle2 } from 'lucide-react';
import { foodSafetyKeys, calculateScore, AnswerValue, ChecklistResult } from '@/data/foodSafetyChecklist';
import html2canvas from 'html2canvas';

export const FoodSafetyTab: React.FC = () => {
    const { i18n } = useTranslation();
    const isRTL = i18n.language === 'ar';

    const [answers, setAnswers] = useState<Record<string, AnswerValue>>({});
    const [activeTab, setActiveTab] = useState('key-1');
    const [showResults, setShowResults] = useState(false);
    const [result, setResult] = useState<ChecklistResult | null>(null);
    const resultRef = useRef<HTMLDivElement>(null);

    const getIcon = (iconName: string) => {
        switch (iconName) {
            case 'hand': return <Hand className="h-5 w-5" />;
            case 'split': return <SplitSquareHorizontal className="h-5 w-5" />;
            case 'flame': return <Flame className="h-5 w-5" />;
            case 'thermometer': return <Thermometer className="h-5 w-5" />;
            case 'droplets': return <Droplets className="h-5 w-5" />;
            default: return <ClipboardCheck className="h-5 w-5" />;
        }
    };

    const handleAnswer = (itemId: string, value: AnswerValue) => {
        setAnswers(prev => ({ ...prev, [itemId]: value }));
    };

    const isTabComplete = (keyId: number) => {
        const key = foodSafetyKeys.find(k => k.id === keyId);
        if (!key) return false;
        return key.items.every(item => answers[item.id] !== undefined);
    };

    const nextTab = (currentId: number) => {
        if (currentId < 5) {
            setActiveTab(`key-${currentId + 1}`);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            finishAssessment();
        }
    };

    const finishAssessment = () => {
        const res = calculateScore(answers);
        setResult(res);
        setShowResults(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const resetAssessment = () => {
        setAnswers({});
        setShowResults(false);
        setResult(null);
        setActiveTab('key-1');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const downloadPDF = async () => {
        if (!resultRef.current) return;
        try {
            const canvas = await html2canvas(resultRef.current, { scale: 2 });
            const imgData = canvas.toDataURL('image/png');

            // Dynamic import to avoid loading pdfmake on initial bundle
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
                    font: 'Roboto' // Ensure you have Arabic fonts loaded if needed in production
                }
            };

            pdfMake.createPdf(docDefinition as any).download('Food-Safety-Score.pdf');
        } catch (error) {
            console.error('Error generating PDF', error);
            alert(isRTL ? 'حدث خطأ أثناء تحميل الملف' : 'Error downloading PDF');
        }
    };

    const shareResults = () => {
        if (navigator.share && result) {
            navigator.share({
                title: isRTL ? 'نتيجتي في فحص سلامة الغذاء' : 'My Food Safety Score',
                text: isRTL
                    ? `حصلت على درجة ${result.total_score}% (${result.category_ar}) في فحص سلامة الغذاء المنزلي المتوافق مع مفاتيح منظمة الصحة العالمية!`
                    : `I got a score of ${result.total_score}% (${result.category_en}) on the Home Food Safety Check based on WHO guidelines!`,
                url: window.location.href,
            }).catch(console.error);
        } else {
            alert(isRTL ? 'المشاركة غير مدعومة في متصفحك' : 'Sharing is not supported in your browser');
        }
    };

    const totalAnswered = Object.keys(answers).length;
    const totalItems = foodSafetyKeys.reduce((acc, key) => acc + key.items.length, 0);
    const progressPercent = Math.round((totalAnswered / totalItems) * 100);

    if (showResults && result) {
        return (
            <div className={`w-full ${isRTL ? 'rtl' : 'ltr'}`}>
                <div className="max-w-3xl mx-auto px-4">
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">

                        {/* Header / Actions */}
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-2">
                            <Button variant="ghost" onClick={resetAssessment} className="text-muted-foreground mr-auto sm:mr-0 rtl:mr-auto rtl:ml-0 gap-2">
                                {isRTL ? <ArrowRight className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />}
                                {isRTL ? 'إعادة التقييم' : 'Retake Assessment'}
                            </Button>
                            <div className="flex gap-3 w-full sm:w-auto">
                                <Button variant="outline" onClick={shareResults} className="flex-1 sm:flex-none gap-2">
                                    <Share2 className="h-4 w-4" />
                                    {isRTL ? 'مشاركة' : 'Share'}
                                </Button>
                                <Button onClick={downloadPDF} className="flex-1 sm:flex-none btn-gradient gap-2">
                                    <Download className="h-4 w-4" />
                                    {isRTL ? 'تحميل PDF' : 'Download PDF'}
                                </Button>
                            </div>
                        </div>

                        {/* Results Snapshot (For PDF & Display) */}
                        <div ref={resultRef} className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden border">
                            {/* Score Header */}
                            <div className={`p-8 text-center text-white ${result.total_score >= 80 ? 'bg-gradient-to-br from-green-500 to-emerald-700' :
                                result.total_score >= 50 ? 'bg-gradient-to-br from-amber-500 to-orange-600' :
                                    'bg-gradient-to-br from-red-500 to-rose-700'
                                }`}>
                                <h2 className="text-2xl font-bold opacity-90 mb-2">
                                    {isRTL ? 'نتيجة تقييم سلامة الغذاء المنزلي' : 'Home Food Safety Score'}
                                </h2>
                                <div className="text-6xl font-black mb-2 tracking-tighter">
                                    {result.total_score}<span className="text-3xl font-bold opacity-70">%</span>
                                </div>
                                <div className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-lg font-bold">
                                    {isRTL ? result.category_ar : result.category_en}
                                </div>
                            </div>

                            {/* Detailed Breakdown */}
                            <div className="p-6 sm:p-8 space-y-8">
                                {foodSafetyKeys.map((key) => {
                                    const keyResult = result.keys.find(k => k.key === key.id);
                                    const score = keyResult?.score || 0;
                                    const isGood = score >= 80;

                                    return (
                                        <div key={key.id} className="border-b last:border-0 pb-6 last:pb-0">
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center gap-3">
                                                    <div className={`p-2 rounded-lg ${isGood ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'}`}>
                                                        {getIcon(key.icon)}
                                                    </div>
                                                    <h3 className="font-bold text-lg">{isRTL ? key.title_ar : key.title_en}</h3>
                                                </div>
                                                <span className={`font-bold ${isGood ? 'text-green-600' : 'text-amber-600'}`}>
                                                    {score}%
                                                </span>
                                            </div>

                                            {/* Progress bar */}
                                            <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mb-3">
                                                <div
                                                    className={`h-full rounded-full transition-all duration-1000 ${isGood ? 'bg-green-500' : 'bg-amber-500'}`}
                                                    style={{ width: `${score}%` }}
                                                />
                                            </div>

                                            {/* Tailored Tip */}
                                            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3 text-sm text-slate-700 dark:text-slate-300 flex gap-3">
                                                <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                                                <p>{isRTL ? key.tip_ar : key.tip_en}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Disclaimer */}
                        <Alert className="bg-muted/50 border-0">
                            <ShieldAlert className="h-4 w-4" />
                            <AlertTitle>{isRTL ? 'تنبيه هام' : 'Important Notice'}</AlertTitle>
                            <AlertDescription className="text-xs text-muted-foreground mt-1">
                                {isRTL
                                    ? 'هذا الفحص مبني على مفاتيح منظمة الصحة العالمية الخمسة لضمان مأمونية الغذاء، وهو أداة تعليمية لا تغني عن الاستشارة الطبية أو الإجراءات الرسمية لسلامة الغذاء.'
                                    : 'This assessment is based on the WHO Five Keys to Safer Food. It is an educational tool and does not substitute professional advice or official food safety protocols.'}
                            </AlertDescription>
                        </Alert>
                    </motion.div>
                </div>
            </div>
        );
    }

    return (
        <div className={`w-full ${isRTL ? 'rtl' : 'ltr'}`}>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold mb-3">
                        <span className="gradient-text">
                            {isRTL ? 'فحص سلامة الغذاء المنزلي' : 'Home Food Safety Check'}
                        </span>
                    </h1>
                    <p className="text-muted-foreground">
                        {isRTL
                            ? 'أداة تقييم تفاعلية تعتمد على توصيات منظمة الصحة العالمية'
                            : 'Interactive assessment based on World Health Organization recommendations'}
                    </p>
                </div>

                {/* Global Progress */}
                <div className="mb-8">
                    <div className="flex justify-between text-sm mb-2 text-muted-foreground font-medium">
                        <span>{isRTL ? 'التقدم' : 'Progress'}</span>
                        <span>{progressPercent}%</span>
                    </div>
                    <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                        <div
                            className="h-full bg-primary transition-all duration-300 ease-out"
                            style={{ width: `${progressPercent}%` }}
                        />
                    </div>
                </div>

                <Card className="border-0 shadow-xl overflow-hidden bg-card/50 backdrop-blur-md">
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full flex flex-col md:flex-row rtl:md:flex-row-reverse min-h-[500px]">

                        {/* Vertical Tabs List on Desktop, Horizontal Scroll on Mobile */}
                        <TabsList className="flex md:flex-col h-auto w-full md:w-64 bg-slate-100/50 dark:bg-slate-900/50 justify-start overflow-x-auto md:overflow-x-visible rounded-none border-b md:border-b-0 md:border-r rtl:md:border-l p-0">
                            {foodSafetyKeys.map((key) => {
                                const isComplete = isTabComplete(key.id);
                                return (
                                    <TabsTrigger
                                        key={key.id}
                                        value={`key-${key.id}`}
                                        className="flex-shrink-0 justify-start gap-3 p-4 w-full data-[state=active]:bg-white dark:data-[state=active]:bg-slate-950 data-[state=active]:shadow-sm rounded-none border-r-4 md:border-r-0 md:border-l-4 border-transparent data-[state=active]:border-primary transition-all"
                                    >
                                        <div className={`p-1.5 rounded-full ${isComplete ? 'bg-green-100 text-green-600 dark:bg-green-900/30' : 'bg-slate-200 text-slate-500 dark:bg-slate-800'}`}>
                                            {isComplete ? <CheckCircle2 className="h-4 w-4" /> : getIcon(key.icon)}
                                        </div>
                                        <div className="truncate text-left rtl:text-right flex-1 font-medium">
                                            {isRTL ? key.title_ar : key.title_en}
                                        </div>
                                    </TabsTrigger>
                                );
                            })}
                        </TabsList>

                        <div className="flex-1 p-0 relative">
                            <AnimatePresence mode="wait">
                                {foodSafetyKeys.map((key) => (
                                    activeTab === `key-${key.id}` && (
                                        <TabsContent key={key.id} value={`key-${key.id}`} className="mt-0 h-full flex flex-col focus-visible:outline-none" forceMount>
                                            <motion.div
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                transition={{ duration: 0.3 }}
                                                className="p-6 md:p-8 flex flex-col h-full"
                                            >
                                                <div className="mb-8">
                                                    <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
                                                        <span className="flex items-center justify-center bg-primary/10 text-primary w-10 h-10 rounded-xl">
                                                            {getIcon(key.icon)}
                                                        </span>
                                                        {isRTL ? key.title_ar : key.title_en}
                                                    </h2>
                                                    <p className="text-muted-foreground">
                                                        {isRTL ? 'أجب عن الأسئلة التالية بصراحة لتقييم ممارساتك الحالية.' : 'Answer the following questions honestly to evaluate your current practices.'}
                                                    </p>
                                                </div>

                                                <div className="space-y-6 flex-1">
                                                    {key.items.map((item, index) => (
                                                        <div key={item.id} className="bg-white dark:bg-slate-900 border rounded-xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow">
                                                            <p className="font-semibold text-base mb-4 leading-snug">
                                                                {index + 1}. {isRTL ? item.text_ar : item.text_en}
                                                            </p>

                                                            <div className="grid grid-cols-3 gap-3">
                                                                <Button
                                                                    variant={answers[item.id] === 'yes' ? 'default' : 'outline'}
                                                                    onClick={() => handleAnswer(item.id, 'yes')}
                                                                    className={answers[item.id] === 'yes' ? 'bg-green-600 hover:bg-green-700 text-white' : 'hover:border-green-300 hover:bg-green-50 dark:hover:bg-green-900/20'}
                                                                >
                                                                    {isRTL ? 'دائماً / نعم' : 'Always / Yes'}
                                                                </Button>
                                                                <Button
                                                                    variant={answers[item.id] === 'not_sure' ? 'default' : 'outline'}
                                                                    onClick={() => handleAnswer(item.id, 'not_sure')}
                                                                    className={answers[item.id] === 'not_sure' ? 'bg-amber-500 hover:bg-amber-600 text-white' : 'hover:border-amber-300 hover:bg-amber-50 dark:hover:bg-amber-900/20'}
                                                                >
                                                                    {isRTL ? 'أحياناً' : 'Sometimes'}
                                                                </Button>
                                                                <Button
                                                                    variant={answers[item.id] === 'no' ? 'default' : 'outline'}
                                                                    onClick={() => handleAnswer(item.id, 'no')}
                                                                    className={answers[item.id] === 'no' ? 'bg-rose-500 hover:bg-rose-600 text-white' : 'hover:border-rose-300 hover:bg-rose-50 dark:hover:bg-rose-900/20'}
                                                                >
                                                                    {isRTL ? 'أبداً / لا' : 'Never / No'}
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="mt-8 pt-6 border-t flex justify-end">
                                                    <Button
                                                        onClick={() => nextTab(key.id)}
                                                        disabled={!isTabComplete(key.id)}
                                                        className="w-full sm:w-auto px-8 btn-gradient"
                                                    >
                                                        {key.id === 5 ? (isRTL ? 'ظهور النتيجة' : 'Show Result') : (isRTL ? 'التالي' : 'Next section')}
                                                        {isRTL ? <ArrowLeft className="h-4 w-4 mr-2" /> : <ArrowRight className="h-4 w-4 ml-2" />}
                                                    </Button>
                                                </div>
                                            </motion.div>
                                        </TabsContent>
                                    )
                                ))}
                            </AnimatePresence>
                        </div>
                    </Tabs>
                </Card>
            </div>
        </div>
    );
};

