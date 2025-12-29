import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Calculator, Activity, Baby } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ChildAssessment from '@/components/ChildAssessment';
import { calculateBMI, calculateDailyCalories, calculateMacros } from '@/lib/bmi-utils';
import { useAuth } from '@/features/auth/firebase-auth-context';
import { createBMICalculation, createCalorieCalculation } from '@/db/api';
import { getSessionId } from '@/lib/session';
import { useToast } from '@/hooks/use-toast';

const Assessment: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { toast } = useToast();

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
    const height = Number.parseFloat(bmiData.height); // keep as cm for consistency with input, convert in helper or here? helper expects cm

    if (!weight || !height || weight <= 0 || height <= 0) {
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
        toast({
            title: "Error",
            description: "Failed to save assessment data.",
            variant: "destructive"
        });
      }
    };
    saveToDb();
  };

  const calculateCaloriesValue = () => {
    const weight = Number.parseFloat(calorieData.weight);
    const height = Number.parseFloat(calorieData.height);
    const age = Number.parseFloat(calorieData.age);

    if (!weight || !height || !age || !calorieData.gender || !calorieData.activity || !calorieData.goal) {
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
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl xl:text-5xl font-bold mb-4">
            <span className="gradient-text">{t('assessment.title')}</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            {t('assessment.subtitle')}
          </p>
        </motion.div>

        <Tabs defaultValue="bmi" className="w-full">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 h-auto mb-8 gap-2">
            <TabsTrigger value="bmi" className="flex items-center justify-center gap-2">
              <Calculator className="w-4 h-4" />
              <span>{t('assessment.bmi.title')}</span>
            </TabsTrigger>
            <TabsTrigger value="calorie" className="flex items-center justify-center gap-2">
              <Activity className="w-4 h-4" />
              <span>{t('assessment.calorie.title')}</span>
            </TabsTrigger>
            <TabsTrigger value="child" className="flex items-center justify-center gap-2">
              <Baby className="w-4 h-4" />
              <span>{t('assessment.child.title', 'تقييم الطفل')}</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="bmi">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calculator className="h-6 w-6 text-primary" />
                      {t('assessment.bmi.title')}
                    </CardTitle>
                    <CardDescription>{t('assessment.bmi.description')}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="bmi-weight">{t('assessment.bmi.weight')}</Label>
                      <Input
                        id="bmi-weight"
                        type="number"
                        placeholder="70"
                        value={bmiData.weight}
                        onChange={(e) => setBmiData({ ...bmiData, weight: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bmi-height">{t('assessment.bmi.height')}</Label>
                      <Input
                        id="bmi-height"
                        type="number"
                        placeholder="170"
                        value={bmiData.height}
                        onChange={(e) => setBmiData({ ...bmiData, height: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bmi-age">{t('assessment.bmi.age')}</Label>
                      <Input
                        id="bmi-age"
                        type="number"
                        placeholder="25"
                        value={bmiData.age}
                        onChange={(e) => setBmiData({ ...bmiData, age: e.target.value })}
                      />
                    </div>
                    <Button onClick={calculateBMIValue} className="w-full">
                      {t('assessment.bmi.calculate')}
                    </Button>

                    {bmiResult && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 p-4 bg-muted rounded-lg space-y-4"
                      >
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground mb-2">{t('assessment.bmi.result')}</p>
                          <p className="text-4xl font-bold text-primary">{bmiResult.bmi}</p>
                          <p className="text-lg font-semibold mt-2">{t(`assessment.bmi.status.${bmiResult.category}`)}</p>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>{t('assessment.bmi.status.underweight')}</span>
                            <span>{t('assessment.bmi.status.normal')}</span>
                            <span>{t('assessment.bmi.status.overweight')}</span>
                            <span>{t('assessment.bmi.status.obese')}</span>
                          </div>
                          <Progress value={getBMIProgress(bmiResult.bmi)} className="h-2" />
                        </div>
                        <div className="pt-4 border-t">
                          <p className="text-sm font-semibold mb-2">{t('assessment.bmi.recommendations')}</p>
                          <p className="text-sm text-muted-foreground">{t(`assessment.bmi.advice.${bmiResult.category}`)}</p>
                        </div>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="calorie">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-6 w-6 text-secondary" />
                      {t('assessment.calorie.title')}
                    </CardTitle>
                    <CardDescription>{t('assessment.calorie.description')}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="cal-weight-2">{t('assessment.bmi.weight')}</Label>
                        <Input
                          id="cal-weight-2"
                          type="number"
                          placeholder="70"
                          value={calorieData.weight}
                          onChange={(e) => setCalorieData({ ...calorieData, weight: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cal-height-2">{t('assessment.bmi.height')}</Label>
                        <Input
                          id="cal-height-2"
                          type="number"
                          placeholder="170"
                          value={calorieData.height}
                          onChange={(e) => setCalorieData({ ...calorieData, height: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cal-age-2">{t('assessment.bmi.age')}</Label>
                      <Input
                        id="cal-age-2"
                        type="number"
                        placeholder="25"
                        value={calorieData.age}
                        onChange={(e) => setCalorieData({ ...calorieData, age: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cal-gender-2">{t('assessment.calorie.gender')}</Label>
                      <Select value={calorieData.gender} onValueChange={(value) => setCalorieData({ ...calorieData, gender: value })}>
                        <SelectTrigger id="cal-gender-2">
                          <SelectValue placeholder={t('assessment.calorie.gender')} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">{t('assessment.calorie.male')}</SelectItem>
                          <SelectItem value="female">{t('assessment.calorie.female')}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cal-activity-2">{t('assessment.calorie.activity')}</Label>
                      <Select value={calorieData.activity} onValueChange={(value) => setCalorieData({ ...calorieData, activity: value })}>
                        <SelectTrigger id="cal-activity-2">
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
                      <Label htmlFor="cal-goal-2">{t('assessment.calorie.goal')}</Label>
                      <Select value={calorieData.goal} onValueChange={(value) => setCalorieData({ ...calorieData, goal: value })}>
                        <SelectTrigger id="cal-goal-2">
                          <SelectValue placeholder={t('assessment.calorie.goal')} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="maintain">{t('assessment.calorie.maintain')}</SelectItem>
                          <SelectItem value="lose">{t('assessment.calorie.lose')}</SelectItem>
                          <SelectItem value="gain">{t('assessment.calorie.gain')}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button onClick={calculateCaloriesValue} className="w-full">
                      {t('assessment.calorie.calculate')}
                    </Button>

                    {calorieResult && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 p-4 bg-muted rounded-lg space-y-4"
                      >
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground mb-2">{t('assessment.calorie.dailyCalories')}</p>
                          <p className="text-4xl font-bold text-secondary">{calorieResult.calories}</p>
                          <p className="text-sm text-muted-foreground">kcal/day</p>
                        </div>
                        <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                          <div className="text-center">
                            <p className="text-sm text-muted-foreground mb-1">{t('assessment.calorie.protein')}</p>
                            <p className="text-2xl font-bold text-foreground">{calorieResult.protein}g</p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-muted-foreground mb-1">{t('assessment.calorie.carbs')}</p>
                            <p className="text-2xl font-bold text-primary">{calorieResult.carbs}g</p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-muted-foreground mb-1">{t('assessment.calorie.fats')}</p>
                            <p className="text-2xl font-bold text-secondary">{calorieResult.fats}g</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="child">
            <ChildAssessment />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Assessment;
