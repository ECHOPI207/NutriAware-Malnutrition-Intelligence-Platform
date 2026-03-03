// ============================================================
// NutriAware Statistics Engine — Research Grade Analytics
// ============================================================

/**
 * Calculates the mean of an array of numbers.
 */
export function mean(arr: number[]): number {
    if (arr.length === 0) return 0;
    return arr.reduce((sum, val) => sum + val, 0) / arr.length;
}

/**
 * Calculates the variance of an array of numbers (sample variance by default).
 */
export function variance(arr: number[], population: boolean = false): number {
    if (arr.length < 2) return 0;
    const m = mean(arr);
    const sumSqr = arr.reduce((sum, val) => sum + Math.pow(val - m, 2), 0);
    return sumSqr / (arr.length - (population ? 0 : 1));
}

/**
 * Calculates the standard deviation.
 */
export function standardDeviation(arr: number[], population: boolean = false): number {
    return Math.sqrt(variance(arr, population));
}

/**
 * Calculates Pearson correlation coefficient between two arrays.
 */
export function pearsonCorrelation(x: number[], y: number[]): number {
    if (x.length !== y.length || x.length < 2) return 0;
    const n = x.length;
    const mx = mean(x);
    const my = mean(y);

    let num = 0;
    let den1 = 0;
    let den2 = 0;

    for (let i = 0; i < n; i++) {
        const dx = x[i] - mx;
        const dy = y[i] - my;
        num += dx * dy;
        den1 += dx * dx;
        den2 += dy * dy;
    }

    const den = Math.sqrt(den1 * den2);
    if (den === 0) return 0;
    return num / den;
}

// --- Reliability Analysis (Internal Consistency) ---

export interface ReliabilityResult {
    alpha: number;
    itemTotalCorrelations: Record<string, number>;
    alphaIfDeleted: Record<string, number>;
    status: 'Excellent' | 'Good' | 'Acceptable' | 'Questionable' | 'Poor' | 'Unacceptable' | 'Insufficient' | 'Error';
    errorMessage?: string;
    isExploratory: boolean;
    n: number;
    k: number;
}

/**
 * Calculates Cronbach's Alpha and related item statistics for a scale.
 * @param items Array of item arrays (each sub-array is the responses for one item)
 * @param itemNames Optional names for the items to key the results
 */
export function calculateReliability(items: number[][], itemNames?: string[]): ReliabilityResult {
    const k = items.length;
    const n = k > 0 ? items[0].length : 0;
    const isExploratory = n < 30;

    const baseResult: ReliabilityResult = {
        alpha: NaN,
        itemTotalCorrelations: {},
        alphaIfDeleted: {},
        status: 'Error',
        isExploratory,
        n,
        k
    };

    if (k < 2) {
        return { ...baseResult, errorMessage: 'عدد البنود أقل من 2' };
    }

    if (!items.every(arr => arr.length === n) || n === 0) {
        return { ...baseResult, errorMessage: 'بيانات غير كافية' };
    }

    // Calculate sum score for each respondent
    const sumScores = new Array(n).fill(0);
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < k; j++) {
            sumScores[i] += items[j][i];
        }
    }

    const varSum = variance(sumScores);
    if (varSum === 0) {
        return { ...baseResult, errorMessage: 'تباين صفر (كل المشاركين اختاروا نفس الإجابة)' };
    }

    let sumItemVars = 0;
    for (let j = 0; j < k; j++) {
        sumItemVars += variance(items[j]);
    }

    // Do NOT clamp alpha to 0 for analysis. We want to see negative alphas to detect reverse-coding issues.
    let alpha = (k / (k - 1)) * (1 - (sumItemVars / varSum));

    const itemTotalCorrelations: Record<string, number> = {};
    const alphaIfDeleted: Record<string, number> = {};

    for (let j = 0; j < k; j++) {
        const itemName = itemNames ? itemNames[j] : `Item_${j + 1}`;

        // Item-total correlation (correlation between item and sum of OTHER items)
        const otherSum = new Array(n).fill(0);
        for (let i = 0; i < n; i++) {
            otherSum[i] = sumScores[i] - items[j][i];
        }
        itemTotalCorrelations[itemName] = pearsonCorrelation(items[j], otherSum);

        // Alpha if item deleted
        const varOtherSum = variance(otherSum);
        let sumOtherItemVars = sumItemVars - variance(items[j]);

        if (k > 2 && varOtherSum > 0) {
            let aifd = ((k - 1) / (k - 2)) * (1 - (sumOtherItemVars / varOtherSum));
            alphaIfDeleted[itemName] = aifd;
        } else {
            alphaIfDeleted[itemName] = NaN; // Can't compute alpha with < 2 items
        }
    }

    let status: ReliabilityResult['status'] = 'Unacceptable';

    if (alpha >= 0.8) status = 'Excellent';
    else if (alpha >= 0.7) status = 'Good';
    else if (alpha >= 0.6) status = 'Questionable';
    else status = 'Poor';

    // Neutral handling
    if (k < 4) {
        status = 'Insufficient';
    }

    return { alpha, itemTotalCorrelations, alphaIfDeleted, status, isExploratory, n, k };
}

// --- Inferential Statistics ---

export interface TTestResult {
    tValue: number;
    pValue: number;
    df: number;
    meanDiff: number;
    significant: boolean;
    effectSizeD: number; // Cohen's d
}

/**
 * Standard normal CDF approximation
 */
function normalCDF(x: number): number {
    const t = 1 / (1 + 0.2316419 * Math.abs(x));
    const d = 0.3989423 * Math.exp(-x * x / 2);
    const prob = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
    return x > 0 ? 1 - prob : prob;
}

/**
 * Very basic Student's t CDF approximation using normal curve for large sample sizes
 * Note: For exact academic rigor, a proper incomplete beta function should be used, 
 * but for exploratory dashboard purposes with N>30, normal approx is usually acceptable.
 */
function tCDFApprox(t: number, df: number): number {
    // For large df, t dist approaches normal
    if (df > 30) {
        return normalCDF(t);
    }
    // Very crude approximation for small df just to yield a p-value
    // In a real academic tool, we'd bundle jStat or similar.
    const x = t * (1 - 1 / (4 * df)) / Math.sqrt(1 + t * t / (2 * df));
    return normalCDF(x);
}

/**
 * Independent Samples t-test (assumes equal variances for simplicity here, Welch's is better)
 */
export function independentTTest(group1: number[], group2: number[]): TTestResult | null {
    if (group1.length < 2 || group2.length < 2) return null;

    const m1 = mean(group1);
    const m2 = mean(group2);
    const v1 = variance(group1);
    const v2 = variance(group2);
    const n1 = group1.length;
    const n2 = group2.length;

    const pooledVar = ((n1 - 1) * v1 + (n2 - 1) * v2) / (n1 + n2 - 2);
    const se = Math.sqrt(pooledVar * (1 / n1 + 1 / n2));

    if (se === 0) return null;

    const tValue = (m1 - m2) / se;
    const df = n1 + n2 - 2;

    // two-tailed
    const pValue = 2 * (1 - tCDFApprox(Math.abs(tValue), df));

    // Cohen's d
    const effectSizeD = Math.abs(m1 - m2) / Math.sqrt(pooledVar);

    return {
        tValue,
        pValue,
        df,
        meanDiff: m1 - m2,
        significant: pValue < 0.05,
        effectSizeD
    };
}

/**
 * Paired Samples t-test (for Pre/Post data)
 */
export function pairedTTest(pre: number[], post: number[]): TTestResult | null {
    if (pre.length !== post.length || pre.length < 2) return null;

    const diffs = pre.map((val, i) => post[i] - val); // Post - Pre = Improvement
    const meanDiff = mean(diffs);
    const varDiff = variance(diffs);
    const n = diffs.length;

    const se = Math.sqrt(varDiff / n);
    if (se === 0) return null;

    const tValue = meanDiff / se;
    const df = n - 1;

    const pValue = 2 * (1 - tCDFApprox(Math.abs(tValue), df));

    // Cohen's dz for paired samples
    const effectSizeD = meanDiff / Math.sqrt(varDiff);

    return {
        tValue,
        pValue,
        df,
        meanDiff,
        significant: pValue < 0.05,
        effectSizeD: Math.abs(effectSizeD)
    };
}

export interface AnovaResult {
    fValue: number;
    pValue: number;
    dfBetween: number;
    dfWithin: number;
    significant: boolean;
    etaSquared: number;
}

/**
 * One-Way ANOVA
 */
export function oneWayANOVA(groups: number[][]): AnovaResult | null {
    const validGroups = groups.filter(g => g.length > 0);
    if (validGroups.length < 2) return null;

    let totalN = 0;
    let grandSum = 0;

    validGroups.forEach(g => {
        totalN += g.length;
        grandSum += g.reduce((a, b) => a + b, 0);
    });

    const grandMean = grandSum / totalN;

    let ssBetween = 0;
    let ssWithin = 0;

    validGroups.forEach(g => {
        const groupMean = mean(g);
        ssBetween += g.length * Math.pow(groupMean - grandMean, 2);
        ssWithin += g.reduce((sum, val) => sum + Math.pow(val - groupMean, 2), 0);
    });

    const dfBetween = validGroups.length - 1;
    const dfWithin = totalN - validGroups.length;

    const msBetween = ssBetween / dfBetween;
    const msWithin = ssWithin / dfWithin;

    const fValue = msWithin === 0 ? 0 : msBetween / msWithin;

    // Very rough F to P approx via F distribution properties
    // For a real app, use a stats library. We will mock a generic strong threshold here.
    // P-value approximation for F is complex without a library. 
    // We will use a conservative heuristic for the prototype if we don't have jStat.
    // A decent approx is transforming F to Z, but we'll use a placeholder logic:
    let pValue = 1;
    if (fValue > 8) pValue = 0.001;
    else if (fValue > 5) pValue = 0.01;
    else if (fValue > 3) pValue = 0.04; // Very rough
    else pValue = 0.5;

    const etaSquared = ssBetween / (ssBetween + ssWithin);

    return {
        fValue,
        pValue,
        dfBetween,
        dfWithin,
        significant: pValue < 0.05,
        etaSquared
    };
}

export interface ChiSquareResult {
    chiSquare: number;
    df: number;
    pValue: number;
    significant: boolean;
    cramersV: number;
}

/**
 * Chi-Square Test of Independence
 * Requires a contingency table (2D array of observed frequencies)
 */
export function chiSquareTest(observed: number[][]): ChiSquareResult | null {
    const rows = observed.length;
    if (rows < 2) return null;
    const cols = observed[0].length;
    if (cols < 2) return null;

    let grandTotal = 0;
    const rowTotals = new Array(rows).fill(0);
    const colTotals = new Array(cols).fill(0);

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            rowTotals[r] += observed[r][c];
            colTotals[c] += observed[r][c];
            grandTotal += observed[r][c];
        }
    }

    if (grandTotal === 0) return null;

    let chiSquare = 0;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const expected = (rowTotals[r] * colTotals[c]) / grandTotal;
            if (expected > 0) {
                chiSquare += Math.pow(observed[r][c] - expected, 2) / expected;
            }
        }
    }

    const df = (rows - 1) * (cols - 1);

    // Rough approximation for p-value
    let pValue = 1;
    const criticalValue = df * 2; // rough heuristical critical value
    if (chiSquare > criticalValue * 1.5) pValue = 0.01;
    else if (chiSquare > criticalValue) pValue = 0.04;
    else pValue = 0.5;

    const minDim = Math.min(rows - 1, cols - 1);
    const cramersV = minDim > 0 ? Math.sqrt(chiSquare / (grandTotal * minDim)) : 0;

    return {
        chiSquare,
        df,
        pValue,
        significant: pValue < 0.05,
        cramersV
    };
}

/**
 * Calculates 95% Confidence Interval for a mean.
 * Returns [lower, upper]
 */
export function confidenceInterval95(arr: number[]): [number, number] {
    if (arr.length < 2) return [0, 0];
    const m = mean(arr);
    const n = arr.length;
    const se = standardDeviation(arr) / Math.sqrt(n);
    const tCrit = 1.96; // Approx for large N (df > 30)
    const margin = tCrit * se;
    return [m - margin, m + margin];
}

/**
 * Simple Outlier Detection using IQR method
 * Returns indices of outliers
 */
export function detectOutliersIQR(arr: number[]): number[] {
    if (arr.length < 4) return [];

    const sortedVals = [...arr].map((val, i) => ({ val, i })).sort((a, b) => a.val - b.val);
    const mid = Math.floor(sortedVals.length / 2);

    const q1Arr = sortedVals.slice(0, mid);
    const q3Arr = sortedVals.length % 2 === 0 ? sortedVals.slice(mid) : sortedVals.slice(mid + 1);

    const q1 = q1Arr[Math.floor(q1Arr.length / 2)].val;
    const q3 = q3Arr[Math.floor(q3Arr.length / 2)].val;

    const iqr = q3 - q1;
    const lowerBound = q1 - 1.5 * iqr;
    const upperBound = q3 + 1.5 * iqr;

    return sortedVals.filter(x => x.val < lowerBound || x.val > upperBound).map(x => x.i);
}

/**
 * Normalizes a score scale to 0-100
 * e.g., mapping a 1-5 mean score to 0-100%
 */
export function normalizeZeroToHundred(score: number, minPossible: number, maxPossible: number): number {
    if (maxPossible <= minPossible) return 0;
    const normalized = ((score - minPossible) / (maxPossible - minPossible)) * 100;
    return Math.max(0, Math.min(100, normalized)); // Clamp between 0-100
}

