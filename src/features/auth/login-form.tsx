import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { SocialAuthButtons } from '@/components/auth/SocialAuthButtons';
import { loginSchema, LoginInput } from './auth.schema';
import { useAuth } from '@/features/auth/firebase-auth-context';
import { Eye, EyeOff, LogIn, Sparkles } from 'lucide-react';

export const LoginForm = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const { toast } = useToast();
    const { signIn } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const isRTL = i18n.language === 'ar';

    const { register, handleSubmit, formState: { errors } } = useForm<LoginInput>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
            rememberMe: false,
        } as LoginInput,
    });

    const onSubmit = async (data: LoginInput) => {
        if (isLoading) return; // Prevent double submission

        setIsLoading(true);

        // Set a backup timeout to reset loading state
        const backupTimeout = setTimeout(() => {
            console.warn('⚠️ Login form timeout - resetting loading state');
            setIsLoading(false);
            toast({
                title: t('auth.loginFailed'),
                description: 'Login is taking too long. Please try again.',
                variant: "destructive",
            });
        }, 20000); // 20 seconds backup timeout

        try {

            await signIn(data.email, data.password);

            // Clear backup timeout
            clearTimeout(backupTimeout);

            toast({
                title: t('auth.welcomeBack'),
                description: t('auth.loginSuccess'),
            });

            // Force navigation after successful login
            setTimeout(() => {
                navigate('/dashboard', { replace: true });
            }, 100);

        } catch (error: any) {
            console.error('❌ Login error:', error);

            // Clear backup timeout
            clearTimeout(backupTimeout);

            const isEmailPending = error.message?.includes("Email not confirmed");
            const isTimeout = error.message?.includes("timeout");
            const isNetwork = error.message?.includes("fetch") || error.message?.includes("network");

            let errorMessage = error.message || t('auth.invalidCredentials');

            if (isEmailPending) {
                errorMessage = t('auth.verifyEmail');
            } else if (isTimeout) {
                errorMessage = 'Login timeout. Please check your connection and try again.';
            } else if (isNetwork) {
                errorMessage = 'Network error. Please check your internet connection.';
            }

            toast({
                title: t('auth.loginFailed'),
                description: errorMessage,
                variant: "destructive",
            });
        } finally {
            // Always reset loading state
            setIsLoading(false);
            clearTimeout(backupTimeout);
        }
    };

    return (
        <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-4 ${isRTL ? 'rtl' : 'ltr'}`}>
            <div className="w-full max-w-md">
                {/* Header with Logo */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl mb-4 shadow-lg">
                        <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        {t('auth.signInToAccount')}
                    </h1>
                    <p className="text-gray-600">
                        {t('auth.enterEmailAccess')}
                    </p>
                </div>

                {/* Main Form Card */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 login-form">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Email Field */}
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-semibold text-gray-900 dark:text-white">
                                {t('auth.email')}
                            </Label>
                            <Input
                                id="email"
                                placeholder={isRTL ? "example@domain.com" : "name@example.com"}
                                type="email"
                                autoCapitalize="none"
                                autoComplete="email"
                                autoCorrect="off"
                                disabled={isLoading}
                                className="h-12 text-base text-gray-900 bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500 placeholder:text-gray-500"
                                {...register('email')}
                            />
                            {errors.email && (
                                <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password" className="text-sm font-semibold text-gray-900 dark:text-white">
                                    {t('auth.passwordLabel')}
                                </Label>
                                <Link
                                    to="/auth/forgot-password"
                                    className="text-xs font-medium text-blue-600 hover:text-blue-500 hover:underline transition-colors"
                                >
                                    {t('auth.forgotPassword')}
                                </Link>
                            </div>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    disabled={isLoading}
                                    className={`h-12 text-base text-gray-900 bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500 placeholder:text-gray-500 ${isRTL ? 'pl-12 pr-4' : 'pr-12 pl-4'}`}
                                    {...register('password')}
                                />
                                <button
                                    type="button"
                                    className={`absolute inset-y-0 ${isRTL ? 'left-0 pl-3' : 'right-0 pr-3'} flex items-center text-gray-400 hover:text-gray-600 transition-colors`}
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5" />
                                    ) : (
                                        <Eye className="h-5 w-5" />
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
                            )}
                        </div>

                        {/* Remember Me */}
                        <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
                            <Checkbox id="remember" {...register('rememberMe')} />
                            <Label htmlFor="remember" className="text-sm text-gray-900 dark:text-white cursor-pointer">
                                {t('auth.rememberMe')}
                            </Label>
                        </div>

                        {/* Submit Button */}
                        <Button
                            className="w-full h-12 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
                                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                    <span>{t('auth.signingIn')}</span>
                                </div>
                            ) : (
                                <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
                                    <LogIn className="h-5 w-5" />
                                    <span>{t('auth.signIn')}</span>
                                </div>
                            )}
                        </Button>
                    </form>

                    {/* Google OAuth */}
                    {true && (
                        <>
                            {/* Divider */}
                            <div className="relative my-8">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t border-gray-200" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-white px-4 text-gray-500 font-medium">
                                        {t('auth.orContinueWith')}
                                    </span>
                                </div>
                            </div>

                            {/* Social Auth */}
                            <SocialAuthButtons />
                        </>
                    )}

                    {/* Sign Up Link */}
                    <div className="text-center mt-8 pt-6 border-t border-gray-100">
                        <p className="text-sm text-gray-600">
                            {t('auth.dontHaveAccount')}{" "}
                            <Link
                                to="/auth/signup"
                                className="font-semibold text-blue-600 hover:text-blue-500 hover:underline transition-colors"
                            >
                                {t('auth.signUp')}
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
