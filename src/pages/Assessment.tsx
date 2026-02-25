import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calculator, Activity, Baby, ArrowRight, ArrowLeft, ClipboardList, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ChildAssessment from '@/components/ChildAssessment';
import { DietaryDiversityTab } from '@/components/assessment/DietaryDiversityTab';
import { FoodSafetyTab } from '@/components/assessment/FoodSafetyTab';
import { calculateBMI, calculateDailyCalories, calculateMacros } from '@/lib/bmi-utils';
import { useAuth } from '@/features/auth/firebase-auth-context';
import { createBMICalculation, createCalorieCalculation } from '@/db/api';
import { getSessionId } from '@/lib/session';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { SurveyCTA } from '@/components/common/SurveyCTA';

const Assessment: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { toast } = useToast();
  const { language } = useLanguage();
  const location = useLocation();
  const isRTL = language === 'ar';

  const [activeTab, setActiveTab] = useState('bmi');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tabQuery = params.get('tab');
    if (tabQuery && ['bmi', 'calorie', 'child', 'dds', 'food-safety'].includes(tabQuery)) {
      setActiveTab(tabQuery);
    }
  }, [location.search]);

  const [bmiData, setBmiData] = useState({ weight: '', height: '', age: '' });
  const [bmiResult, setBmiResult] = useState<{ bmi: number; category: string; recommendations: string } | null>(null);

  const [calorieData, setCalorieData] = useState({
    weight: '',
    height: '',
    age: '',
    gender: '',
    activity: '',
    goal: ''
  });
  const [calorieResult, setCalorieResult] = useState<{
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
  } | null>(null);

  const calculateBMIValue = () => {
    const weight = Number.parseFloat(bmiData.weight);
    const height = Number.parseFloat(bmiData.height);

    if (!weight || !height || weight <= 0 || height <= 0) {
      toast({
        title: isRTL ? 'خطأ' : 'Error',
        description: isRTL ? 'يرجى إدخال قيم صحيحة للوزن والطول' : 'Please enter valid weight and height values',
        variant: "destructive"
      });
      return;
    }

    const { bmi, category } = calculateBMI(weight, height);

    setBmiResult({ bmi, category, recommendations: '' });

    // Save to Database
    const saveToDb = async () => {
      try {
        await createBMICalculation({
          userId: user?.uid,
          session_id: getSessionId(),
          age_years: Number(bmiData.age),
          weight_kg: Number(weight),
          height_cm: Number(height),
          bmi: bmi,
          category: category,
          recommendations: ''
        });
      } catch (err) {
        console.error("Failed to save assessment", err);
        // Error handling is silent for user experience or could be shown
      }
    };
    saveToDb();
  };

  const calculateCaloriesValue = () => {
    const weight = Number.parseFloat(calorieData.weight);
    const height = Number.parseFloat(calorieData.height);
    const age = Number.parseFloat(calorieData.age);

    if (!weight || !height || !age || !calorieData.gender || !calorieData.activity || !calorieData.goal) {
      toast({
        title: isRTL ? 'خطأ' : 'Error',
        description: isRTL ? 'يرجى ملء جميع الحقول المطلوبة' : 'Please fill in all required fields',
        variant: "destructive"
      });
      return;
    }

    const calories = calculateDailyCalories(
      weight,
      height,
      age,
      calorieData.gender as 'male' | 'female',
      calorieData.activity as 'sedentary' | 'light' | 'moderate' | 'active' | 'intense',
      calorieData.goal as 'maintain' | 'lose' | 'gain'
    );

    const { protein, carbs, fats } = calculateMacros(calories);

    setCalorieResult({
      calories,
      protein,
      carbs,
      fats
    });

    // Save to Database
    const saveCaloriesToDb = async () => {
      try {
        await createCalorieCalculation({
          userId: user?.uid,
          session_id: getSessionId(),
          age_years: Number(age),
          gender: calorieData.gender as 'male' | 'female',
          weight_kg: Number(weight),
          height_cm: Number(height),
          activity_level: calorieData.activity,
          goal: calorieData.goal,
          daily_calories: calories,
          protein_g: protein,
          carbs_g: carbs,
          fats_g: fats
        });
      } catch (err) {
        console.error("Failed to save calorie calculation", err);
      }
    };
    saveCaloriesToDb();
  };

  const getBMIProgress = (bmi: number) => {
    if (bmi < 18.5) return (bmi / 18.5) * 25;
    if (bmi < 25) return 25 + ((bmi - 18.5) / 6.5) * 25;
    if (bmi < 30) return 50 + ((bmi - 25) / 5) * 25;
    return Math.min(75 + ((bmi - 30) / 10) * 25, 100);
  };

  return (
    <div className={`min-h-screen py-12 bg-gradient-to-br from-primary/5 via-background to-secondary/5 ${language === 'ar' ? 'rtl' : 'ltr'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center p-3 mb-6 rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/20">
            <Calculator className="w-8 h-8" />
          </div>
          <h1 className="text-4xl xl:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary via-blue-600 to-secondary bg-clip-text text-transparent">
              {t('assessment.title')}
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t('assessment.subtitle')}
          </p>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full space-y-8">
          <div className="flex justify-center w-full px-2 md:px-0">
            <TabsList className="flex flex-wrap justify-center w-full h-auto mb-10 gap-1.5 sm:gap-2 bg-card/30 backdrop-blur-md border border-white/10 p-2 rounded-2xl">
              <TabsTrigger
                value="bmi"
                className="gap-2 min-h-[44px] sm:min-h-[56px] basis-[47%] md:basis-auto flex-auto md:flex-1 rounded-xl text-xs sm:text-sm md:text-base font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md transition-all duration-300 hover:bg-white/5"
              >
                <Calculator className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span className="line-clamp-2 leading-snug">{t('assessment.bmi.title')}</span>
              </TabsTrigger>
              <TabsTrigger
                value="calorie"
                className="gap-2 min-h-[44px] sm:min-h-[56px] basis-[47%] md:basis-auto flex-auto md:flex-1 rounded-xl text-xs sm:text-sm md:text-base font-medium data-[state=active]:bg-secondary data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-300 hover:bg-white/5"
              >
                <Activity className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span className="line-clamp-2 leading-snug">{t('assessment.calorie.title')}</span>
              </TabsTrigger>
              <TabsTrigger
                value="child"
                className="gap-2 min-h-[44px] sm:min-h-[56px] basis-[47%] md:basis-auto flex-auto md:flex-1 rounded-xl text-xs sm:text-sm md:text-base font-medium data-[state=active]:bg-accent data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-300 hover:bg-white/5"
              >
                <Baby className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span className="line-clamp-2 leading-snug">{language === 'ar' ? 'تقييم الطفل' : 'Child Growth'}</span>
              </TabsTrigger>
              <TabsTrigger
                value="dds"
                className="gap-2 min-h-[44px] sm:min-h-[56px] basis-[47%] md:basis-auto flex-auto md:flex-1 rounded-xl text-xs sm:text-sm md:text-base font-medium data-[state=active]:bg-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-300 hover:bg-white/5"
              >
                <ClipboardList className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span className="line-clamp-2 leading-snug">{t('assessment.dds.title')}</span>
              </TabsTrigger>
              <TabsTrigger
                value="food-safety"
                className="gap-2 min-h-[44px] sm:min-h-[56px] basis-[47%] md:basis-auto flex-auto md:flex-1 rounded-xl text-xs sm:text-sm md:text-base font-medium data-[state=active]:bg-rose-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-300 hover:bg-white/5"
              >
                <ShieldAlert className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span className="line-clamp-2 leading-snug">{language === 'ar' ? 'سلامة الغذاء' : 'Food Safety'}</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="food-safety" className="focus-visible:ring-0">
            <div className="w-full">
              <FoodSafetyTab />
            </div>
          </TabsContent>

          <TabsContent value="bmi" className="focus-visible:ring-0">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="border-0 shadow-xl bg-card/60 backdrop-blur-xl ring-1 ring-border/20 overflow-hidden">
                  <div className="h-1.5 w-full bg-gradient-to-r from-primary/80 to-primary/20" />
                  <CardHeader className="pb-2">
                    <CardTitle className="text-2xl flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Calculator className="h-6 w-6 text-primary" />
                      </div>
                      {t('assessment.bmi.title')}
                    </CardTitle>
                    <CardDescription className="text-base">{t('assessment.bmi.description')}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8 p-6 md:p-8">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="bmi-weight" className="text-base">{t('assessment.bmi.weight')}</Label>
                          <div className="relative" dir="ltr">
                            <Input
                              id="bmi-weight"
                              type="number"
                              placeholder="70"
                              className="h-14 bg-background/50 border-2 border-border/40 focus:border-primary/50 focus:ring-primary/20 rounded-xl text-lg px-4 text-left pr-12 transition-all duration-300"
                              value={bmiData.weight}
                              onChange={(e) => setBmiData({ ...bmiData, weight: e.target.value })}
                            />
                            <div className="absolute top-1/2 -translate-y-1/2 text-muted-foreground font-medium right-4">
                              kg
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="bmi-height" className="text-base">{t('assessment.bmi.height')}</Label>
                          <div className="relative" dir="ltr">
                            <Input
                              id="bmi-height"
                              type="number"
                              placeholder="170"
                              className="h-14 bg-background/50 border-2 border-border/40 focus:border-primary/50 focus:ring-primary/20 rounded-xl text-lg px-4 text-left pr-12 transition-all duration-300"
                              value={bmiData.height}
                              onChange={(e) => setBmiData({ ...bmiData, height: e.target.value })}
                            />
                            <div className="absolute top-1/2 -translate-y-1/2 text-muted-foreground font-medium right-4">
                              cm
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="bmi-age" className="text-base">{t('assessment.bmi.age')}</Label>
                          <Input
                            id="bmi-age"
                            type="number"
                            placeholder="25"
                            className="h-14 bg-background/50 border-2 border-border/40 focus:border-primary/50 focus:ring-primary/20 rounded-xl text-lg px-4 transition-all duration-300"
                            value={bmiData.age}
                            onChange={(e) => setBmiData({ ...bmiData, age: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="flex flex-col justify-end">
                        <Button
                          onClick={calculateBMIValue}
                          className="w-full h-14 text-lg font-bold rounded-xl bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 transition-all active:scale-[0.98]"
                        >
                          {t('assessment.bmi.calculate')}
                          {isRTL ? <ArrowLeft className="mr-2 h-5 w-5" /> : <ArrowRight className="ml-2 h-5 w-5" />}
                        </Button>
                      </div>
                    </div>

                    {bmiResult && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="rounded-2xl bg-primary/5 border border-primary/10 overflow-hidden"
                      >
                        <div className="p-6 md:p-8 space-y-6">
                          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="text-center md:text-start">
                              <p className="text-muted-foreground font-medium mb-1">{t('assessment.bmi.result')}</p>
                              <div className="flex items-baseline justify-center md:justify-start gap-2">
                                <span className="text-5xl font-extrabold text-primary tracking-tight">{bmiResult.bmi}</span>
                                <span className="text-lg text-muted-foreground">BMI</span>
                              </div>
                            </div>
                            <div className={`px-6 py-3 rounded-xl border-2 font-bold text-lg ${bmiResult.category === 'normal' ? 'bg-green-500/10 border-green-500/20 text-green-600' :
                              bmiResult.category === 'overweight' ? 'bg-orange-500/10 border-orange-500/20 text-orange-600' :
                                bmiResult.category === 'obese' ? 'bg-red-500/10 border-red-500/20 text-red-600' :
                                  'bg-blue-500/10 border-blue-500/20 text-blue-600'
                              }`}>
                              {t(`assessment.bmi.status.${bmiResult.category}`)}
                            </div>
                          </div>

                          <div className="space-y-3">
                            <div className="h-3 w-full bg-background/50 rounded-full overflow-hidden border border-border/50">
                              <motion.div
                                className={`h-full rounded-full transition-all duration-1000 ease-out ${bmiResult.category === 'normal' ? 'bg-green-500' :
                                  bmiResult.category === 'overweight' ? 'bg-orange-500' :
                                    bmiResult.category === 'obese' ? 'bg-red-500' :
                                      'bg-blue-500'
                                  }`}
                                initial={{ width: 0 }}
                                animate={{ width: `${getBMIProgress(bmiResult.bmi)}%` }}
                              />
                            </div>
                            <div className="flex justify-between text-xs font-medium text-muted-foreground px-1">
                              <span>{t('assessment.bmi.status.underweight')}</span>
                              <span>{t('assessment.bmi.status.normal')}</span>
                              <span className="hidden sm:inline">{t('assessment.bmi.status.overweight')}</span>
                              <span>{t('assessment.bmi.status.obese')}</span>
                            </div>
                          </div>

                          <div className="bg-background/60 rounded-xl p-5 border border-border/40">
                            <div className="flex items-start gap-3">
                              <div className="mt-1 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                                <Activity className="w-3.5 h-3.5 text-primary" />
                              </div>
                              <div>
                                <h4 className="font-bold text-foreground mb-1">{t('assessment.bmi.recommendations')}</h4>
                                <p className="text-muted-foreground leading-relaxed">{t(`assessment.bmi.advice.${bmiResult.category}`)}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="calorie" className="focus-visible:ring-0">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="border-0 shadow-xl bg-card/60 backdrop-blur-xl ring-1 ring-border/20 overflow-hidden">
                  <div className="h-1.5 w-full bg-gradient-to-r from-secondary/80 to-secondary/20" />
                  <CardHeader className="pb-2">
                    <CardTitle className="text-2xl flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                        <Activity className="h-6 w-6 text-secondary" />
                      </div>
                      {t('assessment.calorie.title')}
                    </CardTitle>
                    <CardDescription className="text-base">{t('assessment.calorie.description')}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8 p-6 md:p-8">
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Left Column: Personal Data */}
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-base">{t('assessment.bmi.weight')}</Label>
                            <div className="relative" dir="ltr">
                              <Input
                                type="number"
                                placeholder="70"
                                className="h-12 bg-background/50 border-2 border-border/40 focus:border-secondary/50 focus:ring-secondary/20 rounded-xl px-4 text-left pr-10"
                                value={calorieData.weight}
                                onChange={(e) => setCalorieData({ ...calorieData, weight: e.target.value })}
                              />
                              <div className="absolute top-1/2 -translate-y-1/2 text-xs text-muted-foreground right-3">kg</div>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label className="text-base">{t('assessment.bmi.height')}</Label>
                            <div className="relative" dir="ltr">
                              <Input
                                type="number"
                                placeholder="170"
                                className="h-12 bg-background/50 border-2 border-border/40 focus:border-secondary/50 focus:ring-secondary/20 rounded-xl px-4 text-left pr-10"
                                value={calorieData.height}
                                onChange={(e) => setCalorieData({ ...calorieData, height: e.target.value })}
                              />
                              <div className="absolute top-1/2 -translate-y-1/2 text-xs text-muted-foreground right-3">cm</div>
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-base">{t('assessment.bmi.age')}</Label>
                            <Input
                              type="number"
                              placeholder="25"
                              className="h-12 bg-background/50 border-2 border-border/40 focus:border-secondary/50 focus:ring-secondary/20 rounded-xl px-4"
                              value={calorieData.age}
                              onChange={(e) => setCalorieData({ ...calorieData, age: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-base">{t('assessment.calorie.gender')}</Label>
                            <Select value={calorieData.gender} onValueChange={(value) => setCalorieData({ ...calorieData, gender: value })}>
                              <SelectTrigger className="h-12 bg-background/50 border-2 border-border/40 focus:ring-secondary/20 rounded-xl">
                                <SelectValue placeholder={t('assessment.calorie.gender')} />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="male">{t('assessment.calorie.male')}</SelectItem>
                                <SelectItem value="female">{t('assessment.calorie.female')}</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>

                      {/* Right Column: Activity & Goal */}
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label className="text-base">{t('assessment.calorie.activity')}</Label>
                          <Select value={calorieData.activity} onValueChange={(value) => setCalorieData({ ...calorieData, activity: value })}>
                            <SelectTrigger className="h-12 bg-background/50 border-2 border-border/40 focus:ring-secondary/20 rounded-xl">
                              <SelectValue placeholder={t('assessment.calorie.activity')} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="sedentary">{t('assessment.calorie.sedentary')}</SelectItem>
                              <SelectItem value="light">{t('assessment.calorie.light')}</SelectItem>
                              <SelectItem value="moderate">{t('assessment.calorie.moderate')}</SelectItem>
                              <SelectItem value="active">{t('assessment.calorie.active')}</SelectItem>
                              <SelectItem value="intense">{t('assessment.calorie.intense')}</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-base">{t('assessment.calorie.goal')}</Label>
                          <Select value={calorieData.goal} onValueChange={(value) => setCalorieData({ ...calorieData, goal: value })}>
                            <SelectTrigger className="h-12 bg-background/50 border-2 border-border/40 focus:ring-secondary/20 rounded-xl">
                              <SelectValue placeholder={t('assessment.calorie.goal')} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="maintain">{t('assessment.calorie.maintain')}</SelectItem>
                              <SelectItem value="lose">{t('assessment.calorie.lose')}</SelectItem>
                              <SelectItem value="gain">{t('assessment.calorie.gain')}</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Button
                          onClick={calculateCaloriesValue}
                          className="w-full h-12 mt-auto text-lg font-bold rounded-xl bg-secondary hover:bg-secondary/90 shadow-lg shadow-secondary/25 transition-all active:scale-[0.98]"
                        >
                          {t('assessment.calorie.calculate')}
                        </Button>
                      </div>
                    </div>

                    {calorieResult && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-2xl bg-secondary/5 border border-secondary/10 p-6 md:p-8"
                      >
                        <div className="flex flex-col items-center text-center space-y-2 mb-8">
                          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">{t('assessment.calorie.dailyCalories')}</h3>
                          <div className="flex items-baseline gap-2">
                            <span className="text-6xl font-black text-secondary tracking-tighter shadow-secondary drop-shadow-sm">{calorieResult.calories}</span>
                            <span className="text-xl font-medium text-muted-foreground">kcal</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                          <div className="p-4 rounded-xl bg-background/60 border border-border/50 text-center space-y-1">
                            <p className="text-xs font-semibold text-muted-foreground uppercase">{t('assessment.calorie.protein')}</p>
                            <p className="text-2xl font-bold bg-gradient-to-br from-blue-500 to-blue-700 bg-clip-text text-transparent">{calorieResult.protein}g</p>
                          </div>
                          <div className="p-4 rounded-xl bg-background/60 border border-border/50 text-center space-y-1">
                            <p className="text-xs font-semibold text-muted-foreground uppercase">{t('assessment.calorie.carbs')}</p>
                            <p className="text-2xl font-bold bg-gradient-to-br from-green-500 to-green-700 bg-clip-text text-transparent">{calorieResult.carbs}g</p>
                          </div>
                          <div className="p-4 rounded-xl bg-background/60 border border-border/50 text-center space-y-1">
                            <p className="text-xs font-semibold text-muted-foreground uppercase">{t('assessment.calorie.fats')}</p>
                            <p className="text-2xl font-bold bg-gradient-to-br from-yellow-500 to-yellow-700 bg-clip-text text-transparent">{calorieResult.fats}g</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="child" className="focus-visible:ring-0">
            <div className="max-w-4xl mx-auto">
              <ChildAssessment />
            </div>
          </TabsContent>

          <TabsContent value="dds" className="focus-visible:ring-0">
            <div className="w-full">
              <DietaryDiversityTab />
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <SurveyCTA />
    </div>
  );
};

export default Assessment;
