import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Users, Award, BookOpen, Bot, Calculator, ClipboardList } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { ImageWithFallback } from '@/components/ui/image-with-fallback';

interface TeamMember {
  name: string;
  role: string;
  photoPlaceholder?: string;
  customZoom?: string;
}

const About: React.FC = () => {
  const { t } = useTranslation();

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
      role: t('about.roles.doctor'),
      photoPlaceholder: '👩‍⚕️'
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

        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="mb-16"
        >
            <Card className="bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 border-2 border-primary/20 overflow-hidden relative">
                <div className="absolute top-0 right-0 p-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 p-32 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
                
                <CardContent className="p-8 md:p-12 text-center relative z-10">
                    <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                        <ClipboardList className="w-8 h-8" />
                    </div>
                    
                    <h2 className="text-3xl font-bold mb-4">{t('about.survey.title')}</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
                        {t('about.survey.description')}
                    </p>
                    
                    <a 
                        href="/project-evaluation" 
                        className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-full font-semibold text-lg transition-all hover:scale-105 shadow-lg hover:shadow-primary/25"
                    >
                        <ClipboardList className="w-5 h-5" />
                        {t('about.survey.cta')}
                    </a>
                </CardContent>
            </Card>
        </motion.div>

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
    </div>
  );
};

export default About;
