import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { type ReliabilityResult } from '@/lib/statisticsEngine';
import { AlertCircle, XCircle, RefreshCw } from 'lucide-react';

export interface ReliabilityConstruct {
    constructNameAr: string;
    constructNameEn: string;
    result: ReliabilityResult;
    items: { varName: string; text: string; isReversed?: boolean; isExcluded?: boolean }[];
}

interface ReliabilityPanelProps {
    constructs: ReliabilityConstruct[];
    onToggleReverseCoding?: (varName: string) => void;
    onToggleExcluded?: (varName: string) => void;
    onBatchAction?: (reverses: string[], excludes: string[]) => void;
}

export function ReliabilityPanel({ constructs, onToggleReverseCoding, onToggleExcluded, onBatchAction }: ReliabilityPanelProps) {

    const getBadgeColor = (status: string) => {
        switch (status) {
            case 'Excellent': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 border-none';
            case 'Good':
            case 'Acceptable': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-none';
            case 'Questionable': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border-none';
            case 'Insufficient': return 'bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-300 border-none';
            case 'Error': return 'bg-slate-100 text-slate-600 border-slate-300';
            default: return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-none'; // Poor
        }
    };

    const getStatusArabic = (status: string) => {
        const map: Record<string, string> = {
            'Excellent': 'ممتاز',
            'Good': 'جيد',
            'Acceptable': 'مقبول',
            'Questionable': 'يحتاج تحسين',
            'Poor': 'ضعيف',
            'Unacceptable': 'غير مقبول',
            'Insufficient': 'غير كافٍ للاختبار',
            'Error': 'خطأ في الحساب'
        };
        return map[status] || status;
    };

    const renderInterpretation = (construct: ReliabilityConstruct) => {
        const { result, items } = construct;
        if (!result) return null;

        if (result.status === 'Error') {
            return (
                <div className="mt-2 p-3 bg-slate-50 text-slate-800 rounded-md text-sm flex gap-2 items-start border border-slate-200">
                    <AlertCircle size={16} className="mt-0.5 text-slate-500" />
                    <div>
                        <strong>تعذر حساب الموثوقية:</strong> {result.errorMessage || 'خطأ غير معروف'}
                    </div>
                </div>
            );
        }

        if (result.status === 'Insufficient') {
            return (
                <div className="mt-2 p-3 bg-slate-50 text-slate-700 rounded-md text-sm flex gap-2 items-start border border-slate-200">
                    <AlertCircle size={16} className="mt-0.5 text-slate-500" />
                    <div>
                        <strong>تنبيه:</strong> عدد البنود غير كافٍ لحساب Alpha بشكل مستقر. يحتاج المقياس إلى 4 بنود فأكثر.
                    </div>
                </div>
            );
        }

        const isWeak = result.alpha < 0.7;
        const negativeItems = items.filter(i => result.itemTotalCorrelations[i.varName] < 0);

        return (
            <div className={`mt-2 p-3 rounded-md text-sm border flex gap-2 items-start ${isWeak ? 'bg-amber-50/50 text-amber-900 border-amber-100' : 'bg-blue-50/50 text-blue-900 border-blue-100'}`}>
                <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                <div className="leading-relaxed w-full">
                    <strong>تفسير النتيجة:</strong> معامل الارتباط الكلي (α={result.alpha.toFixed(3)}) يشير إلى أن الثبات <strong>{getStatusArabic(result.status)}</strong>.
                    {isWeak && " السبب المحتمل: بنود عكسية غير معكوسة أو خلط أبعاد تقيس مفاهيم مختلفة. "}
                    {negativeItems.length > 0 && (
                        <div className="mt-2 p-2 bg-amber-100/30 border border-amber-200 rounded flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                            <span className="font-semibold text-amber-800">
                                ⚠ الإجراء المقترح: تفعيل (Reverse Coding) للبند المرتبط سلبياً.
                            </span>
                            {onBatchAction && (
                                <Button
                                    size="sm"
                                    className="bg-amber-600 hover:bg-amber-700 text-white shrink-0"
                                    onClick={() => onBatchAction(negativeItems.map(i => i.varName), [])}
                                >
                                    إصلاح سريع للموثوقية
                                </Button>
                            )}
                        </div>
                    )}
                    {result.isExploratory && (
                        <span className="block mt-2 text-amber-800 bg-amber-100/50 p-2 rounded border border-amber-200">
                            ⚠ <strong>تنبيه الانحياز:</strong> حجم العينة أقل من 30 (N={result.n}). النتائج استكشافية وتحتاج عينة أكبر لاستقرار المؤشر.
                        </span>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-6" dir="rtl">
            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border text-sm text-muted-foreground mb-6 leading-relaxed">
                <strong className="text-foreground">تحليل الموثوقية (Reliability Analysis):</strong> يقيس معامل ألفا كرونباخ (Cronbach's Alpha) مدى الاتساق الداخلي لأسئلة كل محور. تعكس المؤشرات مدى صلاحية المقياس وتأثره بالاستجابات النمطية أو العكسية.
            </div>

            {constructs.map((construct, idx) => {
                if (!construct.result) return null;

                const { alpha, status, itemTotalCorrelations, alphaIfDeleted } = construct.result;
                const isError = status === 'Error';

                return (
                    <Card key={idx} className="overflow-hidden">
                        <CardHeader className={`border-b pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4 ${isError ? 'bg-slate-50/30' : 'bg-slate-50 dark:bg-slate-900'}`}>
                            <div>
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    {construct.constructNameAr}
                                    {status !== 'Error' && <Badge className={getBadgeColor(status)}>{getStatusArabic(status)}</Badge>}
                                </CardTitle>
                                <CardDescription className="mt-1 text-base">
                                    Cronbach's α = <strong className={isError ? "text-slate-500" : "text-primary flex-shrink-0"}>
                                        {isNaN(alpha) ? 'N/A' : alpha.toFixed(3)}
                                    </strong>
                                </CardDescription>
                            </div>
                            <div className="text-sm bg-white dark:bg-slate-950 px-4 py-2 rounded-md border shadow-sm flex items-center gap-2">
                                <span>عدد البنود النشطة: <strong className="font-bold">{construct.items.length}</strong></span>
                                <span className="text-muted-foreground">|</span>
                                <span>العينة: <strong className="font-bold">{construct.result.n || 0}</strong></span>
                            </div>
                        </CardHeader>

                        <CardContent className="p-4">
                            {renderInterpretation(construct)}

                            {!isError && construct.items.length > 0 && (
                                <div className="overflow-x-auto mt-6 border rounded-lg">
                                    <Table dir="rtl" className="text-right">
                                        <TableHeader className="bg-slate-50/50 dark:bg-slate-900/50">
                                            <TableRow>
                                                <TableHead className="w-[50%] text-right font-bold py-3">السؤال (العبارة)</TableHead>
                                                <TableHead className="text-center font-bold">
                                                    <div className="flex flex-col items-center">
                                                        <span>الارتباط الكلي</span>
                                                        <span className="text-[10px] text-muted-foreground font-normal">Item-Total Corr</span>
                                                    </div>
                                                </TableHead>
                                                <TableHead className="text-center font-bold">
                                                    <div className="flex flex-col items-center text-primary">
                                                        <span>ألفا في حال الحذف</span>
                                                        <span className="text-[10px] opacity-80 font-normal">Alpha if Item Deleted</span>
                                                    </div>
                                                </TableHead>
                                                <TableHead className="text-center font-bold w-[120px]">إصلاح سريع</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {construct.items.map((item, i) => {
                                                const corr = itemTotalCorrelations?.[item.varName];
                                                const aifd = alphaIfDeleted?.[item.varName];

                                                const isNegative = typeof corr === 'number' && corr < 0;
                                                const isLow = typeof corr === 'number' && corr < 0.3 && !isNegative;
                                                const improvesAlpha = typeof aifd === 'number' && typeof alpha === 'number' && !isNaN(alpha) && (aifd > alpha + 0.05);

                                                let itemWarning = '';
                                                if (isNegative) itemWarning = 'غالبًا بند عكسي أو يقيس بُعد مختلف.';
                                                else if (isLow) itemWarning = 'مرشح لإعادة صياغة/حذف لضعف الارتباط.';
                                                else if (improvesAlpha) itemWarning = 'حذف البند يحسن الموثوقية.';

                                                return (
                                                    <TableRow key={i} className={(isNegative || isLow || improvesAlpha) ? "bg-amber-50/30 dark:bg-amber-950/20 hover:bg-amber-50/50" : "hover:bg-slate-50/50"}>
                                                        <TableCell className="font-medium text-xs sm:text-sm text-right align-middle py-3">
                                                            <div className="flex flex-col gap-1">
                                                                <span className={item.isReversed ? "text-primary decoration-primary underline decoration-dashed underline-offset-4" : ""}>
                                                                    {item.text}
                                                                </span>
                                                                {itemWarning && (
                                                                    <span className={`text-[11px] font-bold mt-1 ${isNegative ? 'text-red-600' : 'text-amber-600'}`}>
                                                                        * {itemWarning}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className="text-center font-mono text-sm align-middle py-3 direction-ltr" dir="ltr">
                                                            <span className={isNegative ? 'text-red-500 font-bold' : ''}>
                                                                {corr !== undefined && !isNaN(corr) ? corr.toFixed(3) : '-'}
                                                            </span>
                                                        </TableCell>
                                                        <TableCell className="text-center font-mono font-bold text-sm text-primary align-middle py-3 direction-ltr" dir="ltr">
                                                            <span className={improvesAlpha ? 'text-green-600' : ''}>
                                                                {aifd !== undefined && !isNaN(aifd) ? aifd.toFixed(3) : '-'}
                                                            </span>
                                                        </TableCell>
                                                        <TableCell className="text-center align-middle py-3">
                                                            <div className="flex flex-col gap-1.5 items-center justify-center">
                                                                {onToggleReverseCoding && (
                                                                    <Button
                                                                        size="sm"
                                                                        variant={item.isReversed ? "default" : "outline"}
                                                                        className={`h-7 text-[10px] w-full ${item.isReversed ? 'bg-primary text-white hover:bg-primary/90' : 'hover:bg-slate-100'}`}
                                                                        onClick={() => onToggleReverseCoding(item.varName)}
                                                                        title="تطبيق أو إلغاء Reverse Coding"
                                                                    >
                                                                        <RefreshCw size={12} className="ml-1" />
                                                                        عكسي
                                                                    </Button>
                                                                )}
                                                                {onToggleExcluded && (
                                                                    <Button
                                                                        size="sm"
                                                                        variant="ghost"
                                                                        className="h-7 text-[10px] w-full text-red-600 hover:text-red-700 hover:bg-red-50"
                                                                        onClick={() => onToggleExcluded(item.varName)}
                                                                        title="استبعاد البند مؤقتاً من حساب الموثوقية"
                                                                    >
                                                                        <XCircle size={12} className="ml-1" />
                                                                        استبعاد
                                                                    </Button>
                                                                )}
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                        </TableBody>
                                    </Table>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}
