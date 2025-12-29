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
      bmi: 'مؤشر كتلة الجسم (BMI)',
      zScore: 'Z-Score (BMI-for-age)',
      classification: 'التصنيف',
      muacClassification: 'تصنيف MUAC',
      recommendations: 'التوصيات',
      aiRecommendations: 'توصيات ذكية',
      processingAI: 'جاري معالجة التوصيات الذكية...',
      disclaimer: '⚠️ تنبيه هام: المعلومات المقدمة للتوجيه فقط ولا تغني عن الاستشارة الطبية. راجع طبيب أطفال متخصص في حالات الشدة أو للحصول على تقييم شامل.',
      nutritionSummary: 'ملخص الحالة التغذوية',
      dietaryAdvice: 'نصائح غذائية',
      noResults: 'لا توجد نتائج بعد. املأ النموذج واضغط على "احسب التقييم".',
      savedToHistory: 'تم حفظ التقييم في السجل'
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
      bmi: 'Body Mass Index (BMI)',
      zScore: 'Z-Score (BMI-for-age)',
      classification: 'Classification',
      muacClassification: 'MUAC Classification',
      recommendations: 'Recommendations',
      aiRecommendations: 'AI-Powered Recommendations',
      processingAI: 'Processing AI recommendations...',
      disclaimer: '⚠️ Important Notice: Information provided is for guidance only and does not replace medical consultation. Consult a pediatrician for severe cases or comprehensive assessment.',
      nutritionSummary: 'Nutritional Status Summary',
      dietaryAdvice: 'Dietary Advice',
      noResults: 'No results yet. Fill the form and click "Calculate Assessment".',
      savedToHistory: 'Assessment saved to history'
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
      export: 'Export as JSON'
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
    }
  }
};

export type ChildAssessmentLanguage = 'ar' | 'en';

export function getTranslation(lang: ChildAssessmentLanguage) {
  return childAssessmentTranslations[lang];
}
