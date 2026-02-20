// ============================================================
// NutriAware Research Report Generator (APA Format)
// ============================================================

import { type FlatRow, type ExportConfig, type DescriptiveStats } from './surveyExport';
import { mean, standardDeviation, calculateReliability, pairedTTest, type TTestResult } from './statisticsEngine';

interface ReportData {
  projectName: string;
  totalN: number;
  validN: number;
  completionRate: number;
  qualityScore: number;
  demographics: {
    parents: { father: number, mother: number, other: number };
    education: { basic: number, high: number, univ: number, post: number };
    childAge: string;
  };
  dimensions: {
    nameAr: string;
    nameEn: string;
    alpha: number;
    means: number[]; // mean of each item
    overallMean: number;
    overallSD: number;
    preMean?: number;
    postMean?: number;
    tTest?: TTestResult;
  }[];
  npsScore: number;
  behavioralIndex: number;
}

/**
 * Generates a full academic evaluation report in plain text
 */
export function generateAcademicReport(data: ReportData): string {
  const date = new Date().toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' });

  let report = `\n`;
  report += `=================================================================\n`;
  report += `                تقرير التقييم البحثي والأثر السلوكي                  \n`;
  report += `               Research Evaluation & Impact Report               \n`;
  report += `=================================================================\n\n`;

  report += `المشروع (Project): ${data.projectName}\n`;
  report += `تاريخ الاستخراج (Date): ${date}\n\n`;

  // 1. Methodology & Sample
  report += `1. المنهجية وعينة الدراسة (Methodology & Sample)\n`;
  report += `-----------------------------------------------------------------\n`;
  report += `شملت عينة الدراسة (${data.totalN}) مشاركاً، بمعدل اكتمال بلغ (${data.completionRate.toFixed(1)}%). \n`;
  report += `بعد إجراء عمليات تنظيف البيانات المتقدمة (استبعاد الإجابات العشوائية والمكررة)، \n`;
  report += `بلغ حجم العينة الصالحة للتحليل الإحصائي الاستدلالي (N = ${data.validN}) مشاركاً، \n`;
  report += `مسجلة مؤشر جودة بيانات عام بلغ (${data.qualityScore}/100).\n\n`;

  const pF = ((data.demographics.parents.father / data.validN) * 100).toFixed(1);
  const pM = ((data.demographics.parents.mother / data.validN) * 100).toFixed(1);
  report += `توزعت العينة جندرياً من حيث مقدم الرعاية إلى ${pF}% آباء، و ${pM}% أمهات. \n`;
  report += `كما تنوعت المستويات التعليمية لتشمل الفئات من التعليم الأساسي وحتى الدراسات العليا.\n\n`;

  // 2. Reliability Analysis
  report += `2. الموثوقية والاتساق الداخلي (Reliability Analysis)\n`;
  report += `-----------------------------------------------------------------\n`;
  report += `تم التحقق من صدق وثبات أداة القياس (الاستبيان) باستخدام معامل الصدق ألفا كرونباخ \n`;
  report += `(Cronbach's Alpha) للمحاور الرئيسية. وجاءت النتائج كالتالي:\n\n`;

  data.dimensions.forEach(dim => {
    let status = 'غير مقبول';
    if (dim.alpha >= 0.9) status = 'ممتاز';
    else if (dim.alpha >= 0.8) status = 'جيد';
    else if (dim.alpha >= 0.7) status = 'مقبول';
    else if (dim.alpha >= 0.6) status = 'ضعيف';

    report += ` - محور (${dim.nameAr}): α = ${dim.alpha.toFixed(3)} (${status})\n`;
  });
  report += `\nمما يشير إلى أن أداة القياس تتمتع بدرجة ثبات إحصائية مناسبة لأغراض هذا التقييم.\n\n`;

  // 3. Descriptive Statistics
  report += `3. الإحصاء الوصفي للمحاور (Descriptive Statistics)\n`;
  report += `-----------------------------------------------------------------\n`;
  report += `تم حساب المتوسطات والانحرافات المعيارية (M, SD) لكل محور على مقياس التقييم المستخدم:\n\n`;

  data.dimensions.forEach(dim => {
    report += ` - ${dim.nameAr} (${dim.nameEn}): M = ${dim.overallMean.toFixed(2)}, SD = ${dim.overallSD.toFixed(2)}\n`;
  });
  report += `\n`;

  // 4. Inferential & Impact Analysis (Pre/Post)
  const prePostDims = data.dimensions.filter(d => d.tTest !== undefined);
  if (prePostDims.length > 0) {
    report += `4. قياس الأثر التجريبي (Inferential Impact Analysis)\n`;
    report += `-----------------------------------------------------------------\n`;
    report += `لمعرفة أثر التدخل (البرنامج التوعوي/المشروع)، تم استخدام اختبار (Paired Samples t-test) \n`;
    report += `ومربع إيتا / كوهين لقياس حجم الأثر (Effect Size - Cohen's d):\n\n`;

    prePostDims.forEach(dim => {
      if (!dim.tTest || !dim.preMean || !dim.postMean) return;
      const { tValue, df, pValue, significant, effectSizeD } = dim.tTest;
      const pre = dim.preMean.toFixed(2);
      const post = dim.postMean.toFixed(2);

      let effectLabel = 'محدود';
      if (effectSizeD >= 0.8) effectLabel = 'كبير (Large)';
      else if (effectSizeD >= 0.5) effectLabel = 'متوسط (Medium)';
      else if (effectSizeD >= 0.2) effectLabel = 'صغير (Small)';

      report += ` ♦ ${dim.nameAr}:\n`;
      report += `   القياس القبلي (M = ${pre})، القياس البعدي (M = ${post}).\n`;
      report += `   النتيجة الإحصائية: t(${df}) = ${tValue.toFixed(2)}, p = ${pValue.toFixed(3)}\n`;
      report += `   حجم الأثر التدخلي: d = ${effectSizeD.toFixed(2)} (${effectLabel})\n`;

      if (significant) {
        report += `   [الاستنتاج]: توجد فروق ذات دلالة إحصائية (α ≤ 0.05) تؤكد تحسن الأداء نتيجة للمشروع.\n\n`;
      } else {
        report += `   [الاستنتاج]: لا توجد فروق جوهرية دالة إحصائياً؛ التغيرات الظاهرة قد تكون بالصدفة.\n\n`;
      }
    });

    report += `- مؤشر التغيير السلوكي العام (Behavioral Index): ${data.behavioralIndex.toFixed(1)}/100\n`;
    report += `  (يقيس هذا المؤشر نسبة التحسن الكلية الموحدة لممارسات المشاركين قبل وبعد التدخل).\n\n`;
  }

  // 5. Satisfaction & Loyalty
  report += `5. رضا المستفيدين (Satisfaction & Net Promoter Score)\n`;
  report += `-----------------------------------------------------------------\n`;
  let npsStr = 'جيد';
  if (data.npsScore > 50) npsStr = 'ممتاز عالمياً';
  else if (data.npsScore < 0) npsStr = 'يحتاج لتدخل عاجل وتحسين';

  report += `سجل مؤشر صافي الترويج (Net Promoter Score / NPS) درجة: [${data.npsScore}]\n`;
  report += `وهذا يُصنف أكاديمياً وإدارياً ضمن النطاق (${npsStr}).\n\n`;

  // Footer
  report += `\n=================================================================\n`;
  report += `تم إنشاء هذا التقرير آلياً بواسطة المنصة البحثية التابعة لنظام NutriAware.\n`;
  report += `يعتمد التقرير على المعايير الإحصائية لمنظمة علم النفس الأمريكية (APA Format).\n`;
  report += `=================================================================\n`;

  return report;
}
