import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import { MessageItem } from './MessageItem';
import { CombinedItem } from './types';

interface MessageListProps {
  filteredItems: CombinedItem[];
  loading?: boolean;
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

export const MessageList: React.FC<MessageListProps> = ({
  filteredItems, loading = false, isRTL, userProfile,
  replyingTo, replyText, sendingReply,
  onSetReplyingTo, onSetReplyText, onSubmitReply,
  onUpdateStatus, onUpdatePriority, onDelete,
  onCloseConsultation, onToggleLock
}) => {

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="p-6">
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (filteredItems.length === 0) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <MessageSquare className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">
            {isRTL ? 'لا توجد عناصر' : 'No Items Found'}
          </h3>
          <p className="text-muted-foreground">
            {isRTL ? 'لم يتم العثور على أي رسائل أو استشارات' : 'No messages or consultations found'}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {filteredItems.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <MessageItem
            item={item}
            isRTL={isRTL}
            userProfile={userProfile}
            replyingTo={replyingTo}
            replyText={replyText}
            sendingReply={sendingReply}
            onSetReplyingTo={onSetReplyingTo}
            onSetReplyText={onSetReplyText}
            onSubmitReply={onSubmitReply}
            onUpdateStatus={onUpdateStatus}
            onUpdatePriority={onUpdatePriority}
            onDelete={onDelete}
            onCloseConsultation={onCloseConsultation}
            onToggleLock={onToggleLock}
          />
        </motion.div>
      ))}
    </div>
  );
};
