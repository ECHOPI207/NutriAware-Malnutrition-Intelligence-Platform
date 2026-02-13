import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowLeftRight, ChevronDown, ChevronUp } from 'lucide-react';
import type { ExchangeGroup } from '@/data/mealDatabase';

interface FoodExchangeGuideProps {
    groups: ExchangeGroup[];
}

const FoodExchangeGuide: React.FC<FoodExchangeGuideProps> = ({ groups }) => {
    const { language } = useLanguage();
    const isRTL = language === 'ar';
    const lang = isRTL ? 'ar' : 'en';
    const [openGroup, setOpenGroup] = useState<number | null>(null);

    if (!groups || groups.length === 0) return null;

    return (
        <div className="space-y-3" dir={isRTL ? 'rtl' : 'ltr'}>
            <div className={`${isRTL ? 'text-right' : 'text-left'}`}>
                <h3 className="text-base sm:text-lg font-bold text-foreground flex items-center gap-2">
                    <ArrowLeftRight className="w-5 h-5 text-primary" />
                    {isRTL ? 'دليل البدائل الغذائية' : 'Food Exchange Guide'}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                    {isRTL ? 'استبدل أي عنصر بآخر مكافئ من نفس المجموعة' : 'Swap any item with an equivalent from the same group'}
                </p>
            </div>

            <div className="space-y-2">
                {groups.map((group, gi) => (
                    <div key={gi} className="rounded-xl border border-border/50 bg-card/50 overflow-hidden">
                        <button
                            onClick={() => setOpenGroup(openGroup === gi ? null : gi)}
                            className="w-full px-4 py-3 flex items-center justify-between text-start bg-muted/20 hover:bg-muted/40 transition-colors"
                            aria-expanded={openGroup === gi}
                        >
                            <div>
                                <span className="font-bold text-sm text-foreground">{group.groupName[lang]}</span>
                                <span className="block text-[10px] text-muted-foreground mt-0.5">{group.portionLabel[lang]}</span>
                            </div>
                            {openGroup === gi ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                        </button>

                        {openGroup === gi && (
                            <div className="p-3">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-xs">
                                        <thead>
                                            <tr className="border-b border-border/30">
                                                <th className={`p-2 font-semibold text-muted-foreground ${isRTL ? 'text-right' : 'text-left'}`}>{isRTL ? 'العنصر' : 'Item'}</th>
                                                <th className="p-2 font-semibold text-muted-foreground text-center">{isRTL ? 'الحصة' : 'Portion'}</th>
                                                <th className="p-2 font-semibold text-muted-foreground text-center">{isRTL ? 'سعرات' : 'Calories'}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {group.items.map((item, ii) => (
                                                <tr key={ii} className="border-b border-border/10 hover:bg-muted/20 transition-colors">
                                                    <td className={`p-2 font-medium text-foreground ${isRTL ? 'text-right' : 'text-left'}`}>{item.name[lang]}</td>
                                                    <td className="p-2 text-muted-foreground text-center font-mono text-[10px]">{item.portion}</td>
                                                    <td className="p-2 text-center">
                                                        <span className="inline-flex px-1.5 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-bold">{item.calories}</span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FoodExchangeGuide;
