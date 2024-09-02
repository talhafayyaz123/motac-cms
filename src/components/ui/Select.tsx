import React from 'react';

interface SelectProps {
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Array<{ value: string; label: string }>;
  highlightValue?: string;
}

const Select: React.FC<SelectProps> = ({
  value,
  onChange,
  options,
  highlightValue,
}) => {
  return (
    <select
      value={value}
      onChange={onChange}
      className={`px-4 py-1 text-sm rounded-md outline-none ring-1 ring-gray-500 ring-offset-2 ${
        value === highlightValue ? 'bg-blue-100 text-blue-800' : 'bg-white'
      }`}
    >
      <option value="">Priority</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
