
import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Bot, Utensils, Send, Loader2, Scale, AlertTriangle, Info, CheckCircle, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { sendChatMessage, CONDITION_MEAL_PLANS } from '@/services/gemini';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { CLINICAL_DATA, NutritionPlan } from '@/data/clinicalNutritionData';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface MealPlan {
  breakfast: string;
  lunch: string;
  dinner: string;
  snacks: string;
  protocolTitle?: string;
  goal?: string;
  strategy?: string;
  tips?: string[];
}



const AITools: React.FC = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const getInitialMessage = () => {
    return language === 'ar'
      ? 'مرحبًا! أنا Nutri-Bot، مساعدك في التغذية وسلامة الغذاء. يمكنني مساعدتك في أسئلة التغذية، النصائح الغذائية، والتوصيات الصحية. كيف يمكنني مساعدتك اليوم؟'
      : 'Hello! I\'m Nutri-Bot, your professional nutrition and food safety assistant. I can help you with nutrition questions, dietary advice, and health recommendations based on evidence-based science. How can I assist you today?';
  };

  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: getInitialMessage()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const [selectedCondition, setSelectedCondition] = useState('');
  const [mealPlan, setMealPlan] = useState<MealPlan | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // BMI Tool State
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [ageUnit, setAgeUnit] = useState<'years' | 'months'>('years');
  const [muac, setMuac] = useState('');

  // New Clinical State
  const [clinicalPlan, setClinicalPlan] = useState<NutritionPlan | null>(null);
  const [bmiValue, setBmiValue] = useState<number | null>(null);
  const [isBmiGenerating, setIsBmiGenerating] = useState(false);
  const [isOpenRefs, setIsOpenRefs] = useState(false);

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages, isTyping]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = { role: 'user', content: inputMessage };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const chatMessages = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));
      chatMessages.push({ role: 'user', content: inputMessage });

      const response = await sendChatMessage(chatMessages, language);

      const assistantMessage: Message = { role: 'assistant', content: response };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      toast({
        title: language === 'ar' ? 'خطأ' : 'Error',
        description: language === 'ar'
          ? 'عذرًا، حدث خطأ. يرجى المحاولة مرة أخرى.'
          : 'Sorry, an error occurred. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsTyping(false);
    }
  };

  const generateMealPlan = async () => {
    if (!selectedCondition) return;

    setIsGenerating(true);

    setTimeout(() => {
      // Get plan based on language and selected condition
      const plans = CONDITION_MEAL_PLANS[language as 'en' | 'ar'] || CONDITION_MEAL_PLANS['en'];

      const plan = plans[selectedCondition as keyof typeof plans];

      if (plan) {
        setMealPlan(plan);
      }
      setIsGenerating(false);
    }, 2000);
  };

  const getChildStatus = (ageYears: number, bmi: number) => {
    // Simplified WHO BMI-for-age guide
    let p5 = 14;
    let p85 = 18;
    let p95 = 22;

    if (ageYears >= 5 && ageYears < 10) { p5 = 13.5; p85 = 17; p95 = 19; }
    else if (ageYears >= 10 && ageYears < 15) { p5 = 15; p85 = 21; p95 = 24; }
    else if (ageYears >= 15) { p5 = 17; p85 = 24; p95 = 28; }

    if (bmi < p5) return 'underweight';
    if (bmi < p85) return 'healthy';
    if (bmi < p95) return 'overweight';
    return 'obese';
  };

  const calculateClinicalPlan = () => {
    if (!age) return;

    setIsBmiGenerating(true);

    setTimeout(() => {
      let ageInMonths = parseFloat(age);
      if (ageUnit === 'years') ageInMonths *= 12;

      let plan: NutritionPlan | null = null;
      const currentLangData = CLINICAL_DATA[language as 'en' | 'ar'] || CLINICAL_DATA['en'];

      // 1. Under 5 Years
      if (ageInMonths < 60) {
        setBmiValue(null); // No BMI for under 5
        const under5Data = currentLangData.under5.ageGroups;

        if (ageInMonths < 6) plan = under5Data["0-6m"];
        else if (ageInMonths < 9) plan = under5Data["6-8m"];
        else if (ageInMonths < 12) plan = under5Data["9-11m"];
        else if (ageInMonths < 24) plan = under5Data["12-24m"];
        else plan = under5Data["2-5y"];

      } else {
        // Calculate BMI
        const h = parseFloat(height) / 100;
        const w = parseFloat(weight);

        if (!h || !w) {
          // Fallback if user didn't enter height/weight but selected >5 years
          setIsBmiGenerating(false);
          return;
        }

        const bmi = w / (h * h);
        setBmiValue(bmi);
        const ageInYears = ageInMonths / 12;

        // 2. Child 5-18 Years
        if (ageInYears < 18) {
          const status = getChildStatus(ageInYears, bmi);
          plan = (currentLangData.child as any)[status];
        }
        // 3. Adults 18+
        else {
          let status = 'healthy';
          if (bmi < 18.5) status = 'underweight';
          else if (bmi < 25) status = 'healthy';
          else if (bmi < 30) status = 'overweight';
          else status = 'obese';
          plan = (currentLangData.adult as any)[status];
        }
      }

      setClinicalPlan(plan as NutritionPlan);
      setIsBmiGenerating(false);
    }, 1500);
  };



  // Re-calculate plan when language changes to ensure content is localized
  useEffect(() => {
    if (clinicalPlan) {
      calculateClinicalPlan();
    }
  }, [language]);

  return (
    <div className={`min-h-screen py-12 bg-gradient-to-br from-primary/5 via-background to-secondary/5 ${language === 'ar' ? 'rtl' : 'ltr'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center p-3 mb-6 rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/20">
             <Bot className="w-8 h-8" />
          </div>
          <h1 className="text-4xl xl:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary via-blue-600 to-secondary bg-clip-text text-transparent">
              {t('aiTools.title')}
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t('aiTools.subtitle')}
          </p>
        </motion.div>

        <Tabs defaultValue="chatbot" className="w-full">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 h-auto mb-10 gap-2 bg-card/30 backdrop-blur-md border border-white/10 p-1.5 rounded-2xl">
            <TabsTrigger 
              value="chatbot" 
              className="gap-2 h-12 rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all duration-300 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-white/5"
            >
              <Bot className="h-5 w-5" />
              {t('aiTools.chatbot.title')}
            </TabsTrigger>
            <TabsTrigger 
              value="meal-generator" 
              className="gap-2 h-12 rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all duration-300 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-primary/10"
            >
              <Utensils className="h-5 w-5" />
              {t('aiTools.mealGenerator.title')}
            </TabsTrigger>
            <TabsTrigger 
              value="bmi-calculator" 
              className="gap-2 h-12 rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all duration-300 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-primary/10"
            >
              <Scale className="h-5 w-5" />
              {t('aiTools.bmiMealGenerator.title')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chatbot">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="h-[650px] flex flex-col border-0 shadow-2xl bg-card/95 backdrop-blur-xl overflow-hidden ring-1 ring-border/20">
                 <div className="bg-gradient-to-r from-primary/20 via-primary/10 to-transparent p-1 h-1.5 w-full" />
                <CardHeader className="border-b border-border/40 pb-6 bg-muted/10">
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                      <Bot className="h-6 w-6 text-primary" />
                    </div>
                    {t('aiTools.chatbot.title')}
                  </CardTitle>
                  <CardDescription className="text-base">{t('aiTools.chatbot.description')}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col min-h-0 overflow-hidden bg-muted/5 p-0">
                  <ScrollArea ref={scrollAreaRef} className="flex-1 p-4 md:p-6 mb-0 min-h-0">
                    <div className="space-y-6 py-2">
                      {messages.map((message, index) => (
                        <div
                          key={index}
                          className={`flex pointer-events-none ${message.role === 'user' ? 'justify-end' : 'justify-start'} `}
                        >
                          <div className={`flex gap-3 max-w-[85%] md:max-w-[75%] pointer-events-auto ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                             {/* Avatar */}
                             <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border shadow-sm mt-1
                               ${message.role === 'user' ? 'bg-primary border-primary text-primary-foreground' : 'bg-background border-border text-primary'}`}>
                                {message.role === 'user' ? <div className="w-2 h-2 rounded-full bg-white"/> : <Bot className="h-4 w-4" />}
                             </div>

                             <div
                            className={`p-4 rounded-2xl shadow-sm text-sm sm:text-base leading-relaxed ${message.role === 'user'
                              ? 'bg-primary text-primary-foreground rounded-tr-sm'
                              : 'bg-white dark:bg-card border border-border/60 text-foreground rounded-tl-sm'
                              }`}
                          >
                            <div
                              dir={language === 'ar' ? 'rtl' : 'ltr'}
                              className={`${language === 'ar' ? 'text-right' : 'text-left'}`}
                            >
                              <ReactMarkdown
                                components={{
                                  ul: ({ node, ...props }) => <ul className="list-disc list-inside my-2 space-y-1" {...props} />,
                                  ol: ({ node, ...props }) => <ol className="list-decimal list-inside my-2 space-y-1" {...props} />,
                                  strong: ({ node, ...props }) => <span className="font-bold opacity-90" {...props} />,
                                  p: ({ node, ...props }) => <p className="mb-2 last:mb-0" {...props} />,
                                  li: ({ node, ...props }) => <li className="my-1" {...props} />,
                                  table: ({ node, ...props }) => (
                                    <div className="overflow-x-auto my-4 rounded-lg border border-border/50">
                                      <table className="min-w-full text-sm" {...props} />
                                    </div>
                                  ),
                                  thead: ({ node, ...props }) => <thead className="bg-black/5 dark:bg-white/5" {...props} />,
                                  tbody: ({ node, ...props }) => <tbody {...props} />,
                                  tr: ({ node, ...props }) => <tr className="border-b border-border/50 last:border-0 hover:bg-black/5 dark:hover:bg-white/5" {...props} />,
                                  th: ({ node, ...props }) => (
                                    <th className="px-3 py-2 text-start font-semibold opacity-80" {...props} />
                                  ),
                                  td: ({ node, ...props }) => (
                                    <td className="px-3 py-2" {...props} />
                                  ),
                                }}
                              >
                                {message.content}
                              </ReactMarkdown>
                            </div>
                          </div>
                          </div>
                         
                        </div>
                      ))}
                      {isTyping && (
                        <div className="flex justify-start">
                           <div className="flex gap-3 max-w-[85%]">
                              <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 border border-border bg-background shadow-sm mt-1 text-primary">
                                <Bot className="h-4 w-4" />
                             </div>
                             <div className="bg-white dark:bg-card border border-border/60 text-foreground p-4 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-2">
                                <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce"></span>
                             </div>
                           </div>
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                  <div className="p-4 bg-background border-t border-border/40">
                    <div className="relative flex items-end gap-2 p-2 bg-muted/30 border border-border/60 hover:border-primary/40 focus-within:border-primary/60 focus-within:ring-1 focus-within:ring-primary/20 rounded-2xl transition-all duration-300">
                      <Input
                        placeholder={t('aiTools.chatbot.placeholder')}
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && !isTyping && handleSendMessage()}
                        disabled={isTyping}
                        className="flex-1 bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 h-auto min-h-[48px] py-3 px-4 text-base resize-none shadow-none"
                      />
                      <Button
                        onClick={handleSendMessage}
                        size="icon"
                        disabled={isTyping || !inputMessage.trim()}
                        className="mb-1 mr-1 ml-1 h-10 w-10 shrink-0 rounded-xl bg-primary hover:bg-primary/90 shadow-sm transition-transform active:scale-95"
                      >
                        {isTyping ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="meal-generator">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="h-[900px] flex flex-col border-0 shadow-2xl bg-card/95 backdrop-blur-xl overflow-hidden ring-1 ring-border/20">
                <div className="bg-gradient-to-r from-secondary/20 via-secondary/10 to-transparent p-1 h-1.5 w-full" />
                <CardHeader className="border-b border-border/40 pb-6 bg-muted/10">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <CardTitle className="flex items-center gap-3 text-2xl">
                        <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center border border-secondary/20">
                            <Utensils className="h-6 w-6 text-secondary" />
                        </div>
                        {t('aiTools.mealGenerator.title')}
                        </CardTitle>
                        <CardDescription className="text-base mt-2">{t('aiTools.mealGenerator.description')}</CardDescription>
                    </div>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button 
                            variant="outline" 
                            className="w-full sm:w-auto font-medium border-secondary/20 text-secondary hover:bg-secondary/10 hover:text-secondary gap-2 rounded-xl h-10"
                            >
                            <Info className="h-4 w-4" />
                            {t('aiTools.mealGenerator.nutritionalStandards')}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80 border-secondary/20" align="end">
                            <div className="space-y-3">
                                <h4 className="font-bold leading-none text-foreground flex items-center gap-2">
                                <Info className="h-4 w-4 text-secondary" />
                                {language === 'ar' ? 'إرشادات غذائية (WHO)' : 'WHO Nutritional Guidelines'}
                                </h4>
                                <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">
                                {t('assessment.calorie.whoGuidelines')}
                                </p>
                            </div>
                        </PopoverContent>
                    </Popover>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col min-h-0 overflow-hidden p-0">
                  <div className="p-6 bg-muted/5 border-b border-border/40">
                    <div className="flex flex-col sm:flex-row gap-4">
                         <div className="flex-1 space-y-2">
                             <Label className="text-base font-semibold ml-1">{t('aiTools.mealGenerator.condition')}</Label>
                            <Select value={selectedCondition} onValueChange={setSelectedCondition}>
                                <SelectTrigger id="condition" className="h-14 bg-background border-2 border-border/60 focus:border-secondary focus:ring-secondary/20 text-base rounded-xl">
                                <SelectValue placeholder={t('aiTools.mealGenerator.condition')} />
                                </SelectTrigger>
                                <SelectContent>
                                <SelectItem value="ironDeficiency">{t('aiTools.mealGenerator.ironDeficiency')}</SelectItem>
                                <SelectItem value="vitaminD">{t('aiTools.mealGenerator.vitaminD')}</SelectItem>
                                <SelectItem value="proteinDeficiency">{t('aiTools.mealGenerator.proteinDeficiency')}</SelectItem>
                                <SelectItem value="obesity">{t('aiTools.mealGenerator.obesity')}</SelectItem>
                                <SelectItem value="diabetes">{t('aiTools.mealGenerator.diabetes')}</SelectItem>
                                </SelectContent>
                            </Select>
                        </div> 
                        <div className="sm:self-end">
                            <Button 
                                onClick={generateMealPlan} 
                                className="w-full sm:w-auto h-14 px-8 text-lg font-bold bg-secondary hover:bg-secondary/90 text-white shadow-lg shadow-secondary/20 rounded-xl" 
                                disabled={!selectedCondition || isGenerating}
                            >
                            {isGenerating ? (
                                <>
                                <Loader2 className="h-5 w-5 me-2 animate-spin" />
                                {t('aiTools.mealGenerator.generating')}
                                </>
                            ) : (
                                t('aiTools.mealGenerator.generate')
                            )}
                            </Button>
                        </div>
                    </div>
                    
                  </div>

                  {mealPlan && (
                    <ScrollArea className="flex-1 min-h-0" dir={language === 'ar' ? 'rtl' : 'ltr'}>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4 pr-4 pb-4 px-1"
                      >
                        {mealPlan.protocolTitle && (
                          <div className={`mb-4 space-y-3 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                            <h3 className="font-bold text-lg text-primary">{mealPlan.protocolTitle}</h3>
                            {mealPlan.goal && (
                              <div className="bg-primary/10 p-3 rounded-md text-sm">
                                <span className="font-semibold block mb-1">{t('aiTools.protocol.goal', 'Goal')}:</span>
                                <div className="prose prose-sm max-w-none dark:prose-invert text-slate-100">
                                  <ReactMarkdown
                                    components={{
                                      table: ({ node, ...props }) => (
                                        <div className="overflow-x-auto my-4">
                                          <table className="min-w-full border-collapse border border-white/20 rounded-lg" {...props} />
                                        </div>
                                      ),
                                      thead: ({ node, ...props }) => <thead className="bg-white/10" {...props} />,
                                      tbody: ({ node, ...props }) => <tbody {...props} />,
                                      tr: ({ node, ...props }) => <tr className="border-b border-white/10 hover:bg-white/5" {...props} />,
                                      th: ({ node, ...props }) => (
                                        <th className="border border-white/20 px-4 py-2 text-left font-semibold bg-white/10" {...props} />
                                      ),
                                      td: ({ node, ...props }) => (
                                        <td className="border border-white/20 px-4 py-2 text-sm" {...props} />
                                      ),
                                    }}
                                  >
                                    {mealPlan.goal}
                                  </ReactMarkdown>
                                </div>
                              </div>
                            )}
                            {mealPlan.strategy && (
                              <div className="bg-secondary/10 p-3 rounded-md text-sm">
                                <span className="font-semibold block mb-1">{t('aiTools.protocol.strategy', 'Strategy')}:</span>
                                <div className="prose prose-sm max-w-none dark:prose-invert text-slate-100">
                                  <ReactMarkdown
                                    components={{
                                      table: ({ node, ...props }) => (
                                        <div className="overflow-x-auto my-4">
                                          <table className="min-w-full border-collapse border border-white/20 rounded-lg" {...props} />
                                        </div>
                                      ),
                                      thead: ({ node, ...props }) => <thead className="bg-white/10" {...props} />,
                                      tbody: ({ node, ...props }) => <tbody {...props} />,
                                      tr: ({ node, ...props }) => <tr className="border-b border-white/10 hover:bg-white/5" {...props} />,
                                      th: ({ node, ...props }) => (
                                        <th className="border border-white/20 px-4 py-2 text-left font-semibold bg-white/10" {...props} />
                                      ),
                                      td: ({ node, ...props }) => (
                                        <td className="border border-white/20 px-4 py-2 text-sm" {...props} />
                                      ),
                                    }}
                                  >
                                    {mealPlan.strategy}
                                  </ReactMarkdown>
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        <div className={`p-5 rounded-2xl border border-border/50 bg-white/60 dark:bg-slate-950/50 backdrop-blur-xl shadow-sm ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                          <h3 className={`font-bold text-primary mb-2 flex items-center gap-2 ${language === 'ar' ? 'flex-row-reverse' : 'flex-row'}`}>
                            🌅 {t('aiTools.mealGenerator.breakfast')}
                          </h3>
                          <div className="text-sm text-gray-700 dark:text-slate-200 leading-relaxed font-medium">
                            <div className="prose prose-sm max-w-none dark:prose-invert">
                              <ReactMarkdown
                                components={{
                                  table: ({ node, ...props }) => (
                                    <div className="overflow-x-auto my-4">
                                      <table className="min-w-full border-collapse border border-border rounded-lg" {...props} />
                                    </div>
                                  ),
                                  thead: ({ node, ...props }) => <thead className="bg-muted/50" {...props} />,
                                  tbody: ({ node, ...props }) => <tbody {...props} />,
                                  tr: ({ node, ...props }) => <tr className="border-b border-border hover:bg-muted/30" {...props} />,
                                  th: ({ node, ...props }) => (
                                    <th className="border border-border px-4 py-2 text-left font-semibold bg-muted/70" {...props} />
                                  ),
                                  td: ({ node, ...props }) => (
                                    <td className="border border-border px-4 py-2 text-sm" {...props} />
                                  ),
                                }}
                              >
                                {mealPlan.breakfast}
                              </ReactMarkdown>
                            </div>
                          </div>
                        </div>
                        <div className={`p-5 rounded-2xl border border-border/50 bg-white/60 dark:bg-slate-950/50 backdrop-blur-xl shadow-sm ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                          <h3 className={`font-semibold text-primary mb-2 flex items-center gap-2 ${language === 'ar' ? 'flex-row-reverse' : 'flex-row'}`}>
                            ☀️ {t('aiTools.mealGenerator.lunch')}
                          </h3>
                          <div className="text-sm text-gray-700 dark:text-slate-200 leading-relaxed font-medium">
                            <div className="prose prose-sm max-w-none dark:prose-invert">
                              <ReactMarkdown
                                components={{
                                  table: ({ node, ...props }) => (
                                    <div className="overflow-x-auto my-4">
                                      <table className="min-w-full border-collapse border border-border rounded-lg" {...props} />
                                    </div>
                                  ),
                                  thead: ({ node, ...props }) => <thead className="bg-muted/50" {...props} />,
                                  tbody: ({ node, ...props }) => <tbody {...props} />,
                                  tr: ({ node, ...props }) => <tr className="border-b border-border hover:bg-muted/30" {...props} />,
                                  th: ({ node, ...props }) => (
                                    <th className="border border-border px-4 py-2 text-left font-semibold bg-muted/70" {...props} />
                                  ),
                                  td: ({ node, ...props }) => (
                                    <td className="border border-border px-4 py-2 text-sm" {...props} />
                                  ),
                                }}
                              >
                                {mealPlan.lunch}
                              </ReactMarkdown>
                            </div>
                          </div>
                        </div>
                        <div className={`p-5 rounded-2xl border border-border/50 bg-white/60 dark:bg-slate-950/50 backdrop-blur-xl shadow-sm ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                          <h3 className={`font-bold text-primary mb-2 flex items-center gap-2 ${language === 'ar' ? 'flex-row-reverse' : 'flex-row'}`}>
                            🌙 {t('aiTools.mealGenerator.dinner')}
                          </h3>
                          <div className="text-sm text-gray-700 dark:text-slate-200 leading-relaxed font-medium">
                            <div className="prose prose-sm max-w-none dark:prose-invert">
                              <ReactMarkdown
                                components={{
                                  table: ({ node, ...props }) => (
                                    <div className="overflow-x-auto my-4">
                                      <table className="min-w-full border-collapse border border-border rounded-lg" {...props} />
                                    </div>
                                  ),
                                  thead: ({ node, ...props }) => <thead className="bg-muted/50" {...props} />,
                                  tbody: ({ node, ...props }) => <tbody {...props} />,
                                  tr: ({ node, ...props }) => <tr className="border-b border-border hover:bg-muted/30" {...props} />,
                                  th: ({ node, ...props }) => (
                                    <th className="border border-border px-4 py-2 text-left font-semibold bg-muted/70" {...props} />
                                  ),
                                  td: ({ node, ...props }) => (
                                    <td className="border border-border px-4 py-2 text-sm" {...props} />
                                  ),
                                }}
                              >
                                {mealPlan.dinner}
                              </ReactMarkdown>
                            </div>
                          </div>
                        </div>
                        <div className={`p-5 rounded-2xl border border-border/50 bg-white/60 dark:bg-slate-950/50 backdrop-blur-xl shadow-sm ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                          <h3 className={`font-bold text-primary mb-2 flex items-center gap-2 ${language === 'ar' ? 'flex-row-reverse' : 'flex-row'}`}>
                            🍎 {t('aiTools.mealGenerator.snacks')}
                          </h3>
                          <div className="text-sm text-gray-700 dark:text-slate-200 leading-relaxed font-medium">
                            <div className="prose prose-sm max-w-none dark:prose-invert">
                              <div className="prose prose-sm max-w-none dark:prose-invert">
                                <ReactMarkdown
                                  components={{
                                    table: ({ node, ...props }) => (
                                      <div className="overflow-x-auto my-4">
                                        <table className="min-w-full border-collapse border border-border rounded-lg" {...props} />
                                      </div>
                                    ),
                                    thead: ({ node, ...props }) => <thead className="bg-muted/50" {...props} />,
                                    tbody: ({ node, ...props }) => <tbody {...props} />,
                                    tr: ({ node, ...props }) => <tr className="border-b border-border hover:bg-muted/30" {...props} />,
                                    th: ({ node, ...props }) => (
                                      <th className="border border-border px-4 py-2 text-left font-semibold bg-muted/70" {...props} />
                                    ),
                                    td: ({ node, ...props }) => (
                                      <td className="border border-border px-4 py-2 text-sm" {...props} />
                                    ),
                                  }}
                                >
                                  {mealPlan.snacks}
                                </ReactMarkdown>
                              </div>
                            </div>
                          </div>
                        </div>

                        {mealPlan.tips && mealPlan.tips.length > 0 && (
                          <div className={`mt-4 p-4 bg-muted rounded-lg border border-border ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                            <h4 className={`font-semibold mb-2 flex items-center gap-2 ${language === 'ar' ? 'flex-row-reverse' : 'flex-row'}`}>
                              <Info className="h-4 w-4" />
                              {t('aiTools.protocol.tips', 'Professional Tips')}
                            </h4>
                            <ul className={`list-disc list-inside text-sm space-y-1 text-muted-foreground ${language === 'ar' ? 'mr-4' : 'ml-4'}`}>
                              {mealPlan.tips.map((tip, i) => (
                                <li key={i}>{tip}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </motion.div>
                    </ScrollArea>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="bmi-calculator">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">

                {/* 1. INPUT SECTION */}
                <div className="space-y-6">
                  <Card className="h-fit border-0 shadow-xl bg-card/95 backdrop-blur-xl ring-1 ring-border/20">
                     <div className="bg-gradient-to-r from-accent/20 via-accent/10 to-transparent p-1 h-1.5 w-full rounded-t-xl" />
                    <CardHeader className="pb-4">
                      <CardTitle className="flex items-center gap-3 text-xl text-foreground">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                             <Scale className="h-5 w-5 text-primary" />
                        </div>
                        {t('aiTools.bmiMealGenerator.title')}
                      </CardTitle>
                      <CardDescription>{t('aiTools.bmiMealGenerator.description')}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      
                        {/* Age Input */}
                        <div className="space-y-3">
                          <Label htmlFor="age" className="text-base font-semibold">
                            {ageUnit === 'years'
                              ? t('aiTools.bmiMealGenerator.age')
                              : t('aiTools.bmiMealGenerator.months')}
                          </Label>
                          <div className="flex gap-3">
                            <Input
                              id="age"
                              type="number"
                              placeholder="0"
                              value={age}
                              onChange={(e) => setAge(e.target.value)}
                              className="flex-1 h-14 bg-muted/30 border-2 border-border/60 focus:border-accent focus:ring-accent/20 rounded-xl text-lg"
                            />
                            <Select value={ageUnit} onValueChange={(v: 'years' | 'months') => setAgeUnit(v)}>
                              <SelectTrigger className="w-[110px] h-14 bg-muted/30 border-2 border-border/60 rounded-xl">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="years">{t('aiTools.bmiMealGenerator.years')}</SelectItem>
                                <SelectItem value="months">{t('aiTools.bmiMealGenerator.months')}</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        {/* Optional Inputs */}
                        {(ageUnit === 'years' ? parseInt(age) < 5 : parseInt(age) < 60) && (
                          <div className="space-y-3 animate-in slide-in-from-top-2 duration-300">
                            <Label htmlFor="muac" className="text-base font-semibold">{t('aiTools.bmiMealGenerator.muac')}</Label>
                            <Input
                              id="muac"
                              type="number"
                              step="0.01"
                              placeholder="cm"
                              value={muac}
                              onChange={(e) => setMuac(e.target.value)}
                              className="h-14 bg-muted/30 border-2 border-border/60 focus:border-accent focus:ring-accent/20 rounded-xl text-lg"
                            />
                          </div>
                        )}
                        <div className="space-y-3">
                          <Label htmlFor="height" className="text-base font-semibold">{t('aiTools.bmiMealGenerator.height')}</Label>
                          <Input
                            id="height"
                            type="number"
                            step="0.01"
                            placeholder="cm"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                            className="h-14 bg-muted/30 border-2 border-border/60 focus:border-accent focus:ring-accent/20 rounded-xl text-lg"
                          />
                        </div>
                        <div className="space-y-3">
                          <Label htmlFor="weight" className="text-base font-semibold">{t('aiTools.bmiMealGenerator.weight')}</Label>
                          <Input
                            id="weight"
                            type="number"
                            step="0.01"
                            placeholder="kg"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            className="h-14 bg-muted/30 border-2 border-border/60 focus:border-accent focus:ring-accent/20 rounded-xl text-lg"
                          />
                        </div>


                        <Button
                          onClick={calculateClinicalPlan}
                          className="w-full h-14 text-lg font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 rounded-xl mt-4"
                          disabled={!age || isBmiGenerating}
                        >
                          {isBmiGenerating ? (
                            <>
                              <Loader2 className="h-5 w-5 me-2 animate-spin" />
                              {t('common.loading')}
                            </>
                          ) : (
                            t('aiTools.bmiMealGenerator.calculate')
                          )}
                        </Button>

                        {/* Small Result Summary in Input Card */}
                        {clinicalPlan && (
                          <div className="p-5 rounded-2xl bg-accent/5 border border-accent/20 text-center animate-in fade-in zoom-in duration-300">
                            {bmiValue && <p className="text-sm font-medium text-accent/80 mb-1">{t('aiTools.bmiMealGenerator.yourBmi')}</p>}
                            {bmiValue && <div className="text-4xl font-black text-accent mb-2 tracking-tight">{bmiValue.toFixed(1)}</div>}
                            <div className="inline-flex items-center px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-bold">
                              {clinicalPlan.status}
                            </div>
                          </div>
                        )}
                    </CardContent>
                  </Card>

                  {/* Reference Tables Section */}
                  <Card className="border-border/60 shadow-sm">
                    <Collapsible open={isOpenRefs} onOpenChange={setIsOpenRefs}>
                      <CardHeader className="py-3 px-4">
                        <CollapsibleTrigger asChild>
                          <Button variant="ghost" className="w-full flex justify-between p-0 h-auto font-semibold hover:bg-transparent text-muted-foreground hover:text-foreground">
                            <span className="flex items-center gap-2">
                              <BookOpen className="h-4 w-4" />
                              {t('aiTools.bmiMealGenerator.references.title')}
                            </span>
                            {isOpenRefs ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                          </Button>
                        </CollapsibleTrigger>
                      </CardHeader>
                      <CollapsibleContent>
                        <CardContent className="text-xs text-muted-foreground space-y-4 pt-0 pb-4 px-4">

                          <div className="p-3 bg-muted/40 rounded-lg">
                            <h4 className="font-bold text-foreground mb-1">{t('aiTools.bmiMealGenerator.references.who_growth.title')}</h4>
                            <p className="leading-relaxed">{t('aiTools.bmiMealGenerator.references.who_growth.desc')}</p>
                            <a href="https://www.who.int/tools/child-growth-standards" target="_blank" rel="noreferrer" className="text-primary hover:underline mt-1 block">
                              {t('aiTools.bmiMealGenerator.references.who_growth.source')}
                            </a>
                          </div>
                          <div className="p-3 bg-muted/40 rounded-lg">
                            <h4 className="font-bold text-foreground mb-1">{t('aiTools.bmiMealGenerator.references.bmi_age.title')}</h4>
                            <p className="leading-relaxed mb-2">{t('aiTools.bmiMealGenerator.references.bmi_age.desc')}</p>
                            <ul className="list-disc list-inside space-y-1 ml-1 rtl:mr-1">
                              <li>{t('aiTools.bmiMealGenerator.references.bmi_age.p5')}</li>
                              <li>{t('aiTools.bmiMealGenerator.references.bmi_age.p5_85')}</li>
                              <li>{t('aiTools.bmiMealGenerator.references.bmi_age.p85_95')}</li>
                              <li>{t('aiTools.bmiMealGenerator.references.bmi_age.p95')}</li>
                            </ul>
                            <a href="https://www.who.int/tools/growth-reference-data-for-5to19-years" target="_blank" rel="noreferrer" className="text-primary hover:underline mt-2 block">
                              {t('aiTools.bmiMealGenerator.references.bmi_age.source')}
                            </a>
                          </div>
                          <div className="p-3 bg-muted/40 rounded-lg">
                            <h4 className="font-bold text-foreground mb-1">{t('aiTools.bmiMealGenerator.references.adult_bmi.title')}</h4>
                            <ul className="list-disc list-inside mb-2 space-y-1 ml-1 rtl:mr-1">
                              <li>{t('aiTools.bmiMealGenerator.references.adult_bmi.underw')}</li>
                              <li>{t('aiTools.bmiMealGenerator.references.adult_bmi.healthy')}</li>
                              <li>{t('aiTools.bmiMealGenerator.references.adult_bmi.overw')}</li>
                              <li>{t('aiTools.bmiMealGenerator.references.adult_bmi.obese')}</li>
                            </ul>
                            <p className="italic opacity-80">{t('aiTools.bmiMealGenerator.references.adult_bmi.note')}</p>
                          </div>
                        </CardContent>
                      </CollapsibleContent>
                    </Collapsible>
                  </Card>
                </div>

                {/* 2. RESULTS SECTION (Spans 2 columns on XL) */}
                <div className="xl:col-span-2">
                  {clinicalPlan ? (
                    <div className="h-full border border-border rounded-lg p-4 bg-card/50" dir={language === 'ar' ? 'rtl' : 'ltr'}>

                      {/* Messages & Actions First */}
                      <div className="mb-6 p-4 bg-background rounded-lg border shadow-sm">
                        <h4 className="font-bold flex items-center gap-2 mb-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          {t('aiTools.bmiMealGenerator.steps')}
                        </h4>
                        <p className="text-sm font-medium mb-2">{clinicalPlan.message}</p>
                        <div className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">
                          {clinicalPlan.action}
                        </div>
                        {clinicalPlan.warning && (
                          <div className="mt-4 p-3 bg-red-50 text-red-700 text-sm rounded-md flex gap-2 border border-red-100">
                            <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                            <span>{clinicalPlan.warning}</span>
                          </div>
                        )}
                      </div>

                      {/* Meal Plan Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl border border-border/50 bg-white/60 dark:bg-slate-950/50 backdrop-blur-xl shadow-sm">
                          <h4 className="font-bold text-primary mb-2 flex items-center gap-2 text-sm">
                            🌅 {t('aiTools.mealGenerator.breakfast')}
                          </h4>
                          <ul className="text-xs sm:text-sm text-gray-700 dark:text-slate-200 list-disc list-inside space-y-1 font-medium">
                            {clinicalPlan.mealPlan.breakfast.map((s, i) => <li key={i}>{s}</li>)}
                          </ul>
                        </div>
                        {clinicalPlan.mealPlan.lunch.length > 0 && (
                          <div className="p-4 rounded-xl border border-border/50 bg-white/60 dark:bg-slate-950/50 backdrop-blur-xl shadow-sm">
                            <h4 className="font-bold text-primary mb-2 flex items-center gap-2 text-sm">
                              ☀️ {t('aiTools.mealGenerator.lunch')}
                            </h4>
                            <ul className="text-xs sm:text-sm text-gray-700 dark:text-slate-200 list-disc list-inside space-y-1 font-medium">
                              {clinicalPlan.mealPlan.lunch.map((s, i) => <li key={i}>{s}</li>)}
                            </ul>
                          </div>
                        )}
                        {clinicalPlan.mealPlan.dinner.length > 0 && (
                          <div className="p-4 rounded-xl border border-border/50 bg-white/60 dark:bg-slate-950/50 backdrop-blur-xl shadow-sm">
                            <h4 className="font-bold text-primary mb-2 flex items-center gap-2 text-sm">
                              🌙 {t('aiTools.mealGenerator.dinner')}
                            </h4>
                            <ul className="text-xs sm:text-sm text-gray-700 dark:text-slate-200 list-disc list-inside space-y-1 font-medium">
                              {clinicalPlan.mealPlan.dinner.map((s, i) => <li key={i}>{s}</li>)}
                            </ul>
                          </div>
                        )}
                        {((clinicalPlan.mealPlan.snacks1?.length ?? 0) > 0 || (clinicalPlan.mealPlan.snacks2?.length ?? 0) > 0) && (
                          <div className="p-4 rounded-xl border border-border/50 bg-white/60 dark:bg-slate-950/50 backdrop-blur-xl shadow-sm">
                            <h4 className="font-bold text-primary mb-2 flex items-center gap-2 text-sm">
                              🍎 {t('aiTools.mealGenerator.snacks')}
                            </h4>
                            <ul className="text-xs sm:text-sm text-gray-700 dark:text-slate-200 list-disc list-inside space-y-1 font-medium">
                              {clinicalPlan.mealPlan.snacks1?.map((s, i) => <li key={'s1' + i}>{s}</li>)}
                              {clinicalPlan.mealPlan.snacks2?.map((s, i) => <li key={'s2' + i}>{s}</li>)}
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* Prohibited Items */}
                      {clinicalPlan.prohibited && (
                        <div className="mt-4 p-4 rounded-xl border border-red-200 dark:border-red-900/50 bg-red-50/50 dark:bg-red-950/20">
                          <h4 className="font-bold text-red-600 dark:text-red-400 text-xs mb-2 flex items-center gap-2">
                            <Info className="h-3 w-3" />
                            {t('common.forbidden')}
                          </h4>
                          <p className="text-xs text-red-700 dark:text-red-300 font-medium leading-relaxed">{clinicalPlan.prohibited.join(' • ')}</p>
                        </div>
                      )}

                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center p-8 border border-dashed border-border rounded-lg text-muted-foreground text-sm">
                      {t('aiTools.bmiMealGenerator.description')}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AITools;
