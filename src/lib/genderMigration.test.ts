import { describe, it, expect } from 'vitest';
import { validateGenderLogic, migrateEvaluationGender } from './genderMigration';

describe('Gender Data Migration', () => {

    describe('validateGenderLogic', () => {
        it('validates father must be male', () => {
            expect(validateGenderLogic('أب', 'ذكر').isValid).toBe(true);
            expect(validateGenderLogic('أب', 'male').isValid).toBe(true);
            expect(validateGenderLogic('father', 'male').isValid).toBe(true);
            expect(validateGenderLogic('أب', 'أنثى').isValid).toBe(false);
            expect(validateGenderLogic('father', 'female').isValid).toBe(false);
            expect(validateGenderLogic('أب', 'female').error).toBe('Father must be male');
        });

        it('validates mother must be female', () => {
            expect(validateGenderLogic('أم', 'أنثى').isValid).toBe(true);
            expect(validateGenderLogic('أم', 'female').isValid).toBe(true);
            expect(validateGenderLogic('mother', 'female').isValid).toBe(true);
            expect(validateGenderLogic('أم', 'ذكر').isValid).toBe(false);
            expect(validateGenderLogic('أم', 'male').isValid).toBe(false);
            expect(validateGenderLogic('mother', 'male').error).toBe('Mother must be female');
        });

        it('allows other relationships with both genders', () => {
            expect(validateGenderLogic('أخرى', 'ذكر').isValid).toBe(true);
            expect(validateGenderLogic('other', 'female').isValid).toBe(true);
            expect(validateGenderLogic('جدة', 'female').isValid).toBe(true);
        });

        it('handles missing data', () => {
            expect(validateGenderLogic('', 'male').isValid).toBe(false);
            expect(validateGenderLogic('أب', '').isValid).toBe(false);
        });
    });

    describe('migrateEvaluationGender', () => {
        it('migrates existing gender to childGender and infers guardianGender for father', () => {
            const oldData = {
                demographics: { relationship: 'أب' },
                healthIndicators: { gender: 'female' } // Son was logged incorrectly
            };

            const migrated = migrateEvaluationGender(oldData);
            expect(migrated.healthIndicators.childGender).toBe('female');
            expect(migrated.healthIndicators.guardianGender).toBe('male');
            expect(migrated.healthIndicators.gender).toBeUndefined(); // ensure old field deleted
        });

        it('infers guardianGender for mother', () => {
            const oldData = {
                demographics: { relationship: 'أم' },
                healthIndicators: { gender: 'male' }
            };

            const migrated = migrateEvaluationGender(oldData);
            expect(migrated.healthIndicators.childGender).toBe('male');
            expect(migrated.healthIndicators.guardianGender).toBe('female');
        });

        it('defaults to unknown if relationship is unknown', () => {
            const oldData = {
                demographics: { relationship: 'أخرى' },
                healthIndicators: { gender: 'male' }
            };

            const migrated = migrateEvaluationGender(oldData);
            expect(migrated.healthIndicators.childGender).toBe('male');
            expect(migrated.healthIndicators.guardianGender).toBe('unknown');
        });

        it('handles missing fields gracefully', () => {
            const oldData = {};
            const migrated = migrateEvaluationGender(oldData);
            expect(migrated.healthIndicators.childGender).toBe('unknown');
            expect(migrated.healthIndicators.guardianGender).toBe('unknown');
        });
    });
});
