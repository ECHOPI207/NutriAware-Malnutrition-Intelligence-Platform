import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/features/auth/firebase-auth-context';
import { collection, getDocs, query, orderBy, getCountFromServer, where, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { getDailyVisits, getTodayVisits, aggregateLocations, type DailyVisitData } from '@/services/visitorTracking';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Users,
  Shield,
  Activity,
  LogOut,

  TrendingUp,
  Crown,
  Stethoscope,
  User,
  Lock,
  Database,
  FileText,
  Eye,
  MapPin
} from 'lucide-react';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

interface UserProfile {
  id: string;
  email: string;
  displayName?: string;
  full_name?: string;
  role: string;
  createdAt?: any;
  created_at?: any;
  lastLogin?: any;
  last_login?: string;
  status: 'active' | 'inactive' | 'suspended';
  isActive?: boolean;
  phoneNumber?: string;
  address?: string;
}

interface SystemStats {
  totalUsers: number;
  adminUsers: number;
  nutritionistUsers: number;
  regularUsers: number;
  newUsersToday: number;
  newUsersWeek: number;
  newUsersMonth: number;
  growthRate: number;
  totalConversations: number;
  activeConversations: number;
  avgMessagesPerUser: number;
  totalAssessments: number;
  totalMealPlans: number;
  bmiCalculations: number;
  childAssessments: number;
}
const AdminDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [systemStats, setSystemStats] = useState<SystemStats>({
    totalUsers: 0,
    adminUsers: 0,
    nutritionistUsers: 0,
    regularUsers: 0,
    newUsersToday: 0,
    newUsersWeek: 0,
    newUsersMonth: 0,
    growthRate: 0,
    totalConversations: 0,
    activeConversations: 0,
    avgMessagesPerUser: 0,
    totalAssessments: 0,
    totalMealPlans: 0,
    bmiCalculations: 0,
    childAssessments: 0
  });
  const [visitorData, setVisitorData] = useState<DailyVisitData[]>([]);
  const [todayVisitCount, setTodayVisitCount] = useState(0);

  const isRTL = i18n.language === 'ar';

  useEffect(() => {
    loadAdminDashboardData();
  }, []);

  const loadAdminDashboardData = async () => {
    try {
      setLoading(true);
      await Promise.all([
        loadSystemStats(),
        loadVisitorData(),
      ]);
    } catch (error) {
      console.error('Error loading admin dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadVisitorData = async () => {
    const [visits, today] = await Promise.all([
      getDailyVisits(14),
      getTodayVisits(),
    ]);
    setVisitorData(visits);
    setTodayVisitCount(today);
  };

  const loadSystemStats = async () => {
    try {
      // 1. Load User Stats (Counts)
      const usersColl = collection(db, 'users');
      const [
        totalUsersSnap,
        adminUsersSnap,
        nutritionistUsersSnap,
        regularUsersSnap
      ] = await Promise.all([
        getCountFromServer(usersColl),
        getCountFromServer(query(usersColl, where('role', '==', 'admin'))),
        getCountFromServer(query(usersColl, where('role', '==', 'nutritionist'))),
        getCountFromServer(query(usersColl, where('role', '==', 'user')))
      ]);

      // Date ranges for new users
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

      const [
        newUsersTodaySnap,
        newUsersWeekSnap,
        newUsersMonthSnap
      ] = await Promise.all([
        getCountFromServer(query(usersColl, where('createdAt', '>=', today))),
        getCountFromServer(query(usersColl, where('createdAt', '>=', weekAgo))),
        getCountFromServer(query(usersColl, where('createdAt', '>=', monthAgo)))
      ]);

      // 2. Load System Content Stats
      const [
        conversationsSnap,
        assessmentsSnap,
        childAssessmentsSnap,
        mealPlansSnap
      ] = await Promise.all([
        getCountFromServer(collection(db, 'chat_conversations')),
        getCountFromServer(collection(db, 'bmi_calculations')),
        getCountFromServer(collection(db, 'child_assessments')),
        getCountFromServer(collection(db, 'meal_plans'))
      ]);

      // 3. Load Recent Users for List (Limit 50)
      const usersQuery = query(
        usersColl,
        orderBy('createdAt', 'desc'),
        limit(50)
      );
      const usersSnapshot = await getDocs(usersQuery);
      const usersData: UserProfile[] = usersSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          email: data.email || '',
          displayName: data.displayName || '',
          full_name: data.displayName || data.full_name || data.email?.split('@')[0] || '',
          role: data.role || 'user',
          createdAt: data.createdAt,
          created_at: data.createdAt?.toDate?.() || new Date(),
          lastLogin: data.lastLogin,
          status: data.isActive !== false ? 'active' : 'inactive' as const,
          isActive: data.isActive !== false,
          phoneNumber: data.phoneNumber,
          address: data.address
        };
      });

      // Calculate Growth Rate
      const totalUsers = totalUsersSnap.data().count;
      const newUsersMonth = newUsersMonthSnap.data().count;
      const growthRate = totalUsers > 0 ? (newUsersMonth / totalUsers) * 100 : 0;

      setSystemStats({
        totalUsers,
        adminUsers: adminUsersSnap.data().count,
        nutritionistUsers: nutritionistUsersSnap.data().count,
        regularUsers: regularUsersSnap.data().count,
        newUsersToday: newUsersTodaySnap.data().count,
        newUsersWeek: newUsersWeekSnap.data().count,
        newUsersMonth,
        growthRate: Math.round(growthRate * 100) / 100,
        totalConversations: conversationsSnap.data().count,
        activeConversations: conversationsSnap.data().count,
        avgMessagesPerUser: totalUsers > 0 ? Math.round(conversationsSnap.data().count / totalUsers) : 0,
        totalAssessments: assessmentsSnap.data().count + childAssessmentsSnap.data().count,
        totalMealPlans: mealPlansSnap.data().count,
        bmiCalculations: assessmentsSnap.data().count,
        childAssessments: childAssessmentsSnap.data().count
      });

      setUsers(usersData);
    } catch (error) {
      console.error('Error loading system stats:', error);
    }
  };

  const handleLogout = async () => {


    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      // Force redirect even if logout fails
      window.location.href = '/';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return <Crown className="h-4 w-4 text-yellow-600" />;
      case 'nutritionist': return <Stethoscope className="h-4 w-4 text-green-600" />;
      default: return <User className="h-4 w-4 text-gray-600" />;
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin': return isRTL ? 'مدير النظام' : 'Administrator';
      case 'nutritionist': return isRTL ? 'أخصائي تغذية' : 'Nutritionist';
      default: return isRTL ? 'مستخدم عادي' : 'Regular User';
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'nutritionist': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isRTL ? 'rtl' : 'ltr'}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">{isRTL ? 'جاري تحميل لوحة تحكم المدير...' : 'Loading Admin Dashboard...'}</p>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute requiredRole="admin">
      <div className={`min-h-screen bg-background ${isRTL ? 'rtl' : 'ltr'}`}>
        {/* Mobile Header (Gradient) */}
        <div className="bg-gradient-to-r from-yellow-600 to-amber-600 pb-20 pt-8 px-4 sm:px-6 lg:px-8 text-white">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-2">
              <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
                <Crown className="h-6 w-6 md:h-8 md:w-8 text-white/90" />
                {isRTL ? 'لوحة تحكم مدير النظام' : 'System Administrator'}
              </h1>
              <p className="text-white/80 text-sm md:text-base max-w-xl">
                {isRTL ? `مرحباً ${user?.displayName || user?.email} - تحكم كامل في منصة نيوتري أوير` : `Welcome ${user?.displayName || user?.email} - Full control over NutriAware platform`}
              </p>
            </div>
            <Button variant="destructive" onClick={handleLogout} className="bg-white/10 hover:bg-white/20 border-white/20 text-white backdrop-blur-sm shadow-none">
              <LogOut className="w-4 h-4 mr-2" />
              {isRTL ? 'تسجيل الخروج' : 'Logout'}
            </Button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-8">
            <Card className="border-none shadow-md hover:shadow-lg transition-all bg-gradient-to-br from-yellow-500 to-yellow-600 text-white col-span-2 md:col-span-1">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-sm font-medium text-yellow-100 flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  {isRTL ? 'إجمالي المستخدمين' : 'Total Users'}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-3xl font-bold">{systemStats.totalUsers}</div>
                <div className="flex items-center text-xs text-yellow-100 mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {isRTL ? 'مستخدم مسجل' : 'Registered users'}
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md hover:shadow-lg transition-all bg-white dark:bg-card">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Stethoscope className="h-4 w-4 text-green-500" />
                  {isRTL ? 'أخصائيو التغذية' : 'Nutritionists'}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-2xl font-bold">{systemStats.nutritionistUsers}</div>
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  {isRTL ? 'أخصائي تغذية' : 'Dietitians'}
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md hover:shadow-lg transition-all bg-white dark:bg-card">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Shield className="h-4 w-4 text-purple-500" />
                  {isRTL ? 'المديرين' : 'Admins'}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-2xl font-bold">{systemStats.adminUsers}</div>
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  {isRTL ? 'مدير نظام' : 'System admins'}
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md hover:shadow-lg transition-all bg-white dark:bg-card">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Activity className="h-4 w-4 text-rose-500" />
                  {isRTL ? 'جدد هذا الشهر' : 'New Monthly'}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-2xl font-bold">{systemStats.newUsersMonth}</div>
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {isRTL ? 'مستخدم' : 'users'}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Daily Visitor Analytics Chart */}
          <Card className="border-none shadow-md mb-8 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white">
              <CardTitle className="flex items-center gap-2 text-white">
                <Eye className="w-5 h-5" />
                {isRTL ? 'إحصائيات الزوار اليومية' : 'Daily Visitor Analytics'}
              </CardTitle>
              <CardDescription className="text-white/80">
                {isRTL ? `زوار اليوم: ${todayVisitCount} — آخر 14 يوم` : `Today: ${todayVisitCount} visitors — Last 14 days`}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              {visitorData.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Eye className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p>{isRTL ? 'لا توجد بيانات زيارات بعد' : 'No visitor data yet'}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Today highlight */}
                  <div className="flex items-center justify-between p-4 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold shadow-md">
                        <Eye className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-indigo-900 dark:text-indigo-100">{isRTL ? 'زوار اليوم' : "Today's Visitors"}</p>
                        <p className="text-xs text-indigo-600 dark:text-indigo-400">{new Date().toLocaleDateString('ar-EG', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
                      </div>
                    </div>
                    <div className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">{todayVisitCount}</div>
                  </div>

                  {/* Bar chart */}
                  <div className="mt-6">
                    <div className="flex items-end gap-1 h-40">
                      {visitorData.map((day, i) => {
                        const maxCount = Math.max(...visitorData.map(d => d.count), 1);
                        const heightPercent = (day.count / maxCount) * 100;
                        const isToday = i === visitorData.length - 1;
                        return (
                          <div key={day.date} className="flex-1 flex flex-col items-center gap-1 group relative">
                            {/* Tooltip */}
                            <div className="absolute -top-8 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                              {day.label}: {day.count} {isRTL ? 'زائر' : 'visits'}
                            </div>
                            {/* Count label */}
                            <span className="text-[10px] font-bold text-muted-foreground">{day.count}</span>
                            {/* Bar */}
                            <div
                              className={`w-full rounded-t-md transition-all duration-300 ${isToday
                                ? 'bg-gradient-to-t from-indigo-600 to-indigo-400 shadow-lg'
                                : 'bg-gradient-to-t from-slate-300 to-slate-200 dark:from-slate-700 dark:to-slate-600 hover:from-indigo-400 hover:to-indigo-300'
                                }`}
                              style={{ height: `${Math.max(heightPercent, 4)}%`, minHeight: '4px' }}
                            />
                          </div>
                        );
                      })}
                    </div>
                    {/* Date labels */}
                    <div className="flex gap-1 mt-2">
                      {visitorData.map((day, i) => (
                        <div key={day.date} className="flex-1 text-center">
                          <span className={`text-[9px] ${i === visitorData.length - 1
                            ? 'font-bold text-indigo-600 dark:text-indigo-400'
                            : 'text-muted-foreground'
                            }`}>
                            {day.label.split(' ')[0]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Summary stats row */}
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div className="text-center p-3 rounded-lg bg-slate-50 dark:bg-slate-900">
                      <p className="text-2xl font-bold text-foreground">{visitorData.reduce((sum, d) => sum + d.count, 0)}</p>
                      <p className="text-xs text-muted-foreground">{isRTL ? 'إجمالي الزيارات' : 'Total Visits'}</p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-slate-50 dark:bg-slate-900">
                      <p className="text-2xl font-bold text-foreground">
                        {visitorData.length > 0 ? Math.round(visitorData.reduce((sum, d) => sum + d.count, 0) / visitorData.length) : 0}
                      </p>
                      <p className="text-xs text-muted-foreground">{isRTL ? 'متوسط يومي' : 'Daily Average'}</p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-slate-50 dark:bg-slate-900">
                      <p className="text-2xl font-bold text-foreground">
                        {visitorData.length > 0 ? Math.max(...visitorData.map(d => d.count)) : 0}
                      </p>
                      <p className="text-xs text-muted-foreground">{isRTL ? 'أعلى يوم' : 'Peak Day'}</p>
                    </div>
                  </div>

                  {/* Visitor Locations */}
                  {(() => {
                    const topLocations = aggregateLocations(visitorData).slice(0, 8);
                    const maxLocCount = topLocations.length > 0 ? topLocations[0].count : 1;
                    return topLocations.length > 0 ? (
                      <div className="mt-6">
                        <h4 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-indigo-500" />
                          {isRTL ? 'المواقع الجغرافية للزوار' : 'Visitor Locations'}
                        </h4>
                        <div className="space-y-2">
                          {topLocations.map((loc, i) => (
                            <div key={i} className="flex items-center gap-3">
                              <span className="text-sm text-foreground w-36 truncate font-medium">{loc.location}</span>
                              <div className="flex-1 flex items-center gap-2">
                                <div className="flex-1 h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-500"
                                    style={{ width: `${Math.max((loc.count / maxLocCount) * 100, 2)}%` }}
                                  />
                                </div>
                                <span className="text-xs font-bold text-muted-foreground min-w-[20px] text-right">{loc.count}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : null;
                  })()}
                </div>
              )}
            </CardContent>
          </Card>

          {/* System Management Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="border-none shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-l-orange-500 cursor-pointer group" onClick={() => navigate('/admin/security')}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <Lock className="h-5 w-5 text-orange-500 group-hover:scale-110 transition-transform" />
                  {isRTL ? 'إعدادات الأمان' : 'Security Settings'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {isRTL ? 'إدارة حماية النظام وصلاحيات الوصول' : 'Manage system security and access controls'}
                </p>
                <div className="flex justify-end">
                  <Button variant="ghost" size="sm" className="text-orange-600 hover:text-orange-700 hover:bg-orange-50">
                    {isRTL ? 'فتح الإعدادات' : 'Open Settings'}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500 cursor-pointer group" onClick={() => navigate('/admin/backup')}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <Database className="h-5 w-5 text-blue-500 group-hover:scale-110 transition-transform" />
                  {isRTL ? 'النسخ الاحتياطي' : 'Backup Management'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {isRTL ? 'إدارة النسخ الاحتياطي واستعادة البيانات' : 'Manage system backups and data recovery'}
                </p>
                <div className="flex justify-end">
                  <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                    {isRTL ? 'إدارة النسخ' : 'Manage Backups'}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-l-green-500 cursor-pointer group" onClick={() => navigate('/admin/content')}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <FileText className="h-5 w-5 text-green-500 group-hover:scale-110 transition-transform" />
                  {isRTL ? 'إدارة المحتوى' : 'Content Management'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {isRTL ? 'إدارة المقالات والمحتوى التعليمي' : 'Manage articles and educational content'}
                </p>
                <div className="flex justify-end">
                  <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700 hover:bg-green-50">
                    {isRTL ? 'إدارة المحتوى' : 'Manage Content'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Users Management */}
          <Card className="border-none shadow-md overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-gray-800 to-gray-900 text-white">
              <CardTitle className="flex items-center gap-2 text-white">
                <Users className="w-5 h-5" />
                {isRTL ? 'إدارة المستخدمين' : 'User Management'}
              </CardTitle>
              <CardDescription className="text-white/80">
                {isRTL ? 'قائمة بجميع المستخدمين المسجلين' : 'List of all registered users'}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="p-4 space-y-3 max-h-[500px] overflow-y-auto custom-scrollbar">
                {users.map((user) => (
                  <div key={user.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-xl hover:bg-muted/30 transition-all duration-200 gap-4 bg-white dark:bg-card shadow-sm">
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center shadow-sm shrink-0">
                        {getRoleIcon(user.role)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-semibold text-foreground truncate">{user.full_name || user.displayName || user.email}</div>
                        <div className="text-xs md:text-sm text-muted-foreground truncate">{user.email}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">
                          {isRTL ? 'انضم في' : 'Joined'} {new Date(user.created_at || user.createdAt?.toDate?.() || new Date()).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <Badge className={`${getRoleBadgeColor(user.role)} px-3 py-1 rounded-full font-medium ml-auto sm:ml-0`}>
                      {getRoleLabel(user.role)}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AdminDashboard;