
import React from 'react';
import { Check, X } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useTranslation } from 'react-i18next';

interface PasswordStrengthMeterProps {
    password?: string;
}

export const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({ password = '' }) => {
    const { t } = useTranslation();

    const checks = [
        { label: 'auth.password.length', test: (p: string) => p.length >= 8 },
        { label: 'auth.password.uppercase', test: (p: string) => /[A-Z]/.test(p) },
        { label: 'auth.password.lowercase', test: (p: string) => /[a-z]/.test(p) },
        { label: 'auth.password.number', test: (p: string) => /[0-9]/.test(p) },
        { label: 'auth.password.special', test: (p: string) => /[^A-Za-z0-9]/.test(p) },
    ];

    const strength = checks.reduce((acc, check) => acc + (check.test(password) ? 1 : 0), 0);
    const score = (strength / checks.length) * 100;

    const getColor = () => {
        if (score < 40) return 'bg-red-500';
        if (score < 80) return 'bg-yellow-500';
        return 'bg-green-500';
    };

    return (
        <div className="space-y-4 mt-2">
            <Progress value={score} className="h-2" indicatorClassName={getColor()} />
            <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                {checks.map((check, index) => {
                    const met = check.test(password);
                    return (
                        <div key={index} className={`flex items-center gap-1 ${met ? 'text-green-600' : ''}`}>
                            {met ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                            <span>{t(check.label)}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
