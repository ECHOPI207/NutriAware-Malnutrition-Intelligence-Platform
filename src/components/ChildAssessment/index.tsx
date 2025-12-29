import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import ChildAssessmentForm, { FormData } from './Form';
import ResultsCard, { AssessmentResult } from './ResultsCard';
import { getTranslation, ChildAssessmentLanguage } from './i18n';
import {
  computeZscore,
  classifyBMIforAge,
  classifyMUAC,
  findClosestLMS,
  WHOData
} from './ZScoreUtils';
import { calculateBMI } from '@/lib/bmi-utils';
import { getSessionId } from '@/lib/session';
import { useAuth } from '@/features/auth/firebase-auth-context';
import { createChildAssessment, getChildAssessments, deleteChildAssessment } from '@/db/api';
import type { ChildAssessment as ChildAssessmentDB } from '@/types/database';

interface HistoryEntry {
  id?: string;
  date: string;
  input: FormData;
  result: AssessmentResult;
}

const ChildAssessment: React.FC = () => {
  const { language: globalLanguage } = useLanguage();
  const { user } = useAuth();
  const language = globalLanguage as ChildAssessmentLanguage;
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [isProcessingAI, setIsProcessingAI] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [whoData, setWhoData] = useState<WHOData | null>(null);
  const { toast } = useToast();
  const t = getTranslation(language);

  // Load WHO LMS data with retry logic
  useEffect(() => {
    const loadWHOData = async (retryCount = 0) => {
      try {
        const response = await fetch('/data/who-lms/sample-bmi-age.json');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Validate data structure
        if (!data.male || !data.female) {
          throw new Error('Invalid WHO data structure');
        }
        
        setWhoData(data);
        console.log('WHO data loaded successfully');
      } catch (error) {
        console.error('Error loading WHO data:', error);
        
        // Retry up to 3 times with exponential backoff
        if (retryCount < 3) {
          const delay = Math.pow(2, retryCount) * 1000; // 1s, 2s, 4s
          // console.log(`Retrying WHO data load in ${delay}ms... (attempt ${retryCount + 1}/3)`);
          setTimeout(() => loadWHOData(retryCount + 1), delay);
        } else {
          toast({
            title: 'Error',
            description: 'Failed to load WHO growth standards data. Please refresh the page.',
            variant: 'destructive'
          });
        }
      }
    };

    loadWHOData();
  }, []);

  // Load history from database
  useEffect(() => {
    const loadHistory = async () => {
      try {
        const sessionId = getSessionId();
        const assessments = await getChildAssessments(sessionId);
        
        // Convert database records to history entries
        const historyEntries: HistoryEntry[] = assessments.map((assessment: ChildAssessmentDB) => {
          const classification = classifyBMIforAge(
            assessment.bmi_zscore || 0,
            assessment.age_months,
            assessment.sex
          );
          
          let muacClassification = undefined;
          if (assessment.muac_category) {
            muacClassification = classifyMUAC(
              assessment.muac_mm || 0,
              assessment.age_months,
              assessment.sex
            );
          }
          
          return {
            id: assessment.id,
            date: assessment.created_at,
            input: {
              ageMonths: assessment.age_months,
              sex: assessment.sex,
              weightKg: assessment.weight_kg,
              heightCm: assessment.height_cm,
              muacMm: assessment.muac_mm
            },
            result: {
              bmi: assessment.bmi,
              zScore: assessment.bmi_zscore || 0,
              classification,
              muacClassification,
              aiRecommendations: assessment.recommendations as {
                summary: string;
                advice1: string;
                advice2: string;
              } | undefined
            }
          };
        });
        
        setHistory(historyEntries);
      } catch (error) {
        console.error('Error loading history:', error);
      }
    };

    loadHistory();
  }, []);

  // Save to database
  const saveToHistory = async (input: FormData, result: AssessmentResult) => {
    try {
      const sessionId = getSessionId();
      
      const assessmentData = {
        userId: user?.uid,
        session_id: sessionId,
        age_months: input.ageMonths!,
        sex: input.sex!,
        weight_kg: input.weightKg!,
        height_cm: input.heightCm!,
        muac_mm: input.muacMm,
        bmi: result.bmi,
        bmi_zscore: result.zScore,
        bmi_category: result.classification.category,
        muac_category: result.muacClassification?.category,
        recommendations: result.aiRecommendations || {}
      };

      const savedAssessment = await createChildAssessment(assessmentData);
      
      if (savedAssessment) {
        const entry: HistoryEntry = {
          id: savedAssessment.id,
          date: savedAssessment.created_at,
          input,
          result
        };

        setHistory([entry, ...history]);

        toast({
          title: language === 'ar' ? 'Saved' : 'Saved',
          description: t.results.savedToHistory
        });
      }
    } catch (error) {
      console.error('Error saving to history:', error);
      toast({
        title: language === 'ar' ? 'Error' : 'Error',
        description: language === 'ar' 
          ? 'Failed to save assessment. Please try again.' 
          : 'Failed to save assessment. Please try again.',
        variant: 'destructive'
      });
    }
  };

  // Clear history
  const clearHistory = async () => {
    try {
      const deletePromises = history
        .filter(entry => entry.id)
        .map(entry => deleteChildAssessment(entry.id!));
      
      await Promise.all(deletePromises);
      
      setHistory([]);
      toast({
        title: language === 'ar' ? 'Cleared' : 'Cleared',
        description: language === 'ar' ? 'History cleared successfully' : 'History cleared successfully'
      });
    } catch (error) {
      console.error('Error clearing history:', error);
      toast({
        title: language === 'ar' ? 'Error' : 'Error',
        description: language === 'ar' 
          ? 'Failed to clear history. Please try again.' 
          : 'Failed to clear history. Please try again.',
        variant: 'destructive'
      });
    }
  };

  // تصدير السجل كـ JSON
  const exportHistory = () => {
    const dataStr = JSON.stringify(history, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `nutriaware_child_history_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);

    toast({
      title: language === 'ar' ? 'تم التصدير' : 'Exported',
      description: language === 'ar' ? 'تم تصدير السجل بنجاح' : 'History exported successfully'
    });
  };

  // الحصول على التوصيات الذكية بناءً على التصنيف
  const getAIRecommendations = (severity: string) => {
    const adviceKey = severity === 'severe' ? 'severe' 
      : severity === 'moderate' ? 'moderate'
      : severity === 'normal' ? 'normal'
      : severity === 'overweight' ? 'overweight'
      : severity === 'obese' ? 'obese'
      : 'atRisk';

    return t.aiAdvice[adviceKey as keyof typeof t.aiAdvice];
  };

  // معالجة إرسال النموذج
  const handleSubmit = async (formData: FormData) => {
    if (!whoData) {
      toast({
        title: language === 'ar' ? 'خطأ' : 'Error',
        description: language === 'ar' 
          ? 'بيانات WHO غير متوفرة. يرجى إعادة تحميل الصفحة.' 
          : 'WHO data not available. Please reload the page.',
        variant: 'destructive'
      });
      return;
    }

    setIsCalculating(true);
    setResult(null);

    // محاكاة وقت المعالجة (800-1200ms)
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 400));

    try {
      // حساب BMI
      const { rawBmi, bmi: roundedBmi } = calculateBMI(formData.weightKg, formData.heightCm || 0);

      // البحث عن أقرب بيانات LMS
      const lmsData = findClosestLMS(formData.ageMonths, formData.sex, whoData);
      
      if (!lmsData) {
        throw new Error('لم يتم العثور على بيانات LMS مناسبة');
      }

      // حساب Z-Score
      const zScore = computeZscore(rawBmi, lmsData.L, lmsData.M, lmsData.S);

      // التصنيف
      const classification = classifyBMIforAge(zScore, formData.ageMonths, formData.sex);

      // تصنيف MUAC إذا كان موجودًا
      let muacClassification = undefined;
      if (formData.muacMm) {
        muacClassification = classifyMUAC(formData.muacMm, formData.ageMonths, formData.sex);
      }

      const assessmentResult: AssessmentResult = {
        bmi: roundedBmi,
        zScore,
        classification,
        muacClassification
      };

      setResult(assessmentResult);
      setIsCalculating(false);

      // معالجة التوصيات الذكية
      setIsProcessingAI(true);
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 500));

      const aiRecommendations = getAIRecommendations(classification.severity);
      const finalResult = {
        ...assessmentResult,
        aiRecommendations
      };

      setResult(finalResult);
      setIsProcessingAI(false);

      // حفظ في السجل
      saveToHistory(formData, finalResult);

    } catch (error) {
      console.error('خطأ في الحساب:', error);
      setIsCalculating(false);
      setIsProcessingAI(false);
      toast({
        title: language === 'ar' ? 'خطأ' : 'Error',
        description: language === 'ar' 
          ? 'حدث خطأ أثناء الحساب. يرجى المحاولة مرة أخرى.' 
          : 'An error occurred during calculation. Please try again.',
        variant: 'destructive'
      });
    }
  };

  return (
    <div className={`min-h-screen ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="container mx-auto px-4 py-8">
        {/* العنوان */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold mb-2">{t.title}</h1>
            <p className="text-muted-foreground">{t.subtitle}</p>
          </div>
        </motion.div>

        {/* النموذج والنتائج */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, x: language === 'ar' ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <ChildAssessmentForm
              language={language}
              onSubmit={handleSubmit}
              isCalculating={isCalculating}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: language === 'ar' ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <ResultsCard
              language={language}
              result={result}
              isCalculating={isCalculating}
              isProcessingAI={isProcessingAI}
            />
          </motion.div>
        </div>

        {/* السجل */}
        {history.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>{t.history.title}</CardTitle>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={exportHistory}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      {t.history.export}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={clearHistory}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      {t.history.clear}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {history.map((entry, index) => (
                    <div
                      key={index}
                      className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="text-sm text-muted-foreground">
                          {t.history.date}: {new Date(entry.date).toLocaleString(language === 'ar' ? 'ar-EG' : 'en-US')}
                        </div>
                        <div className="text-sm font-medium">
                          {t.history.age}: {entry.input.ageMonths} {t.history.months}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">{t.history.bmi}:</span>{' '}
                          <span className="font-medium">{entry.result.bmi.toFixed(2)}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">{t.history.zScore}:</span>{' '}
                          <span className="font-medium">{entry.result.zScore.toFixed(2)}</span>
                        </div>
                        <div className="col-span-2">
                          <span className="text-muted-foreground">{t.history.classification}:</span>{' '}
                          <span className={`font-medium ${entry.result.classification.color}`}>
                            {language === 'ar' 
                              ? entry.result.classification.categoryAr 
                              : entry.result.classification.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ChildAssessment;
