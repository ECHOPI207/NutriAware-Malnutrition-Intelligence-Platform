import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/features/auth/firebase-auth-context';
import { collection, addDoc, query, where, getDocs, serverTimestamp, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  MessageCircle,
  Send,
  Clock,
  CheckCircle,
  User,
  Baby,
  Calendar,
  Activity,
  Stethoscope,
  Plus,
  History,
  AlertCircle,
  Eye,
  MessageSquare,
  Lock,
  ChevronRight
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import MedicalConsultationWizard from '@/components/medical/MedicalConsultationWizard';
import { motion } from 'framer-motion';

interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderType: 'patient' | 'doctor' | 'admin';
  message: string;
  timestamp: any;
}

interface MedicalConsultation {
  id: string;
  patientId: string;
  patientName: string;
  patientEmail: string;
  consultationType: 'self' | 'child';
  patientAge?: number;
  childAge?: number;
  childAgeUnit?: 'months' | 'years';
  childGender?: 'male' | 'female';
  weight?: number;
  height?: number;
  symptoms: string[];
  medicalHistory?: string;
  currentMedications?: string;
  allergies?: string;
  chronicConditions?: string[];
  appetite?: 'excellent' | 'good' | 'fair' | 'poor';
  activityLevel?: 'very_active' | 'active' | 'normal' | 'low' | 'very_low';
  sleepPattern?: 'excellent' | 'good' | 'fair' | 'poor';
  developmentConcerns?: string[];
  feedingHabits?: string;
  vaccinationStatus?: 'up_to_date' | 'delayed' | 'incomplete' | 'unknown';
  symptomDuration?: string;
  symptomSeverity?: 'mild' | 'moderate' | 'severe';
  painLevel?: number;
  mainQuestion: string;
  urgencyLevel?: 'routine' | 'urgent' | 'emergency';
  recentChanges?: string;
  concernLevel?: 'low' | 'medium' | 'high';
  previousTreatments?: string;
  status: 'pending' | 'in_progress' | 'replied' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdAt: any;
  doctorReply?: string;
  doctorId?: string;
  doctorName?: string;
  repliedAt?: any;
  estimatedReplyTime: string;
  chatMessages?: ChatMessage[];
  lastMessageAt?: any;
  isLocked?: boolean;
  lockedBy?: string;
  lockedAt?: any;
}

const NewMedicalConsultation: React.FC = () => {
  const { i18n } = useTranslation();
  const { user, userProfile } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'new' | 'history'>('new');
  const [showWizard, setShowWizard] = useState(false);
  const [consultations, setConsultations] = useState<MedicalConsultation[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedConsultation, setSelectedConsultation] = useState<MedicalConsultation | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [sendingMessage, setSendingMessage] = useState(false);

  const isRTL = i18n.language === 'ar';

  // Symptom labels for display
  const symptomLabels: Record<string, { ar: string; en: string }> = {
    fever: { ar: 'حمى/ارتفاع درجة الحرارة', en: 'Fever' },
    headache: { ar: 'صداع', en: 'Headache' },
    fatigue: { ar: 'إرهاق وتعب عام', en: 'Fatigue' },
    nausea: { ar: 'غثيان', en: 'Nausea' },
    vomiting: { ar: 'قيء', en: 'Vomiting' },
    diarrhea: { ar: 'إسهال', en: 'Diarrhea' },
    constipation: { ar: 'إمساك', en: 'Constipation' },
    abdominal_pain: { ar: 'ألم في البطن', en: 'Abdominal Pain' },
    chest_pain: { ar: 'ألم في الصدر', en: 'Chest Pain' },
    shortness_breath: { ar: 'ضيق في التنفس', en: 'Shortness of Breath' },
    cough: { ar: 'سعال', en: 'Cough' },
    sore_throat: { ar: 'التهاب الحلق', en: 'Sore Throat' },
    muscle_pain: { ar: 'ألم في العضلات', en: 'Muscle Pain' },
    joint_pain: { ar: 'ألم في المفاصل', en: 'Joint Pain' },
    skin_rash: { ar: 'طفح جلدي', en: 'Skin Rash' },
    dizziness: { ar: 'دوخة', en: 'Dizziness' },
    sleep_issues: { ar: 'مشاكل في النوم', en: 'Sleep Issues' },
    appetite_loss: { ar: 'فقدان الشهية', en: 'Loss of Appetite' },
    weight_change: { ar: 'تغير في الوزن', en: 'Weight Change' },
    crying: { ar: 'بكاء مستمر', en: 'Excessive Crying' },
    feeding_issues: { ar: 'مشاكل في الرضاعة/الأكل', en: 'Feeding Problems' },
    runny_nose: { ar: 'سيلان الأنف', en: 'Runny Nose' },
    irritability: { ar: 'عصبية وانفعال', en: 'Irritability' },
    lethargy: { ar: 'خمول وكسل', en: 'Lethargy' },
    growth_concerns: { ar: 'مخاوف النمو', en: 'Growth Concerns' },
    behavioral_changes: { ar: 'تغيرات سلوكية', en: 'Behavioral Changes' },
    developmental_delays: { ar: 'تأخر في التطور', en: 'Developmental Delays' }
  };

  useEffect(() => {
    if (user) {
      // console.log('User authenticated:', user.uid, user.email);
      fetchConsultations();
    } else {
      // console.log('No user authenticated');
    }
  }, [user]);

  const fetchConsultations = async () => {
    if (!user) return;

    try {
      setLoading(true);
      // console.log('Fetching consultations for user:', user.uid);

      const consultationsQuery = query(
        collection(db, 'medicalConsultations'),
        where('patientId', '==', user.uid)
      );

      const querySnapshot = await getDocs(consultationsQuery);
      const fetchedConsultations: MedicalConsultation[] = [];

      // console.log('Found consultations:', querySnapshot.size);

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        fetchedConsultations.push({
          id: doc.id,
          ...data
        } as MedicalConsultation);
      });

      // Sort by creation date in JavaScript instead of Firestore
      fetchedConsultations.sort((a, b) => {
        const dateA = a.createdAt?.toDate?.() || new Date(0);
        const dateB = b.createdAt?.toDate?.() || new Date(0);
        return dateB.getTime() - dateA.getTime();
      });

      setConsultations(fetchedConsultations);
      // console.log('Consultations loaded successfully:', fetchedConsultations.length);
    } catch (error) {
      console.error('Error fetching consultations:', error);

      // More specific error handling
      let errorMessage = isRTL ? "حدث خطأ في تحميل الاستشارات" : "Error loading consultations";

      if (error instanceof Error) {
        if (error.message.includes('permission-denied')) {
          errorMessage = isRTL ? "ليس لديك صلاحية للوصول لهذه البيانات" : "Permission denied to access consultations";
        } else if (error.message.includes('unavailable')) {
          errorMessage = isRTL ? "الخدمة غير متاحة حالياً، يرجى المحاولة لاحقاً" : "Service unavailable, please try again later";
        }
      }

      toast({
        variant: "destructive",
        title: isRTL ? "خطأ" : "Error",
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleWizardSubmit = async (data: any) => {
    if (!user) {
      toast({
        variant: "destructive",
        title: isRTL ? "خطأ" : "Error",
        description: isRTL ? "يجب تسجيل الدخول أولاً" : "Please login first",
      });
      return;
    }

    try {
      setLoading(true);
      // console.log('Starting consultation submission for user:', user.uid);
      // console.log('Consultation data:', data);

      // Validate required fields
      if (!data.mainQuestion || !data.mainQuestion.trim()) {
        throw new Error('Main question is required');
      }

      if (!data.symptoms || data.symptoms.length === 0) {
        throw new Error('At least one symptom is required');
      }

      // Calculate priority based on urgency and symptoms
      let priority: 'low' | 'medium' | 'high' | 'urgent' = 'medium';
      if (data.urgencyLevel === 'emergency') {
        priority = 'urgent';
      } else if (data.urgencyLevel === 'urgent' || data.concernLevel === 'high') {
        priority = 'high';
      } else if (data.concernLevel === 'low') {
        priority = 'low';
      }

      // Estimate reply time based on priority
      let estimatedReplyTime = isRTL ? 'خلال ساعتين' : 'Within 2 hours';
      if (priority === 'urgent') {
        estimatedReplyTime = isRTL ? 'خلال ساعة واحدة' : 'Within 1 hour';
      } else if (priority === 'high') {
        estimatedReplyTime = isRTL ? 'خلال ساعة ونصف' : 'Within 1.5 hours';
      } else if (priority === 'low') {
        estimatedReplyTime = isRTL ? 'خلال 3-4 ساعات' : 'Within 3-4 hours';
      }

      const consultationData = {
        patientId: user.uid,
        patientName: userProfile?.displayName || user.displayName || user.email?.split('@')[0] || 'مريض مجهول',
        patientEmail: user.email || '',
        consultationType: data.consultationType,
        ...(data.consultationType === 'self' ? {
          patientAge: data.patientAge || null
        } : {
          childAge: data.childAge || null,
          childAgeUnit: data.childAgeUnit || 'years',
          childGender: data.childGender || null
        }),
        weight: data.weight || null,
        height: data.height || null,
        symptoms: data.symptoms || [],
        medicalHistory: data.medicalHistory || null,
        currentMedications: data.currentMedications || null,
        allergies: data.allergies || null,
        chronicConditions: data.chronicConditions || [],
        appetite: data.appetite || null,
        activityLevel: data.activityLevel || null,
        sleepPattern: data.sleepPattern || null,
        developmentConcerns: data.developmentConcerns || [],
        feedingHabits: data.feedingHabits || null,
        vaccinationStatus: data.vaccinationStatus || null,
        symptomDuration: data.symptomDuration || null,
        symptomSeverity: data.symptomSeverity || null,
        painLevel: data.painLevel || 0,
        mainQuestion: data.mainQuestion.trim(),
        urgencyLevel: data.urgencyLevel || 'routine',
        recentChanges: data.recentChanges || null,
        concernLevel: data.concernLevel || 'medium',
        previousTreatments: data.previousTreatments || null,
        status: 'pending',
        priority,
        estimatedReplyTime,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        chatMessages: []
      };

      // console.log('Prepared consultation data:', consultationData);

      // Test connection before attempting to create
      try {
        await addDoc(collection(db, 'medicalConsultations'), consultationData);
        // console.log('Consultation created with ID:', docRef.id);
      } catch (firestoreError) {
        console.error('Firestore error:', firestoreError);
        throw firestoreError;
      }

      toast({
        title: isRTL ? "تم الإرسال بنجاح!" : "Sent Successfully!",
        description: isRTL ? `سيتم الرد على استشارتك ${estimatedReplyTime}` : `Your consultation will be answered ${estimatedReplyTime}`,
      });

      setShowWizard(false);
      setActiveTab('history');
      fetchConsultations();
    } catch (error) {
      console.error('Error creating consultation:', error);

      let errorMessage = isRTL ? "حدث خطأ في إرسال الاستشارة" : "Error sending consultation";

      if (error instanceof Error) {
        console.error('Error details:', error.message);

        if (error.message.includes('permission-denied')) {
          errorMessage = isRTL ? "ليس لديك صلاحية لإنشاء استشارة" : "Permission denied to create consultation";
        } else if (error.message.includes('unavailable')) {
          errorMessage = isRTL ? "الخدمة غير متاحة حالياً، يرجى المحاولة لاحقاً" : "Service unavailable, please try again later";
        } else if (error.message.includes('required')) {
          errorMessage = isRTL ? "يرجى ملء جميع الحقول المطلوبة" : "Please fill all required fields";
        } else if (error.message.includes('network')) {
          errorMessage = isRTL ? "مشكلة في الاتصال، يرجى التحقق من الإنترنت" : "Network error, please check your connection";
        }
      }

      toast({
        variant: "destructive",
        title: isRTL ? "خطأ" : "Error",
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  const sendFollowUpMessage = async (consultationId: string) => {
    if (!newMessage.trim() || !user) return;

    try {
      setSendingMessage(true);
      const consultation = consultations.find(c => c.id === consultationId);
      if (!consultation) return;

      // Check if consultation is locked
      if (consultation.isLocked) {
        toast({
          variant: "destructive",
          title: isRTL ? "الاستشارة مقفلة" : "Consultation Locked",
          description: isRTL ? "لا يمكن إرسال رسائل جديدة، الاستشارة مقفلة من قبل الطبيب" : "Cannot send new messages, consultation is locked by doctor",
        });
        return;
      }

      const newChatMessage: ChatMessage = {
        id: Date.now().toString(),
        senderId: user.uid,
        senderName: userProfile?.displayName || user.displayName || 'المريض',
        senderType: 'patient',
        message: newMessage.trim(),
        timestamp: new Date()
      };

      const updatedChatMessages = [...(consultation.chatMessages || []), newChatMessage];
      const consultationRef = doc(db, 'medicalConsultations', consultationId);

      await updateDoc(consultationRef, {
        chatMessages: updatedChatMessages,
        lastMessageAt: serverTimestamp(),
        status: consultation.status === 'closed' ? 'replied' : consultation.status,
        updatedAt: serverTimestamp()
      });

      // Update local state
      setConsultations(prev =>
        prev.map(c =>
          c.id === consultationId
            ? { ...c, chatMessages: updatedChatMessages, lastMessageAt: new Date() }
            : c
        )
      );

      setNewMessage('');
      toast({
        title: isRTL ? "تم الإرسال" : "Message Sent",
        description: isRTL ? "تم إرسال رسالتك للطبيب" : "Your message has been sent to the doctor",
      });
    } catch (error) {
      console.error('Error sending message:', error);

      let errorMessage = isRTL ? "حدث خطأ في إرسال الرسالة" : "Error sending message";

      if (error instanceof Error && error.message.includes('permission-denied')) {
        errorMessage = isRTL ? "ليس لديك صلاحية لإرسال رسائل لهذه الاستشارة" : "Permission denied to send messages to this consultation";
      }

      toast({
        variant: "destructive",
        title: isRTL ? "خطأ" : "Error",
        description: errorMessage,
      });
    } finally {
      setSendingMessage(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: {
        label: isRTL ? 'في الانتظار' : 'Pending',
        className: 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800',
        icon: Clock
      },
      in_progress: {
        label: isRTL ? 'قيد المراجعة' : 'In Progress',
        className: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800',
        icon: Activity
      },
      replied: {
        label: isRTL ? 'تم الرد' : 'Replied',
        className: 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-300 dark:border-emerald-800',
        icon: CheckCircle
      },
      closed: {
        label: isRTL ? 'مغلقة' : 'Closed',
        className: 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-300 dark:border-gray-800',
        icon: CheckCircle
      }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${config.className}`}>
        <Icon className="h-3 w-3" />
        {config.label}
      </span>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      low: {
        label: isRTL ? 'منخفضة' : 'Low',
        className: 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-900/20 dark:text-gray-300 dark:border-gray-800'
      },
      medium: {
        label: isRTL ? 'متوسطة' : 'Medium',
        className: 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800'
      },
      high: {
        label: isRTL ? 'عالية' : 'High',
        className: 'bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800'
      },
      urgent: {
        label: isRTL ? 'عاجلة' : 'Urgent',
        className: 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800'
      }
    };

    const config = priorityConfig[priority as keyof typeof priorityConfig] || priorityConfig.medium;

    return (
      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${config.className}`}>
        {config.label}
      </span>
    );
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString(isRTL ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getSymptomLabel = (symptomId: string) => {
    return symptomLabels[symptomId]?.[isRTL ? 'ar' : 'en'] || symptomId;
  };

  // Check if user is authenticated
  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="text-center py-8">
            <AlertCircle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              {isRTL ? 'يرجى تسجيل الدخول' : 'Please Login'}
            </h3>
            <p className="text-muted-foreground mb-4">
              {isRTL ? 'يجب تسجيل الدخول للوصول للتوجيهات الغذائية' : 'You need to login to access nutritional guidance'}
            </p>
            <Button onClick={() => window.location.href = '/auth/login'}>
              {isRTL ? 'تسجيل الدخول' : 'Login'}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showWizard) {
    return (
      <div className="container mx-auto px-4 py-8" dir={isRTL ? 'rtl' : 'ltr'}>
        <MedicalConsultationWizard
          onSubmit={handleWizardSubmit}
          onCancel={() => setShowWizard(false)}
          loading={loading}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-6xl mx-auto">

        {/* Header Section */}
        <div className="mb-10 text-center sm:text-start relative">
          <Button
            variant="ghost"
            size="sm"
            className="absolute -top-12 left-0 rtl:right-auto rtl:left-0 ltr:left-0 ltr:right-auto sm:static sm:mb-4 gap-2 text-muted-foreground hover:text-primary"
            onClick={() => window.location.href = '/contact'}
          >
            <ChevronRight className={`h-4 w-4 ${isRTL ? 'rotate-180' : ''}`} />
            {isRTL ? 'العودة لصفحة اتصل بنا' : 'Back to Contact Us'}
          </Button>

          <div className="flex w-fit mx-auto sm:mx-0 items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium border border-primary/20 mb-4">
            <Stethoscope className="h-4 w-4" />
            {isRTL ? 'العيادة الإلكترونية' : 'E-Clinic'}
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-blue-600 to-secondary bg-clip-text text-transparent inline-block">
            {isRTL ? 'التوجيهات الغذائية' : 'Nutritional Guidance'}
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed mx-auto sm:mx-0">
            {isRTL ? 'احصل على توجيه غذائي متخصص من فريقنا المعتمد بأسرع وقت' : 'Get specialized nutritional guidance from our certified team quickly and efficiently'}
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'new' | 'history')}>
          <TabsList className="grid w-full grid-cols-2 max-w-md mb-8 h-14 bg-muted/50 p-1 rounded-full mx-auto">
            <TabsTrigger value="new" className="flex items-center gap-2 rounded-full h-full data-[state=active]:bg-background data-[state=active]:shadow-sm text-base">
              <Plus className="h-5 w-5" />
              {isRTL ? 'استشارة جديدة' : 'New Consultation'}
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2 rounded-full h-full data-[state=active]:bg-background data-[state=active]:shadow-sm text-base">
              <History className="h-5 w-5" />
              {isRTL ? 'استشاراتي' : 'My Consultations'}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="new" className="mt-6">
            <Card className="border-0 shadow-2xl bg-card/95 backdrop-blur-xl overflow-hidden ring-1 ring-border/20">
              <div className="bg-gradient-to-r from-primary/20 via-primary/10 to-transparent p-1 h-1.5 w-full" />
              <CardHeader className="text-center pb-8 pt-10">
                <CardTitle className="flex flex-col items-center justify-center gap-4 text-2xl sm:text-3xl">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center shadow-inner ring-1 ring-primary/20">
                    <Stethoscope className="h-8 w-8 text-primary" />
                  </div>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
                    {isRTL ? 'بدء توجيه غذائي جديد' : 'Start New Nutritional Guidance'}
                  </span>
                </CardTitle>
                <CardDescription className="text-lg mt-2 font-medium">
                  {isRTL ? 'سنقوم بطرح بعض الأسئلة لمساعدة الطبيب في فهم حالتك بشكل أفضل' : 'We will ask some questions to help the doctor better understand your condition'}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-8 px-6 sm:px-10 pb-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex flex-col items-center justify-center p-6 bg-muted/30 rounded-2xl border border-border/50 hover:bg-muted/50 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-3">
                      <User className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="font-bold text-foreground">{isRTL ? 'معلومات المريض' : 'Patient Information'}</span>
                    <span className="text-xs text-muted-foreground mt-1">{isRTL ? 'البيانات الشخصية والعمر' : 'Personal data & age'}</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-6 bg-muted/30 rounded-2xl border border-border/50 hover:bg-muted/50 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-3">
                      <Activity className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <span className="font-bold text-foreground">{isRTL ? 'الأعراض والتاريخ' : 'Symptoms & History'}</span>
                    <span className="text-xs text-muted-foreground mt-1">{isRTL ? 'تفاصيل الحالة الصحية' : 'Health condition details'}</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-6 bg-muted/30 rounded-2xl border border-border/50 hover:bg-muted/50 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-3">
                      <MessageCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <span className="font-bold text-foreground">{isRTL ? 'السؤال الطبي' : 'Medical Question'}</span>
                    <span className="text-xs text-muted-foreground mt-1">{isRTL ? 'استفسارك للطبيب' : 'Your inquiry for doctor'}</span>
                  </div>
                </div>

                <div className="bg-amber-50 dark:bg-amber-900/10 p-6 rounded-2xl border border-amber-200 dark:border-amber-800/30 text-start">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-amber-100 dark:bg-amber-900/40 rounded-lg mt-1 shrink-0">
                      <AlertCircle className="h-6 w-6 text-amber-600 dark:text-amber-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-amber-900 dark:text-amber-400 text-base mb-1">
                        {isRTL ? 'ملاحظة مهمة' : 'Important Note'}
                      </h4>
                      <p className="text-sm text-amber-800 dark:text-amber-300/90 leading-relaxed">
                        {isRTL
                          ? 'سيتم الرد على استشارتك من قبل أخصائي تغذية خلال ساعة إلى ساعتين حسب الأولوية. في حالات الطوارئ القصوى، يرجى التوجه لأقرب مستشفى فوراً.'
                          : 'Your consultation will be answered by a nutrition specialist within 1-2 hours depending on priority. In case of extreme emergency, please go to the nearest hospital immediately.'
                        }
                      </p>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={() => setShowWizard(true)}
                  size="lg"
                  className="w-full sm:w-auto min-w-[240px] h-14 text-lg font-bold bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 shadow-lg hover:shadow-primary/25 transition-all duration-300 rounded-xl"
                >
                  <Plus className={`h-6 w-6 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                  {isRTL ? 'بدء الاستشارة الآن' : 'Start Consultation Now'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="mt-6">
            <div className="space-y-4">
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                  <p className="mt-2 text-muted-foreground">
                    {isRTL ? 'جاري التحميل...' : 'Loading...'}
                  </p>
                </div>
              ) : consultations.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-8">
                    <Stethoscope className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">
                      {isRTL ? 'لا توجد استشارات' : 'No Consultations'}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {isRTL ? 'لم تقم بإنشاء أي توجيه غذائي بعد' : 'You haven\'t created any nutritional guidance requests yet'}
                    </p>
                    <Button onClick={() => setActiveTab('new')}>
                      {isRTL ? 'إنشاء استشارة جديدة' : 'Create New Consultation'}
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                consultations.map((consultation) => (
                  <motion.div
                    key={consultation.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              {consultation.consultationType === 'self' ? (
                                <User className="h-5 w-5" />
                              ) : (
                                <Baby className="h-5 w-5" />
                              )}
                              <span className="font-medium">
                                {consultation.consultationType === 'self'
                                  ? (isRTL ? 'استشارة شخصية' : 'Personal Consultation')
                                  : (isRTL ? 'استشارة طفل' : 'Child Consultation')
                                }
                              </span>
                              {getStatusBadge(consultation.status)}
                              {getPriorityBadge(consultation.priority)}
                              {consultation.isLocked && (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800">
                                  <Lock className="h-3 w-3" />
                                  {isRTL ? 'مقفل' : 'Locked'}
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              {formatDate(consultation.createdAt)}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedConsultation(
                              selectedConsultation?.id === consultation.id ? null : consultation
                            )}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>

                      {selectedConsultation?.id === consultation.id && (
                        <CardContent className="space-y-4">
                          {/* Patient Info */}
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-slate-50 dark:bg-slate-900/20 rounded-lg border border-slate-200 dark:border-slate-800">
                            <div>
                              <span className="text-sm font-medium">{isRTL ? 'العمر' : 'Age'}:</span>
                              <p className="text-sm">
                                {consultation.consultationType === 'self'
                                  ? `${consultation.patientAge} ${isRTL ? 'سنة' : 'years'}`
                                  : `${consultation.childAge} ${consultation.childAgeUnit === 'months'
                                    ? (isRTL ? 'شهر' : 'months')
                                    : (isRTL ? 'سنة' : 'years')
                                  } (${consultation.childGender === 'male' ? (isRTL ? 'ذكر' : 'Male') : (isRTL ? 'أنثى' : 'Female')})`
                                }
                              </p>
                            </div>
                            <div>
                              <span className="text-sm font-medium">{isRTL ? 'الوزن' : 'Weight'}:</span>
                              <p className="text-sm">{consultation.weight} {isRTL ? 'كجم' : 'kg'}</p>
                            </div>
                            <div>
                              <span className="text-sm font-medium">{isRTL ? 'الطول' : 'Height'}:</span>
                              <p className="text-sm">{consultation.height} {isRTL ? 'سم' : 'cm'}</p>
                            </div>
                            <div>
                              <span className="text-sm font-medium">{isRTL ? 'وقت الرد المتوقع' : 'Expected Reply'}:</span>
                              <p className="text-sm">{consultation.estimatedReplyTime}</p>
                            </div>
                          </div>

                          {/* Symptoms */}
                          {consultation.symptoms && consultation.symptoms.length > 0 && (
                            <div>
                              <h4 className="font-medium mb-2">{isRTL ? 'الأعراض' : 'Symptoms'}:</h4>
                              <div className="flex flex-wrap gap-2">
                                {consultation.symptoms.map((symptom) => (
                                  <span key={symptom} className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700">
                                    {getSymptomLabel(symptom)}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Main Question */}
                          <div>
                            <h4 className="font-medium mb-2">{isRTL ? 'السؤال الطبي' : 'Medical Question'}:</h4>
                            <p className="text-sm bg-slate-50 dark:bg-slate-900/20 p-3 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100">
                              {consultation.mainQuestion}
                            </p>
                          </div>

                          {/* Chat Messages */}
                          {consultation.chatMessages && consultation.chatMessages.length > 0 && (
                            <div>
                              <h4 className="font-medium mb-2 flex items-center gap-2">
                                <MessageSquare className="h-4 w-4" />
                                {isRTL ? 'المحادثة' : 'Conversation'}
                              </h4>
                              <ScrollArea className="h-64 border rounded-lg p-4">
                                <div className="space-y-3">
                                  {consultation.chatMessages.map((message) => (
                                    <div
                                      key={message.id}
                                      className={`flex ${message.senderType === 'patient' ? 'justify-end' : 'justify-start'}`}
                                    >
                                      <div
                                        className={`max-w-[70%] p-3 rounded-lg ${message.senderType === 'patient'
                                            ? 'bg-primary text-primary-foreground'
                                            : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700'
                                          }`}
                                      >
                                        <div className="flex items-center gap-2 mb-1">
                                          <span className="text-xs font-medium">
                                            {message.senderName}
                                          </span>
                                          <span className="text-xs opacity-70">
                                            {formatDate(message.timestamp)}
                                          </span>
                                        </div>
                                        <p className="text-sm">{message.message}</p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </ScrollArea>
                            </div>
                          )}

                          {/* Send Follow-up Message */}
                          {consultation.status !== 'closed' && (
                            <div className="space-y-2">
                              <Label htmlFor={`message-${consultation.id}`}>
                                {isRTL ? 'رسالة متابعة' : 'Follow-up Message'}
                              </Label>

                              {consultation.isLocked ? (
                                <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                                  <Lock className="h-4 w-4 text-red-600 dark:text-red-400" />
                                  <span className="text-sm text-red-700 dark:text-red-300">
                                    {isRTL
                                      ? 'الاستشارة مقفلة من قبل الطبيب - لا يمكن إرسال رسائل جديدة'
                                      : 'Consultation locked by doctor - cannot send new messages'
                                    }
                                  </span>
                                </div>
                              ) : (
                                <div className="flex gap-2">
                                  <Textarea
                                    id={`message-${consultation.id}`}
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    placeholder={isRTL ? 'اكتب رسالة للطبيب...' : 'Write a message to the doctor...'}
                                    rows={3}
                                  />
                                  <Button
                                    onClick={() => sendFollowUpMessage(consultation.id)}
                                    disabled={!newMessage.trim() || sendingMessage}
                                    size="sm"
                                  >
                                    {sendingMessage ? (
                                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                    ) : (
                                      <Send className="h-4 w-4" />
                                    )}
                                  </Button>
                                </div>
                              )}
                            </div>
                          )}
                        </CardContent>
                      )}
                    </Card>
                  </motion.div>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default NewMedicalConsultation;