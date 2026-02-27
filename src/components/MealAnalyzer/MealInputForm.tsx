import React, { useState } from 'react';
import { FoodItem, FOOD_DB } from '../../data/mealDatabase';
import { AgeGroup, AGE_GROUP_LABELS } from '../../data/rdaData';
import { Search, Trash2, ChevronDown } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card } from '../ui/card';
import { useTranslation } from 'react-i18next';

interface MealInputFormProps {
    onAnalyze: (items: { food: FoodItem; quantity: number }[], ageGroup: AgeGroup) => void;
}

export const MealInputForm: React.FC<MealInputFormProps> = ({ onAnalyze }) => {
    const { i18n } = useTranslation();
    const isAr = i18n.language === 'ar';

    const [selectedAge, setSelectedAge] = useState<AgeGroup>('4-6y');
    const [selectedItems, setSelectedItems] = useState<{ food: FoodItem; quantity: number }[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredFood = FOOD_DB.filter(item =>
        item.name.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.name.ar.includes(searchQuery)
    );

    const addItem = (food: FoodItem) => {
        setSelectedItems([...selectedItems, { food, quantity: food.portion.grams }]);
        setSearchQuery('');
    };

    const removeItem = (index: number) => {
        setSelectedItems(selectedItems.filter((_, i) => i !== index));
    };

    const updateQuantity = (index: number, quantity: number) => {
        const newItems = [...selectedItems];
        newItems[index].quantity = quantity;
        setSelectedItems(newItems);
    };

    return (
        <Card className={`p-6 space-y-6 ${isAr ? 'text-right' : 'text-left'}`} dir={isAr ? 'rtl' : 'ltr'}>
            <div className="flex flex-col md:flex-row gap-4 items-end">
                <div className="flex-1 space-y-2 w-full">
                    <label className="text-sm font-medium">{isAr ? 'الفئة العمرية' : 'Age Group'}</label>
                    <div className="relative">
                        <select
                            value={selectedAge}
                            onChange={(e) => setSelectedAge(e.target.value as AgeGroup)}
                            className="w-full h-10 px-3 py-2 bg-background border rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                            {(Object.keys(AGE_GROUP_LABELS) as AgeGroup[]).map(group => (
                                <option key={group} value={group}>
                                    {isAr ? AGE_GROUP_LABELS[group].ar : AGE_GROUP_LABELS[group].en}
                                </option>
                            ))}
                        </select>
                        <ChevronDown className={`absolute ${isAr ? 'left-3' : 'right-3'} top-3 w-4 h-4 opacity-50 pointer-events-none`} />
                    </div>
                </div>

                <div className="flex-[2] space-y-2 w-full relative">
                    <label className="text-sm font-medium">{isAr ? 'إضافة صنف طعام' : 'Add Food Item'}</label>
                    <div className="relative">
                        <Input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={isAr ? 'ابحث عن طعام...' : 'Search food...'}
                            className={isAr ? 'pr-10' : 'pl-10'}
                        />
                        <Search className={`absolute ${isAr ? 'right-3' : 'left-3'} top-3 w-4 h-4 opacity-50`} />
                    </div>
                    {searchQuery && (
                        <div className="absolute z-50 w-full mt-1 bg-background border rounded-md shadow-lg max-h-60 overflow-auto">
                            {filteredFood.map(food => (
                                <button
                                    key={food.id}
                                    onClick={() => addItem(food)}
                                    className={`w-full px-4 py-2 ${isAr ? 'text-right' : 'text-left'} hover:bg-muted flex justify-between items-center text-sm`}
                                >
                                    <span>{isAr ? food.name.ar : food.name.en}</span>
                                    <span className="text-xs opacity-50">{food.portion.grams}g</span>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="space-y-3">
                <label className="text-sm font-medium">{isAr ? 'الأصناف المختارة' : 'Selected Items'}</label>
                {selectedItems.length === 0 ? (
                    <div className="text-center py-8 border-2 border-dashed rounded-lg opacity-50 text-sm">
                        {isAr ? 'لا توجد أصناف مضافة بعد' : 'No items added yet'}
                    </div>
                ) : (
                    <div className="space-y-2">
                        {selectedItems.map((item, index) => (
                            <div key={index} className="flex items-center gap-3 bg-muted/30 p-3 rounded-lg">
                                <span className="flex-1 text-sm font-medium">
                                    {isAr ? item.food.name.ar : item.food.name.en}
                                </span>
                                <div className="flex items-center gap-2">
                                    <Input
                                        type="number"
                                        value={item.quantity}
                                        onChange={(e) => updateQuantity(index, Number(e.target.value))}
                                        className="w-20 h-8"
                                    />
                                    <span className="text-xs opacity-50">{isAr ? 'جم' : 'g'}</span>
                                </div>
                                <Button size="icon" variant="ghost" onClick={() => removeItem(index)} className="h-8 w-8 text-destructive">
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <Button
                onClick={() => onAnalyze(selectedItems, selectedAge)}
                className="w-full"
                disabled={selectedItems.length === 0}
            >
                {isAr ? 'تحليل الوجبة' : 'Analyze Meal'}
            </Button>
        </Card>
    );
};
