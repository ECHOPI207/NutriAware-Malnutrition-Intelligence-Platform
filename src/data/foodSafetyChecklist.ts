// WHO Five Keys to Safer Food — Checklist items derived from Article 1 content ONLY
export interface ChecklistItem {
    id: string;
    text_ar: string;
    text_en: string;
}

export interface FoodSafetyKey {
    id: number;
    title_ar: string;
    title_en: string;
    icon: string;
    items: ChecklistItem[];
    tip_ar: string;
    tip_en: string;
}

export const foodSafetyKeys: FoodSafetyKey[] = [
    {
        id: 1,
        title_ar: 'الحفاظ على النظافة',
        title_en: 'Keep Clean',
        icon: 'hand',
        items: [
            { id: 'k1_1', text_ar: 'أغسل يدي بالماء والصابون لمدة 20 ثانية قبل لمس الطعام', text_en: 'I wash my hands with soap and water for 20 seconds before touching food' },
            { id: 'k1_2', text_ar: 'أغسل يدي بعد استخدام المرحاض', text_en: 'I wash my hands after using the toilet' },
            { id: 'k1_3', text_ar: 'أغسل يدي بعد لمس الحيوانات الأليفة', text_en: 'I wash my hands after touching pets' },
            { id: 'k1_4', text_ar: 'أنظّف جميع الأسطح والأدوات المستخدمة في تحضير الطعام بالماء الساخن والصابون', text_en: 'I clean all surfaces and utensils used in food preparation with hot water and soap' },
            { id: 'k1_5', text_ar: 'أغسل يدي بعد العطس أو السعال', text_en: 'I wash my hands after sneezing or coughing' },
        ],
        tip_ar: 'الكائنات الدقيقة الخطرة توجد في التربة والمياه والحيوانات والبشر، وتنتقل بسهولة عبر اليدين والأدوات وأسطح التحضير.',
        tip_en: 'Dangerous microorganisms are found in soil, water, animals, and people, and are easily transferred via hands, utensils, and preparation surfaces.',
    },
    {
        id: 2,
        title_ar: 'فصل الأطعمة النيئة عن المطبوخة',
        title_en: 'Separate Raw and Cooked',
        icon: 'split',
        items: [
            { id: 'k2_1', text_ar: 'أفصل اللحوم النيئة والدواجن والأسماك عن الأطعمة الأخرى أثناء التسوّق', text_en: 'I separate raw meat, poultry, and fish from other foods during shopping' },
            { id: 'k2_2', text_ar: 'أستخدم ألواح تقطيع وسكاكين منفصلة للحوم النيئة', text_en: 'I use separate cutting boards and knives for raw meat' },
            { id: 'k2_3', text_ar: 'أحفظ الأطعمة في أوعية مغلقة لمنع التلامس بين النيئ والمطبوخ', text_en: 'I store foods in sealed containers to prevent contact between raw and cooked' },
            { id: 'k2_4', text_ar: 'أضع اللحوم النيئة في الرف السفلي من الثلاجة', text_en: 'I keep raw meat on the bottom shelf of the fridge' },
        ],
        tip_ar: 'اللحوم النيئة قد تحتوي على بكتيريا مثل السالمونيلا والإيكولاي التي تنتقل عبر التلوث المتبادل.',
        tip_en: 'Raw meat may contain bacteria such as Salmonella and E. coli that spread through cross-contamination.',
    },
    {
        id: 3,
        title_ar: 'الطهي الجيد',
        title_en: 'Cook Thoroughly',
        icon: 'flame',
        items: [
            { id: 'k3_1', text_ar: 'أطهو الطعام جيداً وخاصة اللحوم والدواجن والبيض', text_en: 'I cook food thoroughly, especially meat, poultry, and eggs' },
            { id: 'k3_2', text_ar: 'أتأكد من وصول درجة الحرارة الداخلية للحوم إلى 70°م على الأقل', text_en: 'I ensure the internal temperature of meat reaches at least 70°C' },
            { id: 'k3_3', text_ar: 'أعيد تسخين الطعام المطبوخ جيداً حتى الغليان', text_en: 'I reheat cooked food thoroughly until boiling' },
            { id: 'k3_4', text_ar: 'أتحقق من أن اللحوم والدواجن لا تحتوي على أجزاء نيئة وردية اللون', text_en: 'I check that meat and poultry have no raw pink parts' },
        ],
        tip_ar: 'الطهي السليم يقتل جميع الكائنات الدقيقة الخطرة تقريباً.',
        tip_en: 'Proper cooking kills virtually all dangerous microorganisms.',
    },
    {
        id: 4,
        title_ar: 'حفظ الطعام في درجات حرارة آمنة',
        title_en: 'Keep Food at Safe Temperatures',
        icon: 'thermometer',
        items: [
            { id: 'k4_1', text_ar: 'لا أترك الطعام المطبوخ في درجة حرارة الغرفة لأكثر من ساعتين', text_en: 'I don\'t leave cooked food at room temperature for more than 2 hours' },
            { id: 'k4_2', text_ar: 'أحفظ الأطعمة المطبوخة والقابلة للتلف في الثلاجة (تحت 5°م)', text_en: 'I store cooked and perishable foods in the fridge (below 5°C)' },
            { id: 'k4_3', text_ar: 'لا أخزّن الطعام لفترات طويلة حتى في الثلاجة', text_en: 'I don\'t store food for extended periods even in the fridge' },
            { id: 'k4_4', text_ar: 'أتأكد أن درجة حرارة الثلاجة أقل من 5°م', text_en: 'I ensure the fridge temperature is below 5°C' },
            { id: 'k4_5', text_ar: 'أبرّد بقايا الطعام بسرعة قبل وضعها في الثلاجة', text_en: 'I cool leftovers quickly before placing them in the fridge' },
        ],
        tip_ar: '"منطقة الخطر" هي بين 5°م و60°م — وفيها تتكاثر البكتيريا بسرعة مضاعفة كل 20 دقيقة.',
        tip_en: 'The "danger zone" is between 5°C and 60°C — bacteria double in number every 20 minutes within this range.',
    },
    {
        id: 5,
        title_ar: 'استخدام مياه ومواد خام آمنة',
        title_en: 'Use Safe Water and Raw Materials',
        icon: 'droplets',
        items: [
            { id: 'k5_1', text_ar: 'أستخدم مياه نظيفة أو معالجة للشرب والطهي', text_en: 'I use clean or treated water for drinking and cooking' },
            { id: 'k5_2', text_ar: 'أختار أطعمة طازجة وسليمة', text_en: 'I choose fresh and sound foods' },
            { id: 'k5_3', text_ar: 'أغسل الفواكه والخضروات جيداً قبل الأكل', text_en: 'I wash fruits and vegetables thoroughly before eating' },
            { id: 'k5_4', text_ar: 'أتحقق من تواريخ الصلاحية قبل الشراء والاستخدام', text_en: 'I check expiry dates before purchase and use' },
        ],
        tip_ar: 'لا تستخدم أغذية منتهية الصلاحية مهما بدت سليمة ظاهرياً.',
        tip_en: 'Do not use expired foods no matter how normal they appear on the outside.',
    },
];

export type AnswerValue = 'yes' | 'no' | 'not_sure' | null;

export interface ChecklistResult {
    timestamp: string;
    total_score: number;
    category_ar: string;
    category_en: string;
    keys: Array<{ key: number; score: number; items_total: number; items_yes: number }>;
}

export function calculateScore(answers: Record<string, AnswerValue>): ChecklistResult {
    const keyScores = foodSafetyKeys.map(key => {
        let total = 0;
        let score = 0;
        key.items.forEach(item => {
            const ans = answers[item.id];
            total++;
            if (ans === 'yes') score += 100;
            else if (ans === 'not_sure') score += 50;
        });
        const avgScore = total > 0 ? Math.round(score / total) : 0;
        return {
            key: key.id,
            score: avgScore,
            items_total: total,
            items_yes: key.items.filter(i => answers[i.id] === 'yes').length,
        };
    });

    const totalScore = Math.round(keyScores.reduce((sum, k) => sum + k.score, 0) / keyScores.length);

    let category_ar = 'يحتاج تحسين';
    let category_en = 'Needs Improvement';
    if (totalScore >= 80) { category_ar = 'ممتاز'; category_en = 'Excellent'; }
    else if (totalScore >= 50) { category_ar = 'جيد'; category_en = 'Good'; }

    return {
        timestamp: new Date().toISOString(),
        total_score: totalScore,
        category_ar,
        category_en,
        keys: keyScores,
    };
}
