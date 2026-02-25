import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView as trackFirebaseVisit } from '@/services/visitorTracking';
import { trackPageView as trackUserActivity } from '@/services/activityTracker';

// Map routes to Arabic page names for activity log
const PAGE_NAMES: Record<string, string> = {
    '/': 'الرئيسية',
    '/about': 'عن نيوتري أوير',
    '/services': 'الخدمات',
    '/ai-tools': 'أدوات الذكاء الاصطناعي',
    '/assessment': 'التقييم الصحي',
    '/knowledge': 'مركز المعرفة',
    '/articles': 'المقالات',
    '/contact': 'اتصل بنا',
    '/profile': 'الملف الشخصي',
    '/dashboard': 'لوحة التحكم',
    '/project-evaluation': 'استبيان تقييم المشروع',
    '/medical-consultation': 'الاستشارة الطبية',
    '/new-consultation': 'استشارة جديدة',
    '/admin': 'لوحة تحكم المدير',
    '/admin/users': 'إدارة المستخدمين',
    '/admin/survey': 'إدارة الاستبيان',
    '/admin/survey-results': 'نتائج الاستبيان',
    '/admin/content': 'إدارة المحتوى',
    '/admin/security': 'إعدادات الأمان',
    '/admin/backup': 'النسخ الاحتياطي',
    '/admin/activity': 'مراقبة النشاط',
    '/doctor': 'لوحة تحكم الطبيب',
};

export const usePageTracking = () => {
    const location = useLocation();

    useEffect(() => {
        const doTrack = async () => {
            try {
                const isMobile = window.innerWidth < 768;
                const deviceType = isMobile ? 'mobile' : 'desktop';

                if (import.meta.env.DEV) {
                    console.log('Page view:', { path: location.pathname, deviceType });
                }

                // Save to localStorage for basic tracking
                const pageViews = JSON.parse(localStorage.getItem('page_views') || '[]');
                pageViews.push({
                    path: location.pathname,
                    device_type: deviceType,
                    timestamp: new Date().toISOString()
                });
                localStorage.setItem('page_views', JSON.stringify(pageViews.slice(-100)));

                // Track in Firebase for admin analytics (visitor counter)
                trackFirebaseVisit();

                // Track in user activity log (comprehensive)
                const pageName = PAGE_NAMES[location.pathname] || location.pathname;
                trackUserActivity(pageName, location.pathname);
            } catch (error) {
                if (import.meta.env.DEV) {
                    console.error('Error tracking page view:', error);
                }
            }
        };

        doTrack();
    }, [location]);
};