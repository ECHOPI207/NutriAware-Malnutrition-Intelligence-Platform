import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface MacroChartProps {
    calories: number;
    proteinGrams: number;
    fatGrams: number;
    carbGrams: number;
    proteinPercent: number;
    fatPercent: number;
    carbPercent: number;
    fiberTarget: number;
    calciumMg: number;
    ironMg: number;
}

const MacroChart: React.FC<MacroChartProps> = ({
    calories, proteinGrams, fatGrams, carbGrams,
    proteinPercent, fatPercent, carbPercent,
    fiberTarget, calciumMg, ironMg
}) => {
    const { language } = useLanguage();
    const isRTL = language === 'ar';

    const macros = [
        { label: isRTL ? 'بروتين' : 'Protein', grams: proteinGrams, percent: proteinPercent, color: 'bg-blue-500', lightBg: 'bg-blue-50 dark:bg-blue-950/30', border: 'border-blue-200 dark:border-blue-800', textColor: 'text-blue-700 dark:text-blue-300', unit: 'g' },
        { label: isRTL ? 'دهون' : 'Fat', grams: fatGrams, percent: fatPercent, color: 'bg-amber-500', lightBg: 'bg-amber-50 dark:bg-amber-950/30', border: 'border-amber-200 dark:border-amber-800', textColor: 'text-amber-700 dark:text-amber-300', unit: 'g' },
        { label: isRTL ? 'كربوهيدرات' : 'Carbs', grams: carbGrams, percent: carbPercent, color: 'bg-emerald-500', lightBg: 'bg-emerald-50 dark:bg-emerald-950/30', border: 'border-emerald-200 dark:border-emerald-800', textColor: 'text-emerald-700 dark:text-emerald-300', unit: 'g' },
    ];

    const microNutrients = [
        { label: isRTL ? 'ألياف' : 'Fiber', value: fiberTarget, unit: 'g', icon: '🌾' },
        { label: isRTL ? 'كالسيوم' : 'Calcium', value: calciumMg, unit: 'mg', icon: '🦴' },
        { label: isRTL ? 'حديد' : 'Iron', value: ironMg, unit: 'mg', icon: '🩸' },
    ];

    if (!calories) return null;

    return (
        <div className="space-y-4" dir={isRTL ? 'rtl' : 'ltr'}>
            {/* Calorie Display */}
            <div className="text-center p-4 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
                <p className="text-xs font-medium text-muted-foreground mb-1">
                    {isRTL ? 'السعرات المقدرة' : 'Estimated Energy'}
                </p>
                <div className="text-3xl font-black text-primary tracking-tight">
                    {calories.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">{isRTL ? 'سعرة حرارية / يوم' : 'kcal / day'}</p>
            </div>

            {/* Macro Bars */}
            <div className="grid grid-cols-3 gap-2">
                {macros.map((m) => (
                    <div key={m.label} className={`p-3 rounded-xl border ${m.border} ${m.lightBg} text-center`}>
                        <p className={`text-xs font-semibold ${m.textColor} mb-1`}>{m.label}</p>
                        <p className={`text-lg font-bold ${m.textColor}`}>{m.grams}{m.unit}</p>
                        <div className="mt-1.5 h-1.5 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                            <div className={`h-full ${m.color} rounded-full transition-all duration-500`} style={{ width: `${m.percent}%` }} />
                        </div>
                        <p className={`text-[10px] mt-1 ${m.textColor} opacity-70`}>{m.percent}%</p>
                    </div>
                ))}
            </div>

            {/* Micro Nutrients */}
            <div className="grid grid-cols-3 gap-2">
                {microNutrients.filter(m => m.value > 0).map((m) => (
                    <div key={m.label} className="p-2.5 rounded-xl border border-border/50 bg-muted/30 text-center">
                        <span className="text-lg">{m.icon}</span>
                        <p className="text-xs font-medium text-muted-foreground mt-0.5">{m.label}</p>
                        <p className="text-sm font-bold text-foreground">{m.value}{m.unit}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MacroChart;
