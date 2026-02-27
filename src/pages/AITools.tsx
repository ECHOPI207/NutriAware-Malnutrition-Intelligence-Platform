
import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bot, Utensils, Send, Loader2, Scale, Info, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { sendChatMessage, CONDITION_MEAL_PLANS } from '@/services/gemini';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import BmiMealPlanner from '@/components/BmiMealPlanner';
import { SurveyCTA } from '@/components/common/SurveyCTA';
import { MealAnalyzer } from '@/components/MealAnalyzer/MealAnalyzer';
import { trackToolUse, trackMealPlan } from '@/services/activityTracker';

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
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'chatbot';

  const handleTabChange = (value: string) => {
    setSearchParams({ tab: value });
  };

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

      // Track chatbot usage
      trackToolUse('Nutri-Bot شات بوت', inputMessage.substring(0, 100));
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
        // Track meal plan generation
        trackMealPlan(selectedCondition);
      }
      setIsGenerating(false);
    }, 2000);
  };



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

        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-4 h-auto mb-10 gap-2 bg-card/30 backdrop-blur-md border border-white/10 p-1.5 rounded-2xl">
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
            <TabsTrigger
              value="meal-analyzer"
              className="gap-2 h-12 rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all duration-300 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-primary/10"
            >
              <Calculator className="h-5 w-5" />
              {t('aiTools.mealAnalyzer.title')}
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
                              {message.role === 'user' ? <div className="w-2 h-2 rounded-full bg-white" /> : <Bot className="h-4 w-4" />}
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

          <TabsContent value="meal-analyzer">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="p-6 border-0 shadow-2xl bg-card/95 backdrop-blur-xl ring-1 ring-border/20">
                <MealAnalyzer />
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="bmi-calculator">
            <BmiMealPlanner />
          </TabsContent>
        </Tabs>
      </div>
      <SurveyCTA />
    </div>
  );
};

export default AITools;

