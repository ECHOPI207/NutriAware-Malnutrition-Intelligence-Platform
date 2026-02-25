export type FAQCategory = 'platform' | 'program' | 'tools' | 'research' | 'privacy';

export interface FAQItem {
    id: string;
    category: FAQCategory;
    question_en: string;
    question_ar: string;
    answer_en: string;
    answer_ar: string;
}

export const faqCategories = [
    { id: 'platform', icon: 'monitor', title_en: 'Platform Overview', title_ar: 'نظرة عامة على المنصة' },
    { id: 'program', icon: 'calendar', title_en: '6-Week Program', title_ar: 'برنامج الـ 6 أسابيع' },
    { id: 'tools', icon: 'clipboard', title_en: 'Assessment Tools', title_ar: 'أدوات التقييم' },
    { id: 'research', icon: 'microscope', title_en: 'Research & Science', title_ar: 'البحث العلمي' },
    { id: 'privacy', icon: 'shield', title_en: 'Data & Privacy', title_ar: 'البيانات والخصوصية' }
] as const;

export const faqData: FAQItem[] = [
    // Platform Overview
    {
        id: 'p1', category: 'platform',
        question_en: 'What is NutriAware?',
        question_ar: 'ما هي منصة نيوتري أوير؟',
        answer_en: 'NutriAware is an intelligent, evidence-based digital health platform designed to combat malnutrition in Egypt through AI-driven assessment tools, personalized 6-week nutritional programming, and a comprehensive knowledge center.',
        answer_ar: 'نيوتري أوير هي منصة صحية رقمية ذكية قائمة على الأدلة، مصممة لمكافحة سوء التغذية في مصر من خلال أدوات التقييم المدعومة بالذكاء الاصطناعي، والبرامج الغذائية المخصصة لمدة 6 أسابيع، ومركز معرفة شامل.'
    },
    {
        id: 'p2', category: 'platform',
        question_en: 'Is the platform entirely free?',
        question_ar: 'هل المنصة مجانية بالكامل؟',
        answer_en: 'Yes. NutriAware is a university graduation project for the Nutrition Technology & Food Safety program at October 6 University. All features, tools, and assessments are completely free for public use.',
        answer_ar: 'نعم. نيوتري أوير هو مشروع تخرج جامعي لبرنامج تكنولوجيا التغذية وسلامة الغذاء بجامعة 6 أكتوبر. جميع الميزات والأدوات والتقييمات مجانية تماماً للاستخدام العام.'
    },
    {
        id: 'p3', category: 'platform',
        question_en: 'Who is the target audience for this platform?',
        question_ar: 'من هو الجمهور المستهدف لهذه المنصة؟',
        answer_en: 'Our primary audience includes parents monitoring their children\'s growth, individuals seeking to verify their dietary diversity, and anyone looking for evidence-based nutritional guidelines in Egypt and the MENA region.',
        answer_ar: 'يشمل جمهورنا الأساسي الآباء الذين يراقبون نمو أطفالهم، والأفراد الذين يسعون للتحقق من تنوعهم الغذائي، وأي شخص يبحث عن إرشادات غذائية قائمة على الأدلة في مصر ومنطقة الشرق الأوسط وشمال أفريقيا.'
    },

    // 6-Week Program
    {
        id: 'pr1', category: 'program',
        question_en: 'What does the 6-Week Nutritional Program include?',
        question_ar: 'ماذا يتضمن البرنامج الغذائي لمدة 6 أسابيع؟',
        answer_en: 'The program includes specific weekly themes focused on macro and micronutrients, guided daily habits, AI meal planning, and interactive assessments to gradually improve your family\'s dietary diversity.',
        answer_ar: 'يتضمن البرنامج مواضيع أسبوعية محددة تركز على المغذيات الكبرى والدقيقة، وعادات يومية موجهة، وتخطيط للوجبات بالذكاء الاصطناعي، وتقييمات تفاعلية لتحسين تنوع النظام الغذائي لعائلتك تدريجياً.'
    },
    {
        id: 'pr2', category: 'program',
        question_en: 'Do I need medical supervision to follow the program?',
        question_ar: 'هل أحتاج إلى إشراف طبي لاتباع البرنامج؟',
        answer_en: 'Our program is educational and designed for general well-being. However, it does not replace professional medical advice. If you or your child have specific medical conditions or severe malnutrition, please consult a healthcare provider first.',
        answer_ar: 'برنامجنا تعليمي ومصمم للرفاهية العامة. ومع ذلك، فإنه لا يحل محل المشورة الطبية المتخصصة. إذا كنت أنت أو طفلك تعانون من حالات طبية معينة أو سوء تغذية حاد، يرجى استشارة مقدم الرعاية الصحية أولاً.'
    },

    // Tools
    {
        id: 't1', category: 'tools',
        question_en: 'What is the FAO Dietary Diversity Score (DDS)?',
        question_ar: 'ما هو مقياس التنوع الغذائي (DDS) التابع لمنظمة الأغذية والزراعة؟',
        answer_en: 'The FAO DDS is a qualitative 24-hour recall assessment that measures micronutrient adequacy. Consuming foods from at least 5 out of 8 specific food groups indicates an adequate dietary diversity.',
        answer_ar: 'مقياس التنوع الغذائي لمنظمة الأغذية والزراعة (FAO DDS) هو تقييم نوعي لآخر 24 ساعة يقيس كفاية المغذيات الدقيقة. استهلاك الأطعمة من 5 على الأقل من أصل 8 مجموعات غذائية محددة يشير إلى تنوع غذائي كافٍ.'
    },
    {
        id: 't2', category: 'tools',
        question_en: 'How accurate is the Child Growth Assessment?',
        question_ar: 'ما مدى دقة تقييم نمو الطفل؟',
        answer_en: 'Our Child Growth Assessment tool uses standard WHO growth charts to plot Weight-for-Age, Height-for-Age, and BMI-for-Age percentiles for children under 5 years old.',
        answer_ar: 'تستخدم أداة تقييم نمو الطفل لدينا مخططات النمو القياسية لمنظمة الصحة العالمية لرسم النسب المئوية للوزن مقابل العمر، والطول مقابل العمر، ومؤشر كتلة الجسم مقابل العمر للأطفال دون سن 5 سنوات.'
    },

    // Research
    {
        id: 'r1', category: 'research',
        question_en: 'Are the articles scientifically backed?',
        question_ar: 'هل المقالات مدعومة علمياً؟',
        answer_en: 'Yes. Every article in our Knowledge Center is cited and verified against peer-reviewed nutritional science, official WHO/FAO publications, and Egyptian demographic health surveys.',
        answer_ar: 'نعم. كل مقال في مركز المعرفة الخاص بنا موثق وتم التحقق منه بناءً على علوم التغذية المراجعة من قبل النظراء، والمنشورات الرسمية لمنظمة الصحة العالمية/منظمة الأغذية والزراعة، والمسوحات الصحية الديموغرافية المصرية.'
    },
    {
        id: 'r2', category: 'research',
        question_en: 'Where can I find the official study protocol?',
        question_ar: 'أين يمكنني العثور على بروتوكول الدراسة الرسمي؟',
        answer_en: 'The full research protocol, study objectives, and university ethical approval details can be accessed via the "Research Framework" section on our About page.',
        answer_ar: 'يمكن الوصول إلى بروتوكول البحث الكامل وأهداف الدراسة وتفاصيل الموافقة الأخلاقية للجامعة عبر قسم "الإطار البحثي" في صفحة "عن نيوتري أوير".'
    },

    // Privacy
    {
        id: 'prv1', category: 'privacy',
        question_en: 'How is my assessment data handled?',
        question_ar: 'كيف يتم التعامل مع بيانات التقييم الخاصة بي؟',
        answer_en: 'All assessments work entirely on your local browser by default. We do not store your data on our servers unless you explicitly sign in and agree to participate under a Participant ID for research purposes.',
        answer_ar: 'جميع التقييمات تعمل بالكامل على متصفحك المحلي بشكل افتراضي. نحن لا نقوم بتخزين بياناتك على خوادمنا إلا إذا قمت بتسجيل الدخول صراحة ووافقت على المشاركة تحت معرف مشارك (Participant ID) لأغراض البحث.'
    },
    {
        id: 'prv2', category: 'privacy',
        question_en: 'Do you sell or share my data?',
        question_ar: 'هل تبيعون أو تشاركون بياناتي؟',
        answer_en: 'Absolutely not. Any data voluntarily submitted for our ongoing university research is strictly anonymized and aggregated. We do not sell data to third parties under any circumstances.',
        answer_ar: 'مطلقاً لا. أي بيانات يتم تقديمها طواعية لبحثنا الجامعي المستمر يتم إخفاء هويتها وتجميعها بدقة. نحن لا نبيع البيانات لأطراف ثالثة تحت أي ظرف من الظروف.'
    }
];
