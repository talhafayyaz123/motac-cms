import React from 'react';

import { parsePathToTitle } from '@/helpers/utils/utils';

interface SelectProps {
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Array<{ value: string; label: string }>;
  highlightValue?: string;
  minimalStyle?: boolean;
}

const Select: React.FC<SelectProps> = ({
  value,
  onChange,
  options,
  highlightValue,
  minimalStyle = false,
}) => {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={onChange}
        className={`${
          minimalStyle
            ? 'border border-gray-300 text-gray-700 py-2 pl-3 pr-8 focus:ring-blue-500'
            : 'ring-1 ring-gray-500 ring-offset-0'
        } 
   py-1 pl-3 pr-8 text-sm rounded-md outline-none ${
     value === highlightValue
       ? 'bg-blue-100 text-white ring-0 py-[6px] pl-3 pr-8 rounded-md'
       : 'bg-white'
   }`}
        style={{ appearance: 'none' }}
      >
        {options?.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="bg-white !text-gray-900"
          >
            {parsePathToTitle(option.label)}
          </option>
        ))}
      </select>
      <span
        className={`absolute inset-y-0 right-[-10px] flex items-center pr-4 pointer-events-none`}
      >
        <svg
          className="w-4 h-4 text-gray-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </span>
    </div>
  );
};

export default Select;
