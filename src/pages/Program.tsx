import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { PlayCircle, CheckCircle2, BookOpen, Clock, Activity, FileText } from 'lucide-react';
import { programWeeks, ProgramWeek } from '@/data/programData';

const STORAGE_KEY = 'nutriaware_program_progress';

const Program: React.FC = () => {
    const { i18n } = useTranslation();
    const isRTL = i18n.language === 'ar';

    // State: Progress tracked as a nested object: { week_1: { article_1: true, ... } }
    const [progress, setProgress] = useState<Record<string, Record<string, boolean>>>({});
    const [mounted, setMounted] = useState(false);

    // Load from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                setProgress(JSON.parse(saved));
            } catch (e) {
                console.error('Failed to parse progress', e);
            }
        }
        setMounted(true);
    }, []);

    // Save to localStorage when progress changes
    useEffect(() => {
        if (mounted) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
        }
    }, [progress, mounted]);

    const handleToggleItem = (weekIndex: number, itemId: string | number, checked: boolean) => {
        setProgress((prev) => {
            const weekKey = `week_${weekIndex}`;
            const currentWeekProgress = prev[weekKey] || {};
            return {
                ...prev,
                [weekKey]: {
                    ...currentWeekProgress,
                    [itemId.toString()]: checked,
                },
            };
        });
    };

    const isItemChecked = (weekIndex: number, itemId: string | number) => {
        return progress[`week_${weekIndex}`]?.[itemId.toString()] || false;
    };

    const calculateCompletion = () => {
        let totalItems = 0;
        let completedItems = 0;

        programWeeks.forEach((week) => {
            week.items.forEach((item) => {
                totalItems++;
                if (isItemChecked(week.week, item.id)) completedItems++;
            });
        });

        return {
            total: totalItems,
            completed: completedItems,
            percentage: totalItems === 0 ? 0 : Math.round((completedItems / totalItems) * 100),
        };
    };

    const findNextIncompleteWeekId = () => {
        for (const week of programWeeks) {
            const weekCompletedItems = week.items.filter((item) => isItemChecked(week.week, item.id)).length;
            if (weekCompletedItems < week.items.length) {
                return `week-${week.week}`;
            }
        }
        return null;
    };

    const handleContinue = () => {
        const id = findNextIncompleteWeekId();
        if (id) {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    };

    const stats = calculateCompletion();
    const allCompleted = stats.percentage === 100;

    const getIconForItem = (type: string) => {
        if (type === 'article') return <FileText className="h-4 w-4" />;
        if (type === 'story') return <BookOpen className="h-4 w-4" />;
        return <Activity className="h-4 w-4" />;
    };

    const getItemColor = (type: string) => {
        if (type === 'article') return 'text-blue-500 bg-blue-50 dark:bg-blue-900/20';
        if (type === 'story') return 'text-purple-500 bg-purple-50 dark:bg-purple-900/20';
        return 'text-amber-500 bg-amber-50 dark:bg-amber-900/20';
    };

    return (
        <div className={`min-h-screen py-12 ${isRTL ? 'rtl' : 'ltr'}`}>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-card rounded-2xl p-8 shadow-sm border mb-10 text-center relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

                    <div className="relative z-10">
                        <h1 className="text-4xl font-bold mb-4">
                            <span className="gradient-text">
                                {isRTL ? 'برنامج ال 6 أسابيع' : '6-Week Program'}
                            </span>
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                            {isRTL
                                ? 'خطة تعليمية خطوة بخطوة لبناء معرفة غذائية شاملة لك ولعائلتك'
                                : 'A step-by-step learning plan to build comprehensive nutrition knowledge for you and your family'}
                        </p>

                        {/* Progress Tracking */}
                        <div className="max-w-md mx-auto bg-background/50 backdrop-blur-sm p-4 rounded-xl border">
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-semibold text-sm">
                                    {isRTL ? 'نسبة الإنجاز' : 'Progress'}
                                </span>
                                <span className="font-bold text-primary">{stats.percentage}%</span>
                            </div>
                            <Progress value={stats.percentage} className="h-2.5 mb-2" />
                            <p className="text-xs text-muted-foreground text-center">
                                {isRTL
                                    ? `أكملت ${stats.completed} من ${stats.total} مهمة`
                                    : `Completed ${stats.completed} of ${stats.total} tasks`}
                            </p>
                        </div>

                        {!allCompleted && stats.completed > 0 && (
                            <Button onClick={handleContinue} className="mt-6 rounded-full px-8 shadow-md hover:shadow-lg transition-all">
                                <PlayCircle className={`h-5 w-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                                {isRTL ? 'استكمل من حيث توقفت' : 'Continue where you left off'}
                            </Button>
                        )}

                        {allCompleted && (
                            <div className="mt-6 inline-flex flex-col items-center">
                                <div className="h-12 w-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-2">
                                    <CheckCircle2 className="h-7 w-7" />
                                </div>
                                <p className="text-green-600 font-bold">
                                    {isRTL ? 'لقد أتممت البرنامج بنجاح!' : 'You have successfully completed the program!'}
                                </p>
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Timeline */}
                <div className="relative border-l-2 rtl:border-r-2 rtl:border-l-0 border-muted ml-4 rtl:mr-4 space-y-12 pb-12">
                    {programWeeks.map((week, index) => {
                        const weekCompletedItems = week.items.filter(item => isItemChecked(week.week, item.id)).length;
                        const isWeekComplete = weekCompletedItems === week.items.length;

                        return (
                            <motion.div
                                key={week.week}
                                id={`week-${week.week}`}
                                initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="relative pl-8 rtl:pr-8"
                            >
                                {/* Timeline Dot */}
                                <div className={`absolute top-6 -left-[11px] rtl:-right-[11px] h-5 w-5 rounded-full border-4 border-background flex items-center justify-center ${isWeekComplete ? 'bg-green-500' : weekCompletedItems > 0 ? 'bg-primary' : 'bg-muted-foreground/30'
                                    }`}>
                                    {isWeekComplete && <CheckCircle2 className="h-3 w-3 text-white absolute" />}
                                </div>

                                <Card className={`overflow-hidden transition-all duration-300 ${isWeekComplete ? 'border-green-200 dark:border-green-900/50 bg-green-50/10 dark:bg-green-950/10' : ''}`}>
                                    <CardHeader className="pb-4 border-b bg-muted/20">
                                        <div className="flex flex-wrap items-start justify-between gap-4">
                                            <div>
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h2 className="text-2xl font-bold text-foreground">
                                                        {isRTL ? `الأسبوع ${week.week}` : `Week ${week.week}`}
                                                    </h2>
                                                    {isWeekComplete && (
                                                        <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800">
                                                            {isRTL ? 'مكتمل' : 'Completed'}
                                                        </Badge>
                                                    )}
                                                </div>
                                                <p className="text-muted-foreground font-medium">
                                                    <span className="text-foreground/70">{isRTL ? 'الهدف:' : 'Goal:'}</span>{' '}
                                                    {isRTL ? week.goal_ar : week.goal_en}
                                                </p>
                                            </div>
                                            <Badge variant="secondary" className="whitespace-nowrap flex items-center gap-1.5 h-8">
                                                <Clock className="h-3.5 w-3.5" />
                                                {isRTL ? `حوالي ${week.estimated_minutes} دقيقة` : `~${week.estimated_minutes} mins`}
                                            </Badge>
                                        </div>
                                    </CardHeader>

                                    <CardContent className="p-0">
                                        <ul className="divide-y divide-border/50">
                                            {week.items.map((item) => {
                                                const checked = isItemChecked(week.week, item.id);
                                                return (
                                                    <li key={item.id} className={`p-4 sm:px-6 transition-colors hover:bg-muted/30 ${checked ? 'opacity-70' : ''}`}>
                                                        <div className="flex items-start sm:items-center gap-4">
                                                            <div className="flex items-center h-6">
                                                                <Checkbox
                                                                    id={`item-${week.week}-${item.id}`}
                                                                    checked={checked}
                                                                    onCheckedChange={(c) => handleToggleItem(week.week, item.id, c as boolean)}
                                                                    className="h-5 w-5 rounded-md"
                                                                />
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                                                    <label
                                                                        htmlFor={`item-${week.week}-${item.id}`}
                                                                        className={`text-base font-semibold cursor-pointer truncate block ${checked ? 'line-through text-muted-foreground' : 'text-foreground hover:text-primary transition-colors'}`}
                                                                    >
                                                                        <Link to={item.link} onClick={(e) => e.stopPropagation()} className="hover:underline">
                                                                            {isRTL ? item.title_ar : item.title_en}
                                                                        </Link>
                                                                    </label>
                                                                    <div className="flex items-center gap-2 flex-shrink-0">
                                                                        <Badge variant="outline" className={`font-normal border-0 ${getItemColor(item.type)}`}>
                                                                            <span className="flex items-center gap-1.5">
                                                                                {getIconForItem(item.type)}
                                                                                {isRTL
                                                                                    ? (item.type === 'article' ? 'مقال' : item.type === 'story' ? 'قصة' : 'أداة')
                                                                                    : (item.type === 'article' ? 'Article' : item.type === 'story' ? 'Story' : 'Tool')}
                                                                            </span>
                                                                        </Badge>
                                                                        {item.reading_time && (
                                                                            <span className="text-xs text-muted-foreground whitespace-nowrap">
                                                                                {item.reading_time} {isRTL ? 'د' : 'm'}
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Program;
