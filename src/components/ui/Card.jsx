import React from 'react';

export function Card({ children, className = '' }) {
  return (
    <div className={`bg-surface rounded-md shadow-[0px_4px_12px_rgba(15,23,42,0.05)] ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '' }) {
  return <div className={`px-4 pt-4 pb-2 ${className}`}>{children}</div>;
}

export function CardTitle({ children, className = '' }) {
  return <h3 className={`text-[20px] font-semibold leading-[28px] text-on-surface ${className}`}>{children}</h3>;
}

export function CardContent({ children, className = '' }) {
  return <div className={`px-4 pb-4 ${className}`}>{children}</div>;
}
