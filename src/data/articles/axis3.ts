import type { InterventionArticle } from '../interventionArticles';

const AXIS_AR = 'المغذيات الدقيقة والتنوع الغذائي';
const AXIS_EN = 'Micronutrients & Dietary Diversity';

export const axis3Articles: InterventionArticle[] = [
    // ─────────────────────────────────────────────
    // Article 11
    // ─────────────────────────────────────────────
    {
        id: 11,
        axis: 3, axis_ar: AXIS_AR, axis_en: AXIS_EN, week_range: '5-6',
        title_ar: 'أنيميا نقص الحديد عند الأطفال — العدو الصامت',
        title_en: 'Iron Deficiency Anemia in Children — The Silent Enemy',
        slug_ar: 'أنيميا-نقص-الحديد-عند-الأطفال',
        slug_en: 'iron-deficiency-anemia-in-children',
        quick_summary_ar: [
            '40% من الأطفال المصريين (2–5 سنوات) يعانون من أنيميا نقص الحديد',
            'نقص الحديد يضعف التركيز والذاكرة والمناعة',
            'فيتامين C يضاعف امتصاص الحديد — والشاي يعيقه',
        ],
        quick_summary_en: [
            '40% of Egyptian children (2–5 years) suffer from iron deficiency anemia',
            'Iron deficiency weakens concentration, memory, and immunity',
            'Vitamin C doubles iron absorption — and tea inhibits it',
        ],
        content_ar: `<div dir="rtl">
<p>أنيميا نقص الحديد هي أكثر اضطرابات التغذية شيوعاً عند الأطفال عالمياً. في مصر، تصل نسبة أنيميا نقص الحديد بين الأطفال من 2–5 سنوات إلى حوالي 40%، بينما تتراوح بين 37–52% عند الأطفال من 12–36 شهراً. والأخطر أن 8% فقط من الأطفال المصريين (6–59 شهراً) يحصلون على مكملات الحديد.[23][24][20][15]</p>

<h2>علامات نقص الحديد عند طفلك:</h2>
<ul>
<li>شحوب الوجه وتحت العينين</li>
<li>إرهاق وخمول مستمر</li>
<li>ضعف التركيز والأداء المدرسي</li>
<li>فقدان الشهية</li>
<li>تكرار الإصابة بالعدوى</li>
<li>برودة اليدين والقدمين</li>
</ul>

<h2>مصادر الحديد الغنية والمتاحة:</h2>
<table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse:collapse;">
<thead><tr><th>المصدر</th><th>نوع الحديد</th><th>أمثلة</th></tr></thead>
<tbody>
<tr><td>حديد هيمي (امتصاص عالي 15–35%)</td><td>حيواني</td><td>كبدة، لحوم حمراء، دجاج، أسماك</td></tr>
<tr><td>حديد غير هيمي (امتصاص أقل 2–20%)</td><td>نباتي</td><td>فول، عدس، سبانخ، ملوخية، عسل أسود</td></tr>
</tbody>
</table>

<h2>الاحتياجات اليومية من الحديد (EAR):</h2>
<ul>
<li>أطفال 4–8 سنوات: 4.1 ملغ/يوم</li>
<li>ذكور 9–13 سنة: 5.9 ملغ/يوم</li>
<li>إناث 9–13 سنة: 5.7 ملغ/يوم[17]</li>
</ul>

<h2>كيف تزيد امتصاص الحديد؟</h2>
<ul>
<li>قدّم أطعمة غنية بفيتامين C مع وجبات الحديد (ليمون، برتقال، فلفل، طماطم) — فيتامين C يمكن أن يُضاعف امتصاص الحديد غير الهيمي[25][15]</li>
<li>تجنّب تقديم الشاي أو القهوة مع الوجبات أو بعدها مباشرة — التانين يعيق امتصاص الحديد بنسبة كبيرة[15]</li>
<li>لا تفرط في تقديم الحليب (أكثر من 700 مل يومياً يعيق امتصاص الحديد)[26]</li>
</ul>
</div>`,
        content_en: `<div dir="ltr">
<p>Iron deficiency anemia is the most common nutritional disorder in children worldwide. In Egypt, the rate of iron deficiency anemia among children aged 2–5 years reaches approximately 40%, while it ranges between 37–52% in children aged 12–36 months. More critically, only 8% of Egyptian children (6–59 months) receive iron supplements.[23][24][20][15]</p>

<h2>Signs of Iron Deficiency in Your Child:</h2>
<ul>
<li>Pale face and under the eyes</li>
<li>Persistent fatigue and lethargy</li>
<li>Poor concentration and school performance</li>
<li>Loss of appetite</li>
<li>Frequent infections</li>
<li>Cold hands and feet</li>
</ul>

<h2>Rich and Available Iron Sources:</h2>
<table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse:collapse;">
<thead><tr><th>Source</th><th>Iron Type</th><th>Examples</th></tr></thead>
<tbody>
<tr><td>Heme iron (high absorption 15–35%)</td><td>Animal</td><td>Liver, red meat, chicken, fish</td></tr>
<tr><td>Non-heme iron (lower absorption 2–20%)</td><td>Plant</td><td>Fava beans, lentils, spinach, molokhia, blackstrap molasses</td></tr>
</tbody>
</table>

<h2>Daily Iron Requirements (EAR):</h2>
<ul>
<li>Children 4–8 years: 4.1 mg/day</li>
<li>Males 9–13 years: 5.9 mg/day</li>
<li>Females 9–13 years: 5.7 mg/day[17]</li>
</ul>

<h2>How to Increase Iron Absorption?</h2>
<ul>
<li>Serve vitamin C-rich foods with iron-rich meals (lemon, orange, bell pepper, tomato) — vitamin C can double non-heme iron absorption[25][15]</li>
<li>Avoid serving tea or coffee with meals or immediately after — tannins significantly inhibit iron absorption[15]</li>
<li>Don't overdo milk (more than 700 ml daily inhibits iron absorption)[26]</li>
</ul>
</div>`,
        sources_ar: [
            'WHO EMRO. (2025). Nutrition – Egypt.',
            'WHO. (2025). Anaemia fact sheet.',
            'IOM. (2001). Dietary Reference Intakes for Iron.',
            'Chokor, F. A. Z., et al. (2024). Food sources of micronutrients of concern among children in Lebanon. BMC Pediatrics.',
        ],
        sources_en: [
            'WHO EMRO. (2025). Nutrition – Egypt.',
            'WHO. (2025). Anaemia fact sheet.',
            'IOM. (2001). Dietary Reference Intakes for Iron.',
            'Chokor, F. A. Z., et al. (2024). Food sources of micronutrients of concern among children in Lebanon. BMC Pediatrics.',
        ],
        tags_ar: ['أنيميا', 'نقص الحديد', 'فيتامين C', 'الشاي', 'كبدة', 'بقوليات', 'تغذية الأطفال', 'مصر', 'المناعة', 'التركيز'],
        tags_en: ['Anemia', 'Iron Deficiency', 'Vitamin C', 'Tea', 'Liver', 'Legumes', 'Child Nutrition', 'Egypt', 'Immunity', 'Concentration'],
        meta: {
            meta_title_ar: 'أنيميا نقص الحديد عند الأطفال — العدو الصامت',
            meta_title_en: 'Iron Deficiency Anemia in Children — Silent Enemy',
            meta_description_ar: '40% من أطفال مصر يعانون من أنيميا نقص الحديد. تعرف على العلامات والمصادر الغنية بالحديد ونصائح لزيادة الامتصاص.',
            meta_description_en: '40% of Egyptian children suffer from iron deficiency anemia. Learn the signs, iron-rich sources, and tips to increase absorption.',
            reading_time_minutes: 4,
            og_title_ar: 'أنيميا نقص الحديد عند الأطفال — العدو الصامت',
            og_title_en: 'Iron Deficiency Anemia in Children — The Silent Enemy',
            og_description_ar: 'فيتامين C يضاعف امتصاص الحديد والشاي يعيقه. تعرف على التفاصيل.',
            og_description_en: 'Vitamin C doubles iron absorption and tea inhibits it. Learn the details.',
        },
    },

    // ─────────────────────────────────────────────
    // Article 12
    // ─────────────────────────────────────────────
    {
        id: 12,
        axis: 3, axis_ar: AXIS_AR, axis_en: AXIS_EN, week_range: '5-6',
        title_ar: 'فيتامين أ والزنك — درع المناعة ومحرك النمو',
        title_en: 'Vitamin A & Zinc — The Immunity Shield and Growth Engine',
        slug_ar: 'فيتامين-أ-والزنك',
        slug_en: 'vitamin-a-and-zinc',
        quick_summary_ar: [
            'نقص فيتامين أ يصيب 190 مليون طفل حول العالم ويسبب العمى الليلي',
            'الزنك ضروري لجهاز المناعة والنمو والتئام الجروح',
            'أطعمة بسيطة ومتوفرة في مصر تغطي احتياج طفلك من كليهما',
        ],
        quick_summary_en: [
            'Vitamin A deficiency affects 190 million children worldwide and causes night blindness',
            'Zinc is essential for the immune system, growth, and wound healing',
            'Simple and available foods in Egypt cover your child\'s needs for both',
        ],
        content_ar: `<div dir="rtl">
<h2>فيتامين أ — حارس المناعة والبصر:</h2>
<p>يُعد نقص فيتامين أ من أخطر مشكلات التغذية عند الأطفال عالمياً، حيث يصيب حوالي 190 مليون طفل في سن ما قبل المدرسة. وهو السبب الأول للعمى الذي يمكن الوقاية منه عند الأطفال، كما يزيد بشكل كبير من خطر الإصابة بأمراض الإسهال والحصبة ومضاعفاتها المميتة.[27][28][29]</p>

<h3>الاحتياجات اليومية (EAR):</h3>
<ul>
<li>أطفال 4–8 سنوات: 275 ميكروغرام RAE/يوم</li>
<li>أطفال 9–13 سنة: 420–445 ميكروغرام RAE/يوم[17]</li>
</ul>

<h3>أغنى المصادر:</h3>
<ul>
<li><strong>مصادر حيوانية (ريتينول — جاهز للامتصاص):</strong> كبدة (أغنى مصدر على الإطلاق)، زيت كبد السمك، بيض، لبن كامل الدسم</li>
<li><strong>مصادر نباتية (بيتا كاروتين — يتحول لفيتامين أ):</strong> جزر، بطاطا حلوة، مانجو، سبانخ، ملوخية، قرع عسلي[30][31]</li>
</ul>

<h2>الزنك — محرك النمو والمناعة:</h2>
<p>نقص الزنك يُقدّر بأنه يؤثر على 17% من سكان العالم، وهو مرتبط بشكل مباشر بالتقزّم وضعف المناعة وزيادة حالات الإسهال عند الأطفال. الزنك ضروري لأكثر من 300 إنزيم في الجسم.</p>

<h3>الاحتياجات اليومية (EAR):</h3>
<ul>
<li>أطفال 4–8 سنوات: 4.0 ملغ/يوم</li>
<li>أطفال 9–13 سنة: 7.0 ملغ/يوم[17]</li>
</ul>

<h3>أغنى المصادر:</h3>
<ul>
<li>لحوم حمراء (أغنى مصدر)</li>
<li>دواجن ومأكولات بحرية</li>
<li>بذور اليقطين (اللب الأبيض)</li>
<li>حمص وعدس</li>
<li>مكسرات (كاجو، لوز)</li>
<li>منتجات الألبان[31][30]</li>
</ul>

<p><strong>وجبة واحدة تغطي الاثنين:</strong> طبق كبدة بالبصل والفلفل الأخضر + أرز = فيتامين أ + زنك + حديد + فيتامين C في وجبة واحدة اقتصادية.</p>
</div>`,
        content_en: `<div dir="ltr">
<h2>Vitamin A — The Immunity and Vision Guardian:</h2>
<p>Vitamin A deficiency is one of the most dangerous nutritional problems in children worldwide, affecting approximately 190 million preschool-age children. It is the leading cause of preventable blindness in children and significantly increases the risk of diarrheal diseases, measles, and their fatal complications.[27][28][29]</p>

<h3>Daily Requirements (EAR):</h3>
<ul>
<li>Children 4–8 years: 275 mcg RAE/day</li>
<li>Children 9–13 years: 420–445 mcg RAE/day[17]</li>
</ul>

<h3>Richest Sources:</h3>
<ul>
<li><strong>Animal sources (Retinol — ready for absorption):</strong> Liver (richest source of all), cod liver oil, eggs, whole milk</li>
<li><strong>Plant sources (Beta-carotene — converts to vitamin A):</strong> Carrots, sweet potato, mango, spinach, molokhia, pumpkin[30][31]</li>
</ul>

<h2>Zinc — The Growth and Immunity Engine:</h2>
<p>Zinc deficiency is estimated to affect 17% of the world's population and is directly linked to stunting, weakened immunity, and increased diarrhea in children. Zinc is essential for over 300 enzymes in the body.</p>

<h3>Daily Requirements (EAR):</h3>
<ul>
<li>Children 4–8 years: 4.0 mg/day</li>
<li>Children 9–13 years: 7.0 mg/day[17]</li>
</ul>

<h3>Richest Sources:</h3>
<ul>
<li>Red meat (richest source)</li>
<li>Poultry and seafood</li>
<li>Pumpkin seeds</li>
<li>Chickpeas and lentils</li>
<li>Nuts (cashews, almonds)</li>
<li>Dairy products[31][30]</li>
</ul>

<p><strong>One meal that covers both:</strong> A plate of liver with onions and green pepper + rice = vitamin A + zinc + iron + vitamin C in one economical meal.</p>
</div>`,
        sources_ar: [
            'WHO. (2020). Vitamin A deficiency.',
            'Stevens, G. A., et al. (2022). Global burden of vitamin A deficiency. Nutrients, 14(5), 950.',
            'IOM. (2001). Dietary Reference Intakes for Vitamin A, Vitamin K, Arsenic, Boron, Chromium, Copper, Iodine, Iron, Manganese, Molybdenum, Nickel, Silicon, Vanadium, and Zinc. National Academies Press.',
        ],
        sources_en: [
            'WHO. (2020). Vitamin A deficiency.',
            'Stevens, G. A., et al. (2022). Global burden of vitamin A deficiency. Nutrients, 14(5), 950.',
            'IOM. (2001). Dietary Reference Intakes for Vitamin A, Vitamin K, Arsenic, Boron, Chromium, Copper, Iodine, Iron, Manganese, Molybdenum, Nickel, Silicon, Vanadium, and Zinc. National Academies Press.',
        ],
        tags_ar: ['فيتامين أ', 'الزنك', 'المناعة', 'النمو', 'العمى الليلي', 'كبدة', 'جزر', 'تغذية الأطفال', 'المغذيات الدقيقة', 'التقزم'],
        tags_en: ['Vitamin A', 'Zinc', 'Immunity', 'Growth', 'Night Blindness', 'Liver', 'Carrots', 'Child Nutrition', 'Micronutrients', 'Stunting'],
        meta: {
            meta_title_ar: 'فيتامين أ والزنك — درع المناعة ومحرك النمو',
            meta_title_en: 'Vitamin A & Zinc — Immunity Shield & Growth Engine',
            meta_description_ar: 'نقص فيتامين أ يصيب 190 مليون طفل. تعرف على مصادر فيتامين أ والزنك المتوفرة في مصر ووجبة واحدة تغطي الاثنين.',
            meta_description_en: 'Vitamin A deficiency affects 190 million children. Learn about vitamin A and zinc sources available in Egypt and one meal that covers both.',
            reading_time_minutes: 4,
            og_title_ar: 'فيتامين أ والزنك — درع المناعة ومحرك النمو',
            og_title_en: 'Vitamin A & Zinc — The Immunity Shield and Growth Engine',
            og_description_ar: 'وجبة واحدة اقتصادية تغطي فيتامين أ والزنك والحديد وفيتامين C.',
            og_description_en: 'One economical meal covers vitamin A, zinc, iron, and vitamin C.',
        },
    },

    // ─────────────────────────────────────────────
    // Article 13
    // ─────────────────────────────────────────────
    {
        id: 13,
        axis: 3, axis_ar: AXIS_AR, axis_en: AXIS_EN, week_range: '5-6',
        title_ar: 'الكالسيوم وفيتامين د — ثنائي بناء عظام طفلك',
        title_en: 'Calcium & Vitamin D — The Bone-Building Duo for Your Child',
        slug_ar: 'الكالسيوم-وفيتامين-د',
        slug_en: 'calcium-and-vitamin-d',
        quick_summary_ar: [
            '90% من كتلة العظام تتكوّن قبل سن 18 سنة',
            'نقص فيتامين د منتشر بشكل واسع عند الأطفال المصريين',
            'الكالسيوم بدون فيتامين د لا يُمتص بشكل فعّال',
        ],
        quick_summary_en: [
            '90% of bone mass is formed before age 18',
            'Vitamin D deficiency is widespread among Egyptian children',
            'Calcium without vitamin D is not effectively absorbed',
        ],
        content_ar: `<div dir="rtl">
<p>سنوات الطفولة والمراهقة هي "نافذة الفرصة" لبناء عظام قوية تستمر مدى الحياة. حوالي 90% من الكتلة العظمية القصوى تتكوّن قبل سن 18 سنة. إذا لم يحصل الطفل على كمية كافية من الكالسيوم وفيتامين د خلال هذه الفترة، يصبح أكثر عرضة لهشاشة العظام والكسور في المستقبل.</p>

<h2>الكالسيوم:</h2>
<h3>الاحتياج اليومي:</h3>
<ul>
<li>أطفال 4–8 سنوات: 800 ملغ/يوم</li>
<li>أطفال 9–12 سنة: 1,100 ملغ/يوم</li>
</ul>

<h3>مصادر غنية:</h3>
<ul>
<li>لبن (كوب 250 مل = ~300 ملغ كالسيوم)</li>
<li>زبادي (عبوة 200 جم = ~250 ملغ)</li>
<li>جبن أبيض (50 جم = ~300 ملغ)</li>
<li>سردين بالعظام</li>
<li>سبانخ مطبوخة وبروكلي</li>
<li>تين مجفف[31]</li>
</ul>

<h2>فيتامين د — المنظّم:</h2>
<p>فيتامين د ضروري لامتصاص الكالسيوم من الأمعاء. بدونه، حتى لو أكل الطفل ما يكفي من الكالسيوم، فلن يستفيد منه جسمه بالكامل.</p>

<h3>مصادره:</h3>
<ul>
<li>أشعة الشمس (15–20 دقيقة يومياً — الذراعين والوجه مكشوفة)</li>
<li>أسماك دهنية (سلمون، تونة، سردين)</li>
<li>صفار البيض</li>
<li>لبن وعصائر مُدعّمة بفيتامين د</li>
</ul>
</div>`,
        content_en: `<div dir="ltr">
<p>Childhood and adolescent years are the "window of opportunity" for building strong bones that last a lifetime. Approximately 90% of peak bone mass is formed before age 18. If a child does not receive adequate calcium and vitamin D during this period, they become more susceptible to osteoporosis and fractures in the future.</p>

<h2>Calcium:</h2>
<h3>Daily Requirements:</h3>
<ul>
<li>Children 4–8 years: 800 mg/day</li>
<li>Children 9–12 years: 1,100 mg/day</li>
</ul>

<h3>Rich Sources:</h3>
<ul>
<li>Milk (250 ml cup = ~300 mg calcium)</li>
<li>Yogurt (200g container = ~250 mg)</li>
<li>White cheese (50g = ~300 mg)</li>
<li>Sardines with bones</li>
<li>Cooked spinach and broccoli</li>
<li>Dried figs[31]</li>
</ul>

<h2>Vitamin D — The Regulator:</h2>
<p>Vitamin D is essential for calcium absorption from the intestines. Without it, even if the child eats enough calcium, their body will not fully benefit from it.</p>

<h3>Sources:</h3>
<ul>
<li>Sunlight (15–20 minutes daily — arms and face exposed)</li>
<li>Fatty fish (salmon, tuna, sardines)</li>
<li>Egg yolk</li>
<li>Vitamin D-fortified milk and juices</li>
</ul>
</div>`,
        sources_ar: [
            'IOM. (2011). Dietary Reference Intakes for Calcium and Vitamin D. National Academies Press.',
            'NHS. (2023). Food sources of vitamins and minerals for children.',
        ],
        sources_en: [
            'IOM. (2011). Dietary Reference Intakes for Calcium and Vitamin D. National Academies Press.',
            'NHS. (2023). Food sources of vitamins and minerals for children.',
        ],
        tags_ar: ['كالسيوم', 'فيتامين د', 'عظام', 'هشاشة العظام', 'لبن', 'أشعة الشمس', 'تغذية الأطفال', 'المغذيات الدقيقة', 'نمو', 'ألبان'],
        tags_en: ['Calcium', 'Vitamin D', 'Bones', 'Osteoporosis', 'Milk', 'Sunlight', 'Child Nutrition', 'Micronutrients', 'Growth', 'Dairy'],
        meta: {
            meta_title_ar: 'الكالسيوم وفيتامين د — ثنائي بناء عظام طفلك',
            meta_title_en: 'Calcium & Vitamin D — Bone-Building Duo',
            meta_description_ar: '90% من كتلة العظام تتكون قبل 18 سنة. تعرف على مصادر الكالسيوم وفيتامين د ولماذا لا ينفع أحدهما بدون الآخر.',
            meta_description_en: '90% of bone mass forms before age 18. Learn about calcium and vitamin D sources and why one doesn\'t work without the other.',
            reading_time_minutes: 3,
            og_title_ar: 'الكالسيوم وفيتامين د — ثنائي بناء عظام طفلك',
            og_title_en: 'Calcium & Vitamin D — The Bone-Building Duo for Your Child',
            og_description_ar: 'كوب لبن = 300 ملغ كالسيوم. لكن بدون فيتامين د لن يستفيد منه الجسم.',
            og_description_en: 'A cup of milk = 300mg calcium. But without vitamin D, the body won\'t benefit.',
        },
    },

    // ─────────────────────────────────────────────
    // Article 14
    // ─────────────────────────────────────────────
    {
        id: 14,
        axis: 3, axis_ar: AXIS_AR, axis_en: AXIS_EN, week_range: '5-6',
        title_ar: 'اليود — العنصر الذي يحمي ذكاء طفلك',
        title_en: 'Iodine — The Element That Protects Your Child\'s Intelligence',
        slug_ar: 'اليود-يحمي-ذكاء-طفلك',
        slug_en: 'iodine-protects-child-intelligence',
        quick_summary_ar: [
            'نقص اليود يسبب تأخراً في النمو العقلي والجسدي للأطفال',
            'أكثر من 60% من الأطفال في بعض دول الشرق الأوسط يعانون من نقص اليود',
            'الحل بسيط: استخدام الملح المعالج باليود في الطبخ اليومي',
        ],
        quick_summary_en: [
            'Iodine deficiency causes mental and physical developmental delays in children',
            'Over 60% of children in some Middle Eastern countries suffer from iodine deficiency',
            'The solution is simple: using iodized salt in daily cooking',
        ],
        content_ar: `<div dir="rtl">
<p>اليود عنصر ضروري لإنتاج هرمونات الغدة الدرقية التي تتحكم في نمو الدماغ والجهاز العصبي خلال فترة الطفولة. نقص اليود هو أكبر سبب يمكن الوقاية منه للإعاقة الذهنية عند الأطفال حول العالم.</p>
<p>في منطقة الشرق الأوسط وشمال أفريقيا، تتجاوز نسبة نقص اليود 60% بين الأطفال في عدة دول منها الجزائر والمغرب والسودان.[32]</p>

<h2>الاحتياج اليومي (EAR):</h2>
<ul>
<li>أطفال 4–8 سنوات: 65 ميكروغرام/يوم</li>
<li>أطفال 9–13 سنة: 73 ميكروغرام/يوم[17]</li>
</ul>

<h2>مصادر اليود:</h2>
<ul>
<li>الملح المعالج باليود (أسهل وأرخص مصدر — ملعقة صغيرة تحتوي ~45 ميكروغرام)</li>
<li>الأسماك والمأكولات البحرية</li>
<li>منتجات الألبان</li>
<li>البيض</li>
</ul>
</div>`,
        content_en: `<div dir="ltr">
<p>Iodine is an essential element for producing thyroid hormones that control brain and nervous system development during childhood. Iodine deficiency is the leading preventable cause of intellectual disability in children worldwide.</p>
<p>In the Middle East and North Africa region, iodine deficiency exceeds 60% among children in several countries including Algeria, Morocco, and Sudan.[32]</p>

<h2>Daily Requirements (EAR):</h2>
<ul>
<li>Children 4–8 years: 65 mcg/day</li>
<li>Children 9–13 years: 73 mcg/day[17]</li>
</ul>

<h2>Iodine Sources:</h2>
<ul>
<li>Iodized salt (easiest and cheapest source — one teaspoon contains ~45 mcg)</li>
<li>Fish and seafood</li>
<li>Dairy products</li>
<li>Eggs</li>
</ul>
</div>`,
        practical_tips_ar: ['عند شراء الملح، تأكد أن العبوة مكتوب عليها "ملح معالج باليود" أو "Iodized Salt". استخدمه في الطبخ اليومي لكن لا تفرط — الحد الأقصى للملح للأطفال أقل بكثير من الكبار.'],
        practical_tips_en: ['When buying salt, make sure the package reads "Iodized Salt". Use it in daily cooking but don\'t overdo it — the maximum salt limit for children is much lower than for adults.'],
        sources_ar: [
            'IFPRI. (2024). Overcoming the triple burden of malnutrition in the MENA region.',
            'IOM. (2001). Dietary Reference Intakes for Iodine.',
        ],
        sources_en: [
            'IFPRI. (2024). Overcoming the triple burden of malnutrition in the MENA region.',
            'IOM. (2001). Dietary Reference Intakes for Iodine.',
        ],
        tags_ar: ['اليود', 'الغدة الدرقية', 'ذكاء الطفل', 'الملح المعالج', 'النمو العقلي', 'المغذيات الدقيقة', 'الشرق الأوسط', 'تغذية الأطفال', 'الإعاقة الذهنية', 'أسماك'],
        tags_en: ['Iodine', 'Thyroid', 'Child Intelligence', 'Iodized Salt', 'Mental Development', 'Micronutrients', 'Middle East', 'Child Nutrition', 'Intellectual Disability', 'Fish'],
        meta: {
            meta_title_ar: 'اليود — العنصر الذي يحمي ذكاء طفلك',
            meta_title_en: 'Iodine — Protects Your Child\'s Intelligence',
            meta_description_ar: 'نقص اليود أكبر سبب للإعاقة الذهنية التي يمكن الوقاية منها عند الأطفال. الحل بسيط: الملح المعالج باليود في الطبخ اليومي.',
            meta_description_en: 'Iodine deficiency is the leading preventable cause of intellectual disability in children. The solution is simple: iodized salt in daily cooking.',
            reading_time_minutes: 3,
            og_title_ar: 'اليود — العنصر الذي يحمي ذكاء طفلك',
            og_title_en: 'Iodine — The Element That Protects Your Child\'s Intelligence',
            og_description_ar: 'أكثر من 60% من أطفال بعض دول الشرق الأوسط يعانون من نقص اليود.',
            og_description_en: 'Over 60% of children in some Middle Eastern countries suffer from iodine deficiency.',
        },
    },

    // ─────────────────────────────────────────────
    // Article 15
    // ─────────────────────────────────────────────
    {
        id: 15,
        axis: 3, axis_ar: AXIS_AR, axis_en: AXIS_EN, week_range: '5-6',
        title_ar: 'التنوع الغذائي — لماذا 5 مجموعات يومياً أهم من كمية الأكل',
        title_en: 'Dietary Diversity — Why 5 Food Groups Daily Matters More Than Quantity',
        slug_ar: 'التنوع-الغذائي',
        slug_en: 'dietary-diversity',
        quick_summary_ar: [
            'التنوع الغذائي مؤشر علمي معتمد من FAO على كفاية المغذيات الدقيقة',
            'الطفل يحتاج أطعمة من 5 مجموعات مختلفة على الأقل يومياً',
            'التنوع لا يعني الغلاء — بل الذكاء في اختيار الأطعمة المتاحة',
        ],
        quick_summary_en: [
            'Dietary diversity is a FAO-approved scientific indicator of micronutrient adequacy',
            'A child needs foods from at least 5 different food groups daily',
            'Diversity doesn\'t mean expense — but smart selection of available foods',
        ],
        content_ar: `<div dir="rtl">
<p>التنوع الغذائي (Dietary Diversity) هو عدد المجموعات الغذائية المختلفة التي يتناولها الفرد خلال 24 ساعة. منظمة الأغذية والزراعة (FAO) طوّرت مقياس التنوع الغذائي (Dietary Diversity Score — DDS) كمؤشر بسيط وموثوق لتقييم مدى كفاية المغذيات الدقيقة في النظام الغذائي.[3][33]</p>

<h2>المجموعات الغذائية العشر (معيار FAO):</h2>
<ol>
<li>حبوب ونشويات — أرز، مكرونة، خبز</li>
<li>بقوليات — فول، عدس، حمص</li>
<li>مكسرات وبذور — لوز، جوز، لب</li>
<li>ألبان — لبن، زبادي، جبن</li>
<li>لحوم ودواجن وأسماك — أي نوع</li>
<li>بيض</li>
<li>خضروات ورقية داكنة — سبانخ، ملوخية، جرجير</li>
<li>فواكه وخضروات غنية بفيتامين أ — جزر، مانجو، بطاطا حلوة</li>
<li>خضروات أخرى — طماطم، خيار، كوسة</li>
<li>فواكه أخرى — موز، تفاح، برتقال</li>
</ol>
<p><strong>الحد الأدنى المقبول:</strong> تناول أطعمة من 5 مجموعات أو أكثر يومياً يُعد مؤشراً على كفاية المغذيات الدقيقة.[34][2]</p>

<h2>مثال ليوم متنوع بميزانية محدودة:</h2>
<ul>
<li><strong>إفطار:</strong> فول (بقوليات) + خبز (نشويات) + طماطم (خضروات) = 3 مجموعات</li>
<li><strong>غداء:</strong> أرز (نشويات) + دجاج (لحوم) + ملوخية (ورقية داكنة) + سلطة (خضروات) = 4 مجموعات</li>
<li><strong>عشاء:</strong> بيض (بيض) + جبن (ألبان) + خيار (خضروات) = 3 مجموعات</li>
<li><strong>سناك:</strong> موز (فاكهة) + لب (مكسرات) = 2 مجموعات</li>
</ul>
<p><strong>المجموع: 8 مجموعات من 10 — تنوع ممتاز!</strong></p>
</div>`,
        content_en: `<div dir="ltr">
<p>Dietary Diversity is the number of different food groups consumed by an individual within 24 hours. The Food and Agriculture Organization (FAO) developed the Dietary Diversity Score (DDS) as a simple and reliable indicator to assess micronutrient adequacy in the diet.[3][33]</p>

<h2>The Ten Food Groups (FAO Standard):</h2>
<ol>
<li>Cereals and starches — rice, pasta, bread</li>
<li>Legumes — fava beans, lentils, chickpeas</li>
<li>Nuts and seeds — almonds, walnuts, seeds</li>
<li>Dairy — milk, yogurt, cheese</li>
<li>Meat, poultry, and fish — any type</li>
<li>Eggs</li>
<li>Dark green leafy vegetables — spinach, molokhia, arugula</li>
<li>Vitamin A-rich fruits and vegetables — carrots, mango, sweet potato</li>
<li>Other vegetables — tomato, cucumber, zucchini</li>
<li>Other fruits — banana, apple, orange</li>
</ol>
<p><strong>Minimum acceptable level:</strong> Consuming foods from 5 or more food groups daily is an indicator of micronutrient adequacy.[34][2]</p>

<h2>Example of a Diverse Day on a Limited Budget:</h2>
<ul>
<li><strong>Breakfast:</strong> Fava beans (legumes) + bread (starches) + tomato (vegetables) = 3 groups</li>
<li><strong>Lunch:</strong> Rice (starches) + chicken (meat) + molokhia (dark leafy greens) + salad (vegetables) = 4 groups</li>
<li><strong>Dinner:</strong> Eggs (eggs) + cheese (dairy) + cucumber (vegetables) = 3 groups</li>
<li><strong>Snack:</strong> Banana (fruit) + seeds (nuts) = 2 groups</li>
</ul>
<p><strong>Total: 8 groups out of 10 — excellent diversity!</strong></p>
</div>`,
        sources_ar: [
            'FAO. (2011). Guidelines for measuring household and individual dietary diversity.',
            'Hanley-Cook, G. T., et al. (2024). Minimum dietary diversity for adolescents. American Journal of Clinical Nutrition.',
        ],
        sources_en: [
            'FAO. (2011). Guidelines for measuring household and individual dietary diversity.',
            'Hanley-Cook, G. T., et al. (2024). Minimum dietary diversity for adolescents. American Journal of Clinical Nutrition.',
        ],
        tags_ar: ['التنوع الغذائي', 'DDS', 'FAO', 'مجموعات غذائية', 'المغذيات الدقيقة', 'ميزانية محدودة', 'تغذية الأطفال', 'بقوليات', 'خضروات', 'فواكه'],
        tags_en: ['Dietary Diversity', 'DDS', 'FAO', 'Food Groups', 'Micronutrients', 'Budget', 'Child Nutrition', 'Legumes', 'Vegetables', 'Fruits'],
        meta: {
            meta_title_ar: 'التنوع الغذائي — 5 مجموعات يومياً أهم من كمية الأكل',
            meta_title_en: 'Dietary Diversity — 5 Daily Groups Over Quantity',
            meta_description_ar: 'التنوع الغذائي مؤشر FAO على كفاية المغذيات. تعلم كيف تغطي 8 مجموعات غذائية من 10 بميزانية مصرية محدودة.',
            meta_description_en: 'Dietary diversity is a FAO indicator of nutrient adequacy. Learn how to cover 8 out of 10 food groups on a limited Egyptian budget.',
            reading_time_minutes: 4,
            og_title_ar: 'التنوع الغذائي — لماذا 5 مجموعات يومياً أهم من كمية الأكل',
            og_title_en: 'Dietary Diversity — Why 5 Food Groups Daily Matters More Than Quantity',
            og_description_ar: '8 مجموعات غذائية من 10 بميزانية محدودة — تنوع ممتاز! تعلم كيف.',
            og_description_en: '8 out of 10 food groups on a limited budget — excellent diversity! Learn how.',
        },
    },

    // ─────────────────────────────────────────────
    // Article 16
    // ─────────────────────────────────────────────
    {
        id: 16,
        axis: 3, axis_ar: AXIS_AR, axis_en: AXIS_EN, week_range: '5-6',
        title_ar: 'تغذية الطفل حسب العمر — ماذا يحتاج في كل مرحلة',
        title_en: 'Child Nutrition by Age — What They Need at Every Stage',
        slug_ar: 'تغذية-الطفل-حسب-العمر',
        slug_en: 'child-nutrition-by-age',
        quick_summary_ar: [
            'احتياجات الطفل الغذائية تتغير بشكل كبير مع كل مرحلة عمرية',
            'ما يكفي طفلاً في الرابعة لا يكفي مراهقاً في الثانية عشرة',
            'جدول عملي يوضح الحصص الموصى بها لكل فئة عمرية',
        ],
        quick_summary_en: [
            'A child\'s nutritional needs change significantly with each age stage',
            'What suffices for a 4-year-old doesn\'t suffice for a 12-year-old',
            'A practical table showing recommended servings for each age group',
        ],
        content_ar: `<div dir="rtl">
<p>احتياجات الطفل الغذائية ليست ثابتة — بل تتغير مع كل مرحلة نمو. معرفة هذه الاحتياجات يساعدك على تقديم كميات مناسبة وعناصر غذائية كافية لكل عمر.</p>

<h2>الحصص اليومية الموصى بها حسب العمر:</h2>
<table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse:collapse;">
<thead><tr><th>المغذي</th><th>4–8 سنوات</th><th>9–13 سنة</th></tr></thead>
<tbody>
<tr><td>السعرات الحرارية</td><td>1,200–1,400</td><td>1,600–2,200</td></tr>
<tr><td>البروتين (جم/يوم)</td><td>19</td><td>34</td></tr>
<tr><td>الألياف (جم/يوم)</td><td>25</td><td>26–31</td></tr>
<tr><td>الكالسيوم (ملغ/يوم)</td><td>1,000</td><td>1,300</td></tr>
<tr><td>الحديد (ملغ/يوم)</td><td>10</td><td>8</td></tr>
<tr><td>فيتامين د (وحدة/يوم)</td><td>600</td><td>600</td></tr>
<tr><td>فيتامين أ (ميكروغرام/يوم)</td><td>400</td><td>600</td></tr>
<tr><td>الزنك (ملغ/يوم)</td><td>5</td><td>8</td></tr>
</tbody>
</table>

<h2>نصائح عملية حسب المرحلة:</h2>
<h3>الفئة العمرية 4–8 سنوات:</h3>
<ul>
<li>قدّم حصصاً صغيرة متعددة (3 وجبات + 2 سناك)</li>
<li>اجعل الطعام ملوّناً وجذاباً بصرياً</li>
<li>لا تجبر الطفل على إنهاء طبقه — احترم إشارات الشبع</li>
<li>قدّم أطعمة جديدة مع أطعمة مألوفة</li>
</ul>

<h3>الفئة العمرية 9–13 سنة:</h3>
<ul>
<li>زِد حجم حصص البروتين والكالسيوم لدعم طفرة النمو</li>
<li>شجّع الأطفال على المشاركة في تحضير الطعام</li>
<li>علّمهم قراءة البطاقة الغذائية واتخاذ قرارات صحية</li>
<li>انتبه لزيادة احتياج البنات من الحديد بعد بدء الدورة الشهرية</li>
</ul>
</div>`,
        content_en: `<div dir="ltr">
<p>A child's nutritional needs are not static — they change with each growth stage. Knowing these needs helps you provide appropriate quantities and adequate nutrients for each age.</p>

<h2>Recommended Daily Servings by Age:</h2>
<table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse:collapse;">
<thead><tr><th>Nutrient</th><th>4–8 years</th><th>9–13 years</th></tr></thead>
<tbody>
<tr><td>Calories</td><td>1,200–1,400</td><td>1,600–2,200</td></tr>
<tr><td>Protein (g/day)</td><td>19</td><td>34</td></tr>
<tr><td>Fiber (g/day)</td><td>25</td><td>26–31</td></tr>
<tr><td>Calcium (mg/day)</td><td>1,000</td><td>1,300</td></tr>
<tr><td>Iron (mg/day)</td><td>10</td><td>8</td></tr>
<tr><td>Vitamin D (IU/day)</td><td>600</td><td>600</td></tr>
<tr><td>Vitamin A (mcg/day)</td><td>400</td><td>600</td></tr>
<tr><td>Zinc (mg/day)</td><td>5</td><td>8</td></tr>
</tbody>
</table>

<h2>Practical Tips by Stage:</h2>
<h3>Age Group 4–8 years:</h3>
<ul>
<li>Offer small, multiple servings (3 meals + 2 snacks)</li>
<li>Make food colorful and visually appealing</li>
<li>Don't force the child to finish their plate — respect satiety cues</li>
<li>Introduce new foods alongside familiar ones</li>
</ul>

<h3>Age Group 9–13 years:</h3>
<ul>
<li>Increase protein and calcium portions to support the growth spurt</li>
<li>Encourage children to participate in food preparation</li>
<li>Teach them to read nutrition labels and make healthy decisions</li>
<li>Pay attention to girls' increased iron needs after the onset of menstruation</li>
</ul>
</div>`,
        sources_ar: [
            'IOM. (2005). Dietary Reference Intakes. National Academies Press.',
        ],
        sources_en: [
            'IOM. (2005). Dietary Reference Intakes. National Academies Press.',
        ],
        tags_ar: ['تغذية حسب العمر', 'حصص غذائية', 'سعرات حرارية', 'نمو الأطفال', 'مراهقة', 'كالسيوم', 'حديد', 'بروتين', 'تغذية الأطفال', 'جدول غذائي'],
        tags_en: ['Age-based Nutrition', 'Food Servings', 'Calories', 'Child Growth', 'Adolescence', 'Calcium', 'Iron', 'Protein', 'Child Nutrition', 'Nutrition Table'],
        meta: {
            meta_title_ar: 'تغذية الطفل حسب العمر — جدول الحصص لكل مرحلة',
            meta_title_en: 'Child Nutrition by Age — Servings Table per Stage',
            meta_description_ar: 'جدول عملي يوضح السعرات والبروتين والكالسيوم والحديد الموصى بها لكل فئة عمرية من 4 إلى 13 سنة.',
            meta_description_en: 'A practical table showing recommended calories, protein, calcium, and iron for each age group from 4 to 13 years.',
            reading_time_minutes: 3,
            og_title_ar: 'تغذية الطفل حسب العمر — ماذا يحتاج في كل مرحلة',
            og_title_en: 'Child Nutrition by Age — What They Need at Every Stage',
            og_description_ar: 'ما يكفي طفلاً في الرابعة لا يكفي مراهقاً في الثانية عشرة. تعرف على التفاصيل.',
            og_description_en: 'What suffices for a 4-year-old doesn\'t suffice for a 12-year-old. Learn the details.',
        },
    },

    // ─────────────────────────────────────────────
    // Article 17
    // ─────────────────────────────────────────────
    {
        id: 17,
        axis: 3, axis_ar: AXIS_AR, axis_en: AXIS_EN, week_range: '5-6',
        title_ar: 'نقص التغذية مقابل فرط التغذية — العبء المزدوج الذي يهدد مصر',
        title_en: 'Undernutrition vs Overnutrition — The Double Burden Threatening Egypt',
        slug_ar: 'نقص-التغذية-مقابل-فرط-التغذية',
        slug_en: 'undernutrition-vs-overnutrition',
        quick_summary_ar: [
            'مصر تعاني من "العبء المزدوج": نقص تغذية وسمنة في نفس الوقت',
            '13% من الأطفال يعانون من التقزم و15.7% من الوزن الزائد — أحياناً في نفس الأسرة',
            'فهم الفرق بين الأنواع المختلفة لسوء التغذية هو الخطوة الأولى للحل',
        ],
        quick_summary_en: [
            'Egypt suffers from a "double burden": undernutrition and obesity simultaneously',
            '13% of children suffer from stunting and 15.7% from overweight — sometimes in the same family',
            'Understanding the difference between types of malnutrition is the first step to a solution',
        ],
        content_ar: `<div dir="rtl">
<p>سوء التغذية ليس فقط "نقص الوزن" — بل يشمل طيفاً واسعاً من المشكلات الغذائية. مصر تواجه ما يُعرف بالعبء المزدوج للتغذية (Double Burden of Malnutrition)، حيث يتعايش نقص التغذية والسمنة جنباً إلى جنب، أحياناً في نفس الأسرة أو حتى نفس الطفل.[20][35][36]</p>

<h2>أشكال سوء التغذية في مصر:</h2>

<h3>1. نقص التغذية (Undernutrition):</h3>
<ul>
<li><strong>التقزم (Stunting):</strong> قصر القامة مقارنة بالعمر — يعكس سوء تغذية مزمن. 13% من أطفال مصر تحت 5 سنوات</li>
<li><strong>الهزال (Wasting):</strong> نحافة شديدة مقارنة بالطول — يعكس سوء تغذية حاد. 8% من أطفال مصر تحت 5 سنوات</li>
<li><strong>نقص الوزن (Underweight):</strong> وزن أقل من المتوسط مقارنة بالعمر. 7% من أطفال مصر تحت 5 سنوات</li>
<li><strong>نقص المغذيات الدقيقة (Hidden Hunger):</strong> نقص في الحديد أو فيتامين أ أو الزنك أو اليود — قد يكون موجوداً حتى عند الأطفال ذوي الوزن الطبيعي</li>
</ul>

<h3>2. فرط التغذية (Overnutrition):</h3>
<ul>
<li><strong>الوزن الزائد (Overweight):</strong> 15.7% من أطفال مصر تحت 5 سنوات</li>
<li><strong>السمنة (Obesity):</strong> نسبة متزايدة مع التقدم في العمر</li>
</ul>

<h3>3. العبء المزدوج:</h3>
<p>في مصر، يمكن أن تجد في نفس الأسرة أماً تعاني من السمنة وطفلاً يعاني من التقزم — وهذا ما يُسمى بالعبء المزدوج. السبب غالباً هو نظام غذائي غني بالسعرات الفارغة (نشويات مكررة وسكر) لكنه فقير بالمغذيات الأساسية.[20][36]</p>
</div>`,
        content_en: `<div dir="ltr">
<p>Malnutrition is not just "underweight" — it encompasses a wide spectrum of nutritional problems. Egypt faces what is known as the Double Burden of Malnutrition, where undernutrition and obesity coexist side by side, sometimes in the same family or even the same child.[20][35][36]</p>

<h2>Forms of Malnutrition in Egypt:</h2>

<h3>1. Undernutrition:</h3>
<ul>
<li><strong>Stunting:</strong> Short stature compared to age — reflects chronic malnutrition. 13% of Egyptian children under 5</li>
<li><strong>Wasting:</strong> Severe thinness compared to height — reflects acute malnutrition. 8% of Egyptian children under 5</li>
<li><strong>Underweight:</strong> Weight below average for age. 7% of Egyptian children under 5</li>
<li><strong>Micronutrient deficiencies (Hidden Hunger):</strong> Deficiency in iron, vitamin A, zinc, or iodine — may be present even in children with normal weight</li>
</ul>

<h3>2. Overnutrition:</h3>
<ul>
<li><strong>Overweight:</strong> 15.7% of Egyptian children under 5</li>
<li><strong>Obesity:</strong> Increasing rate with age</li>
</ul>

<h3>3. The Double Burden:</h3>
<p>In Egypt, you can find in the same family a mother suffering from obesity and a child suffering from stunting — this is what is called the double burden. The cause is often a diet rich in empty calories (refined starches and sugar) but poor in essential nutrients.[20][36]</p>
</div>`,
        sources_ar: [
            'Global Nutrition Report. (2024). Egypt nutrition profile.',
            'UNICEF/WHO/World Bank. (2023). Joint malnutrition estimates for Egypt.',
            'WHO. (2024). Double burden of malnutrition. WHO policy brief.',
        ],
        sources_en: [
            'Global Nutrition Report. (2024). Egypt nutrition profile.',
            'UNICEF/WHO/World Bank. (2023). Joint malnutrition estimates for Egypt.',
            'WHO. (2024). Double burden of malnutrition. WHO policy brief.',
        ],
        tags_ar: ['العبء المزدوج', 'نقص التغذية', 'سمنة', 'تقزم', 'هزال', 'مصر', 'الجوع الخفي', 'مغذيات دقيقة', 'سوء التغذية', 'UNICEF'],
        tags_en: ['Double Burden', 'Undernutrition', 'Obesity', 'Stunting', 'Wasting', 'Egypt', 'Hidden Hunger', 'Micronutrients', 'Malnutrition', 'UNICEF'],
        meta: {
            meta_title_ar: 'نقص التغذية مقابل فرط التغذية — العبء المزدوج في مصر',
            meta_title_en: 'Undernutrition vs Overnutrition — Egypt\'s Double Burden',
            meta_description_ar: '13% تقزم و15.7% وزن زائد بين أطفال مصر. تعرف على العبء المزدوج لسوء التغذية وأنواعه المختلفة.',
            meta_description_en: '13% stunting and 15.7% overweight among Egyptian children. Learn about the double burden of malnutrition and its types.',
            reading_time_minutes: 4,
            og_title_ar: 'نقص التغذية مقابل فرط التغذية — العبء المزدوج',
            og_title_en: 'Undernutrition vs Overnutrition — The Double Burden',
            og_description_ar: 'أم تعاني من السمنة وطفل يعاني من التقزم في نفس الأسرة. هذا هو العبء المزدوج.',
            og_description_en: 'A mother with obesity and a child with stunting in the same family. This is the double burden.',
        },
    },

    // ─────────────────────────────────────────────
    // Article 18
    // ─────────────────────────────────────────────
    {
        id: 18,
        axis: 3, axis_ar: AXIS_AR, axis_en: AXIS_EN, week_range: '5-6',
        title_ar: 'ملخص المغذيات الدقيقة — جدولك المرجعي الشامل',
        title_en: 'Micronutrient Summary — Your Comprehensive Reference Table',
        slug_ar: 'ملخص-المغذيات-الدقيقة',
        slug_en: 'micronutrient-summary-reference',
        quick_summary_ar: [
            'جدول مرجعي شامل يجمع كل ما تعلمناه عن المغذيات الدقيقة',
            'الاحتياج اليومي والمصادر المصرية المتاحة ونصائح الامتصاص في مكان واحد',
            'اطبعه وعلّقه في المطبخ كمرجع يومي سريع',
        ],
        quick_summary_en: [
            'A comprehensive reference table summarizing everything we learned about micronutrients',
            'Daily requirements, available Egyptian sources, and absorption tips in one place',
            'Print it and hang it in the kitchen as a quick daily reference',
        ],
        content_ar: `<div dir="rtl">
<p>هذا الجدول يجمع كل ما تعلمناه في المحور الثالث حول المغذيات الدقيقة الأساسية لنمو طفلك. استخدمه كمرجع سريع عند التسوق أو تحضير الوجبات.</p>

<h2>الجدول المرجعي الشامل:</h2>
<table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse:collapse;">
<thead><tr><th>المغذي</th><th>الاحتياج اليومي (4–8 س)</th><th>الاحتياج اليومي (9–13 س)</th><th>أهم المصادر</th><th>نصيحة الامتصاص</th></tr></thead>
<tbody>
<tr><td>الحديد</td><td>10 ملغ</td><td>8 ملغ</td><td>كبدة، لحوم، فول، عدس، سبانخ</td><td>قدّمه مع فيتامين C؛ تجنب الشاي بعد الأكل</td></tr>
<tr><td>فيتامين أ</td><td>400 ميكروغرام</td><td>600 ميكروغرام</td><td>كبدة، جزر، بطاطا حلوة، مانجو، سبانخ</td><td>الدهون تساعد على الامتصاص (زيت زيتون)</td></tr>
<tr><td>الزنك</td><td>5 ملغ</td><td>8 ملغ</td><td>لحوم حمراء، بذور يقطين، حمص</td><td>المصادر الحيوانية أفضل امتصاصاً</td></tr>
<tr><td>الكالسيوم</td><td>1,000 ملغ</td><td>1,300 ملغ</td><td>لبن، زبادي، جبن، سردين بالعظم</td><td>يحتاج فيتامين د للامتصاص</td></tr>
<tr><td>فيتامين د</td><td>600 وحدة</td><td>600 وحدة</td><td>أشعة الشمس، أسماك دهنية، بيض</td><td>15–20 دقيقة شمس يومياً</td></tr>
<tr><td>اليود</td><td>90 ميكروغرام</td><td>120 ميكروغرام</td><td>ملح معالج باليود، أسماك، ألبان</td><td>تأكد أن الملح "معالج باليود"</td></tr>
<tr><td>فيتامين C</td><td>25 ملغ</td><td>45 ملغ</td><td>برتقال، ليمون، فلفل، جوافة، فراولة</td><td>يتلف بالحرارة — قدّم الفواكه طازجة</td></tr>
</tbody>
</table>

<h2>ملخص التوصيات:</h2>
<ul>
<li>نوّع في المجموعات الغذائية — 5 على الأقل يومياً</li>
<li>استخدم الملح المعالج باليود</li>
<li>قدّم فيتامين C مع مصادر الحديد</li>
<li>تأكد من حصول طفلك على 15–20 دقيقة شمس يومياً</li>
<li>الكبدة مرة أسبوعياً تغطي فيتامين أ والحديد والزنك معاً</li>
</ul>
</div>`,
        content_en: `<div dir="ltr">
<p>This table consolidates everything we learned in Axis Three about the essential micronutrients for your child's growth. Use it as a quick reference when shopping or preparing meals.</p>

<h2>Comprehensive Reference Table:</h2>
<table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse:collapse;">
<thead><tr><th>Nutrient</th><th>Daily Need (4–8 y)</th><th>Daily Need (9–13 y)</th><th>Top Sources</th><th>Absorption Tip</th></tr></thead>
<tbody>
<tr><td>Iron</td><td>10 mg</td><td>8 mg</td><td>Liver, red meat, fava beans, lentils, spinach</td><td>Serve with vitamin C; avoid tea after meals</td></tr>
<tr><td>Vitamin A</td><td>400 mcg</td><td>600 mcg</td><td>Liver, carrots, sweet potato, mango, spinach</td><td>Fat helps absorption (olive oil)</td></tr>
<tr><td>Zinc</td><td>5 mg</td><td>8 mg</td><td>Red meat, pumpkin seeds, chickpeas</td><td>Animal sources have better absorption</td></tr>
<tr><td>Calcium</td><td>1,000 mg</td><td>1,300 mg</td><td>Milk, yogurt, cheese, sardines with bones</td><td>Needs vitamin D for absorption</td></tr>
<tr><td>Vitamin D</td><td>600 IU</td><td>600 IU</td><td>Sunlight, fatty fish, eggs</td><td>15–20 minutes of sun daily</td></tr>
<tr><td>Iodine</td><td>90 mcg</td><td>120 mcg</td><td>Iodized salt, fish, dairy</td><td>Ensure salt is "iodized"</td></tr>
<tr><td>Vitamin C</td><td>25 mg</td><td>45 mg</td><td>Orange, lemon, bell pepper, guava, strawberry</td><td>Destroyed by heat — serve fruits fresh</td></tr>
</tbody>
</table>

<h2>Key Recommendations Summary:</h2>
<ul>
<li>Diversify across food groups — at least 5 daily</li>
<li>Use iodized salt</li>
<li>Serve vitamin C with iron sources</li>
<li>Ensure your child gets 15–20 minutes of sunshine daily</li>
<li>Liver once weekly covers vitamin A, iron, and zinc together</li>
</ul>
</div>`,
        practical_tips_ar: ['اطبع هذا الجدول وعلّقه على الثلاجة — سيصبح مرجعك اليومي السريع عند تحضير الوجبات والتسوق.'],
        practical_tips_en: ['Print this table and hang it on the fridge — it will become your quick daily reference when preparing meals and shopping.'],
        sources_ar: [
            'IOM. (2001, 2005, 2011). Dietary Reference Intakes series. National Academies Press.',
            'NHS. (2023). Food sources of vitamins and minerals for children.',
        ],
        sources_en: [
            'IOM. (2001, 2005, 2011). Dietary Reference Intakes series. National Academies Press.',
            'NHS. (2023). Food sources of vitamins and minerals for children.',
        ],
        tags_ar: ['مغذيات دقيقة', 'جدول مرجعي', 'حديد', 'كالسيوم', 'فيتامين أ', 'فيتامين د', 'زنك', 'يود', 'فيتامين C', 'ملخص غذائي'],
        tags_en: ['Micronutrients', 'Reference Table', 'Iron', 'Calcium', 'Vitamin A', 'Vitamin D', 'Zinc', 'Iodine', 'Vitamin C', 'Nutrition Summary'],
        meta: {
            meta_title_ar: 'ملخص المغذيات الدقيقة — جدول مرجعي شامل',
            meta_title_en: 'Micronutrient Summary — Comprehensive Reference',
            meta_description_ar: 'جدول مرجعي شامل يجمع الاحتياج اليومي والمصادر المصرية ونصائح الامتصاص لكل المغذيات الدقيقة الأساسية لطفلك.',
            meta_description_en: 'A comprehensive reference table with daily needs, Egyptian sources, and absorption tips for all essential micronutrients for your child.',
            reading_time_minutes: 3,
            og_title_ar: 'ملخص المغذيات الدقيقة — جدولك المرجعي الشامل',
            og_title_en: 'Micronutrient Summary — Your Comprehensive Reference Table',
            og_description_ar: 'اطبعه وعلّقه في المطبخ. كل ما يحتاجه طفلك من مغذيات في جدول واحد.',
            og_description_en: 'Print it and hang it in the kitchen. All your child\'s nutrient needs in one table.',
        },
    },
];
