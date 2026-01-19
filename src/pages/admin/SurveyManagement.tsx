import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Plus, Trash2, Save, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// --- Default Data (Full Control) ---
const DEFAULT_CONFIG = {
  meta: {
    title: "استبيان تقييم مشروع NutriAware",
    subtitle: "مشروع تخرج: سوء التغذية للأطفال",
    institution: "كلية تكنولوجيا العلوم الصحية التطبيقية - برنامج تكنولوجيا التغذية وسلامة الغذاء"
  },
  consent: {
    title: "نموذج الموافقة المستنيرة",
    text: `حضرة ولي الأمر/الوصي الكريم،
يهدف هذا الاستبيان إلى تقييم مشروع توعوي صحي يهدف إلى تحسين التغذية لدى الأطفال من خلال قصص قصيرة مصورة ومنصة إلكترونية تُعرف باسم NutriAware، والتي تحتوي على أدوات تقييم غذائي وتوصيات وخطط غذائية وذكاء اصطناعي وخدمات استشارة.
مشاركتكم طوعية بالكامل، ولا توجد أي مخاطر أو تبعات مترتبة على عدم المشاركة. جميع البيانات التي ستُجمع ستظل سرية ولن تُستخدم إلا لأغراض البحث العلمي وتحسين البرامج التعليمية.`,
    agreeLabel: "أوافق على المشاركة في هذا البحث"
  },
  demographics: {
    title: "القسم الأول: البيانات الديموغرافية (لولي الأمر)",
    description: "الهدف: تحديد المتغيرات المستقلة للتحليل.",
    fields: {
      parentName: { label: "اسم ولي الأمر (اختياري)", placeholder: "الاسم الثلاثي (اختياري)" },
      relationship: { label: "1. صلة القرابة بالطفل", options: ["أب", "أم", "أخرى"] },
      parentAge: { label: "2. عمر ولي الأمر", options: ["أقل من 25 سنة", "25 – 35 سنة", "36 – 45 سنة", "أكثر من 45 سنة"] },
      education: { label: "3. المستوى التعليمي", options: ["أقل من ثانوي", "ثانوي", "دبلوم متوسط", "جامعي", "دراسات عليا"] },
      childrenCount: { label: "4. عدد الأطفال في الأسرة", options: ["طفل واحد", "2-3 أطفال", "4 أطفال فأكثر"] },
      childAge: { label: "5. عمر الطفل المستهدف", options: ["أقل من 3 سنوات", "3 – 6 سنوات", "7 – 10 سنوات", "11 – 14 سنة", "أكبر من 14 سنة"] }
    }
  },
  healthIndicators: {
    title: "القسم الثاني: المؤشرات الصحية (بيانات الطفل)",
    description: "الهدف: ربط الوعي بالحالة الصحية الواقعية",
    fields: {
      gender: { label: "6. جنس الطفل", options: ["ذكر", "أنثى"] },
      weightPerception: { label: "7. كيف تقيم وزن طفلك بالنسبة لعمره؟", options: ["نحيف جداً", "طبيعي", "وزن زائد", "سمنة مفرطة", "لا أعلم"] },
      healthIssues: { label: "8. هل يعاني الطفل من أي مشاكل صحية؟ (يمكن اختيار أكثر من إجابة)", options: ["فقر دم (أنيميا)", "نقص فيتامين D", "سكري الأطفال", "حساسية طعام", "لا يعاني من أي مشاكل"] },
      infoSources: { label: "9. مصادر معلوماتكم حول تغذية الأطفال", options: ["الأطباء", "الإنترنت", "المدرسة", "الأهل والأصدقاء", "وسائل التواصل الاجتماعي"] }
    }
  },
  knowledge: [
    { id: "q1", text: "أعلم أن سوء التغذية يشمل نقص العناصر وليس فقط نقص الوزن" },
    { id: "q2", text: "أعلم أن الغذاء الصحي يجب أن يحتوي على الخضروات والفواكه يومياً" },
    { id: "q3", text: "أعلم أن الإفراط في الوجبات السريعة يضر بصحة الطفل" },
    { id: "q4", text: "أعلم علامات سوء التغذية مثل الإرهاق وضعف التركيز" },
  ],
  practices: [
    { id: "q1", text: "أحرص على توفر الخضروات والفواكه في غذاء طفلي" },
    { id: "q2", text: "أراقب استهلاك طفلي للحلويات والسكريات والمشروبات الغازية" },
    { id: "q3", text: "نادرًا ما نتناول الوجبات السريعة في المنزل" },
    { id: "q4", text: "أشجع طفلي على شرب الماء بانتظام" },
    { id: "q5", text: "أقوم بقراءة البطاقة الغذائية (المكونات) قبل شراء المنتجات للطفل" },
    { id: "q6", text: "أحرص على تقديم وجبة الإفطار لطفلي قبل الذهاب إلى المدرسة" },
    { id: "q7", text: "أجد صعوبة في تقديم أغذية صحية بسبب تكلفتها المالية" },
  ],
  intervention: {
    stories: [
        { id: "q1", text: "كانت القصص جذابة بصرياً" },
        { id: "q2", text: "كانت اللغة والمفاهيم مناسبة لعمر طفلي ويسهل عليه فهمها" },
        { id: "q3", text: "المعلومات المقدمة ساهمت في تغيير مفاهيم خاطئة لدي أو لدى طفلي" },
        { id: "q4", text: "نقلت القصة رسائل توعوية مفيدة حول التغذية الصحية" },
        { id: "q5", text: "شجعت القصص طفلي على الاهتمام بالطعام الصحي" },
    ],
    platform: {
        usability: [
            { id: "q1", text: "كان الدخول إلى المنصة عبر QR سهلاً" },
            { id: "q2", text: "كانت المنصة سهلة الاستخدام والتنقل بين أقسامها" },
        ],
        content: [
            { id: "q1", text: "كانت المعلومات المقدمة موثوقة ومفيدة" },
            { id: "q2", text: "كانت خطط الوجبات والأفكار المقترحة واقعية وقابلة للتطبيق" },
        ],
        tools: [
            { id: "q1", text: "كانت أدوات التقييم سهلة الفهم والاستخدام" },
            { id: "q2", text: "ساعدتني نتائج التقييم على فهم حالة طفلي الغذائية" },
        ],
        consultation: [
            { id: "q1", text: "كانت وسائل التواصل واضحة ومفهومة" },
            { id: "q2", text: "شعرت بالاطمئنان لإمكانية طلب الاستشارة الغذائية" },
        ]
    }
  },
  satisfaction: [
      { id: "q1", text: "أنا راضٍ بشكل عام عن المشروع" },
      { id: "q2", text: "أنصح غيري بالاطلاع على المنصة" },
  ],
  behavioralIntent: [
    { id: "q1", text: "أنوي تطبيق تغييرات غذائية داخل المنزل" },
    { id: "q2", text: "أنوي تقليل الوجبات السريعة والحلويات" },
    { id: "q3", text: "أنوي تشجيع طفلي على تناول الخضروات والفواكه" },
    { id: "q4", text: "أنوي استخدام المنصة بانتظام" },
    { id: "q5", text: "كانت خطط الوجبات والأفكار المقترحة واقعية وقابلة للتطبيق" },
  ],
  openQuestions: [
    { id: "likedMost", text: "1. ما أكثر ما أعجبك في المشروع؟" },
    { id: "challenges", text: "2. ما التحديات التي تمنع تطبيق العادات الغذائية الصحية؟" },
    { id: "suggestions", text: "3. اقتراحات للتحسين:" },
    { id: "suggestions", text: "3. اقتراحات للتحسين:" },
  ],
  sectionTitles: {
    knowledge: "المعرفة الغذائية للوالدين",
    practices: "الممارسات الغذائية داخل المنزل",
    intervention: "القسم الثالث: التدخل (قصص ومنصة NutriAware)", // Main header for intervention
    stories: "1. القصص القصيرة المصورة",
    usability: "2. المنصة - قابلية الاستخدام",
    content: "2. المنصة - جودة المحتوى",
    tools: "2. المنصة - الأدوات",
    consultation: "2. المنصة - الاستشارات",
    satisfaction: "الرضا العام",
    behavioralIntent: "الأثر السلوكي (Behavioral Intent)",
    openQuestions: "الأسئلة المفتوحة"
  }
};

const SectionEditor = ({ title, onTitleChange, questions, onChange, onAdd, onRemove }: any) => {
    return (
        <div className="space-y-4 mb-8 border-b pb-8 last:border-0 relative" dir="rtl">
            <div className="sticky top-0 bg-background/95 backdrop-blur z-10 py-4 border-b space-y-3">
                <div className="flex justify-between items-center gap-4">
                     {/* Editable Title */}
                    <div className="flex-1">
                        <Label className="text-xs text-muted-foreground mb-1 block text-right">عنوان القسم</Label>
                        <Input 
                            value={title} 
                            onChange={(e) => onTitleChange(e.target.value)}
                            className="text-lg font-bold text-slate-800 dark:text-slate-200 border-transparent hover:border-input focus:border-primary px-0 h-auto py-1 text-right"
                            dir="rtl"
                        />
                    </div>
                    <Button variant="outline" size="sm" onClick={onAdd} className="gap-2 shrink-0">
                        <Plus size={16} /> إضافة سؤال
                    </Button>
                </div>
            </div>
            <div className="space-y-3">
                {questions.map((q: any, index: number) => (
                    <div key={index} className="flex gap-3 items-center animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="bg-muted text-muted-foreground w-8 h-10 flex items-center justify-center rounded text-xs font-mono shrink-0 select-none">
                            {index + 1}
                        </div>
                        <Input 
                            value={q.text} 
                            onChange={(e) => onChange(index, e.target.value)} 
                            className="flex-1 text-right" 
                            dir="rtl"
                            placeholder="نص السؤال..."
                        />
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            className="text-red-500 hover:bg-red-50 hover:text-red-600 shrink-0"
                            onClick={() => onRemove(index)}
                            disabled={questions.length <= 1}
                        >
                            <Trash2 size={18} />
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Editor for simple Label/Placeholder fields
const SimpleFieldEditor = ({ label, value, onChange, isTextArea = false }: any) => (
    <div className="space-y-2">
        <Label className="text-sm font-semibold text-right block">{label}</Label>
        {isTextArea ? (
            <textarea 
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-right"
                dir="rtl"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        ) : (
            <Input value={value} onChange={(e) => onChange(e.target.value)} dir="rtl" className="text-right" />
        )}
    </div>
);

// Editor for Fields with Options (Dropdowns/Radio)
const OptionsEditor = ({ fieldConfig, onChange }: any) => {
    const handleOptionChange = (idx: number, val: string) => {
        const newOptions = [...fieldConfig.options];
        newOptions[idx] = val;
        onChange({ ...fieldConfig, options: newOptions });
    };

    const addOption = () => {
        onChange({ ...fieldConfig, options: [...fieldConfig.options, "خيار جديد"] });
    };

    const removeOption = (idx: number) => {
        const newOptions = fieldConfig.options.filter((_: any, i: number) => i !== idx);
        onChange({ ...fieldConfig, options: newOptions });
    };

    return (
        <div className="p-4 border rounded-lg bg-card space-y-4">
            <div className="space-y-2">
                <Label className="text-sm font-semibold text-right block">عنوان السؤال</Label>
                <Input 
                    value={fieldConfig.label} 
                    onChange={(e) => onChange({ ...fieldConfig, label: e.target.value })} 
                    dir="rtl"
                    className="text-right"
                />
            </div>
            
            {fieldConfig.options && (
                <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">الخيارات المتاحة:</Label>
                    <div className="grid gap-2 pr-4 border-r-2">
                        {fieldConfig.options.map((opt: string, idx: number) => (
                            <div key={idx} className="flex gap-2">
                                <Input value={opt} onChange={(e) => handleOptionChange(idx, e.target.value)} className="h-8 text-sm text-right" dir="rtl" />
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500" onClick={() => removeOption(idx)}>
                                    <Trash2 size={14} />
                                </Button>
                            </div>
                        ))}
                        <Button variant="outline" size="sm" onClick={addOption} className="w-full h-8 text-xs border-dashed">
                            <Plus size={12} className="mr-1" /> إضافة خيار
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

const SurveyManagement = () => {
    const { toast } = useToast();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [config, setConfig] = useState<any>(DEFAULT_CONFIG);

    useEffect(() => {
        loadConfig();
    }, []);

    const loadConfig = async () => {
        setLoading(true);
        try {
            const docRef = doc(db, "system_settings", "survey_config");
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                // Merge with default to ensure structure integrity
                setConfig({ ...DEFAULT_CONFIG, ...docSnap.data() });
            } else {
                // If it doesn't exist, we just keep the default config
                console.log("No config found, using defaults");
            }
        } catch (error) {
            console.error("Error loading config:", error);
            toast({
                variant: "destructive",
                title: "خطأ",
                description: "فشل تحميل إعدادات الاستبيان"
            });
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const docRef = doc(db, "system_settings", "survey_config");
            await setDoc(docRef, config);
            toast({
                title: "تم الحفظ",
                description: "تم تحديث الاستبيان بنجاح",
                className: "bg-green-600 text-white border-none"
            });
        } catch (error) {
            console.error("Error saving config:", error);
            toast({
                variant: "destructive",
                title: "خطأ",
                description: "حدث خطأ أثناء حفظ التغييرات"
            });
        } finally {
            setSaving(false);
        }
    };

    // Helper to update specific section array
    const updateSection = (path: string, newQuestions: any[]) => {
        const pathParts = path.split('.');
        const newConfig = { ...config };
        
        let current = newConfig;
        for (let i = 0; i < pathParts.length - 1; i++) {
            current = current[pathParts[i]];
        }
        current[pathParts[pathParts.length - 1]] = newQuestions;
        
        setConfig(newConfig);
    };

    const handleQuestionChange = (path: string, index: number, newText: string) => {
        const pathParts = path.split('.');
        let questions = config;
        for (const part of pathParts) questions = questions[part];
        
        const updated = [...questions];
        updated[index] = { ...updated[index], text: newText };
        updateSection(path, updated);
    };

    const handleAddQuestion = (path: string) => {
        const pathParts = path.split('.');
        let questions = config;
        for (const part of pathParts) questions = questions[part];

        const newId = `q${Date.now()}`; // Simple unique ID
        const updated = [...questions, { id: newId, text: "" }];
        updateSection(path, updated);
    };

    const handleRemoveQuestion = (path: string, index: number) => {
        const pathParts = path.split('.');
        let questions = config;
        for (const part of pathParts) questions = questions[part];

        const updated = questions.filter((_: any, i: number) => i !== index);
        updateSection(path, updated);
    };

    if (loading) {
        return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin" /></div>;
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 md:p-10" dir="rtl">
            <div className="max-w-5xl mx-auto space-y-8">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">إدارة الاستبيان</h1>
                        <p className="text-muted-foreground">تعديل أسئلة استبيان "مشروع تخرج NutriAware"</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={loadConfig} disabled={saving}>
                            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
                        </Button>
                        <Button onClick={handleSave} disabled={saving} className="gap-2 bg-green-600 hover:bg-green-700">
                            {saving && <Loader2 className="animate-spin" size={16} />}
                            <Save size={16} /> حفظ التغييرات
                        </Button>
                    </div>
                </div>

                <Tabs defaultValue="knowledge" className="w-full" dir="rtl">
                    <TabsList className="w-full justify-start h-auto flex-wrap gap-2 bg-transparent p-0 mb-6">
                        <TabsTrigger value="meta" className="data-[state=active]:bg-primary data-[state=active]:text-white border bg-card">العنوان والموافقة</TabsTrigger>
                        <TabsTrigger value="demographics" className="data-[state=active]:bg-primary data-[state=active]:text-white border bg-card">البيانات الديموغرافية</TabsTrigger>
                        <TabsTrigger value="health" className="data-[state=active]:bg-primary data-[state=active]:text-white border bg-card">المؤشرات الصحية</TabsTrigger>
                        <TabsTrigger value="knowledge" className="data-[state=active]:bg-primary data-[state=active]:text-white border bg-card">المعرفة (Knowledge)</TabsTrigger>
                        <TabsTrigger value="practices" className="data-[state=active]:bg-primary data-[state=active]:text-white border bg-card">الممارسات (Practices)</TabsTrigger>
                        <TabsTrigger value="intervention" className="data-[state=active]:bg-primary data-[state=active]:text-white border bg-card">التدخل (Intervention)</TabsTrigger>
                        <TabsTrigger value="impact" className="data-[state=active]:bg-primary data-[state=active]:text-white border bg-card">الرضا والأثر (Impact)</TabsTrigger>
                        <TabsTrigger value="open" className="data-[state=active]:bg-primary data-[state=active]:text-white border bg-card">أسئلة مفتوحة</TabsTrigger>
                    </TabsList>

                    <Card className="border-t-4 border-t-primary">
                        <CardHeader>
                            <CardTitle>محرر الأسئلة</CardTitle>
                            <CardDescription>يمكنك تعديل نصوص الأسئلة أو إضافة أسئلة جديدة. لا تنس الضغط على "حفظ" عند الانتهاء.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            
                            <TabsContent value="meta" className="mt-0 space-y-6">
                                <div className="space-y-6 max-w-2xl">
                                    <div className="border-b pb-4 mb-4">
                                        <h3 className="font-bold mb-4">بيانات الاستبيان الأساسية</h3>
                                        <SimpleFieldEditor label="عنوان الاستبيان" value={config.meta?.title || ""} onChange={(v: string) => updateSection('meta.title', v as any)} />
                                        <div className="h-4"></div>
                                        <SimpleFieldEditor label="العنوان الفرعي" value={config.meta?.subtitle || ""} onChange={(v: string) => updateSection('meta.subtitle', v as any)} />
                                        <div className="h-4"></div>
                                        <SimpleFieldEditor label="اسم المؤسسة/الكلية" value={config.meta?.institution || ""} onChange={(v: string) => updateSection('meta.institution', v as any)} />
                                    </div>
                                    
                                    <div>
                                        <h3 className="font-bold mb-4">نموذج الموافقة</h3>
                                        <SimpleFieldEditor label="عنوان الموافقة" value={config.consent?.title || ""} onChange={(v: string) => updateSection('consent.title', v as any)} />
                                        <div className="h-4"></div>
                                        <SimpleFieldEditor isTextArea label="نص الموافقة" value={config.consent?.text || ""} onChange={(v: string) => updateSection('consent.text', v as any)} />
                                        <div className="h-4"></div>
                                        <SimpleFieldEditor label="نص زر الموافقة" value={config.consent?.agreeLabel || ""} onChange={(v: string) => updateSection('consent.agreeLabel', v as any)} />
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="demographics" className="mt-0 space-y-6">
                                <div className="space-y-6">
                                    <div className="border-b pb-4">
                                        <SimpleFieldEditor label="عنوان القسم" value={config.demographics?.title || ""} onChange={(v: string) => updateSection('demographics.title', v as any)} />
                                        <div className="h-4"></div>
                                        <SimpleFieldEditor label="وصف القسم" value={config.demographics?.description || ""} onChange={(v: string) => updateSection('demographics.description', v as any)} />
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <OptionsEditor label="صلة القرابة" fieldConfig={config.demographics?.fields?.relationship} onChange={(newField: any) => updateSection('demographics.fields.relationship', newField)} />
                                        <OptionsEditor label="عمر ولي الأمر" fieldConfig={config.demographics?.fields?.parentAge} onChange={(newField: any) => updateSection('demographics.fields.parentAge', newField)} />
                                        <OptionsEditor label="المستوى التعليمي" fieldConfig={config.demographics?.fields?.education} onChange={(newField: any) => updateSection('demographics.fields.education', newField)} />
                                        <OptionsEditor label="عدد الأطفال" fieldConfig={config.demographics?.fields?.childrenCount} onChange={(newField: any) => updateSection('demographics.fields.childrenCount', newField)} />
                                        <OptionsEditor label="عمر الطفل المستهدف" fieldConfig={config.demographics?.fields?.childAge} onChange={(newField: any) => updateSection('demographics.fields.childAge', newField)} />
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="health" className="mt-0 space-y-6">
                                <div className="space-y-6">
                                    <div className="border-b pb-4">
                                        <SimpleFieldEditor label="عنوان القسم" value={config.healthIndicators?.title || ""} onChange={(v: string) => updateSection('healthIndicators.title', v as any)} />
                                        <div className="h-4"></div>
                                        <SimpleFieldEditor label="وصف القسم" value={config.healthIndicators?.description || ""} onChange={(v: string) => updateSection('healthIndicators.description', v as any)} />
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <OptionsEditor label="جنس الطفل" fieldConfig={config.healthIndicators?.fields?.gender} onChange={(newField: any) => updateSection('healthIndicators.fields.gender', newField)} />
                                        <OptionsEditor label="تقييم الوزن" fieldConfig={config.healthIndicators?.fields?.weightPerception} onChange={(newField: any) => updateSection('healthIndicators.fields.weightPerception', newField)} />
                                        <OptionsEditor label="المشاكل الصحية" fieldConfig={config.healthIndicators?.fields?.healthIssues} onChange={(newField: any) => updateSection('healthIndicators.fields.healthIssues', newField)} />
                                        <OptionsEditor label="مصادر المعلومات" fieldConfig={config.healthIndicators?.fields?.infoSources} onChange={(newField: any) => updateSection('healthIndicators.fields.infoSources', newField)} />
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="knowledge" className="mt-0 space-y-6">
                                <SectionEditor 
                                    title={config.sectionTitles?.knowledge || "المعرفة الغذائية للوالدين"} 
                                    onTitleChange={(v: string) => updateSection('sectionTitles.knowledge', v as any)}
                                    questions={config.knowledge} 
                                    onChange={(idx: number, val: string) => handleQuestionChange("knowledge", idx, val)}
                                    onAdd={() => handleAddQuestion("knowledge")}
                                    onRemove={(idx: number) => handleRemoveQuestion("knowledge", idx)}
                                />
                            </TabsContent>

                            <TabsContent value="practices" className="mt-0 space-y-6">
                                <SectionEditor 
                                    title={config.sectionTitles?.practices || "الممارسات الغذائية داخل المنزل"}
                                    onTitleChange={(v: string) => updateSection('sectionTitles.practices', v as any)}
                                    questions={config.practices} 
                                    onChange={(idx: number, val: string) => handleQuestionChange("practices", idx, val)}
                                    onAdd={() => handleAddQuestion("practices")}
                                    onRemove={(idx: number) => handleRemoveQuestion("practices", idx)}
                                />
                            </TabsContent>

                            <TabsContent value="intervention" className="mt-0 space-y-6">
                                <div className="border-b pb-4 mb-4">
                                     <SimpleFieldEditor label="عنوان القسم الرئيسي" value={config.sectionTitles?.intervention || ""} onChange={(v: string) => updateSection('sectionTitles.intervention', v as any)} />
                                </div>
                                <SectionEditor 
                                    title={config.sectionTitles?.stories || "1. القصص القصيرة المصورة"}
                                    onTitleChange={(v: string) => updateSection('sectionTitles.stories', v as any)}
                                    questions={config.intervention.stories} 
                                    onChange={(idx: number, val: string) => handleQuestionChange("intervention.stories", idx, val)}
                                    onAdd={() => handleAddQuestion("intervention.stories")}
                                    onRemove={(idx: number) => handleRemoveQuestion("intervention.stories", idx)}
                                />
                                <SectionEditor 
                                    title={config.sectionTitles?.usability || "2. المنصة - قابلية الاستخدام"} 
                                    onTitleChange={(v: string) => updateSection('sectionTitles.usability', v as any)}
                                    questions={config.intervention.platform.usability} 
                                    onChange={(idx: number, val: string) => handleQuestionChange("intervention.platform.usability", idx, val)}
                                    onAdd={() => handleAddQuestion("intervention.platform.usability")}
                                    onRemove={(idx: number) => handleRemoveQuestion("intervention.platform.usability", idx)}
                                />
                                <SectionEditor 
                                    title={config.sectionTitles?.content || "2. المنصة - جودة المحتوى"} 
                                    onTitleChange={(v: string) => updateSection('sectionTitles.content', v as any)}
                                    questions={config.intervention.platform.content} 
                                    onChange={(idx: number, val: string) => handleQuestionChange("intervention.platform.content", idx, val)}
                                    onAdd={() => handleAddQuestion("intervention.platform.content")}
                                    onRemove={(idx: number) => handleRemoveQuestion("intervention.platform.content", idx)}
                                />
                                <SectionEditor 
                                    title={config.sectionTitles?.tools || "2. المنصة - الأدوات"} 
                                    onTitleChange={(v: string) => updateSection('sectionTitles.tools', v as any)}
                                    questions={config.intervention.platform.tools} 
                                    onChange={(idx: number, val: string) => handleQuestionChange("intervention.platform.tools", idx, val)}
                                    onAdd={() => handleAddQuestion("intervention.platform.tools")}
                                    onRemove={(idx: number) => handleRemoveQuestion("intervention.platform.tools", idx)}
                                />
                                <SectionEditor 
                                    title={config.sectionTitles?.consultation || "2. المنصة - الاستشارات"} 
                                    onTitleChange={(v: string) => updateSection('sectionTitles.consultation', v as any)}
                                    questions={config.intervention.platform.consultation} 
                                    onChange={(idx: number, val: string) => handleQuestionChange("intervention.platform.consultation", idx, val)}
                                    onAdd={() => handleAddQuestion("intervention.platform.consultation")}
                                    onRemove={(idx: number) => handleRemoveQuestion("intervention.platform.consultation", idx)}
                                />
                            </TabsContent>

                            <TabsContent value="impact" className="mt-0 space-y-6">
                                <SectionEditor 
                                    title={config.sectionTitles?.satisfaction || "الرضا العام"} 
                                    onTitleChange={(v: string) => updateSection('sectionTitles.satisfaction', v as any)}
                                    questions={config.satisfaction} 
                                    onChange={(idx: number, val: string) => handleQuestionChange("satisfaction", idx, val)}
                                    onAdd={() => handleAddQuestion("satisfaction")}
                                    onRemove={(idx: number) => handleRemoveQuestion("satisfaction", idx)}
                                />
                                <SectionEditor 
                                    title={config.sectionTitles?.behavioralIntent || "الأثر السلوكي (Behavioral Intent)"} 
                                    onTitleChange={(v: string) => updateSection('sectionTitles.behavioralIntent', v as any)}
                                    questions={config.behavioralIntent} 
                                    onChange={(idx: number, val: string) => handleQuestionChange("behavioralIntent", idx, val)}
                                    onAdd={() => handleAddQuestion("behavioralIntent")}
                                    onRemove={(idx: number) => handleRemoveQuestion("behavioralIntent", idx)}
                                />
                            </TabsContent>

                            <TabsContent value="open" className="mt-0 space-y-6">
                                <SectionEditor 
                                    title={config.sectionTitles?.openQuestions || "الأسئلة المفتوحة"}
                                    onTitleChange={(v: string) => updateSection('sectionTitles.openQuestions', v as any)} 
                                    questions={config.openQuestions} 
                                    onChange={(idx: number, val: string) => handleQuestionChange("openQuestions", idx, val)}
                                    onAdd={() => handleAddQuestion("openQuestions")}
                                    onRemove={(idx: number) => handleRemoveQuestion("openQuestions", idx)}
                                />
                            </TabsContent>

                        </CardContent>
                    </Card>
                </Tabs>
            </div>
        </div>
    );
};

export default SurveyManagement;
