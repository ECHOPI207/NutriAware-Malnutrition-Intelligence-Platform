import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// Firebase page tracking stub - TODO: Implement with Firebase Analytics

export const usePageTracking = () => {
    const location = useLocation();

    useEffect(() => {
        const trackPageView = async () => {
            try {
                const isMobile = window.innerWidth < 768;
                const deviceType = isMobile ? 'mobile' : 'desktop';

                // For now, just log to console
                // In production, this should use Firebase Analytics
                // For now, only log in development
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
                localStorage.setItem('page_views', JSON.stringify(pageViews.slice(-100))); // Keep last 100 views
            } catch (error) {
                // Silently fail for analytics to not disturb user experience
                if (import.meta.env.DEV) {
                    console.error('Error tracking page view:', error);
                }
            }
        };

        trackPageView();
    }, [location]);
};