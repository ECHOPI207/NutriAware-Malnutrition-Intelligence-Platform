import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/features/auth/firebase-auth-context';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';
import { Loader2 } from 'lucide-react';

export const AuthCallback = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const { t } = useTranslation();
    const { user, userProfile, loading } = useAuth();

    useEffect(() => {
        if (!loading) {
            if (user && userProfile) {
                // Determine redirect based on role
                let redirectPath = '/dashboard';
                
                if (userProfile.role === 'admin') {
                    redirectPath = '/admin/dashboard';
                } else if (userProfile.role === 'doctor') {
                    redirectPath = '/doctor/dashboard';
                }

                toast({
                    title: t('auth.success'),
                    description: t('auth.loginSuccess'),
                });

                navigate(redirectPath);
            } else {
                navigate('/auth/login');
            }
        }
    }, [user, userProfile, loading, navigate, toast, t]);

    return (
        <div className="min-h-screen gradient-bg flex items-center justify-center">
            <div className="text-center card-medical p-8 max-w-md mx-4">
                <div className="gradient-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Loader2 className="h-8 w-8 animate-spin text-white" />
                </div>
                <h2 className="text-xl font-semibold text-foreground mb-2">
                    {t('common.loading')}
                </h2>
                <p className="text-muted-foreground">
                    {t('auth.completingAuthentication') || 'Completing authentication...'}
                </p>
            </div>
        </div>
    );
};