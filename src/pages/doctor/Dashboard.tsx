import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/features/auth/firebase-auth-context';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  Users,
  MessageSquare,
  LogOut,
  Download,
  Stethoscope,
  Heart,
  FileText
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMessages } from '@/components/messages/useMessages';
import { MessageList } from '@/components/messages/MessageList';
import { useDoctorStats } from './useDoctorStats';
import { getBMICategoryLabel, getBMICategoryStatus } from '@/lib/bmi-utils';
import { UserDirectory } from '@/components/users/UserDirectory';

const DoctorDashboard: React.FC = () => {
  const { i18n } = useTranslation();
  const { user, userProfile, logout } = useAuth(); // Destructure userProfile
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState<'7d' | '30d'>('7d');

  const {
    loading: statsLoading,
    patientStats,
    patients,
    nutritionalAnalysis,
    patientGrowthData,
    refreshStats
  } = useDoctorStats(user, timeRange);

  const {
    allItems: messagesItems,
    loading: messagesLoading,
    replyingTo,
    setReplyingTo,
    replyText,
    setReplyText,
    sendingReply,
    submitReply,
    updateMessageStatus,
    updatePriority,
    deleteItem,
    closeConsultation,
    toggleConsultationLock,
    userProfile: _msgUserProfile
  } = useMessages({ enableMessages: true, enableConsultations: false });

  const isRTL = i18n.language === 'ar';

  const handleExportReport = () => {
    // Export functionality
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      window.location.href = '/';
    }
  };

  if (statsLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isRTL ? 'rtl' : 'ltr'}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">{isRTL ? 'جاري تحميل لوحة تحكم أخصائي التغذية...' : 'Loading Nutrition Specialist Dashboard...'}</p>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute requiredRole="doctor">
      <div className={`min-h-screen bg-background ${isRTL ? 'rtl' : 'ltr'}`}>
        {/* Mobile Header (Gradient) */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 pb-20 pt-8 px-4 sm:px-6 lg:px-8 text-white">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-2">
              <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
                <Stethoscope className="h-6 w-6 md:h-8 md:w-8 text-white/90" />
                {isRTL ? 'لوحة تحكم أخصائي التغذية' : 'Nutrition Specialist Dashboard'}
              </h1>
              <p className="text-white/80 text-sm md:text-base max-w-xl">
                {isRTL ? `مرحباً أخصائي ${userProfile?.displayName || user?.displayName || 'التغذية'} - إدارة الحالات والتحليلات التغذوية` : `Welcome Specialist ${userProfile?.displayName || user?.displayName || 'Nutritionist'} - Patient management and nutritional analytics`}
              </p >
            </div >
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={() => setTimeRange('7d')} className={`bg-white/10 border-white/20 text-white hover:bg-white/20 ${timeRange === '7d' ? 'bg-white/20 border-white' : ''}`}>
                {isRTL ? '7 أيام' : '7 Days'}
              </Button>
              <Button variant="outline" size="sm" onClick={() => setTimeRange('30d')} className={`bg-white/10 border-white/20 text-white hover:bg-white/20 ${timeRange === '30d' ? 'bg-white/20 border-white' : ''}`}>
                {isRTL ? '30 يوم' : '30 Days'}
              </Button>
              <Button size="sm" onClick={handleExportReport} className="bg-white text-blue-600 hover:bg-white/90">
                <Download className="w-4 h-4 mr-2" />
                {isRTL ? 'تقرير' : 'Export'}
              </Button>
              <Button size="sm" variant="destructive" onClick={handleLogout} className="bg-white/10 text-white hover:bg-white/20 border-white/20">
                <LogOut className="w-4 h-4 mr-2" />
                {isRTL ? 'خروج' : 'Exit'}
              </Button>
            </div>
          </div >
        </div >

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">

            {/* Scrollable Tabs */}
            <div className="overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
              <TabsList className="bg-background/95 backdrop-blur shadow-sm border p-1 h-auto flex w-max md:w-full md:grid md:grid-cols-4 gap-1 rounded-xl">
                <TabsTrigger value="overview" className="px-4 py-2.5 rounded-lg data-[state=active]:bg-primary/10 data-[state=active]:text-primary flex items-center gap-2">
                  <Heart className="h-4 w-4" />
                  <span>{isRTL ? 'نظرة عامة' : 'Overview'}</span>
                </TabsTrigger>
                <TabsTrigger value="patients" className="px-4 py-2.5 rounded-lg data-[state=active]:bg-primary/10 data-[state=active]:text-primary flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>{isRTL ? 'المرضى' : 'Patients'}</span>
                </TabsTrigger>
                <TabsTrigger value="messages" className="px-4 py-2.5 rounded-lg data-[state=active]:bg-primary/10 data-[state=active]:text-primary flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  <span>{isRTL ? 'الرسائل' : 'Messages'}</span>
                </TabsTrigger>
                <TabsTrigger value="tools" className="px-4 py-2.5 rounded-lg data-[state=active]:bg-primary/10 data-[state=active]:text-primary flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span>{isRTL ? 'الأدوات' : 'Tools'}</span>
                </TabsTrigger>
                <TabsTrigger value="directory" className="px-4 py-2.5 rounded-lg data-[state=active]:bg-primary/10 data-[state=active]:text-primary flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>{isRTL ? 'الدليل' : 'Directory'}</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="overview" className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
                {/* Quick Stats */}
                <Card className="border-none shadow-md hover:shadow-lg transition-all bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-sm font-medium text-blue-100">{isRTL ? 'إجمالي المرضى' : 'Total Patients'}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="text-2xl md:text-3xl font-bold">{patientStats.totalPatients}</div>
                    <p className="text-xs text-blue-100 mt-1">{isRTL ? 'نشط في النظام' : 'Active in system'}</p>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-md hover:shadow-lg transition-all bg-white dark:bg-card border-l-4 border-l-green-500">
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">{isRTL ? 'الحالات النشطة' : 'Active Cases'}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="text-2xl md:text-3xl font-bold text-foreground">{patientStats.activeCases}</div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-md hover:shadow-lg transition-all bg-white dark:bg-card border-l-4 border-l-red-500">
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">{isRTL ? 'حالات خطرة' : 'High Risk'}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="text-2xl md:text-3xl font-bold text-foreground">{patientStats.highRiskCount}</div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-md hover:shadow-lg transition-all bg-white dark:bg-card border-l-4 border-l-purple-500">
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">{isRTL ? 'متوسط BMI' : 'Avg BMI'}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="text-2xl md:text-3xl font-bold text-foreground">{patientStats.avgBMI}</div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-none shadow-md">
                  <CardHeader>
                    <CardTitle className="text-lg">{isRTL ? 'توزيع BMI' : 'BMI Distribution'}</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={nutritionalAnalysis.bmiDistribution}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="count"
                        >
                          {nutritionalAnalysis.bmiDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="flex flex-wrap justify-center gap-4 text-xs mt-4">
                      {nutritionalAnalysis.bmiDistribution.map((entry, index) => (
                        <div key={index} className="flex items-center gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
                          <span className="font-medium text-muted-foreground">{entry.category} ({entry.count})</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-md">
                  <CardHeader>
                    <CardTitle className="text-lg">{isRTL ? 'المرضى الجدد' : 'New Patients'}</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={patientGrowthData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.3} />
                        <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                        <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                        <Line type="monotone" dataKey="patients" stroke="#3b82f6" strokeWidth={3} activeDot={{ r: 6 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="patients">
              <Card className="border-none shadow-md overflow-hidden">
                <CardHeader className="bg-muted/30">
                  <CardTitle>{isRTL ? 'قائمة المرضى' : 'Patients List'}</CardTitle>
                  <CardDescription>{isRTL ? 'إدارة ملفات المرضى' : 'Manage patient records'}</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>{isRTL ? 'الاسم' : 'Name'}</TableHead>
                          <TableHead>{isRTL ? 'العمر' : 'Age'}</TableHead>
                          <TableHead>{isRTL ? 'BMI' : 'BMI'}</TableHead>
                          <TableHead>{isRTL ? 'التصنيف' : 'Category'}</TableHead>
                          <TableHead>{isRTL ? 'الحالة' : 'Status'}</TableHead>
                          <TableHead>{isRTL ? 'الإجراء' : 'Action'}</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {patients.length > 0 ? patients.slice(0, 10).map((p, i) => {
                          const rawCategory = p.bmi_category || p.category || 'normal';
                          const label = getBMICategoryLabel(rawCategory, i18n.language);
                          const status = getBMICategoryStatus(rawCategory);
                          const cls =
                            status === 'error' ? 'text-red-500 border-red-200 bg-red-50' :
                              status === 'warning' ? 'text-yellow-500 border-yellow-200 bg-yellow-50' :
                                status === 'success' ? 'text-green-500 border-green-200 bg-green-50' :
                                  'text-blue-500 border-blue-200 bg-blue-50';
                          return (
                            <TableRow key={i} className="hover:bg-muted/50">
                              <TableCell className="font-medium">{p.childName || p.name || 'Patient ' + (i + 1)}</TableCell>
                              <TableCell>{p.age || (p.age_months ? p.age_months + 'm' : '--')}</TableCell>
                              <TableCell>{p.bmi ? Number(p.bmi).toFixed(1) : '--'}</TableCell>
                              <TableCell>
                                <Badge variant="outline" className={cls}>
                                  {label}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Badge className="bg-green-100 text-green-800 hover:bg-green-200 shadow-none border-0">Active</Badge>
                              </TableCell>
                              <TableCell>
                                <Button size="sm" variant="ghost" className="h-8 hover:text-blue-600">{isRTL ? 'عرض' : 'View'}</Button>
                              </TableCell>
                            </TableRow>
                          );
                        }) : (
                          <TableRow>
                            <TableCell colSpan={6} className="h-64 text-center">
                              <div className="flex flex-col items-center justify-center h-full p-4">
                                <Users className="h-12 w-12 text-muted-foreground mb-4" />
                                <h3 className="text-lg font-semibold">{isRTL ? 'لا يوجد مرضى' : 'No Patients Found'}</h3>
                                <p className="text-muted-foreground mb-4">{isRTL ? 'لم يتم العثور على سجلات مرضى' : 'No patient records found'}</p>
                                <Button variant="outline" onClick={refreshStats}>
                                  {isRTL ? 'تحديث' : 'Refresh'}
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="messages">
              <Card className="border-none shadow-md overflow-hidden bg-transparent">
                <CardHeader className="bg-muted/30 mb-4 rounded-lg">
                  <CardTitle>{isRTL ? 'الرسائل' : 'Messages'}</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <MessageList
                    filteredItems={messagesItems}
                    loading={messagesLoading}
                    isRTL={isRTL}
                    userProfile={userProfile}
                    replyingTo={replyingTo}
                    replyText={replyText}
                    sendingReply={sendingReply}
                    onSetReplyingTo={setReplyingTo}
                    onSetReplyText={setReplyText}
                    onSubmitReply={submitReply}
                    onUpdateStatus={updateMessageStatus}
                    onUpdatePriority={updatePriority}
                    onDelete={deleteItem}
                    onCloseConsultation={closeConsultation}
                    onToggleLock={toggleConsultationLock}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tools">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-none shadow-md hover:border-primary/50 transition-colors cursor-pointer group">
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="p-3 bg-blue-100 text-blue-600 rounded-lg group-hover:scale-110 transition-transform"><FileText className="h-6 w-6" /></div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">{isRTL ? 'إنشاء خطة غذائية' : 'Create Nutrition Plan'}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{isRTL ? 'استخدم أدوات الذكاء الاصطناعي لإنشاء خطة.' : 'Use AI tools to generate plans.'}</p>
                      <Button className="w-full sm:w-auto">{isRTL ? 'بدء' : 'Start'}</Button>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-none shadow-md hover:border-primary/50 transition-colors cursor-pointer group">
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="p-3 bg-green-100 text-green-600 rounded-lg group-hover:scale-110 transition-transform"><Heart className="h-6 w-6" /></div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">{isRTL ? 'حاسبة السعرات' : 'Calorie Calculator'}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{isRTL ? 'حساب الاحتياجات اليومية.' : 'Calculate daily needs.'}</p>
                      <Button variant="outline" className="w-full sm:w-auto">{isRTL ? 'فتح' : 'Open'}</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="directory" className="space-y-6">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-8 text-white mb-6 shadow-lg">
                <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                  <Users className="h-6 w-6" />
                  {isRTL ? 'دليل المستخدمين' : 'User Directory'}
                </h2>
                <p className="text-white/90">
                  {isRTL ? 'تصفح قائمة الأطباء والمشرفين والمستخدمين في المنصة' : 'Browse all platform doctors, admins, and users'}
                </p>
              </div>
              <UserDirectory />
            </TabsContent>
          </Tabs>
        </div>
      </div >
    </ProtectedRoute >
  );
};

export default DoctorDashboard;
