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
        title_ar: 'المفاتيح الخمسة لضمان سلامة الغذاء',
        title_en: 'The Five Keys to Safer Food',
        slug_ar: 'المفاتيح-الخمسة-لضمان-سلامة-الغذاء',
        slug_en: 'five-keys-to-safer-food',
        quick_summary_ar: [
            '600 مليون مريض سنوياً — تعلمي كيف تحمين عائلتك بالمفاتيح الخمسة العلمية',
            'دليل منظمة الصحة العالمية لتقليل حوادث التسمم الغذائي المنزلي بنسبة 80%',
            'بروتوكولات النظافة والطهي الآمن لضمان سلامة غذاء طفلك',
        ],
        quick_summary_en: [
            '600 million illnesses annually — learn how to protect your family with the five scientific keys',
            'WHO guide to reducing domestic food poisoning incidents by 80%',
            'Hygiene and safe cooking protocols to ensure your child\'s food safety',
        ],
        content_ar: `<div dir="rtl">
<p>600 مليون مريض و420,000 وفاة سنوياً — هذا الثمن الذي يدفعه العالم جرّاء الغذاء غير الآمن. والأكثر إيلاماً أن الأطفال دون الخامسة يُمثّلون 9% من سكان العالم فقط لكنهم يحملون 40% من العبء الكلي لأمراض الغذاء ويموت منهم 125,000 طفل سنوياً — وجميع هذه الوفيات قابلة للوقاية بخمس ممارسات بسيطة موثَّقة علمياً.</p>

<hr>

<h2>الإطار العلمي — لماذا هذه المفاتيح تحديداً؟</h2>
<p>برنامج "المفاتيح الخمسة للغذاء الأكثر أماناً" طوّرته منظمة الصحة العالمية بالتعاون مع منظمة الأغذية والزراعة (FAO) استناداً لتحليل مسارات نقل العدوى في أكثر من 200 نوع من الأمراض الغذائية الناجمة عن بكتيريا وفيروسات وطفيليات وسموم وكيميائيات. الدراسات أثبتت أن تطبيق هذه المبادئ بانتظام يُقلّل حوادث التسمم الغذائي المنزلي بنسبة تُجاوز 80%. تبنّت البرنامج أكثر من 130 دولة كأساس لتدريب مناولي الغذاء والتوعية الصحية الأسرية.</p>

<hr>

<h2>المفتاح الأول — الحفاظ على النظافة</h2>
<h3>العلم الكامن وراء المفتاح</h3>
<p>الكائنات الدقيقة المُسبِّبة للمرض موجودة في كل مكان — التربة، الماء، الهواء، الحيوانات، الإنسان، وجميع الأسطح التي تلامسها اليدان. المشكلة ليست وجودها — بل انتقالها من هذه البيئات إلى الطعام الذي يُؤكَل. اليدان هي الجسر الرئيسي لهذا الانتقال.</p>

<p><strong>أبرز مسارات التلوث عبر النظافة المنزلية:</strong></p>
<ul>
    <li><strong>اليدان:</strong> تنقل بكتيريا E. coli والسالمونيلا وفيروسات نورو فيروس من السطح للغذاء عبر لمسة واحدة.</li>
    <li><strong>فوط المسح والإسفنج:</strong> من أكثر الأسطح تلوثاً في المطبخ — الإسفنج الرطب بيئة مثالية لتضاعف البكتيريا كل 20 دقيقة.</li>
    <li><strong>ألواح التقطيع:</strong> تراكم الشقوق الخفية بعد الاستخدام تختبئ فيها البكتيريا وتنجو من الغسيل العادي.</li>
</ul>

<h3>بروتوكول النظافة المنزلية</h3>
<table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse:collapse;">
<thead>
    <tr>
        <th>السطح/الأداة</th>
        <th>طريقة التعقيم</th>
        <th>التكرار</th>
    </tr>
</thead>
<tbody>
    <tr>
        <td>اليدان</td>
        <td>صابون + ماء جارٍ 20 ثانية</td>
        <td>قبل وأثناء وبعد التحضير</td>
    </tr>
    <tr>
        <td>لوح التقطيع (الخشب)</td>
        <td>ماء ساخن + ملعقة صودا + شطف — ثم التعريض للشمس</td>
        <td>بعد كل وجبة</td>
    </tr>
    <tr>
        <td>لوح التقطيع (البلاستيك)</td>
        <td>غسيل عميق + محلول كلور 1:50 مع الماء</td>
        <td>أسبوعياً أو عند التلوث المحسوس</td>
    </tr>
    <tr>
        <td>إسفنجة المطبخ</td>
        <td>تبليل وتدوير في الميكروويف 2 دقيقة أو استبدال أسبوعياً</td>
        <td>يومياً (تنشيف جيد بعد الاستخدام)</td>
    </tr>
    <tr>
        <td>السطح الجرانيتي/الرخامي</td>
        <td>مسح بمحلول خل أبيض مخفّف أو منظّف مطبخ</td>
        <td>بعد كل جلسة طهي</td>
    </tr>
</tbody>
</table>

<hr>

<h2>المفتاح الثاني — الفصل بين الأطعمة النيئة والمطبوخة</h2>
<h3>التلوث المتقاطع (Cross-Contamination) — أخطر مسار في المطبخ المنزلي</h3>
<p>التلوث المتقاطع هو انتقال الكائنات الدقيقة من طعام نيء إلى طعام جاهز للأكل أو سطح سيُلامس طعاماً جاهزاً — دون أن يمر الأخير بمرحلة طهي تقتله. إنه السبب الأكثر شيوعاً لحوادث التسمم المنزلي في المطابخ الحديثة.</p>

<p><em>المثال الكلاسيكي:</em> دجاج نيء في طبق الثلاجة يقطر عصارته على صحن السلطة في الرف السفلي. السالمونيلا تنتقل من الدجاج للسلطة، والسلطة لن تُطهى — وهذا طريق مباشر للمرض.</p>

<p><strong>مسارات التلوث المتقاطع الثلاثة:</strong></p>
<ul>
    <li><strong>المباشر:</strong> طعام نيء يلمس طعاماً جاهزاً للأكل (عصارة اللحم تقطر على الخضروات).</li>
    <li><strong>عبر الأدوات:</strong> سكين قطعت بها لحماً نيئاً تُستخدَم مباشرةً لتقطيع الخبز أو الفاكهة.</li>
    <li><strong>عبر اليدين:</strong> تقطيع دجاج نيء ثم التقاط خضروات السلطة بنفس اليدين غير المغسولتين.</li>
</ul>

<h3>نظام الألوان — الحل العملي الأكثر فاعلية</h3>
<table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse:collapse;">
<thead>
    <tr>
        <th>اللون</th>
        <th>الاستخدام</th>
        <th>لماذا؟</th>
    </tr>
</thead>
<tbody>
    <tr>
        <td style="background-color: #ff0000; color: white;">أحمر</td>
        <td>اللحوم والدواجن النيئة</td>
        <td>أعلى خطر — فصل كامل</td>
    </tr>
    <tr>
        <td style="background-color: #ffff00; color: black;">أصفر</td>
        <td>الدواجن الطازجة</td>
        <td>بعض الدول تُميّزها لخطر السالمونيلا</td>
    </tr>
    <tr>
        <td style="background-color: #0000ff; color: white;">أزرق</td>
        <td>الأسماك والمأكولات البحرية</td>
        <td>حماية من التلوث البكتيري البحري</td>
    </tr>
    <tr>
        <td style="background-color: #008000; color: white;">أخضر</td>
        <td>الخضروات والفواكه</td>
        <td>ستُؤكَل نيئة في أغلب الأحيان</td>
    </tr>
    <tr>
        <td style="background-color: #ffffff; border: 1px solid #ccc;">أبيض / بيج</td>
        <td>المنتجات الألبانية والخبز</td>
        <td>أطعمة جاهزة — فصل كامل عن النيء</td>
    </tr>
</tbody>
</table>
<p><strong>في الثلاجة:</strong> اللحوم النيئة دائماً في الرف السفلي — الجاذبية تُضمن ألّا تقطر عصارتها على ما تحتها من أطعمة جاهزة.</p>

<hr>

<h2>المفتاح الثالث — اطهِ الطعام جيداً</h2>
<h3>الفيزياء والكيمياء الحرارية لقتل الجراثيم</h3>
<p>درجة 70°C (158°F) هي العتبة الحرارية العالمية الموصى بها من WHO — وعندها تُدمَّر البروتينات الهيكلية لمعظم الكائنات الدقيقة المُسبِّبة للأمراض بشكل لا رجعة فيه.</p>

<p><strong>العلاقة بين الحرارة والزمن (Time-Temperature Relationship):</strong></p>
<p>البكتيريا لا تموت فورياً — بل بشكل تراكمي. 74°C لمدة 10 ثوانٍ تُكافئ من حيث الأثر البكتيري درجات أقل لفترة أطول. هذا هو أساس "منحنى موت بكتيري" الذي يُحدده علماء سلامة الغذاء لكل كائن دقيق.</p>

<h3>جدول درجات حرارة الطهي الداخلية</h3>
<table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse:collapse;">
<thead>
    <tr>
        <th>الطعام</th>
        <th>الحرارة الداخلية المطلوبة</th>
        <th>الخطر عند الطهي الناقص</th>
    </tr>
</thead>
<tbody>
    <tr>
        <td>الدواجن كاملة</td>
        <td>82–85°C</td>
        <td>السالمونيلا، كامبيلوباكتر</td>
    </tr>
    <tr>
        <td>اللحم المفروم</td>
        <td>74°C</td>
        <td>E. coli O157:H7 (الأخطر)</td>
    </tr>
    <tr>
        <td>قطع اللحم الكبيرة</td>
        <td>63°C (+ 3 دقائق راحة)</td>
        <td>السالمونيلا، ليستيريا</td>
    </tr>
    <tr>
        <td>الأسماك</td>
        <td>63°C</td>
        <td>فيروسات وطفيليات</td>
    </tr>
    <tr>
        <td>البيض</td>
        <td>حتى يتماسك الصفار تماماً</td>
        <td>سالمونيلا</td>
    </tr>
    <tr>
        <td>إعادة تسخين الطعام</td>
        <td>74°C في المركز (حتى الغليان)</td>
        <td>بكتيريا نمت أثناء التخزين</td>
    </tr>
</tbody>
</table>
<p><strong>التحقق العملي:</strong> الميزان الحراري للطعام (Probe Thermometer) هو الأداة الأمينة الوحيدة للتحقق — اللون والملمس الظاهري لا يكفيان. الدجاج قد يبدو مطهياً من الخارج ولا يزال نيئاً عند العظم.</p>

<hr>

<h2>المفتاح الرابع — حافظ على الغذاء في درجات حرارة آمنة</h2>
<h3>منطقة الخطر الحراري (Temperature Danger Zone) — الفهم الكامل</h3>
<p>المنطقة الحمراء: بين 5°C و60°C — هي النطاق الذي تتضاعف فيه البكتيريا بشكل متسارع:</p>
<ul>
    <li><strong>5°C – 10°C:</strong> نمو بطيء جداً — التبريد يُثبّط لكن لا يقتل.</li>
    <li><strong>10°C – 21°C:</strong> نمو معتدل.</li>
    <li><strong>21°C – 47°C:</strong> نمو متسارع جداً — البكتيريا تتضاعف كل 20 دقيقة!</li>
    <li><strong>37°C:</strong> الذروة — درجة حرارة جسم الإنسان = مزرعة مثالية.</li>
    <li><strong>60°C+:</strong> معظم البكتيريا تتوقف عن التكاثر (قتل تدريجي).</li>
</ul>

<p><strong>الرقم الصادم:</strong> في الظروف المثالية، بكتيريا واحدة يمكن أن تصبح بليوناً في 10 ساعات عند 37°C. وجبة تُتركُ على الطاولة في يوم صيفي مصري (35–38°C) تُصبح خطرة في أقل من ساعتين.</p>

<h3>قواعد التخزين والتبريد</h3>
<p><strong>قاعدة الساعتين:</strong></p>
<ul>
    <li>أقل من ساعتين → آمن للتخزين في الثلاجة</li>
    <li>ساعتان إلى أربع → منطقة خطر — ضعه في الثلاجة فوراً</li>
    <li>أكثر من أربع ساعات → تخلص منه</li>
</ul>
<p><strong>قاعدة الساعة الواحدة للصيف المصري:</strong> في أجواء تتجاوز 32°C (كما هو شائع في القاهرة والصعيد)، تُقلَّص قاعدة الساعتين إلى ساعة واحدة فقط.</p>

<table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse:collapse;">
<thead>
    <tr>
        <th>الطعام</th>
        <th>مدة الحفظ الآمنة في الثلاجة (≤ 4°C)</th>
        <th>مدة الحفظ في الفريزر (≤ -18°C)</th>
    </tr>
</thead>
<tbody>
    <tr>
        <td>لحم مطبوخ</td>
        <td>3–4 أيام</td>
        <td>2–3 أشهر</td>
    </tr>
    <tr>
        <td>دواجن مطبوخة</td>
        <td>3–4 أيام</td>
        <td>4 أشهر</td>
    </tr>
    <tr>
        <td>بيض مطبوخ</td>
        <td>3–5 أيام</td>
        <td>لا يُجمَّد</td>
    </tr>
    <tr>
        <td>شوربات ومرق</td>
        <td>3–4 أيام</td>
        <td>2–3 أشهر</td>
    </tr>
    <tr>
        <td>أرز وعدس مطبوخ</td>
        <td>3–5 أيام</td>
        <td>شهر واحد</td>
    </tr>
    <tr>
        <td>فواكه مقطّعة</td>
        <td>يوم واحد–3 أيام</td>
        <td>8–12 شهراً (بعد التبييض)</td>
    </tr>
</tbody>
</table>
<p><strong>تنبيه الليستيريا:</strong> على عكس معظم البكتيريا، ليستيريا مونوسيتوجينس تنمو ببطء حتى في درجات الثلاجة بين 0 و4°C — مما يجعل المأكولات الجاهزة طويلة التخزين في الثلاجة كالجبن الطري والسلامي خطرةً عند الأطفال والحوامل حتى مع التبريد.</p>

<hr>

<h2>المفتاح الخامس — استخدم المياه والمواد الخام الآمنة</h2>
<h3>مسارات التلوث في المواد الخام</h3>
<p>المواد الخام قد تكون ملوّثة عند المصدر قبل وصولها للمطبخ:</p>
<ul>
    <li><strong>المياه:</strong> الكوليرا، التيفويد، الكريبتوسبوريديوم، Hepatitis A — تنتقل جميعها عبر مياه ملوّثة.</li>
    <li><strong>الخضروات والفواكه:</strong> سماد عضوي ملوّث، مياه ري من مصادر ملوّثة، إضافة كيميائيات مبيدات.</li>
    <li><strong>الحليب غير المبستر:</strong> بروسيلا، ليستيريا، سالمونيلا، Campylobacter.</li>
    <li><strong>البيض:</strong> السالمونيلا داخل القشرة وعلى سطحها.</li>
    <li><strong>الفواكه التالفة:</strong> العفن يُنتج السموم الفطرية (Mycotoxins) — أفلاتوكسين، أوكراتوكسين — وهي سموم مُسرطِنة لا تُقتل بالطهي.</li>
</ul>

<h3>دليل اختيار المواد الخام الآمنة</h3>
<p><strong>المياه — الاحتياطات الأساسية في مصر:</strong></p>
<ul>
    <li>استخدام مياه مفلترة أو مغليّة للشرب وتحضير الطعام للأطفال.</li>
    <li>الثلج الذي يُضاف للمشروبات يجب أن يصنَّع من مياه آمنة (ثلج الشارع مجهول المصدر خطر).</li>
</ul>

<p><strong>الخضروات والفواكه:</strong></p>
<ul>
    <li>الغسيل تحت ماء جارٍ + فرك للأسطح الصلبة.</li>
    <li>نزع الأجزاء التالفة أو العفنة كاملةً — العفن يمتد في الأنسجة أعمق مما يبدو بصرياً.</li>
    <li>الفاكهة المُقشَّرة تُغسل قبل التقشير.</li>
</ul>

<p><strong>تاريخ الصلاحية — الفرق بين نوعين:</strong></p>
<table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse:collapse;">
<thead>
    <tr>
        <th>الكود</th>
        <th>المعنى الدقيق</th>
        <th>هل يُؤكل بعده؟</th>
    </tr>
</thead>
<tbody>
    <tr>
        <td>Best Before (يُفضَّل قبل)</td>
        <td>الجودة الحسية (طعم/قوام) تبدأ بالتراجع</td>
        <td>يمكن تناوله مع تقييم حسي</td>
    </tr>
    <tr>
        <td>Use By (يُستهلَك قبل)</td>
        <td>سلامة الغذاء مضمونة حتى هذا التاريخ</td>
        <td>No — خطر الأمراض بعده</td>
    </tr>
    <tr>
        <td>Expiry Date (تاريخ الانتهاء)</td>
        <td>نفس "Use By" في معظم التشريعات</td>
        <td>No — تخلص منه فوراً</td>
    </tr>
</tbody>
</table>

<hr>

<h2>الجدول المرجعي الشامل — المفاتيح الخمسة في المطبخ المصري</h2>
<table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse:collapse;">
<thead>
    <tr>
        <th>المفتاح</th>
        <th>الممارسة الصحيحة اليومية</th>
        <th>الخطر المحدد الذي تمنعه</th>
    </tr>
</thead>
<tbody>
    <tr>
        <td>النظافة</td>
        <td>20 ثانية صابون + فوطة مطبخ يومية + تعقيم ألواح التقطيع أسبوعياً</td>
        <td>E. coli، السالمونيلا، نوروفيروس</td>
    </tr>
    <tr>
        <td>الفصل</td>
        <td>لوح أحمر للحوم، أخضر للخضار؛ لحوم نيئة في الرف السفلي</td>
        <td>السالمونيلا، ليستيريا، كامبيلوباكتر</td>
    </tr>
    <tr>
        <td>الطهي الجيد</td>
        <td>ميزان حراري؛ 74–85°C للدواجن؛ غليان عند إعادة التسخين</td>
        <td>جميع البكتيريا الحرارية الحساسة</td>
    </tr>
    <tr>
        <td>التخزين الآمن</td>
        <td>ساعتان خارج الثلاجة حداً أقصى؛ ثلاجة ≤ 4°C؛ فريزر ≤ -18°C</td>
        <td>منع تضاعف البكتيريا في منطقة الخطر الحراري</td>
    </tr>
    <tr>
        <td>مواد خام آمنة</td>
        <td>مياه مفلترة للأطفال؛ حليب مبستر؛ فحص الصلاحية؛ غسيل الخضروات</td>
        <td>الكوليرا، التيفويد، الأفلاتوكسين، بروسيلا</td>
    </tr>
</tbody>
</table>

<p><strong>الخلاصة العملية:</strong> الأمراض الغذائية ليست حظاً سيئاً — بل هي في معظمها نتيجة خطأ يمكن تفاديه. يموت 33 مليون سنة من الأعمار الصحية سنوياً بسبب تناول غذاء غير آمن — وكل منزل يُطبّق هذه المفاتيح يُنقذ أفراده من نسبة ضخمة من هذا العبء.</p>
</div>`,
        content_en: `<div dir="ltr">
<p>600 million illnesses and 420,000 deaths annually — this is the price the world pays for unsafe food. Most distressing is that children under five represent only 9% of the world's population but carry 40% of the total foodborne disease burden, with 125,000 children dying every year — all of these deaths are preventable through five simple, scientifically documented practices.</p>

<hr>

<h2>Scientific Framework — Why These Specific Keys?</h2>
<p>The "Five Keys to Safer Food" program was developed by the World Health Organization (WHO) in collaboration with the Food and Agriculture Organization (FAO) based on an analysis of transmission routes for over 200 types of foodborne diseases caused by bacteria, viruses, parasites, toxins, and chemicals. Studies have shown that consistent application of these principles reduces domestic food poisoning incidents by over 80%. More than 130 countries have adopted the program as the basis for training food handlers and family health awareness.</p>

<hr>

<h2>Key 1 — Keep Clean</h2>
<h3>The Science Behind the Key</h3>
<p>Pathogenic microorganisms are everywhere — in soil, water, air, animals, humans, and all surfaces touched by hands. The problem is not their existence, but their transfer from these environments to the food we eat. Hands are the primary bridge for this transfer.</p>

<p><strong>Major Contamination Routes in Home Hygiene:</strong></p>
<ul>
    <li><strong>Hands:</strong> Transfer E. coli, Salmonella, and Norovirus from surfaces to food in a single touch.</li>
    <li><strong>Dishcloths and Sponges:</strong> Among the most contaminated surfaces in the kitchen — damp sponges are an ideal environment for bacteria to double every 20 minutes.</li>
    <li><strong>Cutting Boards:</strong> Micro-cracks that accumulate after use hide bacteria and protect them from normal washing.</li>
</ul>

<h3>Domestic Hygiene Protocol</h3>
<table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse:collapse;">
<thead>
    <tr>
        <th>Surface/Tool</th>
        <th>Disinfection Method</th>
        <th>Frequency</th>
    </tr>
</thead>
<tbody>
    <tr>
        <td>Hands</td>
        <td>Soap + Running water for 20 seconds</td>
        <td>Before, during, and after preparation</td>
    </tr>
    <tr>
        <td>Cutting Board (Wood)</td>
        <td>Hot water + baking soda + rinse — then sun exposure</td>
        <td>After every meal</td>
    </tr>
    <tr>
        <td>Cutting Board (Plastic)</td>
        <td>Deep wash + 1:50 chlorine solution with water</td>
        <td>Weekly or when perceptibly soiled</td>
    </tr>
    <tr>
        <td>Kitchen Sponge</td>
        <td>Wetting and rotating in microwave for 2 mins or weekly replacement</td>
        <td>Daily (dry well after use)</td>
    </tr>
    <tr>
        <td>Granite/Marble Surface</td>
        <td>Wipe with diluted white vinegar solution or kitchen cleaner</td>
        <td>After every cooking session</td>
    </tr>
</tbody>
</table>

<hr>

<h2>Key 2 — Separate Raw and Cooked</h2>
<h3>Cross-Contamination — The Most Dangerous Route in the Home Kitchen</h3>
<p>Cross-contamination is the transfer of microorganisms from raw food to ready-to-eat food or a surface that will touch ready-to-eat food — without the latter undergoing a killing cook stage. It is the most common cause of domestic poisoning incidents in modern kitchens.</p>

<p><em>Classic Example:</em> Raw chicken in a refrigerator dish dripping juice onto a salad bowl on the lower shelf. Salmonella transfers from the chicken to the salad, which will not be cooked — this is a direct path to illness.</p>

<p><strong>Three Cross-Contamination Routes:</strong></p>
<ul>
    <li><strong>Direct:</strong> Raw food touches ready-to-eat food (meat juice dripping on vegetables).</li>
    <li><strong>Via Tools:</strong> A knife used to cut raw meat is used directly to cut bread or fruit.</li>
    <li><strong>Via Hands:</strong> Cutting raw chicken then picking up salad vegetables with the same unwashed hands.</li>
</ul>

<h3>Color-Coding System — The Most Effective Practical Solution</h3>
<table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse:collapse;">
<thead>
    <tr>
        <th>Color</th>
        <th>Usage</th>
        <th>Why?</th>
    </tr>
</thead>
<tbody>
    <tr>
        <td style="background-color: #ff0000; color: white;">Red</td>
        <td>Raw Meat and Poultry</td>
        <td>Highest risk — full separation</td>
    </tr>
    <tr>
        <td style="background-color: #ffff00; color: black;">Yellow</td>
        <td>Fresh Poultry</td>
        <td>Distinguished by some countries due to Salmonella risk</td>
    </tr>
    <tr>
        <td style="background-color: #0000ff; color: white;">Blue</td>
        <td>Fish and Seafood</td>
        <td>Protection from marine bacterial contamination</td>
    </tr>
    <tr>
        <td style="background-color: #008000; color: white;">Green</td>
        <td>Vegetables and Fruits</td>
        <td>Most often eaten raw</td>
    </tr>
    <tr>
        <td style="background-color: #ffffff; border: 1px solid #ccc;">White / Beige</td>
        <td>Dairy Products and Bread</td>
        <td>Ready-to-eat foods — full separation from raw</td>
    </tr>
</tbody>
</table>
<p><strong>In the Refrigerator:</strong> Raw meats always on the bottom shelf — gravity ensures juices don't drip on ready-to-eat foods below.</p>

<hr>

<h2>Key 3 — Cook Thoroughly</h2>
<h3>The Thermal Physics and Chemistry of Killing Germs</h3>
<p>70°C (158°F) is the global thermal threshold recommended by the WHO — at which structural proteins of most pathogenic microorganisms are irreversibly destroyed.</p>

<p><strong>Time-Temperature Relationship:</strong></p>
<p>Bacteria do not die instantly — they die cumulatively. 74°C for 10 seconds is equivalent in bacterial impact to lower temperatures for longer periods. This is the basis of the "Bacterial Death Curve" defined by food safety scientists for each microorganism.</p>

<h3>Internal Cooking Temperature Table</h3>
<table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse:collapse;">
<thead>
    <tr>
        <th>Food</th>
        <th>Required Internal Temp</th>
        <th>Risk if Undercooked</th>
    </tr>
</thead>
<tbody>
    <tr>
        <td>Whole Poultry</td>
        <td>82–85°C</td>
        <td>Salmonella, Campylobacter</td>
    </tr>
    <tr>
        <td>Ground Meat</td>
        <td>74°C</td>
        <td>E. coli O157:H7 (Most dangerous)</td>
    </tr>
    <tr>
        <td>Large Meat Cuts</td>
        <td>63°C (+ 3 min rest)</td>
        <td>Salmonella, Listeria</td>
    </tr>
    <tr>
        <td>Fish</td>
        <td>63°C</td>
        <td>Viruses and Parasites</td>
    </tr>
    <tr>
        <td>Eggs</td>
        <td>Until yolk is completely firm</td>
        <td>Salmonella</td>
    </tr>
    <tr>
        <td>Reheating Food</td>
        <td>74°C at center (until boiling)</td>
        <td>Bacteria grown during storage</td>
    </tr>
</tbody>
</table>
<p><strong>Practical Verification:</strong> A probe thermometer is the only reliable tool for verification — color and texture are not enough. Chicken may look cooked on the outside while still raw at the bone.</p>

<hr>

<h2>Key 4 — Keep Food at Safe Temperatures</h2>
<h3>Temperature Danger Zone — Full Understanding</h3>
<p>The Red Zone: Between 5°C and 60°C — the range where bacteria multiply rapidly:</p>
<ul>
    <li><strong>5°C – 10°C:</strong> Very slow growth — refrigeration inhibits but does not kill.</li>
    <li><strong>10°C – 21°C:</strong> Moderate growth.</li>
    <li><strong>21°C – 47°C:</strong> Very rapid growth — bacteria double every 20 minutes!</li>
    <li><strong>37°C:</strong> Peak — human body temperature = ideal culture medium.</li>
    <li><strong>60°C+:</strong> Most bacteria stop multiplying (gradual death).</li>
</ul>

<p><strong>Shocking Figure:</strong> Under ideal conditions, a single bacterium can become a billion in 10 hours at 37°C. A meal left on the table on a summer day in Egypt (35–38°C) becomes dangerous in less than two hours.</p>

<h3>Storage and Cooling Rules</h3>
<p><strong>The Two-Hour Rule:</strong></p>
<ul>
    <li>Less than 2 hours → Safe for refrigerator storage</li>
    <li>2 to 4 hours → Danger zone — place in refrigerator immediately</li>
    <li>More than 4 hours → Discard</li>
</ul>
<p><strong>One-Hour Rule for Egyptian Summer:</strong> In temperatures exceeding 32°C (common in Cairo and Upper Egypt), the two-hour rule is reduced to just one hour.</p>

<table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse:collapse;">
<thead>
    <tr>
        <th>Food</th>
        <th>Safe Fridge Life (≤ 4°C)</th>
        <th>Safe Freezer Life (≤ -18°C)</th>
    </tr>
</thead>
<tbody>
    <tr>
        <td>Cooked Meat</td>
        <td>3–4 days</td>
        <td>2–3 months</td>
    </tr>
    <tr>
        <td>Cooked Poultry</td>
        <td>3–4 days</td>
        <td>4 months</td>
    </tr>
    <tr>
        <td>Cooked Eggs</td>
        <td>3–5 days</td>
        <td>Do not freeze</td>
    </tr>
    <tr>
        <td>Soups and Broths</td>
        <td>3–4 days</td>
        <td>2–3 months</td>
    </tr>
    <tr>
        <td>Cooked Rice/Lentils</td>
        <td>3–5 days</td>
        <td>1 month</td>
    </tr>
    <tr>
        <td>Cut Fruits</td>
        <td>1–3 days</td>
        <td>8–12 months (after blanching)</td>
    </tr>
</tbody>
</table>
<p><strong>Listeria Alert:</strong> Unlike most bacteria, Listeria monocytogenes grows slowly even at refrigerator temperatures between 0 and 4°C — making long-stored ready-to-eat foods like soft cheese and salami dangerous for children and pregnant women even with cooling.</p>

<hr>

<h2>Key 5 — Use Safe Water and Raw Materials</h2>
<h3>Contamination Routes in Raw Materials</h3>
<p>Raw materials may be contaminated at the source before reaching the kitchen:</p>
<ul>
    <li><strong>Water:</strong> Cholera, Typhoid, Cryptosporidium, Hepatitis A — all transmitted through contaminated water.</li>
    <li><strong>Vegetables and Fruits:</strong> Contaminated organic fertilizer, irrigation from polluted sources, chemical pesticide residues.</li>
    <li><strong>Unpasteurized Milk:</strong> Brucella, Listeria, Salmonella, Campylobacter.</li>
    <li><strong>Eggs:</strong> Salmonella inside and on the surface of the shell.</li>
    <li><strong>Damaged Fruits:</strong> Molds produce Mycotoxins — Aflatoxin, Ochratoxin — which are carcinogenic toxins not killed by cooking.</li>
</ul>

<h3>Guide to Selecting Safe Raw Materials</h3>
<p><strong>Water — Essential Precautions in Egypt:</strong></p>
<ul>
    <li>Use filtered or boiled water for drinking and preparing child food.</li>
    <li>Ice added to drinks must be made from safe water (street ice of unknown source is dangerous).</li>
</ul>

<p><strong>Vegetables and Fruits:</strong></p>
<ul>
    <li>Wash under running water + scrub firm surfaces.</li>
    <li>Remove damaged or moldy parts completely — mold extends deeper into tissues than visible.</li>
    <li>Wash peeled fruit before peeling.</li>
</ul>

<p><strong>Shelf Life — Difference between two types:</strong></p>
<table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse:collapse;">
<thead>
    <tr>
        <th>Code</th>
        <th>Precise Meaning</th>
        <th>Eat After?</th>
    </tr>
</thead>
<tbody>
    <tr>
        <td>Best Before</td>
        <td>Sensory quality (taste/texture) begins to decline</td>
        <td>Can be consumed after sensory evaluation</td>
    </tr>
    <tr>
        <td>Use By</td>
        <td>Food safety guaranteed until this date</td>
        <td>No — risk of illness after</td>
    </tr>
    <tr>
        <td>Expiry Date</td>
        <td>Same as "Use By" in most legislations</td>
        <td>No — discard immediately</td>
    </tr>
</tbody>
</table>

<hr>

<h2>Comprehensive Reference Table — Five Keys in the Egyptian Kitchen</h2>
<table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse:collapse;">
<thead>
    <tr>
        <th>Key</th>
        <th>Correct Daily Practice</th>
        <th>Specific Risk Prevented</th>
    </tr>
</thead>
<tbody>
    <tr>
        <td>Hygiene</td>
        <td>20 seconds soap + daily dishcloth + weekly board disinfection</td>
        <td>E. coli, Salmonella, Norovirus</td>
    </tr>
    <tr>
        <td>Separation</td>
        <td>Red board for meat, green for veg; raw meat on bottom shelf</td>
        <td>Salmonella, Listeria, Campylobacter</td>
    </tr>
    <tr>
        <td>Thorough Cooking</td>
        <td>Probe thermometer; 74–85°C for poultry; boiling for reheating</td>
        <td>All heat-sensitive pathogens</td>
    </tr>
    <tr>
        <td>Safe Storage</td>
        <td>Max 2 hours outside; Fridge ≤ 4°C; Freezer ≤ -18°C</td>
        <td>Prevents bacterial multiplication in the Danger Zone</td>
    </tr>
    <tr>
        <td>Safe Raw Materials</td>
        <td>Filtered water for children; Pasteurized milk; Expiry check; Veg washing</td>
        <td>Cholera, Typhoid, Aflatoxin, Brucella</td>
    </tr>
</tbody>
</table>

<p><strong>Practical Conclusion:</strong> Foodborne diseases are not bad luck — they are mostly the result of avoidable errors. 33 million years of healthy life are lost annually due to unsafe food — every home applying these keys saves its members from a huge proportion of this burden.</p>
</div>`,
        sources_ar: [
            'WHO. (2026). Five keys to safer food manual. WHO.',
        ],
        sources_en: [
            'WHO. (2026). Five keys to safer food manual. WHO.',
        ],
        tags_ar: ['سلامة الغذاء', 'المفاتيح الخمسة', 'نظافة الغذاء', 'وقاية الأطفال'],
        tags_en: ['Food Safety', 'Five Keys', 'Food Hygiene', 'Child Protection'],
        meta: {
            meta_title_ar: 'المفاتيح الخمسة لضمان سلامة الغذاء',
            meta_title_en: 'The Five Keys to Safer Food',
            meta_description_ar: 'تعرفي على الممارسات الخمس الأساسية لضمان سلامة غذاء طفلك وحماية أسرتك.',
            meta_description_en: 'Learn the five essential practices to ensure your child\'s food safety and protect your family.',
            reading_time_minutes: 5,
            og_title_ar: 'المفاتيح الخمسة لضمان سلامة الغذاء',
            og_title_en: 'The Five Keys to Safer Food',
            og_description_ar: 'تعرفي على الممارسات الخمس الأساسية لضمان سلامة غذاء طفلك.',
            og_description_en: 'Learn the five essential practices to ensure your child\'s food safety.',
        },
        imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80',
        category: 'foodSafety',
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
<p>نظام HACCP (Hazard Analysis and Critical Control Points — تحليل المخاطر ونقاط التحكم الحرجة) ليس مجرد بروتوكول بيروقراطي للمصانع — بل هو منهج علمي وقائي جوهره فكرة بسيطة وعميقة في آنٍ معاً: الوقاية أولى من العلاج، وتحديد المشكلة قبل حدوثها أفضل بكثير من معالجتها بعد وقوعها. مبادئه قابلة للتكيّف مع المطبخ المنزلي بفاعلية مُثبتة علمياً.</p>

<hr>

<h2>السياق التاريخي — من الفضاء إلى مطبخك</h2>
<p>ظهر نظام HACCP في الستينيات على يد علماء NASA وشركة Pillsbury لضمان سلامة الغذاء المُرسَل للفضاء — إذ كان تلوّث الطعام في رحلة فضائية كارثةً غير قابلة للمعالجة. اعتمدته لاحقاً الـ FDA رسمياً في التسعينيات، ثم أصبح المعيار الدولي الإلزامي لصناعة الغذاء في معظم دول العالم. وما يجعله صالحاً للمنزل هو أن المبادئ السبعة التي يقوم عليها ليست مُقيَّدة بالحجم أو الطاقة الإنتاجية — بل هي عملية تفكير منهجية في المخاطر يمكن لأي شخص تطبيقها.</p>

<hr>

<h2>المبادئ السبعة لنظام HACCP — الإطار العلمي الكامل</h2>
<p>يقوم النظام على سبعة مبادئ متتالية يبني كلٌّ منها على سابقه:</p>

<table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse:collapse;">
<thead><tr><th>المبدأ</th><th>المحتوى</th></tr></thead>
<tbody>
<tr><td>١. تحليل المخاطر</td><td>تحديد جميع المخاطر البيولوجية والكيميائية والفيزيائية المحتملة في كل مرحلة</td></tr>
<tr><td>٢. تحديد نقاط التحكم الحرجة (CCPs)</td><td>تحديد المراحل التي يمكن فيها السيطرة الفعّالة على المخاطر أو القضاء عليها</td></tr>
<tr><td>٣. وضع الحدود الحرجة</td><td>تحديد القيم القابلة للقياس (درجة حرارة، وقت، pH) التي يجب الوصول إليها عند كل نقطة تحكم</td></tr>
<tr><td>٤. إجراءات المراقبة</td><td>كيف وبأي تكرار يُراقَب الالتزام بالحدود الحرجة</td></tr>
<tr><td>٥. الإجراءات التصحيحية</td><td>ماذا يُفعل إذا لم تُستوفَ الحدود الحرجة في نقطة ما</td></tr>
<tr><td>٦. التحقق والمراجعة</td><td>التأكد الدوري من أن النظام يعمل بشكل صحيح وفعّال</td></tr>
<tr><td>٧. التوثيق والسجلات</td><td>الاحتفاظ بسجلات موثَّقة لكل مرحلة للمراجعة والتحسين المستمر</td></tr>
</tbody>
</table>

<p>في المطبخ المنزلي، لا نحتاج إلى تطبيق المبادئ السبعة بصيغتها الرسمية البيروقراطية — لكن المبادئ الأولى الخمسة قابلة للتطبيق الفوري بمنطقها العملي دون توثيق رسمي.</p>

<hr>

<h2>أنواع المخاطر الثلاثة — فهم العدو قبل مواجهته</h2>

<h3>أولاً: المخاطر البيولوجية — الأخطر والأكثر شيوعاً</h3>
<p>المخاطر البيولوجية هي مسببات الأمراض الحيّة (بكتيريا، فيروسات، طفيليات) التي تتكاثر في ظروف معينة وتُفرز سموماً تُصيب الجهاز الهضمي والجهاز العصبي وأعضاء أخرى. أبرز مسبّبات الأمراض الغذائية للأطفال:</p>

<table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse:collapse;">
<thead><tr><th>الكائن الدقيق</th><th>المصدر الرئيسي</th><th>الأعراض الرئيسية</th><th>درجة الحرارة القاتلة له</th></tr></thead>
<tbody>
<tr><td>Salmonella</td><td>الدجاج النيء، البيض، منتجات الألبان غير المبسترة</td><td>إسهال، حمى، قيء (6–72 ساعة)</td><td>74°م</td></tr>
<tr><td>E. coli (O157:H7)</td><td>اللحم المفروم النيء، العصائر غير المبسترة</td><td>إسهال دموي، فشل كلوي (2–8 أيام)</td><td>71°م</td></tr>
<tr><td>Listeria monocytogenes</td><td>الجبن الطري، اللحوم المُصنَّعة، الأسماك المدخّنة</td><td>تسمم دم، التهاب سحايا، خطر على الحوامل والأطفال</td><td>74°م (ويتكاثر في الثلاجة)</td></tr>
<tr><td>Staphylococcus aureus</td><td>ينتقل من يدي مُعدِّ الطعام (الجروح المُصابة)</td><td>قيء شديد خلال 1–6 ساعات</td><td>السم يتحمّل الحرارة — الوقاية بالنظافة الشخصية فقط</td></tr>
<tr><td>Norovirus</td><td>مياه ملوّثة، مأكولات بحرية نيئة</td><td>قيء وإسهال مفاجئ وشديد</td><td>63°م مع غسل اليدين الجيد</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>تحذير خاص بـ Listeria:</strong> هي الوحيدة التي تتكاثر بشكل فعّال في درجات حرارة الثلاجة (حتى 4°م)، مما يعني أن مجرد التبريد لا يكفي لمنعها. الحل: احترام مُدد صلاحية المنتجات داخل الثلاجة بدقة.</p>
</blockquote>

<hr>

<h3>ثانياً: المخاطر الكيميائية — الخطر الصامت</h3>

<h4>أ. الأفلاتوكسين (Aflatoxin) — السم الفطري الأشد خطورة على الأطفال</h4>
<p>الأفلاتوكسين هو مجموعة سموم تُفرزها فطريات جنس Aspergillus التي تنمو على الحبوب والمكسرات وبذور الزيت المخزنة في رطوبة عالية أو حرارة مرتفعة. النوع الأخطر هو AFB1 الذي يُمثّل 75% من حالات التلوث الغذائي بالأفلاتوكسين. ما يجعله خاصاً بالأطفال:</p>
<ul>
<li><strong>تأثير على النمو:</strong> تتبّطئ تخليق البروتين مما يُسبّب قِصَر القامة وتأخر النمو لدى الأطفال دون الخامسة.</li>
<li><strong>تأثير على الدماغ:</strong> ربطت دراسة طولية في مالاوي بين التعرض للأفلاتوكسين في الرضاعة وصغر محيط الرأس بشكل مستمر حتى ما بعد عمر السنتين — مما يعني تأثيراً مباشراً على حجم الدماغ.</li>
<li><strong>تأثير مناعي:</strong> يُضعف مقاومة الطفل للأمراض المعدية بشكل موثَّق.</li>
<li><strong>خطر سرطاني طويل المدى:</strong> AFB1 مُصنَّف كمادة مُسرطنة من الفئة الأولى من قِبَل IARC مع ارتباطه بسرطان الكبد.</li>
</ul>

<p><strong>أين يتواجد في المطبخ؟</strong></p>
<ul>
<li>الفول السوداني وزبدته المخزنة في بيئة رطبة أو حارة.</li>
<li>الذرة والقمح المُخزَّن بشكل خاطئ.</li>
<li>البهارات القديمة (فلفل أحمر، كمون، كركم) التي تجاوزت مدة صلاحيتها.</li>
</ul>

<p><strong>كيف تحمي طفلك؟</strong></p>
<ul>
<li>تخزين المكسرات والحبوب في أوعية محكمة الإغلاق في مكان بارد وجاف.</li>
<li>عدم استخدام ما يظهر عليه عفن أو تغيّر لون — حتى بعد إزالة الجزء المُتعفّن، قد تكون السموم قد انتشرت في المنتج كاملاً.</li>
<li>شراء كميات صغيرة متجددة بدلاً من التخزين طويل الأمد.</li>
</ul>

<h4>ب. بقايا المبيدات الحشرية</h4>
<p>الفواكه والخضروات قد تحمل بقايا مبيدات على قشرتها. الغسيل بالماء الجاري يُزيل جزءاً كبيراً منها، أما الأنواع ذات القشرة الخشنة (الفراولة، العنب، التفاح) فتحتاج فرشاة تنظيف أو نقع لمدة دقيقة في ماء مع ملعقة صغيرة من بيكربونات الصوديوم.</p>

<h4>ج. مواد التنظيف</h4>
<p>بقايا سائل الجلي أو المطهّرات على الأدوات قد تنتقل للطعام. الشطف الجيد بالماء النظيف بعد التنظيف ضروري، مع الحرص على عدم استخدام نفس القماشة لتنظيف أسطح التحضير والأسطح الأخرى.</p>

<hr>

<h3>ثالثاً: المخاطر الفيزيائية — الأقل شيوعاً والأكثر ووضوحاً</h3>
<ul>
<li>شظايا العظام في اللحوم المطحونة أو المفرومة.</li>
<li>بذور وعظمات الفاكهة (الزيتون، المشمش، البرقوق) — خطرة على الأطفال الصغار.</li>
<li>شظايا أدوات الطبخ المكسورة (قشور أدوات الألومنيوم، شظايا شوّاية).</li>
<li>حصى صغيرة في الأرز والعدس والبقوليات قبل الغسيل.</li>
</ul>

<hr>

<h2>نقاط التحكم الحرجة في المطبخ المنزلي — التطبيق الفعلي</h2>

<pre style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 8px; direction: ltr; text-align: left;">
الشراء → التخزين → التحضير → الطهي → التقديم → البقايا
   ↓          ↓          ↓          ↓          ↓          ↓
[CCP 1]    [CCP 2]    [CCP 3]    [CCP 4]    [CCP 5]    [CCP 6]
</pre>

<table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse:collapse;">
<thead><tr><th>المخطر</th><th>الحدّ الحرج</th><th>إجراء التحكم</th></tr></thead>
<tbody>
<tr><td>CCP 1 — الشراء</td><td>تاريخ الصلاحية</td><td>لا يُشترى ما أوشك أو تجاوز تاريخه</td></tr>
<tr><td>CCP 1 — الشراء</td><td>سلسلة التبريد</td><td>شراء المبرّدات آخراً في جولة التسوق</td></tr>
<tr><td>CCP 1 — الشراء</td><td>السلامة المرئية</td><td>رفض أي عبوة تالفة أو منتفخة</td></tr>
<tr><td>CCP 2 — التخزين</td><td>درجة الحرارة هي الحد الحرج</td><td>الثلاجة &le; 4°م؛ التوزيع الصحيح يمنع التلوث المتبادل</td></tr>
<tr><td>CCP 3 — التحضير</td><td>التلوث المتبادل</td><td>تأكيد غياب التلامس بين النيء والجاهز</td></tr>
<tr><td>CCP 4 — الطهي</td><td>درجة الحرارة الداخلية</td><td>الوصول للحد الحرج (74°م للدواجن) باستخدام مقياس حرارة</td></tr>
<tr><td>CCP 5 — التقديم</td><td>نافذة الأمان ساعتان</td><td>لا يترك في درجة حرارة الغرفة أكثر من ساعتين</td></tr>
<tr><td>CCP 6 — البقايا</td><td>التبريد السريع</td><td>تبريد البقايا فوراً &le; ساعتين وإعادة تسخينها لـ 74°م</td></tr>
</tbody>
</table>

<hr>

<h2>HACCP المنزلي — نموذج تطبيقي لوجبة دجاج</h2>
<ul>
<li><strong>الشراء:</strong> تحقق من التاريخ + برودة الدجاج + سلامة التغليف.</li>
<li><strong>التخزين:</strong> رف الثلاجة الأسفل في كيس مغلق &lt; 4°م.</li>
<li><strong>التحضير:</strong> لوح أصفر + سكين مخصص + غسل يدين قبل وبعد.</li>
<li><strong>الطهي:</strong> قياس درجة الحرارة الداخلية &ge; 74°م.</li>
<li><strong>التقديم:</strong> لا يبقى خارج الثلاجة أكثر من ساعتين.</li>
<li><strong>البقايا:</strong> في الثلاجة فوراً + إعادة تسخين &ge; 74°م.</li>
</ul>
</div>`,
        content_en: `<div dir="ltr">
<h2>Applying HACCP in Your Kitchen</h2>
<p>Learn how to apply industrial-grade safety standards at home. Identify and control biological, chemical, and physical food hazards through the 7 HACCP principles adapted for your domestic kitchen.</p>
</div>`,
        practical_tips_ar: [
            'استخدمي نظام الألوان لألواح التقطيع (أحمر للحم، أخضر للخضار) كإجراء تحكم حرجي (CCP) بسيط وفعال.',
            'تخلصي من أي مكسرات أو حبوب تظهر عليها علامات عفن فوراً، لا تكتفي بإزالة الجزء التالف.',
            'احتفظي بمقياس حرارة طعام صغير للتأكد من وصول اللحوم لدرجات الحرارة القاتلة للجراثيم.'
        ],
        practical_tips_en: [
            'Use a color-coded chopping board system (Red for meat, Green for veg) as a simple CCP.',
            'Discard any nuts or grains with visible mold immediately; toxins spread through the whole product.',
            'Keep a food thermometer to ensure meats reach critical target temperatures.'
        ],
        sources_ar: [
            'U.S. FDA. (2024). HACCP Principles & Application Guidelines.',
            'WHO. (2024). Mycotoxins Fact Sheet.',
        ],
        sources_en: [
            'U.S. FDA. (2024). HACCP Principles & Application Guidelines.',
            'WHO. (2024). Mycotoxins Fact Sheet.',
        ],
        tags_ar: ['HACCP', 'سلامة الغذاء', 'المخاطر البيولوجية', 'التلوث المتبادل'],
        tags_en: ['HACCP', 'Food Safety', 'Biological Hazards', 'Cross-contamination'],
        meta: {
            meta_title_ar: 'مبادئ HACCP في مطبخك — حماية علمية لعائلتك',
            meta_title_en: 'HACCP Principles in Your Kitchen',
            meta_description_ar: 'تعرفي على نظام HACCP لحماية أسرتك من مخاطر الغذاء.',
            meta_description_en: 'Learn HACCP system to protect your family from food hazards.',
            reading_time_minutes: 6,
            og_title_ar: 'مبادئ HACCP في مطبخك — حماية علمية لعائلتك',
            og_title_en: 'HACCP Principles in Your Kitchen',
            og_description_ar: 'تعرفي على نظام HACCP لحماية أسرتك من مخاطر الغذاء.',
            og_description_en: 'Learn HACCP system to protect your family from food hazards.',
        },
        imageUrl: '/images/articles/haccp-principles.jpg',
        category: 'foodSafety',
    },

    // ─────────────────────────────────────────────
    // Article 3
    // ─────────────────────────────────────────────
    {
        id: 3,
        axis: 1, axis_ar: AXIS_AR, axis_en: AXIS_EN, week_range: '1-2',
        title_ar: 'التلوث المتبادل وتخزين الطعام — أخطاء المطبخ الخفية',
        title_en: 'Cross-Contamination & Food Storage — Hidden Mistakes',
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
<p>منع انتقال الجراثيم من مكان لآخر في المطبخ هو المفتاح الأساسي للسلامة. التلوث المتبادل يحدث عندما تنقل الكائنات الدقيقة من سطح ملوث (مثل اللحم النيء) إلى سطح غير ملوث أو طعام جاهز للأكل.</p>

<hr>

<h2>التلوث المتبادل — الفسيولوجيا والميكانيكا</h2>
<p>ما الذي يحدث فعلاً على المستوى الميكروبي؟<br>
حين تُقطّع قطعة دجاج نيئة على لوح، تترك خلفها ملايين الكائنات الدقيقة على السطح لا تراها العين. هذه الجراثيم — من <em>Salmonella</em> و <em>Campylobacter</em> وغيرها — لا تموت بالتجفيف فوراً، بل يمكنها البقاء حيّة على الأسطح الجافة لساعات وعلى الأسطح الرطبة لأيام. حين تضع الخيارة أو قطعة الجبن على نفس اللوح دون غسله، تلتقط تلك الأسطح الجراثيم الحية وتنقلها مباشرةً إلى الطعام الذي سيدخل فم طفلك دون أي طهي يقتلها.</p>

<hr>

<h2>مسارات التلوث المتبادل — أربعة مسارات لا يُدرَك بعضها</h2>
<p>يُميّز العلم بين أربعة مسارات رئيسية للتلوث المتبادل في المطبخ المنزلي:</p>
<ul>
<li><strong>مسار الأيدي:</strong> يدٌ لمست الدجاج النيء ثم مسّت الطماطم دون غسل.</li>
<li><strong>مسار الأدوات:</strong> سكين أو لوح تقطيع استُخدم للحوم ثم للخضار.</li>
<li><strong>مسار السطح:</strong> طاولة التحضير الملوّثة تلتقط الغذاء الجاهز الموضوع عليها.</li>
<li><strong>مسار السوائل:</strong> سوائل اللحم النيء تتقاطر على أطعمة آخرى في الثلاجة.</li>
</ul>

<blockquote>
<p><strong>دراسة صادمة: كم بكتيريا تنتقل في لمسة واحدة؟</strong><br>
تُوثّق دراسة أُجريت في جامعة روتجرز ونُشرت في مجلة <em>Applied and Environmental Microbiology</em> أن انتقال البكتيريا من الأسطح إلى الغذاء يبدأ فورياً — حتى خلال أقل من ثانية واحدة من التلامس. والأهم أن نسبة النقل تتراوح بين 0.2% و 93% تبعاً لنوع السطح ورطوبة الغذاء ومدة التلامس — وهو ما يُدحض نهائياً "قاعدة الخمس ثوانٍ" الشهيرة التي يظنّ كثيرون أنها حقيقة علمية.</p>
</blockquote>

<hr>

<h2>أخطاء التلوث المتبادل الأكثر شيوعاً</h2>

<p><strong>الخطأ الأول: لوح تقطيع واحد للجميع</strong><br>
هذا الخطأ يُشكّل نقطة تحكم حرجة بامتياز في أي تقييم HACCP. دراسة نشرتها <em>Journal of Food Protection</em> رصدت توزّع البكتيريا على 14 سطحاً مختلفاً في مطابخ المستهلكين، وتبيّن أن ألواح التقطيع ومغاسل المطبخ وقماشات التنظيف هي أكثر الأسطح تلوثاً على الإطلاق. الحل العلمي ليس مجرد الغسيل بالماء والصابون — بل نظام ألوان الألواح الذي يفصل فيزيائياً بين أنواع الأغذية.</p>

<p><strong>الخطأ الثاني: اللحوم في الرف العلوي للثلاجة</strong><br>
عندما توضع اللحوم النيئة في الرف العلوي، تتقاطر سوائلها الحاملة للجراثيم على كل ما يقع تحتها. هذه الظاهرة تسمى <strong>drip contamination</strong> وهي مسؤولة عن نسبة معتبرة من حالات التسمم الغذائي المنزلي. القاعدة الحديدية: اللحوم النيئة دائماً في الرف الأسفل، في أوعية أو أكياس مغلقة، بعيداً عن الأطعمة الجاهزة.</p>

<p><strong>الخطأ الثالث: التذوق بالملعقة ذاتها وإعادتها للقدر</strong><br>
هذا المسار ينقل الكائنات الدقيقة من الفم مباشرةً إلى الطعام. الفم يحتوي على مئات الأنواع البكتيرية، بعضها غير ضار في حالته الطبيعية، لكنه قد يُشكّل خطراً إذا وجد بيئة دافئة ومغذية كقدر الطبخ للتكاثر فيه. الحل: ملعقة تذوق مستقلة لكل مرة.</p>

<p><strong>الخطأ الرابع: غسل الفاكهة بالشطف فقط</strong><br>
دراسة نشرتها <em>Journal of Food Science</em> أثبتت أن نقع التفاح لمدة 12 دقيقة في ماء مضاف إليه صودا الخبز (بيكربونات الصوديوم) يُزيل بقايا المبيدات الموجودة داخل القشرة بفاعلية أعلى بكثير من الغسيل بالماء العادي. الشطف السريع يُزيل فقط الأوساخ الظاهرية، لكن لا يقضي على الجراثيم الملتصقة بالقشرة.</p>

<p><strong>الخطأ الخامس: قمائش المطبخ — الناقل الأكثر إغفالاً</strong><br>
قمائش التنظيف (الفوطة المطبخية) هي من أكثر الأسطح تلوثاً في المطبخ. حين تُمسح بها طاولة ملوّثة ثم تُجفَّف بها الأطباق أو اليدان، تُعيد توزيع الجراثيم على كل سطح تلمسه. التوصية العلمية: تغيير قمائش المطبخ يومياً وغسلها بالماء الساخن (60°م على الأقل)، أو استخدام مناشف ورقية لمسح أسطح التحضير.</p>

<hr>

<h2>قواعد التخزين الآمن — العلم الكامل</h2>

<h3>الثلاجة: درجة الحرارة الدقيقة تصنع الفرق</h3>
<p>المعيار العلمي الدقيق هو بين <strong>1°م و 4°م</strong> للثلاجة — لا مجرد "بارد". هذا النطاق يُبطّئ تكاثر معظم الجراثيم الخطيرة إلى ما دون عتبة الخطر. درجة 5°م أو 6°م قد تبدو قريبة، لكنها تُضاعف معدل تكاثر <em>Salmonella</em> وغيرها بشكل ملحوظ. معظم الثلاجات المنزلية لا تُعطي قراءة دقيقة من لوحة التحكم — لذا مقياس الحرارة المستقل (Fridge Thermometer) هو الأداة الأدق لضمان الالتزام بهذا النطاق.</p>

<table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse:collapse;">
<thead><tr><th>المستوى</th><th>نوع الطعام</th><th>السبب</th></tr></thead>
<tbody>
<tr><td>الرف العلوي</td><td>أطعمة جاهزة للأكل، بقايا مطبوخة</td><td>لا حاجة طهي إضافي</td></tr>
<tr><td>الرف الأوسط</td><td>ألبان، بيض، أجبان</td><td>منتجات متوسطة المخاطر</td></tr>
<tr><td>الرف السفلي</td><td>لحوم نيئة ودواجن وأسماك (مغلقة)</td><td>أعلى خطر + أبرد منطقة</td></tr>
<tr><td>درج الخضار</td><td>فواكه وخضروات كاملة</td><td>مُصمَّم لرطوبة مناسبة</td></tr>
</tbody>
</table>

<br>

<h3>الفريزر: التجميد يُوقف لا يقتل</h3>
<p>درجة <strong>−18°م</strong> هي المعيار الدولي للفريزر المنزلي — عندها تدخل الكائنات الدقيقة في حالة سكون تام ويتوقف تكاثرها. لكن الخطأ الجسيم هو الاعتقاد بأن التجميد يقتل الجراثيم — هو لا يفعل ذلك. عند إذابة الطعام، تعود الكائنات الدقيقة للنشاط الكامل، لذا:</p>
<ul>
<li>إذابة الطعام يجب أن تتم داخل الثلاجة لا على طاولة المطبخ.</li>
<li>الطعام المُذاب لا يُعاد تجميده نيئاً — يجب طهيه أولاً ثم يمكن تجميده مطبوخاً.</li>
<li>سوائل الذوبان (drip liquid) تحتوي على تركيز عالٍ من الجراثيم وتُعامَل كخطر بيولوجي.</li>
</ul>

<hr>

<h2>مُدد التخزين الآمنة — ما لا تخبرك به العبوة</h2>
<table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse:collapse;">
<thead><tr><th>الطعام</th><th>في الثلاجة (1–4°م)</th><th>في الفريزر (−18°م)</th></tr></thead>
<tbody>
<tr><td>دجاج نيء كامل</td><td>1–2 يوم</td><td>9–12 شهراً</td></tr>
<tr><td>لحم مفروم نيء</td><td>1–2 يوم</td><td>3–4 أشهر</td></tr>
<tr><td>بقايا مطبوخة</td><td>3–4 أيام</td><td>2–3 أشهر</td></tr>
<tr><td>بيض</td><td>3–5 أسابيع</td><td>لا يُنصح بتجميده بقشره</td></tr>
<tr><td>حليب مفتوح</td><td>5–7 أيام</td><td>شهر واحد</td></tr>
<tr><td>جبن طري مفتوح</td><td>1–2 أسبوع</td><td>1–2 شهر</td></tr>
</tbody>
</table>

<hr>

<h2>تواريخ الصلاحية — الفرق العلمي والقانوني</h2>

<p><strong>"صالح حتى" (Use by) — حدّ الأمان الذي لا يُتجاوز</strong><br>
تاريخ "صالح حتى" هو حدّ أمان بيولوجي وليس حدّ جودة. تستخدمه الشركة المصنّعة بعد إجراء اختبارات ميكروبيولوجية محددة — تحديداً اختبارات تتبّع معدل نمو مسببات الأمراض في المنتج في ظروف التخزين الموصى بها. بعد هذا التاريخ، لا يمكن ضمان أن تكاثر الجراثيم بقي ضمن الحدود الآمنة، حتى لو بدا المنتج طبيعياً تماماً في الشكل والرائحة والطعم.</p>
<p><em>مثال توضيحي: <strong>الليستيريا</strong> في الجبن الطري تتكاثر ببطء شديد في الثلاجة — لا رائحة ولا تغيّر مرئي — لكنها قد تصل إلى مستويات تسبب تسمماً دموياً خطيراً بعد تاريخ الصلاحية لدى الأطفال والحوامل.</em></p>

<p><strong>"يُفضّل استخدامه قبل" (Best before) — حدّ الجودة القابل للمرونة</strong><br>
هذا التاريخ يتعلق بالجودة الحسية لا بالأمان. بعده قد يفقد المنتج بعض نكهته أو قوامه أو لونه، لكنه لا يُمثّل خطراً صحياً بالضرورة إذا بدا سليماً ظاهرياً.</p>

<table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse:collapse;">
<thead><tr><th>المعيار</th><th>صالح حتى (Use by)</th><th>يُفضّل قبل (Best before)</th></tr></thead>
<tbody>
<tr><td>الهدف</td><td>سلامة ميكروبيولوجية</td><td>جودة حسية</td></tr>
<tr><td>المنتجات</td><td>لحوم، ألبان، عصائر طازجة</td><td>معلّبات، أطعمة جافة، مجمّدة</td></tr>
<tr><td>بعد التاريخ</td><td>تخلص منه فوراً</td><td>قيّمه بالشم والنظر — غالباً آمن</td></tr>
<tr><td>الأساس العلمي</td><td>اختبارات نمو مسببات الأمراض</td><td>اختبارات الجودة الحسية</td></tr>
</tbody>
</table>

<hr>

<h2>الخطوات الخمس العملية للحماية اليومية</h2>
<ol>
<li>نظام ألوان الألواح: لوح أحمر للحوم، أخضر للخضار، أبيض للجبن والأطعمة الجاهزة — والفصل الصارم بينها.</li>
<li>اللحوم دائماً أسفل الثلاجة: في أوعية مغلقة تماماً لمنع التقاطر.</li>
<li>تغيير قمائش المطبخ يومياً: أو استخدام مناشف ورقية لأسطح التحضير.</li>
<li>قياس درجة الثلاجة بمقياس مستقل: التأكد من الحفاظ على 1–4°م.</li>
<li>قراءة نوع التاريخ قبل القراءة ذاتها: "صالح حتى" هو خط أمان لا يُتجاوز، أما "يُفضّل قبل" فهو مرشد للجودة.</li>
</ol>
</div>`,
        content_en: `<div dir="ltr">
<h2>Cross-Contamination & Food Storage</h2>
<p>Learn how to prevent the transfer of germs in your kitchen and the scientific rules for safe refrigeration and freezing. Understand the critical difference between "Use By" and "Best Before" dates to protect your family.</p>
</div>`,
        sources_ar: [
            'WHO. (2024). Food safety fact sheet. WHO.',
            'USDA. (2024). Safe Food Handling and Storage Basics.',
        ],
        sources_en: [
            'WHO. (2024). Food safety fact sheet. WHO.',
            'USDA. (2024). Safe Food Handling and Storage Basics.',
        ],
        tags_ar: ['التلوث المتبادل', 'تخزين الطعام', 'سلامة الغذاء'],
        tags_en: ['Cross-Contamination', 'Food Storage', 'Food Safety'],
        meta: {
            meta_title_ar: 'التلوث المتبادل وتخزين الطعام — أخطاء المطبخ الخفية',
            meta_title_en: 'Cross-Contamination & Food Storage',
            meta_description_ar: 'تعرفي على كيفية تجنب التلوث المتبادل وقواعد التخزين الصحيحة في الثلاجة.',
            meta_description_en: 'Learn how to prevent cross-contamination and safe storage rules.',
            reading_time_minutes: 6,
            og_title_ar: 'التلوث المتبادل وتخزين الطعام — أخطاء المطبخ الخفية',
            og_title_en: 'Cross-Contamination & Food Storage',
            og_description_ar: 'تعرفي على كيفية تجنب التلوث المتبادل وقواعد التخزين الصحيحة في الثلاجة.',
            og_description_en: 'Learn how to prevent cross-contamination and safe storage rules.',
        },
        imageUrl: '/images/articles/cross-contamination.jpg',
        category: 'foodSafety',
    },

    // ─────────────────────────────────────────────
    // Article 4
    // ─────────────────────────────────────────────
    {
        id: 4,
        axis: 1, axis_ar: AXIS_AR, axis_en: AXIS_EN, week_range: '1-2',
        title_ar: 'دليل تقييم النمو وتفسير مخططات النمو للأطفال',
        title_en: 'Growth Assessment Guide and Interpretation of Growth Charts for Children',
        slug_ar: 'دليل-تقييم-النمو-وتفسير-مخططات-النمو',
        slug_en: 'growth-assessment-guide-and-interpretation',
        quick_summary_ar: [
            'مراقبة النمو هي أداة التشخيص المبكر الأقوى في طب الأطفال',
            'فهم الفرق بين التقزم والهزال وتأثير سوء التغذية على الدماغ',
            'دليل شامل للقياسات الأنثروبومترية وفهم المئينات وZ-Scores',
        ],
        quick_summary_en: [
            'Growth monitoring is the most powerful early diagnostic tool in pediatrics',
            'Understanding the difference between stunting and wasting and the impact of malnutrition on the brain',
            'A comprehensive guide to anthropometric measurements and understanding percentiles and Z-Scores',
        ],
        content_ar: `<div dir="rtl">
<p>مراقبة النمو هي أداة التشخيص المبكر الأقوى في طب الأطفال — تستطيع أن تكشف عن سوء التغذية، الأمراض المزمنة، واضطرابات الغدد الصماء قبل ظهور الأعراض السريرية الواضحة. والرقم على المخطط ليس هدفاً بذاته، بل هو نافذة على تاريخ صحي كامل.</p>

<h2>كيف يؤثر سوء التغذية على نمو الأطفال؟ — الآثار الموثَّقة علمياً</h2>
<h3>التأثير على النمو البدني: التقزم والهزال</h3>
<p>يُميّز الباحثون بين نمطين متمايزين لسوء التغذية البدني:</p>
<ul>
<li><strong>التقزم (Stunting):</strong> انخفاض الطول مقارنةً بالعمر بأكثر من انحرافين معياريين عن المتوسط. يعكس سوء تغذية مزمناً ومتراكماً على مدى أشهر أو سنوات، وينجم بالأساس عن نقص مستمر في البروتينات والسعرات الحرارية والمعادن الأساسية (الزنك، الكالسيوم، فيتامين D).</li>
<li><strong>الهزال (Wasting):</strong> انخفاض الوزن مقارنةً بالطول. يعكس سوء تغذية حاداً وآنياً وغالباً ما يكون مرتبطاً بمرض حاد أو إسهال شديد أو انقطاع غذائي مفاجئ، وهو مؤشر الطوارئ في تقييم التغذية.</li>
</ul>

<h3>التأثير على الدماغ — الأعمق والأطول أمداً</h3>
<p>تُثبت الأدلة العلمية المتراكمة أن تأثير سوء التغذية على الدماغ هو الأشد خطورةً والأصعب عكساً. على المستوى العصبي التشريحي، يُحدث سوء التغذية المزمن:</p>
<ul>
<li><strong>تأخر المايلين (Myelination):</strong> المايلين هو الغشاء الدهني الذي يُغلّف الألياف العصبية ويُسرّع نقل الإشارات — وهو يتطلب الدهون الصحية والحديد لتصنيعه.</li>
<li><strong>تقليص التشعّبات العصبية (Dendritic Arborization):</strong> أي تقليل تفرعات التواصل بين الخلايا العصبية مما يُضعف دوائر التعلم والذاكرة.</li>
<li><strong>نقص الناقلات العصبية:</strong> انخفاض في تركيز السيروتونين والدوبامين المرتبطَين بالانتباه والتعلم والمزاج.</li>
<li><strong>تغيير في التسلسل الزمني لنضج المخ:</strong> مما يُعطّل بناء الدوائر العصبية في الأوقات الحساسة التي لا تتكرر.</li>
</ul>
<p>والنتيجة العملية الموثَّقة في دراسة طولية على أطفال مصابين بتقزم: ضعف في الانتباه، الذاكرة العاملة، الاستيعاب البصري المكاني، وصعوبات في التعلم — وهذه الاضطرابات الإدراكية تستمر حتى مرحلة البلوغ حتى بعد تصحيح النمو البدني. والسبب أن الجفاف الغذائي المبكر يُحدث تغيرات إبيجينية (DNA Methylation) دائمة تؤثر على تعبير الجينات المرتبطة بالوظيفة الإدراكية لعقود.</p>

<h2>العواقب بعيدة المدى — ما لا يظهر في الطفولة</h2>
<p>تُوثّق الدراسات الطولية أن الطفل الذي عانى من تقزم في السنوات الأولى يواجه في البلوغ:</p>
<ul>
<li>انخفاض الطاقة الإنتاجية وقدرة العمل البدني.</li>
<li>مقاومة الأنسولين وخطر متزايد للسكري وارتفاع ضغط الدم.</li>
<li>الأطفال المتقزمون الذين شهدوا زيادة سريعة في الوزن بعد سنتين معرّضون بشكل أعلى للسمنة لاحقاً.</li>
<li>نتائج توليدية سلبية في النساء اللواتي عانين من تقزم في طفولتهن.</li>
</ul>

<h2>القياسات الأنثروبومترية — الأدوات العلمية الأربع</h2>
<p>القياسات الأنثروبومترية هي المعطى الخام الذي تُبنى عليه مخططات النمو. كل قياس يُجيب على سؤال مختلف:</p>
<table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse:collapse;">
<thead><tr><th>القياس</th><th>ما يُقيسه</th><th>الفئة المستهدفة</th><th>ما يكشفه</th></tr></thead>
<tbody>
<tr><td>الوزن مقابل العمر</td><td>التغيرات الحادة والآنية</td><td>0–10 سنوات</td><td>سوء التغذية الحاد والمزمن معاً</td></tr>
<tr><td>الطول مقابل العمر</td><td>التاريخ الغذائي طويل الأمد</td><td>0–19 سنة</td><td>التقزم — المؤشر الذهبي للتغذية المزمنة</td></tr>
<tr><td>الوزن مقابل الطول</td><td>توازن الوزن مع الطول</td><td>0–5 سنوات</td><td>الهزال الحاد — أهم مؤشر للتغذية الطارئة</td></tr>
<tr><td>محيط الرأس</td><td>نمو الدماغ والجمجمة</td><td>0–24 شهراً</td><td>شذوذات نمو المخ (صغر أو كبر غير طبيعي)</td></tr>
<tr><td>BMI مقابل العمر</td><td>النسبة بين الوزن والطول</td><td>من سنتين فصاعداً</td><td>النحافة أو الوزن الزائد أو السمنة</td></tr>
</tbody>
</table>
<p>ملاحظة تقنية: يُقاس الطول لدى الأطفال دون سنتين في وضع الاستلقاء (Length) لا الوقوف (Height)، وهو ما يُفرّق بينهما المعيار الدولي — الفارق يصل إلى 0.7 سم بين القياسَين.</p>

<h2>فهم المئينات (Percentiles) وZ-Scores — الأدوات الإحصائية</h2>
<h3>المئين (Percentile) — اللغة المستخدمة في العيادة</h3>
<p>المئين هو ترتيب الطفل بين 100 طفل من أقرانه بنفس العمر والجنس. طفل في المئين الـ40 في الطول يعني أنه أطول من 40% وأقصر من 60% من أقرانه. النقاط الجوهرية في التفسير:</p>
<ul>
<li><strong>النطاق الطبيعي:</strong> من المئين الـ3 حتى الـ97 — هذا النطاق يشمل معظم الأطفال الأصحاء.</li>
<li><strong>نقص الوزن:</strong> أقل من المئين الـ3 (أو الـ5 في بعض المراجع).</li>
<li><strong>وزن زائد:</strong> BMI فوق المئين الـ85.</li>
<li><strong>سمنة:</strong> BMI فوق المئين الـ95.</li>
</ul>

<h3>Z-Score — اللغة الأكثر دقة في البحث والتشخيص الحاد</h3>
<p>في أبحاث التغذية والتقييمات الطارئة، يُفضَّل استخدام Z-Score (الانحراف المعياري) بدلاً من المئين لأنه أكثر دقة عند الأطراف القصوى من المنحنى. التعريفات الموحَّدة دولياً:</p>
<table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse:collapse;">
<thead><tr><th>الحالة</th><th>Z-Score</th><th>تعريف منظمة الصحة العالمية</th></tr></thead>
<tbody>
<tr><td>تقزم حاد</td><td>أقل من −3 SD</td><td>طول/عمر تحت −3 انحرافات معيارية</td></tr>
<tr><td>تقزم معتدل</td><td>بين −3 و−2 SD</td><td>طول/عمر بين −3 و−2</td></tr>
<tr><td>هزال حاد</td><td>أقل من −3 SD</td><td>وزن/طول تحت −3 انحرافات معيارية</td></tr>
<tr><td>بدانة</td><td>فوق +2 SD</td><td>BMI/عمر فوق +2 انحرافات معيارية</td></tr>
</tbody>
</table>

<h2>WHO vs CDC — الفرق الجوهري بين المخططَين</h2>
<p>يستخدم أطباء الأطفال مخططَين رئيسيَّين، والاختيار بينهما ليس عشوائياً:</p>
<table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse:collapse;">
<thead><tr><th>المعيار</th><th>مخططات WHO (2006)</th><th>مخططات CDC (2000)</th></tr></thead>
<tbody>
<tr><td>الفلسفة</td><td>معيار (Standard) — يصف كيف ينبغي أن ينمو الطفل في ظروف مثالية</td><td>مرجع (Reference) — يصف كيف نما الأطفال الأمريكيون فعلياً</td></tr>
<tr><td>العينة</td><td>8,000 طفل من 6 دول في ظروف صحية وتغذوية مثالية</td><td>عينات مسح أمريكية تشمل ظروفاً متفاوتة</td></tr>
<tr><td>الرضاعة الطبيعية</td><td>المرجع الذهبي هو الرضاعة الطبيعية الكاملة</td><td>تشمل عينة مختلطة الرضاعة</td></tr>
<tr><td>الاستخدام الموصى به</td><td>0–24 شهراً (التوصية الدولية)</td><td>من سنتين فصاعداً في الولايات المتحدة</td></tr>
<tr><td>الأثر العملي</td><td>تُظهر معدل تقزم أعلى بـ3.5% في الأطفال الأصحاء مقارنةً بـCDC</td><td>تُقلّل من اكتشاف حالات التقزم خاصةً في السنة الثانية</td></tr>
</tbody>
</table>
<p>النتيجة العملية: طفل تصنّفه مخططات WHO على أنه ضمن النطاق الطبيعي قد تصنّفه مخططات CDC بأنه ناقص الوزن — وهو ما يجعل اختيار المخطط الصحيح حاسماً في التشخيص.</p>

<h2>قاعدة "النمط" — قراءة المخطط كفيلم لا صورة</h2>
<p>الخطأ الأكثر شيوعاً في تفسير مخططات النمو هو النظر إلى نقطة واحدة معزولة. المخطط يُقرأ كـمسار متواصل لا كلقطة منفردة. المبادئ الأساسية في القراءة الصحيحة:</p>
<h3>مبدأ الاتساق أهم من الترتيب المطلق</h3>
<p>طفل يسير بثبات على المئين الـ10 في الطول ليس في خطر إذا كان والداه قصيري القامة — أما طفل يسير على المئين الـ60 ثم ينزل فجأة للمئين الـ20 فهذا إنذار يستوجب التحقيق بصرف النظر عن قيمته المطلقة.</p>

<h3>عامل الطول الوراثي المُتوقَّع (Mid-Parental Height)</h3>
<p>لحساب "السقف الوراثي" للطفل يُستخدم المعادلات التالية:</p>
<p><strong>للذكور:</strong> (طول الأب (سم) + طول الأم (سم) + 13) / 2</p>
<p><strong>للإناث:</strong> (طول الأب (سم) + طول الأم (سم) - 13) / 2</p>
<p>الناتج ± 10 سم يُمثّل النطاق الطبيعي المتوقع لطول الطفل بالغاً. إذا كان الطفل يسير في مسار طولي يتوافق مع هذا النطاق، فتقزمه الظاهر قد يكون وراثياً لا غذائياً.</p>

<h2>العلامات التحذيرية — متى يتدخّل الطبيب؟</h2>
<h3>تحذير الدرجة الأولى: عبور خطين رئيسيين</h3>
<p>انخفاض مفاجئ يتخطى خطَّين رئيسيَّين على المخطط (مثلاً: من المئين الـ75 إلى الـ25 خلال 3–6 أشهر) يستدعي التقييم الطبي الفوري، إذ قد يُشير إلى:</p>
<ul>
<li>مرض مزمن كامن (أمراض الجهاز الهضمي، الغدة الدرقية، أمراض القلب)</li>
<li>سوء تغذية مُشخَّص أو مُهمَل</li>
<li>اضطراب نفسي-اجتماعي يؤثر على الشهية والنمو</li>
</ul>

<h3>تحذير الدرجة الثانية: ثبات النمو (Failure to Thrive)</h3>
<p>توقف زيادة الوزن لأكثر من شهرين عند الرضيع، أو الطول لأكثر من 3–6 أشهر عند الطفل الأكبر، دون سبب مرضي واضح هو ما يُصطلح عليه طبياً بـ"إخفاق النمو" (Failure to Thrive) — وهو مؤشر حاسم على اضطراب غذائي أو مرضي يحتاج تقييماً شاملاً.</p>

<h3>تحذير الدرجة الثالثة: النمو غير المتناسب</h3>
<p>زيادة مفرطة في الوزن لا يواكبها نمو طولي سليم — أي ارتفاع سريع في BMI مع ثبات في الطول — قد يُشير إلى قصور الغدة الدرقية أو متلازمات وراثية بعينها، بجانب كونه علامة مبكرة للسمنة التي تستدعي تدخلاً غذائياً فورياً قبل ترسّخها.</p>

<h2>جدول التواتر الموصى به للقياسات</h2>
<table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse:collapse;">
<thead><tr><th>الفئة العمرية</th><th>تواتر القياس الموصى به</th></tr></thead>
<tbody>
<tr><td>0–6 أشهر</td><td>شهرياً (كل زيارة لطبيب الأطفال)</td></tr>
<tr><td>6–12 شهراً</td><td>كل شهرين</td></tr>
<tr><td>1–2 سنة</td><td>كل 3 أشهر</td></tr>
<tr><td>2–6 سنوات</td><td>كل 6 أشهر</td></tr>
<tr><td>6–18 سنة</td><td>مرة سنوياً على الأقل</td></tr>
</tbody>
</table>
<p>تنويه هام: هذا القسم — وجميع قسم المقال — مُقدَّم لأغراض التوعية الصحية العامة ولا يُغني بأي حال عن استشارة طبيب الأطفال المتابع للحالة، الذي يُقيّم الطفل في سياقه الكامل لا بناءً على الأرقام وحدها.</p>
</div>`,
        content_en: `<div dir="ltr">
<p>Growth monitoring is the most powerful early diagnostic tool in pediatrics — it can detect malnutrition, chronic diseases, and endocrine disorders before clear clinical symptoms appear. The number on the chart is not a goal in itself, but a window into a complete health history.</p>

<h2>How Malnutrition Affects Children's Growth — Scientifically Documented Effects</h2>
<h3>Impact on Physical Growth: Stunting and Wasting</h3>
<p>Researchers distinguish between two distinct patterns of physical malnutrition:</p>
<ul>
<li><strong>Stunting:</strong> Low height-for-age by more than two standard deviations below the mean. It reflects chronic, accumulated malnutrition over months or years, primarily resulting from persistent deficits in proteins, calories, and essential minerals (Zinc, Calcium, Vitamin D).</li>
<li><strong>Wasting:</strong> Low weight-for-height. It reflects acute, instantaneous malnutrition and is often associated with acute illness, severe diarrhea, or a sudden nutritional interruption. It is the emergency indicator in nutritional assessments.</li>
</ul>

<h3>Impact on the Brain — Deepest and Longest Term</h3>
<p>Accumulated scientific evidence proves that the impact of malnutrition on the brain is the most severe and difficult to reverse. At the neuro-anatomical level, chronic malnutrition causes:</p>
<ul>
<li><strong>Delayed Myelination:</strong> Myelin is the fatty sheath that covers nerve fibers and speeds up signal transmission — it requires healthy fats and iron for synthesis.</li>
<li><strong>Reduced Dendritic Arborization:</strong> Meaning a reduction in the branches of communication between neurons, weakening learning and memory circuits.</li>
<li><strong>Neurotransmitter Deficiency:</strong> Decrease in the concentration of serotonin and dopamine associated with attention, learning, and mood.</li>
<li><strong>Alteration in Brain Maturation Chronology:</strong> Disrupting the building of neural circuits during sensitive, non-repeatable periods.</li>
</ul>
<p>The practical result documented in a longitudinal study of children with stunting: weaknesses in attention, working memory, visual-spatial comprehension, and learning difficulties — these cognitive disorders persist into adulthood even after physical growth correction. The reason is that early nutritional drought causes permanent epigenetic changes (DNA Methylation) that affect the expression of genes associated with cognitive function for decades.</p>

<h2>Long-term Consequences — What Does Not Appear in Childhood</h2>
<p>Longitudinal studies document that a child who suffered from stunting in the early years faces in adulthood:</p>
<ul>
<li>Reduced productive energy and physical work capacity.</li>
<li>Insulin resistance and increased risk of diabetes and hypertension.</li>
<li>Stunted children who experience rapid weight gain after two years are at higher risk for later obesity.</li>
<li>Negative reproductive outcomes in women who suffered from stunting in their childhood.</li>
</ul>

<h2>Anthropometric Measurements — The Four Scientific Tools</h2>
<p>Anthropometric measurements are the raw data on which growth charts are built. Each measurement answers a different question:</p>
<table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse:collapse;">
<thead><tr><th>Measurement</th><th>What It Measures</th><th>Target Group</th><th>What It Reveals</th></tr></thead>
<tbody>
<tr><td>Weight-for-age</td><td>Acute and instantaneous changes</td><td>0–10 years</td><td>Both acute and chronic malnutrition</td></tr>
<tr><td>Height-for-age</td><td>Long-term nutritional history</td><td>0–19 years</td><td>Stunting — the golden indicator of chronic nutrition</td></tr>
<tr><td>Weight-for-height</td><td>Weight balance with height</td><td>0–5 years</td><td>Acute wasting — the most important indicator of emergency nutrition</td></tr>
<tr><td>Head circumference</td><td>Brain and skull growth</td><td>0–24 months</td><td>Brain growth abnormalities (abnormally small or large)</td></tr>
<tr><td>BMI-for-age</td><td>Ratio between weight and height</td><td>From 2 years onwards</td><td>Thinness, overweight, or obesity</td></tr>
</tbody>
</table>
<p>Technical Note: Height in children under two is measured in a recumbent position (Length), not standing (Height), which is how the international standard differentiates them — the difference reaches up to 0.7 cm between the two measurements.</p>

<h2>Understanding Percentiles and Z-Scores — Statistical Tools</h2>
<h3>Percentile — The Language Used in the Clinic</h3>
<p>A percentile is the child's rank among 100 peers of the same age and sex. A child at the 40th percentile in height means they are taller than 40% and shorter than 60% of their peers. Key points in interpretation:</p>
<ul>
<li><strong>Normal Range:</strong> From the 3rd to the 97th percentile — this range includes most healthy children.</li>
<li><strong>Underweight:</strong> Below the 3rd percentile (or 5th in some references).</li>
<li><strong>Overweight:</strong> BMI above the 85th percentile.</li>
<li><strong>Obesity:</strong> BMI above the 95th percentile.</li>
</ul>

<h3>Z-Score — The Most Accurate Language in Research and Acute Diagnosis</h3>
<p>In nutritional research and emergency assessments, Z-Score (Standard Deviation) is preferred over percentiles because it is more accurate at the extreme ends of the curve. Internationally standardized definitions:</p>
<table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse:collapse;">
<thead><tr><th>Status</th><th>Z-Score</th><th>WHO Definition</th></tr></thead>
<tbody>
<tr><td>Severe Stunting</td><td>Less than −3 SD</td><td>Height/age below −3 standard deviations</td></tr>
<tr><td>Moderate Stunting</td><td>Between −3 and −2 SD</td><td>Height/age between −3 and −2</td></tr>
<tr><td>Severe Wasting</td><td>Less than −3 SD</td><td>Weight/height below −3 standard deviations</td></tr>
<tr><td>Obesity</td><td>Above +2 SD</td><td>BMI/age above +2 standard deviations</td></tr>
</tbody>
</table>

<h2>WHO vs CDC — The Fundamental Difference Between the Two Charts</h2>
<p>Pediatricians use two main charts, and the choice between them is not random:</p>
<table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse:collapse;">
<thead><tr><th>Criterion</th><th>WHO Charts (2006)</th><th>CDC Charts (2000)</th></tr></thead>
<tbody>
<tr><td>Philosophy</td><td>Standard — describes how a child should grow under ideal conditions</td><td>Reference — describes how American children actually grew</td></tr>
<tr><td>Sample</td><td>8,000 children from 6 countries in ideal health and nutritional conditions</td><td>US survey samples covering varying conditions</td></tr>
<tr><td>Breastfeeding</td><td>The gold standard is exclusive breastfeeding</td><td>Includes a mixed breastfeeding sample</td></tr>
<tr><td>Recommended Use</td><td>0–24 months (international recommendation)</td><td>From 2 years onwards in the United States</td></tr>
<tr><td>Practical Impact</td><td>Shows a 3.5% higher stunting rate in healthy children compared to CDC</td><td>Reduces detection of stunting cases, especially in the second year</td></tr>
</tbody>
</table>
<p>Practical Result: A child classified by WHO charts as being within the normal range might be classified by CDC charts as underweight — which makes choosing the correct chart crucial in diagnosis.</p>

<h2>The "Pattern" Rule — Reading the Chart as a Movie, Not a Picture</h2>
<p>The most common error in interpreting growth charts is looking at a single isolated point. The chart is read as a continuous path, not a snapshot. Basic principles in correct reading:</p>
<h3>The Principle of Consistency is More Important Than Absolute Rank</h3>
<p>A child moving steadily on the 10th percentile in height is not at risk if their parents are short — however, a child moving on the 60th percentile and then suddenly dropping to the 20th percentile is a warning that warrants investigation regardless of the absolute value.</p>

<h3>Mid-Parental Height Factor</h3>
<p>To calculate the "genetic ceiling" for the child, the following formulas are used:</p>
<p><strong>For Males:</strong> (Father's Height (cm) + Mother's Height (cm) + 13) / 2</p>
<p><strong>For Females:</strong> (Father's Height (cm) + Mother's Height (cm) - 13) / 2</p>
<p>The result ± 10 cm represents the natural expected range for the child's adult height. If the child is on a height path consistent with this range, their apparent stunting might be genetic, not nutritional.</p>

<h2>Warning Signs — When Does a Doctor Intervene?</h2>
<h3>First-Degree Warning: Crossing Two Major Lines</h3>
<p>A sudden drop that crosses two major lines on the chart (e.g., from the 75th percentile to the 25th in 3–6 months) requires immediate medical evaluation, as it may indicate:</p>
<ul>
<li>An underlying chronic disease (gastrointestinal, thyroid, heart diseases)</li>
<li>Diagnosed or neglected malnutrition</li>
<li>A psychosocial disorder affecting appetite and growth</li>
</ul>

<h3>Second-Degree Warning: Failure to Thrive</h3>
<p>A stop in weight gain for more than two months in an infant, or in height for more than 3–6 months in an older child, without a clear pathological reason, is medically termed "Failure to Thrive" — it is a crucial indicator of a nutritional or pathological disorder needing comprehensive evaluation.</p>

<h3>Third-Degree Warning: Disproportionate Growth</h3>
<p>Excessive weight gain not accompanied by proper linear growth — i.e., a rapid rise in BMI with stagnant height — may indicate hypothyroidism or certain genetic syndromes, besides being an early sign of obesity requiring immediate nutritional intervention before it sets in.</p>

<h2>Recommended Measurement Frequency Table</h2>
<table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse:collapse;">
<thead><tr><th>Age Group</th><th>Recommended Measurement Frequency</th></tr></thead>
<tbody>
<tr><td>0–6 months</td><td>Monthly (every pediatrician visit)</td></tr>
<tr><td>6–12 months</td><td>Every two months</td></tr>
<tr><td>1–2 years</td><td>Every 3 months</td></tr>
<tr><td>2–6 years</td><td>Every 6 months</td></tr>
<tr><td>6–18 years</td><td>At least once a year</td></tr>
</tbody>
</table>
<p>Important Notice: This section — and all article sections — is provided for general health awareness purposes and is in no way a substitute for consulting the attending pediatrician, who evaluates the child in their full context, not based on numbers alone.</p>
</div>`,
        sources_ar: [
            'WHO. (2006). WHO Child Growth Standards.',
            'CDC. (2000). CDC Growth Charts.',
            'Victora, C. G., et al. (2008). Maternal and child undernutrition: consequences for adult health and human capital. The Lancet.',
            'Grantham-McGregor, S., et al. (2007). Developmental potential in the first 5 years for children in developing countries. The Lancet.',
        ],
        sources_en: [
            'WHO. (2006). WHO Child Growth Standards.',
            'CDC. (2000). CDC Growth Charts.',
            'Victora, C. G., et al. (2008). Maternal and child undernutrition: consequences for adult health and human capital. The Lancet.',
            'Grantham-McGregor, S., et al. (2007). Developmental potential in the first 5 years for children in developing countries. The Lancet.',
        ],
        tags_ar: ['تقييم النمو', 'مخططات النمو', 'المئينات', 'التقزم', 'الهزال', 'Z-Score', 'WHO', 'CDC', 'صحة الأطفال', 'نمو الدماغ'],
        tags_en: ['Growth Assessment', 'Growth Charts', 'Percentiles', 'Stunting', 'Wasting', 'Z-Score', 'WHO', 'CDC', 'Child Health', 'Brain Development'],
        meta: {
            meta_title_ar: 'دليل تقييم النمو وتفسير مخططات النمو للأطفال',
            meta_title_en: 'Growth Assessment Guide and Chart Interpretation',
            meta_description_ar: 'دليل شامل لفهم كيفية تقييم نمو طفلك علمياً، الفرق بين التقزم والهزال، وكيفية قراءة المئينات وZ-Scores.',
            meta_description_en: 'A comprehensive guide to understanding how to scientifically assess your child\'s growth, the difference between stunting and wasting, and how to read percentiles and Z-Scores.',
            reading_time_minutes: 8,
            og_title_ar: 'دليل تقييم النمو وتفسير مخططات النمو للأطفال',
            og_title_en: 'Growth Assessment Guide and Chart Interpretation',
            og_description_ar: 'مراقبة النمو هي أداة التشخيص الأقوى. تعلم كيف تقرأ مخطط نمو طفلك.',
            og_description_en: 'Growth monitoring is the strongest diagnostic tool. Learn how to read your child\'s growth chart.',
        },
        imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80',
        category: 'foodSafety',
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
<p>غسل اليدين هو "اللقاح من أجل الجميع" كما وصفته منظمة الصحة العالمية — تدخّل وقائي يعمل ضد أكثر من 200 مرض معروف تنقله الغذاء واليدين والأسطح، لا يتطلب تقنيةً أو دواءً، ويُنقذ حياةً بصابون وماء جارٍ لا يزيد ثمنهما على أي شيء.</p>

<hr>

<h2>الإطار العلمي — المفاتيح الخمسة لمنظمة الصحة العالمية</h2>
<h3>برنامج المفاتيح الخمسة</h3>
<p>منظمة الصحة العالمية طوّرت برنامجاً عالمياً يُسمّى "المفاتيح الخمسة للغذاء الأكثر أمانًا" — وهو المرجع الرسمي لتدريب مناولي الغذاء حول العالم. البرنامج يختصر المبادئ التي تمنع الأمراض المنقولة بالغذاء في خمس ممارسات:</p>
<ul>
<li><strong>كُن نظيفاً</strong> — غسل اليدين والأسطح وأدوات المطبخ</li>
<li><strong>افصل النيء عن المطبوخ</strong> — منع التلوث المتقاطع</li>
<li><strong>اطبخ جيداً</strong> — درجات حرارة كافية لقتل الأحياء الدقيقة</li>
<li><strong>احفظ الطعام في درجات حرارة آمنة</strong> — منع تكاثر الجراثيم</li>
<li><strong>استخدم مياهاً ومواد خاماً آمنة</strong> — الانطلاق من مصدر نظيف</li>
</ul>
<p>وقد تبنّى هذا البرنامج أكثر من 130 دولة حول العالم، ويُعدّ الركيزة الأولى في تعليم السلامة الغذائية المنزلية والمؤسسية.</p>

<hr>

<h2>الدليل العلمي — ما تُغيّره 20 ثانية من الصابون</h2>
<h3>الأرقام التي تُقنع</h3>
<p>نحو ثلث الأمراض المعدية يمكن منعها بغسل اليدين الصحيح. ويستهلك الأمريكيون وحدهم أكثر من 48 مليون حالة مرض معدي منقول بالغذاء سنوياً — من بينها 128,000 حالة دخول مستشفى. الأطفال تحت الخامسة هم الأكثر عرضةً، إذ يُشكّل نصف الحالات الـ77 مليون سنوية في الأمريكيتين أطفالاً دون الخامسة.</p>
<p>دراسات تدخّل في البيئات المدرسية وجدت أن برامج غسل اليدين الموجَّهة للأطفال تُقلّل غياباتهم المرضية وحوادث التهابات الجهاز التنفسي، مع تحسّن ملحوظ في المعرفة بنقل الجراثيم استمرّ لأكثر من شهر بعد التدخل.</p>

<h3>ماذا يحدث فعلاً حين تغسل يديك؟</h3>
<p>الصابون لا يقتل الجراثيم مباشرةً — بل يعمل كـعامل طرد (Surfactant): يُكسر التوتر السطحي بين زيوت الجلد (التي تتمسك بها الجراثيم) والماء، مما يُمكّن الماءَ الجاري من اقتلاع الجراثيم من سطح الجلد وجرفها ميكانيكياً. الحرارة وحدها ليست العامل المقرر — الماء البارد مع الصابون يؤدي وظيفته بكفاءة مماثلة للماء الدافئ.</p>

<hr>

<h2>الطريقة الصحيحة — الخطوات السبع التي يُفوّتها معظم الناس</h2>
<p>الدراسات تُظهر أن معظم الناس يغسلون اليدين بشكل ناقص حتى حين يعتقدون أنهم يتبعون الطريقة الصحيحة — أكثر المناطق المُهمَلة هي بين الأصابع، تحت الأظافر، وظهر اليدين:</p>

<pre style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 8px; direction: rtl; text-align: right; line-height: 1.8;">
١. بلّل اليدين بماءٍ جارٍ نظيف
          ↓
٢. أغلق الصنبور ثم ضع الصابون
   (إغلاق الصنبور يوفر الماء ويمنع إعادة تلوّث اليدين النظيفتين)
          ↓
٣. افرك راحتَي اليدين معاً
          ↓
٤. افرك ظهر كل يد بباطن اليد الأخرى مع ثني الأصابع
          ↓
٥. افرك بين الأصابع من الداخل مع تشابك الأصابع
          ↓
٦. افرك تحت الأظافر بأطراف الأصابع على الراحة
          ↓
٧. افرك إبهام كل يد بحركة دورانية
          ↓
٨. الفرك الكامل: 20 ثانية على الأقل
          ↓
٩. اشطف بالماء الجاري من المعصم للأطراف
          ↓
١٠. جفّف بمنشفة نظيفة أو منديل ورقي
    (استخدم المنديل لإغلاق الصنبور حتى لا تُلوّث يديك من جديد)
</pre>

<blockquote>
<p><strong>خدعة الـ20 ثانية للأطفال:</strong> علّق طفلك غناء "عيد ميلاد سعيد" مرتين كاملتين — هذا يُعادل تقريباً 20 ثانية الفرك الكافية.</p>
</blockquote>

<hr>

<h2>مواقيت غسل اليدين — التوقيت لا يقلّ أهمية عن الطريقة</h2>
<p>جميع منظمات الصحة العالمية وCDC والـFAO تتفق على المواقيت الحرجة التالية:</p>

<h3>قبل الطعام</h3>
<table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse:collapse;">
<thead><tr><th>الموقف</th><th>مستوى الخطر</th><th>لماذا؟</th></tr></thead>
<tbody>
<tr><td>قبل تحضير أي طعام</td><td>⚠ حرج جداً</td><td>اليدان تنقلان ملايين الجراثيم للأسطح الغذائية</td></tr>
<tr><td>أثناء التحضير (بين أنواع الطعام)</td><td>⚠ حرج</td><td>منع التلوث المتقاطع</td></tr>
<tr><td>بعد التعامل مع لحوم/دواجن/أسماك نيئة</td><td>⚠ حرج جداً</td><td>السالمونيلا، الليستيريا، الكامبيلوباكتر</td></tr>
<tr><td>قبل الأكل مباشرة</td><td>⚠ حرج</td><td>اليدان يمسّان الفم مئات المرات يومياً</td></tr>
</tbody>
</table>

<br>

<h3>بعد الملوّثات</h3>
<table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse:collapse;">
<thead><tr><th>الموقف</th><th>مستوى الخطر</th><th>لماذا؟</th></tr></thead>
<tbody>
<tr><td>بعد استخدام المرحاض</td><td>⚠ حرج جداً</td><td>براز — بكتيريا معوية تُسبّب إسهال وتسمم</td></tr>
<tr><td>بعد تغيير حفاضة الطفل</td><td>⚠ حرج جداً</td><td>نفس خطر البراز</td></tr>
<tr><td>بعد لمس الحيوانات</td><td>⚠ مرتفع</td><td>السالمونيلا، التوكسوبلازما، الريشمانيا</td></tr>
<tr><td>بعد العطس/السعال/لمس الفم</td><td>⚠ مرتفع</td><td>إنفلونزا، كوفيد، فيروسات الجهاز التنفسي</td></tr>
<tr><td>بعد لمس القمامة/أسطح عامة</td><td>⚠ متوسط-مرتفع</td><td>تنوع ميكروبي واسع</td></tr>
<tr><td>بعد العودة من الخارج</td><td>⚠ متوسط</td><td>تراكم ملوثات المواصلات والأسطح</td></tr>
</tbody>
</table>

<hr>

<h2>غسل الفواكه والخضروات — العلم وراء الماء الجاري</h2>
<h3>لماذا الماء الجاري أفضل من وعاء الغسيل؟</h3>
<p>غسل الأغذية في وعاء ثابت يُعيد توزيع الأوساخ والجراثيم من جزء من المنتج إلى آخر — الماء يتلوّث من القطعة الأولى ثم يُغلّف بقية القطع. الماء الجاري من ناحية أخرى يجرف الأوساخ والجراثيم بشكل ميكانيكي مباشر خارج السطح:</p>

<pre style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 8px; direction: rtl; text-align: right; line-height: 1.8;">
وعاء ماء راكد:
ملوّثات من قطعة أ → تنتقل لقطعة ب → تنتقل لقطعة ج
[توزيع الملوثات]

ماء جارٍ:
ملوّثات من قطعة أ → تجرفها حركة الماء للصرف
[إزالة الملوثات]
</pre>

<h3>البروتوكول الصحيح لكل نوع</h3>
<p><strong>الفواكه والخضروات ذات القشرة الصلبة (تفاح، خيار، جزر، بطاطا):</strong></p>
<ul>
<li>الغسل بالماء الجاري + الفرك بالأصابع أو فرشاة خضروات على كامل السطح — الفرك يُزيل الأوساخ المُتعلقة بالمسامات والتشقّقات</li>
<li>المنظمة الأمريكية FDA ومركز CDC لا يُوصيان باستخدام الصابون أو الخل أو بيكربونات الصوديوم — هذه المواد إذا نُقعت المنتجات فيها قد تُسبّب تلوثاً كيميائياً وتمتصّها الأسطح المسامية</li>
</ul>

<p><strong>الفواكه الطرية والتوت (فراولة، عنب، تين):</strong></p>
<ul>
<li>غسل بماء بارد جارٍ بلطف قبيل الأكل مباشرةً — ليس قبل التخزين، لأن الرطوبة تُسرّع التعفّن</li>
<li>إزالة الأوراق والأجزاء الطرية المُتلفة أولاً (البكتيريا تتمركز في الكدمات والجروح)</li>
</ul>

<p><strong>الخضروات الورقية (خس، سبانخ، ملوخية):</strong></p>
<ul>
<li>انزع الأوراق الخارجية أولاً — هي الأكثر ملامسةً للتربة والحشرات والأيدي</li>
<li>اغسل الأوراق الداخلية ورقةً ورقةً تحت الماء الجاري — لا كتلةً واحدة</li>
</ul>

<h3>القطعة التي تحتاج تشديداً: الفاكهة المُقشَّرة</h3>
<p>كثير من الناس لا يغسلون الفاكهة قبل التقشير لأن القشرة "لن تُؤكَل" — وهذا خطأ موثَّق علمياً:</p>
<p>عند دخول السكين في الفاكهة للتقشير، تنتقل الجراثيم الموجودة على سطح القشرة إلى داخل اللحم الصالح للأكل عبر حركة الشفرة ذاتها.</p>
<p>دراسات FDA أكدت هذه الآلية تحديداً في حالات تسمم بالليستيريا المرتبطة بالشمّام والبطيخ غير المغسولَين قبل التقطيع.</p>

<hr>

<h2>المقارنة: مستوى إزالة الجراثيم بطرق مختلفة</h2>
<table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse:collapse;">
<thead><tr><th>الطريقة</th><th>نسبة إزالة الجراثيم والمبيدات</th><th>مخاطر</th></tr></thead>
<tbody>
<tr><td>لا غسيل</td><td>0%</td><td>الأعلى خطراً</td></tr>
<tr><td>نقع في ماء راكد</td><td>20–40%</td><td>يُعيد توزيع ما أزاله</td></tr>
<tr><td>شطف بماء جارٍ (بدون فرك)</td><td>50–70% من الأوساخ السطحية</td><td>كافٍ للخضروات الطرية</td></tr>
<tr><td>شطف + فرك بالأصابع</td><td>75–85%</td><td>✓ الموصى به للمنزل</td></tr>
<tr><td>شطف + فرشاة خضروات</td><td>85–95%</td><td>✓ الأفضل للقشور الصلبة</td></tr>
<tr><td>خل أو ليمون مخفّف + شطف</td><td>لا يُثبت تفوّقاً على الماء الجاري</td><td>قد يُترك طعم كيميائي</td></tr>
<tr><td>صابون + شطف</td><td>FDA لا تُوصي به</td><td>احتمال امتصاص كيميائي</td></tr>
</tbody>
</table>

<hr>

<h2>تعليم الأطفال — الأساليب التي تُثبت الفارق</h2>
<p>الأبحاث تُثبت أن الفهم يُحدث سلوكاً أكثر ثباتاً من الأوامر المجردة. الطفل الذي يفهم آلية نقل الجراثيم يُطبّق الغسيل طوعاً لأنه يُدرك السبب:</p>

<ul>
<li><strong>الأسلوب العلمي البسيط:</strong> ضع قليلاً من لاصق البراق (Glitter) على يدي الطفل كـ"جراثيم وهمية"، ثم اطلب منه مصافحة أشياء في المنزل — سيرى كيف "تنتقل الجراثيم" لكل سطح. بعدها عرّفه على غسل اليدين كآلية إزالة. هذا النموذج الحسي يزيد السلوك الصحيح بنسبة تصل لـ40% في الدراسات.</li>
<li><strong>قاعدة عملية للمطبخ:</strong> علّق قائمة صغيرة بجانب الحوض بمواقيت الغسيل الأساسية — مرئية وبسيطة. الأطفال الذين يشاركون في تحضير الطعام يتعلّمون الطقوس الصحية تلقائياً حين تُمارَس أمامهم كجزء من إيقاع المطبخ الطبيعي.</li>
</ul>

<blockquote>
<p><strong>خلاصة قابلة للتطبيق فوراً:</strong> علّق منديلاً ورقياً بجانب صنبور المطبخ واجعل قاعدة الأسرة — قبل أي طعام، يداك أولاً. 20 ثانية صابون + ماء جارٍ + تجفيف = 80% تخفيض في خطر الأمراض الغذائية المنزلية.</p>
</blockquote>
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
        imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80',
        category: 'foodSafety',
    },
];
