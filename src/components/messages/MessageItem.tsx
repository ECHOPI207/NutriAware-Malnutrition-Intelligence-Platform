import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  User, Shield, Activity, Clock, CheckCircle, Eye,
  Lock, Unlock, Trash2, Reply, Send, Settings,
  Stethoscope, Mail, AlertTriangle, Baby, Heart, Calendar
} from 'lucide-react';
import { CombinedItem, Message, MedicalConsultation } from './types';

interface MessageItemProps {
  item: CombinedItem;
  isRTL: boolean;
  userProfile: any;
  replyingTo: string | null;
  replyText: string;
  sendingReply: boolean;
  onSetReplyingTo: (id: string | null) => void;
  onSetReplyText: (text: string) => void;
  onSubmitReply: (id: string, type: 'feedback' | 'consultation') => void;
  onUpdateStatus: (id: string, status: 'read' | 'replied' | 'closed', type: 'feedback' | 'consultation') => void;
  onUpdatePriority: (id: string, priority: string, type: 'feedback' | 'consultation') => void;
  onDelete: (id: string, type: 'feedback' | 'consultation') => void;
  onCloseConsultation: (item: CombinedItem) => void;
  onToggleLock: (id: string) => void;
}

export const MessageItem: React.FC<MessageItemProps> = ({
  item, isRTL, userProfile,
  replyingTo, replyText, sendingReply,
  onSetReplyingTo, onSetReplyText, onSubmitReply,
  onUpdateStatus, onUpdatePriority, onDelete,
  onCloseConsultation, onToggleLock
}) => {

  const getStatusBadge = (status: string) => {
    const statusMap = {
      new: { label: isRTL ? 'جديد' : 'New', variant: 'destructive' as const, icon: AlertTriangle },
      pending: { label: isRTL ? 'في الانتظار' : 'Pending', variant: 'secondary' as const, icon: Clock },
      read: { label: isRTL ? 'مقروء' : 'Read', variant: 'secondary' as const, icon: Eye },
      in_progress: { label: isRTL ? 'قيد المراجعة' : 'In Progress', variant: 'default' as const, icon: Activity },
      replied: { label: isRTL ? 'تم الرد' : 'Replied', variant: 'default' as const, icon: CheckCircle },
      closed: { label: isRTL ? 'مغلق' : 'Closed', variant: 'outline' as const, icon: CheckCircle }
    };

    const statusInfo = statusMap[status as keyof typeof statusMap] || statusMap.new;
    const Icon = statusInfo.icon;

    return (
      <Badge variant={statusInfo.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {statusInfo.label}
      </Badge>
    );
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'border-l-red-600';
      case 'high': return 'border-l-red-400';
      case 'medium': return 'border-l-yellow-400';
      case 'low': return 'border-l-green-400';
      default: return 'border-l-gray-300';
    }
  };

  const getPriorityBadge = (priority: string) => {
    const priorityMap = {
      urgent: { label: isRTL ? 'عاجل' : 'Urgent', color: 'bg-red-600' },
      high: { label: isRTL ? 'عالي' : 'High', color: 'bg-red-400' },
      medium: { label: isRTL ? 'متوسط' : 'Medium', color: 'bg-yellow-400' },
      low: { label: isRTL ? 'منخفض' : 'Low', color: 'bg-green-400' }
    };

    const priorityInfo = priorityMap[priority as keyof typeof priorityMap] || priorityMap.medium;

    return (
      <Badge className={`${priorityInfo.color} text-white`}>
        {priorityInfo.label}
      </Badge>
    );
  };

  const getTypeIcon = (type: string) => {
    return type === 'consultation' ? <Stethoscope className="h-4 w-4 text-green-600" /> : <Mail className="h-4 w-4 text-blue-600" />;
  };

  const getTypeBadge = (type: string) => {
    return type === 'consultation'
      ? <Badge variant="outline" className="text-green-600 border-green-600">{isRTL ? 'توجيه غذائي' : 'Nutritional Guidance'}</Badge>
      : <Badge variant="outline" className="text-blue-600 border-blue-600">{isRTL ? 'رسالة عامة' : 'General Message'}</Badge>;
  };

  return (
    <Card className={`border-l-4 ${getPriorityColor(item.priority)} card-medical shadow-medical-lg mx-1 sm:mx-0`}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center flex-wrap gap-2 sm:gap-3 mb-2">
              {getTypeIcon(item.type)}
              <span className="font-semibold truncate max-w-[120px] sm:max-w-none">
                {item.type === 'consultation'
                  ? (item as MedicalConsultation).patientName
                  : (item as Message).name}
              </span>
              {item.type === 'consultation' && (item as MedicalConsultation).isLocked && (
                <Badge variant="destructive" className="flex items-center gap-1 h-5 px-1.5 text-[10px] sm:text-xs">
                  <Lock className="h-3 w-3" />
                  {isRTL ? 'مقفل' : 'Locked'}
                </Badge>
              )}
              <span className="text-sm text-muted-foreground truncate hidden sm:inline-block max-w-[150px]">
                {item.type === 'consultation'
                  ? (item as MedicalConsultation).patientEmail
                  : (item as Message).email}
              </span>
              {getStatusBadge(item.status)}
              {getPriorityBadge(item.priority)}
              {getTypeBadge(item.type)}
            </div>
            <CardTitle className="text-base sm:text-lg break-words">
              {item.type === 'consultation'
                ? (isRTL ? 'توجيه غذائي' : 'Nutritional Guidance')
                : (item as Message).subject}
            </CardTitle>
            <CardDescription className="flex items-center gap-2 mt-1">
              <Calendar className="h-4 w-4" />
              {item.createdAt?.toDate?.()?.toLocaleString(isRTL ? 'ar-EG' : 'en-US') || 'تاريخ غير محدد'}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 sm:space-y-4 p-3 sm:p-6">
        {/* Content based on type */}
        {item.type === 'consultation' ? (
          <>
            {/* Medical Consultation Content */}
            <div className="bg-muted/50 p-4 rounded-lg">
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <User className="h-4 w-4" />
                {isRTL ? 'معلومات المريض' : 'Patient Information'}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 text-sm">
                <div>
                  <span className="font-semibold text-muted-foreground block text-xs">{isRTL ? 'النوع' : 'Type'}</span>
                  {(item as MedicalConsultation).consultationType === 'child' ? (isRTL ? 'استشارة عن طفل' : 'Child') : (isRTL ? 'شخصية' : 'Personal')}
                </div>
                <div>
                  <span className="font-semibold text-muted-foreground block text-xs">{isRTL ? 'العمر' : 'Age'}</span>
                  {(item as MedicalConsultation).consultationType === 'child'
                    ? `${(item as MedicalConsultation).childAge} ${(item as MedicalConsultation).childAgeUnit === 'months' ? (isRTL ? 'شهر' : 'months') : (isRTL ? 'سنة' : 'years')}`
                    : `${(item as MedicalConsultation).patientAge} ${isRTL ? 'سنة' : 'years'}`
                  }
                </div>

                {(item as MedicalConsultation).consultationType === 'child' && (
                  <div>
                    <span className="font-semibold text-muted-foreground block text-xs">{isRTL ? 'الجنس' : 'Gender'}</span>
                    {(item as MedicalConsultation).childGender === 'male' ? (isRTL ? 'ذكر' : 'Male') : (isRTL ? 'أنثى' : 'Female')}
                  </div>
                )}

                <div>
                  <span className="font-semibold text-muted-foreground block text-xs">{isRTL ? 'الوزن' : 'Weight'}</span>
                  {(item as MedicalConsultation).weight ? `${(item as MedicalConsultation).weight} kg` : '-'}
                </div>
                <div>
                  <span className="font-semibold text-muted-foreground block text-xs">{isRTL ? 'الطول' : 'Height'}</span>
                  {(item as MedicalConsultation).height ? `${(item as MedicalConsultation).height} cm` : '-'}
                </div>
              </div>
            </div>

            {/* Medical History - Adults */}
            {(item as MedicalConsultation).consultationType === 'self' && (
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                <h4 className="font-medium mb-3 flex items-center gap-2 text-blue-800 dark:text-blue-200">
                  <Heart className="h-4 w-4" />
                  {isRTL ? 'التاريخ الطبي' : 'Medical History'}
                </h4>
                <div className="space-y-3 text-sm">
                  {(item as MedicalConsultation).medicalHistory && (
                    <div>
                      <span className="font-semibold text-blue-700 dark:text-blue-300 block text-xs mb-1">
                        {isRTL ? 'التاريخ المرضي السابق' : 'Previous Medical History'}
                      </span>
                      <p className="text-blue-800 dark:text-blue-200 bg-blue-100 dark:bg-blue-900/30 p-2 rounded">
                        {(item as MedicalConsultation).medicalHistory}
                      </p>
                    </div>
                  )}

                  {(item as MedicalConsultation).currentMedications && (
                    <div>
                      <span className="font-semibold text-blue-700 dark:text-blue-300 block text-xs mb-1">
                        {isRTL ? 'الأدوية الحالية' : 'Current Medications'}
                      </span>
                      <p className="text-blue-800 dark:text-blue-200 bg-blue-100 dark:bg-blue-900/30 p-2 rounded">
                        {(item as MedicalConsultation).currentMedications}
                      </p>
                    </div>
                  )}

                  {(item as MedicalConsultation).allergies && (
                    <div>
                      <span className="font-semibold text-blue-700 dark:text-blue-300 block text-xs mb-1">
                        {isRTL ? 'الحساسية' : 'Allergies'}
                      </span>
                      <p className="text-blue-800 dark:text-blue-200 bg-blue-100 dark:bg-blue-900/30 p-2 rounded">
                        {(item as MedicalConsultation).allergies}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Child Information */}
            {(item as MedicalConsultation).consultationType === 'child' && (
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                <h4 className="font-medium mb-3 flex items-center gap-2 text-green-800 dark:text-green-200">
                  <Baby className="h-4 w-4" />
                  {isRTL ? 'معلومات الطفل' : 'Child Information'}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-sm">
                  {(item as MedicalConsultation).appetite && (
                    <div>
                      <span className="font-semibold text-green-700 dark:text-green-300 block text-xs">
                        {isRTL ? 'الشهية' : 'Appetite'}
                      </span>
                      <span className="text-green-800 dark:text-green-200">
                        {(item as MedicalConsultation).appetite === 'excellent' ? (isRTL ? 'ممتازة' : 'Excellent') :
                          (item as MedicalConsultation).appetite === 'good' ? (isRTL ? 'جيدة' : 'Good') :
                            (item as MedicalConsultation).appetite === 'fair' ? (isRTL ? 'متوسطة' : 'Fair') :
                              (isRTL ? 'ضعيفة' : 'Poor')}
                      </span>
                    </div>
                  )}

                  {(item as MedicalConsultation).activityLevel && (
                    <div>
                      <span className="font-semibold text-green-700 dark:text-green-300 block text-xs">
                        {isRTL ? 'مستوى النشاط' : 'Activity Level'}
                      </span>
                      <span className="text-green-800 dark:text-green-200">
                        {(item as MedicalConsultation).activityLevel === 'very_active' ? (isRTL ? 'نشيط جداً' : 'Very Active') :
                          (item as MedicalConsultation).activityLevel === 'active' ? (isRTL ? 'نشيط' : 'Active') :
                            (item as MedicalConsultation).activityLevel === 'normal' ? (isRTL ? 'طبيعي' : 'Normal') :
                              (item as MedicalConsultation).activityLevel === 'low' ? (isRTL ? 'قليل النشاط' : 'Low Activity') :
                                (isRTL ? 'خامل جداً' : 'Very Low Activity')}
                      </span>
                    </div>
                  )}
                </div>

                {(item as MedicalConsultation).feedingHabits && (
                  <div className="mt-3">
                    <span className="font-semibold text-green-700 dark:text-green-300 block text-xs mb-1">
                      {isRTL ? 'عادات التغذية' : 'Feeding Habits'}
                    </span>
                    <p className="text-green-800 dark:text-green-200 bg-green-100 dark:bg-green-900/30 p-2 rounded text-sm">
                      {(item as MedicalConsultation).feedingHabits}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Symptoms */}
            {(item as MedicalConsultation).symptoms && (item as MedicalConsultation).symptoms.length > 0 && (
              <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
                <h4 className="font-medium mb-3 flex items-center gap-2 text-orange-800 dark:text-orange-200">
                  <Activity className="h-4 w-4" />
                  {isRTL ? 'الأعراض والتفاصيل' : 'Symptoms & Details'}
                </h4>
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {(item as MedicalConsultation).symptoms.map((symptom, idx) => (
                      <Badge key={idx} variant="outline" className="bg-orange-100 dark:bg-orange-900/30 border-orange-300 dark:border-orange-700 text-orange-800 dark:text-orange-200">
                        {symptom}
                      </Badge>
                    ))}
                  </div>

                  {/* Symptom Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 text-sm">
                    {(item as MedicalConsultation).symptomDuration && (
                      <div>
                        <span className="font-semibold text-orange-700 dark:text-orange-300 block text-xs">
                          {isRTL ? 'مدة الأعراض' : 'Duration'}
                        </span>
                        <span className="text-orange-800 dark:text-orange-200">
                          {(item as MedicalConsultation).symptomDuration}
                        </span>
                      </div>
                    )}

                    {(item as MedicalConsultation).symptomSeverity && (
                      <div>
                        <span className="font-semibold text-orange-700 dark:text-orange-300 block text-xs">
                          {isRTL ? 'شدة الأعراض' : 'Severity'}
                        </span>
                        <span className="text-orange-800 dark:text-orange-200">
                          {(item as MedicalConsultation).symptomSeverity === 'mild' ? (isRTL ? 'خفيفة' : 'Mild') :
                            (item as MedicalConsultation).symptomSeverity === 'moderate' ? (isRTL ? 'متوسطة' : 'Moderate') :
                              (isRTL ? 'شديدة' : 'Severe')}
                        </span>
                      </div>
                    )}

                    {(item as MedicalConsultation).painLevel !== undefined && (item as MedicalConsultation).painLevel! > 0 && (
                      <div>
                        <span className="font-semibold text-orange-700 dark:text-orange-300 block text-xs">
                          {isRTL ? 'مستوى الألم' : 'Pain Level'}
                        </span>
                        <span className="text-orange-800 dark:text-orange-200">
                          {(item as MedicalConsultation).painLevel}/10
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Additional Details */}
            {((item as MedicalConsultation).urgencyLevel || (item as MedicalConsultation).recentChanges || (item as MedicalConsultation).previousTreatments) && (
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                <h4 className="font-medium mb-3 flex items-center gap-2 text-purple-800 dark:text-purple-200">
                  <Shield className="h-4 w-4" />
                  {isRTL ? 'تفاصيل إضافية' : 'Additional Details'}
                </h4>
                <div className="space-y-3 text-sm">
                  {(item as MedicalConsultation).urgencyLevel && (
                    <div>
                      <span className="font-semibold text-purple-700 dark:text-purple-300 block text-xs mb-1">
                        {isRTL ? 'مستوى الإلحاح' : 'Urgency Level'}
                      </span>
                      <Badge variant="outline" className={`
                        ${(item as MedicalConsultation).urgencyLevel === 'emergency' ? 'bg-red-100 border-red-300 text-red-800 dark:bg-red-900/30 dark:border-red-700 dark:text-red-200' :
                          (item as MedicalConsultation).urgencyLevel === 'urgent' ? 'bg-yellow-100 border-yellow-300 text-yellow-800 dark:bg-yellow-900/30 dark:border-yellow-700 dark:text-yellow-200' :
                            'bg-green-100 border-green-300 text-green-800 dark:bg-green-900/30 dark:border-green-700 dark:text-green-200'}
                      `}>
                        {(item as MedicalConsultation).urgencyLevel === 'emergency' ? (isRTL ? 'طارئ' : 'Emergency') :
                          (item as MedicalConsultation).urgencyLevel === 'urgent' ? (isRTL ? 'عاجل' : 'Urgent') :
                            (isRTL ? 'عادي' : 'Routine')}
                      </Badge>
                    </div>
                  )}

                  {(item as MedicalConsultation).recentChanges && (
                    <div>
                      <span className="font-semibold text-purple-700 dark:text-purple-300 block text-xs mb-1">
                        {isRTL ? 'تغيرات حديثة' : 'Recent Changes'}
                      </span>
                      <p className="text-purple-800 dark:text-purple-200 bg-purple-100 dark:bg-purple-900/30 p-2 rounded">
                        {(item as MedicalConsultation).recentChanges}
                      </p>
                    </div>
                  )}

                  {(item as MedicalConsultation).previousTreatments && (
                    <div>
                      <span className="font-semibold text-purple-700 dark:text-purple-300 block text-xs mb-1">
                        {isRTL ? 'العلاجات السابقة' : 'Previous Treatments'}
                      </span>
                      <p className="text-purple-800 dark:text-purple-200 bg-purple-100 dark:bg-purple-900/30 p-2 rounded">
                        {(item as MedicalConsultation).previousTreatments}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div>
              <h4 className="font-medium mb-2">
                {isRTL ? 'الاستفسار الطبي' : 'Medical Question'}
              </h4>
              <p className="text-foreground leading-relaxed bg-background p-3 rounded-lg border">
                {(item as MedicalConsultation).mainQuestion}
              </p>
            </div>
          </>
        ) : (
          <>
            {/* Regular Message Content */}
            <div>
              <h4 className="font-medium mb-2">
                {isRTL ? 'الرسالة' : 'Message'}
              </h4>
              <p className="text-foreground leading-relaxed bg-background p-3 rounded-lg border">
                {(item as Message).message}
              </p>
            </div>
          </>
        )}
        {/* Replies */}
        {/* Chat Messages (Consultations) */}
        {item.type === 'consultation' && (item as MedicalConsultation).chatMessages && (item as MedicalConsultation).chatMessages!.length > 0 ? (
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-muted-foreground border-t pt-3">
              {isRTL ? 'المحادثة' : 'Conversation'}
            </h4>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {(item as MedicalConsultation).chatMessages!.map((chatMsg, chatIndex) => (
                <div
                  key={chatIndex}
                  className={`p-3 rounded-lg ${chatMsg.senderType === 'patient'
                    ? 'bg-blue-50 border border-blue-200 ml-4'
                    : chatMsg.senderType === 'admin'
                      ? 'bg-purple-50 border border-purple-200 mr-4'
                      : 'bg-green-50 border border-green-200 mr-4'
                    }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    {chatMsg.senderType === 'patient' ? (
                      <User className="h-3 w-3 text-blue-600" />
                    ) : chatMsg.senderType === 'admin' ? (
                      <Shield className="h-3 w-3 text-purple-600" />
                    ) : (
                      <User className="h-3 w-3 text-green-600" />
                    )}
                    <span className={`text-xs font-medium ${chatMsg.senderType === 'patient' ? 'text-blue-800' :
                      chatMsg.senderType === 'admin' ? 'text-purple-800' : 'text-green-800'
                      }`}>
                      {chatMsg.senderName}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {chatMsg.timestamp?.toDate ? chatMsg.timestamp.toDate().toLocaleString(isRTL ? 'ar-EG' : 'en-US') : (typeof chatMsg.timestamp === 'object' ? new Date().toLocaleString() : 'الآن')}
                    </span>
                  </div>
                  <p className={`text-sm leading-relaxed ${chatMsg.senderType === 'patient' ? 'text-blue-800' :
                    chatMsg.senderType === 'admin' ? 'text-purple-800' : 'text-green-800'
                    }`}>
                    {chatMsg.message}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* Fallback to Legacy Replies */}
            {(item as MedicalConsultation).doctorReply && (
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <User className="h-4 w-4 text-blue-600" />
                  <span className="font-medium text-blue-800">
                    {isRTL ? 'رد الطبيب' : 'Doctor\'s Reply'} - {(item as MedicalConsultation).doctorName}
                  </span>
                </div>
                <p className="text-blue-800 leading-relaxed">
                  {(item as MedicalConsultation).doctorReply}
                </p>
              </div>
            )}

            {(item as MedicalConsultation).adminReply && (
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-4 w-4 text-purple-600" />
                  <span className="font-medium text-purple-800">
                    {isRTL ? 'رد مدير النظام' : 'Admin Reply'} - {(item as MedicalConsultation).adminName}
                  </span>
                </div>
                <p className="text-purple-800 leading-relaxed">
                  {(item as MedicalConsultation).adminReply}
                </p>
              </div>
            )}
          </>
        )}

        {/* Reply Form */}
        {replyingTo === item.id && (
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <Label htmlFor={`reply-${item.id}`} className="text-blue-800 font-medium">
              {isRTL ? 'اكتب ردك' : 'Write your reply'}
            </Label>
            <Textarea
              id={`reply-${item.id}`}
              value={replyText}
              onChange={(e) => onSetReplyText(e.target.value)}
              placeholder={isRTL ? 'اكتب ردك المفصل هنا...' : 'Write your detailed reply here...'}
              rows={6}
              className="mt-2 resize-none"
            />
            <div className="flex gap-2 mt-3">
              <Button
                onClick={() => onSubmitReply(item.id, item.type)}
                disabled={!replyText.trim() || sendingReply}
              >
                {sendingReply ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {isRTL ? 'جاري الإرسال...' : 'Sending...'}
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    {isRTL ? 'إرسال الرد' : 'Send Reply'}
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  onSetReplyingTo(null);
                  onSetReplyText('');
                }}
              >
                {isRTL ? 'إلغاء' : 'Cancel'}
              </Button>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {(userProfile?.role === 'admin' || userProfile?.role === 'doctor') && (
          <div className="flex flex-col sm:flex-row flex-wrap gap-2 pt-4 border-t">
            {/* Lock/Unlock Button for Consultations */}
            {item.type === 'consultation' && (
              <Button
                variant={(item as MedicalConsultation).isLocked ? "destructive" : "outline"}
                size="sm"
                onClick={() => onToggleLock(item.id)}
                className="flex items-center gap-2 w-full sm:w-auto"
              >
                {(item as MedicalConsultation).isLocked ? (
                  <>
                    <Unlock className="h-4 w-4" />
                    {isRTL ? 'فتح الاستشارة' : 'Unlock Consultation'}
                  </>
                ) : (
                  <>
                    <Lock className="h-4 w-4" />
                    {isRTL ? 'قفل الاستشارة' : 'Lock Consultation'}
                  </>
                )}
              </Button>
            )}

            {/* Status Management */}
            {item.status !== 'closed' && !(item.type === 'consultation' && (item as MedicalConsultation).isLocked) && (
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <Button
                  size="sm"
                  onClick={() => {
                    onSetReplyingTo(item.id);
                    onSetReplyText('');
                  }}
                  className="w-full sm:w-auto"
                >
                  <Reply className="h-4 w-4 mr-2" />
                  {item.status === 'replied'
                    ? (isRTL ? 'رد إضافي' : 'Additional Reply')
                    : (item.status === 'pending' || item.status === 'new')
                      ? (isRTL ? 'رد فوري' : 'Quick Reply')
                      : (isRTL ? 'كتابة الرد' : 'Write Reply')
                  }
                </Button>

                {(item.status === 'new' || item.status === 'pending' || item.type === 'feedback') && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onUpdateStatus(item.id, 'read', item.type)}
                    className="w-full sm:w-auto"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    {isRTL ? 'تحديد كمقروء' : 'Mark as Read'}
                  </Button>
                )}

                {/* Allow closing if replied or in_progress (Consultation only) */}
                {item.type === 'consultation' && (item.status === 'replied' || item.status === 'in_progress') && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onCloseConsultation(item)}
                    className="w-full sm:w-auto"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    {isRTL ? 'إغلاق الاستشارة' : 'Close Consultation'}
                  </Button>
                )}
              </div>
            )}

            {/* Lock Status Indicator */}
            {item.type === 'consultation' && (item as MedicalConsultation).isLocked && (
              <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground w-full sm:w-auto">
                <Lock className="h-3 w-3" />
                <span>{isRTL ? 'الاستشارة مقفلة - لا يمكن للمريض إرسال رسائل' : 'Consultation locked - Patient cannot send messages'}</span>
              </div>
            )}

            {/* Priority Management - Mobile Optimized */}
            <div className="flex flex-wrap gap-1 w-full sm:w-auto">
              {['low', 'medium', 'high', 'urgent'].map((priority) => {
                const isSelected = item.priority === priority;
                let styles = "";

                if (isSelected) {
                  switch (priority) {
                    case 'urgent': styles = "bg-red-600 text-white border-red-600 hover:bg-red-700"; break;
                    case 'high': styles = "bg-orange-500 text-white border-orange-500 hover:bg-orange-600"; break;
                    case 'medium': styles = "bg-yellow-400 text-black border-yellow-400 hover:bg-yellow-500"; break;
                    case 'low': styles = "bg-green-600 text-white border-green-600 hover:bg-green-700"; break;
                  }
                } else {
                  switch (priority) {
                    case 'urgent': styles = "bg-white text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"; break;
                    case 'high': styles = "bg-white text-orange-600 border-orange-200 hover:bg-orange-50 hover:text-orange-700"; break;
                    case 'medium': styles = "bg-white text-yellow-600 border-yellow-200 hover:bg-yellow-50 hover:text-yellow-700"; break;
                    case 'low': styles = "bg-white text-green-600 border-green-200 hover:bg-green-50 hover:text-green-700"; break;
                  }
                }

                return (
                  <Button
                    key={priority}
                    variant="outline"
                    size="sm"
                    onClick={() => onUpdatePriority(item.id, priority, item.type)}
                    className={`text-xs transition-colors flex-1 sm:flex-none ${styles}`}
                  >
                    <Settings className="h-3 w-3 mr-1" />
                    {priority === 'urgent' ? (isRTL ? 'عاجل' : 'Urgent') :
                      priority === 'high' ? (isRTL ? 'عالي' : 'High') :
                        priority === 'medium' ? (isRTL ? 'متوسط' : 'Medium') :
                          (isRTL ? 'منخفض' : 'Low')}
                  </Button>
                );
              })}
            </div>

            {/* Delete Consultation (Doctor/Admin) */}
            {item.type === 'consultation' && (userProfile?.role === 'admin' || userProfile?.role === 'doctor') && (
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onDelete(item.id, item.type)}
                className="w-full sm:w-auto"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                {isRTL ? 'حذف الاستشارة' : 'Delete Consultation'}
              </Button>
            )}

            {/* Delete (Admin only) */}
            {userProfile?.role === 'admin' && item.type !== 'consultation' && (
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onDelete(item.id, item.type)}
                className="w-full sm:w-auto"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                {isRTL ? 'حذف نهائي' : 'Delete'}
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
