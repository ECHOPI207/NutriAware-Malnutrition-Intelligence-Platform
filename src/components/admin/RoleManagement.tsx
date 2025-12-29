import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { roleManager, UserRole } from '@/services/role-manager';
import { useAuth } from '@/features/auth/firebase-auth-context';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Shield, UserCheck, UserX, Crown, Stethoscope, User } from 'lucide-react';

interface UserWithRole {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  created_at: string;
}

export const RoleManagement = () => {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const { user } = useAuth();
  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<UserWithRole | null>(null);
  const [newRole, setNewRole] = useState<UserRole>('user');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const isRTL = i18n.language === 'ar';

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    if (!user?.id) return;
    
    try {
      setLoading(true);
      const data = await roleManager.getAllUsersWithRoles(user.id);
      setUsers(data || []);
    } catch (error: any) {
      toast({
        title: t('auth.error'),
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async () => {
    if (!selectedUser || !user?.id) return;

    try {
      await roleManager.assignRole(selectedUser.id, newRole, user.id);
      
      toast({
        title: t('auth.success'),
        description: isRTL 
          ? `تم تغيير دور ${selectedUser.full_name} إلى ${getRoleLabel(newRole)}`
          : `Successfully changed ${selectedUser.full_name}'s role to ${getRoleLabel(newRole)}`,
      });
      
      setIsDialogOpen(false);
      setSelectedUser(null);
      await loadUsers();
    } catch (error: any) {
      toast({
        title: t('auth.error'),
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleRemoveRole = async (userId: string, userName: string) => {
    if (!user?.id) return;

    try {
      await roleManager.removeRole(userId, user.id);
      
      toast({
        title: t('auth.success'),
        description: isRTL 
          ? `تم إزالة الدور الخاص من ${userName}`
          : `Successfully removed special role from ${userName}`,
      });
      
      await loadUsers();
    } catch (error: any) {
      toast({
        title: t('auth.error'),
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return <Crown className="h-4 w-4 text-yellow-600" />;
      case 'doctor':
        return <Stethoscope className="h-4 w-4 text-blue-600" />;
      default:
        return <User className="h-4 w-4 text-gray-600" />;
    }
  };

  const getRoleLabel = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return isRTL ? 'مدير النظام' : 'Administrator';
      case 'doctor':
        return isRTL ? 'طبيب' : 'Doctor';
      default:
        return isRTL ? 'مستخدم عادي' : 'Regular User';
    }
  };

  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'doctor':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Header */}
      <div className="flex items-center gap-3">
        <Shield className="h-6 w-6 text-blue-600" />
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {isRTL ? 'إدارة الأدوار والصلاحيات' : 'Role & Permission Management'}
          </h2>
          <p className="text-gray-600">
            {isRTL 
              ? 'إدارة أدوار المستخدمين وصلاحياتهم في النظام'
              : 'Manage user roles and permissions in the system'
            }
          </p>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg border shadow-sm">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {isRTL ? 'قائمة المستخدمين' : 'Users List'}
          </h3>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{isRTL ? 'المستخدم' : 'User'}</TableHead>
                <TableHead>{isRTL ? 'البريد الإلكتروني' : 'Email'}</TableHead>
                <TableHead>{isRTL ? 'الدور الحالي' : 'Current Role'}</TableHead>
                <TableHead>{isRTL ? 'تاريخ التسجيل' : 'Joined Date'}</TableHead>
                <TableHead>{isRTL ? 'الإجراءات' : 'Actions'}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((userData) => (
                <TableRow key={userData.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {getRoleIcon(userData.role)}
                      {userData.full_name || 'Unknown User'}
                    </div>
                  </TableCell>
                  <TableCell>{userData.email}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getRoleBadgeColor(userData.role)}`}>
                      {getRoleLabel(userData.role)}
                    </span>
                  </TableCell>
                  <TableCell>
                    {new Date(userData.created_at).toLocaleDateString(isRTL ? 'ar-EG' : 'en-US')}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Dialog open={isDialogOpen && selectedUser?.id === userData.id} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedUser(userData);
                              setNewRole(userData.role);
                              setIsDialogOpen(true);
                            }}
                          >
                            <UserCheck className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>
                              {isRTL ? 'تغيير دور المستخدم' : 'Change User Role'}
                            </DialogTitle>
                            <DialogDescription>
                              {isRTL 
                                ? `تغيير دور ${selectedUser?.full_name}`
                                : `Change role for ${selectedUser?.full_name}`
                              }
                            </DialogDescription>
                          </DialogHeader>
                          
                          <div className="space-y-4">
                            <div>
                              <Label>{isRTL ? 'الدور الجديد' : 'New Role'}</Label>
                              <Select value={newRole} onValueChange={(value: UserRole) => setNewRole(value)}>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="user">
                                    <div className="flex items-center gap-2">
                                      <User className="h-4 w-4" />
                                      {getRoleLabel('user')}
                                    </div>
                                  </SelectItem>
                                  <SelectItem value="doctor">
                                    <div className="flex items-center gap-2">
                                      <Stethoscope className="h-4 w-4" />
                                      {getRoleLabel('doctor')}
                                    </div>
                                  </SelectItem>
                                  <SelectItem value="admin">
                                    <div className="flex items-center gap-2">
                                      <Crown className="h-4 w-4" />
                                      {getRoleLabel('admin')}
                                    </div>
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                              {t('common.cancel')}
                            </Button>
                            <Button onClick={handleRoleChange}>
                              {isRTL ? 'تغيير الدور' : 'Change Role'}
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      
                      {userData.role !== 'user' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRemoveRole(userData.id, userData.full_name)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <UserX className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Role Permissions Info */}
      <div className="bg-white rounded-lg border shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {isRTL ? 'صلاحيات الأدوار' : 'Role Permissions'}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <User className="h-5 w-5 text-gray-600" />
              <h4 className="font-semibold">{getRoleLabel('user')}</h4>
            </div>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• {isRTL ? 'استخدام أدوات التقييم' : 'Use assessment tools'}</li>
              <li>• {isRTL ? 'قراءة المقالات' : 'Read articles'}</li>
              <li>• {isRTL ? 'استخدام الشات بوت' : 'Use chatbot'}</li>
            </ul>
          </div>
          
          <div className="p-4 border rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Stethoscope className="h-5 w-5 text-blue-600" />
              <h4 className="font-semibold">{getRoleLabel('doctor')}</h4>
            </div>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• {isRTL ? 'جميع صلاحيات المستخدم العادي' : 'All user permissions'}</li>
              <li>• {isRTL ? 'الوصول للوحة التحكم' : 'Access dashboard'}</li>
              <li>• {isRTL ? 'عرض بيانات المرضى' : 'View patient data'}</li>
              <li>• {isRTL ? 'عرض الإحصائيات' : 'View analytics'}</li>
            </ul>
          </div>
          
          <div className="p-4 border rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Crown className="h-5 w-5 text-yellow-600" />
              <h4 className="font-semibold">{getRoleLabel('admin')}</h4>
            </div>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• {isRTL ? 'جميع صلاحيات الطبيب' : 'All doctor permissions'}</li>
              <li>• {isRTL ? 'إدارة المستخدمين' : 'Manage users'}</li>
              <li>• {isRTL ? 'إدارة الأدوار' : 'Manage roles'}</li>
              <li>• {isRTL ? 'تعديل المحتوى' : 'Modify content'}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};