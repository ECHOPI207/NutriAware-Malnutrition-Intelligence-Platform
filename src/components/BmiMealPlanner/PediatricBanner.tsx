import React from 'react';
import { AlertTriangle, ShieldAlert } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface PediatricBannerProps {
    ageYears: number;
}

const PediatricBanner: React.FC<PediatricBannerProps> = ({ ageYears }) => {
    const { language } = useLanguage();
    const isRTL = language === 'ar';

    if (ageYears >= 18) return null;

    return (
        <div
            role="alert"
            aria-live="polite"
            className="w-full p-4 rounded-2xl border-2 border-amber-400/40 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/20 dark:border-amber-500/30"
            dir={isRTL ? 'rtl' : 'ltr'}
        >
            <div className="flex items-start gap-3">
                <div className="shrink-0 mt-0.5 w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center">
                    <ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div className="flex-1">
                    <h4 className="font-bold text-amber-800 dark:text-amber-300 text-sm mb-1">
                        {isRTL ? '⚕️ وضع مراقبة النمو' : '⚕️ Growth Monitoring Mode'}
                    </h4>
                    <p className="text-xs leading-relaxed text-amber-700 dark:text-amber-400/80">
                        {isRTL
                            ? 'هذه الخطة تدعم النمو الصحي وليست مخصصة للحميات المقيدة. يُنصح باستشارة طبيب أطفال للحالات الطبية.'
                            : 'This plan supports healthy growth and is not intended for restrictive dieting. Pediatric consultation recommended for medical conditions.'}
                    </p>

                    {ageYears < 4 && (
                        <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-red-600 dark:text-red-400">
                            <AlertTriangle className="w-4 h-4 shrink-0" />
                            <span>{isRTL ? '⚠️ تحذير: خطر الاختناق — تجنبي المكسرات الكاملة والقطع الصلبة' : '⚠️ Choking Hazard Warning — Avoid whole nuts, hard pieces, whole grapes'}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PediatricBanner;
