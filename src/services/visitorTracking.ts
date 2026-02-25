/**
 * Visitor Tracking Service
 * Tracks daily page views using Firestore with location data.
 * 
 * Structure:
 *   daily_visits/{YYYY-MM-DD} → { count, date, lastUpdated, locations: { "Cairo, Egypt": 5, ... } }
 *   visitor_logs/{auto-id} → { date, city, country, region, timestamp }
 * 
 * Each visitor increments the counter once per session (using sessionStorage).
 */
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc, increment, collection, query, orderBy, limit, getDocs, Timestamp, addDoc } from 'firebase/firestore';

const SESSION_KEY = 'nutriaware_visit_tracked';

/**
 * Get today's date as YYYY-MM-DD string
 */
function getTodayKey(): string {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

/**
 * Fetch visitor location from our own Vercel serverless function (/api/geo).
 * Uses Vercel's built-in geo headers — no CORS, no rate limits, 100% reliable.
 */
async function getVisitorLocation(): Promise<{ city: string; country: string; region: string }> {
    try {
        const response = await fetch('/api/geo', { signal: AbortSignal.timeout(3000) });
        if (!response.ok) throw new Error('Geo API failed');
        const data = await response.json();
        return {
            city: data.city || 'Unknown',
            country: data.country || 'Unknown',
            region: data.region || '',
        };
    } catch {
        return { city: 'Unknown', country: 'Unknown', region: '' };
    }
}

/**
 * Track a page view for today with location. Only counts once per session.
 */
export async function trackPageView(): Promise<void> {
    try {
        const todayKey = getTodayKey();

        // DEV/TESTING: Re-enabled "already tracked" session cache
        const alreadyTracked = sessionStorage.getItem(SESSION_KEY);
        if (alreadyTracked === todayKey) return;

        // Get location (non-blocking)
        const location = await getVisitorLocation();
        const locationLabel = location.city !== 'Unknown'
            ? `${location.city}, ${location.country}`
            : location.country;

        const dayRef = doc(db, 'daily_visits', todayKey);
        const daySnap = await getDoc(dayRef);

        if (daySnap.exists()) {
            // Increment count and location counter
            await setDoc(dayRef, {
                count: increment(1),
                lastUpdated: Timestamp.now(),
                [`locations.${locationLabel}`]: increment(1),
            }, { merge: true });
        } else {
            await setDoc(dayRef, {
                count: 1,
                date: todayKey,
                lastUpdated: Timestamp.now(),
                locations: { [locationLabel]: 1 },
            });
        }

        // Also log individual visit for detailed analytics
        await addDoc(collection(db, 'visitor_logs'), {
            date: todayKey,
            city: location.city,
            country: location.country,
            region: location.region,
            locationLabel,
            timestamp: Timestamp.now(),
            userAgent: navigator.userAgent,
            screenWidth: window.innerWidth,
            path: window.location.pathname,
        }).catch(() => { }); // Don't fail if this log fails

        // Mark as tracked for this session
        sessionStorage.setItem(SESSION_KEY, todayKey);
    } catch (error) {
        console.error('Failed to track page view:', error);
    }
}

export interface DailyVisitData {
    date: string;       // YYYY-MM-DD
    count: number;
    label: string;      // formatted for display, e.g. "18 فبراير"
    locations?: Record<string, number>; // "Cairo, Egypt" → count
}

export interface VisitorLocation {
    location: string;
    count: number;
}

/**
 * Get daily visit counts for the past N days.
 * Returns data sorted oldest → newest.
 * Replaces missing days with 0 counts.
 */
export async function getDailyVisits(days: number = 14): Promise<DailyVisitData[]> {
    const arabicMonths = [
        'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
        'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
    ];

    const resultsMap = new Map<string, DailyVisitData>();
    const now = new Date();

    // Initialize all past N days with 0 counts
    for (let i = 0; i < days; i++) {
        const d = new Date(now);
        d.setDate(d.getDate() - i);
        const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
        resultsMap.set(key, {
            date: key,
            count: 0,
            label: `${d.getDate()} ${arabicMonths[d.getMonth()]}`,
            locations: {},
        });
    }

    try {
        const visitsRef = collection(db, 'daily_visits');
        const q = query(visitsRef, orderBy('date', 'desc'), limit(days));
        const snapshot = await getDocs(q);

        snapshot.docs.forEach(d => {
            const data = d.data();
            const dateStr = data.date || d.id;
            if (resultsMap.has(dateStr)) {
                const existing = resultsMap.get(dateStr)!;
                existing.count = data.count || 0;
                existing.locations = data.locations || {};
            } else {
                // If it's an older date that somehow slipped in, or just to be safe
                const [, month, day] = dateStr.split('-');
                const monthIndex = parseInt(month, 10) - 1;
                resultsMap.set(dateStr, {
                    date: dateStr,
                    count: data.count || 0,
                    label: `${parseInt(day, 10)} ${arabicMonths[monthIndex]}`,
                    locations: data.locations || {},
                });
            }
        });
    } catch (error) {
        console.error('Failed to get daily visits from Firestore:', error);
    }

    // Sort by date ascending (oldest to newest)
    return Array.from(resultsMap.values()).sort((a, b) => a.date.localeCompare(b.date)).slice(-days);
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

/**
 * Get aggregated location data across all days (or for specific days).
 * Returns sorted by count descending.
 */
export function aggregateLocations(dailyData: DailyVisitData[]): VisitorLocation[] {
    const locationMap: Record<string, number> = {};

    for (const day of dailyData) {
        if (day.locations) {
            for (const [loc, count] of Object.entries(day.locations)) {
                locationMap[loc] = (locationMap[loc] || 0) + (count as number);
            }
        }
    }

    return Object.entries(locationMap)
        .map(([location, count]) => ({ location, count }))
        .sort((a, b) => b.count - a.count);
}
