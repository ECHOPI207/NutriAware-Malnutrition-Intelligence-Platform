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
            'أكثر من 50% من الأطفال المصريين يعانون من قصور في الحديد بصورة أو بأخرى',
            'نقص الحديد يسبب خسارة إدراكية لا تُعوَّض بالكامل حتى بعد العلاج إذا حدث في نوافذ النمو الحساسة',
            'فيتامين C مع الوجبة يُضاعف الامتصاص — والشاي بعد الأكل مباشرة يُلغيه تقريباً',
        ],
        quick_summary_en: [
            'Over 50% of Egyptian children suffer from iron deficiency in some form',
            'Iron deficiency causes cognitive losses that may not be fully reversible if it occurs during critical growth windows',
            'Vitamin C with meals doubles absorption — while tea immediately after almost cancels it',
        ],
        content_ar: `<div dir="rtl">
<p>أنيميا نقص الحديد ليست مجرد "قلة الدم" — بل هي أزمة غذائية صامتة تُهدد النمو العقلي والبدني في آنٍ معاً، وأرقامها في مصر تضعها في خانة الطوارئ الصحية العامة التي تستدعي تدخلاً جاداً على مستوى الأسرة والمجتمع.</p>

<hr>

<h2>الوضع في مصر — أرقام تستدعي الانتباه</h2>
<p>تكشف الدراسات المصرية الحديثة عن صورة مقلقة. دراسة متعددة المحافظات على 1,200 طفل مصري (6 أشهر – 11 سنة) أجريت بين 2021 و2023 وجدت أن معدل الإصابة بأنيميا نقص الحديد (IDA) بلغ 35.75% بينما بلغ نقص الحديد دون أنيميا (ID) 16.92% — أي أن واحداً من كل اثنين من الأطفال المصريين يعاني من قصور في الحديد بصورة أو بأخرى. والأرقام الأعلى خطورةً تخص الأطفال أقل من سنتين حيث بلغت النسبة 60.66% — وهي النافذة الذهبية لنمو الدماغ التي لا تعوَّض. وفي دراسة على تلاميذ المرحلة الابتدائية (6–11 سنة) بمحافظة المنوفية، بلغت نسبة أنيميا نقص الحديد 25.6%، مع وجود علاقة ذات دلالة إحصائية بين الأنيميا وتراجع التحصيل الدراسي.</p>

<p><strong>لماذا هذه الأرقام مقلقة بشكل خاص؟</strong></p>
<ul>
<li>الأطفال المصابون بالتقزم أو الهزال لديهم معدلات إصابة أعلى بنقص الحديد — أي أن سوء التغذية يُغذّي سوء التغذية.</li>
<li>الأطفال المصابون بالسمنة أظهروا معدل إصابة مُدهش بالأنيميا بلغ 80% — مما يدحض نهائياً الخرافة الشائعة بأن الطفل "المحشو" بالطعام لا يعاني من نقص غذائي.</li>
</ul>

<hr>

<h2>الحديد في الجسم — ما الذي يحدث فعلاً؟</h2>
<p>الحديد ليس مجرد معدن واحد بوظيفة واحدة — بل هو عنصر متعدد الأدوار الحيوية:</p>
<ul>
<li><strong>نقل الأكسجين:</strong> جزء أساسي من الهيموجلوبين في كريات الدم الحمراء التي تنقل الأكسجين لكل خلية في الجسم.</li>
<li><strong>تخزين الأكسجين في العضلات:</strong> عبر الميوجلوبين الذي يُخزّن الأكسجين للاستخدام أثناء النشاط البدني.</li>
<li><strong>تصنيع الطاقة:</strong> جزء من الإنزيمات المتحكمة في سلسلة نقل الإلكترون في الميتوكوندريا — أي "محرك الطاقة" الخلوي.</li>
<li><strong>تركيب DNA:</strong> ضروري لانقسام الخلايا ونموها.</li>
<li><strong>وظائف الجهاز المناعي:</strong> يدخل في تكوين خلايا مناعية متعددة.</li>
<li><strong>النضج العصبي:</strong> ضروري لتصنيع المايلين وبعض الناقلات العصبية.</li>
</ul>

<hr>

<h2>مراحل نقص الحديد — من الصامت إلى الظاهر</h2>
<p>نقص الحديد لا يظهر فجأة — بل يتطور عبر ثلاث مراحل متتالية:</p>
<ol>
<li><strong>المرحلة الأولى: استنزاف المخازن (ID):</strong> فراغ مخازن الحديد في الكبد والنخاع (ينخفض الفيريتين). لا أعراض واضحة — يُكشف فقط بالتحاليل.</li>
<li><strong>المرحلة الثانية: نقص الحديد الوظيفي:</strong> نقص الحديد المتاح لتصنيع الخلايا (يرتفع مستوى ترانسفيرين). تبدأ أعراض التعب وضعف التركيز.</li>
<li><strong>المرحلة الثالثة: أنيميا نقص الحديد (IDA):</strong> نقص الهيموجلوبين (شحوب + خمول + تأثير على الدماغ). مرحلة الأعراض الظاهرة التي يراها الأهل.</li>
</ol>

<hr>

<h2>التأثير على الدماغ — الخسارة التي لا تُعوَّض</h2>
<h3>على المستوى العصبي التشريحي:</h3>
<p>الحديد ضروري لثلاثة عمليات دماغية لا تقبل التأجيل في السنوات الأولى:</p>
<ul>
<li><strong>تصنيع المايلين:</strong> الغشاء العازل للألياف العصبية الذي يُضاعف سرعة نقل الإشارات.</li>
<li><strong>تصنيع الدوبامين والسيروتونين:</strong> الناقلان العصبيان المسؤولان بشكل رئيسي عن الانتباه والتعلم والمكافأة.</li>
<li><strong>نضج منطقة الحُصين (Hippocampus):</strong> مركز الذاكرة والتعلم في الدماغ.</li>
</ul>

<h3>الأدلة الرقمية من الدراسات:</h3>
<ul>
<li>في تجربة تتبّعية على رضّع في التاسعة من العمر، أظهر المصابون بأنيميا نقص الحديد ضعفاً ملحوظاً في الذاكرة قصيرة المدى وثبات الأشياء مقارنةً بأقرانهم.</li>
<li>مراجعة منهجية وتحليل شامل لـ13 دراسة عشوائية محكومة خلصت إلى أن تكميل الحديد لدى الأطفال في سن المدرسة يُحسّن بشكل دال إحصائياً مؤشرات الذكاء (SMD: 0.46)، الانتباه والتركيز (SMD: 0.44)، والذاكرة (SMD: 0.44).</li>
<li>دراسة طولية تتبّعت أطفالاً من الرضاعة حتى سن الخامسة: أظهر من أصيبوا بأنيميا حادة في الرضاعة نقصاً في مؤشر الذكاء الأدائي ومهارات الإدراك البصري الحركي والمهارات الحركية الدقيقة والإجمالية حتى بعد العلاج.</li>
<li><strong>الخلاصة الأكثر إزعاجاً:</strong> وجدت دراسة تركية على أطفال عُولجوا من أنيميا نقص الحديد أنه رغم تحسّن متوسط مؤشر الذكاء بـ4.8 نقاط بعد العلاج، ظل 8.2 نقاط أقل من أقرانهم الأصحاء — مما يُشير إلى أن جزءاً من الخسارة الإدراكية لا يُعوَّض حتى بعد العلاج إذا حدث النقص في النوافذ الحساسة للنمو.</li>
</ul>

<hr>

<h2>علامات نقص الحديد — من الظاهر إلى الدقيق</h2>
<table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse:collapse;">
<thead><tr><th>المستوى</th><th>الأعراض</th></tr></thead>
<tbody>
<tr><td>علامات الدم</td><td>شحوب الوجه والجفون والأظافر وتحت اللسان</td></tr>
<tr><td>علامات الطاقة</td><td>خمول دائم، إرهاق بعد مجهود خفيف، برودة الأطراف</td></tr>
<tr><td>علامات الدماغ</td><td>ضعف التركيز، تراجع الأداء المدرسي، شرود الذهن</td></tr>
<tr><td>علامات الجهاز المناعي</td><td>تكرار العدوى، بطء الشفاء</td></tr>
<tr><td>علامات غريبة</td><td>الرغبة في أكل التراب أو الثلج أو الطباشير (Pica) — مؤشر قوي على نقص حاد</td></tr>
<tr><td>علامات القلب</td><td>سرعة ضربات القلب، ضيق تنفس عند المجهود</td></tr>
</tbody>
</table>

<hr>

<h2>علم امتصاص الحديد — فهم الفارق بين النوعين</h2>
<h3>1. الحديد الهيمي (Heme Iron) — المسار السريع:</h3>
<p>موجود فقط في المصادر الحيوانية. يُمتص عبر مسار مستقل لا يتأثر تقريباً بالعوامل الغذائية. معدل الامتصاص: 15–35%.</p>

<h3>2. الحديد غير الهيمي (Non-Heme Iron) — المسار المُعقَّد:</h3>
<p>موجود في المصادر النباتية والمكملات. يحتاج تحويلاً كيميائياً قبل الامتصاص، وهذا التحويل يتأثر بشدة بالبيئة الغذائية المحيطة. معدل الامتصاص: 2–20%.</p>

<table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse:collapse;">
<thead><tr><th>الفئة</th><th>المادة</th><th>آلية التأثير</th><th>المصادر</th></tr></thead>
<tbody>
<tr><td>مُعزِّز</td><td>فيتامين C (حمض الأسكوربيك)</td><td>يُحوّل Fe³⁺ إلى Fe²⁺ الأكثر امتصاصاً ويُقلّص الفايتات</td><td>ليمون، برتقال، فلفل، طماطم</td></tr>
<tr><td>مُعزِّز</td><td>"عامل اللحوم" (Meat Factor)</td><td>الحديد الهيمي يُحسّن امتصاص غير الهيمي بمجاورته</td><td>وجود كمية صغيرة من اللحم في الوجبة</td></tr>
<tr><td>مُثبِّط</td><td>تانيات الشاي/القهوة (Polyphenols)</td><td>تُشكّل مُعقَّدات غير ذائبة تمنع الامتصاص</td><td>شاي، قهوة، شوكولاتة</td></tr>
<tr><td>مُثبِّط</td><td>فايتات (Phytates)</td><td>ترتبط بالحديد وتمنع امتصاصه</td><td>أرز غير منقوع، حبوب كاملة غير مخمّرة</td></tr>
<tr><td>مُثبِّط</td><td>الكالسيوم</td><td>يُنافس الحديد على نفس ناقل الامتصاص</td><td>حليب بكميات زائدة (>700 مل/يوم)</td></tr>
<tr><td>مُثبِّط</td><td>الأوكسالات</td><td>تُعيق الامتصاص من بعض المصادر النباتية</td><td>السبانخ (غني بالحديد لكن أوكسالاته تُقلل امتصاصه)</td></tr>
</tbody>
</table>

<hr>

<h2>الاحتياجات اليومية وكيف تُحقّقها في المطبخ المصري</h2>
<h3>جدول الاحتياجات اليومية (RDA)</h3>
<table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse:collapse;">
<thead><tr><th>الفئة العمرية</th><th>الحاجة اليومية</th></tr></thead>
<tbody>
<tr><td>7–12 شهراً</td><td>11 ملغ/يوم (أعلى نسبياً لأنه بعد نضوب مخزون الولادة)</td></tr>
<tr><td>1–3 سنوات</td><td>7 ملغ/يوم</td></tr>
<tr><td>4–8 سنوات</td><td>10 ملغ/يوم</td></tr>
<tr><td>9–13 سنة (ذكور وإناث)</td><td>8 ملغ/يوم</td></tr>
<tr><td>14–18 سنة (ذكور)</td><td>11 ملغ/يوم</td></tr>
<tr><td>14–18 سنة (إناث)</td><td>15 ملغ/يوم (أعلى بسبب الدورة الشهرية)</td></tr>
</tbody>
</table>

<h3>جدول المصادر الغذائية — المتاح في مصر</h3>
<table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse:collapse;">
<thead><tr><th>المصدر</th><th>الحديد لكل 100 جم</th><th>النوع</th><th>الملاحظة</th></tr></thead>
<tbody>
<tr><td>كبدة البقر</td><td>6–7 ملغ</td><td>هيمي</td><td>الأغنى والأرخص — وجبة أسبوعية كافية</td></tr>
<tr><td>اللحم البقري</td><td>2.6 ملغ</td><td>هيمي</td><td>احذر الطهي الزائد يُقلل القيمة</td></tr>
<tr><td>الدجاج (الداكن)</td><td>1.3 ملغ</td><td>هيمي</td><td>يحتوي أيضاً "عامل اللحوم" المُعزِّز</td></tr>
<tr><td>التونة المعلّبة</td><td>1.6 ملغ</td><td>هيمي</td><td>اقتصادية ومتاحة</td></tr>
<tr><td>العدس</td><td>3.3 ملغ</td><td>غير هيمي</td><td>+ فيتامين C يُضاعف امتصاصه</td></tr>
<tr><td>الفول</td><td>2.1 ملغ</td><td>غير هيمي</td><td>وجبة يومية موصى بها مع الليمون</td></tr>
<tr><td>الملوخية</td><td>1.8 ملغ</td><td>غير هيمي</td><td>الطهي يُقلل الأوكسالات</td></tr>
<tr><td>العسل الأسود (Molasses)</td><td>4.7 ملغ</td><td>غير هيمي</td><td>مُحلٍّ غني بالحديد غير معروف كافياً</td></tr>
<tr><td>السبانخ</td><td>2.7 ملغ</td><td>غير هيمي</td><td>الأوكسالات تُقلّل الامتصاص الفعلي</td></tr>
</tbody>
</table>

<hr>

<h2>الاستراتيجيات العملية لتعظيم امتصاص الحديد</h2>
<ul>
<li><strong>استراتيجية ١: قاعدة "C + Iron" في كل وجبة فول أو عدس.</strong> إضافة عصير ليمون طازج أو طماطم مفرومة إلى طبق الفول أو العدس ليست مجرد عادة شعبية — بل هي كيمياء حيوية دقيقة. فيتامين C يُحوّل الحديد الثلاثي (Fe³⁺) غير القابل للامتصاص إلى الثنائي (Fe²⁺) القابل للامتصاص، ويُفكّك مُعقَّدات الفايتات التي تحبس الحديد — مما يُضاعف امتصاص الحديد غير الهيمي من 2 إلى 3 أضعاف أو أكثر.</li>
<li><strong>استراتيجية ٢: الشاي بعد الوجبة بساعة على الأقل.</strong> التانيات في الشاي الأسود تُشكّل مُعقَّدات غير ذائبة مع الحديد تمنع امتصاصه تماماً. تناول الشاي مباشرةً مع الوجبة أو بعدها بأقل من ساعة يُلغي معظم القيمة الغذائية للحديد في تلك الوجبة.</li>
<li><strong>استراتيجية ٣: نقع البقوليات قبل الطهي.</strong> نقع الفول والعدس والحمص لـ8–12 ساعة وصرف ماء النقع يُقلّل الفايتات بنسبة 30–50%، مما يرفع امتصاص الحديد منها بشكل ملحوظ.</li>
<li><strong>استراتيجية ٤: وجبة الكبدة الأسبوعية — أفضل استثمار غذائي اقتصادي.</strong> الكبدة البقرية تحتوي على الحديد الهيمي الأعلى تركيزاً وأسهله امتصاصاً، فضلاً عن فيتامين B12 والزنك والفيتامينات A وD. وجبة كبدة أسبوعية واحدة كافية لسد جزء كبير من احتياج الطفل الأسبوعي من الحديد، بتكلفة اقتصادية منخفضة مقارنةً بمصادر البروتين الأخرى.</li>
<li><strong>استراتيجية ٥: تجنّب إعطاء الحديد مع الحليب.</strong> الكالسيوم يُنافس الحديد على نفس ناقل الامتصاص المعوي (DMT-1). إعطاء مكمّل الحديد أو الوجبة الغنية به مع الحليب يُقلّل الامتصاص بشكل ملحوظ. الحل: فاصل زمني ساعة على الأقل بين الحليب ووجبات الحديد.</li>
</ul>

<hr>

<h2>متى تُجري تحليل الحديد؟</h2>
<p>يُوصي أطباء الأطفال بفحص مستوى الهيموجلوبين والفيريتين في هذه الحالات:</p>
<ul>
<li>عند الرضّع بعد الشهر السادس وعند بدء التغذية التكميلية</li>
<li>إذا ظهرت أي من العلامات المذكورة أعلاه</li>
<li>عند الأطفال من عائلات لا تتناول اللحوم بانتظام</li>
<li>قبل دخول المدرسة (4–5 سنوات) كفحص وقائي</li>
</ul>

<p>تنويه: مكمّلات الحديد لا تُعطى إلا بوصفة طبيب — الجرعة الزائدة من الحديد سامّة، وتشخيص الأنيميا يتطلب تحاليل دم لا مجرد تقييم أعراض.</p>
</div>`,
        content_en: `<div dir="ltr">
<p>Iron deficiency anemia is not just a "shortage of blood"—it is a silent nutritional crisis that threatens both mental and physical growth. Its numbers in Egypt place it in the public health emergency category, calling for serious intervention at the family and community levels.</p>

<hr>

<h2>The Situation in Egypt — Numbers That Demand Attention</h2>
<p>Recent Egyptian studies reveal a disturbing picture. A multi-governorate study of 1,200 Egyptian children (6 months – 11 years) conducted between 2021 and 2023 found that the prevalence of Iron Deficiency Anemia (IDA) was 35.75%, while Iron Deficiency without anemia (ID) reached 16.92%. This means one out of two Egyptian children suffers from iron insufficiency in one form or another. The highest risks are for children under two years old, reaching 60.66%—the golden window for brain development that cannot be replaced. In a study on primary school students (6–11 years) in Menofia, IDA reached 25.6%, showing a statistically significant link between anemia and declining academic achievement.</p>

<p><strong>Why are these numbers particularly concerning?</strong></p>
<ul>
<li>Stunted or wasted children have higher rates of iron deficiency—malnutrition fuels malnutrition.</li>
<li>Obese children showed a surprising anemia rate of 80%—definitively debunking the myth that a "stuffed" child does not suffer from nutritional deficiency.</li>
</ul>

<hr>

<h2>Iron in the Body — What Actually Happens?</h2>
<p>Iron is not just one mineral with one function; it is an element with multiple vital roles:</p>
<ul>
<li><strong>Oxygen Transport:</strong> A core part of hemoglobin in red blood cells that carries oxygen to every cell in the body.</li>
<li><strong>Muscle Oxygen Storage:</strong> Via myoglobin, which stores oxygen for use during physical activity.</li>
<li><strong>Energy Production:</strong> Part of the enzymes controlling the electron transport chain in mitochondria—the cellular "energy engine."</li>
<li><strong>DNA Synthesis:</strong> Essential for cell division and growth.</li>
<li><strong>Immune Function:</strong> Involved in the formation of various immune cells.</li>
<li><strong>Neurological Maturation:</strong> Necessary for the synthesis of myelin and several neurotransmitters.</li>
</ul>

<hr>

<h2>Stages of Iron Deficiency — From Silent to Visible</h2>
<p>Iron deficiency doesn't appear suddenly; it develops through three consecutive stages:</p>
<ol>
<li><strong>Stage 1: Storage Depletion (ID):</strong> Depletion of iron stores in the liver and bone marrow (ferritin drops). No obvious symptoms—only detectable via laboratory tests.</li>
<li><strong>Stage 2: Functional Iron Deficiency:</strong> Lack of iron available for cell synthesis (transferrin levels rise). Symptoms of fatigue and poor concentration begin.</li>
<li><strong>Stage 3: Iron Deficiency Anemia (IDA):</strong> Lack of hemoglobin (paleness + lethargy + brain impact). This is the visible stage parents notice.</li>
</ol>

<hr>

<h2>Impact on the Brain — The Irreversible Loss</h2>
<h3>At the Neuro-anatomical Level:</h3>
<p>Iron is critical for three brain processes that cannot be delayed in early years:</p>
<ul>
<li><strong>Myelin Synthesis:</strong> The insulating sheath of nerve fibers that doubles signal transmission speed.</li>
<li><strong>Dopamine and Serotonin Synthesis:</strong> Neurotransmitters primarily responsible for attention, learning, and reward.</li>
<li><strong>Hippocampus Maturation:</strong> The brain's center for memory and learning.</li>
</ul>

<h3>Scientific Evidence from Studies:</h3>
<ul>
<li>In a follow-up trial on infants at nine months of age, those with IDA showed significant weakness in short-term memory and object permanence compared to their peers.</li>
<li>A systematic review and meta-analysis of 13 randomized controlled trials concluded that iron supplementation in school-age children statistically significantly improves IQ indicators (SMD: 0.46), attention and focus (SMD: 0.44), and memory (SMD: 0.44).</li>
<li>A longitudinal study tracking children from infancy until age 5 showed that those who suffered from severe anemia in infancy had lower performance IQ, visual-motor skills, and fine/gross motor skills even after treatment.</li>
<li><strong>The most disturbing conclusion:</strong> A Turkish study on children treated for IDA found that despite a 4.8-point improvement in average IQ after treatment, they remained 8.2 points below their healthy peers—indicating that part of the cognitive loss is irreversible even after treatment if the deficiency occurs during critical growth windows.</li>
</ul>

<hr>

<h2>Signs of Iron Deficiency — From Obvious to Subtle</h2>
<table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse:collapse;">
<thead><tr><th>Level</th><th>Symptoms</th></tr></thead>
<tbody>
<tr><td>Blood Signs</td><td>Paleness of the face, eyelids, nails, and under the tongue</td></tr>
<tr><td>Energy Signs</td><td>Permanent lethargy, fatigue after light effort, cold extremities</td></tr>
<tr><td>Brain Signs</td><td>Poor focus, declining school performance, absent-mindedness</td></tr>
<tr><td>Immune Signs</td><td>Recurrent infections, slow healing</td></tr>
<tr><td>Strange Signs</td><td>Craving soil, ice, or chalk (Pica)—a strong indicator of severe deficiency</td></tr>
<tr><td>Heart Signs</td><td>Rapid heartbeat, shortness of breath on exertion</td></tr>
</tbody>
</table>

<hr>

<h2>The Science of Iron Absorption — Understanding the Two Types</h2>
<h3>1. Heme Iron — The Fast Track:</h3>
<p>Found only in animal sources. Absorbed via an independent cellular pathway almost unaffected by dietary factors. Absorption rate: 15–35%.</p>

<h3>2. Non-Heme Iron — The Complex Path:</h3>
<p>Found in plant sources and supplements. Requires chemical conversion from Ferric (Fe³⁺) to Ferrous (Fe²⁺) before absorption, which is heavily influenced by the surrounding dietary environment. Absorption rate: 2–20%.</p>

<table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse:collapse;">
<thead><tr><th>Category</th><th>Substance</th><th>Mechanism</th><th>Sources</th></tr></thead>
<tbody>
<tr><td>Booster</td><td>Vitamin C (Ascorbic Acid)</td><td>Converts Fe³⁺ to the more absorbable Fe²⁺ and reduces phytates</td><td>Lemon, orange, peppers, tomato</td></tr>
<tr><td>Booster</td><td>"Meat Factor"</td><td>Heme iron improves non-heme absorption by proximity—increases total absorption by up to 40%</td><td>Small amount of meat in the meal</td></tr>
<tr><td>Inhibitor</td><td>Tea/Coffee Tannins (Polyphenols)</td><td>Form insoluble complexes that prevent absorption</td><td>Tea, coffee, chocolate</td></tr>
<tr><td>Inhibitor</td><td>Phytates</td><td>Found in grains and legumes—bind to iron and block absorption</td><td>Unsoaked rice, unfermented whole grains</td></tr>
<tr><td>Inhibitor</td><td>Calcium</td><td>Competes with iron for the same absorption transporter</td><td>Excessive milk (>700 ml/day)</td></tr>
<tr><td>Inhibitor</td><td>Oxalates</td><td>Hinder absorption from some plant sources</td><td>Spinach (rich in iron but oxalates reduce actual absorption)</td></tr>
</tbody>
</table>

<hr>

<h2>Daily Requirements and Realizing Them in the Egyptian Kitchen</h2>
<h3>Recommended Dietary Allowance (RDA) Table</h3>
<table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse:collapse;">
<thead><tr><th>Age Group</th><th>Daily Need</th></tr></thead>
<tbody>
<tr><td>7–12 months</td><td>11 mg/day (higher as birth stores deplete)</td></tr>
<tr><td>1–3 years</td><td>7 mg/day</td></tr>
<tr><td>4–8 years</td><td>10 mg/day</td></tr>
<tr><td>9–13 years (M/F)</td><td>8 mg/day</td></tr>
<tr><td>14–18 years (M)</td><td>11 mg/day</td></tr>
<tr><td>14–18 years (F)</td><td>15 mg/day (higher due to menstruation)</td></tr>
</tbody>
</table>

<h3>Iron Sources Table — Available in Egypt</h3>
<table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse:collapse;">
<thead><tr><th>Source</th><th>Iron per 100g</th><th>Type</th><th>Note</th></tr></thead>
<tbody>
<tr><td>Beef Liver</td><td>6–7 mg</td><td>Heme</td><td>Richest and cheapest—one weekly meal is sufficient</td></tr>
<tr><td>Beef</td><td>2.6 mg</td><td>Heme</td><td>Be careful: overcooking reduces nutritional value</td></tr>
<tr><td>Chicken (Dark)</td><td>1.3 mg</td><td>Heme</td><td>Also contains the "Meat Factor" booster</td></tr>
<tr><td>Canned Tuna</td><td>1.6 mg</td><td>Heme</td><td>Economical and available</td></tr>
<tr><td>Lentils</td><td>3.3 mg</td><td>Non-heme</td><td>+ Vitamin C doubles its absorption</td></tr>
<tr><td>Fava Beans</td><td>2.1 mg</td><td>Non-heme</td><td>Recommended daily meal with lemon</td></tr>
<tr><td>Molokhia</td><td>1.8 mg</td><td>Non-heme</td><td>Cooking reduces oxalates</td></tr>
<tr><td>Blackstrap Molasses</td><td>4.7 mg</td><td>Non-heme</td><td>A rich iron sweetener that is underutilized</td></tr>
<tr><td>Spinach</td><td>2.7 mg</td><td>Non-heme</td><td>Oxalates reduce actual absorption</td></tr>
</tbody>
</table>

<hr>

<h2>Practical Strategies to Maximize Iron Absorption</h2>
<ul>
<li><strong>Strategy 1: The "C + Iron" rule in every bean or lentil meal.</strong> Adding lemon juice or diced tomatoes isn't just a habit—it's biochemistry. Vitamin C triples absorption.</li>
<li><strong>Strategy 2: Tea at least one hour after meals.</strong> Black tea tannins strongly inhibit absorption. Avoid for at least an hour.</li>
<li><strong>Strategy 3: Soak legumes before cooking.</strong> Soaking for 8–12 hours reduces phytates by 30–50%.</li>
<li><strong>Strategy 4: Weekly liver meal — the best economical investment.</strong> Richest source of Heme Iron, B12, Zinc, and Vitamins A & D.</li>
<li><strong>Strategy 5: Avoid giving iron with milk.</strong> Calcium competes with iron. Maintain at least a one-hour gap.</li>
</ul>

<hr>

<h2>When should you test for Iron?</h2>
<p>Pediatricians recommend checking hemoglobin and ferritin levels in these cases:</p>
<ul>
<li>Infants after the sixth month when starting complementary feeding</li>
<li>If any of the signs mentioned above appear</li>
<li>Children from families that do not consume meat regularly</li>
<li>Before school entry (4–5 years) as a preventive check</li>
</ul>

<p>Notice: Iron supplements should only be taken with a doctor's prescription—iron overdose is toxic, and diagnosis requires blood tests, not just symptom assessment.</p>
</div>`,
        sources_ar: [
            'دراسة المسح الصحي والسكاني في مصر (2021)',
            'منظمة الصحة العالمية (WHO) - ملف التغذية في مصر',
            'الأكاديميات الوطنية للعلوم والهندسة والطب (Dietary Reference Intakes)',
            'دراسات محلية مصرية حول أنيميا نقص الحديد (جامعة المنوفية وجامعات إقليمية)',
        ],
        sources_en: [
            'Egypt Demographic and Health Survey (2021)',
            'WHO Egypt Nutrition Portait/Country Profile',
            'National Academies of Sciences, Engineering, and Medicine (Dietary Reference Intakes)',
            'Local Egyptian studies on IDA prevalence (Menofia and regional universities)',
        ],
        tags_ar: ['أنيميا', 'نقص الحديد', 'تطور الدماغ', 'مصر', 'الامتصاص', 'كبدة', 'فيتامين C', 'المغذيات الدقيقة', 'نمو الطفل'],
        tags_en: ['Anemia', 'Iron Deficiency', 'Brain Development', 'Egypt', 'Absorption', 'Liver', 'Vitamin C', 'Micronutrients', 'Child Growth'],
        meta: {
            meta_title_ar: 'أنيميا نقص الحديد عند الأطفال — العدو الصامت',
            meta_title_en: 'Iron Deficiency Anemia in Children — Silent Enemy',
            meta_description_ar: 'واحداً من كل اثنين من أطفال مصر يعاني من نقص الحديد. تعرف على التأثيرات العصبية وكيفية تعظيم الامتصاص في المطبخ المصري.',
            meta_description_en: 'One in two Egyptian children suffers from iron deficiency. Learn about the neurological impacts and how to maximize absorption in the Egyptian kitchen.',
            reading_time_minutes: 6,
            og_title_ar: 'أنيميا نقص الحديد عند الأطفال — العدو الصامت',
            og_title_en: 'Iron Deficiency Anemia in Children — The Silent Enemy',
            og_description_ar: 'نقص الحديد يسبب خسارة إدراكية لا تُعوَّض بالكامل. تعلم كيف تحمي طفلك.',
            og_description_en: 'Iron deficiency causes irreversible cognitive loss. Learn how to protect your child.',
        },
        imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80',
        category: 'micronutrients',
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
            'فيتامين أ هو "الفيتامين المناعي" الذي يحمي الأغشية المخاطية من غزو الجراثيم',
            'الزنك محرك لـ 300 إنزيم وضروري جداً لتجنب التقزم وتحفيز انقسام الخلايا',
            'كفاءة تحويل النوع النباتي (Beta-Carotene) تختلف بين الأطفال حسب الجينات والدهون',
        ],
        quick_summary_en: [
            'Vitamin A is the "Immune Vitamin" that protects mucous membranes from germ invasion',
            'Zinc powers 300 enzymes and is crucial for avoiding stunting and stimulating cell division',
            'Conversion efficiency of the plant-based type (Beta-Carotene) varies between children based on genetics and fats',
        ],
        content_ar: `<div dir="rtl">
<p>فيتامين أ والزنك يُشكّلان ثنائياً حيوياً لا غنى عنه في منظومة الصحة والنمو عند الطفل — الأول هو حارس الأغشية المخاطية وسلاح الجهاز المناعي، والثاني هو محرك تكاثر الخلايا وبناء البروتينات. ونقص أيٍّ منهما لا يُحدث خللاً منفرداً، بل يُفتح ثغرة واسعة تتسلّل منها أمراض متعددة.</p>

<h2>أولاً: فيتامين أ — أكثر من مجرد "فيتامين للعيون"</h2>
<h3>الدور الفسيولوجي الموسّع</h3>
<p>تُصنّف فيتامين أ كـ"فيتامين مناعي" بالدرجة الأولى — وصف جاء من ثلاثة مجالات عمل متكاملة:</p>

<ol>
<li><strong>الأغشية المخاطية — خط الدفاع الأول:</strong> يُحافظ فيتامين أ على سلامة الخلايا الطلائية (Epithelial Cells) المبطّنة للرئتين والأمعاء والجهاز البولي والتناسلي والجلد. هذه الأغشية هي الحاجز الفيزيائي الأول أمام الكائنات الممرضة. عند نقص فيتامين أ، تتحوّل هذه الأغشية من طلائية رطبة مُنتِجة للمخاط إلى قشرية جافة هشّة — وهو ما يُسمّى "التقرّن" (Keratinization) — فتُصبح نافذةً مفتوحة للجراثيم بدلاً من حاجز يصدّها.</li>
<li><strong>الاستجابة المناعية الفطرية:</strong> نقص فيتامين أ يُقلّص نشاط العدلات (Neutrophils) والبلاعم (Macrophages) وخلايا NK (Natural Killer) — وهي الخلايا التي تُهاجم الغزاة الميكروبيين فور وصولهم قبل أن تتشكّل الاستجابة المناعية المتخصصة.</li>
<li><strong>الاستجابة المناعية المكتسبة:</strong> فيتامين أ ضروري لتمايز الخلايا التائية المساعدة (Th cells) والخلايا البائية (B cells)، وبالتالي لتصنيع الأجسام المضادة (IgA وIgG) ضد المسبّبات الإنتانية. نقصه يُضعف بشكل خاص استجابة IgA المخاطية — وهو الجسم المضاد الرئيسي المسؤول عن حماية الأمعاء والجهاز التنفسي.</li>
</ol>

<h3>حجم الأزمة العالمية</h3>
<p>يُعاني نحو 250 مليون طفل في سن ما قبل المدرسة من نقص فيتامين أ حول العالم. ومن بين كل 100 طفل يُعانون من هذا النقص، يُتوقَّع وفاة 10 أطفال بسبب ضعف المناعة الناتج. وقد أثبتت أكثر من 12 تجربة سريرية أن تكميل فيتامين أ لدى الأطفال دون الخامسة يُقلّل وفيات الحصبة بشكل دراماتيكي ويُخفّض حالات الوفاة من الإسهال الحاد.</p>

<h3>الفرق الجوهري: ريتينول مقابل بيتا كاروتين</h3>
<p>هذا التمييز أكثر أهمية مما يظن كثيرون، وله أثر مباشر على كيفية تخطيط الوجبات.</p>

<ul>
<li><strong>الريتينول (Retinol) — النوع الحيواني الجاهز:</strong> هو فيتامين أ "جاهز الاستخدام" — يُمتص مباشرةً من المصادر الحيوانية ويدخل الدورة الدموية دون تحويل. نسبة امتصاصه 70–90% من الكمية المتناولة.</li>
<li><strong>بيتا كاروتين (β-Carotene) — النوع النباتي ذو الكفاءة المتغيرة:</strong> هو "ما قبل الفيتامين" (Provitamin A) — يحتاج تحويلاً في جدار الأمعاء بواسطة إنزيم BCMO1 قبل تحوّله إلى ريتينول فعّال. والمعادلة هنا ليست 1:1 — بل 12 ميكروغرام بيتا كاروتين = 1 ميكروغرام ريتينول (RAE) من الخضروات الطازجة، و24 ميكروغرام من المصادر المطبوخة أو المُجففة.</li>
</ul>

<h4>لماذا كفاءة تحويل بيتا كاروتين متغيرة؟</h4>
<p>نسبة التحويل تتراوح تراوحاً واسعاً بين الأفراد — من 3.6:1 إلى 28:1. هذا التباين الهائل يرجع إلى عاملين رئيسيين:</p>
<ol>
<li><strong>التنوع الجيني:</strong> طفرات في جين BCMO1 تُقلّل كفاءة إنزيم التحويل بنسبة تصل إلى 57% لدى حاملي نمط جيني معين.</li>
<li><strong>البيئة الغذائية:</strong> كمية الدهون في الوجبة تؤثر جذرياً — بيتا كاروتين محلول في الدهون، وبدون دهون في الوجبة يُمتص منه 5% فقط. إضافة ملعقة زيت إلى السلطة أو الجزر ترفع الامتصاص عشرة أضعاف.</li>
</ol>

<p><strong>الخلاصة العملية:</strong> لا يمكن الاعتماد على المصادر النباتية وحدها كمصدر موثوق لفيتامين أ — خاصةً للأطفال الذين لا يتناولون كبداً أو بيضاً بانتظام.</p>

<h3>جدول مقارنة المصادر: كفاءة فيتامين أ بالأرقام</h3>
<table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse:collapse;">
<thead><tr><th>المصدر</th><th>الكمية</th><th>فيتامين أ المتاح (RAE)</th><th>ملاحظة</th></tr></thead>
<tbody>
<tr><td>كبدة بقر</td><td>100 جرام</td><td>4,968 ميكروغرام</td><td>يتجاوز الحد الأقصى الآمن — لا تُقدَّم أكثر من مرة أسبوعياً</td></tr>
<tr><td>بيض (كامل)</td><td>2 بيضة</td><td>~120 ميكروغرام</td><td>ريتينول كامل الامتصاص</td></tr>
<tr><td>حليب كامل الدسم</td><td>كوب (240 مل)</td><td>~112 ميكروغرام</td><td>يُقدَّم يومياً للأطفال</td></tr>
<tr><td>جزر مطبوخ</td><td>100 جرام</td><td>~852 ميكروغرام (نباتي)</td><td>الطهي يُفكّك جدار الخلايا ويرفع الامتصاص</td></tr>
<tr><td>بطاطا حلوة</td><td>100 جرام</td><td>~709 ميكروغرام (نباتي)</td><td>خيار ممتاز مع وجبة دهنية</td></tr>
<tr><td>ملوخية مطبوخة</td><td>100 جرام</td><td>~575 ميكروغرام (نباتي)</td><td>موروث غذائي مصري غني</td></tr>
<tr><td>مانجو</td><td>ثمرة واحدة</td><td>~112 ميكروغرام (نباتي)</td><td>خيار جيد للأطفال</td></tr>
</tbody>
</table>

<hr>

<h2>ثانياً: الزنك — المحرك الصامت لـ300 إنزيم</h2>
<h3>لماذا الزنك محوري جداً؟</h3>
<p>الزنك يُشارك في أكثر من 300 إنزيم في الجسم البشري. هذا الانتشار الإنزيمي الواسع يعني أن نقصه يُؤثّر على:</p>
<ul>
<li><strong>تكاثر الخلايا وانقسامها:</strong> الزنك ضروري لتصنيع DNA وRNA وللانقسام الخلوي — مما يجعله عنصراً لا بديل له في النمو السريع في الطفولة.</li>
<li><strong>بناء البروتينات:</strong> يدخل في بنية "أصابع الزنك" (Zinc Fingers)، وهي هياكل بروتينية تتحكّم في تعبير مئات الجينات.</li>
<li><strong>وظائف الجهاز المناعي:</strong> ضروري لنضج وتكاثر الخلايا اللمفاوية T وB والخلايا القاتلة الطبيعية.</li>
<li><strong>حاسة الشم والتذوق:</strong> نقصه يُضعف هاتين الحاستين مما يُقلّل شهية الطفل ويُدخله في حلقة مفرغة من الامتناع عن الأكل.</li>
</ul>

<h3>الزنك والتقزم — الرابط الإنزيمي المباشر</h3>
<p>ربطت منظمة الصحة العالمية نقصَ الزنك بالتقزم من خلال مسارين متوازيين:</p>
<ol>
<li><strong>المسار الأول — الوظيفي:</strong> نقص الزنك يُعطّل إنزيمات انقسام الخلايا العظمية، فيتباطأ نمو الغضروفات الطلائية في نهايات العظام (Growth Plates).</li>
<li><strong>المسار الثاني — المناعي:</strong> نقص الزنك يرفع معدل الإصابة بالإسهال والتهابات الجهاز التنفسي — وكل نوبة عدوى تستنزف الزنك وتُقلّص النمو.</li>
</ol>
<p>ووجدت تجارب عشوائية أن تكميل الزنك لمدة 24 أسبوعاً أعطى الأطفال المتقزمين نمواً إضافياً في الطول بمتوسط 0.37 سم مقارنة بمجموعة الدواء الوهمي.</p>

<h3>احتياجات الزنك اليومية والمصادر</h3>
<table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse:collapse;">
<thead><tr><th>الفئة العمرية</th><th>الاحتياج اليومي (RDA)</th></tr></thead>
<tbody>
<tr><td>0–6 أشهر</td><td>2 ملغ/يوم</td></tr>
<tr><td>7–12 شهراً</td><td>3 ملغ/يوم</td></tr>
<tr><td>1–3 سنوات</td><td>3 ملغ/يوم</td></tr>
<tr><td>4–8 سنوات</td><td>5 ملغ/يوم</td></tr>
<tr><td>9–13 سنة</td><td>8 ملغ/يوم</td></tr>
<tr><td>14–18 سنة (ذكور)</td><td>11 ملغ/يوم</td></tr>
<tr><td>14–18 سنة (إناث)</td><td>9 ملغ/يوم</td></tr>
</tbody>
</table>

<h3>المصادر الغذائية — مرتبةً حسب الكفاءة</h3>
<table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse:collapse;">
<thead><tr><th>المصدر</th><th>الزنك لكل 100 جرام</th><th>الملاحظة</th></tr></thead>
<tbody>
<tr><td>بذر اليقطين (اللب)</td><td>7.8 ملغ</td><td>نباتي ممتاز — لكن الفايتات تُقلّل امتصاصه</td></tr>
<tr><td>لحم بقري</td><td>4.8 ملغ</td><td>أعلى كفاءة امتصاص حيواني</td></tr>
<tr><td>كبدة</td><td>4.0 ملغ</td><td>+ فيتامين أ + حديد</td></tr>
<tr><td>دجاج (لحم داكن)</td><td>2.4 ملغ</td><td>أرخص من البقري</td></tr>
<tr><td>كاجو</td><td>5.6 ملغ</td><td>نباتي جيد + دهون صحية</td></tr>
<tr><td>حمص مطبوخ</td><td>1.5 ملغ</td><td>النقع يُحسّن الامتصاص</td></tr>
<tr><td>جبن</td><td>3.1 ملغ</td><td>جيد مع الخبز البلدي</td></tr>
<tr><td>لبن/زبادي</td><td>0.9 ملغ</td><td>يُكمّل الكالسيوم أيضاً</td></tr>
</tbody>
</table>

<hr>

<h2>تفاعل فيتامين أ والزنك — تآزر أم تنافس؟</h2>
<p>العلاقة بين الاثنين تآزرية من اتجاه واحد وتنافسية من اتجاه آخر:</p>
<p><strong>التآزر:</strong> الزنك ضروري لتصنيع بروتين ناقل الريتينول (RBP) الذي يحمل فيتامين أ في الدم. نقص الزنك يعني انخفاض RBP وبالتالي قصور في توصيل فيتامين أ حتى لو كان مخزوناً في الكبد — مما يخلق حالة "نقص وظيفي" لفيتامين أ حتى بدون نقص حقيقي فيه.</p>

<p><strong>المقاربة العلمية:</strong> تكميل الزنك وحده في حالات نقص مزدوج قد لا يُعطي نتائج كاملة — ينبغي معالجة النقصين معاً. </p>

<h2>وجبة الكبدة — المعادلة الغذائية الكاملة</h2>
<p>طبق الكبدة بالبصل والفلفل الأخضر يُقدّم نموذجاً فعلياً للتآزر الغذائي في وجبة واحدة اقتصادية:</p>
<ul>
<li><strong>فيتامين أ والزنك:</strong> كبدة (ريتينول جاهز + زنك حيواني كفؤ).</li>
<li><strong>الحديد الهيمي:</strong> كبدة (امتصاص سريع).</li>
<li><strong>فيتامين C:</strong> فلفل أخضر وبصل (يُضاعف امتصاص الحديد).</li>
<li><strong>الدهون:</strong> ضرورية لامتصاص فيتامين أ.</li>
</ul>

<p><strong>تحذير الجرعة الزائدة:</strong> الكبدة غنية جداً لدرجة أن وجبة واحدة في الأسبوع (50–70 جرام) هي الكمية المثالية والآمنة التي تُغطي احتياج الطفل دون مخاطرة السمية.</p>
</div>`,
        content_en: `<div dir="ltr">
<p>Vitamin A and Zinc form an indispensable vital duo in a child's health and growth system — the first is the guardian of mucous membranes and the immune system's weapon, and the second is the engine of cell reproduction and protein building. A deficiency in either does not just cause an isolated defect; it opens a wide gap through which multiple diseases sneak in.</p>

<h2>First: Vitamin A — More Than Just a "Vision Vitamin"</h2>
<h3>Expanded Physiological Role</h3>
<p>Vitamin A is primarily classified as an "Immune Vitamin" — a description derived from three integrated fields of action:</p>

<ol>
<li><strong>Mucous Membranes — The First Line of Defense:</strong> Vitamin A maintains the integrity of epithelial cells lining the lungs, intestines, urinary and reproductive tracts, and skin. These membranes are the first physical barrier against pathogens. In vitamin A deficiency, these membranes transform from moist, mucus-producing epithelia to dry, brittle crusts — a process called "Keratinization" — becoming an open window for germs rather than a protective barrier.</li>
<li><strong>Innate Immune Response:</strong> Vitamin A deficiency reduces the activity of Neutrophils, Macrophages, and NK (Natural Killer) cells — the cells that attack microbial invaders immediately upon arrival, before specialized immune responses are formed.</li>
<li><strong>Acquired Immune Response:</strong> Vitamin A is essential for the differentiation of Helper T cells (Th cells) and B cells, and thus for the synthesis of antibodies (IgA and IgG) against infectious agents. Its deficiency particularly weakens the mucosal IgA response — the primary antibody responsible for protecting the gut and respiratory tract.</li>
</ol>

<h3>Scale of the Global Crisis</h3>
<p>Approximately 250 million preschool-age children suffer from vitamin A deficiency worldwide. Out of every 100 children suffering from this deficiency, 10 are expected to die due to the resulting weakened immunity. More than 12 clinical trials have proven that vitamin A supplementation in children under five dramatically reduces measles deaths and lowers deaths from severe diarrhea.</p>

<h3>The Fundamental Difference: Retinol vs. Beta-Carotene</h3>
<p>This distinction is more important than many think and has a direct impact on meal planning.</p>

<ul>
<li><strong>Retinol — The Ready-to-Use Animal Form:</strong> This is "ready-to-use" vitamin A — absorbed directly from animal sources and enters the bloodstream without conversion. Its absorption rate is 70–90% of the amount consumed.</li>
<li><strong>Beta-Carotene (β-Carotene) — The Variable-Efficiency Plant Type:</strong> This is "Provitamin A" — it requires conversion in the intestinal wall by the enzyme BCMO1 before becoming active retinol. The equation is not 1:1 — instead, 12 mcg of beta-carotene = 1 mcg of retinol (RAE) from fresh vegetables, and 24 mcg from cooked or dried sources.</li>
</ul>

<h4>Why is Beta-Carotene conversion efficiency variable?</h4>
<p>The conversion ratio ranges widely between individuals — from 3.6:1 to 28:1. This massive variation is due to two main factors:</p>
<ol>
<li><strong>Genetic Diversity:</strong> Mutations in the BCMO1 gene reduce the efficiency of the conversion enzyme by up to 57% in carriers of a specific genotype.</li>
<li><strong>Dietary Environment:</strong> The amount of fat in the meal radically affects absorption — beta-carotene is fat-soluble; without fat in the meal, only 5% is absorbed. Adding a tablespoon of oil to a salad or carrots increases absorption tenfold.</li>
</ol>

<p><strong>Practical Conclusion:</strong> Plant sources alone cannot be relied upon as a reliable source of vitamin A — especially for children who do not regularly consume liver or eggs.</p>

<h3>Source Comparison Table: Vitamin A Efficiency in Numbers</h3>
<table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse:collapse;">
<thead><tr><th>Source</th><th>Quantity</th><th>Available Vitamin A (RAE)</th><th>Note</th></tr></thead>
<tbody>
<tr><td>Beef Liver</td><td>100g</td><td>4,968 mcg</td><td>Exceeds safe upper limit — do not serve more than once weekly</td></tr>
<tr><td>Eggs (Whole)</td><td>2 eggs</td><td>~120 mcg</td><td>Fully absorbed Retinol</td></tr>
<tr><td>Whole Milk</td><td>Cup (240ml)</td><td>~112 mcg</td><td>Serve daily to children</td></tr>
<tr><td>Cooked Carrots</td><td>100g</td><td>~852 mcg (Plant)</td><td>Cooking breaks down cell walls and increases absorption</td></tr>
<tr><td>Sweet Potato</td><td>100g</td><td>~709 mcg (Plant)</td><td>Excellent choice with a fatty meal</td></tr>
<tr><td>Cooked Molokhia</td><td>100g</td><td>~575 mcg (Plant)</td><td>Rich Egyptian culinary heritage</td></tr>
<tr><td>Mango</td><td>1 fruit</td><td>~112 mcg (Plant)</td><td>Good choice for children</td></tr>
</tbody>
</table>

<hr>

<h2>Second: Zinc — The Silent Engine of 300 Enzymes</h2>
<h3>Why is Zinc So Pivotal?</h3>
<p>Zinc participates in more than 300 enzymes in the human body. This wide enzymatic distribution means its deficiency simultaneously affects:</p>
<ul>
<li><strong>Cell Proliferation and Division:</strong> Zinc is essential for DNA and RNA synthesis and for cell division — making it an irreplaceable element during the rapid growth of childhood.</li>
<li><strong>Protein Synthesis:</strong> It is part of the structure of "Zinc Fingers," protein structures that control the expression of hundreds of genes.</li>
<li><strong>Immune System Functions:</strong> Essential for the maturation and proliferation of T and B lymphocytes and Natural Killer cells.</li>
<li><strong>Senses of Smell and Taste:</strong> Deficiency weakens these senses, reducing a child's appetite and entering a vicious cycle of food refusal.</li>
</ul>

<h3>Zinc and Stunting — The Direct Enzymatic Link</h3>
<p>The WHO has linked zinc deficiency to stunting through two parallel pathways:</p>
<ol>
<li><strong>Path 1 — Functional:</strong> Zinc deficiency disrupts bone cell division enzymes, slowing the growth of epithelial cartilages at the ends of bones (Growth Plates).</li>
<li><strong>Path 2 — Immune:</strong> Zinc deficiency increases the incidence of diarrhea and respiratory infections — each infection bout depletes zinc and other elements, reducing growth.</li>
</ol>
<p>Randomized controlled trials found that zinc supplementation for 24 weeks gave stunted children an additional growth in height of an average of 0.37 cm compared to the placebo group.</p>

<h3>Daily Zinc Requirements and Sources</h3>
<table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse:collapse;">
<thead><tr><th>Age Group</th><th>Daily Requirement (RDA)</th></tr></thead>
<tbody>
<tr><td>0–6 months</td><td>2 mg/day</td></tr>
<tr><td>7–12 months</td><td>3 mg/day</td></tr>
<tr><td>1–3 years</td><td>3 mg/day</td></tr>
<tr><td>4–8 years</td><td>5 mg/day</td></tr>
<tr><td>9–13 years</td><td>8 mg/day</td></tr>
<tr><td>14–18 years (Males)</td><td>11 mg/day</td></tr>
<tr><td>14–18 years (Females)</td><td>9 mg/day</td></tr>
</tbody>
</table>

<h3>Food Sources — Ordered by Efficiency</h3>
<table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse:collapse;">
<thead><tr><th>Source</th><th>Zinc per 100g</th><th>Note</th></tr></thead>
<tbody>
<tr><td>Pumpkin Seeds</td><td>7.8 mg</td><td>Excellent plant source — but phytates reduce absorption</td></tr>
<tr><td>Beef</td><td>4.8 mg</td><td>Highest animal absorption efficiency</td></tr>
<tr><td>Liver</td><td>4.0 mg</td><td>+ Vitamin A + Iron</td></tr>
<tr><td>Chicken (Dark Meat)</td><td>2.4 mg</td><td>Cheaper than beef</td></tr>
<tr><td>Cashews</td><td>5.6 mg</td><td>Good plant source + healthy fats</td></tr>
<tr><td>Cooked Chickpeas</td><td>1.5 mg</td><td>Soaking improves absorption</td></tr>
<tr><td>Cheese</td><td>3.1 mg</td><td>Good with Baladi bread</td></tr>
<tr><td>Milk/Yogurt</td><td>0.9 mg</td><td>Also complements calcium</td></tr>
</tbody>
</table>

<hr>

<h2>Vitamin A and Zinc Interaction — Synergy or Competition?</h2>
<p>The relationship between the two is synergistic in one direction and competitive in another:</p>
<p><strong>Synergy:</strong> Zinc is essential for the synthesis of Retinol-Binding Protein (RBP), which carries vitamin A in the blood. Zinc deficiency leads to low RBP and thus failure to deliver vitamin A even if stored in the liver — creating a "functional deficiency" of vitamin A even without a true deficiency.</p>

<p><strong>Scientific Approach:</strong> Supplementing zinc alone in cases of double deficiency might not yield full results — both deficiencies should be treated together.</p>

<h2>The Liver Meal — The Complete Nutritional Formula</h2>
<p>A plate of liver with onions and green pepper provides a practical model of nutritional synergy in one economical meal:</p>
<ul>
<li><strong>Vitamin A & Zinc:</strong> Liver (ready Retinol + efficient animal Zinc).</li>
<li><strong>Heme Iron:</strong> Liver (rapid absorption).</li>
<li><strong>Vitamin C:</strong> Green pepper and onions (doubles iron absorption).</li>
<li><strong>Fats:</strong> Essential for vitamin A absorption.</li>
</ul>

<p><strong>Overdose Warning:</strong> Liver is so rich that one meal a week (50–70g) is the ideal and safe amount that covers a child's needs without risking toxicity.</p>
</div>`,
        sources_ar: [
            'منظمة الصحة العالمية (WHO) - نقص فيتامين أ والتقزم',
            'دراسات جين BCMO1 وكفاءة تحويل الكاروتينات (American Journal of Clinical Nutrition)',
            'الأكاديميات الوطنية للعلوم والهندسة والطب (Dietary Reference Intakes for Zinc and Vitamin A)',
            'تجارب سريرية حول تكميل الزنك والنمو الطولي للأطفال المتقزمين',
        ],
        sources_en: [
            'World Health Organization (WHO) - Vitamin A deficiency and Stunting',
            'Studies on BCMO1 gene and carotenoid conversion efficiency (American Journal of Clinical Nutrition)',
            'National Academies of Sciences, Engineering, and Medicine (Dietary Reference Intakes for Zinc and Vitamin A)',
            'Clinical trials on zinc supplementation and linear growth in stunted children',
        ],
        tags_ar: ['فيتامين أ', 'الزنك', 'المناعة', 'التقزم', 'نمو الطفل', 'كبدة', 'بيتا كاروتين', 'جين BCMO1', 'الأغشية المخاطية', 'تآزر غذائي'],
        tags_en: ['Vitamin A', 'Zinc', 'Immunity', 'Stunting', 'Child Growth', 'Liver', 'Beta-Carotene', 'BCMO1 Gene', 'Mucous Membranes', 'Nutritional Synergy'],
        meta: {
            meta_title_ar: 'فيتامين أ والزنك — درع المناعة ومحرك النمو',
            meta_title_en: 'Vitamin A & Zinc — Immunity Shield & Growth Engine',
            meta_description_ar: 'تعرف على الدور الموسّع لفيتامين أ كفيتامين مناعي والزنك كمحرك لـ 300 إنزيم. جيناتك تحدد كفاءة امتصاصك، والحل في وجبة الكبدة.',
            meta_description_en: 'Learn about the expanded role of Vitamin A as an immune vitamin and Zinc as a 300-enzyme engine. Your genes determine absorption efficiency; the solution is in the liver meal.',
            reading_time_minutes: 7,
            og_title_ar: 'فيتامين أ والزنك — درع المناعة ومحرك النمو',
            og_title_en: 'Vitamin A & Zinc — The Immunity Shield and Growth Engine',
            og_description_ar: 'هل تعلم أن نقص الزنك يقلل من فعالية فيتامين أ حتى لو كان مخزوناً في جسمك؟ اكتشف التآزر الغذائي.',
            og_description_en: 'Did you know zinc deficiency reduces Vitamin A effectiveness even if stored in your body? Discover nutritional synergy.',
        },
        imageUrl: '/images/articles/micronutrients-summary.jpg',
        category: 'micronutrients',
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
            'الكالسيوم هو المادة الخام، وفيتامين د هو المهندس المتحكّم في استخدامها',
            '80–90% من الكتلة العظمية تتراكم قبل سن 18 — الطفولة هي "نافذة الفرصة"',
            'قرابة 75% من الأطفال المصريين يعانون من نقص أو قصور في مستويات فيتامين د',
        ],
        quick_summary_en: [
            'Calcium is the raw material, and Vitamin D is the engineer controlling its use',
            '80–90% of bone mass accumulates before age 18 — childhood is the "window of opportunity"',
            'Nearly 75% of Egyptian children suffer from deficiency or insufficiency in Vitamin D levels',
        ],
        content_ar: `<div dir="rtl">
<p>الكالسيوم وفيتامين د ليسا مجرد مغذّيَين مستقلَّين يُؤدّيان وظيفة واحدة — بل هما نظام بيولوجي متكامل لا يعمل أحدهما بفاعلية دون الآخر. الكالسيوم هو المادة الخام، وفيتامين د هو المهندس المتحكّم في استخدامها.</p>

<h2>نافذة الفرصة — ما العلم يقوله</h2>
<p>الكتلة العظمية القصوى (Peak Bone Mass) هي أعلى كثافة يصلها عظم الإنسان في حياته، وتتراكم 80–90% منها قبل سن 18–20 سنة. هذه الكتلة تُحدّد بشكل مباشر خطر هشاشة العظام وكسورها في الخمسين والستين من العمر — فكلما ارتفعت القمة المبنية في الطفولة، احتاج الجسم لسنوات أطول من الخسارة الطبيعية المرتبطة بالعمر ليصل إلى عتبة الخطر.</p>

<p>دراسة طولية طبّقت تكميل الكالسيوم على أطفال في مرحلة ما قبل البلوغ وجدت أن زيادة الكثافة العظمية في هذه المرحلة تستمر موثَّقةً بعد سنوات من التوقف عن التكميل — دليل على أن الاستثمار في العظام خلال الطفولة يترك أثراً دائماً.</p>

<hr>

<h2>فيتامين د — الكيمياء الحيوية الكاملة</h2>
<h3>كيف يتصنّع فيتامين د في الجسم؟</h3>
<p>فيتامين د يمرّ بثلاث مراحل تحويل قبل أن يُصبح نشطاً:</p>

<ol>
<li><strong>الجلد (أشعة UV-B) أو الغذاء:</strong> البداية من فيتامين د₃ (كوليكالسيفيرول) — شكل خامل.</li>
<li><strong>الكبد:</strong> يتحول إلى 25-هيدروكسي فيتامين د [25(OH)D] (الصيغة التي تُقاس في تحليل الدم).</li>
<li><strong>الكلى:</strong> يتحول إلى 1,25 ثنائي-هيدروكسي فيتامين د [كالسيتريول] (الشكل النشط الفعّال — الهرمون الحقيقي).</li>
</ol>

<h3>آلية التحكم في امتصاص الكالسيوم</h3>
<p>فيتامين د في صيغته النشطة (كالسيتريول) يعمل كهرمون يرتبط بـمستقبل فيتامين د (VDR) في خلايا الأمعاء. هذا الارتباط يُفعّل تصنيع ثلاثة بروتينات نقل حاسمة:</p>
<ul>
<li><strong>TRPV6:</strong> بروتين البوابة الذي يسمح للكالسيوم بدخول الخلية المعوية من التجويف الهضمي.</li>
<li><strong>Calbindin-D9k:</strong> بروتين ناقل داخل الخلية يحمل الكالسيوم عبرها دون أن يُسبّب سمية خلوية.</li>
<li><strong>PMCA1b:</strong> مضخة طاقة تُخرج الكالسيوم من الخلية إلى الدم.</li>
</ul>
<p>بدون فيتامين د كافٍ، تُقفَل هذه البوابات وتتوقف المضخات — فيمر الكالسيوم عبر الأمعاء ويُطرح مع البراز دون امتصاص حتى لو كان وافراً في الغذاء.</p>

<h3>ماذا يحدث عند نقص فيتامين د — الآلية المتتالية</h3>
<p>النقص لا يُسبّب فوراً كساح العظام — بل يمرّ بتسلسل مدروس:</p>
<ol>
<li>انخفاض كفاءة امتصاص الكالسيوم من الأمعاء.</li>
<li>انخفاض الكالسيوم في الدم (Hypocalcemia).</li>
<li>تنبيه الغدة الجار درقية لإفراز هرمون PTH (هرمون الغدة الجاردرقية) للتعويض.</li>
<li>PTH يأمر العظام بإطلاق الكالسيوم المخزون فيها للحفاظ على تركيزه في الدم.</li>
<li>الاستنزاف المزمن لكالسيوم العظام ← ضعف التمعدن ← لين العظام (Rickets) عند الأطفال، هشاشة العظام لاحقاً.</li>
</ol>

<hr>

<h2>واقع فيتامين د في مصر — مفارقة الشمس الساطعة</h2>
<p>منطقة الشرق الأوسط وشمال أفريقيا تسجّل بعضاً من أشد مستويات نقص فيتامين د في العالم — وهو ما يبدو متناقضاً في منطقة تتمتع بشمس شبه يومية. والنتائج في مصر تحديداً مثيرة للقلق:</p>
<ul>
<li>دراسة على أطفال مصريين في سن المدرسة وجدت أن 33.5% يعانون من نقص فيتامين د (أقل من 20 نانوغرام/مل)، وأن 41.5% إضافيين يعانون من قصور (20–30 نانوغرام/مل) — أي أن ما مجموعه 75% من الأطفال المصريين لا يصلون للمستوى الكافي.</li>
<li>دراسة على المراهقين المصريين الأصحاء ظاهرياً وجدت أن 99% منهم يعانون من نقص أو قصور فيتامين د — وكانت الفتيات أكثر تأثراً من الأولاد.</li>
<li>الأطفال البدينون، وغير النشطين بدنياً، ومنخفضو التعرض للشمس كانوا الأكثر عرضة للنقص الحاد.</li>
</ul>

<h3>لماذا رغم وفرة الشمس؟</h3>
<p>عوامل متعددة تُفسّر هذه المفارقة:</p>
<ul>
<li>التعرض للشمس يقتصر على الوجه واليدين في كثير من الأحيان — وهي مساحة جلدية صغيرة للتصنيع.</li>
<li>الملابس الكاملة وزجاج النوافذ يحجبان أشعة UV-B المُصنِّعة لفيتامين د.</li>
<li>الأوقات التي يخرج فيها الأطفال (الصباح الباكر أو بعد الغروب) لا تحتوي على UV-B كافٍ.</li>
<li>بشرة أغمق تحتاج وقت تعرض أطول لنفس الإنتاج.</li>
<li>الوقت الطويل أمام الشاشات والحياة داخل المنازل.</li>
</ul>

<hr>

<h2>متطلبات الكالسيوم — الاحتياجات والمصادر</h2>
<h3>جدول الاحتياجات اليومية</h3>
<table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse:collapse;">
<thead><tr><th>الفئة العمرية</th><th>الكالسيوم (RDA)</th><th>فيتامين د (RDA)</th></tr></thead>
<tbody>
<tr><td>0–6 أشهر</td><td>200 ملغ/يوم</td><td>400 IU/يوم</td></tr>
<tr><td>7–12 شهراً</td><td>260 ملغ/يوم</td><td>400 IU/يوم</td></tr>
<tr><td>1–3 سنوات</td><td>700 ملغ/يوم</td><td>600 IU/يوم</td></tr>
<tr><td>4–8 سنوات</td><td>1,000 ملغ/يوم</td><td>600 IU/يوم</td></tr>
<tr><td>9–18 سنة</td><td>1,300 ملغ/يوم</td><td>600 IU/يوم</td></tr>
<tr><td>بالغون</td><td>1,000 ملغ/يوم</td><td>600 IU/يوم</td></tr>
</tbody>
</table>
<p><strong>ملاحظة:</strong> مرحلة المراهقة (9–18 سنة) لديها أعلى احتياج من الكالسيوم في العمر كله — أكثر من البالغين وأكثر من كبار السن — لأنها ذروة بناء الكتلة العظمية.</p>

<h3>مصادر الكالسيوم — مرتبةً بالكفاءة</h3>
<table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse:collapse;">
<thead><tr><th>المصدر</th><th>الكالسيوم في الحصة</th><th>الحصة</th><th>ملاحظة</th></tr></thead>
<tbody>
<tr><td>جبن أبيض (فيتا)</td><td>315 ملغ</td><td>50 جرام</td><td>الأعلى تركيزاً بين الألبان</td></tr>
<tr><td>لبن (حليب)</td><td>300 ملغ</td><td>كوب 250 مل</td><td>+ فيتامين د في المُدعَّم</td></tr>
<tr><td>زبادي</td><td>250–300 ملغ</td><td>عبوة 200 جرام</td><td>البروبيوتيك يُحسّن الامتصاص</td></tr>
<tr><td>سردين بالعظام</td><td>350 ملغ</td><td>علبة صغيرة 100 جرام</td><td>الكالسيوم من العظام المُهرَّسة</td></tr>
<tr><td>تين مجفف</td><td>135 ملغ</td><td>5 حبات</td><td>خيار نباتي جيد + ألياف</td></tr>
<tr><td>سبانخ مطبوخة</td><td>240 ملغ</td><td>كوب</td><td>الأوكسالات تُقلّل الامتصاص الفعلي إلى 5%</td></tr>
<tr><td>بروكلي</td><td>62 ملغ</td><td>كوب مطبوخ</td><td>امتصاص كالسيومه أفضل من السبانخ</td></tr>
<tr><td>باذنجان/لفت مطبوخ</td><td>100–150 ملغ</td><td>كوب</td><td>خيار مصري متاح</td></tr>
</tbody>
</table>

<p><strong>تحذير السبانخ:</strong> رغم محتواها الكالسيومي العالي نظرياً، فإن السبانخ غنية بالأوكسالات التي تُشكّل مع الكالسيوم مُركّبات غير قابلة للامتصاص. الامتصاص الفعلي من كالسيوم السبانخ لا يتجاوز 5% فقط. مصادر الكالسيوم المنخفضة الأوكسالات (حليب، جبن، سردين، بروكلي) أكثر فاعلية بكثير.</p>

<hr>

<h2>التآزر والتنافس — ما يُعزّز وما يُعيق امتصاص الكالسيوم</h2>
<table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse:collapse;">
<thead><tr><th>العامل</th><th>التأثير</th><th>الآلية</th></tr></thead>
<tbody>
<tr><td>فيتامين د كافٍ</td><td>يُضاعف الامتصاص</td><td>يُفعّل بروتينات النقل المعوية</td></tr>
<tr><td>اللاكتوز في الحليب</td><td>يُعزّز الامتصاص</td><td>يُحمّض البيئة المعوية ويُبطّئ عبور الكالسيوم</td></tr>
<tr><td>البروتين الكافي</td><td>يُعزّز الامتصاص</td><td>يُحسّن توازن كالسيوم الجسم كله</td></tr>
<tr><td>الحديد الزائد في نفس الوقت</td><td>يُنافس الامتصاص</td><td>يتشارك نفس الناقل المعوي — لذا يُفضَّل الفصل بساعة</td></tr>
<tr><td>الفايتات (حبوب غير منقوعة)</td><td>يُثبّط الامتصاص</td><td>يرتبط بالكالسيوم ويمنع امتصاصه</td></tr>
<tr><td>الكافيين الزائد</td><td>يُقلّل الاحتجاز</td><td>يزيد طرح الكالسيوم عبر البول</td></tr>
<tr><td>ملح (صوديوم) زائد</td><td>يُقلّل الاحتجاز</td><td>الصوديوم والكالسيوم يتشاركان آلية الإعادة الكلوية</td></tr>
<tr><td>مغنيسيوم كافٍ</td><td>يُعزّز الفاعلية</td><td>يُساعد في تفعيل فيتامين د في الكلى</td></tr>
</tbody>
</table>

<hr>

<h2>أشعة الشمس — الجرعة الصحيحة والمتغيرات المؤثرة</h2>
<p><strong>الجرعة المثالية:</strong> 15–30 دقيقة من التعرض المباشر للشمس مع كشف الذراعين والساقين أو الظهر — بين الساعة 10 صباحاً و3 ظهراً عندما تكون أشعة UV-B في أعلى شدتها — يُنتج ما يكفي من فيتامين د لكثير من الأطفال. لكن هذه الجرعة تتأثر بمتغيرات متعددة:</p>
<ul>
<li><strong>موسم السنة:</strong> في مصر، شهور الصيف (مارس–سبتمبر) تكفي 10–15 دقيقة، أما الشتاء فقد تحتاج 30–40 دقيقة لنفس الإنتاج.</li>
<li><strong>لون البشرة:</strong> البشرة الداكنة تحتاج وقت تعرض أطول بـ3–6 أضعاف مقارنةً بالبشرة الفاتحة لإنتاج نفس الكمية.</li>
<li><strong>الزجاج:</strong> يحجب 100% من UV-B — الجلوس بجانب نافذة مشمسة لا يُنتج فيتامين د.</li>
<li><strong>واقي الشمس (SPF 15):</strong> يُقلّل إنتاج فيتامين د بنسبة تصل لـ99% — وهو ما يخلق معادلة صعبة بين حماية الجلد وإنتاج الفيتامين.</li>
</ul>

<h3>التوصية للأطفال المصريين</h3>
<p>نظراً للنسب المرتفعة من نقص فيتامين د، توصي منظمة الصحة العالمية بمكمّلات فيتامين د الوقائية للرضّع (400 IU/يوم) وللأطفال الذين يعيشون في بيئات مغلقة أو يرتدون ملابس كاملة. أما اختيار جرعة التكميل للأطفال الأكبر فيُحدّده طبيب الأطفال بناءً على تحليل 25-OH فيتامين د في الدم.</p>

<h2>وجبة "اللبن والسردين" — بناء العظم بمكوّنين</h2>
<p>حصة لبن (300 ملغ كالسيوم) + علبة سردين صغيرة بعظامها (350 ملغ كالسيوم + فيتامين د + أوميجا 3) + تعرّض لأشعة الشمس 20 دقيقة = يغطّي 65% من احتياج الطفل اليومي من الكالسيوم في وجبة واحدة مع دعم امتصاصه بفيتامين د.</p>

<p><strong>تنويه:</strong> مكمّلات الكالسيوم وفيتامين د تُعطى فقط بوصفة طبيب — الجرعة الزائدة من كلٍّ منهما تُحدث تأثيرات سلبية موثَّقّة، والتشخيص الصحيح يبدأ بتحليل الدم لا بالأعراض وحدها.</p>
</div>`,
        content_en: `<div dir="ltr">
<p>Calcium and Vitamin D are not just independent nutrients performing a single function — they are an integrated biological system where one cannot work effectively without the other. Calcium is the raw material, and Vitamin D is the engineer controlling its utilization.</p>

<h2>Window of Opportunity — What Science Says</h2>
<p>Peak Bone Mass is the highest density a human bone reaches in its lifetime, and 80–90% of it accumulates before age 18–20. This mass directly determines the risk of osteoporosis and fractures in one's fifties and sixties — the higher the peak built in childhood, the more years of age-related natural loss the body needs to reach the danger threshold.</p>

<p>A longitudinal study that applied calcium supplementation to prepubertal children found that the increase in bone density at this stage remained documented years after supplementation stopped — evidence that investing in bones during childhood leaves a permanent impact.</p>

<hr>

<h2>Vitamin D — The Complete Biochemistry</h2>
<h3>How is Vitamin D Synthesized in the Body?</h3>
<p>Vitamin D undergoes three conversion stages before becoming active:</p>

<ol>
<li><strong>Skin (UV-B rays) or Diet:</strong> Starts as Vitamin D₃ (Cholecalciferol) — an inactive form.</li>
<li><strong>Liver:</strong> Converts to 25-hydroxyvitamin D [25(OH)D] (the form measured in blood tests).</li>
<li><strong>Kidney:</strong> Converts to 1,25-dihydroxyvitamin D [Calcitriol] (the active effective form — the real hormone).</li>
</ol>

<h3>Mechanism for Controlling Calcium Absorption</h3>
<p>Vitamin D in its active form (Calcitriol) acts as a hormone that binds to the Vitamin D Receptor (VDR) in intestinal cells. This binding activates the synthesis of three critical transport proteins:</p>
<ul>
<li><strong>TRPV6:</strong> The gateway protein that allows calcium to enter the intestinal cell from the digestive lumen.</li>
<li><strong>Calbindin-D9k:</strong> An intracellular transport protein that carries calcium across without causing cellular toxicity.</li>
<li><strong>PMCA1b:</strong> An energy pump that moves calcium out of the cell into the blood.</li>
</ul>
<p>Without sufficient Vitamin D, these gates are closed and the pumps stop — calcium passes through the intestines and is excreted with feces without absorption, even if it is abundant in the diet.</p>

<h3>What Happens During Vitamin D Deficiency — The Sequential Mechanism</h3>
<p>Deficiency does not immediately cause rickets — it follows a calculated sequence:</p>
<ol>
<li>Decreased efficiency of calcium absorption from the intestine.</li>
<li>Decreased blood calcium (Hypocalcemia).</li>
<li>Stimulation of the parathyroid gland to secrete PTH (parathyroid hormone) to compensate.</li>
<li>PTH orders the bones to release stored calcium to maintain its concentration in the blood.</li>
<li>Chronic depletion of bone calcium → failure of mineralization → Rickets in children, osteoporosis later.</li>
</ol>

<hr>

<h2>Vitamin D Reality in Egypt — The Bright Sun Paradox</h2>
<p>The MENA region registers some of the most severe levels of Vitamin D deficiency in the world — which seems contradictory in a region with near-daily sun. Results in Egypt specifically are alarming:</p>
<ul>
<li>A study on Egyptian school-age children found that 33.5% suffer from Vitamin D deficiency (< 20 ng/ml), and an additional 41.5% suffer from insufficiency (20–30 ng/ml) — meaning 75% of Egyptian children do not reach adequate levels.</li>
<li>A study on apparently healthy Egyptian adolescents found that 99% of them suffer from Vitamin D deficiency or insufficiency — with girls more affected than boys.</li>
<li>Obese children, physically inactive children, and those with low sun exposure were the most vulnerable to severe deficiency.</li>
</ul>

<h3>Why despite the abundance of sun?</h3>
<p>Multiple factors explain this paradox:</p>
<ul>
<li>Sun exposure is often limited to the face and hands — a small skin area for synthesis.</li>
<li>Full clothing and window glass block the UV-B rays that synthesize Vitamin D.</li>
<li>Times when children go out (early morning or after sunset) do not contain enough UV-B.</li>
<li>Darker skin requires longer exposure time for the same production.</li>
<li>Long screen time and indoor living.</li>
</ul>

<hr>

<h2>Calcium Requirements — Needs and Sources</h2>
<h3>Daily Requirements Table</h3>
<table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse:collapse;">
<thead><tr><th>Age Group</th><th>Calcium (RDA)</th><th>Vitamin D (RDA)</th></tr></thead>
<tbody>
<tr><td>0–6 months</td><td>200 mg/day</td><td>400 IU/day</td></tr>
<tr><td>7–12 months</td><td>260 mg/day</td><td>400 IU/day</td></tr>
<tr><td>1–3 years</td><td>700 mg/day</td><td>600 IU/day</td></tr>
<tr><td>4–8 years</td><td>1,000 mg/day</td><td>600 IU/day</td></tr>
<tr><td>9–18 years</td><td>1,300 mg/day</td><td>600 IU/day</td></tr>
<tr><td>Adults</td><td>1,000 mg/day</td><td>600 IU/day</td></tr>
</tbody>
</table>
<p><strong>Note:</strong> Adolescence (9–18 years) has the highest calcium requirement in a lifetime — more than adults and more than the elderly — because it is the peak of bone mass building.</p>

<h3>Calcium Sources — Ordered by Efficiency</h3>
<table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse:collapse;">
<thead><tr><th>Source</th><th>Calcium per Serving</th><th>Serving Size</th><th>Note</th></tr></thead>
<tbody>
<tr><td>White Cheese (Feta)</td><td>315 mg</td><td>50g</td><td>Highest concentration among dairy products</td></tr>
<tr><td>Milk</td><td>300 mg</td><td>250ml cup</td><td>+ Vitamin D in fortified types</td></tr>
<tr><td>Yogurt</td><td>250–300 mg</td><td>200g container</td><td>Probiotics improve absorption</td></tr>
<tr><td>Sardines with bones</td><td>350 mg</td><td>Small 100g can</td><td>Calcium from crushed bones</td></tr>
<tr><td>Dried Figs</td><td>135 mg</td><td>5 fruits</td><td>Good vegetable option + fiber</td></tr>
<tr><td>Cooked Spinach</td><td>240 mg</td><td>Cup</td><td>Oxalates reduce actual absorption to 5%</td></tr>
<tr><td>Broccoli</td><td>62 mg</td><td>Cooked cup</td><td>Calcium absorption is better than spinach</td></tr>
<tr><td>Cooked Eggplant/Turnip</td><td>100–150 mg</td><td>Cup</td><td>Available Egyptian option</td></tr>
</tbody>
</table>

<p><strong>Spinach Warning:</strong> Despite its theoretically high calcium content, spinach is rich in oxalates that form unabsorbable compounds with calcium. Actual absorption from spinach calcium does not exceed 5%. Low-oxalate calcium sources (milk, cheese, sardines, broccoli) are much more effective.</p>

<hr>

<h2>Synergy and Competition — What Enhances and What Hinders Calcium Absorption</h2>
<table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse:collapse;">
<thead><tr><th>Factor</th><th>Effect</th><th>Mechanism</th></tr></thead>
<tbody>
<tr><td>Sufficient Vitamin D</td><td>Doubles absorption</td><td>Activates intestinal transport proteins</td></tr>
<tr><td>Lactose in Milk</td><td>Enhances absorption</td><td>Acidifies the intestinal environment and slows calcium transit</td></tr>
<tr><td>Adequate Protein</td><td>Enhances absorption</td><td>Improves whole-body calcium balance</td></tr>
<tr><td>Excess Iron at same time</td><td>Competes for absorption</td><td>Shares the same intestinal carrier — separation by one hour preferred</td></tr>
<tr><td>Phytates (Unsoaked grains)</td><td>Inhibits absorption</td><td>Binds to calcium and prevents absorption</td></tr>
<tr><td>Excess Caffeine</td><td>Reduces retention</td><td>Increases calcium excretion via urine</td></tr>
<tr><td>Excess Salt (Sodium)</td><td>Reduces retention</td><td>Sodium and calcium share renal reabsorption mechanism</td></tr>
<tr><td>Sufficient Magnesium</td><td>Enhances effectiveness</td><td>Helps in activating Vitamin D in the kidney</td></tr>
</tbody>
</table>

<hr>

<h2>Sunlight — The Correct Dose and Influencing Variables</h2>
<p><strong>Ideal Dose:</strong> 15–30 minutes of direct sun exposure with arms, legs, or back exposed — between 10 AM and 3 PM when UV-B rays are at their peak intensity — produces enough Vitamin D for many children. However, this dose is affected by multiple variables:</p>
<ul>
<li><strong>Season of the Year:</strong> In Egypt, summer months (March–September) require 10–15 minutes, while winter may need 30–40 minutes for the same production.</li>
<li><strong>Skin Color:</strong> Darker skin requires 3–6 times longer exposure compared to lighter skin for the same amount.</li>
<li><strong>Glass:</strong> Blocks 100% of UV-B — sitting by a sunny window does not produce Vitamin D.</li>
<li><strong>Sunscreen (SPF 15):</strong> Reduces Vitamin D production by up to 99% — creating a difficult trade-off between skin protection and vitamin production.</li>
</ul>

<h3>Recommendation for Egyptian Children</h3>
<p>Given the high rates of Vitamin D deficiency, the WHO recommends preventive Vitamin D supplements for infants (400 IU/day) and for children living in closed environments or wearing full clothing. Choosing a supplement dose for older children is determined by a pediatrician based on a 25-OH Vitamin D blood test.</p>

<h2>The "Milk and Sardines" Meal — Building Bone with Two Components</h2>
<p>A serving of milk (300 mg calcium) + a small can of sardines with bones (350 mg calcium + Vitamin D + Omega-3) + 20 minutes of sun exposure = covers 65% of a child's daily calcium requirement in one meal with its absorption support from Vitamin D.</p>

<p><strong>Disclaimer:</strong> Calcium and Vitamin D supplements are given only by a doctor's prescription — an overdose of either can cause documented negative effects, and correct diagnosis begins with a blood test, not symptoms alone.</p>
</div>`,
        sources_ar: [
            'الأكاديميات الوطنية للعلوم والهندسة والطب (Dietary Reference Intakes for Calcium and Vitamin D)',
            'دراسات محلية حول مستويات فيتامين د عند الأطفال والمراهقين المصريين (جامعة عين شمس والقاهرة)',
            'منظمة الصحة العالمية (WHO) - الوقاية من الكساح ونقص فيتامين د',
        ],
        sources_en: [
            'National Academies of Sciences, Engineering, and Medicine (Dietary Reference Intakes for Calcium and Vitamin D)',
            'Local studies on Vitamin D levels in Egyptian children and adolescents (Ain Shams and Cairo University)',
            'World Health Organization (WHO) - Prevention of rickets and vitamin D deficiency',
        ],
        tags_ar: ['كالسيوم', 'فيتامين د', 'عظام', 'هشاشة العظام', 'الكساح', 'لبن', 'سردين', 'أشعة الشمس', 'جين VDR', 'تآزر غذائي'],
        tags_en: ['Calcium', 'Vitamin D', 'Bones', 'Osteoporosis', 'Rickets', 'Milk', 'Sardines', 'Sunlight', 'VDR Gene', 'Nutritional Synergy'],
        meta: {
            meta_title_ar: 'الكالسيوم وفيتامين د — ثنائي بناء عظام طفلك',
            meta_title_en: 'Calcium & Vitamin D — The Bone-Building Duo for Your Child',
            meta_description_ar: 'تعرف على الكيمياء الحيوية لنظام الكالسيوم وفيتامين د. لماذا يحتاج طفلك للمهندس والمادة الخام معاً؟ وكيف تقرأ نتائج تحليل فيتامين د؟',
            meta_description_en: 'Learn the biochemistry of the Calcium & Vitamin D system. Why does your child need both the engineer and the raw material? And how to read Vitamin D test results?',
            reading_time_minutes: 8,
            og_title_ar: 'الكالسيوم وفيتامين د — ثنائي بناء عظام طفلك',
            og_title_en: 'Calcium & Vitamin D — The Bone-Building Duo',
            og_description_ar: 'هل تعلم أن 99% من المراهقين المصريين في بعض الدراسات يعانون من نقص أو قصور فيتامين د؟ حان الوقت للاستثمار في العظام.',
            og_description_en: 'Did you know that 99% of Egyptian adolescents in some studies suffer from Vitamin D deficiency or insufficiency? It\'s time to invest in bones.',
        },
        imageUrl: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=800&q=80',
        category: 'micronutrients',
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
            'اليود هو الوقود الأول لبناء الدماغ البشري وليس مجرد معدن للغدة الدرقية',
            'نقصه يسبب خسارة إدراكية جماعية (10-15 نقطة ذكاء) لا تُعوَّض بالكامل بعد فوات الأوان',
            'في مصر، كشفت بعض الدراسات أن 91.9% من الأطفال في سن المدرسة لديهم مستوى يود بولي غير طبيعي',
        ],
        quick_summary_en: [
            'Iodine is the primary fuel for building the human brain, not just a thyroid mineral',
            'Its deficiency causes collective cognitive loss (10-15 IQ points) that cannot be fully regained later',
            'In Egypt, some studies revealed that 91.9% of school-age children have abnormal urinary iodine levels',
        ],
        content_ar: `<div dir="rtl">
<p>اليود ليس مجرد معدن يقي من تضخم الغدة الدرقية — بل هو الوقود الأول لبناء الدماغ البشري. أكثر من ثلاثة عقود من الأبحاث تُقرّ بأن نقصه يُسبّب خسارة إدراكية قابلة للقياس بالأرقام، ولا يُعوَّض جزء منها حتى بعد العلاج. وبهذا المعنى، فإن مجرد استخدام ملح مُعالج باليود هو أحد أبسط وأرخص الاستثمارات التي يمكن للأسرة القيام بها لحماية مستقبل طفلها الإدراكي.</p>

<h2>اليود والغدة الدرقية — السلسلة الحيوية الكاملة</h2>
<h3>كيف تُنتج الغدة الدرقية هرموناتها؟</h3>
<p>الغدة الدرقية تُشبه مصنعاً متخصصاً يُنتج هرمونَين رئيسيَّين: T4 (ثيروكسين) وT3 (ثلاثي يودوثيرونين) — وكلاهما يحتوي اليود في بنيته الجزيئية كجزء لا يمكن استبداله. الغدة الدرقية تستورد اليود من الدم، تُؤكسده، وتُدمجه مع حمض الأميني تيروزين لتصنيع الهرمونين. بدون اليود لا يمكن تصنيع هذين الهرمونين — بأي طريقة أخرى. المعادلة ليست قابلة للتحايل.</p>

<h3>هرمونات الغدة الدرقية والدماغ — الدور الفريد</h3>
<p>لا يُدرك كثيرون أن هرمونات الغدة الدرقية هي أساس بناء الدماغ خلال مرحلة الجنين وأول سنتين من الحياة — ليست مجرد منظّم للتمثيل الغذائي. على المستوى العصبي، تتحكم هذه الهرمونات في:</p>
<ul>
<li><strong>تكوين الخلايا العصبية (Neurogenesis):</strong> تحديد عدد الخلايا العصبية المُصنَّعة.</li>
<li><strong>هجرة الخلايا العصبية (Neuronal Migration):</strong> توجيه الخلايا للأماكن الصحيحة في القشرة الدماغية.</li>
<li><strong>التشجّر العصبي (Axonal/Dendritic Arborization):</strong> نمو التفرعات العصبية التي تصنع الاتصالات.</li>
<li><strong>التمايلن (Myelination):</strong> تغليف الألياف العصبية بالمايلين لتسريع الإشارات.</li>
<li><strong>تكوين المشابك العصبية (Synaptogenesis):</strong> بناء نقاط التواصل بين الخلايا العصبية.</li>
</ul>
<p>كل هذه العمليات تحدث في نوافذ زمنية لا تتكرر — أي أن التعرض للنقص في هذه المراحل يُحدث ضرراً هيكلياً في الدماغ لا يُعوَّض لاحقاً حتى لو تحسّن مستوى اليود بعدها.</p>

<hr>

<h2>الأرقام الحقيقية لخسارة الذكاء — ما تُبيّنه الدراسات الكمية</h2>
<p>التأثير الإدراكي لنقص اليود ليس مجرد وصف نظري — بل تُقيسه دراسات موثَّقة بمقاييس الذكاء المُقننة:</p>
<ul>
<li><strong>الخسارة في مناطق النقص الشديد:</strong> يتراجع متوسط مؤشر الذكاء بـ10–15 نقطة على مستوى المجتمع كله في مناطق النقص الحاد — وهو ما وصفه مراجعة منهجية شاملة بأنه "أكبر خسارة معرفية جماعية قابلة للوقاية في التاريخ البشري".</li>
<li><strong>نقص متوسط الشدة:</strong> في دراسة طبّقت مقياس Wechsler للذكاء (WISC-III) على الأطفال، سجّل الأطفال ذوو النقص المتوسط في اليود 15.13 نقطة أقل في مؤشر الذكاء الكلي مقارنةً بأقرانهم ذوي المستوى الكافي، مع ضعف دال في 6 من أصل 13 اختباراً فرعياً — شاملاً الذاكرة اللفظية، الفهم، التفكير البصري-المكاني والتسلسل المنطقي.</li>
<li><strong>تحليل شامل لـ18 دراسة:</strong> الأطفال المصابون بنقص اليود يسجّلون في المتوسط 6.9 إلى 10.2 نقطة ذكاء أقل من أقرانهم المكتفين باليود.</li>
<li><strong>ما بعد التكميل:</strong> يُحسّن تكميل اليود مؤشر الذكاء في الأطفال الأصحاء بمتوسط 4.5 نقطة — إشارة إلى أن حتى النقص الخفيف غير المُشخَّص يُلحق خسارة قابلة للتحسين.</li>
</ul>

<h3>النافذة الزمنية الحاسمة — الجنين حتى السنة الثانية</h3>
<p>النقص قبل الولادة (عند الأم الحامل) هو الأشد خطورةً على الإطلاق. يُقدّر 19 مليون طفل مولود سنوياً بأنهم معرّضون لخطر التلف الدماغي بسبب نقص اليود عند أمهاتهم. والجانب المأساوي هو أن الضرر قد يقع قبل أن يعلم أحد بالحمل — في الأسابيع الأولى الحرجة التي تُصنع فيها البنى العصبية الأساسية.</p>

<hr>

<h2>الوضع في مصر — بين برامج الإيودة والتحديات الواقعية</h2>
<p>رغم أن مصر اعتمدت برامج تمليح اليود منذ التسعينيات، تُكشف الدراسات الميدانية عن فجوة كبيرة بين السياسة والواقع. دراسة في محافظة كفر الشيخ وجدت أن معدل الإصابة بتضخم الغدة الدرقية (المؤشر السريري الكلاسيكي لنقص اليود) بلغ 27.1% بين الأطفال في المدارس الابتدائية، مع مستويات اليود في البول أقل بكثير من الحد الموصى به. وعلى المستوى الوطني، وجد مسح شامل أن 91.9% من الأطفال في سن المدرسة كان لديهم مستوى اليود البولي غير طبيعي، وأن 25% منهم يعانون من تضخم سريري في الغدة الدرقية — في وقت يُفترض فيه أن الملح المُعالج باليود يُغطي الاحتياج. في القاهرة تحديداً، بلغت نسبة التضخم في مدارس ابتدائية 13.5% مما يُصنّفه الباحثون كمشكلة صحة عامة تستدعي تدخلاً برنامجياً.</p>

<h3>لماذا يستمر النقص رغم برامج التمليح؟</h3>
<ul>
<li><strong>عدم انتظام التوزيع:</strong> ليس كل الملح المباع في السوق مُعالجاً باليود — خاصةً الملح غير المعبّأ المُستخدَم في الطهي الجماعي.</li>
<li><strong>فقدان اليود بالحرارة:</strong> اليود في الملح المُعالج يتحلّل جزئياً عند التسخين الشديد، خاصةً عند إضافة الملح في بداية الطهي.</li>
<li><strong>استهلاك الغواترات (Goitrogens):</strong> مواد طبيعية في بعض الأطعمة (الكرنب، القرنبيط، فول الصويا) تُثبّط امتصاص اليود في الغدة الدرقية عند الاستهلاك المُفرط.</li>
</ul>

<hr>

<h2>مراحل نقص اليود وأعراضه عند الأطفال</h2>
<table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse:collapse;">
<thead><tr><th>درجة النقص</th><th>اليود البولي (ميكروغرام/لتر)</th><th>التأثيرات الموثَّقة</th></tr></thead>
<tbody>
<tr><td>كافٍ</td><td>100 ≤</td><td>نمو طبيعي + وظيفة درقية طبيعية</td></tr>
<tr><td>نقص خفيف</td><td>50–99</td><td>خفض طفيف في هرمونات الغدة الدرقية — لا أعراض واضحة لكن ضعف معرفي قابل للقياس</td></tr>
<tr><td>نقص متوسط</td><td>20–49</td><td>تضخم الغدة الدرقية — تراجع ملحوظ في الأداء المدرسي والذكاء</td></tr>
<tr><td>نقص شديد</td><td>20 <</td><td>قصور درقي، إعاقة ذهنية، كساح عظمي، صمم عصبي، في الحالات الأشد: كريتينية لا رجعة فيها</td></tr>
</tbody>
</table>

<hr>

<h2>المصادر الغذائية — ما يتوفر في المطبخ المصري</h2>
<h3>جدول مقارنة المصادر</h3>
<table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse:collapse;">
<thead><tr><th>المصدر</th><th>اليود في الحصة</th><th>الحصة</th><th>الملاحظة</th></tr></thead>
<tbody>
<tr><td>ملح مُعالج باليود</td><td>~45 ميكروغرام</td><td>ملعقة صغيرة (5 جرام)</td><td>الأيسر والأوفر والأرخص — المصدر الاستراتيجي</td></tr>
<tr><td>تونة معلّبة</td><td>17 ميكروغرام</td><td>100 جرام</td><td>اليود يتفاوت بحسب مصدر السمكة</td></tr>
<tr><td>سردين</td><td>35 ميكروغرام</td><td>100 جرام</td><td>+ كالسيوم + فيتامين د</td></tr>
<tr><td>حليب كامل الدسم</td><td>88 ميكروغرام</td><td>كوب (240 مل)</td><td>يتفاوت بحسب غذاء الماشية وطريقة المعالجة</td></tr>
<tr><td>زبادي</td><td>75 ميكروغرام</td><td>كوب</td><td>مصدر منتظم في الوجبات اليومية</td></tr>
<tr><td>بيض</td><td>26 ميكروغرام</td><td>بيضة واحدة</td><td>معظمه في الصفار</td></tr>
<tr><td>جبن أبيض</td><td>15–30 ميكروغرام</td><td>50 جرام</td><td>يتفاوت بحسب طريقة التصنيع</td></tr>
<tr><td>خبز بالطحين المُدعَّم</td><td>45 ميكروغرام</td><td>قطعتان</td><td>إذا كان الدقيق أو الملح المستخدم مُدعَّماً</td></tr>
</tbody>
</table>

<hr>

<h2>الاحتياجات اليومية والحدود الآمنة</h2>
<table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse:collapse;">
<thead><tr><th>الفئة العمرية</th><th>الاحتياج اليومي (RDA)</th><th>الحد الأقصى الآمن (UL)</th></tr></thead>
<tbody>
<tr><td>1–3 سنوات</td><td>90 ميكروغرام/يوم</td><td>200 ميكروغرام/يوم</td></tr>
<tr><td>4–8 سنوات</td><td>90 ميكروغرام/يوم</td><td>300 ميكروغرام/يوم</td></tr>
<tr><td>9–13 سنة</td><td>120 ميكروغرام/يوم</td><td>600 ميكروغرام/يوم</td></tr>
<tr><td>14–18 سنة</td><td>150 ميكروغرام/يوم</td><td>900 ميكروغرام/يوم</td></tr>
<tr><td>حوامل</td><td>220 ميكروغرام/يوم</td><td>1,100 ميكروغرام/يوم</td></tr>
</tbody>
</table>

<hr>

<h2>دليل الاستخدام الصحيح لملح اليود — قواعد الحفظ والاستخدام</h2>
<p>اليود في الملح المعالج غاز متطاير يتحلّل بالحرارة والضوء والرطوبة. للحفاظ على محتواه:</p>
<ul>
<li><strong>اشترِ الملح في عبوة مُغلقة:</strong> مكتوب عليها صراحةً "ملح مُعالج باليود" أو "Iodized Salt" — الملح المباع بالجملة أو المكشوف لا يُضمن محتواه من اليود.</li>
<li><strong>احفظه بعيداً عن الحرارة والبخار:</strong> جرّة خزف أو زجاج مُعتِم في خزانة بعيدة عن الموقد أفضل بكثير من وعاء مكشوف بجانب الغاز.</li>
<li><strong>أضفه بعد الطهي أو قُرب نهايته:</strong> الإضافة في بداية الطهي مع الحرارة الشديدة تُفقده كمية من يوده.</li>
<li><strong>لا تفرط في كميات الملح:</strong> هدفنا تأمين اليود، لا رفع الصوديوم — الحد الموصى به للطفل من الملح (لا الصوديوم) يتراوح بين ½ إلى 1 ملعقة صغيرة يومياً بحسب العمر.</li>
</ul>

<h3>النقص والإفراط — كلاهما ضارّ</h3>
<p>اليود من العناصر التي النقص والزيادة كلاهما ضار:</p>
<ul>
<li><strong>النقص:</strong> ضعف التمييل وبناء الدماغ كما شرحنا.</li>
<li><strong>الزيادة المزمنة (أكثر من 500–1,000 ميكروغرام يومياً):</strong> قد تُثير قصوراً درقياً مناعياً (Hashimoto's) أو فرطاً في نشاط الغدة لدى الأشخاص الحساسين.</li>
</ul>
<p>لهذا السبب، مكمّلات اليود لا تُعطى إلا للحوامل وعند الضرورة الطبية الموثَّقة، وتحديد الجرعة يكون بناءً على قياس اليود البولي أو تقييم طبيب متخصص.</p>

<h2>وجبة "السردين مع الأرز والحليب" — اليود من ثلاثة مصادر</h2>
<p>حصة سردين معلّب (35 ميكروغرام يود) + كوب حليب (88 ميكروغرام) + طهي بملح مُعالج باليود (~20–30 ميكروغرام) = 143–153 ميكروغرام يود في وجبة واحدة — تُغطي الاحتياج اليومي الكامل لطفل في سن المدرسة مع فوائد مُضافة من الكالسيوم، فيتامين د، وأحماض أوميجا 3 في نفس الوقت.</p>
</div>`,
        content_en: `<div dir="ltr">
<p>Iodine is not just a mineral that prevents goiter — it is the primary fuel for building the human brain. More than three decades of research confirm that its deficiency causes quantifiable cognitive loss that cannot be fully regained even after treatment. In this sense, simply using iodized salt is one of the simplest and cheapest investments a family can make to protect their child's cognitive future.</p>

<h2>Iodine and the Thyroid Gland — The Complete Vital Sequence</h2>
<h3>How does the thyroid gland produce its hormones?</h3>
<p>The thyroid gland is like a specialized factory producing two main hormones: T4 (thyroxine) and T3 (triiodothyronine) — both containing iodine in their molecular structure as an irreplaceable part. The thyroid gland imports iodine from the blood, oxidizes it, and incorporates it with the amino acid tyrosine to synthesize the two hormones. Without iodine, these hormones cannot be synthesized — by any other means. The equation is not bypassable.</p>

<h3>Thyroid Hormones and the Brain — The Unique Role</h3>
<p>Many do not realize that thyroid hormones are the foundation of brain building during the fetal stage and the first two years of life — they are not just metabolic regulators. At the neurological level, these hormones control:</p>
<ul>
<li><strong>Neurogenesis:</strong> Determining the number of manufactured neurons.</li>
<li><strong>Neuronal Migration:</strong> Guiding cells to the correct locations in the cerebral cortex.</li>
<li><strong>Axonal/Dendritic Arborization:</strong> Growth of neural branches that create connections.</li>
<li><strong>Myelination:</strong> Coating nerve fibers with myelin to speed up signals.</li>
<li><strong>Synaptogenesis:</strong> Building communication points between neurons.</li>
</ul>
<p>All these processes occur in unique time windows — meaning exposure to deficiency in these stages causes structural damage to the brain that cannot be compensated for later, even if iodine levels improve afterward.</p>

<hr>

<h2>The Real Numbers of IQ Loss — What Quantitative Studies Show</h2>
<p>The cognitive impact of iodine deficiency is not just a theoretical description — it is measured by documented IQ scales:</p>
<ul>
<li><strong>Loss in severe deficiency areas:</strong> The average IQ drops by 10-15 points across the entire community in severely deficient areas — reaching what a comprehensive systematic review described as "the largest preventable collective cognitive loss in human history."</li>
<li><strong>Moderate intensity deficiency:</strong> In a study applying the Wechsler Intelligence Scale for Children (WISC-III), moderately iodine-deficient children scored 15.13 points lower in total IQ compared to their sufficient peers, with significant weakness in 6 out of 13 subtests — including verbal memory, comprehension, visuospatial reasoning, and logical sequencing.</li>
<li><strong>Meta-analysis of 18 studies:</strong> Iodine-deficient children score an average of 6.9 to 10.2 IQ points lower than their iodine-sufficient peers.</li>
<li><strong>Post-supplementation:</strong> Iodine supplementation improves IQ in healthy children by an average of 4.5 points — an indication that even undiagnosed mild deficiency inflicts improvable loss.</li>
</ul>

<h3>The Critical Time Window — Fetal Stage to Second Year</h3>
<p>Prenatal deficiency (in the pregnant mother) is the most dangerous of all. An estimated 19 million children born annually are at risk of brain damage due to their mothers' iodine deficiency. The tragic side is that damage can occur before anyone knows about the pregnancy — in the critical early weeks when basic neural structures are being formed.</p>

<hr>

<h2>The Situation in Egypt — Between Iodization Programs and Realistic Challenges</h2>
<p>Although Egypt adopted salt iodization programs since the 1990s, field studies reveal a large gap between policy and reality. A study in Kafr El-Sheikh governorate found that the incidence of goiter (the classic clinical indicator of iodine deficiency) reached 27.1% among primary school children, with urinary iodine levels far below the recommended limit. Nationally, a comprehensive survey found that 91.9% of school-age children had abnormal urinary iodine levels, and 25% of them suffered from clinical goiter — at a time when iodized salt is supposed to cover the requirement. In Cairo specifically, the goiter rate in primary schools reached 13.5%, which researchers classify as a public health problem requiring programmatic intervention.</p>

<h3>Why does deficiency persist despite iodization programs?</h3>
<ul>
<li><strong>Irregular Distribution:</strong> Not all salt sold in the market is iodized — especially bulk, unpackaged salt used in collective cooking.</li>
<li><strong>Iodine Loss by Heat:</strong> Iodine in treated salt partially decomposes at high heat, especially when salt is added at the beginning of cooking.</li>
<li><strong>Goitrogen Consumption:</strong> Natural substances in some foods (cabbage, cauliflower, soy) inhibit iodine absorption in the thyroid gland when consumed excessively.</li>
</ul>

<hr>

<h2>Stages of Iodine Deficiency and Symptoms in Children</h2>
<table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse:collapse;">
<thead><tr><th>Deficiency Degree</th><th>Urinary Iodine (mcg/L)</th><th>Documented Effects</th></tr></thead>
<tbody>
<tr><td>Sufficient</td><td>≥ 100</td><td>Normal growth + normal thyroid function</td></tr>
<tr><td>Mild Deficiency</td><td>50–99</td><td>Slight reduction in thyroid hormones — no obvious symptoms but measurable cognitive weakness</td></tr>
<tr><td>Moderate Deficiency</td><td>20–49</td><td>Goiter — marked decline in school performance and intelligence</td></tr>
<tr><td>Severe Deficiency</td><td>< 20</td><td>Hypothyroidism, intellectual disability, rickets, nerve deafness; in the most severe cases: irreversible cretinism</td></tr>
</tbody>
</table>

<hr>

<h2>Dietary Sources — What is Available in the Egyptian Kitchen</h2>
<h3>Source Comparison Table</h3>
<table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse:collapse;">
<thead><tr><th>Source</th><th>Iodine per Serving</th><th>Serving Size</th><th>Note</th></tr></thead>
<tbody>
<tr><td>Iodized Salt</td><td>~45 mcg</td><td>Teaspoon (5g)</td><td>Easiest, most available, and cheapest — the strategic source</td></tr>
<tr><td>Canned Tuna</td><td>17 mcg</td><td>100g</td><td>Iodine varies by fish source</td></tr>
<tr><td>Sardines</td><td>35 mcg</td><td>100g</td><td>+ Calcium + Vitamin D</td></tr>
<tr><td>Whole Milk</td><td>88 mcg</td><td>Cup (240ml)</td><td>Varies by livestock feed and processing method</td></tr>
<tr><td>Yogurt</td><td>75 mcg</td><td>Cup</td><td>Regular source in daily meals</td></tr>
<tr><td>Eggs</td><td>26 mcg</td><td>One egg</td><td>Mostly in the yolk</td></tr>
<tr><td>White Cheese</td><td>15–30 mcg</td><td>50g</td><td>Varies by manufacturing method</td></tr>
<tr><td>Bread with Fortified Flour</td><td>45 mcg</td><td>Two pieces</td><td>If the flour or salt used is fortified</td></tr>
</tbody>
</table>

<hr>

<h2>Daily Requirements and Safe Upper Limits</h2>
<table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse:collapse;">
<thead><tr><th>Age Group</th><th>Daily Requirement (RDA)</th><th>Safe Upper Limit (UL)</th></tr></thead>
<tbody>
<tr><td>1–3 years</td><td>90 mcg/day</td><td>200 mcg/day</td></tr>
<tr><td>4–8 years</td><td>90 mcg/day</td><td>300 mcg/day</td></tr>
<tr><td>9–13 years</td><td>120 mcg/day</td><td>600 mcg/day</td></tr>
<tr><td>14–18 years</td><td>150 mcg/day</td><td>900 mcg/day</td></tr>
<tr><td>Pregnant Women</td><td>220 mcg/day</td><td>1,100 mcg/day</td></tr>
</tbody>
</table>

<hr>

<h2>Guide to Correct Use of Iodized Salt — Storage and Usage Rules</h2>
<p>Iodine in treated salt is a volatile gas that decomposes with heat, light, and humidity. To maintain its content:</p>
<ul>
<li><strong>Buy salt in a sealed package:</strong> clearly stating "Iodized Salt" — bulk or exposed salt content is not guaranteed.</li>
<li><strong>Keep it away from heat and steam:</strong> a ceramic jar or opaque glass in a cupboard away from the stove is much better than an open container next to the gas.</li>
<li><strong>Add it after cooking or near the end:</strong> adding it at the beginning with high heat loses part of its iodine.</li>
<li><strong>Do not over-salt:</strong> our goal is to secure iodine, not raise sodium — the recommended limit for a child's salt intake (not sodium) ranges from ½ to 1 teaspoon daily depending on age.</li>
</ul>

<h3>Deficiency and Excess — Both are Harmful</h3>
<p>Iodine is an element where both deficiency and excess are harmful:</p>
<ul>
<li><strong>Deficiency:</strong> Weak myelination and brain building as explained.</li>
<li><strong>Chronic Excess (more than 500-1,000 mcg per day):</strong> May trigger autoimmune hypothyroidism (Hashimoto's) or hyperthyroidism in sensitive individuals.</li>
</ul>
<p>For this reason, iodine supplements are given only to pregnant women and when medically documented, and dose determination is based on urinary iodine measurement or expert assessment.</p>

<h2>The "Sardines with Rice and Milk" Meal — Iodine from Three Sources</h2>
<p>A serving of canned sardines (35 mcg) + a cup of milk (88 mcg) + cooking with iodized salt (~20-30 mcg) = 143-153 mcg of iodine in one meal — covering the full daily requirement of a school-age child with added benefits of Calcium, Vitamin D, and Omega-3 fatty acids at the same time.</p>
</div>`,
        sources_ar: [
            'دراسات منظمة الصحة العالمية واليونسيف حول نقص اليود وتطور الدماغ',
            'دراسات ميدانية مصرية حول تضخم الغدة الدرقية في محافظات كفر الشيخ والقاهرة (المجلة المصرية لطب الأطفال)',
            'مراجعات Cochrane حول تأثير تكميل اليود على الوظيفة الإدراكية للأطفال',
            'بروتوكولات وزارة الصحة المصرية حول إيودة الملح (1996–2024)',
        ],
        sources_en: [
            'WHO and UNICEF studies on Iodine deficiency and brain development',
            'Egyptian field studies on goiter in Kafr El-Sheikh and Cairo (Egyptian Journal of Pediatrics)',
            'Cochrane reviews on the effect of iodine supplementation on children\'s cognitive function',
            'Egyptian Ministry of Health protocols on salt iodization (1996–2024)',
        ],
        tags_ar: ['اليود', 'الغدة الدرقية', 'ذكاء الطفل', 'الملح المعالج', 'النمو العقلي', 'المغذيات الدقيقة', 'مصر', 'تضخم الغدة الدرقية', 'خسارة إدراكية', 'نوافذ التطور'],
        tags_en: ['Iodine', 'Thyroid', 'Child Intelligence', 'Iodized Salt', 'Mental Development', 'Micronutrients', 'Egypt', 'Goiter', 'Cognitive Loss', 'Developmental Windows'],
        meta: {
            meta_title_ar: 'اليود — العنصر الذي يحمي ذكاء طفلك',
            meta_title_en: 'Iodine — The Element That Protects Your Child\'s Intelligence',
            meta_description_ar: 'تعمق في الكيمياء العصبية لليود. لماذا يُفقد 15 نقطة ذكاء عند النقص؟ وكيف تحافظ على يود الملح في مطبخك المصري؟',
            meta_description_en: 'Dive into the neurochemistry of iodine. Why are 15 IQ points lost in deficiency? And how to preserve salt iodine in your Egyptian kitchen?',
            reading_time_minutes: 9,
            og_title_ar: 'اليود — العنصر الذي يحمي ذكاء طفلك',
            og_title_en: 'Iodine — Protects Your Child\'s Intelligence',
            og_description_ar: 'اليود هو الوقود الأول لبناء الدماغ وليس مجرد مادة للغدة الدرقية. هل يحصل طفلك على كفايته؟',
            og_description_en: 'Iodine is the primary fuel for brain building, not just thyroid material. Is your child getting enough?',
        },
        imageUrl: '/images/articles/pregnancy-plate.png',
        category: 'micronutrients',
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
            'الطفل الذي يأكل كميات وفيرة بلا تنوع قد يعاني من "الجوع الخفي"',
            'تحقيق 5 مجموعات من 10 يومياً هو العتبة العلمية للكفاية الغذائية',
            'التنوع الغذائي مرتبط إحصائياً بتحسن نتائج الاختبارات الإدراكية للأطفال',
        ],
        quick_summary_en: [
            'A child consuming high quantities without diversity may suffer from "Hidden Hunger"',
            'Consuming 5 out of 10 groups daily is the scientific threshold for nutrient adequacy',
            'Dietary diversity is statistically linked to improved cognitive test scores in children',
        ],
        content_ar: `<div dir="rtl">
<p>التنوع الغذائي يُجيب على سؤال جوهرى كثيراً ما يُغفله الأهل: ليس "هل أكل طفلي كثيراً أم قليلاً؟" — بل "هل أكل طفلي من مصادر كافية لتغطية احتياجاته من المغذيات الدقيقة؟". الطفل الذي يأكل كميات وفيرة من الأرز والخبز فقط قد يُعاني من نقص ثلاثة أو أربعة معادن وفيتامينات أساسية في نفس الوقت.</p>

<h2>الأساس العلمي لمقياس التنوع الغذائي (DDS)</h2>
<h3>لماذا التنوع يُنبّئ بالكفاية الغذائية؟</h3>
<p>لا يوجد غذاء واحد يحتوي على كل العناصر الغذائية الضرورية للإنسان — فكل مجموعة غذائية تُقدّم مجموعة متمايزة من المغذيات الدقيقة التي لا تتكرر بنفس الصيغة في غيرها. الأغذية الحيوانية تُقدّم الحديد الهيمي والزنك عالي الامتصاص وفيتامين B12. البقوليات تُقدّم الحديد غير الهيمي والمغنيسيوم والألياف. الخضروات الورقية تُقدّم حمض الفوليك وفيتامين K. الألبان تُقدّم الكالسيوم والفوسفور. وهكذا.</p>

<p>دراسات التحقق الإحصائي أثبتت أن DDS مرتبط ارتباطاً دالاً بـMean Adequacy Ratio (MAR) — وهو المقياس الذهبي لكفاية المغذيات الدقيقة الذي يعتمد على تحليل 24 ساعة من الاستهلاك الغذائي مقارنةً بالاحتياجات الموصى بها. بمعنى آخر: عدّ مجموعات الطعام يُعطي تقديراً موثوقاً للكفاية الغذائية الفعلية دون الحاجة لتحليل كيميائي معقد.</p>

<h3>الدليل الإحصائي: كيف يُنبّئ DDS بالكفاية؟</h3>
<p>تحليل شامل لبيانات أكثر من 12 دولة وجد ارتباطاً قوياً بين DDS وكفاية المغذيات الدقيقة — والأطفال الذين يصلون إلى 5 مجموعات أو أكثر يومياً يُحقّقون كفاية أعلى بشكل دال إحصائياً في الكالسيوم والحديد وفيتامين أ والزنك وحمض الفوليك وفيتامين C مقارنةً بأقرانهم ذوي التنوع المنخفض.</p>

<hr>

<h2>المجموعات الغذائية العشر — ما يُقدّمه كل منها</h2>
<table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse:collapse;">
<thead><tr><th>المجموعة</th><th>المغذيات الأساسية التي تُقدّمها</th><th>المصادر المصرية المتاحة</th></tr></thead>
<tbody>
<tr><td>حبوب ونشويات</td><td>كربوهيدرات، ب-كومبلكس، ألياف</td><td>خبز بلدي، أرز، مكرونة، ذرة</td></tr>
<tr><td>بقوليات</td><td>بروتين نباتي، حديد، مغنيسيوم، ألياف</td><td>فول، عدس، حمص، لوبيا</td></tr>
<tr><td>مكسرات وبذور</td><td>دهون صحية، زنك، فيتامين E، مغنيسيوم</td><td>لب أبيض، لوز، فول سوداني، سمسم</td></tr>
<tr><td>ألبان ومشتقاتها</td><td>كالسيوم، فوسفور، ب12، بروتين</td><td>لبن، زبادي، جبن أبيض، قريش</td></tr>
<tr><td>لحوم ودواجن وأسماك</td><td>حديد هيمي، زنك، ب12، بروتين كامل</td><td>دجاج، لحمة، سمك، كبدة</td></tr>
<tr><td>بيض</td><td>بروتين كامل، ب12، كولين، فيتامين د</td><td>بيض بلدي أو تجاري</td></tr>
<tr><td>خضروات ورقية داكنة</td><td>فولات، فيتامين ك، بيتا كاروتين، حديد</td><td>ملوخية، سبانخ، جرجير، بقدونس</td></tr>
<tr><td>فاكهة/خضراوات فيتامين أ</td><td>بيتا كاروتين، فيتامين C</td><td>جزر، بطاطا حلوة، مانجو، مشمش</td></tr>
<tr><td>خضروات أخرى</td><td>فيتامين C، بوتاسيوم، مُضادات أكسدة</td><td>طماطم، خيار، كوسة، بصل، فلفل</td></tr>
<tr><td>فاكهة أخرى</td><td>فيتامين C، سكريات طبيعية، ألياف</td><td>موز، تفاح، برتقال، جوافة، رمان</td></tr>
</tbody>
</table>

<hr>

<h2>التنوع الغذائي والأداء الإدراكي — الرابط الموثَّق</h2>
<h3>ما تُظهره الدراسات المباشرة</h3>
<p>دراسة أُجريت على عينة كبيرة (2,724 طفل ريفي) في الصين لتقييم العلاقة بين DDS والأداء الإدراكي أظهرت ارتباطاً إيجابياً دالاً بين التنوع الغذائي ونتائج الاختبارات الإدراكية لدى أطفال ما قبل المدرسة — مع كل زيادة في درجة DDS يتحسّن الأداء المعرفي بشكل مستقل عن عوامل مُربِكة أخرى. وفي دراسة طولية نُشرت عام 2024، كشفت بيانات أطفال في مرحلة الطفولة المبكرة أن درجة DDS الأعلى ارتبطت بنتائج معرفية أفضل (p < 0.01) وبانخفاض معدلات المرض بشكل دال.</p>

<h3>لماذا يرتبط التنوع بالذكاء؟</h3>
<p>الرابط ليس عشوائياً — له تفسير بيولوجي واضح. الدماغ النامي يحتاج باقة متكاملة من المغذيات في آنٍ واحد لا يمكن لأيٍّ منها أن يعمل بفاعلية بمعزل عن الآخرين:</p>
<p style="text-align:center; font-weight:bold;">الحديد (نضج المايلين) + اليود (هرمونات الغدة الدرقية) + الزنك (تكاثر الخلايا العصبية) + أوميجا 3 (بناء أغشية الخلايا العصبية) + فيتامين ب12 (تصنيع المايلين والحمض النووي)</p>
<p>نقص واحد من هذا الفريق كافٍ لتعطيل العملية الكاملة — مثل آلة ذات ترس واحد مكسور.</p>

<hr>

<h2>فهم مقياس DDS — الأداة وتطورها</h2>
<h3>مقياس المراحل العمرية المختلفة</h3>
<p>تطوّر مقياس التنوع الغذائي ليُلائم الفئات المختلفة:</p>
<ul>
<li><strong>MDD-C (Minimum Dietary Diversity for Children):</strong> 6–23 شهراً — الحد الأدنى المقبول: ≥ 5 مجموعات من 8 (WHO/UNICEF 2021)</li>
<li><strong>HDDS (Household Dietary Diversity Score):</strong> تقييم الأسرة ككل — الحد الأدنى المقبول: ≥ 6 مجموعات من 12</li>
<li><strong>MDD-W (Minimum Dietary Diversity for Women):</strong> نساء 15–49 سنة — الحد الأدنى المقبول: ≥ 5 مجموعات من 10</li>
<li><strong>MDD-A (Minimum Dietary Diversity for Adolescents):</strong> 10–19 سنة — الحد الأدنى المقبول: ≥ 5 مجموعات من 10</li>
</ul>
<p>ملاحظة عملية: الحد الأدنى "5 مجموعات" ليس هدفاً نهائياً — بل هو العتبة التي تُميّز بين النظام الغذائي الكافي وغير الكافي من منظور المغذيات الدقيقة. الهدف الأمثل هو تغطية 7–8 مجموعات يومياً.</p>

<hr>

<h2>الفخاخ الشائعة في تقييم التنوع</h2>
<ul>
<li><strong>فخ الوجبات المتشابهة:</strong> كثيراً ما تبدو القائمة متنوعة لكنها في الحقيقة تتكرر من نفس المجموعات. إفطار بخبز وجبن وبيض = 3 مجموعات، غداء بأرز ودجاج = مجموعتان، عشاء بمكرونة ولبن = مجموعتان. المجموع 5 مجموعات فقط من 10، ولا توجد خضروات ورقية ولا فاكهة غنية بفيتامين أ في اليوم كله.</li>
<li><strong>فخ الكمية بلا تنوع:</strong> طفل يأكل كيلوغراماً من الأرز والخبز يحصل على سعرات وفيرة وكربوهيدرات كافية — لكنه يفتقر للحديد والزنك وفيتامين أ وفيتامين C وفيتامين ب12 كلياً. هذا ما يُسمّيه العلماء "الجوع الخفي" (Hidden Hunger).</li>
<li><strong>فخ الأطعمة "الصحية" المتشابهة:</strong> تقديم 5 أنواع مختلفة من الخضروات لا يُعطي 5 درجات في DDS — بل يُعطي درجة واحدة أو اثنتين حسب نوعها. التنوع المُحسوب هو تنوع المجموعات لا تنوع الأنواع.</li>
</ul>

<hr>

<h2>التقييم اليومي العملي — أداة مبسّطة للأهل</h2>
<p>يمكن تقييم تنوع طعام طفلك بأداة بسيطة في 30 ثانية — ضع علامة (✓) أمام كل مجموعة تناولها خلال اليوم:</p>
<pre style="background:rgba(255,255,255,0.05); padding:20px; border-radius:12px; border:1px solid rgba(255,255,255,0.1); line-height:1.6; font-family:monospace;">
□ حبوب ونشويات     (خبز، أرز، مكرونة)
□ بقوليات           (فول، عدس، حمص)
□ مكسرات وبذور     (لب، لوز، سمسم)
□ ألبان             (لبن، زبادي، جبن)
□ لحوم/دواجن/أسماك  (أي نوع)
□ بيض
□ خضروات ورقية     (ملوخية، سبانخ)
□ فاكهة/خضار فيت.أ (جزر، مانجو، بطاطا حلوة)
□ خضروات أخرى      (طماطم، خيار، كوسة)
□ فاكهة أخرى       (موز، تفاح، برتقال)
</pre>
<p><strong>النتيجة:</strong> ✓✓✓✓✓ = الحد الأدنى المقبول (5/10) | ✓✓✓✓✓✓✓ = جيد (7/10) | ✓✓✓✓✓✓✓✓✓+ = ممتاز (9–10/10)</p>

<hr>

<h2>مثال يوم متنوع بميزانية محدودة في السياق المصري</h2>
<table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse:collapse;">
<thead><tr><th>الوجبة</th><th>المحتوى</th><th>المجموعات المُغطاة</th></tr></thead>
<tbody>
<tr><td>إفطار</td><td>فول بزيت وليمون + خبز بلدي + طماطم مفرومة + بيضة مسلوقة</td><td>بقوليات + نشويات + خضروات أخرى + بيض (4)</td></tr>
<tr><td>وجبة خفيفة صباحية</td><td>زبادي + موز</td><td>ألبان + فاكهة أخرى (2)</td></tr>
<tr><td>غداء</td><td>أرز + فراخ مشوية + ملوخية + سلطة جزر</td><td>نشويات + لحوم + ورقية داكنة + فيت. أ (4)</td></tr>
<tr><td>وجبة خفيفة مسائية</td><td>لب أبيض</td><td>مكسرات وبذور (1)</td></tr>
<tr><td>عشاء</td><td>جبن أبيض + خيار + خبز</td><td>ألبان + خضروات أخرى + نشويات (2)</td></tr>
<tr style="background:rgba(76,175,80,0.1);"><td><strong>المجموع</strong></td><td><strong>8 مجموعات مختلفة من 10</strong></td><td><strong>✓ تنوع ممتاز</strong></td></tr>
</tbody>
</table>
<p>التكلفة التقريبية في مصر 2026: يمكن تحقيق هذا التنوع بـ15–25 جنيهاً للوجبة للطفل الواحد — يُثبت أن التنوع الغذائي ليس ترفاً بل خياراً متاحاً مع التخطيط الصحيح.</p>

<hr>

<h2>عندما لا يتحقق الحد الأدنى — خطوات عملية</h2>
<ol>
<li>أضف مجموعة اللحوم/الأسماك إن كانت غائبة — هي الأعلى تأثيراً في سد نقص الحديد والزنك وب12.</li>
<li>أضف الخضروات الورقية الداكنة (ملوخية أو سبانخ مرة يومياً) — لتأمين الفولات وبيتا كاروتين.</li>
<li>أضف فاكهة غنية بفيتامين أ كالجزر أو المانجو أو البطاطا الحلوة.</li>
<li>لا تُهمل البقوليات — فول أو عدس وجبة يومية يُقلّل الفجوة الغذائية بتكلفة منخفضة.</li>
<li>راجع الطبيب إذا استمر النقص — قد يوصي بمكمّل غذائي متعدد المغذيات لسد الفجوات.</li>
</ol>
</div>`,
        content_en: `<div dir="ltr">
<p>Dietary diversity answers a fundamental question that parents often overlook: It's not about "How much did my child eat?" but rather "Did my child eat from enough sources to cover their micronutrient needs?". A child consuming large quantities of only rice and bread may suffer from three or four essential mineral and vitamin deficiencies simultaneously.</p>

<h2>The Scientific Basis of the Dietary Diversity Score (DDS)</h2>
<h3>Why Does Diversity Predict Nutritional Adequacy?</h3>
<p>No single food contains all the nutrients necessary for a human being — each food group provides a distinct set of micronutrients that are not repeated in the same form in others. Animal-sourced foods provide heme iron, highly absorbable zinc, and Vitamin B12. Legumes provide non-heme iron, magnesium, and fiber. Leafy greens provide folic acid and Vitamin K. Dairy provides calcium and phosphorus, and so on.</p>

<p>Statistical validation studies have proven that DDS is significantly correlated with the Mean Adequacy Ratio (MAR) — the gold standard for micronutrient adequacy based on 24-hour dietary intake analysis compared to recommended requirements. In other words, counting food groups gives a reliable estimate of actual nutritional adequacy without the need for complex chemical analysis.</p>

<h3>Statistical Evidence: How Does DDS Predict Adequacy?</h3>
<p>A comprehensive analysis of data from more than 12 countries found a strong correlation between DDS and micronutrient adequacy. Children who reach 5 or more groups daily achieve significantly higher statistical adequacy in calcium, iron, Vitamin A, zinc, folic acid, and Vitamin C compared to their low-diversity peers.</p>

<hr>

<h2>The Ten Food Groups — What Each Provides</h2>
<table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse:collapse;">
<thead><tr><th>Group</th><th>Key Nutrients Provided</th><th>Available Egyptian Sources</th></tr></thead>
<tbody>
<tr><td>Grains and Starches</td><td>Carbohydrates, B-complex, Fiber</td><td>Baladi bread, Rice, Pasta, Corn</td></tr>
<tr><td>Legumes</td><td>Plant protein, Iron, Magnesium, Fiber</td><td>Fava beans, Lentils, Chickpeas, Black-eyed peas</td></tr>
<tr><td>Nuts and Seeds</td><td>Healthy fats, Zinc, Vitamin E, Magnesium</td><td>White seeds (Lib), Almonds, Peanuts, Sesame</td></tr>
<tr><td>Dairy and Derivatives</td><td>Calcium, Phosphorus, B12, Protein</td><td>Milk, Yogurt, White cheese, Qareesh</td></tr>
<tr><td>Meat, Poultry, and Fish</td><td>Heme iron, Zinc, B12, Complete protein</td><td>Chicken, Meat, Fish, Liver</td></tr>
<tr><td>Eggs</td><td>Complete protein, B12, Choline, Vitamin D</td><td>Local or commercial eggs</td></tr>
<tr><td>Dark Green Leafy Veg</td><td>Folate, Vitamin K, Beta-carotene, Iron</td><td>Molokhia, Spinach, Arugula, Parsley</td></tr>
<tr><td>Vit-A Fruits/Veg</td><td>Beta-carotene, Vitamin C</td><td>Carrots, Sweet potato, Mango, Apricot</td></tr>
<tr><td>Other Vegetables</td><td>Vitamin C, Potassium, Antioxidants</td><td>Tomato, Cucumber, Zucchini, Onion, Pepper</td></tr>
<tr><td>Other Fruits</td><td>Vitamin C, Natural sugars, Fiber</td><td>Banana, Apple, Orange, Guava, Pomegranate</td></tr>
</tbody>
</table>

<hr>

<h2>Dietary Diversity and Cognitive Performance — The Documented Link</h2>
<h3>What Direct Studies Show</h3>
<p>A study conducted on a large sample (2,724 rural children) in China to evaluate the relationship between DDS and cognitive performance showed a significant positive correlation between dietary diversity and cognitive test results in preschool children — with every increase in DDS score, cognitive performance improved independently of other confounding factors. In a longitudinal study published in 2024, data from early childhood revealed that a higher DDS score was associated with better cognitive outcomes (p < 0.01) and significantly lower rates of illness.</p>

<h3>Why is Diversity Linked to Intelligence?</h3>
<p>The link is not random — it has a clear biological explanation. The developing brain requires a complete suite of nutrients simultaneously, none of which can function effectively in isolation from others:</p>
<p style="text-align:center; font-weight:bold;">Iron (Myelin maturation) + Iodine (Thyroid hormones) + Zinc (Neuron proliferation) + Omega-3 (Neural membrane building) + Vit B12 (Myelin and DNA synthesis)</p>
<p>A deficiency in even one member of this team is enough to disrupt the entire process — like a machine with a single broken gear.</p>

<hr>

<h2>Understanding the DDS Scale — Its Tool and Evolution</h2>
<h3>Scales for Different Age Stages</h3>
<p>The Dietary Diversity Score has evolved to suit different categories:</p>
<ul>
<li><strong>MDD-C (Minimum Dietary Diversity for Children):</strong> 6–23 months — Minimum acceptable: ≥ 5 out of 8 groups (WHO/UNICEF 2021)</li>
<li><strong>HDDS (Household Dietary Diversity Score):</strong> Household assessment — Minimum acceptable: ≥ 6 out of 12 groups</li>
<li><strong>MDD-W (Minimum Dietary Diversity for Women):</strong> Women 15–49 years — Minimum acceptable: ≥ 5 out of 10 groups</li>
<li><strong>MDD-A (Minimum Dietary Diversity for Adolescents):</strong> 10–19 years — Minimum acceptable: ≥ 5 out of 10 groups</li>
</ul>
<p>Practical Note: The "5 groups" minimum is not a final goal — it is the threshold that distinguishes between an adequate and inadequate diet from a micronutrient perspective. The optimal goal is to cover 7–8 groups daily.</p>

<hr>

<h2>Common Traps in Diversity Assessment</h2>
<ul>
<li><strong>The Similar Meals Trap:</strong> Often the menu looks diverse but actually repeats from the same groups. Breakfast with bread, cheese, and eggs (3 groups), Lunch with rice and chicken (2), Dinner with pasta and milk (2) = only 5 total groups, with a total absence of leafy greens and Vitamin A-rich fruits.</li>
<li><strong>The Quantity Without Diversity Trap:</strong> A child eating a kilogram of rice and bread gets plenty of calories and carbs but entirely lacks iron, zinc, Vitamin A, Vitamin C, and B12. This is what scientists call "Hidden Hunger."</li>
<li><strong>The Similar "Healthy" Foods Trap:</strong> Serving 5 different types of vegetables does not give 5 DDS points — diversity is measured by groups, not by individual types.</li>
</ul>

<hr>

<h2>Practical Daily Assessment — A Simplified Tool for Parents</h2>
<p>You can assess your child's dietary diversity with a simple 30-second tool — check (✓) each group consumed during the day:</p>
<pre style="background:rgba(255,255,255,0.05); padding:20px; border-radius:12px; border:1px solid rgba(255,255,255,0.1); line-height:1.6; font-family:monospace;">
□ Grains/Starches      (Bread, Rice, Pasta)
□ Legumes              (Beans, Lentils, Chickpeas)
□ Nuts and Seeds       (Seeds, Almonds, Sesame)
□ Dairy                (Milk, Yogurt, Cheese)
□ Meat/Poultry/Fish    (Any type)
□ Eggs
□ Leafy Greens         (Molokhia, Spinach)
□ Vit-A Fruits/Veg     (Carrots, Mango, Sweet Potato)
□ Other Vegetables     (Tomato, Cucumber, Zucchini)
□ Other Fruits         (Banana, Apple, Orange)
</pre>
<p><strong>Result:</strong> ✓✓✓✓✓ = Minimum Acceptable | ✓✓✓✓✓✓✓ = Good | ✓✓✓✓✓✓✓✓✓+ = Excellent</p>

<hr>

<h2>A Diverse Day Example on a Limited Budget (Egypt Context)</h2>
<table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse:collapse;">
<thead><tr><th>Meal</th><th>Content</th><th>Groups Covered</th></tr></thead>
<tbody>
<tr><td>Breakfast</td><td>Fava beans with oil/lemon + Baladi bread + Minced tomato + Boiled egg</td><td>Legumes + Starches + Other Veg + Eggs (4)</td></tr>
<tr><td>Morning Snack</td><td>Yogurt + Banana</td><td>Dairy + Other Fruit (2)</td></tr>
<tr><td>Lunch</td><td>Rice + Grilled chicken + Molokhia + Carrot salad</td><td>Starches + Meat + Leafy Greens + Vit A (4)</td></tr>
<tr><td>Evening Snack</td><td>White seeds (Lib)</td><td>Nuts and Seeds (1)</td></tr>
<tr><td>Dinner</td><td>White cheese + Cucumber + Bread</td><td>Dairy + Other Veg + Starches (2)</td></tr>
<tr style="background:rgba(76,175,80,0.1);"><td><strong>Total</strong></td><td><strong>8 different groups out of 10</strong></td><td><strong>✓ Excellent Diversity</strong></td></tr>
</tbody>
</table>
<p>Approximate cost in Egypt 2026: This diversity can be achieved for 15–25 EGP per meal per child — proving that dietary diversity is not a luxury but an available option with proper planning.</p>

<hr>

<h2>When the Minimum is Not Met — Practical Steps</h2>
<ol>
<li>Add meat/fish if absent — it has the highest impact on closing iron, zinc, and B12 gaps.</li>
<li>Add dark green leafy vegetables (molokhia or spinach once daily) — to secure folate and beta-carotene.</li>
<li>Add Vitamin A-rich fruit like carrots, mango, or sweet potato.</li>
<li>Do not neglect legumes — a daily meal of beans or lentils reduces the nutritional gap at a low cost.</li>
<li>Consult a doctor if deficiency persists — a multi-nutrient supplement may be recommended to bridge the gaps.</li>
</ol>
</div>`,

        sources_ar: [
            'Hanley-Cook, G. T., et al. (2024). Minimum dietary diversity for adolescents. American Journal of Clinical Nutrition.',
            'WHO/UNICEF. (2021). Indicators for assessing infant and young child feeding practices.',
            'FAO. (2011). Guidelines for measuring household and individual dietary diversity.',
            'Arimond, M., & Ruel, M. T. (2004). Dietary diversity is associated with child nutritional status.',
            'Li, M., et al. (2023). Dietary diversity and cognitive performance in preschool children.',
        ],
        sources_en: [
            'Hanley-Cook, G. T., et al. (2024). Minimum dietary diversity for adolescents. American Journal of Clinical Nutrition.',
            'WHO/UNICEF. (2021). Indicators for assessing infant and young child feeding practices.',
            'FAO. (2011). Guidelines for measuring household and individual dietary diversity.',
            'Arimond, M., & Ruel, M. T. (2004). Dietary diversity is associated with child nutritional status.',
            'Li, M., et al. (2023). Dietary diversity and cognitive performance in preschool children.',
        ],
        tags_ar: [
            'الرضاعة الطبيعية',
            'التغذية التكميلية',
            'الـ 1000 يوم الأولى',
            'نمو الطفل',
            'احتياجات المراهقة',
        ],
        tags_en: [
            'Breastfeeding',
            'Complementary Feeding',
            'The First 1,000 Days',
            'Child Growth',
            'Adolescent Needs',
        ],
        meta: {
            meta_title_ar: 'التنوع الغذائي — الدليل العلمي للكفاية والذكاء',
            meta_title_en: 'Dietary Diversity — The Scientific Guide to Adequacy and Intelligence',
            meta_description_ar: 'اكتشف لماذا يُنبّئ التنوع الغذائي بالذكاء. تعلم كيفية تجنب فخاخ "الجوع الخفي" وتحقيق 8 مجموعات غذائية بميزانية اقتصادية.',
            meta_description_en: 'Discover why dietary diversity predicts intelligence. Learn how to avoid "Hidden Hunger" traps and achieve 8 food groups on an economic budget.',
            reading_time_minutes: 12,
            og_title_ar: 'التنوع الغذائي — لماذا 5 مجموعات يومياً أهم من كمية الأكل',
            og_title_en: 'Dietary Diversity — Why 5 Food Groups Daily Matters More Than Quantity',
            og_description_ar: 'التنوع هو الحل لمشكلة الجوع الخفي. هل يحصل طفلك على 5 مجموعات من 10؟',
            og_description_en: 'Diversity is the solution to Hidden Hunger. Is your child getting 5 out of 10 groups?',
        },
        imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80',
        category: 'balancedNutrition',
    },

    // ─────────────────────────────────────────────
    // Article 16
    // ─────────────────────────────────────────────
    {
        id: 16,
        axis: 3, axis_ar: AXIS_AR, axis_en: AXIS_EN, week_range: '5-6',
        title_ar: 'تغذية الطفل حسب العمر — من الرضاعة حتى مائدة الأسرة',
        title_en: 'Child Nutrition by Age — From Infancy to the Family Table',
        slug_ar: 'تغذية-الطفل-حسب-العمر',
        slug_en: 'Infant Nutrition',
        quick_summary_ar: [
            'دليل شامل لاحتياجات الطفل الغذائية من الولادة وحتى المراهقة',
            'التغذية في الـ 1000 يوم الأولى: الرضاعة الحصرية والتغذية التكميلية',
            'جدول عملي يوضح الحصص الموصى بها لكل فئة عمرية',
        ],
        quick_summary_en: [
            'A comprehensive guide to child nutritional needs from birth through adolescence',
            'Nutrition in the first 1,000 days: Exclusive breastfeeding and complementary feeding',
            'A practical table showing recommended servings for each age group',
        ],
        content_ar: `<div dir="rtl">
<p>السنة الأولى من الحياة هي أكثر فترات العمر أثراً في تحديد مسار الصحة — وزن الولادة يتضاعف في 4–6 أشهر، ويتضاعف ثلاث مرات بحلول عمر السنة، ويزداد الطول بمعدل 25 سم في السنة الأولى وحدها. هذا النمو الانفجاري يتطلب تسلسلاً غذائياً دقيقاً لا يحتمل التخمين.</p>

<div style="background: rgba(16, 185, 129, 0.05); border: 1px solid rgba(16, 185, 129, 0.2); padding: 15px; border-radius: 12px; margin-bottom: 20px;">
<p style="margin: 0; color: #10b981; font-weight: bold;">تنبيه هام:</p>
<p style="margin: 10px 0 0 0; color: #d1d5db; line-height: 1.6;">هذا القسم موجَّه للتوعية الصحية العامة فقط، ولا يُغني عن متابعة طبيب الأطفال الدوريـة.</p>
</div>

<h2>المرحلة الأولى: الرضاعة الحصرية — 0 إلى 6 أشهر</h2>
<h3>التوصية العالمية وما يدعمها</h3>
<p>منظمة الصحة العالمية ومنظمة PAHO ومعظم الأكاديميات الطبية الدولية تُوصي بـالرضاعة الطبيعية الحصرية لمدة 6 أشهر كاملة. "الحصرية" تعني عدم إعطاء الطفل أي شيء سوى حليب الأم — لا ماء، لا أعشاب، لا ينسون، ولا عصائر.</p>

<h3>لماذا حليب الأم هو "المعيار الذهبي"؟</h3>
<ul>
<li><strong>التغيير الديناميكي:</strong> تركيب حليب الأم يتغير خلال الرضعة الواحدة (اللبأ في البداية ثم الحليب الدسم في النهاية)، ويتغير حسب عمر الطفل وحالته الصحية (يُفرز أجساماً مضادة إذا مرض الطفل).</li>
<li><strong>الحماية المناعية:</strong> يحتوي على "اللبأ" (Colostrum) وهو أول تحصين طبيعي غني بالأجسام المضادة (IgA) التي تُغلّف أمعاء الطفل وتمنع التصاق الميكروبات.</li>
<li><strong>تطور الدماغ:</strong> يحتوي على أحماض دهنية طويلة السلسلة (DHA/ARA) ضرورية لنمو شبكية العين والوصلات العصبية في الدماغ.</li>
</ul>

<h2>المرحلة الثانية: التغذية التكميلية — 6 إلى 12 شهرًا</h2>
<h3>متى تبدأ؟ علامات استعداد الطفل</h3>
<p>الأكاديمية الأمريكية لطب الأطفال (AAP) تشترط ظهور علامات الاستعداد العصبي والميكانيكي قبل بدء الطعام:</p>
<ol>
<li>القدرة على الجلوس مع سند الظهر والسيطرة على الرأس.</li>
<li>زوال "منعكس دفع اللسان" (الذي يجعل الطفل يدفع الطعام للخارج تلقائياً).</li>
<li>إبداء الاهتمام بطعام الكبار (محاولة الإمساك بالملعقة أو مراقبة الأهل أثناء الأكل).</li>
</ol>

<h3>القواعد الذهبية للبداية الصحيحة</h3>
<ul>
<li><strong>قاعدة اليوم الثالث:</strong> إدخال صنف واحد جديد كل 3 أيام لمراقبة الحساسية (طفح جلدي، إسهال شديد، تقيؤ).</li>
<li><strong>بدون ملح أو سكر:</strong> كُلِيَا الطفل لا تتحملان الأملاح المضافة، والسكريات تُؤثر على تفضيلات التذوق المستقبلية وتزيد خطر السمنة.</li>
<li><strong>التدرج في القوام:</strong> نبدأ بالمهروس الناعم جداً (Purée)، ثم المهروس الخشن، ثم الطعام المهروس بالشوكة، وصولاً إلى طعام الأصابع (Finger Foods) في الشهر الثامن/التاسع.</li>
</ul>

<h2>المرحلة الثالثة: الانتقال لمائدة الأسرة — 12 إلى 24 شهرًا</h2>
<p>في هذه المرحلة، الطفل قادر تقريباً على تناول معظم ما تأكله الأسرة (مع تعديل القوام لصغره). التركيز هنا ينصب على:</p>
<ul>
<li><strong>ترسيخ العادات:</strong> الأكل مع العائلة يُعلّم الطفل مهارات اجتماعية ويُقلّل من رهاب الطعام الجديد.</li>
<li><strong>تنوع المصادر:</strong> ضمان توازن يومي بين البروتين، الكربوهيدرات المعقدة، والدهون الصحية.</li>
</ul>

<hr>

<h2>النافذة الثانية: 4–8 سنوات — مرحلة الثبات والنمو المطرد</h2>
<p>بعد العامين الأولين، يدخل الطفل مرحلة من النمو الأكثر بطئاً لكنه ثابت. الاحتياجات الغذائية هنا تهدف لدعم النشاط البدني المتزايد وتطوير المهارات الذهنية المدرسية.</p>

<h3>الاحتياجات المرجعية الدقيقة (4–8 سنوات)</h3>
<table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse:collapse; text-align:center;">
<thead><tr><th>المغذي</th><th>RDA / AI</th><th>الحد الأقصى الآمن (UL)</th><th>أولوية التوصيف</th></tr></thead>
<tbody>
<tr><td><strong>السعرات</strong></td><td>1,200–1,600 كيلوسعرة</td><td>غير محدد*</td><td>تتغيّر بنشاط الطفل</td></tr>
<tr><td><strong>البروتين</strong></td><td>19 جرام/يوم (0.95 جم/كجم)</td><td>غير محدد*</td><td>الأساس لنمو العضلات والإنزيمات</td></tr>
<tr><td><strong>الكربوهيدرات</strong></td><td>130 جرام/يوم (الحد الأدنى)</td><td>غير محدد*</td><td>وقود الدماغ الأساسي</td></tr>
<tr><td><strong>الألياف</strong></td><td>25 جرام/يوم</td><td>غير محدد*</td><td>صحة الأمعاء والشبع</td></tr>
<tr><td><strong>الكالسيوم</strong></td><td>1,000 ملغ/يوم</td><td>2,500 ملغ</td><td>بناء الكتلة العظمية</td></tr>
<tr><td><strong>الحديد</strong></td><td>10 ملغ/يوم</td><td>40 ملغ</td><td>نمو الدماغ + هيموجلوبين</td></tr>
<tr><td><strong>الزنك</strong></td><td>5 ملغ/يوم</td><td>12 ملغ</td><td>تكاثر خلوي + مناعة</td></tr>
<tr><td><strong>فيتامين أ</strong></td><td>400 ميكروغرام RAE</td><td>900 ميكروغرام</td><td>مناعة + بصر</td></tr>
<tr><td><strong>فيتامين د</strong></td><td>600 IU/يوم</td><td>3,000 IU</td><td>امتصاص الكالسيوم</td>
</tr>
<tr><td><strong>اليود</strong></td><td>90 ميكروغرام/يوم</td><td>300 ميكروغرام</td><td>الدماغ + الغدة الدرقية</td></tr>
<tr><td><strong>المغنيسيوم</strong></td><td>130 ملغ/يوم</td><td>110 ملغ (مكملات فقط)</td><td>300+ إنزيم</td></tr>
<tr><td><strong>فيتامين C</strong></td><td>25 ملغ/يوم</td><td>650 ملغ</td><td>مناعة + امتصاص الحديد</td>
</tr>
</tbody>
</table>

<h3>التحدي السلوكي الأبرز: رُهاب الطعام الجديد (Food Neophobia)</h3>
<p>هذه المرحلة هي ذروة رهاب الطعام الجديد — ظاهرة التطور الطبيعي التي تجعل الطفل يرفض الأطعمة غير المألوفة رغم أنه لم يذُقها قط. الظاهرة موثَّقة بيولوجياً: يُعتقد أنها كانت تحمي الأطفال تطورياً من تناول نباتات سامة غير مألوفة. لكنها في السياق الغذائي الحديث تُشكّل عائقاً أمام التنوع الغذائي.</p>

<div style="background: rgba(59, 130, 246, 0.05); border-right: 4px solid #3b82f6; padding: 15px; border-radius: 8px 0 0 8px; margin: 15px 0;">
<h4 style="color: #3b82f6; margin-top: 0; margin-bottom: 10px;">ما تقوله الأبحاث للتعامل معها:</h4>
<ul style="margin-bottom: 0;">
<li>الطعام المرفوض يجب أن يُعرَض للطفل <strong>8 إلى 15 مرة مختلفة</strong> قبل الحكم برفضه نهائياً — كثير من الأهل يستسلمون بعد 2–3 محاولات.</li>
<li><strong>"سلسلة الطعام" (Food Chaining):</strong> تقديم الطعام الجديد مُجاوراً لطعام مألوف ومحبوب.</li>
<li><strong>الضغط والإجبار يعكسان النتيجة:</strong> الطفل المُجبَر على الأكل يُطوّر ارتباطاً سلبياً أعمق بذلك الطعام.</li>
<li><strong>المشاركة في التحضير تُقلّل الرفض:</strong> الطفل الذي ساعد في قطع الخضروات يميل لتجربتها.</li>
</ul>
</div>

<h3>الانتقال — ما يتغيّر بين 8 و10 سنوات</h3>
<p>هذه الفترة هي "هدوء ما قبل العاصفة" البيولوجية. معدل نمو الطول يُسرّع قليلاً، الشهية تزداد وضوحاً، وتبدأ في بعض الأطفال المؤشرات الأولى لبلوغ مبكر (خاصةً عند الإناث). من الناحية الغذائية، هذه مرحلة انتقال الاحتياجات من 4–8 نحو 9–13 تدريجياً — لا تحوّل مفاجئ.</p>

<h2>النافذة الثالثة: 9–13 سنة — الانطلاق البيولوجي</h2>
<h3>ما يحدث في جسم الطفل: طفرة البلوغ</h3>
<p>هذه المرحلة تُشهد أسرع معدل نمو منذ الرضاعة — يمكن للطفل أن يزداد 8–10 سم في الطول في سنة واحدة خلال ذروة طفرة البلوغ. هذا النمو المتسارع يستدعي كميات موارد ضخمة من العناصر الغذائية في وقت قصير:</p>
<ul>
<li><strong>البروتين:</strong> بناء الكتلة العضلية، أنسجة الغدد، الكولاجين، الهرمونات.</li>
<li><strong>الكالسيوم والفوسفور والمغنيسيوم:</strong> معدنة أسرع للعظام في أقصر وقت ممكن.</li>
<li><strong>الحديد:</strong> توسع كتلة كريات الدم الحمراء + (عند الإناث) تعويض الدورة الشهرية.</li>
<li><strong>الزنك:</strong> دعم نضج الغدد التناسلية + بناء خلوي مكثّف.</li>
<li><strong>حمض الفوليك:</strong> ضروري لانقسام الخلايا المتسارع في الأنسجة النامية.</li>
</ul>

<h3>الاحتياجات المرجعية الدقيقة (9–13 سنة)</h3>
<table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse:collapse; text-align:center;">
<thead><tr><th>المغذي</th><th>ذكور</th><th>إناث</th><th>الحد الأقصى الآمن (UL)</th></tr></thead>
<tbody>
<tr><td><strong>السعرات</strong></td><td>1,800–2,200 كيلوسعرة</td><td>1,600–2,000 كيلوسعرة</td><td>غير محدد*</td></tr>
<tr><td><strong>البروتين</strong></td><td>34 جرام/يوم</td><td>34 جرام/يوم</td><td>غير محدد*</td></tr>
<tr><td><strong>الكالسيوم</strong></td><td>1,300 ملغ/يوم</td><td>1,300 ملغ/يوم</td><td>3,000 ملغ</td></tr>
<tr><td><strong>الحديد</strong></td><td>8 ملغ/يوم</td><td>8 ملغ/يوم</td><td>40 ملغ</td></tr>
<tr><td><strong>الزنك</strong></td><td>8 ملغ/يوم</td><td>8 ملغ/يوم</td><td>23 ملغ</td></tr>
<tr><td><strong>المغنيسيوم</strong></td><td>240 ملغ/يوم</td><td>240 ملغ/يوم</td><td>350 ملغ (مكملات)</td></tr>
<tr><td><strong>فيتامين أ</strong></td><td>600 ميكروغرام RAE</td><td>600 ميكروغرام RAE</td><td>1,700 ميكروغرام</td></tr>
<tr><td><strong>فيتامين د</strong></td><td>600 IU/يوم</td><td>600 IU/يوم</td><td>4,000 IU</td></tr>
<tr><td><strong>اليود</strong></td><td>120 ميكروغرام/يوم</td><td>120 ميكروغرام/يوم</td><td>600 ميكروغرام</td></tr>
<tr><td><strong>حمض الفوليك</strong></td><td>300 ميكروغرام DFE</td><td>300 ميكروغرام DFE</td><td>600 ميكروغرام</td></tr>
<tr><td><strong>فيتامين C</strong></td><td>45 ملغ/يوم</td><td>45 ملغ/يوم</td><td>1,200 ملغ</td></tr>
</tbody>
</table>

<p style="margin-top: 15px;"><strong>لماذا الكالسيوم أعلى في هذه المرحلة من أي وقت آخر؟</strong> لأن 40–45% من الكتلة العظمية القصوى تُبنى خلال سنوات المراهقة المبكرة فقط. الجسم يُخزّن الكالسيوم بمعدل قد يصل لـ300–400 ملغ/يوم صافياً في العظام خلال ذروة النمو — وهو معدل لا يتكرر بعدها أبداً.</p>

<h2>نقطة التحوّل الحرجة: الحديد والإناث بعد بدء الدورة الشهرية</h2>
<h3>الفجوة التي تُفاجئ كثيراً من الأهل</h3>
<p>الاحتياج من الحديد يتضاعف فجأة عند الإناث مع بدء الدورة الشهرية:</p>
<div style="background: rgba(239, 68, 68, 0.05); border: 1px solid rgba(239, 68, 68, 0.2); border-radius: 12px; padding: 15px; margin: 15px 0; display: flex; flex-direction: column; gap: 10px;">
<div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px dashed rgba(239, 68, 68, 0.2); padding-bottom: 10px;">
<span style="font-weight: bold; color: #f87171;">إناث 9–13 سنة (قبل الدورة)</span>
<span style="font-family: monospace; font-size: 1.1em;">8 ملغ/يوم</span>
</div>
<div style="display: flex; justify-content: space-between; align-items: center; padding-top: 5px;">
<span style="font-weight: bold; color: #ef4444;">إناث 14–18 سنة (بعد الدورة)</span>
<span style="font-family: monospace; font-size: 1.1em; color: #ef4444; font-weight: bold;">15 ملغ/يوم &larr; ارتفاع 87%</span>
</div>
</div>
<p>هذه الزيادة الكبيرة مطلوبة لتعويض الحديد المفقود مع دم الدورة الشهرية — والتي تُفقد في المتوسط 20–30 ملغ حديد شهرياً. وبما أن الإناث في هذه المرحلة يُصبحن أكثر ميلاً لتقليل الأكل أو اتباع حميات غذائية من دوافع اجتماعية، يُصبح نقص الحديد التهديد الأول المُتوقَّع بعد بدء الدورة الشهرية — وهو ما يستدعي تقييماً دورياً.</p>

<h3>متى يُصبح نقص الحديد شبه مؤكَّد؟</h3>
<p>المراهقة التي تجمع بين:</p>
<ul>
<li>بدء الدورة الشهرية الغزيرة</li>
<li>تقليل تناول اللحوم أو اتباع نظام شبه نباتي</li>
<li>شرب الشاي مع الوجبات</li>
<li>ممارسة رياضة مكثّفة (رياضية مدرسية)</li>
</ul>
<p>...هي في منطقة خطر شبه مؤكّدة لنقص الحديد وتحتاج تحليل صورة دم دورية.</p>

<h2>الفروق الجندرية في 9–13 سنة — ما يختلف بين الذكور والإناث</h2>
<p>يبدأ التمايز التغذوي الجندري الفعلي في هذه المرحلة:</p>
<table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse:collapse; text-align:center;">
<thead><tr><th>المغذي</th><th>الذكور (9–13)</th><th>الإناث (9–13)</th><th>السبب</th></tr></thead>
<tbody>
<tr><td><strong>السعرات</strong></td><td>1,800–2,200</td><td>1,600–2,000</td><td>الذكور يُطوّرون كتلة عضلية أكبر</td></tr>
<tr><td><strong>الحديد</strong></td><td>8 ملغ</td><td>8 ملغ (ثم 15 بعد الدورة)</td><td>فقد الدورة الشهرية</td></tr>
<tr><td><strong>المغنيسيوم</strong></td><td>240 ملغ</td><td>240 ملغ</td><td>متساوٍ في هذه المرحلة</td></tr>
<tr><td><strong>البروتين</strong></td><td>34 جرام</td><td>34 جرام</td><td>متساوٍ — الفرق يبدأ من 14 سنة</td></tr>
<tr><td><strong>الكالسيوم</strong></td><td>1,300 ملغ</td><td>1,300 ملغ</td><td>متساوٍ — كلاهما في ذروة بناء العظم</td></tr>
</tbody>
</table>

<h2>جدول المقارنة الشاملة: 4–8 مقابل 9–13 مقابل 14–18 سنة</h2>
<table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse:collapse; text-align:center;">
<thead><tr><th>المغذي</th><th>4–8 سنوات</th><th>9–13 سنوات</th><th>14–18 ذكور</th><th>14–18 إناث</th></tr></thead>
<tbody>
<tr><td><strong>سعرات</strong></td><td>1,200–1,600</td><td>1,600–2,200</td><td>2,200–3,200</td><td>1,800–2,400</td></tr>
<tr><td><strong>بروتين (جم/يوم)</strong></td><td>19</td><td>34</td><td>52</td><td>46</td></tr>
<tr><td><strong>كالسيوم (ملغ)</strong></td><td>1,000</td><td>1,300</td><td>1,300</td><td>1,300</td></tr>
<tr><td><strong>حديد (ملغ)</strong></td><td>10</td><td>8</td><td>11</td><td>15</td></tr>
<tr><td><strong>زنك (ملغ)</strong></td><td>5</td><td>8</td><td>11</td><td>9</td></tr>
<tr><td><strong>مغنيسيوم (ملغ)</strong></td><td>130</td><td>240</td><td>410</td><td>360</td></tr>
<tr><td><strong>فيتامين أ (ميكروغرام)</strong></td><td>400</td><td>600</td><td>900</td><td>700</td></tr>
<tr><td><strong>فيتامين C (ملغ)</strong></td><td>25</td><td>45</td><td>75</td><td>65</td></tr>
</tbody>
</table>

<h2>نصائح عملية لكل مرحلة — ما يُغيّر الفارق</h2>
<h3>للفئة 4–8 سنوات</h3>
<ol>
<li><strong>تكيّف مع إشارات الجوع والشبع الطبيعية:</strong> الأطفال في هذه السن لديهم آلية تنظيم الشهية طبيعية وفعّالة إذا لم يُتدخَّل فيها. الإجبار على "إنهاء الطبق" يُعطّل هذه الآلية ويُساهم على المدى البعيد في الإفراط بالأكل.</li>
<li><strong>قاعدة التعرض المتكرر بلا ضغط:</strong> الطفل الرافض لطعام جديد يحتاج تعرضاً متكرراً (8–15 مرة) قبل أن يُقبل عليه طوعاً. يكفي وضع القطعة في طبقه دون التعليق عليها — ثم تجاهل ما إذا أكل أم لا.</li>
<li><strong>الطعام الملوّن كاستراتيجية:</strong> الأطفال في هذه المرحلة يستجيبون للمثيرات البصرية. طبق يحتوي 5 ألوان مختلفة من الخضروات والفواكه يُحسّن فضول التجربة — وبالصدفة يُغطّي عادةً مجموعات غذائية متنوعة.</li>
</ol>

<h3>للفئة 9–13 سنة</h3>
<ol>
<li><strong>زِد البروتين والكالسيوم قبل أن تُلاحظ الحاجة:</strong> طفرة النمو تبدأ قبل أن تكون ظاهرة بالكامل. الاحتياجات ترتفع قبل الذروة بـ6–12 شهراً. الانتظار حتى يظهر النمو الواضح يعني البدء متأخراً.</li>
<li><strong>شاركهم القرار الغذائي:</strong> الأطفال في هذا العمر يبدأون تطوير هويتهم المستقلة — تعليمهم قراءة البطاقة الغذائية وتحليلها يُعطيهم أداةً تدوم مدى الحياة أكثر قيمةً من أي توجيه مباشر.</li>
<li><strong>انتبه لمحفزات المراهقة المبكرة على الأكل:</strong> الضغط الأقراني، التنمر حول الوزن، الشغف الجديد بالمظهر — كلها عوامل تُؤثر في علاقة الطفل بالطعام في هذه المرحلة. البيئة الأسرية المحايدة تجاه الوزن والمُقدِّمة للطعام كوقود لا كمكافأة أو عقوبة هي الأكثر حمايةً.</li>
</ol>

<h2>الحصص الغذائية المرئية — ما يُعادل الاحتياج اليومي</h2>
<h3>نموذج يوم كامل للطفل 9–13 سنة (تغطية الاحتياجات الكاملة)</h3>
<table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse:collapse;">
<thead><tr><th>الوجبة</th><th>المحتوى</th><th>الاحتياجات التي تُغطيها</th></tr></thead>
<tbody>
<tr><td><strong>إفطار</strong></td><td>شوفان (كوب) + حليب (كوب) + موزة</td><td>كالسيوم 300 ملغ، ألياف، طاقة مستدامة</td></tr>
<tr><td><strong>سناك صباحي</strong></td><td>بيضتان مسلوقتان + طماطم</td><td>بروتين 12 جرام، كولين، فيتامين C</td></tr>
<tr><td><strong>غداء</strong></td><td>أرز (كوب) + دجاج/سمك (100 جرام) + ملوخية + خبز</td><td>بروتين 25 جرام، حديد، زنك، فولات</td></tr>
<tr><td><strong>سناك مسائي</strong></td><td>زبادي + فاكهة موسمية</td><td>كالسيوم 250 ملغ، يود، بروبيوتيك</td></tr>
<tr><td><strong>عشاء</strong></td><td>فول/عدس + جبن + خبز بلدي + خيار</td><td>بروتين نباتي، كالسيوم إضافي، ألياف</td></tr>
</tbody>
</table>

<div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.2); padding: 15px; border-radius: 12px; margin-top: 20px;">
<p style="margin: 0; color: #10b981; font-weight: bold;">النتيجة التراكمية:</p>
<p style="margin: 10px 0 0 0; color: #d1d5db; line-height: 1.6;">هذا اليوم يُحقق تقريباً — الكالسيوم 1,200+ ملغ، البروتين 55+ جرام، الحديد 10–12 ملغ، الألياف 28–30 جرام — بتكلفة يومية معتدلة وبمكوّنات من المطبخ المصري اليومي.</p>
</div>
</div>`,
        content_en: `<div dir="ltr">
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
            'منظمة الصحة العالمية (WHO) — الممارسات المثلى لتغذية الرضع.',
            'الأكاديمية الأمريكية لطب الأطفال (AAP) — دليل التغذية التكميلية.',
            'اليونيسف (UNICEF) — نافذة الـ 1000 يوم الأولى وفرص النمو.',
        ],
        sources_en: [
            'World Health Organization (WHO) — Optimal infant feeding practices.',
            'American Academy of Pediatrics (AAP) — Pediatric nutrition handbook.',
            'UNICEF — The first 1,000 days growth window.',
        ],
        tags_ar: ['تغذية حسب العمر', 'حصص غذائية', 'سعرات حرارية', 'نمو الأطفال', 'مراهقة', 'كالسيوم', 'حديد', 'بروتين', 'تغذية الأطفال', 'جدول غذائي'],
        tags_en: ['Age-based Nutrition', 'Food Servings', 'Calories', 'Child Growth', 'Adolescence', 'Calcium', 'Iron', 'Protein', 'Child Nutrition', 'Nutrition Table'],
        meta: {
            meta_title_ar: 'تغذية الرضيع والطفل — دليل الـ 1000 يوم الأولى',
            meta_title_en: 'Infant and Child Nutrition — The First 1,000 Days Guide',
            meta_description_ar: 'علمياً، كيف تبني صحة طفلك في أول عامين؟ الرضاعة الحصرية، علامات الاستعداد للطعام، وجداول الاحتياجات الدقيقة لكل عمر.',
            meta_description_en: 'Scientifically, how do you build your child\'s health in the first two years? Exclusive breastfeeding, signs of food readiness, and precise nutritional tables.',
            reading_time_minutes: 15,
            og_title_ar: 'من الرضاعة للمائدة — رحلة طفلك الغذائية في أول عامين',
            og_title_en: 'From Nursing to Table — Your Child\'s Nutritional Journey in the First Two Years',
            og_description_ar: 'أهم تسلسل غذائي في حياة الإنسان. تعلم التوصيات العالمية والمحلية لتغذية طفلك.',
            og_description_en: 'The most important nutritional sequence in a human\'s life. Learn global and local recommendations.',
        },
        imageUrl: '/images/articles/child-nutrition-age.jpg',
        category: 'balancedNutrition',
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
<p>مصر لا تواجه أزمة تغذية واحدة — بل تواجه في آنٍ واحد أزمتين متناقضتين تسكنان جسد المجتمع ذاته وأحياناً في الأسرة ذاتها: طفل متقزم في الريف وأم تُعاني من السمنة في المدينة، أو — والأخطر — طفلٌ بدين يفتقر في الوقت نفسه لأربعة معادن أساسية. هذا ما تُسمّيه منظمة الصحة العالمية "العبء المزدوج للتغذية".</p>

<h2>الأرقام — ما تقوله البيانات الوطنية</h2>
<h3>الجانب الأول: نقص التغذية</h3>
<p>تحتلّ مصر مرتبةً متوسطة على مؤشر الجوع العالمي 2023 (المرتبة 57 من 121 دولة) — وهو ما يُصنّف مشكلة الجوع بمستوى "متوسط الحدة". لكن الأرقام التفصيلية تكشف عن تفاوتات حادة:</p>

<table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse:collapse; text-align:center;">
<thead><tr><th>مؤشر سوء التغذية</th><th>النسبة الرسمية (أطفال تحت 5 سنوات)</th><th>المقارنة الإقليمية</th></tr></thead>
<tbody>
<tr><td>التقزم (Stunting)</td><td>22.3%</td><td>أقل من متوسط أفريقيا 30.7%</td></tr>
<tr><td>الهزال (Wasting)</td><td>9.5%</td><td>أعلى من متوسط أفريقيا 6.0%</td></tr>
<tr><td>الوزن الزائد والسمنة</td><td>15.7%</td><td>ضعف المتوسط العالمي</td></tr>
<tr><td>أنيميا نقص الحديد</td><td>~40% (أطفال 2–5 سنوات)</td><td>مرتفعة جداً</td></tr>
</tbody>
</table>
<p>وتُشير أحدث بيانات التقرير الغذائي العالمي (2024) إلى أن مصر لم تُحرز أي تقدم نحو تحقيق الأهداف العالمية في التقزم، الهزال، والرضاعة الطبيعية الحصرية — وأنها خارج المسار الصحيح في مؤشر الوزن الزائد.</p>

<h2>التقزم — الجرح المزمن الخفي</h2>
<h3>ما هو التقزم بالضبط؟</h3>
<p>التقزم (Stunting) هو قِصَر القامة مقارنةً بالعمر (Height-for-Age Z-score أقل من &minus;2)، ويعكس سوء تغذية مزمناً ومتراكماً يبدأ قبل الولادة ويستمر طوال السنوات الألف الأولى. ليس مجرد قامة قصيرة — بل مؤشر على اضطراب عميق في نمو الدماغ والأجهزة الحيوية.</p>

<h3>لماذا التقزم أخطر مما يبدو؟</h3>
<p>الضرر البيولوجي للتقزم يمتد لأبعد من الجسد الصغير:</p>
<ul>
<li><strong>على الدماغ:</strong> التقزم في السنتين الأوليتين من الحياة يرتبط بانخفاض حجم بعض البنى الدماغية وتراجع الأداء الإدراكي في سن المدرسة — ضعف في الذاكرة، اللغة، التفكير المجرد. هذه التأثيرات تُعيق المسار التعليمي للطفل بشكل مستقل عن عوامل اجتماعية أخرى.</li>
<li><strong>على الجهاز المناعي:</strong> الطفل المتقزم لديه دفاعات مناعية أضعف، يُصاب بالعدوى بشكل أكثر تكراراً وأشد حدةً، مما يُنشئ حلقة مفرغة: مرض &rarr; نقص تغذية &rarr; مرض.</li>
<li><strong>على مستوى الأجيال:</strong> النساء اللواتي كنّ متقزمات في طفولتهن أكثر عرضة لإنجاب أطفال منخفضي الوزن أو متقزمين — مما يُديم دورة سوء التغذية عبر الأجيال.</li>
</ul>

<h3>أسباب التقزم في السياق المصري</h3>
<p>دراسات CAPMAS والمسح الديموغرافي الصحي تُشير إلى عوامل موثَّقة إحصائياً في مصر:</p>
<ul>
<li><strong>الفقر وضيق السكن:</strong> 17% من الأطفال في المنازل التي تفتقر للصرف الصحي يُعانون من التقزم</li>
<li><strong>الرضاعة الطبيعية المنخفضة:</strong> 39.5% فقط من الرضّع يُرضَعون رضاعةً طبيعية حصرية حتى 6 أشهر</li>
<li><strong>التغذية التكميلية الفقيرة:</strong> التحول المبكر لأغذية نشوية مُكرَّرة فقيرة بالبروتين والمغذيات الدقيقة</li>
<li><strong>التهابات متكررة:</strong> الإسهال والتهابات الجهاز التنفسي تستنزف الاحتياطيات الغذائية وتُثبّط النمو</li>
</ul>

<h2>الهزال — الطوارئ الغذائية الحادة</h2>
<p>الهزال (Wasting) هو انخفاض الوزن مقارنةً بالطول (Weight-for-Height Z-score أقل من &minus;2) ويعكس سوء تغذية حاداً وراهناً — لا تاريخاً مزمناً. نسبة 9.5% في مصر تتجاوز متوسط أفريقيا البالغ 6.0%، مما يجعله مؤشراً مقلقاً يستدعي تدخلاً عاجلاً. الطفل المُهزول عرضة للوفاة بضعف يُناهز 11 ضعف الطفل الطبيعي عند الإصابة بأمراض معدية شائعة.</p>

<h2>السمنة والوزن الزائد — مفارقة المجتمع الغني بالسعرات</h2>
<h3>الصورة الوطنية الكاملة</h3>
<p>التقرير الغذائي العالمي 2024 يُرجّح أن 18% من الأطفال المصريين دون الخامسة يُعانون من السمنة، فيما تُشير بيانات مسح الصحة الأسرية 2021 إلى أن 11.5% منهم بين الوزن الزائد والسمنة معاً. وعلى مستوى البالغين، تبلغ نسبة السمنة في مصر نحو 40% — من أعلى النسب في منطقة الشرق الأوسط وشمال أفريقيا.</p>

<h2>العبء المزدوج — عندما يجتمع النقيضان في بيت واحد</h2>
<h3>الظاهرة على مستوى الأسرة</h3>
<p>داخل الأسر المصرية التي تُعاني من السمنة عند الأم، تُشير البيانات إلى أن 12% من الأطفال في نفس الأسرة يُعانون من التقزم. هذا الرقم يُجسّد العبء المزدوج بشكل لافت: الأم تستهلك سعرات زائدة، والطفل لا يُرضَع بما يكفي ثم يُنتقل لأغذية فقيرة بالمغذيات — فيتقزّم رغم أن البيت ليس جائعاً بالمعنى التقليدي.</p>

<h3>الظاهرة على مستوى الطفل نفسه — التناقض داخل جسد واحد</h3>
<p>الأخطر هو ما تُوثّقه الأبحاث الحديثة من تزامن السمنة ونقص المغذيات في الطفل الواحد:</p>
<ul>
<li>دراسة 2025 في Pediatric Obesity وصفت هذه الظاهرة بـ"الجوع الخفي في السمنة الطفلية" (Hidden Hunger in Pediatric Obesity) — الطفل يأكل كثيراً من السعرات لكنه يُعاني في الوقت ذاته من نقص فيتامين د، الكالسيوم، الحديد، المغنيسيوم، وفيتامينات ب</li>
<li>الآلية واضحة: الأغذية فائقة المعالجة تُوفّر سعرات وفيرة وتُفشل تماماً في توفير المغذيات الدقيقة — مما يخلق طفلاً بدين الجسم وفقير المغذيات في آنٍ معاً</li>
<li>الالتهاب المزمن المصاحب للسمنة يُعقّد المشكلة: ارتفاع مستوى الهبسيدين (Hepcidin) — بروتين الطور الحاد — يُثبّط امتصاص الحديد من الأمعاء بشكل نشط، مما يُفسّر جزئياً لماذا يُعاني كثير من الأطفال البدناء من أنيميا رغم تناولهم سعرات وفيرة</li>
</ul>

<h2>لماذا تحدث هذا في مصر؟ — المحركات البنيوية</h2>
<h3>التحوّل الغذائي (Nutrition Transition)</h3>
<p>مصر تمرّ بمرحلة "التحوّل الغذائي" (Nutrition Transition) — الانتقال من أنماط الغذاء التقليدي (حبوب كاملة، بقوليات، خضروات موسمية) نحو أنماط الغذاء الحديث المُعولَم (نشويات مُكرَّرة، زيوت مُهدرَجة، مشروبات محلاة، وجبات سريعة). هذا التحوّل يُفرز نوعاً من "وفرة السعرات الفارغة مع فقر المغذيات".</p>

<h3>دور السعرات الفارغة (Empty Calories)</h3>
<p>مصطلح "السعرات الفارغة" يعني أغذية توفّر طاقة دون مغذيات دقيقة مرافقة — خبز أبيض، أرز مقشور، سكر أبيض، زيت مُكرَّر. هذه الأغذية رخيصة ومتاحة وتُشعر بالشبع على المدى القصير — لكنها تترك فجوات تراكمية في الحديد والزنك وفيتامين أ وفيتامين د والكالسيوم.</p>

<h3>الفخ الاقتصادي — أرخص سعرات ليست أفضل تغذية</h3>
<p>في بيئات الدخل المحدود، قد يستهلك الأطفال 80% من سعراتهم من الخبز والأرز والسكر لأنها الأوفر وفيرة — بينما الأغذية الحيوانية والخضروات والفاكهة تبقى خارج ميزانية أسبوعية كثيرة. النتيجة: سعرات كافية أو زائدة مع نقص حادّ في المغذيات الدقيقة. ويتجلى ذلك في الإحصاء: 14% من المصريين يعانون من انعدام الأمن الغذائي ، لكن نسبة السمنة عند البالغين تبلغ 40% في الوقت ذاته.</p>

<h2>المقارنة بين الشكلين — جدول تشخيصي</h2>
<table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse:collapse;">
<thead><tr><th>المحور</th><th>نقص التغذية</th><th>فرط التغذية</th><th>العبء المزدوج</th></tr></thead>
<tbody>
<tr><td><strong>التعريف</strong></td><td>نقص السعرات أو المغذيات</td><td>فائض السعرات مع/بدون نقص مغذيات</td><td>كلاهما في فرد/أسرة واحدة</td></tr>
<tr><td><strong>المؤشرات الجسدية</strong></td><td>تقزم، هزال، شحوب، نحول</td><td>وزن زائد، سمنة، دهون مفرطة</td><td>متقزم مع وزن زائد، أو بدين مع أنيميا</td></tr>
<tr><td><strong>الغذاء المُسبِّب</strong></td><td>نقص بروتين/سعرات/مغذيات</td><td>فائض سعرات + أغذية فائقة المعالجة</td><td>أغذية فارغة السعرات فقيرة المغذيات</td></tr>
<tr><td><strong>العواقب طويلة المدى</strong></td><td>إعاقة نمو الدماغ والجسد</td><td>أمراض مزمنة — قلب، سكري، كبد</td><td>تضافر عواقب الاثنين معاً</td></tr>
<tr><td><strong>نسبته في مصر</strong></td><td>22.3% تقزم + 9.5% هزال</td><td>15.7–18% وزن زائد</td><td>12% من أطفال الأمهات البدينات </td></tr>
<tr><td><strong>قابلية الوقاية</strong></td><td>عالية بتحسين نوعية الغذاء</td><td>عالية بتعديل نمط الحياة</td><td>تحتاج تدخلاً مزدوجاً متزامناً</td></tr>
</tbody>
</table>

<h2>التدخلات الضرورية — منظور السياسة الصحية</h2>
<p>منظمة الصحة العالمية (المكتب الإقليمي لشرق المتوسط) ومعهد IFPRI يُوصيان بما يُسمّى "التدخلات ذات المهمة المزدوجة" (Double-Duty Actions) التي تُعالج نقص التغذية وفرطه في الوقت ذاته:</p>
<ul>
<li><strong>تعزيز جودة الغذاء لا كميته:</strong> التحوّل من دعم حصص الدقيق والسكر إلى دعم التنوع الغذائي (بقوليات، خضروات، ألبان)</li>
<li><strong>تحصين الأغذية الأساسية (Fortification):</strong> إضافة الحديد وحمض الفوليك لدقيق القمح، وإضافة اليود لملح الطعام</li>
<li><strong>برامج التغذية المدرسية:</strong> وجبات مدرسية متوازنة تكسر الارتباط بين انعدام الأمن الغذائي في البيت والفجوات الغذائية</li>
<li><strong>دعم الرضاعة الطبيعية الحصرية:</strong> رفع نسبة 39.5% الحالية نحو هدف الـ50% العالمي</li>
<li><strong>تنظيم تسويق الأغذية فائقة المعالجة:</strong> تنظيم تسويق هذه المنتجات للأطفال — وهو ما تُطبّقه دول كالمكسيك والمملكة المتحدة بفاعلية موثَّقة</li>
</ul>

<div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.2); padding: 15px; border-radius: 12px; margin-top: 20px;">
<p style="margin: 0; color: #10b981; font-weight: bold;">الخلاصة:</p>
<p style="margin: 10px 0 0 0; color: #d1d5db; line-height: 1.6;">مواجهة العبء المزدوج لا تنجح بمعالجة التقزم والسمنة كمشكلتين منفصلتين — بل تحتاج سياسةً غذائيةً موحّدة تستهدف جودة الغذاء كمحور مركزي واحد: أغذية غنية بالمغذيات الدقيقة، وفيرة الألياف والبروتين، معتدلة السعرات — وهي النقيض المباشر للأغذية فائقة المعالجة فارغة السعرات التي تقود الأزمتين معاً.</p>
</div>
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
        imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80',
        category: 'undernutrition',
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
            'مرجع شامل يجمع الأرقام الدقيقة للاحتياجات الغذائية المرجعية (DRI)',
            'خريطة تفاعلات المغذيات: كيف يُضاعف فيتامين C امتصاص الحديد وكيف يثبطه الشاي',
            'دليل التوقيت والمصادر الاستراتيجية (الكبدة، السردين، الفول بالليمون)',
        ],
        quick_summary_en: [
            'Comprehensive reference for Dietary Reference Intakes (DRI) accurate figures',
            'Nutrient interaction map: How Vitamin C triples iron absorption and how tea inhibits it',
            'Timing guide and strategic sources (Liver, Sardines, Fava beans with lemon)',
        ],
        content_ar: `<div dir="rtl">
<p>هذا المرجع يجمع الأرقام الدقيقة المُستمَدة من الاحتياجات الغذائية المرجعية (DRI) الصادرة عن المعهد الأمريكي للطب، مع توضيح التفاعلات بين المغذيات التي تُحدد الفرق بين الاستفادة الكاملة والاستفادة الجزئية من نفس الغذاء.</p>

<hr>

<h2>الجدول المرجعي الشامل للمغذيات الدقيقة</h2>
<table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse:collapse;">
<thead>
<tr>
<th>المغذي</th>
<th>الدور المحوري</th>
<th>4–8 سنوات (RDA)</th>
<th>9–13 سنة (RDA)</th>
<th>الحد الأقصى (UL)</th>
<th>أهم المصادر المصرية</th>
</tr>
</thead>
<tbody>
<tr>
<td>الحديد</td>
<td>هيموجلوبين، دماغ، مناعة</td>
<td>10 ملغ/يوم</td>
<td>8 ملغ/يوم</td>
<td>40 ملغ/يوم</td>
<td>كبدة، لحوم حمراء، فول، عدس، ملوخية</td>
</tr>
<tr>
<td>فيتامين أ</td>
<td>مناعة، أغشية مخاطية، بصر</td>
<td>400 ميكروغرام RAE</td>
<td>600 ميكروغرام RAE</td>
<td>900 ميكروغرام/يوم</td>
<td>كبدة، جزر، بطاطا حلوة، مانجو</td>
</tr>
<tr>
<td>الزنك</td>
<td>نمو، مناعة، 300+ إنزيم</td>
<td>5 ملغ/يوم</td>
<td>8 ملغ/يوم</td>
<td>12 ملغ/يوم</td>
<td>لحوم حمراء، كبدة، كاجو، بذور يقطين</td>
</tr>
<tr>
<td>الكالسيوم</td>
<td>عظام، أسنان، أعصاب</td>
<td>1,000 ملغ/يوم</td>
<td>1,300 ملغ/يوم</td>
<td>2,500 ملغ/يوم</td>
<td>لبن، جبن، زبادي، سردين بالعظام</td>
</tr>
<tr>
<td>فيتامين د</td>
<td>امتصاص الكالسيوم، عظام</td>
<td>600 IU/يوم</td>
<td>600 IU/يوم</td>
<td>3,000 IU/يوم</td>
<td>شمس، أسماك دهنية، صفار بيض</td>
</tr>
<tr>
<td>اليود</td>
<td>دماغ، غدة درقية، نمو</td>
<td>90 ميكروغرام/يوم</td>
<td>120 ميكروغرام/يوم</td>
<td>300 ميكروغرام/يوم</td>
<td>ملح معالج، أسماك، لبن، زبادي</td>
</tr>
<tr>
<td>فيتامين C</td>
<td>مناعة، كولاجين، امتصاص الحديد</td>
<td>25 ملغ/يوم</td>
<td>45 ملغ/يوم</td>
<td>650–1200 ملغ/يوم</td>
<td>برتقال، ليمون، فلفل، جوافة، طماطم</td>
</tr>
<tr>
<td>حمض الفوليك</td>
<td>DNA، دم، جهاز عصبي</td>
<td>200 ميكروغرام DFE</td>
<td>300 ميكروغرام DFE</td>
<td>400 ميكروغرام/يوم</td>
<td>ملوخية، عدس، سبانخ، خبز مُدعَّم</td>
</tr>
<tr>
<td>فيتامين ب12</td>
<td>أعصاب، دم، DNA</td>
<td>1.2 ميكروغرام/يوم</td>
<td>1.8 ميكروغرام/يوم</td>
<td>غير محدد</td>
<td>لحوم، أسماك، بيض، ألبان</td>
</tr>
<tr>
<td>المغنيسيوم</td>
<td>300+ إنزيم، عضلات، طاقة</td>
<td>130 ملغ/يوم</td>
<td>240 ملغ/يوم</td>
<td>110–350 ملغ/يوم</td>
<td>مكسرات، حبوب كاملة، بقوليات، خضروات</td>
</tr>
</tbody>
</table>

<hr>

<h2>خريطة التفاعلات بين المغذيات — الشبكة الخفية</h2>
<p>فهم التفاعلات بين المغذيات لا يقل أهمية عن معرفة مصادرها — لأن "مع من تأكله" يُحدد "كم تمتصه".</p>

<h3>التفاعلات التآزرية (كلٌّ يُعزّز الآخر)</h3>
<ul>
<li><strong>فيتامين C ──────→</strong> يُضاعف امتصاص الحديد غير الهيمي ×3</li>
<li><strong>فيتامين د ──────→</strong> يُفعّل امتصاص الكالسيوم والفوسفور</li>
<li><strong>الزنك      ──────→</strong> يُنتج بروتين ناقل فيتامين أ (RBP)</li>
<li><strong>فيتامين أ  ──────→</strong> يدعم كفاءة امتصاص الحديد</li>
<li><strong>البروبيوتيك ─────→</strong> يُحسّن امتصاص الحديد والزنك والكالسيوم</li>
</ul>

<h3>التفاعلات التنافسية (كلٌّ يُثبّط الآخر عند الزيادة)</h3>
<ul>
<li><strong>الكالسيوم  ──────→</strong> يُنافس الحديد على الناقل المعوي</li>
<li><strong>الزنك الزائد ────→</strong> يُقلّل امتصاص الحديد والنحاس</li>
<li><strong>الحديد الزائد ───→</strong> يُقلّل امتصاص الزنك</li>
<li><strong>الفايتات   ──────→</strong> تُثبّط الحديد والزنك والكالسيوم معاً</li>
<li><strong>التانيات   ──────→</strong> تُثبّط الحديد بشكل انتقائي</li>
</ul>

<hr>

<h2>دليل التوقيت — متى تُقدّم ماذا</h2>
<table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse:collapse;">
<thead>
<tr>
<th>التوقيت</th>
<th>التوصية</th>
<th>السبب</th>
</tr>
</thead>
<tbody>
<tr>
<td>مع وجبات الحديد</td>
<td>أضف فيتامين C (ليمون أو فلفل أو طماطم)</td>
<td>يُضاعف امتصاص الحديد غير الهيمي</td>
</tr>
<tr>
<td>بعد وجبات الحديد بساعة</td>
<td>الشاي والقهوة والحليب</td>
<td>التانيات والكالسيوم يُثبّطان الامتصاص</td>
</tr>
<tr>
<td>مع وجبات فيتامين أ</td>
<td>أضف مصدر دهون (زيت زيتون، أفوكادو)</td>
<td>فيتامين أ محلول في الدهون</td>
</tr>
<tr>
<td>مكمّل فيتامين د</td>
<td>مع الوجبة الأغنى بالدهون</td>
<td>يرتفع امتصاصه بوجود الدهون</td>
</tr>
<tr>
<td>مكمّل الحديد</td>
<td>على معدة فارغة أو مع عصير برتقال</td>
<td>أعلى كفاءة امتصاص</td>
</tr>
<tr>
<td>الكالسيوم والحديد</td>
<td>وجبات منفصلة بفاصل ساعة</td>
<td>يتنافسان على نفس الناقل</td>
</tr>
</tbody>
</table>

<hr>

<h2>المصادر الاستراتيجية — الأكثر قيمة بأقل تكلفة</h2>
<p>بعض الأغذية تُغطّي عدة احتياجات في وجبة واحدة — وهي الاستثمار الغذائي الأذكى:</p>

<ul>
<li><strong>الكبدة البقرية (100 جرام أسبوعياً):</strong>
    <ul>
    <li>فيتامين أ: 4,968 ميكروغرام ← يُغطي احتياج أسبوع كامل تقريباً</li>
    <li>الحديد الهيمي: 6.5 ملغ ← 65% من الاحتياج اليومي</li>
    <li>الزنك: 4 ملغ ← 50–80% من الاحتياج</li>
    <li>فيتامين ب12: 70 ميكروغرام ← يتجاوز الاحتياج بكثير</li>
    </ul>
</li>
<li><strong>السردين المعلّب بالعظام (علبة صغيرة أسبوعياً):</strong>
    <ul>
    <li>الكالسيوم: 350 ملغ ← 35% من الاحتياج اليومي</li>
    <li>فيتامين د: 8 ميكروغرام ← 80% من الاحتياج</li>
    <li>اليود: 35 ميكروغرام</li>
    <li>أوميجا 3: حمض EPA وDHA لنمو الدماغ</li>
    </ul>
</li>
<li><strong>الفول اليومي بالليمون:</strong>
    <ul>
    <li>الحديد غير الهيمي: 2 ملغ + تعزيز بفيتامين C</li>
    <li>حمض الفوليك: 130 ميكروغرام ← 65% من الاحتياج</li>
    <li>المغنيسيوم، البروتين النباتي، الألياف</li>
    </ul>
</li>
<li><strong>كوب حليب + زبادي يومياً:</strong>
    <ul>
    <li>الكالسيوم: 550 ملغ ← 55% من الاحتياج في الفئة 4–8</li>
    <li>اليود: 160 ميكروغرام ← يُغطي الاحتياج اليومي كاملاً</li>
    <li>الفوسفور + البروتين + ب12</li>
    </ul>
</li>
</ul>

<hr>

<h2>علامات النقص التحذيرية — متى تستشير الطبيب</h2>
<table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse:collapse;">
<thead>
<tr>
<th>المغذي</th>
<th>علامات النقص عند الطفل</th>
</tr>
</thead>
<tbody>
<tr>
<td>الحديد</td>
<td>شحوب، خمول، ضعف تركيز، برودة أطراف، Pica (أكل تراب)</td>
</tr>
<tr>
<td>فيتامين أ</td>
<td>ضعف رؤية ليلية، جفاف العيون، تكرار العدوى التنفسية والهضمية</td>
</tr>
<tr>
<td>الزنك</td>
<td>فقدان شهية، تأخر نمو، ضعف تئام الجروح، فقدان حاسة الشم</td>
</tr>
<tr>
<td>الكالسيوم</td>
<td>تشنجات عضلية، هشاشة أظافر، تأخر نمو الأسنان</td>
</tr>
<tr>
<td>فيتامين د</td>
<td>آلام العظام، قوس الساقين، تأخر المشي، كثرة الكسور</td>
</tr>
<tr>
<td>اليود</td>
<td>تضخم الغدة الدرقية، تعب مزمن، تأخر ذهني، برودة مستمرة</td>
</tr>
<tr>
<td>فيتامين C</td>
<td>نزيف اللثة، كدمات سهلة، بطء شفاء الجروح</td>
</tr>
<tr>
<td>فيتامين ب12</td>
<td>شحوب، تعب، وخز في الأطراف، تراجع معرفي</td>
</tr>
</tbody>
</table>

<hr>

<h2>الأولويات الخمس — إذا كان التغيير يبدأ من اليوم</h2>
<ol>
<li><strong>استبدل الملح العادي بملح معالج باليود</strong> — الأثر الأكبر بأبسط تغيير</li>
<li><strong>أضف ليمونة أو طماطم لكل وجبة فول أو عدس</strong> — يُضاعف استفادتك من الحديد</li>
<li><strong>أخرج الأطفال للشمس 20 دقيقة يومياً</strong> — (بين 10 صباحاً و2 ظهراً) فيتامين د مجاناً</li>
<li><strong>وجبة كبدة أسبوعياً</strong> — تُغطي فيتامين أ والحديد والزنك وب12 في نفس الوقت</li>
<li><strong>كوب لبن أو زبادي يومياً</strong> — كالسيوم + يود + ب12 باستمرار</li>
</ol>

<p>تنويه: مكمّلات الفيتامينات والمعادن لا تُعطى إلا بتوجيه طبيب الأطفال — فالجرعة الزائدة من عدة مغذيات (فيتامين أ، فيتامين د، الحديد، اليود) تُسبّب تأثيرات سُمية موثَّقة.</p>
</div>`,
        content_en: `<div dir="ltr">
<p>This comprehensive reference consolidates precise figures derived from the Dietary Reference Intakes (DRI) issued by the Institute of Medicine (IOM), highlighting nutrient interactions that determine the difference between full and partial utilization of the same food.</p>

<hr>

<h2>Comprehensive Micronutrient Reference Table</h2>
<table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse:collapse;">
<thead>
<tr>
<th>Nutrient</th>
<th>Core Role</th>
<th>4–8 Years (RDA)</th>
<th>9–13 Years (RDA)</th>
<th>Safe Upper Limit (UL)</th>
<th>Richest Egyptian Sources</th>
</tr>
</thead>
<tbody>
<tr>
<td>Iron</td>
<td>Hemoglobin, Brain, Immunity</td>
<td>10 mg/day</td>
<td>8 mg/day</td>
<td>40 mg/day</td>
<td>Liver, Red meat, Fava beans, Lentils, Molokhia</td>
</tr>
<tr>
<td>Vitamin A</td>
<td>Immunity, Mucous membranes, Vision</td>
<td>400 mcg RAE</td>
<td>600 mcg RAE</td>
<td>900 mcg/day</td>
<td>Liver, Carrots, Sweet potatoes, Mango</td>
</tr>
<tr>
<td>Zinc</td>
<td>Growth, Immunity, 300+ Enzymes</td>
<td>5 mg/day</td>
<td>8 mg/day</td>
<td>12 mg/day</td>
<td>Red meat, Liver, Cashews, Pumpkin seeds</td>
</tr>
<tr>
<td>Calcium</td>
<td>Bones, Teeth, Nerves</td>
<td>1,000 mg/day</td>
<td>1,300 mg/day</td>
<td>2,500 mg/day</td>
<td>Milk, Cheese, Yogurt, Sardines with bones</td>
</tr>
<tr>
<td>Vitamin D</td>
<td>Calcium absorption, Bones</td>
<td>600 IU/day</td>
<td>600 IU/day</td>
<td>3,000 IU/day</td>
<td>Sunlight, Fatty fish, Egg yolks</td>
</tr>
<tr>
<td>Iodine</td>
<td>Brain, Thyroid gland, Growth</td>
<td>90 mcg/day</td>
<td>120 mcg/day</td>
<td>300 mcg/day</td>
<td>Iodized salt, Fish, Milk, Yogurt</td>
</tr>
<tr>
<td>Vitamin C</td>
<td>Immunity, Collagen, Iron absorption</td>
<td>25 mg/day</td>
<td>45 mg/day</td>
<td>650–1,200 mg/day</td>
<td>Oranges, Lemons, Peppers, Guava, Tomato</td>
</tr>
<tr>
<td>Folic Acid</td>
<td>DNA, Blood, Nervous system</td>
<td>200 mcg DFE</td>
<td>300 mcg DFE</td>
<td>400 mcg/day</td>
<td>Molokhia, Lentils, Spinach, Fortified bread</td>
</tr>
<tr>
<td>Vitamin B12</td>
<td>Nerves, Blood, DNA</td>
<td>1.2 mcg/day</td>
<td>1.8 mcg/day</td>
<td>Not established</td>
<td>Meat, Fish, Eggs, Dairy</td>
</tr>
<tr>
<td>Magnesium</td>
<td>300+ Enzymes, Muscles, Energy</td>
<td>130 mg/day</td>
<td>240 mg/day</td>
<td>110–350 mg/day</td>
<td>Nuts, Whole grains, Legumes, Vegetables</td>
</tr>
</tbody>
</table>

<hr>

<h2>Nutrient Interaction Map — The Hidden Network</h2>
<p>Understanding nutrient interactions is as important as knowing their sources — because "with what you eat it" determines "how much you absorb."</p>

<h3>Synergistic Interactions (Mutual Boosters)</h3>
<ul>
<li><strong>Vitamin C ──────→</strong> Triples non-heme iron absorption (×3)</li>
<li><strong>Vitamin D ──────→</strong> Activates calcium and phosphorus absorption</li>
<li><strong>Zinc      ──────→</strong> Produces Retinol-Binding Protein (RBP) for Vitamin A</li>
<li><strong>Vitamin A  ──────→</strong> Supports efficient iron absorption</li>
<li><strong>Probiotics ─────→</strong> Improves absorption of iron, zinc, and calcium</li>
</ul>

<h3>Competitive Interactions (Mutual Inhibitors at Excess)</h3>
<ul>
<li><strong>Calcium   ──────→</strong> Competes with iron for the intestinal transporter</li>
<li><strong>Excess Zinc ────→</strong> Reduces iron and copper absorption</li>
<li><strong>Excess Iron ────→</strong> Reduces zinc absorption</li>
<li><strong>Phytates  ──────→</strong> Inhibit iron, zinc, and calcium together</li>
<li><strong>Tannins   ──────→</strong> Selectively inhibit iron absorption</li>
</ul>

<hr>

<h2>Timing Guide — What to Serve When</h2>
<table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse:collapse;">
<thead>
<tr>
<th>Timing</th>
<th>Recommendation</th>
<th>Reason</th>
</tr>
</thead>
<tbody>
<tr>
<td>With Iron meals</td>
<td>Add Vitamin C (Lemon, Pepper, or Tomato)</td>
<td>Triples non-heme iron absorption</td>
</tr>
<tr>
<td>At least one hour after Iron</td>
<td>Tea, Coffee, and Milk</td>
<td>Tannins and Calcium inhibit absorption</td>
</tr>
<tr>
<td>With Vitamin A meals</td>
<td>Add a fat source (Olive oil, Avocado)</td>
<td>Vitamin A is fat-soluble</td>
</tr>
<tr>
<td>Vitamin D Supplement</td>
<td>With the fattiest meal</td>
<td>Absorption increases in the presence of fats</td>
</tr>
<tr>
<td>Iron Supplement</td>
<td>On an empty stomach or with orange juice</td>
<td>Highest absorption efficiency</td>
</tr>
<tr>
<td>Calcium and Iron</td>
<td>Separate meals by at least one hour</td>
<td>They compete for the same transporter</td>
</tr>
</tbody>
</table>

<hr>

<h2>Strategic Sources — Most Value for Lowest Cost</h2>
<p>Some foods cover multiple needs in a single meal — the smartest nutritional investment:</p>

<ul>
<li><strong>Beef Liver (100g weekly):</strong>
    <ul>
    <li>Vitamin A: 4,968 mcg ← Covers almost a full week's requirement</li>
    <li>Heme Iron: 6.5 mg ← 65% of daily requirement</li>
    <li>Zinc: 4 mg ← 50–80% of requirement</li>
    <li>Vitamin B12: 70 mcg ← Far exceeds requirement</li>
    </ul>
</li>
<li><strong>Canned Sardines with bones (small can weekly):</strong>
    <ul>
    <li>Calcium: 350 mg ← 35% of daily requirement</li>
    <li>Vitamin D: 8 mcg ← 80% of requirement</li>
    <li>Iodine: 35 mcg</li>
    <li>Omega-3: EPA and DHA for brain development</li>
    </ul>
</li>
<li><strong>Daily Fava Beans with Lemon:</strong>
    <ul>
    <li>Non-heme Iron: 2 mg + Vitamin C boost</li>
    <li>Folic Acid: 130 mcg ← 65% of requirement</li>
    <li>Magnesium, Plant protein, Fiber</li>
    </ul>
</li>
<li><strong>Cup of Milk + Yogurt daily:</strong>
    <ul>
    <li>Calcium: 550 mg ← 55% of requirement for ages 4–8</li>
    <li>Iodine: 160 mcg ← Covers full daily requirement</li>
    <li>Phosphorus + Protein + B12</li>
    </ul>
</li>
</ul>

<hr>

<h2>Warning Signs of Deficiency — When to Consult a Doctor</h2>
<table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse:collapse;">
<thead>
<tr>
<th>Nutrient</th>
<th>Signs of Deficiency in Children</th>
</tr>
</thead>
<tbody>
<tr>
<td>Iron</td>
<td>Paleness, lethargy, poor focus, cold extremities, Pica (eating dirt)</td>
</tr>
<tr>
<td>Vitamin A</td>
<td>Poor night vision, dry eyes, recurrent respiratory and digestive infections</td>
</tr>
<tr>
<td>Zinc</td>
<td>Loss of appetite, growth delay, poor wound healing, loss of smell</td>
</tr>
<tr>
<td>Calcium</td>
<td>Muscle cramps, brittle nails, delayed tooth eruption</td>
</tr>
<tr>
<td>Vitamin D</td>
<td>Bone pain, bowed legs, delayed walking, frequent fractures</td>
</tr>
<tr>
<td>Iodine</td>
<td>Goiter, chronic fatigue, mental delay, constant cold feeling</td>
</tr>
<tr>
<td>Vitamin C</td>
<td>Bleeding gums, easy bruising, slow wound healing</td>
</tr>
<tr>
<td>Vitamin B12</td>
<td>Paleness, fatigue, tingling in extremities, cognitive decline</td>
</tr>
</tbody>
</table>

<hr>

<h2>The Five Priorities — If Change Starts Today</h2>
<ol>
<li><strong>Switch to iodized salt</strong> — The biggest impact with the simplest change</li>
<li><strong>Add lemon or tomato to every bean or lentil meal</strong> — Doubles your iron benefit</li>
<li><strong>Expose children to sun for 20 minutes daily</strong> — (10 AM to 2 PM) free Vitamin D</li>
<li><strong>Weekly liver meal</strong> — Covers Vitamin A, Iron, Zinc, and B12 at once</li>
<li><strong>Daily cup of milk or yogurt</strong> — Continuous Calcium + Iodine + B12</li>
</ol>

<p>Disclaimer: Vitamin and mineral supplements should only be given under a pediatrician's guidance—excessive doses of several nutrients (Vitamin A, Vitamin D, Iron, Iodine) cause documented toxic effects.</p>
</div>`,
        practical_tips_ar: ['اطبع هذا الجدول المرجعي وعلّقه في مطبخك ليكون دليلك اليومي لتغذية طفلك.'],
        practical_tips_en: ['Print this reference table and hang it in your kitchen to be your daily guide for your child\'s nutrition.'],
        sources_ar: [
            'المعهد الأمريكي للطب (IOM) - الاحتياجات الغذائية المرجعية (DRI)',
            'منظمة الصحة العالمية (WHO) - التفاعلات بين المغذيات الدقيقة',
            'الأكاديميات الوطنية للعلوم والهندسة والطب (2021)',
        ],
        sources_en: [
            'Institute of Medicine (IOM) - Dietary Reference Intakes (DRI)',
            'World Health Organization (WHO) - Micronutrient Interactions',
            'National Academies of Sciences, Engineering, and Medicine (2021)',
        ],
        tags_ar: ['محور 3', 'مغذيات دقيقة', 'جدول مرجعي', 'حديد', 'كالسيوم', 'فيتامين أ', 'فيتامين د', 'زنك', 'يود', 'تفاعلات المغذيات', 'DRI'],
        tags_en: ['Axis 3', 'Micronutrients', 'Reference Table', 'Iron', 'Calcium', 'Vitamin A', 'Vitamin D', 'Zinc', 'Iodine', 'Nutrient Interactions', 'DRI'],
        meta: {
            meta_title_ar: 'ملخص المغذيات الدقيقة — جدولك المرجعي الشامل للـ DRI',
            meta_title_en: 'Micronutrient Summary — Your Comprehensive DRI Reference Table',
            meta_description_ar: 'المرجع الشامل للأرقام الدقيقة للاحتياجات الغذائية وخريطة التفاعلات بين المغذيات لضمان أقصى امتصاص لطفلك.',
            meta_description_en: 'Comprehensive reference for precise nutritional requirements and nutrient interaction map to ensure maximum absorption for your child.',
            reading_time_minutes: 10,
            og_title_ar: 'ملخص المغذيات الدقيقة — كل ما تحتاجه في جدول واحد',
            og_title_en: 'Micronutrient Summary — Everything You Need in One Table',
            og_description_ar: 'تعلم كيف تُدار التفاعلات بين المغذيات وما هي الأغذية الاستراتيجية الأرخص والأعلى قيمة لمستقبل طفلك.',
            og_description_en: 'Learn how to manage nutrient interactions and what are the cheapest, highest-value strategic foods for your child\'s future.',
        },
        imageUrl: '/images/articles/vitamins-minerals-infographic.jpg',
        category: 'micronutrients',
    },
];
