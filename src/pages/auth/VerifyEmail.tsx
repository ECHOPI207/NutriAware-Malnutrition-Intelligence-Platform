
import React from 'react';
import { Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';

export const VerifyEmail: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold mb-4">{t('auth.checkEmail')}</h1>
            <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
                We have sent a verification link to your email address. Please click the link to verify your account.
            </p>
            <Button asChild variant="outline" className="w-full">
                <Link to="/auth/login">{t('auth.signIn')}</Link>
            </Button>
        </div>
    );
};
