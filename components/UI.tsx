import React from 'react';
import { useApp } from '../contexts/AppContext';

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { 
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}> = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className = '', 
  style,
  ...props 
}) => {
  const { state } = useApp();
  const primaryColor = state.theme.primaryColor;

  let sizeClasses = "px-6 py-3 text-sm";
  if (size === 'sm') {
    sizeClasses = "px-4 py-2 text-xs";
  } else if (size === 'lg') {
    sizeClasses = "px-8 py-4 text-base";
  }

  const baseStyles = `${sizeClasses} rounded-none font-medium transition-all duration-300 tracking-wider uppercase`;
  let variantStyles = {};

  if (variant === 'primary') {
    variantStyles = {
      backgroundColor: primaryColor,
      color: '#000',
      border: `1px solid ${primaryColor}`,
    };
  } else if (variant === 'outline') {
    variantStyles = {
      backgroundColor: 'transparent',
      color: primaryColor,
      border: `1px solid ${primaryColor}`,
    };
  } else {
    variantStyles = {
        backgroundColor: 'transparent',
        color: '#fff',
    }
  }

  return (
    <button 
      className={`${baseStyles} hover:opacity-80 disabled:opacity-50 ${className}`}
      style={{ ...variantStyles, ...style }}
      {...props}
    >
      {children}
    </button>
  );
};

export const SectionTitle: React.FC<{ title: string; subtitle?: string; centered?: boolean }> = ({ title, subtitle, centered = true }) => {
  const { state } = useApp();
  return (
    <div className={`mb-12 ${centered ? 'text-center' : 'text-left'}`}>
      {subtitle && <p style={{ color: state.theme.primaryColor }} className="text-sm tracking-[0.2em] mb-2 uppercase font-medium">{subtitle}</p>}
      <h2 className="text-3xl md:text-4xl font-bold tracking-widest text-white uppercase">{title}</h2>
      <div className={`mt-4 h-[1px] w-24 bg-neutral-800 ${centered ? 'mx-auto' : ''}`}></div>
    </div>
  );
};

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label?: string }> = ({ label, className, ...props }) => (
  <div className="mb-4">
    {label && <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">{label}</label>}
    <input 
      className={`w-full bg-neutral-900 border border-neutral-800 text-white p-3 focus:outline-none focus:border-white transition-colors ${className}`}
      {...props}
    />
  </div>
);

export const TextArea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string }> = ({ label, className, ...props }) => (
  <div className="mb-4">
    {label && <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">{label}</label>}
    <textarea 
      className={`w-full bg-neutral-900 border border-neutral-800 text-white p-3 focus:outline-none focus:border-white transition-colors ${className}`}
      {...props}
    />
  </div>
);