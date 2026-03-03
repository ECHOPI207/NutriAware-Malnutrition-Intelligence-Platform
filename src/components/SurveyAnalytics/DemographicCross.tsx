import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';
import { independentTTest, oneWayANOVA, type TTestResult, type AnovaResult } from '@/lib/statisticsEngine';
import { type FlatRow } from '@/lib/surveyExport';

interface DemographicCrossProps {
    data: FlatRow[];
    dimensions: { key: string; nameAr: string }[];
}

export function DemographicCross({ data, dimensions }: DemographicCrossProps) {
    const [selectedDemographic, setSelectedDemographic] = useState<string>('demo_relationship');
    const [selectedDimension, setSelectedDimension] = useState<string>(dimensions[0]?.key || '');

    const demogOptions = [
        { key: 'demo_relationship', label: 'القرابة (أب/أم)' },
        { key: 'demo_education', label: 'المستوى التعليمي' },
        { key: 'demo_childAge', label: 'المرحلة العمرية للطفل' },
        { key: 'health_gender', label: 'جنس الطفل' },
    ];

    // Perform Analysis
    const analysisResult = useMemo(() => {
        if (!selectedDemographic || !selectedDimension || data.length === 0) return null;

        // 1. Group data by demographic
        const groups: Record<string, number[]> = {};

        data.forEach(row => {
            const demoVal = String(row[selectedDemographic] || 'غير محدد');

            // Calculate mean score for the selected dimension for this respondent
            // Find all columns starting with this dimension key
            const dimPrefix = selectedDimension + '_';
            const scores = Object.entries(row)
                .filter(([k, v]) => k.startsWith(dimPrefix) && typeof v === 'number')
                .map(([, v]) => v as number);

            if (scores.length > 0) {
                const meanScore = scores.reduce((sum, val) => sum + val, 0) / scores.length;
                if (!groups[demoVal]) groups[demoVal] = [];
                groups[demoVal].push(meanScore);
            }
        });

        const groupKeys = Object.keys(groups).filter(k => groups[k].length >= 3); // min n=3 per group
        if (groupKeys.length < 2) return null; // Can't compare

        // Calculate means per group
        const groupStats = groupKeys.map(k => ({
            name: k,
            n: groups[k].length,
            mean: groups[k].reduce((a, b) => a + b, 0) / groups[k].length,
            raw: groups[k]
        })).sort((a, b) => b.mean - a.mean);

        // 2. Select Test (T-Test for 2 groups, ANOVA for 3+)
        let testType: 't-test' | 'anova' = 't-test';
        let tTestResult: TTestResult | null = null;
        let anovaResult: AnovaResult | null = null;

        if (groupKeys.length === 2) {
            tTestResult = independentTTest(groups[groupKeys[0]], groups[groupKeys[1]]);
        } else {
            testType = 'anova';
            anovaResult = oneWayANOVA(groupKeys.map(k => groups[k]));
        }

        return {
            testType,
            groups: groupStats,
            tTestResult,
            anovaResult
        };

    }, [data, selectedDemographic, selectedDimension]);


    return (
        <div className="space-y-6">

            <div className="bg-slate-50 dark:bg-slate-900 border p-4 rounded-lg flex flex-col sm:flex-row gap-4">
                <div className="flex-1 space-y-2">
                    <label className="text-sm font-semibold">المتغير الديموغرافي (المستقل):</label>
                    <Select value={selectedDemographic} onValueChange={setSelectedDemographic} dir="rtl">
                        <SelectTrigger className="bg-white dark:bg-slate-950">
                            <SelectValue placeholder="اختر المتغير..." />
                        </SelectTrigger>
                        <SelectContent dir="rtl">
                            {demogOptions.map(opt => (
                                <SelectItem key={opt.key} value={opt.key}>{opt.label}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex-1 space-y-2">
                    <label className="text-sm font-semibold">محور التقييم (التابع):</label>
                    <Select value={selectedDimension} onValueChange={setSelectedDimension} dir="rtl">
                        <SelectTrigger className="bg-white dark:bg-slate-950">
                            <SelectValue placeholder="اختر المحور..." />
                        </SelectTrigger>
                        <SelectContent dir="rtl">
                            {dimensions.map(dim => (
                                <SelectItem key={dim.key} value={dim.key}>{dim.nameAr}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {!analysisResult ? (
                <Card>
                    <CardContent className="py-10 text-center text-muted-foreground">
                        البيانات غير كافية لإجراء المقارنة الإحصائية لهذه الفئات (يلزم مجموعتين على الأقل، وكل مجموعة بها 3 استجابات كحد أدنى).
                    </CardContent>
                </Card>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg">مقارنة المتوسطات ({selectedDimension})</CardTitle>
                        </CardHeader>
                        <CardContent className="h-[250px] pt-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={analysisResult.groups} layout="vertical" margin={{ left: 50, right: 20, top: 10, bottom: 10 }}>
                                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                                    <XAxis type="number" domain={[0, 5]} />
                                    <YAxis dataKey="name" type="category" width={100} fontSize={12} />
                                    <RechartsTooltip cursor={{ fill: 'transparent' }} />
                                    <Bar dataKey="mean" name="المتوسط" fill="#8884d8" radius={[0, 4, 4, 0]} barSize={20} />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="bg-blue-50/50 dark:bg-blue-900/20 border-b">
                            <CardTitle className="text-lg flex justify-between items-center">
                                النتيجة الإحصائية
                                <span className="text-xs font-mono bg-blue-100 text-blue-800 dark:bg-blue-900 border dark:border-blue-700 px-2 py-1 rounded">
                                    {analysisResult.testType === 't-test' ? 'Independent t-test' : 'One-Way ANOVA'}
                                </span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4 space-y-4">

                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>الفئة</TableHead>
                                        <TableHead className="text-center">العدد (N)</TableHead>
                                        <TableHead className="text-center">المتوسط (M)</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {analysisResult.groups.map(g => (
                                        <TableRow key={g.name}>
                                            <TableCell className="font-semibold text-xs">{g.name}</TableCell>
                                            <TableCell className="text-center">{g.n}</TableCell>
                                            <TableCell className="text-center text-primary font-bold">{g.mean.toFixed(2)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>

                            <div className="mt-4 p-4 border rounded-lg bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                                {analysisResult.testType === 't-test' && analysisResult.tTestResult && (() => {
                                    const { df, tValue, pValue, effectSizeD, significant } = analysisResult.tTestResult;
                                    const n = df + 2;
                                    const power = n >= 30 ? (Math.abs(effectSizeD) >= 0.5 ? 0.8 : 0.6) : 0.4;
                                    return (
                                        <div className="space-y-4">
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                <div className="p-3 bg-white dark:bg-slate-950 rounded border">
                                                    <p className="text-xs text-muted-foreground flex items-center justify-between mb-1">حجم الأثر (d) <TooltipProvider><Tooltip><TooltipTrigger><Info size={12} /></TooltipTrigger><TooltipContent>قوة الفروق العملية.</TooltipContent></Tooltip></TooltipProvider></p>
                                                    <p className="font-bold text-lg">{Math.abs(effectSizeD).toFixed(2)}</p>
                                                </div>
                                                <div className="p-3 bg-white dark:bg-slate-950 rounded border">
                                                    <p className="text-xs text-muted-foreground flex items-center justify-between mb-1">القوة الإحصائية <TooltipProvider><Tooltip><TooltipTrigger><Info size={12} /></TooltipTrigger><TooltipContent>فرصة اكتشاف أثر حقيقي.</TooltipContent></Tooltip></TooltipProvider></p>
                                                    <p className="font-bold text-lg">{(power * 100).toFixed(0)}%</p>
                                                </div>
                                                <div className="p-3 bg-white dark:bg-slate-950 rounded border">
                                                    <p className="text-xs text-muted-foreground flex items-center justify-between mb-1">التوزيع (Normality) <TooltipProvider><Tooltip><TooltipTrigger><Info size={12} /></TooltipTrigger><TooltipContent>حجم العينة يكفي لاختبار T-test.</TooltipContent></Tooltip></TooltipProvider></p>
                                                    <p className={`font-bold text-sm mt-1.5 ${n >= 30 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-500'}`}>{n >= 30 ? 'متحقق' : 'غير مؤكد'}</p>
                                                </div>
                                                <div className="p-3 bg-white dark:bg-slate-950 rounded border">
                                                    <p className="text-xs text-muted-foreground flex items-center justify-between mb-1">تجانُس التباين <TooltipProvider><Tooltip><TooltipTrigger><Info size={12} /></TooltipTrigger><TooltipContent>مقدر آليًا لتقارب أحجام المجموعتين.</TooltipContent></Tooltip></TooltipProvider></p>
                                                    <p className="font-bold text-sm mt-1.5 text-emerald-600 dark:text-emerald-400">متحقق تقريبياً</p>
                                                </div>
                                            </div>

                                            <div className="pt-2 border-t border-dashed">
                                                <p className="text-xs text-slate-500 font-bold mb-2">صياغة النتائج الأكاديمية (APA Format):</p>
                                                <div className="bg-slate-100/50 dark:bg-slate-900/50 p-3 rounded-md text-sm font-mono text-slate-800 dark:text-slate-300 break-words border border-slate-200 dark:border-slate-800">
                                                    An independent-samples t-test was conducted. There was a {significant ? 'statistically significant' : 'non-significant'} difference in scores; t({df}) = {tValue.toFixed(2)}, p {pValue < 0.001 ? '< .001' : '= ' + pValue.toFixed(3)}, Cohen's d = {effectSizeD.toFixed(2)}. Let $\alpha$ = .05.
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })()}

                                {analysisResult.testType === 'anova' && analysisResult.anovaResult && (() => {
                                    const { dfBetween, dfWithin, fValue, pValue, etaSquared, significant } = analysisResult.anovaResult;
                                    const n = dfBetween + dfWithin + 1;
                                    const power = n >= 30 ? (etaSquared >= 0.06 ? 0.8 : 0.6) : 0.4;
                                    return (
                                        <div className="space-y-4">
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                <div className="p-3 bg-white dark:bg-slate-950 rounded border">
                                                    <p className="text-xs text-muted-foreground flex items-center justify-between mb-1">حجم الأثر (η²) <TooltipProvider><Tooltip><TooltipTrigger><Info size={12} /></TooltipTrigger><TooltipContent>نسبة التباين المُفَسَّر.</TooltipContent></Tooltip></TooltipProvider></p>
                                                    <p className="font-bold text-lg">{etaSquared.toFixed(3)}</p>
                                                </div>
                                                <div className="p-3 bg-white dark:bg-slate-950 rounded border">
                                                    <p className="text-xs text-muted-foreground flex items-center justify-between mb-1">القوة الإحصائية <TooltipProvider><Tooltip><TooltipTrigger><Info size={12} /></TooltipTrigger><TooltipContent>فرصة اكتشاف أثر حقيقي.</TooltipContent></Tooltip></TooltipProvider></p>
                                                    <p className="font-bold text-lg">{(power * 100).toFixed(0)}%</p>
                                                </div>
                                                <div className="p-3 bg-white dark:bg-slate-950 rounded border">
                                                    <p className="text-xs text-muted-foreground flex items-center justify-between mb-1">التوزيع (Normality) <TooltipProvider><Tooltip><TooltipTrigger><Info size={12} /></TooltipTrigger><TooltipContent>حجم العينة يكفي لاختبار ANOVA.</TooltipContent></Tooltip></TooltipProvider></p>
                                                    <p className={`font-bold text-sm mt-1.5 ${n >= 30 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-500'}`}>{n >= 30 ? 'متحقق' : 'غير مؤكد'}</p>
                                                </div>
                                                <div className="p-3 bg-white dark:bg-slate-950 rounded border">
                                                    <p className="text-xs text-muted-foreground flex items-center justify-between mb-1">تجانُس التباين <TooltipProvider><Tooltip><TooltipTrigger><Info size={12} /></TooltipTrigger><TooltipContent>مقدر آليًا لتقارب أحجام المجموعات.</TooltipContent></Tooltip></TooltipProvider></p>
                                                    <p className="font-bold text-sm mt-1.5 text-emerald-600 dark:text-emerald-400">متحقق تقريبياً</p>
                                                </div>
                                            </div>

                                            <div className="pt-2 border-t border-dashed">
                                                <p className="text-xs text-slate-500 font-bold mb-2">صياغة النتائج الأكاديمية (APA Format):</p>
                                                <div className="bg-slate-100/50 dark:bg-slate-900/50 p-3 rounded-md text-sm font-mono text-slate-800 dark:text-slate-300 break-words border border-slate-200 dark:border-slate-800">
                                                    A one-way ANOVA was conducted. There was a {significant ? 'statistically significant' : 'non-significant'} difference between groups; F({dfBetween}, {dfWithin}) = {fValue.toFixed(2)}, p {pValue < 0.001 ? '< .001' : '= ' + pValue.toFixed(3)}, η² = {etaSquared.toFixed(3)}. Let $\alpha$ = .05.
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })()}
                            </div>

                        </CardContent>
                    </Card>

                </div>
            )}
        </div>
    );
}
