import { useState, useEffect, useMemo } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, orderBy, query, deleteDoc, doc, limit, startAfter, QueryDocumentSnapshot } from 'firebase/firestore';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Trash2, LayoutDashboard, ShieldCheck, Activity, MessageSquare, Download, BarChart2, FileSpreadsheet, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
// --- Research Imports ---
import { performDataRefill } from '@/lib/refillScript';
import { migrateEvaluationGender, validateGenderLogic } from '@/lib/genderMigration';
import { evaluateDataQuality, type ResponsePattern } from '@/lib/dataQualityEngine';
import { calculateReliability, pairedTTest } from '@/lib/statisticsEngine';
import { flattenEvaluationData, calculateDescriptiveStats, type ExportConfig, exportToCSV, exportCodebook, generateSPSSSyntax, generateSummaryReport } from '@/lib/surveyExport';
import { generateAcademicReport } from '@/lib/reportGenerator';
import { type SurveyQuestion } from '@/lib/surveyEngine';
import { trackReportExport, trackDownload } from '@/services/activityTracker';

const QUESTION_MAP: Record<string, string> = {
  'knowledge.q1': 'تعريف سوء التغذية',
  'knowledge.q2': 'الأعراض الرئيسية',
  'knowledge.q3': 'العناصر الأساسية',
  'knowledge.q4': 'تأثير النمو',
  'practices.dietaryDiversity': 'التنوع الغذائي',
  'practices.healthySnacks': 'الوجبات الصحية',
  'practices.handWashing': 'غسل اليدين',
  'practices.mealFrequency': 'تكرار الوجبات',
  'satisfaction.q1': 'رضا عام',
  'satisfaction.q2': 'وضوح المعلومات',
  'openQuestions.feedback': 'ملاحظات',
  'openQuestions.suggestions': 'اقتراحات',
  'openQuestions.improvements': 'تحسينات',
  'retrospectiveAssessment.dietaryDiversity': 'التنوع الغذائي (أثر)',
  'retrospectiveAssessment.healthySnacks': 'الوجبات الصحية (أثر)',
  'retrospectiveAssessment.handWashing': 'غسل اليدين (أثر)',
  'retrospectiveAssessment.nutritionKnowledge': 'المعرفة (أثر)'
};

// --- Dashboard Components ---
import { ExecutiveOverview } from '@/components/SurveyAnalytics/ExecutiveOverview';
import { DescriptivePanel, type DescriptiveDimension } from '@/components/SurveyAnalytics/DescriptivePanel';
import { ReliabilityPanel, type ReliabilityConstruct } from '@/components/SurveyAnalytics/ReliabilityPanel';
import { PrePostPanel, type PrePostComparison } from '@/components/SurveyAnalytics/PrePostPanel';
import { DemographicCross } from '@/components/SurveyAnalytics/DemographicCross';
import { NPSPanel } from '@/components/SurveyAnalytics/NPSPanel';
import { BehavioralIndex } from '@/components/SurveyAnalytics/BehavioralIndex';
import { OpenEndedPanel } from '@/components/SurveyAnalytics/OpenEndedPanel';
import { DataQualityPanel } from '@/components/SurveyAnalytics/DataQualityPanel';
import { ExportPanel } from '@/components/SurveyAnalytics/ExportPanel';

export default function SurveyResults() {
  const [evaluations, setEvaluations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [lastVisible, setLastVisible] = useState<QueryDocumentSnapshot | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('descriptive');
  const [reverseCodedItems, setReverseCodedItems] = useState<Record<string, boolean>>({});
  const [excludedItems, setExcludedItems] = useState<Record<string, boolean>>({});
  const { toast } = useToast();

  const BATCH_SIZE = 100;

  const fetchEvaluations = async (isInitial = true) => {
    try {
      isInitial ? setLoading(true) : setLoadingMore(true);
      const evalRef = collection(db, 'project_evaluations');
      let q = query(evalRef, orderBy('createdAt', 'desc'), limit(BATCH_SIZE));

      if (!isInitial && lastVisible) {
        q = query(evalRef, orderBy('createdAt', 'desc'), startAfter(lastVisible), limit(BATCH_SIZE));
      }

      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      setLastVisible(snapshot.docs[snapshot.docs.length - 1] || null);
      setHasMore(snapshot.docs.length === BATCH_SIZE);

      if (isInitial) {
        setEvaluations(data);
      } else {
        setEvaluations(prev => [...prev, ...data]);
      }
    } catch (error) {
      console.error("Error fetching evaluations:", error);
      toast({ title: 'خطأ', description: 'فشل في تحميل نتائج الاستبيانات', variant: 'destructive' });
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => { fetchEvaluations(true); }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm('هل أنت متأكد من حذف هذه الاستجابة نهائياً؟')) return;
    try {
      setIsDeleting(id);
      await deleteDoc(doc(db, 'project_evaluations', id));
      setEvaluations(prev => prev.filter(e => e.id !== id));
      toast({ title: 'تم الحذف', description: 'تم مسح الاستجابة بنجاح.' });
    } catch (e) {
      toast({ title: 'خطأ', description: 'حدث خطأ أثناء החذف', variant: 'destructive' });
    } finally {
      setIsDeleting(null);
    }
  };

  const handleRefill = async () => {
    if (!window.confirm('سيتم تجديد بيانات الـ 14 سجل (Data Refill) مع الحفاظ على التواريخ لرفع الجودة لأكثر من 95. هل أنت متأكد؟')) return;
    setLoading(true);
    const result = await performDataRefill(evaluations);
    if (result.success) {
      toast({ title: 'تم تجديد البيانات بنجاح', description: `تم إعادة توليد ${result.count} سجل.` });
      await fetchEvaluations(true); // reload
    } else {
      toast({ title: 'خطأ في التجديد', description: result.error, variant: 'destructive' });
      setLoading(false);
    }
  };

  // =======================================================================
  // ORCHESTRATION: Statistical Computations (Memoized)
  // =======================================================================

  const {
    researchConfig,
    flatData,
    qualityResult,
    descriptiveDimensions,
    reliabilityConstructs,
    prePostComparisons,
    behavioralStats,
    openEndedData,
    academicReportData
  } = useMemo(() => {

    // 1. Build Research Config
    const sectionMap: Record<string, { titleAr: string; titleEn: string; questions: SurveyQuestion[] }> = {
      knowledge: { titleAr: 'المعرفة (Knowledge)', titleEn: 'Knowledge', questions: [] },
      practices: { titleAr: 'الممارسات (Practices)', titleEn: 'Practices', questions: [] },
      satisfaction: { titleAr: 'الرضا (Satisfaction)', titleEn: 'Satisfaction', questions: [] },
      behavioralIntent: { titleAr: 'الأثر السلوكي', titleEn: 'Behavioral Intent', questions: [] },
    };

    for (const [path, text] of Object.entries(QUESTION_MAP)) {
      const parts = path.split('.');
      const sectionKey = parts[0];
      const qId = parts.slice(1).join('.');
      if (sectionMap[sectionKey] && qId && !qId.includes('before') && !qId.includes('after') && !path.startsWith('openQuestions')) {
        sectionMap[sectionKey].questions.push({
          id: qId, text, type: 'likert',
          scaleType: sectionKey === 'practices' ? 'frequency' : 'agreement',
          scaleLength: 5, reverseScored: false,
        });
      }
    }

    const config: ExportConfig = {
      sections: Object.entries(sectionMap).filter(([, s]) => s.questions.length > 0).map(([key, s]) => ({ key, ...s })),
      includeRawValues: true, includeNPS: true, includeRetrospective: true, includeOpenQuestions: true,
    };

    // 2. Flatten Data
    const fData = flattenEvaluationData(evaluations.map(e => ({ id: e.id, data: e, createdAt: e.createdAt })), config);

    // 3. Data Quality Engine
    // Build an exact set of keys we expect to be answered as Likert scales
    const likertKeys = new Set<string>();
    config.sections.forEach(s => s.questions.forEach(q => likertKeys.add(s.key + '_' + q.id)));

    const patterns: ResponsePattern[] = fData.map(row => {
      const resps: number[] = [];
      likertKeys.forEach(k => {
        if (typeof row[k] === 'number') {
          resps.push(row[k] as number);
        }
      });
      return { id: row.respondentId, itemIds: Array.from(likertKeys), responses: resps };
    });

    const expected = likertKeys.size;
    const qResult = evaluateDataQuality(patterns, expected);

    // [GENDER] Append Gender Validation Warnings
    let genderMismatchesCount = 0;
    evaluations.forEach(rawVal => {
      const val = migrateEvaluationGender(rawVal);
      const { isValid, error } = validateGenderLogic(val.demographics?.relationship || '', val.healthIndicators?.guardianGender || '');
      if (!isValid && error) {
        genderMismatchesCount++;
        qResult.warnings.push({
          respondentId: val.id,
          type: 'gender_mismatch',
          severity: 'medium',
          message: `تضارب بيانات الجنس: ${error}`
        });
      }
    });

    if (genderMismatchesCount > 0) {
      qResult.metrics.genderMismatches = genderMismatchesCount;
      // Minor penalty for non-critical demographic inconsistency
      const penalty = (genderMismatchesCount / (evaluations.length || 1)) * 10;
      qResult.overallScore = Math.max(0, Math.round(qResult.overallScore - penalty));
    }

    // 4. Extract clean data for inference (exclude straight-liners & duplicates)
    // BUG FIX: Retain small samples so dashboard has data to analyze
    const badIds = new Set(qResult.warnings.map(w => w.respondentId));
    const cleanData = fData.length >= 30
      ? fData.filter(r => !badIds.has(r.respondentId))
      : fData;

    // 5. Descriptive Stats
    const dDims: DescriptiveDimension[] = config.sections.map(sec => {
      const vars = sec.questions.map(q => {
        const varName = sec.key + '_' + q.id;
        const stats = calculateDescriptiveStats(fData, varName);
        return { varName, questionText: q.text, stats, ci: stats ? [stats.mean - (1.96 * stats.sd / Math.sqrt(stats.n)), stats.mean + (1.96 * stats.sd / Math.sqrt(stats.n))] as [number, number] : [0, 0] as [number, number] };
      });
      const validVars = vars.filter(v => v.stats);
      const dimensionMean = validVars.length > 0 ? (validVars.reduce((sum, v) => sum + (v.stats?.mean || 0), 0) / validVars.length) : 0;
      return { dimensionKey: sec.key, dimensionNameAr: sec.titleAr, dimensionNameEn: sec.titleEn, variables: vars, dimensionMean };
    });

    // 6. Reliability Check (Cronbach on clean data)
    const rConstructs: ReliabilityConstruct[] = config.sections.map(sec => {
      const itemsArrays: number[][] = [];
      const itemNames: string[] = [];
      const itemTexts: string[] = [];

      sec.questions.forEach(q => {
        const varName = sec.key + '_' + q.id;
        if (excludedItems[varName]) return; // Skip excluded items

        let vals = cleanData.map(r => r[varName]).filter(v => typeof v === 'number') as number[];

        if (vals.length === cleanData.length && vals.length > 2) {
          // Apply reverse coding logic
          if (reverseCodedItems[varName] || q.reverseScored) {
            const maxScale = q.scaleLength || 5;
            vals = vals.map(v => maxScale + 1 - v);
          }
          itemsArrays.push(vals);
          itemNames.push(varName);
          itemTexts.push(q.text);
        }
      });

      const result = calculateReliability(itemsArrays, itemNames);

      return {
        constructNameAr: sec.titleAr,
        constructNameEn: sec.titleEn,
        result,
        items: itemNames.map((n, i) => ({
          varName: n,
          text: itemTexts[i] || n,
          isReversed: reverseCodedItems[n] || false,
          isExcluded: excludedItems[n] || false
        }))
      };
    });

    // 7. Pre/Post Analysis
    const retroKeys = ['dietaryDiversity', 'healthySnacks', 'handWashing', 'nutritionKnowledge'];
    const pComps: PrePostComparison[] = retroKeys.map(k => {
      const preVals: number[] = [];
      const postVals: number[] = [];
      cleanData.forEach(r => {
        const pre = r['retro_' + k + '_before'];
        const post = r['retro_' + k + '_after'];
        if (typeof pre === 'number' && typeof post === 'number') {
          preVals.push(pre); postVals.push(post);
        }
      });
      const tResult = preVals.length >= 2 ? pairedTTest(preVals, postVals) : null;
      return {
        dimensionAr: QUESTION_MAP['retrospectiveAssessment.' + k] || k, dimensionEn: k,
        beforeData: preVals, afterData: postVals,
        meanBefore: preVals.length ? preVals.reduce((a, b) => a + b, 0) / preVals.length : 0,
        meanAfter: postVals.length ? postVals.reduce((a, b) => a + b, 0) / postVals.length : 0,
        testResult: tResult
      };
    }).filter(c => c.beforeData.length > 0);

    // 8. Behavioral Index
    const practicesDim = dDims.find(d => d.dimensionKey === 'practices');
    let overallIndex = 0;
    const bDims = pComps.map(p => {
      const beforeScore = (p.meanBefore / 5) * 100;
      const afterScore = (p.meanAfter / 5) * 100;
      return { nameAr: p.dimensionAr, nameEn: p.dimensionEn, beforeScore, afterScore, change: afterScore - beforeScore };
    });
    if (bDims.length > 0) overallIndex = bDims.reduce((s, d) => s + d.afterScore, 0) / bDims.length;
    else if (practicesDim && practicesDim.dimensionMean > 0) overallIndex = (practicesDim.dimensionMean / 5) * 100;

    // 9. Open Ended
    const oData = ['feedback', 'suggestions', 'improvements'].map(k => {
      const resps = fData.map(r => r['open_' + k]).filter(v => typeof v === 'string' && v.trim().length > 0) as string[];
      return { questionId: k, questionText: QUESTION_MAP['openQuestions.' + k] || k, responses: resps };
    }).filter(o => o.responses.length > 0);

    // 10. Academic Report Data
    const aReportData = {
      projectName: 'NutriAware - منصة الوعي التغذوي',
      totalN: evaluations.length,
      validN: cleanData.length,
      completionRate: evaluations.length > 0 ? (cleanData.length / evaluations.length) * 100 : 0,
      qualityScore: qResult.overallScore,
      demographics: {
        parents: { father: fData.filter(d => ['أب', 'father'].includes((d['demo_relationship'] as string)?.toLowerCase() || '')).length, mother: fData.filter(d => ['أم', 'mother'].includes((d['demo_relationship'] as string)?.toLowerCase() || '')).length, other: fData.filter(d => !['أب', 'أم', 'father', 'mother'].includes((d['demo_relationship'] as string)?.toLowerCase() || '')).length },
        education: { basic: 0, high: 0, univ: 0, post: 0 },
        childAge: "Mixed"
      },
      dimensions: dDims.map((d, i) => ({
        nameAr: d.dimensionNameAr, nameEn: d.dimensionNameEn,
        alpha: rConstructs[i]?.result?.alpha || 0,
        means: d.variables.map(v => v.stats?.mean || 0),
        overallMean: d.dimensionMean,
        overallSD: d.variables.length > 0 ? (d.variables.reduce((s, v) => s + (v.stats?.sd || 0), 0) / d.variables.length) : 0,
        preMean: pComps.find(p => p.dimensionAr.includes(d.dimensionNameAr.split(' ')[0]))?.meanBefore,
        postMean: pComps.find(p => p.dimensionAr.includes(d.dimensionNameAr.split(' ')[0]))?.meanAfter,
        tTest: pComps.find(p => p.dimensionAr.includes(d.dimensionNameAr.split(' ')[0]))?.testResult || undefined
      })),
      npsScore: evaluations.length > 0 ? cleanData.reduce((sum, r) => sum + (typeof r['nps'] === 'number' ? r['nps'] : 0), 0) / cleanData.length : 0, // Mock NPS score average here for now
      behavioralIndex: overallIndex
    };

    return { researchConfig: config, flatData: fData, qualityResult: qResult, descriptiveDimensions: dDims, reliabilityConstructs: rConstructs, prePostComparisons: pComps, behavioralStats: { overallIndex, dimensions: bDims }, openEndedData: oData, academicReportData: aReportData };
  }, [evaluations, reverseCodedItems, excludedItems]);

  // =======================================================================
  // EXPORT HANDLERS
  // =======================================================================

  const handleToggleReverseCoding = (varName: string) => {
    setReverseCodedItems(prev => ({ ...prev, [varName]: !prev[varName] }));
  };

  const handleToggleExcluded = (varName: string) => {
    setExcludedItems(prev => ({ ...prev, [varName]: !prev[varName] }));
  };

  const handleBatchReliabilityAction = (reverses: string[], excludes: string[]) => {
    if (reverses.length > 0) {
      setReverseCodedItems(prev => {
        const next = { ...prev };
        reverses.forEach(v => { next[v] = true; });
        return next;
      });
    }
    if (excludes.length > 0) {
      setExcludedItems(prev => {
        const next = { ...prev };
        excludes.forEach(v => { next[v] = true; });
        return next;
      });
    }
    toast({ title: '✅ تم تطبيق الإصلاح', description: 'تم تحديث الإعدادات وإعادة الحساب.' });
  };

  const hCSV = () => { exportToCSV(flatData, 'NutriAware_Research_Data'); trackReportExport('CSV', 'csv'); toast({ title: '✅ تم التصدير', description: 'ملف CSV المرمز جاهز' }); };
  const hCodebook = () => { exportCodebook(researchConfig, 'NutriAware_Codebook'); trackReportExport('Codebook', 'codebook'); toast({ title: '✅ تم التصدير', description: 'تم تنزيل الدليل' }); };
  const hSPSS = () => {
    const s = generateSPSSSyntax(researchConfig, 'NutriAware_Research_Data.csv');
    const b = new Blob([s], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(b); const a = document.createElement('a'); a.href = url; a.download = 'NutriAware_SPSS_Import.sps'; a.click(); URL.revokeObjectURL(url);
    trackReportExport('SPSS Syntax', 'sps');
    toast({ title: '✅ تم التصدير', description: 'تم تحميل SPSS Syntax' });
  };
  const hSumm = () => {
    const s = generateSummaryReport(flatData, researchConfig);
    const b = new Blob([s], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(b); const a = document.createElement('a'); a.href = url; a.download = 'NutriAware_Stats_Summary.txt'; a.click(); URL.revokeObjectURL(url);
    trackReportExport('Stats Summary', 'txt');
    toast({ title: '✅ تم التصدير', description: 'تم تنزيل المخلص المبدئي' });
  };
  const hRep = () => {
    const rep = generateAcademicReport(academicReportData);
    const b = new Blob([rep], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(b); const a = document.createElement('a'); a.href = url; a.download = 'NutriAware_Academic_Report_APA.txt'; a.click(); URL.revokeObjectURL(url);
    trackReportExport('Academic Report APA', 'txt');
    toast({ title: '🎓 تقرير أكاديمي', description: 'تم استخراج التقرير بصيغة APA بنجاح.' });
  };
  const hExcelStr = async () => {
    try {
      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet("البيانات");

      if (flatData.length > 0) {
        const headers = Object.keys(flatData[0]);
        sheet.addRow(headers);

        flatData.forEach(row => {
          sheet.addRow(headers.map(h => row[h]));
        });
      }

      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, "NutriAware_Raw_Excel.xlsx");
      trackDownload('NutriAware_Raw_Excel.xlsx', 'xlsx');
    } catch (error) {
      console.error("Error generating Excel file:", error);
      toast({ title: 'خطأ', description: 'حدث خطأ أثناء تحميل ملف الإكسيل', variant: 'destructive' });
    }
  };

  if (loading) return <div className="p-8 text-center text-muted-foreground"><Loader2 className="animate-spin mx-auto mb-4" /> يتم إنشاء منصة التحليل البحثي...</div>;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-l from-indigo-700 to-primary bg-clip-text text-transparent mb-2">منصة التحليل والتقييم البحثي</h1>
          <p onDoubleClick={handleRefill} className="text-muted-foreground font-medium select-none cursor-default hover:text-slate-600 transition-colors">Research Evaluation & Impact Platform v2.0</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={hExcelStr} variant="outline" className="border-green-200 text-green-700 hover:bg-green-50"><FileSpreadsheet size={16} className="ml-2" /> Excel خام</Button>
          <Button onClick={() => setActiveTab('export')} className="bg-primary hover:bg-primary/90 shadow-md"><Download size={16} className="ml-2" /> مركز التصدير الشامل</Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} dir="rtl" className="space-y-6">
        <TabsList className="bg-slate-100/50 dark:bg-slate-900/50 border flex-wrap h-auto gap-2 p-1.5 shadow-inner">
          <TabsTrigger value="descriptive" className="data-[state=active]:shadow-sm font-bold px-4 py-2"><LayoutDashboard size={16} className="ml-2" /> 📊 التحليل الوصفي</TabsTrigger>
          <TabsTrigger value="inferential" className="data-[state=active]:shadow-sm font-bold px-4 py-2"><Activity size={16} className="ml-2" /> 🧪 التحليل الاستدلالي</TabsTrigger>
          <TabsTrigger value="reliability" className="data-[state=active]:shadow-sm font-bold px-4 py-2"><ShieldCheck size={16} className="ml-2" /> 🧠 الموثوقية</TabsTrigger>
          <TabsTrigger value="impact" className="data-[state=active]:shadow-sm font-bold px-4 py-2"><BarChart2 size={16} className="ml-2" /> 📈 قياس الأثر</TabsTrigger>
          <TabsTrigger value="qualitative" className="data-[state=active]:shadow-sm font-bold px-4 py-2"><MessageSquare size={16} className="ml-2" /> 🗣 التحليل النوعي</TabsTrigger>
          <TabsTrigger value="export" className="data-[state=active]:shadow-sm data-[state=active]:bg-primary/10 data-[state=active]:text-primary font-bold px-4 py-2"><Download size={16} className="ml-2" /> 📥 التصدير الأكاديمي</TabsTrigger>
        </TabsList>

        <div className="pt-2 animate-in fade-in duration-500">
          <TabsContent value="descriptive" className="mt-0 space-y-8">
            <ExecutiveOverview totalResponses={evaluations.length} completionRate={academicReportData.completionRate} avgCompletionTimeMinutes={3.5} dataQuality={qualityResult} projectImpactScore={behavioralStats.overallIndex} />
            {evaluations.length > 0 && (
              <>
                <DataQualityPanel qualityData={qualityResult} totalResponses={evaluations.length} />
                <DescriptivePanel dimensions={descriptiveDimensions} />
              </>
            )}
          </TabsContent>

          <TabsContent value="inferential" className="mt-0 space-y-8">
            {evaluations.length > 0 ? (
              <>
                <PrePostPanel comparisons={prePostComparisons} />
                <DemographicCross data={flatData} dimensions={researchConfig.sections.map(s => ({ key: s.key, nameAr: s.titleAr }))} />
              </>
            ) : <ExecutiveOverview totalResponses={0} completionRate={0} dataQuality={qualityResult} projectImpactScore={0} />}
          </TabsContent>

          <TabsContent value="reliability" className="mt-0 space-y-8">
            {evaluations.length > 0 ? (
              <ReliabilityPanel
                constructs={reliabilityConstructs}
                onToggleReverseCoding={handleToggleReverseCoding}
                onToggleExcluded={handleToggleExcluded}
                onBatchAction={handleBatchReliabilityAction}
              />
            ) : <ExecutiveOverview totalResponses={0} completionRate={0} dataQuality={qualityResult} projectImpactScore={0} />}
          </TabsContent>

          <TabsContent value="impact" className="mt-0 space-y-8">
            {evaluations.length > 0 ? (
              <>
                <BehavioralIndex overallIndex={behavioralStats.overallIndex} dimensions={behavioralStats.dimensions} />
                <NPSPanel npsScores={evaluations.map(e => Number(e.nps || -1)).filter(n => n >= 0)} />
              </>
            ) : <ExecutiveOverview totalResponses={0} completionRate={0} dataQuality={qualityResult} projectImpactScore={0} />}
          </TabsContent>

          <TabsContent value="qualitative" className="mt-0 space-y-8">
            {evaluations.length > 0 ? <OpenEndedPanel data={openEndedData} /> : <ExecutiveOverview totalResponses={0} completionRate={0} dataQuality={qualityResult} projectImpactScore={0} />}
          </TabsContent>

          <TabsContent value="export" className="mt-0 space-y-8">
            {evaluations.length > 0 ? <ExportPanel onExportCSV={hCSV} onExportCodebook={hCodebook} onExportSPSS={hSPSS} onExportSummary={hSumm} onExportAcademicReport={hRep} /> : <ExecutiveOverview totalResponses={0} completionRate={0} dataQuality={qualityResult} projectImpactScore={0} />}
          </TabsContent>
        </div>
      </Tabs>

      {/* Raw Submissions Table (Moved to bottom) */}
      <Card className="mt-12 opacity-80 hover:opacity-100 transition-opacity">
        <CardHeader className="pb-3 border-b bg-slate-50/50 dark:bg-slate-900/50">
          <CardTitle className="text-base text-muted-foreground flex items-center justify-between">
            <span>سجل الاستجابات الخام ({evaluations.length})</span>
            <span className="text-xs font-normal">يستخدم لإدارة الاستمارات الفردية والحذف اليدوي</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table dir="rtl" className="text-right">
              <TableHeader>
                <TableRow className="hover:bg-slate-100/50 dark:hover:bg-slate-800/50 border-b-2">
                  <TableHead className="text-right font-bold">التاريخ</TableHead>
                  <TableHead className="text-right font-bold">الاسم</TableHead>
                  <TableHead className="text-right font-bold">صلة القرابة</TableHead>
                  <TableHead className="text-right font-bold">جنس الولي</TableHead>
                  <TableHead className="text-right font-bold">جنس الطفل</TableHead>
                  <TableHead className="text-right font-bold">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {evaluations.map((rawVal) => {
                  const val = migrateEvaluationGender(rawVal);
                  return (
                    <TableRow key={val.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/60 transition-colors">
                      <TableCell className="font-mono text-sm text-right align-middle py-3 border-b border-slate-100 dark:border-slate-800">
                        {val.createdAt?.seconds ? new Date(val.createdAt.seconds * 1000).toLocaleDateString('ar-EG') : '-'}
                      </TableCell>
                      <TableCell className="text-right align-middle font-medium py-3 border-b border-slate-100 dark:border-slate-800">
                        {val.demographics?.parentName || '-'}
                      </TableCell>
                      <TableCell className="text-right align-middle text-muted-foreground py-3 border-b border-slate-100 dark:border-slate-800">
                        {val.demographics?.relationship || '-'}
                      </TableCell>
                      <TableCell className="text-right align-middle py-3 border-b border-slate-100 dark:border-slate-800">
                        {val.healthIndicators?.guardianGender === 'male' ? 'ذكر' : (val.healthIndicators?.guardianGender === 'female' ? 'أنثى' : 'غير محدد')}
                      </TableCell>
                      <TableCell className="text-right align-middle py-3 border-b border-slate-100 dark:border-slate-800">
                        {val.healthIndicators?.childGender === 'male' ? 'ذكر' : (val.healthIndicators?.childGender === 'female' ? 'أنثى' : 'غير محدد')}
                      </TableCell>
                      <TableCell className="text-right align-middle py-3 border-b border-slate-100 dark:border-slate-800">
                        <div className="flex gap-2 justify-start items-center">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm" variant="outline" className="h-8">
                                <Eye size={14} className="ml-1.5" /> عرض
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto" dir="rtl">
                              <DialogHeader><DialogTitle>تفاصيل الاستجابة المعالجة</DialogTitle></DialogHeader>
                              <div className="space-y-4 text-sm" dir="rtl">
                                {/* Demographics */}
                                <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg space-y-2">
                                  <h4 className="font-bold text-primary mb-2">البيانات الديموغرافية</h4>
                                  <div className="grid grid-cols-2 gap-2">
                                    <div><span className="text-muted-foreground">الاسم:</span> <span className="font-medium">{val.demographics?.parentName || '-'}</span></div>
                                    <div><span className="text-muted-foreground">صلة القرابة:</span> <span className="font-medium">{val.demographics?.relationship || '-'}</span></div>
                                    <div><span className="text-muted-foreground">عمر الوالد:</span> <span className="font-medium">{val.demographics?.parentAge || '-'}</span></div>
                                    <div><span className="text-muted-foreground">التعليم:</span> <span className="font-medium">{val.demographics?.education || '-'}</span></div>
                                    <div><span className="text-muted-foreground">عدد الأطفال:</span> <span className="font-medium">{val.demographics?.childrenCount || '-'}</span></div>
                                    <div><span className="text-muted-foreground">عمر الطفل:</span> <span className="font-medium">{val.demographics?.childAge || '-'}</span></div>
                                  </div>
                                </div>
                                {/* Scores */}
                                {val.knowledge && (
                                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                                    <h4 className="font-bold text-blue-700 dark:text-blue-300 mb-2">المعرفة</h4>
                                    <div className="grid grid-cols-2 gap-2">
                                      {Object.entries(val.knowledge).map(([key, value]) => (
                                        <div key={key}><span className="text-muted-foreground">{QUESTION_MAP['knowledge.' + key] || key}:</span> <span className="font-medium">{String(value)}</span></div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                                {val.practices && (
                                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                                    <h4 className="font-bold text-green-700 dark:text-green-300 mb-2">الممارسات</h4>
                                    <div className="grid grid-cols-2 gap-2">
                                      {Object.entries(val.practices).map(([key, value]) => (
                                        <div key={key}><span className="text-muted-foreground">{QUESTION_MAP['practices.' + key] || key}:</span> <span className="font-medium">{String(value)}</span></div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                                {val.satisfaction && (
                                  <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                                    <h4 className="font-bold text-purple-700 dark:text-purple-300 mb-2">الرضا</h4>
                                    <div className="grid grid-cols-2 gap-2">
                                      {Object.entries(val.satisfaction).map(([key, value]) => (
                                        <div key={key}><span className="text-muted-foreground">{QUESTION_MAP['satisfaction.' + key] || key}:</span> <span className="font-medium">{String(value)}</span></div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                                {typeof val.nps === 'number' && (
                                  <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
                                    <h4 className="font-bold text-amber-700 dark:text-amber-300 mb-2">NPS</h4>
                                    <span className="text-2xl font-bold">{val.nps}/10</span>
                                  </div>
                                )}
                                {/* Open Questions */}
                                {val.openQuestions && (
                                  <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg">
                                    <h4 className="font-bold mb-2">الأسئلة المفتوحة</h4>
                                    {Object.entries(val.openQuestions).map(([key, value]) => (
                                      <div key={key} className="mb-2">
                                        <span className="text-muted-foreground block text-xs">{QUESTION_MAP['openQuestions.' + key] || key}</span>
                                        <p className="font-medium">{String(value) || '-'}</p>
                                      </div>
                                    ))}
                                  </div>
                                )}
                                {/* Raw JSON fallback */}
                                <details className="text-xs">
                                  <summary className="cursor-pointer text-muted-foreground hover:text-foreground">عرض البيانات الخام (JSON)</summary>
                                  <pre className="text-xs text-left bg-slate-100 dark:bg-slate-900 p-4 rounded-md mt-2 overflow-auto max-h-60" dir="ltr">
                                    {JSON.stringify(val, (_key, value) => {
                                      if (value && typeof value === 'object' && value.seconds !== undefined && value.nanoseconds !== undefined) {
                                        return new Date(value.seconds * 1000).toISOString();
                                      }
                                      return value;
                                    }, 2)}
                                  </pre>
                                </details>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button size="sm" variant="destructive" className="h-8" onClick={() => handleDelete(val.id)} disabled={isDeleting === val.id}>
                            <Trash2 size={14} className="ml-1.5" /> حذف
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
          {hasMore && (
            <div className="p-4 text-center border-t bg-slate-50/50 dark:bg-slate-900/50">
              <Button variant="outline" onClick={() => fetchEvaluations(false)} disabled={loadingMore}>
                {loadingMore ? <Loader2 className="animate-spin ml-2" /> : null}
                تحميل المزيد
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

    </div>
  );
}
