import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/features/auth/firebase-auth-context';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { usePatientStats } from './usePatientStats';
import {
  User,
  BarChart3,
  Activity,
  MessageSquare,
  Heart,
  Target,
  Apple,
  Zap,
  Bot,
  Stethoscope,
  Scale,
  Ruler,
  Utensils,
  Calculator,
  Baby,
  Flame as FlameIcon,
  FileCheck
} from 'lucide-react';
import { getBMICategoryLabel } from '@/lib/bmi-utils';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

const Dashboard: React.FC = () => {
  const { user, userProfile } = useAuth();
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  
  const { loading, healthData, userActivity } = usePatientStats();

  const isRTL = i18n.language === 'ar';

  // Redirect admin users to admin dashboard, doctors to doctor dashboard
  useEffect(() => {
    if (userProfile?.role === 'admin') {
      navigate('/admin/dashboard', { replace: true });
    } else if (userProfile?.role === 'doctor') {
      navigate('/doctor/dashboard', { replace: true });
    }
  }, [userProfile?.role, navigate]);

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isRTL ? 'rtl' : 'ltr'}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">{isRTL ? 'جاري تحميل لوحة التحكم...' : 'Loading Dashboard...'}</p>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className={`min-h-screen bg-background ${isRTL ? 'rtl' : 'ltr'}`}>
        {/* Mobile Header (Gradient) */}
        <div className="bg-gradient-to-r from-primary to-blue-600 pb-20 pt-8 px-4 sm:px-6 lg:px-8 text-white">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-2">
              <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
                <User className="h-6 w-6 md:h-8 md:w-8 text-white/90" />
                {isRTL ? `مرحباً، ${userProfile?.displayName || user?.displayName || 'المستخدم'}` : `Welcome, ${userProfile?.displayName || user?.displayName || 'User'}`}
              </h1>
              <p className="text-white/80 text-sm md:text-base max-w-xl">
                {isRTL ? 'لوحة تحكمك الشخصية لمتابعة صحتك وتغذيتك.' : 'Your personal dashboard to track health and nutrition.'}
              </p>
            </div>
            <Badge variant="outline" className="text-white border-white/30 bg-white/10 px-3 py-1 text-sm backdrop-blur-sm">
              {isRTL ? 'مستخدم عادي' : 'Regular User'}
            </Badge>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">

            {/* Scrollable Tabs for Mobile */}
            <div className="overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
              <TabsList className="bg-background/95 backdrop-blur shadow-sm border p-1 h-auto flex w-max md:w-full md:grid md:grid-cols-5 gap-1 rounded-xl">
                <TabsTrigger value="overview" className="px-4 py-2.5 rounded-lg data-[state=active]:bg-primary/10 data-[state=active]:text-primary flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  <span>{isRTL ? 'الرئيسية' : 'Overview'}</span>
                </TabsTrigger>
                <TabsTrigger value="health" className="px-4 py-2.5 rounded-lg data-[state=active]:bg-primary/10 data-[state=active]:text-primary flex items-center gap-2">
                  <Heart className="h-4 w-4" />
                  <span>{isRTL ? 'صحتي' : 'My Health'}</span>
                </TabsTrigger>
                <TabsTrigger value="nutrition" className="px-4 py-2.5 rounded-lg data-[state=active]:bg-primary/10 data-[state=active]:text-primary flex items-center gap-2">
                  <Apple className="h-4 w-4" />
                  <span>{isRTL ? 'التغذية' : 'Nutrition'}</span>
                </TabsTrigger>
                <TabsTrigger value="chat" className="px-4 py-2.5 rounded-lg data-[state=active]:bg-primary/10 data-[state=active]:text-primary flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  <span>{isRTL ? 'المساعد الذكي' : 'Smart Assistant'}</span>
                </TabsTrigger>
                <TabsTrigger value="tools" className="px-4 py-2.5 rounded-lg data-[state=active]:bg-primary/10 data-[state=active]:text-primary flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  <span>{isRTL ? 'الأدوات' : 'Tools'}</span>
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

              {/* Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
                <Card className="border-none shadow-md hover:shadow-lg transition-all bg-gradient-to-br from-blue-500 to-blue-600 text-white overflow-hidden relative group">
                  <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:scale-110 transition-transform"><Activity size={60} /></div>
                  <CardContent className="p-4 md:p-6 relative z-10">
                    <p className="text-blue-100 text-xs md:text-sm font-medium mb-1">{isRTL ? 'مؤشر كتلة الجسم' : 'Current BMI'}</p>
                    <div className="text-2xl md:text-4xl font-bold flex items-end gap-2">
                      {healthData.currentBMI || '--'}
                      <span className="text-sm md:text-base font-normal text-blue-100 mb-1">{getBMICategoryLabel(healthData.bmiCategory, i18n.language)}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-md hover:shadow-lg transition-all bg-white dark:bg-card border-l-4 border-l-green-500">
                  <CardContent className="p-4 md:p-6">
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-muted-foreground text-xs md:text-sm font-medium">{isRTL ? 'الوزن المثالي' : 'Ideal Weight'}</p>
                      <Target className="h-4 w-4 text-green-500" />
                    </div>
                    <div className="text-2xl md:text-3xl font-bold text-foreground">
                      {healthData.idealWeight || '--'} <span className="text-sm text-muted-foreground font-normal">kg</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-md hover:shadow-lg transition-all bg-white dark:bg-card border-l-4 border-l-purple-500">
                  <CardContent className="p-4 md:p-6">
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-muted-foreground text-xs md:text-sm font-medium">{isRTL ? 'السعرات اليومية' : 'Daily Calories'}</p>
                      <FlameIcon className="h-4 w-4 text-purple-500" />
                    </div>
                    <div className="text-2xl md:text-3xl font-bold text-foreground">
                      {healthData.dailyCalories || '--'} <span className="text-sm text-muted-foreground font-normal">kcal</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-md hover:shadow-lg transition-all bg-white dark:bg-card border-l-4 border-l-orange-500">
                  <CardContent className="p-4 md:p-6">
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-muted-foreground text-xs md:text-sm font-medium">{isRTL ? 'التقييمات' : 'Assessments'}</p>
                      <FileCheck className="h-4 w-4 text-orange-500" />
                    </div>
                    <div className="text-2xl md:text-3xl font-bold text-foreground">
                      {userActivity.totalAssessments}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Action Buttons Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {/* Quick Actions */}
                <div className="space-y-4">
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-500" />
                    {isRTL ? 'إجراءات سريعة' : 'Quick Actions'}
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="h-auto py-4 flex flex-col gap-2 hover:bg-primary/5 hover:border-primary/50 transition-all group" onClick={() => navigate('/assessment')}>
                      <Scale className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
                      <span className="font-semibold">{isRTL ? 'حساب BMI' : 'Calculate BMI'}</span>
                    </Button>
                    <Button variant="outline" className="h-auto py-4 flex flex-col gap-2 hover:bg-primary/5 hover:border-primary/50 transition-all group" onClick={() => navigate('/ai-tools')}>
                      <Bot className="h-6 w-6 text-blue-500 group-hover:scale-110 transition-transform" />
                      <span className="font-semibold">{isRTL ? 'شات طبي' : 'Medical Chat'}</span>
                    </Button>
                    <Button variant="outline" className="h-auto py-4 flex flex-col gap-2 hover:bg-primary/5 hover:border-primary/50 transition-all group" onClick={() => navigate('/ai-tools')}>
                      <Utensils className="h-6 w-6 text-orange-500 group-hover:scale-110 transition-transform" />
                      <span className="font-semibold">{isRTL ? 'وجباتي' : 'Meal Plan'}</span>
                    </Button>
                    <Button variant="outline" className="h-auto py-4 flex flex-col gap-2 hover:bg-primary/5 hover:border-primary/50 transition-all group" onClick={() => navigate('/medical-consultation')}>
                      <Stethoscope className="h-6 w-6 text-green-500 group-hover:scale-110 transition-transform" />
                      <span className="font-semibold">{isRTL ? 'استشارة' : 'Consultation'}</span>
                    </Button>
                  </div>
                </div>

                {/* Weekly Activity Chart */}
                <Card className="border-none shadow-md">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-semibold">{isRTL ? 'نشاطك الأسبوعي' : 'Weekly Activity'}</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={userActivity.weeklyProgress}>
                        <defs>
                          <linearGradient id="colorActivity" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.3} />
                        <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} />
                        <Tooltip
                          contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                          cursor={{ stroke: '#3b82f6', strokeWidth: 1, strokeDasharray: '4 4' }}
                        />
                        <Area type="monotone" dataKey="activities" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorActivity)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

            </TabsContent>

            {/* Other Tabs Content Placeholder - Keeping existing structure but wrapped */}
            <TabsContent value="health">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* BMI Progress */}
                <Card className="border-none shadow-md">
                  <CardHeader>
                    <CardTitle>{isRTL ? 'سجل الوزن' : 'Weight History'}</CardTitle>
                    <CardDescription>{isRTL ? 'تتبع تغير وزنك ومؤشر الكتلة' : 'Track weight and BMI changes'}</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    {healthData.bmiHistory.length > 0 ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={healthData.bmiHistory}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.3} />
                          <XAxis dataKey="date" axisLine={false} tickLine={false} />
                          <YAxis axisLine={false} tickLine={false} />
                          <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                          <Line type="monotone" dataKey="bmi" stroke="#3b82f6" strokeWidth={3} activeDot={{ r: 6 }} />
                        </LineChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="h-full flex flex-col items-center justify-center text-muted-foreground opacity-50">
                        <Scale className="h-12 w-12 mb-2" />
                        <p>{isRTL ? 'لا توجد بيانات' : 'No data yet'}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Body Metrics */}
                <Card className="border-none shadow-md">
                  <CardHeader>
                    <CardTitle>{isRTL ? 'القياسات الحالية' : 'Current Metrics'}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between p-3 bg-secondary/5 rounded-lg border border-secondary/10">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-secondary/10 rounded-full text-secondary"><Scale className="h-5 w-5" /></div>
                        <span className="font-medium">{isRTL ? 'الوزن' : 'Weight'}</span>
                      </div>
                      <span className="text-xl font-bold">{healthData.currentWeight || '--'} <span className="text-sm font-normal text-muted-foreground">kg</span></span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg border border-primary/10">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-full text-primary"><Ruler className="h-5 w-5" /></div>
                        <span className="font-medium">{isRTL ? 'الطول' : 'Height'}</span>
                      </div>
                      <span className="text-xl font-bold">{healthData.height || '--'} <span className="text-sm font-normal text-muted-foreground">cm</span></span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Nutrition Tab */}
            <TabsContent value="nutrition">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Macros Circle */}
                <Card className="md:col-span-1 border-none shadow-md bg-gradient-to-br from-slate-900 to-slate-800 text-white">
                  <CardHeader>
                    <CardTitle className="text-white">{isRTL ? 'احتياجك اليومي' : 'Daily Needs'}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center justify-center py-8">
                    <div className="relative h-40 w-40 flex items-center justify-center rounded-full border-8 border-primary/30">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-white">{healthData.dailyCalories}</div>
                        <div className="text-xs text-white/60">kcal</div>
                      </div>
                      <div className="absolute inset-0 rounded-full border-t-8 border-primary rotate-45"></div>
                    </div>
                  </CardContent>
                </Card>

                {/* Detailed Macros */}
                <Card className="md:col-span-2 border-none shadow-md">
                  <CardHeader>
                    <CardTitle>{isRTL ? 'تفاصيل العناصر الغذائية' : 'Macronutrients Breakdown'}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-500"></div> {isRTL ? 'بروتين' : 'Protein'}</span>
                        <span className="font-bold">{healthData.macros.protein}g</span>
                      </div>
                      <Progress value={30} className="h-2 bg-red-100 dark:bg-red-900/20" indicatorClassName="bg-red-500" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500"></div> {isRTL ? 'كربوهيدرات' : 'Carbs'}</span>
                        <span className="font-bold">{healthData.macros.carbs}g</span>
                      </div>
                      <Progress value={50} className="h-2 bg-blue-100 dark:bg-blue-900/20" indicatorClassName="bg-blue-500" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-yellow-500"></div> {isRTL ? 'دهون' : 'Fats'}</span>
                        <span className="font-bold">{healthData.macros.fats}g</span>
                      </div>
                      <Progress value={20} className="h-2 bg-yellow-100 dark:bg-yellow-900/20" indicatorClassName="bg-yellow-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Chat & Tools Placeholders (Simplified for brevity, following pattern) */}
            <TabsContent value="chat">
              <Card className="border-none shadow-md text-center py-12">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <MessageSquare className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{isRTL ? 'محادثاتك' : 'Your Conversations'}</h3>
                <p className="text-muted-foreground mb-6 max-w-sm mx-auto">{isRTL ? 'تواصل مع المساعد الذكي أو الأطباء مباشرة' : 'Connect with AI Assistant or Doctors directly'}</p>
                <div className="flex justify-center gap-4">
                  <Button onClick={() => navigate('/ai-tools')}>{isRTL ? 'مساعد AI' : 'AI Assistant'}</Button>
                  <Button variant="outline" onClick={() => navigate('/medical-consultation')}>{isRTL ? 'طبيب بشري' : 'Human Doctor'}</Button>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="tools">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card className="hover:border-primary/50 transition-colors cursor-pointer" onClick={() => navigate('/assessment')}>
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="p-3 bg-blue-100 text-blue-600 rounded-lg"><Calculator className="h-6 w-6" /></div>
                    <div>
                      <h4 className="font-bold">{isRTL ? 'حاسبة BMI' : 'BMI Calculator'}</h4>
                      <p className="text-sm text-muted-foreground">{isRTL ? 'للبالغين' : 'For Adults'}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="hover:border-primary/50 transition-colors cursor-pointer" onClick={() => navigate('/assessment')}>
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="p-3 bg-green-100 text-green-600 rounded-lg"><Baby className="h-6 w-6" /></div>
                    <div>
                      <h4 className="font-bold">{isRTL ? 'نمو الطفل' : 'Child Growth'}</h4>
                      <p className="text-sm text-muted-foreground">{isRTL ? 'متابعة النمو' : 'Track Growth'}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

          </Tabs>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
