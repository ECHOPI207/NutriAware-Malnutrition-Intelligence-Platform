import React, { useState, useEffect } from 'react';
import { useAuth } from '@/features/auth/firebase-auth-context';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { Monitor, ShieldAlert, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

export const SessionManager: React.FC = () => {
    const { user } = useAuth();
    const { i18n } = useTranslation();
    const isRTL = i18n.language === 'ar';
    const [sessions, setSessions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [revoking, setRevoking] = useState(false);

    const fetchSessions = async () => {
        if (!user) return;
        setLoading(true);
        try {
            const sessionsRef = collection(db, 'users', user.uid, 'active_sessions');
            const q = query(sessionsRef, where('status', '==', 'active'), orderBy('createdAt', 'desc'));
            const snapshot = await getDocs(q);
            setSessions(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        } catch (error) {
            console.error('Failed to fetch sessions:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSessions();
    }, [user]);

    const handleRevokeAll = async () => {
        if (!confirm(isRTL ? 'هل أنت متأكد من رغبتك في تسجيل الخروج من جميع الأجهزة؟' : 'Are you sure you want to sign out of all devices?')) return;

        setRevoking(true);
        try {
            const res = await fetch('/api/auth/revokeAll', { method: 'POST' });
            if (res.ok) {
                toast.success(isRTL ? 'تم إنهاء جميع الجلسات بنجاح. يرجى تسجيل الدخول مجدداً.' : 'All sessions revoked. Please log in again.');
                setTimeout(() => window.location.href = '/login', 2000);
            } else {
                throw new Error('Revoke failed');
            }
        } catch (error) {
            toast.error(isRTL ? 'حدث خطأ أثناء إنهاء الجلسات' : 'Error revoking sessions');
            setRevoking(false);
        }
    };

    if (loading) return <div className="flex justify-center p-4"><Loader2 className="animate-spin w-5 h-5 text-gray-500" /></div>;

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 flex justify-between items-center">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                        <Monitor className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        {isRTL ? 'الجلسات النشطة' : 'Active Sessions'}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {isRTL ? 'إدارة الأجهزة التي سجلت الدخول منها حالياً.' : 'Manage the devices currently logged into your account.'}
                    </p>
                </div>
                <button
                    onClick={handleRevokeAll}
                    disabled={revoking || sessions.length === 0}
                    className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg text-sm font-medium transition-colors border border-red-200 disabled:opacity-50"
                >
                    {revoking ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldAlert className="w-4 h-4" />}
                    {isRTL ? 'خروج من جميع الأجهزة' : 'Revoke All Sessions'}
                </button>
            </div>

            <div className="divide-y divide-gray-100 dark:divide-gray-700/50">
                {sessions.length === 0 ? (
                    <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                        {isRTL ? 'لا توجد جلسات نشطة مسجلة.' : 'No active sessions recorded.'}
                    </div>
                ) : (
                    sessions.map((session, index) => (
                        <div key={session.id} className="p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-300">
                                    <Monitor className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                                        {session.device || (isRTL ? 'جهاز غير معروف' : 'Unknown Device')}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                        IP: {session.ip || 'Unknown'} • {isRTL ? 'بدأت في' : 'Started'}: {session.createdAt?.toDate ? session.createdAt.toDate().toLocaleDateString() : 'Recent'}
                                    </p>
                                </div>
                            </div>
                            {index === 0 && (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                                    {isRTL ? 'الجهاز الحالي' : 'Current Device'}
                                </span>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
