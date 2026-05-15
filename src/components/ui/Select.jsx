import React, { forwardRef } from 'react';

export const Select = forwardRef(({ label, id, options = [], className = '', ...props }, ref) => {
  return (
    <div className="flex flex-col gap-[8px] w-full">
      {label && (
        <label htmlFor={id} className="text-[12px] font-medium leading-[16px] tracking-[0.02em] text-on-surface">
          {label}
        </label>
      )}
      <select
        id={id}
        ref={ref}
        className={`flex h-10 w-full rounded-md border border-outline bg-surface px-3 py-2 text-[14px] text-on-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50 appearance-none ${className}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
});

Select.displayName = 'Select';
