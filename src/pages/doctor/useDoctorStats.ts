import { useState, useEffect, useCallback } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { format, subDays, startOfDay, isSameDay } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { getBMICategoryLabel, getBMICategoryColor } from '@/lib/bmi-utils';

export interface PatientStats {
  totalPatients: number;
  newPatientsToday: number;
  newPatientsWeek: number;
  activeCases: number;
  closedCases: number;
  avgBMI: number;
  highRiskCount: number;
  underweightCount: number;
  normalCount: number;
  overweightCount: number;
  obeseCount: number;
}

export interface NutritionalAnalysis {
  bmiDistribution: { category: string; count: number; color: string }[];
  ageDistribution: { ageGroup: string; male: number; female: number }[];
  genderDistribution: { gender: string; count: number }[];
  riskLevels: { level: string; count: number; color: string }[];
}

export const useDoctorStats = (user: any, timeRange: '7d' | '30d') => {
  const { i18n } = useTranslation();
  const [loading, setLoading] = useState(true);
  
  const [patientStats, setPatientStats] = useState<PatientStats>({
    totalPatients: 0,
    newPatientsToday: 0,
    newPatientsWeek: 0,
    activeCases: 0,
    closedCases: 0,
    avgBMI: 0,
    highRiskCount: 0,
    underweightCount: 0,
    normalCount: 0,
    overweightCount: 0,
    obeseCount: 0
  });

  const [patients, setPatients] = useState<any[]>([]);

  const [nutritionalAnalysis, setNutritionalAnalysis] = useState<NutritionalAnalysis>({
    bmiDistribution: [],
    ageDistribution: [],
    genderDistribution: [],
    riskLevels: []
  });

  const [patientGrowthData, setPatientGrowthData] = useState<any[]>([]);

  const loadStats = useCallback(async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      
      // Fetch data
      const childAssessmentsQuery = query(
        collection(db, 'child_assessments'),
        orderBy('createdAt', 'desc')
      );
      const childAssessmentsSnapshot = await getDocs(childAssessmentsQuery);
      const childAssessments = childAssessmentsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        created_at: doc.data().createdAt?.toDate?.() || new Date()
      }));

      const bmiCalculationsQuery = query(
        collection(db, 'bmi_calculations'),
        orderBy('createdAt', 'desc')
      );
      const bmiCalculationsSnapshot = await getDocs(bmiCalculationsQuery);
      const bmiCalculations = bmiCalculationsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        created_at: doc.data().createdAt?.toDate?.() || new Date()
      }));

      // Merge and deduplicate (simple merge for now as per original code, but ideally should check IDs if they overlap)
      // Note: Original code just concatenated them. We'll stick to that to preserve behavior.
      const allPatients = [...childAssessments, ...bmiCalculations];
      const totalPatients = allPatients.length;

      const today = startOfDay(new Date());
      const weekAgo = subDays(today, 7);

      const newPatientsToday = allPatients.filter(p =>
        p.created_at >= today
      ).length;

      const newPatientsWeek = allPatients.filter(p =>
        p.created_at >= weekAgo
      ).length;

      let totalBMI = 0;
      let bmiCount = 0;
      let underweightCount = 0;
      let normalCount = 0;
      let overweightCount = 0;
      let obeseCount = 0;
      let highRiskCount = 0;

      allPatients.forEach((patient: any) => {
        if (patient.bmi) {
          totalBMI += patient.bmi;
          bmiCount++;

          const category = patient.bmi_category || patient.category || '';
          // Check for English or Arabic terms
          const isUnderweight = category.includes('underweight') || category.includes('نحافة');
          const isNormal = category.includes('normal') || category.includes('طبيعي');
          const isOverweight = category.includes('overweight') || category.includes('زيادة');
          const isObese = category.includes('obese') || category.includes('سمنة');

          if (isUnderweight) {
            underweightCount++;
            if (patient.bmi < 16) highRiskCount++;
          } else if (isNormal) {
            normalCount++;
          } else if (isOverweight) {
            overweightCount++;
          } else if (isObese) {
            obeseCount++;
            if (patient.bmi > 35) highRiskCount++;
          }
        }
      });

      const avgBMI = bmiCount > 0 ? Math.round((totalBMI / bmiCount) * 10) / 10 : 0;

      const bmiCategories = [
        { 
          category: getBMICategoryLabel('underweight', i18n.language), 
          count: underweightCount, 
          color: getBMICategoryColor('underweight') 
        },
        { 
          category: getBMICategoryLabel('normal', i18n.language), 
          count: normalCount, 
          color: getBMICategoryColor('normal') 
        },
        { 
          category: getBMICategoryLabel('overweight', i18n.language), 
          count: overweightCount, 
          color: getBMICategoryColor('overweight') 
        },
        { 
          category: getBMICategoryLabel('obese', i18n.language), 
          count: obeseCount, 
          color: getBMICategoryColor('obese') 
        }
      ];

      // Mock age groups as per original code
      const ageGroups = [
        { ageGroup: '0-5', male: Math.floor(totalPatients * 0.3), female: Math.floor(totalPatients * 0.2) },
        { ageGroup: '6-12', male: Math.floor(totalPatients * 0.2), female: Math.floor(totalPatients * 0.1) },
        { ageGroup: '13-18', male: Math.floor(totalPatients * 0.1), female: Math.floor(totalPatients * 0.1) },
      ];

      setPatientStats({
        totalPatients,
        newPatientsToday,
        newPatientsWeek,
        activeCases: Math.floor(totalPatients * 0.7), // Keeping logic from original
        closedCases: Math.floor(totalPatients * 0.3), // Keeping logic from original
        avgBMI,
        highRiskCount,
        underweightCount,
        normalCount,
        overweightCount,
        obeseCount
      });

      setNutritionalAnalysis({
        bmiDistribution: bmiCategories,
        ageDistribution: ageGroups,
        genderDistribution: [],
        riskLevels: []
      });

      setPatients(allPatients);

      // Real Patient Growth Data
      // Generate last 14 days data
      const growthData = Array.from({ length: 14 }, (_, i) => {
        const date = subDays(today, 13 - i);
        const dateStr = format(date, 'MM-dd');
        // Count patients created on this day
        const count = allPatients.filter(p => isSameDay(p.created_at, date)).length;
        return {
          day: dateStr,
          patients: count
        };
      });
      setPatientGrowthData(growthData);

    } catch (error) {
      console.error('Error loading doctor stats:', error);
    } finally {
      setLoading(false);
    }
  }, [user, i18n.language]);

  useEffect(() => {
    loadStats();
  }, [loadStats, timeRange]);

  return {
    loading,
    patientStats,
    patients,
    nutritionalAnalysis,
    patientGrowthData,
    refreshStats: loadStats
  };
};
