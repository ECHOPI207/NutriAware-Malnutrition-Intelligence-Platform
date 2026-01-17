// ملف الترجمة لأداة تقييم تغذية ونمو الطفل

export const childAssessmentTranslations = {
  ar: {
    title: 'تقييم تغذية ونمو الطفل',
    subtitle: 'أداة تقييم شاملة باستخدام معايير منظمة الصحة العالمية (WHO)',
    form: {
      ageMonths: 'العمر بالأشهر',
      ageMonthsPlaceholder: 'أدخل العمر (0-60 شهر)',
      sex: 'الجنس',
      male: 'ذكر',
      female: 'أنثى',
      selectSex: 'اختر الجنس',
      weightKg: 'الوزن (كجم)',
      weightPlaceholder: 'أدخل الوزن بالكيلوجرام',
      heightCm: 'الطول (سم)',
      heightPlaceholder: 'أدخل الطول بالسنتيمتر',
      muacMm: 'محيط منتصف الذراع العلوي - MUAC (مم)',
      muacPlaceholder: 'أدخل MUAC بالمليمتر (اختياري)',
      calculate: 'احسب التقييم',
      calculating: 'جاري الحساب...',
      reset: 'إعادة تعيين',
      saveToFile: 'حفظ السجل',
      validation: {
        ageRequired: 'العمر مطلوب',
        ageRange: 'العمر يجب أن يكون بين 0 و 60 شهر',
        sexRequired: 'الجنس مطلوب',
        weightRequired: 'الوزن مطلوب',
        weightRange: 'الوزن يجب أن يكون بين 2 و 50 كجم',
        heightRequired: 'الطول مطلوب',
        heightRange: 'الطول يجب أن يكون بين 40 و 150 سم',
        muacRange: 'MUAC يجب أن يكون بين 80 و 250 مم'
      }
    },
    results: {
      title: 'نتائج التقييم',
      analysis: 'تحليل النمو',
      analysisDesc: 'تقرير مفصل لحالة الطفل',
      bmi: 'مؤشر كتلة الجسم',
      bmiZScore: 'مؤشر كتلة الجسم للعمر (Z-Score)',
      zScore: 'Z-Score',
      classification: 'التصنيف',
      muacClassification: 'تصنيف MUAC',
      recommendations: 'التوصيات',
      aiRecommendations: 'توصيات ذكية',
      processingAI: 'جاري معالجة التوصيات الذكية...',
      disclaimer: '⚠️ تنبيه هام: المعلومات المقدمة للتوجيه فقط ولا تغني عن الاستشارة الطبية.',
      nutritionSummary: 'ملخص الحالة التغذوية',
      dietaryAdvice: 'نصائح غذائية',
      waiting: 'بانتظار البيانات',
      waitingDesc: 'أدخل بيانات الطفل (العمر، الوزن، الطول) للحصول على تقييم شامل.',
      noResults: 'لا توجد نتائج بعد',
      savedToHistory: 'تم حفظ التقييم في السجل',
      share: 'مشاركة',
      print: 'طباعة',
      downloadReport: 'تحميل التقرير (PDF)'
    },
    history: {
      title: 'سجل التقييمات',
      date: 'التاريخ',
      age: 'العمر',
      months: 'شهر',
      bmi: 'BMI',
      zScore: 'Z-Score',
      classification: 'التصنيف',
      noHistory: 'لا يوجد سجل تقييمات بعد',
      clear: 'مسح السجل',
      export: 'تصدير كـ JSON'
    },
    aiAdvice: {
      severe: {
        summary: 'الطفل يعاني من سوء تغذية حاد يتطلب تدخل طبي فوري. الحالة حرجة وتحتاج إلى برنامج تغذية علاجية متخصص.',
        advice1: 'إحالة فورية لطبيب أطفال أو مركز تغذية علاجية',
        advice2: 'قد يحتاج الطفل إلى تغذية علاجية جاهزة (RUTF) أو تغذية بالمستشفى'
      },
      moderate: {
        summary: 'الطفل يعاني من سوء تغذية متوسط ويحتاج إلى متابعة طبية وتحسين النظام الغذائي.',
        advice1: 'زيادة الأطعمة الغنية بالبروتين مثل البيض، اللحوم، البقوليات، ومنتجات الألبان',
        advice2: 'إضافة وجبات خفيفة مغذية بين الوجبات الرئيسية وزيارة أخصائي تغذية'
      },
      atRisk: {
        summary: 'الطفل معرض لخطر سوء التغذية ويحتاج إلى مراقبة دقيقة وتحسين التغذية.',
        advice1: 'تأكد من تناول 3 وجبات رئيسية متوازنة يوميًا مع وجبتين خفيفتين',
        advice2: 'أضف مصادر الحديد (لحوم حمراء، سبانخ) وفيتامين C (برتقال، طماطم) لتحسين الامتصاص'
      },
      normal: {
        summary: 'الطفل يتمتع بنمو طبيعي وصحي. استمر في الحفاظ على نمط الحياة الصحي الحالي.',
        advice1: 'استمر في تقديم نظام غذائي متنوع يشمل الفواكه والخضروات والحبوب الكاملة',
        advice2: 'شجع النشاط البدني المنتظم واللعب النشط لمدة ساعة يوميًا على الأقل'
      },
      overweight: {
        summary: 'الطفل يعاني من زيادة في الوزن. يُنصح بتعديل النظام الغذائي وزيادة النشاط البدني.',
        advice1: 'قلل الأطعمة المصنعة والمشروبات السكرية والوجبات السريعة',
        advice2: 'زد النشاط البدني تدريجيًا وركز على الأطعمة الطازجة والحبوب الكاملة'
      },
      obese: {
        summary: 'الطفل يعاني من السمنة ويحتاج إلى برنامج شامل لإدارة الوزن بإشراف طبي.',
        advice1: 'استشر طبيب أطفال وأخصائي تغذية لوضع خطة شاملة لإدارة الوزن',
        advice2: 'ركز على تغيير نمط الحياة للعائلة بأكملها مع دعم نفسي واجتماعي'
      }
    },
    medicalReport: {
      reportTitle: 'تقرير الحالة التغذوية للطفل',
      generatedOn: 'تاريخ التقرير',
      childInfo: 'بيانات الطفل',
      measurements: 'القياسات الحيوية',
      results: 'نتائج التقييم',
      medicalAdvice: 'خطة العمل الطبية والإرشادات',
      beforeVisit: 'قبل زيارة الطبيب',
      duringVisit: 'أثناء زيارة الطبيب (أسئلة مقترحة)',
      afterVisit: 'الرعاية المنزلية والمتابعة',
      footerDisclaimer: 'هذا التقرير تم إنشاؤه بواسطة منصة NutriAware. النتائج استرشادية ولا تغني عن التشخيص الطبي المتخصص.',
      actions: {
        severe: {
          before: ['تجهيز السجل المرضي للطفل وأي تحاليل سابقة', 'تسجيل قائمة بالأعراض المصاحبة (مثل فقدان الشهية، الخمول)', 'التوجه فوراً لأقرب مستشفى أو مركز متخصص'],
          during: ['هل يحتاج الطفل إلى حجز بالمستشفى؟', 'هل يحتاج إلى أغذية علاجية جاهزة (RUTF)؟', 'ما هي التحاليل المطلوبة لاستبعاد الأمراض المصاحبة؟'],
          after: ['الالتزام التام بمواعيد الأدوية والمكملات', 'متابعة الوزن أسبوعياً', 'عدم إجبار الطفل على الأكل والتركيز على وجبات صغيرة متكررة']
        },
        moderate: {
          before: ['تسجيل ما يتناوله الطفل لمدة 3 أيام', 'تجهيز قائمة بالأطعمة التي يرفضها الطفل'],
          during: ['هل نحتاج لمكملات غذائية (حديد، فيتامينات)؟', 'ما هو الوزن المستهدف ومتى يجب الوصول إليه؟', 'هل هناك طفيليات معوية تحتاج لعلاج؟'],
          after: ['إثراء الوجبات بالسعرات (إضافة زيت زيتون، طحينة)', 'تقديم وجبة إضافية قبل النوم', 'متابعة الوزن كل أسبوعين']
        },
        normal: {
          before: ['مراجعة جدول التطعيمات', 'تسجيل أي ملاحظات حول نشاط الطفل'],
          during: ['كيف نحافظ على هذا المعدل الطبيعي؟', 'ما هي الفيتامينات الوقائية المناسبة لهذا العمر؟'],
          after: ['الاستمرار على التنوع الغذائي', 'متابعة النمو كل 6 أشهر', 'تعزيز النشاط البدني']
        },
        obese: {
          before: ['تسجيل العادات الغذائية والنشاط البدني', 'تجنب لوم الطفل أو إشعاره بالذنب'], 
          during: ['تحليل الغدة الدرقية ووظائف الكبد؟', 'كيف نتعامل مع الجوع المستمر؟', 'خطة نشاط بدني مناسبة لا تضر المفاصل'],
          after: ['تغيير نمط حياة الأسرة بالكامل وليس الطفل فقط', 'توفير بدائل صحية للوجبات الخفيفة', 'التركيز على المشي والحركة اليومية']
        }
      }
    }
  },
  en: {
    title: 'Child Nutrition & Growth Assessment',
    subtitle: 'Comprehensive assessment tool using WHO standards',
    form: {
      ageMonths: 'Age in Months',
      ageMonthsPlaceholder: 'Enter age (0-60 months)',
      sex: 'Sex',
      male: 'Male',
      female: 'Female',
      selectSex: 'Select sex',
      weightKg: 'Weight (kg)',
      weightPlaceholder: 'Enter weight in kilograms',
      heightCm: 'Height (cm)',
      heightPlaceholder: 'Enter height in centimeters',
      muacMm: 'Mid-Upper Arm Circumference - MUAC (mm)',
      muacPlaceholder: 'Enter MUAC in millimeters (optional)',
      calculate: 'Calculate Assessment',
      calculating: 'Calculating...',
      reset: 'Reset',
      saveToFile: 'Save History',
      validation: {
        ageRequired: 'Age is required',
        ageRange: 'Age must be between 0 and 60 months',
        sexRequired: 'Sex is required',
        weightRequired: 'Weight is required',
        weightRange: 'Weight must be between 2 and 50 kg',
        heightRequired: 'Height is required',
        heightRange: 'Height must be between 40 and 150 cm',
        muacRange: 'MUAC must be between 80 and 250 mm'
      }
    },
    results: {
      title: 'Assessment Results',
      analysis: 'Growth Analysis',
      analysisDesc: 'Detailed report of child status',
      bmi: 'Body Mass Index (BMI)',
      bmiZScore: 'BMI-for-Age (Z-Score)',
      zScore: 'Z-Score',
      classification: 'Classification',
      muacClassification: 'MUAC Classification',
      recommendations: 'Recommendations',
      aiRecommendations: 'AI-Powered Recommendations',
      processingAI: 'Processing AI recommendations...',
      disclaimer: '⚠️ Important Notice: Information provided is for guidance only.',
      nutritionSummary: 'Nutritional Status Summary',
      dietaryAdvice: 'Dietary Advice',
      waiting: 'Waiting for Data',
      waitingDesc: 'Enter child data (age, weight, height) to get a comprehensive assessment.',
      noResults: 'No results yet',
      savedToHistory: 'Assessment saved to history',
      share: 'Share',
      print: 'Print',
      downloadReport: 'Download Report (PDF)'
    },
    history: {
      title: 'Assessment History',
      date: 'Date',
      age: 'Age',
      months: 'months',
      bmi: 'BMI',
      zScore: 'Z-Score',
      classification: 'Classification',
      noHistory: 'No assessment history yet',
      clear: 'Clear History',
      export: 'Download Report'
    },
    aiAdvice: {
      severe: {
        summary: 'The child has severe acute malnutrition requiring immediate medical intervention. This is a critical condition needing specialized therapeutic feeding program.',
        advice1: 'Immediate referral to pediatrician or therapeutic feeding center',
        advice2: 'Child may need Ready-to-Use Therapeutic Food (RUTF) or hospital-based feeding'
      },
      moderate: {
        summary: 'The child has moderate malnutrition and needs medical follow-up and dietary improvement.',
        advice1: 'Increase protein-rich foods like eggs, meat, legumes, and dairy products',
        advice2: 'Add nutritious snacks between main meals and visit a nutritionist'
      },
      atRisk: {
        summary: 'The child is at risk of malnutrition and needs close monitoring and nutritional improvement.',
        advice1: 'Ensure 3 balanced main meals daily with 2 nutritious snacks',
        advice2: 'Add iron sources (red meat, spinach) and vitamin C (oranges, tomatoes) to improve absorption'
      },
      normal: {
        summary: 'The child has normal, healthy growth. Continue maintaining current healthy lifestyle.',
        advice1: 'Continue providing varied diet including fruits, vegetables, and whole grains',
        advice2: 'Encourage regular physical activity and active play for at least one hour daily'
      },
      overweight: {
        summary: 'The child is overweight. Dietary modification and increased physical activity are recommended.',
        advice1: 'Reduce processed foods, sugary drinks, and fast food',
        advice2: 'Gradually increase physical activity and focus on fresh foods and whole grains'
      },
      obese: {
        summary: 'The child has obesity and needs comprehensive weight management program under medical supervision.',
        advice1: 'Consult pediatrician and nutritionist for comprehensive weight management plan',
        advice2: 'Focus on lifestyle changes for entire family with psychological and social support'
      }
    },
    medicalReport: {
      reportTitle: 'Child Nutritional Status Report',
      generatedOn: 'Report Date',
      childInfo: 'Child Information',
      measurements: 'Vital Measurements',
      results: 'Assessment Results',
      medicalAdvice: 'Medical Action Plan & Guidance',
      beforeVisit: 'Before Doctor Visit',
      duringVisit: 'During Visit (Suggested Questions)',
      afterVisit: 'Home Care & Follow-up',
      footerDisclaimer: 'This report was generated by NutriAware Platform. Results are for guidance only and do not replace professional medical diagnosis.',
      actions: {
        severe: {
          before: ['Prepare child medical history and previous labs', 'Record list of symptoms (e.g., loss of appetite, lethargy)', 'Go immediately to the nearest hospital or specialized center'],
          during: ['Does the child need hospitalization?', 'Is Ready-to-Use Therapeutic Food (RUTF) needed?', 'What lab tests are needed to rule out complications?'],
          after: ['Strict adherence to medication/supplement schedule', 'Weekly weight monitoring', 'Do not force feed; focus on small frequent meals']
        },
        moderate: {
          before: ['Record child food intake for 3 days', 'List foods the child refuses'],
          during: ['Do we need nutritional supplements (Iron, Vitamins)?', 'What is the target weight and timeline?', 'Are there intestinal parasites needing treatment?'],
          after: ['Enrich meals with calories (add olive oil, spreads)', 'Offer extra meal before bedtime', 'Bi-weekly weight monitoring']
        },
        normal: {
          before: ['Review vaccination schedule', 'Note any observations about child activity'],
          during: ['How to maintain this healthy rate?', 'What preventive vitamins are suitable for this age?'],
          after: ['Continue dietary diversity', 'Monitor growth every 6 months', 'Promote physical activity']
        },
        obese: {
          before: ['Record dietary habits and physical activity', 'Avoid shaming or blaming the child'],
          during: ['Thyroid and liver function tests?', 'How to manage constant hunger?', 'Physical activity plan safe for joints'],
          after: ['Lifestyle change for the whole family, not just the child', 'Provide healthy snack alternatives', 'Focus on daily walking and movement']
        }
      }
    }
  }
};


export type ChildAssessmentLanguage = 'ar' | 'en';

export function getTranslation(lang: ChildAssessmentLanguage) {
  return childAssessmentTranslations[lang];
}
