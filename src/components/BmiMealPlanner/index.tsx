import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Scale, Loader2, AlertTriangle, Info, CheckCircle, BookOpen, ChevronDown, ChevronUp, Shield, Heart, Settings2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { CLINICAL_DATA, NutritionPlan } from '@/data/clinicalNutritionData';
import { getAgeCategory, calculateEER, getGrowthPercentile, calculatePediatricMacros, calculateFiberTarget, calculateCalciumTarget, calculateIronTarget } from '@/lib/bmi-utils';
import { generateWeeklyPlan, calculateGoalCalories, BEHAVIORAL_TIPS, ADVANCED_PROTOCOLS } from '@/lib/mealEngine';
import type { WeeklyPlan } from '@/data/mealDatabase';
import BmiResultCard from './BmiResultCard';
import MacroChart from './MacroChart';
import PediatricBanner from './PediatricBanner';
import WeeklyPlanView from './WeeklyPlanView';
import FoodExchangeGuide from './FoodExchangeGuide';
import GroceryList from './GroceryList';
import BehavioralTips from './BehavioralTips';
import AdvancedMode from './AdvancedMode';

const ALLERGY_OPTIONS = [
    { value: 'gluten', en: 'Gluten', ar: 'الجلوتين' },
    { value: 'dairy', en: 'Dairy', ar: 'الألبان' },
    { value: 'eggs', en: 'Eggs', ar: 'البيض' },
    { value: 'nuts', en: 'Nuts', ar: 'المكسرات' },
    { value: 'fish', en: 'Fish', ar: 'الأسماك' },
    { value: 'soy', en: 'Soy', ar: 'الصويا' },
];

const BmiMealPlanner: React.FC = () => {
    const { t } = useTranslation();
    const { language } = useLanguage();
    const { toast } = useToast();
    const isRTL = language === 'ar';

    // ─── Core Form State ───
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [age, setAge] = useState('');
    const [ageUnit, setAgeUnit] = useState<'years' | 'months'>('years');
    const [gender, setGender] = useState<'male' | 'female'>('male');
    const [activityLevel, setActivityLevel] = useState<'sedentary' | 'light' | 'moderate' | 'active'>('sedentary');
    const [muac, setMuac] = useState('');

    // ─── New Advanced Inputs ───
    const [goal, setGoal] = useState<'maintain' | 'lose' | 'gain' | 'muscle'>('maintain');
    const [clinicalCondition, setClinicalCondition] = useState<'none' | 'diabetes' | 'hypertension'>('none');
    const [foodPreference, setFoodPreference] = useState<'middle_eastern' | 'international' | 'mixed'>('mixed');
    const [allergies, setAllergies] = useState<string[]>([]);
    const [budget, setBudget] = useState<'low' | 'moderate' | 'high'>('moderate');
    const [timeAvailability, setTimeAvailability] = useState<'busy' | 'moderate' | 'flexible'>('moderate');
    const [showAdvancedInputs, setShowAdvancedInputs] = useState(false);

    // ─── Result State ───
    const [clinicalPlan, setClinicalPlan] = useState<NutritionPlan | null>(null);
    const [bmiValue, setBmiValue] = useState<number | null>(null);
    const [isBmiGenerating, setIsBmiGenerating] = useState(false);
    const [isOpenRefs, setIsOpenRefs] = useState(false);
    const [ageInMonths, setAgeInMonths] = useState(0);
    const [ageInYears, setAgeInYears] = useState(0);
    const [macroData, setMacroData] = useState<any>(null);
    const [weeklyPlan, setWeeklyPlan] = useState<WeeklyPlan | null>(null);
    const [targetCalories, setTargetCalories] = useState(0);

    // ─── Result Tab State ───
    const [resultTab, setResultTab] = useState<'plan' | 'weekly' | 'exchange' | 'grocery' | 'tips' | 'advanced'>('plan');

    const getChildStatus = (ageYrs: number, bmi: number) => {
        const p = getGrowthPercentile(ageYrs, bmi);
        if (p === 'below5') return 'underweight';
        if (p === 'p5-85') return 'healthy';
        if (p === 'p85-95') return 'overweight';
        return 'obese';
    };

    const getPercentileLabel = (ageYrs: number, bmi: number): string => {
        const p = getGrowthPercentile(ageYrs, bmi);
        if (isRTL) {
            if (p === 'below5') return 'أقل من المئوية 5';
            if (p === 'p5-85') return 'المئوية 5-85 (طبيعي)';
            if (p === 'p85-95') return 'المئوية 85-95 (زيادة وزن)';
            return 'أعلى من المئوية 95 (سمنة)';
        }
        if (p === 'below5') return 'Below 5th percentile';
        if (p === 'p5-85') return '5th-85th percentile (Healthy)';
        if (p === 'p85-95') return '85th-95th percentile (Overweight)';
        return 'Above 95th percentile (Obese)';
    };

    const getAgeCategoryLabel = (): string => {
        const cat = getAgeCategory(ageInMonths);
        const labels: Record<string, Record<string, string>> = {
            en: { '0-6m': '0-6 months', '6-12m': '6-12 months', '1-3y': '1-3 years', '4-8y': '4-8 years', '9-13y': '9-13 years', '14-18y': '14-18 years', '19-64y': '19-64 years', '65+': '65+ years' },
            ar: { '0-6m': '0-6 شهور', '6-12m': '6-12 شهر', '1-3y': '1-3 سنوات', '4-8y': '4-8 سنوات', '9-13y': '9-13 سنة', '14-18y': '14-18 سنة', '19-64y': '19-64 سنة', '65+': '+65 سنة' },
        };
        return labels[isRTL ? 'ar' : 'en'][cat] || cat;
    };

    const calculateClinicalPlan = () => {
        if (!age) return;
        setIsBmiGenerating(true);

        setTimeout(() => {
            let months = parseFloat(age);
            if (ageUnit === 'years') months *= 12;
            const years = months / 12;
            setAgeInMonths(months);
            setAgeInYears(years);

            const currentLangData = CLINICAL_DATA[language as 'en' | 'ar'] || CLINICAL_DATA['en'];
            const ageCat = getAgeCategory(months);
            let plan: NutritionPlan | null = null;
            let bmi: number | null = null;

            // Under 5 (uses age-group based plans from under5.ageGroups)
            if (months < 60) {
                let dataKey: string = ageCat;
                if (ageCat === '6-12m') {
                    if (currentLangData.under5.ageGroups['6-12m']) {
                        dataKey = '6-12m';
                    } else if (months < 9 && currentLangData.under5.ageGroups['6-8m']) {
                        dataKey = '6-8m';
                    } else if (currentLangData.under5.ageGroups['9-11m']) {
                        dataKey = '9-11m';
                    }
                }
                if (ageCat === '1-3y') {
                    if (currentLangData.under5.ageGroups['1-3y']) {
                        dataKey = '1-3y';
                    } else if (months < 24 && currentLangData.under5.ageGroups['12-24m']) {
                        dataKey = '12-24m';
                    } else if (currentLangData.under5.ageGroups['2-5y']) {
                        dataKey = '2-5y';
                    }
                }
                if (ageCat === '4-8y') {
                    if (currentLangData.under5.ageGroups['4-8y']) {
                        dataKey = '4-8y';
                    } else if (currentLangData.under5.ageGroups['2-5y']) {
                        dataKey = '2-5y';
                    }
                }
                if (ageCat === '9-13y') {
                    dataKey = '9-13y';
                }
                plan = currentLangData.under5.ageGroups[dataKey] || null;

                if (years >= 2 && height && weight) {
                    const h = parseFloat(height) / 100;
                    const w = parseFloat(weight);
                    bmi = w / (h * h);
                    bmi = Math.round(bmi * 10) / 10;
                }
            } else if (months < 216) {
                // Children 5-17
                if (height && weight) {
                    const h = parseFloat(height) / 100;
                    const w = parseFloat(weight);
                    bmi = w / (h * h);
                    bmi = Math.round(bmi * 10) / 10;
                    const childStatus = getChildStatus(years, bmi);
                    plan = currentLangData.child?.[childStatus] || null;
                }
                if (!plan) {
                    plan = currentLangData.child?.['healthy'] || null;
                }
            } else {
                // Adults 18+
                if (height && weight) {
                    const h = parseFloat(height) / 100;
                    const w = parseFloat(weight);
                    bmi = w / (h * h);
                    bmi = Math.round(bmi * 10) / 10;
                }
                if (bmi) {
                    let status = 'healthy';
                    if (bmi < 18.5) status = 'underweight';
                    else if (bmi < 25) status = 'healthy';
                    else if (bmi < 30) status = 'overweight';
                    else status = 'obese';
                    plan = (currentLangData.adult as any)[status];
                }
                if (!plan) {
                    let status = 'healthy';
                    if (bmi && bmi < 18.5) status = 'underweight';
                    else if (bmi && bmi < 25) status = 'healthy';
                    else if (bmi && bmi < 30) status = 'overweight';
                    else if (bmi) status = 'obese';
                    plan = (currentLangData.adult as any)[status];
                }
            }

            setBmiValue(bmi);
            setClinicalPlan(plan as NutritionPlan);

            // Calculate energy and macros
            const w = parseFloat(weight) || 0;
            const h = parseFloat(height) || 0;
            let eer = 0;
            if (years >= 1 && w && h) {
                eer = calculateEER(years, w, h, gender, activityLevel);
                const macros = calculatePediatricMacros(years, eer, gender);
                const fiber = calculateFiberTarget(years);
                const calcium = calculateCalciumTarget(years);
                const iron = calculateIronTarget(years, gender);
                setMacroData({ ...macros, fiberTarget: fiber, calciumMg: calcium, ironMg: iron, calories: eer });

                // Goal-adjusted calories for weekly plan
                const goalResult = calculateGoalCalories(eer, goal, w);
                setTargetCalories(goalResult.targetCalories);

                // Generate 7-day plan
                const weekly = generateWeeklyPlan({
                    ageYears: years,
                    ageMonths: months,
                    gender,
                    heightCm: h,
                    weightKg: w,
                    bmi,
                    targetCalories: goalResult.targetCalories,
                    proteinGrams: goalResult.proteinGrams,
                    carbGrams: goalResult.carbGrams,
                    fatGrams: goalResult.fatGrams,
                    goal,
                    clinicalCondition,
                    foodPreference,
                    allergies,
                    budget,
                    timeAvailability,
                    language: language as 'en' | 'ar',
                });
                setWeeklyPlan(weekly);
            } else {
                setMacroData(null);
                setWeeklyPlan(null);
                setTargetCalories(0);
            }

            setIsBmiGenerating(false);
        }, 800);
    };

    // Re-calculate when language changes
    useEffect(() => {
        if (clinicalPlan) calculateClinicalPlan();
    }, [language]);

    const showActivityLevel = ageInYears >= 4 || (ageUnit === 'years' && parseInt(age) >= 4) || (ageUnit === 'months' && parseInt(age) >= 48);

    const toggleAllergy = (allergy: string) => {
        setAllergies(prev => prev.includes(allergy) ? prev.filter(a => a !== allergy) : [...prev, allergy]);
    };

    // ─── Result Tab Definitions ───
    const RESULT_TABS = [
        { key: 'plan' as const, en: 'Assessment', ar: 'التقييم', icon: '📋' },
        { key: 'weekly' as const, en: '7-Day Plan', ar: 'خطة 7 أيام', icon: '📅' },
        { key: 'exchange' as const, en: 'Exchanges', ar: 'البدائل', icon: '🔄' },
        { key: 'grocery' as const, en: 'Grocery', ar: 'المشتريات', icon: '🛒' },
        { key: 'tips' as const, en: 'Tips', ar: 'نصائح', icon: '🧠' },
        { key: 'advanced' as const, en: 'Advanced', ar: 'متقدم', icon: '⚡' },
    ];

    return (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-6">

                {/* ─── INPUT SECTION ─── */}
                <div className="space-y-4">
                    <Card className="h-fit border-0 shadow-xl bg-card/95 backdrop-blur-xl ring-1 ring-border/20">
                        <div className="bg-gradient-to-r from-accent/20 via-accent/10 to-transparent p-1 h-1.5 w-full rounded-t-xl" />
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-3 text-lg text-foreground">
                                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                                    <Scale className="h-4 w-4 text-primary" />
                                </div>
                                {t('aiTools.bmiMealGenerator.title')}
                            </CardTitle>
                            <CardDescription className="text-sm">{t('aiTools.bmiMealGenerator.description')}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* Age */}
                            <div className="space-y-2">
                                <Label htmlFor="bmi-age" className="text-sm font-semibold">
                                    {ageUnit === 'years' ? (isRTL ? 'العمر (سنوات)' : 'Age (years)') : (isRTL ? 'العمر (شهور)' : 'Age (months)')}
                                </Label>
                                <div className="flex gap-2">
                                    <Input id="bmi-age" type="number" placeholder="0" value={age} onChange={e => setAge(e.target.value)}
                                        className="flex-1 h-12 bg-muted/30 border-2 border-border/60 focus:border-accent focus:ring-accent/20 rounded-xl text-base"
                                        aria-label={isRTL ? 'العمر' : 'Age'} min="0" />
                                    <Select value={ageUnit} onValueChange={(v: 'years' | 'months') => setAgeUnit(v)}>
                                        <SelectTrigger className="w-[100px] h-12 bg-muted/30 border-2 border-border/60 rounded-xl text-sm" aria-label={isRTL ? 'وحدة العمر' : 'Age unit'}>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="years">{isRTL ? 'سنوات' : 'Years'}</SelectItem>
                                            <SelectItem value="months">{isRTL ? 'شهور' : 'Months'}</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* Gender */}
                            <div className="space-y-2">
                                <Label className="text-sm font-semibold">{isRTL ? 'الجنس' : 'Gender'}</Label>
                                <Select value={gender} onValueChange={(v: 'male' | 'female') => setGender(v)}>
                                    <SelectTrigger className="h-12 bg-muted/30 border-2 border-border/60 rounded-xl text-sm" aria-label={isRTL ? 'الجنس' : 'Gender'}>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="male">{isRTL ? 'ذكر' : 'Male'}</SelectItem>
                                        <SelectItem value="female">{isRTL ? 'أنثى' : 'Female'}</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Activity Level */}
                            {showActivityLevel && (
                                <div className="space-y-2 animate-in slide-in-from-top-2 duration-300">
                                    <Label className="text-sm font-semibold">{isRTL ? 'مستوى النشاط' : 'Activity Level'}</Label>
                                    <Select value={activityLevel} onValueChange={(v: any) => setActivityLevel(v)}>
                                        <SelectTrigger className="h-12 bg-muted/30 border-2 border-border/60 rounded-xl text-sm" aria-label={isRTL ? 'مستوى النشاط' : 'Activity level'}>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="sedentary">{isRTL ? 'قليل الحركة' : 'Sedentary'}</SelectItem>
                                            <SelectItem value="light">{isRTL ? 'نشاط خفيف' : 'Light'}</SelectItem>
                                            <SelectItem value="moderate">{isRTL ? 'نشاط معتدل' : 'Moderate'}</SelectItem>
                                            <SelectItem value="active">{isRTL ? 'نشط جداً' : 'Active'}</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}

                            {/* Goal */}
                            <div className="space-y-2">
                                <Label className="text-sm font-semibold">{isRTL ? 'الهدف' : 'Goal'}</Label>
                                <Select value={goal} onValueChange={(v: any) => setGoal(v)}>
                                    <SelectTrigger className="h-12 bg-muted/30 border-2 border-border/60 rounded-xl text-sm" aria-label={isRTL ? 'الهدف' : 'Goal'}>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="maintain">{isRTL ? 'الحفاظ على الوزن' : 'Maintain Weight'}</SelectItem>
                                        <SelectItem value="lose">{isRTL ? 'إنقاص الوزن' : 'Lose Weight'}</SelectItem>
                                        <SelectItem value="gain">{isRTL ? 'زيادة الوزن' : 'Gain Weight'}</SelectItem>
                                        <SelectItem value="muscle">{isRTL ? 'بناء العضلات' : 'Build Muscle'}</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* MUAC (under 5) */}
                            {(ageUnit === 'years' ? parseInt(age) < 5 : parseInt(age) < 60) && age && (
                                <div className="space-y-2 animate-in slide-in-from-top-2 duration-300">
                                    <Label htmlFor="bmi-muac" className="text-sm font-semibold">{isRTL ? 'محيط منتصف الذراع (سم)' : 'MUAC (cm)'}</Label>
                                    <Input id="bmi-muac" type="number" step="0.01" placeholder="cm" value={muac} onChange={e => setMuac(e.target.value)}
                                        className="h-12 bg-muted/30 border-2 border-border/60 focus:border-accent focus:ring-accent/20 rounded-xl text-base" />
                                </div>
                            )}

                            {/* Height */}
                            <div className="space-y-2">
                                <Label htmlFor="bmi-height" className="text-sm font-semibold">{isRTL ? 'الطول (سم)' : 'Height (cm)'}</Label>
                                <Input id="bmi-height" type="number" step="0.01" placeholder="cm" value={height} onChange={e => setHeight(e.target.value)}
                                    className="h-12 bg-muted/30 border-2 border-border/60 focus:border-accent focus:ring-accent/20 rounded-xl text-base" />
                            </div>

                            {/* Weight */}
                            <div className="space-y-2">
                                <Label htmlFor="bmi-weight" className="text-sm font-semibold">{isRTL ? 'الوزن (كجم)' : 'Weight (kg)'}</Label>
                                <Input id="bmi-weight" type="number" step="0.01" placeholder="kg" value={weight} onChange={e => setWeight(e.target.value)}
                                    className="h-12 bg-muted/30 border-2 border-border/60 focus:border-accent focus:ring-accent/20 rounded-xl text-base" />
                            </div>

                            {/* ─── Advanced Options Toggle ─── */}
                            <button
                                onClick={() => setShowAdvancedInputs(!showAdvancedInputs)}
                                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-muted/30 border border-border/40 text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                            >
                                <span className="flex items-center gap-2">
                                    <Settings2 className="w-3.5 h-3.5" />
                                    {isRTL ? 'خيارات متقدمة' : 'Advanced Options'}
                                </span>
                                {showAdvancedInputs ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                            </button>

                            {showAdvancedInputs && (
                                <div className="space-y-3 animate-in slide-in-from-top-3 duration-300 border border-border/30 rounded-xl p-3 bg-muted/10">
                                    {/* Clinical condition */}
                                    <div className="space-y-1.5">
                                        <Label className="text-xs font-semibold">{isRTL ? 'الحالة الطبية' : 'Clinical Condition'}</Label>
                                        <Select value={clinicalCondition} onValueChange={(v: any) => setClinicalCondition(v)}>
                                            <SelectTrigger className="h-10 bg-muted/30 border border-border/50 rounded-lg text-xs">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="none">{isRTL ? 'لا يوجد' : 'None'}</SelectItem>
                                                <SelectItem value="diabetes">{isRTL ? 'سكري' : 'Diabetes'}</SelectItem>
                                                <SelectItem value="hypertension">{isRTL ? 'ضغط دم مرتفع' : 'Hypertension'}</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* Food Preference */}
                                    <div className="space-y-1.5">
                                        <Label className="text-xs font-semibold">{isRTL ? 'تفضيل الطعام' : 'Food Preference'}</Label>
                                        <Select value={foodPreference} onValueChange={(v: any) => setFoodPreference(v)}>
                                            <SelectTrigger className="h-10 bg-muted/30 border border-border/50 rounded-lg text-xs">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="mixed">{isRTL ? 'مختلط' : 'Mixed'}</SelectItem>
                                                <SelectItem value="middle_eastern">{isRTL ? 'شرق أوسطي' : 'Middle Eastern'}</SelectItem>
                                                <SelectItem value="international">{isRTL ? 'دولي' : 'International'}</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* Allergies */}
                                    <div className="space-y-1.5">
                                        <Label className="text-xs font-semibold">{isRTL ? 'الحساسيات' : 'Allergies'}</Label>
                                        <div className="flex flex-wrap gap-1.5">
                                            {ALLERGY_OPTIONS.map(opt => (
                                                <button
                                                    key={opt.value}
                                                    onClick={() => toggleAllergy(opt.value)}
                                                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-all ${allergies.includes(opt.value)
                                                            ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-300 dark:border-red-700'
                                                            : 'bg-muted/30 text-muted-foreground border-border/40 hover:bg-muted/50'
                                                        }`}
                                                >
                                                    {allergies.includes(opt.value) ? '✕ ' : ''}{isRTL ? opt.ar : opt.en}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Budget */}
                                    <div className="space-y-1.5">
                                        <Label className="text-xs font-semibold">{isRTL ? 'الميزانية' : 'Budget'}</Label>
                                        <Select value={budget} onValueChange={(v: any) => setBudget(v)}>
                                            <SelectTrigger className="h-10 bg-muted/30 border border-border/50 rounded-lg text-xs">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="low">{isRTL ? 'اقتصادي' : 'Low Budget'}</SelectItem>
                                                <SelectItem value="moderate">{isRTL ? 'متوسط' : 'Moderate'}</SelectItem>
                                                <SelectItem value="high">{isRTL ? 'مرتفع' : 'High'}</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* Time */}
                                    <div className="space-y-1.5">
                                        <Label className="text-xs font-semibold">{isRTL ? 'الوقت المتاح' : 'Time Available'}</Label>
                                        <Select value={timeAvailability} onValueChange={(v: any) => setTimeAvailability(v)}>
                                            <SelectTrigger className="h-10 bg-muted/30 border border-border/50 rounded-lg text-xs">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="busy">{isRTL ? 'مشغول (وجبات سريعة)' : 'Busy (Quick meals)'}</SelectItem>
                                                <SelectItem value="moderate">{isRTL ? 'وقت معتدل' : 'Moderate Time'}</SelectItem>
                                                <SelectItem value="flexible">{isRTL ? 'مرن (أي وصفة)' : 'Flexible (Any recipe)'}</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            )}

                            <Button onClick={calculateClinicalPlan} disabled={!age || isBmiGenerating}
                                className="w-full h-12 text-base font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 rounded-xl mt-2">
                                {isBmiGenerating ? <><Loader2 className="h-4 w-4 me-2 animate-spin" />{isRTL ? 'جاري التحميل...' : 'Loading...'}</> : (isRTL ? 'إنشاء الخطة' : 'Generate Plan')}
                            </Button>

                            {/* BMI Result Card */}
                            {clinicalPlan && (
                                <div className="animate-in fade-in zoom-in duration-300">
                                    <BmiResultCard
                                        bmiValue={bmiValue}
                                        statusLabel={clinicalPlan.status}
                                        isChild={ageInYears < 18}
                                        percentileLabel={ageInYears >= 2 && ageInYears < 18 && bmiValue ? getPercentileLabel(ageInYears, bmiValue) : undefined}
                                        ageCategory={getAgeCategoryLabel()}
                                    />
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* References */}
                    <Card className="border-border/60 shadow-sm">
                        <Collapsible open={isOpenRefs} onOpenChange={setIsOpenRefs}>
                            <CardHeader className="py-3 px-4">
                                <CollapsibleTrigger asChild>
                                    <Button variant="ghost" className="w-full flex justify-between p-0 h-auto font-semibold hover:bg-transparent text-muted-foreground hover:text-foreground">
                                        <span className="flex items-center gap-2"><BookOpen className="h-4 w-4" />{t('aiTools.bmiMealGenerator.references.title')}</span>
                                        {isOpenRefs ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                                    </Button>
                                </CollapsibleTrigger>
                            </CardHeader>
                            <CollapsibleContent>
                                <CardContent className="text-xs text-muted-foreground space-y-3 pt-0 pb-4 px-4">
                                    <div className="p-3 bg-muted/40 rounded-lg">
                                        <h4 className="font-bold text-foreground mb-1">{t('aiTools.bmiMealGenerator.references.who_growth.title')}</h4>
                                        <p className="leading-relaxed">{t('aiTools.bmiMealGenerator.references.who_growth.desc')}</p>
                                        <a href="https://www.who.int/tools/child-growth-standards" target="_blank" rel="noreferrer" className="text-primary hover:underline mt-1 block">{t('aiTools.bmiMealGenerator.references.who_growth.source')}</a>
                                    </div>
                                    <div className="p-3 bg-muted/40 rounded-lg">
                                        <h4 className="font-bold text-foreground mb-1">{t('aiTools.bmiMealGenerator.references.bmi_age.title')}</h4>
                                        <p className="leading-relaxed mb-2">{t('aiTools.bmiMealGenerator.references.bmi_age.desc')}</p>
                                        <ul className="list-disc list-inside space-y-1 ms-1">
                                            <li>{t('aiTools.bmiMealGenerator.references.bmi_age.p5')}</li>
                                            <li>{t('aiTools.bmiMealGenerator.references.bmi_age.p5_85')}</li>
                                            <li>{t('aiTools.bmiMealGenerator.references.bmi_age.p85_95')}</li>
                                            <li>{t('aiTools.bmiMealGenerator.references.bmi_age.p95')}</li>
                                        </ul>
                                        <a href="https://www.who.int/tools/growth-reference-data-for-5to19-years" target="_blank" rel="noreferrer" className="text-primary hover:underline mt-2 block">{t('aiTools.bmiMealGenerator.references.bmi_age.source')}</a>
                                    </div>
                                    <div className="p-3 bg-muted/40 rounded-lg">
                                        <h4 className="font-bold text-foreground mb-1">{t('aiTools.bmiMealGenerator.references.adult_bmi.title')}</h4>
                                        <ul className="list-disc list-inside mb-2 space-y-1 ms-1">
                                            <li>{t('aiTools.bmiMealGenerator.references.adult_bmi.underw')}</li>
                                            <li>{t('aiTools.bmiMealGenerator.references.adult_bmi.healthy')}</li>
                                            <li>{t('aiTools.bmiMealGenerator.references.adult_bmi.overw')}</li>
                                            <li>{t('aiTools.bmiMealGenerator.references.adult_bmi.obese')}</li>
                                        </ul>
                                        <p className="italic opacity-80">{t('aiTools.bmiMealGenerator.references.adult_bmi.note')}</p>
                                    </div>
                                    <div className="p-3 bg-muted/40 rounded-lg">
                                        <h4 className="font-bold text-foreground mb-1">{isRTL ? 'المراجع العلمية الإضافية' : 'Additional Scientific References'}</h4>
                                        <ul className="list-disc list-inside space-y-1 ms-1">
                                            <li>ESPGHAN – {isRTL ? 'إرشادات تغذية الأطفال' : 'Pediatric Nutrition Guidelines'}</li>
                                            <li>AAP – {isRTL ? 'سياسة التغذية للأطفال' : 'Pediatric Nutrition Policy'}</li>
                                            <li>IOM – {isRTL ? 'المدخول الغذائي المرجعي (AMDR)' : 'Dietary Reference Intakes (AMDR)'}</li>
                                            <li>CDC – {isRTL ? 'معايير النمو' : 'Growth Standards'}</li>
                                            <li>FAO – {isRTL ? 'إرشادات المغذيات الكبرى' : 'Macronutrient Guidelines'}</li>
                                        </ul>
                                    </div>
                                </CardContent>
                            </CollapsibleContent>
                        </Collapsible>
                    </Card>
                </div>

                {/* ─── RESULTS SECTION ─── */}
                <div className="xl:col-span-2">
                    {clinicalPlan ? (
                        <div className={`h-full space-y-4 ${isRTL ? 'text-right' : 'text-left'}`} dir={isRTL ? 'rtl' : 'ltr'}>

                            {/* Pediatric Banner */}
                            {ageInYears < 18 && <PediatricBanner ageYears={ageInYears} />}

                            {/* Evidence Badge */}
                            <div className="flex items-center gap-2">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800">
                                    <Shield className="w-3 h-3" />
                                    {isRTL ? 'خطة مبنية على أدلة علمية' : 'Evidence-Based Plan'}
                                </span>
                                {targetCalories > 0 && (
                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-[10px] font-bold border border-blue-200 dark:border-blue-800">
                                        🎯 {targetCalories} {isRTL ? 'سعرة/يوم' : 'kcal/day'}
                                    </span>
                                )}
                            </div>

                            {/* ─── Result Tabs ─── */}
                            <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-hide -mx-1 px-1">
                                {RESULT_TABS.map(tab => (
                                    <button
                                        key={tab.key}
                                        onClick={() => setResultTab(tab.key)}
                                        className={`shrink-0 px-3 py-2 rounded-xl text-xs font-bold transition-all border ${resultTab === tab.key
                                                ? 'bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20'
                                                : 'bg-card border-border/50 text-muted-foreground hover:bg-muted/50 hover:border-border'
                                            }`}
                                    >
                                        <span className="me-1">{tab.icon}</span>
                                        {isRTL ? tab.ar : tab.en}
                                    </button>
                                ))}
                            </div>

                            {/* ─── Tab: Clinical Assessment ─── */}
                            {resultTab === 'plan' && (
                                <div className="space-y-4 animate-in fade-in duration-200">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {/* Clinical Assessment */}
                                        <div className="p-4 bg-card border border-border rounded-2xl shadow-sm space-y-3">
                                            <h4 className="font-bold flex items-center gap-2 text-sm">
                                                <CheckCircle className="h-4 w-4 text-green-600" />
                                                {isRTL ? 'التقييم السريري' : 'Clinical Assessment'}
                                            </h4>
                                            <p className="text-sm font-medium">{clinicalPlan.message}</p>
                                            <div className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">{clinicalPlan.action}</div>

                                            {clinicalPlan.warning && (
                                                <div className="p-3 bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300 text-xs rounded-xl flex gap-2 border border-red-100 dark:border-red-900">
                                                    <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                                                    <span>{clinicalPlan.warning}</span>
                                                </div>
                                            )}

                                            {clinicalPlan.safetyNotes && clinicalPlan.safetyNotes.length > 0 && (
                                                <div className="mt-2 p-3 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-800/30">
                                                    <h5 className="text-xs font-bold text-amber-700 dark:text-amber-300 mb-1.5 flex items-center gap-1">
                                                        <AlertTriangle className="h-3 w-3" /> {isRTL ? 'ملاحظات السلامة' : 'Safety Notes'}
                                                    </h5>
                                                    <ul className="text-xs text-amber-600 dark:text-amber-400 space-y-1 ms-4 list-disc list-inside">
                                                        {clinicalPlan.safetyNotes.map((n, i) => <li key={i}>{n}</li>)}
                                                    </ul>
                                                </div>
                                            )}

                                            {clinicalPlan.parentTips && clinicalPlan.parentTips.length > 0 && (
                                                <div className="mt-2 p-3 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/50 dark:border-blue-800/30">
                                                    <h5 className="text-xs font-bold text-blue-700 dark:text-blue-300 mb-1.5 flex items-center gap-1">
                                                        <Heart className="h-3 w-3" /> {isRTL ? 'نصائح للوالدين' : 'Parent Tips'}
                                                    </h5>
                                                    <ul className="text-xs text-blue-600 dark:text-blue-400 space-y-1 ms-4 list-disc list-inside">
                                                        {clinicalPlan.parentTips.map((tip, i) => <li key={i}>{tip}</li>)}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>

                                        {/* Macro Chart */}
                                        <div className="p-4 bg-card border border-border rounded-2xl shadow-sm">
                                            {macroData ? (
                                                <MacroChart
                                                    calories={macroData.calories}
                                                    proteinGrams={macroData.proteinGrams}
                                                    fatGrams={macroData.fatGrams}
                                                    carbGrams={macroData.carbGrams}
                                                    proteinPercent={macroData.proteinPercent}
                                                    fatPercent={macroData.fatPercent}
                                                    carbPercent={macroData.carbPercent}
                                                    fiberTarget={macroData.fiberTarget}
                                                    calciumMg={macroData.calciumMg}
                                                    ironMg={macroData.ironMg}
                                                />
                                            ) : (
                                                <div className="h-full flex items-center justify-center text-muted-foreground text-sm p-8">
                                                    {clinicalPlan.calorieRange ? (
                                                        <div className="text-center space-y-2">
                                                            <p className="text-xs font-medium">{isRTL ? 'نطاق السعرات المقدر' : 'Estimated Calorie Range'}</p>
                                                            <p className="text-2xl font-bold text-primary">{clinicalPlan.calorieRange.min} - {clinicalPlan.calorieRange.max}</p>
                                                            <p className="text-xs">{isRTL ? 'سعرة حرارية / يوم' : 'kcal / day'}</p>
                                                        </div>
                                                    ) : (
                                                        <p>{isRTL ? 'أدخل الطول والوزن لعرض التفاصيل' : 'Enter height & weight for details'}</p>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Texture Notes */}
                                    {clinicalPlan.textureNotes && (
                                        <div className="p-3 rounded-xl border border-purple-200 dark:border-purple-800 bg-purple-50/50 dark:bg-purple-950/20 text-xs">
                                            <span className="font-bold text-purple-700 dark:text-purple-300">{isRTL ? '🥣 ملاحظة القوام: ' : '🥣 Texture Note: '}</span>
                                            <span className="text-purple-600 dark:text-purple-400">{clinicalPlan.textureNotes}</span>
                                        </div>
                                    )}

                                    {/* Original Meal Plan Grid */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {[
                                            { key: 'breakfast', icon: '🌅', label: isRTL ? 'الإفطار' : 'Breakfast', items: clinicalPlan.mealPlan.breakfast },
                                            { key: 'snacks1', icon: '🍎', label: isRTL ? 'سناك 1' : 'Snack 1', items: clinicalPlan.mealPlan.snacks1 },
                                            { key: 'lunch', icon: '☀️', label: isRTL ? 'الغداء' : 'Lunch', items: clinicalPlan.mealPlan.lunch },
                                            { key: 'snacks2', icon: '🥤', label: isRTL ? 'سناك 2' : 'Snack 2', items: clinicalPlan.mealPlan.snacks2 },
                                            { key: 'dinner', icon: '🌙', label: isRTL ? 'العشاء' : 'Dinner', items: clinicalPlan.mealPlan.dinner },
                                        ].filter(m => m.items && m.items.length > 0).map(meal => (
                                            <div key={meal.key} className="p-4 rounded-xl border border-border/50 bg-white/60 dark:bg-slate-950/50 backdrop-blur-xl shadow-sm">
                                                <h4 className="font-bold text-primary mb-2 flex items-center gap-2 text-sm">
                                                    {meal.icon} {meal.label}
                                                </h4>
                                                <ul className="text-xs sm:text-sm text-gray-700 dark:text-slate-200 list-disc space-y-1 font-medium ms-4 list-inside">
                                                    {meal.items!.map((s, i) => <li key={i}>{s}</li>)}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Choking Hazards */}
                                    {clinicalPlan.chokingHazards && clinicalPlan.chokingHazards.length > 0 && (
                                        <div className="p-4 rounded-xl border-2 border-red-300 dark:border-red-800 bg-red-50/50 dark:bg-red-950/20">
                                            <h4 className="font-bold text-red-600 dark:text-red-400 text-xs mb-2 flex items-center gap-2">
                                                <AlertTriangle className="h-4 w-4" /> {isRTL ? '⚠️ أخطار الاختناق — تجنبي تمامًا' : '⚠️ Choking Hazards — Avoid Completely'}
                                            </h4>
                                            <p className="text-xs text-red-700 dark:text-red-300 font-medium">{clinicalPlan.chokingHazards.join(' • ')}</p>
                                        </div>
                                    )}

                                    {/* Prohibited Items */}
                                    {clinicalPlan.prohibited && clinicalPlan.prohibited.length > 0 && (
                                        <div className="p-4 rounded-xl border border-red-200 dark:border-red-900/50 bg-red-50/50 dark:bg-red-950/20">
                                            <h4 className="font-bold text-red-600 dark:text-red-400 text-xs mb-2 flex items-center gap-2">
                                                <Info className="h-3 w-3" /> {isRTL ? 'ممنوعات' : 'Forbidden Items'}
                                            </h4>
                                            <p className="text-xs text-red-700 dark:text-red-300 font-medium leading-relaxed">{clinicalPlan.prohibited.join(' • ')}</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* ─── Tab: 7-Day Weekly Plan ─── */}
                            {resultTab === 'weekly' && weeklyPlan && (
                                <div className="animate-in fade-in duration-200">
                                    <WeeklyPlanView days={weeklyPlan.days} targetCalories={targetCalories} />
                                </div>
                            )}
                            {resultTab === 'weekly' && !weeklyPlan && (
                                <div className="p-8 text-center text-muted-foreground text-sm border border-dashed border-border rounded-2xl">
                                    <p>{isRTL ? 'أدخل الطول والوزن لإنشاء خطة 7 أيام' : 'Enter height & weight to generate a 7-day plan'}</p>
                                </div>
                            )}

                            {/* ─── Tab: Food Exchange Guide ─── */}
                            {resultTab === 'exchange' && weeklyPlan && (
                                <div className="animate-in fade-in duration-200">
                                    <FoodExchangeGuide groups={weeklyPlan.exchangeGuide} />
                                </div>
                            )}

                            {/* ─── Tab: Grocery List ─── */}
                            {resultTab === 'grocery' && weeklyPlan && (
                                <div className="animate-in fade-in duration-200">
                                    <GroceryList categories={weeklyPlan.groceryList} />
                                </div>
                            )}

                            {/* ─── Tab: Behavioral Tips ─── */}
                            {resultTab === 'tips' && (
                                <div className="animate-in fade-in duration-200">
                                    <BehavioralTips tips={BEHAVIORAL_TIPS} />
                                </div>
                            )}

                            {/* ─── Tab: Advanced Mode ─── */}
                            {resultTab === 'advanced' && (
                                <div className="animate-in fade-in duration-200">
                                    <AdvancedMode protocols={ADVANCED_PROTOCOLS} goal={goal} />
                                </div>
                            )}

                            {/* Medical Disclaimer Footer */}
                            <div className="p-3 rounded-xl bg-muted/30 border border-border/40">
                                <p className="text-[11px] text-muted-foreground leading-relaxed">
                                    {isRTL
                                        ? '⚕️ هذه الخطة لأغراض تعليمية فقط ولا تحل محل الاستشارة الطبية المتخصصة. مؤشر كتلة الجسم أداة فحص ولا يقيس دهون الجسم مباشرة. لا نقدم ادعاءات تشخيصية. بياناتك محفوظة بشكل آمن.'
                                        : '⚕️ This plan is for educational purposes only and does not replace professional medical consultation. BMI is a screening tool and does not measure body fat directly. We make no diagnostic claims. Your data is kept secure.'}
                                </p>
                            </div>

                        </div>
                    ) : (
                        <div className="h-full flex items-center justify-center p-8 border border-dashed border-border rounded-2xl text-muted-foreground text-sm min-h-[300px]">
                            <div className="text-center space-y-3">
                                <Scale className="w-12 h-12 mx-auto text-muted-foreground/30" />
                                <p>{t('aiTools.bmiMealGenerator.description')}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default BmiMealPlanner;
