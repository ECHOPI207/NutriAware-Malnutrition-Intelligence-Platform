export interface ProgramItem {
    type: 'article' | 'story' | 'tool';
    id: string | number;
    title_ar: string;
    title_en: string;
    link: string;
    reading_time?: number;
}

export interface ProgramWeek {
    week: number;
    goal_ar: string;
    goal_en: string;
    items: ProgramItem[];
    estimated_minutes: number;
}

export const programWeeks: ProgramWeek[] = [
    {
        week: 1,
        goal_ar: 'فهم أساسيات سلامة الغذاء — المفاتيح الخمسة وتطبيق HACCP في المنزل',
        goal_en: 'Understand food safety basics — the Five Keys and applying HACCP at home',
        items: [
            { type: 'article', id: 1, title_ar: 'المفاتيح الخمسة لغذاء آمن', title_en: 'The Five Keys to Safer Food', link: '/knowledge/five-keys-to-safer-food', reading_time: 4 },
            { type: 'article', id: 2, title_ar: 'مبادئ HACCP في مطبخك', title_en: 'HACCP Principles in Your Kitchen', link: '/knowledge/haccp-principles-in-your-kitchen', reading_time: 4 },
            { type: 'article', id: 3, title_ar: 'التلوث المتبادل وتخزين الطعام', title_en: 'Cross-Contamination & Food Storage', link: '/knowledge/cross-contamination-and-food-storage', reading_time: 3 },
            { type: 'tool', id: 'fs-assess', title_ar: 'أداة تقييم سلامة الغذاء المنزلي', title_en: 'Home Food Safety Assessment', link: '/assessment?tab=food-safety' },
            { type: 'story', id: 'story-1', title_ar: 'قصة: في صباح يومٍ جميل', title_en: 'Story: On a Beautiful Morning', link: '/stories/beautiful-morning', reading_time: 5 },
        ],
        estimated_minutes: 20,
    },
    {
        week: 2,
        goal_ar: 'إتمام محور سلامة الغذاء — الأمراض المنقولة وغسل اليدين',
        goal_en: 'Complete the food safety axis — foodborne diseases and handwashing',
        items: [
            { type: 'article', id: 4, title_ar: 'الأمراض المنقولة بالغذاء عند الأطفال', title_en: 'Foodborne Diseases in Children', link: '/knowledge/foodborne-diseases-in-children', reading_time: 4 },
            { type: 'article', id: 5, title_ar: 'غسل اليدين وغسل الأطعمة', title_en: 'Handwashing & Food Washing', link: '/knowledge/handwashing-and-food-washing', reading_time: 3 },
            { type: 'story', id: 'story-2', title_ar: 'قصة: مي والانش بوكس السحري', title_en: 'Story: Mai and the Magic Lunchbox', link: '/stories/mai-magic-lunchbox', reading_time: 5 },
        ],
        estimated_minutes: 12,
    },
    {
        week: 3,
        goal_ar: 'بدء محور التغذية المتوازنة — الطبق المتوازن والمغذيات الكبرى',
        goal_en: 'Start the balanced nutrition axis — balanced plate and macronutrients',
        items: [
            { type: 'article', id: 6, title_ar: 'طبق الطفل المتوازن', title_en: 'The Balanced Child\'s Plate', link: '/knowledge/the-balanced-childs-plate', reading_time: 4 },
            { type: 'article', id: 7, title_ar: 'الكربوهيدرات والبروتين والدهون', title_en: 'Carbohydrates, Protein & Fats', link: '/knowledge/carbohydrates-protein-and-fats', reading_time: 5 },
            { type: 'article', id: 8, title_ar: 'الإفطار الصحي والسناكس الذكية', title_en: 'Healthy Breakfast & Smart Snacks', link: '/knowledge/healthy-breakfast-and-smart-snacks', reading_time: 4 },
            { type: 'tool', id: 'growth-assess', title_ar: 'أداة تقييم نمو الطفل والمؤشرات الصحية', title_en: 'Child Growth & Health Assessment', link: '/assessment?tab=child' },
        ],
        estimated_minutes: 20,
    },
    {
        week: 4,
        goal_ar: 'إتمام محور التغذية المتوازنة — البطاقة الغذائية وسمنة الأطفال',
        goal_en: 'Complete balanced nutrition — nutrition labels and childhood obesity',
        items: [
            { type: 'article', id: 9, title_ar: 'كيف تقرأ البطاقة الغذائية', title_en: 'How to Read Nutrition Labels', link: '/knowledge/how-to-read-nutrition-labels', reading_time: 4 },
            { type: 'article', id: 10, title_ar: 'سمنة الأطفال', title_en: 'Childhood Obesity', link: '/knowledge/childhood-obesity', reading_time: 5 },
            { type: 'tool', id: 'bmi-calc', title_ar: 'حاسبة مؤشر كتلة الجسم (BMI) والسعرات', title_en: 'BMI & Calorie Calculator', link: '/assessment?tab=bmi' },
            { type: 'tool', id: 'meal-planner-bmi', title_ar: 'مخطط الوجبات الذكي حسب الوزن', title_en: 'AI Meal Planner by Weight', link: '/ai-tools?tab=bmi-calculator' },
        ],
        estimated_minutes: 25,
    },
    {
        week: 5,
        goal_ar: 'بدء محور المغذيات الدقيقة — الحديد وفيتامين أ والزنك والكالسيوم',
        goal_en: 'Start micronutrients axis — Iron, Vitamin A, Zinc, and Calcium',
        items: [
            { type: 'article', id: 11, title_ar: 'أنيميا نقص الحديد عند الأطفال', title_en: 'Iron Deficiency Anemia in Children', link: '/knowledge/iron-deficiency-anemia-in-children', reading_time: 5 },
            { type: 'article', id: 12, title_ar: 'فيتامين أ والزنك — حارسا المناعة والنمو', title_en: 'Vitamin A & Zinc — Guardians of Immunity', link: '/knowledge/vitamin-a-and-zinc', reading_time: 4 },
            { type: 'article', id: 13, title_ar: 'الكالسيوم وفيتامين د — بناء عظام قوية', title_en: 'Calcium & Vitamin D — Building Strong Bones', link: '/knowledge/calcium-and-vitamin-d', reading_time: 4 },
            { type: 'article', id: 14, title_ar: 'اليود — المعدن الخفي الذي يحمي ذكاء طفلك', title_en: 'Iodine — The Hidden Mineral That Protects Intelligence', link: '/knowledge/iodine-the-hidden-mineral', reading_time: 3 },
            { type: 'tool', id: 'condition-planner', title_ar: 'مخطط الوجبات للحالات الصحية (أنيميا، نقص فيتامينات)', title_en: 'Clinical Condition Meal Planner', link: '/ai-tools?tab=meal-generator' },
        ],
        estimated_minutes: 23,
    },
    {
        week: 6,
        goal_ar: 'إتمام المحور الأخير — التنوع الغذائي والتغذية حسب العمر والملخص الشامل',
        goal_en: 'Complete the final axis — dietary diversity, age-based nutrition, and comprehensive summary',
        items: [
            { type: 'article', id: 15, title_ar: 'التنوع الغذائي — سر التغذية الكاملة', title_en: 'Dietary Diversity — The Secret to Complete Nutrition', link: '/knowledge/dietary-diversity', reading_time: 4 },
            { type: 'article', id: 16, title_ar: 'تغذية الطفل حسب العمر', title_en: 'Child Nutrition by Age', link: '/knowledge/child-nutrition-by-age', reading_time: 3 },
            { type: 'article', id: 17, title_ar: 'نقص التغذية مقابل فرط التغذية', title_en: 'Undernutrition vs Overnutrition', link: '/knowledge/undernutrition-vs-overnutrition', reading_time: 4 },
            { type: 'article', id: 18, title_ar: 'ملخص المغذيات الدقيقة', title_en: 'Micronutrient Summary', link: '/knowledge/micronutrient-summary-reference', reading_time: 3 },
            { type: 'tool', id: 'dds-assess', title_ar: 'مقياس التنوع الغذائي (DDS) لطفلك', title_en: 'Dietary Diversity Score Assessment', link: '/assessment?tab=dds' },
            { type: 'tool', id: 'meal-analyzer', title_ar: 'محلل الوجبات الذكي (أداة بحثية)', title_en: 'Smart Meal Analyzer (Research Tool)', link: '/ai-tools?tab=meal-analyzer' },
            { type: 'tool', id: 'final-survey', title_ar: 'استبيان تقييم البرنامج النهائي', title_en: 'Final Program Evaluation Survey', link: '/project-evaluation' },
        ],
        estimated_minutes: 25,
    },
];
