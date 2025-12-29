// Firebase-compatible audit service stub
// TODO: Implement proper audit logging with Firebase

interface AuditLogEntry {
  event: string;
  user_id?: string;
  details?: Record<string, any>;
  ip_address?: string;
  user_agent?: string;
}

export const AuditService = {
  async log(entry: AuditLogEntry) {
    // For now, just log to console
    // In production, this should save to Firebase Firestore
    try {
      // Save to localStorage as fallback
      const auditLogs = JSON.parse(localStorage.getItem('audit_logs') || '[]');
      auditLogs.push({
        ...entry,
        timestamp: new Date().toISOString(),
        user_agent: navigator.userAgent
      });
      localStorage.setItem('audit_logs', JSON.stringify(auditLogs.slice(-100))); // Keep last 100 entries
    } catch (error) {
      }
  }
};