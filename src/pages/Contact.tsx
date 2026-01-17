import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  ExternalLink, 
  Send as SendIcon, 
  MessageCircle, 
  Stethoscope,
  MapPin,
  Clock
} from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/features/auth/firebase-auth-context';
import { useLanguage } from '@/contexts/LanguageContext';
import MedicalConsultation from './MedicalConsultation';



const Contact: React.FC = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const { toast } = useToast();
  const { user } = useAuth();
  const isRTL = language === 'ar';
  
  const [activeTab, setActiveTab] = useState<'feedback' | 'consultation'>('feedback');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast({
        title: t('common.error') || 'خطأ',
        description: t('contact.fillAllFields'),
        variant: 'destructive'
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const feedbackData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
        userId: user?.uid || null,
        language: language,
        createdAt: serverTimestamp()
      };

      await addDoc(collection(db, 'feedback'), feedbackData);

      toast({
        title: t('contact.success') || 'تم الإرسال بنجاح!',
        description: t('contact.successDescription'),
      });

      setFormData({ name: '', email: '', message: '' });

    } catch (error: any) {
      console.error("Feedback submission error:", error);

      // Fallback to local storage if Firebase fails (offline mode etc)
      try {
        const feedbackData = {
          id: Date.now(),
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
          userId: user?.uid || null,
          language: language,
          created_at: new Date().toISOString()
        };

        const existingFeedback = JSON.parse(localStorage.getItem('feedback_submissions') || '[]');
        existingFeedback.push(feedbackData);
        localStorage.setItem('feedback_submissions', JSON.stringify(existingFeedback));
        
        toast({
          title: t('contact.success') || 'تم الإرسال بنجاح!',
          description: t('contact.localSaveSuccess'),
        });

        setFormData({ name: '', email: '', message: '' });
      } catch (localError) {
        toast({
          title: t('common.error') || 'خطأ',
          description: t('contact.error') || "فشل إرسال الرسالة. يرجى المحاولة مرة أخرى.",
          variant: 'destructive'
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: Mail,
      title: t('contact.emailUs'),
      value: "support@nutriaware.info",
      href: "mailto:support@nutriaware.info",
      description: t('contact.forGeneralInquiries'),
      color: "text-primary",
      bg: "bg-primary/10"
    },
    {
      icon: Phone,
      title: t('contact.whatsapp'),
      value: "+20 100 076 1895",
      href: "https://wa.me/201000761895",
      description: t('contact.instantMessaging'),
      color: "text-green-600",
      bg: "bg-green-50 dark:bg-green-900/10"
    },
    {
      icon: MapPin,
      title: t('contact.location'),
      value: t('contact.cairo'),
      href: "#",
      description: t('contact.teamHeadquarters'),
      color: "text-blue-600",
      bg: "bg-blue-50 dark:bg-blue-900/10"
    },
    {
      icon: Clock,
      title: t('contact.workingHours'),
      value: t('contact.available247'),
      href: "#",
      description: t('contact.continuousSupport'),
      color: "text-purple-600",
      bg: "bg-purple-50 dark:bg-purple-900/10"
    }
  ];

  return (
    <div className={`min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium border border-primary/20 mb-6">
            <MessageCircle className="h-4 w-4" />
            {t('contact.subtitle')}
          </div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 lg:mb-6">
            <span className="bg-gradient-to-r from-primary via-blue-600 to-secondary bg-clip-text text-transparent">
              {t('contact.title')}
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            {t('contact.pageDescription')}
          </p>
        </motion.div>

        {/* Contact Methods Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-12 lg:mb-16"
        >
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 group cursor-pointer border-2 border-border/20 hover:border-primary/30 bg-background/50 backdrop-blur-sm">
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 rounded-2xl ${method.bg} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-inner`}>
                      <Icon className={`h-8 w-8 ${method.color}`} />
                    </div>
                    <h3 className="font-bold text-lg mb-2 text-foreground text-center">
                      {method.title}
                    </h3>
                    {method.href.startsWith('http') || method.href.startsWith('mailto') ? (
                      <a
                        href={method.href}
                        target={method.href.startsWith('http') ? "_blank" : undefined}
                        rel={method.href.startsWith('http') ? "noopener noreferrer" : undefined}
                        className={`${method.color} font-medium hover:underline flex items-center justify-center gap-1 mb-2 text-center ${
                          method.title.includes('WhatsApp') || method.title.includes('واتساب') || method.href.startsWith('mailto') 
                            ? 'force-ltr-center' 
                            : ''
                        }`}
                      >
                        {method.value}
                        {method.href.startsWith('http') && <ExternalLink className="h-3 w-3" />}
                      </a>
                    ) : (
                      <p className={`${method.color} font-medium mb-2 text-center ${
                        method.title.includes('WhatsApp') || method.title.includes('واتساب') 
                          ? 'force-ltr-center' 
                          : ''
                      }`}>
                        {method.value}
                      </p>
                    )}
                    <p className="text-sm text-muted-foreground text-center">
                      {method.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Main Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Tabs value={activeTab} onValueChange={(value: any) => setActiveTab(value)} className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-8 max-w-md mx-auto h-14 bg-muted/50 p-1 rounded-full">
              <TabsTrigger value="feedback" className="flex items-center gap-2 text-sm sm:text-base rounded-full h-full data-[state=active]:bg-background data-[state=active]:shadow-sm">
                <MessageCircle className="h-4 w-4" />
                {t('contact.generalFeedback')}
              </TabsTrigger>
              <TabsTrigger value="consultation" className="flex items-center gap-2 text-sm sm:text-base rounded-full h-full data-[state=active]:bg-background data-[state=active]:shadow-sm">
                <Stethoscope className="h-4 w-4" />
                {t('contact.medicalConsultation')}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="feedback">
              <Card className="border-0 shadow-2xl bg-card/95 backdrop-blur-xl overflow-hidden ring-1 ring-border/20">
                <div className="bg-gradient-to-r from-primary/20 via-primary/10 to-transparent p-1 h-1.5 w-full" />
                <CardHeader className="text-center pb-8 pt-10">
                  <CardTitle className="text-2xl sm:text-4xl font-bold flex flex-col sm:flex-row items-center justify-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center shadow-inner ring-1 ring-primary/20">
                      <SendIcon className="h-8 w-8 text-primary" />
                    </div>
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
                      {t('contact.sendMessage')}
                    </span>
                  </CardTitle>
                  <CardDescription className="text-lg mt-4 max-w-2xl mx-auto leading-relaxed">
                    {t('contact.feedbackDescription')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 sm:p-10 pt-4">
                  <form onSubmit={handleFeedbackSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <Label htmlFor="name" className="text-base font-bold text-foreground block">
                          {t('contact.name')}
                        </Label>
                        <div className="relative">
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder={t('contact.namePlaceholder')}
                            className="h-14 text-base pl-4 pr-4 bg-muted/40 border-2 border-border/60 focus:border-primary focus:ring-primary/20 focus:bg-background transition-all duration-300 rounded-xl hover:border-primary/50"
                            style={{ textAlign: isRTL ? 'right' : 'left' }}
                            dir={isRTL ? 'rtl' : 'ltr'}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="email" className="text-base font-bold text-foreground block">
                          {t('contact.email')}
                        </Label>
                        <div className="relative">
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder={t('contact.emailPlaceholder')}
                            className="h-14 text-base pl-4 pr-4 bg-muted/40 border-2 border-border/60 focus:border-primary focus:ring-primary/20 focus:bg-background transition-all duration-300 rounded-xl hover:border-primary/50"
                            style={{ textAlign: 'left' }}
                            dir="ltr"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <Label htmlFor="message" className="text-base font-bold text-foreground block">
                        {t('contact.messageLabel')}
                      </Label>
                      <div className="relative">
                        <Textarea
                          id="message"
                          rows={6}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder={t('contact.messagePlaceholder')}
                          className="text-base resize-none pl-4 pr-4 pt-4 bg-muted/40 border-2 border-border/60 focus:border-primary focus:ring-primary/20 focus:bg-background transition-all duration-300 rounded-xl min-h-[180px] hover:border-primary/50"
                          style={{ textAlign: isRTL ? 'right' : 'left' }}
                          dir={isRTL ? 'rtl' : 'ltr'}
                          required
                        />
                      </div>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full h-14 text-lg font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 rounded-xl" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-current mr-3"></div>
                          {t('contact.sending')}
                        </>
                      ) : (
                        <>
                          <SendIcon className={`h-6 w-6 ${isRTL ? 'ml-3' : 'mr-3'}`} />
                          {t('contact.send')}
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="consultation">
              <MedicalConsultation />
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
