export interface NutritionPlan {
    status: string;
    message: string;
    action: string;
    mealPlan: {
        breakfast: string[];
        snacks1?: string[];
        lunch: string[];
        snacks2?: string[];
        dinner: string[];
    };
    calorieRange?: { min: number; max: number };
    macros?: {
        proteinPerKg?: number;
        fatPercent?: number;
        carbPercent?: number;
        fiberTarget?: number;
        calciumMg?: number;
        ironMg?: number;
    };
    safetyNotes?: string[];
    parentTips?: string[];
    chokingHazards?: string[];
    textureNotes?: string;
    warning?: string;
    prohibited?: string[];
}

interface AgeGroupData {
    [key: string]: NutritionPlan;
}

interface ClinicalDataStructure {
    under5: { ageGroups: AgeGroupData };
    child: { [key: string]: NutritionPlan };
    adult: { [key: string]: NutritionPlan };
}

export const CLINICAL_DATA: { en: ClinicalDataStructure; ar: ClinicalDataStructure } = {
    ar: {
        under5: {
            ageGroups: {
                "0-6m": {
                    status: "مرحلة الرضاعة الطبيعية الحصرية",
                    message: "في هذا العمر، التغذية تعتمد كليًا على الرضاعة (WHO).",
                    action: "- رضاعة طبيعية حصرية\n- أو لبن صناعي مناسب للعمر",
                    mealPlan: {
                        breakfast: ["رضاعة طبيعية عند الطلب (8-12 مرة/يوم)"],
                        lunch: [],
                        dinner: []
                    },
                    calorieRange: { min: 0, max: 0 },
                    safetyNotes: ["لا يُعطى أي طعام صلب أو سوائل إضافية", "الرضاعة الطبيعية الحصرية هي التوصية العالمية (WHO)"],
                    parentTips: ["تأكدي من رضاعة الطفل 8-12 مرة يوميًا", "راقبي عدد الحفاضات المبللة (6+ يوميًا)"],
                    prohibited: ["ماء", "أعشاب", "فاكهة", "خضار", "بيض", "عسل", "حليب بقري"]
                },
                "6-12m": {
                    status: "بداية التغذية التكميلية",
                    message: "يبدأ الطفل تجربة الطعام بجانب الرضاعة، بقوام مهروس وكميات صغيرة.",
                    action: "- لبن الأم / الصناعي (أساسي)\n- خضار مهروسة\n- فاكهة مهروسة\n- حبوب مدعمة بالحديد",
                    mealPlan: {
                        breakfast: ["حبوب مدعمة بالحديد + لبن الأم", "شوفان مطحون ناعم + لبن الأم"],
                        snacks1: ["صفار بيض مهروس: 2-3 مرات أسبوعيًا"],
                        lunch: ["كوسة + جزر مهروسين", "بطاطس + قرع مهروسين", "عدس مهروس أو لحم مفروم ناعم"],
                        snacks2: ["تفاح مهروس", "كمثرى مهروسة"],
                        dinner: ["زبادي طبيعي", "أرز مهروس + خضار"]
                    },
                    calorieRange: { min: 600, max: 900 },
                    macros: { fatPercent: 40, carbPercent: 50, ironMg: 11, calciumMg: 260 },
                    textureNotes: "مهروس ناعم ثم خشن تدريجيًا لتعلم المضغ",
                    safetyNotes: ["لا عسل قبل عمر سنة", "لا مكسرات كاملة", "لا ملح أو سكر مضاف"],
                    parentTips: ["قدمي طعامًا واحدًا جديدًا كل 3 أيام لمراقبة الحساسية", "استمري بالرضاعة كمصدر أساسي"],
                    chokingHazards: ["مكسرات كاملة", "عنب كامل", "قطع صلبة"],
                    prohibited: ["ملح", "سكر", "عسل", "بيض نيء", "حليب بقري كمشروب رئيسي"]
                },
                "1-3y": {
                    status: "مرحلة الطفل الصغير",
                    message: "الطفل يبدأ الأكل مع الأسرة بطعام صحي وقوام مناسب.",
                    action: "3 وجبات رئيسية + 2 سناك صحي\n1000-1400 سعرة حرارية/يوم",
                    mealPlan: {
                        breakfast: ["بيضة كاملة مسلوقة + ربع رغيف", "جبنة + ربع رغيف", "فول مهروس + ربع رغيف"],
                        snacks1: ["موزة صغيرة", "تفاحة مقشرة ومقطعة ناعم", "زبادي"],
                        lunch: ["أرز + دجاج مفروم + خضار", "مكرونة + لحمة مفرومة + خضار", "بطاطس + عدس + خضار"],
                        snacks2: ["لبن كامل الدسم", "تمرتين"],
                        dinner: ["زبادي + ربع رغيف", "بيض مسلوق", "جبنة + خبز"]
                    },
                    calorieRange: { min: 1000, max: 1400 },
                    macros: { proteinPerKg: 1.1, fatPercent: 35, carbPercent: 50, fiberTarget: 8, calciumMg: 700, ironMg: 7 },
                    textureNotes: "مقطع صغير وناعم، تجنب القطع الكبيرة",
                    safetyNotes: ["لا نظام غذائي مقيد للأطفال", "تجنب المكسرات الكاملة والفشار"],
                    parentTips: ["اجعلي وقت الأكل ممتعًا ولا تجبري الطفل", "قدمي كميات صغيرة ودعيه يطلب المزيد"],
                    chokingHazards: ["مكسرات كاملة", "فشار", "عنب كامل", "حلوى صلبة", "نقانق كاملة"]
                },
                "4-8y": {
                    status: "تغذية ما قبل المدرسة والمدرسة",
                    message: "الطفل يحتاج نظامًا متوازنًا لدعم النمو والطاقة.",
                    action: "3 وجبات رئيسية + 2 سناك صحي\n1200-1800 سعرة حرارية/يوم",
                    mealPlan: {
                        breakfast: ["فول + رغيف صغير", "بيض + رغيف صغير + جبنة"],
                        snacks1: ["فاكهة (تفاح / موز / برتقال)"],
                        lunch: ["أرز + دجاج + خضار", "مكرونة + لحمة + خضار", "بطاطس + سمك + خضار"],
                        snacks2: ["زبادي", "لبن", "تمرتين"],
                        dinner: ["بيض + عيش", "فول + عيش", "جبنة + عيش"]
                    },
                    calorieRange: { min: 1200, max: 1800 },
                    macros: { proteinPerKg: 0.95, fatPercent: 30, carbPercent: 50, fiberTarget: 11, calciumMg: 1000, ironMg: 10 },
                    safetyNotes: ["إدخال الألياف تدريجيًا", "تقليل العصائر المحلاة"],
                    parentTips: ["جهزي وجبة مدرسية صحية", "شجعي شرب الماء بدل العصائر"],
                    prohibited: ["لا دايت للأطفال"]
                },
                "9-13y": {
                    status: "مرحلة ما قبل البلوغ",
                    message: "مرحلة نمو متسارع تحتاج بروتين وكالسيوم أكثر.",
                    action: "زيادة البروتين والكالسيوم\n1600-2200 سعرة حرارية/يوم",
                    mealPlan: {
                        breakfast: ["بيض + عيش + لبن", "فول + عيش + جبنة"],
                        snacks1: ["زبادي + موز", "مكسرات + تمر"],
                        lunch: ["أرز + دجاج مشوي + سلطة كبيرة", "مكرونة + لحمة + خضار سوتيه"],
                        snacks2: ["كوب لبن", "فاكهة + بسكويت شوفان"],
                        dinner: ["تونة + عيش أسمر + سلطة", "بيض أومليت + خضار"]
                    },
                    calorieRange: { min: 1600, max: 2200 },
                    macros: { proteinPerKg: 0.95, fatPercent: 30, carbPercent: 45, fiberTarget: 16, calciumMg: 1300, ironMg: 8 },
                    safetyNotes: ["مراقبة اتجاهات زيادة الوزن", "لا حمية مقيدة بدون إشراف"],
                    parentTips: ["راقبي وزن الطفل شهريًا", "شجعي النشاط البدني اليومي"]
                }
            }
        },
        child: {
            underweight: {
                status: "نحافة",
                message: "وزن الطفل أقل من الطبيعي لعمره، وقد يؤثر على النمو.",
                action: "زيادة السعرات والبروتين بشكل صحي.",
                mealPlan: {
                    breakfast: ["لبن كامل + بيض + عيش", "فول + زيت زيتون + عيش"],
                    snacks1: ["موز", "تمر", "حفنة مكسرات"],
                    lunch: ["أرز + دجاج + خضار", "مكرونة + لحمة + خضار"],
                    snacks2: ["زبادي بالعسل", "عصير طبيعي", "بسكويت شوفان"],
                    dinner: ["بيض + عيش", "فول + عيش", "تونة + عيش"]
                },
                calorieRange: { min: 1800, max: 2800 },
                macros: { proteinPerKg: 1.2, fatPercent: 28, carbPercent: 47, calciumMg: 1300, ironMg: 11 },
                safetyNotes: ["لا حمية مقيدة للمراهقين", "زيادة السعرات تدريجيًا"],
                parentTips: ["أضيفي زيت الزيتون أو المكسرات للوجبات", "5-6 وجبات صغيرة أفضل من 3 كبيرة"]
            },
            healthy: {
                status: "وزن طبيعي",
                message: "الوزن مناسب لعمر الطفل.",
                action: "- تنوع غذائي\n- تقليل السكريات\n- نشاط يومي",
                mealPlan: {
                    breakfast: ["بيض + عيش", "فول + عيش", "جبنة + عيش"],
                    snacks1: ["فاكهة", "زبادي"],
                    lunch: ["نشويات + بروتين + خضار"],
                    snacks2: ["كوب لبن", "فاكهة صغيرة"],
                    dinner: ["زبادي + عيش", "جبنة + خضار"]
                },
                calorieRange: { min: 1800, max: 2800 },
                macros: { proteinPerKg: 1.0, fatPercent: 28, carbPercent: 47, calciumMg: 1300, ironMg: 11 }
            },
            overweight: {
                status: "زيادة في الوزن",
                message: "الوزن أعلى من الطبيعي، التعديل يكون سلوكي وليس دايت.",
                action: "- تقليل السكريات والمقليات\n- زيادة الحركة\n- بدون حرمان",
                mealPlan: {
                    breakfast: ["بيض مسلوق + عيش أسمر", "فول بدون زيت"],
                    snacks1: ["فاكهة واحدة"],
                    lunch: ["دجاج مشوي + خضار + كمية نشويات صغيرة"],
                    snacks2: ["خيار أو جزر", "كوب لبن خالي الدسم"],
                    dinner: ["زبادي", "جبنة قريش + خضار"]
                },
                calorieRange: { min: 1600, max: 2200 },
                macros: { proteinPerKg: 1.0, fatPercent: 25, carbPercent: 50, calciumMg: 1300, ironMg: 11 },
                safetyNotes: ["لا حمية قاسية للأطفال أبدًا", "التركيز على تغيير السلوك لا تقييد السعرات"]
            },
            obese: {
                status: "سمنة",
                message: "الوزن أعلى بكثير من الطبيعي، يحتاج متابعة طبية.",
                action: "- تقليل السكريات والمقليات\n- زيادة الحركة\n- بدون حرمان",
                mealPlan: {
                    breakfast: ["فول بدون زيت", "بيض مسلوق"],
                    snacks1: ["فاكهة واحدة"],
                    lunch: ["دجاج/سمك مشوي + طبق خضار كبير"],
                    snacks2: ["خيار", "كوب لبن خالي الدسم"],
                    dinner: ["زبادي", "شوربة عدس"]
                },
                calorieRange: { min: 1400, max: 2000 },
                macros: { proteinPerKg: 1.0, fatPercent: 25, carbPercent: 50, calciumMg: 1300, ironMg: 11 },
                safetyNotes: ["استشارة طبيب أطفال ضرورية", "لا تقييد حاد للسعرات في مرحلة النمو"],
                warning: "يرجى استشارة طبيب أطفال مختص للمتابعة."
            }
        },
        adult: {
            underweight: {
                status: "نحافة",
                message: "وزنك أقل من المعدل الصحي.",
                action: "- سعرات أعلى من الاحتياج\n- 5–6 وجبات\n- لبن كامل – نشويات – دهون صحية",
                mealPlan: {
                    breakfast: ["لبن كامل + شوفان + موز", "بيض + عيش + زيت زيتون"],
                    snacks1: ["مكسرات", "تمر", "زبادي"],
                    lunch: ["أرز/مكرونة + دجاج/لحمة + خضار"],
                    snacks2: ["زبدة فول سوداني + خبز", "عصير طبيعي"],
                    dinner: ["عدس + عيش أسمر", "فول مدمس + سلطة", "زبادي + لبنة + خبز"]
                },
                calorieRange: { min: 2200, max: 3000 },
                macros: { proteinPerKg: 1.2, fatPercent: 30, carbPercent: 45, fiberTarget: 28, calciumMg: 1000, ironMg: 8 }
            },
            healthy: {
                status: "وزن طبيعي",
                message: "وزنك في النطاق الصحي.",
                action: "- توازن غذائي\n- الحفاظ على النمط",
                mealPlan: {
                    breakfast: ["فول + عيش", "بيض + عيش"],
                    snacks1: ["فاكهة", "زبادي"],
                    lunch: ["نشويات + بروتين + سلطة"],
                    snacks2: ["كوب لبن", "حفنة مكسرات"],
                    dinner: ["عدس + سلطة", "فول + عيش أسمر", "زبادي + لبنة + خضار"]
                },
                calorieRange: { min: 1800, max: 2500 },
                macros: { proteinPerKg: 1.0, fatPercent: 28, carbPercent: 47, fiberTarget: 28, calciumMg: 1000, ironMg: 8 }
            },
            overweight: {
                status: "زيادة وزن",
                message: "زيادة بسيطة قابلة للتحسن.",
                action: "- عجز سعرات خفيف\n- تقليل سكريات",
                mealPlan: {
                    breakfast: ["بيض مسلوق + عيش أسمر"],
                    snacks1: ["فاكهة"],
                    lunch: ["بروتين مشوي + خضار + نشويات محدودة"],
                    snacks2: ["زبادي", "خيار أو جزر"],
                    dinner: ["شوربة عدس", "جبنة قريش + سلطة", "لبنة + خضار + خبز أسمر"]
                },
                calorieRange: { min: 1500, max: 2000 },
                macros: { proteinPerKg: 1.2, fatPercent: 25, carbPercent: 45, fiberTarget: 30, calciumMg: 1000, ironMg: 8 }
            },
            obese: {
                status: "سمنة",
                message: "الوزن قد يؤثر على الصحة على المدى الطويل.",
                action: "- عجز منظم\n- لا أقل من 1200 سعرة\n- إشراف طبي إذا BMI ≥ 35",
                warning: "يرجى استشارة طبيب مختص للمتابعة.",
                mealPlan: {
                    breakfast: ["فول بدون زيت أو بيض مسلوق"],
                    snacks1: ["فاكهة"],
                    lunch: ["دجاج/سمك مشوي + خضار"],
                    snacks2: ["خيار", "كوب لبن خالي الدسم"],
                    dinner: ["زبادي خالي الدسم", "شوربة عدس", "حمص + سلطة"]
                },
                calorieRange: { min: 1200, max: 1800 },
                macros: { proteinPerKg: 1.2, fatPercent: 25, carbPercent: 45, fiberTarget: 30, calciumMg: 1000, ironMg: 8 }
            },
            elderly: {
                status: "كبار السن (65+)",
                message: "احتياجات بروتين أعلى لمنع ضعف العضلات.",
                action: "- بروتين عالي لكل كجم\n- فيتامين د وكالسيوم\n- وجبات صغيرة متكررة",
                mealPlan: {
                    breakfast: ["بيض + جبنة + عيش أسمر", "شوفان + لبن + موز"],
                    snacks1: ["زبادي + تمر", "مكسرات"],
                    lunch: ["سمك مشوي / دجاج + أرز + خضار"],
                    snacks2: ["كوب لبن", "فاكهة"],
                    dinner: ["شوربة عدس + خبز", "زبادي + لبنة + خضار", "جبنة بيضاء + سلطة"]
                },
                calorieRange: { min: 1600, max: 2200 },
                macros: { proteinPerKg: 1.5, fatPercent: 25, carbPercent: 45, fiberTarget: 25, calciumMg: 1200, ironMg: 8 },
                safetyNotes: ["فيتامين د مهم جدًا (قد يحتاج مكملات)", "مراقبة كثافة العظام"]
            }
        }
    },
    en: {
        under5: {
            ageGroups: {
                "0-6m": {
                    status: "Exclusive Breastfeeding Stage",
                    message: "At this age, nutrition relies entirely on breastfeeding/formula (WHO).",
                    action: "- Exclusive breastfeeding\n- Or age-appropriate formula",
                    mealPlan: {
                        breakfast: ["Breastfeeding on demand (8-12 times/day)"],
                        lunch: [],
                        dinner: []
                    },
                    calorieRange: { min: 0, max: 0 },
                    safetyNotes: ["No solid foods or additional liquids", "Exclusive breastfeeding is the global recommendation (WHO)"],
                    parentTips: ["Ensure 8-12 feeds per day", "Monitor wet diapers (6+ daily)"],
                    prohibited: ["Water", "Herbs", "Fruit", "Vegetables", "Eggs", "Honey", "Cow Milk"]
                },
                "6-12m": {
                    status: "Complementary Feeding Introduction",
                    message: "Start introducing solid foods alongside milk. Texture should be mashed/pureed.",
                    action: "- Breastmilk/Formula (Primary)\n- Mashed Veggies\n- Mashed Fruit\n- Iron-fortified cereals",
                    mealPlan: {
                        breakfast: ["Iron-fortified Cereal + Breastmilk", "Fine Oats + Breastmilk"],
                        snacks1: ["Mashed egg yolk: 2-3 times/week"],
                        lunch: ["Mashed Zucchini + Carrots", "Potato + Pumpkin mash", "Mashed lentils or fine minced meat"],
                        snacks2: ["Mashed Apple", "Mashed Pear"],
                        dinner: ["Natural Yogurt", "Mashed rice + vegetables"]
                    },
                    calorieRange: { min: 600, max: 900 },
                    macros: { fatPercent: 40, carbPercent: 50, ironMg: 11, calciumMg: 260 },
                    textureNotes: "Smooth puree progressing to coarse mash for chewing practice",
                    safetyNotes: ["No honey before 1 year", "No whole nuts", "No added salt or sugar"],
                    parentTips: ["Introduce one new food every 3 days to monitor allergies", "Continue breastmilk as primary source"],
                    chokingHazards: ["Whole nuts", "Whole grapes", "Hard pieces"],
                    prohibited: ["Salt", "Sugar", "Honey", "Raw eggs", "Cow milk as main drink"]
                },
                "1-3y": {
                    status: "Toddler Stage",
                    message: "Toddler starts eating with the family (healthy, appropriate texture).",
                    action: "3 Main Meals + 2 Healthy Snacks\n1000-1400 kcal/day",
                    mealPlan: {
                        breakfast: ["Boiled Egg + 1/4 Bread", "Cheese + 1/4 Bread", "Mashed Beans + 1/4 Bread"],
                        snacks1: ["Small banana", "Peeled chopped apple", "Yogurt"],
                        lunch: ["Rice + Minced Chicken + Veggies", "Pasta + Minced Meat + Veggies", "Potato + Lentils + Veggies"],
                        snacks2: ["Whole Milk", "2 Dates"],
                        dinner: ["Yogurt + 1/4 Bread", "Boiled Egg", "Cheese + Bread"]
                    },
                    calorieRange: { min: 1000, max: 1400 },
                    macros: { proteinPerKg: 1.1, fatPercent: 35, carbPercent: 50, fiberTarget: 8, calciumMg: 700, ironMg: 7 },
                    textureNotes: "Soft small pieces, avoid large chunks",
                    safetyNotes: ["No restrictive diets for children", "Avoid whole nuts and popcorn"],
                    parentTips: ["Make mealtimes enjoyable, don't force-feed", "Offer small portions, let them ask for more"],
                    chokingHazards: ["Whole nuts", "Popcorn", "Whole grapes", "Hard candy", "Whole hot dogs"]
                },
                "4-8y": {
                    status: "Pre-school & School Nutrition",
                    message: "Balanced diet needed to support growth and energy.",
                    action: "3 Main Meals + 2 Healthy Snacks\n1200-1800 kcal/day",
                    mealPlan: {
                        breakfast: ["Beans + Small Bread", "Egg + Small Bread + Cheese"],
                        snacks1: ["Fruit (Apple / Banana / Orange)"],
                        lunch: ["Rice + Chicken + Vegetables", "Pasta + Meat + Vegetables", "Potato + Fish + Vegetables"],
                        snacks2: ["Yogurt", "Milk", "2 Dates"],
                        dinner: ["Egg + Bread", "Beans + Bread", "Cheese + Bread"]
                    },
                    calorieRange: { min: 1200, max: 1800 },
                    macros: { proteinPerKg: 0.95, fatPercent: 30, carbPercent: 50, fiberTarget: 11, calciumMg: 1000, ironMg: 10 },
                    safetyNotes: ["Introduce fiber gradually", "Limit sweetened juices"],
                    parentTips: ["Prepare a healthy school lunch box", "Encourage water over juice"],
                    prohibited: ["Strict diets for children"]
                },
                "9-13y": {
                    status: "Pre-Puberty Stage",
                    message: "Rapid growth phase requiring more protein and calcium.",
                    action: "Increase protein and calcium intake\n1600-2200 kcal/day",
                    mealPlan: {
                        breakfast: ["Egg + Bread + Milk", "Beans + Bread + Cheese"],
                        snacks1: ["Yogurt + Banana", "Nuts + Dates"],
                        lunch: ["Rice + Grilled Chicken + Large Salad", "Pasta + Meat + Sautéed Vegetables"],
                        snacks2: ["Glass of Milk", "Fruit + Oat Cookies"],
                        dinner: ["Tuna + Brown Bread + Salad", "Egg Omelette + Vegetables"]
                    },
                    calorieRange: { min: 1600, max: 2200 },
                    macros: { proteinPerKg: 0.95, fatPercent: 30, carbPercent: 45, fiberTarget: 16, calciumMg: 1300, ironMg: 8 },
                    safetyNotes: ["Monitor overweight trends", "No restrictive diets without supervision"],
                    parentTips: ["Monitor weight monthly", "Encourage daily physical activity"]
                }
            }
        },
        child: {
            underweight: {
                status: "Underweight",
                message: "Weight is lower than normal for age, which may affect growth.",
                action: "Focus on healthy calorie and protein increase.",
                mealPlan: {
                    breakfast: ["Whole milk + Egg + Bread", "Beans + Olive Oil + Bread"],
                    snacks1: ["Banana", "Dates", "Handful of Nuts"],
                    lunch: ["Rice + Chicken + Vegetables", "Pasta + Meat + Vegetables"],
                    snacks2: ["Yogurt with Honey", "Fresh Juice", "Oat Cookies"],
                    dinner: ["Egg + Bread", "Beans + Bread", "Tuna + Bread"]
                },
                calorieRange: { min: 1800, max: 2800 },
                macros: { proteinPerKg: 1.2, fatPercent: 28, carbPercent: 47, calciumMg: 1300, ironMg: 11 },
                safetyNotes: ["No restrictive diets for teens", "Increase calories gradually"],
                parentTips: ["Add olive oil or nuts to meals", "5-6 small meals better than 3 large"]
            },
            healthy: {
                status: "Healthy Weight",
                message: "Weight is appropriate for age.",
                action: "- Dietary variety\n- Limit sugars\n- Daily activity",
                mealPlan: {
                    breakfast: ["Egg + Bread", "Beans + Bread", "Cheese + Bread"],
                    snacks1: ["Fruit", "Yogurt"],
                    lunch: ["Carbs + Protein + Salad (Rice/Pasta + Chicken/Fish)"],
                    snacks2: ["Glass of Milk", "Small Fruit"],
                    dinner: ["Yogurt + Bread", "Cheese + Vegetables"]
                },
                calorieRange: { min: 1800, max: 2800 },
                macros: { proteinPerKg: 1.0, fatPercent: 28, carbPercent: 47, calciumMg: 1300, ironMg: 11 }
            },
            overweight: {
                status: "Overweight",
                message: "Weight is higher than normal. Modification should be behavioral, not strict diet.",
                action: "- Reduce sugars/fried foods\n- Increase movement\n- No deprivation",
                mealPlan: {
                    breakfast: ["Boiled Egg + Brown Bread", "Beans (no oil)"],
                    snacks1: ["One Fruit"],
                    lunch: ["Grilled Chicken + Vegetables + Small Carbs", "Fish + Salad + Boiled Potato"],
                    snacks2: ["Cucumber or Carrots", "Low-fat Milk"],
                    dinner: ["Yogurt", "Cottage Cheese + Vegetables"]
                },
                calorieRange: { min: 1600, max: 2200 },
                macros: { proteinPerKg: 1.0, fatPercent: 25, carbPercent: 50, calciumMg: 1300, ironMg: 11 },
                safetyNotes: ["Never apply aggressive calorie restriction to children", "Focus on behavioral change"]
            },
            obese: {
                status: "Obesity",
                message: "Weight is significantly above normal. Requires medical follow-up.",
                action: "- Reduce sugars/fried foods\n- Increase movement\n- No deprivation",
                mealPlan: {
                    breakfast: ["Beans (no oil)", "Boiled Egg"],
                    snacks1: ["One Fruit"],
                    lunch: ["Grilled Chicken/Fish + Large Salad"],
                    snacks2: ["Cucumber", "Low-fat Milk"],
                    dinner: ["Yogurt", "Lentil Soup"]
                },
                calorieRange: { min: 1400, max: 2000 },
                macros: { proteinPerKg: 1.0, fatPercent: 25, carbPercent: 50, calciumMg: 1300, ironMg: 11 },
                safetyNotes: ["Pediatric consultation essential", "No severe calorie restriction during growth"],
                warning: "Please consult a pediatrician for monitoring."
            }
        },
        adult: {
            underweight: {
                status: "Underweight",
                message: "Your weight is below the healthy range.",
                action: "- Surplus calories\n- 5–6 meals\n- Whole milk – Carbs – Healthy Fats",
                mealPlan: {
                    breakfast: ["Whole milk + Oats + Banana", "Eggs + Bread + Olive Oil"],
                    snacks1: ["Nuts", "Dates", "Yogurt"],
                    lunch: ["Rice/Pasta + Chicken/Meat + Vegetables"],
                    snacks2: ["Peanut butter + Bread", "Fresh Juice"],
                    dinner: ["Lentil Soup + Brown Bread", "Beans + Salad", "Yogurt + Labneh + Bread"]
                },
                calorieRange: { min: 2200, max: 3000 },
                macros: { proteinPerKg: 1.2, fatPercent: 30, carbPercent: 45, fiberTarget: 28, calciumMg: 1000, ironMg: 8 }
            },
            healthy: {
                status: "Healthy Weight",
                message: "Your weight is in the healthy range.",
                action: "- Balanced diet\n- Maintain lifestyle",
                mealPlan: {
                    breakfast: ["Beans + Bread", "Eggs + Bread"],
                    snacks1: ["Fruit", "Yogurt"],
                    lunch: ["Carbs + Protein + Salad"],
                    snacks2: ["Glass of Milk", "Handful of Nuts"],
                    dinner: ["Lentils + Salad", "Beans + Brown Bread", "Yogurt + Labneh + Vegetables"]
                },
                calorieRange: { min: 1800, max: 2500 },
                macros: { proteinPerKg: 1.0, fatPercent: 28, carbPercent: 47, fiberTarget: 28, calciumMg: 1000, ironMg: 8 }
            },
            overweight: {
                status: "Overweight",
                message: "Slight increase above healthy range.",
                action: "- Slight calorie deficit\n- Reduce sugars",
                mealPlan: {
                    breakfast: ["Boiled Egg + Brown Bread"],
                    snacks1: ["Fruit"],
                    lunch: ["Grilled Protein + Vegetables + Limited Carbs"],
                    snacks2: ["Yogurt", "Cucumber or Carrots"],
                    dinner: ["Lentil Soup", "Cottage Cheese + Salad", "Labneh + Vegetables + Brown Bread"]
                },
                calorieRange: { min: 1500, max: 2000 },
                macros: { proteinPerKg: 1.2, fatPercent: 25, carbPercent: 45, fiberTarget: 30, calciumMg: 1000, ironMg: 8 }
            },
            obese: {
                status: "Obesity",
                message: "Weight may affect long-term health.",
                action: "- Structured deficit\n- Not less than 1200 kcal\n- Medical supervision if BMI ≥ 35",
                warning: "Please consult a doctor for monitoring.",
                mealPlan: {
                    breakfast: ["Beans (no oil) or Boiled Egg"],
                    snacks1: ["Fruit"],
                    lunch: ["Grilled Chicken/Fish + Vegetables"],
                    snacks2: ["Cucumber", "Low-fat Milk"],
                    dinner: ["Low-fat Yogurt", "Lentil Soup", "Hummus + Salad"]
                },
                calorieRange: { min: 1200, max: 1800 },
                macros: { proteinPerKg: 1.2, fatPercent: 25, carbPercent: 45, fiberTarget: 30, calciumMg: 1000, ironMg: 8 }
            },
            elderly: {
                status: "Elderly (65+)",
                message: "Higher protein needs to prevent sarcopenia (muscle wasting).",
                action: "- High protein per kg\n- Vitamin D & Calcium emphasis\n- Frequent small meals",
                mealPlan: {
                    breakfast: ["Egg + Cheese + Brown Bread", "Oats + Milk + Banana"],
                    snacks1: ["Yogurt + Dates", "Nuts"],
                    lunch: ["Grilled Fish / Chicken + Rice + Vegetables"],
                    snacks2: ["Glass of Milk", "Fruit"],
                    dinner: ["Lentil Soup + Bread", "Yogurt + Labneh + Vegetables", "White Cheese + Salad"]
                },
                calorieRange: { min: 1600, max: 2200 },
                macros: { proteinPerKg: 1.5, fatPercent: 25, carbPercent: 45, fiberTarget: 25, calciumMg: 1200, ironMg: 8 },
                safetyNotes: ["Vitamin D supplementation often needed", "Monitor bone density"]
            }
        }
    }
};
