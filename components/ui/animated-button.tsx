'use client';

import React from 'react';

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'gold' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function AnimatedButton({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: AnimatedButtonProps) {
  const baseStyles =
    'relative inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-150 hover:scale-[1.015] active:scale-[0.985] overflow-hidden group select-none cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2';

  const variants = {
    primary:
      'bg-slate-900 text-white hover:bg-slate-800 border border-slate-900 focus-visible:outline-slate-900 shadow-sm',
    secondary:
      'bg-white text-slate-900 hover:bg-slate-50 border border-slate-300 focus-visible:outline-slate-600 shadow-xs',
    gold:
      'bg-amber-500 text-slate-950 hover:bg-amber-400 border border-amber-600 font-bold focus-visible:outline-amber-600 shadow-sm',
    outline:
      'bg-transparent text-slate-700 hover:bg-slate-100 border border-slate-300 focus-visible:outline-slate-500',
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2.5 gap-2',
    lg: 'text-base px-6 py-3.5 gap-2.5',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {/* Vengeance UI subtle sweep shine overlay */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
}
