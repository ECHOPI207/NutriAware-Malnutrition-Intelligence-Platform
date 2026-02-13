import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface BmiResultCardProps {
    bmiValue: number | null;
    statusLabel: string;
    isChild: boolean;
    percentileLabel?: string;
    ageCategory: string;
}

const BmiResultCard: React.FC<BmiResultCardProps> = ({ bmiValue, statusLabel, isChild, percentileLabel, ageCategory }) => {
    const { language } = useLanguage();
    const isRTL = language === 'ar';

    const getCategoryStyle = () => {
        const s = statusLabel.toLowerCase();
        if (s.includes('underweight') || s.includes('نحافة') || s.includes('نقص'))
            return { bg: 'bg-blue-600', ring: 'ring-blue-400', text: 'text-blue-100', badge: 'bg-blue-500/20 text-blue-200', bar: 'bg-blue-500', barWidth: '20%' };
        if (s.includes('healthy') || s.includes('normal') || s.includes('طبيعي') || s.includes('صحي'))
            return { bg: 'bg-emerald-600', ring: 'ring-emerald-400', text: 'text-emerald-100', badge: 'bg-emerald-500/20 text-emerald-200', bar: 'bg-emerald-500', barWidth: '50%' };
        if (s.includes('overweight') || s.includes('زيادة'))
            return { bg: 'bg-orange-600', ring: 'ring-orange-400', text: 'text-orange-100', badge: 'bg-orange-500/20 text-orange-200', bar: 'bg-orange-500', barWidth: '75%' };
        if (s.includes('obese') || s.includes('سمنة'))
            return { bg: 'bg-red-600', ring: 'ring-red-400', text: 'text-red-100', badge: 'bg-red-500/20 text-red-200', bar: 'bg-red-500', barWidth: '95%' };
        return { bg: 'bg-slate-600', ring: 'ring-slate-400', text: 'text-slate-100', badge: 'bg-slate-500/20 text-slate-200', bar: 'bg-slate-500', barWidth: '50%' };
    };

    const style = getCategoryStyle();

    return (
        <div
            role="region"
            aria-label={isRTL ? 'نتيجة مؤشر كتلة الجسم' : 'BMI Result'}
            className={`relative overflow-hidden rounded-2xl ${style.bg} ring-2 ${style.ring} shadow-lg p-5`}
        >
            {/* BMI Value */}
            {bmiValue !== null && bmiValue > 0 && (
                <div className="text-center mb-3">
                    <p className={`text-xs font-medium ${style.text} opacity-80 mb-1`}>
                        {isRTL ? 'مؤشر كتلة الجسم' : 'Body Mass Index'}
                    </p>
                    <div
                        className="text-5xl font-black text-white tracking-tight"
                        aria-label={`BMI: ${bmiValue.toFixed(1)}`}
                    >
                        {bmiValue.toFixed(1)}
                    </div>
                </div>
            )}

            {/* Category Badge */}
            <div className="flex justify-center mb-3">
                <span className={`inline-flex items-center px-4 py-1.5 rounded-full ${style.badge} text-sm font-bold`}>
                    {statusLabel}
                </span>
            </div>

            {/* Progress Bar */}
            {bmiValue !== null && bmiValue > 0 && (
                <div className="mb-3">
                    <div className="relative h-2.5 bg-white/20 rounded-full overflow-hidden">
                        {/* Segments */}
                        <div className="absolute inset-0 flex">
                            <div className="w-[25%] bg-blue-400/30 border-r border-white/20" />
                            <div className="w-[25%] bg-emerald-400/30 border-r border-white/20" />
                            <div className="w-[25%] bg-orange-400/30 border-r border-white/20" />
                            <div className="w-[25%] bg-red-400/30" />
                        </div>
                        {/* Indicator */}
                        <div
                            className="absolute top-0 h-full w-1.5 bg-white rounded-full shadow-lg transition-all duration-700"
                            style={{ left: `clamp(0%, ${((Math.min(bmiValue, 40) - 10) / 30) * 100}%, 98%)` }}
                        />
                    </div>
                    <div className="flex justify-between text-[10px] text-white/60 mt-1 px-0.5">
                        <span>18.5</span>
                        <span>25</span>
                        <span>30</span>
                    </div>
                </div>
            )}

            {/* Growth Percentile Bar (children) */}
            {isChild && percentileLabel && (
                <div className="mt-2 text-center">
                    <p className={`text-xs font-medium ${style.text} opacity-80 mb-1`}>
                        {isRTL ? 'المئوية للنمو' : 'Growth Percentile'}
                    </p>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full bg-white/15 text-white text-xs font-semibold`}>
                        {percentileLabel}
                    </span>
                </div>
            )}

            {/* Age Category */}
            <div className="mt-3 text-center">
                <span className={`text-[11px] ${style.text} opacity-60`}>
                    {isRTL ? 'الفئة العمرية: ' : 'Age Category: '}{ageCategory}
                </span>
            </div>

            {/* BMI Disclaimer Tooltip */}
            <div className="mt-3 pt-2 border-t border-white/15">
                <p className={`text-[10px] ${style.text} opacity-50 ${isRTL ? 'text-right' : 'text-left'} leading-relaxed`}>
                    {isRTL
                        ? 'مؤشر كتلة الجسم أداة فحص ولا يقيس دهون الجسم مباشرة.'
                        : 'BMI is a screening tool and does not measure body fat directly.'}
                </p>
            </div>
        </div>
    );
};

export default BmiResultCard;
