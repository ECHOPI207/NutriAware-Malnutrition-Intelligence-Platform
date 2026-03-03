// دوال حساب Z-Score باستخدام معايير WHO LMS

export interface LMSData {
  ageMonths: number;
  L: number;
  M: number;
  S: number;
}

export interface WHOData {
  male: LMSData[];
  female: LMSData[];
}

export interface ClassificationResult {
  category: string;
  categoryAr: string;
  severity: 'severe' | 'moderate' | 'normal' | 'overweight' | 'obese';
  color: string;
  recommendation: string;
  recommendationAr: string;
}

/**
 * حساب Z-Score باستخدام صيغة LMS
 * @param value القيمة المقاسة (مثل BMI)
 * @param L معامل Box-Cox
 * @param M الوسيط
 * @param S معامل التباين
 * @returns Z-Score المحسوب
 */
export function computeZscore(value: number, L: number, M: number, S: number): number {
  if (L === 0) {
    // إذا كان L = 0، استخدم اللوغاريتم الطبيعي
    return Math.log(value / M) / S;
  } else {
    // الصيغة القياسية لـ LMS
    return (Math.pow(value / M, L) - 1) / (L * S);
  }
}

/**
 * تصنيف BMI-for-age بناءً على Z-Score
 * @param z قيمة Z-Score
 * @param ageMonths عمر الطفل بالأشهر
 * @param sex جنس الطفل
 * @returns نتيجة التصنيف مع التوصيات
 */
export function classifyBMIforAge(
  z: number,
  _ageMonths: number,
  _sex: 'male' | 'female'
): ClassificationResult {
  // تصنيف حسب معايير WHO
  if (z < -3) {
    return {
      category: 'Severe Acute Malnutrition (SAM)',
      categoryAr: 'سوء تغذية حاد شديد',
      severity: 'severe',
      color: 'text-red-600 dark:text-red-400',
      recommendation: 'Immediate medical attention required. Consult a pediatrician urgently for therapeutic feeding program.',
      recommendationAr: 'يتطلب عناية طبية فورية. استشر طبيب أطفال بشكل عاجل لبرنامج تغذية علاجية.'
    };
  } else if (z < -2) {
    return {
      category: 'Moderate Acute Malnutrition (MAM)',
      categoryAr: 'سوء تغذية حاد متوسط',
      severity: 'moderate',
      color: 'text-orange-600 dark:text-orange-400',
      recommendation: 'Specialized nutritional guidance recommended. Increase calorie-dense foods and monitor growth regularly.',
      recommendationAr: 'يُنصح بتوجيه غذائي متخصص. زيادة الأطعمة الغنية بالسعرات الحرارية ومراقبة النمو بانتظام.'
    };
  } else if (z < -1) {
    return {
      category: 'At Risk of Malnutrition',
      categoryAr: 'معرض لخطر سوء التغذية',
      severity: 'moderate',
      color: 'text-yellow-600 dark:text-yellow-400',
      recommendation: 'Monitor growth closely. Ensure balanced diet with adequate protein, vitamins, and minerals.',
      recommendationAr: 'راقب النمو عن كثب. تأكد من نظام غذائي متوازن مع بروتين وفيتامينات ومعادن كافية.'
    };
  } else if (z <= 1) {
    return {
      category: 'Normal Growth',
      categoryAr: 'نمو طبيعي',
      severity: 'normal',
      color: 'text-green-600 dark:text-green-400',
      recommendation: 'Excellent! Continue with balanced nutrition and regular physical activity.',
      recommendationAr: 'ممتاز! استمر في التغذية المتوازنة والنشاط البدني المنتظم.'
    };
  } else if (z <= 2) {
    return {
      category: 'Possible Risk of Overweight',
      categoryAr: 'احتمال زيادة الوزن',
      severity: 'overweight',
      color: 'text-yellow-600 dark:text-yellow-400',
      recommendation: 'Monitor diet and increase physical activity. Limit sugary drinks and processed foods.',
      recommendationAr: 'راقب النظام الغذائي وزد النشاط البدني. قلل المشروبات السكرية والأطعمة المصنعة.'
    };
  } else if (z <= 3) {
    return {
      category: 'Overweight',
      categoryAr: 'زيادة وزن',
      severity: 'overweight',
      color: 'text-orange-600 dark:text-orange-400',
      recommendation: 'Consult a nutritionist. Focus on portion control, healthy foods, and regular exercise.',
      recommendationAr: 'استشر أخصائي تغذية. ركز على التحكم في الحصص والأطعمة الصحية والتمارين المنتظمة.'
    };
  } else {
    return {
      category: 'Obesity',
      categoryAr: 'سمنة',
      severity: 'obese',
      color: 'text-red-600 dark:text-red-400',
      recommendation: 'Specialized nutritional guidance required. Comprehensive weight management program needed with healthcare team.',
      recommendationAr: 'يتطلب توجيه غذائي متخصص. برنامج شامل لإدارة الوزن مطلوب مع فريق الرعاية الصحية.'
    };
  }
}

/**
 * تصنيف MUAC (محيط منتصف الذراع العلوي)
 * @param muacMm قياس MUAC بالمليمتر
 * @param ageMonths عمر الطفل بالأشهر
 * @param sex جنس الطفل
 * @returns نتيجة التصنيف
 */
export function classifyMUAC(
  muacMm: number,
  ageMonths: number,
  _sex: 'male' | 'female'
): ClassificationResult {
  // معايير MUAC العامة للأطفال 6-59 شهر
  // ملاحظة: راجع البروتوكولات المحلية/WHO للقطع الدقيقة

  if (ageMonths < 6) {
    return {
      category: 'MUAC Not Applicable',
      categoryAr: 'MUAC غير قابل للتطبيق',
      severity: 'normal',
      color: 'text-gray-600 dark:text-gray-400',
      recommendation: 'MUAC screening is typically used for children 6-59 months. Use BMI-for-age instead.',
      recommendationAr: 'يُستخدم فحص MUAC عادةً للأطفال من 6-59 شهرًا. استخدم BMI-for-age بدلاً من ذلك.'
    };
  }

  if (muacMm < 115) {
    return {
      category: 'Severe Acute Malnutrition (MUAC)',
      categoryAr: 'سوء تغذية حاد شديد (MUAC)',
      severity: 'severe',
      color: 'text-red-600 dark:text-red-400',
      recommendation: 'Critical! Immediate referral to therapeutic feeding program required. Consult pediatrician urgently.',
      recommendationAr: 'حرج! إحالة فورية لبرنامج تغذية علاجية مطلوبة. استشر طبيب أطفال بشكل عاجل.'
    };
  } else if (muacMm < 125) {
    return {
      category: 'Moderate Acute Malnutrition (MUAC)',
      categoryAr: 'سوء تغذية حاد متوسط (MUAC)',
      severity: 'moderate',
      color: 'text-orange-600 dark:text-orange-400',
      recommendation: 'Medical attention needed. Supplementary feeding program recommended. Monitor weekly.',
      recommendationAr: 'يحتاج عناية طبية. يُنصح ببرنامج تغذية تكميلية. راقب أسبوعيًا.'
    };
  } else if (muacMm < 135) {
    return {
      category: 'At Risk (MUAC)',
      categoryAr: 'معرض للخطر (MUAC)',
      severity: 'moderate',
      color: 'text-yellow-600 dark:text-yellow-400',
      recommendation: 'Monitor closely. Ensure adequate nutrition with protein-rich foods and regular follow-up.',
      recommendationAr: 'راقب عن كثب. تأكد من التغذية الكافية مع الأطعمة الغنية بالبروتين والمتابعة المنتظمة.'
    };
  } else {
    return {
      category: 'Normal (MUAC)',
      categoryAr: 'طبيعي (MUAC)',
      severity: 'normal',
      color: 'text-green-600 dark:text-green-400',
      recommendation: 'Good nutritional status. Continue balanced diet and regular growth monitoring.',
      recommendationAr: 'حالة تغذوية جيدة. استمر في النظام الغذائي المتوازن ومراقبة النمو المنتظمة.'
    };
  }
}

/**
 * البحث عن أقرب بيانات LMS للعمر المحدد
 * @param ageMonths عمر الطفل بالأشهر
 * @param sex جنس الطفل
 * @param data بيانات WHO
 * @returns بيانات LMS الأقرب
 */
export function findClosestLMS(
  ageMonths: number,
  sex: 'male' | 'female',
  data: WHOData
): LMSData | null {
  const sexData = data[sex];
  if (!sexData || sexData.length === 0) return null;

  // البحث عن أقرب عمر
  let closest = sexData[0];
  let minDiff = Math.abs(sexData[0].ageMonths - ageMonths);

  for (const entry of sexData) {
    const diff = Math.abs(entry.ageMonths - ageMonths);
    if (diff < minDiff) {
      minDiff = diff;
      closest = entry;
    }
  }

  return closest;
}


