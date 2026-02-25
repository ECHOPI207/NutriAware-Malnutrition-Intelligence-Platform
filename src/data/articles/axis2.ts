import type { InterventionArticle } from '../interventionArticles';

const AXIS_AR = 'التغذية المتوازنة والمغذيات الكبرى';
const AXIS_EN = 'Balanced Nutrition & Macronutrients';

export const axis2Articles: InterventionArticle[] = [
    // ─────────────────────────────────────────────
    // Article 6
    // ─────────────────────────────────────────────
    {
        id: 6,
        axis: 2, axis_ar: AXIS_AR, axis_en: AXIS_EN, week_range: '3-4',
        title_ar: 'طبق الطفل المتوازن — دليلك العملي لكل وجبة',
        title_en: 'The Balanced Child\'s Plate — Your Practical Guide for Every Meal',
        slug_ar: 'طبق-الطفل-المتوازن',
        slug_en: 'balanced-childs-plate',
        quick_summary_ar: [
            'الطفل يحتاج نشويات وبروتين ودهون صحية وخضروات في كل وجبة رئيسية',
            'التوزيع المثالي: 45–65% كربوهيدرات، 10–30% بروتين، 25–35% دهون',
            'تقسيم الطبق بصرياً أسهل وأعملي من حساب السعرات',
        ],
        quick_summary_en: [
            'A child needs carbohydrates, protein, healthy fats, and vegetables in every main meal',
            'Ideal distribution: 45–65% carbohydrates, 10–30% protein, 25–35% fats',
            'Visual plate division is easier and more practical than calorie counting',
        ],
        content_ar: `<div dir="rtl">
<p>التغذية المتوازنة لا تعني فقط "أن يأكل الطفل" — بل تعني أن يحصل على النسب الصحيحة من المغذيات الكبرى الثلاثة في كل وجبة. وفقاً لتوصيات المعهد الأمريكي للطب (IOM)، يحتاج الأطفال من 4–18 سنة إلى توزيع المغذيات الكبرى (AMDR) كالتالي:</p>
<ul>
<li><strong>الكربوهيدرات:</strong> 45–65% من إجمالي السعرات (المصدر الرئيسي للطاقة)</li>
<li><strong>البروتينات:</strong> 10–30% (البناء والنمو)</li>
<li><strong>الدهون:</strong> 25–35% (نمو المخ والأعصاب)</li>
</ul>

<h2>طريقة تقسيم الطبق بصرياً (بدون حساب سعرات):</h2>
<ul>
<li><strong>نصف الطبق:</strong> خضروات وفواكه (ملوّنة ومتنوعة)</li>
<li><strong>ربع الطبق:</strong> نشويات (أرز، مكرونة، خبز — ويُفضّل الحبوب الكاملة)</li>
<li><strong>ربع الطبق:</strong> بروتين (لحوم، دواجن، أسماك، بيض، بقوليات)</li>
<li><strong>جانب صغير:</strong> حصة ألبان (كوب لبن أو قطعة جبن) + ملعقة زيت زيتون أو مكسرات</li>
</ul>

<h2>مثال عملي لوجبة غداء متوازنة:</h2>
<p>أرز بسمتي (كربوهيدرات) + قطعة دجاج مشوية (بروتين) + سلطة خضراء مع زيت زيتون (خضروات + دهون صحية) + كوب عصير برتقال طبيعي (فيتامين C لامتصاص الحديد)[15][16]</p>
</div>`,
        content_en: `<div dir="ltr">
<p>Balanced nutrition doesn't just mean "the child eats" — it means obtaining the correct proportions of the three macronutrients in every meal. According to the Institute of Medicine (IOM) recommendations, children aged 4–18 years need the following Acceptable Macronutrient Distribution Ranges (AMDR):</p>
<ul>
<li><strong>Carbohydrates:</strong> 45–65% of total calories (the primary energy source)</li>
<li><strong>Proteins:</strong> 10–30% (building and growth)</li>
<li><strong>Fats:</strong> 25–35% (brain and nerve development)</li>
</ul>

<h2>Visual Plate Division Method (without calorie counting):</h2>
<ul>
<li><strong>Half the plate:</strong> Vegetables and fruits (colorful and varied)</li>
<li><strong>Quarter of the plate:</strong> Carbohydrates (rice, pasta, bread — whole grains preferred)</li>
<li><strong>Quarter of the plate:</strong> Protein (meat, poultry, fish, eggs, legumes)</li>
<li><strong>Small side:</strong> Dairy serving (cup of milk or piece of cheese) + tablespoon of olive oil or nuts</li>
</ul>

<h2>Practical Example of a Balanced Lunch:</h2>
<p>Basmati rice (carbohydrates) + grilled chicken piece (protein) + green salad with olive oil (vegetables + healthy fats) + glass of natural orange juice (vitamin C for iron absorption)[15][16]</p>
</div>`,
        sources_ar: [
            'Institute of Medicine. (2005). Dietary Reference Intakes for Energy, Carbohydrate, Fiber, Fat, Fatty Acids, Cholesterol, Protein, and Amino Acids. National Academies Press.',
            'WHO. (2026). Healthy diet fact sheet. WHO.',
        ],
        sources_en: [
            'Institute of Medicine. (2005). Dietary Reference Intakes for Energy, Carbohydrate, Fiber, Fat, Fatty Acids, Cholesterol, Protein, and Amino Acids. National Academies Press.',
            'WHO. (2026). Healthy diet fact sheet. WHO.',
        ],
        tags_ar: ['طبق متوازن', 'التغذية المتوازنة', 'المغذيات الكبرى', 'كربوهيدرات', 'بروتين', 'دهون', 'تقسيم الطبق', 'تغذية الأطفال', 'AMDR', 'وجبات صحية'],
        tags_en: ['Balanced Plate', 'Balanced Nutrition', 'Macronutrients', 'Carbohydrates', 'Protein', 'Fats', 'Plate Division', 'Child Nutrition', 'AMDR', 'Healthy Meals'],
        meta: {
            meta_title_ar: 'طبق الطفل المتوازن — دليلك العملي لكل وجبة',
            meta_title_en: 'The Balanced Child\'s Plate — Practical Meal Guide',
            meta_description_ar: 'تعلم طريقة تقسيم الطبق بصرياً لضمان حصول طفلك على النسب الصحيحة من الكربوهيدرات والبروتين والدهون في كل وجبة.',
            meta_description_en: 'Learn the visual plate division method to ensure your child gets the right proportions of carbohydrates, protein, and fats in every meal.',
            reading_time_minutes: 3,
            og_title_ar: 'طبق الطفل المتوازن — دليلك العملي لكل وجبة',
            og_title_en: 'The Balanced Child\'s Plate — Your Practical Meal Guide',
            og_description_ar: 'تقسيم الطبق بصرياً أسهل من حساب السعرات. تعلم الطريقة الصحيحة.',
            og_description_en: 'Visual plate division is easier than calorie counting. Learn the right method.',
        },
    },

    // ─────────────────────────────────────────────
    // Article 7
    // ─────────────────────────────────────────────
    {
        id: 7,
        axis: 2, axis_ar: AXIS_AR, axis_en: AXIS_EN, week_range: '3-4',
        title_ar: 'الكربوهيدرات والبروتين والدهون — الثلاثي الذي يحتاجه كل طفل',
        title_en: 'Carbohydrates, Protein & Fats — The Trio Every Child Needs',
        slug_ar: 'الكربوهيدرات-والبروتين-والدهون',
        slug_en: 'carbohydrates-protein-and-fats',
        quick_summary_ar: [
            'الكربوهيدرات ليست عدوّاً — لكن نوعيتها هي الفرق',
            'البروتين ضروري لنمو العضلات والمناعة — والبقوليات بديل اقتصادي ممتاز',
            'الدهون الصحية ضرورية لنمو دماغ الطفل — لكن الدهون المتحولة خطر حقيقي',
        ],
        quick_summary_en: [
            'Carbohydrates are not the enemy — but their quality makes the difference',
            'Protein is essential for muscle growth and immunity — legumes are an excellent economical alternative',
            'Healthy fats are essential for brain development — but trans fats are a real danger',
        ],
        content_ar: `<div dir="rtl">
<h2>الكربوهيدرات — وقود الجسم:</h2>
<p>الكربوهيدرات هي المصدر الأول للطاقة التي يحتاجها دماغ الطفل وعضلاته. لكن هناك فرقاً جوهرياً بين الكربوهيدرات "الذكية" والكربوهيدرات "الفارغة":</p>

<table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse:collapse;">
<thead><tr><th>كربوهيدرات ذكية (مُعقّدة)</th><th>كربوهيدرات فارغة (بسيطة)</th></tr></thead>
<tbody>
<tr><td>خبز أسمر / بلدي</td><td>خبز أبيض مُكرّر</td></tr>
<tr><td>أرز بسمتي أو بني</td><td>حلويات ومعجنات</td></tr>
<tr><td>بطاطا حلوة</td><td>مشروبات غازية</td></tr>
<tr><td>شوفان وحبوب كاملة</td><td>عصائر محلّاة صناعياً</td></tr>
<tr><td>فول وعدس</td><td>شيبسي وسناكس مُصنّعة</td></tr>
</tbody>
</table>

<h2>البروتين — مادة البناء:</h2>
<p>يحتاج الطفل في سن 4–8 سنوات حوالي 15 جرام بروتين يومياً، ويزداد إلى 27–44 جرام في سن 9–18 سنة. البروتين ضروري لبناء العضلات وإصلاح الأنسجة ودعم جهاز المناعة.[17]</p>

<h3>مصادر اقتصادية للبروتين:</h3>
<ul>
<li>بيض (مصدر كامل ورخيص)</li>
<li>فول وعدس وحمص (بروتين نباتي ممتاز)</li>
<li>زبادي ولبن</li>
<li>دجاج وأسماك (أفضل من اللحوم المُصنّعة)</li>
</ul>

<h2>الدهون — حماية المخ والأعصاب:</h2>
<p>الدهون الصحية ضرورية لنمو دماغ الطفل — 60% من مخ الإنسان يتكون من دهون. لكن ليست كل الدهون متساوية:</p>
<ul>
<li><strong>دهون صحية (أحادية وعديدة غير مشبعة):</strong> زيت زيتون، مكسرات (لوز، جوز)، أسماك دهنية (سلمون، تونة، سردين)، أفوكادو</li>
<li><strong>دهون ضارة (مشبعة ومتحولة):</strong> زبدة بكميات كبيرة، سمن نباتي (مارجرين)، أطعمة مقلية، وجبات سريعة[16]</li>
</ul>
</div>`,
        content_en: `<div dir="ltr">
<h2>Carbohydrates — The Body's Fuel:</h2>
<p>Carbohydrates are the primary energy source needed by a child's brain and muscles. But there is a fundamental difference between "smart" and "empty" carbohydrates:</p>

<table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse:collapse;">
<thead><tr><th>Smart Carbohydrates (Complex)</th><th>Empty Carbohydrates (Simple)</th></tr></thead>
<tbody>
<tr><td>Whole wheat / Egyptian baladi bread</td><td>Refined white bread</td></tr>
<tr><td>Basmati or brown rice</td><td>Sweets and pastries</td></tr>
<tr><td>Sweet potato</td><td>Soft drinks</td></tr>
<tr><td>Oats and whole grains</td><td>Artificially sweetened juices</td></tr>
<tr><td>Fava beans and lentils</td><td>Chips and processed snacks</td></tr>
</tbody>
</table>

<h2>Protein — The Building Block:</h2>
<p>Children aged 4–8 years need about 15 grams of protein daily, increasing to 27–44 grams at age 9–18. Protein is essential for building muscles, repairing tissues, and supporting the immune system.[17]</p>

<h3>Economical Protein Sources:</h3>
<ul>
<li>Eggs (a complete and affordable source)</li>
<li>Fava beans, lentils, and chickpeas (excellent plant protein)</li>
<li>Yogurt and milk</li>
<li>Chicken and fish (better than processed meats)</li>
</ul>

<h2>Fats — Brain & Nerve Protection:</h2>
<p>Healthy fats are essential for a child's brain development — 60% of the human brain is composed of fat. But not all fats are created equal:</p>
<ul>
<li><strong>Healthy fats (mono- and polyunsaturated):</strong> Olive oil, nuts (almonds, walnuts), fatty fish (salmon, tuna, sardines), avocado</li>
<li><strong>Harmful fats (saturated and trans):</strong> Butter in large quantities, margarine, fried foods, fast food[16]</li>
</ul>
</div>`,
        sources_ar: [
            'IOM. (2005). Dietary Reference Intakes.',
            'WHO. (2026). Healthy diet fact sheet. WHO.',
        ],
        sources_en: [
            'IOM. (2005). Dietary Reference Intakes.',
            'WHO. (2026). Healthy diet fact sheet. WHO.',
        ],
        tags_ar: ['كربوهيدرات', 'بروتين', 'دهون', 'المغذيات الكبرى', 'بقوليات', 'حبوب كاملة', 'دهون صحية', 'دهون متحولة', 'تغذية الأطفال', 'نمو الدماغ'],
        tags_en: ['Carbohydrates', 'Protein', 'Fats', 'Macronutrients', 'Legumes', 'Whole Grains', 'Healthy Fats', 'Trans Fats', 'Child Nutrition', 'Brain Development'],
        meta: {
            meta_title_ar: 'الكربوهيدرات والبروتين والدهون — ثلاثي نمو طفلك',
            meta_title_en: 'Carbs, Protein & Fats — Your Child\'s Growth Trio',
            meta_description_ar: 'تعرف على الفرق بين الكربوهيدرات الذكية والفارغة، ومصادر البروتين الاقتصادية، والدهون الصحية الضرورية لنمو دماغ طفلك.',
            meta_description_en: 'Learn the difference between smart and empty carbs, economical protein sources, and healthy fats essential for your child\'s brain development.',
            reading_time_minutes: 4,
            og_title_ar: 'الكربوهيدرات والبروتين والدهون — الثلاثي الذي يحتاجه كل طفل',
            og_title_en: 'Carbohydrates, Protein & Fats — The Trio Every Child Needs',
            og_description_ar: '60% من مخ الإنسان دهون. تعرف على المغذيات الكبرى الثلاثة الضرورية لنمو طفلك.',
            og_description_en: '60% of the human brain is fat. Learn about the three essential macronutrients for your child\'s growth.',
        },
    },

    // ─────────────────────────────────────────────
    // Article 8
    // ─────────────────────────────────────────────
    {
        id: 8,
        axis: 2, axis_ar: AXIS_AR, axis_en: AXIS_EN, week_range: '3-4',
        title_ar: 'وجبة الإفطار والسناكس الصحية — وقود يوم طفلك المدرسي',
        title_en: 'Breakfast & Healthy Snacks — Fuel for Your Child\'s School Day',
        slug_ar: 'وجبة-الإفطار-والسناكس-الصحية',
        slug_en: 'breakfast-and-healthy-snacks',
        quick_summary_ar: [
            'الأطفال الذين يتناولون إفطاراً صحياً يتفوقون أكاديمياً بنسبة ملموسة',
            'السناكس ليست عدوّاً — لكن اختيارها الذكي هو المفتاح',
            'بدائل عملية ولذيذة للشيبسي والحلويات متاحة وبنفس التكلفة',
        ],
        quick_summary_en: [
            'Children who eat a healthy breakfast perform noticeably better academically',
            'Snacks are not the enemy — but smart selection is the key',
            'Practical and delicious alternatives to chips and sweets are available at the same cost',
        ],
        content_ar: `<div dir="rtl">
<h2>لماذا الإفطار ضروري؟</h2>
<p>بعد 8–10 ساعات من النوم، يكون مخزون الجلوكوز في جسم الطفل قد نفد. الإفطار يعيد تزويد الدماغ بالوقود اللازم للتركيز والتعلم. الأطفال الذين يُهملون الإفطار يميلون إلى تناول أطعمة غير صحية لاحقاً في اليوم ويكونون أقل قدرة على الانتباه.</p>

<h2>إفطار صحي سريع (5 دقائق):</h2>
<ul>
<li>بيضة مسلوقة + قطعة جبن + خبز بلدي + خيار = بروتين + كالسيوم + كربوهيدرات + فيتامينات</li>
<li>شوفان مع لبن ومكسرات وموز = ألياف + بروتين + بوتاسيوم</li>
<li>فول مدمس بزيت زيتون + طماطم + ليمون = بروتين نباتي + حديد + فيتامين C</li>
</ul>

<h2>بدائل السناكس الصحية:</h2>
<table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse:collapse;">
<thead><tr><th>بدل هذا ❌</th><th>جرّب هذا ✅</th></tr></thead>
<tbody>
<tr><td>شيبسي</td><td>فشار منزلي (بدون زبدة زائدة)</td></tr>
<tr><td>شوكولاتة</td><td>تمر محشي بلوز</td></tr>
<tr><td>بسكويت مُحلّى</td><td>بسكويت شوفان منزلي</td></tr>
<tr><td>عصير مُعلّب</td><td>فاكهة طازجة أو عصير طبيعي</td></tr>
<tr><td>حلوى جيلي</td><td>زبادي طبيعي مع فاكهة وعسل</td></tr>
<tr><td>كيك</td><td>خبز محمص مع زبدة فول سوداني</td></tr>
</tbody>
</table>
</div>`,
        content_en: `<div dir="ltr">
<h2>Why Is Breakfast Essential?</h2>
<p>After 8–10 hours of sleep, the child's glucose reserves are depleted. Breakfast refuels the brain with the energy needed for concentration and learning. Children who skip breakfast tend to eat unhealthy foods later in the day and have reduced attention capacity.</p>

<h2>Quick Healthy Breakfast (5 minutes):</h2>
<ul>
<li>Boiled egg + piece of cheese + Egyptian baladi bread + cucumber = protein + calcium + carbohydrates + vitamins</li>
<li>Oats with milk, nuts, and banana = fiber + protein + potassium</li>
<li>Fava beans (ful medames) with olive oil + tomato + lemon = plant protein + iron + vitamin C</li>
</ul>

<h2>Healthy Snack Alternatives:</h2>
<table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse:collapse;">
<thead><tr><th>Instead of This ❌</th><th>Try This ✅</th></tr></thead>
<tbody>
<tr><td>Chips</td><td>Homemade popcorn (without excess butter)</td></tr>
<tr><td>Chocolate</td><td>Dates stuffed with almonds</td></tr>
<tr><td>Sweetened biscuits</td><td>Homemade oat biscuits</td></tr>
<tr><td>Packaged juice</td><td>Fresh fruit or natural juice</td></tr>
<tr><td>Jelly candy</td><td>Natural yogurt with fruit and honey</td></tr>
<tr><td>Cake</td><td>Toast with peanut butter</td></tr>
</tbody>
</table>
</div>`,
        sources_ar: [
            'WHO. (2026). Healthy diet fact sheet. WHO.',
            'CDC. (2025). Preventing childhood obesity: 6 things families can do.',
        ],
        sources_en: [
            'WHO. (2026). Healthy diet fact sheet. WHO.',
            'CDC. (2025). Preventing childhood obesity: 6 things families can do.',
        ],
        tags_ar: ['إفطار صحي', 'سناكس صحية', 'تغذية مدرسية', 'بدائل صحية', 'فول', 'شوفان', 'تركيز', 'أداء مدرسي', 'تغذية الأطفال', 'وجبات سريعة صحية'],
        tags_en: ['Healthy Breakfast', 'Healthy Snacks', 'School Nutrition', 'Healthy Alternatives', 'Fava Beans', 'Oats', 'Concentration', 'School Performance', 'Child Nutrition', 'Quick Healthy Meals'],
        meta: {
            meta_title_ar: 'وجبة الإفطار والسناكس الصحية — وقود يوم طفلك',
            meta_title_en: 'Breakfast & Healthy Snacks — School Day Fuel',
            meta_description_ar: 'الإفطار الصحي يحسن أداء طفلك الأكاديمي. تعرف على وجبات إفطار سريعة وبدائل صحية للسناكس المضرة بنفس التكلفة.',
            meta_description_en: 'A healthy breakfast improves your child\'s academic performance. Learn quick breakfast ideas and healthy snack alternatives at the same cost.',
            reading_time_minutes: 3,
            og_title_ar: 'وجبة الإفطار والسناكس الصحية — وقود يوم طفلك المدرسي',
            og_title_en: 'Breakfast & Healthy Snacks — Fuel for Your Child\'s School Day',
            og_description_ar: 'بدائل عملية للشيبسي والحلويات بنفس التكلفة. إفطار صحي في 5 دقائق.',
            og_description_en: 'Practical alternatives to chips and sweets at the same cost. Healthy breakfast in 5 minutes.',
        },
    },

    // ─────────────────────────────────────────────
    // Article 9
    // ─────────────────────────────────────────────
    {
        id: 9,
        axis: 2, axis_ar: AXIS_AR, axis_en: AXIS_EN, week_range: '3-4',
        title_ar: 'قراءة البطاقة الغذائية — مهارة تحمي صحة أسرتك',
        title_en: 'Reading the Nutrition Label — A Skill That Protects Your Family\'s Health',
        slug_ar: 'قراءة-البطاقة-الغذائية',
        slug_en: 'reading-the-nutrition-label',
        quick_summary_ar: [
            'البطاقة الغذائية تكشف الحقيقة التي لا يخبرك بها الإعلان',
            '5 أشياء تبحث عنها فوراً: السكر المضاف، الصوديوم، الدهون المتحولة، حجم الحصة، السعرات',
            '"منتج صحي" أو "طبيعي" على العبوة لا يعني بالضرورة أنه صحي فعلاً',
        ],
        quick_summary_en: [
            'The nutrition label reveals the truth that advertising doesn\'t tell you',
            '5 things to look for immediately: added sugars, sodium, trans fats, serving size, calories',
            '"Healthy product" or "natural" on the package doesn\'t necessarily mean it is actually healthy',
        ],
        content_ar: `<div dir="rtl">
<p>كثير من الأهالي يشترون منتجات لأطفالهم بناءً على الشكل أو الإعلان دون قراءة البطاقة الغذائية (Nutrition Facts Label). هذه المهارة البسيطة يمكن أن تُحدث فرقاً كبيراً في صحة طفلك.[18]</p>

<h2>5 أشياء ابحث عنها فوراً:</h2>
<ol>
<li><strong>حجم الحصة (Serving Size):</strong> الأرقام المكتوبة تخص حصة واحدة — وقد تحتوي العبوة على 2 أو 3 حصص. إذا أكل طفلك العبوة كاملة، اضرب كل الأرقام في عدد الحصص.</li>
<li><strong>السكر المضاف (Added Sugars):</strong> توصي منظمة الصحة العالمية بألا يتجاوز السكر المضاف 10% من السعرات اليومية — أي حوالي 25 جرام (6 ملاعق صغيرة) للطفل. بعض علب العصير المُحلّى تحتوي أكثر من ذلك في عبوة واحدة.[16]</li>
<li><strong>الصوديوم (الملح):</strong> الأطفال من 4–8 سنوات يحتاجون أقل من 1,200 ملغ صوديوم يومياً. المنتجات المُعلّبة والشيبسي والأجبان المُصنّعة تحتوي كميات مرتفعة جداً.</li>
<li><strong>الدهون المتحولة (Trans Fat):</strong> يجب أن تكون صفراً. ابحث أيضاً عن "زيت مهدرج جزئياً" في قائمة المكونات.</li>
<li><strong>المكونات:</strong> مرتبة من الأكثر إلى الأقل. إذا كان السكر أو الزيت في أول 3 مكونات — المنتج غير صحي غالباً.</li>
</ol>
</div>`,
        content_en: `<div dir="ltr">
<p>Many parents buy products for their children based on appearance or advertising without reading the Nutrition Facts Label. This simple skill can make a significant difference in your child's health.[18]</p>

<h2>5 Things to Look for Immediately:</h2>
<ol>
<li><strong>Serving Size:</strong> The numbers listed are for one serving — and the package may contain 2 or 3 servings. If your child eats the entire package, multiply all numbers by the number of servings.</li>
<li><strong>Added Sugars:</strong> The WHO recommends that added sugars should not exceed 10% of daily calories — approximately 25 grams (6 teaspoons) for a child. Some sweetened juice boxes contain more than that in a single container.[16]</li>
<li><strong>Sodium (Salt):</strong> Children aged 4–8 years need less than 1,200 mg of sodium daily. Canned products, chips, and processed cheeses contain very high amounts.</li>
<li><strong>Trans Fat:</strong> This should be zero. Also look for "partially hydrogenated oil" in the ingredients list.</li>
<li><strong>Ingredients:</strong> Listed from most to least. If sugar or oil is among the first 3 ingredients — the product is likely unhealthy.</li>
</ol>
</div>`,
        sources_ar: [
            'WHO. (2026). Healthy diet fact sheet. WHO.',
            'Sindhu, S., & Madaiah, M. (2023). Impact of educational intervention in promoting KAP of food label information. Journal of Family Medicine and Primary Care.',
        ],
        sources_en: [
            'WHO. (2026). Healthy diet fact sheet. WHO.',
            'Sindhu, S., & Madaiah, M. (2023). Impact of educational intervention in promoting KAP of food label information. Journal of Family Medicine and Primary Care.',
        ],
        tags_ar: ['البطاقة الغذائية', 'سكر مضاف', 'صوديوم', 'دهون متحولة', 'حجم الحصة', 'قراءة الملصقات', 'تغذية الأطفال', 'منتجات صحية', 'وعي غذائي', 'مكونات الأغذية'],
        tags_en: ['Nutrition Label', 'Added Sugars', 'Sodium', 'Trans Fats', 'Serving Size', 'Label Reading', 'Child Nutrition', 'Healthy Products', 'Food Awareness', 'Food Ingredients'],
        meta: {
            meta_title_ar: 'قراءة البطاقة الغذائية — مهارة تحمي صحة أسرتك',
            meta_title_en: 'Reading the Nutrition Label — Family Health Skill',
            meta_description_ar: '5 أشياء تبحث عنها فوراً في البطاقة الغذائية: السكر المضاف، الصوديوم، الدهون المتحولة، حجم الحصة، والمكونات. مهارة تحمي صحة طفلك.',
            meta_description_en: '5 things to look for immediately on the nutrition label: added sugars, sodium, trans fats, serving size, and ingredients. A skill that protects your child\'s health.',
            reading_time_minutes: 3,
            og_title_ar: 'قراءة البطاقة الغذائية — مهارة تحمي صحة أسرتك',
            og_title_en: 'Reading the Nutrition Label — A Skill That Protects Your Family',
            og_description_ar: 'البطاقة الغذائية تكشف الحقيقة التي لا يخبرك بها الإعلان. تعلم قراءتها.',
            og_description_en: 'The nutrition label reveals the truth advertising hides. Learn to read it.',
        },
    },

    // ─────────────────────────────────────────────
    // Article 10
    // ─────────────────────────────────────────────
    {
        id: 10,
        axis: 2, axis_ar: AXIS_AR, axis_en: AXIS_EN, week_range: '3-4',
        title_ar: 'سمنة الأطفال والوجبات السريعة — متى يصبح الوزن خطراً',
        title_en: 'Childhood Obesity & Fast Food — When Weight Becomes a Danger',
        slug_ar: 'سمنة-الأطفال-والوجبات-السريعة',
        slug_en: 'childhood-obesity-and-fast-food',
        quick_summary_ar: [
            '15.7% من الأطفال المصريين تحت 5 سنوات يعانون من الوزن الزائد',
            'السمنة في الطفولة تزيد خطر السكري وأمراض القلب في الكبر',
            'الحل ليس "حرمان" الطفل — بل تغيير البيئة الغذائية حوله',
        ],
        quick_summary_en: [
            '15.7% of Egyptian children under 5 suffer from overweight',
            'Childhood obesity increases the risk of diabetes and heart disease in adulthood',
            'The solution is not "depriving" the child — but changing the food environment around them',
        ],
        content_ar: `<div dir="rtl">
<p>سمنة الأطفال أصبحت مشكلة صحية عالمية تتصاعد بسرعة مقلقة. في مصر، تبلغ نسبة الأطفال تحت 5 سنوات الذين يعانون من الوزن الزائد 15.7% — وهي نسبة تتجاوز المتوسط الأفريقي (6.0%) بأكثر من الضعف. الأطفال الذين يعانون من السمنة في طفولتهم أكثر عرضة للإصابة بالسكري من النوع الثاني وارتفاع ضغط الدم وأمراض القلب والاكتئاب في مراحل لاحقة من حياتهم.[19][20][21]</p>

<h2>كيف تعرف إذا كان وزن طفلك مقلقاً؟</h2>
<p>الطريقة العلمية هي حساب مؤشر كتلة الجسم حسب العمر (BMI-for-Age) ومقارنته بمعايير منظمة الصحة العالمية:[22][4]</p>
<table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse:collapse;">
<thead><tr><th>التصنيف</th><th>Z-score</th></tr></thead>
<tbody>
<tr><td>نحيف</td><td>أقل من −2</td></tr>
<tr><td>طبيعي</td><td>−2 إلى +1</td></tr>
<tr><td>وزن زائد</td><td>أعلى من +1</td></tr>
<tr><td>سمنة</td><td>أعلى من +2</td></tr>
</tbody>
</table>
<p>يمكنك استخدام أداة حساب BMI الموجودة على منصة NutriAware لمعرفة تصنيف طفلك.</p>

<h2>ما الذي تفعله الوجبات السريعة فعلاً؟</h2>
<p>وجبة برجر + بطاطس مقلية + مشروب غازي متوسط = حوالي 900–1,200 سعرة حرارية — وهو ما يمثل 60–75% من احتياج الطفل اليومي الكامل في وجبة واحدة. والمشكلة ليست السعرات فقط، بل أن هذه الوجبة:</p>
<ul>
<li>غنية بالدهون المشبعة والمتحولة</li>
<li>غنية بالصوديوم (1,000–1,500 ملغ في وجبة واحدة)</li>
<li>فقيرة جداً في الألياف والفيتامينات والمعادن</li>
</ul>

<h2>التوصيات العملية:</h2>
<p>منظمة الصحة العالمية توصي بما يلي للوقاية من سمنة الأطفال:[19]</p>
<ul>
<li>زيادة استهلاك الفواكه والخضروات والبقوليات والحبوب الكاملة</li>
<li>تقليل حجم الحصص</li>
<li>تقليل الدهون المشبعة واستبدالها بدهون غير مشبعة</li>
<li>تقليل السكريات المضافة</li>
<li>ممارسة 60 دقيقة نشاط بدني يومياً على الأقل</li>
</ul>
</div>`,
        content_en: `<div dir="ltr">
<p>Childhood obesity has become a global health problem escalating at an alarming rate. In Egypt, 15.7% of children under 5 suffer from overweight — a rate that exceeds the African average (6.0%) by more than double. Children who suffer from obesity in childhood are more likely to develop type 2 diabetes, hypertension, heart disease, and depression later in life.[19][20][21]</p>

<h2>How Do You Know If Your Child's Weight Is Concerning?</h2>
<p>The scientific method is to calculate BMI-for-Age and compare it with WHO standards:[22][4]</p>
<table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse:collapse;">
<thead><tr><th>Classification</th><th>Z-score</th></tr></thead>
<tbody>
<tr><td>Underweight</td><td>Below −2</td></tr>
<tr><td>Normal</td><td>−2 to +1</td></tr>
<tr><td>Overweight</td><td>Above +1</td></tr>
<tr><td>Obese</td><td>Above +2</td></tr>
</tbody>
</table>
<p>You can use the BMI calculator tool on the NutriAware platform to determine your child's classification.</p>

<h2>What Does Fast Food Actually Do?</h2>
<p>A burger + French fries + medium soft drink = approximately 900–1,200 calories — representing 60–75% of a child's entire daily requirement in a single meal. The problem is not just the calories, but that this meal is:</p>
<ul>
<li>High in saturated and trans fats</li>
<li>High in sodium (1,000–1,500 mg in a single meal)</li>
<li>Very low in fiber, vitamins, and minerals</li>
</ul>

<h2>Practical Recommendations:</h2>
<p>WHO recommends the following for preventing childhood obesity:[19]</p>
<ul>
<li>Increase consumption of fruits, vegetables, legumes, and whole grains</li>
<li>Reduce portion sizes</li>
<li>Reduce saturated fats and replace them with unsaturated fats</li>
<li>Reduce added sugars</li>
<li>At least 60 minutes of physical activity daily</li>
</ul>
</div>`,
        sources_ar: [
            'Global Nutrition Report. (2024). Egypt nutrition profile.',
            'Bonsu, E. O., & Addo, I. Y. (2022). Prevalence and correlates of overweight and obesity among under-five children in Egypt. Frontiers in Public Health.',
            'WHO. (2025). Childhood overweight and obesity Q&A.',
        ],
        sources_en: [
            'Global Nutrition Report. (2024). Egypt nutrition profile.',
            'Bonsu, E. O., & Addo, I. Y. (2022). Prevalence and correlates of overweight and obesity among under-five children in Egypt. Frontiers in Public Health.',
            'WHO. (2025). Childhood overweight and obesity Q&A.',
        ],
        tags_ar: ['سمنة الأطفال', 'الوجبات السريعة', 'مؤشر كتلة الجسم', 'السكري', 'نشاط بدني', 'وزن زائد', 'تغذية الأطفال', 'حمية صحية', 'مصر', 'وقاية'],
        tags_en: ['Childhood Obesity', 'Fast Food', 'BMI', 'Diabetes', 'Physical Activity', 'Overweight', 'Child Nutrition', 'Healthy Diet', 'Egypt', 'Prevention'],
        meta: {
            meta_title_ar: 'سمنة الأطفال والوجبات السريعة — متى يصبح الوزن خطراً',
            meta_title_en: 'Childhood Obesity & Fast Food — When Weight Is Risky',
            meta_description_ar: '15.7% من أطفال مصر يعانون من زيادة الوزن. تعرف على مخاطر الوجبات السريعة وطرق الوقاية من سمنة الأطفال وفقاً لتوصيات WHO.',
            meta_description_en: '15.7% of Egyptian children are overweight. Learn about fast food dangers and WHO recommendations for preventing childhood obesity.',
            reading_time_minutes: 4,
            og_title_ar: 'سمنة الأطفال والوجبات السريعة — متى يصبح الوزن خطراً',
            og_title_en: 'Childhood Obesity & Fast Food — When Weight Becomes a Danger',
            og_description_ar: 'وجبة برجر واحدة = 75% من احتياج الطفل اليومي. تعرف على الحل العلمي.',
            og_description_en: 'One burger meal = 75% of a child\'s daily needs. Learn the scientific solution.',
        },
    },
];
