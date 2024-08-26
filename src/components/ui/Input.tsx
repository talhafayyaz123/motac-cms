"use client";

import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  inputSize?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  minWidth?: string;
}

const Input: React.FC<InputProps> = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  inputSize = 'md',
  disabled = false,
  icon,
  className = '',
  minWidth = '300px',
  ...rest
}) => {
  const baseStyles =
    'block w-full border rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-150';
  const sizeStyles = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-5 py-4 text-lg',
  };
  const disabledStyles = disabled
    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
    : 'bg-white text-gray-900';
  const combinedStyles = `${baseStyles} ${sizeStyles[inputSize]} ${disabledStyles} ${className}`;

  return (
    <div className="relative" style={{ minWidth }}>
      {icon && (
        <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
          {icon}
        </span>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`${combinedStyles} ${icon ? 'pl-12' : ''} border-gray-300 shadow-sm placeholder-black`}
        disabled={disabled}
        style={{ minWidth }}
        {...rest}
      />
    </div>
  );
};

export default Input;
 