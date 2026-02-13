import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ShoppingCart } from 'lucide-react';
import type { GroceryCategory } from '@/data/mealDatabase';

interface GroceryListProps {
    categories: GroceryCategory[];
}

const CATEGORY_ICONS: Record<string, string> = {
    Proteins: '🥩', 'البروتينات': '🥩',
    Dairy: '🥛', 'الألبان': '🥛',
    Carbohydrates: '🍞', 'الكربوهيدرات': '🍞',
    Vegetables: '🥬', 'الخضروات': '🥬',
    Fruits: '🍇', 'الفواكه': '🍇',
    'Healthy Fats': '🥑', 'الدهون الصحية': '🥑',
    'Prepared Meals': '🍲', 'وجبات محضرة': '🍲',
};

const GroceryList: React.FC<GroceryListProps> = ({ categories }) => {
    const { language } = useLanguage();
    const isRTL = language === 'ar';
    const lang = isRTL ? 'ar' : 'en';

    if (!categories || categories.length === 0) return null;

    return (
        <div className="space-y-3" dir={isRTL ? 'rtl' : 'ltr'}>
            <div className={`${isRTL ? 'text-right' : 'text-left'}`}>
                <h3 className="text-base sm:text-lg font-bold text-foreground flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5 text-primary" />
                    {isRTL ? 'قائمة المشتريات الأسبوعية' : 'Weekly Grocery List'}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                    {isRTL ? 'بناءً على الخيار الأول من كل وجبة' : 'Based on the first option of each meal'}
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {categories.map((cat, ci) => {
                    const icon = CATEGORY_ICONS[cat.category[lang]] || CATEGORY_ICONS[cat.category.en] || '📋';
                    return (
                        <div key={ci} className="p-3 rounded-xl border border-border/50 bg-card/50">
                            <h4 className="font-bold text-xs text-foreground mb-2 flex items-center gap-1.5">
                                <span>{icon}</span> {cat.category[lang]}
                            </h4>
                            <ul className="space-y-1">
                                {cat.items.map((item, ii) => (
                                    <li key={ii} className="flex items-center justify-between text-xs py-1 border-b border-border/10 last:border-0">
                                        <span className="text-foreground">{item.name[lang]}</span>
                                        <span className="text-muted-foreground font-mono text-[10px] shrink-0 ms-2">{item.quantity}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default GroceryList;
