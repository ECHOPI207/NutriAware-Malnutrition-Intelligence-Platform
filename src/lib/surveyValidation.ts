// ============================================================
// NutriAware Survey Validation Manager
// Dynamically generates Zod schemas from UnifiedFieldSchema[]
// ============================================================

import { z, type ZodTypeAny } from 'zod';
import type { UnifiedFieldSchema } from './surveyEngine';

// --- Build a Zod schema for a single field ---
export function buildFieldValidator(field: UnifiedFieldSchema): ZodTypeAny {
    const v = field.validation;

    switch (field.fieldType) {
        case 'text': {
            let schema = z.string();
            if (field.required) schema = schema.min(1, v?.customMessage || 'مطلوب');
            if (v?.minLength) schema = schema.min(v.minLength, `يجب ألا يقل عن ${v.minLength} حروف`);
            if (v?.maxLength) schema = schema.max(v.maxLength, `يجب ألا يزيد عن ${v.maxLength} حرف`);
            if (v?.pattern) schema = schema.regex(new RegExp(v.pattern), v.customMessage || 'تنسيق غير صالح');
            return field.required ? schema : schema.optional();
        }

        case 'number': {
            let schema = z.coerce.number();
            if (v?.min != null) schema = schema.min(v.min, `يجب ألا يقل عن ${v.min}`);
            if (v?.max != null) schema = schema.max(v.max, `يجب ألا يزيد عن ${v.max}`);
            return field.required ? schema : schema.optional();
        }

        case 'radio':
        case 'select': {
            const base = z.string();
            if (field.required) return base.min(1, v?.customMessage || 'مطلوب');
            return base.optional();
        }

        case 'checkbox': {
            const base = z.array(z.string());
            if (field.required) return base.min(1, v?.customMessage || 'يرجى اختيار خيار واحد على الأقل');
            return base.optional();
        }

        case 'likert': {
            const base = z.string();
            if (field.required) return base.min(1, v?.customMessage || 'مطلوب');
            return base.optional();
        }

        case 'nps': {
            const base = z.coerce.number().min(0).max(10);
            return field.required ? base : base.optional();
        }

        case 'slider': {
            const min = v?.min ?? 1;
            const max = v?.max ?? 10;
            const base = z.coerce.number().min(min).max(max);
            return field.required ? base : base.optional();
        }

        case 'date': {
            const base = z.string();
            if (field.required) return base.min(1, v?.customMessage || 'مطلوب');
            return base.optional();
        }

        default:
            return field.required ? z.string().min(1, 'مطلوب') : z.string().optional();
    }
}

// --- Build a complete Zod object schema from an array of fields ---
export function buildZodSchema(fields: UnifiedFieldSchema[]): z.ZodObject<Record<string, ZodTypeAny>> {
    const shape: Record<string, ZodTypeAny> = {};
    for (const field of fields) {
        if (field.hidden) continue;
        shape[field.legacyKey || field.id] = buildFieldValidator(field);
    }
    return z.object(shape);
}

// --- Validate a single field value ---
export function validateField(
    field: UnifiedFieldSchema,
    value: any
): { valid: boolean; error?: string } {
    try {
        const validator = buildFieldValidator(field);
        validator.parse(value);
        return { valid: true };
    } catch (e: any) {
        const issues = e?.issues || e?.errors || [];
        return {
            valid: false,
            error: issues[0]?.message || field.validation?.customMessage || 'قيمة غير صالحة',
        };
    }
}

// --- Build default form values from fields ---
export function buildFormDefaults(fields: UnifiedFieldSchema[]): Record<string, any> {
    const defaults: Record<string, any> = {};
    for (const field of fields) {
        if (field.hidden) continue;
        const key = field.legacyKey || field.id;

        switch (field.fieldType) {
            case 'text':
            case 'date':
            case 'radio':
            case 'select':
            case 'likert':
                defaults[key] = '';
                break;
            case 'number':
            case 'nps':
            case 'slider':
                defaults[key] = undefined;
                break;
            case 'checkbox':
                defaults[key] = [];
                break;
        }
    }
    return defaults;
}

// --- Check if a conditional field should be visible ---
export function checkConditionalVisibility(
    field: UnifiedFieldSchema,
    allValues: Record<string, any>
): boolean {
    if (!field.conditionalOn) return true;
    const parentValue = allValues[field.conditionalOn.fieldId];
    if (Array.isArray(field.conditionalOn.value)) {
        return field.conditionalOn.value.includes(parentValue);
    }
    return parentValue === field.conditionalOn.value;
}
