/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

interface InputProps {
  label?: string;
  options: { value: string; label: string }[];
  selectedValues: string[] | string;
  setSelectedValues: (values: any) => void;
  minWidth?: string;
  multiple?: boolean;
}

export const Select: React.FC<InputProps> = ({
  label,
  options,
  selectedValues,
  setSelectedValues,
  minWidth = '300px',
  multiple = false,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleOptionToggle = (optionValue: string) => {
    if (multiple && Array.isArray(selectedValues)) {
      if (selectedValues.includes(optionValue)) {
        setSelectedValues(
          selectedValues.filter((value) => value !== optionValue),
        );
      } else {
        setSelectedValues([...selectedValues, optionValue]);
      }
    } else {
      setSelectedValues(optionValue);
      setDropdownOpen(false);
    }
  };

  const displaySelected = () => {
    if (multiple && Array.isArray(selectedValues)) {
      return selectedValues.length > 0
        ? selectedValues.join(', ')
        : options[0]?.label;
    }
    return (typeof selectedValues === 'string' && selectedValues) || 'Select';
  };

  return (
    <div className="flex flex-col mb-4" style={{ minWidth }}>
      {label && <p className="mb-2 text-md text-black">{label}</p>}
      <div className="relative">
        <div
          className="block text-sm w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-150 bg-white text-gray-900 cursor-pointer"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          {displaySelected()}
          <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-black">
            <FaChevronDown />
          </span>
        </div>
        {dropdownOpen && (
          <ul className="absolute z-10 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg w-full max-h-48 overflow-y-auto">
            {options.map((option) => (
              <li
                key={option.value}
                className={`px-4 py-2 cursor-pointer text-sm ${
                  Array.isArray(selectedValues)
                    ? selectedValues.includes(option.value)
                      ? 'bg-blue-100 text-white'
                      : 'hover:bg-gray-100'
                    : selectedValues === option.value
                      ? 'bg-blue-100 text-white'
                      : 'hover:bg-gray-100'
                }`}
                onClick={() => handleOptionToggle(option.value)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Select;
