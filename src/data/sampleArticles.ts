// Sample articles data for testing the multilingual article system
export const sampleArticles = [
  {
    id: '1',
    title: {
      ar: 'أهمية التغذية السليمة للأطفال',
      en: 'The Importance of Proper Nutrition for Children'
    },
    content: {
      ar: 'التغذية السليمة للأطفال هي أساس نموهم الصحي والسليم. يحتاج الأطفال إلى مجموعة متنوعة من العناصر الغذائية لدعم نموهم البدني والعقلي. تشمل هذه العناصر البروتينات والكربوهيدرات والدهون الصحية والفيتامينات والمعادن. من المهم جداً أن يحصل الأطفال على وجبات متوازنة تحتوي على جميع هذه العناصر بالكميات المناسبة لأعمارهم ومستوى نشاطهم.',
      en: 'Proper nutrition for children is the foundation of their healthy and sound growth. Children need a variety of nutrients to support their physical and mental development. These nutrients include proteins, carbohydrates, healthy fats, vitamins, and minerals. It is very important that children receive balanced meals containing all these elements in appropriate quantities for their age and activity level.'
    },
    category: {
      ar: 'تغذية الأطفال',
      en: 'Child Nutrition'
    },
    status: 'published' as const,
    author: 'د. أحمد محمد',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    views: 245,
    featuredImage: '/images/child-nutrition.jpg',
    gallery: [
      '/images/healthy-foods-1.jpg',
      '/images/healthy-foods-2.jpg'
    ],
    videoUrl: 'https://youtube.com/watch?v=example1',
    tags: {
      ar: ['تغذية', 'أطفال', 'صحة', 'نمو'],
      en: ['nutrition', 'children', 'health', 'growth']
    }
  },
  {
    id: '2',
    title: {
      ar: 'علامات سوء التغذية عند الرضع',
      en: 'Signs of Malnutrition in Infants'
    },
    content: {
      ar: 'سوء التغذية عند الرضع مشكلة خطيرة يمكن أن تؤثر على نموهم وتطورهم. من أهم العلامات التي يجب على الوالدين ملاحظتها: عدم زيادة الوزن بالمعدل الطبيعي، الخمول وقلة النشاط، تأخر في النمو الجسدي، ضعف في جهاز المناعة مما يؤدي إلى كثرة الإصابة بالأمراض. كما قد يظهر على الطفل شحوب في الوجه وجفاف في الجلد.',
      en: 'Malnutrition in infants is a serious problem that can affect their growth and development. The most important signs that parents should notice include: failure to gain weight at a normal rate, lethargy and lack of activity, delayed physical growth, weakened immune system leading to frequent illnesses. The child may also show pallor in the face and dry skin.'
    },
    category: {
      ar: 'سوء التغذية',
      en: 'Malnutrition'
    },
    status: 'published' as const,
    author: 'د. فاطمة أحمد',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
    views: 189,
    featuredImage: '/images/infant-health.jpg',
    gallery: [],
    videoUrl: '',
    tags: {
      ar: ['رضع', 'سوء تغذية', 'علامات', 'صحة'],
      en: ['infants', 'malnutrition', 'signs', 'health']
    }
  },
  {
    id: '3',
    title: {
      ar: 'الوقاية من سوء التغذية في المجتمعات الريفية',
      en: 'Preventing Malnutrition in Rural Communities'
    },
    content: {
      ar: 'الوقاية من سوء التغذية في المجتمعات الريفية تتطلب نهجاً شاملاً يشمل التعليم والتوعية وتحسين الوصول إلى الغذاء المغذي. من أهم الاستراتيجيات: تعليم الأمهات حول التغذية السليمة، تطوير برامج الزراعة المنزلية، تحسين أنظمة المياه والصرف الصحي، وإنشاء مراكز صحية مجتمعية. كما يجب العمل على تحسين الأوضاع الاقتصادية للأسر لضمان قدرتها على شراء الغذاء المناسب.',
      en: 'Preventing malnutrition in rural communities requires a comprehensive approach that includes education, awareness, and improving access to nutritious food. Key strategies include: educating mothers about proper nutrition, developing home gardening programs, improving water and sanitation systems, and establishing community health centers. It is also necessary to work on improving the economic conditions of families to ensure their ability to purchase appropriate food.'
    },
    category: {
      ar: 'الوقاية',
      en: 'Prevention'
    },
    status: 'published' as const,
    author: 'د. محمد علي',
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05'),
    views: 156,
    featuredImage: '/images/rural-community.jpg',
    gallery: [
      '/images/community-garden.jpg',
      '/images/health-education.jpg',
      '/images/clean-water.jpg'
    ],
    videoUrl: 'https://youtube.com/watch?v=example3',
    tags: {
      ar: ['وقاية', 'مجتمعات ريفية', 'تعليم', 'زراعة'],
      en: ['prevention', 'rural communities', 'education', 'agriculture']
    }
  }
];

export default sampleArticles;