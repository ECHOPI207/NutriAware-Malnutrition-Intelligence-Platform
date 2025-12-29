import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Stethoscope,
  Clock,
  CheckCircle,
  Activity,
  MessageSquare
} from 'lucide-react';
import { motion } from 'framer-motion';

import { useMessages } from '@/components/messages/useMessages';
import { MessageList } from '@/components/messages/MessageList';
import { MedicalConsultation } from '@/components/messages/types';

const ConsultationManagement: React.FC = () => {
  // Use shared hook configured for consultations only
  const {
    allItems,
    loading,
    userProfile,
    replyingTo,
    setReplyingTo,
    replyText,
    setReplyText,
    sendingReply,
    isRTL,
    submitReply,
    updateMessageStatus,
    updatePriority,
    deleteItem,
    closeConsultation,
    toggleConsultationLock
  } = useMessages({ 
    enableMessages: false, 
    enableConsultations: true 
  });

  // Local filter state for this page's specific tabs
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'in_progress' | 'replied'>('pending');

  if (userProfile?.role !== 'doctor') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <Stethoscope className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-xl font-semibold mb-2">
              {isRTL ? 'صلاحيات غير كافية' : 'Insufficient Permissions'}
            </h2>
            <p className="text-muted-foreground">
              {isRTL ? 'هذه الصفحة متاحة للأطباء فقط' : 'This page is only available for doctors'}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Cast allItems to MedicalConsultation[] since we only enabled consultations
  const consultations = allItems as MedicalConsultation[];

  // Filter consultations based on active tab
  const filteredConsultations = consultations.filter(consultation => {
    if (activeTab === 'all') return true;
    return consultation.status === activeTab;
  });

  return (
    <div className={`container mx-auto px-4 py-8 ${isRTL ? 'rtl' : 'ltr'}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Stethoscope className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">
              {isRTL ? 'إدارة الاستشارات الطبية' : 'Medical Consultation Management'}
            </h1>
          </div>
          <p className="text-muted-foreground">
            {isRTL
              ? 'إدارة والرد على الاستشارات الطبية من المرضى'
              : 'Manage and respond to medical consultations from patients'
            }
          </p>
        </div>

        {/* Stats Cards - Preserving the specific design of this page */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {isRTL ? 'إجمالي الاستشارات' : 'Total Consultations'}
                  </p>
                  <p className="text-2xl font-bold">{consultations.length}</p>
                </div>
                <MessageSquare className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {isRTL ? 'في الانتظار' : 'Pending'}
                  </p>
                  <p className="text-2xl font-bold text-red-600">
                    {consultations.filter(c => c.status === 'pending').length}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {isRTL ? 'قيد المراجعة' : 'In Progress'}
                  </p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {consultations.filter(c => c.status === 'in_progress').length}
                  </p>
                </div>
                <Activity className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {isRTL ? 'تم الرد' : 'Replied'}
                  </p>
                  <p className="text-2xl font-bold text-green-600">
                    {consultations.filter(c => c.status === 'replied').length}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filter Tabs */}
        <Tabs value={activeTab} onValueChange={(value: any) => setActiveTab(value)} className="mb-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">
              {isRTL ? 'الكل' : 'All'} ({consultations.length})
            </TabsTrigger>
            <TabsTrigger value="pending">
              {isRTL ? 'في الانتظار' : 'Pending'} ({consultations.filter(c => c.status === 'pending').length})
            </TabsTrigger>
            <TabsTrigger value="in_progress">
              {isRTL ? 'قيد المراجعة' : 'In Progress'} ({consultations.filter(c => c.status === 'in_progress').length})
            </TabsTrigger>
            <TabsTrigger value="replied">
              {isRTL ? 'تم الرد' : 'Replied'} ({consultations.filter(c => c.status === 'replied').length})
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Consultations List - Reusing MessageList component */}
        <MessageList
          filteredItems={filteredConsultations}
          loading={loading}
          isRTL={isRTL}
          userProfile={userProfile}
          replyingTo={replyingTo}
          replyText={replyText}
          sendingReply={sendingReply}
          onSetReplyingTo={setReplyingTo}
          onSetReplyText={setReplyText}
          onSubmitReply={submitReply}
          onUpdateStatus={updateMessageStatus}
          onUpdatePriority={updatePriority}
          onDelete={deleteItem}
          onCloseConsultation={closeConsultation}
          onToggleLock={toggleConsultationLock}
        />
      </motion.div>
    </div>
  );
};

export default ConsultationManagement;
