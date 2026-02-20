import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  TrendingUp,
  Users,
  Heart,
  Sparkles,
  GraduationCap,
  Stethoscope,
  Brain,
  Zap,
  Activity
} from 'lucide-react';
import Logo from '@/components/common/Logo';
import { Button } from '@/components/ui/button';
import { SurveyCTA } from '@/components/common/SurveyCTA';

const Home: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const stats = [
    {
      key: 'hunger',
      icon: Users,
      color: 'text-rose-600',
      bg: 'bg-rose-50 dark:bg-rose-900/20',
    },
    {
      key: 'stunting',
      icon: TrendingUp,
      color: 'text-amber-600',
      bg: 'bg-amber-50 dark:bg-amber-900/20',
    },
    {
      key: 'obesity',
      icon: Heart,
      color: 'text-blue-600',
      bg: 'bg-blue-50 dark:bg-blue-900/20',
    },
    {
      key: 'wasting',
      icon: Sparkles,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50 dark:bg-emerald-900/20',
    }
  ];

  const features = [
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
    <div className={`min-h-screen bg-background overflow-hidden ${isRTL ? 'rtl' : 'ltr'}`}>

      {/* Hero Section */}
      <section className="relative pt-24 pb-12 lg:pt-32 lg:pb-24 overflow-visible">
        <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-blue-100/50 to-transparent dark:from-blue-900/20 -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Content */}
            <div className="space-y-8 text-center lg:text-start">
              <div className="inline-flex items-center gap-2 bg-white dark:bg-slate-800 border border-blue-200 dark:border-blue-800 px-4 py-1.5 rounded-full text-sm font-medium text-blue-700 dark:text-blue-300 shadow-sm">
                <Activity className="h-4 w-4" />
                <span className="relative top-[1px]">{isRTL ? 'منصة الرعاية الصحية الذكية' : 'Smart Healthcare Platform'}</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-110">
                <span className="block text-foreground mb-2">{isRTL ? 'مستقبل' : 'The Future of'}</span>
                <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent pb-2">
                  {isRTL ? 'التغذية الذكية' : 'Smart Nutrition'}
                </span>
                <span className="block text-foreground mt-2 text-2xl md:text-4xl opacity-80 font-semibold">
                  {isRTL ? 'رعاية صحية مدعومة بالذكاء الاصطناعي' : 'AI-Powered Healthcare'}
                </span>
              </h1>

              <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {isRTL ?
                  'اكتشف قوة الذكاء الاصطناعي في تحليل حالتك الصحية وتقديم خطط تغذية مخصصة لك ولعائلتك. رعاية متكاملة تبدأ من هنا.' :
                  'Discover the power of AI in analyzing your health and providing personalized nutrition plans for you and your family. Integrated care starts here.'
                }
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                <Link to="/assessment">
                  <Button size="lg" className="w-full sm:w-auto h-14 px-8 rounded-2xl text-lg btn-gradient shadow-xl shadow-blue-500/20">
                    <Brain className="h-5 w-5 mx-2" />
                    {isRTL ? 'ابدأ التقييم الغذائي' : 'Start Nutritional Assessment'}
                  </Button>
                </Link>
                <Link to="/about">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto h-14 px-8 rounded-2xl text-lg border-2 hover:bg-muted/50 transition-all">
                    {isRTL ? 'تعرف علينا' : 'Learn More'}
                  </Button>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-8 flex items-center justify-center lg:justify-start gap-8 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                {/* Add logos or trust badges here if needed */}
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative lg:h-[600px] flex items-center justify-center">
              <div className="relative w-full aspect-square max-w-[500px]">
                {/* Abstract Background Shapes - INCREASED OPACITY */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-cyan-400/30 rounded-full blur-2xl" />

                {/* Main Card Container - REMOVED GLASS, ADDED SOLID COLORS */}
                <div className="relative rounded-[2.5rem] p-8 md:p-12 w-full h-full flex flex-col items-center justify-center text-center shadow-2xl border border-white/40 bg-white/80 dark:bg-slate-900/90 dark:border-slate-700 backdrop-blur-md">
                  <div className="mb-8 p-6 bg-white dark:bg-slate-800 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-700">
                    <Logo size="lg" hideText />
                  </div>
                  <h2 className="text-2xl font-bold mb-2 text-foreground">NutriAware AI</h2>
                  <p className="text-muted-foreground">{isRTL ? 'شريكك الصحي الذكي' : 'Your Intelligent Health Partner'}</p>

                  {/* Floating Cards Animation - ADDED BORDERS */}
                  <div className="absolute -right-4 top-20 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce z-20" style={{ animationDuration: '3s' }}>
                    <div className="p-2 bg-green-100 text-green-700 rounded-lg"><Activity size={20} /></div>
                    <div>
                      <div className="text-xs text-slate-600 dark:text-slate-400">{isRTL ? 'الحالة الصحية' : 'Health Status'}</div>
                      <div className="font-bold text-green-700">Excellent</div>
                    </div>
                  </div>

                  <div className="absolute -left-4 bottom-32 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce z-20" style={{ animationDuration: '4s', animationDelay: '1s' }}>
                    <div className="p-2 bg-blue-100 text-blue-700 rounded-lg"><Brain size={20} /></div>
                    <div>
                      <div className="text-xs text-slate-600 dark:text-slate-400">AI Analysis</div>
                      <div className="font-bold text-blue-700">Active</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section with New Design */}
      <section className="py-20 bg-muted/50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">{isRTL ? 'إحصائيات تهمك' : 'Global Impact'}</h2>
            <p className="text-lg text-muted-foreground">{isRTL ? 'نحن نواجه تحديات التغذية العالمية بأحدث التقنيات' : 'Addressing global nutrition challenges with cutting-edge technology.'}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat) => (
              <div
                key={stat.key}
                className="h-full"
              >
                <div
                  className="card-premium p-6 text-center h-full hover:-translate-y-1 transition-transform cursor-default group border-border bg-white dark:bg-slate-800 shadow-sm hover:shadow-md"
                >
                  <div className={`w-12 h-12 mx-auto rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center mb-4 text-2xl group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon size={24} />
                  </div>
                  <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 mb-1">
                    {t(`stats.${stat.key}.value`)}
                  </h3>
                  <p className="font-semibold text-slate-900 dark:text-white mb-2 text-sm">{t(`stats.${stat.key}.label`)}</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{t(`stats.${stat.key}.description`)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-6">
            <h2 className="text-3xl font-bold">{isRTL ? 'خدماتنا المتكاملة' : 'Our Services'}</h2>
            <p className="text-lg text-muted-foreground">{isRTL ? 'مجموعة شاملة من الأدوات التي تساعدك على تحسين نمط حياتك' : 'Comprehensive tools to help you improve your lifestyle.'}</p>
            <div className="flex justify-center">
              <Link to="/services">
                <Button size="lg" className="px-8 rounded-xl btn-gradient shadow-xl shadow-blue-500/20">
                  {isRTL ? 'عرض كل الخدمات' : 'View All Services'}
                  <ArrowRight className={`w-4 h-4 mx-2 transition-transform group-hover:translate-x-1 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {features.map((feature) => (
              <div
                key={feature.key}
              >
                <Link to={feature.link} className="block h-full">
                  <div className="card-premium p-6 md:p-8 h-full flex flex-col items-center text-center gap-6 hover:border-blue-200 dark:hover:border-blue-800 transition-colors group bg-card dark:bg-slate-800">
                    <div className={`w-16 h-16 rounded-2xl ${feature.bg} ${feature.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon size={32} />
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold mb-3 group-hover:text-primary transition-colors">{t(`features.${feature.key}.title`)}</h3>
                      <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-4">{t(`features.${feature.key}.description`)}</p>
                      <Button variant="outline" size="sm" className="w-full mt-2 group-hover:bg-primary group-hover:text-white transition-colors">
                        {isRTL ? 'المزيد' : 'Learn more'}
                        <ArrowRight className={`w-4 h-4 mx-1 ${isRTL ? 'rotate-180' : ''}`} />
                      </Button>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SurveyCTA />
    </div>
  );
};

export default Home;
