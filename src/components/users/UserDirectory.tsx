import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Search,
  Users,
  Shield,
  Stethoscope,
  Phone,
  Mail,
} from 'lucide-react';

interface User {
  uid: string;
  email: string;
  displayName: string;
  role: 'user' | 'nutritionist' | 'admin';
  photoURL?: string;
  phoneNumber?: string;
  address?: string;
  specialization?: string;
}

export const UserDirectory: React.FC = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const usersQuery = collection(db, 'users');
      const snapshot = await getDocs(usersQuery);
      const fetchedUsers = snapshot.docs.map(doc => ({
        uid: doc.id,
        ...doc.data()
      })) as User[];
      setUsers(fetchedUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRoleBadge = (role: string) => {
    const roleMap = {
      admin: { label: isRTL ? 'مدير النظام' : 'Admin', variant: 'destructive' as const, icon: Shield },
      nutritionist: { label: isRTL ? 'أخصائي تغذية' : 'Nutritionist', variant: 'secondary' as const, icon: Stethoscope },
      user: { label: isRTL ? 'مستخدم' : 'User', variant: 'outline' as const, icon: Users }
    };

    const roleInfo = roleMap[role as keyof typeof roleMap] || roleMap.user;
    const Icon = roleInfo.icon;

    return (
      <Badge variant={roleInfo.variant} className="flex items-center gap-1 w-fit">
        <Icon className="h-3 w-3" />
        {roleInfo.label}
      </Badge>
    );
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch =
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.displayName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card className="border-none shadow-md">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={isRTL ? 'بحث بالاسم أو البريد...' : 'Search by name or email...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder={isRTL ? 'التصنيف' : 'Filter Role'} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{isRTL ? 'الكل' : 'All Users'}</SelectItem>
                <SelectItem value="admin">{isRTL ? 'المشرفين' : 'Admins'}</SelectItem>
                <SelectItem value="user">{isRTL ? 'المستخدمين' : 'Users'}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Grid */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">{isRTL ? 'جاري التحميل...' : 'Loading...'}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <Card key={user.uid} className="hover:shadow-lg transition-all duration-300 group overflow-hidden border-t-4 border-t-transparent hover:border-t-primary">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      {user.photoURL ? (
                        <img src={user.photoURL} alt={user.displayName} className="w-full h-full rounded-full object-cover" />
                      ) : (
                        <Users className="h-6 w-6" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg line-clamp-1">{user.displayName || 'Unnamed User'}</h3>
                      {getRoleBadge(user.role)}
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
                    <Mail className="h-4 w-4 text-primary" />
                    <span className="truncate">{user.email}</span>
                  </div>
                  {user.phoneNumber && (
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
                      <Phone className="h-4 w-4 text-primary" />
                      <span>{user.phoneNumber}</span>
                    </div>
                  )}
                  {user.specialization && user.role === 'nutritionist' && (
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300">
                      <Stethoscope className="h-4 w-4" />
                      <span>{user.specialization}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
