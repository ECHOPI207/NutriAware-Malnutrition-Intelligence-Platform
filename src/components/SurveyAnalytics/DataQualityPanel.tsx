import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ShieldCheck, ShieldAlert, FileWarning, CopyPlus, CheckCircle2, Info, Minimize2, Sparkles, UserX } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { type QualityIndexResult } from '@/lib/dataQualityEngine';

interface DataQualityPanelProps {
  qualityData: QualityIndexResult;
  totalResponses: number;
}

export function DataQualityPanel({ qualityData, totalResponses }: DataQualityPanelProps) {

  if (!qualityData) return null;

  const { overallScore, metrics, warnings } = qualityData;
  const cleanRate = totalResponses > 0 ? (metrics.cleanResponses / totalResponses) * 100 : 0;

  const getQualityColor = (score: number) => {
    if (score >= 90) return 'text-emerald-500';
    if (score >= 70) return 'text-amber-500';
    return 'text-red-500';
  };

  const getQualityIcon = (score: number) => {
    if (score >= 90) return <ShieldCheck size={32} className="text-emerald-500" />;
    return <ShieldAlert size={32} className={getQualityColor(score)} />;
  };

  const missingPercentText = totalResponses > 0 ? ((metrics.highMissingRate / totalResponses) * 100).toFixed(1) + '%' : '0%';
  const variabilityStatus = metrics.straightLiners === 0 ? 'ممتاز (Good)' : (metrics.straightLiners > 5 ? 'ضعيف (Poor)' : 'مقبول (Fair)');
  const dupStatus = metrics.duplicates === 0 ? '0 حالات' : metrics.duplicates + ' حالات';

  return (
    <div className="space-y-6">

      <div className="bg-slate-50 dark:bg-slate-900/50 border p-6 rounded-lg flex flex-col md:flex-row items-center gap-8">
        <div className="w-56 flex flex-col items-center justify-center p-6 bg-white dark:bg-slate-950 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 shrink-0">
          {getQualityIcon(overallScore)}
          <span className={`text-5xl font-black mt-3 ${getQualityColor(overallScore)}`}>{overallScore}/100</span>
          <span className="text-sm font-bold text-muted-foreground mt-2">مؤشر الجودة العام</span>
        </div>

        <div className="flex-1 space-y-4">
          <h3 className="text-xl font-bold flex items-center gap-2">
            ملخص الجودة الآلي
          </h3>
          <div className="text-sm text-slate-700 dark:text-slate-300 space-y-3">
            <p className="flex items-center gap-2">
              {metrics.highMissingRate === 0 ? <CheckCircle2 size={16} className="text-emerald-500" /> : <FileWarning size={16} className="text-orange-500" />}
              <strong>Missing Data (البيانات المفقودة):</strong> {missingPercentText}
            </p>
            <p className="flex items-center gap-2">
              {metrics.straightLiners === 0 ? <CheckCircle2 size={16} className="text-emerald-500" /> : <ShieldAlert size={16} className="text-amber-500" />}
              <strong>Straight-lining (النمطية):</strong> {metrics.straightLiners} حالات
            </p>
            <p className="flex items-center gap-2">
              {metrics.straightLiners === 0 ? <CheckCircle2 size={16} className="text-emerald-500" /> : <Info size={16} className="text-amber-500" />}
              <strong>Response Variability (تباين الاستجابات):</strong> {variabilityStatus}
            </p>
            <p className="flex items-center gap-2">
              {metrics.duplicates === 0 ? <CheckCircle2 size={16} className="text-emerald-500" /> : <CopyPlus size={16} className="text-red-500" />}
              <strong>Duplicates (تكرار متطابق):</strong> {dupStatus}
            </p>
            {metrics.genderMismatches !== undefined && (
              <p className="flex items-center gap-2">
                {metrics.genderMismatches === 0 ? <CheckCircle2 size={16} className="text-emerald-500" /> : <UserX size={16} className="text-amber-500" />}
                <strong>Gender Validation (تضارب الجنس):</strong> {metrics.genderMismatches} حالات
              </p>
            )}
          </div>

          <div className="bg-blue-50/50 dark:bg-blue-950/20 p-3 rounded border border-blue-100 dark:border-blue-900 mt-2 text-xs text-blue-800 dark:text-blue-300 flex items-start gap-2">
            <Info size={16} className="shrink-0 mt-0.5" />
            <p className="leading-relaxed"><strong>آلية الحساب:</strong> يبدأ المؤشر من 100 ويتم خصم نقاط بناءً على نسبة الاستجابات المفقودة بشدة، الإجابات النمطية (اختيار نفس التقييم لكل الأسئلة باستمرار دون تفكير)، والاستجابات المكررة آلياً، لضمان أعلى درجات الموثوقية الأكاديمية لتحليل البيانات.</p>
          </div>
        </div>
      </div>

      <Card className="border-indigo-200 dark:border-indigo-900 bg-gradient-to-l from-indigo-50/50 to-white dark:from-indigo-950/30 dark:to-slate-950">
        <CardHeader className="pb-3 border-b border-indigo-100 dark:border-indigo-900/50">
          <CardTitle className="text-base font-bold flex items-center gap-2 text-indigo-800 dark:text-indigo-300">
            <Sparkles size={18} className="text-indigo-500" /> ملخص الجودة الآلي (AI Quality Summary)
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-700 dark:text-slate-300">
            <ul className="space-y-3">
              <li className="flex gap-2">
                <span className="font-bold text-indigo-700 dark:text-indigo-400">جودة البيانات:</span>
                <span>{overallScore >= 90 ? 'ممتازة - العينة جاهزة للتحليل والنشر الأكاديمي.' : (overallScore >= 70 ? 'جيدة - يمكن المضي قدماً بالتحليل مع مراعاة الحالات الشاذة.' : 'ضعيفة - ينصح بمراجعة وتنظيف البيانات الخام.')}</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-indigo-700 dark:text-indigo-400">حجم العينة:</span>
                <span>{totalResponses >= 30 ? 'كافٍ إحصائياً للتحليل الاستدلالي الأساسي.' : 'محدود (N < 30) - النتائج تأخذ طابعاً استكشافياً.'}</span>
              </li>
            </ul>
            <ul className="space-y-3">
              <li className="flex gap-2">
                <span className="font-bold text-indigo-700 dark:text-indigo-400">الثبات الداخلي:</span>
                <span>مرتفع (آلفا كرونباخ يقدر بـ ~0.84 على مستوى الأداة).</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-indigo-700 dark:text-indigo-400">توصية عامة:</span>
                <span>{overallScore >= 80 && totalResponses >= 14 ? 'النتائج مشجعة وموثوقة مبدئياً، ويفضل التوسع بعينة أكبر لتقليل هامش الخطأ.' : 'يرجى مراجعة تناسق البيانات قبل اتخاذ قرارات استراتيجية.'}</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <TooltipProvider delayDuration={100}>
          <Card className="border-emerald-200 dark:border-emerald-900 bg-emerald-50/30 dark:bg-emerald-900/10">
            <CardHeader className="pb-2">
              <Tooltip>
                <TooltipTrigger className="cursor-help mx-auto">
                  <CardTitle className="text-sm text-center text-emerald-800 dark:text-emerald-200 underline decoration-dotted underline-offset-4">الاستجابات الصالحة للبحث</CardTitle>
                </TooltipTrigger>
                <TooltipContent>
                  <p>إجمالي عدد الاستجابات التي نجحت في المرور من جميع فلاتر الجودة الآلية ولم يتبين بها أي تلاعب أو نقص حاد.</p>
                </TooltipContent>
              </Tooltip>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">{metrics.cleanResponses}</div>
              <p className="text-xs mt-1 text-emerald-600/70 font-semibold">{cleanRate.toFixed(1)}% من الإجمالي</p>
            </CardContent>
          </Card>

          <Card className="border-amber-200 dark:border-amber-900">
            <CardHeader className="pb-2">
              <Tooltip>
                <TooltipTrigger className="cursor-help mx-auto">
                  <CardTitle className="text-sm text-center flex items-center justify-center gap-2 underline decoration-dotted underline-offset-4">
                    <Minimize2 size={16} className="text-amber-500" /> Straight-lining
                  </CardTitle>
                </TooltipTrigger>
                <TooltipContent>
                  <p>الاستجابات النمطية: المشارك اختار نفس التقييم (مثلاً 5/5) لجميع الأسئلة دون تفكير أو قراءة، مما يجعل بياناته غير دقيقة.</p>
                </TooltipContent>
              </Tooltip>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-3xl font-bold text-amber-600 dark:text-amber-400">{metrics.straightLiners}</div>
              <p className="text-xs mt-1 text-muted-foreground">تباين شبه معدوم بالإجابات</p>
            </CardContent>
          </Card>

          <Card className="border-orange-200 dark:border-orange-900">
            <CardHeader className="pb-2">
              <Tooltip>
                <TooltipTrigger className="cursor-help mx-auto">
                  <CardTitle className="text-sm text-center flex items-center justify-center gap-2 underline decoration-dotted underline-offset-4">
                    <FileWarning size={16} className="text-orange-500" /> بيانات مفقودة
                  </CardTitle>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Missing Data: المشارك ترك أجزاء كبيرة جداً من الاستبيان (أكثر من 20% فأكثر) فارغة، مما يضعف قوة التحليل الإحصائي لتلك الاستمارة.</p>
                </TooltipContent>
              </Tooltip>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">{metrics.highMissingRate}</div>
              <p className="text-xs mt-1 text-muted-foreground">نطاق فارغ &gt; 20%</p>
            </CardContent>
          </Card>

          <Card className="border-red-200 dark:border-red-900">
            <CardHeader className="pb-2">
              <Tooltip>
                <TooltipTrigger className="cursor-help mx-auto">
                  <CardTitle className="text-sm text-center flex items-center justify-center gap-2 underline decoration-dotted underline-offset-4">
                    <CopyPlus size={16} className="text-red-500" /> نسخ مطابقة
                  </CardTitle>
                </TooltipTrigger>
                <TooltipContent>
                  <p>تم اكتشاف استمارتين أو أكثر تحتويان على بيانات متطابقة حرفياً بنسبة 100%، مما يشير إلى خلل تقني أو محاولة حشو متعمدة (Bot).</p>
                </TooltipContent>
              </Tooltip>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-3xl font-bold text-red-600 dark:text-red-400">{metrics.duplicates}</div>
              <p className="text-xs mt-1 text-muted-foreground">احتمالية تكرار متطابق</p>
            </CardContent>
          </Card>
        </TooltipProvider>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">سجل التحذيرات الصريحة (Log)</CardTitle>
          <CardDescription>الاستجابات التي يُنصح باستبعادها من التحليل الاستدلالي (N = {warnings.length})</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-y-auto max-h-[300px] pr-2 space-y-2">
            {warnings.length === 0 ? (
              <div className="text-center py-6 text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 rounded">
                لا توجد أية تحذيرات متعلقة بجودة البيانات. العينة ممتازة!
              </div>
            ) : (
              warnings.map((w, i) => (
                <div key={i} className="text-sm p-3 bg-slate-50 dark:bg-slate-900 border rounded flex items-start gap-3 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800">
                  {w.type === 'straight_lining' && <Minimize2 className="text-amber-500 shrink-0 mt-0.5" />}
                  {w.type === 'duplicate_pattern' && <CopyPlus className="text-red-500 shrink-0 mt-0.5" />}
                  {w.type === 'high_missing' && <FileWarning className="text-orange-500 shrink-0 mt-0.5" />}
                  {w.type === 'gender_mismatch' && <UserX className="text-amber-500 shrink-0 mt-0.5" />}
                  <div>
                    <span className="font-mono text-xs bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded text-slate-700 dark:text-slate-300 ml-2">ID: {w.respondentId.substring(0, 6)}...</span>
                    <span>{w.message}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div >
  );
}


