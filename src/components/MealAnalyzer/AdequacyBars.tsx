import React from 'react';
import { useTranslation } from 'react-i18next';

interface AdequacyBarsProps {
    adequacy: Record<string, number>;
}

export const AdequacyBars: React.FC<AdequacyBarsProps> = ({ adequacy }) => {
    const { t, i18n } = useTranslation();
    const isAr = i18n.language === 'ar';

    const items = [
        { label: t('assessment.nutrients.iron'), key: 'iron', unit: 'mg' },
        { label: t('assessment.nutrients.calcium'), key: 'calcium', unit: 'mg' },
        { label: t('assessment.nutrients.zinc'), key: 'zinc', unit: 'mg' },
        { label: t('assessment.nutrients.vitD'), key: 'vitD', unit: 'mcg' },
        { label: t('assessment.nutrients.folate'), key: 'folate', unit: 'mcg' },
    ];

    const getProgressColor = (value: number) => {
        if (value < 50) return 'bg-destructive';
        if (value < 90) return 'bg-yellow-500';
        if (value <= 110) return 'bg-green-500';
        return 'bg-blue-500';
    };

    return (
        <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                {isAr ? 'كفاية العناصر الغذائية' : 'Micronutrient Adequacy'}
            </h4>
            {items.map((item) => (
                <div key={item.key} className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                        <span className="font-medium">{item.label}</span>
                        <span className="opacity-70">{Math.round(adequacy[item.key] || 0)}%</span>
                    </div>
                    <div className="relative h-2 w-full overflow-hidden rounded-full bg-secondary">
                        <div
                            className={`h-full transition-all ${getProgressColor(adequacy[item.key] || 0)}`}
                            style={{ width: `${Math.min(adequacy[item.key] || 0, 100)}%` }}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};
