import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { calculateNPS, type NPSResult } from '@/lib/surveyEngine';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';
import { ThumbsUp, ThumbsDown, Meh } from 'lucide-react';

interface NPSPanelProps {
    npsScores: number[]; // Array of 0-10 scores
    questionText?: string;
}

export function NPSPanel({ npsScores, questionText }: NPSPanelProps) {
    if (!npsScores || npsScores.length === 0) return <div>لا تتوفر بيانات لسؤال NPS.</div>;

    const result: NPSResult = calculateNPS(npsScores);

    const chartData = [
        { name: 'مروجون (9-10)', value: result.promoters, percent: result.promoterPercent, color: '#10b981' },
        { name: 'محايدون (7-8)', value: result.passives, percent: Math.round((result.passives / result.total) * 100), color: '#fbbf24' },
        { name: 'منتقدون (0-6)', value: result.detractors, percent: result.detractorPercent, color: '#ef4444' }
    ];

    let classification = { label: 'يحتاج لتحسين', color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-950/30' };
    if (result.npsScore >= 70) classification = { label: 'ممتاز عالمياً', color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-950/30' };
    else if (result.npsScore >= 30) classification = { label: 'جيد جداً', color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-950/30' };
    else if (result.npsScore >= 0) classification = { label: 'جيد', color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-950/30' };

    return (
    <div className="space-y-6">
      
      {questionText && (
        <div className="bg-slate-50 dark:bg-slate-900 border p-4 rounded-lg flex items-center gap-3">
          <span className="font-bold text-primary">سؤال التقييم:</span> 
          <span className="text-muted-foreground">{questionText}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Main Score Card */}
        <Card className={`col-span-1 border-2 md:col-span-1 \${classification.bg}`}>
          <CardHeader className="text-center pb-2">
            <CardTitle>Net Promoter Score®</CardTitle>
            <CardDescription>صافي نقاط الترويج</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <div className="relative flex items-center justify-center w-32 h-32 rounded-full border-8 border-white dark:border-slate-800 shadow-inner bg-white dark:bg-slate-950">
              <span className={`text-4xl font-black \${classification.color}`}>
                {result.npsScore > 0 ? '+' : ''}{result.npsScore}
              </span>
            </div>
            <div className={`mt-4 font-bold text-lg \${classification.color}`}>
              {classification.label}
            </div>
            <p className="text-xs text-muted-foreground text-center mt-2 px-4 shadow-sm">
              يُحسب النطاق من -100 إلى +100 عبر طرح نسبة المنتقدين من نسبة المروجين.
            </p>
          </CardContent >
        </Card >

        {/* Breakdown Chart */ }
        < Card className = "col-span-1 md:col-span-2" >
          <CardHeader>
             <CardTitle className="text-lg">توزيع فئات الولاء</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row items-center gap-6 h-[250px]">
            <div className="flex-1 w-full h-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-\${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="flex-1 flex flex-col justify-center space-y-4 w-full px-4">
              <div className="flex items-center justify-between border-b pb-2">
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold">
                  <ThumbsUp size={18} /> مروجون (Promoters)
                </div>
                <div className="text-lg font-bold">{result.promoterPercent}%</div>
              </div>
              <div className="flex items-center justify-between border-b pb-2">
                <div className="flex items-center gap-2 text-amber-500 font-bold">
                  <Meh size={18} /> محايدون (Passives)
                </div>
                <div className="text-lg font-bold">{chartData[1].percent}%</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-red-500 font-bold">
                  <ThumbsDown size={18} /> منتقدون (Detractors)
                </div>
                <div className="text-lg font-bold">{result.detractorPercent}%</div>
              </div>
            </div>
          </CardContent>
        </Card >

      </div >
    </div >
  );
}

