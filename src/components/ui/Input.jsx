import React, { forwardRef } from 'react';

export const Input = forwardRef(({ label, id, className = '', ...props }, ref) => {
  return (
    <div className="flex flex-col gap-[8px] w-full">
      {label && (
        <label htmlFor={id} className="text-[12px] font-medium leading-[16px] tracking-[0.02em] text-on-surface">
          {label}
        </label>
      )}
      <input
        id={id}
        ref={ref}
        className={`flex h-10 w-full rounded-md border border-outline bg-transparent px-3 py-2 text-[14px] text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        {...props}
      />
    </div>
  );
});

Input.displayName = 'Input';
