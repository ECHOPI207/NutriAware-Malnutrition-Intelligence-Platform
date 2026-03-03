import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileSpreadsheet, FileText, FileCode, BarChart3, Download, FileJson } from 'lucide-react';

interface ExportPanelProps {
    onExportCSV: () => void;
    onExportCodebook: () => void;
    onExportSPSS: () => void;
    onExportSummary: () => void;
    onExportAcademicReport: () => void;
}

export function ExportPanel({
    onExportCSV,
    onExportCodebook,
    onExportSPSS,
    onExportSummary,
    onExportAcademicReport
}: ExportPanelProps) {

    return (
        <div className="space-y-6">

            <div className="bg-slate-50 dark:bg-slate-900 border p-4 rounded-lg flex flex-col md:flex-row items-center gap-6">
                <div className="flex-1">
                    <h3 className="text-lg font-bold flex items-center gap-2 mb-2">
                        تصدير البيانات للدراسات الأكاديمية (Data Export)
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        يتم تحويل البيانات النصية تلقائياً إلى ترميز رقمي (Numeric Coding) لتتوافق مع برامج التحليل الإحصائي
                        (SPSS, SAS, R). يتم تزويدك بدليل المتغيرات (Codebook) لفهم معاني الرموز، بالإضافة لخيار إنشاء
                        تقرير التقييم البحثي الشامل الجاهز للنشر.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {/* Raw Data Group */}
                <Card className="col-span-1 border-primary/20">
                    <CardHeader className="bg-primary/5 pb-3">
                        <CardTitle className="text-base flex justify-between items-center text-primary">
                            بيانات خام مرمّزة
                            <FileJson size={18} />
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4 space-y-4">
                        <p className="text-sm text-muted-foreground">ملفات مجهزة للمعالجة في برامج الإحصاء.</p>
                        <div className="space-y-2">
                            <Button variant="outline" className="w-full justify-start gap-3 border-emerald-200 hover:bg-emerald-50 dark:hover:bg-emerald-950/30" onClick={onExportCSV}>
                                <FileSpreadsheet size={16} className="text-emerald-600" />
                                تحميل Coded CSV
                            </Button>
                            <Button variant="outline" className="w-full justify-start gap-3 text-left border-purple-200 hover:bg-purple-50 dark:hover:bg-purple-950/30" onClick={onExportSPSS}>
                                <FileCode size={16} className="text-purple-600" />
                                <div className="flex flex-col items-start leading-none">
                                    <span>SPSS Syntax (.sps)</span>
                                    <span className="text-[10px] text-muted-foreground mt-1">كود استيراد مع تسميات القيم</span>
                                </div>
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Reference Group */}
                <Card className="col-span-1 border-blue-500/20">
                    <CardHeader className="bg-blue-50/50 dark:bg-blue-900/10 pb-3">
                        <CardTitle className="text-base flex justify-between items-center text-blue-700 dark:text-blue-400">
                            دليل وإطار المتغيرات
                            <FileText size={18} />
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4 space-y-4">
                        <p className="text-sm text-muted-foreground">مفاتيح قراءة الرموز والإجابات الرقمية.</p>
                        <div className="space-y-2">
                            <Button variant="outline" className="w-full justify-start gap-3 border-blue-200 hover:bg-blue-50 dark:hover:bg-blue-950/30" onClick={onExportCodebook}>
                                <FileText size={16} className="text-blue-600" />
                                <div className="flex flex-col items-start leading-none">
                                    <span>دليل Codebook</span>
                                    <span className="text-[10px] text-muted-foreground mt-1">المحاور وعناوين الأسئلة</span>
                                </div>
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Reports Group */}
                <Card className="col-span-1 md:col-span-2 lg:col-span-1 border-orange-500/20">
                    <CardHeader className="bg-orange-50/50 dark:bg-orange-900/10 pb-3">
                        <CardTitle className="text-base flex justify-between items-center text-orange-700 dark:text-orange-400">
                            التقارير التحليلية
                            <BarChart3 size={18} />
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4 space-y-4">
                        <p className="text-sm text-muted-foreground">تقارير جاهزة للنشر وحسابات إحصائية ملخصة.</p>
                        <div className="space-y-2">
                            <Button variant="outline" className="w-full justify-start gap-3 border-orange-200 hover:bg-orange-50 dark:hover:bg-orange-950/30" onClick={onExportSummary}>
                                <BarChart3 size={16} className="text-orange-600" />
                                <div className="flex flex-col items-start leading-none">
                                    <span>تقرير إحصائي بسيط</span>
                                    <span className="text-[10px] text-muted-foreground mt-1">المتوسط والانحراف لكل سؤال</span>
                                </div>
                            </Button>
                            <Button className="w-full justify-start gap-3 bg-slate-900 hover:bg-slate-800 text-white shadow-md mt-4" onClick={onExportAcademicReport}>
                                <Download size={16} />
                                <div className="flex flex-col items-start leading-none">
                                    <span>تقرير بحثي أكاديمي كامل</span>
                                    <span className="text-[10px] text-slate-300 mt-1">توليد APA Format (M, SD, ANOVA)</span>
                                </div>
                            </Button>
                        </div>
                    </CardContent>
                </Card>

            </div>
        </div>
    );
}
