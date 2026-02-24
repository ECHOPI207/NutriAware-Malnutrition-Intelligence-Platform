// ============================================================
// NutriAware Survey Research Config — Composite Indices,
// Psychometric Config, Variable Naming, Coding Guide
// ============================================================

// --- Construct Identifiers ---
export type ConstructId =
    | 'KN'        // Knowledge
    | 'PR'        // Practices
    | 'INT_ST'    // Intervention Stories
    | 'PX_US'     // Platform Usability
    | 'PX_CN'     // Platform Content
    | 'PX_TL'     // Platform Tools
    | 'PX_CO'     // Platform Consultation
    | 'SAT'       // Satisfaction
    | 'BI'        // Behavioral Intention
    | 'NPS'       // Net Promoter Score
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
}

export const COMPOSITE_INDICES: Record<string, CompositeIndex> = {
    knowledgeScore: {
        id: 'KS',
        nameAr: 'مؤشر المعرفة الغذائية',
        nameEn: 'Knowledge Score',
        items: ['KN1', 'KN2', 'KN3', 'KN4', 'KN5_R'],
        reverseItems: ['KN5_R'],
        scoringMethod: 'mean',
        range: [1, 5],
        cutoffs: [
            { label: 'Low', labelAr: 'منخفض', min: 1.0, max: 2.0 },
            { label: 'Moderate', labelAr: 'متوسط', min: 2.1, max: 3.5 },
            { label: 'High', labelAr: 'مرتفع', min: 3.6, max: 5.0 },
        ],
    },
    practiceScore: {
        id: 'PS',
        nameAr: 'مؤشر الممارسات الغذائية',
        nameEn: 'Practice Score',
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
        { from: 'PR', to: 'SAT', label: 'Practices → Satisfaction' },
        { from: 'SAT', to: 'BI', label: 'Satisfaction → Behavioral Intention' },
        { from: 'PX', to: 'SAT', label: 'Platform Experience → Satisfaction' },
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
    { id: 'KN_AC', expectedValue: 4, section: 'knowledge' },   // "Please select Agree"
    { id: 'PR_AC', expectedValue: 1, section: 'practices' },   // "Please select Strongly Disagree"
];
