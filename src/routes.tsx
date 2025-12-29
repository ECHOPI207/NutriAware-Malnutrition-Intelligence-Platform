import Home from './pages/Home';
import Knowledge from './pages/Knowledge';
import Articles from './pages/Articles';
import ArticleDetail from './pages/ArticleDetail';
import Assessment from './pages/Assessment';
import AITools from './pages/AITools';
import About from './pages/About';
import Contact from './pages/Contact';
import MessagesAndConsultations from './pages/MessagesAndConsultations';
import NewMedicalConsultation from './pages/NewMedicalConsultation';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import DoctorDashboard from './pages/doctor/Dashboard';
import ConsultationManagement from './pages/doctor/ConsultationManagement';
import AdminDashboard from './pages/admin/Dashboard';
import UserManagement from './pages/admin/UserManagement';
import SystemSettings from './pages/admin/SystemSettings';
import ContentManagement from './pages/admin/ContentManagement';
import ActivityMonitoring from './pages/admin/ActivityMonitoring';
import BackupManagement from './pages/admin/BackupManagement';
import SecuritySettings from './pages/admin/SecuritySettings';
import Dashboard from './pages/Dashboard';
import { SimpleSignup } from './pages/auth/SimpleSignup';
import { SimpleLogin } from './pages/auth/SimpleLogin';
import { AuthCallback } from './pages/auth/AuthCallback';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import { Navigate } from 'react-router-dom';

import type { ReactNode } from 'react';
import { UserRole, roleManager } from './services/role-manager';

export interface RouteConfig {
  name: string;
  translationKey: string;
  path: string;
  element: ReactNode;
  visible?: boolean;
  requiredRole?: UserRole | UserRole[];
  requiredPermission?: string;
  allowHigherRoles?: boolean;
  fallbackPath?: string;
  showInNavigation?: (role: UserRole) => boolean;
}

const routes: RouteConfig[] = [
  {
    name: 'Home',
    translationKey: 'nav.home',
    path: '/',
    element: <Home />,
    visible: true,
    showInNavigation: () => true
  },
  {
    name: 'Malnutrition Types',
    translationKey: 'nav.malnutritionTypes',
    path: '/knowledge',
    element: <Knowledge />,
    visible: true,
    showInNavigation: () => true
  },
  {
    name: 'Articles',
    translationKey: 'nav.articles',
    path: '/articles',
    element: <Articles />,
    visible: false,
    showInNavigation: () => false
  },
  {
    name: 'Article Detail',
    translationKey: 'nav.malnutritionTypes',
    path: '/knowledge/:id',
    element: <ArticleDetail />,
    visible: false,
    showInNavigation: () => false
  },
  {
    name: 'AI Tools',
    translationKey: 'nav.aiTools',
    path: '/ai-tools',
    element: <AITools />,
    visible: true,
    showInNavigation: () => true
  },
  {
    name: 'Assessment',
    translationKey: 'nav.assessment',
    path: '/assessment',
    element: <Assessment />,
    visible: true,
    showInNavigation: () => true
  },
  {
    name: 'About',
    translationKey: 'nav.about',
    path: '/about',
    element: <About />,
    visible: true,
    showInNavigation: () => true
  },
  {
    name: 'Contact',
    translationKey: 'nav.contact',
    path: '/contact',
    element: <Contact />,
    visible: true,
    showInNavigation: () => true
  },
  {
    name: 'Medical Consultation',
    translationKey: 'nav.medicalConsultation',
    path: '/medical-consultation',
    element: <NewMedicalConsultation />,
    visible: true,
    requiredRole: ['user'],
    showInNavigation: (role) => role === 'user'
  },
  {
    name: 'Messages and Consultations',
    translationKey: 'nav.messagesAndConsultations',
    path: '/messages',
    element: <MessagesAndConsultations />,
    visible: false,
    requiredRole: ['user', 'doctor', 'nutritionist', 'admin'],
    showInNavigation: (role) => ['user', 'doctor', 'nutritionist', 'admin'].includes(role)
  },
  {
    name: 'Privacy Policy',
    translationKey: 'footer.privacy',
    path: '/privacy',
    element: <Privacy />,
    visible: false,
    showInNavigation: () => false
  },
  {
    name: 'Terms of Service',
    translationKey: 'footer.terms',
    path: '/terms',
    element: <Terms />,
    visible: false,
    showInNavigation: () => false
  },
  {
    name: 'Admin Dashboard',
    translationKey: 'nav.adminDashboard',
    path: '/admin/dashboard',
    element: <AdminDashboard />,
    visible: false,
    requiredRole: 'admin',
    requiredPermission: 'canAccessAdminDashboard',
    fallbackPath: '/dashboard',
    showInNavigation: (role) => role === 'admin'
  },
  {
    name: 'User Management',
    translationKey: 'nav.userManagement',
    path: '/admin/users',
    element: <UserManagement />,
    visible: false,
    requiredRole: 'admin',
    requiredPermission: 'canManageUsers',
    fallbackPath: '/admin/dashboard',
    showInNavigation: (role) => role === 'admin'
  },
  {
    name: 'Content Management',
    translationKey: 'nav.contentManagement',
    path: '/admin/content',
    element: <ContentManagement />,
    visible: false,
    requiredRole: 'admin',
    requiredPermission: 'canManageContent',
    fallbackPath: '/admin/dashboard',
    showInNavigation: (role) => role === 'admin'
  },
  {
    name: 'Activity Monitoring',
    translationKey: 'nav.activityMonitoring',
    path: '/admin/activity',
    element: <ActivityMonitoring />,
    visible: false,
    requiredRole: 'admin',
    requiredPermission: 'canMonitorActivity',
    fallbackPath: '/admin/dashboard',
    showInNavigation: (role) => role === 'admin'
  },
  {
    name: 'Backup Management',
    translationKey: 'nav.backupManagement',
    path: '/admin/backup',
    element: <BackupManagement />,
    visible: false,
    requiredRole: 'admin',
    requiredPermission: 'canManageBackups',
    fallbackPath: '/admin/dashboard',
    showInNavigation: (role) => role === 'admin'
  },
  {
    name: 'Security Settings',
    translationKey: 'nav.securitySettings',
    path: '/admin/security',
    element: <SecuritySettings />,
    visible: false,
    requiredRole: 'admin',
    requiredPermission: 'canManageSecurity',
    fallbackPath: '/admin/dashboard',
    showInNavigation: (role) => role === 'admin'
  },
  {
    name: 'System Settings',
    translationKey: 'nav.systemSettings',
    path: '/admin/system',
    element: <SystemSettings />,
    visible: false,
    requiredRole: 'admin',
    requiredPermission: 'canManageSystem',
    fallbackPath: '/admin/dashboard',
    showInNavigation: (role) => role === 'admin'
  },
  {
    name: 'Doctor Dashboard',
    translationKey: 'nav.doctorDashboard',
    path: '/doctor/dashboard',
    element: <DoctorDashboard />,
    visible: false,
    requiredRole: ['doctor', 'nutritionist'],
    requiredPermission: 'canViewDashboard',
    fallbackPath: '/dashboard',
    showInNavigation: (role) => ['doctor', 'nutritionist'].includes(role)
  },
  {
    name: 'Consultation Management',
    translationKey: 'nav.consultationManagement',
    path: '/doctor/consultations',
    element: <ConsultationManagement />,
    visible: false,
    requiredRole: ['doctor', 'nutritionist'],
    requiredPermission: 'canViewDashboard',
    fallbackPath: '/dashboard',
    showInNavigation: (role) => ['doctor', 'nutritionist'].includes(role)
  },
  {
    name: 'Dashboard',
    translationKey: 'nav.dashboard',
    path: '/dashboard',
    element: <Dashboard />,
    visible: false,
    requiredRole: ['user', 'doctor', 'nutritionist', 'admin'],
    requiredPermission: 'canViewDashboard',
    fallbackPath: '/',
    showInNavigation: (role) => ['user', 'doctor', 'nutritionist', 'admin'].includes(role)
  },
  {
    name: 'Profile',
    translationKey: 'nav.profile',
    path: '/profile',
    element: <Profile />,
    visible: false,
    requiredRole: ['user', 'admin', 'doctor', 'nutritionist'],
    showInNavigation: () => false
  },
  {
    name: 'Login',
    translationKey: 'auth.signIn',
    path: '/auth/login',
    element: <SimpleLogin />,
    visible: false,
    showInNavigation: () => false
  },
  {
    name: 'Register',
    translationKey: 'auth.signUp',
    path: '/auth/signup',
    element: <SimpleSignup />,
    visible: false,
    showInNavigation: () => false
  },
  {
    name: 'Auth Callback',
    translationKey: 'Auth Callback',
    path: '/auth/callback',
    element: <AuthCallback />,
    visible: false,
    showInNavigation: () => false
  },

  {
    name: 'Admin Shortcut',
    translationKey: 'Admin',
    path: '/admin',
    element: <Navigate to="/admin/dashboard" replace />,
    visible: false,
    showInNavigation: () => false
  },
  {
    name: 'Not Found',
    translationKey: 'NotFound',
    path: '*',
    element: <NotFound />,
    visible: false,
    showInNavigation: () => false
  }
];

export default routes;

// Route access validation utilities
export const routeUtils = {
  /**
   * Check if a user can access a specific route
   */
  canAccessRoute(route: RouteConfig, userRole: UserRole): boolean {
    // If no role requirements, allow access
    if (!route.requiredRole && !route.requiredPermission) {
      return true;
    }

    // Check permission-based access first
    if (route.requiredPermission) {
      if (!roleManager.hasPermission(userRole, route.requiredPermission)) {
        return false;
      }
    }

    // Check role-based access
    if (route.requiredRole) {
      const requiredRoles = Array.isArray(route.requiredRole) ? route.requiredRole : [route.requiredRole];

      if (route.allowHigherRoles !== false) {
        // Default behavior: allow higher roles
        return requiredRoles.some(role =>
          roleManager.hasHigherOrEqualRole(userRole, role)
        );
      } else {
        // Exact role match required
        return roleManager.hasAnyRole(userRole, requiredRoles);
      }
    }

    return true;
  },

  /**
   * Get routes that should be visible in navigation for a specific role
   */
  getNavigationRoutes(userRole: UserRole): RouteConfig[] {
    return routes.filter(route => {
      // Check if route should show in navigation
      if (route.showInNavigation && !route.showInNavigation(userRole)) {
        return false;
      }

      // Check if user can access the route
      return this.canAccessRoute(route, userRole);
    });
  },

  /**
   * Find a route by path
   */
  findRouteByPath(path: string): RouteConfig | undefined {
    return routes.find(route => route.path === path);
  },

  /**
   * Get the appropriate fallback path for a route and user role
   */
  getFallbackPath(route: RouteConfig, userRole: UserRole): string {
    if (route.fallbackPath) {
      return route.fallbackPath;
    }

    return roleManager.getDefaultRedirectPath(userRole);
  },

  /**
   * Get all routes that require authentication
   */
  getProtectedRoutes(): RouteConfig[] {
    return routes.filter(route => route.requiredRole || route.requiredPermission);
  },

  /**
   * Get all public routes (no authentication required)
   */
  getPublicRoutes(): RouteConfig[] {
    return routes.filter(route => !route.requiredRole && !route.requiredPermission);
  }
};
