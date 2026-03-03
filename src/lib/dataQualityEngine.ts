// ============================================================
// NutriAware Data Quality Engine — Research Grade Validation
// ============================================================

export interface ResponsePattern {
  id: string; // respondent ID
  itemIds: string[]; // typically Likert or numerical questions
  responses: number[]; // actual scores given
}

export interface QualityWarning {
  respondentId: string;
  type: 'straight_lining' | 'high_missing' | 'duplicate_pattern' | 'extreme_outlier' | 'gender_mismatch';
  severity: 'high' | 'medium' | 'low';
  message: string;
}

export interface QualityIndexResult {
  overallScore: number; // 0-100
  warnings: QualityWarning[];
  metrics: {
    cleanResponses: number;
    straightLiners: number;
    highMissingRate: number;
    duplicates: number;
    genderMismatches?: number;
  };
}

/**
 * Detects "Straight-lining" where a respondent gives the same answer to almost every question.
 * Returns true if variance is near 0 for a long set of questions.
 */
export function isStraightLining(responses: number[], thresholdVariance: number = 0.1, minItems: number = 5): boolean {
  if (responses.length < minItems) return false;

  const m = responses.reduce((s, v) => s + v, 0) / responses.length;
  const variance = responses.reduce((s, v) => s + Math.pow(v - m, 2), 0) / responses.length;

  return variance < thresholdVariance;
}

/**
 * Calculates missing data percentage for a single respondent
 */
export function calculateMissingRate(expectedItemCount: number, actualItemCount: number): number {
  if (expectedItemCount === 0) return 0;
  return ((expectedItemCount - actualItemCount) / expectedItemCount) * 100;
}

/**
 * Detects identical response patterns between different users (potential duplicated entries/bots)
 */
export function detectDuplicates(patterns: ResponsePattern[]): Record<string, string[]> {
  const duplicates: Record<string, string[]> = {}; // signature -> array of respondent IDs
  const itemCounts = new Map<string, number>();

  // Create signatures
  patterns.forEach(p => {
    // Only check if they answered enough questions
    if (p.responses.length > 5) {
      // Create a signature hash of their answers
      const signature = p.responses.join(',');
      if (!duplicates[signature]) {
        duplicates[signature] = [];
      }
      duplicates[signature].push(p.id);
    }
  });

  // Filter only those with actual duplicates
  const actualDuplicates: Record<string, string[]> = {};
  for (const [sig, ids] of Object.entries(duplicates)) {
    if (ids.length > 1) {
      actualDuplicates[sig] = ids;
    }
  }

  return actualDuplicates;
}

/**
 * Evaluates the entire dataset for quality metrics.
 * 
 * @param patterns The numeric response patterns of all participants
 * @param expectedItemCount How many Likert/numeric items were expected
 */
export function evaluateDataQuality(patterns: ResponsePattern[], expectedItemCount: number): QualityIndexResult {
  const warnings: QualityWarning[] = [];
  let straightLiners = 0;
  let highMissingRate = 0;

  patterns.forEach(p => {
    // 1. Missing Rate
    const missingPercent = calculateMissingRate(expectedItemCount, p.responses.length);
    if (missingPercent > 20) {
      highMissingRate++;
      warnings.push({
        respondentId: p.id,
        type: 'high_missing',
        severity: missingPercent > 50 ? 'high' : 'medium',
        message: `Respondent skipped \${Math.round(missingPercent)}% of questions.`
      });
    }

    // 2. Straight-Lining
    if (missingPercent < 50 && isStraightLining(p.responses)) {
      straightLiners++;
      warnings.push({
        respondentId: p.id,
        type: 'straight_lining',
        severity: 'high',
        message: `Respondent shows zero or near-zero variance across \${p.responses.length} items.`
      });
    }
  });

  // 3. Duplicates
  const duplicatesMap = detectDuplicates(patterns);
  let duplicateCount = 0;
  for (const ids of Object.values(duplicatesMap)) {
    duplicateCount += ids.length;
    ids.forEach(id => {
      warnings.push({
        respondentId: id,
        type: 'duplicate_pattern',
        severity: 'high',
        message: `Response pattern is identical to \${ids.length - 1} other participant(s).`
      });
    });
  }

  const total = patterns.length || 1;
  const metrics = {
    cleanResponses: total - new Set(warnings.map(w => w.respondentId)).size,
    straightLiners,
    highMissingRate,
    duplicates: duplicateCount
  };

  // Penalties calculation
  const pStraight = (straightLiners / total) * 40; // max 40 point penalty 
  const pMissing = (highMissingRate / total) * 30; // max 30 point penalty
  const pDupl = (duplicateCount / total) * 30;     // max 30 point penalty

  const overallScore = Math.max(0, 100 - (pStraight + pMissing + pDupl));

  return {
    overallScore: Math.round(overallScore),
    warnings,
    metrics
  };
}

