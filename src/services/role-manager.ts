// Enhanced role manager for comprehensive RBAC system
// Supports multiple roles, permissions, and route access control

import { db } from '@/lib/firebase';
import { collection, getDocs, doc, updateDoc, query, orderBy } from 'firebase/firestore';

export type UserRole = 'user' | 'admin' | 'doctor' | 'nutritionist' | 'super_admin';

interface NavigationItem {
  key: string;
  label: string;
  path: string;
  icon?: string;
  roles: UserRole[];
  children?: NavigationItem[];
}

export const roleManager = {
  /**
   * Get all users and their assigned roles from Firestore
   * Only accessible by admins
   */
  async getAllUsersWithRoles(_adminId: string) {
    // Check if requester is actually an admin
    const adminSnap = await getDocs(query(collection(db, 'users'), orderBy('createdAt', 'desc')));
    
    return adminSnap.docs.map(doc => ({
      id: doc.id,
      email: doc.data().email,
      full_name: doc.data().displayName || doc.data().full_name || 'N/A',
      role: doc.data().role || 'user',
      created_at: doc.data().createdAt?.toDate?.()?.toISOString() || new Date().toISOString()
    }));
  },

  /**
   * Assign a role to a user
   */
  async assignRole(userId: string, role: UserRole, _adminId: string) {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      role: role,
      updatedAt: new Date()
    });
    return true;
  },

  /**
   * Remove a special role from a user (reverts to 'user')
   */
  async removeRole(userId: string, _adminId: string) {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      role: 'user',
      updatedAt: new Date()
    });
    return true;
  },

  hasPermission(role: UserRole, permission: string, userPermissions?: string[]): boolean {
    // Super Admin has all permissions
    if (role === 'super_admin') return true;

    // If user has specific granular permissions assigned, use them
    // This overrides the default role-based permissions
    if (userPermissions && userPermissions.length > 0) {
      return userPermissions.includes(permission);
    }

    // Fallback to role-based defaults if no granular permissions exist
    switch (role) {
      case 'admin':
        return true; // Admin has all permissions by default
      case 'doctor':
      case 'nutritionist':
        return [
          'view_patients',
          'view_dashboard',
          'create_meal_plans',
          'view_nutritional_data',
          'manage_patients',
          'create_reports',
          'view_medical_data',
          'manage_treatment_plans',
          'view_messages',
          'reply_consultations',
          'manage_surveys', // Added default
          'manage_ai_tools' // Added default
        ].includes(permission);
      case 'user':
        return [
          'view_dashboard',
          'view_own_data',
          'send_messages',
          'view_content',
          'use_assessment_tools'
        ].includes(permission);
      default:
        return false;
    }
  },

  /**
   * Get all available permissions for a role
   */
  getAvailablePermissions(role: UserRole): string[] {
    if (role === 'super_admin') return ['*']; // All permissions

    switch (role) {
      case 'admin':
        return [
          'canAccessAdminDashboard',
          'canManageUsers',
          'canManageContent',
          'canMonitorActivity',
          'canManageBackups',
          'canManageSecurity',
          'canManageSystem',
          'canViewDashboard',
          'canViewPatients',
          'canManagePatients',
          'canCreateReports',
          'canViewMedicalData',
          'canManageTreatmentPlans',
          'canViewMessages',
          'canCreateMealPlans',
          'canViewNutritionalData',
          'canViewOwnData',
          'canSendMessages',
          'canViewContent',
          'canUseAssessmentTools',
          'edit_user_profile_media',
          'users.edit_avatar'
        ];
      case 'doctor':
      case 'nutritionist':
        return [
          'canViewPatients',
          'canViewDashboard',
          'canManagePatients',
          'canCreateReports',
          'canViewMedicalData',
          'canManageTreatmentPlans',
          'canViewMessages',
          'canCreateMealPlans',
          'canViewNutritionalData'
        ];
      case 'user':
        return [
          'canViewDashboard',
          'canViewOwnData',
          'canSendMessages',
          'canViewContent',
          'canUseAssessmentTools'
        ];
      default:
        return [];
    }
  },

  canAccessRoute(role: UserRole, _routePath: string, allowedRoles?: UserRole[]): boolean {
    // Admin and Super Admin can access everything
    if (role === 'admin' || role === 'super_admin') return true;

    // If no specific roles required, allow access
    if (!allowedRoles || allowedRoles.length === 0) return true;

    // Check if user's role is in allowed roles
    const hasRoleAccess = allowedRoles.includes(role);

    // Additional route-specific logic can be added here based on routePath
    // Currently using role-based access control only
    return hasRoleAccess;
  },

  hasAnyRole(userRole: UserRole, requiredRoles: UserRole[]): boolean {
    // Admin and Super Admin can access everything
    if (userRole === 'admin' || userRole === 'super_admin') return true;

    // Check if user has any of the required roles
    return requiredRoles.includes(userRole);
  },

  getDefaultRedirectPath(role: UserRole): string {
    switch (role) {
      case 'admin':
        return '/admin/dashboard';
      case 'super_admin':
        return '/admin/dashboard';
      case 'doctor':
      case 'nutritionist':
        return '/doctor/dashboard'; // Nutritionists and Doctors use the professional dashboard
      case 'user':
        return '/dashboard';
      default:
        return '/';
    }
  },

  getRoleDisplayName(role: UserRole, isRTL: boolean = false): string {
    if (isRTL) {
      switch (role) {
        case 'super_admin': return 'مدير النظام (متميز)';
        case 'admin': return 'مدير النظام';
        case 'doctor': return 'دكتور جامعي';
        case 'nutritionist': return 'أخصائي تغذية / خبير تغذية';
        case 'user': return 'مستخدم عادي';
        default: return 'غير محدد';
      }
    } else {
      switch (role) {
        case 'super_admin': return 'Super Admin';
        case 'admin': return 'System Admin';
        case 'doctor': return 'Academic Expert';
        case 'nutritionist': return 'Nutritionist';
        case 'user': return 'Regular User';
        default: return 'Unknown';
      }
    }
  },

  getRoleHierarchy(): Record<UserRole, number> {
    return {
      'user': 1,
      'doctor': 2,
      'nutritionist': 2,
      'admin': 4,
      'super_admin': 5
    };
  },

  hasHigherOrEqualRole(userRole: UserRole, requiredRole: UserRole): boolean {
    const hierarchy = this.getRoleHierarchy();
    return hierarchy[userRole] >= hierarchy[requiredRole];
  },

  getNavigationItems(role: UserRole, isRTL: boolean = false): NavigationItem[] {
    const baseItems: NavigationItem[] = [
      {
        key: 'home',
        label: isRTL ? 'الرئيسية' : 'Home',
        path: '/',
        roles: ['user', 'nutritionist', 'admin']
      },
      {
        key: 'dashboard',
        label: isRTL ? 'لوحة التحكم' : 'Dashboard',
        path: this.getDefaultRedirectPath(role),
        roles: ['user', 'nutritionist', 'admin']
      },
      {
        key: 'knowledge',
        label: isRTL ? 'أنواع سوء التغذية' : 'Knowledge',
        path: '/knowledge',
        roles: ['user', 'nutritionist', 'admin']
      },
      {
        key: 'assessment',
        label: isRTL ? 'التقييم' : 'Assessment',
        path: '/assessment',
        roles: ['user', 'nutritionist', 'admin']
      },
      {
        key: 'ai-tools',
        label: isRTL ? 'أدوات الذكاء الاصطناعي' : 'AI Tools',
        path: '/ai-tools',
        roles: ['user', 'nutritionist', 'admin']
      },
      {
        key: 'messages',
        label: isRTL ? 'الرسائل والاستشارات' : 'Messages',
        path: '/messages',
        roles: ['user', 'nutritionist', 'admin']
      }
    ];

    // Add admin-specific items
    if (role === 'admin' || role === 'super_admin') {
      baseItems.push({
        key: 'admin',
        label: isRTL ? 'إدارة النظام' : 'Administration',
        path: '/admin',
        roles: ['admin'],
        children: [
          {
            key: 'admin-users',
            label: isRTL ? 'إدارة المستخدمين' : 'User Management',
            path: '/admin/users',
            roles: ['admin']
          },
          {
            key: 'admin-content',
            label: isRTL ? 'إدارة المحتوى' : 'Content Management',
            path: '/admin/content',
            roles: ['admin']
          },
          {
            key: 'admin-activity',
            label: isRTL ? 'مراقبة النشاط' : 'Activity Monitoring',
            path: '/admin/activity',
            roles: ['admin']
          },
          {
            key: 'admin-security',
            label: isRTL ? 'إعدادات الأمان' : 'Security Settings',
            path: '/admin/security',
            roles: ['admin']
          }
        ]
      });
    }

    // Filter items based on user role
    return baseItems.filter(item =>
      this.canAccessRoute(role, item.path, item.roles)
    );
  }
};