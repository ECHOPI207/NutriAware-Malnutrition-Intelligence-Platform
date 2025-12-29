
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
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl xl:text-5xl font-bold mb-4">
            <span className="gradient-text">{t('aiTools.title')}</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            {t('aiTools.subtitle')}
          </p>
        </motion.div>

        <Tabs defaultValue="chatbot" className="w-full">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 h-auto mb-8 gap-2">
            <TabsTrigger value="chatbot" className="gap-2">
              <Bot className="h-4 w-4" />
              {t('aiTools.chatbot.title')}
            </TabsTrigger>
            <TabsTrigger value="meal-generator" className="gap-2">
              <Utensils className="h-4 w-4" />
              {t('aiTools.mealGenerator.title')}
            </TabsTrigger>
            <TabsTrigger value="bmi-calculator" className="gap-2">
              <Scale className="h-4 w-4" />
              {t('aiTools.bmiMealGenerator.title')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chatbot">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="h-[600px] flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bot className="h-6 w-6 text-primary" />
                    {t('aiTools.chatbot.title')}
                  </CardTitle>
                  <CardDescription>{t('aiTools.chatbot.description')}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col min-h-0 overflow-hidden">
                  <ScrollArea ref={scrollAreaRef} className="flex-1 pr-4 mb-4 min-h-0">
                    <div className="space-y-4 py-2">
                      {messages.map((message, index) => (
                        <div
                          key={index}
                          className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} `}
                        >
                          <div
                            className={`max-w-[80%] p-3 rounded-lg shadow-sm ${message.role === 'user'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted text-foreground border border-border'
                              }`}
                          >
                            <div
                              dir={language === 'ar' ? 'rtl' : 'ltr'}
                              className={`text-sm leading-relaxed ${language === 'ar' ? 'text-right' : 'text-left'}`}
                            >
                              <ReactMarkdown
                                components={{
                                  ul: ({ node, ...props }) => <ul className="list-disc list-inside my-2" {...props} />,
                                  ol: ({ node, ...props }) => <ol className="list-decimal list-inside my-2" {...props} />,
                                  strong: ({ node, ...props }) => <span className="font-bold text-foreground/90" {...props} />,
                                  p: ({ node, ...props }) => <p className="mb-2 last:mb-0" {...props} />,
                                  li: ({ node, ...props }) => <li className="my-1" {...props} />,
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
                                {message.content}
                              </ReactMarkdown>
                            </div>
                          </div>
                        </div>
                      ))}
                      {isTyping && (
                        <div className="flex justify-start">
                          <div className="bg-muted text-foreground border border-border p-3 rounded-lg shadow-sm">
                            <Loader2 className="h-4 w-4 animate-spin text-primary" />
                          </div>
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                  <div className="flex gap-2 pt-2 border-t border-border">
                    <Input
                      placeholder={t('aiTools.chatbot.placeholder')}
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && !isTyping && handleSendMessage()}
                      disabled={isTyping}
                      className="flex-1"
                    />
                    <Button
                      onClick={handleSendMessage}
                      size="icon"
                      disabled={isTyping || !inputMessage.trim()}
                      className="shrink-0"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
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
              <Card className="h-[600px] flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Utensils className="h-6 w-6 text-secondary" />
                    {t('aiTools.mealGenerator.title')}
                  </CardTitle>
                  <CardDescription>{t('aiTools.mealGenerator.description')}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col min-h-0 overflow-hidden">
                  <div className="space-y-4 mb-4">
                    <div className="space-y-2">
                      <Label htmlFor="condition">{t('aiTools.mealGenerator.condition')}</Label>
                      <Select value={selectedCondition} onValueChange={setSelectedCondition}>
                        <SelectTrigger id="condition">
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
                    <Button onClick={generateMealPlan} className="w-full" disabled={!selectedCondition || isGenerating}>
                      {isGenerating ? (
                        <>
                          <Loader2 className="h-4 w-4 me-2 animate-spin" />
                          {t('aiTools.mealGenerator.generating')}
                        </>
                      ) : (
                        t('aiTools.mealGenerator.generate')
                      )}
                    </Button>
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
                                <div className="prose prose-sm max-w-none dark:prose-invert text-foreground">
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
                                    {mealPlan.goal}
                                  </ReactMarkdown>
                                </div>
                              </div>
                            )}
                            {mealPlan.strategy && (
                              <div className="bg-secondary/10 p-3 rounded-md text-sm">
                                <span className="font-semibold block mb-1">{t('aiTools.protocol.strategy', 'Strategy')}:</span>
                                <div className="prose prose-sm max-w-none dark:prose-invert text-foreground">
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
                                    {mealPlan.strategy}
                                  </ReactMarkdown>
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        <div className={`p-4 bg-gradient-bg rounded-lg border border-border shadow-sm ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                          <h3 className={`font-semibold text-accent mb-2 flex items-center gap-2 ${language === 'ar' ? 'flex-row-reverse' : 'flex-row'}`}>
                            🌅 {t('aiTools.mealGenerator.breakfast')}
                          </h3>
                          <div className="text-sm text-foreground leading-relaxed">
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
                        <div className={`p-4 bg-gradient-bg rounded-lg border border-border shadow-sm ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                          <h3 className={`font-semibold text-primary mb-2 flex items-center gap-2 ${language === 'ar' ? 'flex-row-reverse' : 'flex-row'}`}>
                            ☀️ {t('aiTools.mealGenerator.lunch')}
                          </h3>
                          <div className="text-sm text-foreground leading-relaxed">
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
                        <div className={`p-4 bg-gradient-bg rounded-lg border border-border shadow-sm ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                          <h3 className={`font-semibold text-secondary mb-2 flex items-center gap-2 ${language === 'ar' ? 'flex-row-reverse' : 'flex-row'}`}>
                            🌙 {t('aiTools.mealGenerator.dinner')}
                          </h3>
                          <div className="text-sm text-foreground leading-relaxed">
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
                        <div className={`p-4 bg-gradient-bg rounded-lg border border-border shadow-sm ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                          <h3 className={`font-semibold text-accent mb-2 flex items-center gap-2 ${language === 'ar' ? 'flex-row-reverse' : 'flex-row'}`}>
                            🍎 {t('aiTools.mealGenerator.snacks')}
                          </h3>
                          <div className="text-sm text-foreground leading-relaxed">
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
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

                {/* 1. INPUT SECTION */}
                <div className="space-y-6">
                  <Card className="h-fit">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Scale className="h-6 w-6 text-accent" />
                        {t('aiTools.bmiMealGenerator.title')}
                      </CardTitle>
                      <CardDescription>{t('aiTools.bmiMealGenerator.description')}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* Age Input */}
                        <div className="space-y-2">
                          <Label htmlFor="age">
                            {ageUnit === 'years'
                              ? t('aiTools.bmiMealGenerator.age')
                              : t('aiTools.bmiMealGenerator.months')}
                          </Label>
                          <div className="flex gap-2">
                            <Input
                              id="age"
                              type="number"
                              placeholder={ageUnit === 'years' ? t('aiTools.bmiMealGenerator.age') : t('aiTools.bmiMealGenerator.months')}
                              value={age}
                              onChange={(e) => setAge(e.target.value)}
                              className="flex-1"
                            />
                            <Select value={ageUnit} onValueChange={(v: 'years' | 'months') => setAgeUnit(v)}>
                              <SelectTrigger className="w-[100px]">
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
                          <div className="space-y-2">
                            <Label htmlFor="muac">{t('aiTools.bmiMealGenerator.muac')}</Label>
                            <Input
                              id="muac"
                              type="number"
                              step="0.01"
                              placeholder="cm"
                              value={muac}
                              onChange={(e) => setMuac(e.target.value)}
                            />
                          </div>
                        )}
                        <div className="space-y-2">
                          <Label htmlFor="height">{t('aiTools.bmiMealGenerator.height')}</Label>
                          <Input
                            id="height"
                            type="number"
                            step="0.01"
                            placeholder="cm"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="weight">{t('aiTools.bmiMealGenerator.weight')}</Label>
                          <Input
                            id="weight"
                            type="number"
                            step="0.01"
                            placeholder="kg"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                          />
                        </div>


                        <Button
                          onClick={calculateClinicalPlan}
                          className="w-full"
                          disabled={!age || isBmiGenerating}
                        >
                          {isBmiGenerating ? (
                            <>
                              <Loader2 className="h-4 w-4 me-2 animate-spin" />
                              {t('common.loading')}
                            </>
                          ) : (
                            t('aiTools.bmiMealGenerator.calculate')
                          )}
                        </Button>

                        {/* Small Result Summary in Input Card */}
                        {clinicalPlan && (
                          <div className="p-4 rounded-lg bg-muted border border-border text-center animate-in fade-in zoom-in duration-300">
                            {bmiValue && <p className="text-sm text-muted-foreground">{t('aiTools.bmiMealGenerator.yourBmi')}</p>}
                            {bmiValue && <p className="text-3xl font-bold text-primary my-1">{bmiValue.toFixed(1)}</p>}
                            <p className="font-medium text-foreground">
                              {clinicalPlan.status}
                            </p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Reference Tables Section */}
                  <Card>
                    <Collapsible open={isOpenRefs} onOpenChange={setIsOpenRefs}>
                      <CardHeader className="py-4">
                        <CollapsibleTrigger asChild>
                          <Button variant="ghost" className="w-full flex justify-between p-0 h-auto font-semibold hover:bg-transparent">
                            <span className="flex items-center gap-2">
                              <BookOpen className="h-4 w-4 text-primary" />
                              {t('aiTools.bmiMealGenerator.references.title')}
                            </span>
                            {isOpenRefs ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                          </Button>
                        </CollapsibleTrigger>
                      </CardHeader>
                      <CollapsibleContent>
                        <CardContent className="text-xs text-muted-foreground space-y-4 pt-0">

                          <div>
                            <h4 className="font-bold text-foreground mb-1">{t('aiTools.bmiMealGenerator.references.who_growth.title')}</h4>
                            <p>{t('aiTools.bmiMealGenerator.references.who_growth.desc')}</p>
                            <a href="https://www.who.int/tools/child-growth-standards" target="_blank" rel="noreferrer" className="text-primary hover:underline">
                              {t('aiTools.bmiMealGenerator.references.who_growth.source')}
                            </a>
                          </div>
                          <div>
                            <h4 className="font-bold text-foreground mb-1">{t('aiTools.bmiMealGenerator.references.bmi_age.title')}</h4>
                            <p>{t('aiTools.bmiMealGenerator.references.bmi_age.desc')}</p>
                            <ul className="list-disc list-inside mt-1 space-y-0.5">
                              <li>{t('aiTools.bmiMealGenerator.references.bmi_age.p5')}</li>
                              <li>{t('aiTools.bmiMealGenerator.references.bmi_age.p5_85')}</li>
                              <li>{t('aiTools.bmiMealGenerator.references.bmi_age.p85_95')}</li>
                              <li>{t('aiTools.bmiMealGenerator.references.bmi_age.p95')}</li>
                            </ul>
                            <a href="https://www.who.int/tools/growth-reference-data-for-5to19-years" target="_blank" rel="noreferrer" className="text-primary hover:underline">
                              {t('aiTools.bmiMealGenerator.references.bmi_age.source')}
                            </a>
                          </div>
                          <div>
                            <h4 className="font-bold text-foreground mb-1">{t('aiTools.bmiMealGenerator.references.adult_bmi.title')}</h4>
                            <ul className="list-disc list-inside mt-1 space-y-0.5">
                              <li>{t('aiTools.bmiMealGenerator.references.adult_bmi.underw')}</li>
                              <li>{t('aiTools.bmiMealGenerator.references.adult_bmi.healthy')}</li>
                              <li>{t('aiTools.bmiMealGenerator.references.adult_bmi.overw')}</li>
                              <li>{t('aiTools.bmiMealGenerator.references.adult_bmi.obese')}</li>
                            </ul>
                            <p className="mt-1 italic">{t('aiTools.bmiMealGenerator.references.adult_bmi.note')}</p>
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
                        <div className="p-3 bg-gradient-bg rounded border border-border/50">
                          <h4 className="font-semibold text-accent mb-2 flex items-center gap-2 text-sm">
                            🌅 {t('aiTools.mealGenerator.breakfast')}
                          </h4>
                          <ul className="text-xs sm:text-sm text-muted-foreground list-disc list-inside space-y-1">
                            {clinicalPlan.mealPlan.breakfast.map((s, i) => <li key={i}>{s}</li>)}
                          </ul>
                        </div>
                        {clinicalPlan.mealPlan.lunch.length > 0 && (
                          <div className="p-3 bg-gradient-bg rounded border border-border/50">
                            <h4 className="font-semibold text-primary mb-2 flex items-center gap-2 text-sm">
                              ☀️ {t('aiTools.mealGenerator.lunch')}
                            </h4>
                            <ul className="text-xs sm:text-sm text-muted-foreground list-disc list-inside space-y-1">
                              {clinicalPlan.mealPlan.lunch.map((s, i) => <li key={i}>{s}</li>)}
                            </ul>
                          </div>
                        )}
                        {clinicalPlan.mealPlan.dinner.length > 0 && (
                          <div className="p-3 bg-gradient-bg rounded border border-border/50">
                            <h4 className="font-semibold text-secondary mb-2 flex items-center gap-2 text-sm">
                              🌙 {t('aiTools.mealGenerator.dinner')}
                            </h4>
                            <ul className="text-xs sm:text-sm text-muted-foreground list-disc list-inside space-y-1">
                              {clinicalPlan.mealPlan.dinner.map((s, i) => <li key={i}>{s}</li>)}
                            </ul>
                          </div>
                        )}
                        {((clinicalPlan.mealPlan.snacks1?.length ?? 0) > 0 || (clinicalPlan.mealPlan.snacks2?.length ?? 0) > 0) && (
                          <div className="p-3 bg-gradient-bg rounded border border-border/50">
                            <h4 className="font-semibold text-accent mb-2 flex items-center gap-2 text-sm">
                              🍎 {t('aiTools.mealGenerator.snacks')}
                            </h4>
                            <ul className="text-xs sm:text-sm text-muted-foreground list-disc list-inside space-y-1">
                              {clinicalPlan.mealPlan.snacks1?.map((s, i) => <li key={'s1' + i}>{s}</li>)}
                              {clinicalPlan.mealPlan.snacks2?.map((s, i) => <li key={'s2' + i}>{s}</li>)}
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* Prohibited Items */}
                      {clinicalPlan.prohibited && (
                        <div className="mt-4 p-3 bg-red-50/50 rounded border border-red-100">
                          <h4 className="font-semibold text-red-700 text-xs mb-2 flex items-center gap-2">
                            <Info className="h-3 w-3" />
                            {t('common.forbidden')}
                          </h4>
                          <p className="text-xs text-red-600">{clinicalPlan.prohibited.join(' • ')}</p>
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
