import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface AuditLogParams {
    action: string;
    actorId: string;
    actorEmail?: string;
    targetId?: string;
    targetType?: 'user' | 'system' | 'content';
    details?: string;
    metadata?: Record<string, any>;
    level?: 'info' | 'warning' | 'critical';
}

export const auditService = {
    /**
     * Log an admin or system action to Firestore
     */
    async log(params: AuditLogParams) {
        try {
            await addDoc(collection(db, 'audit_logs'), {
                ...params,
                timestamp: serverTimestamp(),
                userAgent: navigator.userAgent
            });
            console.log(`[Audit] ${params.action} logged.`);
        } catch (error) {
            console.error('Failed to write audit log:', error);
            // Fail silently to not block the main action, but in high compliance apps this might need retrying
        }
    }
};
