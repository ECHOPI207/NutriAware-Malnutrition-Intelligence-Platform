export interface RDAValues {
    energy: { min: number; max: number; unit: 'kcal' };
    protein: { value: number; unit: 'g' };
    carbs: { percent: { min: number; max: number } };
    fat: { percent: { min: number; max: number } };
    fiber: { value: number; unit: 'g' };
    iron: { value: number; unit: 'mg' };
    calcium: { value: number; unit: 'mg' };
    zinc: { value: number; unit: 'mg' };
    iodine: { value: number; unit: 'mcg' };
    vitA: { value: number; unit: 'mcg' };
    vitD: { value: number; unit: 'mcg' };
    vitC: { value: number; unit: 'mg' };
    vitB12: { value: number; unit: 'mcg' };
    folate: { value: number; unit: 'mcg' };
}

export type AgeGroup = '6-12m' | '1-3y' | '4-6y' | '7-12y' | 'adolescents';

export const AGE_GROUP_LABELS: Record<AgeGroup, { en: string; ar: string }> = {
    '6-12m': { en: '6-12 Months', ar: '6-12 شهر' },
    '1-3y': { en: '1-3 Years', ar: '1-3 سنوات' },
    '4-6y': { en: '4-6 Years', ar: '4-6 سنوات' },
    '7-12y': { en: '7-12 Years', ar: '7-12 سنة' },
    'adolescents': { en: 'Adolescents', ar: 'المراهقين (13-18 سنة)' },
};

export const PEDIATRIC_RDA: Record<AgeGroup, RDAValues> = {
    '6-12m': {
        energy: { min: 600, max: 900, unit: 'kcal' },
        protein: { value: 11, unit: 'g' },
        carbs: { percent: { min: 45, max: 65 } },
        fat: { percent: { min: 30, max: 40 } },
        fiber: { value: 5, unit: 'g' }, // Estimated
        iron: { value: 11, unit: 'mg' },
        calcium: { value: 260, unit: 'mg' },
        zinc: { value: 3, unit: 'mg' },
        iodine: { value: 110, unit: 'mcg' },
        vitA: { value: 500, unit: 'mcg' },
        vitD: { value: 10, unit: 'mcg' },
        vitC: { value: 50, unit: 'mg' },
        vitB12: { value: 0.5, unit: 'mcg' },
        folate: { value: 80, unit: 'mcg' },
    },
    '1-3y': {
        energy: { min: 1000, max: 1400, unit: 'kcal' },
        protein: { value: 13, unit: 'g' },
        carbs: { percent: { min: 45, max: 65 } },
        fat: { percent: { min: 30, max: 40 } },
        fiber: { value: 19, unit: 'g' },
        iron: { value: 7, unit: 'mg' },
        calcium: { value: 700, unit: 'mg' },
        zinc: { value: 3, unit: 'mg' },
        iodine: { value: 90, unit: 'mcg' },
        vitA: { value: 300, unit: 'mcg' },
        vitD: { value: 15, unit: 'mcg' },
        vitC: { value: 15, unit: 'mg' },
        vitB12: { value: 0.9, unit: 'mcg' },
        folate: { value: 150, unit: 'mcg' },
    },
    '4-6y': {
        energy: { min: 1200, max: 1800, unit: 'kcal' },
        protein: { value: 19, unit: 'g' },
        carbs: { percent: { min: 45, max: 65 } },
        fat: { percent: { min: 25, max: 35 } },
        fiber: { value: 25, unit: 'g' },
        iron: { value: 10, unit: 'mg' },
        calcium: { value: 1000, unit: 'mg' },
        zinc: { value: 5, unit: 'mg' },
        iodine: { value: 90, unit: 'mcg' },
        vitA: { value: 400, unit: 'mcg' },
        vitD: { value: 15, unit: 'mcg' },
        vitC: { value: 25, unit: 'mg' },
        vitB12: { value: 1.2, unit: 'mcg' },
        folate: { value: 200, unit: 'mcg' },
    },
    '7-12y': {
        energy: { min: 1600, max: 2200, unit: 'kcal' },
        protein: { value: 34, unit: 'g' },
        carbs: { percent: { min: 45, max: 65 } },
        fat: { percent: { min: 25, max: 35 } },
        fiber: { value: 31, unit: 'g' },
        iron: { value: 8, unit: 'mg' },
        calcium: { value: 1300, unit: 'mg' },
        zinc: { value: 8, unit: 'mg' },
        iodine: { value: 120, unit: 'mcg' },
        vitA: { value: 600, unit: 'mcg' },
        vitD: { value: 15, unit: 'mcg' },
        vitC: { value: 45, unit: 'mg' },
        vitB12: { value: 1.8, unit: 'mcg' },
        folate: { value: 300, unit: 'mcg' },
    },
    'adolescents': {
        energy: { min: 2200, max: 3200, unit: 'kcal' },
        protein: { value: 52, unit: 'g' },
        carbs: { percent: { min: 45, max: 65 } },
        fat: { percent: { min: 25, max: 35 } },
        fiber: { value: 38, unit: 'g' },
        iron: { value: 15, unit: 'mg' },
        calcium: { value: 1300, unit: 'mg' },
        zinc: { value: 11, unit: 'mg' },
        iodine: { value: 150, unit: 'mcg' },
        vitA: { value: 900, unit: 'mcg' },
        vitD: { value: 15, unit: 'mcg' },
        vitC: { value: 75, unit: 'mg' },
        vitB12: { value: 2.4, unit: 'mcg' },
        folate: { value: 400, unit: 'mcg' },
    },
};
