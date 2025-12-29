import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Home, AlertTriangle } from 'lucide-react';
import PageMeta from '@/components/common/PageMeta';

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <div className={`min-h-[80vh] flex items-center justify-center ${isRTL ? 'rtl' : 'ltr'}`}>
      <PageMeta
        title={isRTL ? "الصفحة غير موجودة | نيوتري أوير" : "Page Not Found | NutriAware"}
        description="404 Error"
      />

      <div className="text-center px-4">
        <div className="mb-8 flex justify-center">
          <div className="h-24 w-24 bg-red-100 rounded-full flex items-center justify-center">
            <AlertTriangle className="h-12 w-12 text-red-600" />
          </div>
        </div>

        <h1 className="text-4xl font-bold mb-4">
          {isRTL ? 'عذراً! الصفحة غير موجودة' : 'Oops! Page Not Found'}
        </h1>

        <p className="text-xl text-muted-foreground mb-8 max-w-md mx-auto">
          {isRTL
            ? 'يبدو أن الصفحة التي تبحث عنها قد تم نقلها أو حذفها أو أنها غير موجودة.'
            : 'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.'
          }
        </p>

        <Button onClick={() => navigate('/')} size="lg" className="gap-2">
          <Home className="h-5 w-5" />
          {isRTL ? 'العودة للرئيسية' : 'Back to Home'}
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
