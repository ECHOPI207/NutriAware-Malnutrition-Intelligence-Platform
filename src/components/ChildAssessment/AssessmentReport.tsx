import { forwardRef } from 'react';
import { getTranslation, ChildAssessmentLanguage } from './i18n';
import type { HistoryEntry } from './index';

interface AssessmentReportProps {
  entry: HistoryEntry | null;
  language: ChildAssessmentLanguage;
}

export const AssessmentReport = forwardRef<HTMLDivElement, AssessmentReportProps>(
  ({ entry, language }, ref) => {
    if (!entry) return null;

    const t = getTranslation(language);
    const isRTL = language === 'ar';
    const { input, result } = entry;
    
    // Determine category key for actions
    // Determine category key for actions
    let categoryKey = 'normal';
    const category = result.classification.category || '';
    
    if (category.includes('Severely') || category.includes('Stunted') || category.includes('Wasted')) {
      categoryKey = 'severe';
    } else if (category.includes('Moderately') || category.includes('Risk')) {
      categoryKey = 'moderate';
    } else if (category.includes('Overweight')) {
      categoryKey = 'overweight';
    } else if (category.includes('Obese') || category.includes('Obesity')) {
      categoryKey = 'obese';
    } else {
      // Fallback if keys don't match perfectly
      if (result.classification.color.includes('red')) categoryKey = 'severe';
      else if (result.classification.color.includes('orange')) categoryKey = 'moderate';
      else if (result.classification.color.includes('yellow')) categoryKey = 'atRisk';
    }

    // @ts-ignore - access based on dynamic key
    const advice = t.medicalReport.actions[categoryKey] || t.medicalReport.actions['normal'];

    return (
      <div ref={ref} className="hidden print:block p-8 bg-white text-black max-w-4xl mx-auto" dir={isRTL ? 'rtl' : 'ltr'}>
        {/* Header */}
        <div className="flex justify-between items-center border-b-2 border-gray-200 pb-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary mb-2">{t.medicalReport.reportTitle}</h1>
            <p className="text-gray-500">{t.medicalReport.generatedOn}: {new Date().toLocaleDateString(isRTL ? 'ar-EG' : 'en-US')}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary">NutriAware</span>
          </div>
        </div>

        {/* Child Info & Vitals Grid */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-800 border-b pb-2">{t.medicalReport.childInfo}</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="block text-gray-500">{t.form.ageMonths}</span>
                <span className="font-semibold text-lg">{input.ageMonths} {t.history.months}</span>
              </div>
              <div>
                <span className="block text-gray-500">{t.form.sex}</span>
                <span className="font-semibold text-lg capitalize">{input.sex === 'male' ? t.form.male : t.form.female}</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-800 border-b pb-2">{t.medicalReport.measurements}</h3>
             <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="block text-gray-500">{t.form.weightKg}</span>
                <span className="font-semibold text-lg">{input.weightKg} kg</span>
              </div>
              <div>
                <span className="block text-gray-500">{t.form.heightCm}</span>
                <span className="font-semibold text-lg">{input.heightCm} cm</span>
              </div>
              {input.muacMm && (
                <div className="col-span-2">
                  <span className="block text-gray-500">{t.form.muacMm}</span>
                  <span className="font-semibold text-lg">{input.muacMm} mm</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Assessment Results */}
        <div className="bg-gray-50 rounded-xl p-6 mb-8 border border-gray-200">
           <h3 className="text-xl font-bold text-gray-800 mb-4">{t.medicalReport.results}</h3>
           <div className="flex items-center justify-between">
              <div className="text-center">
                <span className="block text-gray-500 mb-1">{t.results.bmi}</span>
                <span className="text-3xl font-bold text-primary">{result.bmi.toFixed(1)}</span>
              </div>
              <div className="text-center">
                <span className="block text-gray-500 mb-1">{t.results.zScore}</span>
                <span className="text-3xl font-bold" style={{ color: result.classification.color.replace('text-', '').replace('-500', '') }}>
                   {result.zScore > 0 ? '+' : ''}{result.zScore.toFixed(2)}
                </span>
              </div>
              <div className="text-center flex-1 mx-8">
                 <div className={`py-2 px-4 rounded-lg text-center font-bold text-white ${result.classification.color.replace('text-', 'bg-').replace('500', '600')}`}>
                   {isRTL ? result.classification.categoryAr : result.classification.category}
                 </div>
              </div>
           </div>
           {result.muacClassification && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                 <p className="font-medium">
                   {t.results.muacClassification}: <span className="text-primary">{result.muacClassification.category}</span>
                 </p>
              </div>
           )}
        </div>

        {/* Action Plan */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-900 border-b pb-2">{t.medicalReport.medicalAdvice}</h3>
          
          <div className="grid grid-cols-1 gap-6">
            {/* Before Visit */}
            <div className="border border-blue-100 bg-blue-50/50 rounded-lg p-5">
              <h4 className="font-bold text-blue-800 mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-sm">1</span>
                {t.medicalReport.beforeVisit}
              </h4>
              <ul className="list-disc leading-relaxed text-blue-900 pr-5 pl-5">
                {advice.before.map((item: string, idx: number) => (
                  <li key={idx} className="mb-1">{item}</li>
                ))}
              </ul>
            </div>

            {/* During Visit */}
            <div className="border border-purple-100 bg-purple-50/50 rounded-lg p-5">
              <h4 className="font-bold text-purple-800 mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-sm">2</span>
                {t.medicalReport.duringVisit}
              </h4>
              <ul className="list-disc leading-relaxed text-purple-900 pr-5 pl-5">
                {advice.during.map((item: string, idx: number) => (
                  <li key={idx} className="mb-1">{item}</li>
                ))}
              </ul>
            </div>

            {/* After Visit */}
            <div className="border border-green-100 bg-green-50/50 rounded-lg p-5">
              <h4 className="font-bold text-green-800 mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-sm">3</span>
                {t.medicalReport.afterVisit}
              </h4>
              <ul className="list-disc leading-relaxed text-green-900 pr-5 pl-5">
                {advice.after.map((item: string, idx: number) => (
                  <li key={idx} className="mb-1">{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
          <p>{t.medicalReport.footerDisclaimer}</p>
        </div>
      </div>
    );
  }
);

AssessmentReport.displayName = 'AssessmentReport';

export default AssessmentReport;
