// ============================================================
// NutriAware Survey Engine — Research-Grade Scale System
// ============================================================

// --- Scale Type Definitions ---

export type ScaleType = 'agreement' | 'frequency' | 'satisfaction' | 'intensity' | 'quality' | 'importance' | 'custom';
export type QuestionType = 'likert' | 'nps' | 'open' | 'slider' | 'mcq';
export type ScaleLength = 3 | 5 | 7;

export interface ScalePreset {
    id: ScaleType;
    nameAr: string;
    nameEn: string;
    labels: Record<ScaleLength, string[]>;
}

export interface SurveyQuestion {
    id: string;
    text: string;
    type: QuestionType;
    scaleType?: ScaleType;
    scaleLength?: ScaleLength;
    customLabels?: Record<string, string>;
    reverseScored?: boolean;
    includeNeutral?: boolean;
    // Research-grade fields
    constructId?: string;           // e.g., 'KN', 'PR', 'SAT', 'BI'
    isAttentionCheck?: boolean;     // Marks item as attention-check
    timeAnchor?: string;            // e.g., "خلال الأسبوعين الماضيين"
    conditionalOn?: { questionId: string; value: string }; // Conditional logic
    randomizeOptions?: boolean;     // Randomize option order
    // Legacy support
    answers?: Record<string, string>;
}

export interface CustomTemplate {
    id: string;
    name: string;
    labels: Record<string, string>;
    scaleLength: ScaleLength;
    createdAt: number;
}

// --- 6 Predefined Scale Presets ---

export const SCALE_PRESETS: Record<ScaleType, ScalePreset> = {
    agreement: {
        id: 'agreement',
        nameAr: 'مقياس الموافقة (Attitude)',
        nameEn: 'Agreement Scale',
        labels: {
            3: ['لا أوافق', 'محايد', 'أوافق'],
            5: ['لا أوافق بشدة', 'لا أوافق', 'محايد', 'أوافق', 'أوافق بشدة'],
            7: ['لا أوافق بشدة', 'لا أوافق', 'لا أوافق إلى حد ما', 'محايد', 'أوافق إلى حد ما', 'أوافق', 'أوافق بشدة'],
        }
    },
    frequency: {
        id: 'frequency',
        nameAr: 'مقياس التكرار (Behavior)',
        nameEn: 'Frequency Scale',
        labels: {
            3: ['أبدًا', 'أحيانًا', 'دائمًا'],
            5: ['أبدًا', 'نادرًا', 'أحيانًا', 'غالبًا', 'دائمًا'],
            7: ['أبدًا', 'نادرًا جدًا', 'نادرًا', 'أحيانًا', 'غالبًا', 'غالبًا جدًا', 'دائمًا'],
        }
    },
    satisfaction: {
        id: 'satisfaction',
        nameAr: 'مقياس الرضا (Experience)',
        nameEn: 'Satisfaction Scale',
        labels: {
            3: ['غير راضٍ', 'محايد', 'راضٍ'],
            5: ['غير راضٍ إطلاقًا', 'غير راضٍ', 'محايد', 'راضٍ', 'راضٍ جدًا'],
            7: ['غير راضٍ إطلاقًا', 'غير راضٍ', 'غير راضٍ إلى حد ما', 'محايد', 'راضٍ إلى حد ما', 'راضٍ', 'راضٍ جدًا'],
        }
    },
    intensity: {
        id: 'intensity',
        nameAr: 'مقياس الشدة (Intensity)',
        nameEn: 'Intensity Scale',
        labels: {
            3: ['منخفض', 'متوسط', 'مرتفع'],
            5: ['منخفض جدًا', 'منخفض', 'متوسط', 'مرتفع', 'مرتفع جدًا'],
            7: ['منخفض جدًا', 'منخفض', 'منخفض نسبيًا', 'متوسط', 'مرتفع نسبيًا', 'مرتفع', 'مرتفع جدًا'],
        }
    },
    quality: {
        id: 'quality',
        nameAr: 'مقياس الجودة (Quality)',
        nameEn: 'Quality Scale',
        labels: {
            3: ['ضعيف', 'جيد', 'ممتاز'],
            5: ['ضعيف', 'مقبول', 'جيد', 'جيد جدًا', 'ممتاز'],
            7: ['ضعيف جدًا', 'ضعيف', 'مقبول', 'جيد', 'جيد جدًا', 'ممتاز', 'ممتاز جدًا'],
        }
    },
    importance: {
        id: 'importance',
        nameAr: 'مقياس الأهمية (Importance)',
        nameEn: 'Importance Scale',
        labels: {
            3: ['غير مهم', 'متوسط الأهمية', 'مهم'],
            5: ['غير مهم إطلاقًا', 'غير مهم', 'متوسط الأهمية', 'مهم', 'مهم جدًا'],
            7: ['غير مهم إطلاقًا', 'غير مهم', 'غير مهم نسبيًا', 'متوسط الأهمية', 'مهم نسبيًا', 'مهم', 'مهم جدًا'],
        }
    },
    custom: {
        id: 'custom',
        nameAr: 'مقياس مخصص',
        nameEn: 'Custom Scale',
        labels: {
            3: ['خيار 1', 'خيار 2', 'خيار 3'],
            5: ['خيار 1', 'خيار 2', 'خيار 3', 'خيار 4', 'خيار 5'],
            7: ['خيار 1', 'خيار 2', 'خيار 3', 'خيار 4', 'خيار 5', 'خيار 6', 'خيار 7'],
        }
    }
};

// --- Resolve Labels for a Question ---

export function getQuestionLabels(question: SurveyQuestion, globalLabels?: Record<string, string>): Record<string, string> {
    // 1. Custom labels override everything
    if (question.customLabels && Object.keys(question.customLabels).length > 0) {
        return question.customLabels;
    }
    // 2. Legacy answers field
    if (question.answers && Object.keys(question.answers).length > 0) {
        return question.answers;
    }
    // 3. Scale type preset
    if (question.scaleType && question.scaleType !== 'custom') {
        const preset = SCALE_PRESETS[question.scaleType];
        const length = question.scaleLength || 5;
        const arr = preset.labels[length];
        const result: Record<string, string> = {};
        arr.forEach((label, i) => { result[String(i + 1)] = label; });
        return result;
    }
    // 4. Global defaults
    if (globalLabels) return globalLabels;
    // 5. Fallback: agreement 5-point
    const fallback: Record<string, string> = {};
    SCALE_PRESETS.agreement.labels[5].forEach((label, i) => { fallback[String(i + 1)] = label; });
    return fallback;
}

// --- Smart Auto-Suggestion ---

interface SuggestionResult {
    suggestedType: ScaleType;
    confidence: 'high' | 'medium' | 'low';
    reason: string;
}

const SUGGESTION_RULES: { keywords: string[]; scaleType: ScaleType; reason: string }[] = [
    {
        keywords: ['أحرص', 'أشجع', 'أسمح', 'أستخدم', 'أقوم', 'أراقب', 'أتناول', 'نتناول', 'أجد'],
        scaleType: 'frequency',
        reason: 'السؤال يتعلق بسلوك/تكرار → مقياس التكرار أنسب'
    },
    {
        keywords: ['أعلم', 'أعتقد', 'أرى', 'أوافق', 'أؤمن', 'أعرف', 'أدرك'],
        scaleType: 'agreement',
        reason: 'السؤال يتعلق بمعرفة/رأي → مقياس الموافقة أنسب'
    },
    {
        keywords: ['كان', 'كانت', 'التجربة', 'سهولة', 'سهل', 'تجربة', 'راضٍ', 'رضا'],
        scaleType: 'satisfaction',
        reason: 'السؤال يتعلق بتجربة/رضا → مقياس الرضا أنسب'
    },
    {
        keywords: ['مدى', 'درجة', 'مستوى', 'أهمية', 'ضرورة'],
        scaleType: 'importance',
        reason: 'السؤال يتعلق بأهمية/أولوية → مقياس الأهمية أنسب'
    },
    {
        keywords: ['جودة', 'مستوى', 'تقييم', 'أداء'],
        scaleType: 'quality',
        reason: 'السؤال يتعلق بجودة/تقييم → مقياس الجودة أنسب'
    },
];

export function suggestScaleType(questionText: string): SuggestionResult | null {
    if (!questionText || questionText.length < 5) return null;

    let bestMatch: SuggestionResult | null = null;
    let maxMatches = 0;

    for (const rule of SUGGESTION_RULES) {
        const matches = rule.keywords.filter(kw => questionText.includes(kw)).length;
        if (matches > maxMatches) {
            maxMatches = matches;
            bestMatch = {
                suggestedType: rule.scaleType,
                confidence: matches >= 2 ? 'high' : 'medium',
                reason: rule.reason,
            };
        }
    }

    return bestMatch;
}

// --- Research Quality Validation ---

export interface QualityWarning {
    questionId: string;
    type: 'behavioral_agreement' | 'mixed_levels' | 'reverse_inconsistency' | 'excess_neutral';
    severity: 'error' | 'warning' | 'info';
    message: string;
}

const BEHAVIORAL_KEYWORDS = ['أحرص', 'أشجع', 'أسمح', 'أستخدم', 'أقوم', 'أراقب', 'أتناول', 'نتناول'];

export function validateResearchQuality(questions: SurveyQuestion[], sectionKey?: string): QualityWarning[] {
    const warnings: QualityWarning[] = [];
    const scaleTypesUsed = new Set<ScaleType>();

    for (const q of questions) {
        if (q.type !== 'likert') continue;
        const scaleType = q.scaleType || 'agreement';
        scaleTypesUsed.add(scaleType);

        // Warn: behavioral question + agreement scale
        const isBehavioral = BEHAVIORAL_KEYWORDS.some(kw => q.text.includes(kw));
        if (isBehavioral && scaleType === 'agreement') {
            warnings.push({
                questionId: q.id,
                type: 'behavioral_agreement',
                severity: 'warning',
                message: `السؤال "${q.text.substring(0, 40)}..." يصف سلوكًا ولكن يستخدم مقياس الموافقة. فكّر في استخدام مقياس التكرار.`
            });
        }
    }

    // Warn: mixed measurement levels in same section
    if (scaleTypesUsed.size > 2 && sectionKey) {
        warnings.push({
            questionId: '',
            type: 'mixed_levels',
            severity: 'info',
            message: `القسم يحتوي على ${scaleTypesUsed.size} أنواع مختلفة من المقاييس. يُفضّل الاتساق في نوع المقياس داخل القسم الواحد.`
        });
    }

    return warnings;
}

// --- NPS Calculator ---

export interface NPSResult {
    promoters: number;
    passives: number;
    detractors: number;
    total: number;
    npsScore: number; // -100 to +100
    promoterPercent: number;
    detractorPercent: number;
}

export function calculateNPS(scores: number[]): NPSResult {
    const total = scores.length;
    if (total === 0) return { promoters: 0, passives: 0, detractors: 0, total: 0, npsScore: 0, promoterPercent: 0, detractorPercent: 0 };

    let promoters = 0, passives = 0, detractors = 0;
    for (const score of scores) {
        if (score >= 9) promoters++;
        else if (score >= 7) passives++;
        else detractors++;
    }

    const promoterPercent = (promoters / total) * 100;
    const detractorPercent = (detractors / total) * 100;

    return {
        promoters, passives, detractors, total,
        npsScore: Math.round(promoterPercent - detractorPercent),
        promoterPercent: Math.round(promoterPercent * 10) / 10,
        detractorPercent: Math.round(detractorPercent * 10) / 10,
    };
}

// --- Numeric Coding for Export ---

export function getNumericCode(question: SurveyQuestion, rawValue: string): number {
    const val = parseInt(rawValue, 10);
    if (isNaN(val)) return -1;

    const length = question.scaleLength || 5;

    if (question.reverseScored) {
        return (length + 1) - val;
    }
    return val;
}

export function getCodebook(questions: SurveyQuestion[], globalLabels?: Record<string, string>): Array<{
    variableName: string;
    questionText: string;
    scaleType: string;
    scaleLength: number;
    reverseScored: boolean;
    constructId: string;
    isAttentionCheck: boolean;
    valueLabelMap: Record<number, string>;
}> {
    return questions.map(q => {
        const labels = getQuestionLabels(q, globalLabels);
        const length = q.scaleLength || Object.keys(labels).length || 5;
        const valueLabelMap: Record<number, string> = {};

        for (let i = 1; i <= length; i++) {
            const code = q.reverseScored ? (length + 1) - i : i;
            valueLabelMap[code] = labels[String(i)] || `Level ${i}`;
        }

        return {
            variableName: q.id,
            questionText: q.text,
            scaleType: q.scaleType || 'agreement',
            scaleLength: length,
            reverseScored: !!q.reverseScored,
            constructId: q.constructId || '',
            isAttentionCheck: !!q.isAttentionCheck,
            valueLabelMap,
        };
    });
}

// --- Question Type Icons (for UI) ---
export const QUESTION_TYPE_INFO: Record<QuestionType, { labelAr: string; labelEn: string; icon: string }> = {
    likert: { labelAr: 'مقياس ليكرت', labelEn: 'Likert Scale', icon: '📊' },
    nps: { labelAr: 'صافي نقاط الترويج', labelEn: 'Net Promoter Score', icon: '📈' },
    open: { labelAr: 'سؤال مفتوح', labelEn: 'Open-ended', icon: '💬' },
    slider: { labelAr: 'شريط تمرير', labelEn: 'Slider', icon: '🎚️' },
    mcq: { labelAr: 'اختيار متعدد', labelEn: 'Multiple Choice', icon: '☑️' },
};

// --- Icon Sets per Scale Type ---
export const SCALE_ICON_SETS: Record<ScaleType, string[]> = {
    agreement: ['😠', '😟', '😐', '🙂', '😊', '😃', '🤩'],
    frequency: ['🚫', '🔻', '🔹', '🔸', '🔶', '🟠', '🔴'],
    satisfaction: ['😡', '😞', '😕', '😐', '🙂', '😊', '🥰'],
    intensity: ['⬇️', '↘️', '➡️', '↗️', '⬆️', '🔝', '🚀'],
    quality: ['❌', '⚠️', '➖', '✅', '⭐', '🌟', '💫'],
    importance: ['⬜', '🟫', '🟨', '🟧', '🟥', '💎', '👑'],
    custom: ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣'],
};

export function getScaleIcons(scaleType: ScaleType, length: ScaleLength): string[] {
    const fullSet = SCALE_ICON_SETS[scaleType] || SCALE_ICON_SETS.custom;
    if (length === 3) return [fullSet[0], fullSet[3], fullSet[6]];
    if (length === 5) return [fullSet[0], fullSet[1], fullSet[3], fullSet[5], fullSet[6]];
    return fullSet;
}

// --- Default Question Factory ---
export function createDefaultQuestion(overrides?: Partial<SurveyQuestion>): SurveyQuestion {
    return {
        id: `q${Date.now()}`,
        text: '',
        type: 'likert',
        scaleType: 'agreement',
        scaleLength: 5,
        reverseScored: false,
        includeNeutral: true,
        ...overrides,
    };
}

// ============================================================
// Unified Field Schema — Full Editing Flexibility Layer
// ============================================================

export type FieldType = 'radio' | 'checkbox' | 'text' | 'number' | 'likert' | 'nps' | 'slider' | 'select' | 'date';
export type OutputType = 'nominal' | 'ordinal' | 'interval' | 'ratio' | 'text';

export interface ValidationRules {
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
    pattern?: string;
    customMessage?: string;
}

export interface UnifiedFieldSchema {
    id: string;
    text: string;
    // Type system — fully switchable
    fieldType: FieldType;
    // Metadata layer
    required: boolean;
    hidden: boolean;
    order: number;
    constructId?: string;
    // Options (for radio, checkbox, select)
    options?: string[];
    // Scale config (for likert, slider)
    scaleType?: ScaleType;
    scaleLength?: ScaleLength;
    customLabels?: Record<string, string>;
    reverseScored?: boolean;
    // Validation manager
    validation?: ValidationRules;
    // Variable type converter
    outputType: OutputType;
    codingMap?: Record<string, number>;
    // Conditional logic
    conditionalOn?: { fieldId: string; value: string | string[] };
    // Research fields
    isAttentionCheck?: boolean;
    timeAnchor?: string;
    // Backward compatibility
    legacyKey?: string;
    // Legacy: simple label format (for migration from OptionsEditor config)
    label?: string;
    // UI placeholder
    placeholder?: string;
}

// --- Generate numeric coding map from options ---
export function generateCodingMap(options: string[]): Record<string, number> {
    const map: Record<string, number> = {};
    options.forEach((opt, idx) => {
        map[opt] = idx + 1;
    });
    return map;
}

// --- Convert field type with automatic coding map update ---
export function convertFieldType(
    field: UnifiedFieldSchema,
    newType: FieldType
): UnifiedFieldSchema {
    const updated = { ...field, fieldType: newType };

    // Auto-adjust output type based on new field type
    switch (newType) {
        case 'radio':
        case 'select':
            updated.outputType = 'nominal';
            if (updated.options && !updated.codingMap) {
                updated.codingMap = generateCodingMap(updated.options);
            }
            break;
        case 'checkbox':
            updated.outputType = 'nominal';
            break;
        case 'text':
        case 'date':
            updated.outputType = 'text';
            updated.codingMap = undefined;
            break;
        case 'number':
            updated.outputType = 'ratio';
            updated.codingMap = undefined;
            break;
        case 'likert':
            updated.outputType = 'interval';
            if (!updated.scaleType) updated.scaleType = 'agreement';
            if (!updated.scaleLength) updated.scaleLength = 5;
            break;
        case 'nps':
            updated.outputType = 'ratio';
            updated.codingMap = undefined;
            break;
        case 'slider':
            updated.outputType = 'interval';
            break;
    }

    return updated;
}

// --- Create default unified field ---
export function createDefaultField(overrides?: Partial<UnifiedFieldSchema>): UnifiedFieldSchema {
    return {
        id: `field_${Date.now()}`,
        text: 'سؤال جديد',
        fieldType: 'radio',
        required: true,
        hidden: false,
        order: 0,
        outputType: 'nominal',
        options: ['خيار 1', 'خيار 2'],
        codingMap: { 'خيار 1': 1, 'خيار 2': 2 },
        ...overrides,
    };
}

// --- Resolve a unified field to an export variable name ---
export function resolveFieldToExportVar(field: UnifiedFieldSchema, prefix: string): string {
    return `${prefix}_${field.id}`;
}

// --- FIELD_TYPE_INFO for UI ---
export const FIELD_TYPE_INFO: Record<FieldType, { labelAr: string; labelEn: string; icon: string }> = {
    radio: { labelAr: 'اختيار فردي', labelEn: 'Single Choice', icon: '🔘' },
    checkbox: { labelAr: 'اختيار متعدد', labelEn: 'Multi-select', icon: '☑️' },
    text: { labelAr: 'نص حر', labelEn: 'Free Text', icon: '✏️' },
    number: { labelAr: 'رقم', labelEn: 'Number', icon: '🔢' },
    likert: { labelAr: 'مقياس ليكرت', labelEn: 'Likert Scale', icon: '📊' },
    nps: { labelAr: 'NPS', labelEn: 'Net Promoter Score', icon: '📈' },
    slider: { labelAr: 'شريط تمرير', labelEn: 'Slider', icon: '🎚️' },
    select: { labelAr: 'قائمة منسدلة', labelEn: 'Dropdown', icon: '📋' },
    date: { labelAr: 'تاريخ', labelEn: 'Date', icon: '📅' },
};

export const OUTPUT_TYPE_INFO: Record<OutputType, { labelAr: string; labelEn: string }> = {
    nominal: { labelAr: 'اسمي (تصنيفي)', labelEn: 'Nominal' },
    ordinal: { labelAr: 'ترتيبي', labelEn: 'Ordinal' },
    interval: { labelAr: 'فترة', labelEn: 'Interval' },
    ratio: { labelAr: 'نسبي', labelEn: 'Ratio' },
    text: { labelAr: 'نصي', labelEn: 'Text' },
};

// ============================================================
// Section Ordering System
// ============================================================

export interface SectionOrderEntry {
    id: string;
    display_order: number;
    is_locked?: boolean;
    locked_reorderable?: boolean;
    titleAr?: string;
    icon?: string;
}

export const DEFAULT_SECTION_ORDER: SectionOrderEntry[] = [
    { id: 'consent', display_order: 0, is_locked: true, locked_reorderable: false, titleAr: 'نموذج الموافقة', icon: '✅' },
    { id: 'demographics', display_order: 1, titleAr: 'البيانات الديموغرافية', icon: '👤' },
    { id: 'healthIndicators', display_order: 2, titleAr: 'المؤشرات الصحية', icon: '🏥' },
    { id: 'knowledge', display_order: 3, titleAr: 'المعرفة الغذائية', icon: '📖' },
    { id: 'practices', display_order: 4, titleAr: 'الممارسات الغذائية', icon: '🍽️' },
    { id: 'intervention', display_order: 5, titleAr: 'التدخل', icon: '📦' },
    { id: 'satisfaction', display_order: 6, titleAr: 'الرضا العام', icon: '⭐' },
    { id: 'behavioralIntent', display_order: 7, titleAr: 'الأثر السلوكي', icon: '🎯' },
    { id: 'nps', display_order: 8, titleAr: 'NPS', icon: '📈' },
    { id: 'retrospective', display_order: 9, titleAr: 'التقييم الارتجاعي', icon: '🔄' },
    { id: 'openQuestions', display_order: 10, titleAr: 'الأسئلة المفتوحة', icon: '💬' },
];

export interface OrderConstraintResult {
    valid: boolean;
    errors: string[];   // Hard constraints — block save
    warnings: string[]; // Soft constraints — show but allow
}

export function validateSectionOrder(order: SectionOrderEntry[]): OrderConstraintResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Hard: Consent must be first
    const consentIdx = order.findIndex(s => s.id === 'consent');
    if (consentIdx !== 0) {
        errors.push('يجب أن يظل نموذج الموافقة هو القسم الأول.');
    }

    // Hard: Non-reorderable locked sections must stay in place
    const defaultMap = new Map(DEFAULT_SECTION_ORDER.map(s => [s.id, s]));
    for (const section of order) {
        const def = defaultMap.get(section.id);
        if (def?.is_locked && def?.locked_reorderable === false) {
            if (section.display_order !== def.display_order) {
                errors.push(`قسم "${section.titleAr || section.id}" مقفل ولا يمكن تغيير ترتيبه.`);
            }
        }
    }

    // Soft: Demographics should come before satisfaction/behavioral
    const demoIdx = order.findIndex(s => s.id === 'demographics');
    const satIdx = order.findIndex(s => s.id === 'satisfaction');
    const biIdx = order.findIndex(s => s.id === 'behavioralIntent');
    if (demoIdx >= 0 && satIdx >= 0 && demoIdx > satIdx) {
        warnings.push('يُفضّل أن تظهر البيانات الديموغرافية قبل قسم الرضا العام.');
    }
    if (demoIdx >= 0 && biIdx >= 0 && demoIdx > biIdx) {
        warnings.push('يُفضّل أن تظهر البيانات الديموغرافية قبل قسم الأثر السلوكي.');
    }

    // Soft: NPS usually near end
    const npsIdx = order.findIndex(s => s.id === 'nps');
    if (npsIdx >= 0 && npsIdx < 5) {
        warnings.push('يُفضّل وضع NPS قرب نهاية الاستبيان.');
    }

    return { valid: errors.length === 0, errors, warnings };
}

// --- Reorder utility: move item at fromIndex to toIndex ---
export function reorderItems<T>(items: T[], fromIndex: number, toIndex: number): T[] {
    if (fromIndex === toIndex) return items;
    const result = [...items];
    const [removed] = result.splice(fromIndex, 1);
    result.splice(toIndex, 0, removed);
    return result;
}

// --- Reindex display_order after reorder ---
export function reindexSectionOrder(order: SectionOrderEntry[]): SectionOrderEntry[] {
    return order.map((s, i) => ({ ...s, display_order: i }));
}


