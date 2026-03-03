import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip as RechartsTooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { type DescriptiveStats } from '@/lib/surveyExport';
import { Info } from 'lucide-react';

export interface DescriptiveDimension {
    dimensionKey: string;
    dimensionNameAr: string;
    dimensionNameEn: string;
    variables: {
        varName: string;
        questionText: string;
        stats: DescriptiveStats | null;
        ci: [number, number]; // 95% CI bounds
    }[];
    dimensionMean: number; // Mean of means for this construct
}

interface DescriptivePanelProps {
    dimensions: DescriptiveDimension[];
}

export function DescriptivePanel({ dimensions }: DescriptivePanelProps) {
    if (!dimensions || dimensions.length === 0) return <div>لا توجد بيانات إحصائية متاحة.</div>;

    // Data for Radar Chart (Dimension Means)
    const radarData = dimensions.map(d => ({
        subject: d.dimensionNameAr,
        A: Number(d.dimensionMean.toFixed(2)),
        fullMark: 5 // Assuming 5-point Likert is standard. Need to normalize if mixed.
    }));

    return (
        <div className="space-y-8">

            {/* Overview Radar Chart */}
            <Card>
                <CardHeader>
                    <CardTitle>البصمة الإحصائية للمحاور (Radar Chart)</CardTitle>
                    <CardDescription>مقارنة المتوسطات العامة لمختلف محاور التقييم (مقياس 1-5)</CardDescription>
                </CardHeader>
                <CardContent className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                            <PolarGrid />
                            <PolarAngleAxis dataKey="subject" tick={{ fill: 'currentColor', fontSize: 12 }} />
                            <PolarRadiusAxis angle={30} domain={[0, 5]} />
                            <Radar name="المتوسط" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                            <RechartsTooltip />
                        </RadarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            {/* Tables for each dimension */}
            {dimensions.map((dim, idx) => (
                <Card key={idx} className="overflow-hidden">
                    <CardHeader className="bg-slate-50 dark:bg-slate-900 border-b">
                        <CardTitle>{dim.dimensionNameAr} ({dim.dimensionNameEn})</CardTitle>
                        <CardDescription>المتوسط الإجمالي للمحور: <span className="font-bold text-primary">{dim.dimensionMean.toFixed(2)}</span></CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[40%] font-semibold text-slate-700 dark:text-slate-300">المتغير (السؤال)</TableHead>
                                        <TableHead className="text-center font-semibold text-slate-700 dark:text-slate-300">
                                            <TooltipProvider delayDuration={100}><Tooltip><TooltipTrigger className="flex items-center justify-center gap-1 mx-auto">N <Info size={12} className="text-slate-400" /></TooltipTrigger><TooltipContent>حجم العينة (عدد الاستجابات الصالحة)</TooltipContent></Tooltip></TooltipProvider>
                                        </TableHead>
                                        <TableHead className="text-center text-primary font-bold">
                                            <TooltipProvider delayDuration={100}><Tooltip><TooltipTrigger className="flex items-center justify-center gap-1 mx-auto">Mean (M) <Info size={12} className="text-primary/60" /></TooltipTrigger><TooltipContent className="max-w-xs leading-relaxed">المتوسط الحسابي: يمثل مركز الإجابات. (أعلى = إيجابي أكثر)</TooltipContent></Tooltip></TooltipProvider>
                                        </TableHead>
                                        <TableHead className="text-center hidden sm:table-cell font-semibold text-slate-700 dark:text-slate-300">
                                            <TooltipProvider delayDuration={100}><Tooltip><TooltipTrigger className="flex items-center justify-center gap-1 mx-auto">Median (Mdn) <Info size={12} className="text-slate-400" /></TooltipTrigger><TooltipContent className="max-w-xs leading-relaxed">الوسيط: القيمة التي تقسم البيانات لنصفين. مقاوم للقيم المتطرفة.</TooltipContent></Tooltip></TooltipProvider>
                                        </TableHead>
                                        <TableHead className="text-center hidden sm:table-cell font-semibold text-slate-700 dark:text-slate-300">
                                            <TooltipProvider delayDuration={100}><Tooltip><TooltipTrigger className="flex items-center justify-center gap-1 mx-auto">Mode <Info size={12} className="text-slate-400" /></TooltipTrigger><TooltipContent className="max-w-xs leading-relaxed">المنوال: الإجابة الأكثر تكراراً وشيوعاً بين المشاركين.</TooltipContent></Tooltip></TooltipProvider>
                                        </TableHead>
                                        <TableHead className="text-center font-semibold text-slate-700 dark:text-slate-300">
                                            <TooltipProvider delayDuration={100}><Tooltip><TooltipTrigger className="flex items-center justify-center gap-1 mx-auto">Std. Dev (SD) <Info size={12} className="text-slate-400" /></TooltipTrigger><TooltipContent className="max-w-xs leading-relaxed">الانحراف المعياري: يقيس مقدار تشتت واختلاف آراء المشاركين (قيمة أعلى = تباين واختلاف أكبر).</TooltipContent></Tooltip></TooltipProvider>
                                        </TableHead>
                                        <TableHead className="text-center hidden md:table-cell font-semibold text-slate-700 dark:text-slate-300">
                                            <TooltipProvider delayDuration={100}><Tooltip><TooltipTrigger className="flex items-center justify-center gap-1 mx-auto">95% CI <Info size={12} className="text-slate-400" /></TooltipTrigger><TooltipContent className="max-w-xs leading-relaxed">فترة الثقة 95%: النطاق الذي نثق بنسبة 95% أن المتوسط الحقيقي للمجتمع بأكمله يقع ضمنه.</TooltipContent></Tooltip></TooltipProvider>
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {dim.variables.map((v, i) => {
                                        if (!v.stats) return null;
                                        return (
                                            <TableRow key={i}>
                                                <TableCell className="font-medium text-xs sm:text-sm">
                                                    {v.questionText.length > 60 ? v.questionText.substring(0, 60) + '...' : v.questionText}
                                                    <div className="text-[10px] text-muted-foreground font-mono mt-1">{v.varName}</div>
                                                </TableCell>
                                                <TableCell className="text-center">{v.stats.n}</TableCell>
                                                <TableCell className="text-center font-bold text-primary">{v.stats.mean.toFixed(2)}</TableCell>
                                                <TableCell className="text-center hidden sm:table-cell">{v.stats.median.toFixed(2)}</TableCell>
                                                <TableCell className="text-center hidden sm:table-cell">{v.stats.mode}</TableCell>
                                                <TableCell className="text-center">{v.stats.sd.toFixed(2)}</TableCell>
                                                <TableCell className="text-center hidden md:table-cell text-xs text-muted-foreground whitespace-nowrap">
                                                    [{v.ci[0].toFixed(2)}, {v.ci[1].toFixed(2)}]
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            ))}

        </div>
    );
}
