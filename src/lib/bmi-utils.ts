
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

