export interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied' | 'closed';
  priority: 'low' | 'medium' | 'high';
  createdAt: any;
  userId?: string;
  type: 'feedback';
}

export interface MedicalConsultation {
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
  symptomDuration?: string;
  symptomSeverity?: 'mild' | 'moderate' | 'severe';
  painLevel?: number;

  // Adult-specific fields
  medicalHistory?: string;
  currentMedications?: string;
  allergies?: string;
  chronicConditions?: string[];
  previousSurgeries?: string;
  familyMedicalHistory?: string;

  // Child-specific fields
  appetite?: 'excellent' | 'good' | 'fair' | 'poor';
  activityLevel?: 'very_active' | 'active' | 'normal' | 'low' | 'very_low';
  sleepPattern?: 'excellent' | 'good' | 'fair' | 'poor';
  developmentConcerns?: string[];
  feedingHabits?: string;
  vaccinationStatus?: 'up_to_date' | 'delayed' | 'incomplete' | 'unknown';

  // Question details
  mainQuestion: string;
  urgencyLevel?: 'routine' | 'urgent' | 'emergency';
  recentChanges?: string;
  concernLevel?: 'low' | 'medium' | 'high';
  previousTreatments?: string;

  status: 'pending' | 'in_progress' | 'replied' | 'closed' | 'new' | 'read';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdAt: any;
  doctorReply?: string;
  adminReply?: string;
  doctorId?: string;
  doctorName?: string;
  adminId?: string;
  adminName?: string;
  repliedAt?: any;
  estimatedReplyTime: string;
  chatMessages?: any[];
  lastMessageAt?: any;
  type: 'consultation';
  isLocked?: boolean;
  lockedBy?: string;
  lockedAt?: any;
}

export type CombinedItem = Message | MedicalConsultation;

export type FilterType = 'all' | 'feedback' | 'consultation' | 'new' | 'urgent';
