import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import {
  User,
  Baby,
  Calendar,
  Weight,
  Ruler,
  Stethoscope,
  ChevronRight,
  ChevronLeft,
  Send,
  Heart,
  Shield,
  X,
  CheckCircle
} from 'lucide-react';

interface ConsultationData {
  // Step 1: Patient Type
  consultationType: 'self' | 'child';

  // Step 2: Basic Info
  patientAge?: number;
  childAge?: number;
  childAgeUnit?: 'months' | 'years';
  childGender?: 'male' | 'female';
  weight?: number;
  height?: number;

  // Step 3: Medical History (Adults) / Child Info
  medicalHistory?: string;
  currentMedications?: string;
  allergies?: string;
  chronicConditions?: string[];
  previousSurgeries?: string;
  familyMedicalHistory?: string;

  // Child-specific
  appetite?: 'excellent' | 'good' | 'fair' | 'poor';
  activityLevel?: 'very_active' | 'active' | 'normal' | 'low' | 'very_low';
  sleepPattern?: 'excellent' | 'good' | 'fair' | 'poor';
  developmentConcerns?: string[];
  feedingHabits?: string;
  vaccinationStatus?: 'up_to_date' | 'delayed' | 'incomplete' | 'unknown';

  // Step 4: Symptoms
  symptoms: string[];
  symptomDuration?: string;
  symptomSeverity?: 'mild' | 'moderate' | 'severe';
  painLevel?: number;

  // Step 5: Main Question
  mainQuestion: string;
  urgencyLevel?: 'routine' | 'urgent' | 'emergency';
  recentChanges?: string;
  concernLevel?: 'low' | 'medium' | 'high';
  previousTreatments?: string;
}

interface MedicalConsultationWizardProps {
  onSubmit: (data: ConsultationData) => void;
  onCancel: () => void;
  loading?: boolean;
}

const MedicalConsultationWizard: React.FC<MedicalConsultationWizardProps> = ({
  onSubmit,
  onCancel,
  loading = false
}) => {
  const { i18n } = useTranslation();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ConsultationData>({
    consultationType: 'self',
    childAgeUnit: 'months',
    symptoms: [],
    mainQuestion: ''
  });

  const isRTL = i18n.language === 'ar';
  const totalSteps = 5;

  // Symptoms lists
  const adultSymptoms = [
    { id: 'fever', label: isRTL ? 'حمى/ارتفاع درجة الحرارة' : 'Fever' },
    { id: 'headache', label: isRTL ? 'صداع' : 'Headache' },
    { id: 'fatigue', label: isRTL ? 'إرهاق وتعب عام' : 'Fatigue' },
    { id: 'nausea', label: isRTL ? 'غثيان' : 'Nausea' },
    { id: 'vomiting', label: isRTL ? 'قيء' : 'Vomiting' },
    { id: 'diarrhea', label: isRTL ? 'إسهال' : 'Diarrhea' },
    { id: 'constipation', label: isRTL ? 'إمساك' : 'Constipation' },
    { id: 'abdominal_pain', label: isRTL ? 'ألم في البطن' : 'Abdominal Pain' },
    { id: 'chest_pain', label: isRTL ? 'ألم في الصدر' : 'Chest Pain' },
    { id: 'shortness_breath', label: isRTL ? 'ضيق في التنفس' : 'Shortness of Breath' },
    { id: 'cough', label: isRTL ? 'سعال' : 'Cough' },
    { id: 'sore_throat', label: isRTL ? 'التهاب الحلق' : 'Sore Throat' },
    { id: 'muscle_pain', label: isRTL ? 'ألم في العضلات' : 'Muscle Pain' },
    { id: 'joint_pain', label: isRTL ? 'ألم في المفاصل' : 'Joint Pain' },
    { id: 'skin_rash', label: isRTL ? 'طفح جلدي' : 'Skin Rash' },
    { id: 'dizziness', label: isRTL ? 'دوخة' : 'Dizziness' },
    { id: 'sleep_issues', label: isRTL ? 'مشاكل في النوم' : 'Sleep Issues' },
    { id: 'appetite_loss', label: isRTL ? 'فقدان الشهية' : 'Loss of Appetite' },
    { id: 'weight_change', label: isRTL ? 'تغير في الوزن' : 'Weight Change' }
  ];

  const childSymptoms = [
    { id: 'fever', label: isRTL ? 'حمى/ارتفاع درجة الحرارة' : 'Fever' },
    { id: 'crying', label: isRTL ? 'بكاء مستمر' : 'Excessive Crying' },
    { id: 'feeding_issues', label: isRTL ? 'مشاكل في الرضاعة/الأكل' : 'Feeding Problems' },
    { id: 'vomiting', label: isRTL ? 'قيء' : 'Vomiting' },
    { id: 'diarrhea', label: isRTL ? 'إسهال' : 'Diarrhea' },
    { id: 'constipation', label: isRTL ? 'إمساك' : 'Constipation' },
    { id: 'cough', label: isRTL ? 'سعال' : 'Cough' },
    { id: 'runny_nose', label: isRTL ? 'سيلان الأنف' : 'Runny Nose' },
    { id: 'skin_rash', label: isRTL ? 'طفح جلدي' : 'Skin Rash' },
    { id: 'sleep_issues', label: isRTL ? 'مشاكل في النوم' : 'Sleep Problems' },
    { id: 'irritability', label: isRTL ? 'عصبية وانفعال' : 'Irritability' },
    { id: 'lethargy', label: isRTL ? 'خمول وكسل' : 'Lethargy' },
    { id: 'growth_concerns', label: isRTL ? 'مخاوف النمو' : 'Growth Concerns' },
    { id: 'behavioral_changes', label: isRTL ? 'تغيرات سلوكية' : 'Behavioral Changes' },
    { id: 'developmental_delays', label: isRTL ? 'تأخر في التطور' : 'Developmental Delays' }
  ];

  const chronicConditions = [
    { id: 'diabetes', label: isRTL ? 'السكري' : 'Diabetes' },
    { id: 'hypertension', label: isRTL ? 'ضغط الدم المرتفع' : 'Hypertension' },
    { id: 'heart_disease', label: isRTL ? 'أمراض القلب' : 'Heart Disease' },
    { id: 'asthma', label: isRTL ? 'الربو' : 'Asthma' },
    { id: 'kidney_disease', label: isRTL ? 'أمراض الكلى' : 'Kidney Disease' },
    { id: 'liver_disease', label: isRTL ? 'أمراض الكبد' : 'Liver Disease' },
    { id: 'thyroid', label: isRTL ? 'أمراض الغدة الدرقية' : 'Thyroid Disease' },
    { id: 'arthritis', label: isRTL ? 'التهاب المفاصل' : 'Arthritis' }
  ];

  const developmentConcerns = [
    { id: 'speech_delay', label: isRTL ? 'تأخر في الكلام' : 'Speech Delay' },
    { id: 'motor_skills', label: isRTL ? 'مهارات حركية' : 'Motor Skills' },
    { id: 'social_skills', label: isRTL ? 'مهارات اجتماعية' : 'Social Skills' },
    { id: 'learning', label: isRTL ? 'صعوبات التعلم' : 'Learning Difficulties' },
    { id: 'attention', label: isRTL ? 'مشاكل الانتباه' : 'Attention Issues' }
  ];

  const updateFormData = (field: keyof ConsultationData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleSymptom = (symptomId: string) => {
    setFormData(prev => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptomId)
        ? prev.symptoms.filter(s => s !== symptomId)
        : [...prev.symptoms, symptomId]
    }));
  };

  const toggleChronicCondition = (conditionId: string) => {
    setFormData(prev => ({
      ...prev,
      chronicConditions: prev.chronicConditions?.includes(conditionId)
        ? prev.chronicConditions.filter(c => c !== conditionId)
        : [...(prev.chronicConditions || []), conditionId]
    }));
  };

  const toggleDevelopmentConcern = (concernId: string) => {
    setFormData(prev => ({
      ...prev,
      developmentConcerns: prev.developmentConcerns?.includes(concernId)
        ? prev.developmentConcerns.filter(c => c !== concernId)
        : [...(prev.developmentConcerns || []), concernId]
    }));
  };

  const canProceedToNext = () => {
    switch (currentStep) {
      case 1:
        return formData.consultationType;
      case 2:
        if (formData.consultationType === 'self') {
          return formData.patientAge && formData.weight && formData.height;
        } else {
          return formData.childAge && formData.childAgeUnit && formData.childGender && formData.weight && formData.height;
        }
      case 3:
        return true; // Medical history is optional
      case 4:
        return formData.symptoms.length > 0;
      case 5:
        return formData.mainQuestion.trim().length > 0;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (canProceedToNext() && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    if (canProceedToNext()) {
      console.log('Wizard submitting data:', formData);

      // Validate required fields before submitting
      if (!formData.mainQuestion.trim()) {
        console.error('Main question is empty');
        return;
      }

      if (formData.symptoms.length === 0) {
        console.error('No symptoms selected');
        return;
      }

      onSubmit(formData);
    } else {
      console.error('Cannot proceed - validation failed');
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h3 className="text-xl sm:text-2xl font-bold mb-3 text-foreground">
                {isRTL ? 'من هو المريض؟' : 'Who is the patient?'}
              </h3>
              <p className="text-base text-muted-foreground">
                {isRTL ? 'اختر نوع الاستشارة المطلوبة' : 'Select the type of consultation needed'}
              </p>
            </div>

            <RadioGroup
              value={formData.consultationType}
              onValueChange={(value) => updateFormData('consultationType', value as 'self' | 'child')}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              dir={isRTL ? 'rtl' : 'ltr'}
            >
              <div
                onClick={() => updateFormData('consultationType', 'self')}
                className={`relative flex items-center space-x-4 rtl:space-x-reverse p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 ${formData.consultationType === 'self'
                    ? 'border-primary bg-primary/5 shadow-md shadow-primary/10'
                    : 'border-border/60 hover:border-primary/50 hover:bg-muted/30'
                  }`}
              >
                <RadioGroupItem value="self" id="self" className="sr-only" />
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${formData.consultationType === 'self' ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
                  }`}>
                  <User className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <div className="font-bold text-lg text-foreground mb-1">{isRTL ? 'لنفسي' : 'For Myself'}</div>
                  <div className="text-sm text-muted-foreground">
                    {isRTL ? 'توجيه غذائي شخصي' : 'Personal nutritional guidance'}
                  </div>
                </div>
                {formData.consultationType === 'self' && (
                  <div className="absolute top-4 right-4 rtl:right-auto rtl:left-4 text-primary">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                )}
              </div>

              <div
                onClick={() => updateFormData('consultationType', 'child')}
                className={`relative flex items-center space-x-4 rtl:space-x-reverse p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 ${formData.consultationType === 'child'
                    ? 'border-primary bg-primary/5 shadow-md shadow-primary/10'
                    : 'border-border/60 hover:border-primary/50 hover:bg-muted/30'
                  }`}
              >
                <RadioGroupItem value="child" id="child" className="sr-only" />
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${formData.consultationType === 'child' ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
                  }`}>
                  <Baby className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <div className="font-bold text-lg text-foreground mb-1">{isRTL ? 'لطفلي' : 'For My Child'}</div>
                  <div className="text-sm text-muted-foreground">
                    {isRTL ? 'توجيه غذائي للأطفال' : 'Pediatric nutritional guidance'}
                  </div>
                </div>
                {formData.consultationType === 'child' && (
                  <div className="absolute top-4 right-4 rtl:right-auto rtl:left-4 text-primary">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                )}
              </div>
            </RadioGroup>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            <div className="text-center mb-6">
              <h3 className="text-xl sm:text-2xl font-bold mb-3">
                {isRTL ? 'المعلومات الأساسية' : 'Basic Information'}
              </h3>
              <p className="text-base text-muted-foreground">
                {isRTL ? 'أدخل المعلومات الأساسية للمريض' : 'Enter basic patient information'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="age" className="flex items-center gap-2 text-base font-bold text-foreground">
                  <Calendar className="h-4 w-4 text-primary" />
                  {formData.consultationType === 'self'
                    ? (isRTL ? 'العمر (سنة)' : 'Age (years)')
                    : (isRTL ? 'عمر الطفل' : 'Child Age')
                  }
                </Label>
                {formData.consultationType === 'self' ? (
                  <Input
                    id="age"
                    type="number"
                    min="0"
                    max="120"
                    value={formData.patientAge || ''}
                    onChange={(e) => updateFormData('patientAge', parseInt(e.target.value) || undefined)}
                    placeholder={isRTL ? 'أدخل العمر' : 'Enter age'}
                    className="h-14 text-base bg-muted/40 border-2 border-border/60 focus:border-primary focus:ring-primary/20 transition-all rounded-xl"
                  />
                ) : (
                  <div className="flex gap-3">
                    <Input
                      id="age"
                      type="number"
                      min="0"
                      max={formData.childAgeUnit === 'months' ? "240" : "18"}
                      value={formData.childAge || ''}
                      onChange={(e) => updateFormData('childAge', parseInt(e.target.value) || undefined)}
                      placeholder={isRTL ? 'أدخل العمر' : 'Enter age'}
                      className="flex-1 h-14 text-base bg-muted/40 border-2 border-border/60 focus:border-primary focus:ring-primary/20 transition-all rounded-xl"
                    />
                    <Select
                      value={formData.childAgeUnit}
                      onValueChange={(value) => {
                        updateFormData('childAgeUnit', value as 'months' | 'years');
                        updateFormData('childAge', undefined);
                      }}
                    >
                      <SelectTrigger className="w-32 h-14 bg-muted/40 border-2 border-border/60 rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="months">{isRTL ? 'شهر' : 'Months'}</SelectItem>
                        <SelectItem value="years">{isRTL ? 'سنة' : 'Years'}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
                {formData.consultationType === 'child' && (
                  <p className="text-xs text-muted-foreground font-medium px-1">
                    {isRTL
                      ? 'للأطفال أقل من سنتين، يُفضل استخدام الشهور'
                      : 'For children under 2 years, use months'
                    }
                  </p>
                )}
              </div>

              {formData.consultationType === 'child' && (
                <div className="space-y-3">
                  <Label className="text-base font-bold text-foreground">{isRTL ? 'جنس الطفل' : 'Child Gender'}</Label>
                  <Select
                    value={formData.childGender}
                    onValueChange={(value) => updateFormData('childGender', value as 'male' | 'female')}
                  >
                    <SelectTrigger className="h-14 bg-muted/40 border-2 border-border/60 rounded-xl">
                      <SelectValue placeholder={isRTL ? 'اختر الجنس' : 'Select gender'} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">{isRTL ? 'ذكر' : 'Male'}</SelectItem>
                      <SelectItem value="female">{isRTL ? 'أنثى' : 'Female'}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="space-y-3">
                <Label htmlFor="weight" className="flex items-center gap-2 text-base font-bold text-foreground">
                  <Weight className="h-4 w-4 text-primary" />
                  {isRTL ? 'الوزن (كيلوجرام)' : 'Weight (kg)'}
                </Label>
                <Input
                  id="weight"
                  type="number"
                  min="0"
                  step="0.1"
                  value={formData.weight || ''}
                  onChange={(e) => updateFormData('weight', parseFloat(e.target.value) || undefined)}
                  placeholder={isRTL ? 'أدخل الوزن' : 'Enter weight'}
                  className="h-14 text-base bg-muted/40 border-2 border-border/60 focus:border-primary focus:ring-primary/20 transition-all rounded-xl"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="height" className="flex items-center gap-2 text-base font-bold text-foreground">
                  <Ruler className="h-4 w-4 text-primary" />
                  {isRTL ? 'الطول (سنتيمتر)' : 'Height (cm)'}
                </Label>
                <Input
                  id="height"
                  type="number"
                  min="0"
                  value={formData.height || ''}
                  onChange={(e) => updateFormData('height', parseFloat(e.target.value) || undefined)}
                  placeholder={isRTL ? 'أدخل الطول' : 'Enter height'}
                  className="h-14 text-base bg-muted/40 border-2 border-border/60 focus:border-primary focus:ring-primary/20 transition-all rounded-xl"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">
                {formData.consultationType === 'self'
                  ? (isRTL ? 'التاريخ الطبي' : 'Medical History')
                  : (isRTL ? 'معلومات الطفل' : 'Child Information')
                }
              </h3>
              <p className="text-sm text-muted-foreground">
                {formData.consultationType === 'self'
                  ? (isRTL ? 'أدخل تاريخك الطبي والأدوية الحالية' : 'Enter your medical history and current medications')
                  : (isRTL ? 'أدخل معلومات عن صحة وتطور الطفل' : 'Enter information about child health and development')
                }
              </p>
            </div>

            {formData.consultationType === 'self' ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="medicalHistory" className="flex items-center gap-2">
                    <Heart className="h-4 w-4" />
                    {isRTL ? 'التاريخ الطبي السابق' : 'Previous Medical History'}
                  </Label>
                  <Textarea
                    id="medicalHistory"
                    value={formData.medicalHistory || ''}
                    onChange={(e) => updateFormData('medicalHistory', e.target.value)}
                    placeholder={isRTL ? 'أي أمراض أو عمليات سابقة...' : 'Any previous illnesses or surgeries...'}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currentMedications" className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    {isRTL ? 'الأدوية الحالية' : 'Current Medications'}
                  </Label>
                  <Textarea
                    id="currentMedications"
                    value={formData.currentMedications || ''}
                    onChange={(e) => updateFormData('currentMedications', e.target.value)}
                    placeholder={isRTL ? 'أي أدوية تتناولها حالياً...' : 'Any medications you are currently taking...'}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="allergies">
                    {isRTL ? 'الحساسية' : 'Allergies'}
                  </Label>
                  <Textarea
                    id="allergies"
                    value={formData.allergies || ''}
                    onChange={(e) => updateFormData('allergies', e.target.value)}
                    placeholder={isRTL ? 'أي حساسية من أدوية أو أطعمة...' : 'Any allergies to medications or foods...'}
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label>{isRTL ? 'الأمراض المزمنة' : 'Chronic Conditions'}</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {chronicConditions.map((condition) => (
                      <div key={condition.id} className="flex items-center space-x-2 rtl:space-x-reverse">
                        <Checkbox
                          id={condition.id}
                          checked={formData.chronicConditions?.includes(condition.id) || false}
                          onCheckedChange={() => toggleChronicCondition(condition.id)}
                        />
                        <Label htmlFor={condition.id} className="text-sm">
                          {condition.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>{isRTL ? 'الشهية' : 'Appetite'}</Label>
                    <Select
                      value={formData.appetite}
                      onValueChange={(value) => updateFormData('appetite', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={isRTL ? 'اختر مستوى الشهية' : 'Select appetite level'} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="excellent">{isRTL ? 'ممتازة' : 'Excellent'}</SelectItem>
                        <SelectItem value="good">{isRTL ? 'جيدة' : 'Good'}</SelectItem>
                        <SelectItem value="fair">{isRTL ? 'متوسطة' : 'Fair'}</SelectItem>
                        <SelectItem value="poor">{isRTL ? 'ضعيفة' : 'Poor'}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>{isRTL ? 'مستوى النشاط' : 'Activity Level'}</Label>
                    <Select
                      value={formData.activityLevel}
                      onValueChange={(value) => updateFormData('activityLevel', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={isRTL ? 'اختر مستوى النشاط' : 'Select activity level'} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="very_active">{isRTL ? 'نشيط جداً' : 'Very Active'}</SelectItem>
                        <SelectItem value="active">{isRTL ? 'نشيط' : 'Active'}</SelectItem>
                        <SelectItem value="normal">{isRTL ? 'طبيعي' : 'Normal'}</SelectItem>
                        <SelectItem value="low">{isRTL ? 'قليل النشاط' : 'Low Activity'}</SelectItem>
                        <SelectItem value="very_low">{isRTL ? 'خامل جداً' : 'Very Low Activity'}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>{isRTL ? 'نمط النوم' : 'Sleep Pattern'}</Label>
                    <Select
                      value={formData.sleepPattern}
                      onValueChange={(value) => updateFormData('sleepPattern', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={isRTL ? 'اختر نمط النوم' : 'Select sleep pattern'} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="excellent">{isRTL ? 'ممتاز' : 'Excellent'}</SelectItem>
                        <SelectItem value="good">{isRTL ? 'جيد' : 'Good'}</SelectItem>
                        <SelectItem value="fair">{isRTL ? 'متوسط' : 'Fair'}</SelectItem>
                        <SelectItem value="poor">{isRTL ? 'سيء' : 'Poor'}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>{isRTL ? 'حالة التطعيمات' : 'Vaccination Status'}</Label>
                    <Select
                      value={formData.vaccinationStatus}
                      onValueChange={(value) => updateFormData('vaccinationStatus', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={isRTL ? 'اختر حالة التطعيمات' : 'Select vaccination status'} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="up_to_date">{isRTL ? 'محدثة' : 'Up to Date'}</SelectItem>
                        <SelectItem value="delayed">{isRTL ? 'متأخرة' : 'Delayed'}</SelectItem>
                        <SelectItem value="incomplete">{isRTL ? 'غير مكتملة' : 'Incomplete'}</SelectItem>
                        <SelectItem value="unknown">{isRTL ? 'غير معروفة' : 'Unknown'}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="feedingHabits">
                    {isRTL ? 'عادات التغذية' : 'Feeding Habits'}
                  </Label>
                  <Textarea
                    id="feedingHabits"
                    value={formData.feedingHabits || ''}
                    onChange={(e) => updateFormData('feedingHabits', e.target.value)}
                    placeholder={isRTL ? 'وصف عادات التغذية والأطعمة المفضلة...' : 'Describe feeding habits and preferred foods...'}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label>{isRTL ? 'مخاوف التطور' : 'Development Concerns'}</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {developmentConcerns.map((concern) => (
                      <div key={concern.id} className="flex items-center space-x-2 rtl:space-x-reverse">
                        <Checkbox
                          id={concern.id}
                          checked={formData.developmentConcerns?.includes(concern.id) || false}
                          onCheckedChange={() => toggleDevelopmentConcern(concern.id)}
                        />
                        <Label htmlFor={concern.id} className="text-sm">
                          {concern.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">
                {isRTL ? 'الأعراض الحالية' : 'Current Symptoms'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {isRTL ? 'اختر الأعراض التي تعاني منها حالياً' : 'Select the symptoms you are currently experiencing'}
              </p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {(formData.consultationType === 'self' ? adultSymptoms : childSymptoms).map((symptom) => (
                  <div key={symptom.id} className="flex items-center space-x-2 rtl:space-x-reverse p-2 border rounded hover:bg-slate-50 dark:hover:bg-slate-900/20 transition-colors border-slate-200 dark:border-slate-800">
                    <Checkbox
                      id={symptom.id}
                      checked={formData.symptoms.includes(symptom.id)}
                      onCheckedChange={() => toggleSymptom(symptom.id)}
                    />
                    <Label htmlFor={symptom.id} className="text-sm cursor-pointer text-slate-900 dark:text-slate-100 flex-1">
                      {symptom.label}
                    </Label>
                  </div>
                ))}
              </div>

              {formData.symptoms.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-slate-50 dark:bg-slate-900/20 rounded-lg border border-slate-200 dark:border-slate-800">
                  <div className="space-y-2">
                    <Label className="text-slate-700 dark:text-slate-300">{isRTL ? 'مدة الأعراض' : 'Symptom Duration'}</Label>
                    <Select
                      value={formData.symptomDuration}
                      onValueChange={(value) => updateFormData('symptomDuration', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={isRTL ? 'اختر المدة' : 'Select duration'} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="less_than_day">{isRTL ? 'أقل من يوم' : 'Less than a day'}</SelectItem>
                        <SelectItem value="1_3_days">{isRTL ? '1-3 أيام' : '1-3 days'}</SelectItem>
                        <SelectItem value="4_7_days">{isRTL ? '4-7 أيام' : '4-7 days'}</SelectItem>
                        <SelectItem value="1_2_weeks">{isRTL ? '1-2 أسبوع' : '1-2 weeks'}</SelectItem>
                        <SelectItem value="more_than_2_weeks">{isRTL ? 'أكثر من أسبوعين' : 'More than 2 weeks'}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-slate-700 dark:text-slate-300">{isRTL ? 'شدة الأعراض' : 'Symptom Severity'}</Label>
                    <Select
                      value={formData.symptomSeverity}
                      onValueChange={(value) => updateFormData('symptomSeverity', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={isRTL ? 'اختر الشدة' : 'Select severity'} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mild">{isRTL ? 'خفيفة' : 'Mild'}</SelectItem>
                        <SelectItem value="moderate">{isRTL ? 'متوسطة' : 'Moderate'}</SelectItem>
                        <SelectItem value="severe">{isRTL ? 'شديدة' : 'Severe'}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="painLevel" className="text-slate-700 dark:text-slate-300">
                      {isRTL ? `مستوى الألم (${formData.painLevel || 0}/10)` : `Pain Level (${formData.painLevel || 0}/10)`}
                    </Label>
                    <Input
                      id="painLevel"
                      type="range"
                      min="0"
                      max="10"
                      value={formData.painLevel || 0}
                      onChange={(e) => updateFormData('painLevel', parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">
                {isRTL ? 'سؤالك الطبي' : 'Your Medical Question'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {isRTL ? 'اكتب سؤالك أو استفسارك الطبي بالتفصيل' : 'Write your medical question or inquiry in detail'}
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="mainQuestion" className="flex items-center gap-2">
                  <Stethoscope className="h-4 w-4" />
                  {isRTL ? 'السؤال الرئيسي' : 'Main Question'} *
                </Label>
                <Textarea
                  id="mainQuestion"
                  value={formData.mainQuestion}
                  onChange={(e) => updateFormData('mainQuestion', e.target.value)}
                  placeholder={isRTL ? 'اكتب سؤالك الطبي بالتفصيل...' : 'Write your medical question in detail...'}
                  rows={5}
                  className="min-h-[120px]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{isRTL ? 'مستوى الإلحاح' : 'Urgency Level'}</Label>
                  <Select
                    value={formData.urgencyLevel}
                    onValueChange={(value) => updateFormData('urgencyLevel', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={isRTL ? 'اختر مستوى الإلحاح' : 'Select urgency level'} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="routine">{isRTL ? 'عادي' : 'Routine'}</SelectItem>
                      <SelectItem value="urgent">{isRTL ? 'عاجل' : 'Urgent'}</SelectItem>
                      <SelectItem value="emergency">{isRTL ? 'طارئ' : 'Emergency'}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>{isRTL ? 'مستوى القلق' : 'Concern Level'}</Label>
                  <Select
                    value={formData.concernLevel}
                    onValueChange={(value) => updateFormData('concernLevel', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={isRTL ? 'اختر مستوى القلق' : 'Select concern level'} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">{isRTL ? 'منخفض' : 'Low'}</SelectItem>
                      <SelectItem value="medium">{isRTL ? 'متوسط' : 'Medium'}</SelectItem>
                      <SelectItem value="high">{isRTL ? 'عالي' : 'High'}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="recentChanges">
                  {isRTL ? 'تغيرات حديثة' : 'Recent Changes'}
                </Label>
                <Textarea
                  id="recentChanges"
                  value={formData.recentChanges || ''}
                  onChange={(e) => updateFormData('recentChanges', e.target.value)}
                  placeholder={isRTL ? 'أي تغيرات حديثة في الحالة أو الأعراض...' : 'Any recent changes in condition or symptoms...'}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="previousTreatments">
                  {isRTL ? 'العلاجات السابقة' : 'Previous Treatments'}
                </Label>
                <Textarea
                  id="previousTreatments"
                  value={formData.previousTreatments || ''}
                  onChange={(e) => updateFormData('previousTreatments', e.target.value)}
                  placeholder={isRTL ? 'أي علاجات أو أدوية جربتها لهذه المشكلة...' : 'Any treatments or medications tried for this issue...'}
                  rows={3}
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Stethoscope className="h-5 w-5" />
              {isRTL ? 'توجيه غذائي جديد' : 'New Nutritional Guidance'}
            </CardTitle>
            <CardDescription>
              {isRTL ? 'خطوة' : 'Step'} {currentStep} {isRTL ? 'من' : 'of'} {totalSteps}
            </CardDescription>
          </div>
          <Button variant="ghost" onClick={onCancel}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <Progress value={(currentStep / totalSteps) * 100} className="w-full" />
      </CardHeader>

      <CardContent className="space-y-6">
        {renderStep()}

        <div className="flex justify-between pt-6">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            {isRTL ? 'السابق' : 'Previous'}
          </Button>

          {currentStep < totalSteps ? (
            <Button
              onClick={handleNext}
              disabled={!canProceedToNext()}
              className="flex items-center gap-2"
            >
              {isRTL ? 'التالي' : 'Next'}
              <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!canProceedToNext() || loading}
              className="flex items-center gap-2"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <Send className="h-4 w-4" />
              )}
              {isRTL ? 'إرسال الاستشارة' : 'Send Consultation'}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MedicalConsultationWizard;