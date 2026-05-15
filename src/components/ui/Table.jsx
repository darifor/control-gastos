import React from 'react';

export function Table({ children, className = '' }) {
  return (
    <div className="w-full overflow-auto">
      <table className={`w-full caption-bottom text-[14px] ${className}`}>
        {children}
      </table>
    </div>
  );
}

export function TableHeader({ children, className = '' }) {
  return <thead className={`border-b border-outline-variant ${className}`}>{children}</thead>;
}

export function TableBody({ children, className = '' }) {
  return <tbody className={`[&_tr:last-child]:border-0 ${className}`}>{children}</tbody>;
}

export function TableRow({ children, className = '' }) {
  return <tr className={`border-b border-outline-variant transition-colors hover:bg-surface-dim/50 ${className}`}>{children}</tr>;
}

export function TableHead({ children, className = '' }) {
  return <th className={`h-12 px-4 text-left align-middle font-medium text-on-surface-variant ${className}`}>{children}</th>;
}

export function TableCell({ children, className = '' }) {
  return <td className={`p-4 align-middle text-on-surface ${className}`}>{children}</td>;
}
