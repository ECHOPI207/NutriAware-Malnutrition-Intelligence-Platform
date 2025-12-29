import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
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
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

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
        <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-blue-50/80 to-transparent dark:from-blue-950/20 -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8 text-center lg:text-start"
            >
              <div className="inline-flex items-center gap-2 bg-white dark:bg-white/5 border border-blue-100 dark:border-white/10 px-4 py-1.5 rounded-full text-sm font-medium text-blue-700 dark:text-blue-300 shadow-sm">
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

              <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {isRTL ?
                  'اكتشف قوة الذكاء الاصطناعي في تحليل حالتك الصحية وتقديم خطط تغذية مخصصة لك ولعائلتك. رعاية متكاملة تبدأ من هنا.' :
                  'Discover the power of AI in analyzing your health and providing personalized nutrition plans for you and your family. Integrated care starts here.'
                }
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                <Link to="/assessment">
                  <Button size="lg" className="w-full sm:w-auto h-14 px-8 rounded-2xl text-lg btn-gradient shadow-xl shadow-blue-500/20">
                    <Brain className="h-5 w-5 mx-2" />
                    {isRTL ? 'ابدأ التشخيص وعلاج' : 'Start Diagnosis'}
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
            </motion.div>

            {/* Hero Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative lg:h-[600px] flex items-center justify-center"
            >
              <div className="relative w-full aspect-square max-w-[500px]">
                {/* Abstract Background Shapes */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-cyan-400/20 rounded-full blur-2xl" />

                {/* Main Card Container */}
                <div className="relative glass rounded-[2.5rem] p-8 md:p-12 w-full h-full flex flex-col items-center justify-center text-center shadow-2xl border-white/40">
                  <div className="mb-8 p-6 bg-white dark:bg-white/10 rounded-3xl shadow-lg">
                    <Logo size="lg" hideText />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">NutriAware AI</h3>
                  <p className="text-muted-foreground">{isRTL ? 'شريكك الصحي الذكي' : 'Your Intelligent Health Partner'}</p>

                  {/* Floating Cards Animation */}
                  <div className="absolute -right-8 top-20 bg-white dark:bg-card p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce" style={{ animationDuration: '3s' }}>
                    <div className="p-2 bg-green-100 text-green-600 rounded-lg"><Activity size={20} /></div>
                    <div>
                      <div className="text-xs text-muted-foreground">{isRTL ? 'الحالة الصحية' : 'Health Status'}</div>
                      <div className="font-bold text-green-600">Excellent</div>
                    </div>
                  </div>

                  <div className="absolute -left-8 bottom-32 bg-white dark:bg-card p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>
                    <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><Brain size={20} /></div>
                    <div>
                      <div className="text-xs text-muted-foreground">AI Analysis</div>
                      <div className="font-bold text-blue-600">Active</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
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
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="card-premium p-8 text-center h-full hover:-translate-y-1 transition-transform cursor-default group">
                  <div className={`w-16 h-16 mx-auto rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center mb-6 text-3xl group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon size={32} />
                  </div>
                  <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 mb-2">
                    {t(`stats.${stat.key}.value`)}
                  </h3>
                  <p className="font-semibold text-foreground mb-3">{t(`stats.${stat.key}.label`)}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t(`stats.${stat.key}.description`)}</p>
                </div>
              </motion.div>
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
                <Button variant="ghost" className="text-primary hover:bg-primary/5 group">
                  {isRTL ? 'عرض كل الخدمات' : 'View All Services'}
                  <ArrowRight className={`w-4 h-4 mx-2 transition-transform group-hover:translate-x-1 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={feature.key}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <Link to={feature.link} className="block h-full">
                  <div className="card-premium p-6 md:p-8 h-full flex flex-col items-center text-center gap-6 hover:border-blue-200 dark:hover:border-blue-800 transition-colors group">
                    <div className={`w-16 h-16 rounded-2xl ${feature.bg} ${feature.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon size={32} />
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold mb-3 group-hover:text-primary transition-colors">{t(`features.${feature.key}.title`)}</h3>
                      <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-4">{t(`features.${feature.key}.description`)}</p>
                      <div className="flex items-center justify-center text-primary font-medium text-sm group-hover:underline decoration-2 underline-offset-4">
                        {isRTL ? 'المزيد' : 'Learn more'}
                        <ArrowRight className={`w-4 h-4 mx-1 ${isRTL ? 'rotate-180' : ''}`} />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
