import React from 'react';
import { cn } from '../../lib/utils';

interface CardProps {
  className?: string;
  children: React.ReactNode;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({ 
  className, 
  children,
  hoverable = false
}) => {
  return (
    <div className={cn(
      'bg-white rounded-lg shadow-md overflow-hidden',
      hoverable && 'transition-all duration-300 hover:shadow-lg hover:-translate-y-1',
      className
    )}>
      {children}
    </div>
  );
};

export const CardHeader: React.FC<{ className?: string; children: React.ReactNode }> = ({ 
  className, 
  children 
}) => {
  return (
    <div className={cn('p-4 border-b border-gray-100', className)}>
      {children}
    </div>
  );
};

export const CardTitle: React.FC<{ className?: string; children: React.ReactNode }> = ({ 
  className, 
  children 
}) => {
  return (
    <h3 className={cn('text-lg font-semibold text-gray-900', className)}>
      {children}
    </h3>
  );
};

export const CardDescription: React.FC<{ className?: string; children: React.ReactNode }> = ({ 
  className, 
  children 
}) => {
  return (
    <p className={cn('text-sm text-gray-500 mt-1', className)}>
      {children}
    </p>
  );
};

export const CardContent: React.FC<{ className?: string; children: React.ReactNode }> = ({ 
  className, 
  children 
}) => {
  return (
    <div className={cn('p-4', className)}>
      {children}
    </div>
  );
};

export const CardFooter: React.FC<{ className?: string; children: React.ReactNode }> = ({ 
  className, 
  children 
}) => {
  return (
    <div className={cn('p-4 bg-gray-50 border-t border-gray-100', className)}>
      {children}
    </div>
  );
};