/**
 * Comprehensive User Activity Tracker
 * 
 * Tracks every user action on the platform:
 * - Page navigation
 * - Tool usage (AI tools, Assessment, BMI calculator)
 * - Survey submissions and results
 * - Downloads (reports, exports, backups)  
 * - Profile updates
 * - Article reading
 * - Medical consultations
 * - Contact form submissions
 * 
 * All activities are stored in Firestore under: activity_logs collection
 * Uses IndexedDB for offline queue with automatic sync
 */
import { auth, db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, Timestamp, getDoc, doc } from 'firebase/firestore';
import { activityQueueDB } from './activityQueueDB';

export type ActivityCategory = 'auth' | 'navigation' | 'assessment' | 'ai_tool' | 'profile' | 'protocol' | 'notification' | 'admin' | 'tool' | 'survey' | 'content' | 'download' | 'communication';

export type ActivityType = 
  | 'tool_access'
  | 'tool_exit'
  | 'result_generation'
  | 'profile_change'
  | 'settings_change'
  | 'data_deletion'
  | 'avatar_upload'
  | 'avatar_delete'
  | 'page_viewed'
  | 'ai_tool_opened'
  | 'bmi_calculation'
  | 'assessment_completed'
  | 'assessment_started'
  | 'meal_plan_generated'
  | 'blog_article_read'
  | 'knowledge_viewed'
  | 'resource_downloaded'
  | 'report_export'
  | 'profile_updated'
  | 'contact_form_sent'
  | 'consultation_requested';

export interface ActivityEntry {
    event_type: string;
    event_category: ActivityCategory;
    event_metadata?: Record<string, any>;
    duration_ms?: number;
}

export interface ActivityLog {
  id?: string;
  userId: string;
  userName?: string; // Added field
  userRole?: string; // Added field
  activityType: ActivityType;
  timestamp: Timestamp | ReturnType<typeof serverTimestamp>;
  metadata: ActivityMetadata;
  sessionId?: string;
  ipAddress?: string;
  userAgent?: string;
}

export interface ActivityMetadata {
  toolName?: string;
  duration?: number;
  resultType?: string;
  resultSummary?: any;
  changes?: Array<{
    field: string;
    oldValue: any;
    newValue: any;
  }>;
  dataType?: string;
  dataId?: string;
  performedBy?: string;
  [key: string]: any;
}

export interface ProfileChanges {
  field: string;
  oldValue: any;
  newValue: any;
}

export interface SettingsChanges {
  setting: string;
  oldValue: any;
  newValue: any;
}

// Session tracking
let currentSessionId: string | null = null;
const toolAccessTimes = new Map<string, number>();

// Sync state
let isSyncing = false;
let syncInterval: NodeJS.Timeout | null = null;
const SYNC_INTERVAL_MS = 30000; // Sync every 30 seconds
const MAX_RETRY_COUNT = 5;

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Generate or retrieve session ID
 */
function getSessionId(): string {
  if (!currentSessionId) {
    currentSessionId = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`;
  }
  return currentSessionId;
}

/**
 * Check if online
 */
function isOnline(): boolean {
  return typeof navigator !== 'undefined' ? navigator.onLine : true;
}

/**
 * Sanitize sensitive data from metadata
 */
function sanitizeMetadata(metadata: any): any {
  if (!metadata || typeof metadata !== 'object') return metadata;
  
  const sanitized = { ...metadata };
  const sensitiveKeys = ['password', 'token', 'secret', 'apiKey', 'creditCard', 'ssn', 'nationalId'];
  
  for (const key of Object.keys(sanitized)) {
    const lowerKey = key.toLowerCase();
    if (sensitiveKeys.some(sensitive => lowerKey.includes(sensitive))) {
      sanitized[key] = '[REDACTED]';
    }
  }
  
  return sanitized;
}

/**
 * Write activity directly to Firestore
 */
async function writeActivityToFirestore(activity: Omit<ActivityLog, 'timestamp'>): Promise<void> {
  try {
    const user = auth.currentUser;
    if (!user) {
      console.debug('[ActivityTracker] No authenticated user, skipping activity log');
      return;
    }

    // Try to get extended user details from Firestore if possible
    let userRole = 'user';
    let userName = user.displayName || 'Unknown';

    try {
        const userDocRef = doc(db, 'users', user.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            userRole = userData.role || 'user';
            userName = userData.displayName || userName;
        }
    } catch (e) {
        console.warn('[ActivityTracker] Failed to fetch user details for log:', e);
    }

    const activityData = {
      ...activity,
      userId: user.uid,
      userName: userName,
      userEmail: user.email,
      userRole: userRole,
      timestamp: serverTimestamp(),
      sessionId: getSessionId(),
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
    };

    console.debug('[ActivityTracker] Writing activity to Firestore:', activityData.activityType);
    
    await addDoc(collection(db, 'activity_logs'), activityData);
    
    console.debug('[ActivityTracker] Activity logged successfully:', activityData.activityType);
  } catch (error) {
    console.error('[ActivityTracker] Failed to write to Firestore:', error);
    throw error;
  }
}

/**
 * Log activity with retry and offline queue support
 */
async function logActivity(activity: Omit<ActivityLog, 'timestamp' | 'userId'>): Promise<void> {
  try {
    const user = auth.currentUser;
    if (!user) {
      console.debug('[ActivityTracker] No authenticated user, skipping activity log');
      return;
    }

    const fullActivity: Omit<ActivityLog, 'timestamp'> = {
      ...activity,
      userId: user.uid,
      metadata: sanitizeMetadata(activity.metadata),
    };

    // Try to write to Firestore if online
    if (isOnline()) {
      try {
        await writeActivityToFirestore(fullActivity);
        return;
      } catch (error) {
        console.warn('[ActivityTracker] Firestore write failed, queuing locally:', error);
      }
    }
    
    // Queue locally if offline or write failed
    try {
      await activityQueueDB.add(fullActivity);
      console.debug('[ActivityTracker] Activity queued in IndexedDB:', fullActivity.activityType);
    } catch (dbError) {
      console.error('[ActivityTracker] Failed to queue activity in IndexedDB:', dbError);
      // Last resort: try localStorage as fallback
      try {
        const fallbackKey = 'nutriaware_activity_fallback';
        const existing = localStorage.getItem(fallbackKey);
        const activities = existing ? JSON.parse(existing) : [];
        activities.push({ activity: fullActivity, timestamp: Date.now() });
        localStorage.setItem(fallbackKey, JSON.stringify(activities.slice(-50))); // Keep last 50
      } catch (lsError) {
        console.error('[ActivityTracker] All storage methods failed:', lsError);
      }
    }
  } catch (error) {
    // Non-blocking — never interfere with user experience
    console.error('[ActivityTracker] Failed to log activity:', error);
  }
}

/**
 * Sync pending activities from IndexedDB to Firestore
 */
export async function syncPendingActivities(): Promise<void> {
  // Prevent concurrent syncs
  if (isSyncing) {
    console.debug('[ActivityTracker] Sync already in progress, skipping');
    return;
  }

  // Check if online
  if (!isOnline()) {
    console.debug('[ActivityTracker] Offline, skipping sync');
    return;
  }

  isSyncing = true;
  
  try {
    const pending = await activityQueueDB.getAll();
    
    if (pending.length === 0) {
      console.debug('[ActivityTracker] No pending activities to sync');
      return;
    }

    console.debug(`[ActivityTracker] Syncing ${pending.length} pending activities`);
    
    let syncedCount = 0;
    let failedCount = 0;
    
    for (const queuedActivity of pending) {
      try {
        // Skip if retry count exceeded
        if (queuedActivity.retryCount >= MAX_RETRY_COUNT) {
          console.warn(`[ActivityTracker] Max retries exceeded for activity ${queuedActivity.id}, removing`);
          await activityQueueDB.remove(queuedActivity.id);
          failedCount++;
          continue;
        }

        // Try to sync
        await writeActivityToFirestore(queuedActivity.activity);
        await activityQueueDB.remove(queuedActivity.id);
        syncedCount++;
        console.debug(`[ActivityTracker] Synced activity ${queuedActivity.id}`);
      } catch (error) {
        console.error(`[ActivityTracker] Failed to sync activity ${queuedActivity.id}:`, error);
        
        // Update retry count
        try {
          await activityQueueDB.updateRetryCount(queuedActivity.id, queuedActivity.retryCount + 1);
        } catch (updateError) {
          console.error('[ActivityTracker] Failed to update retry count:', updateError);
        }
        
        failedCount++;
        
        // Stop syncing on network errors to preserve order
        if (!isOnline()) {
          console.debug('[ActivityTracker] Lost connection during sync, stopping');
          break;
        }
      }
    }

    console.debug(`[ActivityTracker] Sync complete: ${syncedCount} synced, ${failedCount} failed`);
    
    // Also check localStorage fallback (if available)
    if (typeof localStorage !== 'undefined') {
      try {
        const fallbackKey = 'nutriaware_activity_fallback';
        const fallback = localStorage.getItem(fallbackKey);
        if (fallback) {
          const activities = JSON.parse(fallback);
          for (const item of activities) {
            try {
              await writeActivityToFirestore(item.activity);
            } catch (error) {
              console.error('[ActivityTracker] Failed to sync fallback activity:', error);
            }
          }
          localStorage.removeItem(fallbackKey);
        }
      } catch (error) {
        console.error('[ActivityTracker] Error syncing fallback activities:', error);
      }
    }
  } catch (error) {
    console.error('[ActivityTracker] Error during sync:', error);
  } finally {
    isSyncing = false;
  }
}

/**
 * Start automatic sync interval
 */
function startAutoSync(): void {
  if (syncInterval) {
    return;
  }
  
  console.debug('[ActivityTracker] Starting auto-sync');
  
  // Initial sync
  syncPendingActivities().catch(error => {
    console.error('[ActivityTracker] Initial sync failed:', error);
  });
  
  // Periodic sync
  syncInterval = setInterval(() => {
    syncPendingActivities().catch(error => {
      console.error('[ActivityTracker] Periodic sync failed:', error);
    });
  }, SYNC_INTERVAL_MS);
}

/**
 * Stop automatic sync interval
 */
function stopAutoSync(): void {
  if (syncInterval) {
    clearInterval(syncInterval);
    syncInterval = null;
    console.debug('[ActivityTracker] Auto-sync stopped');
  }
}

// ============================================================================
// Core Tracking Functions (as per design document)
// ============================================================================

/**
 * Track tool access (entry)
 */
export async function trackToolAccess(toolName: string): Promise<void> {
  try {
    const accessTime = Date.now();
    toolAccessTimes.set(toolName, accessTime);
    
    await logActivity({
      activityType: 'tool_access',
      metadata: {
        toolName,
        details: `دخول إلى أداة: ${toolName}`,
      },
    });
  } catch (error) {
    // Never throw - tracking failures should not disrupt user experience
    console.error('[ActivityTracker] Failed to track tool access:', error);
  }
}

/**
 * Track tool exit with duration calculation
 */
export async function trackToolExit(toolName: string): Promise<void> {
  try {
    const exitTime = Date.now();
    const accessTime = toolAccessTimes.get(toolName);
    const duration = accessTime ? exitTime - accessTime : 0;
    
    // Clean up access time
    toolAccessTimes.delete(toolName);
    
    await logActivity({
      activityType: 'tool_exit',
      metadata: {
        toolName,
        duration,
        details: `خروج من أداة: ${toolName} (المدة: ${Math.round(duration / 1000)}s)`,
      },
    });
  } catch (error) {
    // Never throw - tracking failures should not disrupt user experience
    console.error('[ActivityTracker] Failed to track tool exit:', error);
  }
}

/**
 * Track result generation from tools
 */
export async function trackResultGeneration(
  toolName: string,
  resultType: string,
  resultSummary?: any
): Promise<void> {
  try {
    await logActivity({
      activityType: 'result_generation',
      metadata: {
        toolName,
        resultType,
        resultSummary: sanitizeMetadata(resultSummary),
        details: `توليد نتيجة: ${resultType} من ${toolName}`,
      },
    });
  } catch (error) {
    // Never throw - tracking failures should not disrupt user experience
    console.error('[ActivityTracker] Failed to track result generation:', error);
  }
}

/**
 * Track profile changes
 */
export async function trackProfileChange(changes: ProfileChanges[]): Promise<void> {
  try {
    await logActivity({
      activityType: 'profile_change',
      metadata: {
        changes: changes.map(c => ({
          field: c.field,
          oldValue: sanitizeMetadata(c.oldValue),
          newValue: sanitizeMetadata(c.newValue),
        })),
        details: `تعديل الملف الشخصي: ${changes.map(c => c.field).join(', ')}`,
      },
    });
  } catch (error) {
    // Never throw - tracking failures should not disrupt user experience
    console.error('[ActivityTracker] Failed to track profile change:', error);
  }
}

/**
 * Track settings changes
 */
export async function trackSettingsChange(changes: SettingsChanges[]): Promise<void> {
  try {
    await logActivity({
      activityType: 'settings_change',
      metadata: {
        changes: changes.map(c => ({
          setting: c.setting,
          oldValue: sanitizeMetadata(c.oldValue),
          newValue: sanitizeMetadata(c.newValue),
        })),
        details: `تعديل الإعدادات: ${changes.map(c => c.setting).join(', ')}`,
      },
    });
  } catch (error) {
    // Never throw - tracking failures should not disrupt user experience
    console.error('[ActivityTracker] Failed to track settings change:', error);
  }
}

/**
 * Track data deletion
 */
export async function trackDataDeletion(
  dataType: string,
  dataId: string,
  performedBy?: string
): Promise<void> {
  try {
    await logActivity({
      activityType: 'data_deletion',
      metadata: {
        dataType,
        dataId,
        performedBy,
        details: `حذف بيانات: ${dataType} (${dataId})`,
      },
    });
  } catch (error) {
    // Never throw - tracking failures should not disrupt user experience
    console.error('[ActivityTracker] Failed to track data deletion:', error);
  }
}

/**
 * Track avatar upload
 */
export async function trackAvatarUpload(performedBy?: string): Promise<void> {
  try {
    await logActivity({
      activityType: 'avatar_upload',
      metadata: {
        performedBy,
        details: performedBy ? `تحديث الصورة الرمزية بواسطة: ${performedBy}` : 'تحديث الصورة الرمزية',
      },
    });
  } catch (error) {
    // Never throw - tracking failures should not disrupt user experience
    console.error('[ActivityTracker] Failed to track avatar upload:', error);
  }
}

/**
 * Track avatar deletion
 */
export async function trackAvatarDelete(performedBy?: string): Promise<void> {
  try {
    await logActivity({
      activityType: 'avatar_delete',
      metadata: {
        performedBy,
        details: performedBy ? `حذف الصورة الرمزية بواسطة: ${performedBy}` : 'حذف الصورة الرمزية',
      },
    });
  } catch (error) {
    // Never throw - tracking failures should not disrupt user experience
    console.error('[ActivityTracker] Failed to track avatar delete:', error);
  }
}

// ============================================================================
// Auto-sync on page load and before unload
// ============================================================================

if (typeof window !== 'undefined') {
  // Start auto-sync on page load
  window.addEventListener('load', () => {
    startAutoSync();
  });

  // Sync before page unload
  window.addEventListener('beforeunload', (event) => {
    // Use synchronous approach for beforeunload
    // Note: Modern browsers may not allow async operations here
    try {
      // Attempt immediate sync using sendBeacon if available
      if (navigator.sendBeacon) {
        // Get pending activities synchronously if possible
        activityQueueDB.getAll().then(pending => {
          if (pending.length > 0) {
            console.debug(`[ActivityTracker] Page unloading with ${pending.length} pending activities`);
            
            // Try to send via beacon API (more reliable for page unload)
            const user = auth.currentUser;
            if (user) {
              // Prepare activities for beacon
              const activitiesData = pending.map(qa => ({
                ...qa.activity,
                timestamp: new Date().toISOString(),
                sessionId: getSessionId(),
                userAgent: navigator.userAgent,
              }));
              
              // Note: In production, you'd send to a dedicated endpoint
              // For now, we'll just trigger the sync
              syncPendingActivities().catch(err => {
                console.error('[ActivityTracker] Sync failed on unload:', err);
              });
            }
          }
        }).catch(error => {
          console.error('[ActivityTracker] Error checking pending count on unload:', error);
        });
      } else {
        // Fallback: trigger sync (best effort)
        syncPendingActivities().catch(err => {
          console.error('[ActivityTracker] Sync failed on unload:', err);
        });
      }
    } catch (error) {
      console.error('[ActivityTracker] Error in beforeunload handler:', error);
    }
  });

  // pagehide is more reliable than beforeunload in modern browsers
  window.addEventListener('pagehide', (event) => {
    try {
      console.debug('[ActivityTracker] Page hiding, attempting final sync');
      
      // Trigger sync one last time
      // This is best-effort as the page may close before completion
      syncPendingActivities().catch(err => {
        console.error('[ActivityTracker] Sync failed on pagehide:', err);
      });
    } catch (error) {
      console.error('[ActivityTracker] Error in pagehide handler:', error);
    }
  });

  // Sync when coming back online
  window.addEventListener('online', () => {
    console.debug('[ActivityTracker] Connection restored, syncing pending activities');
    syncPendingActivities().catch(error => {
      console.error('[ActivityTracker] Failed to sync on reconnect:', error);
    });
  });

  // Stop sync when going offline
  window.addEventListener('offline', () => {
    console.debug('[ActivityTracker] Connection lost');
  });

  // Sync when page becomes visible again
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden && isOnline()) {
      console.debug('[ActivityTracker] Page visible, syncing pending activities');
      syncPendingActivities().catch(error => {
        console.error('[ActivityTracker] Failed to sync on visibility change:', error);
      });
    }
  });
}

// ============================================================================
// Legacy API - Backward compatibility with existing code
// ============================================================================

/**
 * Log a user activity to Firestore.
 * Silently fails if no user is logged in or Firestore write fails.
 * 
 * @deprecated Use specific tracking functions instead (trackToolAccess, trackResultGeneration, etc.)
 */
export async function logUserActivity(entry: ActivityEntry): Promise<void> {
    try {
        const user = auth.currentUser;
        if (!user) return; // Only log for authenticated users

        // Map old format to new format
        await logActivity({
            activityType: entry.event_type as ActivityType,
            metadata: {
              ...entry.event_metadata,
              path: typeof window !== 'undefined' ? window.location.pathname : '',
              duration: entry.duration_ms,
            },
        });
    } catch (error) {
        // Non-blocking — never interfere with user experience
        console.debug('[ActivityTracker] Failed to log activity:', error);
    }
}

/** Track page navigation */
export const trackPageView = (pageName: string, path?: string) => {
  try {
    return logUserActivity({
        event_type: 'page_viewed',
        event_category: 'navigation',
        event_metadata: { pageName, details: `زيارة صفحة: ${pageName}`, path: path || window.location.pathname },
    });
  } catch (error) {
    console.error('[ActivityTracker] Failed to track page view:', error);
  }
};

/** Track AI tool usage */
export const trackToolUse = (toolName: string, result?: string) => {
  try {
    return logUserActivity({
        event_type: 'ai_tool_opened',
        event_category: 'ai_tool',
        event_metadata: { toolName, details: `استخدام أداة: ${toolName}`, result: result?.substring(0, 200) },
    });
  } catch (error) {
    console.error('[ActivityTracker] Failed to track tool use:', error);
  }
};

/** Track BMI calculation */
export const trackBMI = (bmiValue: number, category: string) => {
  try {
    return logUserActivity({
        event_type: 'bmi_calculation',
        event_category: 'tool',
        event_metadata: { bmiValue, category, details: `حساب مؤشر كتلة الجسم: ${bmiValue.toFixed(1)} (${category})` },
    });
  } catch (error) {
    console.error('[ActivityTracker] Failed to track BMI:', error);
  }
};

/** Track assessment completion */
export const trackAssessment = (assessmentType: string, score?: number) => {
  try {
    return logUserActivity({
        event_type: 'assessment_completed',
        event_category: 'assessment',
        event_metadata: { assessmentType, score, details: `إكمال تقييم: ${assessmentType}` },
    });
  } catch (error) {
    console.error('[ActivityTracker] Failed to track assessment:', error);
  }
};

/** Track meal plan generation */
export const trackMealPlan = (planType: string) => {
  try {
    return logUserActivity({
        event_type: 'meal_plan_generated',
        event_category: 'tool',
        event_metadata: { planType, details: `إنشاء خطة وجبات: ${planType}` },
    });
  } catch (error) {
    console.error('[ActivityTracker] Failed to track meal plan:', error);
  }
};

/** Track survey actions */
export const trackSurveyStart = () => {
  try {
    return logUserActivity({
        event_type: 'assessment_started',
        event_category: 'assessment',
        event_metadata: { details: 'بدء تعبئة الاستبيان' },
    });
  } catch (error) {
    console.error('[ActivityTracker] Failed to track survey start:', error);
  }
};

export const trackSurveySubmit = () => {
  try {
    return logUserActivity({
        event_type: 'assessment_completed',
        event_category: 'assessment',
        event_metadata: { details: 'تم إرسال الاستبيان بنجاح' },
    });
  } catch (error) {
    console.error('[ActivityTracker] Failed to track survey submit:', error);
  }
};

/** Track article reading */
export const trackArticleRead = (articleTitle: string, articleId?: string) => {
  try {
    return logUserActivity({
        event_type: 'blog_article_read',
        event_category: 'content',
        event_metadata: { articleTitle, articleId, details: `قراءة مقال: ${articleTitle}` },
    });
  } catch (error) {
    console.error('[ActivityTracker] Failed to track article read:', error);
  }
};

/** Track knowledge center access */
export const trackKnowledgeView = (sectionName: string) => {
  try {
    return logUserActivity({
        event_type: 'knowledge_viewed',
        event_category: 'content',
        event_metadata: { sectionName, details: `مشاهدة محتوى: ${sectionName}` },
    });
  } catch (error) {
    console.error('[ActivityTracker] Failed to track knowledge view:', error);
  }
};

/** Track file downloads */
export const trackDownload = (fileName: string, fileType?: string) => {
  try {
    return logUserActivity({
        event_type: 'resource_downloaded',
        event_category: 'download',
        event_metadata: { fileName, fileType, details: `تحميل ملف: ${fileName}` },
    });
  } catch (error) {
    console.error('[ActivityTracker] Failed to track download:', error);
  }
};

/** Track report exports */
export const trackReportExport = (reportType: string, format?: string) => {
  try {
    return logUserActivity({
        event_type: 'report_export',
        event_category: 'download',
        event_metadata: { reportType, format, details: `تصدير تقرير: ${reportType}` },
    });
  } catch (error) {
    console.error('[ActivityTracker] Failed to track report export:', error);
  }
};

/** Track profile updates */
export const trackProfileUpdate = (fieldsChanged: string[]) => {
  try {
    return logUserActivity({
        event_type: 'profile_updated',
        event_category: 'profile',
        event_metadata: { fieldsChanged, details: `تحديث الملف الشخصي: ${fieldsChanged.join(', ')}` },
    });
  } catch (error) {
    console.error('[ActivityTracker] Failed to track profile update:', error);
  }
};

/** Track contact form */
export const trackContactForm = (subject?: string) => {
  try {
    return logUserActivity({
        event_type: 'contact_form_sent',
        event_category: 'communication',
        event_metadata: { subject, details: `إرسال نموذج اتصال${subject ? ': ' + subject : ''}` },
    });
  } catch (error) {
    console.error('[ActivityTracker] Failed to track contact form:', error);
  }
};

/** Track consultation requests */
export const trackConsultation = (consultationType: string) => {
  try {
    return logUserActivity({
        event_type: 'consultation_requested',
        event_category: 'communication',
        event_metadata: { consultationType, details: `طلب استشارة: ${consultationType}` },
    });
  } catch (error) {
    console.error('[ActivityTracker] Failed to track consultation:', error);
  }
};
