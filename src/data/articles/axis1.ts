import type { InterventionArticle } from '../interventionArticles';

const AXIS_AR = 'سلامة الغذاء';
const AXIS_EN = 'Food Safety';

export const axis1Articles: InterventionArticle[] = [
    // ─────────────────────────────────────────────
    // Article 1
    // ─────────────────────────────────────────────
    {
        id: 1,
        axis: 1, axis_ar: AXIS_AR, axis_en: AXIS_EN, week_range: '1-2',
        title_ar: 'المفاتيح الخمسة لغذاء آمن — دليل منظمة الصحة العالمية لحماية طفلك',
        title_en: 'The Five Keys to Safer Food — WHO Guide to Protecting Your Child',
        slug_ar: 'المفاتيح-الخمسة-لغذاء-آمن',
        slug_en: 'five-keys-to-safer-food',
        quick_summary_ar: [
            'كل عام يُصاب 600 مليون شخص حول العالم بأمراض منقولة بالغذاء',
            'الأطفال تحت 5 سنوات يتحملون 40% من العبء العالمي لهذه الأمراض',
            'خمس خطوات بسيطة يمكنها حماية أسرتك بالكامل',
        ],
        quick_summary_en: [
            'Every year, 600 million people worldwide are affected by foodborne diseases',
            'Children under 5 bear 40% of the global burden of these diseases',
            'Five simple steps can protect your entire family',
        ],
        content_ar: `<div dir="rtl">
<p>تُعد الأمراض المنقولة بالغذاء من أخطر التهديدات الصحية التي تواجه الأطفال. وفقاً لتقديرات منظمة الصحة العالمية (WHO)، يُصاب نحو 600 مليون شخص سنوياً بسبب تناول غذاء ملوّث، ويموت منهم 420,000 شخص، بينهم 125,000 طفل دون الخامسة. والأطفال هم الأكثر عرضة لهذه المخاطر بسبب أجهزتهم المناعية غير المكتملة النمو.[5][6]</p>

<p>لمواجهة هذا التحدي، طوّرت منظمة الصحة العالمية برنامج "المفاتيح الخمسة لغذاء أكثر أماناً"، وهو إطار تثقيفي مُوجّه لكل من يتعامل مع الطعام، سواء في المنزل أو خارجه. وقد تُرجم هذا البرنامج إلى أكثر من 88 لغة واستُخدم في أكثر من 130 دولة حول العالم.[7][8]</p>

<h2>المفتاح الأول: الحفاظ على النظافة</h2>
<p>غسل اليدين بالماء والصابون لمدة 20 ثانية على الأقل قبل لمس الطعام وبعد استخدام المرحاض وبعد لمس الحيوانات. تنظيف جميع الأسطح والأدوات المستخدمة في تحضير الطعام بالماء الساخن والصابون. السبب: الكائنات الدقيقة الخطرة توجد في التربة والمياه والحيوانات والبشر، وتنتقل بسهولة عبر اليدين والأدوات وأسطح التحضير.[9]</p>

<h2>المفتاح الثاني: فصل الأطعمة النيئة عن المطبوخة</h2>
<p>فصل اللحوم النيئة والدواجن والأسماك عن الأطعمة الأخرى أثناء التسوّق والتخزين والتحضير. استخدام ألواح تقطيع وسكاكين منفصلة للحوم النيئة. حفظ الأطعمة في أوعية مغلقة لمنع التلامس بين النيئ والمطبوخ. السبب: اللحوم النيئة قد تحتوي على بكتيريا مثل السالمونيلا والإيكولاي التي تنتقل عبر التلوث المتبادل (Cross-contamination).[10]</p>

<h2>المفتاح الثالث: الطهي الجيد</h2>
<p>طهي الطعام جيداً وخاصة اللحوم والدواجن والبيض والمأكولات البحرية. التأكد من وصول درجة الحرارة الداخلية للحوم إلى 70°م على الأقل. إعادة تسخين الطعام المطبوخ جيداً حتى الغليان. السبب: الطهي السليم يقتل جميع الكائنات الدقيقة الخطرة تقريباً.[11][7]</p>

<h2>المفتاح الرابع: حفظ الطعام في درجات حرارة آمنة</h2>
<p>عدم ترك الطعام المطبوخ في درجة حرارة الغرفة لأكثر من ساعتين. حفظ الأطعمة المطبوخة والقابلة للتلف في الثلاجة (تحت 5°م). عدم تخزين الطعام لفترات طويلة حتى في الثلاجة. "منطقة الخطر" هي بين 5°م و60°م — وفيها تتكاثر البكتيريا بسرعة مضاعفة كل 20 دقيقة.[10][11]</p>

<h2>المفتاح الخامس: استخدام مياه ومواد خام آمنة</h2>
<p>استخدام مياه نظيفة أو معالجتها. اختيار أطعمة طازجة وسليمة. غسل الفواكه والخضروات جيداً. التحقق من تواريخ الصلاحية. عدم استخدام أغذية منتهية الصلاحية مهما بدت سليمة ظاهرياً.[7]</p>
</div>`,
        content_en: `<div dir="ltr">
<p>Foodborne diseases are among the most dangerous health threats facing children. According to WHO estimates, approximately 600 million people fall ill annually from consuming contaminated food, with 420,000 deaths, including 125,000 children under five. Children are the most vulnerable to these risks due to their still-developing immune systems.[5][6]</p>

<p>To combat this challenge, the World Health Organization developed the "Five Keys to Safer Food" program — an educational framework aimed at anyone who handles food, whether at home or elsewhere. This program has been translated into more than 88 languages and used in over 130 countries worldwide.[7][8]</p>

<h2>Key 1: Keep Clean</h2>
<p>Wash hands with soap and water for at least 20 seconds before touching food, after using the toilet, and after touching animals. Clean all surfaces and utensils used in food preparation with hot water and soap. Reason: Dangerous microorganisms are found in soil, water, animals, and people, and are easily transferred via hands, utensils, and preparation surfaces.[9]</p>

<h2>Key 2: Separate Raw and Cooked</h2>
<p>Separate raw meat, poultry, and fish from other foods during shopping, storage, and preparation. Use separate cutting boards and knives for raw meat. Store foods in sealed containers to prevent contact between raw and cooked items. Reason: Raw meat may contain bacteria such as Salmonella and E. coli that spread through cross-contamination.[10]</p>

<h2>Key 3: Cook Thoroughly</h2>
<p>Cook food thoroughly, especially meat, poultry, eggs, and seafood. Ensure that the internal temperature of meat reaches at least 70°C. Reheat cooked food thoroughly until boiling. Reason: Proper cooking kills virtually all dangerous microorganisms.[11][7]</p>

<h2>Key 4: Keep Food at Safe Temperatures</h2>
<p>Do not leave cooked food at room temperature for more than two hours. Store cooked and perishable foods in the refrigerator (below 5°C). Do not store food for extended periods even in the refrigerator. The "danger zone" is between 5°C and 60°C — bacteria double in number every 20 minutes within this range.[10][11]</p>

<h2>Key 5: Use Safe Water and Raw Materials</h2>
<p>Use clean water or treat it. Choose fresh and sound foods. Wash fruits and vegetables thoroughly. Check expiry dates. Do not use expired foods no matter how normal they appear on the outside.[7]</p>
</div>`,
        sources_ar: [
            'World Health Organization. (2026). Five keys to safer food. WHO.',
            'World Health Organization. (2024). Food safety fact sheet. WHO.',
            'WHO. (2015). Estimates of the global burden of foodborne diseases. WHO.',
        ],
        sources_en: [
            'World Health Organization. (2026). Five keys to safer food. WHO.',
            'World Health Organization. (2024). Food safety fact sheet. WHO.',
            'WHO. (2015). Estimates of the global burden of foodborne diseases. WHO.',
        ],
        tags_ar: ['سلامة الغذاء', 'غسل اليدين', 'التلوث الغذائي', 'منظمة الصحة العالمية', 'المفاتيح الخمسة', 'الطهي الآمن', 'حفظ الطعام', 'الأمراض المنقولة بالغذاء', 'حماية الأطفال', 'النظافة'],
        tags_en: ['Food Safety', 'Handwashing', 'Food Contamination', 'WHO', 'Five Keys', 'Safe Cooking', 'Food Storage', 'Foodborne Diseases', 'Child Protection', 'Hygiene'],
        meta: {
            meta_title_ar: 'المفاتيح الخمسة لغذاء آمن — حماية طفلك',
            meta_title_en: 'Five Keys to Safer Food — Protect Your Child',
            meta_description_ar: 'دليل منظمة الصحة العالمية لحماية أسرتك من الأمراض المنقولة بالغذاء: النظافة، فصل الأطعمة، الطهي الجيد، الحرارة الآمنة، والمواد الخام السليمة.',
            meta_description_en: 'WHO guide to protecting your family from foodborne diseases: hygiene, food separation, thorough cooking, safe temperatures, and safe raw materials.',
            reading_time_minutes: 4,
            og_title_ar: 'المفاتيح الخمسة لغذاء آمن — دليل WHO لحماية طفلك',
            og_title_en: 'Five Keys to Safer Food — WHO Guide to Protecting Your Child',
            og_description_ar: '600 مليون شخص يصابون سنوياً بأمراض الغذاء. تعرف على المفاتيح الخمسة لحماية أسرتك.',
            og_description_en: '600 million people are affected by foodborne diseases annually. Learn the five keys to protect your family.',
        },
    },

    // ─────────────────────────────────────────────
    // Article 2
    // ─────────────────────────────────────────────
    {
        id: 2,
        axis: 1, axis_ar: AXIS_AR, axis_en: AXIS_EN, week_range: '1-2',
        title_ar: 'مبادئ HACCP في مطبخك — كيف تحمي عائلتك بأسلوب علمي',
        title_en: 'HACCP Principles in Your Kitchen — Protecting Your Family the Scientific Way',
        slug_ar: 'مبادئ-HACCP-في-مطبخك',
        slug_en: 'haccp-principles-in-your-kitchen',
        quick_summary_ar: [
            'HACCP نظام علمي يستخدمه المحترفون — ويمكنك تطبيقه في بيتك',
            '3 أنواع من المخاطر تهدد غذاء طفلك: بيولوجية وكيميائية وفيزيائية',
            'كل خطوة من شراء الطعام لتقديمه هي نقطة تحكم يمكنك السيطرة عليها',
        ],
        quick_summary_en: [
            'HACCP is a scientific system used by professionals — and you can apply it at home',
            '3 types of hazards threaten your child\'s food: biological, chemical, and physical',
            'Every step from buying food to serving it is a control point you can manage',
        ],
        content_ar: `<div dir="rtl">
<p>نظام HACCP (تحليل المخاطر ونقاط التحكم الحرجة) هو منهج علمي طورته إدارة الغذاء والدواء الأمريكية (FDA) لضمان سلامة الغذاء من خلال تحديد المخاطر المحتملة والسيطرة عليها في كل مرحلة من مراحل إعداد الطعام. ورغم أن هذا النظام يُستخدم أساساً في المصانع والمطاعم، إلا أن مبادئه قابلة للتطبيق في المطبخ المنزلي بشكل مبسّط وفعّال.[12][10]</p>

<h2>أنواع المخاطر التي تهدد غذاء طفلك:</h2>
<ul>
<li><strong>المخاطر البيولوجية:</strong> البكتيريا (السالمونيلا، الإيكولاي، الليستيريا)، الفيروسات (نوروفيروس، فيروس الكبد A)، والطفيليات. هذه هي الأكثر شيوعاً وخطورة على الأطفال.</li>
<li><strong>المخاطر الكيميائية:</strong> بقايا المبيدات الحشرية على الفواكه والخضروات، السموم الفطرية (الأفلاتوكسين) في المكسرات والحبوب المخزنة بشكل سيء، ومواد التنظيف.</li>
<li><strong>المخاطر الفيزيائية:</strong> شظايا العظام، قطع الزجاج، الحصى، أو أي جسم غريب في الطعام.[12]</li>
</ul>

<h2>نقاط التحكم الحرجة في مطبخك:</h2>
<table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse:collapse;">
<thead><tr><th>المرحلة</th><th>المخاطر</th><th>الإجراء الوقائي</th></tr></thead>
<tbody>
<tr><td>الشراء</td><td>أغذية منتهية الصلاحية أو مخزنة بشكل خاطئ</td><td>تحقق من تاريخ الصلاحية؛ اشترِ المبرّدات أخيراً</td></tr>
<tr><td>التخزين</td><td>تكاثر البكتيريا في حرارة غير مناسبة</td><td>ضع الأغذية القابلة للتلف في الثلاجة فوراً (&lt;5°م)</td></tr>
<tr><td>التحضير</td><td>التلوث المتبادل</td><td>اغسل يديك؛ استخدم أدوات منفصلة للنيئ والمطبوخ</td></tr>
<tr><td>الطهي</td><td>بقاء بكتيريا حية</td><td>تأكد من الطهي الجيد (≥70°م للحوم)</td></tr>
<tr><td>التقديم</td><td>التعرض لحرارة الغرفة طويلاً</td><td>لا تترك الطعام خارج الثلاجة أكثر من ساعتين</td></tr>
<tr><td>بقايا الطعام</td><td>تكاثر البكتيريا</td><td>برّد البقايا سريعاً؛ سخّنها جيداً قبل إعادة التقديم</td></tr>
</tbody>
</table>
</div>`,
        content_en: `<div dir="ltr">
<p>HACCP (Hazard Analysis and Critical Control Points) is a scientific approach developed by the U.S. Food and Drug Administration (FDA) to ensure food safety by identifying potential hazards and controlling them at every stage of food preparation. Although this system is primarily used in factories and restaurants, its principles can be applied in the home kitchen in a simplified and effective manner.[12][10]</p>

<h2>Types of Hazards Threatening Your Child's Food:</h2>
<ul>
<li><strong>Biological hazards:</strong> Bacteria (Salmonella, E. coli, Listeria), viruses (Norovirus, Hepatitis A virus), and parasites. These are the most common and dangerous for children.</li>
<li><strong>Chemical hazards:</strong> Pesticide residues on fruits and vegetables, mycotoxins (aflatoxin) in poorly stored nuts and grains, and cleaning products.</li>
<li><strong>Physical hazards:</strong> Bone fragments, glass pieces, pebbles, or any foreign object in food.[12]</li>
</ul>

<h2>Critical Control Points in Your Kitchen:</h2>
<table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse:collapse;">
<thead><tr><th>Stage</th><th>Hazards</th><th>Preventive Action</th></tr></thead>
<tbody>
<tr><td>Shopping</td><td>Expired or improperly stored foods</td><td>Check expiry dates; buy refrigerated items last</td></tr>
<tr><td>Storage</td><td>Bacterial growth at improper temperatures</td><td>Place perishables in the fridge immediately (&lt;5°C)</td></tr>
<tr><td>Preparation</td><td>Cross-contamination</td><td>Wash hands; use separate utensils for raw and cooked</td></tr>
<tr><td>Cooking</td><td>Surviving bacteria</td><td>Ensure thorough cooking (≥70°C for meat)</td></tr>
<tr><td>Serving</td><td>Long exposure to room temperature</td><td>Don't leave food outside the fridge for more than 2 hours</td></tr>
<tr><td>Leftovers</td><td>Bacterial growth</td><td>Refrigerate quickly; reheat thoroughly before re-serving</td></tr>
</tbody>
</table>
</div>`,
        practical_tips_ar: ['علّقي ورقة صغيرة على الثلاجة بهذه النقاط الست — ستصبح عادة يومية خلال أسابيع.'],
        practical_tips_en: ['Pin a small sheet on the fridge with these six points — it will become a daily habit within weeks.'],
        sources_ar: [
            'U.S. Food and Drug Administration. (2022). HACCP principles and application guidelines. FDA.',
            'eHACCP.org. (2023). Can I use HACCP at home?',
            'Montana Food System Resources. (2023). Food Safety Tool for Home Producers.',
        ],
        sources_en: [
            'U.S. Food and Drug Administration. (2022). HACCP principles and application guidelines. FDA.',
            'eHACCP.org. (2023). Can I use HACCP at home?',
            'Montana Food System Resources. (2023). Food Safety Tool for Home Producers.',
        ],
        tags_ar: ['HACCP', 'سلامة الغذاء', 'المخاطر البيولوجية', 'التلوث المتبادل', 'مطبخ آمن', 'نقاط تحكم', 'حفظ الطعام', 'الطهي الآمن', 'صحة الأطفال', 'وقاية'],
        tags_en: ['HACCP', 'Food Safety', 'Biological Hazards', 'Cross-contamination', 'Safe Kitchen', 'Control Points', 'Food Storage', 'Safe Cooking', 'Child Health', 'Prevention'],
        meta: {
            meta_title_ar: 'مبادئ HACCP في مطبخك — حماية علمية لعائلتك',
            meta_title_en: 'HACCP Principles in Your Kitchen — Scientific Protection',
            meta_description_ar: 'تعرف على نظام HACCP وكيفية تطبيقه في مطبخك المنزلي لحماية طفلك من المخاطر البيولوجية والكيميائية والفيزيائية في الغذاء.',
            meta_description_en: 'Learn the HACCP system and how to apply it in your home kitchen to protect your child from biological, chemical, and physical food hazards.',
            reading_time_minutes: 4,
            og_title_ar: 'مبادئ HACCP في مطبخك — كيف تحمي عائلتك بأسلوب علمي',
            og_title_en: 'HACCP Principles in Your Kitchen — Scientific Family Protection',
            og_description_ar: 'نظام HACCP العلمي يمكنك تطبيقه في بيتك. تعرف على نقاط التحكم الحرجة من الشراء للتقديم.',
            og_description_en: 'The HACCP scientific system can be applied at home. Learn the critical control points from shopping to serving.',
        },
    },

    // ─────────────────────────────────────────────
    // Article 3
    // ─────────────────────────────────────────────
    {
        id: 3,
        axis: 1, axis_ar: AXIS_AR, axis_en: AXIS_EN, week_range: '1-2',
        title_ar: 'التلوث المتبادل وتخزين الطعام — الأخطاء الخفية في المطبخ',
        title_en: 'Cross-Contamination & Food Storage — Hidden Kitchen Mistakes',
        slug_ar: 'التلوث-المتبادل-وتخزين-الطعام',
        slug_en: 'cross-contamination-and-food-storage',
        quick_summary_ar: [
            'التلوث المتبادل هو السبب الأول للتسمم الغذائي المنزلي',
            'ثلاجتك ليست "منطقة آمنة" إذا لم تُنظّم بشكل صحيح',
            'قواعد بسيطة للتخزين تحمي طفلك من أمراض لا تتوقعها',
        ],
        quick_summary_en: [
            'Cross-contamination is the leading cause of domestic food poisoning',
            'Your fridge is not a "safe zone" if not properly organized',
            'Simple storage rules protect your child from unexpected illnesses',
        ],
        content_ar: `<div dir="rtl">
<p>التلوث المتبادل (Cross-contamination) يحدث عندما تنتقل البكتيريا الضارة من طعام نيء إلى طعام جاهز للأكل عبر اليدين أو الأدوات أو أسطح التحضير. هذه العملية غير مرئية تماماً — لا تُغيّر طعم الأكل ولا لونه ولا رائحته — لكنها قد تسبب إسهالاً وقيئاً وحمى شديدة عند الأطفال.[7]</p>

<h2>أخطاء شائعة في المطبخ المصري:</h2>
<ul>
<li>تقطيع الخضروات على نفس لوح تقطيع اللحوم دون غسله</li>
<li>وضع اللحوم النيئة في الرف العلوي للثلاجة فتتقاطر سوائلها على الأطعمة تحتها</li>
<li>استخدام نفس الملعقة لتذوق الطعام أثناء الطهي ثم إعادتها للقدر</li>
<li>غسل الفواكه بالماء فقط دون فركها</li>
</ul>

<h2>قواعد التخزين الآمن:</h2>
<ul>
<li><strong>الثلاجة:</strong> اللحوم النيئة في الرف السفلي (لمنع تقاطر السوائل)، الأطعمة الجاهزة في الأرفف العلوية، الفواكه والخضروات في الدرج المخصص</li>
<li><strong>درجة الحرارة:</strong> الثلاجة يجب أن تكون أقل من 5°م والفريزر أقل من −18°م</li>
<li><strong>قاعدة الساعتين:</strong> أي طعام مطبوخ تُرك خارج الثلاجة أكثر من ساعتين يجب التخلص منه</li>
<li><strong>الأوعية المغلقة:</strong> استخدم دائماً أوعية محكمة الغلق — البكتيريا لا تحتاج سوى الهواء والرطوبة ودرجة حرارة مناسبة للتكاثر[11][10]</li>
</ul>

<h2>تاريخ الصلاحية — الفرق المهم:</h2>
<ul>
<li><strong>"صالح حتى" (Use by):</strong> تاريخ أمان — لا تستخدم المنتج بعده مطلقاً (خاصة اللحوم والألبان)</li>
<li><strong>"يُفضّل استخدامه قبل" (Best before):</strong> تاريخ جودة — المنتج قد يفقد بعض جودته لكنه ليس خطراً بالضرورة</li>
</ul>
</div>`,
        content_en: `<div dir="ltr">
<p>Cross-contamination occurs when harmful bacteria transfer from raw food to ready-to-eat food via hands, utensils, or preparation surfaces. This process is completely invisible — it doesn't change the taste, color, or smell of the food — but it can cause diarrhea, vomiting, and severe fever in children.[7]</p>

<h2>Common Mistakes in the Egyptian Kitchen:</h2>
<ul>
<li>Cutting vegetables on the same chopping board used for meat without washing it</li>
<li>Placing raw meat on the upper fridge shelf, allowing its juices to drip onto foods below</li>
<li>Using the same spoon to taste food while cooking and then returning it to the pot</li>
<li>Washing fruits with water only without scrubbing them</li>
</ul>

<h2>Safe Storage Rules:</h2>
<ul>
<li><strong>Fridge organization:</strong> Raw meat on the bottom shelf (to prevent dripping), ready-to-eat foods on upper shelves, fruits and vegetables in the designated drawer</li>
<li><strong>Temperature:</strong> The fridge should be below 5°C and the freezer below −18°C</li>
<li><strong>Two-hour rule:</strong> Any cooked food left outside the fridge for more than two hours should be discarded</li>
<li><strong>Sealed containers:</strong> Always use airtight containers — bacteria only need air, moisture, and a suitable temperature to multiply[11][10]</li>
</ul>

<h2>Expiry Dates — The Important Difference:</h2>
<ul>
<li><strong>"Use by":</strong> A safety date — do not use the product after this date (especially meat and dairy)</li>
<li><strong>"Best before":</strong> A quality date — the product may lose some quality but is not necessarily dangerous</li>
</ul>
</div>`,
        sources_ar: [
            'WHO. (2026). Five keys to safer food. WHO.',
            'eHACCP.org. (2023). Can I use HACCP at home?',
        ],
        sources_en: [
            'WHO. (2026). Five keys to safer food. WHO.',
            'eHACCP.org. (2023). Can I use HACCP at home?',
        ],
        tags_ar: ['التلوث المتبادل', 'تخزين الطعام', 'الثلاجة', 'سلامة الغذاء', 'تاريخ الصلاحية', 'أخطاء المطبخ', 'حفظ اللحوم', 'نظافة الأدوات', 'صحة الأطفال', 'البكتيريا'],
        tags_en: ['Cross-contamination', 'Food Storage', 'Refrigerator', 'Food Safety', 'Expiry Dates', 'Kitchen Mistakes', 'Meat Storage', 'Utensil Hygiene', 'Child Health', 'Bacteria'],
        meta: {
            meta_title_ar: 'التلوث المتبادل وتخزين الطعام — أخطاء المطبخ الخفية',
            meta_title_en: 'Cross-Contamination & Food Storage — Hidden Mistakes',
            meta_description_ar: 'تعرف على أخطاء التلوث المتبادل الشائعة في المطبخ المصري وقواعد التخزين الآمن لحماية طفلك من التسمم الغذائي.',
            meta_description_en: 'Learn about common cross-contamination mistakes in the kitchen and safe storage rules to protect your child from food poisoning.',
            reading_time_minutes: 3,
            og_title_ar: 'التلوث المتبادل وتخزين الطعام — الأخطاء الخفية في المطبخ',
            og_title_en: 'Cross-Contamination & Food Storage — Hidden Kitchen Mistakes',
            og_description_ar: 'التلوث المتبادل السبب الأول للتسمم الغذائي المنزلي. تعرف على قواعد التخزين الآمن.',
            og_description_en: 'Cross-contamination is the leading cause of domestic food poisoning. Learn safe storage rules.',
        },
    },

    // ─────────────────────────────────────────────
    // Article 4
    // ─────────────────────────────────────────────
    {
        id: 4,
        axis: 1, axis_ar: AXIS_AR, axis_en: AXIS_EN, week_range: '1-2',
        title_ar: 'الأمراض المنقولة بالغذاء عند الأطفال — الأعراض والوقاية',
        title_en: 'Foodborne Diseases in Children — Symptoms & Prevention',
        slug_ar: 'الأمراض-المنقولة-بالغذاء-عند-الأطفال',
        slug_en: 'foodborne-diseases-in-children',
        quick_summary_ar: [
            '220 مليون طفل يصابون بأمراض إسهالية ناتجة عن الغذاء الملوث سنوياً',
            'الأطفال أكثر عرضة بسبب مناعتهم غير المكتملة',
            'معظم هذه الأمراض يمكن الوقاية منها بتطبيق المفاتيح الخمسة',
        ],
        quick_summary_en: [
            '220 million children are affected by diarrheal diseases from contaminated food annually',
            'Children are more vulnerable due to their immature immunity',
            'Most of these diseases can be prevented by applying the Five Keys',
        ],
        content_ar: `<div dir="rtl">
<p>الأمراض المنقولة بالغذاء تُعد من أخطر المشكلات الصحية التي تواجه الأطفال حول العالم. تشير منظمة الصحة العالمية إلى أن الأطفال دون الخامسة يتحملون 40% من عبء الأمراض المنقولة بالغذاء رغم أنهم يمثلون 9% فقط من سكان العالم. ويُصاب حوالي 220 مليون طفل بأمراض إسهالية ناتجة عن تلوث الغذاء سنوياً، يموت منهم قرابة 96,000 طفل.[13][6]</p>

<h2>لماذا الأطفال أكثر عرضة؟</h2>
<ul>
<li>جهازهم المناعي لا يزال في مراحل النمو ولم يكتمل بعد</li>
<li>معدلهم الأيضي أعلى نسبياً مقارنة بوزنهم، مما يعني امتصاص المواد الضارة بسرعة أكبر</li>
<li>يعتمدون بالكامل على الكبار في اختيار وتحضير طعامهم[14]</li>
</ul>

<h2>أشهر مسببات الأمراض عند الأطفال:</h2>
<table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse:collapse;">
<thead><tr><th>الكائن الممرض</th><th>مصادره الشائعة</th><th>الأعراض</th></tr></thead>
<tbody>
<tr><td>السالمونيلا</td><td>البيض غير المطهو جيداً، الدواجن</td><td>إسهال، حمى، مغص</td></tr>
<tr><td>الإيكولاي (E. coli)</td><td>اللحوم غير المطهوة جيداً، الحليب غير المبستر</td><td>إسهال دموي شديد</td></tr>
<tr><td>نوروفيروس</td><td>الأطعمة الملوثة بأيدي محضّريها</td><td>قيء، إسهال مفاجئ</td></tr>
<tr><td>الليستيريا</td><td>الأجبان الطرية، اللحوم الباردة</td><td>حمى، صداع، قيء</td></tr>
</tbody>
</table>

<h2>الحلقة المفرغة: تلوث الغذاء ↔ سوء التغذية</h2>
<p>عندما يُصاب الطفل بإسهال بسبب غذاء ملوث، يفقد جسمه كميات كبيرة من العناصر الغذائية والسوائل. هذا يُضعف مناعته، مما يجعله أكثر عرضة للإصابة مرة أخرى — في حلقة مفرغة من العدوى وسوء التغذية. هذا الرابط بين سلامة الغذاء والحالة الغذائية للطفل هو صلب هذا المشروع البحثي.</p>

<h2>متى تذهب للطبيب فوراً؟</h2>
<ul>
<li>إسهال مستمر لأكثر من 24 ساعة</li>
<li>دم في البراز</li>
<li>حمى أعلى من 38.5°م</li>
<li>علامات الجفاف (جفاف الفم، قلة التبول، بكاء بدون دموع)</li>
</ul>
</div>`,
        content_en: `<div dir="ltr">
<p>Foodborne diseases are among the most dangerous health problems facing children worldwide. The World Health Organization reports that children under five bear 40% of the burden of foodborne diseases despite representing only 9% of the world's population. Approximately 220 million children are affected by diarrheal diseases caused by food contamination annually, with nearly 96,000 deaths.[13][6]</p>

<h2>Why Are Children More Vulnerable?</h2>
<ul>
<li>Their immune systems are still developing and not yet fully mature</li>
<li>Their metabolic rate is relatively higher compared to their weight, meaning faster absorption of harmful substances</li>
<li>They depend entirely on adults for food selection and preparation[14]</li>
</ul>

<h2>Most Common Pathogens in Children:</h2>
<table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse:collapse;">
<thead><tr><th>Pathogen</th><th>Common Sources</th><th>Symptoms</th></tr></thead>
<tbody>
<tr><td>Salmonella</td><td>Undercooked eggs, poultry</td><td>Diarrhea, fever, cramps</td></tr>
<tr><td>E. coli</td><td>Undercooked meat, unpasteurized milk</td><td>Severe bloody diarrhea</td></tr>
<tr><td>Norovirus</td><td>Food contaminated by handlers' hands</td><td>Vomiting, sudden diarrhea</td></tr>
<tr><td>Listeria</td><td>Soft cheeses, cold cuts</td><td>Fever, headache, vomiting</td></tr>
</tbody>
</table>

<h2>The Vicious Cycle: Food Contamination ↔ Malnutrition</h2>
<p>When a child develops diarrhea from contaminated food, their body loses significant amounts of nutrients and fluids. This weakens their immunity, making them more susceptible to reinfection — creating a vicious cycle of infection and malnutrition. This link between food safety and the child's nutritional status is the core of this research project.</p>

<h2>When to See a Doctor Immediately?</h2>
<ul>
<li>Diarrhea lasting more than 24 hours</li>
<li>Blood in stool</li>
<li>Fever above 38.5°C</li>
<li>Signs of dehydration (dry mouth, reduced urination, crying without tears)</li>
</ul>
</div>`,
        sources_ar: [
            'WHO. (2015). Estimates of the global burden of foodborne diseases. WHO.',
            'WHO. (2024). Food safety fact sheet. WHO.',
            'Infectiousdiseaseadvisor.com. (2024). Children account for large amount of foodborne illness related deaths.',
        ],
        sources_en: [
            'WHO. (2015). Estimates of the global burden of foodborne diseases. WHO.',
            'WHO. (2024). Food safety fact sheet. WHO.',
            'Infectiousdiseaseadvisor.com. (2024). Children account for large amount of foodborne illness related deaths.',
        ],
        tags_ar: ['أمراض الغذاء', 'الإسهال', 'السالمونيلا', 'التسمم الغذائي', 'مناعة الأطفال', 'سوء التغذية', 'الوقاية', 'صحة الأطفال', 'البكتيريا', 'نوروفيروس'],
        tags_en: ['Foodborne Diseases', 'Diarrhea', 'Salmonella', 'Food Poisoning', 'Child Immunity', 'Malnutrition', 'Prevention', 'Child Health', 'Bacteria', 'Norovirus'],
        meta: {
            meta_title_ar: 'الأمراض المنقولة بالغذاء عند الأطفال — الأعراض والوقاية',
            meta_title_en: 'Foodborne Diseases in Children — Symptoms & Prevention',
            meta_description_ar: '220 مليون طفل يصابون بأمراض إسهالية سنوياً بسبب الغذاء الملوث. تعرف على الأعراض وطرق الوقاية والحلقة المفرغة بين التلوث وسوء التغذية.',
            meta_description_en: '220 million children contract diarrheal diseases annually from contaminated food. Learn the symptoms, prevention, and the vicious cycle between contamination and malnutrition.',
            reading_time_minutes: 4,
            og_title_ar: 'الأمراض المنقولة بالغذاء عند الأطفال — الأعراض والوقاية',
            og_title_en: 'Foodborne Diseases in Children — Symptoms & Prevention',
            og_description_ar: 'الأطفال تحت 5 سنوات يتحملون 40% من عبء الأمراض المنقولة بالغذاء. تعرف على الوقاية.',
            og_description_en: 'Children under 5 bear 40% of the foodborne disease burden. Learn about prevention.',
        },
    },

    // ─────────────────────────────────────────────
    // Article 5
    // ─────────────────────────────────────────────
    {
        id: 5,
        axis: 1, axis_ar: AXIS_AR, axis_en: AXIS_EN, week_range: '1-2',
        title_ar: 'غسل اليدين وغسل الأطعمة — أبسط حماية وأقواها',
        title_en: 'Handwashing & Food Washing — The Simplest and Strongest Protection',
        slug_ar: 'غسل-اليدين-وغسل-الأطعمة',
        slug_en: 'handwashing-and-food-washing',
        quick_summary_ar: [
            'غسل اليدين بالصابون يمكن أن يقلل حالات الإسهال بنسبة 40%',
            'غسل الفواكه والخضروات يزيل جزءاً كبيراً من بقايا المبيدات والبكتيريا',
            'تعليم الأطفال عادة غسل اليدين من الصغر استثمار صحي طويل الأمد',
        ],
        quick_summary_en: [
            'Handwashing with soap can reduce diarrhea cases by 40%',
            'Washing fruits and vegetables removes a significant portion of pesticide residues and bacteria',
            'Teaching children the habit of handwashing from a young age is a long-term health investment',
        ],
        content_ar: `<div dir="rtl">
<p>غسل اليدين هو الخطوة الأولى والأهم في المفاتيح الخمسة لمنظمة الصحة العالمية، وهو أبسط وأرخص وسيلة للوقاية من الأمراض المنقولة بالغذاء.[7]</p>

<h2>متى يجب غسل اليدين؟</h2>
<ul>
<li>قبل تحضير أي طعام وبعده</li>
<li>بعد التعامل مع اللحوم والدواجن النيئة</li>
<li>بعد استخدام المرحاض</li>
<li>بعد تغيير حفاظ الطفل</li>
<li>بعد لمس الحيوانات الأليفة</li>
<li>بعد العطس أو السعال</li>
</ul>

<h2>الطريقة الصحيحة (20 ثانية على الأقل):</h2>
<ol>
<li>بلّل يديك بالماء الجاري</li>
<li>ضع كمية كافية من الصابون</li>
<li>افرك كلتا يديك معاً — بما في ذلك بين الأصابع وتحت الأظافر وظهر اليدين</li>
<li>استمر في الفرك لمدة 20 ثانية (علّم طفلك غناء "هابي بيرثداي" مرتين كمقياس للوقت)</li>
<li>اشطف بالماء الجاري</li>
<li>جفّف بمنشفة نظيفة أو منديل ورقي</li>
</ol>

<h2>غسل الفواكه والخضروات:</h2>
<ul>
<li>اغسلها تحت الماء الجاري وليس في وعاء مليء بالماء (الماء الراكد يعيد توزيع البكتيريا)</li>
<li>افرك الأسطح الصلبة (مثل التفاح والخيار) بفرشاة خضروات</li>
<li>انزع الأوراق الخارجية من الخس والملفوف</li>
<li>حتى لو كنت ستقشر الفاكهة — اغسلها أولاً (البكتيريا على القشرة تنتقل للداخل عند التقطيع)</li>
</ul>
</div>`,
        content_en: `<div dir="ltr">
<p>Handwashing is the first and most important step in the WHO Five Keys, and it is the simplest and cheapest means of preventing foodborne diseases.[7]</p>

<h2>When Should You Wash Your Hands?</h2>
<ul>
<li>Before and after preparing any food</li>
<li>After handling raw meat and poultry</li>
<li>After using the toilet</li>
<li>After changing a child's diaper</li>
<li>After touching pets</li>
<li>After sneezing or coughing</li>
</ul>

<h2>The Correct Method (at least 20 seconds):</h2>
<ol>
<li>Wet your hands with running water</li>
<li>Apply an adequate amount of soap</li>
<li>Rub both hands together — including between fingers, under nails, and the backs of hands</li>
<li>Continue rubbing for 20 seconds (teach your child to sing "Happy Birthday" twice as a timer)</li>
<li>Rinse under running water</li>
<li>Dry with a clean towel or paper tissue</li>
</ol>

<h2>Washing Fruits and Vegetables:</h2>
<ul>
<li>Wash them under running water, not in a bowl of standing water (standing water redistributes bacteria)</li>
<li>Scrub firm surfaces (like apples and cucumbers) with a vegetable brush</li>
<li>Remove outer leaves from lettuce and cabbage</li>
<li>Even if you plan to peel the fruit — wash it first (bacteria on the skin transfers to the inside when cutting)</li>
</ul>
</div>`,
        sources_ar: [
            'WHO. (2026). Five keys to safer food. WHO.',
            'FAO/WHO. (2004). The Five Keys for Safe Food: WHO\'s Community Food Safety Activities.',
        ],
        sources_en: [
            'WHO. (2026). Five keys to safer food. WHO.',
            'FAO/WHO. (2004). The Five Keys for Safe Food: WHO\'s Community Food Safety Activities.',
        ],
        tags_ar: ['غسل اليدين', 'نظافة الأغذية', 'سلامة الغذاء', 'غسل الفواكه', 'الوقاية', 'صحة الأطفال', 'عادات صحية', 'المبيدات', 'البكتيريا', 'النظافة الشخصية'],
        tags_en: ['Handwashing', 'Food Hygiene', 'Food Safety', 'Fruit Washing', 'Prevention', 'Child Health', 'Healthy Habits', 'Pesticides', 'Bacteria', 'Personal Hygiene'],
        meta: {
            meta_title_ar: 'غسل اليدين وغسل الأطعمة — أبسط حماية وأقواها',
            meta_title_en: 'Handwashing & Food Washing — Simplest Protection',
            meta_description_ar: 'غسل اليدين بالصابون يقلل الإسهال بنسبة 40%. تعلم الطريقة الصحيحة لغسل اليدين وغسل الفواكه والخضروات لحماية طفلك.',
            meta_description_en: 'Handwashing with soap reduces diarrhea by 40%. Learn the correct method for handwashing and washing fruits and vegetables to protect your child.',
            reading_time_minutes: 3,
            og_title_ar: 'غسل اليدين وغسل الأطعمة — أبسط حماية وأقواها',
            og_title_en: 'Handwashing & Food Washing — The Simplest and Strongest Protection',
            og_description_ar: 'غسل اليدين أبسط وأرخص وسيلة للوقاية من أمراض الغذاء. تعلم الخطوات الصحيحة.',
            og_description_en: 'Handwashing is the simplest and cheapest way to prevent foodborne diseases. Learn the correct steps.',
        },
    },
];
