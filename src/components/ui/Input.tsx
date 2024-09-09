'use client';

import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  inputSize?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  label?: string;
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
  label,
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
  const combinedStyles = `${className} ${baseStyles} ${sizeStyles[inputSize]} ${disabledStyles}`;

  return (
    <div className="flex flex-col mb-4" style={{ minWidth }}>
      {label && (
        <label className="mb-2 text-md text-black" htmlFor={label}>
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-2xl text-black">
            {icon}
          </span>
        )}
        <input
          type={type}
          id={label}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`${combinedStyles} ${icon ? 'pl-12' : ''} border-gray-300 shadow-sm placeholder-black`}
          disabled={disabled}
          style={{ minWidth }}
          {...rest}
        />
      </div>
    </div>
  );
};

export default Input;
