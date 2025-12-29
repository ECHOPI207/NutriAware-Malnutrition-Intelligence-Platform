
import { TFunction } from 'i18next';

export const getAuthErrorMessage = (error: any, t: TFunction): string => {
  if (!error) return t('common.unknownError', 'An unknown error occurred');

  const code = error.code || '';
  const message = error.message || '';

  // Firebase Auth Error Codes
  switch (code) {
    case 'auth/user-not-found':
      return t('auth.userNotFound', 'User not found');
    case 'auth/wrong-password':
      return t('auth.wrongPassword', 'Wrong password');
    case 'auth/invalid-credential':
      return t('auth.invalidCredentials', 'Invalid credentials');
    case 'auth/invalid-email':
      return t('auth.validation.email', 'Invalid email address');
    case 'auth/email-already-in-use':
      return t('auth.emailInUse', 'Email is already in use');
    case 'auth/weak-password':
      return t('auth.weakPassword', 'Password is too weak');
    case 'auth/too-many-requests':
      return t('auth.tooManyRequests', 'Too many requests, please try again later');
    case 'auth/network-request-failed':
      return t('common.networkError', 'Network error, please check your connection');
    case 'auth/popup-closed-by-user':
      return t('auth.popupClosed', 'Authentication popup was closed');
    default:
      return message || t('auth.loginFailed', 'Login failed');
  }
};
