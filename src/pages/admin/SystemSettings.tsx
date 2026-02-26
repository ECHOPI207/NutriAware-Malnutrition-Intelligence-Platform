import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/features/auth/firebase-auth-context';
import { collection, getDocs, doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Settings,
  Shield,
  Database,
  Globe,
  Save,
  RefreshCw
} from 'lucide-react';

interface SystemSettings {
  siteName: string;
  siteDescription: string;
  adminEmail: string;
  enableRegistration: boolean;
  enableNotifications: boolean;
  maintenanceMode: boolean;
  maxUsersPerDay: number;
  sessionTimeout: number;
}

const SystemSettingsPage: React.FC = () => {
  const { i18n } = useTranslation();
  const { userProfile } = useAuth();
  const [settings, setSettings] = useState<SystemSettings>({
    siteName: 'NutriAware',
    siteDescription: 'منصة ذكية لسلامة الغذاء والتغذية المتوازنة',
    adminEmail: 'admin@nutriaware.com',
    enableRegistration: true,
    enableNotifications: true,
    maintenanceMode: false,
    maxUsersPerDay: 100,
    sessionTimeout: 24
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalAssessments: 0,
    totalConsultations: 0,
    storageUsed: 0
  });

  const isRTL = i18n.language === 'ar';

  useEffect(() => {
    if (userProfile?.role === 'admin') {
      loadSettings();
      loadStats();
    }
  }, [userProfile]);

  const loadSettings = async () => {
    try {
      const settingsRef = doc(db, 'system', 'settings');
      const settingsSnap = await getDoc(settingsRef);

      if (settingsSnap.exists()) {
        setSettings(prev => ({ ...prev, ...settingsSnap.data() }));
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      // Load system statistics
      const usersQuery = collection(db, 'users');
      const usersSnapshot = await getDocs(usersQuery);

      const assessmentsQuery = collection(db, 'bmi_calculations');
      const assessmentsSnapshot = await getDocs(assessmentsQuery);

      const consultationsQuery = collection(db, 'medicalConsultations');
      const consultationsSnapshot = await getDocs(consultationsQuery);

      setStats({
        totalUsers: usersSnapshot.size,
        totalAssessments: assessmentsSnapshot.size,
        totalConsultations: consultationsSnapshot.size,
        storageUsed: Math.round(Math.random() * 500) // Mock storage usage
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const saveSettings = async () => {
    try {
      setSaving(true);
      const settingsRef = doc(db, 'system', 'settings');
      await setDoc(settingsRef, settings, { merge: true });

      alert(isRTL ? 'تم حفظ الإعدادات بنجاح' : 'Settings saved successfully');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert(isRTL ? 'حدث خطأ أثناء حفظ الإعدادات' : 'Error saving settings');
    } finally {
      setSaving(false);
    }
  };

  const clearCache = async () => {
    if (!confirm(isRTL ? 'هل أنت متأكد من مسح الذاكرة المؤقتة؟' : 'Are you sure you want to clear cache?')) {
      return;
    }

    // Mock cache clearing
    alert(isRTL ? 'تم مسح الذاكرة المؤقتة بنجاح' : 'Cache cleared successfully');
  };

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
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold gradient-text flex items-center gap-3 mb-2">
            <Settings className="h-8 w-8 text-primary" />
            {isRTL ? 'إعدادات النظام' : 'System Settings'}
          </h1>
          <p className="text-muted-foreground">
            {isRTL ? 'إدارة وتكوين إعدادات المنصة' : 'Manage and configure platform settings'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* System Stats */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  {isRTL ? 'إحصائيات النظام' : 'System Statistics'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{isRTL ? 'إجمالي المستخدمين' : 'Total Users'}</span>
                  <span className="font-semibold">{stats.totalUsers}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{isRTL ? 'التقييمات' : 'Assessments'}</span>
                  <span className="font-semibold">{stats.totalAssessments}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{isRTL ? 'الاستشارات' : 'Consultations'}</span>
                  <span className="font-semibold">{stats.totalConsultations}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{isRTL ? 'التخزين المستخدم' : 'Storage Used'}</span>
                  <span className="font-semibold">{stats.storageUsed} MB</span>
                </div>

                <Button onClick={clearCache} variant="outline" className="w-full">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  {isRTL ? 'مسح الذاكرة المؤقتة' : 'Clear Cache'}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Settings Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  {isRTL ? 'إعدادات عامة' : 'General Settings'}
                </CardTitle>
                <CardDescription>
                  {isRTL ? 'تكوين الإعدادات الأساسية للمنصة' : 'Configure basic platform settings'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-muted-foreground">
                      {isRTL ? 'جاري تحميل الإعدادات...' : 'Loading settings...'}
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Site Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        <Globe className="h-5 w-5" />
                        {isRTL ? 'معلومات الموقع' : 'Site Information'}
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="siteName">{isRTL ? 'اسم الموقع' : 'Site Name'}</Label>
                          <Input
                            id="siteName"
                            value={settings.siteName}
                            onChange={(e) => setSettings(prev => ({ ...prev, siteName: e.target.value }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="adminEmail">{isRTL ? 'بريد المدير' : 'Admin Email'}</Label>
                          <Input
                            id="adminEmail"
                            type="email"
                            value={settings.adminEmail}
                            onChange={(e) => setSettings(prev => ({ ...prev, adminEmail: e.target.value }))}
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="siteDescription">{isRTL ? 'وصف الموقع' : 'Site Description'}</Label>
                        <Textarea
                          id="siteDescription"
                          value={settings.siteDescription}
                          onChange={(e) => setSettings(prev => ({ ...prev, siteDescription: e.target.value }))}
                          rows={3}
                        />
                      </div>
                    </div>

                    {/* System Controls */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        <Shield className="h-5 w-5" />
                        {isRTL ? 'التحكم في النظام' : 'System Controls'}
                      </h3>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label>{isRTL ? 'تفعيل التسجيل' : 'Enable Registration'}</Label>
                            <p className="text-sm text-muted-foreground">
                              {isRTL ? 'السماح للمستخدمين الجدد بالتسجيل' : 'Allow new users to register'}
                            </p>
                          </div>
                          <Switch
                            checked={settings.enableRegistration}
                            onCheckedChange={(checked) => setSettings(prev => ({ ...prev, enableRegistration: checked }))}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label>{isRTL ? 'تفعيل الإشعارات' : 'Enable Notifications'}</Label>
                            <p className="text-sm text-muted-foreground">
                              {isRTL ? 'إرسال إشعارات للمستخدمين' : 'Send notifications to users'}
                            </p>
                          </div>
                          <Switch
                            checked={settings.enableNotifications}
                            onCheckedChange={(checked) => setSettings(prev => ({ ...prev, enableNotifications: checked }))}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label>{isRTL ? 'وضع الصيانة' : 'Maintenance Mode'}</Label>
                            <p className="text-sm text-muted-foreground">
                              {isRTL ? 'إيقاف الموقع مؤقتاً للصيانة' : 'Temporarily disable site for maintenance'}
                            </p>
                          </div>
                          <Switch
                            checked={settings.maintenanceMode}
                            onCheckedChange={(checked) => setSettings(prev => ({ ...prev, maintenanceMode: checked }))}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="maxUsers">{isRTL ? 'الحد الأقصى للمستخدمين يومياً' : 'Max Users Per Day'}</Label>
                          <Input
                            id="maxUsers"
                            type="number"
                            value={settings.maxUsersPerDay}
                            onChange={(e) => setSettings(prev => ({ ...prev, maxUsersPerDay: parseInt(e.target.value) }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="sessionTimeout">{isRTL ? 'انتهاء الجلسة (ساعات)' : 'Session Timeout (hours)'}</Label>
                          <Input
                            id="sessionTimeout"
                            type="number"
                            value={settings.sessionTimeout}
                            onChange={(e) => setSettings(prev => ({ ...prev, sessionTimeout: parseInt(e.target.value) }))}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-end">
                      <Button onClick={saveSettings} disabled={saving}>
                        {saving ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            {isRTL ? 'جاري الحفظ...' : 'Saving...'}
                          </>
                        ) : (
                          <>
                            <Save className="h-4 w-4 mr-2" />
                            {isRTL ? 'حفظ الإعدادات' : 'Save Settings'}
                          </>
                        )}
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemSettingsPage;