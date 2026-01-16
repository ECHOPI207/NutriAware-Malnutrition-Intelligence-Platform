import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, Eye, EyeOff, ArrowRight, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/features/auth/firebase-auth-context';
import { useTranslation } from 'react-i18next';
import { getAuthErrorMessage } from '@/lib/auth-errors';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export const SimpleLogin: React.FC = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const { signIn, signInWithGoogle, signInWithFacebook, loading } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const isRTL = i18n.language === 'ar';

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
        <div className="min-h-screen gradient-bg flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[100px] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/20 dark:border-slate-700 rounded-3xl shadow-2xl overflow-hidden">
                    {/* Header */}
                    <div className="relative p-8 pb-0 text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/30 transform rotate-3">
                            <LogIn className="h-8 w-8 text-white" />
                        </div>
                        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300">
                            {t('auth.signIn')}
                        </h2>
                        <p className="text-muted-foreground mt-2 text-sm">
                            {t('auth.welcomeBack')}
                        </p>
                    </div>

                    <div className="p-8">
                        {/* Social Login */}
                         <div className="grid grid-cols-2 gap-4 mb-6">
                            <Button
                                variant="outline"
                                onClick={handleGoogleLogin}
                                disabled={loading}
                                className="h-12 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all font-medium text-sm"
                            >
                                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                                Google
                            </Button>
                            <Button
                                variant="outline"
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
                                className="h-12 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all font-medium text-sm"
                            >
                                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 17.9895 4.3882 22.954 10.125 23.8542V15.4688H7.07812V12H10.125V9.35625C10.125 6.34875 11.9165 4.6875 14.6576 4.6875C15.9705 4.6875 17.3438 4.92188 17.3438 4.92188V7.875H15.8306C14.34 7.875 13.875 8.8 13.875 9.75V12H17.2031L16.6711 15.4688H13.875V23.8542C19.6118 22.954 24 17.9895 24 12Z" /><path d="M16.6711 15.4688L17.2031 12H13.875V9.75C13.875 8.8 14.34 7.875 15.8306 7.875H17.3438V4.92188C17.3438 4.92188 15.9705 4.6875 14.6576 4.6875C11.9165 4.6875 10.125 6.34875 10.125 9.35625V12H7.07812V15.4688H10.125V23.8542C11.2359 24.0384 12.3789 24.0384 13.4899 23.8542V15.4688H16.6711Z" fill="white" /></svg>
                                Facebook
                            </Button>
                        </div>

                        <div className="relative mb-8">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-slate-200 dark:border-slate-700" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-transparent backdrop-blur-md px-2 text-muted-foreground">{t('auth.orLoginWithEmail')}</span>
                            </div>
                        </div>

                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div className="space-y-2">
                                <Label htmlFor="email">{t('auth.email')}</Label>
                                <div className="relative">
                                    <Mail className={`absolute top-3 h-4 w-4 text-muted-foreground ${isRTL ? 'right-3' : 'left-3'}`} />
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        className={`h-11 ${isRTL ? 'pr-9' : 'pl-9'} bg-white/50 border-slate-200 dark:border-slate-700 focus:ring-blue-500`}
                                        placeholder={t('auth.enterEmail')}
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <Label htmlFor="password">{t('auth.passwordLabel')}</Label>
                                    <Link to="/auth/forgot-password" className="text-xs text-blue-600 hover:text-blue-500 hover:underline">
                                        {t('auth.forgotPassword')}
                                    </Link>
                                </div>
                                <div className="relative">
                                    <Lock className={`absolute top-3 h-4 w-4 text-muted-foreground ${isRTL ? 'right-3' : 'left-3'}`} />
                                    <Input
                                        id="password"
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        className={`h-11 ${isRTL ? 'pr-9 pl-9' : 'pl-9 pr-9'} bg-white/50 border-slate-200 dark:border-slate-700 focus:ring-blue-500`}
                                        placeholder={t('auth.enterPassword')}
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                    <button
                                        type="button"
                                        className={`absolute top-3 h-4 w-4 text-muted-foreground hover:text-gray-600 ${isRTL ? 'left-3' : 'right-3'}`}
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
                                    className="text-red-600 text-sm text-center bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-200 dark:border-red-900/30"
                                >
                                    {error}
                                </motion.div>
                            )}

                            {success && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-green-600 text-sm text-center bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border border-green-200 dark:border-green-900/30"
                                >
                                    {success}
                                </motion.div>
                            )}

                             <Button
                                type="submit"
                                disabled={loading}
                                className="w-full btn-gradient h-12 text-base font-semibold shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-300 transform hover:-translate-y-0.5"
                            >
                                {loading ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                        {t('auth.signingIn')}
                                    </>
                                ) : (
                                    <>
                                        {t('auth.signIn')}
                                        {isRTL ? <ArrowLeft className="mr-2 h-5 w-5" /> : <ArrowRight className="ml-2 h-5 w-5" />}
                                    </>
                                )}
                            </Button>
                        </form>

                         <div className="mt-8 text-center">
                            <p className="text-sm text-muted-foreground">
                                {t('auth.dontHaveAccount')}{' '}
                                <Link to="/auth/signup" className="text-blue-600 font-semibold hover:text-blue-500 hover:underline transition-colors">
                                    {t('auth.createAccount')}
                                </Link>
                            </p>
                        </div>

                         <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-muted-foreground">
                            {t('auth.termsAgreement')} <Link to="/terms" className="hover:text-primary transition-colors">{t('auth.termsOfService')}</Link> {t('common.and')} <Link to="/privacy" className="hover:text-primary transition-colors">{t('auth.privacyPolicy')}</Link>
                        </div>
                    </div>
                </div>
            </motion.div >
        </div >
    );
};
