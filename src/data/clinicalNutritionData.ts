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
        // Infant & Young Child Feeding (0-5 Years)
        under5: {
            ageGroups: {
                "0-6m": {
                    status: "مرحلة الرضاعة الطبيعية",
                    message: "في هذا العمر، التغذية تعتمد كليًا على الرضاعة، ولا يُنصح بإدخال أي طعام آخر.",
                    action: "- رضاعة طبيعية حصرية\n- أو لبن صناعي مناسب للعمر",
                    mealPlan: {
                        breakfast: ["رضاعة طبيعية عند الطلب", "أو لبن صناعي مناسب للعمر حسب الإرشادات"],
                        lunch: [],
                        dinner: []
                    },
                    prohibited: ["ماء", "أعشاب", "فاكهة", "خضار", "بيض", "عسل"]
                },
                "6-8m": {
                    status: "بداية إدخال الطعام",
                    message: "يبدأ الطفل تجربة الطعام بجانب الرضاعة، بقوام مهروس وكميات صغيرة.",
                    action: "- لبن الأم / الصناعي (أساسي)\n- خضار مهروس (كوسة – جزر)\n- فاكهة مهروسة (تفاح – كمثرى)\n- حبوب مدعمة بالحديد",
                    mealPlan: {
                        breakfast: ["الرضاعة: حسب الطلب"],
                        lunch: ["كوسة مهروسة", "جزر مهروس", "بطاطس مهروسة"],
                        dinner: ["تفاح مهروس", "كمثرى مهروسة", "موز مهروس"]
                    },
                    prohibited: ["ملح", "سكر", "عسل", "بيض كامل"]
                },
                "9-11m": {
                    status: "تطور القوام",
                    message: "الطفل يتعلم المضغ ويحتاج تنويعًا تدريجيًا.",
                    action: "تقديم طعام مهروس خشن أو قطع صغيرة جدًا لتعلم المضغ.",
                    mealPlan: {
                        breakfast: ["حبوب مدعمة بالحديد + لبن الأم", "شوفان مطحون ناعم + لبن الأم"],
                        lunch: ["كوسة + جزر مهروسين", "بطاطس + قرع مهروسين", "+ إضافة: عدس مهروس أو فول مهروس أو لحم مفروم ناعم"],
                        dinner: ["فاكهة مهروسة", "زبادي طبيعي"],
                        snacks1: ["صفار بيض مهروس: 2–3 مرات أسبوعيًا"]
                    },
                    prohibited: ["مكسرات كاملة", "قطع صلبة", "ملح", "سكر"]
                },
                "12-24m": {
                    status: "أكل الأسرة",
                    message: "الطفل يبدأ الأكل مع الأسرة بطعام صحي وقوام مناسب.",
                    action: "طعام الأسرة قليل الملح والبهارات.",
                    mealPlan: {
                        breakfast: ["بيضة كاملة مسلوقة + ربع رغيف", "جبنة + ربع رغيف", "فول مهروس + ربع رغيف"],
                        snacks1: ["موزة صغيرة", "تفاحة مقشرة ومقطعة ناعم", "زبادي"],
                        lunch: ["أرز + دجاج مفروم + خضار", "مكرونة + لحمة مفرومة + خضار", "بطاطس + عدس + خضار"],
                        dinner: ["لبن كامل الدسم", "زبادي", "بيض مسلوق"]
                    }
                },
                "2-5y": {
                    status: "تغذية ما قبل المدرسة",
                    message: "الطفل يحتاج نظامًا متوازنًا لدعم النمو والطاقة.",
                    action: " 3 وجبات رئيسية + 2 سناك صحي.",
                    mealPlan: {
                        breakfast: ["فول + رغيف صغير", "بيض + رغيف صغير", "جبنة + رغيف صغير"],
                        snacks1: ["فاكهة (تفاح / موز / برتقال)"],
                        lunch: ["أرز + دجاج + خضار", "مكرونة + لحمة + خضار", "بطاطس + سمك + خضار"],
                        snacks2: ["زبادي", "لبن", "تمرتين"],
                        dinner: ["بيض", "فول", "جبنة + عيش"]
                    },
                    prohibited: ["لا دايت للأطفال"]
                }
            }
        },

        // Children 5-18 Years
        child: {
            underweight: {
                status: "نحافة",
                message: "وزن الطفل أقل من الطبيعي لعمره، وده قد يؤثر على النمو.",
                action: "زيادة السعرات والبروتين بشكل صحي.",
                mealPlan: {
                    breakfast: ["لبن كامل + بيض + عيش", "فول + زيت زيتون + عيش", "جبنة + عيش + لبن"],
                    snacks1: ["موز", "تمر", "حفنة مكسرات"],
                    lunch: ["أرز + دجاج + خضار", "مكرونة + لحمة + خضار", "بطاطس + سمك + سلطة"],
                    snacks2: ["زبادي بالعسل", "عصير طبيعي", "بسكويت شوفان"],
                    dinner: ["بيض + عيش", "فول + عيش", "تونة + عيش"]
                }
            },
            healthy: {
                status: "وزن طبيعي",
                message: "الوزن مناسب لعمر الطفل.",
                action: "- تنوع غذائي\n- تقليل السكريات\n- نشاط يومي",
                mealPlan: {
                    breakfast: ["بيض + عيش", "فول + عيش", "جبنة + عيش"],
                    snacks1: ["فاكهة", "زبادي"],
                    lunch: ["نشويات + بروتين + خضار (أرز/مكرونة + دجاج/سمك + سلطة)"],
                    dinner: ["بيض", "تونة", "زبادي + عيش"]
                }
            },
            overweight: {
                status: "زيادة في الوزن",
                message: "الوزن أعلى من الطبيعي، والتعديل يكون سلوكي وليس دايت.",
                action: "- تقليل السكريات والمقليات\n- زيادة الحركة\n- بدون حرمان",
                mealPlan: {
                    breakfast: ["بيض مسلوق + عيش أسمر", "فول بدون زيت"],
                    snacks1: ["فاكهة واحدة"],
                    lunch: ["دجاج مشوي + خضار + كمية نشويات صغيرة", "سمك + سلطة + بطاطس مسلوقة"],
                    dinner: ["زبادي", "بيض مسلوق"]
                }
            },
            obese: {
                status: "سمنة",
                message: "الوزن أعلى من الطبيعي، والتعديل يكون سلوكي وليس دايت.",
                action: "- تقليل السكريات والمقليات\n- زيادة الحركة\n- بدون حرمان",
                mealPlan: {
                    breakfast: ["فول بدون زيت", "بيض مسلوق"],
                    lunch: ["دجاج/سمك مشوي + طبق خضار كبير"],
                    snacks1: ["فاكهة واحدة"],
                    dinner: ["زبادي", "شوربة خضار"]
                }
            }
        },

        // Adults (18+)
        adult: {
            underweight: {
                status: "نحافة",
                message: "وزنك أقل من المعدل الصحي.",
                action: "- سعرات أعلى من الاحتياج\n- 5–6 وجبات\n- لبن كامل – نشويات – دهون صحية",
                mealPlan: {
                    breakfast: ["لبن كامل + شوفان + موز", "بيض + عيش + زيت زيتون"],
                    snacks1: ["مكسرات", "تمر", "زبادي"],
                    lunch: ["أرز/مكرونة + دجاج/لحمة + خضار"],
                    dinner: ["بيض", "فول", "تونة + عيش"]
                }
            },
            healthy: {
                status: "وزن طبيعي",
                message: "وزنك في النطاق الصحي.",
                action: "- توازن غذائي\n- الحفاظ على النمط",
                mealPlan: {
                    breakfast: ["فول + عيش", "بيض + عيش"],
                    lunch: ["نشويات + بروتين + سلطة"],
                    dinner: ["خفيف ومحدد: بيض، تونة، أو زبادي"]
                }
            },
            overweight: {
                status: "زيادة وزن",
                message: "زيادة بسيطة قابلة للتحسن.",
                action: "- عجز سعرات خفيف\n- تقليل سكريات",
                mealPlan: {
                    breakfast: ["بيض مسلوق + عيش أسمر"],
                    snacks1: ["فاكهة"],
                    lunch: ["بروتين مشوي + خضار + نشويات محدودة"],
                    snacks2: ["زبادي + شوربة خضار"],
                    dinner: []
                }
            },
            obese: {
                status: "سمنة",
                message: "الوزن قد يؤثر على الصحة على المدى الطويل.",
                action: "- عجز منظم\n- لا أقل من 1200 kcal\n- إشراف طبي إذا BMI ≥ 35",
                warning: "يرجى استشارة طبيب مختص للمتابعة.",
                mealPlan: {
                    breakfast: ["فول بدون زيت أو بيض مسلوق"],
                    lunch: ["دجاج/سمك مشوي + خضار"],
                    snacks1: ["فاكهة"],
                    dinner: ["زبادي أو شوربة خضار"]
                }
            }
        }
    },
    en: {
        // Infant & Young Child Feeding (0-5 Years)
        under5: {
            ageGroups: {
                "0-6m": {
                    status: "Exclusive Breastfeeding Stage",
                    message: "At this age, nutrition relies entirely on breastfeeding/formula. No solid food is recommended.",
                    action: "- Exclusive breastfeeding\n- Or age-appropriate formula",
                    mealPlan: {
                        breakfast: ["Breastfeeding on demand", "Or Formula milk as per instructions"],
                        lunch: [],
                        dinner: []
                    },
                    prohibited: ["Water", "Herbs", "Fruit", "Vegetables", "Eggs", "Honey"]
                },
                "6-8m": {
                    status: "Introduction to Solids",
                    message: "Start introducing solid foods alongside milk. Texture should be mashed/pureed in small amounts.",
                    action: "- Breastmilk/Formula (Primary)\n- Mashed Veggies (Zucchini, Carrots)\n- Mashed Fruit (Apple, Pear)\n- Iron-fortified cereals",
                    mealPlan: {
                        breakfast: ["Milk: On demand"],
                        lunch: ["Mashed Zucchini", "Mashed Carrots", "Mashed Potato"],
                        dinner: ["Mashed Apple", "Mashed Pear", "Mashed Banana"]
                    },
                    prohibited: ["Salt", "Sugar", "Honey", "Whole Eggs", "Cow Milk"]
                },
                "9-11m": {
                    status: "Texture Progression",
                    message: "Baby is learning to chew and needs gradual variety.",
                    action: "Offer coarse mashed food or very small soft pieces.",
                    mealPlan: {
                        breakfast: ["Iron-fortified Cereal + Milk", "Fine Oats + Milk"],
                        lunch: ["Mashed Zucchini + Carrots", "Potato + Pumpkin mash", "+ Add: Mashed lentils/beans or fine minced meat"],
                        dinner: ["Mashed Fruit", "Natural Yogurt"],
                        snacks1: ["Mashed Egg yolk: 2–3 times/week"]
                    },
                    prohibited: ["Whole Nuts", "Hard pieces", "Salt", "Sugar"]
                },
                "12-24m": {
                    status: "Family Foods",
                    message: "Toddler starts eating with the family (healthy, appropriate texture).",
                    action: "Family food with low salt/spices.",
                    mealPlan: {
                        breakfast: ["Boiled Egg + 1/4 Bread", "Cheese + 1/4 Bread", "Mashed Beans + 1/4 Bread"],
                        snacks1: ["Small banana", "Peeled chopped apple", "Yogurt"],
                        lunch: ["Rice + Minced Chicken + Veggies", "Pasta + Minced Meat + Veggies"],
                        dinner: ["Whole Milk", "Yogurt", "Boiled Egg"]
                    }
                },
                "2-5y": {
                    status: "Preschooler Nutrition",
                    message: "Balanced diet needed to support growth and energy.",
                    action: "3 Main Meals + 2 Healthy Snacks.",
                    mealPlan: {
                        breakfast: ["Beans + Small Bread", "Egg + Small Bread", "Cheese + Small Bread"],
                        snacks1: ["Fruit (Apple / Banana / Orange)"],
                        lunch: ["Rice + Chicken + Vegetables", "Pasta + Meat + Vegetables", "Potato + Fish + Vegetables"],
                        snacks2: ["Yogurt", "Milk", "2 Dates"],
                        dinner: ["Egg", "Beans", "Cheese + Bread"]
                    },
                    prohibited: ["Strict diets for children"]
                }
            }
        },

        // Children 5-18 Years
        child: {
            underweight: {
                status: "Underweight",
                message: "Weight is lower than normal for age, which may affect growth.",
                action: "Focus on healthy calorie and protein increase.",
                mealPlan: {
                    breakfast: ["Whole milk + Egg + Bread", "Beans + Olive Oil + Bread", "Cheese + Bread + Milk"],
                    snacks1: ["Banana", "Dates", "Handful of Nuts"],
                    lunch: ["Rice + Chicken + Vegetables", "Pasta + Meat + Vegetables"],
                    snacks2: ["Yogurt with Honey", "Fresh Juice", "Oat Cookies"],
                    dinner: ["Egg + Bread", "Beans + Bread", "Tuna + Bread"]
                }
            },
            healthy: {
                status: "Healthy Weight",
                message: "Weight is appropriate for age.",
                action: "- Dietary variety\n- Limit sugars\n- Daily activity",
                mealPlan: {
                    breakfast: ["Egg + Bread", "Beans + Bread", "Cheese + Bread"],
                    snacks1: ["Fruit", "Yogurt"],
                    lunch: ["Carbs + Protein + Salad (Rice/Pasta + Chicken/Fish)"],
                    dinner: ["Egg", "Tuna", "Yogurt + Bread"]
                }
            },
            overweight: {
                status: "Overweight",
                message: "Weight is higher than normal. Modification should be behavioral, not strict diet.",
                action: "- Reduce sugars/fried foods\n- Increase movement\n- No deprivation",
                mealPlan: {
                    breakfast: ["Boiled Egg + Brown Bread", "Beans (no oil)"],
                    snacks1: ["One Fruit"],
                    lunch: ["Grilled Chicken + Vegetables + Small Carbs", "Fish + Salad + Boiled Potato"],
                    dinner: ["Yogurt", "Boiled Egg"]
                }
            },
            obese: {
                status: "Obesity",
                message: "Weight is significantly above normal. Behavioral modification required.",
                action: "- Reduce sugars/fried foods\n- Increase movement\n- No deprivation",
                mealPlan: {
                    breakfast: ["Beans (no oil)", "Boiled Egg"],
                    lunch: ["Grilled Chicken/Fish + Large Salad"],
                    snacks1: ["One Fruit"],
                    dinner: ["Yogurt", "Vegetable Soup"]
                }
            }
        },

        // Adults (18+)
        adult: {
            underweight: {
                status: "Underweight",
                message: "Your weight is below the healthy range.",
                action: "- Surplus calories\n- 5–6 meals\n- Whole milk – Carbs – Healthy Fats",
                mealPlan: {
                    breakfast: ["Whole milk + Oats + Banana", "Eggs + Bread + Olive Oil"],
                    snacks1: ["Nuts", "Dates", "Yogurt"],
                    lunch: ["Rice/Pasta + Chicken/Meat + Vegetables"],
                    dinner: ["Eggs", "Beans", "Tuna + Bread"]
                }
            },
            healthy: {
                status: "Healthy Weight",
                message: "Your weight is in the healthy range.",
                action: "- Balanced diet\n- Maintain lifestyle",
                mealPlan: {
                    breakfast: ["Beans + Bread", "Eggs + Bread"],
                    lunch: ["Carbs + Protein + Salad"],
                    dinner: ["Light: Eggs, Tuna, or Yogurt"]
                }
            },
            overweight: {
                status: "Overweight",
                message: "Slight increase above healthy range.",
                action: "- Slight calorie deficit\n- Reduce sugars",
                mealPlan: {
                    breakfast: ["Boiled Egg + Brown Bread"],
                    snacks1: ["Fruit"],
                    lunch: ["Grilled Protein + Vegetables + Limited Carbs"],
                    snacks2: ["Yogurt + Vegetable Soup"],
                    dinner: []
                }
            },
            obese: {
                status: "Obesity",
                message: "Weight may affect long-term health.",
                action: "- Structured deficit\n- Not less than 1200 kcal\n- Medical supervision if BMI ≥ 35",
                warning: "Please consult a doctor for monitoring.",
                mealPlan: {
                    breakfast: ["Beans (no oil) or Boiled Egg"],
                    lunch: ["Grilled Chicken/Fish + Vegetables"],
                    snacks1: ["Fruit"],
                    dinner: ["Yogurt or Vegetable Soup"]
                }
            }
        }
    }
};
