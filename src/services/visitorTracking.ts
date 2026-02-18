/**
 * Visitor Tracking Service
 * Tracks daily page views using Firestore.
 * 
 * Structure: daily_visits/{YYYY-MM-DD} → { count, date, lastUpdated }
 * Each visitor increments the counter once per session (using sessionStorage).
 */
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc, increment, collection, query, orderBy, limit, getDocs, Timestamp } from 'firebase/firestore';

const SESSION_KEY = 'nutriaware_visit_tracked';

/**
 * Get today's date as YYYY-MM-DD string
 */
function getTodayKey(): string {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

/**
 * Track a page view for today. Only counts once per browser session.
 */
export async function trackPageView(): Promise<void> {
    try {
        const todayKey = getTodayKey();

        // Only track once per session
        const alreadyTracked = sessionStorage.getItem(SESSION_KEY);
        if (alreadyTracked === todayKey) return;

        const dayRef = doc(db, 'daily_visits', todayKey);
        const daySnap = await getDoc(dayRef);

        if (daySnap.exists()) {
            // Increment existing counter
            await setDoc(dayRef, {
                count: increment(1),
                lastUpdated: Timestamp.now(),
            }, { merge: true });
        } else {
            // Create new day document
            await setDoc(dayRef, {
                count: 1,
                date: todayKey,
                lastUpdated: Timestamp.now(),
            });
        }

        // Mark as tracked for this session
        sessionStorage.setItem(SESSION_KEY, todayKey);
    } catch (error) {
        // Silently fail — don't break the app for analytics
        console.error('Failed to track page view:', error);
    }
}

export interface DailyVisitData {
    date: string;       // YYYY-MM-DD
    count: number;
    label: string;      // formatted for display, e.g. "18 فبراير"
}

/**
 * Get daily visit counts for the past N days.
 * Returns data sorted oldest → newest.
 */
export async function getDailyVisits(days: number = 30): Promise<DailyVisitData[]> {
    try {
        const visitsRef = collection(db, 'daily_visits');
        const q = query(visitsRef, orderBy('date', 'desc'), limit(days));
        const snapshot = await getDocs(q);

        const arabicMonths = [
            'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
            'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
        ];

        const results: DailyVisitData[] = snapshot.docs.map(doc => {
            const data = doc.data();
            const dateStr = data.date || doc.id;
            const [, month, day] = dateStr.split('-');
            const monthIndex = parseInt(month, 10) - 1;
            return {
                date: dateStr,
                count: data.count || 0,
                label: `${parseInt(day, 10)} ${arabicMonths[monthIndex]}`,
            };
        });

        // Return oldest first for charts
        return results.reverse();
    } catch (error) {
        console.error('Failed to get daily visits:', error);
        return [];
    }
}

/**
 * Get today's visit count.
 */
export async function getTodayVisits(): Promise<number> {
    try {
        const todayKey = getTodayKey();
        const dayRef = doc(db, 'daily_visits', todayKey);
        const daySnap = await getDoc(dayRef);
        return daySnap.exists() ? (daySnap.data().count || 0) : 0;
    } catch {
        return 0;
    }
}
