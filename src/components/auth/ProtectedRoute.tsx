import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, UserRole } from '@/features/auth/firebase-auth-context';
import { useTranslation } from 'react-i18next';
import { Loader2, Shield } from 'lucide-react';
import { roleManager } from '@/services/role-manager';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: UserRole | UserRole[];
  requiredPermission?: string;
  allowHigherRoles?: boolean;
  fallbackPath?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
  requiredPermission,
  allowHigherRoles = true,
  fallbackPath = '/auth/login'
}) => {
  const { user, userProfile, loading } = useAuth();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  
  const isRTL = i18n.language === 'ar';

  // Helper function to check if user has required access
  const hasRequiredAccess = (): boolean => {
    if (!userProfile?.role) return false;

    // Check permission-based access first
    if (requiredPermission) {
      return roleManager.hasPermission(userProfile.role, requiredPermission);
    }

    // Check role-based access
    if (requiredRole) {
      const requiredRoles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
      
      if (allowHigherRoles) {
        // Check if user has any of the required roles or higher
        return requiredRoles.some(role => 
          roleManager.hasHigherOrEqualRole(userProfile.role, role)
        );
      } else {
        // Check exact role match
        return roleManager.hasAnyRole(userProfile.role, requiredRoles);
      }
    }

    // If no specific requirements, allow access for authenticated users
    return true;
  };

  // Get appropriate redirect path based on user role
  const getRedirectPath = (): string => {
    if (!user) return fallbackPath;
    
    if (userProfile?.role) {
      return roleManager.getDefaultRedirectPath(userProfile.role);
    }
    
    return '/';
  };

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate(fallbackPath);
        return;
      }

      // Check if user has required access
      if (!hasRequiredAccess()) {
        const redirectPath = getRedirectPath();
        navigate(redirectPath);
        return;
      }
    }
  }, [loading, user, userProfile, requiredRole, requiredPermission, allowHigherRoles, navigate, fallbackPath]);

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-cyan-50 ${isRTL ? 'rtl' : 'ltr'}`}>
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            {t('common.loading')}
          </h2>
          <p className="text-gray-600">
            {isRTL ? 'جاري التحقق من الصلاحيات...' : 'Verifying permissions...'}
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-pink-50 ${isRTL ? 'rtl' : 'ltr'}`}>
        <div className="text-center">
          <Shield className="h-16 w-16 mx-auto mb-4 text-red-500" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {isRTL ? 'الوصول مرفوض' : 'Access Denied'}
          </h2>
          <p className="text-gray-600 mb-4">
            {isRTL ? 'يجب تسجيل الدخول للوصول لهذه الصفحة' : 'You need to sign in to access this page'}
          </p>
          <button
            onClick={() => navigate('/auth/login')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {t('auth.signIn')}
          </button>
        </div>
      </div>
    );
  }

  // Check role/permission after authentication
  if (!hasRequiredAccess()) {
    const roleDisplayName = userProfile?.role 
      ? roleManager.getRoleDisplayName(userProfile.role, isRTL)
      : (isRTL ? 'غير محدد' : 'Unknown');

    return (
      <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 via-white to-orange-50 ${isRTL ? 'rtl' : 'ltr'}`}>
        <div className="text-center max-w-md mx-auto p-6">
          <Shield className="h-16 w-16 mx-auto mb-4 text-yellow-500" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {isRTL ? 'صلاحيات غير كافية' : 'Insufficient Permissions'}
          </h2>
          <p className="text-gray-600 mb-2">
            {isRTL 
              ? 'ليس لديك الصلاحيات المطلوبة للوصول لهذه الصفحة'
              : 'You do not have the required permissions to access this page'
            }
          </p>
          <p className="text-sm text-gray-500 mb-4">
            {isRTL 
              ? `دورك الحالي: ${roleDisplayName}`
              : `Your current role: ${roleDisplayName}`
            }
          </p>
          <div className="space-y-2">
            <button
              onClick={() => navigate(getRedirectPath())}
              className="w-full bg-yellow-600 text-white px-6 py-2 rounded-lg hover:bg-yellow-700 transition-colors"
            >
              {isRTL ? 'الذهاب للوحة التحكم' : 'Go to Dashboard'}
            </button>
            <button
              onClick={() => navigate('/')}
              className="w-full bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              {isRTL ? 'العودة للرئيسية' : 'Go Home'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};