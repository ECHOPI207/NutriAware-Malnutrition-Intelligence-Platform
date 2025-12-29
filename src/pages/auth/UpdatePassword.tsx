
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { updatePassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { PasswordStrengthMeter } from '@/components/auth/PasswordStrengthMeter';

export const UpdatePassword: React.FC = () => {
    const { t } = useTranslation();
    const { toast } = useToast();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const schema = z.object({
        password: z.string().min(8, t('auth.password.length')),
        confirmPassword: z.string(),
    }).refine((data) => data.password === data.confirmPassword, {
        message: t('auth.validation.passwordMatch'),
        path: ["confirmPassword"],
    });

    type FormData = z.infer<typeof schema>;

    const { register, handleSubmit, formState: { errors }, watch } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const password = watch('password');

    const onSubmit = async (data: FormData) => {
        setLoading(true);
        try {
            if (!auth.currentUser) {
                throw new Error('No authenticated user found');
            }

            await updatePassword(auth.currentUser, data.password);

            toast({
                title: t('auth.success'),
                description: "Your password has been updated.",
            });
            navigate('/auth/login');
        } catch (error: any) {
            console.error('Update pwd error:', error);
            toast({
                title: t('auth.error'),
                description: error.message,
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full">
            <h1 className="text-3xl font-bold mb-2">Reset Password</h1>
            <p className="text-muted-foreground mb-8">
                Enter your new password below.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="password">{t('auth.passwordLabel')}</Label>
                    <Input id="password" type="password" {...register('password')} />
                    <PasswordStrengthMeter password={password} />
                    {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="confirmPassword">{t('auth.confirmPassword')}</Label>
                    <Input id="confirmPassword" type="password" {...register('confirmPassword')} />
                    {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>}
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Updating...' : 'Update Password'}
                </Button>
            </form>
        </div>
    );
};
