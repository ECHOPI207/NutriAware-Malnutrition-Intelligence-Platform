import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/features/auth/firebase-auth-context';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { auditService } from '@/services/audit-service';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Shield, Lock, AlertTriangle, Save } from 'lucide-react';
import PageMeta from '@/components/common/PageMeta';

interface SystemSettings {
    maintenanceMode: boolean;
    registrationOpen: boolean;
    requireEmailVerification: boolean;
    sessionTimeout: number;
}

const SecuritySettings: React.FC = () => {
    const { i18n } = useTranslation();
    const { user, userProfile } = useAuth();
    const [saving, setSaving] = useState(false);
    const [settings, setSettings] = useState<SystemSettings>({
        maintenanceMode: false,
        registrationOpen: true,
        requireEmailVerification: false,
        sessionTimeout: 60
    });

    const isRTL = i18n.language === 'ar';

    useEffect(() => {
        if (userProfile?.role === 'admin') {
            loadSettings();
        }
    }, [userProfile]);

    const loadSettings = async () => {
        try {
            const settingsRef = doc(db, 'system_settings', 'security');
            const settingsSnap = await getDoc(settingsRef);

            if (settingsSnap.exists()) {
                setSettings(settingsSnap.data() as SystemSettings);
            }
        } catch (error) {
            console.error('Error loading security settings:', error);
        }
    };

    const handleSave = async () => {
        try {
            setSaving(true);
            const settingsRef = doc(db, 'system_settings', 'security');

            await setDoc(settingsRef, {
                ...settings,
                updatedAt: serverTimestamp(),
                updatedBy: user?.uid
            });

            // Log the action
            auditService.log({
                action: 'UPDATE_SECURITY_SETTINGS',
                actorId: user?.uid || 'unknown',
                actorEmail: user?.email || 'unknown',
                targetId: 'security',
                targetType: 'system',
                details: 'Security settings updated',
                metadata: settings
            });

            alert(isRTL ? 'تم حفظ الإعدادات بنجاح' : 'Settings saved successfully');
        } catch (error) {
            console.error('Error saving settings:', error);
            alert(isRTL ? 'حدث خطأ أثناء حفظ الإعدادات' : 'Error saving settings');
        } finally {
            setSaving(false);
        }
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
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className={`container mx-auto px-4 py-8 ${isRTL ? 'rtl' : 'ltr'}`}>
            <PageMeta
                title={isRTL ? "إعدادات الأمان | نيوتري أوير" : "Security Settings | NutriAware"}
                description={isRTL ? "إدارة إعدادات أمان النظام" : "Manage system security configurations"}
            />

            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold flex items-center gap-3 mb-2">
                        <Shield className="h-8 w-8 text-primary" />
                        {isRTL ? 'إعدادات الأمان' : 'Security Settings'}
                    </h1>
                    <p className="text-muted-foreground">
                        {isRTL ? 'تحكم في سياسات الأمان وصلاحيات النظام' : 'Control system security policies and access permissions'}
                    </p>
                </div>

                <div className="grid gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Lock className="h-5 w-5" />
                                {isRTL ? 'التحكم في الوصول' : 'Access Control'}
                            </CardTitle>
                            <CardDescription>
                                {isRTL ? 'إعدادات تسجيل الدخول وإنشاء الحسابات' : 'Login and account creation settings'}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base">
                                        {isRTL ? 'فتح باب التسجيل' : 'Registration Open'}
                                    </Label>
                                    <p className="text-sm text-muted-foreground">
                                        {isRTL ? 'السماح للمستخدمين الجدد بإنشاء حسابات' : 'Allow new users to sign up'}
                                    </p>
                                </div>
                                <Switch
                                    checked={settings.registrationOpen}
                                    onCheckedChange={(c) => setSettings(p => ({ ...p, registrationOpen: c }))}
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base">
                                        {isRTL ? 'تأكيد البريد الإلكتروني إلزامي' : 'Require Email Verification'}
                                    </Label>
                                    <p className="text-sm text-muted-foreground">
                                        {isRTL ? 'منع الدخول حتى يتم تأكيد البريد' : 'Prevent login until email is verified'}
                                    </p>
                                </div>
                                <Switch
                                    checked={settings.requireEmailVerification}
                                    onCheckedChange={(c) => setSettings(p => ({ ...p, requireEmailVerification: c }))}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-red-200 dark:border-red-900">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-red-600">
                                <AlertTriangle className="h-5 w-5" />
                                {isRTL ? 'منطقة الخطر' : 'Danger Zone'}
                            </CardTitle>
                            <CardDescription>
                                {isRTL ? 'إجراءات تؤثر على توفر النظام بالكامل' : 'Actions that affect system availability'}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/10 rounded-lg">
                                <div className="space-y-0.5">
                                    <Label className="text-base font-bold text-red-600">
                                        {isRTL ? 'وضع الصيانة' : 'Maintenance Mode'}
                                    </Label>
                                    <p className="text-sm text-red-600/80">
                                        {isRTL ? 'إيقاف النظام لجميع المستخدمين (ما عدا المديرين)' : 'Disable system for all users (except admins)'}
                                    </p>
                                </div>
                                <Switch
                                    checked={settings.maintenanceMode}
                                    onCheckedChange={(c) => setSettings(p => ({ ...p, maintenanceMode: c }))}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex justify-end">
                        <Button onClick={handleSave} disabled={saving} size="lg">
                            <Save className="h-5 w-5 mr-2" />
                            {isRTL ? 'حفظ التغييرات' : 'Save Changes'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SecuritySettings;
