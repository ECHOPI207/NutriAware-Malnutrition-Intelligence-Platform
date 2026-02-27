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
 * All activities are stored in Firestore under: users/{uid}/activity_log
 */
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { auth } from '@/lib/firebase';

export type ActivityAction =
    // Navigation
    | 'page_view'
    // Auth
    | 'login'
    | 'logout'
    | 'profile_update'
    | 'password_change'
    // Tools
    | 'tool_use'
    | 'bmi_calculation'
    | 'ai_tool_use'
    | 'assessment_complete'
    | 'meal_plan_generated'
    // Survey
    | 'survey_started'
    | 'survey_submitted'
    | 'survey_result_viewed'
    // Content
    | 'article_read'
    | 'article_shared'
    | 'knowledge_viewed'
    // Downloads
    | 'file_download'
    | 'report_export'
    | 'backup_download'
    | 'data_export'
    // Communication
    | 'contact_form_sent'
    | 'consultation_requested'
    | 'consultation_replied'
    | 'message_sent';

export interface ActivityEntry {
    action: ActivityAction;
    category: 'auth' | 'navigation' | 'tool' | 'survey' | 'content' | 'download' | 'communication' | 'profile';
    details: string;
    metadata?: Record<string, any>;
}

/**
 * Log a user activity to Firestore.
 * Silently fails if no user is logged in or Firestore write fails.
 */
export async function logUserActivity(entry: ActivityEntry): Promise<void> {
    try {
        const user = auth.currentUser;
        if (!user) return; // Only log for authenticated users

        await addDoc(collection(db, 'activity_logs'), {
            user_id: user.uid,
            user_email: user.email || '',
            action_type: entry.action,
            category: entry.category,
            details: entry.details,
            metadata: entry.metadata || {},
            timestamp: serverTimestamp(),
            path: typeof window !== 'undefined' ? window.location.pathname : '',
            user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
        });
    } catch (error) {
        // Non-blocking — never interfere with user experience
        console.debug('[ActivityTracker] Failed to log:', error);
    }
}

// ============================================================================
// Convenience shorthand functions for common actions
// ============================================================================

/** Track page navigation */
export const trackPageView = (pageName: string, path?: string) =>
    logUserActivity({
        action: 'page_view',
        category: 'navigation',
        details: `زيارة صفحة: ${pageName}`,
        metadata: { pageName, path: path || window.location.pathname },
    });

/** Track AI tool usage */
export const trackToolUse = (toolName: string, result?: string) =>
    logUserActivity({
        action: 'ai_tool_use',
        category: 'tool',
        details: `استخدام أداة: ${toolName}`,
        metadata: { toolName, result: result?.substring(0, 200) },
    });

/** Track BMI calculation */
export const trackBMI = (bmiValue: number, category: string) =>
    logUserActivity({
        action: 'bmi_calculation',
        category: 'tool',
        details: `حساب مؤشر كتلة الجسم: ${bmiValue.toFixed(1)} (${category})`,
        metadata: { bmiValue, category },
    });

/** Track assessment completion */
export const trackAssessment = (assessmentType: string, score?: number) =>
    logUserActivity({
        action: 'assessment_complete',
        category: 'tool',
        details: `إكمال تقييم: ${assessmentType}`,
        metadata: { assessmentType, score },
    });

/** Track meal plan generation */
export const trackMealPlan = (planType: string) =>
    logUserActivity({
        action: 'meal_plan_generated',
        category: 'tool',
        details: `إنشاء خطة وجبات: ${planType}`,
        metadata: { planType },
    });

/** Track survey actions */
export const trackSurveyStart = () =>
    logUserActivity({
        action: 'survey_started',
        category: 'survey',
        details: 'بدء تعبئة الاستبيان',
    });

export const trackSurveySubmit = () =>
    logUserActivity({
        action: 'survey_submitted',
        category: 'survey',
        details: 'تم إرسال الاستبيان بنجاح',
    });

/** Track article reading */
export const trackArticleRead = (articleTitle: string, articleId?: string) =>
    logUserActivity({
        action: 'article_read',
        category: 'content',
        details: `قراءة مقال: ${articleTitle}`,
        metadata: { articleTitle, articleId },
    });

/** Track knowledge center access */
export const trackKnowledgeView = (sectionName: string) =>
    logUserActivity({
        action: 'knowledge_viewed',
        category: 'content',
        details: `مشاهدة محتوى: ${sectionName}`,
        metadata: { sectionName },
    });

/** Track file downloads */
export const trackDownload = (fileName: string, fileType?: string) =>
    logUserActivity({
        action: 'file_download',
        category: 'download',
        details: `تحميل ملف: ${fileName}`,
        metadata: { fileName, fileType },
    });

/** Track report exports */
export const trackReportExport = (reportType: string, format?: string) =>
    logUserActivity({
        action: 'report_export',
        category: 'download',
        details: `تصدير تقرير: ${reportType}`,
        metadata: { reportType, format },
    });

/** Track profile updates */
export const trackProfileUpdate = (fieldsChanged: string[]) =>
    logUserActivity({
        action: 'profile_update',
        category: 'profile',
        details: `تحديث الملف الشخصي: ${fieldsChanged.join(', ')}`,
        metadata: { fieldsChanged },
    });

/** Track contact form */
export const trackContactForm = (subject?: string) =>
    logUserActivity({
        action: 'contact_form_sent',
        category: 'communication',
        details: `إرسال نموذج اتصال${subject ? ': ' + subject : ''}`,
        metadata: { subject },
    });

/** Track consultation requests */
export const trackConsultation = (consultationType: string) =>
    logUserActivity({
        action: 'consultation_requested',
        category: 'communication',
        details: `طلب استشارة: ${consultationType}`,
        metadata: { consultationType },
    });
