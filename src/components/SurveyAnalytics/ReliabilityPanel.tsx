import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { type ReliabilityResult } from '@/lib/statisticsEngine';

export interface ReliabilityConstruct {
    constructNameAr: string;
    constructNameEn: string;
    result: ReliabilityResult | null;
    items: { varName: string; text: string }[];
}

interface ReliabilityPanelProps {
    constructs: ReliabilityConstruct[];
}

export function ReliabilityPanel({ constructs }: ReliabilityPanelProps) {

    const getBadgeColor = (status: string) => {
        switch (status) {
            case 'Excellent': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 border-none';
            case 'Good': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-none';
            case 'Acceptable': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border-none';
            case 'Questionable': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400 border-none';
            default: return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-none';
        }
    };

    const getStatusArabic = (status: string) => {
        const map: Record<string, string> = {
            'Excellent': 'ممتاز',
            'Good': 'جيد',
            'Acceptable': 'مقبول',
            'Questionable': 'ضعيف',
            'Poor': 'سيء',
            'Unacceptable': 'غير مقبول'
        };
        return map[status] || status;
    };

    return (
        <div className="space-y-6">
            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border text-sm text-muted-foreground mb-6 leading-relaxed">
                <strong className="text-foreground">تحليل الموثوقية (Reliability Analysis):</strong> يقيس معامل ألفا كرونباخ (Cronbach's Alpha) مدى الاتساق الداخلي لأسئلة كل محور. إذا كانت قيمة معامل ألفا (α) أعلى من 0.7، فإن المقياس يعتبر موثوقاً علمياً ويمكن الاعتماد على نتائجه، مما يثبت أن الأسئلة تقيس نفس المفهوم بنجاح.
            </div>

            {constructs.map((construct, idx) => {
                if (!construct.result) return null;

                const { alpha, status, itemTotalCorrelations, alphaIfDeleted } = construct.result;

                return (
                    <Card key={idx} className="overflow-hidden">
                        <CardHeader className="bg-slate-50 dark:bg-slate-900 border-b pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <CardTitle className="flex items-center gap-2">
                                    {construct.constructNameAr}
                                    <Badge className={getBadgeColor(status)}>{getStatusArabic(status)}</Badge>
                                </CardTitle>
                                <CardDescription className="mt-1">
                                    Cronbach's α = <strong className="text-primary text-base">{alpha.toFixed(3)}</strong>
                                </CardDescription>
                            </div>
                            <div className="text-sm bg-white dark:bg-slate-950 px-4 py-2 rounded-md border shadow-sm">
                                عدد البنود (Items): <span className="font-bold">{construct.items.length}</span>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader className="bg-slate-50/50 dark:bg-slate-900/50">
                                    <TableRow>
                                        <TableHead className="w-[50%]">السؤال (العبارة)</TableHead>
                                        <TableHead className="text-center">
                                            <div className="flex flex-col items-center">
                                                <span>الارتباط الكلي</span>
                                                <span className="text-[10px] text-muted-foreground font-normal">Item-Total Corr</span>
                                            </div>
                                        </TableHead>
                                        <TableHead className="text-center">
                                            <div className="flex flex-col items-center text-primary">
                                                <span>ألفا في حال الحذف</span>
                                                <span className="text-[10px] opacity-80 font-normal">Alpha if Item Deleted</span>
                                            </div>
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {construct.items.map((item, i) => {
                                        const corr = itemTotalCorrelations[item.varName];
                                        const aifd = alphaIfDeleted[item.varName];

                                        // Highlight bad items (low corr or deletion improves alpha significantly)
                                        const isProblematic = corr < 0.3 || (aifd > alpha + 0.05);

                                        return (
                                            <TableRow key={i} className={isProblematic ? "bg-red-50/50 dark:bg-red-950/20" : ""}>
                                                <TableCell className="font-medium text-xs sm:text-sm">
                                                    {item.text.length > 70 ? item.text.substring(0, 70) + '...' : item.text}
                                                    {isProblematic && (
                                                        <span className="mr-2 text-xs text-red-600 dark:text-red-400 block mt-1 font-semibold">
                                                            * يُنصح بمراجعة هذا البند لضعف ارتباطه بالمحور
                                                        </span>
                                                    )}
                                                </TableCell>
                                                <TableCell className="text-center font-mono text-sm">
                                                    {corr !== undefined ? corr.toFixed(3) : '-'}
                                                </TableCell>
                                                <TableCell className="text-center font-mono font-bold text-sm text-primary">
                                                    {aifd !== undefined ? aifd.toFixed(3) : '-'}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}
