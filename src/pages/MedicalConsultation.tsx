import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/features/auth/firebase-auth-context';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import {
  Stethoscope,
  AlertTriangle
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

  // Only show for doctors and admins
  if (!user || !userProfile || !['doctor', 'admin', 'nutritionist'].includes(userProfile.role)) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="text-center py-8">
            <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              {isRTL ? 'غير مصرح' : 'Unauthorized'}
            </h3>
            <p className="text-muted-foreground mb-4">
              {isRTL ? 'هذه الصفحة مخصصة للأطباء والإداريين فقط' : 'This page is for doctors and administrators only'}
            </p>
            <Button onClick={() => navigate('/medical-consultation')}>
              {isRTL ? 'الذهاب للاستشارات الطبية' : 'Go to Medical Consultations'}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardContent className="text-center py-8">
          <Stethoscope className="h-12 w-12 text-primary mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">
            {isRTL ? 'إدارة الاستشارات الطبية' : 'Medical Consultation Management'}
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