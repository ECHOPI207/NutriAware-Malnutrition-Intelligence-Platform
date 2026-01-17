// Database types for NutriAware application

export interface ChildAssessment {
  id: string;
  userId?: string;
  session_id: string;
  age_months: number;
  sex: 'male' | 'female';
  weight_kg: number;
  height_cm: number;
  muac_mm?: number;
  bmi: number;
  bmi_zscore?: number;
  bmi_category: string;
  muac_category?: string;
  recommendations: Record<string, unknown>;
  created_at: string;
}

export interface ChildAssessmentInput {
  userId?: string | null;
  session_id: string;
  age_months: number;
  sex: 'male' | 'female';
  weight_kg: number;
  height_cm: number;
  muac_mm?: number | null;
  bmi: number;
  bmi_zscore?: number | null;
  bmi_category: string;
  muac_category?: string | null;
  recommendations: Record<string, unknown>;
}

export interface BMICalculation {
  id: string;
  userId?: string;
  session_id: string;
  age_years?: number;
  weight_kg: number;
  height_cm: number;
  bmi: number;
  category: string;
  recommendations: string;
  created_at: string;
}

export interface BMICalculationInput {
  userId?: string;
  session_id: string;
  age_years?: number;
  weight_kg: number;
  height_cm: number;
  bmi: number;
  category: string;
  recommendations: string;
}

export interface CalorieCalculation {
  id: string;
  userId?: string;
  session_id: string;
  age_years: number;
  gender: 'male' | 'female';
  weight_kg: number;
  height_cm: number;
  activity_level: string;
  goal: string;
  daily_calories: number;
  protein_g: number;
  carbs_g: number;
  fats_g: number;
  created_at: string;
}

export interface CalorieCalculationInput {
  userId?: string;
  session_id: string;
  age_years: number;
  gender: 'male' | 'female';
  weight_kg: number;
  height_cm: number;
  activity_level: string;
  goal: string;
  daily_calories: number;
  protein_g: number;
  carbs_g: number;
  fats_g: number;
}

export interface MealPlan {
  id: string;
  userId?: string;
  session_id: string;
  condition: string;
  meal_plan: Record<string, unknown>;
  created_at: string;
}

export interface MealPlanInput {
  userId?: string;
  session_id: string;
  condition: string;
  meal_plan: Record<string, unknown>;
}

export interface ChatConversation {
  id: string;
  session_id: string;
  message: string;
  response: string;
  created_at: string;
}

export interface ChatConversationInput {
  session_id: string;
  message: string;
  response: string;
}

export interface UserStatistics {
  child_assessments_count: number;
  bmi_calculations_count: number;
  calorie_calculations_count: number;
  meal_plans_count: number;
  chat_messages_count: number;
  first_activity: string | null;
  last_activity: string | null;
}
