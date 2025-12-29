// Firebase-compatible API layer
// TODO: Implement full Firebase integration

import { collection, addDoc, getDocs, query, where, orderBy, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type {
  ChildAssessment,
  ChildAssessmentInput,
  BMICalculation,
  BMICalculationInput,
  CalorieCalculation,
  CalorieCalculationInput,
  MealPlan,
  MealPlanInput,
  ChatConversation,
  ChatConversationInput,
  UserStatistics,
} from '@/types/database';

// ============================================================================
// Child Assessments API
// ============================================================================

export async function createChildAssessment(data: ChildAssessmentInput): Promise<ChildAssessment | null> {
  try {
    const docRef = await addDoc(collection(db, 'child_assessments'), {
      ...data,
      createdAt: serverTimestamp()
    });
    
    return {
      id: docRef.id,
      ...data,
      created_at: new Date().toISOString()
    } as ChildAssessment;
  } catch (error) {
    console.error('Error creating child assessment:', error);
    throw new Error('Failed to save child assessment');
  }
}

export async function getChildAssessments(userId: string): Promise<ChildAssessment[]> {
  try {
    const q = query(
      collection(db, 'child_assessments'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      created_at: doc.data().createdAt?.toDate?.()?.toISOString() || new Date().toISOString()
    })) as ChildAssessment[];
  } catch (error) {
    console.error('Error fetching child assessments:', error);
    return [];
  }
}

export async function deleteChildAssessment(id: string): Promise<boolean> {
  try {
    await deleteDoc(doc(db, 'child_assessments', id));
    return true;
  } catch (error) {
    console.error('Error deleting child assessment:', error);
    return false;
  }
}

// ============================================================================
// BMI Calculations API
// ============================================================================

export async function createBMICalculation(data: BMICalculationInput): Promise<BMICalculation | null> {
  try {
    const docRef = await addDoc(collection(db, 'bmi_calculations'), {
      ...data,
      createdAt: serverTimestamp()
    });
    
    return {
      id: docRef.id,
      ...data,
      created_at: new Date().toISOString()
    } as BMICalculation;
  } catch (error) {
    console.error('Error creating BMI calculation:', error);
    throw new Error('Failed to save BMI calculation');
  }
}

export async function getBMICalculations(userId: string): Promise<BMICalculation[]> {
  try {
    const q = query(
      collection(db, 'bmi_calculations'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      created_at: doc.data().createdAt?.toDate?.()?.toISOString() || new Date().toISOString()
    })) as BMICalculation[];
  } catch (error) {
    console.error('Error fetching BMI calculations:', error);
    return [];
  }
}

export async function deleteBMICalculation(id: string): Promise<boolean> {
  try {
    await deleteDoc(doc(db, 'bmi_calculations', id));
    return true;
  } catch (error) {
    console.error('Error deleting BMI calculation:', error);
    return false;
  }
}

// ============================================================================
// Calorie Calculations API
// ============================================================================

export async function createCalorieCalculation(data: CalorieCalculationInput): Promise<CalorieCalculation | null> {
  try {
    const docRef = await addDoc(collection(db, 'calorie_calculations'), {
      ...data,
      createdAt: serverTimestamp()
    });
    
    return {
      id: docRef.id,
      ...data,
      created_at: new Date().toISOString()
    } as CalorieCalculation;
  } catch (error) {
    console.error('Error creating calorie calculation:', error);
    throw new Error('Failed to save calorie calculation');
  }
}

export async function getCalorieCalculations(userId: string): Promise<CalorieCalculation[]> {
  try {
    const q = query(
      collection(db, 'calorie_calculations'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      created_at: doc.data().createdAt?.toDate?.()?.toISOString() || new Date().toISOString()
    })) as CalorieCalculation[];
  } catch (error) {
    console.error('Error fetching calorie calculations:', error);
    return [];
  }
}

// ============================================================================
// Meal Plans API
// ============================================================================

export async function createMealPlan(data: MealPlanInput): Promise<MealPlan | null> {
  try {
    const docRef = await addDoc(collection(db, 'meal_plans'), {
      ...data,
      createdAt: serverTimestamp()
    });
    
    return {
      id: docRef.id,
      ...data,
      created_at: new Date().toISOString()
    } as MealPlan;
  } catch (error) {
    console.error('Error creating meal plan:', error);
    throw new Error('Failed to save meal plan');
  }
}

export async function getMealPlans(userId: string): Promise<MealPlan[]> {
  try {
    const q = query(
      collection(db, 'meal_plans'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      created_at: doc.data().createdAt?.toDate?.()?.toISOString() || new Date().toISOString()
    })) as MealPlan[];
  } catch (error) {
    console.error('Error fetching meal plans:', error);
    return [];
  }
}

// ============================================================================
// Chat Conversations API
// ============================================================================

export async function createChatConversation(data: ChatConversationInput): Promise<ChatConversation | null> {
  try {
    const docRef = await addDoc(collection(db, 'chat_conversations'), {
      ...data,
      createdAt: serverTimestamp()
    });
    
    return {
      id: docRef.id,
      ...data,
      created_at: new Date().toISOString()
    } as ChatConversation;
  } catch (error) {
    console.error('Error creating chat conversation:', error);
    throw new Error('Failed to save chat conversation');
  }
}

export async function getChatConversations(userId: string): Promise<ChatConversation[]> {
  try {
    const q = query(
      collection(db, 'chat_conversations'),
      where('userId', '==', userId),
      orderBy('createdAt', 'asc')
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      created_at: doc.data().createdAt?.toDate?.()?.toISOString() || new Date().toISOString()
    })) as ChatConversation[];
  } catch (error) {
    console.error('Error fetching chat conversations:', error);
    return [];
  }
}

// ============================================================================
// User Statistics & Data Management
// ============================================================================

export async function deleteCalorieCalculation(id: string): Promise<boolean> {
  try {
    await deleteDoc(doc(db, 'calorie_calculations', id));
    return true;
  } catch (error) {
    console.error('Error deleting calorie calculation:', error);
    return false;
  }
}

export async function deleteMealPlan(id: string): Promise<boolean> {
  try {
    await deleteDoc(doc(db, 'meal_plans', id));
    return true;
  } catch (error) {
    console.error('Error deleting meal plan:', error);
    return false;
  }
}

export async function deleteChatConversation(id: string): Promise<boolean> {
  try {
    await deleteDoc(doc(db, 'chat_conversations', id));
    return true;
  } catch (error) {
    console.error('Error deleting chat conversation:', error);
    return false;
  }
}

export async function getUserStatistics(_userId: string): Promise<UserStatistics | null> {
  // Placeholder for future implementation
  return null;
}

export async function deleteAllUserData(_userId: string): Promise<boolean> {
  // Placeholder for future implementation
  return true;
}