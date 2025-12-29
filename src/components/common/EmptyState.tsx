
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
    icon?: LucideIcon;
    title?: string;
    description: string;
    action?: {
        label: string;
        onClick: () => void;
    };
    className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
    icon: Icon,
    title,
    description,
    action,
    className
}) => {
    return (
        <div className={cn(
            "flex flex-col items-center justify-center p-8 text-center animate-in fade-in-50 duration-500",
            "bg-muted/10 rounded-xl border-2 border-dashed border-muted-foreground/20",
            className
        )}>
            {Icon && (
                <div className="bg-background p-4 rounded-full shadow-sm mb-4 ring-1 ring-border/50">
                    <Icon className="w-8 h-8 text-muted-foreground/80" />
                </div>
            )}
            {title && (
                <h3 className="text-lg font-semibold text-foreground mb-1">
                    {title}
                </h3>
            )}
            <p className="text-muted-foreground text-sm max-w-sm mb-6 leading-relaxed">
                {description}
            </p>
            {action && (
                <Button onClick={action.onClick} variant="outline" className="gap-2">
                    {action.label}
                </Button>
            )}
        </div>
    );
};

export default EmptyState;
