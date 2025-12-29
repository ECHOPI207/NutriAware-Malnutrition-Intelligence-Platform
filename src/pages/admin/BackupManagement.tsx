import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/features/auth/firebase-auth-context';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Database, 
  Shield, 
  Download,
  Upload,
  RefreshCw,
  Calendar,
  HardDrive,
  CheckCircle,
  AlertTriangle,
  Clock,
  Archive
} from 'lucide-react';
import { motion } from 'framer-motion';

interface BackupInfo {
  id: string;
  name: string;
  size: string;
  date: Date;
  status: 'completed' | 'in-progress' | 'failed';
  type: 'full' | 'incremental' | 'users' | 'content';
}

const BackupManagement: React.FC = () => {
  const { i18n } = useTranslation();
  const { user, userProfile } = useAuth();
  const [backups, setBackups] = useState<BackupInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    totalBackups: 0,
    lastBackup: null as Date | null,
    totalSize: '0 MB',
    successRate: 100
  });
  
  const isRTL = i18n.language === 'ar';

  useEffect(() => {
    if (userProfile?.role === 'admin') {
      loadBackupHistory();
    }
  }, [userProfile]);

  const loadBackupHistory = async () => {
    try {
      // Mock backup data - in real implementation, this would come from your backup service
      const mockBackups: BackupInfo[] = [
        {
          id: '1',
          name: 'Full System Backup',
          size: '245 MB',
          date: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
          status: 'completed',
          type: 'full'
        },
        {
          id: '2',
          name: 'Users Data Backup',
          size: '12 MB',
          date: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
          status: 'completed',
          type: 'users'
        },
        {
          id: '3',
          name: 'Content Backup',
          size: '89 MB',
          date: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
          status: 'completed',
          type: 'content'
        },
        {
          id: '4',
          name: 'Incremental Backup',
          size: '5 MB',
          date: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
          status: 'in-progress',
          type: 'incremental'
        }
      ];

      setBackups(mockBackups);
      
      // Calculate stats
      const completedBackups = mockBackups.filter(b => b.status === 'completed');
      const totalSizeNum = mockBackups.reduce((sum, backup) => {
        const size = parseInt(backup.size.split(' ')[0]);
        return sum + size;
      }, 0);
      
      setStats({
        totalBackups: mockBackups.length,
        lastBackup: mockBackups[0]?.date || null,
        totalSize: `${totalSizeNum} MB`,
        successRate: Math.round((completedBackups.length / mockBackups.length) * 100)
      });
    } catch (error) {
      console.error('Error loading backup history:', error);
    }
  };

  const createBackup = async (type: 'full' | 'incremental' | 'users' | 'content') => {
    setLoading(true);
    
    try {
      // Mock backup creation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newBackup: BackupInfo = {
        id: Date.now().toString(),
        name: `${type === 'full' ? 'Full System' : 
               type === 'users' ? 'Users Data' : 
               type === 'content' ? 'Content' : 'Incremental'} Backup`,
        size: `${Math.floor(Math.random() * 200) + 10} MB`,
        date: new Date(),
        status: 'completed',
        type
      };
      
      setBackups(prev => [newBackup, ...prev]);
      
      alert(isRTL ? 'تم إنشاء النسخة الاحتياطية بنجاح' : 'Backup created successfully');
    } catch (error) {
      console.error('Error creating backup:', error);
      alert(isRTL ? 'حدث خطأ أثناء إنشاء النسخة الاحتياطية' : 'Error creating backup');
    } finally {
      setLoading(false);
    }
  };

  const downloadBackup = (backup: BackupInfo) => {
    // Mock download
    alert(isRTL ? 
      `جاري تحميل النسخة الاحتياطية: ${backup.name}` : 
      `Downloading backup: ${backup.name}`
    );
  };

  const restoreBackup = (backup: BackupInfo) => {
    if (!confirm(isRTL ? 
      'هل أنت متأكد من استعادة هذه النسخة الاحتياطية؟ سيتم استبدال البيانات الحالية.' :
      'Are you sure you want to restore this backup? Current data will be replaced.'
    )) {
      return;
    }
    
    alert(isRTL ? 
      `جاري استعادة النسخة الاحتياطية: ${backup.name}` : 
      `Restoring backup: ${backup.name}`
    );
  };

  const getStatusBadge = (status: string) => {
    const statusMap = {
      completed: { 
        label: isRTL ? 'مكتملة' : 'Completed', 
        variant: 'default' as const,
        icon: CheckCircle
      },
      'in-progress': { 
        label: isRTL ? 'قيد التنفيذ' : 'In Progress', 
        variant: 'secondary' as const,
        icon: Clock
      },
      failed: { 
        label: isRTL ? 'فشلت' : 'Failed', 
        variant: 'destructive' as const,
        icon: AlertTriangle
      }
    };
    
    const statusInfo = statusMap[status as keyof typeof statusMap];
    const Icon = statusInfo.icon;
    
    return (
      <Badge variant={statusInfo.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {statusInfo.label}
      </Badge>
    );
  };

  const getTypeBadge = (type: string) => {
    const typeMap = {
      full: { label: isRTL ? 'كاملة' : 'Full', color: 'bg-blue-100 text-blue-800' },
      incremental: { label: isRTL ? 'تدريجية' : 'Incremental', color: 'bg-green-100 text-green-800' },
      users: { label: isRTL ? 'المستخدمين' : 'Users', color: 'bg-purple-100 text-purple-800' },
      content: { label: isRTL ? 'المحتوى' : 'Content', color: 'bg-orange-100 text-orange-800' }
    };
    
    const typeInfo = typeMap[type as keyof typeof typeMap];
    
    return (
      <Badge className={`${typeInfo.color} border-0`}>
        {typeInfo.label}
      </Badge>
    );
  };

  if (userProfile?.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <Shield className="h-16 w-16 mx-auto mb-4 text-red-500" />
            <h2 className="text-xl font-semibold mb-2">
              {isRTL ? 'غير مصرح' : 'Unauthorized'}
            </h2>
            <p className="text-muted-foreground">
              {isRTL ? 'هذه الصفحة مخصصة لمديري النظام فقط' : 'This page is for administrators only'}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={`min-h-screen gradient-bg ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Database className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold gradient-text">
                {isRTL ? 'إدارة النسخ الاحتياطية' : 'Backup Management'}
              </h1>
            </div>
            <p className="text-muted-foreground">
              {isRTL ? 'إنشاء واستعادة وإدارة النسخ الاحتياطية للنظام' : 'Create, restore, and manage system backups'}
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="card-primary">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white/90">
                      {isRTL ? 'إجمالي النسخ' : 'Total Backups'}
                    </p>
                    <p className="text-2xl font-bold text-white">{stats.totalBackups}</p>
                  </div>
                  <Archive className="h-8 w-8 text-white/80" />
                </div>
              </CardContent>
            </Card>

            <Card className="card-secondary">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white/90">
                      {isRTL ? 'آخر نسخة احتياطية' : 'Last Backup'}
                    </p>
                    <p className="text-2xl font-bold text-white">
                      {stats.lastBackup ? 
                        stats.lastBackup.toLocaleDateString(isRTL ? 'ar-EG' : 'en-US') : 
                        (isRTL ? 'لا يوجد' : 'None')
                      }
                    </p>
                  </div>
                  <Calendar className="h-8 w-8 text-white/80" />
                </div>
              </CardContent>
            </Card>

            <Card className="card-accent">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white/90">
                      {isRTL ? 'الحجم الإجمالي' : 'Total Size'}
                    </p>
                    <p className="text-2xl font-bold text-white">{stats.totalSize}</p>
                  </div>
                  <HardDrive className="h-8 w-8 text-white/80" />
                </div>
              </CardContent>
            </Card>

            <Card className="card-info">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">
                      {isRTL ? 'معدل النجاح' : 'Success Rate'}
                    </p>
                    <p className="text-2xl font-bold">{stats.successRate}%</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Backup Actions */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{isRTL ? 'إنشاء نسخة احتياطية جديدة' : 'Create New Backup'}</CardTitle>
              <CardDescription>
                {isRTL ? 'اختر نوع النسخة الاحتياطية التي تريد إنشاؤها' : 'Choose the type of backup you want to create'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Button 
                  onClick={() => createBackup('full')} 
                  disabled={loading}
                  className="h-20 flex flex-col gap-2"
                >
                  <Database className="h-6 w-6" />
                  <span>{isRTL ? 'نسخة كاملة' : 'Full Backup'}</span>
                </Button>
                
                <Button 
                  onClick={() => createBackup('users')} 
                  disabled={loading}
                  variant="outline"
                  className="h-20 flex flex-col gap-2"
                >
                  <Shield className="h-6 w-6" />
                  <span>{isRTL ? 'بيانات المستخدمين' : 'Users Data'}</span>
                </Button>
                
                <Button 
                  onClick={() => createBackup('content')} 
                  disabled={loading}
                  variant="outline"
                  className="h-20 flex flex-col gap-2"
                >
                  <Archive className="h-6 w-6" />
                  <span>{isRTL ? 'المحتوى' : 'Content'}</span>
                </Button>
                
                <Button 
                  onClick={() => createBackup('incremental')} 
                  disabled={loading}
                  variant="outline"
                  className="h-20 flex flex-col gap-2"
                >
                  <RefreshCw className="h-6 w-6" />
                  <span>{isRTL ? 'نسخة تدريجية' : 'Incremental'}</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Backup History */}
          <Card>
            <CardHeader>
              <CardTitle>{isRTL ? 'سجل النسخ الاحتياطية' : 'Backup History'}</CardTitle>
              <CardDescription>
                {isRTL ? 'جميع النسخ الاحتياطية المنشأة مؤخراً' : 'All recently created backups'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {backups.map((backup, index) => (
                  <motion.div
                    key={backup.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card className="card-medical shadow-medical-lg">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                              <Database className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="font-semibold">{backup.name}</h3>
                                {getTypeBadge(backup.type)}
                                {getStatusBadge(backup.status)}
                              </div>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <HardDrive className="h-3 w-3" />
                                  {backup.size}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  {backup.date.toLocaleString(isRTL ? 'ar-EG' : 'en-US')}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => downloadBackup(backup)}
                              disabled={backup.status !== 'completed'}
                            >
                              <Download className="h-4 w-4 mr-2" />
                              {isRTL ? 'تحميل' : 'Download'}
                            </Button>
                            
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={() => restoreBackup(backup)}
                              disabled={backup.status !== 'completed'}
                            >
                              <Upload className="h-4 w-4 mr-2" />
                              {isRTL ? 'استعادة' : 'Restore'}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default BackupManagement;