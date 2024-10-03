/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState, useMemo } from 'react';
import { FaChevronDown } from 'react-icons/fa';

interface Option {
  value: number | string; // Option value type (ID or custom value)
  label: string; // Option label (name)
}

interface InputProps {
  label?: string;
  options: Option[];
  selectedValues: Array<number | string> | number | string; // Allow array of numbers or strings
  setSelectedValues: (values: Array<number | string> | number | string) => void; // Function type for setting values
  minWidth?: string;
  multiple?: boolean;
  searchable?: boolean;
  profile?: boolean;
  name?: string;
  error?: string;
}

const Select: React.FC<InputProps> = ({
  label,
  options,
  selectedValues,
  setSelectedValues,
  minWidth = '300px',
  multiple = false,
  searchable = false,
  profile = false,
  error,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Toggle option selection
  const handleOptionToggle = (optionValue: number | string) => {
    if (multiple) {
      // Check if selectedValues is an array
      if (Array.isArray(selectedValues)) {
        if (selectedValues.includes(optionValue)) {
          // Remove value if already selected
          setSelectedValues(
            selectedValues.filter((value) => value !== optionValue),
          );
        } else {
          // Add new value to selectedValues
          setSelectedValues([...selectedValues, optionValue]);
        }
      } else {
        // If selectedValues is not an array, reset it to a new array with the selected value
        setSelectedValues([optionValue]);
      }
    } else {
      // For single selection
      setSelectedValues(optionValue);
      setDropdownOpen(false);
    }
  };

  // Display selected values by getting the corresponding labels
  const displaySelected = () => {
    if (multiple && Array.isArray(selectedValues)) {
      if (selectedValues.length > 0) {
        return (
          selectedValues
            .map(
              (value) =>
                options.find((option) => option.value === value)?.label,
            )
            .join(', ') || 'Select'
        ); // Join labels or fallback to 'Select'
      }
      return 'Select';
    }

    const selectedLabel =
      typeof selectedValues === 'number' || typeof selectedValues === 'string'
        ? options.find((option) => option.value === selectedValues)?.label
        : 'Select';
    return selectedLabel || 'Select';
  };

  // Filter options based on search term
  const filteredOptions = useMemo(
    () =>
      options.filter((option) =>
        option?.label?.toLowerCase()?.includes(searchTerm.toLowerCase()),
      ),
    [options, searchTerm],
  );

  return (
    <div className="flex flex-col mb-4" style={{ minWidth }}>
      {label && <p className="mb-2 text-md text-black">{label}</p>}
      <div className="relative">
        <div
          className={`block text-sm w-full ${
            profile
              ? 'border border-blue-200 text-blue-200 font-medium'
              : 'border text-gray-900'
          } rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-150 bg-white cursor-pointer`}
          onClick={() => setDropdownOpen((prev) => !prev)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              setDropdownOpen((prev) => !prev);
            }
          }}
          tabIndex={0} // Make it focusable
          role="button" // Set role for better accessibility
        >
          {displaySelected()}
          <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-black">
            <FaChevronDown />
          </span>
        </div>

        {dropdownOpen && (
          <div className="absolute z-10 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg w-full max-h-48 overflow-y-auto">
            {searchable && (
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search..."
                className="w-full p-2 border-b border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            )}
            <ul>
              {filteredOptions.map((option) => (
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
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleOptionToggle(option.value);
                    }
                  }}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-red-500 text-xs">{error}</p>}
    </div>
  );
};

export default Select;
