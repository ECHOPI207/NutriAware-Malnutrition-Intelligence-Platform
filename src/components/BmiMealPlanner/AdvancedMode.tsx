import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Zap, ChevronDown, ChevronUp } from 'lucide-react';
import type { AdvancedProtocol } from '@/lib/mealEngine';

interface AdvancedModeProps {
    protocols: AdvancedProtocol[];
    goal: string;
}

const AdvancedMode: React.FC<AdvancedModeProps> = ({ protocols, goal }) => {
    const { language } = useLanguage();
    const isRTL = language === 'ar';
    const lang = isRTL ? 'ar' : 'en';
    const [openId, setOpenId] = useState<string | null>(null);

    if (!protocols || protocols.length === 0) return null;

    // Filter protocols relevant to the goal
    const relevantProtocols = protocols.filter(p => {
        if (goal === 'lose') return ['refeed', 'muscle_preservation', 'fat_loss_cycling', 'metabolic_adaptation'].includes(p.id);
        if (goal === 'muscle' || goal === 'gain') return ['lean_bulk', 'muscle_preservation', 'refeed'].includes(p.id);
        return true; // Show all for maintain
    });

    if (relevantProtocols.length === 0) return null;

    const PROTOCOL_ICONS: Record<string, string> = {
        refeed: '🔄',
        muscle_preservation: '💪',
        fat_loss_cycling: '📉',
        metabolic_adaptation: '🔥',
        lean_bulk: '📈',
    };

    return (
        <div className="space-y-3" dir={isRTL ? 'rtl' : 'ltr'}>
            <div className={`${isRTL ? 'text-right' : 'text-left'}`}>
                <h3 className="text-base sm:text-lg font-bold text-foreground flex items-center gap-2">
                    <Zap className="w-5 h-5 text-amber-500" />
                    {isRTL ? 'الوضع المتقدم' : 'Advanced Mode'}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                    {isRTL ? 'بروتوكولات متقدمة مخصصة لهدفك' : 'Advanced protocols tailored to your goal'}
                </p>
            </div>

            <div className="space-y-2">
                {relevantProtocols.map((protocol) => (
                    <div key={protocol.id} className="rounded-xl border border-border/50 bg-card/50 overflow-hidden">
                        <button
                            onClick={() => setOpenId(openId === protocol.id ? null : protocol.id)}
                            className="w-full px-4 py-3 flex items-center justify-between text-start bg-muted/20 hover:bg-muted/40 transition-colors"
                            aria-expanded={openId === protocol.id}
                        >
                            <div>
                                <span className="font-bold text-sm text-foreground flex items-center gap-2">
                                    <span>{PROTOCOL_ICONS[protocol.id] || '⚡'}</span>
                                    {protocol.title[lang]}
                                </span>
                                <span className="block text-[10px] text-muted-foreground mt-0.5 ms-7">
                                    {protocol.description[lang]}
                                </span>
                            </div>
                            {openId === protocol.id ? <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0" /> : <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />}
                        </button>

                        {openId === protocol.id && (
                            <div className="p-4 border-t border-border/30">
                                <p className="text-xs sm:text-sm text-foreground leading-relaxed">
                                    {protocol.details[lang]}
                                </p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdvancedMode;
