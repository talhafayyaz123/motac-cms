'use client';

import Image from 'next/image';
import React from 'react';
import { FaChevronDown } from 'react-icons/fa';

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLSelectElement> {
  inputSize?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  label?: string;
  minWidth?: string;
  isSelect?: boolean;
  options?: { value: string; label: string }[];
  multiple?: boolean;
  value?: string[] | string;
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
  isSelect = false,
  options = [],
  multiple,
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

  const handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = (e) => {
    if (onChange) {
      if (multiple && isSelect) {
        const options = (e.target as HTMLSelectElement).options;
        const selectedValues = Array.from(options)
          .filter((option) => option.selected)
          .map((option) => option.value);

        onChange({
          ...e,
          target: {
            ...e.target,
            value: selectedValues,
          },
        } as unknown as React.ChangeEvent<HTMLSelectElement>);
      } else {
        onChange(e);
      }
    }
  };

  return (
    <div className="flex flex-col mb-4" style={{ minWidth }}>
      {label && <p className="mb-2 text-md text-black">{label}</p>}
      {type === 'file' && (
        <label htmlFor={label} className={`${combinedStyles} flex justify-end`}>
          <Image alt="image" src="/photo.svg" height={20} width={20} />
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-2xl text-black">
            {icon}
          </span>
        )}
        {isSelect ? (
          <div className="relative">
            <select
              value={multiple ? (Array.isArray(value) ? value : []) : value}
              onChange={handleChange}
              multiple={multiple}
              className={`${combinedStyles} ${icon ? 'pl-12' : ''} pr-10 border-gray-300 shadow-sm placeholder-black`}
              disabled={disabled}
              style={{ minWidth, appearance: 'none' }}
              {...rest}
            >
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <span className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-black text-sm">
              <FaChevronDown />
            </span>
          </div>
        ) : (
          <input
            type={type}
            id={label}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`${combinedStyles} ${type === 'file' && 'hidden'} ${icon ? 'pl-12' : ''} border-gray-300 shadow-sm placeholder-black`}
            disabled={disabled}
            style={{ minWidth }}
            {...rest}
          />
        )}
      </div>
    </div>
  );
};

export default Input;
