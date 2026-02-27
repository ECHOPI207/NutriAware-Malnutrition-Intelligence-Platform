import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { useTranslation } from 'react-i18next';

interface NutritionalRadarProps {
    adequacy: Record<string, number>;
}

export const NutritionalRadar: React.FC<NutritionalRadarProps> = ({ adequacy }) => {
    const { t } = useTranslation();

    const data = [
        { subject: t('assessment.nutrients.energy'), A: Math.min(adequacy.energy, 120), fullMark: 100 },
        { subject: t('assessment.nutrients.protein'), A: Math.min(adequacy.protein, 120), fullMark: 100 },
        { subject: t('assessment.nutrients.iron'), A: Math.min(adequacy.iron, 120), fullMark: 100 },
        { subject: t('assessment.nutrients.calcium'), A: Math.min(adequacy.calcium, 120), fullMark: 100 },
        { subject: t('assessment.nutrients.zinc'), A: Math.min(adequacy.zinc, 120), fullMark: 100 },
        { subject: t('assessment.nutrients.vitA'), A: Math.min(adequacy.vitA, 120), fullMark: 100 },
    ];

    return (
        <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12, fill: '#64748b' }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar
                        name="Adequacy %"
                        dataKey="A"
                        stroke="#0ea5e9"
                        fill="#0ea5e9"
                        fillOpacity={0.6}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'white',
                            borderRadius: '8px',
                            border: '1px solid #e2e8f0',
                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                        }}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
};
