import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Brain, ChevronDown, ChevronUp } from 'lucide-react';
import type { BehavioralSection } from '@/lib/mealEngine';

interface BehavioralTipsProps {
    tips: BehavioralSection[];
}

const BehavioralTips: React.FC<BehavioralTipsProps> = ({ tips }) => {
    const { language } = useLanguage();
    const isRTL = language === 'ar';
    const lang = isRTL ? 'ar' : 'en';
    const [openIdx, setOpenIdx] = useState<number | null>(null);

    if (!tips || tips.length === 0) return null;

    const SECTION_ICONS = ['🧠', '🍴', '⚖️', '📊'];

    return (
        <div className="space-y-3" dir={isRTL ? 'rtl' : 'ltr'}>
            <div className={`${isRTL ? 'text-right' : 'text-left'}`}>
                <h3 className="text-base sm:text-lg font-bold text-foreground flex items-center gap-2">
                    <Brain className="w-5 h-5 text-primary" />
                    {isRTL ? 'نصائح الاستدامة السلوكية' : 'Behavioral Sustainability'}
                </h3>
            </div>

            <div className="space-y-2">
                {tips.map((section, si) => (
                    <div key={si} className="rounded-xl border border-border/50 bg-card/50 overflow-hidden">
                        <button
                            onClick={() => setOpenIdx(openIdx === si ? null : si)}
                            className="w-full px-4 py-3 flex items-center justify-between text-start bg-muted/20 hover:bg-muted/40 transition-colors"
                            aria-expanded={openIdx === si}
                        >
                            <span className="font-bold text-sm text-foreground flex items-center gap-2">
                                <span>{SECTION_ICONS[si] || '💡'}</span>
                                {section.title[lang]}
                            </span>
                            {openIdx === si ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                        </button>

                        {openIdx === si && (
                            <div className="p-4">
                                <ul className="space-y-2">
                                    {section.tips.map((tip, ti) => (
                                        <li key={ti} className="flex items-start gap-2 text-xs sm:text-sm text-foreground leading-relaxed">
                                            <span className="shrink-0 mt-1 w-1.5 h-1.5 rounded-full bg-primary/60" />
                                            {tip[lang]}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BehavioralTips;
