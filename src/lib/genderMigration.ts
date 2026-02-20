import { type EvaluationData } from '@/services/evaluation';

export function validateGenderLogic(
    relationship: string,
    guardianGender: string
): { isValid: boolean; error?: string } {
    const normRel = relationship?.trim().toLowerCase();
    const normGender = guardianGender?.trim().toLowerCase();

    // If no relationship or gender is provided, we can't strictly validate the link
    if (!normRel || !normGender) {
        return { isValid: false, error: 'Missing relationship or guardian gender' };
    }

    if (normRel === 'أب' || normRel === 'father') {
        if (normGender !== 'male' && normGender !== 'ذكر') {
            return { isValid: false, error: 'Father must be male' };
        }
    }

    if (normRel === 'أم' || normRel === 'mother') {
        if (normGender !== 'female' && normGender !== 'أنثى') {
            return { isValid: false, error: 'Mother must be female' };
        }
    }

    // 'other' allows both
    return { isValid: true };
}

export function migrateEvaluationGender(oldData: any): any {
    const newData = { ...oldData };

    // Ensure healthIndicators exists
    if (!newData.healthIndicators) {
        newData.healthIndicators = {};
    }

    const existingGender = newData.healthIndicators.gender;
    const relationship = newData.demographics?.relationship;

    // 1. Map old gender to childGender
    if (existingGender !== undefined) {
        newData.healthIndicators.childGender = existingGender;
        delete newData.healthIndicators.gender;
    } else if (!newData.healthIndicators.childGender) {
        // Fallback if completely missing
        newData.healthIndicators.childGender = 'unknown';
    }

    // 2. Derive guardianGender from relationship
    let derivedGuardianGender = 'unknown';
    const normRel = relationship?.trim().toLowerCase();

    if (normRel === 'أب' || normRel === 'father') {
        derivedGuardianGender = 'male';
    } else if (normRel === 'أم' || normRel === 'mother') {
        derivedGuardianGender = 'female';
    } else if (normRel === 'أخرى' || normRel === 'other') {
        // We cannot infer, keep unknown. Will be flagged by validation if needed.
        derivedGuardianGender = 'unknown';
    }

    newData.healthIndicators.guardianGender = derivedGuardianGender;

    return newData;
}
