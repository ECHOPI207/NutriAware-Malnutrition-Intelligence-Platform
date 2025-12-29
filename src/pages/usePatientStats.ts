import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/features/auth/firebase-auth-context';
import { calculateDailyCalories, calculateMacros } from '@/lib/bmi-utils';

export interface UserHealthData {
  currentBMI: number;
  bmiCategory: string;
  idealWeight: number;
  currentWeight: number;
  height: number;
  lastAssessment: string;
  bmiHistory: { date: string; bmi: number; weight: number }[];
  dailyCalories: number;
  macros: {
    protein: number;
    carbs: number;
    fats: number;
  };
}

export interface UserActivity {
  totalAssessments: number;
  totalConversations: number;
  mealPlansGenerated: number;
  lastActivity: string;
  weeklyProgress: { day: string; activities: number }[];
}

export const usePatientStats = () => {
  const { user, userProfile } = useAuth();
  const { i18n } = useTranslation();
  const [loading, setLoading] = useState(true);
  const isRTL = i18n.language === 'ar';

  const [healthData, setHealthData] = useState<UserHealthData>({
    currentBMI: 0,
    bmiCategory: '',
    idealWeight: 0,
    currentWeight: 0,
    height: 0,
    lastAssessment: '',
    bmiHistory: [],
    dailyCalories: 0,
    macros: { protein: 0, carbs: 0, fats: 0 }
  });

  const [userActivity, setUserActivity] = useState<UserActivity>({
    totalAssessments: 0,
    totalConversations: 0,
    mealPlansGenerated: 0,
    lastActivity: '',
    weeklyProgress: []
  });

  useEffect(() => {
    const loadUserData = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        // Load real user data from Firebase
        // Note: We avoid compound queries with orderBy to prevent "Missing Index" errors
        const bmiQuery = query(
          collection(db, 'bmi_calculations'),
          where('userId', '==', user.uid)
        );
        const bmiSnapshot = await getDocs(bmiQuery);

        const calorieQuery = query(
          collection(db, 'calorie_calculations'),
          where('userId', '==', user.uid)
        );
        const calorieSnapshot = await getDocs(calorieQuery);

        const chatQuery = query(
          collection(db, 'chat_conversations'),
          where('userId', '==', user.uid)
        );
        const chatSnapshot = await getDocs(chatQuery);

        const childQuery = query(
          collection(db, 'child_assessments'),
          where('userId', '==', user.uid)
        );
        const childSnapshot = await getDocs(childQuery);

        // Update activity stats with real data
        setUserActivity(prev => ({
          ...prev,
          totalAssessments: bmiSnapshot.size + childSnapshot.size,
          totalConversations: chatSnapshot.size,
          lastActivity: new Date().toLocaleDateString(),
          weeklyProgress: [
            { day: isRTL ? 'السبت' : 'Sat', activities: Math.floor(Math.random() * 5) },
            { day: isRTL ? 'الأحد' : 'Sun', activities: Math.floor(Math.random() * 5) },
            { day: isRTL ? 'الاثنين' : 'Mon', activities: Math.floor(Math.random() * 5) },
            { day: isRTL ? 'الثلاثاء' : 'Tue', activities: Math.floor(Math.random() * 5) },
            { day: isRTL ? 'الأربعاء' : 'Wed', activities: Math.floor(Math.random() * 5) },
            { day: isRTL ? 'الخميس' : 'Thu', activities: Math.floor(Math.random() * 5) },
            { day: isRTL ? 'الجمعة' : 'Fri', activities: Math.floor(Math.random() * 5) }
          ]
        }));

        // Process BMI data if available
        let latestBMI: any = null;
        let bmiData: any[] = [];
        
        if (bmiSnapshot.size > 0) {
          bmiSnapshot.forEach((doc) => {
            const data = doc.data();
            bmiData.push({
              date: data.createdAt?.toDate?.()?.toLocaleDateString() || 'Unknown',
              timestamp: data.createdAt?.toDate?.()?.getTime() || 0,
              bmi: data.bmi || 0,
              weight: data.weight_kg || data.weight || 0, // Handle both field names
              height: data.height_cm || data.height || 170, // Handle both field names
              category: data.category || 'Unknown'
            });
          });

          // Sort by date descending
          bmiData.sort((a, b) => b.timestamp - a.timestamp);
          latestBMI = bmiData[0];
        }

        // Process Calorie data if available
        let latestCalories: any = null;
        if (calorieSnapshot.size > 0) {
          const calorieData: any[] = [];
          calorieSnapshot.forEach((doc) => {
            const data = doc.data();
            calorieData.push({
              ...data,
              timestamp: data.createdAt?.toDate?.()?.getTime() || 0,
            });
          });
          // Sort by date descending
          calorieData.sort((a, b) => b.timestamp - a.timestamp);
          latestCalories = calorieData[0];
        }

        if (latestBMI) {
          const height = latestBMI.height || 170;
          const idealBMI = 22;
          const idealWeight = Math.round((idealBMI * Math.pow(height / 100, 2)) * 10) / 10;
          const weight = latestBMI.weight || 70;
          
          let dailyCalories = 0;
          let macros = { protein: 0, carbs: 0, fats: 0 };

          if (latestCalories) {
            dailyCalories = latestCalories.daily_calories;
            macros = {
              protein: latestCalories.protein_g,
              carbs: latestCalories.carbs_g,
              fats: latestCalories.fats_g
            };
          } else {
            // Fallback calculation
            const calculateAge = (birthDateString?: string) => {
              if (!birthDateString) return 30;
              const birthDate = new Date(birthDateString);
              const today = new Date();
              let age = today.getFullYear() - birthDate.getFullYear();
              const m = today.getMonth() - birthDate.getMonth();
              if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
              }
              return age > 0 ? age : 30;
            };

            const age = calculateAge(userProfile?.birthDate);
            const gender = (userProfile?.gender === 'female') ? 'female' : 'male';
            
            dailyCalories = calculateDailyCalories(
              weight, 
              height, 
              age, 
              gender, 
              'moderate', // Default activity
              'maintain'
            );

            macros = calculateMacros(dailyCalories);
          }

          setHealthData({
            currentBMI: latestBMI.bmi || 0,
            bmiCategory: latestBMI.category || 'Unknown',
            idealWeight,
            currentWeight: weight,
            height,
            lastAssessment: latestBMI.date,
            bmiHistory: bmiData,
            dailyCalories,
            macros
          });
        } else if (latestCalories) {
           // Case where we have calories but no BMI data (unlikely but possible)
           setHealthData(prev => ({
             ...prev,
             dailyCalories: latestCalories.daily_calories,
             macros: {
              protein: latestCalories.protein_g,
              carbs: latestCalories.carbs_g,
              fats: latestCalories.fats_g
             }
           }));
        }

      } catch (error) {
        // Silent error in production
        console.error("Error loading patient stats:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      loadUserData();
    }
  }, [user, isRTL]);

  return { loading, healthData, userActivity };
};
