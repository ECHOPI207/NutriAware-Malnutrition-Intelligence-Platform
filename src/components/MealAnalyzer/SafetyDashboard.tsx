import React from 'react';
import { Card } from '../ui/card';
import { ShieldAlert, ShieldCheck, ShieldClose } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface SafetyDashboardProps {
    score: number;
    distribution: Record<number, number>;
    riskLevel: 'low' | 'moderate' | 'high';
    scoreBreakdown: {
        baseScore: number;
        adequacyScore: number;
        novaScore: number;
        novaPenalty: number;
        sodiumSugarPenalty: number;
        missingDataPenalty: number;
        realismMultiplier: number;
    };
}

export const SafetyDashboard: React.FC<SafetyDashboardProps> = ({ score, distribution, riskLevel, scoreBreakdown }) => {
    const { i18n } = useTranslation();
    const isAr = i18n.language === 'ar';

    const getRiskColor = () => {
        switch (riskLevel) {
            case 'low': return 'text-green-500 bg-green-50';
            case 'moderate': return 'text-yellow-600 bg-yellow-50';
            case 'high': return 'text-destructive bg-red-50';
        }
    };

    const getRiskIcon = () => {
        switch (riskLevel) {
            case 'low': return <ShieldCheck className="w-8 h-8" />;
            case 'moderate': return <ShieldAlert className="w-8 h-8" />;
            case 'high': return <ShieldClose className="w-8 h-8" />;
        }
    };

    const novaLabels: Record<number, { en: string; ar: string }> = {
        1: { en: 'Unprocessed/Minimal', ar: 'غير معالج / معالج بالحد الأدنى' },
        2: { en: 'Processed Ingredients', ar: 'مكونات طبخ معالجة' },
        3: { en: 'Processed Foods', ar: 'أطعمة معالجة' },
        4: { en: 'Ultra-Processed', ar: 'أطعمة فائقة المعالجة' },
    };

    return (
        <div className={`space-y-4 ${isAr ? 'text-right' : 'text-left'}`} dir={isAr ? 'rtl' : 'ltr'}>
            <div className={`p-6 rounded-2xl flex flex-col items-center text-center gap-3 transition-colors ${getRiskColor()}`}>
                {getRiskIcon()}
                <div>
                    <h3 className="text-2xl font-bold">{score}/100</h3>
                    <p className="text-sm font-medium uppercase tracking-wider">
                        {isAr ? 'درجة سلامة الغذاء' : 'Food Safety Score'}
                    </p>
                    {score >= 90 && (
                        <p className="text-xs font-semibold mt-2 text-green-700 bg-green-200/50 px-2 py-1 rounded-md">
                            {isAr ? 'درجة ممتازة — مع مراعاة التنوع الغذائي' : 'Excellent Score — Considering Dietary Diversity'}
                        </p>
                    )}
                </div>
            </div>

            <Card className="p-4 space-y-4">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {isAr ? 'تفاصيل الدرجة' : 'Score Breakdown'}
                </h4>
                <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span>{isAr ? 'درجة الكفاية' : 'Adequacy Score'}</span>
                        <span className="font-medium text-green-600">+{scoreBreakdown.adequacyScore}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>{isAr ? 'درجة معالجة الغذاء' : 'Processing Score'}</span>
                        <span className="font-medium text-green-600">+{scoreBreakdown.novaScore}</span>
                    </div>
                    {scoreBreakdown.novaPenalty > 0 && (
                        <div className="flex justify-between text-destructive">
                            <span>{isAr ? 'خصم المعالجة الفائقة' : 'Ultra-Processed Penalty'}</span>
                            <span className="font-medium">-{scoreBreakdown.novaPenalty}</span>
                        </div>
                    )}
                    {scoreBreakdown.sodiumSugarPenalty > 0 && (
                        <div className="flex justify-between text-destructive">
                            <span>{isAr ? 'خصم الصوديوم/السكر' : 'Sodium/Sugar Penalty'}</span>
                            <span className="font-medium">-{scoreBreakdown.sodiumSugarPenalty}</span>
                        </div>
                    )}
                    {scoreBreakdown.missingDataPenalty > 0 && (
                        <div className="flex justify-between text-yellow-600">
                            <span>{isAr ? 'خصم نقص البيانات' : 'Missing Data Penalty'}</span>
                            <span className="font-medium">-{scoreBreakdown.missingDataPenalty}</span>
                        </div>
                    )}
                    <div className="flex justify-between border-t pt-2">
                        <span className="font-semibold">{isAr ? 'معدل الواقعية' : 'Realism Dampener'}</span>
                        <span className="font-medium text-muted-foreground">x{scoreBreakdown.realismMultiplier}</span>
                    </div>
                </div>
            </Card>

            <Card className="p-4 space-y-4">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {isAr ? 'تصنيف نوفا (NOVA)' : 'NOVA Classification'}
                </h4>
                <div className="space-y-3">
                    {[1, 2, 3, 4].map((group) => (
                        <div key={group} className="space-y-1">
                            <div className="flex justify-between text-[10px] font-medium">
                                <span>{isAr ? novaLabels[group].ar : novaLabels[group].en}</span>
                                <span>{Math.round(distribution[group])}%</span>
                            </div>
                            <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                                <div
                                    className={`h-full ${group === 4 ? 'bg-destructive' : 'bg-primary'}`}
                                    style={{ width: `${distribution[group]}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
};
