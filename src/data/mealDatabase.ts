// ─── Food Item Database for 7-Day Meal System ───
// Each item: bilingual name, macros per portion, tags for filtering

export interface Micronutrients {
    iron: number;     // mg
    calcium: number;  // mg
    zinc: number;     // mg
    iodine: number;   // mcg
    vitA: number;     // mcg (RAE)
    vitD: number;     // mcg
    vitC: number;     // mg
    vitB12: number;   // mcg
    folate: number;   // mcg (DFE)
}

export interface FoodItem {
    id: string;
    name: { en: string; ar: string };
    portion: { grams: number; label: { en: string; ar: string } };
    calories: number;
    protein: number;  // grams
    carbs: number;    // grams
    fat: number;      // grams
    fiber: number;    // grams
    micronutrients: Micronutrients;
    novaGroup: 1 | 2 | 3 | 4;
    isUltraProcessed: boolean;
    category: 'protein' | 'carb' | 'vegetable' | 'fruit' | 'dairy' | 'fat' | 'mixed';
    mealSlot: ('breakfast' | 'lunch' | 'dinner' | 'snack')[];
    cultural: 'middle_eastern' | 'international' | 'both';
    budget: 'low' | 'moderate' | 'high';
    prepTime: 'quick' | 'moderate' | 'long';
    allergens: string[];  // gluten, dairy, eggs, nuts, fish, soy, shellfish
    minAgeMonths: number; // 0 = all ages, 6, 12, 24, etc.
    cookingMethod?: string;
    spiceProfile?: 'mild' | 'moderate' | 'bold';
    isPlantProtein?: boolean; // true for lentils, beans, chickpeas, hummus etc.
    isDairy?: boolean; // true for yogurt, labneh, cheese etc.
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
    {
        id: 'p1',
        name: { en: 'Grilled Chicken Breast', ar: 'صدر دجاج مشوي' },
        portion: { grams: 150, label: { en: '1 breast', ar: 'صدر واحد' } },
        calories: 230, protein: 43, carbs: 0, fat: 5, fiber: 0,
        micronutrients: { iron: 1.5, calcium: 20, zinc: 1.2, iodine: 5, vitA: 10, vitD: 0.1, vitC: 0, vitB12: 0.5, folate: 6 },
        novaGroup: 1, isUltraProcessed: false,
        category: 'protein', mealSlot: ['lunch', 'dinner'], cultural: 'both', budget: 'moderate', prepTime: 'moderate', allergens: [], minAgeMonths: 12, cookingMethod: 'grilled', spiceProfile: 'moderate'
    },
    {
        id: 'p2',
        name: { en: 'Boiled Eggs', ar: 'بيض مسلوق' },
        portion: { grams: 100, label: { en: '2 eggs', ar: 'بيضتين' } },
        calories: 155, protein: 13, carbs: 1, fat: 11, fiber: 0,
        micronutrients: { iron: 1.8, calcium: 50, zinc: 1.1, iodine: 25, vitA: 160, vitD: 2.0, vitC: 0, vitB12: 1.1, folate: 44 },
        novaGroup: 1, isUltraProcessed: false,
        category: 'protein', mealSlot: ['breakfast', 'snack', 'dinner'], cultural: 'both', budget: 'low', prepTime: 'quick', allergens: ['eggs'], minAgeMonths: 12, cookingMethod: 'boiled', spiceProfile: 'mild'
    },
    {
        id: 'p5',
        name: { en: 'Foul Medames', ar: 'فول مدمس' },
        portion: { grams: 200, label: { en: '1 bowl', ar: 'طبق' } },
        calories: 220, protein: 14, carbs: 32, fat: 4, fiber: 9,
        micronutrients: { iron: 4.5, calcium: 60, zinc: 2.0, iodine: 0, vitA: 5, vitD: 0, vitC: 2, vitB12: 0, folate: 120 },
        novaGroup: 1, isUltraProcessed: false,
        category: 'protein', mealSlot: ['breakfast', 'dinner'], cultural: 'middle_eastern', budget: 'low', prepTime: 'quick', allergens: [], minAgeMonths: 24, cookingMethod: 'stewed', spiceProfile: 'mild', isPlantProtein: true
    },
    {
        id: 'p7',
        name: { en: 'Lentil Soup', ar: 'شوربة عدس' },
        portion: { grams: 250, label: { en: '1 bowl', ar: 'طبق' } },
        calories: 180, protein: 12, carbs: 28, fat: 3, fiber: 8,
        micronutrients: { iron: 3.5, calcium: 40, zinc: 1.5, iodine: 0, vitA: 15, vitD: 0, vitC: 5, vitB12: 0, folate: 180 },
        novaGroup: 1, isUltraProcessed: false,
        category: 'protein', mealSlot: ['lunch', 'dinner'], cultural: 'middle_eastern', budget: 'low', prepTime: 'moderate', allergens: [], minAgeMonths: 12, cookingMethod: 'boiled', spiceProfile: 'mild', isPlantProtein: true
    },
    {
        id: 'p8', name: { en: 'Greek Yogurt', ar: 'زبادي يوناني' }, portion: { grams: 150, label: { en: '1 cup', ar: 'كوب' } }, calories: 130, protein: 15, carbs: 8, fat: 4, fiber: 0,
        micronutrients: { iron: 0.1, calcium: 150, zinc: 0.8, iodine: 40, vitA: 15, vitD: 0.1, vitC: 0, vitB12: 0.6, folate: 10 },
        novaGroup: 1, isUltraProcessed: false,
        category: 'dairy', mealSlot: ['breakfast', 'snack', 'dinner'], cultural: 'both', budget: 'moderate', prepTime: 'quick', allergens: ['dairy'], minAgeMonths: 12, spiceProfile: 'mild', isDairy: true
    },
    {
        id: 'p9', name: { en: 'Cottage Cheese', ar: 'جبنة قريش' }, portion: { grams: 100, label: { en: '½ cup', ar: 'نصف كوب' } }, calories: 98, protein: 11, carbs: 3, fat: 4, fiber: 0,
        micronutrients: { iron: 0.1, calcium: 80, zinc: 0.4, iodine: 15, vitA: 20, vitD: 0.1, vitC: 0, vitB12: 0.4, folate: 12 },
        novaGroup: 1, isUltraProcessed: false,
        category: 'dairy', mealSlot: ['breakfast', 'snack', 'dinner'], cultural: 'both', budget: 'low', prepTime: 'quick', allergens: ['dairy'], minAgeMonths: 12, spiceProfile: 'mild', isDairy: true
    },
    {
        id: 'p10', name: { en: 'Canned Tuna (in water)', ar: 'تونة معلبة (بالماء)' }, portion: { grams: 100, label: { en: '1 can', ar: 'علبة' } }, calories: 116, protein: 26, carbs: 0, fat: 1, fiber: 0,
        micronutrients: { iron: 1.2, calcium: 10, zinc: 0.7, iodine: 30, vitA: 15, vitD: 4.5, vitC: 0, vitB12: 2.1, folate: 4 },
        novaGroup: 3, isUltraProcessed: false,
        category: 'protein', mealSlot: ['lunch', 'dinner'], cultural: 'both', budget: 'low', prepTime: 'quick', allergens: ['fish'], minAgeMonths: 24, spiceProfile: 'mild'
    },
    {
        id: 'p11', name: { en: 'White Cheese (Feta-style)', ar: 'جبنة بيضاء' }, portion: { grams: 60, label: { en: '2 slices', ar: 'شريحتين' } }, calories: 150, protein: 9, carbs: 2, fat: 12, fiber: 0,
        micronutrients: { iron: 0.4, calcium: 250, zinc: 1.2, iodine: 20, vitA: 80, vitD: 0.3, vitC: 0, vitB12: 0.8, folate: 15 },
        novaGroup: 3, isUltraProcessed: false,
        category: 'dairy', mealSlot: ['breakfast', 'dinner'], cultural: 'middle_eastern', budget: 'low', prepTime: 'quick', allergens: ['dairy'], minAgeMonths: 12, spiceProfile: 'mild', isDairy: true
    },
    {
        id: 'p12', name: { en: 'Chickpea Salad', ar: 'سلطة حمص' }, portion: { grams: 150, label: { en: '1 cup', ar: 'كوب' } }, calories: 190, protein: 10, carbs: 27, fat: 5, fiber: 7,
        micronutrients: { iron: 2.2, calcium: 40, zinc: 1.0, iodine: 0, vitA: 10, vitD: 0, vitC: 5, vitB12: 0, folate: 100 },
        novaGroup: 1, isUltraProcessed: false,
        category: 'protein', mealSlot: ['lunch', 'dinner', 'snack'], cultural: 'middle_eastern', budget: 'low', prepTime: 'quick', allergens: [], minAgeMonths: 24, spiceProfile: 'moderate', isPlantProtein: true
    },
    {
        id: 'p13', name: { en: 'Grilled Turkey Breast', ar: 'صدر ديك رومي مشوي' }, portion: { grams: 120, label: { en: '120g', ar: '120 جم' } }, calories: 160, protein: 34, carbs: 0, fat: 2, fiber: 0,
        micronutrients: { iron: 1.2, calcium: 15, zinc: 1.5, iodine: 0, vitA: 0, vitD: 0.1, vitC: 0, vitB12: 0.4, folate: 8 },
        novaGroup: 1, isUltraProcessed: false,
        category: 'protein', mealSlot: ['lunch', 'dinner'], cultural: 'both', budget: 'high', prepTime: 'moderate', allergens: [], minAgeMonths: 12, cookingMethod: 'grilled', spiceProfile: 'mild'
    },
    {
        id: 'p14', name: { en: 'Scrambled Eggs', ar: 'بيض مخفوق' }, portion: { grams: 120, label: { en: '2 eggs', ar: 'بيضتين' } }, calories: 180, protein: 12, carbs: 2, fat: 14, fiber: 0,
        micronutrients: { iron: 1.8, calcium: 50, zinc: 1.1, iodine: 25, vitA: 160, vitD: 2.0, vitC: 0, vitB12: 1.1, folate: 44 },
        novaGroup: 2, isUltraProcessed: false,
        category: 'protein', mealSlot: ['breakfast'], cultural: 'both', budget: 'low', prepTime: 'quick', allergens: ['eggs'], minAgeMonths: 12, cookingMethod: 'pan-cooked', spiceProfile: 'mild'
    },
    {
        id: 'p15', name: { en: 'Baked Salmon', ar: 'سلمون مخبوز' }, portion: { grams: 150, label: { en: '1 fillet', ar: 'فيليه' } }, calories: 280, protein: 36, carbs: 0, fat: 14, fiber: 0,
        micronutrients: { iron: 0.8, calcium: 15, zinc: 0.6, iodine: 60, vitA: 50, vitD: 15, vitC: 0, vitB12: 4.5, folate: 35 },
        novaGroup: 1, isUltraProcessed: false,
        category: 'protein', mealSlot: ['lunch', 'dinner'], cultural: 'international', budget: 'high', prepTime: 'moderate', allergens: ['fish'], minAgeMonths: 12, cookingMethod: 'baked', spiceProfile: 'mild'
    },

    // ═══ CARBS ═══
    {
        id: 'c1', name: { en: 'Brown Rice', ar: 'أرز بني' }, portion: { grams: 150, label: { en: '¾ cup cooked', ar: '¾ كوب مطبوخ' } }, calories: 165, protein: 4, carbs: 35, fat: 1, fiber: 2,
        micronutrients: { iron: 0.8, calcium: 10, zinc: 1.2, iodine: 0, vitA: 0, vitD: 0, vitC: 0, vitB12: 0, folate: 8 },
        novaGroup: 1, isUltraProcessed: false,
        category: 'carb', mealSlot: ['lunch', 'dinner'], cultural: 'both', budget: 'low', prepTime: 'moderate', allergens: [], minAgeMonths: 12, spiceProfile: 'mild'
    },
    {
        id: 'c2', name: { en: 'White Rice', ar: 'أرز أبيض' }, portion: { grams: 150, label: { en: '¾ cup cooked', ar: '¾ كوب مطبوخ' } }, calories: 195, protein: 4, carbs: 43, fat: 0, fiber: 0.5,
        micronutrients: { iron: 0.4, calcium: 5, zinc: 0.8, iodine: 0, vitA: 0, vitD: 0, vitC: 0, vitB12: 0, folate: 5 },
        novaGroup: 1, isUltraProcessed: false,
        category: 'carb', mealSlot: ['lunch', 'dinner'], cultural: 'both', budget: 'low', prepTime: 'moderate', allergens: [], minAgeMonths: 12, spiceProfile: 'mild'
    },
    {
        id: 'c3', name: { en: 'Whole Wheat Bread', ar: 'خبز أسمر' }, portion: { grams: 50, label: { en: '1 slice', ar: 'شريحة' } }, calories: 120, protein: 5, carbs: 22, fat: 2, fiber: 3,
        micronutrients: { iron: 1.2, calcium: 25, zinc: 0.7, iodine: 0, vitA: 0, vitD: 0, vitC: 0, vitB12: 0, folate: 14 },
        novaGroup: 3, isUltraProcessed: false,
        category: 'carb', mealSlot: ['breakfast', 'lunch', 'dinner'], cultural: 'both', budget: 'low', prepTime: 'quick', allergens: ['gluten'], minAgeMonths: 12, spiceProfile: 'mild'
    },
    {
        id: 'c4', name: { en: 'Egyptian Baladi Bread', ar: 'عيش بلدي' }, portion: { grams: 80, label: { en: '1 loaf', ar: 'رغيف' } }, calories: 210, protein: 7, carbs: 42, fat: 2, fiber: 3,
        micronutrients: { iron: 2.0, calcium: 40, zinc: 1.2, iodine: 0, vitA: 0, vitD: 0, vitC: 0, vitB12: 0, folate: 25 },
        novaGroup: 3, isUltraProcessed: false,
        category: 'carb', mealSlot: ['breakfast', 'lunch', 'dinner'], cultural: 'middle_eastern', budget: 'low', prepTime: 'quick', allergens: ['gluten'], minAgeMonths: 12, spiceProfile: 'mild'
    },
    {
        id: 'c5', name: { en: 'Oatmeal', ar: 'شوفان' }, portion: { grams: 40, label: { en: '½ cup dry', ar: 'نصف كوب جاف' } }, calories: 150, protein: 5, carbs: 27, fat: 3, fiber: 4,
        micronutrients: { iron: 1.8, calcium: 20, zinc: 1.2, iodine: 0, vitA: 0, vitD: 0, vitC: 0, vitB12: 0, folate: 12 },
        novaGroup: 1, isUltraProcessed: false,
        category: 'carb', mealSlot: ['breakfast'], cultural: 'both', budget: 'low', prepTime: 'quick', allergens: ['gluten'], minAgeMonths: 12, spiceProfile: 'mild'
    },
    {
        id: 'c6', name: { en: 'Whole Wheat Pasta', ar: 'مكرونة قمح كامل' }, portion: { grams: 150, label: { en: '1 cup cooked', ar: 'كوب مطبوخ' } }, calories: 174, protein: 7, carbs: 37, fat: 1, fiber: 6,
        micronutrients: { iron: 1.4, calcium: 20, zinc: 1.0, iodine: 0, vitA: 0, vitD: 0, vitC: 0, vitB12: 0, folate: 20 },
        novaGroup: 1, isUltraProcessed: false,
        category: 'carb', mealSlot: ['lunch', 'dinner'], cultural: 'both', budget: 'low', prepTime: 'moderate', allergens: ['gluten'], minAgeMonths: 12, spiceProfile: 'mild'
    },
    {
        id: 'c7', name: { en: 'Sweet Potato', ar: 'بطاطا حلوة' }, portion: { grams: 150, label: { en: '1 medium', ar: 'واحدة متوسطة' } }, calories: 130, protein: 2, carbs: 30, fat: 0, fiber: 4,
        micronutrients: { iron: 0.9, calcium: 45, zinc: 0.4, iodine: 0, vitA: 1400, vitD: 0, vitC: 30, vitB12: 0, folate: 15 },
        novaGroup: 1, isUltraProcessed: false,
        category: 'carb', mealSlot: ['lunch', 'dinner', 'snack'], cultural: 'both', budget: 'low', prepTime: 'moderate', allergens: [], minAgeMonths: 12, spiceProfile: 'mild'
    },
    {
        id: 'c8', name: { en: 'Boiled Potato', ar: 'بطاطس مسلوقة' }, portion: { grams: 150, label: { en: '1 medium', ar: 'واحدة متوسطة' } }, calories: 130, protein: 3, carbs: 30, fat: 0, fiber: 2,
        micronutrients: { iron: 1.2, calcium: 15, zinc: 0.5, iodine: 0, vitA: 2, vitD: 0, vitC: 25, vitB12: 0, folate: 28 },
        novaGroup: 1, isUltraProcessed: false,
        category: 'carb', mealSlot: ['lunch', 'dinner'], cultural: 'both', budget: 'low', prepTime: 'moderate', allergens: [], minAgeMonths: 12, spiceProfile: 'mild'
    },
    {
        id: 'c9', name: { en: 'Freekeh', ar: 'فريكة' }, portion: { grams: 150, label: { en: '¾ cup cooked', ar: '¾ كوب مطبوخ' } }, calories: 160, protein: 6, carbs: 32, fat: 1, fiber: 5,
        micronutrients: { iron: 3.5, calcium: 30, zinc: 1.5, iodine: 0, vitA: 10, vitD: 0, vitC: 0, vitB12: 0, folate: 40 },
        novaGroup: 1, isUltraProcessed: false,
        category: 'carb', mealSlot: ['lunch', 'dinner'], cultural: 'middle_eastern', budget: 'moderate', prepTime: 'moderate', allergens: ['gluten'], minAgeMonths: 24, spiceProfile: 'mild'
    },
    {
        id: 'c10', name: { en: 'Quinoa', ar: 'كينوا' }, portion: { grams: 150, label: { en: '¾ cup cooked', ar: '¾ كوب مطبوخ' } }, calories: 180, protein: 7, carbs: 32, fat: 3, fiber: 3,
        micronutrients: { iron: 2.8, calcium: 31, zinc: 2.0, iodine: 0, vitA: 0, vitD: 0, vitC: 0, vitB12: 0, folate: 78 },
        novaGroup: 1, isUltraProcessed: false,
        category: 'carb', mealSlot: ['lunch', 'dinner'], cultural: 'international', budget: 'high', prepTime: 'moderate', allergens: [], minAgeMonths: 12, spiceProfile: 'mild'
    },

    // ═══ VEGETABLES ═══
    {
        id: 'v1', name: { en: 'Mixed Green Salad', ar: 'سلطة خضراء مشكلة' }, portion: { grams: 150, label: { en: '1 bowl', ar: 'طبق' } }, calories: 30, protein: 2, carbs: 5, fat: 0, fiber: 3,
        micronutrients: { iron: 1.2, calcium: 40, zinc: 0.3, iodine: 0, vitA: 200, vitD: 0, vitC: 15, vitB12: 0, folate: 60 },
        novaGroup: 1, isUltraProcessed: false,
        category: 'vegetable', mealSlot: ['lunch', 'dinner'], cultural: 'both', budget: 'low', prepTime: 'quick', allergens: [], minAgeMonths: 12, spiceProfile: 'mild'
    },
    {
        id: 'v2', name: { en: 'Steamed Broccoli', ar: 'بروكلي مطهو بالبخار' }, portion: { grams: 100, label: { en: '1 cup', ar: 'كوب' } }, calories: 35, protein: 3, carbs: 6, fat: 0, fiber: 3,
        micronutrients: { iron: 0.7, calcium: 47, zinc: 0.4, iodine: 0, vitA: 31, vitD: 0, vitC: 89, vitB12: 0, folate: 63 },
        novaGroup: 1, isUltraProcessed: false,
        category: 'vegetable', mealSlot: ['lunch', 'dinner'], cultural: 'both', budget: 'moderate', prepTime: 'quick', allergens: [], minAgeMonths: 12, spiceProfile: 'mild'
    },
    {
        id: 'v3', name: { en: 'Cucumber & Tomato Salad', ar: 'سلطة خيار وطماطم' }, portion: { grams: 150, label: { en: '1 bowl', ar: 'طبق' } }, calories: 35, protein: 1, carbs: 7, fat: 0, fiber: 2,
        micronutrients: { iron: 0.5, calcium: 15, zinc: 0.2, iodine: 0, vitA: 25, vitD: 0, vitC: 20, vitB12: 0, folate: 20 },
        novaGroup: 1, isUltraProcessed: false,
        category: 'vegetable', mealSlot: ['lunch', 'dinner', 'breakfast'], cultural: 'middle_eastern', budget: 'low', prepTime: 'quick', allergens: [], minAgeMonths: 12, spiceProfile: 'mild'
    },
    {
        id: 'v4', name: { en: 'Sautéed Spinach', ar: 'سبانخ سوتيه' }, portion: { grams: 100, label: { en: '1 cup', ar: 'كوب' } }, calories: 40, protein: 3, carbs: 4, fat: 2, fiber: 3,
        micronutrients: { iron: 3.5, calcium: 130, zinc: 0.8, iodine: 0, vitA: 469, vitD: 0, vitC: 17, vitB12: 0, folate: 146 },
        novaGroup: 1, isUltraProcessed: false,
        category: 'vegetable', mealSlot: ['lunch', 'dinner'], cultural: 'both', budget: 'low', prepTime: 'quick', allergens: [], minAgeMonths: 12, spiceProfile: 'mild'
    },
    {
        id: 'v5', name: { en: 'Grilled Zucchini', ar: 'كوسة مشوية' }, portion: { grams: 100, label: { en: '1 cup sliced', ar: 'كوب شرائح' } }, calories: 30, protein: 1, carbs: 5, fat: 1, fiber: 2,
        micronutrients: { iron: 0.4, calcium: 15, zinc: 0.3, iodine: 0, vitA: 10, vitD: 0, vitC: 17, vitB12: 0, folate: 24 },
        novaGroup: 1, isUltraProcessed: false,
        category: 'vegetable', mealSlot: ['lunch', 'dinner'], cultural: 'both', budget: 'low', prepTime: 'quick', allergens: [], minAgeMonths: 12, cookingMethod: 'grilled', spiceProfile: 'mild'
    },
    {
        id: 'v6', name: { en: 'Okra Stew', ar: 'بامية' }, portion: { grams: 150, label: { en: '1 cup', ar: 'كوب' } }, calories: 80, protein: 3, carbs: 12, fat: 2, fiber: 4,
        micronutrients: { iron: 0.8, calcium: 82, zinc: 0.6, iodine: 0, vitA: 36, vitD: 0, vitC: 23, vitB12: 0, folate: 60 },
        novaGroup: 2, isUltraProcessed: false,
        category: 'vegetable', mealSlot: ['lunch', 'dinner'], cultural: 'middle_eastern', budget: 'low', prepTime: 'long', allergens: [], minAgeMonths: 24, cookingMethod: 'stewed', spiceProfile: 'moderate'
    },
    {
        id: 'v7', name: { en: 'Stuffed Grape Leaves', ar: 'ورق عنب' }, portion: { grams: 120, label: { en: '6 pieces', ar: '6 قطع' } }, calories: 150, protein: 3, carbs: 22, fat: 5, fiber: 3,
        micronutrients: { iron: 1.5, calcium: 40, zinc: 0.5, iodine: 0, vitA: 15, vitD: 0, vitC: 5, vitB12: 0, folate: 45 },
        novaGroup: 3, isUltraProcessed: false,
        category: 'vegetable', mealSlot: ['lunch'], cultural: 'middle_eastern', budget: 'moderate', prepTime: 'long', allergens: [], minAgeMonths: 36, cookingMethod: 'stewed', spiceProfile: 'mild'
    },
    {
        id: 'v8', name: { en: 'Roasted Cauliflower', ar: 'قرنبيط محمص' }, portion: { grams: 100, label: { en: '1 cup', ar: 'كوب' } }, calories: 50, protein: 2, carbs: 7, fat: 2, fiber: 3,
        micronutrients: { iron: 0.4, calcium: 22, zinc: 0.3, iodine: 0, vitA: 0, vitD: 0, vitC: 48, vitB12: 0, folate: 57 },
        novaGroup: 2, isUltraProcessed: false,
        category: 'vegetable', mealSlot: ['lunch', 'dinner'], cultural: 'both', budget: 'low', prepTime: 'moderate', allergens: [], minAgeMonths: 12, cookingMethod: 'baked', spiceProfile: 'moderate'
    },

    // ═══ FRUITS ═══
    {
        id: 'f1', name: { en: 'Banana', ar: 'موزة' }, portion: { grams: 120, label: { en: '1 medium', ar: 'واحدة متوسطة' } }, calories: 105, protein: 1, carbs: 27, fat: 0, fiber: 3,
        micronutrients: { iron: 0.3, calcium: 6, zinc: 0.2, iodine: 0, vitA: 3, vitD: 0, vitC: 10, vitB12: 0, folate: 24 },
        novaGroup: 1, isUltraProcessed: false,
        category: 'fruit', mealSlot: ['breakfast', 'snack'], cultural: 'both', budget: 'low', prepTime: 'quick', allergens: [], minAgeMonths: 6, spiceProfile: 'mild'
    },
    {
        id: 'f2', name: { en: 'Apple', ar: 'تفاحة' }, portion: { grams: 150, label: { en: '1 medium', ar: 'واحدة متوسطة' } }, calories: 80, protein: 0, carbs: 21, fat: 0, fiber: 4,
        micronutrients: { iron: 0.2, calcium: 9, zinc: 0.1, iodine: 0, vitA: 4, vitD: 0, vitC: 7, vitB12: 0, folate: 5 },
        novaGroup: 1, isUltraProcessed: false,
        category: 'fruit', mealSlot: ['snack'], cultural: 'both', budget: 'low', prepTime: 'quick', allergens: [], minAgeMonths: 6, spiceProfile: 'mild'
    },
    {
        id: 'f3', name: { en: 'Orange', ar: 'برتقالة' }, portion: { grams: 150, label: { en: '1 medium', ar: 'واحدة متوسطة' } }, calories: 70, protein: 1, carbs: 18, fat: 0, fiber: 3,
        micronutrients: { iron: 0.1, calcium: 60, zinc: 0.1, iodine: 0, vitA: 11, vitD: 0, vitC: 70, vitB12: 0, folate: 45 },
        novaGroup: 1, isUltraProcessed: false,
        category: 'fruit', mealSlot: ['snack'], cultural: 'both', budget: 'low', prepTime: 'quick', allergens: [], minAgeMonths: 12, spiceProfile: 'mild'
    },
    {
        id: 'f4', name: { en: 'Dates', ar: 'تمر' }, portion: { grams: 30, label: { en: '3 pieces', ar: '3 تمرات' } }, calories: 85, protein: 1, carbs: 22, fat: 0, fiber: 2,
        micronutrients: { iron: 0.3, calcium: 20, zinc: 0.1, iodine: 0, vitA: 0, vitD: 0, vitC: 0, vitB12: 0, folate: 6 },
        novaGroup: 1, isUltraProcessed: false,
        category: 'fruit', mealSlot: ['snack', 'breakfast'], cultural: 'middle_eastern', budget: 'low', prepTime: 'quick', allergens: [], minAgeMonths: 12, spiceProfile: 'mild'
    },
    {
        id: 'f5', name: { en: 'Watermelon', ar: 'بطيخ' }, portion: { grams: 200, label: { en: '1 slice', ar: 'شريحة' } }, calories: 60, protein: 1, carbs: 15, fat: 0, fiber: 0.5,
        micronutrients: { iron: 0.5, calcium: 15, zinc: 0.2, iodine: 0, vitA: 56, vitD: 0, vitC: 16, vitB12: 0, folate: 6 },
        novaGroup: 1, isUltraProcessed: false,
        category: 'fruit', mealSlot: ['snack'], cultural: 'both', budget: 'low', prepTime: 'quick', allergens: [], minAgeMonths: 12, spiceProfile: 'mild'
    },
    {
        id: 'f6', name: { en: 'Mixed Berries', ar: 'توت مشكل' }, portion: { grams: 100, label: { en: '¾ cup', ar: '¾ كوب' } }, calories: 55, protein: 1, carbs: 13, fat: 0, fiber: 4,
        micronutrients: { iron: 0.7, calcium: 16, zinc: 0.2, iodine: 0, vitA: 2, vitD: 0, vitC: 30, vitB12: 0, folate: 25 },
        novaGroup: 1, isUltraProcessed: false,
        category: 'fruit', mealSlot: ['breakfast', 'snack'], cultural: 'international', budget: 'high', prepTime: 'quick', allergens: [], minAgeMonths: 12, spiceProfile: 'mild'
    },
    {
        id: 'f7', name: { en: 'Guava', ar: 'جوافة' }, portion: { grams: 150, label: { en: '1 medium', ar: 'واحدة متوسطة' } }, calories: 100, protein: 4, carbs: 24, fat: 1, fiber: 9,
        micronutrients: { iron: 0.4, calcium: 27, zinc: 0.3, iodine: 0, vitA: 46, vitD: 0, vitC: 340, vitB12: 0, folate: 74 },
        novaGroup: 1, isUltraProcessed: false,
        category: 'fruit', mealSlot: ['snack'], cultural: 'middle_eastern', budget: 'low', prepTime: 'quick', allergens: [], minAgeMonths: 12, spiceProfile: 'mild'
    },

    // ═══ HEALTHY FATS ═══
    {
        id: 'fat1', name: { en: 'Almonds', ar: 'لوز' }, portion: { grams: 28, label: { en: '¼ cup', ar: 'ربع كوب' } }, calories: 164, protein: 6, carbs: 6, fat: 14, fiber: 3.5,
        micronutrients: { iron: 1.0, calcium: 76, zinc: 0.9, iodine: 0, vitA: 0, vitD: 0, vitC: 0, vitB12: 0, folate: 12 },
        novaGroup: 1, isUltraProcessed: false,
        category: 'fat', mealSlot: ['snack'], cultural: 'both', budget: 'moderate', prepTime: 'quick', allergens: ['nuts'], minAgeMonths: 48, spiceProfile: 'mild'
    },
    {
        id: 'fat2', name: { en: 'Walnuts', ar: 'جوز' }, portion: { grams: 28, label: { en: '¼ cup', ar: 'ربع كوب' } }, calories: 185, protein: 4, carbs: 4, fat: 18, fiber: 2,
        micronutrients: { iron: 0.8, calcium: 28, zinc: 0.9, iodine: 0, vitA: 0, vitD: 0, vitC: 0, vitB12: 0, folate: 28 },
        novaGroup: 1, isUltraProcessed: false,
        category: 'fat', mealSlot: ['snack', 'breakfast'], cultural: 'both', budget: 'moderate', prepTime: 'quick', allergens: ['nuts'], minAgeMonths: 48, spiceProfile: 'mild'
    },
    {
        id: 'fat3', name: { en: 'Avocado', ar: 'أفوكادو' }, portion: { grams: 75, label: { en: '½ medium', ar: 'نصف واحدة' } }, calories: 120, protein: 1, carbs: 6, fat: 11, fiber: 5,
        micronutrients: { iron: 0.5, calcium: 9, zinc: 0.5, iodine: 0, vitA: 5, vitD: 0, vitC: 7, vitB12: 0, folate: 60 },
        novaGroup: 1, isUltraProcessed: false,
        category: 'fat', mealSlot: ['breakfast', 'lunch'], cultural: 'international', budget: 'high', prepTime: 'quick', allergens: [], minAgeMonths: 12, spiceProfile: 'mild'
    },
    {
        id: 'fat4', name: { en: 'Olive Oil', ar: 'زيت زيتون' }, portion: { grams: 14, label: { en: '1 tbsp', ar: 'ملعقة كبيرة' } }, calories: 120, protein: 0, carbs: 0, fat: 14, fiber: 0,
        micronutrients: { iron: 0, calcium: 0, zinc: 0, iodine: 0, vitA: 0, vitD: 0, vitC: 0, vitB12: 0, folate: 0 },
        novaGroup: 2, isUltraProcessed: false,
        category: 'fat', mealSlot: ['breakfast', 'lunch', 'dinner'], cultural: 'both', budget: 'moderate', prepTime: 'quick', allergens: [], minAgeMonths: 12, spiceProfile: 'mild'
    },
    {
        id: 'fat5', name: { en: 'Tahini', ar: 'طحينة' }, portion: { grams: 15, label: { en: '1 tbsp', ar: 'ملعقة كبيرة' } }, calories: 90, protein: 3, carbs: 3, fat: 8, fiber: 1,
        micronutrients: { iron: 1.3, calcium: 64, zinc: 0.7, iodine: 0, vitA: 1, vitD: 0, vitC: 0, vitB12: 0, folate: 15 },
        novaGroup: 2, isUltraProcessed: false,
        category: 'fat', mealSlot: ['breakfast', 'lunch'], cultural: 'middle_eastern', budget: 'low', prepTime: 'quick', allergens: [], minAgeMonths: 24, spiceProfile: 'mild'
    },
    {
        id: 'fat6', name: { en: 'Peanut Butter', ar: 'زبدة فول سوداني' }, portion: { grams: 20, label: { en: '1 tbsp', ar: 'ملعقة كبيرة' } }, calories: 115, protein: 4, carbs: 4, fat: 10, fiber: 1,
        micronutrients: { iron: 0.4, calcium: 9, zinc: 0.5, iodine: 0, vitA: 0, vitD: 0, vitC: 0, vitB12: 0, folate: 18 },
        novaGroup: 3, isUltraProcessed: false,
        category: 'fat', mealSlot: ['breakfast', 'snack'], cultural: 'international', budget: 'moderate', prepTime: 'quick', allergens: ['nuts'], minAgeMonths: 48, spiceProfile: 'mild'
    },

    // ═══ PLANT-PROTEIN DINNER OPTIONS ═══
    {
        id: 'pp1', name: { en: 'Hummus Plate', ar: 'طبق حمص' }, portion: { grams: 200, label: { en: '1 plate', ar: 'طبق' } }, calories: 250, protein: 12, carbs: 28, fat: 12, fiber: 7,
        micronutrients: { iron: 4.8, calcium: 105, zinc: 2.5, iodine: 0, vitA: 20, vitD: 0, vitC: 0, vitB12: 0, folate: 160 },
        novaGroup: 3, isUltraProcessed: false,
        category: 'protein', mealSlot: ['dinner', 'lunch'], cultural: 'middle_eastern', budget: 'low', prepTime: 'quick', allergens: [], minAgeMonths: 24, spiceProfile: 'moderate', isPlantProtein: true
    },
    {
        id: 'pp2', name: { en: 'Labneh with Vegetables', ar: 'لبنة مع خضار' }, portion: { grams: 150, label: { en: '1 bowl', ar: 'طبق' } }, calories: 160, protein: 10, carbs: 8, fat: 10, fiber: 2,
        micronutrients: { iron: 0.1, calcium: 110, zinc: 0.5, iodine: 20, vitA: 60, vitD: 0.2, vitC: 0, vitB12: 0.4, folate: 10 },
        novaGroup: 2, isUltraProcessed: false,
        category: 'dairy', mealSlot: ['dinner', 'breakfast'], cultural: 'middle_eastern', budget: 'low', prepTime: 'quick', allergens: ['dairy'], minAgeMonths: 12, spiceProfile: 'mild', isDairy: true
    },
    {
        id: 'pp3', name: { en: 'Fava Bean Stew', ar: 'يخنة فول' }, portion: { grams: 250, label: { en: '1 bowl', ar: 'طبق' } }, calories: 210, protein: 14, carbs: 30, fat: 4, fiber: 9,
        micronutrients: { iron: 6.7, calcium: 61, zinc: 2.1, iodine: 0, vitA: 5, vitD: 0, vitC: 2, vitB12: 0, folate: 177 },
        novaGroup: 1, isUltraProcessed: false,
        category: 'protein', mealSlot: ['dinner', 'lunch'], cultural: 'middle_eastern', budget: 'low', prepTime: 'moderate', allergens: [], minAgeMonths: 24, cookingMethod: 'stewed', spiceProfile: 'moderate', isPlantProtein: true
    },
    {
        id: 'pp4', name: { en: 'Yogurt Bowl with Cucumber', ar: 'طبق زبادي بالخيار' }, portion: { grams: 200, label: { en: '1 bowl', ar: 'طبق' } }, calories: 140, protein: 12, carbs: 12, fat: 5, fiber: 1,
        micronutrients: { iron: 0.2, calcium: 180, zinc: 0.9, iodine: 45, vitA: 20, vitD: 0.1, vitC: 5, vitB12: 0.8, folate: 15 },
        novaGroup: 1, isUltraProcessed: false,
        category: 'dairy', mealSlot: ['dinner', 'snack'], cultural: 'both', budget: 'low', prepTime: 'quick', allergens: ['dairy'], minAgeMonths: 12, spiceProfile: 'mild', isDairy: true
    },
    {
        id: 'pp5', name: { en: 'Mashed Bean Bowl', ar: 'طبق فول مهروس' }, portion: { grams: 200, label: { en: '1 bowl', ar: 'طبق' } }, calories: 200, protein: 13, carbs: 28, fat: 3, fiber: 8,
        micronutrients: { iron: 4.5, calcium: 60, zinc: 2.0, iodine: 0, vitA: 5, vitD: 0, vitC: 2, vitB12: 0, folate: 121 },
        novaGroup: 1, isUltraProcessed: false,
        category: 'protein', mealSlot: ['dinner'], cultural: 'middle_eastern', budget: 'low', prepTime: 'quick', allergens: [], minAgeMonths: 24, spiceProfile: 'mild', isPlantProtein: true
    },
    {
        id: 'pp6', name: { en: 'Lentil Salad', ar: 'سلطة عدس' }, portion: { grams: 200, label: { en: '1 bowl', ar: 'طبق' } }, calories: 190, protein: 11, carbs: 26, fat: 4, fiber: 7,
        micronutrients: { iron: 6.6, calcium: 38, zinc: 1.3, iodine: 0, vitA: 15, vitD: 0, vitC: 5, vitB12: 0, folate: 358 },
        novaGroup: 1, isUltraProcessed: false,
        category: 'protein', mealSlot: ['dinner', 'lunch'], cultural: 'both', budget: 'low', prepTime: 'moderate', allergens: [], minAgeMonths: 24, spiceProfile: 'mild', isPlantProtein: true
    },
    {
        id: 'pp7', name: { en: 'Cheese & Vegetable Plate', ar: 'طبق جبنة مع خضار' }, portion: { grams: 150, label: { en: '1 plate', ar: 'طبق' } }, calories: 180, protein: 12, carbs: 8, fat: 11, fiber: 3,
        micronutrients: { iron: 0.5, calcium: 300, zinc: 1.5, iodine: 25, vitA: 100, vitD: 0.5, vitC: 20, vitB12: 1.0, folate: 20 },
        novaGroup: 3, isUltraProcessed: false,
        category: 'dairy', mealSlot: ['dinner'], cultural: 'both', budget: 'moderate', prepTime: 'quick', allergens: ['dairy'], minAgeMonths: 12, spiceProfile: 'mild', isDairy: true
    },

    // ═══ MIXED / COMPLETE MEALS ═══
    {
        id: 'm1', name: { en: 'Molokhia with Rice', ar: 'ملوخية مع أرز' }, portion: { grams: 350, label: { en: '1 plate', ar: 'طبق' } }, calories: 320, protein: 18, carbs: 42, fat: 8, fiber: 5,
        micronutrients: { iron: 4.5, calcium: 250, zinc: 1.8, iodine: 0, vitA: 350, vitD: 0, vitC: 25, vitB12: 0.5, folate: 80 },
        novaGroup: 2, isUltraProcessed: false,
        category: 'mixed', mealSlot: ['lunch'], cultural: 'middle_eastern', budget: 'low', prepTime: 'long', allergens: [], minAgeMonths: 24, cookingMethod: 'stewed', spiceProfile: 'bold'
    },
    {
        id: 'm2', name: { en: 'Koshari', ar: 'كشري' }, portion: { grams: 300, label: { en: '1 plate', ar: 'طبق' } }, calories: 380, protein: 14, carbs: 65, fat: 6, fiber: 8,
        micronutrients: { iron: 6.2, calcium: 100, zinc: 2.2, iodine: 0, vitA: 15, vitD: 0, vitC: 10, vitB12: 0, folate: 120 },
        novaGroup: 3, isUltraProcessed: false,
        category: 'mixed', mealSlot: ['lunch'], cultural: 'middle_eastern', budget: 'low', prepTime: 'long', allergens: ['gluten'], minAgeMonths: 24, cookingMethod: 'boiled', spiceProfile: 'bold', isPlantProtein: true
    },
    {
        id: 'm3', name: { en: 'Chicken Shawarma Wrap', ar: 'شاورما دجاج لفة' }, portion: { grams: 200, label: { en: '1 wrap', ar: 'لفة واحدة' } }, calories: 350, protein: 28, carbs: 30, fat: 12, fiber: 2,
        micronutrients: { iron: 2.5, calcium: 60, zinc: 1.8, iodine: 5, vitA: 50, vitD: 0.2, vitC: 10, vitB12: 0.8, folate: 30 },
        novaGroup: 4, isUltraProcessed: true,
        category: 'mixed', mealSlot: ['lunch'], cultural: 'middle_eastern', budget: 'moderate', prepTime: 'moderate', allergens: ['gluten'], minAgeMonths: 36, cookingMethod: 'grilled', spiceProfile: 'bold'
    },
    {
        id: 'm4', name: { en: 'Stuffed Peppers', ar: 'فلفل محشي' }, portion: { grams: 250, label: { en: '2 peppers', ar: '2 فلفل' } }, calories: 280, protein: 12, carbs: 38, fat: 8, fiber: 5,
        micronutrients: { iron: 3.2, calcium: 60, zinc: 1.5, iodine: 0, vitA: 200, vitD: 0.1, vitC: 120, vitB12: 0.4, folate: 60 },
        novaGroup: 3, isUltraProcessed: false,
        category: 'mixed', mealSlot: ['lunch'], cultural: 'middle_eastern', budget: 'moderate', prepTime: 'long', allergens: [], minAgeMonths: 36, cookingMethod: 'baked', spiceProfile: 'moderate'
    },
    {
        id: 'm5', name: { en: 'Chicken Stir-Fry with Vegetables', ar: 'دجاج مقلي مع خضار' }, portion: { grams: 250, label: { en: '1 plate', ar: 'طبق' } }, calories: 300, protein: 30, carbs: 15, fat: 12, fiber: 4,
        micronutrients: { iron: 2.5, calcium: 50, zinc: 1.8, iodine: 5, vitA: 150, vitD: 0.2, vitC: 60, vitB12: 1.0, folate: 40 },
        novaGroup: 3, isUltraProcessed: false,
        category: 'mixed', mealSlot: ['lunch'], cultural: 'international', budget: 'moderate', prepTime: 'moderate', allergens: ['soy'], minAgeMonths: 24, cookingMethod: 'pan-cooked', spiceProfile: 'bold'
    },
    {
        id: 'm6', name: { en: 'Fatteh', ar: 'فتة' }, portion: { grams: 250, label: { en: '1 bowl', ar: 'طبق' } }, calories: 340, protein: 15, carbs: 35, fat: 15, fiber: 4,
        micronutrients: { iron: 1.8, calcium: 150, zinc: 1.2, iodine: 10, vitA: 80, vitD: 0.4, vitC: 5, vitB12: 0.6, folate: 25 },
        novaGroup: 3, isUltraProcessed: false,
        category: 'mixed', mealSlot: ['lunch'], cultural: 'middle_eastern', budget: 'low', prepTime: 'moderate', allergens: ['gluten', 'dairy'], minAgeMonths: 24, cookingMethod: 'baked', spiceProfile: 'moderate'
    },
    // ─── EGYPTIAN EXPANSION ───
    // Proteins & Legumes
    {
        id: 'eg_p1', name: { en: 'Falafel (Ta\'ameya)', ar: 'طعمية' }, portion: { grams: 100, label: { en: '3-4 pieces', ar: '3-4 قطع' } }, calories: 333, protein: 13, carbs: 32, fat: 18, fiber: 5,
        micronutrients: { iron: 3.4, calcium: 54, zinc: 1.5, iodine: 0, vitA: 0, vitD: 0, vitC: 0, vitB12: 0, folate: 90 },
        novaGroup: 3, isUltraProcessed: false,
        category: 'protein', mealSlot: ['breakfast', 'dinner'], cultural: 'middle_eastern', budget: 'low', prepTime: 'quick', allergens: [], minAgeMonths: 24, cookingMethod: 'fried', spiceProfile: 'bold', isPlantProtein: true
    },
    {
        id: 'eg_p2', name: { en: 'Ful with Flaxseed Oil', ar: 'فول بالزيت الحار' }, portion: { grams: 200, label: { en: '1 bowl', ar: 'طبق' } }, calories: 280, protein: 14, carbs: 32, fat: 12, fiber: 9,
        micronutrients: { iron: 4.8, calcium: 65, zinc: 2.1, iodine: 0, vitA: 10, vitD: 0, vitC: 2, vitB12: 0, folate: 150 },
        novaGroup: 2, isUltraProcessed: false,
        category: 'protein', mealSlot: ['breakfast', 'dinner'], cultural: 'middle_eastern', budget: 'low', prepTime: 'quick', allergens: [], minAgeMonths: 24, isPlantProtein: true
    },
    {
        id: 'eg_p3', name: { en: 'Alexandrian Liver', ar: 'كبدة إسكندراني' }, portion: { grams: 150, label: { en: '1 plate', ar: 'طبق' } }, calories: 280, protein: 32, carbs: 5, fat: 14, fiber: 0,
        micronutrients: { iron: 12.5, calcium: 15, zinc: 6.5, iodine: 10, vitA: 8000, vitD: 1.5, vitC: 15, vitB12: 60, folate: 250 },
        novaGroup: 2, isUltraProcessed: false,
        category: 'protein', mealSlot: ['lunch', 'dinner'], cultural: 'middle_eastern', budget: 'moderate', prepTime: 'moderate', allergens: [], minAgeMonths: 36, cookingMethod: 'pan-cooked', spiceProfile: 'bold'
    },
    {
        id: 'eg_p4', name: { en: 'Grilled Kofta', ar: 'كفتة مشوية' }, portion: { grams: 150, label: { en: '3 skewers', ar: '3 أصابع' } }, calories: 350, protein: 28, carbs: 4, fat: 24, fiber: 1,
        micronutrients: { iron: 3.2, calcium: 30, zinc: 4.5, iodine: 5, vitA: 20, vitD: 0.2, vitC: 2, vitB12: 2.5, folate: 15 },
        novaGroup: 3, isUltraProcessed: false,
        category: 'protein', mealSlot: ['lunch', 'dinner'], cultural: 'middle_eastern', budget: 'moderate', prepTime: 'moderate', allergens: [], minAgeMonths: 36, cookingMethod: 'grilled', spiceProfile: 'bold'
    },
    {
        id: 'eg_p5', name: { en: 'Fried Tilapia Fish', ar: 'سمك بلطي مقلي' }, portion: { grams: 200, label: { en: '1 medium fish', ar: 'سمكة متوسطة' } }, calories: 320, protein: 35, carbs: 5, fat: 18, fiber: 0,
        micronutrients: { iron: 1.2, calcium: 40, zinc: 1.1, iodine: 45, vitA: 30, vitD: 4.5, vitC: 0, vitB12: 2.8, folate: 12 },
        novaGroup: 3, isUltraProcessed: false,
        category: 'protein', mealSlot: ['lunch'], cultural: 'middle_eastern', budget: 'moderate', prepTime: 'moderate', allergens: ['fish', 'gluten'], minAgeMonths: 24, cookingMethod: 'fried', spiceProfile: 'moderate'
    },
    {
        id: 'eg_p6', name: { en: 'Bessara', ar: 'بصارة' }, portion: { grams: 200, label: { en: '1 bowl', ar: 'طبق' } }, calories: 240, protein: 12, carbs: 35, fat: 7, fiber: 10,
        micronutrients: { iron: 5.2, calcium: 85, zinc: 1.8, iodine: 0, vitA: 450, vitD: 0, vitC: 8, vitB12: 0, folate: 180 },
        novaGroup: 2, isUltraProcessed: false,
        category: 'protein', mealSlot: ['breakfast', 'lunch', 'dinner'], cultural: 'middle_eastern', budget: 'low', prepTime: 'long', allergens: [], minAgeMonths: 24, cookingMethod: 'boiled', isPlantProtein: true
    },

    // Carbs & Bakery
    {
        id: 'eg_c1', name: { en: 'Fino Bread', ar: 'عيش فينو' }, portion: { grams: 50, label: { en: '1 loaf', ar: 'رغيف واحد' } }, calories: 140, protein: 4, carbs: 26, fat: 2, fiber: 1,
        micronutrients: { iron: 0.8, calcium: 20, zinc: 0.4, iodine: 5, vitA: 0, vitD: 0, vitC: 0, vitB12: 0, folate: 15 },
        novaGroup: 4, isUltraProcessed: true,
        category: 'carb', mealSlot: ['breakfast', 'dinner', 'snack'], cultural: 'both', budget: 'low', prepTime: 'quick', allergens: ['gluten', 'dairy'], minAgeMonths: 12
    },
    {
        id: 'eg_c2', name: { en: 'Fiteer Meshaltet', ar: 'فطير مشلتت' }, portion: { grams: 100, label: { en: '1 slice', ar: 'قطعة' } }, calories: 420, protein: 6, carbs: 45, fat: 24, fiber: 1,
        micronutrients: { iron: 1.1, calcium: 30, zinc: 0.5, iodine: 0, vitA: 150, vitD: 0.3, vitC: 0, vitB12: 0, folate: 12 },
        novaGroup: 3, isUltraProcessed: false,
        category: 'carb', mealSlot: ['breakfast', 'dinner'], cultural: 'middle_eastern', budget: 'moderate', prepTime: 'long', allergens: ['gluten', 'dairy'], minAgeMonths: 36
    },
    {
        id: 'eg_c3', name: { en: 'Roz Me\'amar', ar: 'أرز معمر' }, portion: { grams: 200, label: { en: '1 portion', ar: 'قطعة' } }, calories: 380, protein: 10, carbs: 48, fat: 16, fiber: 0.5,
        micronutrients: { iron: 0.6, calcium: 180, zinc: 1.0, iodine: 15, vitA: 120, vitD: 0.4, vitC: 0, vitB12: 0.8, folate: 18 },
        novaGroup: 3, isUltraProcessed: false,
        category: 'mixed', mealSlot: ['lunch'], cultural: 'middle_eastern', budget: 'moderate', prepTime: 'long', allergens: ['dairy'], minAgeMonths: 24, cookingMethod: 'baked'
    },
    {
        id: 'eg_c4', name: { en: 'Macarona Béchamel', ar: 'مكرونة بالبشاميل' }, portion: { grams: 250, label: { en: '1 square', ar: 'قطعة مربعة' } }, calories: 450, protein: 18, carbs: 42, fat: 24, fiber: 2,
        micronutrients: { iron: 2.1, calcium: 140, zinc: 1.8, iodine: 10, vitA: 180, vitD: 0.5, vitC: 2, vitB12: 1.2, folate: 35 },
        novaGroup: 3, isUltraProcessed: false,
        category: 'mixed', mealSlot: ['lunch'], cultural: 'both', budget: 'moderate', prepTime: 'long', allergens: ['gluten', 'dairy', 'eggs'], minAgeMonths: 24, cookingMethod: 'baked'
    },

    // Mixed Meals & Stuffed Veggies
    {
        id: 'eg_m1', name: { en: 'Cabbage Mahshi', ar: 'محشي كرنب' }, portion: { grams: 200, label: { en: '6-8 pieces', ar: '6-8 أصابع' } }, calories: 260, protein: 6, carbs: 38, fat: 10, fiber: 5,
        micronutrients: { iron: 2.2, calcium: 70, zinc: 0.8, iodine: 0, vitA: 120, vitD: 0.1, vitC: 45, vitB12: 0.2, folate: 85 },
        novaGroup: 2, isUltraProcessed: false,
        category: 'mixed', mealSlot: ['lunch'], cultural: 'middle_eastern', budget: 'low', prepTime: 'long', allergens: [], minAgeMonths: 24, cookingMethod: 'stewed'
    },
    {
        id: 'eg_m2', name: { en: 'Zucchini & Pepper Mahshi', ar: 'محشي كوسة وفلفل' }, portion: { grams: 250, label: { en: '2 zucchinis + 1 pepper', ar: '2 كوسة + 1 فلفل' } }, calories: 240, protein: 7, carbs: 34, fat: 9, fiber: 6,
        micronutrients: { iron: 1.8, calcium: 65, zinc: 0.9, iodine: 0, vitA: 850, vitD: 0, vitC: 140, vitB12: 0, folate: 75 },
        novaGroup: 2, isUltraProcessed: false,
        category: 'mixed', mealSlot: ['lunch'], cultural: 'middle_eastern', budget: 'low', prepTime: 'long', allergens: [], minAgeMonths: 24, cookingMethod: 'stewed'
    },
    {
        id: 'eg_m3', name: { en: 'Moussaka (Egyptian Style)', ar: 'مسقعة' }, portion: { grams: 200, label: { en: '1 plate', ar: 'طبق' } }, calories: 180, protein: 4, carbs: 12, fat: 14, fiber: 4,
        micronutrients: { iron: 1.5, calcium: 40, zinc: 0.6, iodine: 0, vitA: 110, vitD: 0, vitC: 25, vitB12: 0, folate: 30 },
        novaGroup: 3, isUltraProcessed: false,
        category: 'mixed', mealSlot: ['lunch'], cultural: 'middle_eastern', budget: 'low', prepTime: 'long', allergens: [], minAgeMonths: 24, cookingMethod: 'stewed'
    },
    {
        id: 'eg_m4', name: { en: 'Torly (Mixed Veggie Stew)', ar: 'تورلي' }, portion: { grams: 250, label: { en: '1 bowl', ar: 'طبق' } }, calories: 210, protein: 12, carbs: 22, fat: 8, fiber: 7,
        micronutrients: { iron: 2.8, calcium: 60, zinc: 1.5, iodine: 5, vitA: 1200, vitD: 0.2, vitC: 45, vitB12: 0.5, folate: 50 },
        novaGroup: 2, isUltraProcessed: false,
        category: 'mixed', mealSlot: ['lunch'], cultural: 'middle_eastern', budget: 'moderate', prepTime: 'long', allergens: [], minAgeMonths: 24, cookingMethod: 'baked'
    },
    {
        id: 'eg_m5', name: { en: 'Okra with Meat', ar: 'بامية باللحمة' }, portion: { grams: 250, label: { en: '1 bowl', ar: 'طبق' } }, calories: 290, protein: 18, carbs: 12, fat: 18, fiber: 5,
        micronutrients: { iron: 3.5, calcium: 105, zinc: 3.2, iodine: 8, vitA: 180, vitD: 0.4, vitC: 28, vitB12: 1.5, folate: 70 },
        novaGroup: 3, isUltraProcessed: false,
        category: 'mixed', mealSlot: ['lunch'], cultural: 'middle_eastern', budget: 'moderate', prepTime: 'long', allergens: [], minAgeMonths: 24, cookingMethod: 'stewed'
    },

    // Fruits & Local Veggies
    {
        id: 'eg_f1', name: { en: 'Guava', ar: 'جوافة' }, portion: { grams: 150, label: { en: '1 medium', ar: 'واحدة متوسطة' } }, calories: 102, protein: 3.9, carbs: 21.5, fat: 1.5, fiber: 8.1,
        micronutrients: { iron: 0.4, calcium: 27, zinc: 0.3, iodine: 0, vitA: 46, vitD: 0, vitC: 340, vitB12: 0, folate: 74 },
        novaGroup: 1, isUltraProcessed: false,
        category: 'fruit', mealSlot: ['snack'], cultural: 'middle_eastern', budget: 'low', prepTime: 'quick', allergens: [], minAgeMonths: 12
    },
    {
        id: 'eg_f2', name: { en: 'Pomegranate', ar: 'رمان' }, portion: { grams: 150, label: { en: '1 cup seeds', ar: 'كوب بذور' } }, calories: 125, protein: 2.5, carbs: 28, fat: 1.8, fiber: 6,
        micronutrients: { iron: 0.45, calcium: 15, zinc: 0.5, iodine: 0, vitA: 0, vitD: 0, vitC: 15, vitB12: 0, folate: 57 },
        novaGroup: 1, isUltraProcessed: false,
        category: 'fruit', mealSlot: ['snack'], cultural: 'middle_eastern', budget: 'low', prepTime: 'moderate', allergens: [], minAgeMonths: 24
    },
    {
        id: 'eg_f3', name: { en: 'Fresh Figs', ar: 'تين برشومي' }, portion: { grams: 100, label: { en: '2 large', ar: 'حبتين' } }, calories: 74, protein: 0.8, carbs: 19, fat: 0.3, fiber: 3,
        micronutrients: { iron: 0.4, calcium: 35, zinc: 0.2, iodine: 0, vitA: 7, vitD: 0, vitC: 2, vitB12: 0, folate: 6 },
        novaGroup: 1, isUltraProcessed: false,
        category: 'fruit', mealSlot: ['snack', 'breakfast'], cultural: 'middle_eastern', budget: 'low', prepTime: 'quick', allergens: [], minAgeMonths: 12
    },
    {
        id: 'eg_f4', name: { en: 'Dates (Hayany/Zaghloul)', ar: 'بلح حياني/زغلول' }, portion: { grams: 100, label: { en: '5-6 pieces', ar: '5-6 حبات' } }, calories: 145, protein: 1.5, carbs: 36, fat: 0.2, fiber: 4,
        micronutrients: { iron: 1.2, calcium: 40, zinc: 0.3, iodine: 0, vitA: 10, vitD: 0, vitC: 5, vitB12: 0, folate: 15 },
        novaGroup: 1, isUltraProcessed: false,
        category: 'fruit', mealSlot: ['snack', 'breakfast'], cultural: 'middle_eastern', budget: 'low', prepTime: 'quick', allergens: [], minAgeMonths: 12
    },
    {
        id: 'eg_v1', name: { en: 'Baba Ghanoush', ar: 'بابا غنوج' }, portion: { grams: 100, label: { en: '1 portion', ar: 'طبق صغير' } }, calories: 120, protein: 2, carbs: 8, fat: 10, fiber: 4,
        micronutrients: { iron: 1.1, calcium: 55, zinc: 0.6, iodine: 0, vitA: 15, vitD: 0, vitC: 8, vitB12: 0, folate: 25 },
        novaGroup: 2, isUltraProcessed: false,
        category: 'vegetable', mealSlot: ['breakfast', 'lunch', 'dinner'], cultural: 'middle_eastern', budget: 'low', prepTime: 'moderate', allergens: ['nuts'], minAgeMonths: 24
    },

    // Dairy & Sweets
    {
        id: 'eg_d1', name: { en: 'Rayeb Milk', ar: 'لبن رايب' }, portion: { grams: 200, label: { en: '1 cup', ar: 'كوب واحد' } }, calories: 120, protein: 7, carbs: 10, fat: 6, fiber: 0,
        micronutrients: { iron: 0.1, calcium: 240, zinc: 0.8, iodine: 30, vitA: 80, vitD: 0.4, vitC: 2, vitB12: 0.9, folate: 10 },
        novaGroup: 1, isUltraProcessed: false,
        category: 'dairy', mealSlot: ['breakfast', 'dinner', 'snack'], cultural: 'middle_eastern', budget: 'low', prepTime: 'quick', allergens: ['dairy'], minAgeMonths: 12, isDairy: true
    },
    {
        id: 'eg_s1', name: { en: 'Rice Pudding (Roz bel Laban)', ar: 'أرز باللبن' }, portion: { grams: 150, label: { en: '1 bowl', ar: 'طبق' } }, calories: 210, protein: 6, carbs: 38, fat: 4, fiber: 0,
        micronutrients: { iron: 0.2, calcium: 160, zinc: 0.7, iodine: 10, vitA: 60, vitD: 0.3, vitC: 0, vitB12: 0.5, folate: 12 },
        novaGroup: 3, isUltraProcessed: false,
        category: 'dairy', mealSlot: ['snack'], cultural: 'middle_eastern', budget: 'low', prepTime: 'long', allergens: ['dairy'], minAgeMonths: 24
    },
    {
        id: 'eg_s2', name: { en: 'Om Ali', ar: 'أم علي' }, portion: { grams: 200, label: { en: '1 portion', ar: 'طبق' } }, calories: 380, protein: 9, carbs: 45, fat: 18, fiber: 2,
        micronutrients: { iron: 1.2, calcium: 210, zinc: 1.2, iodine: 12, vitA: 180, vitD: 0.4, vitC: 0, vitB12: 0.8, folate: 25 },
        novaGroup: 3, isUltraProcessed: false,
        category: 'dairy', mealSlot: ['snack'], cultural: 'middle_eastern', budget: 'moderate', prepTime: 'long', allergens: ['gluten', 'dairy', 'nuts'], minAgeMonths: 36
    },
    {
        id: 'eg_s3', name: { en: 'Basbousa', ar: 'بسبوسة' }, portion: { grams: 100, label: { en: '1 square', ar: 'قطعة مربعة' } }, calories: 340, protein: 4, carbs: 55, fat: 12, fiber: 1,
        micronutrients: { iron: 0.8, calcium: 40, zinc: 0.4, iodine: 0, vitA: 60, vitD: 0.1, vitC: 0, vitB12: 0, folate: 10 },
        novaGroup: 3, isUltraProcessed: false,
        category: 'carb', mealSlot: ['snack'], cultural: 'middle_eastern', budget: 'moderate', prepTime: 'long', allergens: ['gluten', 'dairy'], minAgeMonths: 36
    },
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
