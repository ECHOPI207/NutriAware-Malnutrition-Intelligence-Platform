import { useState, useEffect, useMemo } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Loader2, Plus, Trash2, Save, RefreshCw, ChevronDown, Pencil, AlertTriangle, Lightbulb, ArrowUpDown, ChevronUp, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import {
    SCALE_PRESETS, QUESTION_TYPE_INFO, getScaleIcons,
    suggestScaleType, validateResearchQuality, getQuestionLabels, createDefaultQuestion,
    FIELD_TYPE_INFO, OUTPUT_TYPE_INFO, convertFieldType, generateCodingMap, createDefaultField,
    DEFAULT_SECTION_ORDER, validateSectionOrder, reorderItems, reindexSectionOrder,
    type ScaleType, type ScaleLength, type QuestionType, type SurveyQuestion, type QualityWarning,
    type FieldType, type OutputType, type UnifiedFieldSchema, type SectionOrderEntry
} from '@/lib/surveyEngine';

// --- Default Data ---
const DEFAULT_CONFIG = {
    meta: {
        title: "استبيان تقييم مشروع NutriAware",
        subtitle: "مشروع تخرج: سوء التغذية للأطفال",
        institution: "كلية تكنولوجيا العلوم الصحية التطبيقية - برنامج تكنولوجيا التغذية وسلامة الغذاء"
    },
    consent: {
        title: "نموذج الموافقة المستنيرة",
        text: `حضرة ولي الأمر/الوصي الكريم،\r\nيهدف هذا الاستبيان إلى تقييم مشروع توعوي صحي يهدف إلى تحسين التغذية لدى الأطفال من خلال قصص قصيرة مصورة ومنصة إلكترونية تُعرف باسم NutriAware، والتي تحتوي على أدوات تقييم غذائي وتوصيات وخطط غذائية وذكاء اصطناعي وخدمات استشارة.\r\nمشاركتكم طوعية بالكامل، ولا توجد أي مخاطر أو تبعات مترتبة على عدم المشاركة. جميع البيانات التي ستُجمع ستظل سرية ولن تُستخدم إلا لأغراض البحث العلمي وتحسين البرامج التعليمية.`,
        agreeLabel: "أوافق على المشاركة في هذا البحث"
    },
    knowledge: [
        { id: "KN1", text: "أعلم أن سوء التغذية يشمل نقص العناصر الغذائية الدقيقة وليس فقط نقص الوزن", type: "likert", scaleType: "agreement", scaleLength: 5, constructId: "KN" },
        { id: "KN2", text: "أعلم أن الغذاء الصحي اليومي للطفل يجب أن يحتوي على خضروات وفواكه طازجة", type: "likert", scaleType: "agreement", scaleLength: 5, constructId: "KN" },
        { id: "KN3", text: "أعلم أن الإفراط في تناول الوجبات السريعة يؤثر سلباً على صحة الطفل ونموه", type: "likert", scaleType: "agreement", scaleLength: 5, constructId: "KN" },
        { id: "KN4", text: "أعلم أن من علامات سوء التغذية عند الأطفال: الإرهاق المستمر وضعف التركيز الدراسي", type: "likert", scaleType: "agreement", scaleLength: 5, constructId: "KN" },
        { id: "KN5_R", text: "لا أعتقد أن نوعية الغذاء تؤثر بشكل كبير على أداء الطفل الدراسي", type: "likert", scaleType: "agreement", scaleLength: 5, constructId: "KN", reverseScored: true },
        { id: "KN_AC", text: "يرجى اختيار \"أوافق\" لهذا السؤال للتأكد من انتباهك", type: "likert", scaleType: "agreement", scaleLength: 5, constructId: "KN", isAttentionCheck: true },
    ],
    practices: [
        { id: "PR1", text: "خلال الأسبوعين الماضيين، حرصت على توفير الخضروات والفواكه في وجبات طفلي", type: "likert", scaleType: "agreement", scaleLength: 5, constructId: "PR", timeAnchor: "خلال الأسبوعين الماضيين" },
        { id: "PR2", text: "خلال الأسبوعين الماضيين، راقبت كمية الحلويات والسكريات التي يتناولها طفلي", type: "likert", scaleType: "agreement", scaleLength: 5, constructId: "PR", timeAnchor: "خلال الأسبوعين الماضيين" },
        { id: "PR3", text: "خلال الأسبوعين الماضيين، قللنا من تناول الوجبات السريعة في المنزل", type: "likert", scaleType: "agreement", scaleLength: 5, constructId: "PR", timeAnchor: "خلال الأسبوعين الماضيين" },
        { id: "PR4", text: "خلال الأسبوعين الماضيين، شجعت طفلي على شرب الماء بانتظام بدلاً من المشروبات الغازية", type: "likert", scaleType: "agreement", scaleLength: 5, constructId: "PR", timeAnchor: "خلال الأسبوعين الماضيين" },
        { id: "PR5", text: "خلال الأسبوعين الماضيين، قرأت البطاقة الغذائية قبل شراء المنتجات لطفلي", type: "likert", scaleType: "agreement", scaleLength: 5, constructId: "PR", timeAnchor: "خلال الأسبوعين الماضيين" },
        { id: "PR6", text: "خلال الأسبوعين الماضيين، حرصت على تقديم وجبة إفطار متوازنة لطفلي يومياً", type: "likert", scaleType: "agreement", scaleLength: 5, constructId: "PR", timeAnchor: "خلال الأسبوعين الماضيين" },
        { id: "PR7_R", text: "خلال الأسبوعين الماضيين، وجدت صعوبة في تقديم أغذية صحية بسبب التكلفة المالية", type: "likert", scaleType: "agreement", scaleLength: 5, constructId: "PR", timeAnchor: "خلال الأسبوعين الماضيين", reverseScored: true },
        { id: "PR_AC", text: "يرجى اختيار \"لا أوافق بشدة\" لهذا السؤال", type: "likert", scaleType: "agreement", scaleLength: 5, constructId: "PR", isAttentionCheck: true },
    ],
    intervention: {
        stories: [
            { id: "INT_ST1", text: "كانت القصص المصورة جذابة بصرياً ومشوقة لطفلي", type: "likert", scaleType: "agreement", scaleLength: 5, constructId: "INT_ST" },
            { id: "INT_ST2", text: "كانت اللغة والمفاهيم في القصص مناسبة لعمر طفلي", type: "likert", scaleType: "agreement", scaleLength: 5, constructId: "INT_ST" },
            { id: "INT_ST3", text: "ساهمت القصص في تصحيح مفاهيم غذائية خاطئة لدي أو لدى طفلي", type: "likert", scaleType: "agreement", scaleLength: 5, constructId: "INT_ST" },
            { id: "INT_ST4", text: "نقلت القصص رسائل توعوية واضحة حول أهمية التغذية الصحية", type: "likert", scaleType: "agreement", scaleLength: 5, constructId: "INT_ST" },
            { id: "INT_ST5", text: "شجعت القصص طفلي على الاهتمام بتناول الطعام الصحي", type: "likert", scaleType: "agreement", scaleLength: 5, constructId: "INT_ST" },
            { id: "INT_ST6_R", text: "لم تضف القصص معلومات جديدة لم أكن أعرفها مسبقاً", type: "likert", scaleType: "agreement", scaleLength: 5, constructId: "INT_ST", reverseScored: true },
        ],
        platform: {
            usability: [
                { id: "PX_US1", text: "كان الدخول إلى المنصة عبر رمز QR سهلاً ومباشراً", type: "likert", scaleType: "agreement", scaleLength: 5, constructId: "PX_US" },
                { id: "PX_US2", text: "كانت المنصة سهلة الاستخدام والتنقل بين أقسامها المختلفة", type: "likert", scaleType: "agreement", scaleLength: 5, constructId: "PX_US" },
            ],
            content: [
                { id: "PX_CN1", text: "كانت المعلومات الغذائية المقدمة في المنصة موثوقة ومفيدة", type: "likert", scaleType: "agreement", scaleLength: 5, constructId: "PX_CN" },
                { id: "PX_CN2", text: "كانت خطط الوجبات المقترحة واقعية وقابلة للتطبيق في حياتنا اليومية", type: "likert", scaleType: "agreement", scaleLength: 5, constructId: "PX_CN" },
            ],
            tools: [
                { id: "PX_TL1", text: "كانت أدوات التقييم الغذائي سهلة الفهم والاستخدام", type: "likert", scaleType: "agreement", scaleLength: 5, constructId: "PX_TL" },
                { id: "PX_TL2", text: "ساعدتني نتائج التقييم على فهم الحالة الغذائية لطفلي بوضوح", type: "likert", scaleType: "agreement", scaleLength: 5, constructId: "PX_TL" },
            ],
            consultation: [
                { id: "PX_CO1", text: "كانت وسائل التواصل مع المختصين واضحة وسهلة الوصول", type: "likert", scaleType: "agreement", scaleLength: 5, constructId: "PX_CO" },
                { id: "PX_CO2", text: "شعرت بالاطمئنان لتوفر إمكانية طلب استشارة غذائية متخصصة", type: "likert", scaleType: "agreement", scaleLength: 5, constructId: "PX_CO" },
            ]
        }
    },
    satisfaction: [
        { id: "SAT1", text: "أنا راضٍ بشكل عام عن تجربتي مع مشروع NutriAware", type: "likert", scaleType: "agreement", scaleLength: 5, constructId: "SAT" },
        { id: "SAT2", text: "حقق المشروع توقعاتي فيما يخص تحسين معرفتي بتغذية طفلي", type: "likert", scaleType: "agreement", scaleLength: 5, constructId: "SAT" },
        { id: "SAT3", text: "أنصح أولياء الأمور الآخرين بالاطلاع على المنصة والاستفادة منها", type: "likert", scaleType: "agreement", scaleLength: 5, constructId: "SAT" },
        { id: "SAT4_R", text: "لم يقدم المشروع فائدة واضحة تستحق الوقت المستثمر فيه", type: "likert", scaleType: "agreement", scaleLength: 5, constructId: "SAT", reverseScored: true },
    ],
    behavioralIntent: [
        { id: "BI1", text: "أنوي تطبيق تغييرات غذائية صحية داخل المنزل بناءً على ما تعلمته", type: "likert", scaleType: "agreement", scaleLength: 5, constructId: "BI" },
        { id: "BI2", text: "أنوي تقليل استهلاك الوجبات السريعة والحلويات لأطفالي", type: "likert", scaleType: "agreement", scaleLength: 5, constructId: "BI" },
        { id: "BI3", text: "أنوي تشجيع أطفالي على تناول المزيد من الخضروات والفواكه يومياً", type: "likert", scaleType: "agreement", scaleLength: 5, constructId: "BI" },
        { id: "BI4", text: "أنوي استخدام منصة NutriAware بشكل منتظم لمتابعة تغذية أطفالي", type: "likert", scaleType: "agreement", scaleLength: 5, constructId: "BI" },
        { id: "BI5_R", text: "لا أعتقد أنني سأغير عاداتنا الغذائية الحالية بناءً على هذا المشروع", type: "likert", scaleType: "agreement", scaleLength: 5, constructId: "BI", reverseScored: true },
    ],
    npsQuestion: { id: "NPS1", text: "على مقياس من 0 إلى 10، ما مدى احتمال أن توصي بمنصة NutriAware لصديق أو فرد من عائلتك؟", type: "nps" as QuestionType },
    openQuestions: [
        { id: "OE1", text: "ما أكثر ما أعجبك في مشروع NutriAware؟" },
        { id: "OE2", text: "ما التحديات التي تواجهك في تطبيق العادات الغذائية الصحية لأطفالك؟" },
        { id: "OE3", text: "ما اقتراحاتك لتحسين المنصة أو المحتوى التوعوي؟" },
        { id: "OE4", text: "كيف تعرفت على منصة NutriAware لأول مرة؟" },
    ],
    sectionTitles: {
        knowledge: "المعرفة الغذائية للوالدين",
        practices: "الممارسات الغذائية داخل المنزل",
        intervention: "القسم الخامس: التدخل (قصص ومنصة NutriAware)",
        stories: "1. القصص القصيرة المصورة",
        usability: "2. المنصة - قابلية الاستخدام",
        content: "2. المنصة - جودة المحتوى",
        tools: "2. المنصة - الأدوات",
        consultation: "2. المنصة - الاستشارات",
        satisfaction: "الرضا العام",
        behavioralIntent: "الأثر السلوكي (Behavioral Intent)",
        openQuestions: "الأسئلة المفتوحة"
    },
    likertLabels: {
        "1": "لا أوافق بشدة", "2": "لا أوافق", "3": "محايد", "4": "أوافق", "5": "أوافق بشدة"
    },
    retrospectiveConfig: {
        title: "القسم العاشر: تقييم ارتجاعي (Retrospective Pre-Then/Post Self-Assessment)",
        description: "يرجى تقييم مستواك قبل وبعد استخدام NutriAware على مقياس من 1 (منخفض جدًا) إلى 10 (مرتفع جدًا)",
        mode: "slider" as "slider" | "mcq",
        dimensions: [
            { id: "RETRO_KN", titleAr: "مستوى معرفتي بأساسيات تغذية الأطفال السليمة", titleEn: "Knowledge of child nutrition fundamentals" },
            { id: "RETRO_PR", titleAr: "مستوى ممارساتي الغذائية الصحية في المنزل", titleEn: "Healthy dietary practices at home" },
            { id: "RETRO_AW", titleAr: "مستوى وعيي بمخاطر سوء التغذية على أطفالي", titleEn: "Awareness of malnutrition risks" },
            { id: "RETRO_CF", titleAr: "مستوى ثقتي في قدرتي على تخطيط وجبات صحية لأطفالي", titleEn: "Confidence in planning healthy meals" },
        ],
        knowledgeTitle: "مستوى معرفتي بأساسيات تغذية الأطفال السليمة",
        practicesTitle: "مستوى ممارساتي الغذائية الصحية في المنزل",
        beforeLabel: "قبل استخدام NutriAware",
        afterLabel: "بعد استخدام NutriAware",
        options: ["منخفض", "متوسط", "عالٍ"],
        sliderMin: 1, sliderMax: 10,
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
        nps: "القسم الثامن: صافي نقاط الترويج",
        retrospective: "القسم التاسع: تقييم ارتجاعي (قبل/بعد)",
        open: "القسم العاشر: أسئلة مفتوحة"
    },
    researchMode: false,
    customTemplates: [] as Array<{ id: string; name: string; labels: Record<string, string>; scaleLength: number }>,
    demographics: {
        title: "القسم الأول: البيانات الديموغرافية (لولي الأمر)",
        description: "الهدف: تحديد المتغيرات المستقلة للتحليل.",
        fields: {
            parentName: { id: "DEM_NAME", text: "اسم ولي الأمر (اختياري)", fieldType: "text" as FieldType, required: false, hidden: false, order: 0, outputType: "text" as OutputType, legacyKey: "parentName", validation: { maxLength: 100 } },
            relationship: { id: "DEM_RELATIONSHIP", text: "1. صلة القرابة بالطفل", fieldType: "radio" as FieldType, required: true, hidden: false, order: 1, outputType: "nominal" as OutputType, options: ["أب", "أم", "أخرى"], codingMap: { "أب": 1, "أم": 2, "أخرى": 3 }, legacyKey: "relationship" },
            parentAge: { id: "DEM_PARENT_AGE", text: "2. عمر ولي الأمر", fieldType: "radio" as FieldType, required: true, hidden: false, order: 2, outputType: "ordinal" as OutputType, options: ["أقل من 25 سنة", "25 – 35 سنة", "36 – 45 سنة", "أكثر من 45 سنة"], codingMap: { "أقل من 25 سنة": 1, "25 – 35 سنة": 2, "36 – 45 سنة": 3, "أكثر من 45 سنة": 4 }, legacyKey: "parentAge" },
            parentProfession: { id: "DEM_PROFESSION", text: "3. مهنة ولي الأمر (التي تشكل مصدر الدخل الأساسي)", fieldType: "text" as FieldType, required: false, hidden: false, order: 3, outputType: "text" as OutputType, legacyKey: "parentProfession", validation: { maxLength: 200 } },
            education: { id: "DEM_EDUCATION", text: "4. المستوى التعليمي", fieldType: "radio" as FieldType, required: true, hidden: false, order: 4, outputType: "ordinal" as OutputType, options: ["أقل من ثانوي", "ثانوي", "دبلوم متوسط", "جامعي", "دراسات عليا"], codingMap: { "أقل من ثانوي": 1, "ثانوي": 2, "دبلوم متوسط": 3, "جامعي": 4, "دراسات عليا": 5 }, legacyKey: "education" },
            childrenCount: { id: "DEM_CHILDREN_COUNT", text: "5. عدد الأطفال في الأسرة", fieldType: "radio" as FieldType, required: true, hidden: false, order: 5, outputType: "ordinal" as OutputType, options: ["طفل واحد", "2-3 أطفال", "4 أطفال فأكثر"], codingMap: { "طفل واحد": 1, "2-3 أطفال": 2, "4 أطفال فأكثر": 3 }, legacyKey: "childrenCount" },
            childAge: { id: "DEM_CHILD_AGE", text: "6. عمر الطفل المستهدف", fieldType: "radio" as FieldType, required: true, hidden: false, order: 6, outputType: "ordinal" as OutputType, options: ["أقل من 3 سنوات", "3 – 6 سنوات", "7 – 10 سنوات", "11 – 14 سنة", "أكبر من 14 سنة"], codingMap: { "أقل من 3 سنوات": 1, "3 – 6 سنوات": 2, "7 – 10 سنوات": 3, "11 – 14 سنة": 4, "أكبر من 14 سنة": 5 }, legacyKey: "childAge" }
        }
    },
    healthIndicators: {
        title: "القسم الثاني: المؤشرات الصحية (بيانات الطفل)",
        description: "الهدف: ربط الوعي بالحالة الصحية الواقعية",
        fields: {
            gender: { id: "HI_GENDER", text: "7. جنس الطفل", fieldType: "radio" as FieldType, required: true, hidden: false, order: 0, outputType: "nominal" as OutputType, options: ["ذكر", "أنثى"], codingMap: { "ذكر": 1, "أنثى": 2 }, legacyKey: "gender" },
            weightPerception: { id: "HI_WEIGHT_PERCEPTION", text: "8. كيف تقيم وزن طفلك بالنسبة لعمره؟", fieldType: "radio" as FieldType, required: true, hidden: false, order: 1, outputType: "ordinal" as OutputType, options: ["نحيف جداً", "طبيعي", "وزن زائد", "سمنة مفرطة", "لا أعلم"], codingMap: { "نحيف جداً": 1, "طبيعي": 2, "وزن زائد": 3, "سمنة مفرطة": 4, "لا أعلم": 5 }, legacyKey: "weightPerception" },
            healthIssues: { id: "HI_HEALTH_ISSUES", text: "9. هل يعاني الطفل من أي مشاكل صحية؟ (يمكن اختيار أكثر من إجابة)", fieldType: "checkbox" as FieldType, required: true, hidden: false, order: 2, outputType: "nominal" as OutputType, options: ["لا يعاني من أي مشاكل صحية", "أنيميا (فقر دم)", "نقص فيتامين د أو كالسيوم", "نحافة", "سمنة", "حساسية طعام", "أخرى"], legacyKey: "healthIssues" },
            infoSources: { id: "HI_INFO_SOURCES", text: "10. مصادر معلوماتكم حول تغذية الأطفال", fieldType: "checkbox" as FieldType, required: true, hidden: false, order: 3, outputType: "nominal" as OutputType, options: ["طبيب أطفال", "أخصائي تغذية", "الإنترنت ومواقع التواصل الاجتماعي", "الأهل والأصدقاء", "الكتب والمجلات العلمية"], legacyKey: "infoSources" }
        }
    }
};

// --- Helper Components ---

const AccordionSection = ({ title, defaultOpen = false, badge, children }: {
    title: string; defaultOpen?: boolean; badge?: React.ReactNode; children: React.ReactNode;
}) => {
    const [open, setOpen] = useState(defaultOpen);
    return (
        <Card className="overflow-hidden">
            <button type="button" onClick={() => setOpen(!open)}
                className="w-full p-4 md:p-5 flex justify-between items-center hover:bg-muted/50 transition-colors text-right gap-3">
                <div className="flex items-center gap-2">
                    <h3 className="font-bold text-lg">{title}</h3>
                    {badge}
                </div>
                <ChevronDown size={20} className={`transition-transform shrink-0 ${open ? 'rotate-180' : ''}`} />
            </button>
            {open && <CardContent className="p-4 md:p-6 border-t space-y-4">{children}</CardContent>}
        </Card>
    );
};

// --- Scale Preview ---
const ScalePreview = ({ question, globalLabels }: { question: SurveyQuestion; globalLabels?: Record<string, string> }) => {
    const labels = getQuestionLabels(question, globalLabels);
    const icons = getScaleIcons(question.scaleType || 'agreement', question.scaleLength || 5);
    const entries = Object.entries(labels).sort((a, b) => parseInt(a[0]) - parseInt(b[0]));
    const reversed = question.reverseScored ? [...entries].reverse() : entries;

    if (question.type === 'nps') {
        return (
            <div className="p-3 bg-muted/30 rounded-lg border">
                <p className="text-[10px] text-muted-foreground mb-2">معاينة NPS (0–10)</p>
                <div className="flex gap-1">
                    {Array.from({ length: 11 }, (_, i) => (
                        <div key={i} className={`flex-1 h-7 rounded text-[10px] flex items-center justify-center font-bold ${i <= 6 ? 'bg-red-100 text-red-700' : i <= 8 ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                            {i}
                        </div>
                    ))}
                </div>
                <div className="flex justify-between text-[9px] text-muted-foreground mt-1">
                    <span>غير محتمل إطلاقًا</span><span>محتمل جدًا</span>
                </div>
            </div>
        );
    }

    if (question.type === 'slider') {
        return (
            <div className="p-3 bg-muted/30 rounded-lg border">
                <p className="text-[10px] text-muted-foreground mb-2">معاينة شريط التمرير (1–10)</p>
                <Slider defaultValue={[5]} min={1} max={10} step={1} className="py-2" disabled />
                <div className="flex justify-between text-[9px] text-muted-foreground"><span>1</span><span>10</span></div>
            </div>
        );
    }

    return (
        <div className="p-3 bg-muted/30 rounded-lg border">
            <p className="text-[10px] text-muted-foreground mb-2">
                معاينة: {SCALE_PRESETS[question.scaleType || 'agreement']?.nameAr} ({question.scaleLength || 5} درجات)
                {question.reverseScored && <span className="text-amber-600 mr-2">↻ معكوس</span>}
            </p>
            <div className={`grid gap-1.5`} style={{ gridTemplateColumns: `repeat(${reversed.length}, 1fr)` }}>
                {reversed.map(([key, label], i) => (
                    <div key={key} className="flex flex-col items-center p-1.5 rounded border bg-card text-center">
                        <span className="text-sm">{icons[i] || '⬜'}</span>
                        <span className="text-[9px] leading-tight mt-1">{label}</span>
                        <span className="text-[8px] text-muted-foreground">{key}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- Enhanced Question Editor ---
const QuestionEditor = ({ index, question, onChange, onRemove, globalLabels, researchMode }: {
    index: number;
    question: SurveyQuestion;
    onChange: (updated: Partial<SurveyQuestion>) => void;
    onRemove: () => void;
    globalLabels: Record<string, string>;
    researchMode: boolean;
}) => {
    const [expanded, setExpanded] = useState(false);
    const suggestion = useMemo(() => suggestScaleType(question.text), [question.text]);
    const currentLabels = getQuestionLabels(question, globalLabels);
    const hasSuggestion = suggestion && suggestion.suggestedType !== (question.scaleType || 'agreement');

    return (
        <div className="border rounded-lg p-3 space-y-2 bg-card">
            {/* Row 1: Number + Question Text + Type Badge + Delete */}
            <div className="flex gap-2 items-center">
                <span className="text-xs text-muted-foreground font-mono shrink-0 w-6 text-center">{index + 1}</span>
                <Input value={question.text} onChange={e => onChange({ text: e.target.value })}
                    className="flex-1 h-9 text-sm text-right" dir="rtl" placeholder="نص السؤال..." />
                <span className="text-xs px-1.5 py-0.5 rounded bg-muted shrink-0">{QUESTION_TYPE_INFO[question.type || 'likert']?.icon}</span>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 shrink-0" onClick={onRemove}>
                    <Trash2 size={14} />
                </Button>
            </div>

            {/* Auto-suggestion */}
            {hasSuggestion && researchMode && (
                <div className="flex items-center gap-2 pr-8 text-xs text-amber-600 bg-amber-50 dark:bg-amber-950/30 p-2 rounded">
                    <Lightbulb size={12} />
                    <span>{suggestion!.reason}</span>
                    <Button variant="outline" size="sm" className="h-5 text-[10px] px-2 mr-auto"
                        onClick={() => onChange({ scaleType: suggestion!.suggestedType })}>
                        تطبيق
                    </Button>
                </div>
            )}

            {/* Row 2: Controls toggle */}
            <button type="button" onClick={() => setExpanded(!expanded)}
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors pr-8">
                <Pencil size={10} />
                إعدادات السؤال
                <ChevronDown size={10} className={`transition-transform ${expanded ? 'rotate-180' : ''}`} />
            </button>

            {expanded && (
                <div className="space-y-3 pr-8">
                    {/* Question Type + Scale Type */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        <div className="space-y-1">
                            <Label className="text-[10px]">نوع السؤال</Label>
                            <Select value={question.type || 'likert'} onValueChange={(v: string) => onChange({ type: v as QuestionType })}>
                                <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    {Object.entries(QUESTION_TYPE_INFO).map(([key, info]) => (
                                        <SelectItem key={key} value={key}>{info.icon} {info.labelAr}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {(question.type === 'likert' || !question.type) && (
                            <>
                                <div className="space-y-1">
                                    <Label className="text-[10px]">نوع المقياس</Label>
                                    <Select value={question.scaleType || 'agreement'} onValueChange={(v: string) => onChange({ scaleType: v as ScaleType, customLabels: undefined })}>
                                        <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            {Object.entries(SCALE_PRESETS).map(([key, preset]) => (
                                                <SelectItem key={key} value={key}>{preset.nameAr}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-1">
                                    <Label className="text-[10px]">عدد الدرجات</Label>
                                    <Select value={String(question.scaleLength || 5)} onValueChange={v => onChange({ scaleLength: parseInt(v) as ScaleLength })}>
                                        <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="3">3 درجات</SelectItem>
                                            <SelectItem value="5">5 درجات</SelectItem>
                                            <SelectItem value="7">7 درجات</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-1">
                                    <Label className="text-[10px]">خيارات</Label>
                                    <div className="flex items-center gap-3 h-8">
                                        <label className="flex items-center gap-1 text-[10px]">
                                            <Switch checked={!!question.reverseScored} onCheckedChange={v => onChange({ reverseScored: v })} className="scale-75" />
                                            <ArrowUpDown size={10} /> معكوس
                                        </label>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Inline Label Editing for Likert */}
                    {(question.type === 'likert' || !question.type) && (
                        <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                                <Label className="text-[10px]">تعديل نصوص الإجابات</Label>
                                {question.customLabels && (
                                    <Button variant="ghost" size="sm" className="h-5 text-[10px] px-2"
                                        onClick={() => onChange({ customLabels: undefined })}>
                                        <RefreshCw size={8} className="ml-1" /> إعادة للافتراضي
                                    </Button>
                                )}
                            </div>
                            <div className={`grid gap-1.5`} style={{ gridTemplateColumns: `repeat(${question.scaleLength || 5}, 1fr)` }}>
                                {Object.entries(currentLabels).sort((a, b) => parseInt(a[0]) - parseInt(b[0])).map(([key, label]) => (
                                    <div key={key} className="space-y-0.5">
                                        <Label className="text-[8px] text-muted-foreground text-center block">{key}</Label>
                                        <Input value={label} className="h-6 text-[10px] text-center px-1" dir="rtl"
                                            onChange={e => {
                                                const updated = { ...currentLabels, [key]: e.target.value };
                                                onChange({ customLabels: updated });
                                            }} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Scale Preview */}
                    <ScalePreview question={question} globalLabels={globalLabels} />
                </div>
            )}
        </div>
    );
};

// Simple text/textarea field editor
const SimpleFieldEditor = ({ label, value, onChange, isTextArea }: {
    label: string; value: string; onChange: (v: string) => void; isTextArea?: boolean;
}) => (
    <div className="space-y-1.5">
        <Label className="text-sm font-semibold text-right block">{label}</Label>
        {isTextArea
            ? <Textarea value={value} onChange={e => onChange(e.target.value)} dir="rtl" className="text-right min-h-[100px]" />
            : <Input value={value} onChange={e => onChange(e.target.value)} dir="rtl" className="text-right" />
        }
    </div>
);

const UnifiedFieldEditor = ({ fieldConfig, onChange, onRemove }: { fieldConfig: any; onChange: (v: any) => void; onRemove?: () => void }) => {
    const [showAdvanced, setShowAdvanced] = useState(false);
    const field = fieldConfig as UnifiedFieldSchema;
    const hasOptions = ['radio', 'checkbox', 'select'].includes(field.fieldType || '');

    const handleOptionChange = (idx: number, val: string) => {
        const newOpts = [...(field.options || [])]; newOpts[idx] = val;
        const newCoding = generateCodingMap(newOpts);
        onChange({ ...fieldConfig, options: newOpts, codingMap: newCoding });
    };

    const handleTypeChange = (newType: FieldType) => {
        const converted = convertFieldType(field, newType);
        onChange(converted);
    };

    // Backward compat: if field has label but no text, use label
    const displayText = field.text || (fieldConfig as any).label || '';

    return (
        <div className="space-y-2 p-3 border rounded-lg bg-card relative group">
            {/* Row 1: Text + Type Badge + Controls */}
            <div className="flex gap-2 items-start">
                <div className="flex-1 space-y-1.5">
                    <Input value={displayText} onChange={e => onChange({ ...fieldConfig, text: e.target.value })} dir="rtl" className="text-right h-8 text-sm" placeholder="نص السؤال..." />
                </div>
                <div className="flex items-center gap-1 shrink-0">
                    <span className="text-xs">{FIELD_TYPE_INFO[field.fieldType || 'radio']?.icon}</span>
                    {onRemove && (
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-red-500" onClick={onRemove}>
                            <Trash2 size={12} />
                        </Button>
                    )}
                </div>
            </div>

            {/* Row 2: Type + Required + Advanced toggle */}
            <div className="flex flex-wrap gap-2 items-center">
                <Select value={field.fieldType || 'radio'} onValueChange={(v) => handleTypeChange(v as FieldType)}>
                    <SelectTrigger className="h-7 w-[130px] text-[11px]">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {(Object.entries(FIELD_TYPE_INFO) as [FieldType, { labelAr: string; icon: string }][]).map(([type, info]) => (
                            <SelectItem key={type} value={type} className="text-xs">
                                {info.icon} {info.labelAr}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <label className="flex items-center gap-1.5 text-[11px]">
                    <Switch checked={field.required !== false} onCheckedChange={v => onChange({ ...fieldConfig, required: v })} className="scale-[0.6]" />
                    مطلوب
                </label>

                <label className="flex items-center gap-1.5 text-[11px]">
                    <Switch checked={field.hidden || false} onCheckedChange={v => onChange({ ...fieldConfig, hidden: v })} className="scale-[0.6]" />
                    مخفي
                </label>

                <Button variant="ghost" size="sm" className="h-6 text-[10px] px-2 mr-auto" onClick={() => setShowAdvanced(!showAdvanced)}>
                    <Pencil size={10} className="ml-1" /> {showAdvanced ? 'إخفاء' : 'متقدم'}
                </Button>
            </div>

            {/* Summary badges — at-a-glance view of field config */}
            <div className="flex flex-wrap gap-1.5 items-center" dir="rtl">
                <span className={cn(
                    "text-[10px] px-1.5 py-0.5 rounded font-medium",
                    field.fieldType === 'text' ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300" :
                        field.fieldType === 'number' ? "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300" :
                            field.fieldType === 'date' ? "bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300" :
                                "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300"
                )}>
                    {FIELD_TYPE_INFO[field.fieldType || 'radio']?.icon} {FIELD_TYPE_INFO[field.fieldType || 'radio']?.labelAr}
                </span>
                {hasOptions && field.options && (
                    <>
                        <span className="text-[10px] text-muted-foreground">{field.options.length} خيارات:</span>
                        {field.options.slice(0, 4).map((opt: string, idx: number) => (
                            <span key={idx} className="text-[10px] bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-1.5 py-0.5 rounded">
                                {opt}
                            </span>
                        ))}
                        {field.options.length > 4 && (
                            <span className="text-[10px] text-muted-foreground">+{field.options.length - 4}</span>
                        )}
                    </>
                )}
                {field.fieldType === 'text' && field.placeholder && (
                    <span className="text-[10px] text-muted-foreground italic">📝 {field.placeholder}</span>
                )}
                {field.fieldType === 'number' && field.validation && (
                    <span className="text-[10px] text-muted-foreground">
                        🔢 {field.validation.min !== undefined ? `min: ${field.validation.min}` : ''} {field.validation.max !== undefined ? `max: ${field.validation.max}` : ''}
                    </span>
                )}
                {field.outputType && (
                    <span className="text-[10px] bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 px-1.5 py-0.5 rounded">
                        📊 {OUTPUT_TYPE_INFO[field.outputType]?.labelAr || field.outputType}
                    </span>
                )}
            </div>
            {hasOptions && field.options && (
                <div className="space-y-1.5">
                    <Label className="text-xs text-muted-foreground">الخيارات:</Label>
                    <div className="grid gap-1.5 pr-3 border-r-2">
                        {field.options.map((opt: string, idx: number) => (
                            <div key={idx} className="flex gap-1.5 items-center">
                                <span className="text-[10px] text-muted-foreground w-4 text-center font-mono">{(field.codingMap?.[opt]) || idx + 1}</span>
                                <Input value={opt} onChange={e => handleOptionChange(idx, e.target.value)} className="h-7 text-xs text-right flex-1" dir="rtl" />
                                <Button variant="ghost" size="icon" className="h-7 w-7 text-red-500"
                                    onClick={() => {
                                        const newOpts = field.options!.filter((_: any, i: number) => i !== idx);
                                        onChange({ ...fieldConfig, options: newOpts, codingMap: generateCodingMap(newOpts) });
                                    }}>
                                    <Trash2 size={12} />
                                </Button>
                            </div>
                        ))}
                        <Button variant="outline" size="sm" className="w-full h-7 text-xs border-dashed"
                            onClick={() => {
                                const newOpts = [...(field.options || []), ""];
                                onChange({ ...fieldConfig, options: newOpts, codingMap: generateCodingMap(newOpts) });
                            }}>
                            <Plus size={10} className="ml-1" /> إضافة خيار
                        </Button>
                    </div>
                </div>
            )}

            {/* Advanced panel */}
            {showAdvanced && (
                <div className="space-y-2 p-2 bg-muted/30 rounded border text-xs">
                    <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1">
                            <Label className="text-[10px] text-muted-foreground">نوع المخرج (Output Type)</Label>
                            <Select value={field.outputType || 'nominal'} onValueChange={(v) => onChange({ ...fieldConfig, outputType: v })}>
                                <SelectTrigger className="h-7 text-[11px]">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {(Object.entries(OUTPUT_TYPE_INFO) as [OutputType, { labelAr: string }][]).map(([type, info]) => (
                                        <SelectItem key={type} value={type} className="text-xs">{info.labelAr}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-1">
                            <Label className="text-[10px] text-muted-foreground">معرّف المتغير (ID)</Label>
                            <Input value={field.id || ''} onChange={e => onChange({ ...fieldConfig, id: e.target.value })} className="h-7 text-[11px] font-mono" />
                        </div>
                    </div>
                    {/* Validation rules */}
                    <div className="grid grid-cols-2 gap-2">
                        {(field.fieldType === 'text' || field.fieldType === 'number') && (
                            <>
                                <div className="space-y-1">
                                    <Label className="text-[10px] text-muted-foreground">{field.fieldType === 'number' ? 'الحد الأدنى' : 'أقل عدد أحرف'}</Label>
                                    <Input type="number" value={field.validation?.min ?? field.validation?.minLength ?? ''}
                                        onChange={e => onChange({ ...fieldConfig, validation: { ...field.validation, [field.fieldType === 'number' ? 'min' : 'minLength']: e.target.value ? Number(e.target.value) : undefined } })}
                                        className="h-7 text-[11px]" />
                                </div>
                                <div className="space-y-1">
                                    <Label className="text-[10px] text-muted-foreground">{field.fieldType === 'number' ? 'الحد الأقصى' : 'أكثر عدد أحرف'}</Label>
                                    <Input type="number" value={field.validation?.max ?? field.validation?.maxLength ?? ''}
                                        onChange={e => onChange({ ...fieldConfig, validation: { ...field.validation, [field.fieldType === 'number' ? 'max' : 'maxLength']: e.target.value ? Number(e.target.value) : undefined } })}
                                        className="h-7 text-[11px]" />
                                </div>
                            </>
                        )}
                    </div>
                    {/* Coding map preview */}
                    {field.codingMap && Object.keys(field.codingMap).length > 0 && (
                        <div className="space-y-1">
                            <Label className="text-[10px] text-muted-foreground">🔢 خريطة الترميز (Coding Map)</Label>
                            <div className="flex flex-wrap gap-1">
                                {Object.entries(field.codingMap).map(([label, code]) => (
                                    <span key={label} className="text-[10px] px-1.5 py-0.5 bg-card border rounded font-mono">{code}={label}</span>
                                ))}
                            </div>
                        </div>
                    )}
                    {/* Legacy key */}
                    {field.legacyKey && (
                        <div className="text-[10px] text-muted-foreground">مفتاح قديم: <code className="font-mono bg-card px-1 rounded">{field.legacyKey}</code></div>
                    )}
                </div>
            )}
        </div>
    );
};

// --- Research Quality Warnings ---
const QualityWarnings = ({ warnings }: { warnings: QualityWarning[] }) => {
    if (warnings.length === 0) return null;
    return (
        <div className="space-y-1.5">
            {warnings.map((w, i) => (
                <div key={i} className={`flex items-start gap-2 p-2 rounded text-xs ${w.severity === 'warning' ? 'bg-amber-50 text-amber-800 dark:bg-amber-950/30 dark:text-amber-400' :
                    w.severity === 'error' ? 'bg-red-50 text-red-800 dark:bg-red-950/30 dark:text-red-400' :
                        'bg-blue-50 text-blue-800 dark:bg-blue-950/30 dark:text-blue-400'}`}>
                    <AlertTriangle size={12} className="shrink-0 mt-0.5" />
                    <span>{w.message}</span>
                </div>
            ))}
        </div>
    );
};

// --- Main Component ---
const SurveyManagement = () => {
    const { toast } = useToast();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [config, setConfig] = useState<any>(DEFAULT_CONFIG);
    const [sectionOrder, setSectionOrder] = useState<SectionOrderEntry[]>(DEFAULT_SECTION_ORDER);

    useEffect(() => { loadConfig(); }, []);

    const loadConfig = async () => {
        setLoading(true);
        try {
            const docRef = doc(db, "system_settings", "survey_config");
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const fbData = docSnap.data();
                const mergedConfig = { ...DEFAULT_CONFIG, ...fbData };

                if (fbData.demographics?.fields) {
                    // Deep merge per field: DEFAULT schema props as fallback, Firestore overrides take priority
                    const mergedDemoFields: any = { ...DEFAULT_CONFIG.demographics.fields };
                    for (const [key, fbField] of Object.entries(fbData.demographics.fields)) {
                        mergedDemoFields[key] = { ...(mergedDemoFields[key] || {}), ...(fbField as any) };
                    }
                    mergedConfig.demographics.fields = mergedDemoFields;
                }
                if (fbData.healthIndicators?.fields) {
                    const mergedHealthFields: any = { ...DEFAULT_CONFIG.healthIndicators.fields };
                    for (const [key, fbField] of Object.entries(fbData.healthIndicators.fields)) {
                        mergedHealthFields[key] = { ...(mergedHealthFields[key] || {}), ...(fbField as any) };
                    }
                    mergedConfig.healthIndicators.fields = mergedHealthFields;
                }
                if (fbData.openQuestions) {
                    // Firestore-first: use saved questions directly as source of truth
                    // This prevents deleted questions from re-appearing from DEFAULT_CONFIG
                    mergedConfig.openQuestions = fbData.openQuestions;
                }

                // Load section order from Firestore or use defaults
                if (fbData.sectionOrder) {
                    setSectionOrder(fbData.sectionOrder);
                }

                setConfig(mergedConfig);
            }
        } catch (error) {
            console.error("Error loading config:", error);
            toast({ variant: "destructive", title: "خطأ", description: "فشل تحميل إعدادات الاستبيان" });
        } finally { setLoading(false); }
    };

    const sanitizeForFirestore = (obj: any): any => {
        if (obj === null || obj === undefined) return null;
        if (typeof obj === 'function' || typeof obj === 'symbol') return null;
        if (typeof obj !== 'object') return obj;
        if (Array.isArray(obj)) return obj.map(sanitizeForFirestore);
        const cleaned: any = {};
        for (const [key, value] of Object.entries(obj)) {
            if (value !== undefined && typeof value !== 'function' && typeof value !== 'symbol') {
                cleaned[key] = sanitizeForFirestore(value);
            }
        }
        return cleaned;
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const docRef = doc(db, "system_settings", "survey_config");
            const configWithOrder = { ...config, sectionOrder: reindexSectionOrder(sectionOrder) };
            const sanitizedConfig = sanitizeForFirestore(JSON.parse(JSON.stringify(configWithOrder)));
            await setDoc(docRef, sanitizedConfig);
            toast({ title: "تم الحفظ", description: "تم تحديث الاستبيان بنجاح", className: "bg-green-600 text-white border-none" });
        } catch (error: any) {
            console.error("Error saving config:", error);
            toast({ variant: "destructive", title: "خطأ في الحفظ", description: error?.message || "حدث خطأ أثناء حفظ التغييرات" });
        } finally { setSaving(false); }
    };

    // --- Section Reorder Handlers ---
    const handleMoveSection = (fromIndex: number, direction: 'up' | 'down') => {
        const toIndex = direction === 'up' ? fromIndex - 1 : fromIndex + 1;
        if (toIndex < 0 || toIndex >= sectionOrder.length) return;

        // Check locked constraints before moving
        const section = sectionOrder[fromIndex];
        const target = sectionOrder[toIndex];
        if (section.is_locked && section.locked_reorderable === false) {
            toast({ variant: "destructive", title: "غير مسموح", description: `قسم "${section.titleAr}" مقفل ولا يمكن تغيير ترتيبه.` });
            return;
        }
        if (target.is_locked && target.locked_reorderable === false) {
            toast({ variant: "destructive", title: "غير مسموح", description: `لا يمكن تجاوز قسم "${target.titleAr}" لأنه مقفل.` });
            return;
        }

        const newOrder = reindexSectionOrder(reorderItems(sectionOrder, fromIndex, toIndex));

        // Validate constraints
        const { errors, warnings } = validateSectionOrder(newOrder);
        if (errors.length > 0) {
            toast({ variant: "destructive", title: "ترتيب غير صالح", description: errors[0] });
            return;
        }
        if (warnings.length > 0) {
            toast({ title: "⚠️ تنبيه", description: warnings[0] });
        }

        setSectionOrder(newOrder);
    };

    // --- Question Reorder within arrays ---
    const handleMoveQuestion = (path: string, fromIndex: number, direction: 'up' | 'down') => {
        const toIndex = direction === 'up' ? fromIndex - 1 : fromIndex + 1;
        setConfig((prev: any) => {
            const newConfig = JSON.parse(JSON.stringify(prev));
            const pathParts = path.split('.');
            let current = newConfig;
            for (const part of pathParts) current = current[part];

            if (toIndex < 0 || toIndex >= current.length) return prev;
            const reordered = reorderItems(current, fromIndex, toIndex);
            // Write back
            let parent = newConfig;
            for (let i = 0; i < pathParts.length - 1; i++) parent = parent[pathParts[i]];
            parent[pathParts[pathParts.length - 1]] = reordered;
            return newConfig;
        });
    };

    const updateSection = (path: string, newValue: any) => {
        setConfig((prev: any) => {
            const newConfig = JSON.parse(JSON.stringify(prev));
            const pathParts = path.split('.');
            let current = newConfig;
            for (let i = 0; i < pathParts.length - 1; i++) current = current[pathParts[i]];
            current[pathParts[pathParts.length - 1]] = newValue;
            return newConfig;
        });
    };

    const handleQuestionChange = (path: string, index: number, updates: Partial<SurveyQuestion>) => {
        setConfig((prev: any) => {
            const newConfig = JSON.parse(JSON.stringify(prev));
            const pathParts = path.split('.');
            let questions = newConfig;
            for (const part of pathParts) questions = questions[part];
            questions[index] = { ...questions[index], ...updates };
            // Clean up undefined customLabels
            if (updates.customLabels === undefined) delete questions[index].customLabels;
            return newConfig;
        });
    };

    const handleAddQuestion = (path: string, type: QuestionType = 'likert') => {
        setConfig((prev: any) => {
            const newConfig = JSON.parse(JSON.stringify(prev));
            const pathParts = path.split('.');
            let current = newConfig;
            for (const part of pathParts) current = current[part];
            current.push(createDefaultQuestion({ type }));
            return newConfig;
        });
    };

    const handleRemoveQuestion = (path: string, index: number) => {
        setConfig((prev: any) => {
            const newConfig = JSON.parse(JSON.stringify(prev));
            const pathParts = path.split('.');
            let current = newConfig;
            for (const part of pathParts) current = current[part];
            current.splice(index, 1);
            return newConfig;
        });
    };

    const addSectionField = (path: string) => {
        setConfig((prev: any) => {
            const newConfig = JSON.parse(JSON.stringify(prev));
            const pathParts = path.split('.');
            let current = newConfig;
            for (const part of pathParts) current = current[part];

            const newKey = `custom_${Date.now()}`;
            current[newKey] = createDefaultField({
                id: newKey,
                text: 'سؤال جديد',
                fieldType: 'radio',
                required: false,
                order: Object.keys(current).length,
            });
            return newConfig;
        });
    };

    const removeSectionField = (path: string, keyToRemove: string) => {
        setConfig((prev: any) => {
            const newConfig = JSON.parse(JSON.stringify(prev));
            const pathParts = path.split('.');
            let current = newConfig;
            for (const part of pathParts) current = current[part];

            delete current[keyToRemove];
            return newConfig;
        });
    };

    // Research quality warnings
    const allWarnings = useMemo(() => {
        if (!config.researchMode) return [];
        const sections = [
            { key: 'knowledge', questions: config.knowledge },
            { key: 'practices', questions: config.practices },
            { key: 'satisfaction', questions: config.satisfaction },
            { key: 'behavioralIntent', questions: config.behavioralIntent },
        ];
        return sections.flatMap(s => validateResearchQuality(s.questions || [], s.key));
    }, [config]);

    // Render question section
    const renderQuestionSection = (titleKey: string, questionsPath: string, questions: any[]) => (
        <div className="space-y-3">
            <SimpleFieldEditor label="عنوان القسم" value={config.sectionTitles?.[titleKey] || ""}
                onChange={v => updateSection(`sectionTitles.${titleKey}`, v)} />

            {config.researchMode && (
                <QualityWarnings warnings={validateResearchQuality(questions || [], titleKey)} />
            )}

            <div className="space-y-2">
                {(questions || []).map((q: any, i: number) => (
                    <QuestionEditor key={q.id} index={i} question={q}
                        onChange={updates => handleQuestionChange(questionsPath, i, updates)}
                        onRemove={() => handleRemoveQuestion(questionsPath, i)}
                        globalLabels={config.likertLabels || DEFAULT_CONFIG.likertLabels}
                        researchMode={config.researchMode}
                    />
                ))}
            </div>
            <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleAddQuestion(questionsPath, 'likert')} className="flex-1 border-dashed">
                    <Plus size={14} className="ml-1" /> سؤال ليكرت
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleAddQuestion(questionsPath, 'nps')} className="border-dashed">
                    <Plus size={14} className="ml-1" /> NPS
                </Button>
            </div>
        </div>
    );

    if (loading) {
        return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin" /></div>;
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-8" dir="rtl">
            <div className="max-w-4xl mx-auto space-y-4">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center sticky top-0 z-20 bg-slate-50/95 dark:bg-slate-950/95 backdrop-blur py-4 -mx-4 px-4 md:-mx-8 md:px-8 border-b gap-3">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">إدارة الاستبيان</h1>
                        <p className="text-sm text-muted-foreground">محرك مقاييس ديناميكي • تحكم كامل بالأسئلة والإجابات</p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <label className="flex items-center gap-2 text-xs px-3 py-1.5 border rounded-lg bg-card">
                            <Switch checked={config.researchMode || false} onCheckedChange={v => setConfig((p: any) => ({ ...p, researchMode: v }))} className="scale-75" />
                            <AlertTriangle size={12} /> وضع البحث العلمي
                        </label>
                        <Button variant="outline" size="sm" onClick={loadConfig} disabled={saving}>
                            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
                        </Button>
                        <Button onClick={handleSave} disabled={saving} size="sm">
                            {saving ? <Loader2 size={14} className="animate-spin ml-1" /> : <Save size={14} className="ml-1" />}
                            حفظ
                        </Button>
                    </div>
                </div>

                {/* Research Mode Warnings */}
                {config.researchMode && allWarnings.length > 0 && (
                    <Card className="border-amber-200 bg-amber-50/50 dark:bg-amber-950/10">
                        <CardContent className="p-4">
                            <h4 className="font-semibold text-sm mb-2 text-amber-800 dark:text-amber-400">⚠️ تنبيهات الجودة البحثية ({allWarnings.length})</h4>
                            <QualityWarnings warnings={allWarnings} />
                        </CardContent>
                    </Card>
                )}

                {/* Section Reorder Panel */}
                <AccordionSection title="🔀 ترتيب أقسام الاستبيان">
                    <p className="text-xs text-muted-foreground mb-3">اسحب أو استخدم الأسهم لإعادة ترتيب أقسام الاستبيان. الأقسام المقفلة لا يمكن نقلها.</p>
                    <div className="space-y-1">
                        {sectionOrder.map((section, idx) => {
                            const isLocked = section.is_locked && section.locked_reorderable === false;
                            return (
                                <div key={section.id}
                                    className={`flex items-center gap-2 p-2.5 rounded-lg border transition-colors ${isLocked ? 'bg-slate-100 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700' : 'bg-card hover:bg-accent/30 border-border'
                                        }`}
                                >
                                    <div className="flex flex-col gap-0.5 shrink-0">
                                        <Button variant="ghost" size="icon" className="h-5 w-5" disabled={idx === 0 || isLocked}
                                            onClick={() => handleMoveSection(idx, 'up')}>
                                            <ChevronUp size={12} />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-5 w-5" disabled={idx === sectionOrder.length - 1 || isLocked}
                                            onClick={() => handleMoveSection(idx, 'down')}>
                                            <ChevronDown size={12} />
                                        </Button>
                                    </div>
                                    <span className="text-xs text-muted-foreground font-mono w-5 text-center shrink-0">{idx + 1}</span>
                                    {isLocked && <Lock size={12} className="text-amber-500 shrink-0" />}
                                    <span className="text-sm flex-1">{section.icon} {section.titleAr}</span>
                                    {isLocked && <span className="text-[10px] bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 px-1.5 py-0.5 rounded">مقفل</span>}
                                </div>
                            );
                        })}
                    </div>
                </AccordionSection>

                {/* 1. Meta — always first, not in sectionOrder */}
                <AccordionSection title="📋 بيانات الاستبيان الأساسية" defaultOpen>
                    <SimpleFieldEditor label="عنوان الاستبيان" value={config.meta?.title || ""} onChange={v => updateSection('meta.title', v)} />
                    <SimpleFieldEditor label="العنوان الفرعي" value={config.meta?.subtitle || ""} onChange={v => updateSection('meta.subtitle', v)} />
                    <SimpleFieldEditor label="اسم المؤسسة/الكلية" value={config.meta?.institution || ""} onChange={v => updateSection('meta.institution', v)} />
                </AccordionSection>

                {/* Render sections in configured order */}
                {sectionOrder.map(section => {
                    switch (section.id) {
                        case 'consent':
                            return (
                                <AccordionSection key="consent" title="✅ نموذج الموافقة">
                                    <SimpleFieldEditor label="عنوان الموافقة" value={config.consent?.title || ""} onChange={v => updateSection('consent.title', v)} />
                                    <SimpleFieldEditor isTextArea label="نص الموافقة" value={config.consent?.text || ""} onChange={v => updateSection('consent.text', v)} />
                                    <SimpleFieldEditor label="نص زر الموافقة" value={config.consent?.agreeLabel || ""} onChange={v => updateSection('consent.agreeLabel', v)} />
                                </AccordionSection>
                            );
                        case 'demographics':
                            return (
                                <AccordionSection key="demographics" title="👤 البيانات الديموغرافية">
                                    <SimpleFieldEditor label="عنوان القسم" value={config.demographics?.title || ""} onChange={v => updateSection('demographics.title', v)} />
                                    <div className="space-y-3">
                                        {Object.entries(config.demographics?.fields || {}).map(([key, fieldConfig]: [string, any]) => (
                                            <UnifiedFieldEditor key={key} fieldConfig={fieldConfig}
                                                onChange={(newField: any) => updateSection(`demographics.fields.${key}`, newField)}
                                                onRemove={() => removeSectionField('demographics.fields', key)}
                                            />
                                        ))}
                                    </div>
                                    <Button variant="outline" size="sm" className="w-full mt-3 border-dashed" onClick={() => addSectionField('demographics.fields')}>
                                        <Plus size={14} className="ml-1" /> إضافة حقل جديد للبيانات الديموغرافية
                                    </Button>
                                </AccordionSection>
                            );
                        case 'healthIndicators':
                            return (
                                <AccordionSection key="healthIndicators" title="🏥 المؤشرات الصحية">
                                    <SimpleFieldEditor label="عنوان القسم" value={config.healthIndicators?.title || ""} onChange={v => updateSection('healthIndicators.title', v)} />
                                    <div className="space-y-3">
                                        {Object.entries(config.healthIndicators?.fields || {}).map(([key, fieldConfig]: [string, any]) => (
                                            <UnifiedFieldEditor key={key} fieldConfig={fieldConfig}
                                                onChange={(newField: any) => updateSection(`healthIndicators.fields.${key}`, newField)}
                                                onRemove={() => removeSectionField('healthIndicators.fields', key)}
                                            />
                                        ))}
                                    </div>
                                    <Button variant="outline" size="sm" className="w-full mt-3 border-dashed" onClick={() => addSectionField('healthIndicators.fields')}>
                                        <Plus size={14} className="ml-1" /> إضافة حقل جديد للمؤشرات الصحية
                                    </Button>
                                </AccordionSection>
                            );
                        case 'knowledge':
                            return (
                                <AccordionSection key="knowledge" title="📖 المعرفة الغذائية">
                                    {renderQuestionSection('knowledge', 'knowledge', config.knowledge || [])}
                                </AccordionSection>
                            );
                        case 'practices':
                            return (
                                <AccordionSection key="practices" title="🍽️ الممارسات الغذائية">
                                    {renderQuestionSection('practices', 'practices', config.practices || [])}
                                </AccordionSection>
                            );
                        case 'intervention':
                            return (
                                <AccordionSection key="intervention" title="📚 التدخل (قصص ومنصة)">
                                    <div className="space-y-6">
                                        <div className="space-y-3">
                                            <h4 className="font-semibold text-sm border-b pb-2">القصص القصيرة المصورة</h4>
                                            {renderQuestionSection('stories', 'intervention.stories', config.intervention?.stories || [])}
                                        </div>
                                        <div className="space-y-3">
                                            <h4 className="font-semibold text-sm border-b pb-2">المنصة - قابلية الاستخدام</h4>
                                            {renderQuestionSection('usability', 'intervention.platform.usability', config.intervention?.platform?.usability || [])}
                                        </div>
                                        <div className="space-y-3">
                                            <h4 className="font-semibold text-sm border-b pb-2">المنصة - جودة المحتوى</h4>
                                            {renderQuestionSection('content', 'intervention.platform.content', config.intervention?.platform?.content || [])}
                                        </div>
                                        <div className="space-y-3">
                                            <h4 className="font-semibold text-sm border-b pb-2">المنصة - الأدوات</h4>
                                            {renderQuestionSection('tools', 'intervention.platform.tools', config.intervention?.platform?.tools || [])}
                                        </div>
                                        <div className="space-y-3">
                                            <h4 className="font-semibold text-sm border-b pb-2">المنصة - الاستشارات</h4>
                                            {renderQuestionSection('consultation', 'intervention.platform.consultation', config.intervention?.platform?.consultation || [])}
                                        </div>
                                    </div>
                                </AccordionSection>
                            );
                        case 'satisfaction':
                            return (
                                <AccordionSection key="satisfaction" title="⭐ الرضا العام">
                                    {renderQuestionSection('satisfaction', 'satisfaction', config.satisfaction || [])}
                                </AccordionSection>
                            );
                        case 'behavioralIntent':
                            return (
                                <AccordionSection key="behavioralIntent" title="🎯 الأثر السلوكي">
                                    {renderQuestionSection('behavioralIntent', 'behavioralIntent', config.behavioralIntent || [])}
                                </AccordionSection>
                            );
                        case 'nps':
                            return (
                                <AccordionSection key="nps" title="📈 صافي نقاط الترويج (NPS)">
                                    <p className="text-xs text-muted-foreground">سؤال NPS يُحسب تلقائيًا: Promoters (9-10) / Passives (7-8) / Detractors (0-6)</p>
                                    <SimpleFieldEditor label="نص السؤال" value={config.npsQuestion?.text || ""}
                                        onChange={v => updateSection('npsQuestion.text', v)} />
                                    <ScalePreview question={{ id: 'nps', text: '', type: 'nps' }} />
                                </AccordionSection>
                            );
                        case 'retrospective':
                            return (
                                <AccordionSection key="retrospective" title="📊 التقييم الارتجاعي">
                                    <div className="space-y-3">
                                        <SimpleFieldEditor label="عنوان القسم" value={config.retrospectiveConfig?.title || ""} onChange={v => updateSection('retrospectiveConfig.title', v)} />
                                        <SimpleFieldEditor label="وصف القسم" value={config.retrospectiveConfig?.description || ""} onChange={v => updateSection('retrospectiveConfig.description', v)} />

                                        <div className="space-y-1">
                                            <Label className="text-sm font-semibold">نوع التقييم</Label>
                                            <Select value={config.retrospectiveConfig?.mode || "slider"} onValueChange={v => updateSection('retrospectiveConfig.mode', v)}>
                                                <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="slider">🎚️ شريط تمرير رقمي (1–10)</SelectItem>
                                                    <SelectItem value="mcq">☑️ خيارات تقليدية (منخفض/متوسط/عالٍ)</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <SimpleFieldEditor label="عنوان فرعي - المعرفة" value={config.retrospectiveConfig?.knowledgeTitle || ""} onChange={v => updateSection('retrospectiveConfig.knowledgeTitle', v)} />
                                        <SimpleFieldEditor label="عنوان فرعي - الممارسات" value={config.retrospectiveConfig?.practicesTitle || ""} onChange={v => updateSection('retrospectiveConfig.practicesTitle', v)} />
                                        <SimpleFieldEditor label="عنوان: قبل المشروع" value={config.retrospectiveConfig?.beforeLabel || ""} onChange={v => updateSection('retrospectiveConfig.beforeLabel', v)} />
                                        <SimpleFieldEditor label="عنوان: بعد المشروع" value={config.retrospectiveConfig?.afterLabel || ""} onChange={v => updateSection('retrospectiveConfig.afterLabel', v)} />

                                        {config.retrospectiveConfig?.mode === 'mcq' && (
                                            <div className="space-y-1.5">
                                                <Label className="text-sm font-semibold">خيارات التقييم</Label>
                                                <div className="grid gap-1.5 pr-3 border-r-2">
                                                    {(config.retrospectiveConfig?.options || []).map((opt: string, idx: number) => (
                                                        <div key={idx} className="flex gap-1.5">
                                                            <Input value={opt} className="h-7 text-xs text-right" dir="rtl"
                                                                onChange={e => {
                                                                    const newOpts = [...config.retrospectiveConfig.options]; newOpts[idx] = e.target.value;
                                                                    updateSection('retrospectiveConfig.options', newOpts);
                                                                }} />
                                                            <Button variant="ghost" size="icon" className="h-7 w-7 text-red-500"
                                                                onClick={() => updateSection('retrospectiveConfig.options', config.retrospectiveConfig.options.filter((_: any, i: number) => i !== idx))}>
                                                                <Trash2 size={12} />
                                                            </Button>
                                                        </div>
                                                    ))}
                                                    <Button variant="outline" size="sm" className="w-full h-7 text-xs border-dashed"
                                                        onClick={() => updateSection('retrospectiveConfig.options', [...(config.retrospectiveConfig?.options || []), ""])}>
                                                        <Plus size={10} className="ml-1" /> إضافة خيار
                                                    </Button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </AccordionSection>
                            );
                        case 'openQuestions':
                            return (
                                <AccordionSection key="openQuestions" title="💬 الأسئلة المفتوحة">
                                    <SimpleFieldEditor label="عنوان القسم" value={config.sectionTitles?.openQuestions || ""}
                                        onChange={v => updateSection('sectionTitles.openQuestions', v)} />
                                    <div className="space-y-2">
                                        {(config.openQuestions || []).map((q: any, i: number) => (
                                            <div key={q.id} className="flex gap-2 items-center border rounded-lg p-2">
                                                <div className="flex flex-col gap-0.5 shrink-0">
                                                    <Button variant="ghost" size="icon" className="h-4 w-4" disabled={i === 0}
                                                        onClick={() => handleMoveQuestion('openQuestions', i, 'up')}>
                                                        <ChevronUp size={10} />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" className="h-4 w-4" disabled={i === (config.openQuestions?.length || 0) - 1}
                                                        onClick={() => handleMoveQuestion('openQuestions', i, 'down')}>
                                                        <ChevronDown size={10} />
                                                    </Button>
                                                </div>
                                                <span className="text-xs text-muted-foreground font-mono shrink-0 w-6 text-center">{i + 1}</span>
                                                <Input value={q.text} className="flex-1 h-8 text-sm text-right" dir="rtl"
                                                    onChange={e => handleQuestionChange('openQuestions', i, { text: e.target.value })} />
                                                <Button variant="ghost" size="icon" className="h-7 w-7 text-red-500"
                                                    onClick={() => handleRemoveQuestion('openQuestions', i)}>
                                                    <Trash2 size={12} />
                                                </Button>
                                            </div>
                                        ))}
                                        <Button variant="outline" size="sm" onClick={() => handleAddQuestion('openQuestions')} className="w-full border-dashed">
                                            <Plus size={14} className="ml-1" /> إضافة سؤال مفتوح
                                        </Button>
                                    </div>
                                </AccordionSection>
                            );
                        default:
                            return null;
                    }
                })}

                {/* 13. Global Settings */}
                <AccordionSection title="⚙️ إعدادات عامة">
                    <div className="space-y-6">
                        <div className="space-y-3">
                            <h4 className="font-semibold text-sm border-b pb-2">الإجابات الافتراضية (مقياس ليكرت)</h4>
                            <p className="text-xs text-muted-foreground">تُستخدم عندما لا يكون للسؤال مقياس أو إجابات مخصصة.</p>
                            <div className="grid md:grid-cols-5 gap-3">
                                {["1", "2", "3", "4", "5"].map(key => (
                                    <div key={key} className="space-y-0.5">
                                        <Label className="text-xs text-muted-foreground">الدرجة {key}</Label>
                                        <Input value={config.likertLabels?.[key] || ""} className="h-8 text-xs text-right" dir="rtl"
                                            onChange={e => setConfig((prev: any) => ({
                                                ...prev, likertLabels: { ...prev.likertLabels, [key]: e.target.value }
                                            }))} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <h4 className="font-semibold text-sm border-b pb-2">عناوين أقسام الاستبيان العام</h4>
                            {[
                                { key: "consent", label: "قسم الموافقة" },
                                { key: "demographics", label: "قسم البيانات الديموغرافية" },
                                { key: "health", label: "قسم المؤشرات الصحية" },
                                { key: "knowledge", label: "قسم المعرفة الغذائية" },
                                { key: "practices", label: "قسم الممارسات الغذائية" },
                                { key: "intervention", label: "قسم التدخل" },
                                { key: "satisfaction", label: "قسم الرضا العام" },
                                { key: "behavioral", label: "قسم الأثر السلوكي" },
                                { key: "retrospective", label: "قسم التقييم الارتجاعي" },
                                { key: "open", label: "قسم الأسئلة المفتوحة" },
                            ].map(({ key, label }) => (
                                <SimpleFieldEditor key={key} label={label} value={config.formSectionHeaders?.[key] || ""}
                                    onChange={v => setConfig((prev: any) => ({
                                        ...prev, formSectionHeaders: { ...prev.formSectionHeaders, [key]: v }
                                    }))} />
                            ))}
                        </div>
                    </div>
                </AccordionSection>

            </div>
        </div>
    );
};

export default SurveyManagement;
