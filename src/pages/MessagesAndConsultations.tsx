import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageSquare, Stethoscope } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMessages } from '@/components/messages/useMessages';
import { StatsCards } from '@/components/messages/StatsCards';
import { MessageFilters } from '@/components/messages/MessageFilters';
import { MessageList } from '@/components/messages/MessageList';

const MessagesAndConsultations: React.FC = () => {
  const navigate = useNavigate();
  const {
    allItems, loading, filter, setFilter,
    replyingTo, setReplyingTo, replyText, setReplyText, sendingReply,
    filteredItems, isRTL, userProfile,
    updateMessageStatus, updatePriority, deleteItem,
    closeConsultation, toggleConsultationLock, submitReply
  } = useMessages();

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isRTL ? 'rtl' : 'ltr'}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">{isRTL ? 'جاري التحميل...' : 'Loading...'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen gradient-bg ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="mb-4 sm:mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 sm:gap-3 mb-2">
                <MessageSquare className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold gradient-text">
                  {isRTL ? 'الرسائل والاستشارات' : 'Messages & Consultations'}
                </h1>
              </div>
              <p className="text-sm sm:text-base text-muted-foreground">
                {userProfile?.role === 'admin'
                  ? (isRTL ? 'إدارة شاملة لجميع الرسائل والاستشارات الطبية' : 'Comprehensive management of all messages and medical consultations')
                  : userProfile?.role === 'doctor'
                    ? (isRTL ? 'الرسائل والاستشارات الطبية' : 'Messages and medical consultations')
                    : (isRTL ? 'رسائلك واستشاراتك الطبية' : 'Your messages and medical consultations')
                }
              </p>
            </div>
            <Button onClick={() => navigate('/medical-consultation')} className="shadow-lg shadow-primary/20 w-full sm:w-auto">
              <Stethoscope className="h-4 w-4 mr-2" />
              {isRTL ? 'طلب استشارة جديدة' : 'New Consultation'}
            </Button>
          </div>

          <StatsCards allItems={allItems} isRTL={isRTL} />

          <MessageFilters
            filter={filter}
            setFilter={setFilter}
            allItems={allItems}
            isRTL={isRTL}
          />

          <MessageList
            filteredItems={filteredItems}
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
    </div>
  );
};

export default MessagesAndConsultations;
