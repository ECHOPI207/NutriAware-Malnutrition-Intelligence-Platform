import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/features/auth/firebase-auth-context';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import {
  Stethoscope
} from 'lucide-react';

const MedicalConsultation: React.FC = () => {
  const { i18n } = useTranslation();
  const { user, userProfile } = useAuth();
  const navigate = useNavigate();

  const isRTL = i18n.language === 'ar';

  // Redirect users to the new consultation page
  useEffect(() => {
    if (user && userProfile?.role === 'user') {
      navigate('/medical-consultation');
    }
  }, [user, userProfile, navigate]);

  // Not logged in — show friendly message to register
  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-lg mx-auto border-0 shadow-2xl">
          <CardContent className="text-center py-10 px-6">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Stethoscope className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3">
              {isRTL ? 'خدمة التوجيه الغذائي' : 'Nutritional Guidance Service'}
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {isRTL
                ? 'هذه الخدمة متاحة للمسجلين على الموقع فقط. سجّل حسابك الآن حتى نتمكن من التواصل معك بسهولة وتقديم التوجيه الغذائي المناسب لحالتك.'
                : 'This service is available for registered users only. Create your account now so we can easily communicate with you and provide the right nutritional guidance for your case.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={() => navigate('/auth/login')} size="lg" className="font-bold">
                {isRTL ? 'تسجيل الدخول' : 'Login'}
              </Button>
              <Button onClick={() => navigate('/auth/register')} variant="outline" size="lg" className="font-bold">
                {isRTL ? 'إنشاء حساب جديد' : 'Create Account'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Logged in regular users → redirect to consultation page
  if (userProfile?.role === 'user') {
    navigate('/medical-consultation');
    return null;
  }

  // Non doctor/admin/nutritionist — shouldn't reach here, but fallback
  if (!userProfile || !['doctor', 'admin', 'nutritionist'].includes(userProfile.role)) {
    navigate('/medical-consultation');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardContent className="text-center py-8">
          <Stethoscope className="h-12 w-12 text-primary mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">
            {isRTL ? 'إدارة التوجيهات الغذائية' : 'Nutritional Guidance Management'}
          </h3>
          <p className="text-muted-foreground mb-4">
            {isRTL ? 'يرجى استخدام لوحة التحكم المخصصة لإدارة الاستشارات' : 'Please use the dedicated dashboard to manage consultations'}
          </p>
          <div className="space-x-2 rtl:space-x-reverse">
            {userProfile.role === 'doctor' || userProfile.role === 'nutritionist' ? (
              <Button onClick={() => navigate('/doctor/dashboard')}>
                {isRTL ? 'لوحة تحكم الطبيب' : 'Doctor Dashboard'}
              </Button>
            ) : (
              <Button onClick={() => navigate('/admin/dashboard')}>
                {isRTL ? 'لوحة تحكم المدير' : 'Admin Dashboard'}
              </Button>
            )}
            <Button variant="outline" onClick={() => navigate('/messages')}>
              {isRTL ? 'الرسائل والاستشارات' : 'Messages & Consultations'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MedicalConsultation;