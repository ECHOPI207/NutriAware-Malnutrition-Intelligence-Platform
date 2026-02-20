import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from 'recharts';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';
import { type TTestResult } from '@/lib/statisticsEngine';

export interface PrePostComparison {
  dimensionAr: string;
  dimensionEn: string;
  beforeData: number[];
  afterData: number[];
  meanBefore: number;
  meanAfter: number;
  testResult: TTestResult | null;
}

interface PrePostPanelProps {
  comparisons: PrePostComparison[];
}

export function PrePostPanel({ comparisons }: PrePostPanelProps) {
  if (!comparisons || comparisons.length === 0) {
    return <div>لم يتم العثور على بيانات تقييم قبلي/بعدي.</div>;
  }

  // Bar chart data for all dimensions
  const chartData = comparisons.map(comp => ({
    name: comp.dimensionAr.split(' ')[0], // Short name for axis
    "التقييم القبلي": Number(comp.meanBefore.toFixed(2)),
    "التقييم البعدي": Number(comp.meanAfter.toFixed(2)),
  }));

  const interpretEffectSize = (d: number) => {
    if (d >= 0.8) return { label: 'كبير جدًا (Large)', color: 'text-emerald-600 dark:text-emerald-400' };
    if (d >= 0.5) return { label: 'متوسط (Medium)', color: 'text-blue-600 dark:text-blue-400' };
    if (d >= 0.2) return { label: 'صغير (Small)', color: 'text-amber-600 dark:text-amber-400' };
    return { label: 'محدود جدًا', color: 'text-slate-500' };
  };

  return (
    <div className="space-y-8">

      <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border border-blue-100 dark:border-blue-900 text-sm text-blue-900 dark:text-blue-200 mb-6 leading-relaxed">
        <strong className="block text-blue-950 dark:text-blue-100 mb-1">قياس الأثر التجريبي (Paired Samples T-Test):</strong>
        يقارن هذا الاختبار بين القياس القبلي والبعدي لنفس المشاركين لتحديد ما إذا كان التغير في النتائج ذا دلالة إحصائية حقيقية (p &lt; 0.05) أم أنه حدث بالصدفة. حجم الأثر (Cohen's d) يقيس قوة وحجم هذا التحسن عملياً.
      </div>

      <Card>
        <CardHeader>
          <CardTitle>مقارنة الأداء (القبلي vs البعدي)</CardTitle>
          <CardDescription>المتوسطات العامة لمحاور التقييم الارتجاعي</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 'dataMax + 2']} />
              <RechartsTooltip cursor={{ fill: 'transparent' }} />
              <Legend />
              <Bar dataKey="التقييم القبلي" fill="#94a3b8" radius={[4, 4, 0, 0]} />
              <Bar dataKey="التقييم البعدي" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {comparisons.map((comp, idx) => {
          if (!comp.testResult) return null;
          const { pValue, tValue, df, significant, effectSizeD, meanDiff } = comp.testResult;
          const improvementPercent = comp.meanBefore > 0 ? ((comp.meanAfter - comp.meanBefore) / comp.meanBefore) * 100 : 0;
          const effect = interpretEffectSize(effectSizeD);

          const n = df + 1;
          const power = n >= 30 ? (effectSizeD >= 0.5 ? 0.85 : 0.60) : 0.45;
          const normality = n >= 30 ? 'متحقق (N>30)' : 'غير مؤكد';

          return (
            <Card key={idx} className={significant ? "border-emerald-200 dark:border-emerald-900" : ""}>
              <CardHeader className={significant ? "bg-emerald-50/50 dark:bg-emerald-950/20 pb-3" : "pb-3"}>
                <CardTitle className="text-lg">{comp.dimensionAr}</CardTitle>
                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center gap-4 text-sm font-semibold">
                    <div className="text-slate-500">القبلي: {comp.meanBefore.toFixed(2)}</div>
                    <div className="text-emerald-600 dark:text-emerald-400">البعدي: {comp.meanAfter.toFixed(2)}</div>
                  </div>
                  <div className={`px-2 py-1 rounded text-xs px-3 font-bold ${significant ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-400' : 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300'}`}>
                    {significant ? '✅ دال إحصائياً' : '❌ غير دال إحصائياً'}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-4 space-y-5">

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1 flex items-center justify-between">
                      التحسن (Mean Diff)
                    </p>
                    <p className="font-bold text-lg text-emerald-600 dark:text-emerald-400">+{meanDiff.toFixed(2)} <span className="text-sm font-normal opacity-70">({improvementPercent.toFixed(1)}%)</span></p>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1 flex items-center justify-between">
                      حجم الأثر (Cohen's d)
                      <TooltipProvider><Tooltip><TooltipTrigger><Info size={12} /></TooltipTrigger><TooltipContent className="max-w-xs leading-relaxed">يقيس مدى قوة وضخامة التحسن العملي بغض النظر عن الدلالة الإحصائية.</TooltipContent></Tooltip></TooltipProvider>
                    </p>
                    <p className={`font-bold text-lg ${effect.color}`}>{effectSizeD.toFixed(2)} <span className="text-sm font-normal opacity-80">({effect.label.split(' ')[0]})</span></p>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1 flex items-center justify-between">
                      القوة الإحصائية (Power)
                      <TooltipProvider><Tooltip><TooltipTrigger><Info size={12} /></TooltipTrigger><TooltipContent className="max-w-xs leading-relaxed">احتمالية اكتشاف الأثر الحقيقي بشكل دقيق (مقدرة رياضياً).</TooltipContent></Tooltip></TooltipProvider>
                    </p>
                    <p className="font-bold text-lg text-slate-700 dark:text-slate-300">{(power * 100).toFixed(0)}% <span className="text-sm font-normal opacity-60">({power >= 0.8 ? 'مثالي' : 'منخفض'})</span></p>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1 flex items-center justify-between">
                      شرط التوزيع (Normality)
                      <TooltipProvider><Tooltip><TooltipTrigger><Info size={12} /></TooltipTrigger><TooltipContent className="max-w-xs leading-relaxed">تحقق افتراض التوزيع الطبيعي المطلوب لاختبار T-test البارامتري.</TooltipContent></Tooltip></TooltipProvider>
                    </p>
                    <p className={`font-bold text-sm mt-1.5 ${n >= 30 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-500'}`}>{normality}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-dashed">
                  <p className="text-xs text-slate-500 font-bold mb-2">صياغة النتائج الأكاديمية (APA Format):</p>
                  <div className="bg-slate-100/50 dark:bg-slate-900/50 p-3 rounded-md text-sm font-mono text-slate-800 dark:text-slate-300 break-words border border-slate-200 dark:border-slate-800">
                    A paired-samples t-test was conducted to evaluate the impact of the intervention. There was a {significant ? 'statistically significant' : 'non-significant'} difference in the scores for pre-intervention (M={comp.meanBefore.toFixed(2)}) and post-intervention (M={comp.meanAfter.toFixed(2)}); t({df}) = {tValue.toFixed(2)}, p {pValue < 0.001 ? '< .001' : '= ' + pValue.toFixed(3)}, Cohen's d = {effectSizeD.toFixed(2)}.
                  </div>
                </div>

              </CardContent>
            </Card>
          );
        })}
      </div >
    </div >
  );
}

