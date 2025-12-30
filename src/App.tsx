import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import routes from './routes';

import { AuthProvider } from '@/features/auth/firebase-auth-context';
import { AnalyticsTracker } from '@/components/common/AnalyticsTracker';
import PublicLayout from '@/components/layout/PublicLayout';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import ScrollToTop from '@/components/common/ScrollToTop';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';

// Lazy load Auth pages
const SimpleLogin = lazy(() => import('@/pages/auth/SimpleLogin').then(m => ({ default: m.SimpleLogin })));
const SimpleSignup = lazy(() => import('@/pages/auth/SimpleSignup').then(m => ({ default: m.SimpleSignup })));
const VerifyEmail = lazy(() => import('@/pages/auth/VerifyEmail').then(m => ({ default: m.VerifyEmail })));
const AuthCallback = lazy(() => import('@/pages/auth/AuthCallback').then(m => ({ default: m.AuthCallback })));
const ForgotPassword = lazy(() => import('@/pages/auth/ForgotPassword').then(m => ({ default: m.ForgotPassword })));
const UpdatePassword = lazy(() => import('@/pages/auth/UpdatePassword').then(m => ({ default: m.UpdatePassword })));

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <AnalyticsTracker />
      <AuthProvider>
        <ErrorBoundary>
          <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><LoadingSpinner size="lg" /></div>}>
            <Routes>
            {/* Auth Routes */}
            <Route element={<AuthLayout />}>
              <Route path="/auth/login" element={<SimpleLogin />} />
              <Route path="/auth/signup" element={<SimpleSignup />} />
              <Route path="/auth/verify-email" element={<VerifyEmail />} />
              <Route path="/auth/callback" element={<AuthCallback />} />
              <Route path="/auth/forgot-password" element={<ForgotPassword />} />
              <Route path="/auth/update-password" element={<UpdatePassword />} />
            </Route>

            {/* Public Routes */}
            <Route element={<PublicLayout />}>
              {routes.filter(route => !route.path.startsWith('/auth/')).map((route, index) => {
                const element = route.requiredRole ? (
                  <ProtectedRoute requiredRole={route.requiredRole}>
                    {route.element}
                  </ProtectedRoute>
                ) : (
                  route.element
                );

                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={element}
                  />
                );
              })}
            </Route>
          </Routes>
        </Suspense>
        </ErrorBoundary>
      </AuthProvider>
    </Router>
  );
};

export default App;
