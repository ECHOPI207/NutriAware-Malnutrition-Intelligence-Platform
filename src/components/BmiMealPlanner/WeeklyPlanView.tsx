import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronDown, ChevronUp, Flame, Dumbbell, Wheat, Droplets } from 'lucide-react';
import type { DayPlan, MealOption } from '@/data/mealDatabase';

interface WeeklyPlanViewProps {
    days: DayPlan[];
    targetCalories: number;
}

const DAY_LABELS = {
    en: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    ar: ['الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت', 'الأحد'],
};

const MEAL_SLOTS = [
    { key: 'breakfast' as const, icon: '🌅', en: 'Breakfast', ar: 'الإفطار' },
    { key: 'snack1' as const, icon: '🍎', en: 'Snack 1', ar: 'سناك 1' },
    { key: 'lunch' as const, icon: '🍽️', en: 'Lunch', ar: 'الغداء' },
    { key: 'snack2' as const, icon: '🥤', en: 'Snack 2', ar: 'سناك 2' },
    { key: 'dinner' as const, icon: '🌙', en: 'Dinner', ar: 'العشاء' },
];

/**
 * A single meal option card with expandable macro details
 */
const MealOptionCard: React.FC<{ option: MealOption; index: number; isRTL: boolean }> = ({ option, index, isRTL }) => {
    const [expanded, setExpanded] = useState(false);
    const lang = isRTL ? 'ar' : 'en';

    return (
        <div className="border border-border/40 rounded-xl bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm overflow-hidden transition-all duration-200 hover:border-primary/30 hover:shadow-sm">
            <button
                onClick={() => setExpanded(!expanded)}
                className="w-full p-3 flex items-center justify-between gap-2 text-start"
                aria-expanded={expanded}
            >
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary text-[10px] font-bold shrink-0">
                            {index + 1}
                        </span>
                        <span className="font-medium text-xs sm:text-sm text-foreground truncate">
                            {option.label[lang]}
                        </span>
                    </div>
                    <div className="flex items-center gap-3 text-[10px] sm:text-xs text-muted-foreground ms-7">
                        <span className="flex items-center gap-0.5"><Flame className="w-3 h-3 text-orange-500" />{option.totalCalories}</span>
                        <span className="flex items-center gap-0.5"><Dumbbell className="w-3 h-3 text-blue-500" />{option.totalProtein}g</span>
                        <span className="flex items-center gap-0.5"><Wheat className="w-3 h-3 text-amber-500" />{option.totalCarbs}g</span>
                        <span className="flex items-center gap-0.5"><Droplets className="w-3 h-3 text-yellow-500" />{option.totalFat}g</span>
                    </div>
                </div>
                {expanded ? <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0" /> : <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />}
            </button>

            {expanded && (
                <div className="px-3 pb-3 border-t border-border/30">
                    <div className="mt-2 space-y-1.5">
                        {option.items.map((item, i) => (
                            <div key={i} className="flex items-center justify-between text-xs p-2 rounded-lg bg-muted/30">
                                <div>
                                    <span className="font-medium text-foreground">{item.name[lang]}</span>
                                    <span className="text-muted-foreground ms-2">({item.portion.label[lang]})</span>
                                </div>
                                <span className="text-muted-foreground font-mono text-[10px]">{item.calories} kcal</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

const WeeklyPlanView: React.FC<WeeklyPlanViewProps> = ({ days, targetCalories }) => {
    const { language } = useLanguage();
    const isRTL = language === 'ar';
    const [selectedDay, setSelectedDay] = useState(0);

    if (!days || days.length === 0) return null;

    const currentDay = days[selectedDay];
    const labels = DAY_LABELS[isRTL ? 'ar' : 'en'];

    return (
        <div className="space-y-4" dir={isRTL ? 'rtl' : 'ltr'}>
            {/* Section Header */}
            <div className={`${isRTL ? 'text-right' : 'text-left'}`}>
                <h3 className="text-base sm:text-lg font-bold text-foreground flex items-center gap-2">
                    📅 {isRTL ? 'خطة الوجبات الأسبوعية' : '7-Day Meal Plan'}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                    {isRTL
                        ? `${targetCalories} سعرة/يوم — اختر بديلاً واحداً من كل وجبة`
                        : `${targetCalories} kcal/day — Choose one alternative per meal`}
                </p>
            </div>

            {/* Day Selector */}
            <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide -mx-1 px-1">
                {labels.map((label, i) => (
                    <button
                        key={i}
                        onClick={() => setSelectedDay(i)}
                        className={`shrink-0 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 border ${selectedDay === i
                                ? 'bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20 scale-105'
                                : 'bg-card border-border/50 text-muted-foreground hover:bg-muted/50 hover:border-border'
                            }`}
                        aria-label={`${isRTL ? 'اليوم' : 'Day'} ${i + 1}`}
                        aria-pressed={selectedDay === i}
                    >
                        <span className="block">{label}</span>
                        <span className="block text-[9px] opacity-60 mt-0.5">
                            {isRTL ? `يوم ${i + 1}` : `Day ${i + 1}`}
                        </span>
                    </button>
                ))}
            </div>

            {/* Meal Slots */}
            <div className="space-y-4">
                {MEAL_SLOTS.map(slot => {
                    const options: MealOption[] = currentDay[slot.key] || [];
                    if (options.length === 0) return null;

                    return (
                        <div key={slot.key} className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
                            {/* Meal Header */}
                            <div className="px-4 py-2.5 bg-muted/30 border-b border-border/30">
                                <h4 className="font-bold text-sm flex items-center gap-2 text-foreground">
                                    <span className="text-base">{slot.icon}</span>
                                    {isRTL ? slot.ar : slot.en}
                                    <span className="ms-auto text-[10px] font-normal text-muted-foreground">
                                        {options.length} {isRTL ? 'بدائل' : 'options'}
                                    </span>
                                </h4>
                            </div>

                            {/* Options */}
                            <div className="p-3 space-y-2">
                                {options.map((opt, i) => (
                                    <MealOptionCard key={i} option={opt} index={i} isRTL={isRTL} />
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default WeeklyPlanView;
