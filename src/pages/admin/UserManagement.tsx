import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/features/auth/firebase-auth-context';
import { collection, getDocs, doc, updateDoc, deleteDoc, addDoc, serverTimestamp, query, orderBy, limit, where } from 'firebase/firestore';
import { sendPasswordResetEmail } from 'firebase/auth';
import { db, auth, storage } from '@/lib/firebase';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { auditService } from '@/services/audit-service';
import { roleManager } from '@/services/role-manager';
import { trackDataDeletion } from '@/services/activityTracker';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Users,
  Shield,
  Stethoscope,
  Edit,
  Trash2,
  Search,
  Phone,
  Calendar,
  Eye,
  Key,
  UserPlus,
  Activity,
  Ban,
  CheckCircle,
  AlertTriangle,
  Download,
  Upload,
  LogIn,
  LogOut,
  Clock
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Activity Log Tab Component
const ActivityLogTab: React.FC<{ userId: string; isRTL: boolean }> = ({ userId, isRTL }) => {
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const activityRef = collection(db, 'activity_logs');
        const q = query(activityRef, where('user_id', '==', userId), orderBy('timestamp', 'desc'), limit(50));
        const snapshot = await getDocs(q);
        const logs = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setActivities(logs);
      } catch (error) {
        console.error('Failed to fetch activity log:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchActivities();
  }, [userId]);

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'login': return <LogIn className="h-4 w-4 text-green-500" />;
      case 'logout': return <LogOut className="h-4 w-4 text-red-500" />;
      case 'profile_update': case 'password_change': return <Edit className="h-4 w-4 text-blue-500" />;
      case 'page_view': return <Eye className="h-4 w-4 text-gray-500" />;
      case 'ai_tool_use': case 'tool_use': case 'bmi_calculation': case 'meal_plan_generated': return <Activity className="h-4 w-4 text-purple-500" />;
      case 'assessment_complete': return <Activity className="h-4 w-4 text-orange-500" />;
      case 'survey_started': case 'survey_submitted': return <Activity className="h-4 w-4 text-indigo-500" />;
      case 'article_read': case 'knowledge_viewed': return <Eye className="h-4 w-4 text-teal-500" />;
      case 'file_download': case 'report_export': case 'data_export': return <Download className="h-4 w-4 text-cyan-500" />;
      case 'contact_form_sent': case 'consultation_requested': case 'message_sent': return <Activity className="h-4 w-4 text-pink-500" />;
      default: return <Activity className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getActionLabel = (action: string) => {
    const labels: Record<string, string> = {
      login: 'تسجيل دخول', logout: 'تسجيل خروج',
      profile_update: 'تحديث الملف الشخصي', password_change: 'تغيير كلمة المرور',
      page_view: 'زيارة صفحة',
      ai_tool_use: 'استخدام أداة ذكاء اصطناعي', tool_use: 'استخدام أداة',
      bmi_calculation: 'حساب مؤشر كتلة الجسم', meal_plan_generated: 'إنشاء خطة وجبات',
      assessment_complete: 'إكمال تقييم',
      survey_started: 'بدء استبيان', survey_submitted: 'إرسال استبيان', survey_result_viewed: 'عرض نتائج استبيان',
      article_read: 'قراءة مقال', article_shared: 'مشاركة مقال', knowledge_viewed: 'مشاهدة محتوى',
      file_download: 'تحميل ملف', report_export: 'تصدير تقرير', data_export: 'تصدير بيانات', backup_download: 'تحميل نسخة احتياطية',
      contact_form_sent: 'إرسال نموذج اتصال', consultation_requested: 'طلب استشارة', consultation_replied: 'رد على استشارة', message_sent: 'إرسال رسالة',
    };
    return isRTL ? (labels[action] || action) : action;
  };

  const getCategoryBadge = (category: string) => {
    const colors: Record<string, string> = {
      auth: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
      navigation: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
      tool: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
      survey: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300',
      content: 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300',
      download: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300',
      communication: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300',
      profile: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    };
    const labels: Record<string, string> = {
      auth: 'مصادقة', navigation: 'تصفح', tool: 'أدوات', survey: 'استبيان',
      content: 'محتوى', download: 'تحميل', communication: 'تواصل', profile: 'ملف شخصي',
    };
    return (
      <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${colors[category] || 'bg-muted text-muted-foreground'}`}>
        {isRTL ? (labels[category] || category) : category}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">{isRTL ? 'جاري تحميل سجل النشاط...' : 'Loading activity log...'}</p>
      </div>
    );
  }

  if (activities.length === 0) {
    return (
      <div className="text-center py-8">
        <Activity className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">
          {isRTL ? 'لا يوجد نشاط بعد' : 'No activity yet'}
        </h3>
        <p className="text-muted-foreground">
          {isRTL ? 'سيتم تسجيل النشاط عند تسجيل الدخول القادم' : 'Activity will be recorded on next login'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3 max-h-[400px] overflow-y-auto">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
          <div className="mt-1">{getActionIcon(activity.action_type || activity.action)}</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-sm font-medium">{getActionLabel(activity.action_type || activity.action)}</p>
              {activity.category && getCategoryBadge(activity.category)}
            </div>
            {activity.details && (
              <p className="text-xs text-muted-foreground mt-0.5">{activity.details}</p>
            )}
            <div className="flex items-center gap-1 mt-1">
              <Clock className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                {activity.timestamp?.toDate?.()?.toLocaleString(isRTL ? 'ar-EG' : 'en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                }) || 'وقت غير محدد'}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

interface User {
  uid: string;
  email: string;
  displayName: string;
  role: 'user' | 'nutritionist' | 'admin' | 'doctor' | 'super_admin';
  createdAt: any;
  photoURL?: string;
  phoneNumber?: string;
  address?: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female';
  isActive: boolean;
  status: 'active' | 'inactive' | 'pending' | 'suspended';
  lastLogin?: any;
  emailVerified: boolean;
  specialization?: string; // For doctors and nutritionists
  licenseNumber?: string; // For doctors and nutritionists
  department?: string; // For doctors and nutritionists
  notes?: string; // Admin notes
  suspendedUntil?: any; // For suspended users
  suspensionReason?: string; // Reason for suspension
  permissions?: string[]; // Granular permissions
}

interface NewUserData {
  email: string;
  displayName: string;
  role: 'user' | 'nutritionist' | 'admin' | 'doctor' | 'super_admin';
  phoneNumber: string;
  address: string;
  dateOfBirth: string;
  gender: 'male' | 'female';
  specialization?: string;
  licenseNumber?: string;
  department?: string;
  notes?: string;
}

const UserManagement: React.FC = () => {
  const { i18n } = useTranslation();
  const { user, userProfile } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [isUpdatingAvatar, setIsUpdatingAvatar] = useState(false);
  
  const isRTL = i18n.language === 'ar';
  
  // State for granular permissions
  const [permissionsDialogOpen, setPermissionsDialogOpen] = useState(false);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  
  const availablePermissions = [
    { id: 'manage_users', label: isRTL ? 'إدارة المستخدمين' : 'Manage Users' },
    { id: 'manage_content', label: isRTL ? 'إدارة المحتوى (المقالات)' : 'Manage Content' },
    { id: 'view_reports', label: isRTL ? 'عرض التقارير' : 'View Reports' },
    { id: 'reply_consultations', label: isRTL ? 'الرد على الاستشارات' : 'Reply to Consultations' },
    { id: 'manage_system', label: isRTL ? 'إعدادات النظام' : 'System Settings' },
    { id: 'users.edit_avatar', label: isRTL ? 'تغيير صور المستخدمين' : 'Change User Avatars' },
    { id: 'view_dashboard', label: isRTL ? 'عرض لوحة التحكم' : 'View Dashboard' },
    { id: 'view_patients', label: isRTL ? 'عرض المرضى' : 'View Patients' },
    { id: 'manage_patients', label: isRTL ? 'إدارة المرضى' : 'Manage Patients' },
    { id: 'create_reports', label: isRTL ? 'إنشاء تقارير' : 'Create Reports' },
    { id: 'view_medical_data', label: isRTL ? 'عرض البيانات الطبية' : 'View Medical Data' },
    { id: 'manage_treatment_plans', label: isRTL ? 'إدارة خطط العلاج' : 'Manage Treatment Plans' },
    { id: 'view_messages', label: isRTL ? 'عرض الرسائل' : 'View Messages' },
    { id: 'create_meal_plans', label: isRTL ? 'إنشاء خطط وجبات' : 'Create Meal Plans' },
    { id: 'view_nutritional_data', label: isRTL ? 'عرض البيانات الغذائية' : 'View Nutritional Data' },
    { id: 'access_admin_dashboard', label: isRTL ? 'الدخول للوحة المدير' : 'Access Admin Dashboard' },
    { id: 'monitor_activity', label: isRTL ? 'مراقبة النشاط' : 'Monitor Activity' },
    { id: 'manage_backups', label: isRTL ? 'إدارة النسخ الاحتياطي' : 'Manage Backups' },
    { id: 'manage_security', label: isRTL ? 'إدارة الأمان' : 'Manage Security' },
    { id: 'manage_surveys', label: isRTL ? 'إدارة وتعديل الاستبيانات' : 'Manage & Edit Surveys' },
    { id: 'view_survey_results', label: isRTL ? 'عرض نتائج الاستبيانات' : 'View Survey Results' },
    { id: 'manage_ai_tools', label: isRTL ? 'إعدادات أدوات الذكاء الاصطناعي' : 'Manage AI Tools' },
    { id: 'export_data', label: isRTL ? 'تصدير البيانات' : 'Export Data' },
  ];

  const [newUserData, setNewUserData] = useState<NewUserData>({
    email: '',
    displayName: '',
    role: 'user',
    phoneNumber: '',
    address: '',
    dateOfBirth: '',
    gender: 'male',
    specialization: '',
    licenseNumber: '',
    department: '',
    notes: ''
  });

  useEffect(() => {
    if (userProfile?.role === 'admin' || userProfile?.role === 'super_admin') {
      loadUsers();
    }
  }, [userProfile]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const usersQuery = collection(db, 'users');
      const usersSnapshot = await getDocs(usersQuery);

      const usersData: User[] = [];
      usersSnapshot.forEach((doc) => {
        const userData = doc.data();
        usersData.push({
          uid: doc.id,
          email: userData.email || '',
          displayName: userData.displayName || '',
          role: userData.role || 'user',
          createdAt: userData.createdAt,
          photoURL: userData.photoURL,
          phoneNumber: userData.phoneNumber,
          address: userData.address,
          dateOfBirth: userData.dateOfBirth,
          gender: userData.gender,
          isActive: userData.isActive !== false, // Default to true if not set
          status: userData.status || (userData.emailVerified ? 'active' : 'pending'),
          lastLogin: userData.lastLogin,
          emailVerified: userData.emailVerified || false,
          specialization: userData.specialization,
          licenseNumber: userData.licenseNumber,
          department: userData.department,
          notes: userData.notes,
          suspendedUntil: userData.suspendedUntil,
          suspensionReason: userData.suspensionReason,
          permissions: userData.permissions || []
        });
      });

      // Sort by creation date (newest first)
      usersData.sort((a, b) => {
        const dateA = a.createdAt?.toDate?.() || new Date(0);
        const dateB = b.createdAt?.toDate?.() || new Date(0);
        return dateB.getTime() - dateA.getTime();
      });

      setUsers(usersData);
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadAvatar = async (userId: string, file: File | undefined) => {
    if (!file) return;

    // Check permission using roleManager
    const canEditAvatar = userProfile?.role && roleManager.hasPermission(userProfile.role, 'users.edit_avatar');
    if (!canEditAvatar) {
      alert(isRTL ? 'ليس لديك صلاحية لتعديل صورة المستخدم' : 'You do not have permission to edit user avatar');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert(isRTL ? 'حجم الصورة يجب أن لا يتجاوز 2 ميجابايت' : 'Image size must not exceed 2MB');
      return;
    }

    // MIME type check
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      alert(isRTL ? 'نوع الملف غير مدعوم. يرجى اختيار JPEG أو PNG أو WebP' : 'Unsupported file type. Please choose JPEG, PNG, or WebP');
      return;
    }

    // Confirmation dialog
    if (!confirm(isRTL ? 'هل أنت متأكد من استبدال صورة المستخدم؟' : 'Are you sure you want to replace the user avatar?')) {
      return;
    }

    setIsUpdatingAvatar(true);

    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const base64Data = reader.result as string;

        try {
          // Upload directly to Firebase Storage
          const timestamp = Date.now();
          // Create a safe filename
          const safeName = file.name.replace(/[^a-zA-Z0-9.]/g, '_');
          const storagePath = `avatars/${userId}/${timestamp}_${safeName}`;
          const storageRef = ref(storage, storagePath);
          
          console.log(`[Avatar Update] Uploading to ${storagePath}...`);
          
          // Upload the file as a data URL string
          await uploadString(storageRef, base64Data, 'data_url');
          
          // Get the download URL
          const photoURL = await getDownloadURL(storageRef);
          console.log(`[Avatar Update] Upload successful. URL: ${photoURL}`);

          // Update user document in Firestore with the new photoURL
          const userRef = doc(db, 'users', userId);
          await updateDoc(userRef, {
            photoURL: photoURL,
            updatedAt: serverTimestamp()
          });

          // Update local state immediately for better UX
          setUsers(prev => prev.map(u => u.uid === userId ? { ...u, photoURL } : u));
          
          if (selectedUser && selectedUser.uid === userId) {
            setSelectedUser(prev => prev ? { ...prev, photoURL } : null);
          }

          // Audit log
          auditService.log({
            action: 'UPDATE_USER_AVATAR',
            actorId: user?.uid || 'unknown',
            actorEmail: user?.email || 'unknown',
            targetId: userId,
            targetType: 'user',
            details: 'Avatar updated via admin panel'
          });

          alert(isRTL ? 'تم تغيير الصورة بنجاح' : 'Avatar updated successfully');
        } catch (error: any) {
          console.error('[Avatar Update] Error:', error);
          alert(isRTL ? `حدث خطأ: ${error.message}` : `Error: ${error.message}`);
        } finally {
          setIsUpdatingAvatar(false);
        }
      };
      reader.onerror = () => {
        setIsUpdatingAvatar(false);
        alert(isRTL ? 'فشل في قراءة ملف الصورة' : 'Failed to read image file');
      };
    } catch (error) {
      console.error(error);
      setIsUpdatingAvatar(false);
    }
  };

  const updateUserRole = async (userId: string, newRole: 'user' | 'nutritionist' | 'admin' | 'doctor' | 'super_admin') => {
    try {
      // Security check: Only super_admin can assign super_admin role
      if (newRole === 'super_admin' && userProfile?.role !== 'super_admin') {
        alert(isRTL ? 'فقط السوبر أدمن يمكنه تعيين سوبر أدمن آخر' : 'Only Super Admin can assign another Super Admin');
        return;
      }

      // Security check: Admin cannot change their own role to super_admin
      if (userId === user?.uid && newRole === 'super_admin') {
         alert(isRTL ? 'لا يمكنك ترقية نفسك إلى سوبر أدمن' : 'You cannot promote yourself to Super Admin');
         return;
      }

      const userRef = doc(db, 'users', userId);
      
      // Define default permissions based on role
      let defaultPermissions: string[] = [];
      switch (newRole) {
        case 'super_admin':
          defaultPermissions = availablePermissions.map(p => p.id);
          break;
        case 'admin':
          defaultPermissions = [
            'manage_users', 'manage_content', 'view_reports', 'reply_consultations',
            'view_dashboard', 'access_admin_dashboard', 'monitor_activity'
          ];
          break;
        case 'doctor':
          defaultPermissions = [
            'view_patients', 'manage_patients', 'view_medical_data', 'manage_treatment_plans',
            'view_reports', 'reply_consultations', 'view_dashboard'
          ];
          break;
        case 'nutritionist':
          defaultPermissions = [
            'view_patients', 'create_meal_plans', 'view_nutritional_data', 'view_reports',
            'reply_consultations', 'view_dashboard', 'manage_treatment_plans'
          ];
          break;
        case 'user':
        default:
          defaultPermissions = [];
          break;
      }

      await updateDoc(userRef, {
        role: newRole,
        permissions: defaultPermissions, // Auto-assign default permissions
        updatedAt: serverTimestamp()
      });

      setUsers(prev => prev.map(u =>
        u.uid === userId ? { ...u, role: newRole, permissions: defaultPermissions } : u
      ));

      // Audit log
      auditService.log({
        action: 'UPDATE_USER_ROLE',
        actorId: user?.uid || 'unknown',
        actorEmail: user?.email || 'unknown',
        targetId: userId,
        targetType: 'user',
        details: `Role updated to ${newRole}`,
        metadata: { newRole }
      });

      alert(isRTL ? 'تم تحديث دور المستخدم بنجاح' : 'User role updated successfully');
    } catch (error) {
      console.error('Error updating user role:', error);
      alert(isRTL ? 'حدث خطأ أثناء تحديث دور المستخدم' : 'Error updating user role');
    }
  };

  const updateUserStatus = async (userId: string, newStatus: 'active' | 'inactive' | 'pending' | 'suspended', suspensionReason?: string) => {
    try {
      const userRef = doc(db, 'users', userId);
      const updateData: any = {
        status: newStatus,
        updatedAt: serverTimestamp()
      };

      // Handle suspension
      if (newStatus === 'suspended') {
        if (!suspensionReason) {
          const reason = prompt(isRTL ? 'أدخل سبب الإيقاف:' : 'Enter suspension reason:');
          if (!reason) return;
          suspensionReason = reason;
        }
        updateData.suspensionReason = suspensionReason;
        updateData.suspendedUntil = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
        updateData.isActive = false;
      } else if (newStatus === 'active') {
        updateData.isActive = true;
        updateData.suspensionReason = null;
        updateData.suspendedUntil = null;
      } else if (newStatus === 'inactive') {
        updateData.isActive = false;
      }

      await updateDoc(userRef, updateData);

      setUsers(prev => prev.map(u =>
        u.uid === userId ? {
          ...u,
          status: newStatus,
          isActive: newStatus === 'active',
          suspensionReason: updateData.suspensionReason,
          suspendedUntil: updateData.suspendedUntil
        } : u
      ));

      // Audit log
      auditService.log({
        action: `UPDATE_USER_STATUS_${newStatus.toUpperCase()}`,
        actorId: user?.uid || 'unknown',
        actorEmail: user?.email || 'unknown',
        targetId: userId,
        targetType: 'user',
        details: `Status updated to ${newStatus}`,
        metadata: { newStatus, suspensionReason: updateData.suspensionReason }
      });

      const statusText = isRTL ?
        `تم تحديث حالة المستخدم إلى: ${newStatus === 'active' ? 'نشط' :
          newStatus === 'inactive' ? 'غير نشط' :
            newStatus === 'pending' ? 'في الانتظار' : 'موقوف'
        }` :
        `User status updated to: ${newStatus}`;

      alert(statusText);
    } catch (error) {
      console.error('Error updating user status:', error);
      alert(isRTL ? 'حدث خطأ أثناء تحديث حالة المستخدم' : 'Error updating user status');
    }
  };

  const updateUserDetails = async (userId: string, updates: Partial<User>) => {
    try {
      console.log('🔄 محاولة تحديث المستخدم:', userId, updates);

      const userRef = doc(db, 'users', userId);
      const updateData = {
        ...updates,
        updatedAt: serverTimestamp()
      };

      // Remove undefined values
      Object.keys(updateData).forEach(key => {
        if ((updateData as any)[key] === undefined) {
          delete (updateData as any)[key];
        }
      });

      // console.log('📝 البيانات المرسلة:', updateData);

      await updateDoc(userRef, updateData);

      setUsers(prev => prev.map(u =>
        u.uid === userId ? { ...u, ...updates } : u
      ));

      setEditDialogOpen(false);
      setSelectedUser(null);

      // console.log('✅ تم التحديث بنجاح');
      alert(isRTL ? 'تم تحديث بيانات المستخدم بنجاح' : 'User details updated successfully');

    } catch (error: any) {
      console.error('❌ خطأ في تحديث بيانات المستخدم:', error);
      console.error('تفاصيل الخطأ:', error.code, error.message);

      let errorMessage = isRTL ? 'حدث خطأ أثناء تحديث بيانات المستخدم' : 'Error updating user details';

      if (error.code === 'permission-denied') {
        errorMessage = isRTL ? 'ليس لديك صلاحية لتحديث هذا المستخدم' : 'Permission denied to update this user';
      } else if (error.code === 'not-found') {
        errorMessage = isRTL ? 'المستخدم غير موجود' : 'User not found';
      }

      alert(errorMessage);
    }
  };

  const addNewUser = async () => {
    try {
      if (!newUserData.email || !newUserData.displayName) {
        alert(isRTL ? 'يرجى ملء البيانات المطلوبة' : 'Please fill required fields');
        return;
      }

      const userDoc = {
        ...newUserData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        isActive: true,
        status: 'pending', // New users start as pending until email verification
        emailVerified: false,
        createdBy: user?.uid
      };

      await addDoc(collection(db, 'users'), userDoc);

      // Reset form
      setNewUserData({
        email: '',
        displayName: '',
        role: 'user',
        phoneNumber: '',
        address: '',
        dateOfBirth: '',
        gender: 'male',
        specialization: '',
        licenseNumber: '',
        department: '',
        notes: ''
      });

      setAddDialogOpen(false);
      loadUsers(); // Reload users list
      alert(isRTL ? 'تم إضافة المستخدم بنجاح' : 'User added successfully');
    } catch (error) {
      console.error('Error adding user:', error);
      alert(isRTL ? 'حدث خطأ أثناء إضافة المستخدم' : 'Error adding user');
    }
  };

  const updateUserPermissions = async (userId: string, permissions: string[]) => {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        permissions,
        updatedAt: serverTimestamp()
      });

      setUsers(prev => prev.map(u =>
        u.uid === userId ? { ...u, permissions } : u
      ));

      setPermissionsDialogOpen(false);
      alert(isRTL ? 'تم تحديث الصلاحيات بنجاح' : 'Permissions updated successfully');
    } catch (error) {
      console.error('Error updating permissions:', error);
      alert(isRTL ? 'حدث خطأ أثناء تحديث الصلاحيات' : 'Error updating permissions');
    }
  };

  const handleSendPasswordReset = async (userEmail: string) => {
    try {
      await sendPasswordResetEmail(auth, userEmail);
      alert(isRTL ?
        `تم إرسال رابط إعادة تعيين كلمة المرور إلى ${userEmail}` :
        `Password reset link sent to ${userEmail}`
      );
    } catch (error) {
      console.error('Error sending password reset email:', error);
      alert(isRTL ? 'حدث خطأ أثناء إرسال البريد الإلكتروني' : 'Error sending email');
    }
  };

  const exportUsersData = () => {
    const csvContent = "data:text/csv;charset=utf-8,"
      + "Email,Name,Role,Phone,Status,Created\n"
      + users.map(u =>
        `${u.email},${u.displayName},${u.role},${u.phoneNumber || ''},${u.isActive ? 'Active' : 'Inactive'},${u.createdAt?.toDate?.()?.toLocaleDateString() || ''}`
      ).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "users_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const deleteUser = async (userId: string) => {
    if (!confirm(isRTL ? 'هل أنت متأكد من حذف هذا المستخدم؟' : 'Are you sure you want to delete this user?')) {
      return;
    }

    try {
      const userRef = doc(db, 'users', userId);
      await deleteDoc(userRef);

      setUsers(prev => prev.filter(u => u.uid !== userId));

      // Track data deletion
      trackDataDeletion('user', userId, user?.uid);

      // Audit log
      auditService.log({
        action: 'DELETE_USER',
        actorId: user?.uid || 'unknown',
        actorEmail: user?.email || 'unknown',
        targetId: userId,
        targetType: 'user',
        details: 'User deleted from system'
      });

      alert(isRTL ? 'تم حذف المستخدم بنجاح' : 'User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
      alert(isRTL ? 'حدث خطأ أثناء حذف المستخدم' : 'Error deleting user');
    }
  };

  const getRoleBadge = (role: string) => {
    const roleMap = {
      super_admin: { label: isRTL ? 'سوبر أدمن' : 'Super Admin', variant: 'destructive' as const, icon: Shield },
      admin: { label: isRTL ? 'مدير النظام' : 'Admin', variant: 'destructive' as const, icon: Shield },
      doctor: { label: isRTL ? 'دكتور جامعي' : 'Academic Expert', variant: 'secondary' as const, icon: Stethoscope },
      nutritionist: { label: isRTL ? 'أخصائي تغذية' : 'Nutritionist', variant: 'secondary' as const, icon: Stethoscope },
      user: { label: isRTL ? 'مستخدم عادي' : 'User', variant: 'outline' as const, icon: Users }
    };

    const roleInfo = roleMap[role as keyof typeof roleMap] || roleMap.user;
    const Icon = roleInfo.icon;

    return (
      <Badge variant={roleInfo.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {roleInfo.label}
      </Badge>
    );
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phoneNumber?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' ||
      (statusFilter === 'active' && user.status === 'active') ||
      (statusFilter === 'inactive' && user.status === 'inactive') ||
      (statusFilter === 'pending' && user.status === 'pending') ||
      (statusFilter === 'suspended' && user.status === 'suspended');
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getStatusBadge = (status: string, _isActive: boolean, _emailVerified: boolean, suspendedUntil?: any) => {
    // Check if suspension has expired
    if (status === 'suspended' && suspendedUntil && suspendedUntil.toDate() < new Date()) {
      status = 'active';
    }

    switch (status) {
      case 'active':
        return <Badge variant="default" className="flex items-center gap-1">
          <CheckCircle className="h-3 w-3" />
          {isRTL ? 'نشط' : 'Active'}
        </Badge>;
      case 'inactive':
        return <Badge variant="secondary" className="flex items-center gap-1">
          <Ban className="h-3 w-3" />
          {isRTL ? 'غير نشط' : 'Inactive'}
        </Badge>;
      case 'pending':
        return <Badge variant="outline" className="flex items-center gap-1">
          <AlertTriangle className="h-3 w-3" />
          {isRTL ? 'في الانتظار' : 'Pending'}
        </Badge>;
      case 'suspended':
        return <Badge variant="destructive" className="flex items-center gap-1">
          <Ban className="h-3 w-3" />
          {isRTL ? 'موقوف' : 'Suspended'}
        </Badge>;
      default:
        return <Badge variant="secondary" className="flex items-center gap-1">
          <AlertTriangle className="h-3 w-3" />
          {isRTL ? 'غير محدد' : 'Unknown'}
        </Badge>;
    }
  };

  const getGenderLabel = (gender?: string) => {
    const g = gender?.toLowerCase();
    if (g === 'male' || g === 'm') return isRTL ? 'ذكر' : 'Male';
    if (g === 'female' || g === 'f') return isRTL ? 'أنثى' : 'Female';
    return isRTL ? 'غير محدد' : 'Not specified';
  };

  if (userProfile?.role !== 'admin' && userProfile?.role !== 'super_admin') {
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
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold gradient-text flex items-center gap-3 mb-2">
            <Users className="h-8 w-8 text-primary" />
            {isRTL ? 'إدارة المستخدمين' : 'User Management'}
          </h1>
          <p className="text-muted-foreground">
            {isRTL ? 'إدارة وتحكم في جميع مستخدمي المنصة' : 'Manage and control all platform users'}
          </p>
        </div>

        {/* Filters and Actions */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4 mb-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={isRTL ? 'البحث بالبريد الإلكتروني أو الاسم أو الهاتف...' : 'Search by email, name, or phone...'}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder={isRTL ? 'تصفية حسب الدور' : 'Filter by role'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{isRTL ? 'جميع الأدوار' : 'All Roles'}</SelectItem>
                  <SelectItem value="admin">{isRTL ? 'مدير النظام' : 'Admin'}</SelectItem>
                  <SelectItem value="super_admin">{isRTL ? 'سوبر أدمن' : 'Super Admin'}</SelectItem>
                  <SelectItem value="doctor">{isRTL ? 'دكتور جامعي' : 'Academic Expert'}</SelectItem>
                  <SelectItem value="nutritionist">{isRTL ? 'أخصائي تغذية' : 'Nutritionist'}</SelectItem>
                  <SelectItem value="user">{isRTL ? 'مستخدم عادي' : 'User'}</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder={isRTL ? 'تصفية حسب الحالة' : 'Filter by status'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{isRTL ? 'جميع الحالات' : 'All Status'}</SelectItem>
                  <SelectItem value="active">{isRTL ? 'نشط' : 'Active'}</SelectItem>
                  <SelectItem value="inactive">{isRTL ? 'غير نشط' : 'Inactive'}</SelectItem>
                  <SelectItem value="pending">{isRTL ? 'في الانتظار' : 'Pending'}</SelectItem>
                  <SelectItem value="suspended">{isRTL ? 'موقوف' : 'Suspended'}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-wrap gap-2">
              <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2">
                    <UserPlus className="h-4 w-4" />
                    {isRTL ? 'إضافة مستخدم' : 'Add User'}
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{isRTL ? 'إضافة مستخدم جديد' : 'Add New User'}</DialogTitle>
                    <DialogDescription>
                      {isRTL ? 'أدخل بيانات المستخدم الجديد' : 'Enter the new user details'}
                    </DialogDescription>
                  </DialogHeader>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">{isRTL ? 'البريد الإلكتروني *' : 'Email *'}</Label>
                      <Input
                        id="email"
                        type="email"
                        value={newUserData.email}
                        onChange={(e) => setNewUserData(prev => ({ ...prev, email: e.target.value }))}
                        placeholder={isRTL ? 'أدخل البريد الإلكتروني' : 'Enter email'}
                      />
                    </div>
                    <div>
                      <Label htmlFor="displayName">{isRTL ? 'الاسم الكامل *' : 'Full Name *'}</Label>
                      <Input
                        id="displayName"
                        value={newUserData.displayName}
                        onChange={(e) => setNewUserData(prev => ({ ...prev, displayName: e.target.value }))}
                        placeholder={isRTL ? 'أدخل الاسم الكامل' : 'Enter full name'}
                      />
                    </div>
                    <div>
                      <Label htmlFor="role">{isRTL ? 'الدور' : 'Role'}</Label>
                      <Select
                        value={newUserData.role}
                        onValueChange={(value: 'user' | 'nutritionist' | 'admin' | 'doctor' | 'super_admin') => setNewUserData(prev => ({ ...prev, role: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="user">{isRTL ? 'مستخدم عادي' : 'User'}</SelectItem>
                          <SelectItem value="doctor">{isRTL ? 'دكتور جامعي' : 'Academic Expert'}</SelectItem>
                          <SelectItem value="nutritionist">{isRTL ? 'أخصائي تغذية' : 'Nutritionist'}</SelectItem>
                          <SelectItem value="admin">{isRTL ? 'مدير النظام' : 'Admin'}</SelectItem>
                          {userProfile?.role === 'super_admin' && (
                            <SelectItem value="super_admin">{isRTL ? 'سوبر أدمن' : 'Super Admin'}</SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="phoneNumber">{isRTL ? 'رقم الهاتف' : 'Phone Number'}</Label>
                      <Input
                        id="phoneNumber"
                        value={newUserData.phoneNumber}
                        onChange={(e) => setNewUserData(prev => ({ ...prev, phoneNumber: e.target.value }))}
                        placeholder={isRTL ? 'أدخل رقم الهاتف' : 'Enter phone number'}
                      />
                    </div>
                    <div>
                      <Label htmlFor="dateOfBirth">{isRTL ? 'تاريخ الميلاد' : 'Date of Birth'}</Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={newUserData.dateOfBirth}
                        onChange={(e) => setNewUserData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="gender">{isRTL ? 'الجنس' : 'Gender'}</Label>
                      <Select value={newUserData.gender} onValueChange={(value: 'male' | 'female') => setNewUserData(prev => ({ ...prev, gender: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">{isRTL ? 'ذكر' : 'Male'}</SelectItem>
                          <SelectItem value="female">{isRTL ? 'أنثى' : 'Female'}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {(newUserData.role === 'nutritionist' || newUserData.role === 'doctor') && (
                      <>
                        <div>
                          <Label htmlFor="specialization">{isRTL ? 'التخصص الدرجة العلمية' : 'Specialization / Academic Degree'}</Label>
                          <Input
                            id="specialization"
                            value={newUserData.specialization}
                            onChange={(e) => setNewUserData(prev => ({ ...prev, specialization: e.target.value }))}
                            placeholder={isRTL ? 'مثال: أستاذ تغذية إكلينيكية' : 'e.g. Professor of Clinical Nutrition'}
                          />
                        </div>
                        <div>
                          <Label htmlFor="licenseNumber">{isRTL ? 'رقم القيد / الترخيص' : 'License / ID Number'}</Label>
                          <Input
                            id="licenseNumber"
                            value={newUserData.licenseNumber}
                            onChange={(e) => setNewUserData(prev => ({ ...prev, licenseNumber: e.target.value }))}
                            placeholder={isRTL ? 'أدخل الرقم' : 'Enter number'}
                          />
                        </div>
                        <div>
                          <Label htmlFor="department">{isRTL ? 'الكلية / القسم' : 'Faculty / Department'}</Label>
                          <Input
                            id="department"
                            value={newUserData.department}
                            onChange={(e) => setNewUserData(prev => ({ ...prev, department: e.target.value }))}
                            placeholder={isRTL ? 'مثال: كلية الطب' : 'e.g. Faculty of Medicine'}
                          />
                        </div>
                      </>
                    )}

                    <div className="md:col-span-2">
                      <Label htmlFor="address">{isRTL ? 'العنوان' : 'Address'}</Label>
                      <Input
                        id="address"
                        value={newUserData.address}
                        onChange={(e) => setNewUserData(prev => ({ ...prev, address: e.target.value }))}
                        placeholder={isRTL ? 'أدخل العنوان' : 'Enter address'}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="notes">{isRTL ? 'ملاحظات إدارية' : 'Admin Notes'}</Label>
                      <Textarea
                        id="notes"
                        value={newUserData.notes}
                        onChange={(e) => setNewUserData(prev => ({ ...prev, notes: e.target.value }))}
                        placeholder={isRTL ? 'أدخل ملاحظات إدارية' : 'Enter admin notes'}
                        rows={3}
                      />
                    </div>
                  </div>

                  <DialogFooter>
                    <Button variant="outline" onClick={() => setAddDialogOpen(false)}>
                      {isRTL ? 'إلغاء' : 'Cancel'}
                    </Button>
                    <Button onClick={addNewUser}>
                      <UserPlus className="h-4 w-4 mr-2" />
                      {isRTL ? 'إضافة المستخدم' : 'Add User'}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Button variant="outline" onClick={exportUsersData} className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                {isRTL ? 'تصدير البيانات' : 'Export Data'}
              </Button>

              <Button variant="outline" className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                {isRTL ? 'استيراد البيانات' : 'Import Data'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Users List */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">
                {isRTL ? 'جاري تحميل المستخدمين...' : 'Loading users...'}
              </p>
            </div>
          ) : filteredUsers.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  {isRTL ? 'لا توجد نتائج' : 'No Results'}
                </h3>
                <p className="text-muted-foreground">
                  {isRTL ? 'لم يتم العثور على مستخدمين مطابقين للبحث' : 'No users found matching your search'}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredUsers.map((userData) => (
              <Card key={userData.uid} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4 w-full md:w-auto">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        {userData.photoURL ? (
                          <img src={userData.photoURL} alt={userData.displayName} className="w-12 h-12 rounded-full" />
                        ) : (
                          <Users className="h-6 w-6 text-primary" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h3 className="font-semibold truncate max-w-[200px]">{userData.displayName || userData.email}</h3>
                          {getRoleBadge(userData.role)}
                          {getStatusBadge(userData.status, userData.isActive, userData.emailVerified, userData.suspendedUntil)}
                        </div>
                        <p className="text-sm text-muted-foreground break-all">{userData.email}</p>
                        {userData.phoneNumber && (
                          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                            <Phone className="h-3 w-3" />
                            {userData.phoneNumber}
                          </p>
                        )}
                        <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {userData.createdAt?.toDate?.()?.toLocaleDateString(isRTL ? 'ar-EG' : 'en-US') || 'تاريخ غير محدد'}
                          </span>
                          {userData.lastLogin && (
                            <span className="flex items-center gap-1">
                              <Activity className="h-3 w-3" />
                              {isRTL ? 'آخر دخول:' : 'Last login:'} {userData.lastLogin.toDate?.()?.toLocaleDateString(isRTL ? 'ar-EG' : 'en-US')}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end md:self-auto w-full md:w-auto justify-end">
                      {/* View Details */}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedUser(userData);
                          setViewDialogOpen(true);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>

                      {/* Edit User */}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedUser(userData);
                          setEditDialogOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>

                      {/* Permissions (Super Admin Only) */}
                      {userProfile?.role === 'super_admin' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedUser(userData);
                            setSelectedPermissions(userData.permissions || []);
                            setPermissionsDialogOpen(true);
                          }}
                          title={isRTL ? 'إدارة الصلاحيات' : 'Manage Permissions'}
                        >
                          <Shield className="h-4 w-4 text-purple-600" />
                        </Button>
                      )}

                      {/* Role Selector */}
                      <Select
                        value={userData.role}
                        onValueChange={(newRole: 'user' | 'doctor' | 'nutritionist' | 'admin' | 'super_admin') => updateUserRole(userData.uid, newRole)}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="user">{isRTL ? 'مستخدم' : 'User'}</SelectItem>
                          <SelectItem value="doctor">{isRTL ? 'دكتور جامعي' : 'Academic Expert'}</SelectItem>
                          <SelectItem value="nutritionist">{isRTL ? 'أخصائي تغذية' : 'Nutritionist'}</SelectItem>
                          <SelectItem value="admin">{isRTL ? 'مدير' : 'Admin'}</SelectItem>
                          {userProfile?.role === 'super_admin' && (
                            <SelectItem value="super_admin">{isRTL ? 'سوبر أدمن' : 'Super Admin'}</SelectItem>
                          )}
                        </SelectContent>
                      </Select>

                      {/* Status Management */}
                      <Select
                        value={userData.status}
                        onValueChange={(newStatus: 'active' | 'inactive' | 'pending' | 'suspended') =>
                          updateUserStatus(userData.uid, newStatus)
                        }
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">{isRTL ? 'نشط' : 'Active'}</SelectItem>
                          <SelectItem value="inactive">{isRTL ? 'غير نشط' : 'Inactive'}</SelectItem>
                          <SelectItem value="pending">{isRTL ? 'في الانتظار' : 'Pending'}</SelectItem>
                          <SelectItem value="suspended">{isRTL ? 'موقوف' : 'Suspended'}</SelectItem>
                        </SelectContent>
                      </Select>

                      {/* Send Password Reset */}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSendPasswordReset(userData.email)}
                      >
                        <Key className="h-4 w-4" />
                      </Button>

                      {/* Delete User */}
                      {userData.uid !== user?.uid && (
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                {isRTL ? 'تأكيد الحذف' : 'Confirm Deletion'}
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                {isRTL ?
                                  `هل أنت متأكد من حذف المستخدم "${userData.displayName || userData.email}"؟ هذا الإجراء لا يمكن التراجع عنه.` :
                                  `Are you sure you want to delete user "${userData.displayName || userData.email}"? This action cannot be undone.`
                                }
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>
                                {isRTL ? 'إلغاء' : 'Cancel'}
                              </AlertDialogCancel>
                              <AlertDialogAction onClick={() => deleteUser(userData.uid)}>
                                {isRTL ? 'حذف' : 'Delete'}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Edit User Dialog */}
        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{isRTL ? 'تعديل بيانات المستخدم' : 'Edit User Details'}</DialogTitle>
              <DialogDescription>
                {isRTL ? 'تعديل بيانات المستخدم المحدد' : 'Edit the selected user details'}
              </DialogDescription>
            </DialogHeader>

            {selectedUser && (
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center gap-4">
                  <div className="relative group w-24 h-24">
                    <div className="w-full h-full bg-primary/10 rounded-full flex items-center justify-center overflow-hidden">
                      {selectedUser.photoURL ? (
                        <img src={selectedUser.photoURL} alt={selectedUser.displayName} className="w-full h-full object-cover" />
                      ) : (
                        <Users className="h-10 w-10 text-primary" />
                      )}
                    </div>
                  </div>
                  {userProfile?.role && roleManager.hasPermission(userProfile.role, 'users.edit_avatar') && (
                    <div>
                      <Label className={`cursor-pointer text-primary text-sm font-semibold flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 rounded-full transition-colors ${isUpdatingAvatar ? 'opacity-50 pointer-events-none' : ''}`}>
                        <Upload className="h-4 w-4" />
                        {isUpdatingAvatar ? (isRTL ? 'جاري التحميل...' : 'Uploading...') : (isRTL ? 'تغيير الصورة' : 'Change Avatar')}
                        <input type="file" className="hidden" accept="image/*" onChange={(e) => handleUploadAvatar(selectedUser.uid, e.target.files?.[0])} disabled={isUpdatingAvatar} />
                      </Label>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit-email">{isRTL ? 'البريد الإلكتروني' : 'Email'}</Label>
                    <Input
                      id="edit-email"
                      type="email"
                      value={selectedUser.email}
                      onChange={(e) => setSelectedUser(prev => prev ? { ...prev, email: e.target.value } : null)}
                      placeholder={isRTL ? 'أدخل البريد الإلكتروني' : 'Enter email'}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-displayName">{isRTL ? 'الاسم الكامل' : 'Full Name'}</Label>
                    <Input
                      id="edit-displayName"
                      value={selectedUser.displayName || ''}
                      onChange={(e) => setSelectedUser(prev => prev ? { ...prev, displayName: e.target.value } : null)}
                      placeholder={isRTL ? 'أدخل الاسم الكامل' : 'Enter full name'}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-role">{isRTL ? 'الدور' : 'Role'}</Label>
                    <Select
                      value={selectedUser.role}
                      onValueChange={(value: 'user' | 'nutritionist' | 'admin' | 'super_admin') =>
                        setSelectedUser(prev => prev ? { ...prev, role: value } : null)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="user">{isRTL ? 'مستخدم عادي' : 'User'}</SelectItem>
                        <SelectItem value="doctor">{isRTL ? 'دكتور جامعي' : 'Academic Expert'}</SelectItem>
                        <SelectItem value="nutritionist">{isRTL ? 'أخصائي تغذية' : 'Nutritionist'}</SelectItem>
                        <SelectItem value="admin">{isRTL ? 'مدير النظام' : 'Admin'}</SelectItem>
                        {userProfile?.role === 'super_admin' && (
                          <SelectItem value="super_admin">{isRTL ? 'سوبر أدمن' : 'Super Admin'}</SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="edit-phoneNumber">{isRTL ? 'رقم الهاتف' : 'Phone Number'}</Label>
                    <Input
                      id="edit-phoneNumber"
                      value={selectedUser.phoneNumber || ''}
                      onChange={(e) => setSelectedUser(prev => prev ? { ...prev, phoneNumber: e.target.value } : null)}
                      placeholder={isRTL ? 'أدخل رقم الهاتف' : 'Enter phone number'}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-dateOfBirth">{isRTL ? 'تاريخ الميلاد' : 'Date of Birth'}</Label>
                    <Input
                      id="edit-dateOfBirth"
                      type="date"
                      value={selectedUser.dateOfBirth || ''}
                      onChange={(e) => setSelectedUser(prev => prev ? { ...prev, dateOfBirth: e.target.value } : null)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-gender">{isRTL ? 'الجنس' : 'Gender'}</Label>
                    <Select
                      value={selectedUser.gender || 'male'}
                      onValueChange={(value: 'male' | 'female') =>
                        setSelectedUser(prev => prev ? { ...prev, gender: value } : null)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">{isRTL ? 'ذكر' : 'Male'}</SelectItem>
                        <SelectItem value="female">{isRTL ? 'أنثى' : 'Female'}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {(selectedUser.role === 'nutritionist' || selectedUser.role === 'doctor') && (
                    <>
                      <div>
                        <Label htmlFor="edit-specialization">{isRTL ? 'التخصص الدرجة العلمية' : 'Specialization / Academic Degree'}</Label>
                        <Input
                          id="edit-specialization"
                          value={selectedUser.specialization || ''}
                          onChange={(e) => setSelectedUser(prev => prev ? { ...prev, specialization: e.target.value } : null)}
                          placeholder={isRTL ? 'مثال: أستاذ تغذية إكلينيكية' : 'e.g. Professor of Clinical Nutrition'}
                        />
                      </div>
                      <div>
                        <Label htmlFor="edit-licenseNumber">{isRTL ? 'رقم القيد / الترخيص' : 'License / ID Number'}</Label>
                        <Input
                          id="edit-licenseNumber"
                          value={selectedUser.licenseNumber || ''}
                          onChange={(e) => setSelectedUser(prev => prev ? { ...prev, licenseNumber: e.target.value } : null)}
                          placeholder={isRTL ? 'أدخل الرقم' : 'Enter number'}
                        />
                      </div>
                      <div>
                        <Label htmlFor="edit-department">{isRTL ? 'الكلية / القسم' : 'Faculty / Department'}</Label>
                        <Input
                          id="edit-department"
                          value={selectedUser.department || ''}
                          onChange={(e) => setSelectedUser(prev => prev ? { ...prev, department: e.target.value } : null)}
                          placeholder={isRTL ? 'مثال: كلية الطب' : 'e.g. Faculty of Medicine'}
                        />
                      </div>
                    </>
                  )}

                  <div className="md:col-span-2">
                    <Label htmlFor="edit-address">{isRTL ? 'العنوان' : 'Address'}</Label>
                    <Input
                      id="edit-address"
                      value={selectedUser.address || ''}
                      onChange={(e) => setSelectedUser(prev => prev ? { ...prev, address: e.target.value } : null)}
                      placeholder={isRTL ? 'أدخل العنوان' : 'Enter address'}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="edit-notes">{isRTL ? 'ملاحظات إدارية' : 'Admin Notes'}</Label>
                    <Textarea
                      id="edit-notes"
                      value={selectedUser.notes || ''}
                      onChange={(e) => setSelectedUser(prev => prev ? { ...prev, notes: e.target.value } : null)}
                      placeholder={isRTL ? 'أدخل ملاحظات إدارية' : 'Enter admin notes'}
                      rows={3}
                    />
                  </div>
                  <div className="md:col-span-2 flex items-center space-x-2">
                    <Switch
                      id="edit-isActive"
                      checked={selectedUser.isActive}
                      onCheckedChange={(checked) => setSelectedUser(prev => prev ? { ...prev, isActive: checked } : null)}
                    />
                    <Label htmlFor="edit-isActive">{isRTL ? 'المستخدم نشط' : 'User Active'}</Label>
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="edit-status">{isRTL ? 'حالة المستخدم' : 'User Status'}</Label>
                    <Select
                      value={selectedUser.status}
                      onValueChange={(value: 'active' | 'inactive' | 'pending' | 'suspended') =>
                        setSelectedUser(prev => prev ? { ...prev, status: value } : null)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">{isRTL ? 'نشط' : 'Active'}</SelectItem>
                        <SelectItem value="inactive">{isRTL ? 'غير نشط' : 'Inactive'}</SelectItem>
                        <SelectItem value="pending">{isRTL ? 'في الانتظار' : 'Pending'}</SelectItem>
                        <SelectItem value="suspended">{isRTL ? 'موقوف' : 'Suspended'}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {selectedUser.status === 'suspended' && (
                    <div className="md:col-span-2">
                      <Label htmlFor="edit-suspensionReason">{isRTL ? 'سبب الإيقاف' : 'Suspension Reason'}</Label>
                      <Textarea
                        id="edit-suspensionReason"
                        value={selectedUser.suspensionReason || ''}
                        onChange={(e) => setSelectedUser(prev => prev ? { ...prev, suspensionReason: e.target.value } : null)}
                        placeholder={isRTL ? 'أدخل سبب الإيقاف' : 'Enter suspension reason'}
                        rows={2}
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            <DialogFooter>
              <Button variant="outline" onClick={() => {
                setEditDialogOpen(false);
                setSelectedUser(null);
              }}>
                {isRTL ? 'إلغاء' : 'Cancel'}
              </Button>
              <Button onClick={() => {
                if (selectedUser) {
                  updateUserDetails(selectedUser.uid, {
                    email: selectedUser.email,
                    displayName: selectedUser.displayName,
                    role: selectedUser.role,
                    phoneNumber: selectedUser.phoneNumber,
                    address: selectedUser.address,
                    dateOfBirth: selectedUser.dateOfBirth,
                    gender: selectedUser.gender,
                    specialization: selectedUser.specialization,
                    licenseNumber: selectedUser.licenseNumber,
                    department: selectedUser.department,
                    notes: selectedUser.notes,
                    isActive: selectedUser.isActive,
                    status: selectedUser.status,
                    suspensionReason: selectedUser.suspensionReason
                  });
                }
              }}>
                <Edit className="h-4 w-4 mr-2" />
                {isRTL ? 'حفظ التغييرات' : 'Save Changes'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Permissions Dialog */}
        <Dialog open={permissionsDialogOpen} onOpenChange={setPermissionsDialogOpen}>
          <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{isRTL ? 'إدارة الصلاحيات' : 'Manage Permissions'}</DialogTitle>
              <DialogDescription>
                {isRTL 
                  ? `تحديد الصلاحيات الدقيقة للمستخدم: ${selectedUser?.displayName}`
                  : `Set granular permissions for user: ${selectedUser?.displayName}`
                }
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-4 space-y-4">
              <div className="flex justify-between items-center mb-4">
                <Button variant="outline" size="sm" onClick={() => setSelectedPermissions(availablePermissions.map(p => p.id))}>
                  {isRTL ? 'تحديد الكل' : 'Select All'}
                </Button>
                <Button variant="outline" size="sm" onClick={() => setSelectedPermissions([])}>
                  {isRTL ? 'إلغاء الكل' : 'Deselect All'}
                </Button>
              </div>
              
              <div className="grid grid-cols-1 gap-3">
                {availablePermissions.map((permission) => (
                  <div key={permission.id} className="flex items-center space-x-2 p-2 hover:bg-muted/50 rounded-md">
                    <Switch
                      id={`perm-${permission.id}`}
                      checked={selectedPermissions.includes(permission.id)}
                      onCheckedChange={(checked) => {
                        setSelectedPermissions(prev => 
                          checked 
                            ? [...prev, permission.id]
                            : prev.filter(p => p !== permission.id)
                        );
                      }}
                    />
                    <Label htmlFor={`perm-${permission.id}`} className="cursor-pointer flex-1">
                      {permission.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setPermissionsDialogOpen(false)}>
                {isRTL ? 'إلغاء' : 'Cancel'}
              </Button>
              <Button onClick={() => selectedUser && updateUserPermissions(selectedUser.uid, selectedPermissions)}>
                {isRTL ? 'حفظ الصلاحيات' : 'Save Permissions'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* View User Details Dialog */}
        <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{isRTL ? 'تفاصيل المستخدم' : 'User Details'}</DialogTitle>
              <DialogDescription>
                {isRTL ? 'عرض تفاصيل المستخدم الكاملة' : 'View complete user details'}
              </DialogDescription>
            </DialogHeader>

            {selectedUser && (
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">{isRTL ? 'نظرة عامة' : 'Overview'}</TabsTrigger>
                  <TabsTrigger value="details">{isRTL ? 'التفاصيل' : 'Details'}</TabsTrigger>
                  <TabsTrigger value="activity">{isRTL ? 'النشاط' : 'Activity'}</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                      {selectedUser.photoURL ? (
                        <img src={selectedUser.photoURL} alt={selectedUser.displayName} className="w-16 h-16 rounded-full" />
                      ) : (
                        <Users className="h-8 w-8 text-primary" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{selectedUser.displayName || selectedUser.email}</h3>
                      <p className="text-muted-foreground">{selectedUser.email}</p>
                      <div className="flex items-center gap-2 mt-2">
                        {getRoleBadge(selectedUser.role)}
                        {getStatusBadge(selectedUser.status, selectedUser.isActive, selectedUser.emailVerified, selectedUser.suspendedUntil)}
                      </div>
                      {selectedUser.status === 'suspended' && selectedUser.suspendedUntil && (
                        <p className="text-sm text-red-600 mt-2">
                          {isRTL ? 'موقوف حتى:' : 'Suspended until:'} {selectedUser.suspendedUntil.toDate?.()?.toLocaleDateString(isRTL ? 'ar-EG' : 'en-US')}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">{isRTL ? 'تاريخ التسجيل' : 'Registration Date'}</Label>
                      <p className="text-sm text-muted-foreground">
                        {selectedUser.createdAt?.toDate?.()?.toLocaleDateString(isRTL ? 'ar-EG' : 'en-US') || 'غير محدد'}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">{isRTL ? 'آخر دخول' : 'Last Login'}</Label>
                      <p className="text-sm text-muted-foreground">
                        {selectedUser.lastLogin?.toDate?.()?.toLocaleDateString(isRTL ? 'ar-EG' : 'en-US') || 'لم يسجل دخول بعد'}
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="details" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">{isRTL ? 'البريد الإلكتروني' : 'Email'}</Label>
                      <p className="text-sm">{selectedUser.email}</p>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">{isRTL ? 'الاسم الكامل' : 'Full Name'}</Label>
                      <p className="text-sm">{selectedUser.displayName || 'غير محدد'}</p>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">{isRTL ? 'رقم الهاتف' : 'Phone Number'}</Label>
                      <p className="text-sm">{selectedUser.phoneNumber || 'غير محدد'}</p>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">{isRTL ? 'تاريخ الميلاد' : 'Date of Birth'}</Label>
                      <p className="text-sm">{selectedUser.dateOfBirth || 'غير محدد'}</p>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">{isRTL ? 'الجنس' : 'Gender'}</Label>
                      <p className="text-sm">{getGenderLabel(selectedUser.gender)}</p>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">{isRTL ? 'حالة المستخدم' : 'User Status'}</Label>
                      <p className="text-sm">{
                        selectedUser.status === 'active' ? (isRTL ? 'نشط' : 'Active') :
                          selectedUser.status === 'inactive' ? (isRTL ? 'غير نشط' : 'Inactive') :
                            selectedUser.status === 'pending' ? (isRTL ? 'في الانتظار' : 'Pending') :
                              selectedUser.status === 'suspended' ? (isRTL ? 'موقوف' : 'Suspended') :
                                (isRTL ? 'غير محدد' : 'Unknown')
                      }</p>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">{isRTL ? 'تأكيد البريد الإلكتروني' : 'Email Verified'}</Label>
                      <p className="text-sm">{selectedUser.emailVerified ? (isRTL ? 'مؤكد' : 'Verified') : (isRTL ? 'غير مؤكد' : 'Not Verified')}</p>
                    </div>

                    {selectedUser.status === 'suspended' && (
                      <>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">{isRTL ? 'سبب الإيقاف' : 'Suspension Reason'}</Label>
                          <p className="text-sm">{selectedUser.suspensionReason || (isRTL ? 'غير محدد' : 'Not specified')}</p>
                        </div>
                        {selectedUser.suspendedUntil && (
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">{isRTL ? 'موقوف حتى' : 'Suspended Until'}</Label>
                            <p className="text-sm">{selectedUser.suspendedUntil.toDate?.()?.toLocaleDateString(isRTL ? 'ar-EG' : 'en-US')}</p>
                          </div>
                        )}
                      </>
                    )}

                    {(selectedUser.role === 'doctor' || selectedUser.role === 'nutritionist') && (
                      <>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">{isRTL ? 'التخصص' : 'Specialization'}</Label>
                          <p className="text-sm">{selectedUser.specialization || 'غير محدد'}</p>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">{isRTL ? 'رقم الترخيص' : 'License Number'}</Label>
                          <p className="text-sm">{selectedUser.licenseNumber || 'غير محدد'}</p>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">{isRTL ? 'القسم' : 'Department'}</Label>
                          <p className="text-sm">{selectedUser.department || 'غير محدد'}</p>
                        </div>
                      </>
                    )}

                    <div className="md:col-span-2 space-y-2">
                      <Label className="text-sm font-medium">{isRTL ? 'العنوان' : 'Address'}</Label>
                      <p className="text-sm">{selectedUser.address || 'غير محدد'}</p>
                    </div>

                    {selectedUser.notes && (
                      <div className="md:col-span-2 space-y-2">
                        <Label className="text-sm font-medium">{isRTL ? 'ملاحظات إدارية' : 'Admin Notes'}</Label>
                        <p className="text-sm bg-muted/50 p-3 rounded-lg">{selectedUser.notes}</p>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="activity" className="space-y-4">
                  <ActivityLogTab userId={selectedUser.uid} isRTL={isRTL} />
                </TabsContent>
              </Tabs>
            )}

            <DialogFooter>
              <Button variant="outline" onClick={() => {
                setViewDialogOpen(false);
                setSelectedUser(null);
                setActiveTab('overview');
              }}>
                {isRTL ? 'إغلاق' : 'Close'}
              </Button>
              <Button onClick={() => {
                setViewDialogOpen(false);
                setEditDialogOpen(true);
              }}>
                <Edit className="h-4 w-4 mr-2" />
                {isRTL ? 'تعديل' : 'Edit'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default UserManagement;