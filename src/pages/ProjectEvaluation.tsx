
import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { saveEvaluation } from '@/services/evaluation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Loader2, CheckCircle2, Frown, Meh, Smile, ThumbsUp, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getQuestionLabels, type SurveyQuestion } from '@/lib/surveyEngine';

const evaluationSchema = z.object({
  consent: z.boolean().refine(val => val === true, { message: "يجب الموافقة للمتابعة" }),
  demographics: z.object({
    parentName: z.string().optional(),
    relationship: z.string().min(1, "مطلوب"),
    otherRelationship: z.string().optional(),
    parentAge: z.string().min(1, "مطلوب"),
    education: z.string().min(1, "مطلوب"),
    childrenCount: z.string().min(1, "مطلوب"),
    childAge: z.string().min(1, "مطلوب"),
  }),
  healthIndicators: z.object({
    gender: z.string().min(1, "مطلوب"),
    weightPerception: z.string().min(1, "مطلوب"),
    healthIssues: z.array(z.string()).default([]),
    otherHealthIssue: z.string().optional(),
    infoSources: z.array(z.string()).default([]),
    otherInfoSource: z.string().optional(),
  }),
  knowledge: z.record(z.string(), z.string().min(1, "مطلوب")),
  practices: z.record(z.string(), z.string().min(1, "مطلوب")),
  intervention: z.object({
    stories: z.record(z.string(), z.string().min(1, "مطلوب")),
    platform: z.object({
      usability: z.record(z.string(), z.string().min(1, "مطلوب")),
      content: z.record(z.string(), z.string().min(1, "مطلوب")),
      tools: z.record(z.string(), z.string().min(1, "مطلوب")),
      consultation: z.record(z.string(), z.string().min(1, "مطلوب")),
    }),
  }),
  satisfaction: z.record(z.string(), z.string().min(1, "مطلوب")),
  behavioralIntent: z.record(z.string(), z.string().min(1, "مطلوب")),
  nps: z.string().optional(),
  retrospective: z.object({
    knowledge: z.object({ before: z.string().min(1, "مطلوب"), after: z.string().min(1, "مطلوب") }),
    practices: z.object({ before: z.string().min(1, "مطلوب"), after: z.string().min(1, "مطلوب") }),
  }),
  openQuestions: z.object({
    likedMost: z.string().optional(),
    challenges: z.string().optional(),
    suggestions: z.string().optional(),
  }),
});

type EvaluationFormValues = z.infer<typeof evaluationSchema>;

const LIKERT_REACT_ICONS = [Frown, Meh, Smile, ThumbsUp, Heart];
const LIKERT_REACT_ICONS_3 = [Frown, Smile, Heart];
const LIKERT_REACT_ICONS_7 = [Frown, Frown, Meh, Smile, Smile, ThumbsUp, Heart];

function getReactIcons(length: number) {
  if (length === 3) return LIKERT_REACT_ICONS_3;
  if (length === 7) return LIKERT_REACT_ICONS_7;
  return LIKERT_REACT_ICONS;
}

const DEFAULT_LIKERT_LABELS: Record<string, string> = {
  "1": "لا أوافق بشدة", "2": "لا أوافق", "3": "محايد", "4": "أوافق", "5": "أوافق بشدة"
};

// Dynamic Likert Scale — supports 3, 5, or 7 points with appropriate labels/icons
const LikertScale = ({ name, question, control, rules = { required: true }, questionConfig, globalLabels }: {
  name: string; question: string; control: any; rules?: any;
  questionConfig?: SurveyQuestion; globalLabels?: Record<string, string>;
}) => {
  const labels = questionConfig
    ? getQuestionLabels(questionConfig, globalLabels || DEFAULT_LIKERT_LABELS)
    : (globalLabels || DEFAULT_LIKERT_LABELS);
  const entries = Object.entries(labels).sort((a, b) => parseInt(a[0]) - parseInt(b[0]));
  const icons = getReactIcons(entries.length);
  const colClass = entries.length === 3 ? 'grid-cols-3' : entries.length === 7 ? 'grid-cols-2 md:grid-cols-7' : 'grid-cols-2 md:grid-cols-5';

  return (
    <div id={name} className="mb-8 p-4 bg-slate-50/50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-800">
      <label className="block text-base font-semibold mb-4 text-slate-800 dark:text-slate-100 leading-relaxed">
        {question} <span className="text-red-500">*</span>
      </label>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <RadioGroup onValueChange={field.onChange} value={field.value}
            className={`grid ${colClass} gap-3`} dir="rtl">
            {entries.map(([val, lbl], i) => {
              const Icon = icons[i] || Smile;
              const selected = field.value === val;
              return (
                <div key={val} className="relative">
                  <RadioGroupItem value={val} id={`${name}-${val}`} className="peer sr-only" />
                  <div
                    onClick={() => field.onChange(val)}
                    className={cn(
                      "flex flex-col items-center justify-center p-3 rounded-xl border-2 cursor-pointer transition-all duration-200 w-full flex-1 min-w-[60px]",
                      selected ? "border-primary bg-primary/10 text-primary shadow-sm scale-105" : "border-muted bg-card hover:bg-accent/50 hover:border-primary/50 text-muted-foreground"
                    )}>
                    <div className={cn("mb-2 transition-colors", selected ? "text-primary" : "text-muted-foreground")}>
                      <Icon size={24} strokeWidth={selected ? 2.5 : 1.5} />
                    </div>
                    <div className="text-lg font-bold mb-1">{val}</div>
                    <span className="text-[10px] sm:text-xs text-center font-medium leading-tight">{lbl}</span>
                  </div>
                </div>
              );
            })}
          </RadioGroup>
        )}
      />
    </div>
  );
};

// NPS Scale (0-10)
const NPSScale = ({ name, question, control }: { name: string; question: string; control: any }) => (
  <div id={name} className="mb-8 p-4 bg-slate-50/50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-800">
    <label className="block text-base font-semibold mb-4 text-slate-800 dark:text-slate-100 leading-relaxed">
      {question} <span className="text-red-500">*</span>
    </label>
    <Controller name={name} control={control} render={({ field }) => (
      <div className="space-y-2">
        <div className="grid grid-cols-11 gap-1">
          {Array.from({ length: 11 }, (_, i) => {
            const selected = field.value === String(i);
            const color = i <= 6 ? 'bg-red-100 border-red-300 text-red-700' : i <= 8 ? 'bg-yellow-100 border-yellow-300 text-yellow-700' : 'bg-green-100 border-green-300 text-green-700';
            const selectedColor = i <= 6 ? 'bg-red-500 text-white border-red-500' : i <= 8 ? 'bg-yellow-500 text-white border-yellow-500' : 'bg-green-500 text-white border-green-500';
            return (
              <div key={i} onClick={() => field.onChange(String(i))}
                className={cn("h-12 rounded-lg border-2 flex items-center justify-center font-bold cursor-pointer transition-all",
                  selected ? `${selectedColor} scale-110 shadow-md` : `${color} hover:scale-105`
                )}>{i}</div>
            );
          })}
        </div>
        <div className="flex justify-between text-xs text-muted-foreground px-1">
          <span>غير محتمل إطلاقًا (0)</span>
          <span>محتمل جدًا (10)</span>
        </div>
      </div>
    )} />
  </div>
);

// Slider Scale (1-10)
const SliderRetroScale = ({ name, label, control, variant = 'before' }: { name: string; label: string; control: any; variant?: 'before' | 'after' }) => (
  <div className={cn("p-5 rounded-xl border",
    variant === 'before' ? "bg-slate-100 dark:bg-slate-800 border-dashed border-slate-300 dark:border-slate-700" : "bg-primary/5 border-primary/20"
  )}>
    <Label className={cn("mb-4 block text-center font-semibold",
      variant === 'before' ? "text-muted-foreground" : "text-primary font-bold text-lg"
    )}>{label}</Label>
    <Controller name={name} control={control} rules={{ required: true }} render={({ field }) => (
      <div className="space-y-3">
        <Slider
          value={[parseInt(field.value) || 5]}
          onValueChange={([v]) => field.onChange(String(v))}
          min={1} max={10} step={1}
          className="py-2"
        />
        <div className="flex justify-between">
          {Array.from({ length: 10 }, (_, i) => (
            <span key={i} className={cn("text-xs font-mono w-6 text-center",
              parseInt(field.value) === i + 1 ? "text-primary font-bold text-sm" : "text-muted-foreground"
            )}>{i + 1}</span>
          ))}
        </div>
        <div className="flex justify-between text-[10px] text-muted-foreground">
          <span>منخفض جدًا</span><span>مرتفع جدًا</span>
        </div>
      </div>
    )} />
  </div>
);

const SectionHeader = ({ title, description }: { title: string, description?: string }) => (
  <div className="mb-6 border-b border-primary/20 pb-4">
    <h2 className="text-xl md:text-2xl font-bold text-primary">{title}</h2>
    {description && <p className="text-muted-foreground mt-1 text-sm">{description}</p>}
  </div>
);

// --- Default Data for Fallback ---
const DEFAULT_CONFIG = {
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
  ],
  likertLabels: {
    "1": "لا أوافق بشدة", "2": "لا أوافق", "3": "محايد", "4": "أوافق", "5": "أوافق بشدة"
  },
  npsQuestion: { id: "nps1", text: "ما مدى احتمال أن توصي بمنصة NutriAware لصديق أو فرد من عائلتك؟", type: "nps" },
  retrospectiveConfig: {
    title: "القسم السابع: تقييم ارتجاعي (Retrospective Self-assessment)",
    description: "يرجى تقييم حالتك قبل المشروع وحالتك بعد المشروع",
    mode: "slider",
    knowledgeTitle: "معرفتي بتغذية الأطفال",
    practicesTitle: "ممارساتي الغذائية في المنزل",
    beforeLabel: "قبل المشروع",
    afterLabel: "بعد المشروع",
    options: ["منخفض", "متوسط", "عالٍ"]
  },
  formSectionHeaders: {
    consent: "نموذج الموافقة المستنيرة",
    demographics: "القسم الأول: البيانات الديموغرافية (لولي الأمر)",
    health: "القسم الثاني: المؤشرات الصحية (بيانات الطفل)",
    knowledge: "القسم الثالث: المعرفة الغذائية للوالدين",
    practices: "القسم الرابع: الممارسات الغذائية داخل المنزل",
    intervention: "القسم الخامس: التدخل (قصص ومنصة NutriAware)",
    satisfaction: "القسم السادس: الرضا العام",
    behavioral: "القسم السابع: الأثر السلوكي",
    retrospective: "القسم الثامن: تقييم ارتجاعي",
    open: "القسم التاسع: أسئلة مفتوحة"
  }
};

const ProjectEvaluation = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [surveyConfig, setSurveyConfig] = useState<any>(DEFAULT_CONFIG);

  // Fetch Questions on Mount

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const docRef = doc(db, "system_settings", "survey_config");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          // Merge with defaults to ensure safety
          setSurveyConfig({ ...DEFAULT_CONFIG, ...docSnap.data() });
        }
      } catch (error) {
        console.error("Failed to load survey questions:", error);
        // Fallback is already set
      }
    };
    fetchConfig();
  }, []);

  const form = useForm<EvaluationFormValues>({
    resolver: zodResolver(evaluationSchema) as any,
    defaultValues: {
      consent: false,
      demographics: {
        parentName: "",
        relationship: "",
        otherRelationship: "",
        parentAge: "",
        education: "",
        childrenCount: "",
        childAge: "",
      },
      healthIndicators: {
        gender: "",
        weightPerception: "",
        healthIssues: [],
        otherHealthIssue: "",
        infoSources: [],
        otherInfoSource: "",
      },
      knowledge: {},
      practices: {},
      intervention: { stories: {}, platform: { usability: {}, content: {}, tools: {}, consultation: {} } },
      satisfaction: {},
      behavioralIntent: {},
      nps: "",
      retrospective: { knowledge: { before: "", after: "" }, practices: { before: "", after: "" } },
      openQuestions: { likedMost: "", challenges: "", suggestions: "" }
    }
  });

  const onSubmit = async (data: EvaluationFormValues) => {
    setIsSubmitting(true);
    try {
      // Deep sanitize data to remove undefined values which Firebase rejects
      const sanitizeData = (obj: any): any => {
        if (Array.isArray(obj)) return obj.map(sanitizeData);
        if (obj && typeof obj === 'object') {
          return Object.entries(obj).reduce((acc, [key, value]) => {
            if (value !== undefined) {
              acc[key] = sanitizeData(value);
            }
            return acc;
          }, {} as any);
        }
        return obj;
      };

      const cleanData = sanitizeData(data);
      console.log("Submitting data:", cleanData);

      await saveEvaluation(cleanData);
      setIsSubmitted(true);
      toast({
        title: "تم الإرسال بنجاح",
        description: "تم إرسال تقييمك بنجاح، شكراً لمشاركتك!",
        variant: "default",
        className: "bg-green-600 text-white border-none"
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error: any) {
      console.error("Submission Error Details:", error);
      // Show specific error if available
      const errorMessage = error?.code === 'permission-denied'
        ? "عذراً، لا تملك الصلاحية لإرسال النموذج (خطأ في التصريح)."
        : error?.message || "حدث خطأ غير متوقع أثناء الإرسال.";

      toast({
        variant: "destructive",
        title: "خطأ في الإرسال",
        description: `لم يتم الإرسال: ${errorMessage}`
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const onError = (errors: any) => {
    console.log("Validation Errors:", errors);
    toast({
      variant: "destructive",
      title: "بيانات ناقصة",
      description: "يرجى التأكد من ملء جميع الحقول المطلوبة والمميزة باللون الأحمر."
    });

    // Find the first error and scroll to it recursively
    const findFirstErrorField = (errorObj: any, prefix = ''): string | null => {
      // If we are at a leaf node (has a message), return the current path
      if (errorObj?.message && typeof errorObj.message === 'string') return prefix;

      // Iterate through keys to find the first error
      for (const key in errorObj) {
        if (Object.prototype.hasOwnProperty.call(errorObj, key)) {
          const newPrefix = prefix ? `${prefix}.${key}` : key;
          const res = findFirstErrorField(errorObj[key], newPrefix);
          if (res) return res;
        }
      }
      return null;
    };

    const firstErrorPath = findFirstErrorField(errors);

    if (firstErrorPath) {
      // Try multiple selectors to find the element
      const selectors = [
        `[name="${firstErrorPath}"]`, // Standard input name
        `#${firstErrorPath.replace(/\./g, '\\.')}`, // ID with escaped dots
        `[data-state] #name="${firstErrorPath}"`,
        `[id="${firstErrorPath}"]`
      ];

      let element: Element | null = null;
      for (const selector of selectors) {
        try {
          element = document.querySelector(selector);
          if (element) break;
        } catch (e) { }
      }

      // Fallback: Try finding a label that refers to it, or a section header nearby
      if (!element) {
        // Sometimes radio groups don't have the exact name on the container, try searching by partial
        element = document.querySelector(`[name^="${firstErrorPath.split('.')[0]}"]`);
      }

      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.classList.add('animate-pulse');
        // If it's an input, try to focus it
        if (element instanceof HTMLElement) element.focus({ preventScroll: true });
      } else {
        // Fallback if element not found: Scroll to top
        window.scrollTo({ top: 100, behavior: 'smooth' });
      }
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4" dir="rtl">
        <Card className="w-full max-w-2xl text-center p-10 shadow-2xl border-primary/20 bg-background/95 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="flex flex-col items-center justify-center space-y-6"
          >
            <div className="w-24 h-24 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-500 shadow-inner">
              <CheckCircle2 size={48} strokeWidth={3} />
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-extrabold text-slate-800 dark:text-slate-100">شكراً جزيلاً!</h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                تم استلام ردك بنجاح. نقدر وقتك ومساهمتك القيمة في تحسين مشروع <span className="font-bold text-primary">NutriAware</span>.
              </p>
            </div>
            <Button onClick={() => window.location.href = '/'} size="lg" className="mt-8 px-8 rounded-full font-bold">
              العودة للرئيسية
            </Button>
          </motion.div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 py-12 px-4 md:px-8 font-sans transition-colors duration-300" dir="rtl">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-6 mb-12">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="inline-block"
          >
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wider mb-4 inline-block">مشروع تخرج</span>
            <h1 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-primary via-blue-600 to-indigo-600 bg-clip-text text-transparent pb-2 leading-tight">
              {surveyConfig.meta?.title || "استبيان تقييم مشروع NutriAware"}
            </h1>
          </motion.div>

          <div className="max-w-2xl mx-auto p-4 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed shadow-sm">
            <p className="font-medium text-slate-900 dark:text-slate-200">{surveyConfig.meta?.institution || "كلية تكنولوجيا العلوم الصحية التطبيقية - برنامج تكنولوجيا التغذية وسلامة الغذاء"}</p>
            <p>{surveyConfig.meta?.subtitle || "مشروع تخرج: سوء التغذية للأطفال"}</p>
          </div>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-10">

          {/* Consent Form - Special Design */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="border-t-4 border-t-primary shadow-lg overflow-hidden border-x-0 border-b-0 md:border">
              <div className="bg-primary/5 p-6 border-b border-primary/10">
                <h3 className="text-xl font-bold text-primary flex items-center gap-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm">1</span>
                  {surveyConfig.formSectionHeaders?.consent || "نموذج الموافقة المستنيرة"}
                </h3>
              </div>
              <CardContent className="p-6 md:p-8 space-y-6">
                <div className="prose prose-slate dark:prose-invert max-w-none bg-slate-50 dark:bg-slate-900/50 p-6 rounded-lg border text-justify leading-loose whitespace-pre-line">
                  <h4 className='font-bold text-lg mb-2'>{surveyConfig.consent?.title || "نموذج الموافقة المستنيرة"}</h4>
                  {surveyConfig.consent?.text || `حضرة ولي الأمر/الوصي الكريم،
                  يهدف هذا الاستبيان إلى تقييم مشروع توعوي صحي يهدف إلى تحسين التغذية لدى الأطفال من خلال قصص قصيرة مصورة ومنصة إلكترونية تُعرف باسم NutriAware، والتي تحتوي على أدوات تقييم غذائي وتوصيات وخطط غذائية وذكاء اصطناعي وخدمات استشارة.
                  مشاركتكم طوعية بالكامل، ولا توجد أي مخاطر أو تبعات مترتبة على عدم المشاركة. جميع البيانات التي ستُجمع ستظل سرية ولن تُستخدم إلا لأغراض البحث العلمي وتحسين البرامج التعليمية.`}
                </div>

                <div className="flex items-center p-4 bg-primary/5 rounded-lg border border-primary/20 transition-colors hover:bg-primary/10" dir="rtl">
                  <Controller
                    name="consent"
                    control={form.control}
                    render={({ field }) => (
                      <div className="flex items-center gap-3 w-full">
                        <Checkbox
                          id="consent"
                          checked={field.value}
                          onCheckedChange={(checked) => field.onChange(checked)}
                          className="w-6 h-6 border-2 data-[state=checked]:bg-primary data-[state=checked]:border-primary shrink-0"
                        />
                        <Label htmlFor="consent" className="font-bold text-lg cursor-pointer select-none flex-1">
                          {surveyConfig.consent?.agreeLabel || "أوافق على المشاركة في هذا البحث"}
                        </Label>
                      </div>
                    )}
                  />
                </div>
                {form.formState.errors.consent &&
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 font-medium px-4">
                    ⚠️ {form.formState.errors.consent.message}
                  </motion.p>
                }
              </CardContent>
            </Card>
          </motion.div>

          {/* Demographics */}
          <Card className="shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-slate-100 to-slate-50 dark:from-slate-900 dark:to-slate-800 p-6 border-b">
              <SectionHeader
                title={surveyConfig.demographics?.title || "القسم الأول: البيانات الديموغرافية (لولي الأمر)"}
                description={surveyConfig.demographics?.description || "الهدف: تحديد المتغيرات المستقلة للتحليل."}
              />
            </div>
            <CardContent className="p-6 md:p-8 space-y-8">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="col-span-1 md:col-span-2 space-y-3">
                  <Label className="text-base font-semibold">{surveyConfig.demographics?.fields?.parentName?.label || "اسم ولي الأمر (اختياري)"}</Label>
                  <Controller
                    name="demographics.parentName"
                    control={form.control}
                    render={({ field }) => (
                      <input
                        {...field}
                        className="w-full p-3 rounded-lg border border-input bg-background text-foreground shadow-sm focus:outline-none focus:ring-1 focus:ring-primary"
                        placeholder={surveyConfig.demographics?.fields?.parentName?.placeholder || "الاسم الثلاثي (اختياري)"}
                      />
                    )}
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-base font-semibold">{surveyConfig.demographics?.fields?.relationship?.label || "1. صلة القرابة بالطفل"} <span className="text-red-500">*</span></Label>
                  <Controller
                    name="demographics.relationship"
                    control={form.control}
                    render={({ field }) => (
                      <RadioGroup id="demographics.relationship" onValueChange={field.onChange} value={field.value} className="grid grid-cols-3 gap-4" dir="rtl">
                        {(surveyConfig.demographics?.fields?.relationship?.options || ["أب", "أم", "أخرى"]).map((opt: string) => (
                          <Label
                            key={opt}
                            className={cn(
                              "cursor-pointer rounded-xl border-2 p-4 text-center hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:text-primary [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/5 [&:has([data-state=checked])]:text-primary transition-all",
                              field.value === opt ? "border-primary bg-primary/5 text-primary" : "border-muted"
                            )}
                          >
                            <RadioGroupItem value={opt} id={`r-${opt}`} className="sr-only" />
                            <span className="font-bold text-lg">{opt}</span>
                          </Label>
                        ))}
                      </RadioGroup>
                    )}
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-base font-semibold">{surveyConfig.demographics?.fields?.parentAge?.label || "2. عمر ولي الأمر"} <span className="text-red-500">*</span></Label>
                  <Controller
                    name="demographics.parentAge"
                    control={form.control}
                    render={({ field }) => (
                      <div id="demographics.parentAge" className="grid grid-cols-2 gap-3">
                        {(surveyConfig.demographics?.fields?.parentAge?.options || ["أقل من 25 سنة", "25 – 35 سنة", "36 – 45 سنة", "أكثر من 45 سنة"]).map((opt: string) => (
                          <div
                            key={opt}
                            onClick={() => field.onChange(opt)}
                            className={cn(
                              "px-4 py-3 rounded-lg border text-center cursor-pointer transition-all text-sm font-medium",
                              field.value === opt ? "bg-primary text-primary-foreground border-primary shadow-md" : "bg-card hover:bg-accent hover:border-primary/50"
                            )}
                          >
                            {opt}
                          </div>
                        ))}
                      </div>
                    )}
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-base font-semibold">{surveyConfig.demographics?.fields?.education?.label || "3. المستوى التعليمي"} <span className="text-red-500">*</span></Label>
                  <Controller
                    name="demographics.education"
                    control={form.control}
                    render={({ field }) => (
                      <div id="demographics.education" className="flex flex-wrap gap-2">
                        {(surveyConfig.demographics?.fields?.education?.options || ["أقل من ثانوي", "ثانوي", "دبلوم متوسط", "جامعي", "دراسات عليا"]).map((opt: string) => (
                          <div
                            key={opt}
                            onClick={() => field.onChange(opt)}
                            className={cn(
                              "px-4 py-2 rounded-full border cursor-pointer transition-all text-sm",
                              field.value === opt ? "bg-primary text-primary-foreground border-primary shadow-sm ring-2 ring-primary/20" : "bg-card hover:bg-accent"
                            )}
                          >
                            {opt}
                          </div>
                        ))}
                      </div>
                    )}
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-base font-semibold">{surveyConfig.demographics?.fields?.childrenCount?.label || "4. عدد الأطفال في الأسرة"} <span className="text-red-500">*</span></Label>
                  <Controller
                    name="demographics.childrenCount"
                    control={form.control}
                    render={({ field }) => (
                      <div id="demographics.childrenCount" className="grid grid-cols-3 gap-3">
                        {(surveyConfig.demographics?.fields?.childrenCount?.options || ["طفل واحد", "2-3 أطفال", "4 أطفال فأكثر"]).map((opt: string) => (
                          <div
                            key={opt}
                            onClick={() => field.onChange(opt)}
                            className={cn(
                              "px-2 py-3 rounded-lg border text-center cursor-pointer transition-all text-sm font-medium flex items-center justify-center",
                              field.value === opt ? "bg-primary text-primary-foreground border-primary" : "bg-card hover:bg-accent"
                            )}
                          >
                            {opt}
                          </div>
                        ))}
                      </div>
                    )}
                  />
                </div>

                <div className="col-span-1 md:col-span-2 space-y-3">
                  <Label className="text-base font-semibold">{surveyConfig.demographics?.fields?.childAge?.label || "5. عمر الطفل المستهدف"} <span className="text-red-500">*</span></Label>
                  <Controller
                    name="demographics.childAge"
                    control={form.control}
                    render={({ field }) => (
                      <div id="demographics.childAge" className="grid grid-cols-2 md:grid-cols-5 gap-3">
                        {(surveyConfig.demographics?.fields?.childAge?.options || ["أقل من 3 سنوات", "3 – 6 سنوات", "7 – 10 سنوات", "11 – 14 سنة", "أكبر من 14 سنة"]).map((opt: string) => (
                          <div
                            key={opt}
                            onClick={() => field.onChange(opt)}
                            className={cn(
                              "px-2 py-3 rounded-lg border text-center cursor-pointer transition-all text-xs md:text-sm font-medium flex items-center justify-center",
                              field.value === opt ? "bg-primary text-primary-foreground border-primary" : "bg-card hover:bg-accent"
                            )}
                          >
                            {opt}
                          </div>
                        ))}
                      </div>
                    )}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Health Indicators */}
          <Card className="shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-slate-100 to-slate-50 dark:from-slate-900 dark:to-slate-800 p-6 border-b">
              <SectionHeader
                title={surveyConfig.healthIndicators?.title || "القسم الثاني: المؤشرات الصحية (بيانات الطفل)"}
                description={surveyConfig.healthIndicators?.description || "الهدف: ربط الوعي بالحالة الصحية الواقعية"}
              />
            </div>
            <CardContent className="p-6 md:p-8 space-y-8">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <Label className="text-base font-semibold">{surveyConfig.healthIndicators?.fields?.gender?.label || "6. جنس الطفل"} <span className="text-red-500">*</span></Label>
                  <Controller
                    name="healthIndicators.gender"
                    control={form.control}
                    render={({ field }) => (
                      <RadioGroup id="healthIndicators.gender" onValueChange={field.onChange} value={field.value} className="flex gap-4" dir="rtl">
                        {(surveyConfig.healthIndicators?.fields?.gender?.options || ["ذكر", "أنثى"]).map((opt: string) => (
                          <Label
                            key={opt}
                            className={cn(
                              "flex-1 px-4 py-6 rounded-xl border-2 text-center cursor-pointer transition-all font-bold text-lg flex flex-col items-center gap-2 hover:bg-accent",
                              field.value === opt
                                ? (opt === "ذكر" ? "bg-blue-50 border-blue-500 text-blue-700" : (opt === "أنثى" ? "bg-pink-50 border-pink-500 text-pink-700" : "bg-primary/5 border-primary text-primary"))
                                : "bg-card border-muted"
                            )}
                          >
                            <RadioGroupItem value={opt} className="sr-only" />
                            <span className="text-3xl">{opt === "ذكر" ? "👦" : (opt === "أنثى" ? "👧" : "👶")}</span>
                            {opt}
                          </Label>
                        ))}
                      </RadioGroup>
                    )}
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-base font-semibold">{surveyConfig.healthIndicators?.fields?.weightPerception?.label || "7. كيف تقيم وزن طفلك بالنسبة لعمره؟"} <span className="text-red-500">*</span></Label>
                  <Controller
                    name="healthIndicators.weightPerception"
                    control={form.control}
                    render={({ field }) => (
                      <div id="healthIndicators.weightPerception" className="flex flex-wrap gap-2">
                        {(surveyConfig.healthIndicators?.fields?.weightPerception?.options || ["نحيف جداً", "طبيعي", "وزن زائد", "سمنة مفرطة", "لا أعلم"]).map((opt: string) => (
                          <div
                            key={opt}
                            onClick={() => field.onChange(opt)}
                            className={cn(
                              "px-4 py-2 rounded-full border cursor-pointer transition-all text-sm",
                              field.value === opt ? "bg-primary text-primary-foreground border-primary shadow-sm" : "bg-card hover:bg-accent"
                            )}
                          >
                            {opt}
                          </div>
                        ))}
                      </div>
                    )}
                  />
                </div>

                <div className="col-span-1 md:col-span-2 space-y-4 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
                  <Label className="text-base font-bold text-primary">{surveyConfig.healthIndicators?.fields?.healthIssues?.label || "8. هل يعاني الطفل من أي مشاكل صحية؟ (يمكن اختيار أكثر من إجابة)"}</Label>
                  <Controller
                    name="healthIndicators.healthIssues"
                    control={form.control}
                    render={({ field }) => (
                      <div id="healthIndicators.healthIssues" className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {(surveyConfig.healthIndicators?.fields?.healthIssues?.options || [
                          "فقر دم (أنيميا)",
                          "نقص فيتامين D",
                          "سكري الأطفال",
                          "حساسية طعام",
                          "لا يعاني من أي مشاكل"
                        ]).map((item: string) => {
                          const NO_ISSUES = "لا يعاني من أي مشاكل";
                          const isChecked = (field.value || []).includes(item);
                          return (
                            <div
                              key={item}
                              className={cn(
                                "flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer select-none",
                                isChecked
                                  ? (item === NO_ISSUES
                                    ? "bg-green-50 border-green-300 dark:bg-green-900/10 dark:border-green-800"
                                    : "bg-red-50 border-red-300 dark:bg-red-900/10 dark:border-red-800")
                                  : "bg-card hover:bg-accent border-dashed"
                              )}
                              onClick={() => {
                                const current: string[] = field.value || [];
                                if (isChecked) {
                                  field.onChange(current.filter((v: string) => v !== item));
                                } else if (item === NO_ISSUES) {
                                  field.onChange([NO_ISSUES]);
                                } else {
                                  field.onChange([...current.filter((v: string) => v !== NO_ISSUES), item]);
                                }
                              }}
                            >
                              <div className={cn(
                                "h-5 w-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors",
                                isChecked
                                  ? (item === NO_ISSUES
                                    ? "bg-green-500 border-green-500 text-white"
                                    : "bg-red-500 border-red-500 text-white")
                                  : "border-muted-foreground/40 bg-background"
                              )}>
                                {isChecked && <CheckCircle2 size={14} />}
                              </div>
                              <span className={cn("text-sm font-medium",
                                isChecked
                                  ? (item === NO_ISSUES ? "text-green-700 dark:text-green-400" : "text-red-700 dark:text-red-400")
                                  : ""
                              )}>{item}</span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  />
                  <div className="flex items-center gap-2 mt-2">
                    <span className="font-medium whitespace-nowrap">أخرى:</span>
                    <Controller
                      name="healthIndicators.otherHealthIssue"
                      control={form.control}
                      render={({ field }) => <input className="flex-1 border-b-2 border-slate-300 focus:border-primary outline-none px-2 py-1 bg-transparent transition-colors" placeholder="اذكرها هنا..." {...field} />}
                    />
                  </div>
                </div>

                <div className="col-span-1 md:col-span-2 space-y-4">
                  <Label className="text-base font-semibold">{surveyConfig.healthIndicators?.fields?.infoSources?.label || "9. مصادر معلوماتكم حول تغذية الأطفال"}</Label>
                  <Controller
                    name="healthIndicators.infoSources"
                    control={form.control}
                    render={({ field }) => (
                      <div className="flex flex-wrap gap-3">
                        {(surveyConfig.healthIndicators?.fields?.infoSources?.options || [
                          "الأطباء",
                          "الإنترنت",
                          "المدرسة",
                          "الأهل والأصدقاء",
                          "وسائل التواصل الاجتماعي"
                        ]).map((item: string) => (
                          <div
                            key={item}
                            onClick={() => {
                              const newValue = field.value.includes(item)
                                ? field.value.filter((v: string) => v !== item)
                                : [...field.value, item];
                              field.onChange(newValue);
                            }}
                            className={cn(
                              "px-4 py-2 rounded-full border cursor-pointer transition-all text-sm font-medium flex items-center gap-2 select-none hover:bg-accent",
                              field.value.includes(item) ? "bg-secondary text-secondary-foreground border-secondary shadow-sm" : "bg-card border-dashed"
                            )}
                          >
                            <div className={cn(
                              "h-4 w-4 rounded-full border flex items-center justify-center",
                              field.value.includes(item) ? "border-transparent" : "border-muted-foreground"
                            )}>
                              {field.value.includes(item) && <CheckCircle2 size={16} />}
                            </div>
                            {item}
                          </div>
                        ))}
                      </div>
                    )}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* KAP Section - Redesigned Likert */}
          <Card className="shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-slate-100 to-slate-50 dark:from-slate-900 dark:to-slate-800 p-6 border-b sticky top-0 z-10 opacity-95 backdrop-blur-sm">
              <SectionHeader title={surveyConfig.formSectionHeaders?.knowledge || "القسم الثالث: المعرفة والممارسات الغذائية (KAP)"} />
            </div>
            <CardContent className="p-6 md:p-8">
              <h3 className="flex items-center gap-2 font-bold text-lg mb-6 text-primary p-2 bg-primary/5 rounded-lg">
                <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                {surveyConfig.sectionTitles?.knowledge || "أ) المعرفة الغذائية للوالدين"}
              </h3>
              {surveyConfig.knowledge.map((q: any) => (
                <LikertScale key={q.id} name={`knowledge.${q.id}`} question={q.text} control={form.control} questionConfig={q} globalLabels={surveyConfig.likertLabels} />
              ))}

              <div className="my-10 border-t-2 border-dashed" />

              <h3 className="flex items-center gap-2 font-bold text-lg mb-6 text-primary p-2 bg-primary/5 rounded-lg">
                <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                {surveyConfig.sectionTitles?.practices || "ب) الممارسات الغذائية داخل المنزل"}
              </h3>
              {surveyConfig.practices.map((q: any) => (
                <LikertScale key={q.id} name={`practices.${q.id}`} question={q.text} control={form.control} questionConfig={q} globalLabels={surveyConfig.likertLabels} />
              ))}
            </CardContent>
          </Card>

          {/* Intervention Section */}
          <Card className="shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-slate-100 to-slate-50 dark:from-slate-900 dark:to-slate-800 p-6 border-b">
              <SectionHeader title={surveyConfig.formSectionHeaders?.intervention || surveyConfig.sectionTitles?.intervention || "القسم الرابع: تقييم التدخل (Intervention Assessment)"} />
            </div>
            <CardContent className="p-6 md:p-8">
              <h3 className="font-bold text-xl mb-6 text-slate-800 dark:text-slate-100">{surveyConfig.sectionTitles?.stories || "1. القصص القصيرة المصورة"}</h3>
              {surveyConfig.intervention.stories.map((q: any) => (
                <LikertScale key={q.id} name={`intervention.stories.${q.id}`} question={q.text} control={form.control} questionConfig={q} globalLabels={surveyConfig.likertLabels} />
              ))}

              <div className="my-10 border-t-2 border-dashed" />

              <h3 className="font-bold text-xl mb-6 text-slate-800 dark:text-slate-100">2. منصة NutriAware الإلكترونية</h3>

              <div className="pl-0 md:pl-4 space-y-8">
                <div>
                  <h4 className="font-semibold text-lg mb-4 text-secondary-foreground bg-secondary/20 inline-block px-3 py-1 rounded-md">{surveyConfig.sectionTitles?.usability || "أ) قابلية الاستخدام"}</h4>
                  {surveyConfig.intervention.platform.usability.map((q: any) => (
                    <LikertScale key={q.id} name={`intervention.platform.usability.${q.id}`} question={q.text} control={form.control} questionConfig={q} globalLabels={surveyConfig.likertLabels} />
                  ))}
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-4 text-secondary-foreground bg-secondary/20 inline-block px-3 py-1 rounded-md">{surveyConfig.sectionTitles?.content || "ب) جودة المحتوى"}</h4>
                  {surveyConfig.intervention.platform.content.map((q: any) => (
                    <LikertScale key={q.id} name={`intervention.platform.content.${q.id}`} question={q.text} control={form.control} questionConfig={q} globalLabels={surveyConfig.likertLabels} />
                  ))}
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-4 text-secondary-foreground bg-secondary/20 inline-block px-3 py-1 rounded-md">{surveyConfig.sectionTitles?.tools || "ج) أدوات التقييم والذكاء الاصطناعي"}</h4>
                  {surveyConfig.intervention.platform.tools.map((q: any) => (
                    <LikertScale key={q.id} name={`intervention.platform.tools.${q.id}`} question={q.text} control={form.control} questionConfig={q} globalLabels={surveyConfig.likertLabels} />
                  ))}
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-4 text-secondary-foreground bg-secondary/20 inline-block px-3 py-1 rounded-md">د) التواصل والاستشارات</h4>
                  {surveyConfig.intervention.platform.consultation.map((q: any) => (
                    <LikertScale key={q.id} name={`intervention.platform.consultation.${q.id}`} question={q.text} control={form.control} questionConfig={q} globalLabels={surveyConfig.likertLabels} />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Satisfaction */}
          <Card className="shadow-md overflow-hidden bg-primary/5 border-primary/20">
            <div className="p-6 border-b border-primary/10">
              <SectionHeader title={surveyConfig.formSectionHeaders?.satisfaction || "القسم الخامس: الرضا العام"} />
            </div>
            <CardContent className="p-6 md:p-8">
              {surveyConfig.satisfaction.map((q: any) => (
                <LikertScale key={q.id} name={`satisfaction.${q.id}`} question={q.text} control={form.control} questionConfig={q} globalLabels={surveyConfig.likertLabels} />
              ))}
            </CardContent>
          </Card>

          {/* Behavioral Intent */}
          <Card className="shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-slate-100 to-slate-50 dark:from-slate-900 dark:to-slate-800 p-6 border-b">
              <SectionHeader title={surveyConfig.formSectionHeaders?.behavioral || "القسم السادس: الأثر السلوكي"} />
            </div>
            <CardContent className="p-6 md:p-8">
              {surveyConfig.behavioralIntent.map((q: any) => (
                <LikertScale key={q.id} name={`behavioralIntent.${q.id}`} question={q.text} control={form.control} questionConfig={q} globalLabels={surveyConfig.likertLabels} />
              ))}
            </CardContent>
          </Card>

          {/* NPS */}
          {surveyConfig.npsQuestion?.text && (
            <Card className="shadow-md overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-blue-200 dark:border-blue-800">
              <div className="p-6 border-b border-blue-200 dark:border-blue-800">
                <SectionHeader title="صافي نقاط الترويج (NPS)" description="ما مدى احتمال أن توصي بالمنصة؟" />
              </div>
              <CardContent className="p-6 md:p-8">
                <NPSScale name="nps" question={surveyConfig.npsQuestion.text} control={form.control} />
              </CardContent>
            </Card>
          )}

          {/* Retrospective */}
          <Card className="shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-slate-100 to-slate-50 dark:from-slate-900 dark:to-slate-800 p-6 border-b">
              <SectionHeader title={surveyConfig.formSectionHeaders?.retrospective || surveyConfig.retrospectiveConfig?.title || "القسم السابع: تقييم ارتجاعي (Retrospective Self-assessment)"} description={surveyConfig.retrospectiveConfig?.description || "يرجى تقييم حالتك قبل المشروع وحالتك بعد المشروع"} />
            </div>
            <CardContent className="p-6 md:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Knowledge */}
                <div className="space-y-6">
                  <h4 className="font-bold text-xl text-center border-b pb-2">{surveyConfig.retrospectiveConfig?.knowledgeTitle || "معرفتي بتغذية الأطفال"}</h4>
                  <div className="space-y-4">
                    {surveyConfig.retrospectiveConfig?.mode === 'slider' ? (
                      <>
                        <SliderRetroScale name="retrospective.knowledge.before" label={surveyConfig.retrospectiveConfig?.beforeLabel || "قبل المشروع"} control={form.control} variant="before" />
                        <SliderRetroScale name="retrospective.knowledge.after" label={surveyConfig.retrospectiveConfig?.afterLabel || "بعد المشروع"} control={form.control} variant="after" />
                      </>
                    ) : (
                      <>
                        {/* Before — MCQ */}
                        <div className="bg-slate-100 dark:bg-slate-800 p-5 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
                          <Label className="mb-4 block text-center text-muted-foreground font-semibold">{surveyConfig.retrospectiveConfig?.beforeLabel || "قبل المشروع"}</Label>
                          <Controller name="retrospective.knowledge.before" control={form.control} rules={{ required: true }}
                            render={({ field }) => (
                              <div className="flex justify-between gap-2">
                                {(surveyConfig.retrospectiveConfig?.options || ["منخفض", "متوسط", "عالٍ"]).map((opt: string) => (
                                  <div key={opt} onClick={() => field.onChange(opt)}
                                    className={cn("flex-1 py-3 px-2 rounded-lg text-center cursor-pointer transition-all border font-medium text-sm",
                                      field.value === opt ? "bg-slate-600 text-white shadow-md border-slate-600" : "bg-white dark:bg-slate-900 hover:border-slate-400"
                                    )}>{opt}</div>
                                ))}
                              </div>
                            )} />
                        </div>
                        {/* After — MCQ */}
                        <div className="bg-primary/5 p-5 rounded-xl border border-primary/20">
                          <Label className="mb-4 block text-center text-primary font-bold text-lg">{surveyConfig.retrospectiveConfig?.afterLabel || "بعد المشروع"}</Label>
                          <Controller name="retrospective.knowledge.after" control={form.control} rules={{ required: true }}
                            render={({ field }) => (
                              <div className="flex justify-between gap-2">
                                {(surveyConfig.retrospectiveConfig?.options || ["منخفض", "متوسط", "عالٍ"]).map((opt: string) => (
                                  <div key={opt} onClick={() => field.onChange(opt)}
                                    className={cn("flex-1 py-3 px-2 rounded-lg text-center cursor-pointer transition-all border font-bold text-sm",
                                      field.value === opt ? "bg-primary text-primary-foreground shadow-lg scale-105 border-primary" : "bg-white dark:bg-slate-900 border-primary/30 hover:bg-primary/10"
                                    )}>{opt}</div>
                                ))}
                              </div>
                            )} />
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Practices */}
                <div className="space-y-6">
                  <h4 className="font-bold text-xl text-center border-b pb-2">{surveyConfig.retrospectiveConfig?.practicesTitle || "ممارساتي الغذائية في المنزل"}</h4>
                  <div className="space-y-4">
                    {surveyConfig.retrospectiveConfig?.mode === 'slider' ? (
                      <>
                        <SliderRetroScale name="retrospective.practices.before" label={surveyConfig.retrospectiveConfig?.beforeLabel || "قبل المشروع"} control={form.control} variant="before" />
                        <SliderRetroScale name="retrospective.practices.after" label={surveyConfig.retrospectiveConfig?.afterLabel || "بعد المشروع"} control={form.control} variant="after" />
                      </>
                    ) : (
                      <>
                        <div className="bg-slate-100 dark:bg-slate-800 p-5 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
                          <Label className="mb-4 block text-center text-muted-foreground font-semibold">{surveyConfig.retrospectiveConfig?.beforeLabel || "قبل المشروع"}</Label>
                          <Controller name="retrospective.practices.before" control={form.control} rules={{ required: true }}
                            render={({ field }) => (
                              <div className="flex justify-between gap-2">
                                {(surveyConfig.retrospectiveConfig?.options || ["منخفض", "متوسط", "عالٍ"]).map((opt: string) => (
                                  <div key={opt} onClick={() => field.onChange(opt)}
                                    className={cn("flex-1 py-3 px-2 rounded-lg text-center cursor-pointer transition-all border font-medium text-sm",
                                      field.value === opt ? "bg-slate-600 text-white shadow-md border-slate-600" : "bg-white dark:bg-slate-900 hover:border-slate-400"
                                    )}>{opt}</div>
                                ))}
                              </div>
                            )} />
                        </div>
                        <div className="bg-primary/5 p-5 rounded-xl border border-primary/20">
                          <Label className="mb-4 block text-center text-primary font-bold text-lg">{surveyConfig.retrospectiveConfig?.afterLabel || "بعد المشروع"}</Label>
                          <Controller name="retrospective.practices.after" control={form.control} rules={{ required: true }}
                            render={({ field }) => (
                              <div className="flex justify-between gap-2">
                                {(surveyConfig.retrospectiveConfig?.options || ["منخفض", "متوسط", "عالٍ"]).map((opt: string) => (
                                  <div key={opt} onClick={() => field.onChange(opt)}
                                    className={cn("flex-1 py-3 px-2 rounded-lg text-center cursor-pointer transition-all border font-bold text-sm",
                                      field.value === opt ? "bg-primary text-primary-foreground shadow-lg scale-105 border-primary" : "bg-white dark:bg-slate-900 border-primary/30 hover:bg-primary/10"
                                    )}>{opt}</div>
                                ))}
                              </div>
                            )} />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Open Questions */}
          <Card className="shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-slate-100 to-slate-50 dark:from-slate-900 dark:to-slate-800 p-6 border-b">
              <SectionHeader title={surveyConfig.formSectionHeaders?.open || "القسم الثامن: أسئلة مفتوحة"} />
            </div>
            <CardContent className="p-6 md:p-8 space-y-8">
              {surveyConfig.openQuestions.map((q: any) => (
                <div key={q.id} className="space-y-3">
                  <Label htmlFor={q.id} className="text-base font-semibold">{q.text}</Label>
                  <Controller
                    name={`openQuestions.${q.id}` as any}
                    control={form.control}
                    render={({ field }) => (
                      <Textarea
                        {...field}
                        id={q.id}
                        className="min-h-[120px] text-base leading-relaxed bg-slate-50 dark:bg-slate-900 focus:bg-white dark:focus:bg-slate-950 transition-colors border-slate-200"
                        placeholder="شاركنا رأيك..."
                      />
                    )}
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="pt-6 pb-20">
            <Button
              type="submit"
              className="w-full text-xl py-8 rounded-xl shadow-xl hover:shadow-2xl transition-all hover:scale-[1.01] bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90"
              size="lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                  جاري إرسال التقييم...
                </>
              ) : (
                "إرسال النموذج"
              )}
            </Button>
            <p className="text-center mt-4 text-muted-foreground text-sm">شكراً لمساهمتك في تحسين مستقبل أطفالنا</p>
          </div>

        </form>
      </div>
    </div>
  );
};

export default ProjectEvaluation;
