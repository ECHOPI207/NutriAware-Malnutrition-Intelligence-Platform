import { useState, useEffect } from 'react';
import { useAuth } from '@/features/auth/firebase-auth-context';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, orderBy, limit, startAfter, QueryDocumentSnapshot, DocumentData, getDoc, doc } from 'firebase/firestore';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Activity, Download, Filter, Search, Loader2, ShieldCheck, FileText, MonitorPlay, Bot, ChevronLeft, ChevronRight, Calendar, User } from 'lucide-react';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { ActivityType } from '@/services/activityTracker';

interface LogEntry {
    id: string;
    userId: string;
    userName?: string;
    userRole?: string;
    activityType: ActivityType;
    timestamp: any;
    metadata: {
        toolName?: string;
        duration?: number;
        resultType?: string;
        changes?: any;
        dataType?: string;
        performedBy?: string;
        details?: string;
        [key: string]: any;
    };
    sessionId?: string;
    ipAddress?: string;
    userAgent?: string;
    // Legacy fields for backward compatibility
    event_type?: string;
    event_category?: string;
    event_metadata?: Record<string, any>;
    ip_address?: string;
    user_agent?: string;
    device_type?: string;
    geo_country?: string;
}

interface ActivityFilters {
    userId?: string;
    activityType?: ActivityType | 'all';
    dateFrom?: Date | null;
    dateTo?: Date | null;
    toolName?: string;
}

const getCategoryIcon = (activityType: string) => {
    const type = activityType.toLowerCase();
    if (type.includes('tool') || type.includes('ai')) return <Bot className="w-4 h-4 text-blue-500" />;
    if (type.includes('profile') || type.includes('avatar')) return <User className="w-4 h-4 text-purple-500" />;
    if (type.includes('assessment') || type.includes('result')) return <FileText className="w-4 h-4 text-green-500" />;
    if (type.includes('settings') || type.includes('data')) return <ShieldCheck className="w-4 h-4 text-orange-500" />;
    return <Activity className="w-4 h-4 text-gray-400" />;
};

const getCategoryColor = (activityType: string) => {
    const type = activityType.toLowerCase();
    if (type.includes('tool') || type.includes('ai')) return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
    if (type.includes('profile') || type.includes('avatar')) return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
    if (type.includes('assessment') || type.includes('result')) return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
    if (type.includes('settings') || type.includes('data')) return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
    return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
};

export default function ActivityLog() {
    const { user } = useAuth();
    const { i18n } = useTranslation();
    const isRTL = i18n.language === 'ar';

    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [lastVisible, setLastVisible] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
    const [firstVisible, setFirstVisible] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
    const ITEMS_PER_PAGE = 50;
    
    // Filter state
    const [filters, setFilters] = useState<ActivityFilters>({
        activityType: 'all',
        dateFrom: null,
        dateTo: null,
        toolName: '',
        userId: '',
    });
    const [searchQuery, setSearchQuery] = useState('');
    const [userSearchQuery, setUserSearchQuery] = useState('');

    // Check if user is admin
    useEffect(() => {
        const checkAdminStatus = async () => {
            if (!user) return;
            try {
                const userDoc = await getDoc(doc(db, 'users', user.uid));
                const userData = userDoc.data();
                setIsAdmin(
                    userData?.isAdmin === true || 
                    userData?.role === 'admin' || 
                    userData?.role === 'super_admin'
                );
            } catch (error) {
                console.error('Error checking admin status:', error);
                setIsAdmin(false);
            }
        };
        checkAdminStatus();
    }, [user]);

    useEffect(() => {
        const fetchLogs = async () => {
            if (!user) return;
            setLoading(true);
            
            try {
                const logsRef = collection(db, 'activity_logs');
                let q = query(logsRef);

                // Admin can see all logs, regular users only see their own
                if (!isAdmin) {
                    q = query(q, where('userId', '==', user.uid));
                } else if (filters.userId) {
                    // Admin filtering by specific user
                    q = query(q, where('userId', '==', filters.userId));
                }

                // Filter by activity type
                if (filters.activityType && filters.activityType !== 'all') {
                    q = query(q, where('activityType', '==', filters.activityType));
                }

                // Filter by date range
                if (filters.dateFrom) {
                    q = query(q, where('timestamp', '>=', filters.dateFrom));
                }
                if (filters.dateTo) {
                    const endOfDay = new Date(filters.dateTo);
                    endOfDay.setHours(23, 59, 59, 999);
                    q = query(q, where('timestamp', '<=', endOfDay));
                }

                // Order by timestamp descending
                q = query(q, orderBy('timestamp', 'desc'));

                // Apply pagination
                q = query(q, limit(ITEMS_PER_PAGE));

                const snapshot = await getDocs(q);
                const data = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as LogEntry[];

                setLogs(data);
                
                // Set pagination markers
                if (snapshot.docs.length > 0) {
                    setFirstVisible(snapshot.docs[0]);
                    setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
                }

                // Calculate total pages (approximate)
                setTotalPages(Math.ceil(snapshot.size / ITEMS_PER_PAGE) || 1);
            } catch (error) {
                console.error('Error fetching logs:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchLogs();
    }, [user, isAdmin, filters, currentPage]);

    const filteredLogs = logs.filter(log => {
        // Search filter
        const activityType = log.activityType || log.event_type || '';
        const details = log.metadata?.details || log.event_metadata?.details || '';
        const toolName = log.metadata?.toolName || '';
        
        const matchesSearch = searchQuery === '' || 
            activityType.toLowerCase().includes(searchQuery.toLowerCase()) ||
            details.toLowerCase().includes(searchQuery.toLowerCase()) ||
            toolName.toLowerCase().includes(searchQuery.toLowerCase());
        
        // Tool name filter
        const matchesTool = !filters.toolName || 
            (log.metadata?.toolName || '').toLowerCase().includes(filters.toolName.toLowerCase());
        
        return matchesSearch && matchesTool;
    });

    // Get unique activity types for filter dropdown
    const activityTypes = ['all', ...Array.from(new Set(logs.map(log => log.activityType || log.event_type).filter(Boolean)))];

    // Handle user search
    const handleUserSearch = () => {
        setFilters(prev => ({ ...prev, userId: userSearchQuery }));
        setCurrentPage(1);
    };

    // Handle filter changes
    const handleFilterChange = (key: keyof ActivityFilters, value: any) => {
        setFilters(prev => ({ ...prev, [key]: value }));
        setCurrentPage(1);
    };

    // Reset filters
    const resetFilters = () => {
        setFilters({
            activityType: 'all',
            dateFrom: null,
            dateTo: null,
            toolName: '',
            userId: '',
        });
        setSearchQuery('');
        setUserSearchQuery('');
        setCurrentPage(1);
    };

    const exportToCSV = () => {
        if (!filteredLogs.length) return;

        const headers = ['Date', 'User Name', 'User Role', 'User ID', 'Activity Type', 'Tool Name', 'Duration (s)', 'Details', 'Session ID'];
        const csvContent = [
            headers.join(','),
            ...filteredLogs.map(log => {
                const date = log.timestamp?.toDate ? log.timestamp.toDate().toISOString() : '';
                const userName = log.userName || 'Unknown';
                const userRole = log.userRole || 'user';
                const userId = log.userId || '';
                const activityType = log.activityType || log.event_type || '';
                const toolName = log.metadata?.toolName || '';
                const duration = log.metadata?.duration ? Math.round(log.metadata.duration / 1000) : '';
                const details = `"${(log.metadata?.details || log.event_metadata?.details || '').replace(/"/g, '""')}"`;
                const sessionId = log.sessionId || '';
                return `${date},${userName},${userRole},${userId},${activityType},${toolName},${duration},${details},${sessionId}`;
            })
        ].join('\n');

        const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `NutriAware_Activity_Log_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (!user) return null;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-12 pt-24 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                            <Activity className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                            {isRTL ? 'سجل النشاطات' : 'Activity Log'}
                            {isAdmin && (
                                <span className="text-sm font-normal text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30 px-3 py-1 rounded-full">
                                    {isRTL ? 'مسؤول' : 'Admin'}
                                </span>
                            )}
                        </h1>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                            {isRTL
                                ? isAdmin 
                                    ? 'عرض وإدارة جميع أنشطة المستخدمين على المنصة'
                                    : 'يتم تسجيل جميع أنشطتك على المنصة لضمان الخصوصية والامتثال'
                                : isAdmin
                                    ? 'View and manage all user activities on the platform'
                                    : 'All your platform activities are logged for privacy and compliance'}
                        </p>
                    </div>
                    <button
                        onClick={exportToCSV}
                        disabled={loading || filteredLogs.length === 0}
                        className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Download className="w-4 h-4" />
                        {isRTL ? 'تصدير CSV' : 'Export CSV'}
                    </button>
                </div>

                {/* Advanced Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm space-y-4"
                >
                    {/* Search and User Filter */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="relative">
                            <Search className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-2.5 w-5 h-5 text-gray-400`} />
                            <input
                                type="text"
                                placeholder={isRTL ? 'البحث في الأنشطة...' : 'Search activities...'}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className={`w-full ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500`}
                                dir={isRTL ? 'rtl' : 'ltr'}
                            />
                        </div>
                        
                        {isAdmin && (
                            <div className="flex gap-2">
                                <div className="relative flex-1">
                                    <User className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-2.5 w-5 h-5 text-gray-400`} />
                                    <input
                                        type="text"
                                        placeholder={isRTL ? 'معرف المستخدم...' : 'User ID...'}
                                        value={userSearchQuery}
                                        onChange={(e) => setUserSearchQuery(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleUserSearch()}
                                        className={`w-full ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500`}
                                        dir={isRTL ? 'rtl' : 'ltr'}
                                    />
                                </div>
                                <button
                                    onClick={handleUserSearch}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    {isRTL ? 'بحث' : 'Search'}
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Activity Type, Tool Name, and Date Filters */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="flex items-center gap-2">
                            <Filter className="w-5 h-5 text-gray-500 flex-shrink-0" />
                            <select
                                value={filters.activityType || 'all'}
                                onChange={(e) => handleFilterChange('activityType', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                            >
                                {activityTypes.map(type => (
                                    <option key={type} value={type}>
                                        {type === 'all' ? (isRTL ? 'كل الأنواع' : 'All Types') : type}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="relative">
                            <input
                                type="text"
                                placeholder={isRTL ? 'اسم الأداة...' : 'Tool name...'}
                                value={filters.toolName || ''}
                                onChange={(e) => handleFilterChange('toolName', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                                dir={isRTL ? 'rtl' : 'ltr'}
                            />
                        </div>

                        <div className="relative">
                            <Calendar className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-2.5 w-4 h-4 text-gray-400`} />
                            <input
                                type="date"
                                value={filters.dateFrom ? format(filters.dateFrom, 'yyyy-MM-dd') : ''}
                                onChange={(e) => handleFilterChange('dateFrom', e.target.value ? new Date(e.target.value) : null)}
                                className={`w-full ${isRTL ? 'pr-10 pl-3' : 'pl-10 pr-3'} py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm`}
                                placeholder={isRTL ? 'من تاريخ' : 'From date'}
                            />
                        </div>

                        <div className="relative">
                            <Calendar className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-2.5 w-4 h-4 text-gray-400`} />
                            <input
                                type="date"
                                value={filters.dateTo ? format(filters.dateTo, 'yyyy-MM-dd') : ''}
                                onChange={(e) => handleFilterChange('dateTo', e.target.value ? new Date(e.target.value) : null)}
                                className={`w-full ${isRTL ? 'pr-10 pl-3' : 'pl-10 pr-3'} py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm`}
                                placeholder={isRTL ? 'إلى تاريخ' : 'To date'}
                            />
                        </div>
                    </div>

                    {/* Reset Filters Button */}
                    <div className="flex justify-end">
                        <button
                            onClick={resetFilters}
                            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                        >
                            {isRTL ? 'إعادة تعيين الفلاتر' : 'Reset Filters'}
                        </button>
                    </div>
                </motion.div>

                {/* Log Table */}
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-800">
                    {loading ? (
                        <div className="p-12 flex justify-center">
                            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                        </div>
                    ) : filteredLogs.length === 0 ? (
                        <div className="p-12 text-center text-gray-500 dark:text-gray-400">
                            {isRTL ? 'لا توجد نشاطات مسجلة تطابق بحثك.' : 'No activity logs match your search.'}
                        </div>
                    ) : (
                        <>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left" dir={isRTL ? 'rtl' : 'ltr'}>
                                    <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                                        <tr>
                                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                {isRTL ? 'التاريخ' : 'Date'}
                                            </th>
                                            {isAdmin && (
                                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                    {isRTL ? 'المستخدم' : 'User'}
                                                </th>
                                            )}
                                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                {isRTL ? 'الدور' : 'Role'}
                                            </th>
                                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                {isRTL ? 'نوع النشاط' : 'Activity Type'}
                                            </th>
                                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                {isRTL ? 'الأداة' : 'Tool'}
                                            </th>
                                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                {isRTL ? 'المدة' : 'Duration'}
                                            </th>
                                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                {isRTL ? 'التفاصيل' : 'Details'}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                        {filteredLogs.map((log) => {
                                            const activityType = log.activityType || log.event_type || 'unknown';
                                            const toolName = log.metadata?.toolName || '';
                                            const duration = log.metadata?.duration;
                                            const details = log.metadata?.details || log.event_metadata?.details || '';
                                            
                                            return (
                                                <tr key={log.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                                                        {log.timestamp?.toDate ? format(log.timestamp.toDate(), 'PP p', { locale: isRTL ? ar : undefined }) : 'Just now'}
                                                    </td>
                                                    {isAdmin && (
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                                            <div className="flex flex-col">
                                                                <span className="font-medium">{log.userName || 'Unknown'}</span>
                                                                <span className="text-xs text-gray-500 font-mono">{log.userId?.substring(0, 8)}...</span>
                                                            </div>
                                                        </td>
                                                    )}
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                                                            {log.userRole || 'user'}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${getCategoryColor(activityType)}`}>
                                                            {getCategoryIcon(activityType)}
                                                            {activityType}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                                                        {toolName || '-'}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                                                        {duration ? `${Math.round(duration / 1000)}s` : '-'}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400 max-w-md truncate">
                                                        {details || JSON.stringify(log.metadata || log.event_metadata || {})}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            <div className="bg-gray-50 dark:bg-gray-800 px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                                <div className="flex items-center justify-between">
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        {isRTL 
                                            ? `عرض ${filteredLogs.length} من ${filteredLogs.length} نشاط`
                                            : `Showing ${filteredLogs.length} of ${filteredLogs.length} activities`}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                            disabled={currentPage === 1}
                                            className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                        >
                                            {isRTL ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
                                        </button>
                                        <span className="text-sm text-gray-700 dark:text-gray-300 px-4">
                                            {isRTL ? `صفحة ${currentPage} من ${totalPages}` : `Page ${currentPage} of ${totalPages}`}
                                        </span>
                                        <button
                                            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                            disabled={currentPage === totalPages || filteredLogs.length < ITEMS_PER_PAGE}
                                            className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                        >
                                            {isRTL ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
