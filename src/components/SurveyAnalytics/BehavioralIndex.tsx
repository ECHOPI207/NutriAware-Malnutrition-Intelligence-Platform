import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowUpRight, ArrowDownRight, Minus, TrendingUp, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface BehavioralScore {
  nameAr: string;
  nameEn: string;
  beforeScore: number; // 0-100 normalized
  afterScore: number;  // 0-100 normalized
  change: number; // percentage change
}

interface BehavioralIndexProps {
  overallIndex: number; // 0-100
  dimensions: BehavioralScore[];
}

export function BehavioralIndex({ overallIndex, dimensions }: BehavioralIndexProps) {

  const getChangeColor = (change: number) => {
    if (change > 5) return 'text-emerald-500';
    if (change < -5) return 'text-red-500';
    return 'text-slate-500';
  };

  const getChangeIcon = (change: number) => {
    if (change > 5) return <ArrowUpRight size={16} className="text-emerald-500" />;
    if (change < -5) return <ArrowDownRight size={16} className="text-red-500" />;
    return <Minus size={16} className="text-slate-500" />;
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-lg flex flex-col md:flex-row items-center gap-6">
        <div className="flex-1">
          <h3 className="text-lg font-bold flex items-center gap-2 mb-2">
            <TrendingUp className="text-primary" /> مؤشر التغيير السلوكي (Behavioral Change Index)
            <TooltipProvider delayDuration={100}><Tooltip><TooltipTrigger><Info size={14} className="text-muted-foreground hover:text-primary transition-colors" /></TooltipTrigger><TooltipContent className="max-w-xs leading-relaxed p-3 shadow-lg border-slate-200">يمثل قياساً موحداً من 100 لكافة ممارسات المستفيدين، مما يسهل مقارنة الأداء قبل وبعد تدخلات المشروع.</TooltipContent></Tooltip></TooltipProvider>
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
            مؤشر مركب دقيق يقضي بتحويل كافّة أسئلة التقييم ومقاييس الأداء إلى نسبة من 100. يُستخدم للمقارنة النهائية وقياس حجم التغيير المباشر والملموس في حياة المشاركين (Impact Measurement).
          </p>
        </div>
        <div className="w-36 h-36 rounded-full border-8 border-primary/10 flex flex-col items-center justify-center p-2  shadow-inner relative shrink-0">
          <svg className="absolute top-0 left-0 w-full h-full transform -rotate-90">
            <circle
              cx="50%"
              cy="50%"
              r="46%"
              fill="transparent"
              stroke="currentColor"
              strokeWidth="8"
              className="text-primary"
              strokeDasharray={`\${(overallIndex / 100) * 289} 289`} // 289 is roughly 2 * pi * 46
            />
          </svg>
          <span className="text-4xl font-black text-primary">{overallIndex.toFixed(1)}</span>
          <span className="text-xs font-bold text-slate-500 mt-1 uppercase tracking-wider">المؤشر العام</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {dimensions.map((dim, idx) => (
          <Card key={idx}>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex justify-between items-center">
                <span>{dim.nameAr}</span>
                <span className={`flex items-center gap-1 text-sm font-bold ${getChangeColor(dim.change)}`}>
                  {dim.change > 0 ? '+' : ''}{dim.change.toFixed(1)}% {getChangeIcon(dim.change)}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">القياس القبلي</span>
                  <span className="font-bold">{dim.beforeScore.toFixed(1)}/100</span>
                </div>
                <Progress value={dim.beforeScore} className="h-2 bg-slate-100 dark:bg-slate-800" indicatorClassName="bg-slate-400" />
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-emerald-700 dark:text-emerald-400 font-medium">القياس البعدي (بعد التدخل)</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">{dim.afterScore.toFixed(1)}/100</span>
                </div>
                <Progress value={dim.afterScore} className="h-2 bg-emerald-100 dark:bg-emerald-950" indicatorClassName="bg-emerald-500" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div >
  );
}

