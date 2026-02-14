// ─── 7-Day Meal Plan Generation Engine ───
// Generates weekly plans with alternatives, rotation, filtering, and grocery lists

import {
    FOOD_DB, EXCHANGE_GROUPS,
    FoodItem, MealOption, DayPlan, WeeklyPlan, GroceryCategory, ExchangeGroup
} from '@/data/mealDatabase';

export interface MealEngineInput {
    ageYears: number;
    ageMonths: number;
    gender: 'male' | 'female';
    heightCm: number;
    weightKg: number;
    bmi: number | null;
    targetCalories: number;
    proteinGrams: number;
    carbGrams: number;
    fatGrams: number;
    goal: 'maintain' | 'lose' | 'gain' | 'muscle';
    clinicalCondition: 'none' | 'diabetes' | 'hypertension';
    foodPreference: 'middle_eastern' | 'international' | 'mixed';
    allergies: string[];
    budget: 'low' | 'moderate' | 'high';
    timeAvailability: 'busy' | 'moderate' | 'flexible';
    language: 'en' | 'ar';
}

// Calorie distribution per meal slot
const MEAL_DISTRIBUTION = {
    breakfast: 0.25,
    snack1: 0.10,
    lunch: 0.30,
    snack2: 0.10,
    dinner: 0.25,
};

// Cooking method rotation for anti-boredom
const COOKING_ROTATIONS = ['grilled', 'baked', 'boiled', 'pan-cooked', 'stewed', 'steamed'];
const SPICE_ROTATIONS: ('mild' | 'moderate' | 'bold')[] = ['mild', 'moderate', 'bold', 'mild', 'bold', 'moderate', 'mild'];

/**
 * Filter food items by user constraints
 */
function filterFoods(input: MealEngineInput): FoodItem[] {
    const ageInMonths = input.ageMonths || input.ageYears * 12;
    return FOOD_DB.filter(item => {
        // Age check
        if (item.minAgeMonths > ageInMonths) return false;
        // Allergy check
        if (input.allergies.some(a => item.allergens.includes(a))) return false;
        // Cultural preference
        if (input.foodPreference === 'middle_eastern' && item.cultural === 'international') return false;
        if (input.foodPreference === 'international' && item.cultural === 'middle_eastern') return false;
        // Budget check
        if (input.budget === 'low' && item.budget === 'high') return false;
        // Time check
        if (input.timeAvailability === 'busy' && item.prepTime === 'long') return false;
        // Clinical conditions
        if (input.clinicalCondition === 'diabetes') {
            // Avoid very high-carb items
            if (item.carbs > 50 && item.fiber < 3) return false;
        }
        return true;
    });
}

/**
 * Get foods suitable for a specific meal slot
 */
function getFoodsForSlot(
    foods: FoodItem[],
    slot: 'breakfast' | 'lunch' | 'dinner' | 'snack',
    preferredCooking?: string,
    preferredSpice?: 'mild' | 'moderate' | 'bold'
): FoodItem[] {
    let slotFoods = foods.filter(f => f.mealSlot.includes(slot));

    // Sort by preference (cooking method and spice rotation)
    if (preferredCooking || preferredSpice) {
        slotFoods.sort((a, b) => {
            let scoreA = 0, scoreB = 0;
            if (preferredCooking && a.cookingMethod === preferredCooking) scoreA += 2;
            if (preferredCooking && b.cookingMethod === preferredCooking) scoreB += 2;
            if (preferredSpice && a.spiceProfile === preferredSpice) scoreA += 1;
            if (preferredSpice && b.spiceProfile === preferredSpice) scoreB += 1;
            return scoreB - scoreA;
        });
    }

    return slotFoods;
}

/**
 * Build a single meal option from available foods targeting specific calories
 */
function buildMealOption(
    foods: FoodItem[],
    targetCalories: number,
    slot: 'breakfast' | 'lunch' | 'dinner' | 'snack',
    usedIds: Set<string>,
    lang: 'en' | 'ar',
    isAdult: boolean = false
): MealOption | null {
    const slotFoods = foods.filter(f => f.mealSlot.includes(slot) && !usedIds.has(f.id));
    if (slotFoods.length === 0) return null;

    const selected: FoodItem[] = [];
    let remainingCals = targetCalories;

    // For main meals: pick a protein + carb + vegetable
    if (slot === 'lunch' || slot === 'dinner') {
        // For ADULT DINNERS: prioritize plant protein and dairy
        if (slot === 'dinner' && isAdult) {
            // First try plant protein or dairy items
            const plantDairy = slotFoods.filter(f =>
                (f.isPlantProtein || f.isDairy) && !usedIds.has(f.id)
            );
            if (plantDairy.length > 0) {
                const pick = plantDairy[Math.floor(Math.random() * plantDairy.length)];
                selected.push(pick);
                usedIds.add(pick.id);
                remainingCals -= pick.calories;
                // Add a side: bread or vegetable
                const sides = slotFoods.filter(f =>
                    (f.category === 'vegetable' || f.category === 'carb') && !usedIds.has(f.id)
                );
                if (sides.length > 0 && remainingCals > 20) {
                    const side = sides[Math.floor(Math.random() * sides.length)];
                    selected.push(side);
                    remainingCals -= side.calories;
                }
            } else {
                // Fallback: any dairy or protein
                const proteins = slotFoods.filter(f => (f.category === 'protein' || f.category === 'dairy') && !usedIds.has(f.id));
                if (proteins.length > 0) {
                    const p = proteins[Math.floor(Math.random() * proteins.length)];
                    selected.push(p);
                    usedIds.add(p.id);
                    remainingCals -= p.calories;
                }
                const vegs = slotFoods.filter(f => f.category === 'vegetable' && !usedIds.has(f.id));
                if (vegs.length > 0 && remainingCals > 20) {
                    const v = vegs[Math.floor(Math.random() * vegs.length)];
                    selected.push(v);
                    remainingCals -= v.calories;
                }
            }
        } else {
            // Standard lunch/dinner (or child dinner)
            const mixed = slotFoods.filter(f => f.category === 'mixed');
            if (mixed.length > 0) {
                const pick = mixed[Math.floor(Math.random() * mixed.length)];
                selected.push(pick);
                usedIds.add(pick.id);
                remainingCals -= pick.calories;
                // Add a side vegetable
                const vegs = slotFoods.filter(f => f.category === 'vegetable' && !usedIds.has(f.id));
                if (vegs.length > 0 && remainingCals > 20) {
                    const veg = vegs[Math.floor(Math.random() * vegs.length)];
                    selected.push(veg);
                    remainingCals -= veg.calories;
                }
            } else {
                // Pick protein
                const proteins = slotFoods.filter(f => f.category === 'protein' || f.category === 'dairy');
                if (proteins.length > 0) {
                    const p = proteins[Math.floor(Math.random() * proteins.length)];
                    selected.push(p);
                    usedIds.add(p.id);
                    remainingCals -= p.calories;
                }
                // Pick carb
                const carbs = slotFoods.filter(f => f.category === 'carb' && !usedIds.has(f.id));
                if (carbs.length > 0 && remainingCals > 50) {
                    const c = carbs[Math.floor(Math.random() * carbs.length)];
                    selected.push(c);
                    remainingCals -= c.calories;
                }
                // Pick vegetable
                const vegs = slotFoods.filter(f => f.category === 'vegetable' && !usedIds.has(f.id));
                if (vegs.length > 0 && remainingCals > 20) {
                    const v = vegs[Math.floor(Math.random() * vegs.length)];
                    selected.push(v);
                    remainingCals -= v.calories;
                }
            }
        }
    } else if (slot === 'breakfast') {
        // Pick protein/dairy
        const proteins = slotFoods.filter(f => (f.category === 'protein' || f.category === 'dairy'));
        if (proteins.length > 0) {
            const p = proteins[Math.floor(Math.random() * proteins.length)];
            selected.push(p);
            usedIds.add(p.id);
            remainingCals -= p.calories;
        }
        // Pick carb
        const carbs = slotFoods.filter(f => f.category === 'carb' && !usedIds.has(f.id));
        if (carbs.length > 0 && remainingCals > 50) {
            const c = carbs[Math.floor(Math.random() * carbs.length)];
            selected.push(c);
            remainingCals -= c.calories;
        }
        // Maybe add a fruit or fat
        const extras = slotFoods.filter(f => (f.category === 'fruit' || f.category === 'fat') && !usedIds.has(f.id));
        if (extras.length > 0 && remainingCals > 40) {
            const e = extras[Math.floor(Math.random() * extras.length)];
            selected.push(e);
        }
    } else {
        // Snack: fruit / dairy / fat
        const snackFoods = slotFoods.filter(f => ['fruit', 'dairy', 'fat'].includes(f.category));
        if (snackFoods.length > 0) {
            const s = snackFoods[Math.floor(Math.random() * snackFoods.length)];
            selected.push(s);
            remainingCals -= s.calories;
            // Maybe add one more
            const more = snackFoods.filter(f => f.id !== s.id && !usedIds.has(f.id));
            if (more.length > 0 && remainingCals > 40) {
                const m = more[Math.floor(Math.random() * more.length)];
                selected.push(m);
            }
        }
    }

    if (selected.length === 0) return null;

    const totalCals = selected.reduce((s, f) => s + f.calories, 0);
    const totalP = selected.reduce((s, f) => s + f.protein, 0);
    const totalC = selected.reduce((s, f) => s + f.carbs, 0);
    const totalF = selected.reduce((s, f) => s + f.fat, 0);

    return {
        items: selected,
        totalCalories: totalCals,
        totalProtein: totalP,
        totalCarbs: totalC,
        totalFat: totalF,
        label: {
            en: selected.map(f => f.name.en).join(' + '),
            ar: selected.map(f => f.name.ar).join(' + '),
        }
    };
}

/**
 * Generate multiple meal alternatives for a slot
 */
function generateAlternatives(
    foods: FoodItem[],
    targetCalories: number,
    slot: 'breakfast' | 'lunch' | 'dinner' | 'snack',
    count: number,
    dayIndex: number,
    lang: 'en' | 'ar',
    isAdult: boolean = false
): MealOption[] {
    const alternatives: MealOption[] = [];
    const globalUsed = new Set<string>();

    const cookPref = COOKING_ROTATIONS[dayIndex % COOKING_ROTATIONS.length];
    const spicePref = SPICE_ROTATIONS[dayIndex % SPICE_ROTATIONS.length];

    // Prioritize foods by rotation preference
    const sortedFoods = getFoodsForSlot(foods, slot, cookPref, spicePref);

    for (let i = 0; i < count; i++) {
        // Per-alternative used set (allow reuse across alternatives, just not within same alternative)
        const attemptUsed = new Set<string>();
        const option = buildMealOption(sortedFoods, targetCalories, slot, attemptUsed, lang, isAdult);
        if (option) {
            // Avoid duplicate labels
            const isDuplicate = alternatives.some(a => a.label.en === option.label.en);
            if (!isDuplicate) {
                alternatives.push(option);
            }
        }
    }

    // Fallback: ensure at least 1 option
    if (alternatives.length === 0) {
        const fallbackFoods = foods.filter(f => f.mealSlot.includes(slot));
        if (fallbackFoods.length > 0) {
            const pick = fallbackFoods[0];
            alternatives.push({
                items: [pick],
                totalCalories: pick.calories,
                totalProtein: pick.protein,
                totalCarbs: pick.carbs,
                totalFat: pick.fat,
                label: { en: pick.name.en, ar: pick.name.ar }
            });
        }
    }

    return alternatives;
}

/**
 * Generate a single day's plan
 */
function generateDayPlan(
    foods: FoodItem[],
    targetCalories: number,
    dayIndex: number,
    lang: 'en' | 'ar',
    isAdult: boolean = false
): DayPlan {
    const altCount = 4; // 3-5 alternatives per slot

    return {
        dayNumber: dayIndex + 1,
        breakfast: generateAlternatives(foods, Math.round(targetCalories * MEAL_DISTRIBUTION.breakfast), 'breakfast', altCount, dayIndex, lang),
        snack1: generateAlternatives(foods, Math.round(targetCalories * MEAL_DISTRIBUTION.snack1), 'snack', 3, dayIndex, lang),
        lunch: generateAlternatives(foods, Math.round(targetCalories * MEAL_DISTRIBUTION.lunch), 'lunch', altCount, dayIndex + 2, lang),
        snack2: generateAlternatives(foods, Math.round(targetCalories * MEAL_DISTRIBUTION.snack2), 'snack', 3, dayIndex + 1, lang),
        dinner: generateAlternatives(foods, Math.round(targetCalories * MEAL_DISTRIBUTION.dinner), 'dinner', altCount, dayIndex + 4, lang, isAdult),
    };
}

/**
 * Build weekly grocery list from the plan
 */
function buildGroceryList(days: DayPlan[], lang: 'en' | 'ar'): GroceryCategory[] {
    const itemMap = new Map<string, { name: { en: string; ar: string }; count: number; category: string }>();

    // Collect all items from first alternatives of each meal
    for (const day of days) {
        const slots = [day.breakfast, day.snack1, day.lunch, day.snack2, day.dinner];
        for (const slot of slots) {
            if (slot.length > 0) {
                // Use first alternative for grocery list
                for (const item of slot[0].items) {
                    const existing = itemMap.get(item.id);
                    if (existing) {
                        existing.count++;
                    } else {
                        itemMap.set(item.id, { name: item.name, count: 1, category: item.category });
                    }
                }
            }
        }
    }

    const categories: Record<string, { en: string; ar: string }> = {
        protein: { en: 'Proteins', ar: 'البروتينات' },
        dairy: { en: 'Dairy', ar: 'الألبان' },
        carb: { en: 'Carbohydrates', ar: 'الكربوهيدرات' },
        vegetable: { en: 'Vegetables', ar: 'الخضروات' },
        fruit: { en: 'Fruits', ar: 'الفواكه' },
        fat: { en: 'Healthy Fats', ar: 'الدهون الصحية' },
        mixed: { en: 'Prepared Meals', ar: 'وجبات محضرة' },
    };

    const grouped: Record<string, GroceryCategory> = {};

    for (const [, value] of itemMap) {
        const catKey = value.category;
        if (!grouped[catKey]) {
            grouped[catKey] = {
                category: categories[catKey] || { en: catKey, ar: catKey },
                items: []
            };
        }
        grouped[catKey].items.push({
            name: value.name,
            quantity: `×${value.count}`,
        });
    }

    return Object.values(grouped);
}

/**
 * Apply goal-based calorie adjustments
 */
export function calculateGoalCalories(
    tdee: number,
    goal: 'maintain' | 'lose' | 'gain' | 'muscle',
    weightKg: number
): { targetCalories: number; proteinGrams: number; carbGrams: number; fatGrams: number; deficit: number } {
    let target = tdee;
    let deficit = 0;
    let proteinPerKg = 1.0; // Default

    switch (goal) {
        case 'lose':
            deficit = Math.min(750, Math.max(500, tdee * 0.2)); // 500-750 kcal deficit
            target = Math.max(1200, tdee - deficit); // Never below 1200
            proteinPerKg = 1.4; // Preserve muscle during deficit
            break;
        case 'gain':
            target = tdee + 400;
            proteinPerKg = 1.2;
            break;
        case 'muscle':
            target = tdee + 300;
            proteinPerKg = 1.6;
            break;
        default:
            proteinPerKg = 1.0;
    }

    const proteinGrams = Math.round(weightKg * proteinPerKg);
    const proteinCals = proteinGrams * 4;
    const fatCals = Math.round(target * 0.28);
    const fatGrams = Math.round(fatCals / 9);
    const carbCals = target - proteinCals - fatCals;
    const carbGrams = Math.round(carbCals / 4);

    return { targetCalories: Math.round(target), proteinGrams, carbGrams, fatGrams, deficit: Math.round(deficit) };
}

/**
 * Main entry: Generate complete 7-day meal plan
 */
export function generateWeeklyPlan(input: MealEngineInput): WeeklyPlan {
    const filteredFoods = filterFoods(input);
    const days: DayPlan[] = [];
    const isAdult = input.ageYears >= 18;

    for (let d = 0; d < 7; d++) {
        days.push(generateDayPlan(filteredFoods, input.targetCalories, d, input.language, isAdult));
    }

    const groceryList = buildGroceryList(days, input.language);
    const exchangeGuide = EXCHANGE_GROUPS;

    return {
        days,
        totalWeeklyCalories: input.targetCalories * 7,
        groceryList,
        exchangeGuide,
    };
}

// ─── Behavioral Tips Data ───

export interface BehavioralSection {
    title: { en: string; ar: string };
    tips: { en: string; ar: string }[];
}

export const BEHAVIORAL_TIPS: BehavioralSection[] = [
    {
        title: { en: 'Craving Management', ar: 'إدارة الرغبة الشديدة في الأكل' },
        tips: [
            { en: 'Wait 15 minutes before giving in to a craving — most will pass', ar: 'انتظر 15 دقيقة قبل الاستسلام للرغبة — معظمها سيزول' },
            { en: 'Drink a glass of water first — thirst is often mistaken for hunger', ar: 'اشرب كوب ماء أولاً — العطش كثيراً ما يُخلط بالجوع' },
            { en: 'Keep healthy snacks pre-portioned and accessible', ar: 'احتفظ بوجبات خفيفة صحية مقسمة مسبقاً وسهلة الوصول' },
            { en: 'Brush your teeth after meals to signal "eating is over"', ar: 'اغسل أسنانك بعد الوجبات كإشارة لانتهاء الأكل' },
        ]
    },
    {
        title: { en: 'Eating Out Strategy', ar: 'استراتيجية الأكل خارج المنزل' },
        tips: [
            { en: 'Check the menu online before going — plan your order', ar: 'اطلع على القائمة أونلاين قبل الذهاب — خطط لطلبك' },
            { en: 'Start with a salad or soup to reduce main course intake', ar: 'ابدأ بسلطة أو شوربة لتقليل الكمية في الطبق الرئيسي' },
            { en: 'Ask for dressings and sauces on the side', ar: 'اطلب الصلصات والتتبيلات جانباً' },
            { en: 'Share large portions or ask for a to-go box halfway through', ar: 'شارك الحصص الكبيرة أو اطلب تعبئة نصف الكمية للمنزل' },
        ]
    },
    {
        title: { en: 'Weekend Flexibility (80/20 Rule)', ar: 'مرونة نهاية الأسبوع (قاعدة 80/20)' },
        tips: [
            { en: '80% of meals should follow the plan, 20% can be flexible', ar: '80% من الوجبات تلتزم بالخطة، 20% يمكن أن تكون مرنة' },
            { en: 'One treat meal per week will not derail progress', ar: 'وجبة واحدة مكافأة أسبوعياً لن تعطل تقدمك' },
            { en: 'Avoid "all or nothing" thinking — one slip is not failure', ar: 'تجنب التفكير "كل شيء أو لا شيء" — زلة واحدة ليست فشلاً' },
            { en: 'Compensate with slightly lighter meals before/after, not skipping meals', ar: 'عوّض بوجبات أخف قليلاً قبلها/بعدها، ولا تتخطَ الوجبات' },
        ]
    },
    {
        title: { en: 'Hunger Scale Guide', ar: 'مقياس الجوع' },
        tips: [
            { en: '1-3: Starving/Very Hungry → Eat a balanced meal immediately', ar: '1-3: جوع شديد → كل وجبة متوازنة فوراً' },
            { en: '4-5: Mildly Hungry → Good time to eat a planned meal', ar: '4-5: جوع خفيف → وقت مناسب لأكل وجبة مخططة' },
            { en: '6-7: Satisfied → Stop eating, you\'re at the ideal point', ar: '6-7: الشبع → توقف عن الأكل، أنت في النقطة المثالية' },
            { en: '8-10: Overfull → You ate too much. Learn for next time', ar: '8-10: تخمة → أكلت أكثر من اللازم. تعلم للمرة القادمة' },
        ]
    }
];

// ─── Advanced Mode Data ───

export interface AdvancedProtocol {
    id: string;
    title: { en: string; ar: string };
    description: { en: string; ar: string };
    details: { en: string; ar: string };
}

export const ADVANCED_PROTOCOLS: AdvancedProtocol[] = [
    {
        id: 'refeed',
        title: { en: 'Refeed Day Logic', ar: 'منطق يوم التعويض (Refeed)' },
        description: { en: 'Strategic high-carb day to reset leptin', ar: 'يوم كربوهيدرات مرتفع استراتيجي لإعادة ضبط اللبتين' },
        details: {
            en: 'After 10-14 days of calorie deficit, add one day at maintenance calories with 60% carbs. This prevents metabolic adaptation, restores glycogen, and improves training performance. Best placed on your most active training day.',
            ar: 'بعد 10-14 يوم من عجز السعرات، أضف يوم واحد بسعرات الصيانة مع 60% كربوهيدرات. هذا يمنع التكيف الأيضي، يستعيد الجليكوجين، ويحسن أداء التمرين. يفضل وضعه في أكثر يوم تدريب نشاطاً.'
        }
    },
    {
        id: 'muscle_preservation',
        title: { en: 'Muscle Preservation Protocol', ar: 'بروتوكول الحفاظ على العضلات' },
        description: { en: 'High protein + resistance training during deficit', ar: 'بروتين عالي + تمارين مقاومة أثناء العجز' },
        details: {
            en: 'During fat loss: maintain protein at 1.4-1.8 g/kg, deficit ≤750 kcal/day, resistance train 3-4x/week, sleep 7-9 hours. Rate of loss should not exceed 0.5-1% body weight/week to preserve lean mass.',
            ar: 'أثناء خسارة الدهون: حافظ على البروتين 1.4-1.8 جم/كجم، عجز ≤750 سعرة/يوم، تمارين مقاومة 3-4 مرات/أسبوع، نوم 7-9 ساعات. معدل الخسارة لا يتجاوز 0.5-1% من وزن الجسم/أسبوع للحفاظ على الكتلة العضلية.'
        }
    },
    {
        id: 'fat_loss_cycling',
        title: { en: 'Fat-Loss Phase Cycling', ar: 'دورات مراحل خسارة الدهون' },
        description: { en: 'Periodic diet breaks to prevent plateaus', ar: 'فترات راحة دورية لمنع الثبات' },
        details: {
            en: 'Cycle between 4-6 weeks of deficit followed by 1-2 weeks at maintenance calories. This approach prevents metabolic slowdown, reduces psychological fatigue, and maintains hormonal balance (thyroid, cortisol, testosterone).',
            ar: 'تناوب بين 4-6 أسابيع عجز يتبعها 1-2 أسبوع بسعرات الصيانة. هذا الأسلوب يمنع تباطؤ الأيض، يقلل الإرهاق النفسي، ويحافظ على التوازن الهرموني (الغدة الدرقية، الكورتيزول، التستوستيرون).'
        }
    },
    {
        id: 'metabolic_adaptation',
        title: { en: 'Metabolic Adaptation Prevention', ar: 'منع التكيف الأيضي' },
        description: { en: 'Strategies to keep metabolism active', ar: 'استراتيجيات للحفاظ على نشاط الأيض' },
        details: {
            en: 'Signs of adaptation: weight stalls >2 weeks, low energy, cold extremities. Solutions: increase NEAT (walking 8000+ steps), add one refeed day, take a full diet break, reverse diet gradually (+100 kcal/week).',
            ar: 'علامات التكيف: ثبات الوزن >أسبوعين، طاقة منخفضة، برودة الأطراف. الحلول: زيادة الحركة اليومية (8000+ خطوة)، إضافة يوم تعويض، أخذ استراحة كاملة من الدايت، عكس النظام تدريجياً (+100 سعرة/أسبوع).'
        }
    },
    {
        id: 'lean_bulk',
        title: { en: 'Lean Bulk Protocol', ar: 'بروتوكول زيادة الكتلة النظيفة' },
        description: { en: 'Controlled surplus for muscle gain with minimal fat', ar: 'فائض مُتحكم فيه لزيادة العضلات مع أقل دهون' },
        details: {
            en: 'Surplus of 200-400 kcal above TDEE. Protein: 1.6-2.2 g/kg. Progressive overload in training. Targeted weight gain: 0.25-0.5 kg/week. If gaining >0.5 kg/week, reduce surplus. Monthly body composition checks recommended.',
            ar: 'فائض 200-400 سعرة فوق TDEE. بروتين: 1.6-2.2 جم/كجم. زيادة تدريجية في التمرين. الهدف: 0.25-0.5 كجم/أسبوع. إذا زاد عن 0.5 كجم/أسبوع، قلل الفائض. يُنصح بفحص تكوين الجسم شهرياً.'
        }
    }
];
