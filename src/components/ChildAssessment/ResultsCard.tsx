import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { CheckCircle2, Share2, Printer } from 'lucide-react';
import { getTranslation, ChildAssessmentLanguage } from './i18n';
import { useToast } from '@/hooks/use-toast';
import { ClassificationResult } from './ZScoreUtils';

export interface AssessmentResult {
  bmi: number;
  zScore: number;
  classification: ClassificationResult;
  muacClassification?: ClassificationResult;
  aiRecommendations?: {
    summary: string;
    advice1: string;
    advice2: string;
  };
}

interface ResultsCardProps {
  language: ChildAssessmentLanguage;
  result: AssessmentResult | null;
  isCalculating: boolean;
  isProcessingAI: boolean;
}

const ResultsCard: React.FC<ResultsCardProps> = ({ 
  language, 
  result, 
  isCalculating,
  isProcessingAI 
}) => {
  const t = getTranslation(language);
  const isRTL = language === 'ar';
  const printRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handlePrint = () => {
    window.print();
    toast({
      title: isRTL ? 'تم الطباعة بنجاح' : 'Printed Successfully',
      description: isRTL ? 'يمكنك الآن حفظ التقرير كملف PDF' : 'You can now save the report as PDF',
    });
  };

  const handleShare = async () => {
    if (!result) return;
    
    // Create share text
    const title = t.medicalReport.reportTitle;
    const bmiText = `${t.results.bmi}: ${result.bmi.toFixed(1)}`;
    const zScoreText = `${t.results.zScore}: ${result.zScore > 0 ? '+' : ''}${result.zScore.toFixed(2)}`;
    const classificationText = `${t.results.classification}: ${isRTL ? result.classification.categoryAr : result.classification.category}`;
    const disclaimer = t.results.disclaimer;
    
    const shareText = `${title}\n\n${bmiText}\n${zScoreText}\n${classificationText}\n\n${disclaimer}\n\nNutriAware Platform`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: title,
          text: shareText,
        });
      } else {
        await navigator.clipboard.writeText(shareText);
        toast({
          title: isRTL ? 'معلومات التقييم' : 'Assessment Info',
          description: isRTL ? 'تم نسخ النتيجة للحافظة' : 'Result copied to clipboard',
        });
      }
    } catch (error) {
      console.error('Error sharing:', error);
      // Fallback for cancellation or errors
    }
  };


  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'severe': return 'text-red-600 bg-red-500/10 border-red-500/20';
      case 'moderate': return 'text-orange-600 bg-orange-500/10 border-orange-500/20';
      case 'normal': return 'text-green-600 bg-green-500/10 border-green-500/20';
      case 'overweight': return 'text-yellow-600 bg-yellow-500/10 border-yellow-500/20';
      case 'risk': return 'text-yellow-600 bg-yellow-500/10 border-yellow-500/20';
      case 'obese': return 'text-red-700 bg-red-600/10 border-red-600/20';
      default: return 'text-gray-600 bg-gray-500/10 border-gray-500/20';
    }
  };

  const getGradientText = (severity: string) => {
     switch (severity) {
      case 'severe': return 'from-red-500 to-red-700'; // Red
      case 'moderate': return 'from-orange-500 to-orange-700'; // Orange
      case 'normal': return 'from-green-500 to-green-700'; // Green
      case 'overweight': return 'from-yellow-500 to-yellow-600'; // Yellow
      case 'obese': return 'from-red-600 to-red-800'; // Dark Red
      default: return 'from-gray-500 to-gray-700';
    }
  };


  if (isCalculating) {
    return (
      <Card className="h-full border-0 shadow-xl bg-card/60 backdrop-blur-xl ring-1 ring-border/20">
        <CardHeader>
          <Skeleton className="h-8 w-3/4 mb-2 bg-muted/60" />
          <Skeleton className="h-4 w-1/2 bg-muted/40" />
        </CardHeader>
        <CardContent className="space-y-6">
          <Skeleton className="h-32 w-full rounded-2xl bg-muted/30" />
          <div className="space-y-3">
            <Skeleton className="h-4 w-full bg-muted/30" />
            <Skeleton className="h-4 w-5/6 bg-muted/30" />
            <Skeleton className="h-4 w-4/6 bg-muted/30" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!result) {
    return (
      <Card className="h-full border-0 shadow-xl bg-card/60 backdrop-blur-xl ring-1 ring-border/20 flex flex-col justify-center items-center text-center p-8">
        <CardContent className="space-y-4 max-w-sm">
           <div className="w-20 h-20 mx-auto rounded-full bg-accent/10 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-10 h-10 text-accent/50" />
           </div>
          <h3 className="text-xl font-bold">{t.results.waiting}</h3>
          <p className="text-muted-foreground leading-relaxed">
            {t.results.waitingDesc}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full border-0 shadow-xl bg-card/60 backdrop-blur-xl ring-1 ring-border/20 overflow-hidden flex flex-col">
       <div className={`h-1.5 w-full bg-gradient-to-r ${getGradientText(result.classification.severity)}`} />
      <CardHeader ref={printRef} className="pb-4">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
             <CardTitle className="text-2xl font-bold flex items-center gap-2">
               {t.results.analysis}
            </CardTitle>
            <CardDescription className="text-base">{t.results.analysisDesc}</CardDescription>
          </div>
           {/* Status Badge - Top Right */}
           <div className={`px-4 py-1.5 rounded-full border-2 font-bold text-sm uppercase tracking-wide ${getSeverityColor(result.classification.severity)}`}>
               {isRTL ? result.classification.categoryAr : result.classification.category}
           </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-8 p-6 md:p-8 flex-grow">
        {/* Main Result */}
        <div className="flex flex-col items-center text-center space-y-2 py-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-1">{t.results.bmiZScore}</h3>
             <div className="flex items-baseline gap-2">
               <span className={`text-6xl font-black tracking-tighter bg-gradient-to-br bg-clip-text text-transparent ${getGradientText(result.classification.severity)}`}>
                 {result.zScore.toFixed(2)}
               </span>
               <span className="text-xl font-bold text-foreground">SD</span>
             </div>
             <p className="text-lg text-muted-foreground font-medium">BMI: {result.bmi.toFixed(1)}</p>
        </div>

        {/* MUAC Result if available */}
        {result.muacClassification && (
            <div className={`p-4 rounded-xl border-2 ${getSeverityColor(result.muacClassification.severity)} bg-background/50`}>
                <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-sm uppercase tracking-wide">MUAC</span>
                    <span className="font-bold text-sm">
                        {isRTL ? result.muacClassification.categoryAr : result.muacClassification.category}
                    </span>
                </div>
                <div className="h-2 w-full bg-black/5 rounded-full overflow-hidden">
                    <div className={`h-full w-full opacity-50 ${result.muacClassification.severity === 'severe' ? 'bg-red-500' : result.muacClassification.severity === 'moderate' ? 'bg-orange-500' : 'bg-green-500'}`} />
                </div>
            </div>
        )}

        {/* AI Recommendations */}
        <div className="space-y-4">
           <div className="flex items-center gap-2 font-bold text-lg">
             <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center text-accent">
                <CheckCircle2 className="w-5 h-5" />
             </div>
             {t.results.recommendations}
           </div>
          
          {isProcessingAI ? (
            <div className="space-y-3 pl-4 border-l-2 border-accent/20">
              <Skeleton className="h-4 w-3/4 bg-muted/50" />
              <Skeleton className="h-4 w-5/6 bg-muted/50" />
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="p-4 rounded-xl bg-accent/5 border border-accent/10">
                 <p className="font-semibold text-foreground mb-2">{result.aiRecommendations?.summary}</p>
                 <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-muted-foreground">
                       <span className={`mt-1.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0`} />
                       {result.aiRecommendations?.advice1}
                    </li>
                    <li className="flex items-start gap-2 text-sm text-muted-foreground">
                       <span className={`mt-1.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0`} />
                       {result.aiRecommendations?.advice2}
                    </li>
                 </ul>
              </div>
            </motion.div>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex gap-3 p-6 pt-0 mt-auto">
        <Button 
          variant="outline" 
          className="flex-1 h-12 text-base font-medium rounded-xl border-2 border-muted hover:bg-muted/50 transition-all"
          onClick={handlePrint}
        >
          <Printer className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          {t.results.print}
        </Button>
        <Button 
          className="flex-1 h-12 text-base font-bold rounded-xl bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all"
          onClick={handleShare}
        >
           <Share2 className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
           {t.results.share}
        </Button>
      </CardFooter>
      
       <div className="px-6 pb-6 text-xs text-center text-muted-foreground opacity-60">
           {t.results.disclaimer}
       </div>
    </Card>
  );
};

export default ResultsCard;
