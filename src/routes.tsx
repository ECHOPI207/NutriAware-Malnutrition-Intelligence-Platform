import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import { UserRole } from './services/role-manager';

// Lazy load components
const Home = lazy(() => import('./pages/Home'));
const Knowledge = lazy(() => import('./pages/Knowledge'));
const Services = lazy(() => import('./pages/Services'));
const Articles = lazy(() => import('./pages/Articles'));
const ArticleDetail = lazy(() => import('./pages/ArticleDetail'));
const Assessment = lazy(() => import('./pages/Assessment'));
const AITools = lazy(() => import('./pages/AITools'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const MessagesAndConsultations = lazy(() => import('./pages/MessagesAndConsultations'));
const NewMedicalConsultation = lazy(() => import('./pages/NewMedicalConsultation'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const Profile = lazy(() => import('./pages/Profile'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Admin pages
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));
const ConsultationManagement = lazy(() => import('./pages/doctor/ConsultationManagement'));
const UserManagement = lazy(() => import('./pages/admin/UserManagement'));
const SystemSettings = lazy(() => import('./pages/admin/SystemSettings'));
const ContentManagement = lazy(() => import('./pages/admin/ContentManagement'));
const ActivityMonitoring = lazy(() => import('./pages/admin/ActivityMonitoring'));
const BackupManagement = lazy(() => import('./pages/admin/BackupManagement'));
const SecuritySettings = lazy(() => import('./pages/admin/SecuritySettings'));
const SurveyResults = lazy(() => import('./pages/admin/SurveyResults'));
const SurveyManagement = lazy(() => import('./pages/admin/SurveyManagement'));

// Doctor pages
const DoctorDashboard = lazy(() => import('./pages/doctor/Dashboard'));

// Dashboard
const Dashboard = lazy(() => import('./pages/Dashboard'));

// Auth pages (Handle named exports)
const SimpleSignup = lazy(() => import('./pages/auth/SimpleSignup').then(module => ({ default: module.SimpleSignup })));
const SimpleLogin = lazy(() => import('./pages/auth/SimpleLogin').then(module => ({ default: module.SimpleLogin })));
const AuthCallback = lazy(() => import('./pages/auth/AuthCallback').then(module => ({ default: module.AuthCallback })));
const ProjectEvaluation = lazy(() => import('./pages/ProjectEvaluation'));

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
    name: 'Project Evaluation',
    translationKey: 'Project Evaluation', // Using direct string as fallback
    path: '/project-evaluation',
    element: <ProjectEvaluation />,
    visible: true,
    showInNavigation: () => true
  },
  {
    name: 'Services',
    translationKey: 'nav.services',
    path: '/services',
    element: <Services />,
    visible: true,
    showInNavigation: () => false // Hidden from main nav, accessible via button
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
    path: '/knowledge/:slug',
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
    name: 'Survey Results',
    translationKey: 'nav.surveyResults',
    path: '/admin/survey-results',
    element: <SurveyResults />,
    visible: false,
    requiredRole: ['admin', 'doctor', 'nutritionist', 'user'], // Temporary open access for user to test, normally admin/doctor
    requiredPermission: 'canAccessAdminDashboard', 
    fallbackPath: '/dashboard',
    showInNavigation: (role) => ['admin', 'doctor', 'nutritionist'].includes(role)
  },
  {
    name: 'Survey Management',
    translationKey: 'nav.surveyManagement',
    path: '/admin/survey-management',
    element: <SurveyManagement />,
    visible: false,
    requiredRole: ['admin', 'doctor', 'nutritionist'],
    requiredPermission: 'canAccessAdminDashboard',
    fallbackPath: '/dashboard',
    showInNavigation: (role) => ['admin', 'doctor', 'nutritionist'].includes(role)
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
