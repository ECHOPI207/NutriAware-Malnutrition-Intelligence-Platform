import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/features/auth/firebase-auth-context';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { usePatientStats } from './usePatientStats';
import { useProtocol } from './useProtocol';
import { motion } from 'framer-motion';
import {
  User, Activity, Target, Flame as FlameIcon, Zap, Bot,
  Stethoscope, Scale, Utensils, Droplets, Dumbbell, Pill, CalendarCheck
} from 'lucide-react';
import { getBMICategoryLabel } from '@/lib/bmi-utils';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const Dashboard: React.FC = () => {
  const { user, userProfile } = useAuth();
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();

  const { loading: statsLoading, healthData, userActivity } = usePatientStats();
  const { protocol, loading: protocolLoading, updateDailyChecklist, todayLog } = useProtocol();

  const isRTL = i18n.language === 'ar';

  useEffect(() => {
    if (userProfile?.role === 'admin') navigate('/admin/dashboard', { replace: true });
    else if (userProfile?.role === 'nutritionist') navigate('/doctor/dashboard', { replace: true });
  }, [userProfile?.role, navigate]);

  if (statsLoading || protocolLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center bg-gray-50/50 dark:bg-gray-950 ${isRTL ? 'rtl' : 'ltr'}`}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Greeting logic based on time
  const hour = new Date().getHours();
  const greeting = hour < 12 ? (isRTL ? 'صباح الخير' : 'Good Morning') :
    hour < 18 ? (isRTL ? 'مساء الخير' : 'Good Afternoon') :
      (isRTL ? 'مساء النور' : 'Good Evening');

  // Adherence calculation
  const totalTasks = 4;
  const completedTasks = todayLog ? Object.values(todayLog).filter(Boolean).length : 0;
  const adherencePercent = (completedTasks / totalTasks) * 100;

  return (
    <ProtectedRoute>
      <div className={`min-h-screen bg-gray-50 dark:bg-gray-950 pb-12 ${isRTL ? 'rtl' : 'ltr'} transition-colors duration-200`}>

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 pb-24 pt-12 px-6 lg:px-8 text-white">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <motion.div initial={{ opacity: 0, x: isRTL ? 20 : -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
                <User className="h-8 w-8 text-white/90" />
                {greeting}، {userProfile?.displayName?.split(' ')[0] || user?.displayName || 'المستخدم'}
              </h1>
              <p className="text-blue-100 text-base md:text-lg max-w-2xl">
                {isRTL
                  ? 'مرحباً بك في مساحتك الشخصية للتعافي والتغذية السليمة.'
                  : 'Welcome to your personal space for recovery and healthy nutrition.'}
              </p>
            </motion.div>

            {/* Protocol Phase Badge */}
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} delay={0.1}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 flex items-center gap-4 shadow-lg w-full md:w-auto">
              <div className="p-3 bg-white/20 rounded-full"><Target className="h-6 w-6 text-white" /></div>
              <div>
                <p className="text-sm text-blue-100">{isRTL ? 'المرحلة الحالية' : 'Current Phase'}</p>
                <p className="font-bold text-lg">{protocol?.phaseName}</p>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 space-y-6">

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Left Column: Daily Checklist & Quick Actions */}
            <div className="lg:col-span-1 space-y-6">

              {/* Daily Adherence Protocol */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} delay={0.2}>
                <Card className="border-none shadow-xl bg-white dark:bg-gray-900 rounded-2xl overflow-hidden">
                  <div className="h-2 bg-gradient-to-r from-green-400 to-emerald-500 w-full"></div>
                  <CardHeader className="pb-2 text-center">
                    <CardTitle className="flex justify-center mb-2">
                      <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-full">
                        <CalendarCheck className="w-6 h-6" />
                      </div>
                    </CardTitle>
                    <CardTitle>{isRTL ? 'مهام اليوم' : 'Daily Checklist'}</CardTitle>
                    <CardDescription>
                      {isRTL ? 'اكمل مهامك لرفع نسبة التزامك بالبروتوكول' : 'Complete tasks to improve your protocol adherence'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm font-medium">
                        <span className="text-gray-500 dark:text-gray-400">{isRTL ? 'مستوى الالتزام' : 'Adherence'}</span>
                        <span className={adherencePercent === 100 ? 'text-emerald-500 font-bold' : ''}>{adherencePercent}%</span>
                      </div>
                      <Progress value={adherencePercent} className="h-2" indicatorClassName={adherencePercent === 100 ? 'bg-emerald-500' : 'bg-primary'} />
                    </div>

                    <div className="space-y-3">
                      <Button
                        variant={todayLog?.water_goal_met ? 'default' : 'outline'}
                        className={`w-full justify-start h-12 transition-all ${todayLog?.water_goal_met ? 'bg-emerald-500 hover:bg-emerald-600' : ''}`}
                        onClick={() => updateDailyChecklist({ water_goal_met: !todayLog?.water_goal_met })}
                      >
                        <Droplets className="w-5 h-5 me-3" />
                        {isRTL ? 'شربت 2 لتر ماء' : 'Drank 2L Water'}
                      </Button>

                      <Button
                        variant={todayLog?.macros_met ? 'default' : 'outline'}
                        className={`w-full justify-start h-12 transition-all ${todayLog?.macros_met ? 'bg-emerald-500 hover:bg-emerald-600' : ''}`}
                        onClick={() => updateDailyChecklist({ macros_met: !todayLog?.macros_met })}
                      >
                        <Utensils className="w-5 h-5 me-3" />
                        {isRTL ? 'التزمت بالسعرات المحددة' : 'Met Daily Macros'}
                      </Button>

                      <Button
                        variant={todayLog?.supplements_taken ? 'default' : 'outline'}
                        className={`w-full justify-start h-12 transition-all ${todayLog?.supplements_taken ? 'bg-emerald-500 hover:bg-emerald-600' : ''}`}
                        onClick={() => updateDailyChecklist({ supplements_taken: !todayLog?.supplements_taken })}
                      >
                        <Pill className="w-5 h-5 me-3" />
                        {isRTL ? 'تناولت المكملات الغذائية' : 'Took Supplements'}
                      </Button>

                      <Button
                        variant={todayLog?.exercise_completed ? 'default' : 'outline'}
                        className={`w-full justify-start h-12 transition-all ${todayLog?.exercise_completed ? 'bg-emerald-500 hover:bg-emerald-600' : ''}`}
                        onClick={() => updateDailyChecklist({ exercise_completed: !todayLog?.exercise_completed })}
                      >
                        <Dumbbell className="w-5 h-5 me-3" />
                        {isRTL ? 'أنهيت التمارين الرياضية' : 'Completed Exercise'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Quick Actions */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} delay={0.3}>
                <Card className="border-none shadow-xl bg-white dark:bg-gray-900 rounded-2xl">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Zap className="w-5 h-5 text-yellow-500" />
                      {isRTL ? 'إجراءات سريعة' : 'Quick Actions'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="h-auto py-4 flex flex-col gap-2 hover:border-primary/50 group" onClick={() => navigate('/assessment')}>
                      <Scale className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
                      <span className="font-semibold">{isRTL ? 'تحديث الوزن' : 'Update Weight'}</span>
                    </Button>
                    <Button variant="outline" className="h-auto py-4 flex flex-col gap-2 hover:border-blue-500 group" onClick={() => navigate('/ai-tools')}>
                      <Bot className="h-6 w-6 text-blue-500 group-hover:scale-110 transition-transform" />
                      <span className="font-semibold">{isRTL ? 'المساعد الطبي' : 'AI Assistant'}</span>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Right Column: Health Snapshot & Charts */}
            <div className="lg:col-span-2 space-y-6">

              {/* Health Snapshot Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} delay={0.4}>
                  <Card className="border-none shadow-xl bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl relative overflow-hidden group">
                    <div className="absolute right-0 top-0 p-4 opacity-5 group-hover:scale-110 transition-transform"><Activity size={80} /></div>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <p className="text-gray-500 dark:text-gray-400 font-medium">{isRTL ? 'مؤشر كتلة الجسم الحالي' : 'Current BMI'}</p>
                        <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><Activity className="w-5 h-5" /></div>
                      </div>
                      <div className="flex items-end gap-3">
                        <span className="text-4xl font-bold">{healthData.currentBMI || '--'}</span>
                        <div className="pb-1">
                          <span className="inline-block px-2 py-1 bg-white dark:bg-gray-700 text-xs font-semibold rounded-md shadow-sm border border-gray-100 dark:border-gray-600">
                            {getBMICategoryLabel(healthData.bmiCategory, i18n.language)}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} delay={0.5}>
                  <Card className="border-none shadow-xl bg-gradient-to-br from-white to-purple-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl relative overflow-hidden group">
                    <div className="absolute right-0 top-0 p-4 opacity-5 group-hover:scale-110 transition-transform"><FlameIcon size={80} /></div>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <p className="text-gray-500 dark:text-gray-400 font-medium">{isRTL ? 'الهدف اليومي للسعرات' : 'Daily Calorie Goal'}</p>
                        <div className="p-2 bg-purple-100 text-purple-600 rounded-lg"><FlameIcon className="w-5 h-5" /></div>
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold">{healthData.dailyCalories || '--'}</span>
                        <span className="text-sm text-gray-500 font-medium">kcal</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Activity Chart */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} delay={0.6}>
                <Card className="border-none shadow-xl bg-white dark:bg-gray-900 rounded-2xl">
                  <CardHeader className="pb-2 flex flex-row items-center justify-between">
                    <CardTitle className="text-lg">{isRTL ? 'نشاطك الأسبوعي' : 'Weekly Activity'}</CardTitle>
                    <Button variant="ghost" size="sm" onClick={() => navigate('/activity-log')} className="text-primary">
                      {isRTL ? 'عرض السجل' : 'View Log'}
                    </Button>
                  </CardHeader>
                  <CardContent className="h-[250px] pt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={userActivity.weeklyProgress}>
                        <defs>
                          <linearGradient id="colorActivity" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.2} />
                        <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#888' }} dy={10} />
                        <Tooltip
                          contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)' }}
                          cursor={{ stroke: '#4f46e5', strokeWidth: 1, strokeDasharray: '4 4' }}
                        />
                        <Area type="monotone" dataKey="activities" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorActivity)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Doctor Consultation CTA */}
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} delay={0.7}>
                <div className="bg-gradient-to-r from-teal-500 to-emerald-600 rounded-2xl p-6 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm">
                      <Stethoscope className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">{isRTL ? 'بحاجة إلى استشارة طبية؟' : 'Need medical guidance?'}</h3>
                      <p className="text-teal-50 max-w-md">{isRTL ? 'تحدث مع أخصائي التغذية الخاص بك مباشرة من خلال المنصة لمراجعة بروتوكولك.' : 'Speak with your nutritionist directly to review your protocol.'}</p>
                    </div>
                  </div>
                  <Button className="bg-white text-emerald-600 hover:bg-gray-50 flex-shrink-0 w-full md:w-auto h-12 px-8 font-bold shadow-sm" onClick={() => navigate('/medical-consultation')}>
                    {isRTL ? 'طلب استشارة' : 'Book Consultation'}
                  </Button>
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
