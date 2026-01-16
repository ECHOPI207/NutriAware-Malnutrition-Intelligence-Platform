import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  Brain,
  Stethoscope,
  GraduationCap,
  Zap,
  ArrowRight,
  Activity
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const Services: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const services = [
    {
      key: 'ai_assessment',
      icon: Brain,
      color: 'text-blue-600',
      bg: 'bg-blue-50 dark:bg-blue-500/10',
      link: '/assessment'
    },
    {
      key: 'medical_consultation',
      icon: Stethoscope,
      color: 'text-teal-600',
      bg: 'bg-teal-50 dark:bg-teal-500/10',
      link: '/medical-consultation'
    },
    {
      key: 'knowledge_center',
      icon: GraduationCap,
      color: 'text-purple-600',
      bg: 'bg-purple-50 dark:bg-purple-500/10',
      link: '/knowledge'
    },
    {
      key: 'ai_tools',
      icon: Zap,
      color: 'text-amber-600',
      bg: 'bg-amber-50 dark:bg-amber-500/10',
      link: '/ai-tools'
    }
  ];

  return (
    <div className={`min-h-screen bg-background pt-24 pb-12 ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            <Activity className="w-4 h-4" />
            {isRTL ? 'خدماتنا' : 'Our Services'}
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            {isRTL ? 'حلول صحية متكاملة' : 'Comprehensive Health Solutions'}
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            {isRTL 
              ? 'نقدم مجموعة واسعة من الخدمات المعتمدة على الذكاء الاصطناعي لضمان صحة أفضل لك ولعائلتك.' 
              : 'We offer a wide range of AI-powered services to ensure better health for you and your family.'}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service) => (
            <div key={service.key} className="card-premium p-8 flex flex-col items-start hover:shadow-xl transition-all duration-300 group">
              <div className={`w-14 h-14 rounded-xl ${service.bg} ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <service.icon size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                {t(`features.${service.key}.title`)}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6 flex-grow">
                {t(`features.${service.key}.description`)}
              </p>
              <Link to={service.link} className="w-full">
                <Button className="w-full btn-gradient group/btn">
                  {isRTL ? 'ابدأ الآن' : 'Get Started'}
                  <ArrowRight className={`w-4 h-4 mx-2 transition-transform group-hover/btn:translate-x-1 ${isRTL ? 'rotate-180 group-hover/btn:-translate-x-1' : ''}`} />
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
