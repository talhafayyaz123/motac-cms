import React from 'react';

interface SelectProps {
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Array<{ value: string; label: string }>;
  highlightValue?: string;
  minimalStyle?: boolean; // New prop to toggle minimal style
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
        className={`w-full px-4 py-2 text-sm rounded-md cursor-pointer transition-all appearance-none focus:outline-none focus:ring-2 focus:ring-offset-2
          ${value === highlightValue ? 'bg-blue-100 text-white ring-2 ring-blue-100 ring-offset-0' : 'bg-white'}
          ${minimalStyle ? 'border border-gray-300 text-gray-700 py-2 pl-3 pr-8 focus:ring-blue-500' : 'ring-1 ring-gray-500 ring-offset-2'}
        `}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <span className="absolute inset-y-0 right-[-10px] flex items-center pr-4 pointer-events-none">
        <svg
          className="w-4 h-4 text-gray-500"
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
