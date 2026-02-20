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
import { Loader2, Plus, Trash2, Save, RefreshCw, ChevronDown, Pencil, AlertTriangle, Lightbulb, ArrowUpDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
    SCALE_PRESETS, QUESTION_TYPE_INFO, getScaleIcons,
    suggestScaleType, validateResearchQuality, getQuestionLabels, createDefaultQuestion,
    type ScaleType, type ScaleLength, type QuestionType, type SurveyQuestion, type QualityWarning
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
            healthIssues: { label: "8. هل يعاني الطفل من أي مشاكل صحية؟ (يمكن اختيار أكثر من إجابة)", options: ["فقر دم (أنيميا)", "نقص فيتامين D", "سكري الأطفال", "حساسية طعام", "لا يعاني من أي مشاكل", "لا أعلم", "لا توجد تشخيصات طبية رسمية", "أخرى"] },
            infoSources: { label: "9. مصادر معلوماتكم حول تغذية الأطفال", options: ["الأطباء", "الإنترنت", "المدرسة", "الأهل والأصدقاء", "وسائل التواصل الاجتماعي", "أخرى"] }
        }
    },
    knowledge: [
        { id: "q1", text: "أعلم أن سوء التغذية يشمل نقص العناصر وليس فقط نقص الوزن", type: "likert", scaleType: "agreement", scaleLength: 5 },
        { id: "q2", text: "أعلم أن الغذاء الصحي يجب أن يحتوي على الخضروات والفواكه يومياً", type: "likert", scaleType: "agreement", scaleLength: 5 },
        { id: "q3", text: "أعلم أن الإفراط في الوجبات السريعة يضر بصحة الطفل", type: "likert", scaleType: "agreement", scaleLength: 5 },
        { id: "q4", text: "أعلم علامات سوء التغذية مثل الإرهاق وضعف التركيز", type: "likert", scaleType: "agreement", scaleLength: 5 },
    ],
    practices: [
        { id: "q1", text: "أحرص على توفر الخضروات والفواكه في غذاء طفلي", type: "likert", scaleType: "frequency", scaleLength: 5 },
        { id: "q2", text: "أراقب استهلاك طفلي للحلويات والسكريات والمشروبات الغازية", type: "likert", scaleType: "frequency", scaleLength: 5 },
        { id: "q3", text: "نادرًا ما نتناول الوجبات السريعة في المنزل", type: "likert", scaleType: "frequency", scaleLength: 5 },
        { id: "q4", text: "أشجع طفلي على شرب الماء بانتظام", type: "likert", scaleType: "frequency", scaleLength: 5 },
        { id: "q5", text: "أقوم بقراءة البطاقة الغذائية (المكونات) قبل شراء المنتجات للطفل", type: "likert", scaleType: "frequency", scaleLength: 5 },
        { id: "q6", text: "أحرص على تقديم وجبة الإفطار لطفلي قبل الذهاب إلى المدرسة", type: "likert", scaleType: "frequency", scaleLength: 5 },
        { id: "q7", text: "أجد صعوبة في تقديم أغذية صحية بسبب تكلفتها المالية", type: "likert", scaleType: "frequency", scaleLength: 5, reverseScored: true },
    ],
    intervention: {
        stories: [
            { id: "q1", text: "كانت القصص جذابة بصرياً", type: "likert", scaleType: "agreement", scaleLength: 5 },
            { id: "q2", text: "كانت اللغة والمفاهيم مناسبة لعمر طفلي ويسهل عليه فهمها", type: "likert", scaleType: "agreement", scaleLength: 5 },
            { id: "q3", text: "المعلومات المقدمة ساهمت في تغيير مفاهيم خاطئة لدي أو لدى طفلي", type: "likert", scaleType: "agreement", scaleLength: 5 },
            { id: "q4", text: "نقلت القصة رسائل توعوية مفيدة حول التغذية الصحية", type: "likert", scaleType: "agreement", scaleLength: 5 },
            { id: "q5", text: "شجعت القصص طفلي على الاهتمام بالطعام الصحي", type: "likert", scaleType: "agreement", scaleLength: 5 },
        ],
        platform: {
            usability: [
                { id: "q1", text: "كان الدخول إلى المنصة عبر QR سهلاً", type: "likert", scaleType: "satisfaction", scaleLength: 5 },
                { id: "q2", text: "كانت المنصة سهلة الاستخدام والتنقل بين أقسامها", type: "likert", scaleType: "satisfaction", scaleLength: 5 },
            ],
            content: [
                { id: "q1", text: "كانت المعلومات المقدمة موثوقة ومفيدة", type: "likert", scaleType: "quality", scaleLength: 5 },
                { id: "q2", text: "كانت خطط الوجبات والأفكار المقترحة واقعية وقابلة للتطبيق", type: "likert", scaleType: "quality", scaleLength: 5 },
            ],
            tools: [
                { id: "q1", text: "كانت أدوات التقييم سهلة الفهم والاستخدام", type: "likert", scaleType: "satisfaction", scaleLength: 5 },
                { id: "q2", text: "ساعدتني نتائج التقييم على فهم حالة طفلي الغذائية", type: "likert", scaleType: "agreement", scaleLength: 5 },
            ],
            consultation: [
                { id: "q1", text: "كانت وسائل التواصل واضحة ومفهومة", type: "likert", scaleType: "agreement", scaleLength: 5 },
                { id: "q2", text: "شعرت بالاطمئنان لإمكانية طلب الاستشارة الغذائية", type: "likert", scaleType: "agreement", scaleLength: 5 },
            ]
        }
    },
    satisfaction: [
        { id: "q1", text: "أنا راضٍ بشكل عام عن المشروع", type: "likert", scaleType: "satisfaction", scaleLength: 5 },
        { id: "q2", text: "أنصح غيري بالاطلاع على المنصة", type: "likert", scaleType: "agreement", scaleLength: 5 },
    ],
    behavioralIntent: [
        { id: "q1", text: "أنوي تطبيق تغييرات غذائية داخل المنزل", type: "likert", scaleType: "agreement", scaleLength: 5 },
        { id: "q2", text: "أنوي تقليل الوجبات السريعة والحلويات", type: "likert", scaleType: "agreement", scaleLength: 5 },
        { id: "q3", text: "أنوي تشجيع طفلي على تناول الخضروات والفواكه", type: "likert", scaleType: "agreement", scaleLength: 5 },
        { id: "q4", text: "أنوي استخدام المنصة بانتظام", type: "likert", scaleType: "agreement", scaleLength: 5 },
        { id: "q5", text: "كانت خطط الوجبات والأفكار المقترحة واقعية وقابلة للتطبيق", type: "likert", scaleType: "agreement", scaleLength: 5 },
    ],
    npsQuestion: { id: "nps1", text: "ما مدى احتمال أن توصي بمنصة NutriAware لصديق أو فرد من عائلتك؟", type: "nps" as QuestionType },
    openQuestions: [
        { id: "likedMost", text: "1. ما أكثر ما أعجبك في المشروع؟" },
        { id: "challenges", text: "2. ما التحديات التي تمنع تطبيق العادات الغذائية الصحية؟" },
        { id: "suggestions", text: "3. اقتراحات للتحسين:" },
    ],
    sectionTitles: {
        knowledge: "المعرفة الغذائية للوالدين",
        practices: "الممارسات الغذائية داخل المنزل",
        intervention: "القسم الثالث: التدخل (قصص ومنصة NutriAware)",
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
        title: "القسم السابع: تقييم ارتجاعي (Retrospective Self-assessment)",
        description: "يرجى تقييم حالتك قبل المشروع وحالتك بعد المشروع",
        mode: "slider" as "slider" | "mcq",
        knowledgeTitle: "معرفتي بتغذية الأطفال",
        practicesTitle: "ممارساتي الغذائية في المنزل",
        beforeLabel: "قبل المشروع",
        afterLabel: "بعد المشروع",
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
        retrospective: "القسم الثامن: تقييم ارتجاعي",
        open: "القسم التاسع: أسئلة مفتوحة"
    },
    researchMode: false,
    customTemplates: [] as Array<{ id: string; name: string; labels: Record<string, string>; scaleLength: number }>,
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

const OptionsEditor = ({ fieldConfig, onChange }: { fieldConfig: any; onChange: (v: any) => void }) => {
    const handleOptionChange = (idx: number, val: string) => {
        const newOpts = [...fieldConfig.options]; newOpts[idx] = val;
        onChange({ ...fieldConfig, options: newOpts });
    };
    return (
        <div className="space-y-2 p-3 border rounded-lg">
            <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">عنوان الحقل:</Label>
                <Input value={fieldConfig.label} onChange={e => onChange({ ...fieldConfig, label: e.target.value })} dir="rtl" className="text-right h-8 text-sm" />
            </div>
            {fieldConfig.options && (
                <div className="space-y-1.5">
                    <Label className="text-xs text-muted-foreground">الخيارات:</Label>
                    <div className="grid gap-1.5 pr-3 border-r-2">
                        {fieldConfig.options.map((opt: string, idx: number) => (
                            <div key={idx} className="flex gap-1.5">
                                <Input value={opt} onChange={e => handleOptionChange(idx, e.target.value)} className="h-7 text-xs text-right" dir="rtl" />
                                <Button variant="ghost" size="icon" className="h-7 w-7 text-red-500"
                                    onClick={() => onChange({ ...fieldConfig, options: fieldConfig.options.filter((_: any, i: number) => i !== idx) })}>
                                    <Trash2 size={12} />
                                </Button>
                            </div>
                        ))}
                        <Button variant="outline" size="sm" className="w-full h-7 text-xs border-dashed"
                            onClick={() => onChange({ ...fieldConfig, options: [...fieldConfig.options, ""] })}>
                            <Plus size={10} className="ml-1" /> إضافة خيار
                        </Button>
                    </div>
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

    useEffect(() => { loadConfig(); }, []);

    const loadConfig = async () => {
        setLoading(true);
        try {
            const docRef = doc(db, "system_settings", "survey_config");
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setConfig({ ...DEFAULT_CONFIG, ...docSnap.data() });
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
            const sanitizedConfig = sanitizeForFirestore(JSON.parse(JSON.stringify(config)));
            await setDoc(docRef, sanitizedConfig);
            toast({ title: "تم الحفظ", description: "تم تحديث الاستبيان بنجاح", className: "bg-green-600 text-white border-none" });
        } catch (error: any) {
            console.error("Error saving config:", error);
            toast({ variant: "destructive", title: "خطأ في الحفظ", description: error?.message || "حدث خطأ أثناء حفظ التغييرات" });
        } finally { setSaving(false); }
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

                {/* 1. Meta */}
                <AccordionSection title="📋 بيانات الاستبيان الأساسية" defaultOpen>
                    <SimpleFieldEditor label="عنوان الاستبيان" value={config.meta?.title || ""} onChange={v => updateSection('meta.title', v)} />
                    <SimpleFieldEditor label="العنوان الفرعي" value={config.meta?.subtitle || ""} onChange={v => updateSection('meta.subtitle', v)} />
                    <SimpleFieldEditor label="اسم المؤسسة/الكلية" value={config.meta?.institution || ""} onChange={v => updateSection('meta.institution', v)} />
                </AccordionSection>

                {/* 2. Consent */}
                <AccordionSection title="✅ نموذج الموافقة">
                    <SimpleFieldEditor label="عنوان الموافقة" value={config.consent?.title || ""} onChange={v => updateSection('consent.title', v)} />
                    <SimpleFieldEditor isTextArea label="نص الموافقة" value={config.consent?.text || ""} onChange={v => updateSection('consent.text', v)} />
                    <SimpleFieldEditor label="نص زر الموافقة" value={config.consent?.agreeLabel || ""} onChange={v => updateSection('consent.agreeLabel', v)} />
                </AccordionSection>

                {/* 3. Demographics */}
                <AccordionSection title="👤 البيانات الديموغرافية">
                    <SimpleFieldEditor label="عنوان القسم" value={config.demographics?.title || ""} onChange={v => updateSection('demographics.title', v)} />
                    <div className="space-y-3">
                        {Object.entries(config.demographics?.fields || {}).map(([key, fieldConfig]: [string, any]) => (
                            <OptionsEditor key={key} fieldConfig={fieldConfig} onChange={(newField: any) => updateSection(`demographics.fields.${key}`, newField)} />
                        ))}
                    </div>
                </AccordionSection>

                {/* 4. Health */}
                <AccordionSection title="🏥 المؤشرات الصحية">
                    <SimpleFieldEditor label="عنوان القسم" value={config.healthIndicators?.title || ""} onChange={v => updateSection('healthIndicators.title', v)} />
                    <div className="space-y-3">
                        {Object.entries(config.healthIndicators?.fields || {}).map(([key, fieldConfig]: [string, any]) => (
                            <OptionsEditor key={key} fieldConfig={fieldConfig} onChange={(newField: any) => updateSection(`healthIndicators.fields.${key}`, newField)} />
                        ))}
                    </div>
                </AccordionSection>

                {/* 5. Knowledge */}
                <AccordionSection title="📖 المعرفة الغذائية">
                    {renderQuestionSection('knowledge', 'knowledge', config.knowledge || [])}
                </AccordionSection>

                {/* 6. Practices */}
                <AccordionSection title="🍽️ الممارسات الغذائية">
                    {renderQuestionSection('practices', 'practices', config.practices || [])}
                </AccordionSection>

                {/* 7. Intervention */}
                <AccordionSection title="📚 التدخل (قصص ومنصة)">
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

                {/* 8. Satisfaction */}
                <AccordionSection title="⭐ الرضا العام">
                    {renderQuestionSection('satisfaction', 'satisfaction', config.satisfaction || [])}
                </AccordionSection>

                {/* 9. Behavioral */}
                <AccordionSection title="🎯 الأثر السلوكي">
                    {renderQuestionSection('behavioralIntent', 'behavioralIntent', config.behavioralIntent || [])}
                </AccordionSection>

                {/* 10. NPS */}
                <AccordionSection title="📈 صافي نقاط الترويج (NPS)">
                    <p className="text-xs text-muted-foreground">سؤال NPS يُحسب تلقائيًا: Promoters (9-10) / Passives (7-8) / Detractors (0-6)</p>
                    <SimpleFieldEditor label="نص السؤال" value={config.npsQuestion?.text || ""}
                        onChange={v => updateSection('npsQuestion.text', v)} />
                    <ScalePreview question={{ id: 'nps', text: '', type: 'nps' }} />
                </AccordionSection>

                {/* 11. Retrospective */}
                <AccordionSection title="📊 التقييم الارتجاعي">
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

                {/* 12. Open Questions */}
                <AccordionSection title="💬 الأسئلة المفتوحة">
                    <SimpleFieldEditor label="عنوان القسم" value={config.sectionTitles?.openQuestions || ""}
                        onChange={v => updateSection('sectionTitles.openQuestions', v)} />
                    <div className="space-y-2">
                        {(config.openQuestions || []).map((q: any, i: number) => (
                            <div key={q.id} className="flex gap-2 items-center border rounded-lg p-2">
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
