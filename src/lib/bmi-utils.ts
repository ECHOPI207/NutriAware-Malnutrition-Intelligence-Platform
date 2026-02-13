
export interface BMIResult {
  bmi: number;
  rawBmi: number;
  category: 'underweight' | 'normal' | 'overweight' | 'obese';
}

export function calculateBMI(weight: number, heightCm: number): BMIResult {
  if (!weight || !heightCm || weight <= 0 || heightCm <= 0) {
    return { bmi: 0, rawBmi: 0, category: 'normal' };
  }

  const heightM = heightCm / 100;
  const bmi = weight / (heightM * heightM);
  const roundedBMI = Math.round(bmi * 10) / 10;

  let category: 'underweight' | 'normal' | 'overweight' | 'obese';

  if (bmi < 18.5) {
    category = 'underweight';
  } else if (bmi >= 18.5 && bmi < 25) {
    category = 'normal';
  } else if (bmi >= 25 && bmi < 30) {
    category = 'overweight';
  } else {
    category = 'obese';
  }

  return { bmi: roundedBMI, rawBmi: bmi, category };
}

export function getBMICategoryLabel(category: string, language: string = 'en'): string {
  // Normalize category string (handle cases where it might be mixed or already localized)
  const lowerCat = category.toLowerCase();

  if (language === 'ar') {
    if (lowerCat.includes('underweight') || lowerCat.includes('نحافة')) return 'نحافة';
    if (lowerCat.includes('normal') || lowerCat.includes('طبيعي')) return 'وزن طبيعي';
    if (lowerCat.includes('overweight') || lowerCat.includes('زيادة')) return 'زيادة وزن';
    if (lowerCat.includes('obese') || lowerCat.includes('سمنة')) return 'سمنة';
    return category;
  }

  // English
  if (lowerCat.includes('underweight')) return 'Underweight';
  if (lowerCat.includes('normal')) return 'Normal Weight';
  if (lowerCat.includes('overweight')) return 'Overweight';
  if (lowerCat.includes('obese')) return 'Obese';

  // Fallback to capitalizing first letter
  return category.charAt(0).toUpperCase() + category.slice(1);
}

export function getBMICategoryColor(category: string): string {
  const lowerCat = category.toLowerCase();

  if (lowerCat.includes('underweight') || lowerCat.includes('نحافة')) return '#3B82F6'; // Blue
  if (lowerCat.includes('normal') || lowerCat.includes('طبيعي')) return '#10B981'; // Green
  if (lowerCat.includes('overweight') || lowerCat.includes('زيادة')) return '#F59E0B'; // Amber/Orange
  if (lowerCat.includes('obese') || lowerCat.includes('سمنة')) return '#EF4444'; // Red

  return '#9CA3AF'; // Gray (unknown)
}

export function getBMICategoryStatus(category: string): 'success' | 'warning' | 'error' | 'info' | 'default' {
  const lowerCat = category.toLowerCase();

  if (lowerCat.includes('underweight') || lowerCat.includes('نحافة')) return 'info';
  if (lowerCat.includes('normal') || lowerCat.includes('طبيعي')) return 'success';
  if (lowerCat.includes('overweight') || lowerCat.includes('زيادة')) return 'warning';
  if (lowerCat.includes('obese') || lowerCat.includes('سمنة')) return 'error';

  return 'default';
}

export function calculateDailyCalories(
  weight: number,
  heightCm: number,
  age: number,
  gender: 'male' | 'female',
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'intense' = 'sedentary',
  goal: 'maintain' | 'lose' | 'gain' = 'maintain'
): number {
  if (!weight || !heightCm || !age) return 0;

  // Mifflin-St Jeor Equation
  let bmr = 0;
  if (gender === 'male') {
    bmr = 10 * weight + 6.25 * heightCm - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * heightCm - 5 * age - 161;
  }

  const activityMultipliers: Record<string, number> = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    intense: 1.9
  };

  let tdee = bmr * (activityMultipliers[activityLevel] || 1.2);

  if (goal === 'lose') {
    tdee -= 500;
  } else if (goal === 'gain') {
    tdee += 500;
  }

  return Math.round(tdee);
}

export function calculateMacros(calories: number): { protein: number; carbs: number; fats: number } {
  if (!calories || calories <= 0) {
    return { protein: 0, carbs: 0, fats: 0 };
  }
  const proteinCalories = Math.round(calories * 0.3);
  const carbsCalories = Math.round(calories * 0.5);
  const fatsCalories = Math.round(calories * 0.2);
  const protein = Math.round(proteinCalories / 4);
  const carbs = Math.round(carbsCalories / 4);
  const fats = Math.round(fatsCalories / 9);
  return { protein, carbs, fats };
}

// --- Pediatric Clinical Nutrition Functions ---

export type AgeCategory = '0-6m' | '6-12m' | '1-3y' | '4-8y' | '9-13y' | '14-18y' | '19-64y' | '65+';

export function getAgeCategory(ageMonths: number): AgeCategory {
  if (ageMonths < 6) return '0-6m';
  if (ageMonths < 12) return '6-12m';
  if (ageMonths < 36) return '1-3y';
  if (ageMonths < 96) return '4-8y';
  if (ageMonths < 156) return '9-13y';
  if (ageMonths < 216) return '14-18y';
  if (ageMonths < 780) return '19-64y';
  return '65+';
}

/** IOM Estimated Energy Requirement for children 3-18, Mifflin for adults */
export function calculateEER(
  ageYears: number,
  weightKg: number,
  heightCm: number,
  gender: 'male' | 'female',
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' = 'sedentary'
): number {
  if (!weightKg || !heightCm || !ageYears) return 0;
  const heightM = heightCm / 100;
  const pa: Record<string, Record<string, number>> = {
    male: { sedentary: 1.0, light: 1.13, moderate: 1.26, active: 1.42 },
    female: { sedentary: 1.0, light: 1.16, moderate: 1.31, active: 1.56 },
  };
  const paVal = pa[gender]?.[activityLevel] ?? 1.0;

  if (ageYears >= 19) {
    // Mifflin-St Jeor for adults
    const actMult: Record<string, number> = { sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725 };
    let bmr = gender === 'male'
      ? 10 * weightKg + 6.25 * heightCm - 5 * ageYears + 5
      : 10 * weightKg + 6.25 * heightCm - 5 * ageYears - 161;
    return Math.round(bmr * (actMult[activityLevel] || 1.2));
  }
  if (ageYears >= 9) {
    // IOM EER 9-18
    if (gender === 'male') {
      return Math.round(88.5 - 61.9 * ageYears + paVal * (26.7 * weightKg + 903 * heightM) + 25);
    }
    return Math.round(135.3 - 30.8 * ageYears + paVal * (10.0 * weightKg + 934 * heightM) + 25);
  }
  if (ageYears >= 3) {
    // IOM EER 3-8
    if (gender === 'male') {
      return Math.round(88.5 - 61.9 * ageYears + paVal * (26.7 * weightKg + 903 * heightM) + 20);
    }
    return Math.round(135.3 - 30.8 * ageYears + paVal * (10.0 * weightKg + 934 * heightM) + 20);
  }
  // Under 3: estimated ranges
  if (ageYears < 0.5) return 0; // breastfeeding only
  if (ageYears < 1) return Math.round(weightKg * 80); // ~80 kcal/kg
  return Math.round(weightKg * 82); // 1-3y ~82 kcal/kg
}

export type PercentileBracket = 'below5' | 'p5-85' | 'p85-95' | 'above95';

export function getGrowthPercentile(ageYears: number, bmi: number): PercentileBracket {
  // Simplified WHO/CDC BMI-for-age percentile thresholds
  let p5 = 14, p85 = 18, p95 = 22;
  if (ageYears >= 2 && ageYears < 5) { p5 = 13.5; p85 = 16.5; p95 = 18; }
  else if (ageYears >= 5 && ageYears < 10) { p5 = 13.5; p85 = 17; p95 = 19; }
  else if (ageYears >= 10 && ageYears < 15) { p5 = 15; p85 = 21; p95 = 24; }
  else if (ageYears >= 15 && ageYears < 18) { p5 = 17; p85 = 24; p95 = 28; }

  if (bmi < p5) return 'below5';
  if (bmi < p85) return 'p5-85';
  if (bmi < p95) return 'p85-95';
  return 'above95';
}

export function calculatePediatricMacros(
  ageYears: number,
  calories: number,
  gender: 'male' | 'female' = 'male'
): { proteinPercent: number; fatPercent: number; carbPercent: number; proteinGrams: number; fatGrams: number; carbGrams: number } {
  if (!calories) return { proteinPercent: 0, fatPercent: 0, carbPercent: 0, proteinGrams: 0, fatGrams: 0, carbGrams: 0 };
  let pPct: number, fPct: number, cPct: number;
  if (ageYears < 1) { pPct = 10; fPct = 40; cPct = 50; }
  else if (ageYears < 4) { pPct = 15; fPct = 35; cPct = 50; }
  else if (ageYears < 9) { pPct = 20; fPct = 30; cPct = 50; }
  else if (ageYears < 14) { pPct = 25; fPct = 30; cPct = 45; }
  else if (ageYears < 19) { pPct = 25; fPct = 28; cPct = 47; }
  else if (ageYears >= 65) { pPct = 30; fPct = 25; cPct = 45; }
  else { pPct = 25; fPct = 28; cPct = 47; }
  return {
    proteinPercent: pPct, fatPercent: fPct, carbPercent: cPct,
    proteinGrams: Math.round((calories * pPct / 100) / 4),
    fatGrams: Math.round((calories * fPct / 100) / 9),
    carbGrams: Math.round((calories * cPct / 100) / 4),
  };
}

/** Fiber: Age + 5 rule for kids, 25-30g for adults */
export function calculateFiberTarget(ageYears: number): number {
  if (ageYears < 1) return 0;
  if (ageYears < 19) return Math.round(ageYears + 5);
  if (ageYears >= 65) return 25;
  return 28;
}

/** IOM DRI for calcium (mg/day) */
export function calculateCalciumTarget(ageYears: number): number {
  if (ageYears < 0.5) return 200;
  if (ageYears < 1) return 260;
  if (ageYears < 4) return 700;
  if (ageYears < 9) return 1000;
  if (ageYears < 19) return 1300;
  if (ageYears < 51) return 1000;
  if (ageYears < 71) return 1000;
  return 1200;
}

/** IOM DRI for iron (mg/day) */
export function calculateIronTarget(ageYears: number, gender: 'male' | 'female' = 'male'): number {
  if (ageYears < 0.5) return 0;
  if (ageYears < 1) return 11;
  if (ageYears < 4) return 7;
  if (ageYears < 9) return 10;
  if (ageYears < 14) return 8;
  if (ageYears < 19) return gender === 'female' ? 15 : 11;
  if (ageYears < 51) return gender === 'female' ? 18 : 8;
  return 8;
}

