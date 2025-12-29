import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { SocialAuthButtons } from '@/components/auth/SocialAuthButtons';
import { useAuth } from '@/features/auth/firebase-auth-context';
import { Eye, EyeOff, UserPlus, Sparkles } from 'lucide-react';

export const RegisterForm = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const { toast } = useToast();
    const { signUp } = useAuth();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [acceptTerms, setAcceptTerms] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const isRTL = i18n.language === 'ar';

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (formData.password !== formData.confirmPassword) {
            toast({
                title: t('auth.error'),
                description: t('auth.validation.passwordMatch'),
                variant: 'destructive',
            });
            return;
        }

        if (!acceptTerms) {
            toast({
                title: t('auth.error'),
                description: t('auth.validation.terms'),
                variant: 'destructive',
            });
            return;
        }

        setLoading(true);
        try {
            await signUp(formData);
            toast({
                title: t('auth.accountCreated'),
                description: t('auth.checkEmailVerification'),
            });
            navigate('/auth/verify-email');
        } catch (error: any) {
            toast({
                title: t('auth.registrationFailed'),
                description: error.message,
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="text-center space-y-2">
                <div className="flex items-center justify-center gap-2 mb-4">
                    <UserPlus className="h-8 w-8 text-primary" />
                    <Sparkles className="h-6 w-6 text-primary animate-pulse" />
                </div>
                <h1 className="text-3xl font-bold tracking-tight">{t('auth.createNewAccount')}</h1>
                <p className="text-muted-foreground">{t('auth.enterDetailsCreate')}</p>
            </div>

            <SocialAuthButtons />

            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                        {t('auth.orRegisterWith')}
                    </span>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="fullName">{t('auth.fullName')}</Label>
                    <Input
                        id="fullName"
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        required
                        className="h-12"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email">{t('auth.email')}</Label>
                    <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                        className="h-12"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="password">{t('auth.passwordLabel')}</Label>
                    <div className="relative">
                        <Input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            value={formData.password}
                            onChange={(e) => handleInputChange('password', e.target.value)}
                            required
                            className="h-12 pr-10"
                        />
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <EyeOff className="h-4 w-4" />
                            ) : (
                                <Eye className="h-4 w-4" />
                            )}
                        </Button>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="confirmPassword">{t('auth.confirmPassword')}</Label>
                    <div className="relative">
                        <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={formData.confirmPassword}
                            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                            required
                            className="h-12 pr-10"
                        />
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? (
                                <EyeOff className="h-4 w-4" />
                            ) : (
                                <Eye className="h-4 w-4" />
                            )}
                        </Button>
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="terms"
                        checked={acceptTerms}
                        onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                    />
                    <Label htmlFor="terms" className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        {t('auth.terms')}
                    </Label>
                </div>

                <Button type="submit" className="w-full h-12" disabled={loading}>
                    {loading ? (
                        t('auth.creatingAccount')
                    ) : (
                        <>
                            <UserPlus className="h-4 w-4 me-2" />
                            {t('auth.createAccount')}
                        </>
                    )}
                </Button>
            </form>

            <div className="text-center">
                <p className="text-sm text-muted-foreground">
                    {t('auth.alreadyHaveAccount')}{' '}
                    <Link to="/auth/login" className="text-primary font-medium hover:underline">
                        {t('auth.signIn')}
                    </Link>
                </p>
            </div>
        </div>
    );
};