import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, RotateCcw, Info, ImageIcon } from 'lucide-react';
import { getTranslation, ChildAssessmentLanguage } from './i18n';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ImageWithFallback } from '@/components/ui/image-with-fallback';

export interface FormData {
  ageMonths: number;
  sex: 'male' | 'female';
  weightKg: number;
  heightCm?: number;
  lengthCm?: number;
  muacMm?: number;
}

interface FormProps {
  language: ChildAssessmentLanguage;
  onSubmit: (data: FormData) => void;
  isCalculating: boolean;
}

const ChildAssessmentForm: React.FC<FormProps> = ({ language, onSubmit, isCalculating }) => {
  const t = getTranslation(language);
  
  const [ageUnit, setAgeUnit] = useState<'months' | 'years'>('months');
  const [ageValue, setAgeValue] = useState<string>('');
  
  const [formData, setFormData] = useState<Partial<FormData>>({
    ageMonths: undefined,
    sex: undefined,
    weightKg: undefined,
    heightCm: undefined,
    lengthCm: undefined,
    muacMm: undefined
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // حساب العمر بالأشهر من القيمة المدخلة
  const calculateAgeMonths = (value: string, unit: 'months' | 'years'): number | undefined => {
    const numValue = parseFloat(value);
    if (isNaN(numValue) || numValue < 0) return undefined;
    return unit === 'years' ? Math.round(numValue * 12) : Math.round(numValue);
  };

  // تحديد الفئة العمرية
  const getAgeGroup = (): 'under5' | '5plus' | null => {
    if (!formData.ageMonths) return null;
    return formData.ageMonths < 60 ? 'under5' : '5plus';
  };

  const ageGroup = getAgeGroup();

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // التحقق من العمر
    if (!formData.ageMonths) {
      newErrors.ageMonths = t.form.validation.ageRequired;
    } else if (formData.ageMonths < 0 || formData.ageMonths > 228) {
      newErrors.ageMonths = language === 'ar' 
        ? 'العمر يجب أن يكون بين 0 و 228 شهر (0-19 سنة)'
        : 'Age must be between 0 and 228 months (0-19 years)';
    }

    // التحقق من الجنس
    if (!formData.sex) {
      newErrors.sex = t.form.validation.sexRequired;
    }

    // التحقق من الوزن
    if (!formData.weightKg) {
      newErrors.weightKg = t.form.validation.weightRequired;
    } else {
      // نطاقات مختلفة حسب العمر
      const maxWeight = ageGroup === 'under5' ? 50 : 120;
      if (formData.weightKg < 2 || formData.weightKg > maxWeight) {
        newErrors.weightKg = language === 'ar'
          ? `الوزن يجب أن يكون بين 2 و ${maxWeight} كجم`
          : `Weight must be between 2 and ${maxWeight} kg`;
      }
    }

    // التحقق من الطول
    if (!formData.heightCm) {
      newErrors.heightCm = t.form.validation.heightRequired;
    } else {
      // نطاقات مختلفة حسب العمر
      const maxHeight = ageGroup === 'under5' ? 150 : 200;
      if (formData.heightCm < 40 || formData.heightCm > maxHeight) {
        newErrors.heightCm = language === 'ar'
          ? `الطول يجب أن يكون بين 40 و ${maxHeight} سم`
          : `Height must be between 40 and ${maxHeight} cm`;
      }
    }

    // التحقق من MUAC (اختياري للأطفال أقل من 5 سنوات فقط)
    if (ageGroup === 'under5' && formData.muacMm && (formData.muacMm < 80 || formData.muacMm > 250)) {
      newErrors.muacMm = t.form.validation.muacRange;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData as FormData);
    }
  };

  const handleReset = () => {
    setFormData({
      ageMonths: undefined,
      sex: undefined,
      weightKg: undefined,
      heightCm: undefined,
      muacMm: undefined
    });
    setErrors({});
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="w-5 h-5" />
          {t.form.calculate}
        </CardTitle>
        <CardDescription>{t.subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* العمر مع اختيار الوحدة */}
          <div className="space-y-2">
            <Label htmlFor="age">
              {language === 'ar' ? 'العمر' : 'Age'}
            </Label>
            <div className="flex gap-2">
              <Input
                id="age"
                type="number"
                min="0"
                max={ageUnit === 'months' ? '228' : '19'}
                step={ageUnit === 'months' ? '1' : '0.1'}
                placeholder={ageUnit === 'months' 
                  ? (language === 'ar' ? 'أدخل العمر بالأشهر' : 'Enter age in months')
                  : (language === 'ar' ? 'أدخل العمر بالسنوات' : 'Enter age in years')
                }
                value={ageValue}
                onChange={(e) => {
                  setAgeValue(e.target.value);
                  const months = calculateAgeMonths(e.target.value, ageUnit);
                  setFormData({ ...formData, ageMonths: months });
                }}
                className={`flex-1 ${errors.ageMonths ? 'border-red-500' : ''}`}
              />
              <Select
                value={ageUnit}
                onValueChange={(value: 'months' | 'years') => {
                  setAgeUnit(value);
                  // إعادة حساب العمر بالأشهر عند تغيير الوحدة
                  if (ageValue) {
                    const months = calculateAgeMonths(ageValue, value);
                    setFormData({ ...formData, ageMonths: months });
                  }
                }}
              >
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="months">
                    {language === 'ar' ? 'أشهر' : 'Months'}
                  </SelectItem>
                  <SelectItem value="years">
                    {language === 'ar' ? 'سنوات' : 'Years'}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            {errors.ageMonths && (
              <p className="text-sm text-red-500">{errors.ageMonths}</p>
            )}
            {formData.ageMonths && (
              <p className="text-xs text-muted-foreground">
                {language === 'ar' 
                  ? `العمر: ${formData.ageMonths} شهر (${(formData.ageMonths / 12).toFixed(1)} سنة)`
                  : `Age: ${formData.ageMonths} months (${(formData.ageMonths / 12).toFixed(1)} years)`
                }
              </p>
            )}
          </div>

          {/* تنبيه الفئة العمرية */}
          {ageGroup && (
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                {ageGroup === 'under5' ? (
                  language === 'ar' 
                    ? '📊 طفل أقل من 5 سنوات - سيتم حساب: BMI-for-age، الوزن للطول، الوزن للعمر، الطول للعمر، ومحيط الذراع (MUAC)'
                    : '📊 Child under 5 years - Will calculate: BMI-for-age, Weight-for-Length, Weight-for-Age, Height-for-Age, and MUAC'
                ) : (
                  language === 'ar'
                    ? '📊 طفل 5 سنوات فأكثر - سيتم حساب: BMI-for-age percentiles، الطول للعمر، والوزن للعمر'
                    : '📊 Child 5 years and above - Will calculate: BMI-for-age percentiles, Height-for-age, and Weight-for-age'
                )}
              </AlertDescription>
            </Alert>
          )}

          {/* الجنس */}
          <div className="space-y-2">
            <Label htmlFor="sex">{t.form.sex}</Label>
            <Select
              value={formData.sex}
              onValueChange={(value: 'male' | 'female') => setFormData({ ...formData, sex: value })}
            >
              <SelectTrigger className={errors.sex ? 'border-red-500' : ''}>
                <SelectValue placeholder={t.form.selectSex} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">{t.form.male}</SelectItem>
                <SelectItem value="female">{t.form.female}</SelectItem>
              </SelectContent>
            </Select>
            {errors.sex && (
              <p className="text-sm text-red-500">{errors.sex}</p>
            )}
          </div>

          {/* الوزن */}
          <div className="space-y-2">
            <Label htmlFor="weightKg">{t.form.weightKg}</Label>
            <Input
              id="weightKg"
              type="number"
              min="2"
              max={ageGroup === 'under5' ? '50' : '120'}
              step="0.1"
              placeholder={t.form.weightPlaceholder}
              value={formData.weightKg || ''}
              onChange={(e) => setFormData({ ...formData, weightKg: parseFloat(e.target.value) })}
              className={errors.weightKg ? 'border-red-500' : ''}
            />
            {errors.weightKg && (
              <p className="text-sm text-red-500">{errors.weightKg}</p>
            )}
          </div>

          {/* الطول */}
          <div className="space-y-2">
            <Label htmlFor="heightCm">{t.form.heightCm}</Label>
            <Input
              id="heightCm"
              type="number"
              min="40"
              max={ageGroup === 'under5' ? '150' : '200'}
              step="0.1"
              placeholder={t.form.heightPlaceholder}
              value={formData.heightCm || ''}
              onChange={(e) => setFormData({ ...formData, heightCm: parseFloat(e.target.value) })}
              className={errors.heightCm ? 'border-red-500' : ''}
            />
            {errors.heightCm && (
              <p className="text-sm text-red-500">{errors.heightCm}</p>
            )}
          </div>

          {/* MUAC (اختياري - فقط للأطفال أقل من 5 سنوات) */}
          {ageGroup === 'under5' && (
            <div className="space-y-2">
              <Label htmlFor="muacMm">{t.form.muacMm}</Label>
              <Input
                id="muacMm"
                type="number"
                min="80"
                max="250"
                step="1"
                placeholder={t.form.muacPlaceholder}
                value={formData.muacMm || ''}
                onChange={(e) => setFormData({ ...formData, muacMm: e.target.value ? parseFloat(e.target.value) : undefined })}
                className={errors.muacMm ? 'border-red-500' : ''}
              />
              {errors.muacMm && (
                <p className="text-sm text-red-500">{errors.muacMm}</p>
              )}
              
              {/* معلومات MUAC مع الصورة */}
              <Alert className="mt-2">
                <Info className="h-4 w-4" />
                <AlertDescription className="flex items-center justify-between gap-2">
                  <span className="text-sm">
                    {language === 'ar' 
                      ? 'محيط منتصف الذراع (MUAC) - مؤشر مهم لتقييم سوء التغذية الحاد' 
                      : 'Mid-Upper Arm Circumference (MUAC) - Important indicator for acute malnutrition'}
                  </span>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <ImageIcon className="h-3 w-3" />
                        {language === 'ar' ? 'عرض الصورة' : 'View Image'}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                      <DialogHeader>
                        <DialogTitle>
                          {language === 'ar' 
                            ? 'كيفية قياس محيط منتصف الذراع (MUAC)' 
                            : 'How to Measure Mid-Upper Arm Circumference (MUAC)'}
                        </DialogTitle>
                        <DialogDescription>
                          {language === 'ar'
                            ? 'استخدم شريط القياس الملون لتحديد حالة التغذية للطفل'
                            : 'Use the colored measuring tape to determine the child\'s nutritional status'}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="mt-4">
                        <ImageWithFallback
                          src="/images/muac-measurement.jpg" 
                          alt="MUAC Measurement Guide"
                          className="w-full h-auto rounded-lg border border-border"
                          showIcon={false}
                        />
                      </div>
                    </DialogContent>
                  </Dialog>
                </AlertDescription>
              </Alert>
            </div>
          )}

          {/* أزرار الإجراءات */}
          <div className="flex gap-2 pt-4">
            <Button
              type="submit"
              disabled={isCalculating}
              className="flex-1"
            >
              {isCalculating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  {t.form.calculating}
                </>
              ) : (
                <>
                  <Calculator className="w-4 h-4 mr-2" />
                  {t.form.calculate}
                </>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
              disabled={isCalculating}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              {t.form.reset}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ChildAssessmentForm;
