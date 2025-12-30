import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  centered?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  className, 
  size = 'md', 
  centered = true,
  ...props 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const spinner = (
    <Loader2 
      className={cn(
        "animate-spin text-primary", 
        sizeClasses[size],
        className
      )} 
    />
  );

  if (centered) {
    return (
      <div 
        className="flex items-center justify-center min-h-[200px] w-full"
        {...props}
      >
        {spinner}
      </div>
    );
  }

  return <div {...props}>{spinner}</div>;
};
