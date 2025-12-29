import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import routes from './routes';

import { AuthProvider } from '@/features/auth/firebase-auth-context';
import { AnalyticsTracker } from '@/components/common/AnalyticsTracker';
import PublicLayout from '@/components/layout/PublicLayout';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { SimpleLogin } from '@/pages/auth/SimpleLogin';
import { SimpleSignup } from '@/pages/auth/SimpleSignup';
import { VerifyEmail } from '@/pages/auth/VerifyEmail';
import { AuthCallback } from '@/pages/auth/AuthCallback';
import { ForgotPassword } from '@/pages/auth/ForgotPassword';
import { UpdatePassword } from '@/pages/auth/UpdatePassword';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import ScrollToTop from '@/components/common/ScrollToTop';

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <AnalyticsTracker />
      <AuthProvider>
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
      </AuthProvider>
    </Router>
  );
};

export default App;
