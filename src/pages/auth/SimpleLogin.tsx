import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/features/auth/firebase-auth-context';
import { useTranslation } from 'react-i18next';
import { getAuthErrorMessage } from '@/lib/auth-errors';

export const SimpleLogin: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { signIn, signInWithGoogle, signInWithFacebook, loading } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Basic validation
        if (!formData.email || !formData.password) {
            setError(t('auth.validation.required'));
            return;
        }

        try {
            await signIn(formData.email, formData.password);

            setSuccess(`✅ ${t('auth.loginSuccess')}`);

            setTimeout(() => {
                navigate('/dashboard');
            }, 1000);

        } catch (error: any) {
            const errorMessage = getAuthErrorMessage(error, t);
            setError(`❌ ${errorMessage}`);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await signInWithGoogle();
            setSuccess(`✅ ${t('auth.loginSuccess')}`);
            setTimeout(() => {
                navigate('/dashboard');
            }, 1000);

        } catch (error: any) {
            setError(`❌ ${t('auth.loginFailed')}: ${error.message}`);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="min-h-screen gradient-bg flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <div className="card-medical shadow-medical-lg border-t-4 border-t-primary">
                    {/* Header */}
                    <div className="gradient-primary text-white rounded-t-xl p-6 text-center">
                        <LogIn className="h-12 w-12 mx-auto mb-4 text-white" />
                        <h2 className="text-2xl font-bold text-white">{t('auth.signIn')}</h2>
                        <p className="text-white/90 mt-2">{t('auth.welcomeBack')}</p>
                    </div>

                    <div className="p-6">
                        {/* Google Login Button */}
                        <button
                            onClick={handleGoogleLogin}
                            disabled={loading}
                            className="w-full h-12 bg-white dark:bg-slate-50 text-gray-800 border border-gray-200 dark:border-gray-100 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-slate-100 transition-all duration-200 mb-3 flex items-center justify-center gap-3 shadow-sm hover:shadow-md"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    fill="#4285F4"
                                />
                                <path
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    fill="#34A853"
                                />
                                <path
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    fill="#FBBC05"
                                />
                                <path
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    fill="#EA4335"
                                />
                            </svg>
                            <span>{loading ? t('common.loading') : t('auth.continueWithGoogle')}</span>
                        </button>

                        <button
                            onClick={async () => {
                                try {
                                    await signInWithFacebook();
                                    setSuccess(`✅ ${t('auth.loginSuccess')}`);
                                    setTimeout(() => navigate('/dashboard'), 1000);
                                } catch (error: any) {
                                    setError(`❌ ${t('auth.loginFailed')}: ${error.message}`);
                                }
                            }}
                            disabled={loading}
                            className="w-full h-12 bg-white dark:bg-slate-50 text-gray-800 border border-gray-200 dark:border-gray-100 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-slate-100 transition-all duration-200 mb-6 flex items-center justify-center gap-3 shadow-sm hover:shadow-md"
                        >
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 17.9895 4.3882 22.954 10.125 23.8542V15.4688H7.07812V12H10.125V9.35625C10.125 6.34875 11.9165 4.6875 14.6576 4.6875C15.9705 4.6875 17.3438 4.92188 17.3438 4.92188V7.875H15.8306C14.34 7.875 13.875 8.8 13.875 9.75V12H17.2031L16.6711 15.4688H13.875V23.8542C19.6118 22.954 24 17.9895 24 12Z" fill="#1877F2" />
                                <path d="M16.6711 15.4688L17.2031 12H13.875V9.75C13.875 8.8 14.34 7.875 15.8306 7.875H17.3438V4.92188C17.3438 4.92188 15.9705 4.6875 14.6576 4.6875C11.9165 4.6875 10.125 6.34875 10.125 9.35625V12H7.07812V15.4688H10.125V23.8542C11.2359 24.0384 12.3789 24.0384 13.4899 23.8542V15.4688H16.6711Z" fill="white" />
                            </svg>
                            <span>{loading ? t('common.loading') : t('auth.continueWithFacebook')}</span>
                        </button>

                        {/* Divider */}
                        <div className="relative mb-6">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-border" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-card px-2 text-muted-foreground">{t('auth.orLoginWithEmail')}</span>
                            </div>
                        </div>

                        <form className="space-y-4" onSubmit={handleSubmit}>
                            {/* Email */}
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                                    {t('auth.email')}
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        className="pl-9 h-12 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                                        placeholder={t('auth.enterEmail')}
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <label htmlFor="password" className="text-sm font-medium text-gray-700">
                                        {t('auth.passwordLabel')}
                                    </label>
                                    <Link to="/auth/forgot-password" className="text-xs text-primary hover:underline">
                                        {t('auth.forgotPassword')}
                                    </Link>
                                </div>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        className="pl-9 pr-9 h-12 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                                        placeholder={t('auth.enterPassword')}
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-3 h-4 w-4 text-muted-foreground hover:text-gray-600"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                            </div>

                            {/* Error/Success Messages */}
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-md border border-red-200"
                                >
                                    {error}
                                </motion.div>
                            )}

                            {success && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-green-600 text-sm text-center bg-green-50 p-3 rounded-md border border-green-200"
                                >
                                    {success}
                                </motion.div>
                            )}

                            {/* Submit Button */}
                            <div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full btn-primary h-12 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                            <span>{t('auth.signingIn')}</span>
                                        </>
                                    ) : (
                                        <>
                                            <LogIn className="h-4 w-4" />
                                            <span>{t('auth.signIn')}</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>

                        <div className="mt-4 text-center text-xs text-gray-500">
                            {t('auth.termsAgreement')} <Link to="/terms" className="underline hover:text-gray-900">{t('auth.termsOfService')}</Link> {t('common.and')} <Link to="/privacy" className="underline hover:text-gray-900">{t('auth.privacyPolicy')}</Link>
                        </div>
                    </div>

                    <div className="p-6 pt-0 text-center">
                        <p className="text-sm text-muted-foreground">
                            {t('auth.dontHaveAccount')}{' '}
                            <Link to="/auth/signup" className="text-primary font-medium hover:underline">
                                {t('auth.createAccount')}
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div >
        </div >
    );
};
