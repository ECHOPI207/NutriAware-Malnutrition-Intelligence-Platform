import { Children } from "react";

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
      en: 'Growth Assessment and Interpretation of Growth Charts',
      ar: 'تقييم النمو وتفسير مخططات النمو'
    },
    excerpt: {
      en: 'Growth charts are scientifically validated tools used to track child development and detect nutritional problems early.',
      ar: 'مخططات النمو هي أدوات علمية مُعتمدة تُستخدم لتتبع نمو الطفل واكتشاف المشاكل الغذائية مبكراً.'
    },
    category: 'undernutrition',
    ageGroup: 'children',
    content: {
      en: `Monitoring growth represents the first line of defense for detecting any health or nutritional problem. Growth charts are the scientifically validated tools used by clinicians and researchers to track a child's development and compare it with globally established healthy growth standards.

**Key Anthropometric Measurements:**

Growth charts rely on a set of measurements compared to healthy children of the same age and sex:

- **Weight-for-Age:** Monitors acute changes in nutritional status.
- **Length/Stature-for-Age:** Reflects long-term nutritional history. Low values are often indicative of stunting, a form of chronic malnutrition.
- **Head Circumference-for-Age:** Critically important during the first two years of life, as it mirrors brain growth rates.
- **BMI-for-Age:** Applied from age two onward to assess thinness or obesity.

**Understanding Percentiles and Their Interpretation:**

When a child's measurement is plotted on the chart, it aligns with a specific percentile that indicates their position relative to peers:

- **Healthy growth:** Maintaining the child's individual trajectory between the 5th and 85th percentiles.
- **Underweight or wasting:** Weight or BMI falling below the 5th percentile.
- **Overweight or obesity:** BMI falling above the 95th percentile.

**Red Flags Not to Be Overlooked:**

- **Crossing Percentiles:** A sudden drop across two or more major percentile lines.
- **Weight Plateau or Loss:** Weight remaining unchanged for over a month, or actual weight loss.
- **Disproportionate Growth:** Excessively rapid weight gain without appropriate linear growth.

Growth monitoring should be performed regularly during well-child visits, with measurements plotted accurately on standardized growth charts. Any concerning patterns should prompt further nutritional assessment and intervention.

**Resources:**
*   [World Health Organization (WHO) - Child Growth Standards](https://www.who.int/tools/child-growth-standards)
*   [Centers for Disease Control and Prevention (CDC) - Growth Charts](https://www.cdc.gov/growthcharts/index.htm)
*   [Egyptian Ministry of Health and Population](https://www.mohp.gov.eg/)`,
      ar: `مراقبة النمو تمثل خط الدفاع الأول لاكتشاف أي مشكلة صحية أو غذائية. مخططات النمو هي الأدوات المُعتمدة علمياً التي يستخدمها الأطباء والباحثون لتتبع نمو الطفل ومقارنته بمعايير النمو الصحي المُعتمدة عالمياً.

  **القياسات الأنثروبومترية الرئيسية:**

  تعتمد مخططات النمو على مجموعة من القياسات مقارنة بالأطفال الأصحاء من نفس العمر والجنس:

  - **الوزن مقابل العمر:** يراقب التغيرات الحادة في الحالة الغذائية.
  - **الطول/القامة مقابل العمر:** يعكس التاريخ الغذائي طويل الأمد. القيم المنخفضة غالباً ما تشير إلى التقزم، وهو شكل من أشكال سوء التغذية المزمن.
  - **محيط الرأس مقابل العمر:** مهم للغاية خلال السنتين الأوليين من الحياة، حيث يعكس معدلات نمو الدماغ.
  - **مؤشر كتلة الجسم مقابل العمر:** يُطبق من عمر سنتين فصاعداً لتقييم النحافة أو السمنة.

  **فهم المئينات وتفسيرها:**

  عندما يتم رسم قياس الطفل على المخطط، فإنه يتوافق مع مئين محدد يشير إلى موقعه بالنسبة لأقرانه:

  - **النمو الصحي:** الحفاظ على مسار الطفل الفردي بين المئين الخامس والخامس والثمانين.
  - **نقص الوزن أو الهزال:** الوزن أو مؤشر كتلة الجسم يقع أقل من المئين الخامس.
  - **زيادة الوزن أو السمنة:** مؤشر كتلة الجسم يقع أعلى من المئين الخامس والتسعين.

  **علامات التحذير التي لا يجب تجاهلها:**

  - **عبور المئينات:** انخفاض مفاجئ عبر خطين رئيسيين أو أكثر من خطوط المئين.
  - **ثبات الوزن أو فقدانه:** بقاء الوزن دون تغيير لأكثر من شهر، أو فقدان الوزن الفعلي.
  - **النمو غير المتناسب:** زيادة سريعة مفرطة في الوزن دون نمو خطي مناسب.

  يجب إجراء مراقبة النمو بانتظام خلال زيارات الطفل السليم، مع رسم القياسات بدقة على مخططات النمو المعيارية. أي أنماط مثيرة للقلق يجب أن تدفع إلى مزيد من التقييم الغذائي والتدخل.

  **المصادر:**
  *   [World Health Organization (WHO) - Child Growth Standards](https://www.who.int/tools/child-growth-standards)
  *   [Centers for Disease Control and Prevention (CDC) - Growth Charts](https://www.cdc.gov/growthcharts/index.htm)
  *   [Egyptian Ministry of Health and Population](https://www.mohp.gov.eg/)`,
    },
    keyTakeaways: {
      en: [
        'Growth charts are essential tools for early detection of nutritional problems',
        'Percentiles indicate a child\'s position relative to healthy peers',
        'Crossing percentile lines is a red flag requiring investigation',
        'Regular monitoring during well-child visits is crucial'
      ],
      ar: [
        'مخططات النمو أدوات أساسية للكشف المبكر عن المشاكل الغذائية',
        'المئينات تشير إلى موقع الطفل بالنسبة لأقرانه الأصحاء',
        'عبور خطوط المئين علامة تحذير تتطلب التحقيق',
        'المراقبة المنتظمة خلال زيارات الطفل السليم أمر حاسم'
      ]
    },
    imageUrl: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=80',
  },
  {
    id: '2',
    title: {
      en: 'Nutrition in Infancy and Complementary Feeding',
      ar: 'التغذية في مرحلة الرضاعة والتغذية التكميلية'
    },
    excerpt: {
      en: 'The first year of life is marked by rapid growth. Proper nutrition during infancy lays the foundation for lifelong health.',
      ar: 'السنة الأولى من الحياة تتميز بنمو سريع. التغذية السليمة خلال مرحلة الرضاعة تضع الأساس للصحة مدى الحياة.'
    },
    category: 'undernutrition',
    ageGroup: 'children',
    content: {
      en: `**Infant Growth and Body Composition:**

The first year of life is marked by rapid growth. Birth weight typically doubles between 4–6 months, and triples by one year of age. Length increases by approximately 25 cm during the first year. This rapid growth requires adequate nutrition to support physical and cognitive development.

**Exclusive Breastfeeding (0-6 months):**

Breast milk is the optimal source of nutrition for infants, providing:

- Perfect balance of nutrients
- Antibodies and immune factors
- Easy digestibility
- Protection against infections and allergies
- Bonding between mother and infant

The World Health Organization recommends exclusive breastfeeding for the first 6 months of life, meaning no other foods or liquids, not even water.

**Complementary Feeding (6-24 months):**

Complementary foods must be introduced at the appropriate time to meet the child's increasing nutritional demands:

- **6 months:** Introduction of first foods alongside continued breastfeeding. Start with iron-rich foods such as fortified cereals, pureed meats, or legumes.
- **7-8 months:** Gradually increase food consistency and variety. Introduce mashed and soft finger foods.
- **9-11 months:** Offer chopped family foods and encourage self-feeding.
- **12-24 months:** Continue breastfeeding while offering a variety of family foods.

**Critical Micronutrients:**

- **Iron:** Stores become insufficient after 4–6 months; therefore, additional dietary iron sources are essential. Iron-rich foods include meat, poultry, fish, fortified cereals, and legumes.
- **Zinc:** Important for growth and immune function. Found in meat, dairy, and whole grains.
- **Vitamin D:** Essential for bone health. Breastfed infants may need supplementation.
- **Vitamin A:** Critical for vision and immune function. Found in orange and yellow vegetables.

**Important Warnings:**

- Cow's milk must NOT be introduced before one year of age due to its low iron content and potential to cause intestinal bleeding.
- Honey should be avoided before 12 months due to risk of infant botulism.
- Avoid added salt and sugar in infant foods.
- Never force-feed; respect the infant's hunger and satiety cues.

**Responsive Feeding:**

Feed slowly and patiently, encourage but do not force eating, talk to the child during feeding, and maintain eye contact. This approach promotes healthy eating behaviors and prevents feeding difficulties.

**Resources:**
*   [World Health Organization (WHO) - Infant and Young Child Feeding](https://www.who.int/news-room/fact-sheets/detail/infant-and-young-child-feeding)
*   [UNICEF - Nutrition](https://www.unicef.org/nutrition)
*   [Egyptian Ministry of Health and Population](https://www.mohp.gov.eg/)`,
      ar: `**نمو الرضيع وتكوين الجسم:**

السنة الأولى من الحياة تتميز بنمو سريع. عادة ما يتضاعف وزن الولادة بين 4-6 أشهر، ويتضاعف ثلاث مرات بحلول عمر سنة واحدة. يزداد الطول بحوالي 25 سم خلال السنة الأولى. هذا النمو السريع يتطلب تغذية كافية لدعم النمو البدني والمعرفي.

**الرضاعة الطبيعية الحصرية (0-6 أشهر):**

حليب الأم هو المصدر الأمثل للتغذية للرضع، حيث يوفر:

- توازن مثالي للعناصر الغذائية
- الأجسام المضادة وعوامل المناعة
- سهولة الهضم
- الحماية من العدوى والحساسية
- الترابط بين الأم والرضيع

توصي منظمة الصحة العالمية بالرضاعة الطبيعية الحصرية للأشهر الستة الأولى من الحياة، أي عدم تناول أي أطعمة أو سوائل أخرى، ولا حتى الماء.

**التغذية التكميلية (6-24 شهراً):**

يجب إدخال الأطعمة التكميلية في الوقت المناسب لتلبية الاحتياجات الغذائية المتزايدة للطفل:

- **6 أشهر:** إدخال الأطعمة الأولى جنباً إلى جنب مع استمرار الرضاعة الطبيعية. ابدأ بالأطعمة الغنية بالحديد مثل الحبوب المدعمة أو اللحوم المهروسة أو البقوليات.

- **7-8 أشهر:** زيادة قوام الطعام وتنوعه تدريجياً. قدم الأطعمة المهروسة والأطعمة الطرية التي يمكن تناولها باليد.

- **9-11 شهراً:** قدم أطعمة العائلة المقطعة وشجع على التغذية الذاتية.

- **12-24 شهراً:** استمر في الرضاعة الطبيعية مع تقديم مجموعة متنوعة من أطعمة العائلة.

**المغذيات الدقيقة الحرجة:**

- **الحديد:** تصبح المخزونات غير كافية بعد 4-6 أشهر؛ لذلك، مصادر الحديد الغذائية الإضافية ضرورية. الأطعمة الغنية بالحديد تشمل اللحوم والدواجن والأسماك والحبوب المدعمة والبقوليات.

- **الزنك:** مهم للنمو ووظيفة المناعة. يوجد في اللحوم ومنتجات الألبان والحبوب الكاملة.

- **فيتامين د:** ضروري لصحة العظام. قد يحتاج الرضع الذين يرضعون رضاعة طبيعية إلى مكملات.

- **فيتامين أ:** حاسم للرؤية ووظيفة المناعة. يوجد في الخضروات البرتقالية والصفراء.

**تحذيرات مهمة:**

- يجب عدم إدخال حليب البقر قبل عمر سنة واحدة بسبب محتواه المنخفض من الحديد واحتمال تسببه في نزيف معوي.

- يجب تجنب العسل قبل 12 شهراً بسبب خطر التسمم الغذائي للرضع.

- تجنب إضافة الملح والسكر في أطعمة الرضع.

- لا تجبر الطفل على الأكل أبداً؛ احترم إشارات الجوع والشبع لدى الرضيع.

**التغذية المستجيبة:**

أطعم ببطء وصبر، شجع ولكن لا تجبر على الأكل، تحدث إلى الطفل أثناء الإطعام، وحافظ على التواصل البصري. هذا النهج يعزز سلوكيات الأكل الصحية ويمنع صعوبات التغذية.

**المصادر:**
*   [World Health Organization (WHO) - Infant and Young Child Feeding](https://www.who.int/news-room/fact-sheets/detail/infant-and-young-child-feeding)
*   [UNICEF - Nutrition](https://www.unicef.org/nutrition)
*   [Egyptian Ministry of Health and Population](https://www.mohp.gov.eg/)
`,
    },
    keyTakeaways: {
      en: [
        'Exclusive breastfeeding for first 6 months is optimal',
        'Introduce iron-rich complementary foods at 6 months',
        'Cow\'s milk should not be given before 12 months',
        'Responsive feeding promotes healthy eating behaviors'
      ],
      ar: [
        'الرضاعة الطبيعية الحصرية للأشهر الستة الأولى هي الأمثل',
        'قدم الأطعمة التكميلية الغنية بالحديد في عمر 6 أشهر',
        'لا ينبغي إعطاء حليب البقر قبل 12 شهراً',
        'التغذية المستجيبة تعزز سلوكيات الأكل الصحية'
      ]
    },
    imageUrl: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&q=80',
  },
  {
    id: '3',
    title: {
      en: 'Nutrition in Critical Illness and Preterm Infants',
      ar: 'التغذية في الأمراض الحرجة والأطفال الخدج'
    },
    excerpt: {
      en: 'Critically ill children and preterm infants have unique nutritional needs requiring specialized therapeutic approaches.',
      ar: 'الأطفال المرضى بشكل حرج والأطفال الخدج لديهم احتياجات غذائية فريدة تتطلب أساليب علاجية متخصصة.'
    },
    category: 'undernutrition',
    ageGroup: 'children',
    content: {
      en: `**Nutritional Care for Children in the Pediatric Intensive Care Unit (PICU):**

Critically ill children experience profound metabolic disturbances that significantly impact their nutritional status and requirements.

**Metabolic Response to Injury:**

The body's response to critical illness occurs in two phases:

- **Catabolic Phase (Ebb Phase):** Immediate response characterized by decreased metabolic rate, reduced cardiac output, and shock. This phase typically lasts 24-48 hours.

- **Flow Phase:** Characterized by hypermetabolism, increased energy expenditure, protein catabolism, and insulin resistance. This phase can last weeks to months depending on illness severity.

**Nutritional Goals in PICU:**

- Prevent further nutritional deterioration
- Support immune function
- Promote wound healing and recovery
- Minimize complications

**Dual Feeding Challenge:**

- **Underfeeding:** Compromises immunity, delays wound healing, prolongs mechanical ventilation, and increases infection risk.
- **Overfeeding:** May hinder mechanical ventilation (increased CO2 production), cause hepatic dysfunction (fatty liver), hyperglycemia, and electrolyte imbalances.

**Therapeutic Protocols:**

- **Enteral Nutrition (EN) is Preferred:** Should begin early (within 24-48 hours) when hemodynamically stable. EN maintains gut integrity, reduces infection risk, and is more physiologic than parenteral nutrition.

- **High Protein Requirements:** These children require high protein doses, starting at a minimum of 1.5 g/kg/day, and may need up to 2-3 g/kg/day depending on illness severity and degree of catabolism.

- **Energy Requirements:** Typically 1.2-1.5 times resting energy expenditure, but should be individualized based on indirect calorimetry when available.

**Nutrition in Preterm Infants:**

A preterm infant (born before 37 weeks of gestation) has not completed the accumulation of essential nutrient stores that normally occurs during the third trimester.

**Unique Challenges:**

- Immature gastrointestinal tract
- Limited nutrient stores (especially calcium, phosphorus, iron)
- Increased metabolic demands
- Immature organ systems

**Nutritional Goal:**

To mimic the rapid intrauterine growth that would have occurred before term, aiming for growth rates of 15-20 g/kg/day.

**Human Milk Fortification:**

Breast milk for preterm infants requires fortifiers to increase its protein, calcium, phosphorus, and caloric content. Standard fortification typically provides:

- Additional protein: 0.8-1.0 g/100 mL
- Increased calcium and phosphorus for bone mineralization
- Enhanced caloric density: 24-26 kcal/oz (vs. 20 kcal/oz in unfortified milk)

**Specialized Preterm Formulas:**

When mother's milk is unavailable, specialized preterm formulas provide:

- Higher protein content (2.4-3.0 g/100 kcal)
- Increased minerals for bone growth
- Enhanced caloric density
- Easily digestible fats and proteins

**Monitoring and Complications:**

Close monitoring is essential for:

- Growth parameters (weight, length, head circumference)
- Feeding tolerance
- Metabolic bone disease
- Necrotizing enterocolitis (NEC) risk
- Nutritional deficiencies

The transition from hospital to home requires careful planning to ensure continued optimal nutrition and growth.

**Resources:**
*   [European Society for Paediatric Gastroenterology Hepatology and Nutrition (ESPGHAN)](https://www.espghan.org/)
*   [American Academy of Pediatrics (AAP)](https://www.aap.org/)
*   [Egyptian Ministry of Health and Population](https://www.mohp.gov.eg/)`,
      ar: `**الرعاية الغذائية للأطفال في وحدة العناية المركزة للأطفال:**

يعاني الأطفال المرضى بشكل حرج من اضطرابات استقلابية عميقة تؤثر بشكل كبير على حالتهم الغذائية ومتطلباتهم.

**الاستجابة الأيضية للإصابة:**

استجابة الجسم للمرض الحرج تحدث في مرحلتين:

- **المرحلة الهدمية (مرحلة الجزر):** استجابة فورية تتميز بانخفاض معدل الأيض، وانخفاض النتاج القلبي، والصدمة. تستمر هذه المرحلة عادة 24-48 ساعة.

- **مرحلة التدفق:** تتميز بفرط الأيض، وزيادة إنفاق الطاقة، وتقويض البروتين، ومقاومة الأنسولين. يمكن أن تستمر هذه المرحلة من أسابيع إلى أشهر اعتماداً على شدة المرض.

**الأهداف الغذائية في وحدة العناية المركزة:**

- منع المزيد من التدهور الغذائي
- دعم وظيفة المناعة
- تعزيز التئام الجروح والتعافي
- تقليل المضاعفات

**تحدي التغذية المزدوج:**

- **نقص التغذية:** يضعف المناعة، ويؤخر التئام الجروح، ويطيل التهوية الميكانيكية، ويزيد من خطر العدوى.

- **الإفراط في التغذية:** قد يعيق التهوية الميكانيكية (زيادة إنتاج ثاني أكسيد الكربون)، ويسبب خلل وظيفي كبدي (الكبد الدهني)، وارتفاع السكر في الدم، واختلال التوازن الكهربائي.

**البروتوكولات العلاجية:**

- **التغذية المعوية مفضلة:** يجب أن تبدأ مبكراً (خلال 24-48 ساعة) عندما يكون المريض مستقراً ديناميكياً. التغذية المعوية تحافظ على سلامة الأمعاء، وتقلل من خطر العدوى، وهي أكثر فسيولوجية من التغذية الوريدية.

- **متطلبات البروتين العالية:** يحتاج هؤلاء الأطفال إلى جرعات عالية من البروتين، تبدأ من 1.5 جم/كجم/يوم كحد أدنى، وقد يحتاجون إلى 2-3 جم/كجم/يوم اعتماداً على شدة المرض ودرجة التقويض.

- **متطلبات الطاقة:** عادة 1.2-1.5 مرة من إنفاق الطاقة أثناء الراحة، ولكن يجب تخصيصها بناءً على قياس السعرات الحرارية غير المباشر عند توفره.

**التغذية في الأطفال الخدج:**

الطفل الخديج (المولود قبل 37 أسبوعاً من الحمل) لم يكمل تراكم مخزونات العناصر الغذائية الأساسية التي تحدث عادة خلال الثلث الثالث من الحمل.

**التحديات الفريدة:**

- الجهاز الهضمي غير الناضج
- مخزونات محدودة من العناصر الغذائية (خاصة الكالسيوم والفوسفور والحديد)
- زيادة المتطلبات الأيضية
- أنظمة الأعضاء غير الناضجة

**الهدف الغذائي:**

محاكاة النمو السريع داخل الرحم الذي كان سيحدث قبل الولادة، بهدف معدلات نمو 15-20 جم/كجم/يوم.

**تدعيم حليب الأم:**

حليب الأم للأطفال الخدج يتطلب مدعمات لزيادة محتواه من البروتين والكالسيوم والفوسفور والسعرات الحرارية. التدعيم القياسي عادة يوفر:

- بروتين إضافي: 0.8-1.0 جم/100 مل
- زيادة الكالسيوم والفوسفور لتمعدن العظام
- كثافة حرارية محسنة: 24-26 سعرة حرارية/أونصة (مقابل 20 سعرة حرارية/أونصة في الحليب غير المدعم)

**تركيبات الخدج المتخصصة:**

عندما يكون حليب الأم غير متاح، توفر تركيبات الخدج المتخصصة:

- محتوى بروتين أعلى (2.4-3.0 جم/100 سعرة حرارية)
- زيادة المعادن لنمو العظام
- كثافة حرارية محسنة
- دهون وبروتينات سهلة الهضم

**المراقبة والمضاعفات:**

المراقبة الدقيقة ضرورية لـ:

- معايير النمو (الوزن، الطول، محيط الرأس)
- تحمل التغذية
- مرض العظام الأيضي
- خطر التهاب الأمعاء والقولون الناخر
- نقص التغذية

الانتقال من المستشفى إلى المنزل يتطلب تخطيطاً دقيقاً لضمان استمرار التغذية والنمو الأمثل.

**المصادر:**
*   [European Society for Paediatric Gastroenterology Hepatology and Nutrition (ESPGHAN)](https://www.espghan.org/)
*   [American Academy of Pediatrics (AAP)](https://www.aap.org/)
*   [Egyptian Ministry of Health and Population](https://www.mohp.gov.eg/)`,
    },
    keyTakeaways: {
      en: [
        'Critically ill children require high protein intake (minimum 1.5 g/kg/day)',
        'Early enteral nutrition is preferred when hemodynamically stable',
        'Preterm infants need fortified breast milk or specialized formulas',
        'Close monitoring prevents both underfeeding and overfeeding complications'
      ],
      ar: [
        'الأطفال المرضى بشكل حرج يحتاجون إلى تناول بروتين عالي (1.5 جم/كجم/يوم كحد أدنى)',
        'التغذية المعوية المبكرة مفضلة عندما يكون المريض مستقراً',
        'الأطفال الخدج يحتاجون إلى حليب أم مدعم أو تركيبات متخصصة',
        'المراقبة الدقيقة تمنع مضاعفات نقص التغذية والإفراط فيها'
      ]
    },
    imageUrl: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&q=80',
  },
  {
    id: '11',
    title: {
      en: 'Early Life Nutritional Programming',
      ar: 'السمنة في مرحلة الطفولة بدءًا من الحمل'
    },
    excerpt: {
      en: 'What happens during pregnancy doesn\'t stay in pregnancy. Discover how fetal programming shapes a child\'s metabolic future.',
      ar: 'ما يحدث أثناء الحمل يؤثر على مستقبل الطفل. اكتشف كيف تشكل البرمجة الجنينية الصحة الأيضية للطفل وتزيد مخاطر السمنة.'
    },
    category: 'overnutrition',
    ageGroup: 'children',
    content: {
      en: `**Early Life Nutritional Programming: From Fetal Origins of Childhood Obesity to Low Birth Weight Causes and Management**

**Childhood Obesity Beginning During Pregnancy: Mechanisms and Determinants**

A biological concept known as fetal programming explains how maternal conditions during pregnancy are biologically "recorded" by the fetus. These intrauterine exposures influence metabolic regulation and disease risk after birth.

**1) Maternal Obesity or Excessive Gestational Weight Gain**

When a mother is overweight before pregnancy or gains excessive weight during gestation, the child is more likely to:

*   Be born large for gestational age (macrosomia)
*   Have an increased number of adipocytes
*   Develop obesity during childhood

*Scientific explanation:*
Elevated maternal insulin and leptin levels cross the placenta, stimulating fetal fat deposition.

**2) Unhealthy Maternal Diet**

Maternal consumption of:

*   Excessive sugar
*   Fast food
*   Saturated fats
*   Sugar-sweetened beverages
*   Excess calories

Increases the likelihood that the child will:

*   Store fat more easily
*   Develop insulin resistance
*   Experience increased hunger after birth

**3) Gestational Diabetes Mellitus**

This is one of the strongest contributors to future obesity.

Elevated maternal blood glucose crosses the placenta → fetal pancreatic hyperinsulinemia → increased fetal fat storage.

👉 These children are three times more likely to develop obesity after the age of two.

**4) Smoking During Pregnancy**

Smoking restricts fetal growth. After birth, the infant tends to increase food intake as a compensatory mechanism, thereby increasing the risk of obesity.

**5) Low Physical Activity During Pregnancy**

Regular maternal movement helps regulate insulin and hormonal balance. Physical inactivity increases fetal fat accumulation.

**Postnatal Nutritional Factors Increasing Obesity Risk**

*   Early introduction of energy-dense foods
*   Formula feeding without medical indication
*   Sugary drinks and ultra-processed foods
*   Irregular feeding schedules
*   Using food as a reward or calming strategy
*   Insufficient physical activity

**Prevention and Management**
**During Pregnancy**

Healthy maternal diet includes:

*   Vegetables and fruits
*   Lean protein sources
*   Healthy fats (fish, olive oil, nuts)
*   Reduced sugar intake
*   Adequate hydration
*   Regular, balanced meals

*   **Monthly monitoring of gestational weight gain** (recommended gain depends on pre-pregnancy BMI)
*   **Early treatment of gestational diabetes** - This is one of the most critical preventive measures against childhood obesity.
*   **Light physical activity** - Walking 20–30 minutes daily.

**After Birth**

*   **Breastfeeding** is the preferred feeding method
*   No added sugar in infant foods
*   Delay juices and sweetened foods
*   Emphasize natural foods (vegetables, fruits, protein)
*   Avoid using food as a reward
*   Encourage daily physical activity

**If the Child Already Has Obesity (After Age 2)**

*   Reduce sugars and sweetened beverages
*   Increase vegetable and protein intake
*   Eliminate fast food
*   Establish regular sleep routines (poor sleep increases appetite-regulating hormones)
*   Daily physical activity
*   Follow-up with a pediatric nutrition specialist when weight is elevated

**Causes of Low Birth Weight**

*   Premature birth before 37 weeks of gestation
*   Intrauterine growth restriction due to malnutrition or placental dysfunction
*   Maternal malnutrition during pregnancy
*   Maternal smoking or exposure to secondhand smoke
*   Chronic maternal diseases such as hypertension and diabetes
*   Infections during pregnancy
*   Multiple gestation (twins or higher-order pregnancies)
*   Alcohol or drug abuse
*   Very young or advanced maternal age

**Nutritional Causes of Low Birth Weight**

Low birth weight may result from inadequate intake of nutrients essential for fetal growth, including:

**1) Insufficient Energy Intake**
Failure to meet maternal energy requirements can impair fetal growth.

**2) Protein Deficiency**
Protein is essential for fetal tissue formation and musculoskeletal growth. Deficiency slows fetal development.

**3) Deficiency of Essential Vitamins and Minerals**
*   **Iron:** Deficiency leads to maternal anemia and reduced oxygen delivery to the fetus
*   **Folic acid:** Deficiency increases the risk of congenital anomalies and growth retardation
*   **Calcium and Vitamin D:** Essential for skeletal development
*   **Iodine and Zinc:** Deficiencies impair brain and somatic growth

**4) Poor Overall Nutrition or Excessively Restrictive Diets**
Severe dietary restriction or imbalanced diets may result in reduced birth weight.

**Genetic Causes of Low Birth Weight**

*   **Parental genetic stature:** Naturally small or thin parents may have infants with lower birth weight due to hereditary factors.
*   **Genetic or chromosomal disorders:** Certain genetic mutations or chromosomal abnormalities (e.g., Down syndrome) can impair fetal growth.
*   **Family history:** A history of low birth weight increases recurrence risk.

**Postnatal Care and Management of Low Birth Weight Infants**

Management depends on the degree of low birth weight and the infant’s overall condition and includes:

**1) Immediate Medical Care**
*   Assessment of birth weight, length, and head circumference
*   Monitoring vital functions (respiration, blood glucose, body temperature)
*   Incubator care for very low birth weight infants (<1.5 kg)

**2) Nutrition**
*   Early and frequent breastfeeding
*   Fortified breast milk or formula when medically indicated
*   Nutritional supplementation under medical supervision when required

**3) Thermoregulation**
*   Continuous warming
*   Skin-to-skin contact (“kangaroo care”)

**4) Infection Prevention**
*   Hand hygiene before handling the infant
*   Avoiding crowded environments
*   Adherence to vaccination schedules

**5) Monitoring and Follow-Up**
*   Weekly weight monitoring or as medically advised
*   Growth surveillance (length, head circumference, motor and cognitive development)
*   Screening for complications such as anemia or gastrointestinal disorders

**6) Psychological and Family Support**
*   Educating caregivers on feeding and infant care
*   Encouraging physical contact and interaction to support emotional and physical development

**Resources:**
*   [World Health Organization (WHO) - Early Child Development](https://www.who.int/health-topics/early-child-development)
*   [UNICEF - Early Childhood Development](https://www.unicef.org/early-childhood-development)
*   [Egyptian Ministry of Health and Population](https://www.mohp.gov.eg/)`,
      ar: `**السمنة في مرحلة الطفولة بدءًا من الحمل: كيف تبدأ؟**

يوجد مفهوم علمي يُعرف باسم البرمجة الجنينية (Fetal Programming)، ويشير إلى أن كل ما تتعرض له الأم أثناء الحمل يتم "تسجيله" بيولوجيًا في جسم الجنين، ويؤثر على صحته ووظائفه الأيضية بعد الولادة.

**1) سمنة الأم أو الزيادة المفرطة في الوزن أثناء الحمل**

إذا كانت الأم تعاني من زيادة الوزن قبل الحمل أو اكتسبت وزنًا زائدًا بشكل مفرط أثناء الحمل، فإن الطفل يكون أكثر عرضة لـ:

*   الولادة بوزن مرتفع (العملقة الجنينية – Macrosomia)
*   امتلاك عدد أكبر من الخلايا الدهنية
*   ارتفاع خطر الإصابة بالسمنة في مرحلة الطفولة

*التفسير العلمي:*
ارتفاع مستويات الإنسولين واللبتين لدى الأم وانتقالها إلى الجنين يؤدي إلى تحفيز تخزين الدهون.

**2) النظام الغذائي غير الصحي للأم**

عند اعتماد الأم على:

*   كميات مفرطة من السكر
*   الوجبات السريعة
*   الدهون المشبعة
*   المشروبات المحلاة
*   فائض السعرات الحرارية

يزداد احتمال أن يصبح الطفل أكثر قابلية لـ:

*   تخزين الدهون بسهولة
*   تطور مقاومة الإنسولين
*   الشعور بالجوع بشكل متكرر بعد الولادة

**3) سكري الحمل**

يُعد من أقوى الأسباب المؤدية للسمنة لاحقًا.

ارتفاع مستوى السكر في دم الأم ينتقل إلى الجنين → فيستجيب البنكرياس الجنيني بإفراز كميات كبيرة من الإنسولين → مما يؤدي إلى زيادة تخزين الدهون.

👉 هؤلاء الأطفال أكثر عرضة للإصابة بالسمنة بثلاثة أضعاف بعد عمر السنتين.

**4) التدخين أثناء الحمل**

يؤدي إلى تثبيط نمو الجنين داخل الرحم، وبعد الولادة يميل الطفل إلى تناول كميات أكبر من الطعام للتعويض، مما يزيد خطر السمنة.

**5) قلة النشاط البدني أثناء الحمل**

يساعد النشاط البدني المنتظم على تنظيم الإنسولين والهرمونات.
أما قلة الحركة فتؤدي إلى زيادة تخزين الدهون لدى الجنين.

**عوامل ما بعد الولادة التي تزيد خطر السمنة**

*   إدخال الأغذية الثقيلة في وقت مبكر
*   الاعتماد على الحليب الصناعي دون داعٍ طبي
*   تقديم المشروبات السكرية والوجبات غير الصحية
*   عدم انتظام مواعيد التغذية
*   استخدام الطعام كوسيلة للمكافأة أو التهدئة
*   قلة النشاط البدني

**الوقاية والعلاج**
**أولًا: أثناء الحمل**

النظام الغذائي الصحي للأم يشمل:

*   الخضروات والفواكه
*   البروتينات قليلة الدهون
*   الدهون الصحية (الأسماك، زيت الزيتون، المكسرات)
*   تقليل السكر
*   شرب كميات كافية من الماء
*   وجبات منتظمة ومتوازنة

*   **المتابعة الشهرية لزيادة الوزن** (تعتمد الزيادة الطبيعية على مؤشر كتلة الجسم قبل الحمل)
*   **العلاج المبكر لسكري الحمل** ويُعد من أهم خطوات الوقاية من سمنة الطفل.
*   **ممارسة نشاط بدني خفيف** مثل المشي من 20–30 دقيقة يوميًا.

**ثانيًا: بعد الولادة**

*   **الرضاعة الطبيعية** هي الخيار المفضل
*   عدم إضافة السكر لطعام الطفل
*   تأخير العصائر والأطعمة المحلاة
*   الاعتماد على الأغذية الطبيعية (خضروات، فواكه، بروتين)
*   عدم استخدام الطعام كمكافأة
*   تشجيع الطفل على الحركة اليومية

**في حال إصابة الطفل بالسمنة (بعد عمر سنتين):**

*   تقليل السكريات والمشروبات المحلاة
*   زيادة الخضروات والبروتين
*   إيقاف الوجبات السريعة
*   تنظيم مواعيد النوم (اضطراب النوم يزيد هرمونات الشهية)
*   نشاط بدني يومي
*   المتابعة مع أخصائي تغذية أطفال عند ارتفاع الوزن

**أسباب انخفاض وزن المولود عند الولادة**

*   الولادة المبكرة قبل الأسبوع 37
*   ضعف النمو داخل الرحم نتيجة سوء التغذية أو مشكلات المشيمة
*   سوء تغذية الأم أثناء الحمل
*   تدخين الأم أو التعرض للتدخين السلبي
*   الأمراض المزمنة لدى الأم مثل ارتفاع الضغط والسكري
*   العدوى أثناء الحمل
*   الحمل المتعدد (توائم أو أكثر)
*   تعاطي الكحول أو المخدرات
*   صغر أو كبر سن الأم بشكل مفرط

**الأسباب التغذوية لانخفاض وزن المولود**

ترتبط بنقص العناصر الغذائية الضرورية لنمو الجنين، وتشمل:

**1) نقص السعرات الحرارية**
عدم حصول الأم على طاقة كافية يؤدي إلى تأثر نمو الجنين.

**2) نقص البروتين**
البروتين أساسي لبناء أنسجة الجنين ونمو العضلات والعظام، ونقصه يبطئ النمو.

**3) نقص الفيتامينات والمعادن الأساسية**
*   **الحديد:** نقصه يسبب فقر الدم ويقلل وصول الأكسجين للجنين
*   **حمض الفوليك:** نقصه يزيد خطر التشوهات وتأخر النمو
*   **الكالسيوم وفيتامين د:** مهمان لتكوين العظام
*   **اليود والزنك:** نقصهما يؤثر على نمو الدماغ والجسم

**4) سوء التغذية العام أو الحميات القاسية**
القيود الغذائية الشديدة أو الأنظمة غير المتوازنة قد تؤدي لانخفاض وزن الولادة.

**الأسباب الوراثية لانخفاض وزن المولود**

*   **الحجم الوراثي للوالدين:** إذا كان الوالدان نحيفين أو قصيري القامة، قد يولد الطفل بوزن أقل طبيعيًا.
*   **الاضطرابات الجينية أو الصبغية:** بعض المتلازمات الوراثية (مثل متلازمة داون) قد تؤثر على نمو الجنين.
*   **التاريخ العائلي:** وجود تاريخ عائلي لانخفاض وزن المواليد يزيد من احتمالية تكراره.

**الرعاية والعلاج بعد ولادة طفل منخفض الوزن**

تعتمد على شدة انخفاض الوزن والحالة العامة للطفل، وتشمل:

**1) الرعاية الطبية الفورية**
*   تقييم الوزن والطول ومحيط الرأس
*   فحص الوظائف الحيوية (التنفس، السكر، الحرارة)
*   إدخال الحاضنة إذا كان الوزن أقل من 1.5 كغ

**2) التغذية**
*   الرضاعة الطبيعية المبكرة والمتكررة
*   استخدام حليب مدعّم أو حليب صناعي عند الحاجة الطبية
*   مكملات غذائية بإشراف طبي عند الضرورة

**3) الحفاظ على حرارة الجسم**
*   التدفئة المستمرة
*   استخدام رعاية “الكنغر” (ملامسة الجلد للجلد)

**4) الوقاية من العدوى**
*   غسل اليدين قبل لمس الطفل
*   تجنب الزحام
*   الالتزام بجدول التطعيمات

**5) المتابعة الدورية**
*   متابعة الوزن أسبوعيًا أو حسب توصية الطبيب
*   مراقبة النمو والتطور الحركي والعقلي
*   الكشف عن مشكلات محتملة مثل فقر الدم

**6) الدعم النفسي للأسرة**
*   تعليم الوالدين طرق الرعاية والرضاعة
*   تشجيع التفاعل الجسدي والعاطفي مع الطفل

**المصادر:**
*   [World Health Organization (WHO) - Early Child Development](https://www.who.int/health-topics/early-child-development)
*   [UNICEF - Early Childhood Development](https://www.unicef.org/early-childhood-development)
*   [Egyptian Ministry of Health and Population](https://www.mohp.gov.eg/)`,
    },
    keyTakeaways: {
      en: [
        'Maternal obesity and diet directly program the child\'s metabolic future',
        'Gestational diabetes triples the risk of childhood obesity',
        'Breastfeeding protects against both obesity and malnutrition',
        'Low birth weight management requires temperature control and specialized feeding'
      ],
      ar: [
        'سمنة الأم ونظامها الغذائي يبرمجان مستقبل الطفل الأيضي',
        'سكري الحمل يضاعف خطر سمنة الأطفال ثلاث مرات',
        'الرضاعة الطبيعية تحمي من السمنة وسوء التغذية',
        'علاج انخفاض وزن المولود يتطلب ضبط الحرارة وتغذية متخصصة'
      ]
    },
    imageUrl: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=800&q=80'
  },
  {
    id: '12',
    title: {
      en: 'Understanding Protein-Energy Malnutrition (PEM)',
      ar: 'فهم سوء التغذية البروتيني-الطاقي'
    },
    excerpt: {
      en: 'PEM is more than just hunger. Learn about Marasmus, Kwashiorkor, and the critical interventions needed to save lives.',
      ar: 'سوء التغذية البروتيني ليس مجرد جوع. تعرف على الماراسموس والكواشيوركور والتدخلات الحاسمة لإنقاذ الحياة.'
    },
    category: 'undernutrition',
    ageGroup: 'children',
    content: {
      en: `**Understanding Protein-Energy Malnutrition (PEM)**

Protein-Energy Malnutrition (PEM) is a form of undernutrition that occurs when dietary intake does not provide sufficient protein and/or energy (calories) to meet the body’s physiological requirements. It represents a major public health problem, particularly in low- and middle-income countries, and is most prevalent among infants and young children.
According to the World Health Organization (WHO), undernutrition results from insufficient intake of energy and essential nutrients, leading to weight loss, impaired growth, weakened immunity, and increased risk of morbidity and mortality.

**Causes of Protein-Energy Malnutrition**

PEM develops due to inadequate intake of protein-rich and energy-dense foods, food insecurity and poverty, recurrent infections that increase nutrient requirements and reduce absorption, and poor infant and young child feeding practices.

When the body does not receive adequate nutrients, it begins to utilize its own fat and muscle stores to maintain vital functions, leading to wasting and weakness.

**Clinical Forms of PEM**

Protein-Energy Malnutrition presents as a spectrum of conditions, including:

**Marasmus**
A severe form of undernutrition caused by prolonged deficiency of total energy intake. It is characterized by extreme wasting of muscle and fat tissues.

**Kwashiorkor**
A condition primarily associated with inadequate protein intake, often accompanied by edema, fatty liver, skin changes, and hair discoloration.

**Marasmic-Kwashiorkor**
A mixed form showing features of both marasmus and kwashiorkor.

**WHO Classification and Public Health Impact**

The WHO classifies PEM under undernutrition, which includes **Wasting** (low weight-for-height), **Stunting** (low height-for-age), and **Underweight** (low weight-for-age).

WHO reports that undernutrition is associated with nearly half of all deaths among children under five years of age worldwide. Children suffering from protein-energy malnutrition are more susceptible to infections, delayed cognitive development, and long-term health complications.

**Conclusion**

Protein-Energy Malnutrition is a preventable yet serious condition resulting from inadequate intake of protein and energy. In line with WHO guidance, addressing PEM requires adequate nutrition, improved food security, effective public health policies, and early detection and management, especially among vulnerable populations such as infants and young children.

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

**الكواشيوركور (Kwashiorkor)**

حالة ترتبط أساسًا بنقص البروتين الغذائي، وغالبًا ما تكون مصحوبة بالوذمات، والكبد الدهني، وتغيرات جلدية، وتبدل لون الشعر.

**الماراسموس-كواشيوركور (Marasmic-Kwashiorkor)**

شكل مختلط تظهر فيه سمات كلٍّ من الماراسموس والكواشيوركور معًا.

**تصنيف منظمة الصحة العالمية والأثر الصحي العام**

تصنّف منظمة الصحة العالمية سوء التغذية البروتيني-الطاقي ضمن فئة سوء التغذية، والتي تشمل **الهزال (Wasting)** (انخفاض الوزن بالنسبة للطول)، **التقزم (Stunting)** (انخفاض الطول بالنسبة للعمر)، و**نقص الوزن (Underweight)** (انخفاض الوزن بالنسبة للعمر).

وتشير تقارير منظمة الصحة العالمية إلى أن سوء التغذية يرتبط بما يقرب من نصف الوفيات بين الأطفال دون سن الخامسة عالميًا. كما أن الأطفال المصابين بسوء التغذية البروتيني-الطاقي يكونون أكثر عرضة للإصابة بالعدوى، وتأخر النمو المعرفي، والمضاعفات الصحية طويلة الأمد.

**الخلاصة**

يُعد سوء التغذية البروتيني-الطاقي حالة خطيرة يمكن الوقاية منها، وتنجم عن عدم كفاية تناول البروتين والطاقة. ووفقًا لإرشادات منظمة الصحة العالمية، فإن التصدي لهذه المشكلة يتطلب توفير تغذية كافية، وتعزيز الأمن الغذائي، وتطبيق سياسات صحية عامة فعّالة، إلى جانب الكشف المبكر والتدخل العلاجي المناسب، خاصة لدى الفئات الأكثر عرضة للخطر مثل الرضع وصغار الأطفال.

**المصادر:**
*   [World Health Organization (WHO) - Malnutrition](https://www.who.int/news-room/fact-sheets/detail/malnutrition)
*   [UNICEF - Malnutrition](https://www.unicef.org/nutrition/malnutrition)
*   [Egyptian Ministry of Health and Population](https://www.mohp.gov.eg/)`,
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
    imageUrl: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=800&q=80'
  },
  {
    id: '13',
    title: {
      en: 'General Management of Newborns',
      ar: 'الإدارة العامة لحديثي الولادة'
    },
    excerpt: {
      en: 'Essential guide for new parents covering thermoregulation, feeding safety, hygiene, and SIDS prevention.',
      ar: 'دليل أساسي للآباء الجدد يغطي تنظيم الحرارة، سلامة التغذية، النظافة، والوقاية من الموت المفاجئ للرضع.'
    },
    category: 'undernutrition',
    ageGroup: 'children',
    content: {
      en: `**General Management of Newborns: Care from Birth to Neonatal Period**

The neonatal period (the first 28 days of life) is widely regarded as the most vulnerable time for a child's survival and health. Proper management during this phase establishes the foundation for healthy growth and development.

**1) Immediate Care at Birth**

The newborn must be dried immediately to prevent hypothermia. Placing the baby on the mother’s chest favors skin-to-skin contact, promoting bonding and helping regulate temperature and heart rate. Delayed cord clamping (waiting 1–3 minutes) is recommended to increase iron stores and blood volume.

**2) Essential Newborn Care (First 24 Hours)**

Essential steps include Vitamin K injection to prevent hemorrhagic disease, applying antibiotic eye ointment to prevent infection, and administering the first dose of Hepatitis B vaccination. A thorough assessment is also conducted to check for birth defects, respiratory distress, or other immediate concerns.

**3) Ongoing Daily Care**

**A. Feeding (Nutrition)**
Exclusive breastfeeding is recommended for the first 6 months, ideally 8–12 times per 24 hours (on demand). Signs of adequate feeding include the baby sleeping well after feeds, gaining weight, and having 6+ wet diapers/day.

**B. Hygiene and Cord Care**
Keep the umbilical cord stump clean and dry; avoid applying alcohol or herbal remedies unless prescribed. Delay the first bath for at least 24 hours to preserve body heat, then bathe 2–3 times a week. Clean the diaper area gently with water or fragrance-free wipes to prevent rash.

**C. Sleep Safety (SIDS Prevention)**
Always place the baby on their back to sleep on a firm mattress. Avoid pillows, soft toys, or loose bedding in the crib. The baby should share the parents’ room but sleep in a separate crib for the first 6 months.

**4) Warning Signs (When to Seek Medical Help)**

Parents should seek immediate medical attention if the newborn shows signs such as fever (> 38°C) or hypothermia (< 36.5°C), difficulty breathing (fast breathing, grunting, chest indrawing), jaundice (yellowing of skin/eyes, especially in the first 24 hours), feeding difficulties, inactivity/lethargy, signs of infection around the umbilical cord, or convulsions.

**Resources:**
*   [World Health Organization (WHO) - Newborn Health](https://www.who.int/health-topics/newborn-health)
*   [UNICEF - Newborn Care](https://www.unicef.org/health/newborn-health)
*   [Egyptian Ministry of Health and Population](https://www.mohp.gov.eg/)`,
      ar: `** الإدارة العامة لحديثي الولادة: الرعاية من الولادة حتى فترة ما بعد الولادة**

      تُعد فترة حديثي الولادة (أول 28 يومًا من الحياة) الفترة الأكثر حساسية لبقاء الطفل وصحته. الإدارة السليمة خلال هذه المرحلة تضع الأساس للنمو والتطور الصحي.

      ** 1) الرعاية الفورية عند الولادة **

      يجب تجفيف المولود فورًا لمنع انخفاض حرارة الجسم. وضع الطفل على صدر الأم يعزز الترابط ويساعد في تنظيم درجة الحرارة ومعدل ضربات القلب. يُنصح بتأخير قطع الحبل السري (الانتظار 1 - 3 دقائق) لزيادة مخزون الحديد وحجم الدم.

      ** 2) رعاية حديثي الولادة الأساسية (أول 24 ساعة) **

      تشمل الخطوات الأساسية إعطاء حقنة فيتامين ك لمنع النزيف، وضع مرهم مضاد حيوي للعين لمنع العدوى، وتلقي الجرعة الأولى من لقاح التهاب الكبد ب. كما يجب إجراء تقييم شامل للتحقق من العيوب الخلقية، الضائقة التنفسية، أو أي مخاوف عاجلة أخرى.

      ** 3) الرعاية اليومية المستمرة **

      ** أ.التغذية **
      يُوصى بالرضاعة الطبيعية الحصرية للأشهر الستة الأولى، بمعدل 8 - 12 مرة كل 24 ساعة (عند الطلب). تشمل علامات كفاية التغذية نوم الطفل جيدًا بعد الرضاعة، واكتساب الوزن، ووجود 6+ حفاضات مبللة/يومياً.

      ** ب.النظافة والعناية بالحبل السري **
      حافظ على بقايا الحبل السري نظيفة وجافة؛ تجنب وضع الكحول أو العلاجات العشبية ما لم يصفها الطبيب. أخر الاستحمام الأول لمدة 24 ساعة على الأقل للحفاظ على حرارة الجسم، ثم استحم 2 - 3 مرات أسبوعياً. نظف منطقة الحفاض برفق بالماء أو مناديل خالية من العطر لمنع الطفح الجلدي.

      ** ج.سلامة النوم (الوقاية من الموت المفاجئ) **
      ضع الطفل دائمًا على ظهره للنوم على مرتبة صلبة، وتجنب الوسائد أو الألعاب اللينة في السرير. يجب أن ينام الطفل في غرفة الوالدين ولكن في سرير منفصل للأشهر الستة الأولى.

      ** 4) علامات التحذير (متى تطلب المساعدة الطبية) **

      يجب على الوالدين طلب العناية الطبية الفورية إذا ظهرت على المولود علامات مثل الحمى (> 38 درجة مئوية) أو انخفاض حرارة الجسم (< 36.5 درجة مئوية)، صعوبة التنفس (تنفس سريع، شخير، انكماش الصدر)، اليرقان (اصفرار الجلد/العينين، خاصة في أول 24 ساعة)، صعوبات التغذية، الخمول، علامات العدوى حول الحبل السري، أو التشنجات.

      **المصادر:**
      *   [World Health Organization (WHO) - Newborn Health](https://www.who.int/health-topics/newborn-health)
      *   [UNICEF - Newborn Care](https://www.unicef.org/health/newborn-health)
      *   [Egyptian Ministry of Health and Population](https://www.mohp.gov.eg/)`,
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
    imageUrl: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800&q=80'
  },
  {
    id: '14',
    title: {
      en: 'Vitamin and Mineral Deficiencies in Children: Diagnosis, Management, and Prevention',
      ar: 'نقص الفيتامينات والمعادن عند الأطفال: التشخيص، العلاج، والوقاية'
    },
    excerpt: {
      en: 'From Vitamin D to Iron, discover the most common deficiencies, their silent signs, and how to treat them effectively.',
      ar: 'من فيتامين د إلى الحديد، تعرف على أكثر أوجه النقص شيوعاً، وعلاماتها الصامتة، وكيفية علاجها بفعالية.'
    },
    category: 'undernutrition',
    ageGroup: 'children',
    content: {
      en: `**Vitamin Deficiencies in Children: Causes and Comprehensive Management**

**Most Common Vitamin Deficiencies in Children (from Most to Least Prevalent)**

**1. Vitamin D (Prevalence: 30–50%)**
*   **Most Affected Age Group:** Infants and children in low-sunlight regions.

**2. Iron (Anemia) (Prevalence: 25–40%)**
*   **Most Affected Age Group:** 6 months–3 years, adolescents.

**3. Vitamin B12 (Prevalence: 10–15%)**
*   **Most Affected Age Group:** Vegetarian children, children with gastrointestinal disorders.

**4. Vitamin A (Prevalence: 10–20%)**
*   **Most Affected Age Group:** Developing countries, low-income regions.

**5. Vitamin C (Prevalence: 5–10%)**
*   **Most Affected Age Group:** Children who refuse fruits and vegetables.

**Detailed Causes of Vitamin Deficiencies**

**First: Nutritional Causes (≈70% of cases)**

**1. Infant Feeding and Early Nutrition**
*   Exclusive breastfeeding without vitamin D supplementation.
*   Use of non-fortified milk.
*   Early or delayed weaning.

**2. Poor Eating Habits**
*   Picky eating.
*   Excessive consumption of ultra-processed foods (snacks, chocolate, industrial juices).
*   Lack of dietary variety.

**3. Unbalanced Diet**
*   Excessive milk intake at the expense of other foods.
*   Strict vegetarian diets without proper supplementation.
*   Reliance mainly on carbohydrates.

**Second: Medical Causes (≈20% of cases)**

**1. Gastrointestinal Diseases**
*   Celiac disease.
*   Crohn’s disease and ulcerative colitis.
*   Cystic fibrosis.
*   Intestinal parasitic infections.

**2. Chronic Diseases**
*   Chronic kidney or liver disease.
*   Congenital heart disease.
*   Cancer and its treatments.

**3. Medications Causing Deficiencies**
*   Long-term use of certain antibiotics.
*   Antiepileptic drugs.
*   Antacids.

**Third: Environmental and Social Causes (≈10% of cases)**

*   Poverty and food insecurity.
*   Improper food storage and preparation.
*   Limited sun exposure.
*   Incorrect family dietary beliefs.

**Clinical Manifestations of Vitamin Deficiencies**

**1. Vitamin D Deficiency**
*   Delayed walking and teething.
*   Bowing of the legs (rickets).
*   Bone and muscle pain.
*   Excessive sweating, especially of the head.
*   Impaired linear growth.

**2. Iron Deficiency (Anemia)**
*   Pallor of the skin and lips.
*   Persistent fatigue and lethargy.
*   Poor concentration and academic performance.
*   Pica (craving non-food items such as dirt or ice).
*   Reduced immunity.

**3. Vitamin B12 Deficiency**
*   Tingling and numbness of extremities.
*   Gait instability and balance problems.
*   Glossitis with tongue redness.
*   Memory and concentration impairment.
*   Depression and mood changes.

**4. Vitamin A Deficiency**
*   Dry eyes and night blindness.
*   Dry, scaly skin.
*   Follicular hyperkeratosis (gooseflesh appearance).
*   Increased susceptibility to infections.

**5. Vitamin C Deficiency**
*   Bleeding gums and loose teeth.
*   Delayed wound healing.
*   Joint pain.
*   Dry, brittle hair.

**Diagnosis and Practical Management**

**Phase One: Diagnostic Evaluation**

**1. Comprehensive Clinical Examination**
*   Measurement of weight, height, and head circumference.
*   Assessment of bones, teeth, gums, and skin.

**2. Basic Laboratory Investigations**
*   Complete Blood Count (CBC).
*   25-Hydroxy Vitamin D.
*   Vitamin B12.
*   Serum Ferritin.
*   Zinc and Calcium.
*   Vitamin A and E (if indicated).

**Phase Two: Dietary Management**

**Dietary Sources of Essential Vitamins**

*   **Vitamin D:** Sun exposure (10 minutes morning), eggs, fatty fish, fortified milk.
*   **Iron:** Liver, red meat, poultry, legumes, spinach.
*   **Vitamin B12:** Meat, fish, eggs, dairy products.
*   **Vitamin A:** Carrots, sweet potatoes, apricots, liver.
*   **Vitamin C:** Oranges, strawberries, bell peppers, broccoli.

**Suggested Daily Meal Plan for a Child (3–6 Years)**
*   **Breakfast (7 AM):** Egg + half loaf of bread + fortified milk.
*   **Snack 1 (10 AM):** Apple or banana.
*   **Lunch (1 PM):** 4 tablespoons of rice + cooked vegetables + meat/chicken/fish.
*   **Snack 2 (4 PM):** Yogurt + honey + ground nuts.
*   **Dinner (7 PM):** Cheese or yogurt + bread + cucumber and carrots.

**Phase Three: Pharmacological Supplementation (By Prescription Only)**

*   **Vitamin D:** 1,000–2,000 IU daily or 50,000 IU weekly (based on weight) for 3–6 months.
*   **Iron:** 3–6 mg/kg/day (ferrous sulfate) for 3–6 months.
*   **Vitamin B12:** 1,000 µg weekly (oral or injectable) according to deficiency.
*   **Multivitamins:** Daily syrup containing vitamins A, B, C, D, E, zinc as needed.

**Prevention of Vitamin Deficiencies**

**Age-Specific Preventive Program**

**Birth to 6 Months:**
*   Exclusive breastfeeding.
*   Vitamin D supplementation (400 IU daily).
*   Adequate sun exposure.

**6 Months to 1 Year:**
*   Introduction of iron-rich foods (pureed meats, legumes).
*   Continued vitamin D supplementation.
*   Gradual diversification of fruits and vegetables.

**1–5 Years:**
*   Three main meals plus 2–3 snacks daily.
*   Daily inclusion of all six food groups.
*   Limitation of processed foods.

**6 Years and Older:**
*   Nutrition education and healthy food choices.
*   Regular growth monitoring.
*   Annual blood screening.

**Warning Signs Requiring Immediate Medical Attention**
*   Growth failure or unexplained weight loss.
*   Severe pallor with lethargy and fatigue.
*   Significant delay in motor or speech development.
*   Behavioral changes (irritability, lethargy, persistent crying).
*   Recurrent infections.

**Quick Action Plan for Parents**

**Within One Week:**
*   Visit a pediatrician.
*   Perform basic laboratory tests.
*   Assess the current dietary pattern.

**Within One Month:**
*   Initiate prescribed treatment.
*   Modify dietary habits.
*   First follow-up visit.

**Within Three Months:**
*   Follow-up laboratory tests.
*   Reassessment of growth and symptoms.
*   Adjustment of the management plan based on results.

**Key Practical Tips**
*   Do not force a child to eat; make mealtime enjoyable.
*   Lead by example—children imitate adults.
*   Be creative in food presentation (shapes, colors, storytelling).
*   Involve children in food selection and preparation.
*   Be patient; nutritional improvement takes time.

**Remember:** Proper childhood nutrition is an investment in your child’s future health. Prevention is always easier and more effective than treatment.

**Resources:**
*   [World Health Organization (WHO) - Nutrition](https://www.who.int/health-topics/nutrition)
*   [UNICEF - Nutrition](https://www.unicef.org/nutrition)
*   [Egyptian Ministry of Health and Population](https://www.mohp.gov.eg/)`,
      ar: `**نقص الفيتامينات لدى الأطفال: الأسباب والتدخلات العلاجية والوقائية الشاملة**

**أكثر الفيتامينات شيوعًا من حيث النقص لدى الأطفال (مرتبة من الأعلى إلى الأقل انتشارًا)**

**1. فيتامين د (نسبة الانتشار: 30–50%)**
*   **الفئة العمرية الأكثر عرضة:** الرضع والأطفال في المناطق منخفضة التعرض للشمس.

**2. الحديد "فقر الدم" (نسبة الانتشار: 25–40%)**
*   **الفئة العمرية الأكثر عرضة:** من 6 أشهر إلى 3 سنوات، والمراهقون.

**3. فيتامين ب12 (نسبة الانتشار: 10–15%)**
*   **الفئة العمرية الأكثر عرضة:** الأطفال النباتيون، وذوو الاضطرابات الهضمية.

**4. فيتامين أ (نسبة الانتشار: 10–20%)**
*   **الفئة العمرية الأكثر عرضة:** الدول النامية والمناطق منخفضة الدخل.

**5. فيتامين ج (نسبة الانتشار: 5–10%)**
*   **الفئة العمرية الأكثر عرضة:** الأطفال الرافضون للفواكه والخضروات.

**الأسباب التفصيلية لنقص الفيتامينات لدى الأطفال**

**أولًا: الأسباب الغذائية (تمثل نحو 70% من الحالات)**

**1. الرضاعة والتغذية في المراحل المبكرة**
*   الرضاعة الطبيعية الحصرية دون تعويض فيتامين د.
*   استخدام حليب غير مدعّم بالفيتامينات.
*   الفطام المبكر أو المتأخر عن التوقيت المناسب.

**2. العادات الغذائية غير الصحية**
*   انتقائية الطعام (Picky Eating).
*   الإفراط في تناول الأغذية المصنعة (الوجبات الخفيفة، الشوكولاتة، العصائر الصناعية).
*   نقص التنوع الغذائي.

**3. النظام الغذائي غير المتوازن**
*   الإفراط في استهلاك الحليب على حساب باقي المجموعات الغذائية.
*   اتباع أنظمة نباتية صارمة دون تعويض غذائي مناسب.
*   الاعتماد المفرط على الكربوهيدرات كمصدر رئيسي للطاقة.

**ثانيًا: الأسباب الطبية (تمثل نحو 20% من الحالات)**

**1. أمراض الجهاز الهضمي**
*   الداء البطني (حساسية القمح – السيلياك).
*   داء كرون والتهاب القولون التقرحي.
*   التليف الكيسي.
*   الطفيليات المعوية.

**2. الأمراض المزمنة**
*   الفشل الكلوي أو الكبدي.
*   أمراض القلب الخلقية.
*   الأورام الخبيثة والعلاجات المرتبطة بها.

**3. الأدوية المسببة لنقص الفيتامينات**
*   بعض المضادات الحيوية طويلة الأمد.
*   أدوية الصرع.
*   مضادات الحموضة.

**ثالثًا: الأسباب البيئية والاجتماعية (تمثل نحو 10% من الحالات)**
*   الفقر وانعدام الأمن الغذائي.
*   سوء تخزين أو تحضير الأغذية.
*   قلة التعرض لأشعة الشمس.
*   المعتقدات الغذائية الخاطئة داخل الأسرة.

**المظاهر السريرية لنقص الفيتامينات**

**1. نقص فيتامين د**
*   تأخر المشي وبزوغ الأسنان.
*   تقوس الساقين (الكساح).
*   آلام العظام والعضلات.
*   التعرق الزائد، خاصة في منطقة الرأس.
*   ضعف النمو الطولي.

**2. نقص الحديد (فقر الدم)**
*   شحوب الجلد والأغشية المخاطية.
*   الإرهاق والخمول المستمر.
*   ضعف التركيز وتراجع التحصيل الدراسي.
*   اشتهاء مواد غير غذائية (Pica) مثل التراب أو الثلج.
*   ضعف المناعة.

**3. نقص فيتامين ب12**
*   تنميل الأطراف.
*   اضطرابات التوازن والمشي.
*   التهاب اللسان واحمراره.
*   ضعف الذاكرة والتركيز.
*   الاكتئاب وتقلبات المزاج.

**4. نقص فيتامين أ**
*   جفاف العين وضعف الرؤية الليلية.
*   جفاف وتقشر الجلد.
*   فرط التقرن الجريبي (جلد الأوزة).
*   زيادة القابلية للإصابة بالعدوى.

**5. نقص فيتامين ج**
*   نزيف اللثة وتخلخل الأسنان.
*   بطء التئام الجروح.
*   آلام المفاصل.
*   جفاف وتقصف الشعر.

**التشخيص والتدخل العلاجي**

**المرحلة الأولى: التقييم والتشخيص الطبي**

**1. الفحص السريري الشامل**
*   قياس الوزن والطول ومحيط الرأس.
*   تقييم العظام، الأسنان، اللثة، والجلد.

**2. الفحوصات المخبرية الأساسية**
*   صورة دم كاملة (CBC).
*   فيتامين د (25-Hydroxy Vitamin D).
*   فيتامين ب12.
*   مخزون الحديد (Ferritin).
*   الزنك والكالسيوم.
*   فيتامين أ وفيتامين هـ (عند الحاجة).

**المرحلة الثانية: العلاج الغذائي**

**المصادر الغذائية الأساسية للفيتامينات**

*   **فيتامين د:** أشعة الشمس، البيض، الأسماك الدهنية، الحليب المدعم.
*   **الحديد:** الكبدة، اللحوم الحمراء، الدواجن، البقول، السبانخ.
*   **فيتامين ب12:** اللحوم، الأسماك، البيض، منتجات الألبان.
*   **فيتامين أ:** الجزر، البطاطا الحلوة، المشمش، الكبدة.
*   **فيتامين ج:** الحمضيات، الفراولة، الفلفل، البروكلي.

**المرحلة الثالثة: المكملات الدوائية (بوصفة طبية فقط)**

*   **فيتامين د:** 1000–2000 وحدة دولية يوميًا أو 50,000 وحدة أسبوعيًا لمدة 3–6 أشهر.
*   **الحديد:** 3–6 مجم/كجم/يوم لمدة 3–6 أشهر.
*   **فيتامين ب12:** 1000 ميكروغرام أسبوعيًا حسب درجة النقص.
*   **الفيتامينات المتعددة:** شراب يومي يحتوي على فيتامينات أ، ب، ج، د، هـ، الزنك حسب الحاجة.

**الوقاية من نقص الفيتامينات**

**برنامج وقائي حسب المرحلة العمرية**

**من الولادة حتى 6 أشهر:**
*   رضاعة طبيعية حصرية.
*   400 وحدة دولية من فيتامين د يوميًا.
*   تعرّض مناسب لأشعة الشمس.

**من 6 أشهر إلى سنة:**
*   إدخال أغذية غنية بالحديد.
*   الاستمرار في فيتامين د.
*   تنويع الخضروات والفواكه.

**من سنة إلى 5 سنوات:**
*   ثلاث وجبات رئيسية و2–3 وجبات خفيفة.
*   تضمين جميع المجموعات الغذائية يوميًا.
*   الحد من الأغذية المصنعة.

**من 6 سنوات فما فوق:**
*   التثقيف الغذائي.
*   متابعة النمو بشكل دوري.
*   فحوصات دم سنوية.

**علامات الخطر التي تستوجب مراجعة الطبيب فورًا**
*   توقف النمو أو فقدان الوزن.
*   شحوب شديد مصحوب بخمول.
*   تأخر واضح في التطور الحركي أو اللغوي.
*   تغيرات سلوكية ملحوظة.
*   تكرار العدوى والأمراض.

**خطة عمل إجرائية للأسرة**

**خلال أسبوع:**
*   زيارة طبيب الأطفال.
*   إجراء التحاليل الأساسية.
*   تقييم النظام الغذائي الحالي.

**خلال شهر:**
*   بدء العلاج الموصوف.
*   تعديل النظام الغذائي.
*   أول متابعة طبية.

**خلال ثلاثة أشهر:**
*   تحاليل متابعة.
*   تقييم التحسن في النمو والأعراض.
*   تعديل الخطة العلاجية حسب النتائج.

**توصيات ختامية**
تمثل التغذية السليمة في مرحلة الطفولة حجر الأساس لصحة الفرد مستقبلًا. ويُعد الاكتشاف المبكر لنقص الفيتامينات والتدخل الغذائي والعلاجي المناسبين استثمارًا صحيًا طويل الأمد، حيث إن الوقاية أكثر فاعلية وأقل كلفة من العلاج.

**المصادر:**
*   [World Health Organization (WHO) - Nutrition](https://www.who.int/health-topics/nutrition)
*   [UNICEF - Nutrition](https://www.unicef.org/nutrition)
*   [Egyptian Ministry of Health and Population](https://www.mohp.gov.eg/)`,
    },
    keyTakeaways: {
      en: [
        'Vitamin D and Iron are the most common deficiencies',
        'Symptoms like delayed walking or pica require immediate testing',
        'Dietary diversity is the best prevention strategy',
        'Supplements should be dose-adjusted by a physician'
      ],
      ar: [
        'نقص فيتامين د والحديد هو الأكثر شيوعاً',
        'أعراض مثل تأخر المشي أو أكل التراب تستدعي الفحص فوراً',
        'التنوع الغذائي هو أفضل وسيلة للوقاية',
        'يجب ضبط جرعات المكملات من قبل الطبيب'
      ]
    },
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80'
  }
];
