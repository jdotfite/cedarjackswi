'use client';

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  href?: string;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

interface LinkButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  href: string;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const getButtonClasses = (variant: 'primary' | 'secondary' = 'primary', size: 'sm' | 'md' | 'lg' = 'md') => {
  const baseClasses = 'inline-block font-semibold uppercase tracking-wide transition-colors duration-200 text-center';
  
  const variantClasses = {
    primary: 'bg-orange-500 hover:bg-orange-600 text-white',
    secondary: 'bg-transparent hover:bg-white border-2 border-white text-white hover:text-black'
  };
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-xs rounded',
    md: 'px-8 py-3 text-sm rounded',
    lg: 'px-10 py-4 text-base rounded-lg'
  };
  
  return `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`;
};

// Button component for form buttons and onclick handlers
export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}) => {
  const classes = `${getButtonClasses(variant, size)} ${className}`;
  
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

// LinkButton component for navigation
export const LinkButton: React.FC<LinkButtonProps> = ({ 
  children, 
  href, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}) => {
  const classes = `${getButtonClasses(variant, size)} ${className}`;
  
  return (
    <a href={href} className={classes} {...props}>
      {children}
    </a>
  );
};

// Default export for backwards compatibility
export default Button;
