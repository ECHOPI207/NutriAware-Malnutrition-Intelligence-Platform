import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, RotateCcw, Info, ImageIcon, CheckCircle2 } from 'lucide-react';
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
  const isRTL = language === 'ar';
  
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
      newErrors.ageMonths = isRTL 
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
        newErrors.weightKg = isRTL
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
      if (formData.heightCm <= 0 || formData.heightCm > maxHeight) {
        newErrors.heightCm = isRTL
          ? `الطول يجب أن يكون بين 0 و ${maxHeight} سم`
          : `Height must be between 0 and ${maxHeight} cm`;
      }
    }

    // التحقق من MUAC (اختياري للأطفال أقل من 5 سنوات فقط)
    // Validate only if value is provided
    if (ageGroup === 'under5' && formData.muacMm && (formData.muacMm < 0 || formData.muacMm > 250)) {
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
    setAgeValue('');
  };

  return (
    <Card className="border-0 shadow-xl bg-card/60 backdrop-blur-xl ring-1 ring-border/20 overflow-hidden">
      <div className="h-1.5 w-full bg-gradient-to-r from-accent/80 to-accent/20" />
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-2xl">
           <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
             <Calculator className="w-6 h-6 text-accent" />
           </div>
          {t.form.calculate}
        </CardTitle>
        <CardDescription className="text-base">{t.subtitle}</CardDescription>
      </CardHeader>
      <CardContent className="p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* العمر مع اختيار الوحدة */}
          <div className="space-y-3">
            <Label htmlFor="age" className="text-base font-medium">
              {isRTL ? 'العمر' : 'Age'}
            </Label>
            <div className="flex gap-3">
              <div className="relative flex-1">
                 <Input
                  id="age"
                  type="number"
                  min="0"
                  max={ageUnit === 'months' ? '228' : '19'}
                  step={ageUnit === 'months' ? '1' : '0.1'}
                  placeholder={ageUnit === 'months' 
                    ? (isRTL ? 'مثال: 12' : 'Example: 12')
                    : (isRTL ? 'مثال: 1.5' : 'Example: 1.5')
                  }
                  value={ageValue}
                  onChange={(e) => {
                    setAgeValue(e.target.value);
                    const months = calculateAgeMonths(e.target.value, ageUnit);
                    setFormData({ ...formData, ageMonths: months });
                  }}
                  className={`h-12 bg-background/50 border-2 border-border/40 focus:border-accent/50 focus:ring-accent/20 rounded-xl text-lg px-4 ${isRTL ? 'text-right' : 'text-left'} ${errors.ageMonths ? 'border-destructive' : ''}`}
                />
              </div>
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
                <SelectTrigger className="w-[110px] sm:w-[140px] h-12 bg-background/50 border-2 border-border/40 focus:ring-accent/20 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="months">
                    {isRTL ? 'أشهر' : 'Months'}
                  </SelectItem>
                  <SelectItem value="years">
                    {isRTL ? 'سنوات' : 'Years'}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            {errors.ageMonths && (
              <p className="text-sm font-medium text-destructive mt-1 flex items-center gap-1">
                 <Info className="w-3 h-3" /> {errors.ageMonths}
              </p>
            )}
            {formData.ageMonths && !errors.ageMonths && (
              <p className="text-sm font-medium text-accent flex items-center gap-1.5 bg-accent/5 p-2 rounded-lg">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {isRTL 
                  ? `العمر المحسوب: ${formData.ageMonths} شهر (${(formData.ageMonths / 12).toFixed(1)} سنة)`
                  : `Calculated Age: ${formData.ageMonths} months (${(formData.ageMonths / 12).toFixed(1)} years)`
                }
              </p>
            )}
          </div>

          {/* تنبيه الفئة العمرية */}
          {ageGroup && (
            <Alert className="bg-primary/5 border-primary/20">
              <Info className="h-5 w-5 text-primary" />
              <AlertDescription className="text-sm font-medium leading-relaxed">
                {ageGroup === 'under5' ? (
                  isRTL 
                    ? 'الطفل أقل من 5 سنوات: سيتم حساب مؤشرات النمو (WHO) ومحيط الذراع (MUAC)'
                    : 'Child under 5: Will calculate WHO growth standards & MUAC'
                ) : (
                  isRTL
                    ? 'الطفل 5 سنوات فأكثر: سيتم حساب مؤشرات كتلة الجسم للعمر (Percentiles)'
                    : 'Child 5+ years: Will calculate BMI-for-age percentiles'
                )}
              </AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {/* الجنس */}
            <div className="space-y-3">
              <Label htmlFor="sex" className="text-base font-medium">{t.form.sex}</Label>
              <Select
                value={formData.sex}
                onValueChange={(value: 'male' | 'female') => setFormData({ ...formData, sex: value })}
              >
                <SelectTrigger className={`h-12 bg-background/50 border-2 border-border/40 focus:ring-accent/20 rounded-xl ${errors.sex ? 'border-destructive' : ''}`}>
                  <SelectValue placeholder={t.form.selectSex} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">{t.form.male}</SelectItem>
                  <SelectItem value="female">{t.form.female}</SelectItem>
                </SelectContent>
              </Select>
              {errors.sex && (
                <p className="text-sm font-medium text-destructive mt-1">{errors.sex}</p>
              )}
            </div>

            {/* الوزن */}
            <div className="space-y-3">
              <Label htmlFor="weightKg" className="text-base font-medium">{t.form.weightKg}</Label>
              <div className="relative" dir="ltr">
                 <Input
                  id="weightKg"
                  type="number"
                  min="2"
                  max={ageGroup === 'under5' ? '50' : '120'}
                  step="0.1"
                  placeholder="0.0"
                  value={formData.weightKg || ''}
                  onChange={(e) => setFormData({ ...formData, weightKg: parseFloat(e.target.value) })}
                  className={`h-12 bg-background/50 border-2 border-border/40 focus:border-accent/50 focus:ring-accent/20 rounded-xl text-lg pr-12 pl-4 text-left ${errors.weightKg ? 'border-destructive' : ''}`}
                  style={{ direction: 'ltr', textAlign: 'left' }}
                />
                <div className="absolute top-1/2 -translate-y-1/2 text-sm text-muted-foreground font-medium pointer-events-none right-4">
                   kg
                </div>
              </div>
              {errors.weightKg && (
                <p className="text-sm font-medium text-destructive mt-1">{errors.weightKg}</p>
              )}
            </div>

            {/* الطول */}
            <div className="space-y-3">
              <Label htmlFor="heightCm" className="text-base font-medium">{t.form.heightCm}</Label>
              <div className="relative" dir="ltr">
                 <Input
                  id="heightCm"
                  type="number"
                  min="0"
                  max={ageGroup === 'under5' ? '150' : '200'}
                  step="0.1"
                  placeholder="0.0"
                  value={formData.heightCm || ''}
                  onChange={(e) => setFormData({ ...formData, heightCm: parseFloat(e.target.value) })}
                  className={`h-12 bg-background/50 border-2 border-border/40 focus:border-accent/50 focus:ring-accent/20 rounded-xl text-lg pr-12 pl-4 text-left ${errors.heightCm ? 'border-destructive' : ''}`}
                  style={{ direction: 'ltr', textAlign: 'left' }}
                />
                 <div className="absolute top-1/2 -translate-y-1/2 text-sm text-muted-foreground font-medium pointer-events-none right-4">
                   cm
                </div>
              </div>
              {errors.heightCm && (
                <p className="text-sm font-medium text-destructive mt-1">{errors.heightCm}</p>
              )}
            </div>

            </div>

          {/* MUAC (اختياري - فقط للأطفال أقل من 5 سنوات) */}
          {ageGroup === 'under5' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="muacMm" className="text-base font-medium">
                    {t.form.muacMm} <span className="text-muted-foreground text-sm font-normal">({isRTL ? 'اختياري' : 'Optional'})</span>
                </Label>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-6 gap-1.5 text-xs text-muted-foreground hover:text-primary p-0 px-2 rounded-full border border-border/50">
                        <ImageIcon className="h-3 w-3" />
                        {isRTL ? 'كيف أقيس؟' : 'How to measure?'}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                      <DialogHeader>
                        <DialogTitle>
                          {isRTL 
                            ? 'كيفية قياس محيط منتصف الذراع (MUAC)' 
                            : 'How to Measure Mid-Upper Arm Circumference (MUAC)'}
                        </DialogTitle>
                        <DialogDescription>
                          {isRTL
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
              </div>
              
              <div className="relative" dir="ltr">
                <Input
                  id="muacMm"
                  type="number"
                  step="1"
                  placeholder="00"
                  value={formData.muacMm || ''}
                  onChange={(e) => setFormData({ ...formData, muacMm: e.target.value ? parseFloat(e.target.value) : undefined })}
                  className={`h-12 bg-background/50 border-2 border-border/40 focus:border-accent/50 focus:ring-accent/20 transition-all text-lg pr-12 pl-4 text-left`} // Padding for unit
                  style={{ direction: 'ltr', textAlign: 'left' }}
                />
                <div className="absolute top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none text-muted-foreground font-medium bg-muted/30 h-full px-3 border-l border-border/40 right-0 rounded-r-md">
                    mm
                </div>
              </div>
              {errors.muacMm && (
                <p className="text-sm font-medium text-destructive mt-1">{errors.muacMm}</p>
              )}
            </div>
          )}

          {/* أزرار الإجراءات */}
          <div className="flex flex-col sm:flex-row gap-3 pt-6">
            <Button
              type="submit"
              disabled={isCalculating}
              className="flex-1 h-14 text-lg font-bold rounded-xl bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 transition-all active:scale-[0.98]"
            >
              {isCalculating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  {t.form.calculating}
                </>
              ) : (
                <>
                  <Calculator className={`w-5 h-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                  {t.form.calculate}
                </>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
              disabled={isCalculating}
               className="h-14 px-8 text-base font-semibold rounded-xl border-2 border-muted hover:bg-muted/50 hover:text-foreground transition-all"
            >
              <RotateCcw className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
              {t.form.reset}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ChildAssessmentForm;
