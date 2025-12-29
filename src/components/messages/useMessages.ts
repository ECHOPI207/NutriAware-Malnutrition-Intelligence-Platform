import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/features/auth/firebase-auth-context';
import { collection, query, getDocs, where, doc, updateDoc, serverTimestamp, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { CombinedItem, Message, MedicalConsultation, FilterType } from './types';

export interface UseMessagesOptions {
  enableMessages?: boolean;
  enableConsultations?: boolean;
  initialFilter?: FilterType;
}

export const useMessages = (options: UseMessagesOptions = {}) => {
  const { enableMessages = true, enableConsultations = true, initialFilter = 'all' } = options;
  const { i18n } = useTranslation();
  const { user, userProfile } = useAuth();
  const [allItems, setAllItems] = useState<CombinedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterType>(initialFilter);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [sendingReply, setSendingReply] = useState(false);

  const isRTL = i18n.language === 'ar';

  useEffect(() => {
    if (user && userProfile) {
      fetchAllData();
    }
  }, [user, userProfile]);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const combinedItems: CombinedItem[] = [];

      // Fetch Messages/Feedback
      if (enableMessages) {
        let messagesQuery;
        if (userProfile?.role === 'admin') {
          messagesQuery = query(collection(db, 'feedback'));
        } else if (userProfile?.role === 'doctor') {
          messagesQuery = query(
            collection(db, 'feedback'),
            where('category', 'in', ['medical', 'consultation', 'assessment'])
          );
        } else {
          messagesQuery = query(
            collection(db, 'feedback'),
            where('userId', '==', user?.uid)
          );
        }

        const messagesSnapshot = await getDocs(messagesQuery);
        messagesSnapshot.forEach((doc) => {
          const data = doc.data();
          combinedItems.push({
            id: doc.id,
            name: data.name || 'مجهول',
            email: data.email || '',
            subject: data.subject || 'بدون موضوع',
            message: data.message || '',
            status: data.status || 'new',
            priority: data.priority || 'medium',
            createdAt: data.createdAt,
            userId: data.userId,
            type: 'feedback'
          } as Message);
        });
      }

      // Fetch Medical Consultations
      if (enableConsultations) {
        let consultationsQuery;
        if (userProfile?.role === 'admin' || userProfile?.role === 'doctor') {
          consultationsQuery = query(collection(db, 'medicalConsultations'));
        } else {
          consultationsQuery = query(
            collection(db, 'medicalConsultations'),
            where('patientId', '==', user?.uid)
          );
        }

        const consultationsSnapshot = await getDocs(consultationsQuery);
        consultationsSnapshot.forEach((doc) => {
          const data = doc.data();
          combinedItems.push({
            id: doc.id,
            ...data,
            type: 'consultation'
          } as MedicalConsultation);
        });
      }

      // Sort all items by creation date
      combinedItems.sort((a, b) => {
        const dateA = a.createdAt?.toDate?.() || new Date(0);
        const dateB = b.createdAt?.toDate?.() || new Date(0);
        return dateB.getTime() - dateA.getTime();
      });

      setAllItems(combinedItems);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateMessageStatus = async (itemId: string, status: 'read' | 'replied' | 'closed', itemType: 'feedback' | 'consultation') => {
    try {
      console.log(`Updating status to ${status} for ${itemId} (${itemType})`);
      const collection_name = itemType === 'feedback' ? 'feedback' : 'medicalConsultations';
      const itemRef = doc(db, collection_name, itemId);
      await updateDoc(itemRef, { status, updatedAt: serverTimestamp() });

      setAllItems(prev =>
        prev.map(item =>
          item.id === itemId ? { ...item, status } : item
        )
      );

      if (status === 'closed') {
        alert(isRTL ? "تم إغلاق الاستشارة" : "Consultation closed");
      }
    } catch (error: any) {
      console.error('Error updating status:', error);
      alert((isRTL ? "حدث خطأ: " : "Error: ") + (error.message || "Unknown error"));
    }
  };

  const updatePriority = async (itemId: string, priority: string, itemType: 'feedback' | 'consultation') => {
    try {
      const collection_name = itemType === 'feedback' ? 'feedback' : 'medicalConsultations';
      const itemRef = doc(db, collection_name, itemId);
      await updateDoc(itemRef, { priority, updatedAt: serverTimestamp() });

      setAllItems(prev =>
        prev.map(item =>
          item.id === itemId ? { ...item, priority: priority as any } : item
        )
      );

      alert(isRTL ? "تم تحديث الأولوية" : "Priority updated");
    } catch (error) {
      console.error('Error updating priority:', error);
    }
  };

  const deleteItem = async (itemId: string, itemType: 'feedback' | 'consultation') => {
    if (!confirm(isRTL ? 'هل أنت متأكد من الحذف؟' : 'Are you sure you want to delete?')) {
      return;
    }

    try {
      const collection_name = itemType === 'feedback' ? 'feedback' : 'medicalConsultations';
      const itemRef = doc(db, collection_name, itemId);
      await deleteDoc(itemRef);

      setAllItems(prev => prev.filter(item => item.id !== itemId));
      alert(isRTL ? "تم الحذف" : "Deleted");
    } catch (error) {
      console.error('Error deleting:', error);
    }
  };

  const closeConsultation = async (item: CombinedItem) => {
    if (!confirm(isRTL ? "هل أنت متأكد من إغلاق الاستشارة؟" : "Are you sure you want to close this consultation?")) return;

    try {
      console.log("Closing consultation...", item.id);

      // Optimistic update
      setAllItems(prev => prev.map(i => i.id === item.id ? { ...i, status: 'closed' as any } : i));

      const collection_name = item.type === 'feedback' ? 'feedback' : 'medicalConsultations';
      const itemRef = doc(db, collection_name, item.id);
      await updateDoc(itemRef, {
        status: 'closed',
        updatedAt: serverTimestamp(),
      });

      alert(isRTL ? "تم الإغلاق بنجاح" : "Closed successfully");
    } catch (error: any) {
      console.error("Failed to close:", error);
      alert((isRTL ? "حدث خطأ: " : "Error: ") + (error.message || "Unknown error"));
      fetchAllData(); // Revert on error
    }
  };

  const toggleConsultationLock = async (consultationId: string) => {
    try {
      const consultation = allItems.find(item => item.id === consultationId && item.type === 'consultation') as MedicalConsultation;
      if (!consultation) return;

      const newLockStatus = !consultation.isLocked;

      // Optimistic update
      setAllItems(prev => prev.map(item =>
        item.id === consultationId
          ? {
            ...item,
            isLocked: newLockStatus,
            lockedBy: newLockStatus ? user?.uid : undefined,
            lockedAt: newLockStatus ? new Date() : undefined
          } as MedicalConsultation
          : item
      ));

      const consultationRef = doc(db, 'medicalConsultations', consultationId);
      await updateDoc(consultationRef, {
        isLocked: newLockStatus,
        lockedBy: newLockStatus ? user?.uid : null,
        lockedAt: newLockStatus ? serverTimestamp() : null,
        updatedAt: serverTimestamp()
      });

      alert(newLockStatus
        ? (isRTL ? "تم قفل الاستشارة" : "Consultation Locked")
        : (isRTL ? "تم فتح الاستشارة" : "Consultation Unlocked")
      );

    } catch (error) {
      console.error('Error toggling consultation lock:', error);
      alert(isRTL ? "حدث خطأ أثناء تغيير حالة القفل" : "Error occurred while changing lock status");
    }
  };

  const submitReply = async (itemId: string, itemType: 'feedback' | 'consultation') => {
    if (!replyText.trim()) {
      alert(isRTL ? "يرجى كتابة الرد" : "Please write a reply");
      return;
    }

    try {
      setSendingReply(true);
      const collection_name = itemType === 'feedback' ? 'feedback' : 'medicalConsultations';
      const itemRef = doc(db, collection_name, itemId);

      const currentItem = allItems.find(i => i.id === itemId);
      let updateData: any = {
        status: 'replied',
        repliedAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      // Handle Chat Messages for Consultations
      if (itemType === 'consultation') {
        const consultation = currentItem as MedicalConsultation;
        const newMessage = {
          id: Date.now().toString(),
          senderId: user?.uid || '',
          senderName: userProfile?.displayName || (userProfile?.role === 'admin' ? 'مدير النظام' : 'طبيب'),
          senderType: userProfile?.role === 'admin' ? 'admin' : 'doctor',
          message: replyText.trim(),
          timestamp: new Date() // Use local date for immediate UI update, serverTimestamp for DB
        };

        const updatedChatMessages = [...(consultation.chatMessages || []), newMessage];
        updateData.chatMessages = updatedChatMessages;
        updateData.lastMessageAt = serverTimestamp();

        // Still update legacy fields for backward compatibility
        if (userProfile?.role === 'admin') {
          updateData.adminReply = replyText;
          updateData.adminId = user?.uid;
          updateData.adminName = userProfile?.displayName || 'مدير النظام';
        } else {
          updateData.doctorReply = replyText;
          updateData.doctorId = user?.uid;
          updateData.doctorName = userProfile?.displayName || 'طبيب';
        }
      } else {
        // Feedback handling (Legacy)
        if (userProfile?.role === 'admin') {
          updateData.adminReply = replyText;
          updateData.adminId = user?.uid;
          updateData.adminName = userProfile?.displayName || 'مدير النظام';
        } else {
          updateData.doctorReply = replyText;
          updateData.doctorId = user?.uid;
          updateData.doctorName = userProfile?.displayName || 'طبيب';
        }
      }

      await updateDoc(itemRef, {
        ...updateData,
        chatMessages: itemType === 'consultation' ? (updateData.chatMessages) : undefined // Ensure it's passed correctly
      });

      setAllItems(prev =>
        prev.map(item =>
          item.id === itemId
            ? { ...item, status: 'replied' as any, ...updateData }
            : item
        )
      );

      if (itemType !== 'consultation') {
        setReplyingTo(null);
      }
      setReplyText('');
      alert(isRTL ? "تم إرسال الرد" : "Reply sent");
    } catch (error) {
      console.error('Error submitting reply:', error);
    } finally {
      setSendingReply(false);
    }
  };

  const filteredItems = allItems.filter(item => {
    if (filter === 'all') return true;
    if (filter === 'feedback') return item.type === 'feedback';
    if (filter === 'consultation') return item.type === 'consultation';
    if (filter === 'new') return item.status === 'new' || item.status === 'pending';
    if (filter === 'urgent') return item.priority === 'urgent';
    return true;
  });

  return {
    allItems,
    loading,
    filter,
    setFilter,
    replyingTo,
    setReplyingTo,
    replyText,
    setReplyText,
    sendingReply,
    filteredItems,
    isRTL,
    userProfile,
    updateMessageStatus,
    updatePriority,
    deleteItem,
    closeConsultation,
    toggleConsultationLock,
    submitReply
  };
};
