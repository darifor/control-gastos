import React from 'react';

export function Button({ children, variant = 'primary', className = '', ...props }) {
  const baseStyles = 'inline-flex items-center justify-center rounded-md text-[14px] font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none px-4 py-2';
  
  const variants = {
    primary: 'bg-primary text-on-primary hover:bg-primary/90',
    secondary: 'border border-outline bg-transparent hover:bg-surface-dim text-on-surface',
    success: 'bg-secondary text-on-secondary hover:bg-secondary/90',
    destructive: 'bg-error text-on-error hover:bg-error/90',
    ghost: 'hover:bg-surface-dim text-on-surface'
  };

  const currentVariant = variants[variant] || variants.primary;

  return (
    <button className={`${baseStyles} ${currentVariant} ${className}`} {...props}>
      {children}
    </button>
  );
}
