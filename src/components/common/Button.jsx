import React from 'react';

export default function Button({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}) {
  const baseClasses = 'h-14 rounded-full font-bold text-[16px] flex justify-center items-center px-8 transition-transform active:scale-95 cursor-pointer';
  
  const variants = {
    primary: 'bg-[var(--primary)] text-white border-none',
    secondary: 'bg-transparent border border-[var(--border-color)] text-[var(--neutral-dark)]',
    outline: 'bg-transparent border border-[var(--primary)] text-[var(--primary)]'
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
