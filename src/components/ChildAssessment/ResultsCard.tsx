import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, TrendingUp, Activity, Ruler } from 'lucide-react';
import { getTranslation, ChildAssessmentLanguage } from './i18n';
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

  // عرض حالة التحميل
  if (isCalculating) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{t.results.title}</CardTitle>
          <CardDescription>{t.results.processingAI}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-20 w-full bg-muted" />
          <Skeleton className="h-20 w-full bg-muted" />
          <Skeleton className="h-32 w-full bg-muted" />
        </CardContent>
      </Card>
    );
  }

  // عرض رسالة عدم وجود نتائج
  if (!result) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{t.results.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <Activity className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>{t.results.noResults}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // عرض النتائج
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          {t.results.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* BMI */}
        <div className="p-4 bg-muted rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              <span className="font-medium">{t.results.bmi}</span>
            </div>
            <span className="text-2xl font-bold">{result.bmi.toFixed(2)}</span>
          </div>
        </div>

        {/* Z-Score */}
        <div className="p-4 bg-muted rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span className="font-medium">{t.results.zScore}</span>
            </div>
            <span className="text-2xl font-bold">{result.zScore.toFixed(2)}</span>
          </div>
        </div>

        {/* التصنيف */}
        <div className="space-y-3">
          <h3 className="font-semibold flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            {t.results.classification}
          </h3>
          <div className="p-4 border rounded-lg">
            <Badge 
              variant={result.classification.severity === 'normal' ? 'default' : 'destructive'}
              className="mb-2"
            >
              {language === 'ar' ? result.classification.categoryAr : result.classification.category}
            </Badge>
            <p className={`text-sm mt-2 ${result.classification.color}`}>
              {language === 'ar' ? result.classification.recommendationAr : result.classification.recommendation}
            </p>
          </div>
        </div>

        {/* تصنيف MUAC إذا كان موجودًا */}
        {result.muacClassification && (
          <div className="space-y-3">
            <h3 className="font-semibold flex items-center gap-2">
              <Ruler className="w-5 h-5" />
              {t.results.muacClassification}
            </h3>
            <div className="p-4 border rounded-lg">
              <Badge 
                variant={result.muacClassification.severity === 'normal' ? 'default' : 'destructive'}
                className="mb-2"
              >
                {language === 'ar' ? result.muacClassification.categoryAr : result.muacClassification.category}
              </Badge>
              <p className={`text-sm mt-2 ${result.muacClassification.color}`}>
                {language === 'ar' ? result.muacClassification.recommendationAr : result.muacClassification.recommendation}
              </p>
            </div>
          </div>
        )}

        {/* التوصيات الذكية */}
        {isProcessingAI ? (
          <div className="space-y-3">
            <h3 className="font-semibold">{t.results.aiRecommendations}</h3>
            <Skeleton className="h-24 w-full bg-muted" />
          </div>
        ) : result.aiRecommendations && (
          <div className="space-y-3">
            <h3 className="font-semibold">{t.results.aiRecommendations}</h3>
            <div className="p-4 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg space-y-3">
              <div>
                <h4 className="font-medium text-sm mb-1">{t.results.nutritionSummary}</h4>
                <p className="text-sm">{result.aiRecommendations.summary}</p>
              </div>
              <div>
                <h4 className="font-medium text-sm mb-1">{t.results.dietaryAdvice}</h4>
                <ul className="text-sm space-y-1 list-disc list-inside">
                  <li>{result.aiRecommendations.advice1}</li>
                  <li>{result.aiRecommendations.advice2}</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* تنبيه هام */}
        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <p className="text-sm text-yellow-800 dark:text-yellow-200">
            {t.results.disclaimer}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultsCard;
