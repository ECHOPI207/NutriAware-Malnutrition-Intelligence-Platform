import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Trash2, History, Baby } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import ChildAssessmentForm, { FormData } from './Form';
import ResultsCard, { AssessmentResult } from './ResultsCard';
import { getTranslation, ChildAssessmentLanguage } from './i18n';
import AssessmentReport from './AssessmentReport';
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

export interface HistoryEntry {
  id?: string;
  date: string;
  input: FormData;
  result: AssessmentResult;
}

const ChildAssessment: React.FC = () => {
  const { language: globalLanguage } = useLanguage();
  const { user } = useAuth();
  const language = globalLanguage as ChildAssessmentLanguage;
  const isRTL = language === 'ar';
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
      
      // Sanitizing data: Firestore prefers null over undefined for "no value" unless configured otherwise
      const assessmentData = {
        userId: user?.uid || null,
        session_id: sessionId || 'anonymous-session',
        age_months: input.ageMonths || 0,
        sex: input.sex || 'male',
        weight_kg: input.weightKg || 0,
        height_cm: input.heightCm || 0,
        muac_mm: input.muacMm || null,
        bmi: result.bmi || 0,
        bmi_zscore: result.zScore || null,
        bmi_category: result.classification.category || '',
        muac_category: result.muacClassification?.category || null,
        recommendations: result.aiRecommendations || {}
      };

      // Only save to DB if user is logged in
      if (user?.uid) {
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
            title: language === 'ar' ? 'تم الحفظ' : 'Saved',
            description: t.results.savedToHistory
          });
        }
      } else {
        // Guest user - just show result without saving to history
        // Or valid option: save to local storage only (not implementing full local persist here yet)
        toast({
          title: language === 'ar' ? 'تنبيه' : 'Note',
          description: language === 'ar' 
            ? 'يجب تسجيل الدخول لحفظ التقييم في السجل.' 
            : 'You must be logged in to save assessment history.',
          variant: 'default'
        });
      }
    } catch (error) {
      console.error('Error saving to history:', error);
      toast({
        title: language === 'ar' ? 'خطأ' : 'Error',
        description: language === 'ar' 
          ? 'فشل حفظ التقييم. يرجى المحاولة مرة أخرى.' 
          : 'Failed to save assessment. Please try again.',
        variant: 'destructive'
      });
    }
  };

  const [printingEntry, setPrintingEntry] = useState<HistoryEntry | null>(null);
  const reportRef = useRef<HTMLDivElement>(null);

  const handleDownloadReport = (entry: HistoryEntry) => {
    setPrintingEntry(entry);
    // Give React a moment to render the report before printing
    setTimeout(() => {
      window.print();
    }, 100);
  };
  
  const handleExportLatest = () => {
    if (history.length > 0) {
      handleDownloadReport(history[0]);
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
        title: language === 'ar' ? 'تم المسح' : 'Cleared',
        description: language === 'ar' ? 'تم مسح السجل بنجاح' : 'History cleared successfully'
      });
    } catch (error) {
      console.error('Error clearing history:', error);
      toast({
        title: language === 'ar' ? 'خطأ' : 'Error',
        description: language === 'ar' 
          ? 'فشل مسح السجل. يرجى المحاولة مرة أخرى.' 
          : 'Failed to clear history. Please try again.',
        variant: 'destructive'
      });
    }
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
    <div className={`w-full ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Print Component - Hidden in screen, visible in print */}
      {/* Print Component - Hidden in screen, visible in print */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-report, #printable-report * {
            visibility: visible;
          }
          #printable-report {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
        }
      `}</style>
      <div id="printable-report" className="hidden print:block">
        <AssessmentReport 
          entry={printingEntry || (history.length > 0 ? history[0] : null)} 
          language={language} 
          ref={reportRef} 
        />
      </div>
      
      {/* Main UI - Hidden in print */}
      <div className="print:hidden">
        {/* العنوان */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <div className="inline-flex items-center justify-center p-3 mb-4 rounded-xl bg-accent/10 text-accent ring-1 ring-accent/20">
             <Baby className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold mb-2 tracking-tight">{t.title}</h2>
          <p className="text-muted-foreground">{t.subtitle}</p>
        </motion.div>

        {/* النموذج والنتائج */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
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
            initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
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
            <Card className="border-0 shadow-lg bg-card/40 backdrop-blur-lg">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center gap-2 text-xl">
                      <History className="w-5 h-5 text-muted-foreground" />
                      {t.history.title}
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleExportLatest}
                      className="bg-transparent border-primary/20 hover:bg-primary/5 hover:text-primary transition-colors"
                    >
                      <Download className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                      {t.results.downloadReport}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={clearHistory}
                      className="bg-transparent border-destructive/20 hover:bg-destructive/5 hover:text-destructive transition-colors text-destructive"
                    >
                      <Trash2 className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                      {t.history.clear}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {history.map((entry, index) => (
                    <div
                      key={index}
                      className="p-5 border border-border/40 rounded-xl bg-background/40 hover:bg-background/80 transition-all duration-300 shadow-sm"
                    >
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
                        <div className="text-sm text-muted-foreground">
                           <span className="font-medium text-foreground">{t.history.date}:</span> {new Date(entry.date).toLocaleString(isRTL ? 'ar-EG' : 'en-US')}
                        </div>
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">
                           {t.history.age}: {entry.input.ageMonths} {t.history.months}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div className="p-3 rounded-lg bg-background/50 border border-border/30">
                          <span className="text-muted-foreground block text-xs mb-1">{t.history.bmi}</span>
                          <span className="font-bold text-lg">{entry.result.bmi.toFixed(2)}</span>
                        </div>
                        <div className="p-3 rounded-lg bg-background/50 border border-border/30">
                          <span className="text-muted-foreground block text-xs mb-1">{t.history.zScore}</span>
                          <span className="font-bold text-lg">{entry.result.zScore.toFixed(2)}</span>
                        </div>
                        <div className="col-span-2 p-3 rounded-lg bg-background/50 border border-border/30 flex flex-col justify-center">
                          <span className="text-muted-foreground block text-xs mb-1">{t.history.classification}</span>
                          <span className={`font-bold ${entry.result.classification.color}`}>
                            {isRTL 
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
