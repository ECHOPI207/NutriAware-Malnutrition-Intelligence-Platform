import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Users, Award, BookOpen, Bot, Calculator, Shield, Mail, GraduationCap, Database, Heart, FileText, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ImageWithFallback } from '@/components/ui/image-with-fallback';
import { SurveyCTA } from '@/components/common/SurveyCTA';

interface TeamMember {
  name: string;
  role: string;
  photoPlaceholder?: string;
  customZoom?: string;
}

const About: React.FC = () => {
  const { t, i18n } = useTranslation();

  const researchSections = [
    {
      icon: GraduationCap,
      title_ar: 'هدف الدراسة',
      title_en: 'Purpose of the Study',
      content_ar: 'يُعد هذا المشروع جزءاً من بحث علمي أكاديمي يُجرى في جامعة 6 أكتوبر، يهدف إلى تقييم فعالية التدخل التثقيفي الرقمي في تحسين معرفة وممارسات أولياء الأمور المتعلقة بتغذية الأطفال وسلامة الغذاء. يجمع المشروع بين المقالات العلمية والقصص المصورة التعليمية وأدوات التقييم الذكية لخلق تجربة تعليمية متكاملة.',
      content_en: 'This project is part of an academic scientific study conducted at October 6 University, aimed at evaluating the effectiveness of a digital educational intervention in improving parents\' knowledge and practices related to child nutrition and food safety. The project combines scientific articles, educational illustrated stories, and smart assessment tools to create an integrated learning experience.',
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-50 dark:bg-blue-950/30',
    },
    {
      icon: Users,
      title_ar: 'من يمكنه المشاركة',
      title_en: 'Who Can Participate',
      content_ar: 'هذا البحث موجه لأولياء الأمور ومقدمي الرعاية للأطفال في الفئة العمرية من 4 إلى 13 سنة. المشاركة متاحة لجميع أولياء الأمور المهتمين بتغذية أطفالهم بغض النظر عن مستواهم التعليمي أو الاجتماعي.',
      content_en: 'This research is directed at parents and caregivers of children aged 4 to 13 years. Participation is open to all parents interested in their children\'s nutrition regardless of their educational or social background.',
      color: 'text-green-600 dark:text-green-400',
      bg: 'bg-green-50 dark:bg-green-950/30',
    },
    {
      icon: Database,
      title_ar: 'التعامل مع البيانات',
      title_en: 'Data Handling',
      content_ar: 'يتم جمع البيانات من خلال استبيانات إلكترونية لأغراض البحث العلمي فقط. لا يتم جمع أي معلومات شخصية تُحدد هوية المشارك. يتم تخزين البيانات بشكل آمن ومشفر ولا تُشارك مع أطراف خارجية. تُستخدم البيانات فقط للتحليل الإحصائي المُجمّع ونشر النتائج البحثية.',
      content_en: 'Data is collected through electronic surveys for scientific research purposes only. No personally identifiable information is collected. Data is stored securely and encrypted, and is not shared with third parties. Data is used only for aggregate statistical analysis and publication of research findings.',
      color: 'text-purple-600 dark:text-purple-400',
      bg: 'bg-purple-50 dark:bg-purple-950/30',
    },
    {
      icon: Heart,
      title_ar: 'المشاركة التطوعية والانسحاب',
      title_en: 'Voluntary Participation & Withdrawal',
      content_ar: 'المشاركة في هذا البحث تطوعية بالكامل. يمكنك الانسحاب في أي وقت دون أي تبعات أو مساءلة. استخدام المنصة التعليمية والوصول إلى المقالات والقصص متاح للجميع بغض النظر عن المشاركة في البحث أو الاستبيانات.',
      content_en: 'Participation in this research is entirely voluntary. You may withdraw at any time without any consequences or accountability. Access to the educational platform, articles, and stories is available to everyone regardless of research participation or survey completion.',
      color: 'text-rose-600 dark:text-rose-400',
      bg: 'bg-rose-50 dark:bg-rose-950/30',
    },
    {
      icon: Mail,
      title_ar: 'معلومات التواصل',
      title_en: 'Contact Information',
      content_ar: 'للاستفسارات المتعلقة بالبحث، يُرجى التواصل مع فريق البحث:',
      content_en: 'For research-related inquiries, please contact the research team:',
      color: 'text-amber-600 dark:text-amber-400',
      bg: 'bg-amber-50 dark:bg-amber-950/30',
    },
    {
      icon: Shield,
      title_ar: 'بيان أخلاقيات البحث',
      title_en: 'Ethics Statement',
      content_ar: 'تمت مراجعة هذا البحث والموافقة عليه من قبل لجنة أخلاقيات البحث في جامعة 6 أكتوبر. يلتزم البحث بالمعايير الأخلاقية الدولية للبحث العلمي مع الإنسان.',
      content_en: 'This research has been reviewed and approved by the Research Ethics Committee at October 6 University. The research adheres to international ethical standards for human research.',
      color: 'text-teal-600 dark:text-teal-400',
      bg: 'bg-teal-50 dark:bg-teal-950/30',
    },
  ];

  const teamMembers: TeamMember[] = [
    {
      name: t('about.members.omar'),
      role: t('about.roles.student'),
      photoPlaceholder: '/images/omar.png'
    },
    {
      name: t('about.members.shahd'),
      role: t('about.roles.student'),
      photoPlaceholder: '👤'
    },
    {
      name: t('about.members.manar'),
      role: t('about.roles.student'),
      photoPlaceholder: '/images/manar.jpg'
    },
    {
      name: t('about.members.mai'),
      role: t('about.roles.student'),
      photoPlaceholder: '/images/mai.jpg'
    },
    {
      name: t('about.members.mina'),
      role: t('about.roles.student'),
      photoPlaceholder: '/images/mina.jpg',
      customZoom: 'scale-150'
    },
    {
      name: t('about.members.ahmed'),
      role: t('about.roles.student'),
      photoPlaceholder: '/images/ahmed.jpg',
      customZoom: 'scale-150'
    },
    {
      name: t('about.members.mostafa'),
      role: t('about.roles.student'),
      photoPlaceholder: '/images/mostafa.jpg',
      customZoom: 'scale-150'
    }
  ];

  const supervisors: TeamMember[] = [
    {
      name: t('about.supervisorNames.suzan'),
      role: t('about.roles.professor'),
      photoPlaceholder: '👤'
    }
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl xl:text-5xl font-bold mb-4">
            <span className="gradient-text">{t('about.title')}</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <Card className="bg-gradient-bg border-2">
            <CardContent className="p-8">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-white dark:bg-white rounded-lg p-4">
                  <ImageWithFallback
                    src="/images/ahst-logo.png"
                    alt="AHST Logo"
                    className="w-32 h-32 object-contain"
                    showIcon={false}
                  />
                </div>
              </div>
              <div className="text-center space-y-3">
                <h2 className="text-3xl font-bold text-primary">
                  {t('about.university.name')}
                </h2>
                <p className="text-xl font-semibold text-secondary">
                  {t('about.university.faculty')}
                </p>
                <p className="text-lg text-muted-foreground">
                  {t('about.university.program')}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3">{t('about.services.title')}</h2>
            <p className="text-muted-foreground text-lg">{t('about.services.subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Knowledge Section */}
            <Card className="hover:shadow-lg transition-all border-l-4 border-l-blue-500">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-500/10 rounded-lg">
                    <BookOpen className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{t('about.services.knowledge.title')}</h3>
                    <p className="text-muted-foreground leading-relaxed text-justify">
                      {t('about.services.knowledge.description')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Section */}
            <Card className="hover:shadow-lg transition-all border-l-4 border-l-purple-500">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-purple-500/10 rounded-lg">
                    <Bot className="h-8 w-8 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{t('about.services.ai.title')}</h3>
                    <p className="text-muted-foreground mb-3 leading-relaxed text-justify">
                      {t('about.services.ai.description')}
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 shrink-0" />
                        <span className="text-justify">{t('about.services.ai.chatbot')}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 shrink-0" />
                        <span className="text-justify">{t('about.services.ai.mealPlanner')}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 shrink-0" />
                        <span className="text-justify">{t('about.services.ai.bmiMealPlanner')}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Assessment Section */}
            <Card className="hover:shadow-lg transition-all border-l-4 border-l-green-500">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-green-500/10 rounded-lg">
                    <Calculator className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{t('about.services.assessment.title')}</h3>
                    <p className="text-muted-foreground mb-3 leading-relaxed text-justify">
                      {t('about.services.assessment.description')}
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 shrink-0" />
                        <span className="text-justify">{t('about.services.assessment.calculators')}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 shrink-0" />
                        <span className="text-justify">{t('about.services.assessment.child')}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Expert Section */}
            <Card className="hover:shadow-lg transition-all border-l-4 border-l-orange-500">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-orange-500/10 rounded-lg">
                    <Users className="h-8 w-8 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{t('about.services.expert.title')}</h3>
                    <p className="text-muted-foreground leading-relaxed text-justify">
                      {t('about.services.expert.description')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Award className="h-8 w-8 text-accent me-3" />
              <h2 className="text-3xl font-bold">{t('about.supervisors.title')}</h2>
            </div>
            <p className="text-muted-foreground">{t('about.supervisors.subtitle')}</p>
          </div>

          <div className="flex justify-center">
            {supervisors.map((supervisor, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                className="w-full max-w-md"
              >
                <Card className="h-full hover:shadow-lg transition-shadow border-2 border-accent/20">
                  <CardContent className="p-8 text-center">
                    <div className="w-40 h-40 mx-auto mb-6 rounded-full bg-gradient-bg flex items-center justify-center text-7xl border-4 border-accent/30">
                      {supervisor.photoPlaceholder}
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{supervisor.name}</h3>
                    <p className="text-accent font-semibold">{supervisor.role}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Users className="h-8 w-8 text-secondary me-3" />
              <h2 className="text-3xl font-bold">{t('about.team.title')}</h2>
            </div>
            <p className="text-muted-foreground">{t('about.team.subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="w-48 h-48 mx-auto mb-4 rounded-full bg-gradient-bg flex items-center justify-center border-4 border-primary/20 overflow-hidden">
                      {member.photoPlaceholder?.startsWith('/') ? (
                        <ImageWithFallback
                          src={member.photoPlaceholder}
                          alt={member.name}
                          className={`w-full h-full object-cover object-top ${member.customZoom || 'scale-125'}`}
                          showIcon={true}
                        />
                      ) : (
                        <span className="text-6xl">{member.photoPlaceholder}</span>
                      )}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>



        {/* Research Protocol Section */}
        <div id="research" className="scroll-mt-24 pt-16 mt-8 border-t border-border/50">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-6">
              <GraduationCap className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-3xl font-bold mb-4">
              {i18n.language === 'ar' ? 'عن البحث العلمي' : 'About the Research Protocol'}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              {i18n.language === 'ar'
                ? 'مشروع بحثي أكاديمي من جامعة 6 أكتوبر'
                : 'An academic research project from October 6 University'}
            </p>

            {/* Download Protocol Button */}
            <a href="/protocol.pdf" target="_blank" rel="noopener noreferrer" className="inline-block">
              <Button className="gap-2 shrink-0 btn-gradient" size="lg">
                <FileText className="w-5 h-5" />
                {i18n.language === 'ar' ? 'تحميل بروتوكول البحث (PDF)' : 'Download Research Protocol (PDF)'}
              </Button>
            </a>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {researchSections.map((section, index) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full border-border/50 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-xl ${section.bg} flex-shrink-0`}>
                          <Icon className={`h-6 w-6 ${section.color}`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold mb-2">
                            {i18n.language === 'ar' ? section.title_ar : section.title_en}
                          </h3>
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {i18n.language === 'ar' ? section.content_ar : section.content_en}
                          </p>

                          {section.icon === Mail && (
                            <div className="mt-4 space-y-2 text-sm">
                              <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-muted-foreground" />
                                <span className="text-muted-foreground">
                                  {i18n.language === 'ar' ? 'البريد الإلكتروني:' : 'Email:'}{' '}
                                  <span className="font-mono text-primary">support@nutriaware.info</span>
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Disclaimer */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-10 max-w-3xl mx-auto"
          >
            <Card className="border-amber-200 dark:border-amber-800/50 bg-amber-50/50 dark:bg-amber-950/20">
              <CardContent className="p-5 flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-amber-800 dark:text-amber-400 mb-1 text-sm">
                    {i18n.language === 'ar' ? 'إخلاء مسؤولية' : 'Disclaimer'}
                  </h4>
                  <p className="text-xs text-amber-700/80 dark:text-amber-500/80 leading-relaxed">
                    {i18n.language === 'ar'
                      ? 'جميع المحتويات المقدمة على هذه المنصة تعليمية بطبيعتها ولا تُعد بديلاً عن الاستشارة الطبية المتخصصة. يُرجى استشارة طبيب متخصص بشأن أي مخاوف صحية تتعلق بطفلك.'
                      : 'All content provided on this platform is educational in nature and does not constitute a substitute for professional medical consultation. Please consult a specialist physician regarding any health concerns about your child.'}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-16 text-center"
        >
          <Card className="bg-gradient-primary border-0">
            <CardContent className="p-8">
              <p className="text-lg text-primary-foreground">
                {t('about.commitment')}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      <SurveyCTA />
    </div>
  );
};

export default About;
