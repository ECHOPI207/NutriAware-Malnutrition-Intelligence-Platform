import { FoodItem, Micronutrients } from '../data/mealDatabase';
import { AgeGroup, PEDIATRIC_RDA } from '../data/rdaData';

export interface AnalysisResult {
    totalNutrients: MacroMicro;
    adequacy: Record<string, number>; // Nutrient -> Percentage of RDA
    safetyScore: number;
    scoreBreakdown: {
        baseScore: number;
        adequacyScore: number;
        novaScore: number;
        novaPenalty: number;
        sodiumSugarPenalty: number;
        missingDataPenalty: number;
        realismMultiplier: number;
    };
    novaDistribution: Record<number, number>; // Group -> Percentage
    riskLevel: 'low' | 'moderate' | 'high';
    warnings: { en: string; ar: string }[];
    recommendations: { en: string; ar: string }[];
}

interface MacroMicro {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
    micros: Micronutrients;
}

export class MealAnalysisEngine {
    static calculateTotalNutrients(items: { food: FoodItem; quantity: number }[]): MacroMicro {
        const total: MacroMicro = {
            calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0,
            micros: { iron: 0, calcium: 0, zinc: 0, iodine: 0, vitA: 0, vitD: 0, vitC: 0, vitB12: 0, folate: 0 }
        };

        items.forEach(({ food, quantity }) => {
            const factor = quantity / food.portion.grams;
            total.calories += food.calories * factor;
            total.protein += food.protein * factor;
            total.carbs += food.carbs * factor;
            total.fat += food.fat * factor;
            total.fiber += food.fiber * factor;

            (Object.keys(total.micros) as (keyof Micronutrients)[]).forEach(key => {
                total.micros[key] += (food.micronutrients[key] || 0) * factor;
            });
        });

        return total;
    }

    static analyzeAdequacy(nutrients: MacroMicro, ageGroup: AgeGroup): Record<string, number> {
        const rda = PEDIATRIC_RDA[ageGroup];
        const adequacy: Record<string, number> = {};

        adequacy.energy = (nutrients.calories / rda.energy.max) * 100;
        adequacy.protein = (nutrients.protein / rda.protein.value) * 100;
        adequacy.fiber = (nutrients.fiber / rda.fiber.value) * 100;

        (Object.keys(nutrients.micros) as (keyof Micronutrients)[]).forEach(key => {
            const rdaValue = rda[key];
            if (rdaValue && 'value' in rdaValue) {
                adequacy[key] = (nutrients.micros[key] / rdaValue.value) * 100;
            } else {
                adequacy[key] = 0;
            }
        });

        return adequacy;
    }

    static calculateSafetyScore(items: { food: FoodItem; quantity: number }[]): { score: number; distribution: Record<number, number>; isUPF: boolean } {
        let totalGrams = 0;
        const weights: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0 };

        items.forEach(({ food, quantity }) => {
            totalGrams += quantity;
            weights[food.novaGroup] += quantity;
        });

        const distribution: Record<number, number> = {};
        Object.keys(weights).forEach(group => {
            distribution[Number(group)] = (weights[Number(group)] / totalGrams) * 100;
        });

        // Safety Score Calculation:
        // NOVA 1: 100 pts, NOVA 2: 80 pts, NOVA 3: 50 pts, NOVA 4: 0 pts
        let score = (distribution[1] * 1.0) + (distribution[2] * 0.8) + (distribution[3] * 0.5) + (distribution[4] * 0.0);

        return {
            score: Math.round(score),
            distribution,
            isUPF: distribution[4] > 10 // Flag if more than 10% is ultra-processed
        };
    }

    static calculateCompositeScore(adequacy: Record<string, number>, distribution: Record<number, number>, items: { food: FoodItem; quantity: number }[]) {
        // 1. Nutrient Adequacy Layer (up to 50 points)
        const adequacyValues = Object.values(adequacy).map(v => Math.min(v, 100));
        const avgAdequacy = adequacyValues.reduce((a, b) => a + b, 0) / (adequacyValues.length || 1);
        const adequacyScore = (avgAdequacy / 100) * 50;

        // 2. Processing Risk Layer (NOVA) (up to 50 points)
        const novaScore = ((distribution[1] || 0) * 0.5) + ((distribution[2] || 0) * 0.4) + ((distribution[3] || 0) * 0.2) + ((distribution[4] || 0) * 0);

        let baseScore = adequacyScore + novaScore;

        // 3. Safety Penalty Layer
        // Excessive processing penalty > 15% NOVA 4
        const novaPenalty = (distribution[4] > 15) ? Math.min(15, (distribution[4] - 15) * 0.5) : 0;

        // Mocking Sodium and Sugar penalties for Ultra-processed and fast foods
        let sodiumSugarPenalty = 0;
        const hasHighSodiumSugar = items.some(i => i.food.novaGroup === 4 || i.food.category === 'mixed' && i.food.budget === 'high');
        if (hasHighSodiumSugar) {
            sodiumSugarPenalty = 5;
        }

        // Missing Data Uncertainty Penalty
        let missingDataPenalty = 0;
        const hasMissingMicros = items.some(i => Object.values(i.food.micronutrients).every(v => v === 0));
        if (hasMissingMicros) {
            missingDataPenalty = 5;
        }

        let rawScore = baseScore - novaPenalty - sodiumSugarPenalty - missingDataPenalty;
        rawScore = Math.max(0, Math.min(100, rawScore));

        // 4. Realism Dampening Factor (Multiplier)
        // Cap max score at 95% to maintain scientific rigor
        const realismMultiplier = 0.95;
        const finalScore = Math.floor(rawScore * realismMultiplier);

        return {
            finalScore,
            breakdown: {
                baseScore: Math.round(baseScore),
                adequacyScore: Math.round(adequacyScore),
                novaScore: Math.round(novaScore),
                novaPenalty: Math.round(novaPenalty),
                sodiumSugarPenalty,
                missingDataPenalty,
                realismMultiplier
            }
        };
    }

    static generateAnalysis(items: { food: FoodItem; quantity: number }[], ageGroup: AgeGroup): AnalysisResult {
        const totalNutrients = this.calculateTotalNutrients(items);
        const adequacy = this.analyzeAdequacy(totalNutrients, ageGroup);
        const safetyTemp = this.calculateSafetyScore(items);

        const composite = this.calculateCompositeScore(adequacy, safetyTemp.distribution, items);

        const warnings: { en: string; ar: string }[] = [];
        const recommendations: { en: string; ar: string }[] = [];

        // Check for deficiencies (< 70% RDA)
        if (adequacy.iron < 70) {
            warnings.push({
                en: "Low Iron intake detected.",
                ar: "تم اكتشاف نقص في تناول الحديد."
            });
            recommendations.push({
                en: "Consider adding iron-rich foods like lentils, spinach, or lean meats.",
                ar: "يُنصح بإضافة أطعمة غنية بالحديد مثل العدس، السبانخ، أو اللحوم الحمراء."
            });
        }
        if (adequacy.calcium < 70) {
            warnings.push({
                en: "Low Calcium intake detected.",
                ar: "تم اكتشاف نقص في تناول الكالسيوم."
            });
            recommendations.push({
                en: "Increase dairy intake or calcium-fortified plant milks.",
                ar: "يُنصح بزيادة تناول الألبان أو بدائلها المدعمة بالكالسيوم."
            });
        }

        // UPF Warnings
        if (safetyTemp.isUPF) {
            warnings.push({
                en: "High proportion of Ultra-Processed Foods (NOVA 4).",
                ar: "نسبة عالية من الأطعمة فائقة المعالجة (نوفا 4)."
            });
            recommendations.push({
                en: "Replace ultra-processed snacks with whole fruits or nuts.",
                ar: "استبدل الوجبات الخفيفة المعالجة بالفواكه الطازجة أو المكسرات."
            });
        }

        if (composite.breakdown.sodiumSugarPenalty > 0) {
            warnings.push({
                en: "Potential high sodium or added sugar detected.",
                ar: "احتمال وجود نسبة عالية من الصوديوم أو السكر المضاف."
            });
        }

        let risk: 'low' | 'moderate' | 'high' = 'low';
        if (composite.finalScore < 60 || Object.values(adequacy).some(v => v < 50)) risk = 'high';
        else if (composite.finalScore < 85 || Object.values(adequacy).some(v => v < 80)) risk = 'moderate';

        return {
            totalNutrients,
            adequacy,
            safetyScore: composite.finalScore,
            scoreBreakdown: composite.breakdown,
            novaDistribution: safetyTemp.distribution,
            riskLevel: risk,
            warnings,
            recommendations
        };
    }
}
