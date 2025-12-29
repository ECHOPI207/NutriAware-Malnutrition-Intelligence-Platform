export interface BMIResult {
  bmi: number;
  category: 'underweight' | 'normal' | 'overweight' | 'obese';
}

export interface MacroResult {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

/**
 * Calculate BMI from weight (kg) and height (cm or m)
 * @param weight Weight in kg
 * @param height Height in cm (will be converted to meters)
 */
export const calculateBMI = (weight: number, height: number): BMIResult | null => {
  if (!weight || !height || weight <= 0 || height <= 0) {
    return null;
  }

  // Convert height to meters if > 3 (assuming input is in cm if > 3)
  const heightInMeters = height > 3 ? height / 100 : height;

  const bmi = weight / (heightInMeters * heightInMeters);
  const roundedBMI = Math.round(bmi * 10) / 10;

  let category: BMIResult['category'] = 'normal';
  if (roundedBMI < 18.5) {
    category = 'underweight';
  } else if (roundedBMI < 25) {
    category = 'normal';
  } else if (roundedBMI < 30) {
    category = 'overweight';
  } else {
    category = 'obese';
  }

  return {
    bmi: roundedBMI,
    category
  };
};

/**
 * Calculate Ideal Weight based on height
 * Using BMI 22 as the ideal target
 * @param height Height in cm
 */
export const calculateIdealWeight = (height: number): number => {
  if (!height || height <= 0) return 0;
  // Convert height to meters if > 3
  const heightInMeters = height > 3 ? height / 100 : height;
  return Math.round((22 * Math.pow(heightInMeters, 2)) * 10) / 10;
};

/**
 * Calculate BMR (Basal Metabolic Rate) using Mifflin-St Jeor Equation
 */
export const calculateBMR = (
  weight: number, 
  height: number, 
  age: number, 
  gender: 'male' | 'female'
): number => {
  if (!weight || !height || !age) return 0;
  
  // Height in cm
  const heightInCm = height < 3 ? height * 100 : height;

  if (gender === 'male') {
    return 10 * weight + 6.25 * heightInCm - 5 * age + 5;
  } else {
    return 10 * weight + 6.25 * heightInCm - 5 * age - 161;
  }
};

/**
 * Calculate TDEE (Total Daily Energy Expenditure) and Macros
 */
export const calculateNutritionNeeds = (
  bmr: number,
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'intense',
  goal: 'lose' | 'maintain' | 'gain'
): MacroResult => {
  const activityMultipliers = {
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

  const calories = Math.round(tdee);
  
  // Standard macro split: 30% Protein, 40% Carbs, 30% Fats
  const protein = Math.round((calories * 0.3) / 4);
  const carbs = Math.round((calories * 0.4) / 4);
  const fats = Math.round((calories * 0.3) / 9);

  return {
    calories,
    protein,
    carbs,
    fats
  };
};

/**
 * Helper to normalize BMI category string for translation
 */
export const normalizeBMICategory = (category: string): 'underweight' | 'normal' | 'overweight' | 'obese' => {
  const lowerCat = category.toLowerCase();
  if (lowerCat.includes('underweight') || lowerCat.includes('نحافة')) return 'underweight';
  if (lowerCat.includes('normal') || lowerCat.includes('طبيعي')) return 'normal';
  if (lowerCat.includes('overweight') || lowerCat.includes('زيادة')) return 'overweight';
  if (lowerCat.includes('obese') || lowerCat.includes('سمنة')) return 'obese';
  return 'normal'; // Default
};

/**
 * Get BMI progress value (0-100) for visualization
 */
export const getBMIProgress = (bmi: number): number => {
  if (bmi < 18.5) return (bmi / 18.5) * 25;
  if (bmi < 25) return 25 + ((bmi - 18.5) / 6.5) * 25;
  if (bmi < 30) return 50 + ((bmi - 25) / 5) * 25;
  return Math.min(75 + ((bmi - 30) / 10) * 25, 100);
};
