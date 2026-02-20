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
