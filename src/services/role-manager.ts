// Enhanced role manager for comprehensive RBAC system
// Supports multiple roles, permissions, and route access control

export type UserRole = 'user' | 'admin' | 'doctor' | 'nutritionist';

interface NavigationItem {
  key: string;
  label: string;
  path: string;
  icon?: string;
  roles: UserRole[];
  children?: NavigationItem[];
}

export const roleManager = {
  hasPermission(role: UserRole, permission: string): boolean {
    // Enhanced permission system
    switch (role) {
      case 'admin':
        return true; // Admin has all permissions
      case 'doctor':
        return [
          'canViewPatients', 
          'canViewDashboard', 
          'canManagePatients',
          'canCreateReports',
          'canViewMedicalData',
          'canManageTreatmentPlans',
          'canViewMessages'
        ].includes(permission);
      case 'nutritionist':
        return [
          'canViewDashboard', 
          'canCreateMealPlans',
          'canViewNutritionalData',
          'canManagePatients',
          'canViewMessages'
        ].includes(permission);
      case 'user':
        return [
          'canViewDashboard', 
          'canViewOwnData',
          'canSendMessages',
          'canViewContent',
          'canUseAssessmentTools'
        ].includes(permission);
      default:
        return false;
    }
  },

  /**
   * Get all available permissions for a role
   */
  getAvailablePermissions(role: UserRole): string[] {
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
          'canUseAssessmentTools'
        ];
      case 'doctor':
        return [
          'canViewPatients', 
          'canViewDashboard', 
          'canManagePatients',
          'canCreateReports',
          'canViewMedicalData',
          'canManageTreatmentPlans',
          'canViewMessages'
        ];
      case 'nutritionist':
        return [
          'canViewDashboard', 
          'canCreateMealPlans',
          'canViewNutritionalData',
          'canManagePatients',
          'canViewMessages'
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

  canAccessRoute(role: UserRole, routePath: string, allowedRoles?: UserRole[]): boolean {
    // Admin can access everything
    if (role === 'admin') return true;
    
    // If no specific roles required, allow access
    if (!allowedRoles || allowedRoles.length === 0) return true;
    
    // Check if user's role is in allowed roles
    const hasRoleAccess = allowedRoles.includes(role);
    
    // Additional route-specific logic can be added here based on routePath
    // Currently using role-based access control only
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _routePath = routePath; // Reserved for future route-specific logic
    
    return hasRoleAccess;
  },

  hasAnyRole(userRole: UserRole, requiredRoles: UserRole[]): boolean {
    // Admin can access everything
    if (userRole === 'admin') return true;
    
    // Check if user has any of the required roles
    return requiredRoles.includes(userRole);
  },

  getDefaultRedirectPath(role: UserRole): string {
    switch (role) {
      case 'admin':
        return '/admin/dashboard';
      case 'doctor':
        return '/doctor/dashboard';
      case 'nutritionist':
        return '/doctor/dashboard'; // Nutritionists use doctor dashboard for now
      case 'user':
        return '/dashboard';
      default:
        return '/';
    }
  },

  getRoleDisplayName(role: UserRole, isRTL: boolean = false): string {
    if (isRTL) {
      switch (role) {
        case 'admin': return 'مدير النظام';
        case 'doctor': return 'طبيب';
        case 'nutritionist': return 'أخصائي تغذية';
        case 'user': return 'مستخدم عادي';
        default: return 'غير محدد';
      }
    } else {
      switch (role) {
        case 'admin': return 'System Admin';
        case 'doctor': return 'Doctor';
        case 'nutritionist': return 'Nutritionist';
        case 'user': return 'Regular User';
        default: return 'Unknown';
      }
    }
  },

  getRoleHierarchy(): Record<UserRole, number> {
    return {
      'user': 1,
      'nutritionist': 2,
      'doctor': 3,
      'admin': 4
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
        roles: ['user', 'doctor', 'nutritionist', 'admin']
      },
      {
        key: 'dashboard',
        label: isRTL ? 'لوحة التحكم' : 'Dashboard',
        path: this.getDefaultRedirectPath(role),
        roles: ['user', 'doctor', 'nutritionist', 'admin']
      },
      {
        key: 'knowledge',
        label: isRTL ? 'أنواع سوء التغذية' : 'Knowledge',
        path: '/knowledge',
        roles: ['user', 'doctor', 'nutritionist', 'admin']
      },
      {
        key: 'assessment',
        label: isRTL ? 'التقييم' : 'Assessment',
        path: '/assessment',
        roles: ['user', 'doctor', 'nutritionist', 'admin']
      },
      {
        key: 'ai-tools',
        label: isRTL ? 'أدوات الذكاء الاصطناعي' : 'AI Tools',
        path: '/ai-tools',
        roles: ['user', 'doctor', 'nutritionist', 'admin']
      },
      {
        key: 'messages',
        label: isRTL ? 'الرسائل والاستشارات' : 'Messages',
        path: '/messages',
        roles: ['user', 'doctor', 'nutritionist', 'admin']
      }
    ];

    // Add admin-specific items
    if (role === 'admin') {
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