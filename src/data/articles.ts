

export interface Article {
  id: string;
  title: {
    en: string;
    ar: string;
  };
  excerpt: {
    en: string;
    ar: string;
  };
  category: 'undernutrition' | 'overnutrition' | 'foodSafety';
  ageGroup?: 'children' | 'adults' | 'all';
  content: {
    en: string;
    ar: string;
  };
  keyTakeaways: {
    en: string[];
    ar: string[];
  };
  imageUrl: string;
}

export const articles: Article[] = [
  {
    id: '1',
    title: {
      en: 'Growth Assessment Guide and Chart Interpretation',
      ar: 'دليل تقييم النمو وتفسير مخططات النمو للأطفال'
    },
    excerpt: {
      en: 'Growth monitoring is the most powerful early diagnostic tool in pediatrics. Learn how to interpret growth charts and their implications for your child.',
      ar: 'مراقبة النمو هي أداة التشخيص المبكر الأقوى في طب الأطفال. تعرف على كيفية تفسير مخططات النمو وما تعنيه لطفلك.'
    },
    category: 'undernutrition',
    ageGroup: 'children',
    content: {
      en: `
<div dir="ltr">
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
      ar: `
<div dir="rtl">
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
<tr><td>6–12 أشهر</td><td>كل شهرين</td></tr>
<tr><td>1–2 سنة</td><td>كل 3 أشهر</td></tr>
<tr><td>2–6 سنوات</td><td>كل 6 أشهر</td></tr>
<tr><td>6–18 سنة</td><td>مرة سنوياً على الأقل</td></tr>
</tbody>
</table>
<p>تنويه هام: هذا القسم — وجميع قسم المقال — مُقدَّم لأغراض التوعية الصحية العامة ولا يُغني بأي حال عن استشارة طبيب الأطفال المتابع للحالة، الذي يُقيّم الطفل في سياقه الكامل لا بناءً على الأرقام وحدها.</p>
</div>`
    },
    keyTakeaways: {
      en: [
        'Growth monitoring detects health issues early',
        'Malnutrition impacts physical, mental, and immune health',
        'Percentiles show a child\'s rank among peers',
        'Watch for crossing percentiles or growth plateaus'
      ],
      ar: [
        'مراقبة النمو تكتشف المشاكل الصحية مبكراً',
        'سوء التغذية يؤثر على الصحة الجسدية والذهنية والمناعية',
        'المئينات توضح ترتيب الطفل بين أقرانه',
        'انتبه لعبور خطوط المئين أو توقف النمو'
      ]
    },
    imageUrl: '/images/articles/growth-assessment.jpg',
  },
  {
    id: '3',
    title: {
      en: 'Nutrition in Critical Illness and Preterm Infants',
      ar: 'التغذية في الأمراض الحرجة والأطفال الخدج'
    },
    excerpt: {
      en: 'Critically ill children and premature infants have unique nutritional needs requiring specialized therapeutic approaches.',
      ar: 'الأطفال المرضى بشكل حرج والأطفال الخدج لديهم احتياجات غذائية فريدة تتطلب أساليب علاجية متخصصة.'
    },
    category: 'undernutrition',
    ageGroup: 'children',
    content: {
      en: `
<div dir="ltr">
<p>Nutrition in the Pediatric Intensive Care Unit (PICU) and Neonatal Intensive Care Unit (NICU) is not a secondary supportive measure — it is an integral part of treatment with precise timings, dosages, and indicators that directly affect survival rates, recovery, and neurodevelopmental outcomes.</p>

<p><strong>Important Disclaimer:</strong> This section is intended for general medical awareness and education only and is in no way a substitute for specialized medical decisions by a critical care pediatrician or clinical nutritionist.</p>

<hr>

<h2>Section One: Nutrition for the Critically Ill Child — PICU</h2>
<h3>The Metabolic Response to Critical Illness — Two Biological Phases</h3>
<p>The child's body responds to critical stress (surgery, severe infection, trauma) in two distinct metabolic phases:</p>
<ul>
<li><strong>1. The Ebb Phase (24–48 hours):</strong> A period of "metabolic shock" characterized by decreased energy expenditure, reduced cardiac output, and hyperglycemia. The goal here is hemodynamic stabilization, not intensive feeding.</li>
<li><strong>2. The Flow Phase (Days to Weeks):</strong> A period of "metabolic storm" characterized by hypermetabolism and severe protein breakdown (catabolism). The body consumes its muscles to provide energy for survival.</li>
</ul>

<h3>The PICU Nutritional Goals</h3>
<ul>
<li>Mitigate the loss of Lean Body Mass (LBM).</li>
<li>Support immune function to prevent hospital-acquired infections.</li>
<li>Promote wound healing and organ function recovery.</li>
<li>Reduce the duration of mechanical ventilation and ICU stay.</li>
</ul>

<h3>Critical Risks: The "Nutrition Paradox"</h3>
<ul>
<li><strong>Underfeeding:</strong> Causes immune failure, muscle wasting (including respiratory muscles), and delayed recovery.</li>
<li><strong>Overfeeding:</strong> More dangerous in the acute phase; it causes "Metabolic Stress," liver dysfunction, and increased CO2 production, making it difficult to wean the child off the ventilator.</li>
<li><strong>Refeeding Syndrome:</strong> A life-threatening condition occurring when rapid feeding is started after prolonged starvation, leading to a sudden drop in phosphorus, potassium, and magnesium, potentially causing heart failure.</li>
</ul>

<h3>The Specialized Treatment Protocol</h3>
<ul>
<li><strong>Early Enteral Nutrition (EN):</strong> Initiating feeding via a gastric tube within 24–48 hours is the global gold standard, as it maintains "Gut Integrity" and prevents bacterial translocation.</li>
<li><strong>Protein-Sparing Strategy:</strong> Protein is the most critical nutrient. Targets range from 1.5g/kg in older children to 3g/kg in infants to counteract catabolism.</li>
<li><strong>Parenteral Nutrition (PN):</strong> Reserved for cases of absolute gut failure, requiring strict monitoring of blood lipids and sugars.</li>
</ul>

<hr>

<h2>Section Two: Nutrition for Preterm Infants — NICU</h2>
<p>For a preterm infant (born before 37 weeks), nutrition is a race against time to compensate for the "Nutritional Debt" resulting from missing the third trimester of pregnancy — the period of peak nutrient transfer.</p>

<h3>The Biological Challenge</h3>
<ul>
<li><strong>Minimal Stores:</strong> Preterm infants are born with almost zero stores of Iron, Calcium, and Fat.</li>
<li><strong>Immature Gut:</strong> Poor motility and low enzyme levels increase the risk of "Feeding Intolerance."</li>
<li><strong>The NEC Ghost:</strong> Necrotizing Enterocolitis (NEC) is the primary fear, where part of the intestine tissue dies.</li>
</ul>

<h3>NICU Nutritional Pillars</h3>
<ul>
<li><strong>1. Trophic Feeding (The "Priming" Dose):</strong> Starting extremely small amounts (10–20 ml/kg/day) of breast milk. The goal is not calories, but "training" the gut and stimulating hormone secretion to prevent atrophy.</li>
<li><strong>2. Human Milk Fortification (HMF):</strong> Mother's milk alone is insufficient for a preterm infant's rapid growth needs. Fortifiers (Protein, Calcium, Phosphorus) are added to breast milk to match intrauterine growth rates.</li>
<li><strong>3. Aggressive Early Amino Acids:</strong> Starting intravenous proteins (PN) within the first hours of life is essential to prevent the "Catabolic State" that begins immediately after birth.</li>
</ul>

<h3>Developmental Outcomes</h3>
<p>Scientific evidence confirms that "Aggressive" yet balanced nutrition in the first weeks for preterm infants is strongly correlated with higher IQ scores, better motor coordination, and reduced metabolic diseases in adulthood.</p>

<hr>

<h2>Practical Tips for Parents after ICU/NICU Discharge</h2>
<ol>
<li><strong>Follow the Growth Curve Religiously:</strong> Use specialized "Preterm Growth Charts" (like Fenton or Intergrowth-21st) as the standard curves do not apply.</li>
<li><strong>Catch-up Growth:</strong> Be patient; the child needs months or even years to close the gap with their peers.</li>
<li><strong>Specialized Formulas:</strong> If breastfeeding is not possible, use "Post-Discharge Formulas" (PDF) which are richer in minerals than standard formulas.</li>
<li><strong>Developmental Monitoring:</strong> Nutrition is the fuel for the brain; ensure regular visits to a developmental pediatrician.</li>
</ol>
</div>`,
      ar: `
<div dir="rtl">
<p>التغذية في وحدة العناية المركزة للأطفال (PICU) ووحدة العناية بالمواليد (NICU) ليست إجراءً داعماً ثانوياً — بل هي جزء لا يتجزأ من العلاج له توقيتات وجرعات ومؤشرات دقيقة تؤثر مباشرةً في معدلات البقاء والتعافي ومآلات التطور العصبي.</p>

<p><strong>تنويه هام:</strong> هذا القسم موجَّه للتوعية والتثقيف الطبي العام فقط، ولا يُغني بأي حال عن القرار الطبي المتخصص من قِبل طبيب الأطفال الحرجين أو أخصائي التغذية الإكلينيكية.</p>

<hr>

<h2>القسم الأول: تغذية الطفل المريض بشكل حرج — وحدة العناية المركزة (PICU)</h2>
<h3>الاستجابة الأيضية للمرض الحرج — المرحلتان البيولوجيتان</h3>
<p>يستجيب جسم الطفل للإجهاد الشديد (جراحة، عدوى حادة، صدمة) عبر مرحلتين استقلابيتين متمايزتين:</p>
<ul>
<li><strong>1. مرحلة الجزر (Ebb Phase):</strong> تستمر 24–48 ساعة، وهي فترة "صدمة أيضية" تتميز بانخفاض استهلاك الطاقة، ونقص النتاج القلبي، وارتفاع سكر الدم. الهدف هنا هو الاستقرار الدينياميكي وليس التغذية المكثفة.</li>
<li><strong>2. مرحلة التدفق (Flow Phase):</strong> تستمر لأيام أو أسابيع، وهي فترة "عاصفة أيضية" تتميز بفرط الأيض وتكسير شديد للبروتينات (Catabolism). الجسم "يأكل" عضلاته ليوفر طاقة للبقاء.</li>
</ul>

<h3>أهداف التغذية في العناية المركزة</h3>
<ul>
<li>الحد من فقدان الكتلة العضلية (Lean Body Mass).</li>
<li>دعم الجهاز المناعي لمنع العدوى المكتسبة في المستشفى.</li>
<li>تعزيز التئام الجروح واستعادة وظائف الأعضاء.</li>
<li>تقليل مدة البقاء على جهاز التنفس الصناعي وفي العناية.</li>
</ul>

<h3>المخاطر الحرجة: "مفارقة التغذية"</h3>
<ul>
<li><strong>نقص التغذية (Underfeeding):</strong> يسبب فشلاً مناعياً، وضمور عضلات التنفس، وتأخر التعافي.</li>
<li><strong>الإفراط في التغذية (Overfeeding):</strong> أخطر في المرحلة الحادة؛ يسبب "إجهاداً أيضياً"، وخللاً في وظائف الكبد، وزيادة إنتاج ثاني أكسيد الكربون مما يصعّب فصل الطفل عن جهاز التنفس.</li>
<li><strong>متلازمة إعادة التغذية (Refeeding Syndrome):</strong> حالة مهددة للحياة تحدث عند البدء السريع بالتغذية بعد جوع طويل، تؤدي لهبوط حاد في الفسفور والبوتاسيوم والمغنيسيوم، وقد تسبب فشل القلب.</li>
</ul>

<h3>البروتوكول العلاجي المتخصص</h3>
<ul>
<li><strong>التغذية المعوية المبكرة (Early EN):</strong> البدء عبر أنبوب المعدة خلال 24–48 ساعة هو "المعيار الذهبي" عالمياً، لأنه يحافظ على سلامة الأمعاء (Gut Integrity) ويمنع انتقال البكتيريا للدم.</li>
<li><strong>استراتيجية الحفاظ على البروتين:</strong> البروتين هو العنصر الأهم. نهدف لجرعات تصل لـ 1.5 جم/كجم في الأطفال الكبار و3 جم/كجم في الرضع لمواجهة الهدم العضلي.</li>
<li><strong>التغذية الوريدية (PN):</strong> نلجأ إليها فقط في حالات فشل الأمعاء المطلق، مع رقابة صارمة لدهون وسكريات الدم.</li>
</ul>

<hr>

<h2>القسم الثاني: تغذية الأطفال الخدج (المبتسرين) — وحدة المبتسرين (NICU)</h2>
<p>تغذية الطفل الخديج (المولود قبل 37 أسبوعاً) هي سباق مع الزمن لتعويض "الدين الغذائي" الناتج عن فقدان الثلث الأخير من الحمل — وهي فترة ذروة انتقال المغذيات.</p>

<h3>التحدي البيولوجي</h3>
<ul>
<li><strong>مخازن منعدمة:</strong> يولد الخديج بمخازن صفرية تقريباً من الحديد والكالسيوم والدهون.</li>
<li><strong>أمعاء غير ناضجة:</strong> خطر "عدم تحمل التغذية" بسبب ضعف الحركة ونقص الإنزيمات.</li>
<li><strong>شبح الـ NEC:</strong> التهاب الأمعاء والقولون الناخر (Necrotizing Enterocolitis) هو الخوف الأكبر، حيث تموت أجزاء من أنسجة الأمعاء.</li>
</ul>

<h3>ركائز التغذية في الـ NICU</h3>
<ul>
<li><strong>1. التغذية الضئيلة (Trophic Feeding):</strong> البدء بكميات متناهية الصغر (10–20 مل/كجم/يوم) من لبن الأم. الهدف ليس السعرات، بل "تدريب" الأمعاء وتحفيز إفراز الهرمونات لمنع ضمورها.</li>
<li><strong>2. تدعيم حليب الأم (Human Milk Fortification):</strong> لبن الأم وحده لا يكفي نمو الخديج السريع. نستخدم "المدعمات" (بروتين، كالسيوم، فسفور) لتصل لمعدلات النمو داخل الرحم.</li>
<li><strong>3. البدء المبكر بالأحماض الأمينية:</strong> البدء بالبروتينات الوريدية فور الولادة ضروري لمنع "الحالة الهدمية" التي تبدأ لحظة خروج الجنين.</li>
</ul>

<h3>مآلات التطور والذكاء</h3>
<p>تؤكد الأدلة العلمية أن التغذية "الهجومية" والمتوازنة في الأسابيع الأولى للخديج ترتبط ارتباطاً وثيقاً بارفاع معدلات ذكاء الطفل (IQ) وتناسقه الحركي، وتقليل الأمراض الاستقلابية في الكبر.</p>

<hr>

<h2>نصائح عملية للآباء بعد الخروج من العناية</h2>
<ol>
<li><strong>اتبع منحنى النمو بدقة:</strong> استخدم منحنيات "الخدج" الخاصة (مثل Fenton أو Intergrowth-21st) لأن المنحنيات العادية لا تنطبق عليهم.</li>
<li><strong>نمو التعويض (Catch-up Growth):</strong> كن صبوراً؛ يحتاج الطفل لأشهر أو سنوات لسد الفجوة مع أقرانه.</li>
<li><strong>الألبان المتخصصة:</strong> في حال عدم توفر لبن الأم، استخدم ألبان "ما بعد الخروج" (Post-Discharge Formulas) فهي أغنى بالمعادن من الألبان العادية.</li>
<li><strong>المتابعة التطورية:</strong> التغذية هي وقود الدماغ؛ تأكد من زيارات دورية لطبيب تطور الأطفال.</li>
</ol>
</div>`,
    },
    keyTakeaways: {
      en: [
        'Nutrition in the ICU/NICU is a vital biological therapy, not just support',
        'Protein is the critical defense against muscle wasting in severe illness',
        'Human milk fortification is essential for a preterm infant\'s brain and bone growth',
        'Careful monitoring of growth curves is mandatory after hospital discharge'
      ],
      ar: [
        'التغذية في العناية هي علاج بيولوجي وليست مجرد دعم',
        'البروتين هو خط الدفاع الأول ضد الهدم العضلي في المرض الشديد',
        'تدعيم حليب الأم ضروري لنمو دماغ وعظام الطفل الخديج',
        'المراقبة الدقيقة لمنحنيات النمو إلزامية بعد الخروج من المستشفى'
      ]
    },
    imageUrl: '/images/articles/critical-care.jpg',
  },
  {
    id: '12',
    title: {
      en: 'Understanding Protein-Energy Malnutrition (PEM)',
      ar: 'فهم سوء التغذية البروتيني-الطاقي'
    },
    excerpt: {
      en: 'Protein malnutrition is not merely hunger. Learn about Marasmus, Kwashiorkor, and critical life-saving interventions.',
      ar: 'سوء التغذية البروتيني ليس مجرد جوع. تعرف على الماراسموس والكواشيوركور والتدخلات الحاسمة لإنقاذ الحياة.'
    },
    category: 'undernutrition',
    ageGroup: 'children',
    content: {
      en: `**Understanding Protein-Energy Malnutrition (PEM)**
Protein-Energy Malnutrition (PEM) is a form of malnutrition resulting from inadequate dietary intake of protein and/or energy (calories) to meet the body's physiological needs. This disorder represents a major public health problem, particularly in low- and middle-income countries, and appears most commonly among infants and young children.

According to the World Health Organization (WHO), malnutrition stems from the inadequate intake of energy and essential nutrients, leading to weight loss, growth disruption, immune impairment, and increased rates of morbidity and mortality.

**Causes of Protein-Energy Malnutrition**
PEM arises as a result of several factors, most notably the inadequate intake of protein- and energy-rich foods, food insecurity and poverty, recurrent infections which increase nutritional needs and reduce absorption, and improper infant and young child feeding practices.

When the body does not receive sufficient nutrients, it begins to consume its own stores of fat and muscle to maintain vital functions, leading to wasting and general weakness.

**Clinical Forms of Protein-Energy Malnutrition**
PEM manifests in a spectrum of clinical conditions, including:

1.  **Marasmus:** A severe form of malnutrition resulting from a long-term deficiency in total dietary energy, characterized by severe wasting of muscle mass and adipose tissue.
    *   **Distinctive Sign:** The child appears with a face resembling an "Old man face" due to the loss of buccal fat pads (cheek fat).

2.  **Kwashiorkor:** A condition primarily associated with dietary protein deficiency, often accompanied by edema, fatty liver, dermatological changes, and hair discoloration.
    *   **Distinctive Sign:** The child appears with a "Moon face" and abdominal distension due to fluid accumulation (edema) and hepatomegaly (enlarged liver).

3.  **Marasmic-Kwashiorkor:** A mixed form where features of both Marasmus and Kwashiorkor appear simultaneously.

**WHO Classification and General Health Impact**
The WHO classifies PEM within the category of malnutrition, which includes:

*   **Wasting:** Low weight-for-height.
*   **Stunting:** Low height-for-age.
*   **Underweight:** Low weight-for-age.

**Diagnostic Tool:** The WHO utilizes the "Mid-Upper Arm Circumference" (MUAC) measurement as a rapid and simple tool to diagnose malnutrition in communities via a color-coded tape that determines the degree of severity.

WHO reports indicate that malnutrition is linked to approximately half of all deaths among children under five years of age globally. Furthermore, children with PEM are more susceptible to infection, delayed cognitive development, and long-term health complications.

**Therapeutic Intervention (Recovery Path)**
According to medical protocols, treatment proceeds through two fundamental phases:

*   **Stabilization Phase:** Focuses on treating dehydration, infection, and electrolyte imbalance.
*   **Rehabilitation Phase:** The gradual initiation of intensive feeding (such as Ready-to-Use Therapeutic Food - RUTF like therapeutic peanut butter).

**Conclusion**
Protein-Energy Malnutrition is a serious, preventable condition resulting from inadequate protein and energy intake. According to WHO guidelines, addressing this issue requires providing adequate nutrition, enhancing food security, and implementing effective public health policies, alongside early detection and appropriate therapeutic intervention, especially among the most vulnerable groups such as infants and young children.

**Important Disclaimer:** This article is provided for general awareness purposes only and in no way substitutes for consultation with a specialist physician or regular follow-up with the pediatrician managing your child's health condition.

**Resources:**
*   [World Health Organization (WHO) - Malnutrition](https://www.who.int/news-room/fact-sheets/detail/malnutrition)
*   [UNICEF - Malnutrition](https://www.unicef.org/nutrition/malnutrition)
*   [Egyptian Ministry of Health and Population](https://www.mohp.gov.eg/)`,
      ar: `**فهم سوء التغذية البروتيني-الطاقي (Protein-Energy Malnutrition – PEM)**

يُعد سوء التغذية البروتيني-الطاقي (PEM) أحد أشكال سوء التغذية الناتجة عن عدم كفاية المدخول الغذائي من البروتين و/أو الطاقة (السعرات الحرارية) لتلبية الاحتياجات الفسيولوجية للجسم. ويمثل هذا الاضطراب مشكلة صحية عامة كبرى، لا سيما في الدول منخفضة ومتوسطة الدخل، ويظهر بشكل أكثر شيوعًا بين الرضع وصغار الأطفال.

ووفقًا لمنظمة الصحة العالمية (WHO)، ينجم سوء التغذية عن عدم كفاية تناول الطاقة والعناصر الغذائية الأساسية، مما يؤدي إلى فقدان الوزن، واضطراب النمو، وضعف المناعة، وزيادة معدلات الإصابة بالأمراض والوفيات.

**أسباب سوء التغذية البروتيني-الطاقي**

ينشأ سوء التغذية البروتيني-الطاقي نتيجة عدة عوامل، من أبرزها عدم كفاية تناول الأغذية الغنية بالبروتين والطاقة، انعدام الأمن الغذائي والفقر، تكرار العدوى مما يزيد الاحتياجات الغذائية ويقلل من الامتصاص، والممارسات غير السليمة في تغذية الرضع وصغار الأطفال.

عند عدم حصول الجسم على كفايته من العناصر الغذائية، يبدأ في استهلاك مخازنه الذاتية من الدهون والعضلات للحفاظ على الوظائف الحيوية، مما يؤدي إلى الهزال والضعف العام.

**الأشكال السريرية لسوء التغذية البروتيني-الطاقي**

يتجلى سوء التغذية البروتيني-الطاقي في طيف من الحالات السريرية، تشمل:

**الماراسموس (Marasmus)**

شكل شديد من سوء التغذية ناتج عن نقص طويل الأمد في إجمالي الطاقة الغذائية، ويتميز بهزال شديد في الكتلة العضلية والأنسجة الدهنية.
**علامة مميزة:** يظهر الطفل بوجه يشبه "وجه كبار السن" (Old man face) نتيجة فقدان دهون الخدين.

**الكواشيوركور (Kwashiorkor)**

حالة ترتبط أساسًا بنقص البروتين الغذائي، وغالبًا ما تكون مصحوبة بالوذمات، والكبد الدهني، وتغيرات جلدية، وتبدل لون الشعر.
**علامة مميزة:** يظهر الطفل بـ "وجه القمر" (Moon face) وبروز البطن نتيجة تجمع السوائل (الوذمة) وتضخم الكبد.

**الماراسموس-كواشيوركور (Marasmic-Kwashiorkor)**

شكل مختلط تظهر فيه سمات كلٍّ من الماراسموس والكواشيوركور معًا.

**تصنيف منظمة الصحة العالمية والأثر الصحي العام**

تصنّف منظمة الصحة العالمية سوء التغذية البروتيني-الطاقي ضمن فئة سوء التغذية، والتي تشمل **الهزال (Wasting)** (انخفاض الوزن بالنسبة للطول)، **التقزم (Stunting)** (انخفاض الطول بالنسبة للعمر)، و**نقص الوزن (Underweight)** (انخفاض الوزن بالنسبة للعمر).

**أداة التشخيص:** تستخدم منظمة الصحة العالمية قياس "محيط منتصف أعلى الذراع" (MUAC) كأداة سريعة وبسيطة لتشخيص سوء التغذية في المجتمعات عبر شريط ملون يحدد درجة الخطورة.

وتشير تقارير منظمة الصحة العالمية إلى أن سوء التغذية يرتبط بما يقرب من نصف الوفيات بين الأطفال دون سن الخامسة عالميًا. كما أن الأطفال المصابين بسوء التغذية البروتيني-الطاقي يكونون أكثر عرضة للإصابة بالعدوى، وتأخر النمو المعرفي، والمضاعفات الصحية طويلة الأمد.

**التدخل العلاجي (مسار التعافي)**

وفقاً للبروتوكولات الطبية، يمر العلاج بمرحلتين أساسيتين:

1. **مرحلة الاستقرار (Stabilization):** تركز على علاج الجفاف، العدوى، واختلال الأملاح.
2. **مرحلة التأهيل (Rehabilitation):** البدء بالتدريج في التغذية المكثفة (مثل زبدة الفول السوداني العلاجية RUTF).

**الخلاصة**

يُعد سوء التغذية البروتيني-الطاقي حالة خطيرة يمكن الوقاية منها، وتنجم عن عدم كفاية تناول البروتين والطاقة. ووفقًا لإرشادات منظمة الصحة العالمية، فإن التصدي لهذه المشكلة يتطلب توفير تغذية كافية، وتعزيز الأمن الغذائي، وتطبيق سياسات صحية عامة فعّالة، إلى جانب الكشف المبكر والتدخل العلاجي المناسب، خاصة لدى الفئات الأكثر عرضة للخطر مثل الرضع وصغار الأطفال.

**تنويه هام:** هذه المقالة مقدمة لأغراض التوعية العامة فقط، ولا تغني بأي حال من الأحوال عن استشارة الطبيب المختص أو المتابعة الدورية مع طبيب الأطفال المتابع للحالة الصحية لطفلك.

**المصادر:**
* [World Health Organization (WHO) - Malnutrition](https://www.who.int/news-room/fact-sheets/detail/malnutrition)
* [UNICEF - Malnutrition](https://www.unicef.org/nutrition/malnutrition)
* [Egyptian Ministry of Health and Population](https://www.mohp.gov.eg/)`,
    },
    keyTakeaways: {
      en: [
        'PEM manifests as Marasmus (wasting) or Kwashiorkor (edema)',
        'It is associated with nearly 50% of child deaths globally',
        'Early detection via anthropometric measurements is key',
        'Treatment focuses on restoring metabolic balance and gradual refeeding'
      ],
      ar: [
        'يظهر سوء التغذية كـ ماراسموس (هزال) أو كواشيوركور (وذمة)',
        'يرتبط بما يقرب من 50% من وفيات الأطفال عالمياً',
        'الكشف المبكر عبر القياسات الجسمية هو المفتاح',
        'يركز العلاج على استعادة التوازن الأيضي وإعادة التغذية التدريجية'
      ]
    },
    imageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80'
  },
  {
    id: '13',
    title: {
      en: 'General Management of the Newborn',
      ar: 'الإدارة العامة لحديثي الولادة'
    },
    excerpt: {
      en: 'An Essential Guide for New Parents Covering Thermoregulation, Nutritional Safety, Hygiene, and Prevention of Sudden Infant Death Syndrome (SIDS).',
      ar: 'دليل أساسي للآباء الجدد يغطي تنظيم الحرارة، سلامة التغذية، النظافة، والوقاية من الموت المفاجئ للرضع.'
    },
    category: 'undernutrition',
    ageGroup: 'children',
    content: {
      en: `**General Management of the Newborn**

The neonatal period (the first 28 days of life) constitutes the most critical interval for child survival and health. Proper management during this phase establishes the foundation for healthy growth and development.

**First: Immediate Care and Vaccinations**

*   **Care at Birth:** The newborn must be dried immediately to prevent hypothermia. Placing the infant on the mother’s chest promotes bonding and assists in regulating body temperature and heart rate. It is advisable to delay umbilical cord clamping (waiting 1–3 minutes) to increase iron stores and blood volume.
*   **Basic Neonatal Care (First 24 Hours):** Essential steps include administering a Vitamin K injection to prevent hemorrhagic disease, applying antibiotic eye ointment to prevent infection, and receiving the first dose of the Hepatitis B vaccine. A comprehensive assessment must also be conducted to screen for congenital anomalies, respiratory distress, or other urgent concerns.
*   **Neonatal Vaccinations:** Immediately upon birth: These include the BCG vaccine (Tuberculosis), Hepatitis B vaccine, and the zero dose of the Polio vaccine. (Note: In some nations, the BCG vaccine is administered within the first forty days of the infant's life).

**Second: Daily Care and Nutrition**

*   **Nutrition:** Exclusive breastfeeding is recommended for the first six months, at a frequency of 8–12 times per 24 hours (on demand). Early hunger cues (such as hand sucking or restlessness) must be observed and responded to prior to the onset of severe crying. Signs of adequate nutrition include the infant sleeping well post-feeding, weight gain, and the presence of 6+ wet diapers daily.
*   **Important Addition:** Most modern medical protocols advise initiating Vitamin D drops (400 IU) daily from the first day of life, particularly for breastfed infants.
*   **Hygiene and Umbilical Cord Care:** Maintain the umbilical cord stump clean and dry; "dry care" (allowing the navel to air dry) is the optimal method to accelerate separation. Avoid applying alcohol or herbal remedies unless prescribed by a physician. Delay the first bath for at least 24 hours to maintain body temperature, then bathe 2–3 times weekly. Gently clean the diaper area with water or fragrance-free wipes to prevent diaper rash.

**Third: Sleep Patterns and Physical Activity**

**Sleep Patterns and Needs:**
*   **0–3 Months:** Sleeps 14–17 hours daily (in short cycles).
*   **4–12 Months:** Requires 12–16 hours, with sleep consolidation at night and two daytime naps.
*   **1–5 Years:** Requires 10–14 hours, with naps decreasing gradually until often disappearing by age five.

**Sleep Safety (Prevention of Sudden Death):** Always place the infant on their back to sleep on a firm mattress, avoiding pillows or soft toys in the crib. The infant should sleep in the parents' room but in a separate crib for the first six months. Avoid overheating the child with excessively heavy clothing; a moderate ambient and clothing temperature must be maintained.

**Physical Activity and Motor Development:**
To ensure holistic growth, attention must be paid to vital aspects supporting the child's motor and cognitive development:
*   **In Infancy (Early Activity):** The infant requires 30 to 60 minutes distributed throughout the day. Activity is calculated via "Tummy Time" while awake. (Example: Placing the child on their stomach to attempt head lifting; this strengthens neck and back muscles and prevents plagiocephaly/flat head syndrome).
*   **From 1–5 Years:** Engaging in physical activity for 180 minutes daily (free play, running, and jumping).

**Fourth: Warning Signs (When to Seek Medical Assistance)**
Parents must seek immediate medical attention if the newborn exhibits signs such as:

*   Fever (> 38°C) or hypothermia (< 36.5°C).
*   Respiratory distress (rapid breathing, grunting, chest retractions).
*   Jaundice (yellowing of the skin/eyes, especially in the first 24 hours).
*   Feeding difficulties, lethargy, signs of infection around the umbilical cord, or seizures.

**Important Disclaimer:** This article is provided for general awareness purposes only and in no way substitutes for consultation with a specialist physician or regular follow-up with the pediatrician managing your child's health condition.

**Resources:**
*   [World Health Organization (WHO) - Newborn Health](https://www.who.int/health-topics/newborn-health)
*   [UNICEF - Newborn Care](https://www.unicef.org/health/newborn-care)
*   [Egyptian Ministry of Health and Population](https://www.mohp.gov.eg/)`,
      ar: `**الإدارة العامة لحديثي الولادة**

تُعد فترة حديثي الولادة (أول 28 يومًا من الحياة) الفترة الأكثر حساسية لبقاء الطفل وصحته. الإدارة السليمة خلال هذه المرحلة تضع الأساس للنمو والتطور الصحي.

**أولاً: الرعاية الفورية والتطعيمات**

**الرعاية عند الولادة:**
يجب تجفيف المولود فورًا لمنع انخفاض حرارة الجسم. وضع الطفل على صدر الأم يعزز الترابط ويساعد في تنظيم درجة الحرارة ومعدل ضربات القلب. يُنصح بتأخير قطع الحبل السري (الانتظار 1 - 3 دقائق) لزيادة مخزون الحديد وحجم الدم.

**رعاية حديثي الولادة الأساسية (أول 24 ساعة):**
تشمل الخطوات الأساسية إعطاء حقنة فيتامين ك لمنع النزيف، وضع مرهم مضاد حيوي للعين لمنع العدوى، وتلقي الجرعة الأولى من لقاح التهاب الكبد ب. كما يجب إجراء تقييم شامل للتحقق من العيوب الخلقية، الضائقة التنفسية، أو أي مخاوف عاجلة أخرى.

**تطعيمات حديثي الولادة:**
عند الولادة مباشرة: تشمل تطعيم (الدرن / BCG)، وتطعيم التهاب الكبد الوبائي B، والجرعة الصفرية من شلل الأطفال. (ملاحظة: في بعض الدول يُعطى تطعيم الدرن خلال الأربعين يومًا الأولى من عمر الطفل).

**ثانياً: الرعاية اليومية والتغذية**

**التغذية:**
يُوصى بالرضاعة الطبيعية الحصرية للأشهر الستة الأولى، بمعدل 8 - 12 مرة كل 24 ساعة (عند الطلب). يجب مراقبة علامات الجوع المبكرة (مثل مص اليدين أو التململ) والاستجابة لها قبل وصول الطفل لمرحلة البكاء الشديد. تشمل علامات كفاية التغذية نوم الطفل جيدًا بعد الرضاعة، واكتساب الوزن، ووجود 6+ حفاضات مبللة/يومياً.

**إضافة هامة:** تنصح معظم البروتوكولات الطبية الحديثة ببدء نقاط فيتامين د (400 وحدة دولية) يوميًا منذ اليوم الأول للولادة، خاصة للأطفال الذين يعتمدون على الرضاعة الطبيعية.

**النظافة والعناية بالحبل السري:**
حافظ على بقايا الحبل السري نظيفة وجافة؛ "العناية الجافة" (ترك السرة لتجف بالهواء) هي الطريقة الأفضل لتسريع سقوطها، وتجنب وضع الكحول أو العلاجات العشبية ما لم يصفها الطبيب. أخر الاستحمام الأول لمدة 24 ساعة على الأقل للحفاظ على حرارة الجسم، ثم استحم 2 - 3 مرات أسبوعياً. نظف منطقة الحفاض برفق بالماء أو مناديل خالية من العطر لمنع الطفح الجلدي.

**ثالثاً: نمط النوم والنشاط البدني**

**نمط النوم واحتياجاته:**
* **0-3 أشهر:** ينام 14-17 ساعة يومياً (في دورات قصيرة).
* **4-12 شهر:** يحتاج 12-16 ساعة، مع استقرار النوم ليلاً وقيلولتين نهاراً.
* **1-5 سنوات:** يحتاج 10-14 ساعة، وتقل القيلولة تدريجياً حتى تختفي غالباً عند سن الخامسة.

**سلامة النوم (الوقاية من الموت المفاجئ):**
ضع الطفل دائمًا على ظهره للنوم على مرتبة صلبة، وتجنب الوسائد أو الألعاب اللينة في السرير. يجب أن ينام الطفل في غرفة الوالدين ولكن في سرير منفصل للأشهر الستة الأولى. تجنب الإفراط في تدفئة الطفل بملابس ثقيلة جداً، حيث يجب الحفاظ على درجة حرارة معتدلة للمحيط وللملابس.

**النشاط البدني والتطور الحركي:**
لضمان نمو متكامل، يجب الاهتمام بالجوانب الحيوية التي تدعم التطور الحركي والذهني للطفل:
* **في مرحلة الرضاعة (النشاط المبكر):** يحتاج الرضيع من 30 إلى 60 دقيقة موزعة على مدار اليوم. يتم حساب النشاط من خلال وقت البطن (Tummy Time) وهو مستيقظ. (مثال: وضع الطفل على بطنه ليحاول رفع رأسه؛ هذا يقوي عضلات الرقبة والظهر ويمنع تسطح الرأس).
* **من 1-5 سنوات:** ممارسة نشاط بدني لمدة 180 دقيقة يومياً (لعب حر، جري، وقفز).

**رابعاً: علامات التحذير (متى تطلب المساعدة الطبية)**

يجب على الوالدين طلب العناية الطبية الفورية إذا ظهرت على المولود علامات مثل:
* **الحمى (> 38 درجة مئوية) أو انخفاض حرارة الجسم (< 36.5 درجة مئوية).**
* **صعوبة التنفس (تنفس سريع، شخير، انكماش الصدر).**
* **اليرقان (اصفرار الجلد/العينين، خاصة في أول 24 ساعة).**
* **صعوبات التغذية، الخمول، علامات العدوى حول الحبل السري، أو التشنجات.**

**تنويه هام:** هذه المقالة مقدمة لأغراض التوعية العامة فقط، ولا تغني بأي حال من الأحوال عن استشارة الطبيب المختص أو المتابعة الدورية مع طبيب الأطفال المتابع للحالة الصحية لطفلك.

**المصادر:**
* [World Health Organization (WHO) - Newborn Health](https://www.who.int/health-topics/newborn-health)
* [UNICEF - Newborn Care](https://www.unicef.org/health/newborn-health)
* [Egyptian Ministry of Health and Population](https://www.mohp.gov.eg/)`,
    },
    keyTakeaways: {
      en: [
        'Newborns need one more layer of clothing than adults',
        'Sterilize bottles and mix formula with 70°C water',
        'Back sleeping on a firm surface prevents SIDS',
        'Monitor diaper output to ensure adequate nutrition'
      ],
      ar: [
        'يحتاج حديثو الولادة لطبقة ملابس إضافية واحدة عن البالغين',
        'عقم الزجاجات واخلط الحليب بماء درجة حرارته 70 مئوية',
        'النوم على الظهر على سطح صلب يمنع الموت المفاجئ',
        'راقب عدد الحفاضات للتأكد من كفاية التغذية'
      ]
    },
    imageUrl: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800&q=80'
  },
];
