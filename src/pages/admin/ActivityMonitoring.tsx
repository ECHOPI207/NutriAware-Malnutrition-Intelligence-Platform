import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/features/auth/firebase-auth-context';
import { collection, query, getDocs, limit, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Activity,
  Users,
  Shield,
  Clock,
  TrendingUp,
  BarChart3,
  User,
  Stethoscope,
  FileText
} from 'lucide-react';
import { motion } from 'framer-motion';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  userRole: string;
  action: string;
  details: string;
  timestamp: any;
  ipAddress?: string;
}

interface UserStats {
  totalUsers: number;
  activeUsers: number;
  newUsers: number;
  adminUsers: number;
  doctorUsers: number;
  regularUsers: number;
}

const ActivityMonitoring: React.FC = () => {
  const { i18n } = useTranslation();
  const { userProfile } = useAuth();
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [userStats, setUserStats] = useState<UserStats>({
    totalUsers: 0,
    activeUsers: 0,
    newUsers: 0,
    adminUsers: 0,
    doctorUsers: 0,
    regularUsers: 0
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  const isRTL = i18n.language === 'ar';

  useEffect(() => {
    if (userProfile?.role === 'admin') {
      fetchActivityData();
      fetchUserStats();
    }
  }, [userProfile]);

  const fetchActivityData = async () => {
    try {
      const q = query(
        collection(db, 'audit_logs'),
        orderBy('timestamp', 'desc'),
        limit(50)
      );

      const querySnapshot = await getDocs(q);
      const logs: ActivityLog[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        logs.push({
          id: doc.id,
          userId: data.actorId,
          userName: data.actorEmail || 'Unknown', // Fallback to email as name might not be in log
          userRole: 'system', // We might need to fetch this or store it in log
          action: data.action,
          details: data.details || '',
          timestamp: data.timestamp?.toDate() || new Date(),
          ipAddress: data.ipAddress
        });
      });

      setActivities(logs);
    } catch (error) {
      console.error('Error fetching activity data:', error);
    }
  };

  const fetchUserStats = async () => {
    try {
      setLoading(true);

      // Fetch real user data
      const usersQuery = query(collection(db, 'users'));
      const usersSnapshot = await getDocs(usersQuery);

      let totalUsers = 0;
      let adminUsers = 0;
      let doctorUsers = 0;
      let regularUsers = 0;
      let newUsers = 0;

      const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

      usersSnapshot.forEach((doc) => {
        const userData = doc.data();
        totalUsers++;

        // Count by role
        if (userData.role === 'admin') adminUsers++;
        else if (userData.role === 'doctor') doctorUsers++;
        else regularUsers++;

        // Count new users (created in last week)
        if (userData.createdAt && userData.createdAt.toDate() > oneWeekAgo) {
          newUsers++;
        }
      });

      setUserStats({
        totalUsers,
        activeUsers: Math.floor(totalUsers * 0.7), // Mock active users
        newUsers,
        adminUsers,
        doctorUsers,
        regularUsers
      });
    } catch (error) {
      console.error('Error fetching user stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const getActivityIcon = (action: string) => {
    switch (action) {
      case 'login': return <User className="h-4 w-4 text-green-600" />;
      case 'consultation_reply': return <Stethoscope className="h-4 w-4 text-blue-600" />;
      case 'assessment': return <BarChart3 className="h-4 w-4 text-purple-600" />;
      case 'user_management': return <Shield className="h-4 w-4 text-red-600" />;
      default: return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  const getRoleBadge = (role: string) => {
    const roleMap = {
      admin: { label: isRTL ? 'مدير' : 'Admin', variant: 'destructive' as const },
      doctor: { label: isRTL ? 'طبيب' : 'Doctor', variant: 'default' as const },
      user: { label: isRTL ? 'مستخدم' : 'User', variant: 'secondary' as const }
    };

    const roleInfo = roleMap[role as keyof typeof roleMap] || roleMap.user;
    return <Badge variant={roleInfo.variant}>{roleInfo.label}</Badge>;
  };

  // Mock chart data
  const dailyActivityData = [
    { day: isRTL ? 'السبت' : 'Sat', activities: 45 },
    { day: isRTL ? 'الأحد' : 'Sun', activities: 52 },
    { day: isRTL ? 'الاثنين' : 'Mon', activities: 38 },
    { day: isRTL ? 'الثلاثاء' : 'Tue', activities: 61 },
    { day: isRTL ? 'الأربعاء' : 'Wed', activities: 55 },
    { day: isRTL ? 'الخميس' : 'Thu', activities: 67 },
    { day: isRTL ? 'الجمعة' : 'Fri', activities: 43 }
  ];

  const userRoleData = [
    { name: isRTL ? 'مستخدمين عاديين' : 'Regular Users', value: userStats.regularUsers, color: '#8884d8' },
    { name: isRTL ? 'أطباء' : 'Doctors', value: userStats.doctorUsers, color: '#82ca9d' },
    { name: isRTL ? 'مديرين' : 'Admins', value: userStats.adminUsers, color: '#ffc658' }
  ];

  if (userProfile?.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <Shield className="h-16 w-16 mx-auto mb-4 text-red-500" />
            <h2 className="text-xl font-semibold mb-2">
              {isRTL ? 'غير مصرح' : 'Unauthorized'}
            </h2>
            <p className="text-muted-foreground">
              {isRTL ? 'هذه الصفحة مخصصة لمديري النظام فقط' : 'This page is for administrators only'}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={`min-h-screen gradient-bg ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Activity className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold gradient-text">
                {isRTL ? 'مراقبة النشاط' : 'Activity Monitoring'}
              </h1>
            </div>
            <p className="text-muted-foreground">
              {isRTL ? 'مراقبة وتتبع نشاط المستخدمين في النظام' : 'Monitor and track user activity in the system'}
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="card-primary">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white/90">
                      {isRTL ? 'إجمالي المستخدمين' : 'Total Users'}
                    </p>
                    <p className="text-2xl font-bold text-white">{userStats.totalUsers}</p>
                  </div>
                  <Users className="h-8 w-8 text-white/80" />
                </div>
              </CardContent>
            </Card>

            <Card className="card-secondary">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white/90">
                      {isRTL ? 'المستخدمين النشطين' : 'Active Users'}
                    </p>
                    <p className="text-2xl font-bold text-white">{userStats.activeUsers}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-white/80" />
                </div>
              </CardContent>
            </Card>

            <Card className="card-accent">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white/90">
                      {isRTL ? 'مستخدمين جدد' : 'New Users'}
                    </p>
                    <p className="text-2xl font-bold text-white">{userStats.newUsers}</p>
                  </div>
                  <User className="h-8 w-8 text-white/80" />
                </div>
              </CardContent>
            </Card>

            <Card className="card-info">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">
                      {isRTL ? 'الأنشطة اليوم' : 'Today\'s Activities'}
                    </p>
                    <p className="text-2xl font-bold">{activities.length}</p>
                  </div>
                  <Activity className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">
                {isRTL ? 'نظرة عامة' : 'Overview'}
              </TabsTrigger>
              <TabsTrigger value="activities">
                {isRTL ? 'سجل الأنشطة' : 'Activity Log'}
              </TabsTrigger>
              <TabsTrigger value="analytics">
                {isRTL ? 'التحليلات' : 'Analytics'}
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Daily Activity Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle>{isRTL ? 'النشاط اليومي' : 'Daily Activity'}</CardTitle>
                    <CardDescription>
                      {isRTL ? 'نشاط المستخدمين خلال الأسبوع الماضي' : 'User activity over the past week'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={dailyActivityData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="day" />
                          <YAxis />
                          <Tooltip />
                          <Area
                            type="monotone"
                            dataKey="activities"
                            stroke="#3b82f6"
                            fill="#3b82f6"
                            fillOpacity={0.3}
                            name={isRTL ? 'الأنشطة' : 'Activities'}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* User Roles Distribution */}
                <Card>
                  <CardHeader>
                    <CardTitle>{isRTL ? 'توزيع الأدوار' : 'Role Distribution'}</CardTitle>
                    <CardDescription>
                      {isRTL ? 'توزيع المستخدمين حسب الأدوار' : 'User distribution by roles'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={userRoleData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {userRoleData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Activities Tab */}
            <TabsContent value="activities" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">{isRTL ? 'سجل الأنشطة' : 'Activity Log'}</h2>
                <Button variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  {isRTL ? 'تصدير السجل' : 'Export Log'}
                </Button>
              </div>

              <div className="space-y-4">
                {activities.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card className="card-medical shadow-medical-lg">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-4">
                            {getActivityIcon(activity.action)}
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <span className="font-semibold">{activity.userName}</span>
                                {getRoleBadge(activity.userRole)}
                              </div>
                              <p className="text-foreground mb-2">{activity.details}</p>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {activity.timestamp.toLocaleString(isRTL ? 'ar-EG' : 'en-US')}
                                </div>
                                {activity.ipAddress && (
                                  <div>
                                    IP: {activity.ipAddress}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <Card>
                <CardContent className="p-12 text-center">
                  <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    {isRTL ? 'التحليلات المتقدمة' : 'Advanced Analytics'}
                  </h3>
                  <p className="text-muted-foreground">
                    {isRTL ? 'قريباً - تحليلات متقدمة لنشاط المستخدمين' : 'Coming Soon - Advanced user activity analytics'}
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default ActivityMonitoring;