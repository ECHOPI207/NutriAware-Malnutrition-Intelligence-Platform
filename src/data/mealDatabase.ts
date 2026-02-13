// ─── Food Item Database for 7-Day Meal System ───
// Each item: bilingual name, macros per portion, tags for filtering

export interface FoodItem {
    id: string;
    name: { en: string; ar: string };
    portion: { grams: number; label: { en: string; ar: string } };
    calories: number;
    protein: number;  // grams
    carbs: number;    // grams
    fat: number;      // grams
    fiber: number;    // grams
    category: 'protein' | 'carb' | 'vegetable' | 'fruit' | 'dairy' | 'fat' | 'mixed';
    mealSlot: ('breakfast' | 'lunch' | 'dinner' | 'snack')[];
    cultural: 'middle_eastern' | 'international' | 'both';
    budget: 'low' | 'moderate' | 'high';
    prepTime: 'quick' | 'moderate' | 'long';
    allergens: string[];  // gluten, dairy, eggs, nuts, fish, soy, shellfish
    minAgeMonths: number; // 0 = all ages, 6, 12, 24, etc.
    cookingMethod?: string;
    spiceProfile?: 'mild' | 'moderate' | 'bold';
}

export interface MealOption {
    items: FoodItem[];
    totalCalories: number;
    totalProtein: number;
    totalCarbs: number;
    totalFat: number;
    label: { en: string; ar: string };
}

export interface DayPlan {
    dayNumber: number;
    breakfast: MealOption[];
    snack1: MealOption[];
    lunch: MealOption[];
    snack2: MealOption[];
    dinner: MealOption[];
}

export interface WeeklyPlan {
    days: DayPlan[];
    totalWeeklyCalories: number;
    groceryList: GroceryCategory[];
    exchangeGuide: ExchangeGroup[];
}

export interface GroceryCategory {
    category: { en: string; ar: string };
    items: { name: { en: string; ar: string }; quantity: string; budgetAlt?: { en: string; ar: string } }[];
}

export interface ExchangeGroup {
    groupName: { en: string; ar: string };
    portionLabel: { en: string; ar: string };
    items: { name: { en: string; ar: string }; portion: string; calories: number }[];
}

// ─── FOOD DATABASE ───

export const FOOD_DB: FoodItem[] = [
    // ═══ PROTEINS ═══
    { id: 'p1', name: { en: 'Grilled Chicken Breast', ar: 'صدر دجاج مشوي' }, portion: { grams: 150, label: { en: '1 breast', ar: 'صدر واحد' } }, calories: 230, protein: 43, carbs: 0, fat: 5, fiber: 0, category: 'protein', mealSlot: ['lunch', 'dinner'], cultural: 'both', budget: 'moderate', prepTime: 'moderate', allergens: [], minAgeMonths: 12, cookingMethod: 'grilled', spiceProfile: 'moderate' },
    { id: 'p2', name: { en: 'Boiled Eggs', ar: 'بيض مسلوق' }, portion: { grams: 100, label: { en: '2 eggs', ar: 'بيضتين' } }, calories: 155, protein: 13, carbs: 1, fat: 11, fiber: 0, category: 'protein', mealSlot: ['breakfast', 'snack', 'dinner'], cultural: 'both', budget: 'low', prepTime: 'quick', allergens: ['eggs'], minAgeMonths: 12, cookingMethod: 'boiled', spiceProfile: 'mild' },
    { id: 'p3', name: { en: 'Grilled Fish Fillet', ar: 'فيليه سمك مشوي' }, portion: { grams: 150, label: { en: '1 fillet', ar: 'فيليه واحد' } }, calories: 200, protein: 40, carbs: 0, fat: 4, fiber: 0, category: 'protein', mealSlot: ['lunch', 'dinner'], cultural: 'both', budget: 'moderate', prepTime: 'moderate', allergens: ['fish'], minAgeMonths: 12, cookingMethod: 'grilled', spiceProfile: 'mild' },
    { id: 'p4', name: { en: 'Lean Ground Beef', ar: 'لحم بقري مفروم' }, portion: { grams: 100, label: { en: '100g', ar: '100 جم' } }, calories: 176, protein: 26, carbs: 0, fat: 8, fiber: 0, category: 'protein', mealSlot: ['lunch', 'dinner'], cultural: 'both', budget: 'moderate', prepTime: 'moderate', allergens: [], minAgeMonths: 12, cookingMethod: 'pan-cooked', spiceProfile: 'moderate' },
    { id: 'p5', name: { en: 'Foul Medames', ar: 'فول مدمس' }, portion: { grams: 200, label: { en: '1 bowl', ar: 'طبق' } }, calories: 220, protein: 14, carbs: 32, fat: 4, fiber: 9, category: 'protein', mealSlot: ['breakfast'], cultural: 'middle_eastern', budget: 'low', prepTime: 'quick', allergens: [], minAgeMonths: 24, cookingMethod: 'stewed', spiceProfile: 'mild' },
    { id: 'p6', name: { en: 'Grilled Kofta', ar: 'كفتة مشوية' }, portion: { grams: 100, label: { en: '3 pieces', ar: '3 قطع' } }, calories: 215, protein: 22, carbs: 3, fat: 13, fiber: 0, category: 'protein', mealSlot: ['lunch', 'dinner'], cultural: 'middle_eastern', budget: 'moderate', prepTime: 'moderate', allergens: [], minAgeMonths: 24, cookingMethod: 'grilled', spiceProfile: 'bold' },
    { id: 'p7', name: { en: 'Lentil Soup', ar: 'شوربة عدس' }, portion: { grams: 250, label: { en: '1 bowl', ar: 'طبق' } }, calories: 180, protein: 12, carbs: 28, fat: 3, fiber: 8, category: 'protein', mealSlot: ['lunch', 'dinner'], cultural: 'middle_eastern', budget: 'low', prepTime: 'moderate', allergens: [], minAgeMonths: 12, cookingMethod: 'boiled', spiceProfile: 'mild' },
    { id: 'p8', name: { en: 'Greek Yogurt', ar: 'زبادي يوناني' }, portion: { grams: 150, label: { en: '1 cup', ar: 'كوب' } }, calories: 130, protein: 15, carbs: 8, fat: 4, fiber: 0, category: 'dairy', mealSlot: ['breakfast', 'snack'], cultural: 'both', budget: 'moderate', prepTime: 'quick', allergens: ['dairy'], minAgeMonths: 12, spiceProfile: 'mild' },
    { id: 'p9', name: { en: 'Cottage Cheese', ar: 'جبنة قريش' }, portion: { grams: 100, label: { en: '½ cup', ar: 'نصف كوب' } }, calories: 98, protein: 11, carbs: 3, fat: 4, fiber: 0, category: 'dairy', mealSlot: ['breakfast', 'snack', 'dinner'], cultural: 'both', budget: 'low', prepTime: 'quick', allergens: ['dairy'], minAgeMonths: 12, spiceProfile: 'mild' },
    { id: 'p10', name: { en: 'Canned Tuna (in water)', ar: 'تونة معلبة (بالماء)' }, portion: { grams: 100, label: { en: '1 can', ar: 'علبة' } }, calories: 116, protein: 26, carbs: 0, fat: 1, fiber: 0, category: 'protein', mealSlot: ['lunch', 'dinner'], cultural: 'both', budget: 'low', prepTime: 'quick', allergens: ['fish'], minAgeMonths: 24, spiceProfile: 'mild' },
    { id: 'p11', name: { en: 'White Cheese (Feta-style)', ar: 'جبنة بيضاء' }, portion: { grams: 60, label: { en: '2 slices', ar: 'شريحتين' } }, calories: 150, protein: 9, carbs: 2, fat: 12, fiber: 0, category: 'dairy', mealSlot: ['breakfast'], cultural: 'middle_eastern', budget: 'low', prepTime: 'quick', allergens: ['dairy'], minAgeMonths: 12, spiceProfile: 'mild' },
    { id: 'p12', name: { en: 'Chickpea Salad', ar: 'سلطة حمص' }, portion: { grams: 150, label: { en: '1 cup', ar: 'كوب' } }, calories: 190, protein: 10, carbs: 27, fat: 5, fiber: 7, category: 'protein', mealSlot: ['lunch', 'snack'], cultural: 'middle_eastern', budget: 'low', prepTime: 'quick', allergens: [], minAgeMonths: 24, spiceProfile: 'moderate' },
    { id: 'p13', name: { en: 'Grilled Turkey Breast', ar: 'صدر ديك رومي مشوي' }, portion: { grams: 120, label: { en: '120g', ar: '120 جم' } }, calories: 160, protein: 34, carbs: 0, fat: 2, fiber: 0, category: 'protein', mealSlot: ['lunch', 'dinner'], cultural: 'both', budget: 'high', prepTime: 'moderate', allergens: [], minAgeMonths: 12, cookingMethod: 'grilled', spiceProfile: 'mild' },
    { id: 'p14', name: { en: 'Scrambled Eggs', ar: 'بيض مخفوق' }, portion: { grams: 120, label: { en: '2 eggs', ar: 'بيضتين' } }, calories: 180, protein: 12, carbs: 2, fat: 14, fiber: 0, category: 'protein', mealSlot: ['breakfast'], cultural: 'both', budget: 'low', prepTime: 'quick', allergens: ['eggs'], minAgeMonths: 12, cookingMethod: 'pan-cooked', spiceProfile: 'mild' },
    { id: 'p15', name: { en: 'Baked Salmon', ar: 'سلمون مخبوز' }, portion: { grams: 150, label: { en: '1 fillet', ar: 'فيليه' } }, calories: 280, protein: 36, carbs: 0, fat: 14, fiber: 0, category: 'protein', mealSlot: ['lunch', 'dinner'], cultural: 'international', budget: 'high', prepTime: 'moderate', allergens: ['fish'], minAgeMonths: 12, cookingMethod: 'baked', spiceProfile: 'mild' },

    // ═══ CARBS ═══
    { id: 'c1', name: { en: 'Brown Rice', ar: 'أرز بني' }, portion: { grams: 150, label: { en: '¾ cup cooked', ar: '¾ كوب مطبوخ' } }, calories: 165, protein: 4, carbs: 35, fat: 1, fiber: 2, category: 'carb', mealSlot: ['lunch', 'dinner'], cultural: 'both', budget: 'low', prepTime: 'moderate', allergens: [], minAgeMonths: 12, spiceProfile: 'mild' },
    { id: 'c2', name: { en: 'White Rice', ar: 'أرز أبيض' }, portion: { grams: 150, label: { en: '¾ cup cooked', ar: '¾ كوب مطبوخ' } }, calories: 195, protein: 4, carbs: 43, fat: 0, fiber: 0.5, category: 'carb', mealSlot: ['lunch', 'dinner'], cultural: 'both', budget: 'low', prepTime: 'moderate', allergens: [], minAgeMonths: 12, spiceProfile: 'mild' },
    { id: 'c3', name: { en: 'Whole Wheat Bread', ar: 'خبز أسمر' }, portion: { grams: 50, label: { en: '1 slice', ar: 'شريحة' } }, calories: 120, protein: 5, carbs: 22, fat: 2, fiber: 3, category: 'carb', mealSlot: ['breakfast', 'lunch', 'dinner'], cultural: 'both', budget: 'low', prepTime: 'quick', allergens: ['gluten'], minAgeMonths: 12, spiceProfile: 'mild' },
    { id: 'c4', name: { en: 'Egyptian Baladi Bread', ar: 'عيش بلدي' }, portion: { grams: 80, label: { en: '1 loaf', ar: 'رغيف' } }, calories: 210, protein: 7, carbs: 42, fat: 2, fiber: 3, category: 'carb', mealSlot: ['breakfast', 'lunch', 'dinner'], cultural: 'middle_eastern', budget: 'low', prepTime: 'quick', allergens: ['gluten'], minAgeMonths: 12, spiceProfile: 'mild' },
    { id: 'c5', name: { en: 'Oatmeal', ar: 'شوفان' }, portion: { grams: 40, label: { en: '½ cup dry', ar: 'نصف كوب جاف' } }, calories: 150, protein: 5, carbs: 27, fat: 3, fiber: 4, category: 'carb', mealSlot: ['breakfast'], cultural: 'both', budget: 'low', prepTime: 'quick', allergens: ['gluten'], minAgeMonths: 12, spiceProfile: 'mild' },
    { id: 'c6', name: { en: 'Whole Wheat Pasta', ar: 'مكرونة قمح كامل' }, portion: { grams: 150, label: { en: '1 cup cooked', ar: 'كوب مطبوخ' } }, calories: 174, protein: 7, carbs: 37, fat: 1, fiber: 6, category: 'carb', mealSlot: ['lunch', 'dinner'], cultural: 'both', budget: 'low', prepTime: 'moderate', allergens: ['gluten'], minAgeMonths: 12, spiceProfile: 'mild' },
    { id: 'c7', name: { en: 'Sweet Potato', ar: 'بطاطا حلوة' }, portion: { grams: 150, label: { en: '1 medium', ar: 'واحدة متوسطة' } }, calories: 130, protein: 2, carbs: 30, fat: 0, fiber: 4, category: 'carb', mealSlot: ['lunch', 'dinner', 'snack'], cultural: 'both', budget: 'low', prepTime: 'moderate', allergens: [], minAgeMonths: 12, spiceProfile: 'mild' },
    { id: 'c8', name: { en: 'Boiled Potato', ar: 'بطاطس مسلوقة' }, portion: { grams: 150, label: { en: '1 medium', ar: 'واحدة متوسطة' } }, calories: 130, protein: 3, carbs: 30, fat: 0, fiber: 2, category: 'carb', mealSlot: ['lunch', 'dinner'], cultural: 'both', budget: 'low', prepTime: 'moderate', allergens: [], minAgeMonths: 12, spiceProfile: 'mild' },
    { id: 'c9', name: { en: 'Freekeh', ar: 'فريكة' }, portion: { grams: 150, label: { en: '¾ cup cooked', ar: '¾ كوب مطبوخ' } }, calories: 160, protein: 6, carbs: 32, fat: 1, fiber: 5, category: 'carb', mealSlot: ['lunch', 'dinner'], cultural: 'middle_eastern', budget: 'moderate', prepTime: 'moderate', allergens: ['gluten'], minAgeMonths: 24, spiceProfile: 'mild' },
    { id: 'c10', name: { en: 'Quinoa', ar: 'كينوا' }, portion: { grams: 150, label: { en: '¾ cup cooked', ar: '¾ كوب مطبوخ' } }, calories: 180, protein: 7, carbs: 32, fat: 3, fiber: 3, category: 'carb', mealSlot: ['lunch', 'dinner'], cultural: 'international', budget: 'high', prepTime: 'moderate', allergens: [], minAgeMonths: 12, spiceProfile: 'mild' },

    // ═══ VEGETABLES ═══
    { id: 'v1', name: { en: 'Mixed Green Salad', ar: 'سلطة خضراء مشكلة' }, portion: { grams: 150, label: { en: '1 bowl', ar: 'طبق' } }, calories: 30, protein: 2, carbs: 5, fat: 0, fiber: 3, category: 'vegetable', mealSlot: ['lunch', 'dinner'], cultural: 'both', budget: 'low', prepTime: 'quick', allergens: [], minAgeMonths: 12, spiceProfile: 'mild' },
    { id: 'v2', name: { en: 'Steamed Broccoli', ar: 'بروكلي مطهو بالبخار' }, portion: { grams: 100, label: { en: '1 cup', ar: 'كوب' } }, calories: 35, protein: 3, carbs: 6, fat: 0, fiber: 3, category: 'vegetable', mealSlot: ['lunch', 'dinner'], cultural: 'both', budget: 'moderate', prepTime: 'quick', allergens: [], minAgeMonths: 12, spiceProfile: 'mild' },
    { id: 'v3', name: { en: 'Cucumber & Tomato Salad', ar: 'سلطة خيار وطماطم' }, portion: { grams: 150, label: { en: '1 bowl', ar: 'طبق' } }, calories: 35, protein: 1, carbs: 7, fat: 0, fiber: 2, category: 'vegetable', mealSlot: ['lunch', 'dinner', 'breakfast'], cultural: 'middle_eastern', budget: 'low', prepTime: 'quick', allergens: [], minAgeMonths: 12, spiceProfile: 'mild' },
    { id: 'v4', name: { en: 'Sautéed Spinach', ar: 'سبانخ سوتيه' }, portion: { grams: 100, label: { en: '1 cup', ar: 'كوب' } }, calories: 40, protein: 3, carbs: 4, fat: 2, fiber: 3, category: 'vegetable', mealSlot: ['lunch', 'dinner'], cultural: 'both', budget: 'low', prepTime: 'quick', allergens: [], minAgeMonths: 12, spiceProfile: 'mild' },
    { id: 'v5', name: { en: 'Grilled Zucchini', ar: 'كوسة مشوية' }, portion: { grams: 100, label: { en: '1 cup sliced', ar: 'كوب شرائح' } }, calories: 30, protein: 1, carbs: 5, fat: 1, fiber: 2, category: 'vegetable', mealSlot: ['lunch', 'dinner'], cultural: 'both', budget: 'low', prepTime: 'quick', allergens: [], minAgeMonths: 12, cookingMethod: 'grilled', spiceProfile: 'mild' },
    { id: 'v6', name: { en: 'Okra Stew', ar: 'بامية' }, portion: { grams: 150, label: { en: '1 cup', ar: 'كوب' } }, calories: 80, protein: 3, carbs: 12, fat: 2, fiber: 4, category: 'vegetable', mealSlot: ['lunch', 'dinner'], cultural: 'middle_eastern', budget: 'low', prepTime: 'long', allergens: [], minAgeMonths: 24, cookingMethod: 'stewed', spiceProfile: 'moderate' },
    { id: 'v7', name: { en: 'Stuffed Grape Leaves', ar: 'ورق عنب' }, portion: { grams: 120, label: { en: '6 pieces', ar: '6 قطع' } }, calories: 150, protein: 3, carbs: 22, fat: 5, fiber: 3, category: 'vegetable', mealSlot: ['lunch'], cultural: 'middle_eastern', budget: 'moderate', prepTime: 'long', allergens: [], minAgeMonths: 36, cookingMethod: 'stewed', spiceProfile: 'mild' },
    { id: 'v8', name: { en: 'Roasted Cauliflower', ar: 'قرنبيط محمص' }, portion: { grams: 100, label: { en: '1 cup', ar: 'كوب' } }, calories: 50, protein: 2, carbs: 7, fat: 2, fiber: 3, category: 'vegetable', mealSlot: ['lunch', 'dinner'], cultural: 'both', budget: 'low', prepTime: 'moderate', allergens: [], minAgeMonths: 12, cookingMethod: 'baked', spiceProfile: 'moderate' },

    // ═══ FRUITS ═══
    { id: 'f1', name: { en: 'Banana', ar: 'موزة' }, portion: { grams: 120, label: { en: '1 medium', ar: 'واحدة متوسطة' } }, calories: 105, protein: 1, carbs: 27, fat: 0, fiber: 3, category: 'fruit', mealSlot: ['breakfast', 'snack'], cultural: 'both', budget: 'low', prepTime: 'quick', allergens: [], minAgeMonths: 6, spiceProfile: 'mild' },
    { id: 'f2', name: { en: 'Apple', ar: 'تفاحة' }, portion: { grams: 150, label: { en: '1 medium', ar: 'واحدة متوسطة' } }, calories: 80, protein: 0, carbs: 21, fat: 0, fiber: 4, category: 'fruit', mealSlot: ['snack'], cultural: 'both', budget: 'low', prepTime: 'quick', allergens: [], minAgeMonths: 6, spiceProfile: 'mild' },
    { id: 'f3', name: { en: 'Orange', ar: 'برتقالة' }, portion: { grams: 150, label: { en: '1 medium', ar: 'واحدة متوسطة' } }, calories: 70, protein: 1, carbs: 18, fat: 0, fiber: 3, category: 'fruit', mealSlot: ['snack'], cultural: 'both', budget: 'low', prepTime: 'quick', allergens: [], minAgeMonths: 12, spiceProfile: 'mild' },
    { id: 'f4', name: { en: 'Dates', ar: 'تمر' }, portion: { grams: 30, label: { en: '3 pieces', ar: '3 تمرات' } }, calories: 85, protein: 1, carbs: 22, fat: 0, fiber: 2, category: 'fruit', mealSlot: ['snack', 'breakfast'], cultural: 'middle_eastern', budget: 'low', prepTime: 'quick', allergens: [], minAgeMonths: 12, spiceProfile: 'mild' },
    { id: 'f5', name: { en: 'Watermelon', ar: 'بطيخ' }, portion: { grams: 200, label: { en: '1 slice', ar: 'شريحة' } }, calories: 60, protein: 1, carbs: 15, fat: 0, fiber: 0.5, category: 'fruit', mealSlot: ['snack'], cultural: 'both', budget: 'low', prepTime: 'quick', allergens: [], minAgeMonths: 12, spiceProfile: 'mild' },
    { id: 'f6', name: { en: 'Mixed Berries', ar: 'توت مشكل' }, portion: { grams: 100, label: { en: '¾ cup', ar: '¾ كوب' } }, calories: 55, protein: 1, carbs: 13, fat: 0, fiber: 4, category: 'fruit', mealSlot: ['breakfast', 'snack'], cultural: 'international', budget: 'high', prepTime: 'quick', allergens: [], minAgeMonths: 12, spiceProfile: 'mild' },
    { id: 'f7', name: { en: 'Guava', ar: 'جوافة' }, portion: { grams: 150, label: { en: '1 medium', ar: 'واحدة متوسطة' } }, calories: 100, protein: 4, carbs: 24, fat: 1, fiber: 9, category: 'fruit', mealSlot: ['snack'], cultural: 'middle_eastern', budget: 'low', prepTime: 'quick', allergens: [], minAgeMonths: 12, spiceProfile: 'mild' },

    // ═══ HEALTHY FATS ═══
    { id: 'fat1', name: { en: 'Almonds', ar: 'لوز' }, portion: { grams: 28, label: { en: '¼ cup', ar: 'ربع كوب' } }, calories: 164, protein: 6, carbs: 6, fat: 14, fiber: 3.5, category: 'fat', mealSlot: ['snack'], cultural: 'both', budget: 'moderate', prepTime: 'quick', allergens: ['nuts'], minAgeMonths: 48, spiceProfile: 'mild' },
    { id: 'fat2', name: { en: 'Walnuts', ar: 'جوز' }, portion: { grams: 28, label: { en: '¼ cup', ar: 'ربع كوب' } }, calories: 185, protein: 4, carbs: 4, fat: 18, fiber: 2, category: 'fat', mealSlot: ['snack', 'breakfast'], cultural: 'both', budget: 'moderate', prepTime: 'quick', allergens: ['nuts'], minAgeMonths: 48, spiceProfile: 'mild' },
    { id: 'fat3', name: { en: 'Avocado', ar: 'أفوكادو' }, portion: { grams: 75, label: { en: '½ medium', ar: 'نصف واحدة' } }, calories: 120, protein: 1, carbs: 6, fat: 11, fiber: 5, category: 'fat', mealSlot: ['breakfast', 'lunch'], cultural: 'international', budget: 'high', prepTime: 'quick', allergens: [], minAgeMonths: 12, spiceProfile: 'mild' },
    { id: 'fat4', name: { en: 'Olive Oil', ar: 'زيت زيتون' }, portion: { grams: 14, label: { en: '1 tbsp', ar: 'ملعقة كبيرة' } }, calories: 120, protein: 0, carbs: 0, fat: 14, fiber: 0, category: 'fat', mealSlot: ['breakfast', 'lunch', 'dinner'], cultural: 'both', budget: 'moderate', prepTime: 'quick', allergens: [], minAgeMonths: 12, spiceProfile: 'mild' },
    { id: 'fat5', name: { en: 'Tahini', ar: 'طحينة' }, portion: { grams: 15, label: { en: '1 tbsp', ar: 'ملعقة كبيرة' } }, calories: 90, protein: 3, carbs: 3, fat: 8, fiber: 1, category: 'fat', mealSlot: ['breakfast', 'lunch'], cultural: 'middle_eastern', budget: 'low', prepTime: 'quick', allergens: [], minAgeMonths: 24, spiceProfile: 'mild' },
    { id: 'fat6', name: { en: 'Peanut Butter', ar: 'زبدة فول سوداني' }, portion: { grams: 20, label: { en: '1 tbsp', ar: 'ملعقة كبيرة' } }, calories: 115, protein: 4, carbs: 4, fat: 10, fiber: 1, category: 'fat', mealSlot: ['breakfast', 'snack'], cultural: 'international', budget: 'moderate', prepTime: 'quick', allergens: ['nuts'], minAgeMonths: 48, spiceProfile: 'mild' },

    // ═══ MIXED / COMPLETE MEALS ═══
    { id: 'm1', name: { en: 'Molokhia with Rice', ar: 'ملوخية مع أرز' }, portion: { grams: 350, label: { en: '1 plate', ar: 'طبق' } }, calories: 320, protein: 18, carbs: 42, fat: 8, fiber: 5, category: 'mixed', mealSlot: ['lunch'], cultural: 'middle_eastern', budget: 'low', prepTime: 'long', allergens: [], minAgeMonths: 24, cookingMethod: 'stewed', spiceProfile: 'bold' },
    { id: 'm2', name: { en: 'Koshari', ar: 'كشري' }, portion: { grams: 300, label: { en: '1 plate', ar: 'طبق' } }, calories: 380, protein: 14, carbs: 65, fat: 6, fiber: 8, category: 'mixed', mealSlot: ['lunch'], cultural: 'middle_eastern', budget: 'low', prepTime: 'long', allergens: ['gluten'], minAgeMonths: 24, cookingMethod: 'boiled', spiceProfile: 'bold' },
    { id: 'm3', name: { en: 'Chicken Shawarma Wrap', ar: 'شاورما دجاج لفة' }, portion: { grams: 200, label: { en: '1 wrap', ar: 'لفة واحدة' } }, calories: 350, protein: 28, carbs: 30, fat: 12, fiber: 2, category: 'mixed', mealSlot: ['lunch', 'dinner'], cultural: 'middle_eastern', budget: 'moderate', prepTime: 'moderate', allergens: ['gluten'], minAgeMonths: 36, cookingMethod: 'grilled', spiceProfile: 'bold' },
    { id: 'm4', name: { en: 'Stuffed Peppers', ar: 'فلفل محشي' }, portion: { grams: 250, label: { en: '2 peppers', ar: '2 فلفل' } }, calories: 280, protein: 12, carbs: 38, fat: 8, fiber: 5, category: 'mixed', mealSlot: ['lunch', 'dinner'], cultural: 'middle_eastern', budget: 'moderate', prepTime: 'long', allergens: [], minAgeMonths: 36, cookingMethod: 'baked', spiceProfile: 'moderate' },
    { id: 'm5', name: { en: 'Chicken Stir-Fry with Vegetables', ar: 'دجاج مقلي مع خضار' }, portion: { grams: 250, label: { en: '1 plate', ar: 'طبق' } }, calories: 300, protein: 30, carbs: 15, fat: 12, fiber: 4, category: 'mixed', mealSlot: ['lunch', 'dinner'], cultural: 'international', budget: 'moderate', prepTime: 'moderate', allergens: ['soy'], minAgeMonths: 24, cookingMethod: 'pan-cooked', spiceProfile: 'bold' },
    { id: 'm6', name: { en: 'Fatteh', ar: 'فتة' }, portion: { grams: 250, label: { en: '1 bowl', ar: 'طبق' } }, calories: 340, protein: 15, carbs: 35, fat: 15, fiber: 4, category: 'mixed', mealSlot: ['lunch'], cultural: 'middle_eastern', budget: 'low', prepTime: 'moderate', allergens: ['gluten', 'dairy'], minAgeMonths: 24, cookingMethod: 'baked', spiceProfile: 'moderate' },
];

// ─── FOOD EXCHANGE REFERENCE DATA ───

export const EXCHANGE_GROUPS: ExchangeGroup[] = [
    {
        groupName: { en: '1 Protein Serving', ar: 'حصة بروتين واحدة' },
        portionLabel: { en: '~7g protein', ar: '~7 جم بروتين' },
        items: [
            { name: { en: '1 egg', ar: 'بيضة واحدة' }, portion: '50g', calories: 78 },
            { name: { en: 'Chicken breast', ar: 'صدر دجاج' }, portion: '30g', calories: 46 },
            { name: { en: 'Fish fillet', ar: 'فيليه سمك' }, portion: '30g', calories: 40 },
            { name: { en: 'Lean beef', ar: 'لحم بقري' }, portion: '30g', calories: 55 },
            { name: { en: 'Cottage cheese', ar: 'جبنة قريش' }, portion: '60g', calories: 58 },
            { name: { en: 'Greek yogurt', ar: 'زبادي يوناني' }, portion: '100g', calories: 87 },
            { name: { en: 'Lentils (cooked)', ar: 'عدس مطبوخ' }, portion: '100g', calories: 116 },
            { name: { en: 'Canned tuna', ar: 'تونة معلبة' }, portion: '30g', calories: 35 },
        ]
    },
    {
        groupName: { en: '1 Carb Serving', ar: 'حصة كربوهيدرات واحدة' },
        portionLabel: { en: '~15g carbs', ar: '~15 جم كربوهيدرات' },
        items: [
            { name: { en: 'Bread (whole wheat)', ar: 'خبز أسمر' }, portion: '1 slice (30g)', calories: 70 },
            { name: { en: 'Baladi bread', ar: 'عيش بلدي' }, portion: '½ loaf (40g)', calories: 105 },
            { name: { en: 'Rice (cooked)', ar: 'أرز مطبوخ' }, portion: '⅓ cup (75g)', calories: 80 },
            { name: { en: 'Pasta (cooked)', ar: 'مكرونة مطبوخة' }, portion: '⅓ cup (75g)', calories: 87 },
            { name: { en: 'Potato', ar: 'بطاطس' }, portion: '½ medium (75g)', calories: 65 },
            { name: { en: 'Sweet potato', ar: 'بطاطا حلوة' }, portion: '½ medium (75g)', calories: 65 },
            { name: { en: 'Oatmeal (dry)', ar: 'شوفان جاف' }, portion: '3 tbsp (20g)', calories: 75 },
            { name: { en: 'Corn', ar: 'ذرة' }, portion: '½ cup (75g)', calories: 65 },
        ]
    },
    {
        groupName: { en: '1 Fat Serving', ar: 'حصة دهون واحدة' },
        portionLabel: { en: '~5g fat / 45 kcal', ar: '~5 جم دهون / 45 سعرة' },
        items: [
            { name: { en: 'Olive oil', ar: 'زيت زيتون' }, portion: '1 tsp (5ml)', calories: 45 },
            { name: { en: 'Almonds', ar: 'لوز' }, portion: '6 pieces', calories: 42 },
            { name: { en: 'Walnuts', ar: 'جوز' }, portion: '4 halves', calories: 52 },
            { name: { en: 'Avocado', ar: 'أفوكادو' }, portion: '⅛ medium', calories: 40 },
            { name: { en: 'Tahini', ar: 'طحينة' }, portion: '1 tsp', calories: 30 },
            { name: { en: 'Peanut butter', ar: 'زبدة فول سوداني' }, portion: '1 tsp', calories: 32 },
        ]
    },
    {
        groupName: { en: '1 Fruit Serving', ar: 'حصة فاكهة واحدة' },
        portionLabel: { en: '~15g carbs / 60 kcal', ar: '~15 جم كربوهيدرات / 60 سعرة' },
        items: [
            { name: { en: 'Apple', ar: 'تفاحة' }, portion: '1 small', calories: 55 },
            { name: { en: 'Banana', ar: 'موزة' }, portion: '½ medium', calories: 52 },
            { name: { en: 'Orange', ar: 'برتقالة' }, portion: '1 medium', calories: 70 },
            { name: { en: 'Dates', ar: 'تمر' }, portion: '2 pieces', calories: 56 },
            { name: { en: 'Watermelon', ar: 'بطيخ' }, portion: '1 cup diced', calories: 46 },
            { name: { en: 'Berries', ar: 'توت' }, portion: '¾ cup', calories: 42 },
            { name: { en: 'Guava', ar: 'جوافة' }, portion: '1 medium', calories: 100 },
        ]
    }
];
