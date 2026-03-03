// ============================================================
// NutriAware Survey Research Config v3.0 — Composite Indices,
// Psychometric Config, Variable Naming, Coding Guide
// ============================================================

// --- Construct Identifiers ---
export type ConstructId =
    | 'KN'        // Nutritional Knowledge
    | 'FSK'       // Food Safety Knowledge
    | 'FSP'       // Food Safety Practices
    | 'ATT'       // Attitudes
    | 'PR'        // Dietary Practices
    | 'DDS'       // Dietary Diversity Score
    | 'INT_ST'    // Intervention Stories
    | 'PX_US'     // Platform Usability
    | 'PX_CN'     // Platform Content
    | 'PX_TL'     // Platform Tools
    | 'PX_CO'     // Platform Consultation
    | 'SAT'       // Satisfaction
    | 'BI'        // Behavioral Intention
    | 'NPS'       // Net Promoter Score
    | 'IF'        // Intervention Fidelity
    | 'RETRO'     // Retrospective
    | 'OE';       // Open-ended

// --- Composite Index Definition ---
export interface CompositeIndex {
    id: string;
    nameAr: string;
    nameEn: string;
    items: string[];           // Variable IDs included
    reverseItems: string[];    // IDs that need reverse coding
    scoringMethod: 'mean' | 'sum';
    range: [number, number];   // [min, max]
    cutoffs: { label: string; labelAr: string; min: number; max: number }[];
    adequacyThreshold?: number; // For DDS
}

export const COMPOSITE_INDICES: Record<string, CompositeIndex> = {
    nutritionalKnowledgeScore: {
        id: 'NKS',
        nameAr: 'مؤشر المعرفة الغذائية',
        nameEn: 'Nutritional Knowledge Score',
        items: ['KN1', 'KN2', 'KN3', 'KN4', 'KN5', 'KN6', 'KN7', 'KN8', 'KN9', 'KN10', 'KN11_R'],
        reverseItems: ['KN11_R'],
        scoringMethod: 'mean',
        range: [1, 5],
        cutoffs: [
            { label: 'Low', labelAr: 'منخفض', min: 1.0, max: 2.0 },
            { label: 'Moderate', labelAr: 'متوسط', min: 2.1, max: 3.5 },
            { label: 'High', labelAr: 'مرتفع', min: 3.6, max: 5.0 },
        ],
    },
    foodSafetyKnowledgeScore: {
        id: 'FSKS',
        nameAr: 'مؤشر معرفة سلامة الغذاء',
        nameEn: 'Food Safety Knowledge Score',
        items: ['FSK1', 'FSK2', 'FSK3', 'FSK4', 'FSK5'],
        reverseItems: [],
        scoringMethod: 'mean',
        range: [1, 5],
        cutoffs: [
            { label: 'Low', labelAr: 'منخفض', min: 1.0, max: 2.0 },
            { label: 'Moderate', labelAr: 'متوسط', min: 2.1, max: 3.5 },
            { label: 'High', labelAr: 'مرتفع', min: 3.6, max: 5.0 },
        ],
    },
    foodSafetyPracticeScore: {
        id: 'FSPS',
        nameAr: 'مؤشر ممارسات سلامة الغذاء',
        nameEn: 'Food Safety Practice Score',
        items: ['FSP1', 'FSP2', 'FSP3', 'FSP4', 'FSP5'],
        reverseItems: [],
        scoringMethod: 'mean',
        range: [1, 5],
        cutoffs: [
            { label: 'Poor', labelAr: 'ضعيف', min: 1.0, max: 2.0 },
            { label: 'Fair', labelAr: 'مقبول', min: 2.1, max: 3.5 },
            { label: 'Good', labelAr: 'جيد', min: 3.6, max: 5.0 },
        ],
    },
    attitudesScore: {
        id: 'ATTS',
        nameAr: 'مؤشر الاتجاهات',
        nameEn: 'Attitudes Score',
        items: ['ATT1', 'ATT2', 'ATT3', 'ATT4', 'ATT5'],
        reverseItems: [],
        scoringMethod: 'mean',
        range: [1, 5],
        cutoffs: [
            { label: 'Negative', labelAr: 'سلبي', min: 1.0, max: 2.0 },
            { label: 'Neutral', labelAr: 'محايد', min: 2.1, max: 3.5 },
            { label: 'Positive', labelAr: 'إيجابي', min: 3.6, max: 5.0 },
        ],
    },
    dietaryPracticeScore: {
        id: 'PS',
        nameAr: 'مؤشر الممارسات الغذائية',
        nameEn: 'Dietary Practice Score',
        items: ['PR1', 'PR2', 'PR3', 'PR4', 'PR5', 'PR6', 'PR7_R'],
        reverseItems: ['PR7_R'],
        scoringMethod: 'mean',
        range: [1, 5],
        cutoffs: [
            { label: 'Poor', labelAr: 'ضعيف', min: 1.0, max: 2.0 },
            { label: 'Fair', labelAr: 'مقبول', min: 2.1, max: 3.0 },
            { label: 'Good', labelAr: 'جيد', min: 3.1, max: 4.0 },
            { label: 'Excellent', labelAr: 'ممتاز', min: 4.1, max: 5.0 },
        ],
    },
    dietaryDiversityScore: {
        id: 'DDS',
        nameAr: 'مؤشر التنوع الغذائي',
        nameEn: 'Dietary Diversity Score',
        items: ['DDS1', 'DDS2', 'DDS3', 'DDS4', 'DDS5', 'DDS6', 'DDS7', 'DDS8'],
        reverseItems: [],
        scoringMethod: 'sum',
        range: [0, 8],
        adequacyThreshold: 5,
        cutoffs: [
            { label: 'Very Low', labelAr: 'منخفض جدًا', min: 0, max: 2 },
            { label: 'Low', labelAr: 'منخفض', min: 3, max: 4 },
            { label: 'Adequate', labelAr: 'كافٍ', min: 5, max: 6 },
            { label: 'High', labelAr: 'مرتفع', min: 7, max: 8 },
        ],
    },
    engagementScore: {
        id: 'ES',
        nameAr: 'مؤشر التفاعل',
        nameEn: 'Engagement Score',
        items: [
            'INT_ST1', 'INT_ST2', 'INT_ST3', 'INT_ST4', 'INT_ST5', 'INT_ST6_R',
            'PX_US1', 'PX_US2', 'PX_CN1', 'PX_CN2', 'PX_TL1', 'PX_TL2', 'PX_CO1', 'PX_CO2',
        ],
        reverseItems: ['INT_ST6_R'],
        scoringMethod: 'mean',
        range: [1, 5],
        cutoffs: [
            { label: 'Low Engagement', labelAr: 'تفاعل منخفض', min: 1.0, max: 2.5 },
            { label: 'Moderate', labelAr: 'متوسط', min: 2.6, max: 3.5 },
            { label: 'High Engagement', labelAr: 'تفاعل مرتفع', min: 3.6, max: 5.0 },
        ],
    },
    satisfactionIndex: {
        id: 'SI',
        nameAr: 'مؤشر الرضا',
        nameEn: 'Satisfaction Index',
        items: ['SAT1', 'SAT2', 'SAT3', 'SAT4_R'],
        reverseItems: ['SAT4_R'],
        scoringMethod: 'mean',
        range: [1, 5],
        cutoffs: [
            { label: 'Dissatisfied', labelAr: 'غير راضٍ', min: 1.0, max: 2.0 },
            { label: 'Neutral', labelAr: 'محايد', min: 2.1, max: 3.5 },
            { label: 'Satisfied', labelAr: 'راضٍ', min: 3.6, max: 5.0 },
        ],
    },
    behavioralChangeIndex: {
        id: 'BCI',
        nameAr: 'مؤشر التغيير السلوكي',
        nameEn: 'Behavioral Change Index',
        items: ['BI1', 'BI2', 'BI3', 'BI4', 'BI5_R'],
        reverseItems: ['BI5_R'],
        scoringMethod: 'mean',
        range: [1, 5],
        cutoffs: [
            { label: 'No Intent', labelAr: 'بدون نية', min: 1.0, max: 2.0 },
            { label: 'Moderate Intent', labelAr: 'نية متوسطة', min: 2.1, max: 3.5 },
            { label: 'Strong Intent', labelAr: 'نية قوية', min: 3.6, max: 5.0 },
        ],
    },
};

// --- Psychometric Config ---
export const PSYCHOMETRIC_CONFIG = {
    minCronbachAlpha: 0.70,
    targetCronbachAlpha: 0.80,
    minSampleSizeCFA: 200,
    recommendedSampleSizeSEM: 300,
    factorLoadingThreshold: 0.40,
    crossLoadingMax: 0.30,
    fitIndices: {
        CFI: { acceptable: 0.90, good: 0.95 },
        TLI: { acceptable: 0.90, good: 0.95 },
        RMSEA: { acceptable: 0.08, good: 0.06 },
        SRMR: { acceptable: 0.10, good: 0.08 },
    },
    semPath: [
        { from: 'KN', to: 'PR', label: 'Knowledge → Practices' },
        { from: 'FSK', to: 'FSP', label: 'Food Safety Knowledge → Food Safety Practices' },
        { from: 'ATT', to: 'PR', label: 'Attitudes → Dietary Practices' },
        { from: 'ATT', to: 'FSP', label: 'Attitudes → Food Safety Practices' },
        { from: 'PR', to: 'SAT', label: 'Practices → Satisfaction' },
        { from: 'SAT', to: 'BI', label: 'Satisfaction → Behavioral Intention' },
        { from: 'PX', to: 'SAT', label: 'Platform Experience → Satisfaction' },
    ],
    reliabilityTargets: [
        { construct: 'KN', items: 11, target: 0.80, minimum: 0.70 },
        { construct: 'FSK', items: 5, target: 0.75, minimum: 0.70 },
        { construct: 'FSP', items: 5, target: 0.75, minimum: 0.70 },
        { construct: 'ATT', items: 5, target: 0.75, minimum: 0.70 },
        { construct: 'PR', items: 7, target: 0.80, minimum: 0.70 },
        { construct: 'INT_ST', items: 6, target: 0.80, minimum: 0.70 },
        { construct: 'PX', items: 8, target: 0.85, minimum: 0.70 },
        { construct: 'SAT', items: 4, target: 0.80, minimum: 0.70 },
        { construct: 'BI', items: 5, target: 0.80, minimum: 0.70 },
    ],
};

// --- Missing Data Protocol ---
export const MISSING_DATA_PROTOCOL = {
    thresholds: {
        listwise: 0.05,      // ≤5% → listwise deletion OK
        imputation: 0.20,    // 5–20% → Multiple Imputation (MICE)
        exclusion: 0.20,     // >20% → consider excluding variable
    },
    mcarTestAlpha: 0.05,     // Little's MCAR test significance level
};

// --- Outlier Detection Rules ---
export const OUTLIER_RULES = {
    iqrMultiplier: 1.5,
    straightliningThreshold: 0.80,  // Same response ≥80% of items
    minResponseTimeSeconds: 120,    // <2 minutes → flag
    mahalanobisPValue: 0.001,
};

// --- Compute Composite Score ---
export function computeCompositeScore(
    responses: Record<string, number>,
    indexKey: keyof typeof COMPOSITE_INDICES
): { score: number; label: string; labelAr: string } | null {
    const index = COMPOSITE_INDICES[indexKey];
    if (!index) return null;

    const values: number[] = [];
    for (const item of index.items) {
        const raw = responses[item];
        if (raw == null || isNaN(raw)) continue;
        // Reverse code if needed
        const val = index.reverseItems.includes(item) ? (6 - raw) : raw;
        values.push(val);
    }

    if (values.length === 0) return null;

    const score = index.scoringMethod === 'mean'
        ? values.reduce((a, b) => a + b, 0) / values.length
        : values.reduce((a, b) => a + b, 0);

    const rounded = Math.round(score * 100) / 100;
    const cutoff = index.cutoffs.find(c => rounded >= c.min && rounded <= c.max);

    return {
        score: rounded,
        label: cutoff?.label || 'Unknown',
        labelAr: cutoff?.labelAr || 'غير محدد',
    };
}

// --- Compute DDS Adequacy ---
export function computeDDSAdequacy(
    responses: Record<string, number>
): { total: number; adequate: boolean } {
    const ddsItems = ['DDS1', 'DDS2', 'DDS3', 'DDS4', 'DDS5', 'DDS6', 'DDS7', 'DDS8'];
    const total = ddsItems.reduce((sum, item) => {
        const val = responses[item];
        return sum + (val === 1 ? 1 : 0);
    }, 0);
    return { total, adequate: total >= 5 };
}

// --- Detect Straightlining ---
export function detectStraightlining(
    responses: Record<string, number>,
    likertKeys: string[]
): boolean {
    const vals = likertKeys.map(k => responses[k]).filter(v => v != null);
    if (vals.length < 5) return false;
    const mode = vals.sort((a, b) =>
        vals.filter(v => v === a).length - vals.filter(v => v === b).length
    ).pop()!;
    const sameCount = vals.filter(v => v === mode).length;
    return (sameCount / vals.length) >= OUTLIER_RULES.straightliningThreshold;
}

// --- Validate Attention Checks ---
export function validateAttentionChecks(
    responses: Record<string, number>,
    checks: { id: string; expectedValue: number }[]
): { passed: boolean; failedIds: string[] } {
    const failedIds: string[] = [];
    for (const check of checks) {
        if (responses[check.id] !== check.expectedValue) {
            failedIds.push(check.id);
        }
    }
    return { passed: failedIds.length === 0, failedIds };
}

// --- Attention Check Definitions ---
export const ATTENTION_CHECKS = [
    { id: 'KN_AC', expectedValue: 4, section: 'nutritionalKnowledge' },   // "Please select Agree"
    { id: 'PR_AC', expectedValue: 1, section: 'dietaryPractices' },       // "Please select Strongly Disagree"
];
