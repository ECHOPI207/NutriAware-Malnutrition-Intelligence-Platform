import React from 'react';
import { Apple, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

interface LogoProps {
    className?: string;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'default' | 'footer' | 'minimal';
    hideText?: boolean;
    hideSubtitle?: boolean;
}

const Logo: React.FC<LogoProps> = ({
    className,
    size = 'md',
    hideText = false,
    hideSubtitle = false
}) => {
    const { i18n } = useTranslation();
    const isRTL = i18n.language === 'ar';

    const sizeClasses = {
        sm: {
            container: 'w-8 h-8',
            baseIcon: 'w-5 h-5',
            overlayIcon: 'w-2.5 h-2.5',
            textMain: 'text-lg',
            textSub: 'text-[9px]'
        },
        md: {
            container: 'w-14 h-14',
            baseIcon: 'w-8 h-8',
            overlayIcon: 'w-4 h-4',
            textMain: 'text-2xl',
            textSub: 'text-xs'
        },
        lg: {
            container: 'w-20 h-20',
            baseIcon: 'w-12 h-12',
            overlayIcon: 'w-6 h-6',
            textMain: 'text-3xl',
            textSub: 'text-sm'
        }
    };

    const currentSize = sizeClasses[size];

    return (
        <div className={cn("flex items-center gap-3 group select-none", className)}>
            {/* Logo Icon Container */}
            <div className={cn(
                "relative flex items-center justify-center transition-transform duration-300 group-hover:scale-105",
                currentSize.container
            )}>
                {/* Background Glow/Shape */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl rotate-3 group-hover:rotate-6 transition-transform duration-300"></div>
                <div className="absolute inset-0 bg-white/50 dark:bg-black/20 backdrop-blur-[1px] rounded-xl -rotate-3 group-hover:-rotate-6 border border-primary/10 transition-transform duration-300"></div>

                {/* Main Icon Composition */}
                <div className="relative z-10">
                    {/* Base: Apple (Nutrition) */}
                    <Apple className={cn(
                        "text-green-600 dark:text-green-500 fill-green-100 dark:fill-green-900/30 drop-shadow-sm",
                        currentSize.baseIcon
                    )} />

                    {/* Overlay: Activity Pulse (Intelligence) */}
                    <div className="absolute -bottom-1 -right-1 bg-white dark:bg-card rounded-full p-0.5 shadow-md border border-border/50">
                        <Activity className={cn(
                            "text-blue-600 dark:text-blue-400",
                            currentSize.overlayIcon
                        )} />
                    </div>
                </div>
            </div>

            {/* Text Container */}
            {!hideText && (
                <div className={cn("flex flex-col", isRTL ? "items-end" : "items-start")}>
                    <span className={cn(
                        "font-extrabold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent tracking-tight leading-none pb-1",
                        currentSize.textMain
                    )}>
                        NutriAware
                    </span>
                    {!hideSubtitle && (
                        <span className={cn(
                            "text-muted-foreground uppercase tracking-wider font-medium opacity-80 leading-none pb-0.5 whitespace-nowrap",
                            currentSize.textSub
                        )}>
                            Intelligence Platform
                        </span>
                    )}
                </div>
            )}
        </div>
    );
};

export default Logo;
