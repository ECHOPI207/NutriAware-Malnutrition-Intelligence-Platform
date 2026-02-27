import React, { useState } from 'react';
import { MealInputForm } from './MealInputForm';
import { NutritionalRadar } from './NutritionalRadar';
import { AdequacyBars } from './AdequacyBars';
import { SafetyDashboard } from './SafetyDashboard';
import { AnalysisResult, MealAnalysisEngine } from '../../services/mealAnalysisEngine';
import { FoodItem } from '../../data/mealDatabase';
import { AgeGroup } from '../../data/rdaData';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Download, AlertCircle, Lightbulb, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export const MealAnalyzer: React.FC = () => {
    const { i18n } = useTranslation();
    const isAr = i18n.language === 'ar';

    const [result, setResult] = useState<AnalysisResult | null>(null);

    const handleAnalyze = (items: { food: FoodItem; quantity: number }[], ageGroup: AgeGroup) => {
        const analysis = MealAnalysisEngine.generateAnalysis(items, ageGroup);
        setResult(analysis);
    };

    return (
        <div className={`space-y-8 pb-12 ${isAr ? 'text-right' : 'text-left'}`} dir={isAr ? 'rtl' : 'ltr'}>
            <header className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">
                    {isAr ? 'محلل الوجبات الذكي' : 'Smart Meal Analyzer'}
                </h2>
                <p className="text-muted-foreground max-w-2xl">
                    {isAr
                        ? 'أداة بحثية متقدمة لتقييم كفاية المغذيات وسلامة الغذاء بناءً على معايير منظمة الصحة العالمية (WHO) ومنظمة الأغذية والزراعة (FAO).'
                        : 'Advanced research-grade tool for assessing nutrient adequacy and food safety based on WHO/FAO standards.'}
                </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Input Section */}
                <div className="lg:col-span-1">
                    <MealInputForm onAnalyze={handleAnalyze} />
                </div>

                {/* Dashboard Section */}
                <div className="lg:col-span-2">
                    <AnimatePresence mode="wait">
                        {result ? (
                            <motion.div
                                key="results"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="space-y-8"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Card className="p-6 space-y-4">
                                        <h3 className="font-semibold text-lg">{isAr ? 'عجلة المغذيات' : 'Nutritional Radar'}</h3>
                                        <NutritionalRadar adequacy={result.adequacy} />
                                    </Card>

                                    <SafetyDashboard
                                        score={result.safetyScore}
                                        distribution={result.novaDistribution}
                                        riskLevel={result.riskLevel}
                                        scoreBreakdown={result.scoreBreakdown}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Card className="p-6">
                                        <AdequacyBars adequacy={result.adequacy} />
                                    </Card>

                                    <div className="space-y-6">
                                        {/* Warnings */}
                                        {result.warnings.length > 0 && (
                                            <div className="bg-red-50 border border-red-100 rounded-xl p-4 space-y-2 text-red-900">
                                                <div className="flex items-center gap-2 font-semibold text-sm">
                                                    <AlertCircle className="w-4 h-4" />
                                                    {isAr ? 'تنبيهات غذائية' : 'Nutritional Alerts'}
                                                </div>
                                                <ul className={`text-xs space-y-1 list-disc list-inside opacity-80 ${isAr ? 'pr-0 pl-4' : ''}`}>
                                                    {result.warnings.map((w, i) => (
                                                        <li key={i}>{isAr ? w.ar : w.en}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {/* Recommendations */}
                                        <div className="bg-primary/5 border border-primary/10 rounded-xl p-4 space-y-3">
                                            <div className="flex items-center gap-2 font-semibold text-sm text-primary">
                                                <Lightbulb className="w-4 h-4" />
                                                {isAr ? 'توصيات ذكية' : 'Smart Recommendations'}
                                            </div>
                                            <div className="space-y-3">
                                                {result.recommendations.map((rec, i) => (
                                                    <p key={i} className="text-xs leading-relaxed opacity-80">
                                                        {isAr ? rec.ar : rec.en}
                                                    </p>
                                                ))}
                                            </div>
                                        </div>

                                        <Button
                                            variant="outline"
                                            className="w-full gap-2"
                                            onClick={() => {
                                                alert(isAr ? 'يتم الآن إنشاء التقرير البحثي... (محاكاة)' : 'Generating research report... (Simulation)');
                                            }}
                                        >
                                            <Download className="w-4 h-4" />
                                            {isAr ? 'تحميل التقرير البحثي (PDF)' : 'Download Research Report (PDF)'}
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="h-full flex flex-col items-center justify-center text-center p-12 space-y-4 opacity-50"
                            >
                                <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center">
                                    <Search className="w-10 h-10" />
                                </div>
                                <div>
                                    <h3 className="font-medium text-lg">
                                        {isAr ? 'بانتظار المدخلات' : 'Awaiting Input'}
                                    </h3>
                                    <p className="text-sm max-w-xs">
                                        {isAr
                                            ? 'أضف أصناف الطعام وحدد الفئة العمرية لبدء التحليل العلمي.'
                                            : 'Add food items and select an age group to start the scientific analysis.'}
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};
