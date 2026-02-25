import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, HelpCircle, Monitor, Calendar, Clipboard, Microscope, Shield } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { faqCategories, faqData, FAQCategory } from '@/data/faqData';
import { SurveyCTA } from '@/components/common/SurveyCTA';

const iconMap: Record<string, React.ReactNode> = {
    monitor: <Monitor className="w-5 h-5" />,
    calendar: <Calendar className="w-5 h-5" />,
    clipboard: <Clipboard className="w-5 h-5" />,
    microscope: <Microscope className="w-5 h-5" />,
    shield: <Shield className="w-5 h-5" />,
};

const FAQ: React.FC = () => {
    const { t, i18n } = useTranslation();
    const isRTL = i18n.language === 'ar';
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState<FAQCategory>('platform');

    const filteredFAQs = faqData.filter(faq => {
        const matchesSearch = faq.question_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.question_ar.includes(searchQuery) ||
            faq.answer_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer_ar.includes(searchQuery);
        const matchesCategory = faq.category === activeCategory;

        return searchQuery ? matchesSearch : matchesCategory;
    });

    return (
        <div className={`min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-12 lg:py-20 ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center justify-center p-4 mb-6 rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/20">
                        <HelpCircle className="w-10 h-10" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
                        <span className="bg-gradient-to-r from-primary via-blue-600 to-secondary bg-clip-text text-transparent">
                            {t('faq.title')}
                        </span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        {t('faq.subtitle')}
                    </p>
                </motion.div>

                {/* Search Bar */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="relative max-w-2xl mx-auto mb-16"
                >
                    <Search className={`absolute top-1/2 -translate-y-1/2 text-muted-foreground w-6 h-6 ${isRTL ? 'right-5' : 'left-5'}`} />
                    <Input
                        type="text"
                        placeholder={t('faq.searchPlaceholder')}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={`w-full h-16 rounded-full border-2 border-border/50 bg-background/80 backdrop-blur-md shadow-sm text-lg focus-visible:ring-primary/30 ${isRTL ? 'pr-14 pl-6' : 'pl-14 pr-6'}`}
                    />
                </motion.div>

                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

                    {/* Categories Sidebar */}
                    <div className="lg:w-1/3 shrink-0">
                        <div className="sticky top-28 bg-card/60 backdrop-blur-xl border border-white/10 p-3 rounded-3xl shadow-lg ring-1 ring-border/50">
                            <div className="flex lg:flex-col overflow-x-auto lg:overflow-visible gap-2 p-1 hide-scrollbar">
                                {faqCategories.map((cat, idx) => {
                                    const isActive = !searchQuery && activeCategory === cat.id;
                                    return (
                                        <motion.button
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.1 + idx * 0.05 }}
                                            key={cat.id}
                                            onClick={() => {
                                                setActiveCategory(cat.id as FAQCategory);
                                                setSearchQuery('');
                                            }}
                                            className={`flex items-center gap-4 px-5 py-4 rounded-2xl text-left rtl:text-right whitespace-nowrap transition-all duration-300 w-full ${isActive ? 'bg-primary text-primary-foreground shadow-md scale-[1.02]' : 'hover:bg-muted text-muted-foreground hover:text-foreground'}`}
                                        >
                                            <div className={`p-2 rounded-xl shrink-0 ${isActive ? 'bg-white/20 text-white' : 'bg-primary/10 text-primary'}`}>
                                                {iconMap[cat.icon]}
                                            </div>
                                            <span className="font-semibold text-base sm:text-lg">
                                                {isRTL ? cat.title_ar : cat.title_en}
                                            </span>
                                        </motion.button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* FAQ Items */}
                    <div className="lg:w-2/3 min-h-[400px]">
                        <AnimatePresence mode="popLayout">
                            {filteredFAQs.length > 0 ? (
                                <motion.div
                                    key={searchQuery ? 'search' : activeCategory}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.3 }}
                                    className="bg-card/60 backdrop-blur-xl border ring-1 ring-border/50 rounded-3xl p-6 md:p-8 shadow-xl"
                                >
                                    {searchQuery && (
                                        <h3 className="text-lg font-medium text-muted-foreground mb-6 pb-4 border-b">
                                            {isRTL ? `نتائج البحث عن "${searchQuery}"` : `Search results for "${searchQuery}"`}
                                        </h3>
                                    )}
                                    <Accordion type="single" collapsible className="w-full space-y-4">
                                        {filteredFAQs.map((faq) => (
                                            <AccordionItem key={faq.id} value={faq.id} className="border border-border/50 rounded-2xl px-2 sm:px-6 bg-background/50 hover:bg-background/80 transition-colors data-[state=open]:bg-white dark:data-[state=open]:bg-slate-900 data-[state=open]:shadow-md">
                                                <AccordionTrigger className="text-base sm:text-lg font-bold hover:no-underline py-5 text-left rtl:text-right leading-relaxed">
                                                    {isRTL ? faq.question_ar : faq.question_en}
                                                </AccordionTrigger>
                                                <AccordionContent className="text-base text-muted-foreground leading-relaxed pb-6 text-left rtl:text-right pt-2 border-t mt-2">
                                                    {isRTL ? faq.answer_ar : faq.answer_en}
                                                </AccordionContent>
                                            </AccordionItem>
                                        ))}
                                    </Accordion>
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex flex-col items-center justify-center p-12 text-center bg-card/60 backdrop-blur-xl border rounded-3xl shadow-sm h-full"
                                >
                                    <HelpCircle className="w-16 h-16 text-muted-foreground/30 mb-4" />
                                    <p className="text-lg text-muted-foreground font-medium">{t('faq.noResults')}</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                </div>
            </div>
            <div className="mt-24">
                <SurveyCTA />
            </div>
        </div>
    );
};

export default FAQ;
