import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, orderBy, query, deleteDoc, doc, limit, startAfter, QueryDocumentSnapshot } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Download, Loader2, Eye, Trash2 } from 'lucide-react';
import * as XLSX from 'xlsx';
import { useToast } from '@/hooks/use-toast';
import { 
  BarChart as RechartsBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  PieChart as RechartsPieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';

interface EvaluationData {
  id: string;
  createdAt: any;
  demographics: {
    parentName?: string;
    relationship: string;
    parentAge: string;
    education: string;
    childrenCount: string;
    childAge: string;
  };
  healthIndicators: {
    gender: string;
    weightPerception: string;
    healthIssues: string[];
    otherHealthIssue?: string;
    infoSources: string[];
    otherInfoSource?: string;
  };
  satisfaction: Record<string, string>;
  // ... other fields
  [key: string]: any;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const QUESTION_MAP: Record<string, string> = {
  // Knowledge
  "knowledge.q1": "أعلم أن سوء التغذية يشمل نقص العناصر وليس فقط نقص الوزن",
  "knowledge.q2": "أعلم أن الغذاء الصحي يجب أن يحتوي على الخضروات والفواكه يومياً",
  "knowledge.q3": "أعلم أن الإفراط في الوجبات السريعة يضر بصحة الطفل",
  "knowledge.q4": "أعلم علامات سوء التغذية مثل الإرهاق وضعف التركيز",
  
  // Practices
  "practices.q1": "أحرص على توفر الخضروات والفواكه في غذاء طفلي",
  "practices.q2": "أراقب استهلاك طفلي للحلويات والسكريات والمشروبات الغازية",
  "practices.q3": "نادرًا ما نتناول الوجبات السريعة في المنزل",
  "practices.q4": "أشجع طفلي على شرب الماء بانتظام",
  "practices.q5": "أقوم بقراءة البطاقة الغذائية (المكونات) قبل شراء المنتجات للطفل",
  "practices.q6": "أحرص على تقديم وجبة الإفطار لطفلي قبل الذهاب إلى المدرسة",
  "practices.q7": "أجد صعوبة في تقديم أغذية صحية بسبب تكلفتها المالية",

  // Intervention Stories
  "intervention.stories.q1": "القصص: كانت القصص جذابة بصرياً",
  "intervention.stories.q2": "القصص: اللغة مناسبة لعمر طفلي",
  "intervention.stories.q3": "القصص: المعلومات غيرت مفاهيم خاطئة",
  "intervention.stories.q4": "القصص: نقلت رسائل توعوية مفيدة",
  "intervention.stories.q5": "القصص: شجعت طفلي على الطعام الصحي",

  // Intervention Platform Usability
  "intervention.platform.usability.q1": "المنصة: الدخول عبر QR كان سهلاً",
  "intervention.platform.usability.q2": "المنصة: سهلة الاستخدام والتنقل",

  // Intervention Platform Content
  "intervention.platform.content.q1": "المنصة: المعلومات موثوقة ومفيدة",
  "intervention.platform.content.q2": "المنصة: الخطط واقعية وقابلة للتطبيق",

  // Intervention Platform Tools
  "intervention.platform.tools.q1": "المنصة: أدوات التقييم سهلة الفهم",
  "intervention.platform.tools.q2": "المنصة: النتائج ساعدتني في فهم حالة طفلي",
  
  // Intervention Platform Consultation
  "intervention.platform.consultation.q1": "المنصة: وسائل التواصل واضحة",
  "intervention.platform.consultation.q2": "المنصة: شعرت بالاطمئنان لطلب الاستشارة",

  // Satisfaction
  "satisfaction.q1": "أنا راضٍ بشكل عام عن المشروع",
  "satisfaction.q2": "أنصح غيري بالاطلاع على المنصة",

  // Behavioral Intent
  "behavioralIntent.q1": "أنوي تطبيق تغييرات غذائية",
  "behavioralIntent.q2": "أنوي تقليل الوجبات السريعة",
  "behavioralIntent.q3": "أنوي تشجيع طفلي على الخضروات والفواكه",
  "behavioralIntent.q4": "أنوي استخدام المنصة بانتظام",
  "behavioralIntent.q5": "الخطط كانت واقعية",

  // Retrospective Knowledge
  "retrospective.knowledge.before": "المعرفة قبل المشروع",
  "retrospective.knowledge.after": "المعرفة بعد المشروع",

  // Retrospective Practices
  "retrospective.practices.before": "الممارسات قبل المشروع",
  "retrospective.practices.after": "الممارسات بعد المشروع",
  
  // Open Questions
  "openQuestions.likedMost": "ما أكثر ما أعجبك في المشروع؟",
  "openQuestions.challenges": "التحديات التي تمنع العادات الصحية",
  "openQuestions.suggestions": "اقتراحات للتحسين"
};

const SurveyResults = () => {
  const { toast } = useToast();
  const [evaluations, setEvaluations] = useState<EvaluationData[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [selectedEval, setSelectedEval] = useState<EvaluationData | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [evalToDelete, setEvalToDelete] = useState<string | null>(null);
  const [lastVisible, setLastVisible] = useState<QueryDocumentSnapshot | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const ITEMS_PER_PAGE = 50;

  useEffect(() => {
    fetchEvaluations(true);
  }, []);

  const fetchEvaluations = async (isInitial = false) => {
    try {
      if (isInitial) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      let q = query(
        collection(db, "project_evaluations"), 
        orderBy("createdAt", "desc"),
        limit(ITEMS_PER_PAGE)
      );

      if (!isInitial && lastVisible) {
        q = query(
          collection(db, "project_evaluations"), 
          orderBy("createdAt", "desc"),
          startAfter(lastVisible),
          limit(ITEMS_PER_PAGE)
        );
      }

      const querySnapshot = await getDocs(q);
      
      const lastVisibleDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
      setLastVisible(lastVisibleDoc);
      setHasMore(querySnapshot.docs.length === ITEMS_PER_PAGE);

      const data: EvaluationData[] = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as EvaluationData);
      });

      if (isInitial) {
        setEvaluations(data);
      } else {
        setEvaluations(prev => [...prev, ...data]);
      }
    } catch (error) {
      console.error("Error fetching evaluations:", error);
      toast({
        variant: "destructive",
        title: "خطأ",
        description: "فشل تحميل البيانات"
      });
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleDeleteClick = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setEvalToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!evalToDelete) return;
    try {
      await deleteDoc(doc(db, "project_evaluations", evalToDelete));
      setEvaluations(prev => prev.filter(e => e.id !== evalToDelete));
      toast({
        title: "تم الحذف",
        description: "تم حذف الاستبيان بنجاح",
        className: "bg-green-600 text-white border-none",
      });
    } catch (error) {
      console.error("Error deleting document:", error);
      toast({
        variant: "destructive",
        title: "خطأ في الحذف",
        description: "حدث خطأ أثناء محاولة الحذف، قد لا تملك الصلاحية."
      });
    } finally {
      setDeleteDialogOpen(false);
      setEvalToDelete(null);
    }
  };

  const exportToExcel = () => {
    // Helper function to flatten nested objects for Excel columns
    const flattenObject = (obj: any, prefix = ''): any => {
      return Object.keys(obj).reduce((acc: any, k) => {
        // Map common keys to nicer Arabic headers if possible, otherwise use path
        const pre = prefix.length ? prefix + '.' : '';
        const fullPath = pre + k;
        
        // Skip metadata fields we handle manually or don't want
        if (['id', 'createdAt', 'userAgent', 'updatedAt'].includes(k) && !prefix) return acc;

        if (typeof obj[k] === 'object' && obj[k] !== null && !Array.isArray(obj[k])) {
          Object.assign(acc, flattenObject(obj[k], fullPath));
        } else if (Array.isArray(obj[k])) {
          acc[QUESTION_MAP[fullPath] || fullPath] = obj[k].join(', ');
        } else {
          acc[QUESTION_MAP[fullPath] || fullPath] = obj[k];
        }
        return acc;
      }, {});
    };

    const exportData = evaluations.map(e => {
      // 1. Basic Metadata
      const basicData = {
        'تاريخ الإرسال': e.createdAt?.seconds ? new Date(e.createdAt.seconds * 1000).toLocaleDateString('ar-EG') : '-',
        'وقت الإرسال': e.createdAt?.seconds ? new Date(e.createdAt.seconds * 1000).toLocaleTimeString('ar-EG') : '-',
        'اسم ولي الأمر': e.demographics.parentName || 'غير محدد',
      };

      // 2. Flatten all other data (excluding demographics redundant fields if wanted, but keeping safe is better)
      const flatData = flattenObject(e);

      // 3. Combine
      return { ...basicData, ...flatData };
    });

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "الاستبيانات");
    XLSX.writeFile(wb, "NutriAware_Survey_Full_Results.xlsx");
  };

  // Analytics Helpers
  const getDistribution = (path: string, nestedPath?: string) => {
    const counts: Record<string, number> = {};
    evaluations.forEach(e => {
        let val = e[path];
        if (nestedPath && val) val = val[nestedPath];
        
        if (typeof val === 'string') {
            counts[val] = (counts[val] || 0) + 1;
        } else if (Array.isArray(val)) {
            val.forEach(v => counts[v] = (counts[v] || 0) + 1);
        }
    });
    return Object.keys(counts).map(key => ({ name: key, value: counts[key] }));
  };

  const getKnowledgeImpact = () => {
    const data = [
      { name: 'منخفض', before: 0, after: 0 },
      { name: 'متوسط', before: 0, after: 0 },
      { name: 'عالٍ', before: 0, after: 0 },
    ];
    
    evaluations.forEach(e => {
      const b = e.retrospective?.knowledge?.before;
      const a = e.retrospective?.knowledge?.after;
      if (b) { const idx = data.findIndex(d => d.name === b); if (idx > -1) data[idx].before++; }
      if (a) { const idx = data.findIndex(d => d.name === a); if (idx > -1) data[idx].after++; }
    });
    
    return data;
  };
  
  const knowledgeImpactData = getKnowledgeImpact();
  const genderData = getDistribution('healthIndicators', 'gender');
  const satisfactionData = getDistribution('satisfaction', 'q1');

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <span className="mr-3 text-lg">جاري تحميل البيانات...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 md:p-10" dir="rtl">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">لوحة تحكم الاستبيانات</h1>
            <p className="text-muted-foreground">عرض وتحليل نتائج استبيان تقييم مشروع NutriAware</p>
          </div>
          <Button onClick={exportToExcel} className="gap-2 bg-green-600 hover:bg-green-700 shadow-sm hover:shadow-md transition-all">
            <Download size={18} />
            تصدير إلى Excel
          </Button>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="lg:col-span-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">إجمالي الاستجابات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-bold text-primary">{evaluations.length}</div>
              <p className="text-xs text-muted-foreground mt-2">استبيان تم تقديمه</p>
            </CardContent>
          </Card>
          
          <Card className="lg:col-span-1">
             <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">توزيع المشاركين (حسب الجنس)</CardTitle>
            </CardHeader>
             <CardContent className="h-[150px]">
                <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                        <Pie
                            data={genderData}
                            cx="50%"
                            cy="50%"
                            innerRadius={30}
                            outerRadius={50}
                            fill="#8884d8"
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {genderData.map((_entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend wrapperStyle={{ fontSize: '10px' }} />
                    </RechartsPieChart>
                </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
             <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">مستوى الرضا العام</CardTitle>
            </CardHeader>
            <CardContent className="h-[150px]">
                <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart data={satisfactionData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" fontSize={10} tickLine={false} axisLine={false} />
                        <YAxis hide />
                        <Tooltip cursor={{fill: 'transparent'}} />
                        <Bar dataKey="value" fill="#82ca9d" radius={[4, 4, 0, 0]} barSize={40} />
                    </RechartsBarChart>
                </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="col-span-1 md:col-span-2 lg:col-span-4">
             <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">أثر المشروع على المعرفة (قبل vs بعد)</CardTitle>
            </CardHeader>
             <CardContent className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart data={knowledgeImpactData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis />
                        <Tooltip cursor={{fill: 'transparent'}} />
                        <Legend />
                        <Bar dataKey="before" name="قبل" fill="#94a3b8" radius={[4, 4, 0, 0]} barSize={30} />
                        <Bar dataKey="after" name="بعد" fill="#16a34a" radius={[4, 4, 0, 0]} barSize={30} />
                    </RechartsBarChart>
                </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Responses Table */}
        <Card>
            <CardHeader>
                <CardTitle>سجل الاستجابات</CardTitle>
                <CardDescription>عرض تفصيلي لجميع النماذج المرسلة (العدد: {evaluations.length})</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-right">التاريخ</TableHead>
                            <TableHead className="text-right">اسم ولي الأمر</TableHead>
                            <TableHead className="text-right">القرابة</TableHead>
                             <TableHead className="text-right">عمر الطفل</TableHead>
                             <TableHead className="text-right">الرضا</TableHead>
                            <TableHead className="text-center">الإجراءات</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {evaluations.map((evalData) => (
                            <TableRow key={evalData.id}>
                                <TableCell className="font-medium">
                                    {evalData.createdAt?.seconds 
                                        ? format(new Date(evalData.createdAt.seconds * 1000), "dd MMM yyyy, hh:mm a", { locale: ar }) 
                                        : "-"}
                                </TableCell>
                                <TableCell>{evalData.demographics.parentName || "غير محدد"}</TableCell>
                                <TableCell>{evalData.demographics.relationship}</TableCell>
                                <TableCell>{evalData.demographics.childAge}</TableCell>
                                <TableCell>
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                                        Number(evalData.satisfaction?.q1) >= 4 ? 'bg-green-100 text-green-700' : 
                                        Number(evalData.satisfaction?.q1) <= 2 ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                                    }`}>
                                        {evalData.satisfaction?.q1 || "-"} / 5
                                    </span>
                                </TableCell>
                                <TableCell className="text-center">
                                  <div className="flex items-center justify-center gap-2">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="ghost" size="icon" onClick={() => setSelectedEval(evalData)} title="عرض التفاصيل">
                                                <Eye size={18} className="text-primary" />
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto" dir="rtl">
                                            <DialogHeader>
                                                <DialogTitle>تفاصيل التقييم</DialogTitle>
                                            </DialogHeader>
                                            <div className="space-y-6 mt-4">
                                                <div className="grid grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                                                    <div>
                                                        <Label className="text-xs text-muted-foreground">اسم ولي الأمر</Label>
                                                        <p className="font-semibold">{selectedEval?.demographics.parentName || "-"}</p>
                                                    </div>
                                                    <div>
                                                        <Label className="text-xs text-muted-foreground">عمر ولي الأمر</Label>
                                                        <p className="font-semibold">{selectedEval?.demographics.parentAge}</p>
                                                    </div>
                                                </div>
                                                
                                                <div>
                                                    <h4 className="font-bold border-b pb-2 mb-2 text-primary">المؤشرات الصحية</h4>
                                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                                        <p><span className="font-semibold">الجنس:</span> {selectedEval?.healthIndicators.gender}</p>
                                                        <p><span className="font-semibold">الوزن:</span> {selectedEval?.healthIndicators.weightPerception}</p>
                                                        <p className="col-span-2"><span className="font-semibold">المشاكل الصحية:</span> {selectedEval?.healthIndicators.healthIssues.join(', ') || "لا يوجد"}</p>
                                                    </div>
                                                </div>

                                                <div>
                                                    <h4 className="font-bold border-b pb-2 mb-2 text-primary">المعرفة والممارسات</h4>
                                                    <p className="text-sm"><span className="font-semibold">متوسط تقييم المعرفة (K):</span> {selectedEval ? (Object.values(selectedEval.knowledge || {}).reduce((a: number, b: any) => Number(a)+Number(b), 0) / (Object.keys(selectedEval.knowledge || {}).length || 1)).toFixed(1) : '-'} / 5</p>
                                                    <p className="text-sm"><span className="font-semibold">متوسط تقييم الممارسات (P):</span> {selectedEval ? (Object.values(selectedEval.practices || {}).reduce((a: number, b: any) => Number(a)+Number(b), 0) / (Object.keys(selectedEval.practices || {}).length || 1)).toFixed(1) : '-'} / 5</p>
                                                </div>

                                                 <div>
                                                    <h4 className="font-bold border-b pb-2 mb-2 text-primary">أسئلة مفتوحة</h4>
                                                    <div className="space-y-3 text-sm">
                                                        <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded">
                                                            <span className="font-semibold block text-primary">أكثر ما أعجبه:</span>
                                                            {selectedEval?.openQuestions?.likedMost || "لا يوجد إجابة"}
                                                        </div>
                                                        <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded">
                                                            <span className="font-semibold block text-primary">التحديات:</span>
                                                            {selectedEval?.openQuestions?.challenges || "لا يوجد إجابة"}
                                                        </div>
                                                         <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded">
                                                            <span className="font-semibold block text-primary">الاقتراحات:</span>
                                                            {selectedEval?.openQuestions?.suggestions || "لا يوجد إجابة"}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                    
                                    <Button 
                                      variant="ghost" 
                                      size="icon" 
                                      className="text-red-500 hover:text-red-600 hover:bg-red-50" 
                                      onClick={(e) => handleDeleteClick(evalData.id, e)}
                                      title="حذف الاستبيان"
                                    >
                                      <Trash2 size={18} />
                                    </Button>
                                  </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
            {hasMore && (
              <div className="p-6 border-t flex justify-center bg-slate-50/50 dark:bg-slate-900/50">
                <Button 
                  onClick={() => fetchEvaluations(false)} 
                  disabled={loadingMore}
                  variant="outline"
                  className="min-w-[200px]"
                >
                  {loadingMore ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      جاري التحميل...
                    </>
                  ) : (
                    "تحميل المزيد من النتائج"
                  )}
                </Button>
              </div>
            )}
        </Card>

        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent dir="rtl">
            <DialogHeader>
              <DialogTitle className="text-red-600">تأكيد الحذف</DialogTitle>
              <DialogDescription>
                هل أنت متأكد أنك تريد حذف هذا الاستبيان؟ لا يمكن التراجع عن هذا الإجراء بعد تنفيذه.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="gap-2 sm:gap-0">
              <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>إلغاء</Button>
              <Button variant="destructive" onClick={confirmDelete}>حذف نهائي</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

      </div>
    </div>
  );
};

export default SurveyResults;
