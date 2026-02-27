import { describe, it, expect } from 'vitest';
import { MealAnalysisEngine } from '../src/services/mealAnalysisEngine';

describe('MealAnalysisEngine', () => {
    it('caps the composite score at 95% due to realism dampener', () => {
        // Mock 100% adequacy
        const adequacy = {
            energy: 100, protein: 100, fiber: 100, iron: 100, calcium: 100, zinc: 100, iodine: 100, vitA: 100, vitD: 100, vitC: 100, vitB12: 100, folate: 100
        };
        // Mock 100% NOVA 1 (unprocessed) foods
        const distribution = { 1: 100, 2: 0, 3: 0, 4: 0 };
        // No penalty items
        const items: any[] = [];

        const result = MealAnalysisEngine.calculateCompositeScore(adequacy, distribution, items);

        expect(result.finalScore).toBe(95); // 100 * 0.95 = 95
        expect(result.breakdown.realismMultiplier).toBe(0.95);
        expect(result.breakdown.baseScore).toBe(100);
    });

    it('applies penalties for ultra-processed foods (NOVA 4) exceeding 15%', () => {
        const adequacy = { energy: 100, protein: 100 }; // 100% adequacy -> 50 score
        const distribution = { 1: 50, 2: 0, 3: 0, 4: 50 }; // 50% NOVA 4
        // Base Nova score = (50 * 0.5) + (50 * 0) = 25
        // Total Base = 75

        // 50% NOVA 4 is > 15%, so penalty = (50 - 15) * 0.5 = 35 * 0.5 = 17.5
        // Penalty is capped at 15. So penalty = 15.
        // Raw score = 75 - 15 = 60
        // Final score = 60 * 0.95 = 57

        const items = [
            { food: { novaGroup: 4, category: 'mixed', budget: 'low', micronutrients: { iron: 1 } }, quantity: 100 }
        ] as any[];

        const result = MealAnalysisEngine.calculateCompositeScore(adequacy, distribution, items);

        expect(result.breakdown.novaPenalty).toBe(15);

        // It should also apply sodium/sugar penalty because of novaGroup 4 presence
        expect(result.breakdown.sodiumSugarPenalty).toBe(5);

        // Updated Raw Score = 75 - 15 - 5 = 55
        // Final = floor(55 * 0.95) = 52
        expect(result.finalScore).toBe(52);
    });

    it('applies missing data penalty when missing micronutrients completely', () => {
        const adequacy = { energy: 100 };
        const distribution = { 1: 100, 2: 0, 3: 0, 4: 0 };

        const items = [
            // Mocking a food item with all zero micronutrients
            { food: { novaGroup: 1, category: 'mixed', budget: 'low', micronutrients: { iron: 0, calcium: 0, zinc: 0, iodine: 0, vitA: 0, vitD: 0, vitC: 0, vitB12: 0, folate: 0 } }, quantity: 100 }
        ] as any[];

        const result = MealAnalysisEngine.calculateCompositeScore(adequacy, distribution, items);

        expect(result.breakdown.missingDataPenalty).toBe(5);
    });
});
