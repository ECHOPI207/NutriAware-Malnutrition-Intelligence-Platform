
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export const ForgotPassword: React.FC = () => {
    const { t } = useTranslation();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);

    const schema = z.object({
        email: z.string().email(t('auth.validation.email')),
    });

    type FormData = z.infer<typeof schema>;

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data: FormData) => {
        setLoading(true);
        try {
            await sendPasswordResetEmail(auth, data.email, {
                url: `${window.location.origin}/auth/login`,
            });

            setSent(true);
            toast({
                title: t('auth.success'),
                description: "Check your email for the reset link.",
            });
        } catch (error: any) {
            console.error('Reset pwd error:', error);
            toast({
                title: t('auth.error'),
                description: error.message,
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    if (sent) {
        return (
            <div className="text-center">
                <h1 className="text-2xl font-bold mb-4">Check your email</h1>
                <p className="text-muted-foreground mb-8">
                    We have sent a password reset link to your email.
                </p>
                <Button asChild variant="ghost" className="w-full">
                    <Link to="/auth/login">Back to Sign In</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="w-full">
            <h1 className="text-3xl font-bold mb-2">{t('auth.forgotPassword')}</h1>
            <p className="text-muted-foreground mb-8">
                Enter your email address and we will send you a link to reset your password.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="email">{t('auth.email')}</Label>
                    <Input id="email" type="email" {...register('email')} placeholder="john@example.com" />
                    {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Sending...' : 'Send Reset Link'}
                </Button>

                <Button asChild variant="ghost" className="w-full mt-4">
                    <Link to="/auth/login">Back to Sign In</Link>
                </Button>
            </form>
        </div>
    );
};
