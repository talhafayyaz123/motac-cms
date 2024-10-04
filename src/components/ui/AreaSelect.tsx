/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { FaChevronDown } from 'react-icons/fa';

interface Option {
  value: number | string; // Option value type (ID or custom value)
  label: string; // Option label (name)
}

interface SelectedValue {
  id: number | string | null; // Selected value ID, can be null for custom options
  name: string; // Selected value name
}

interface InputProps {
  label?: string;
  options: Option[];
  selectedValues: SelectedValue | null; // Allow selected value to be an object or null
  setSelectedValues: (value: SelectedValue | null) => void; // Function type for setting values
  minWidth?: string;
  searchable?: boolean;
  error?: string;
  maxWidth?: string;
}

const AreaSelect: React.FC<InputProps> = ({
  label,
  options,
  selectedValues,
  setSelectedValues,
  minWidth = '300px',
  searchable = false,
  maxWidth = '100%',
  error,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [customOptions, setCustomOptions] = useState<Option[]>([]); // To store custom options
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close the dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  // Toggle option selection
  const handleOptionToggle = (optionValue: number | string) => {
    const selectedOption = options
      .concat(customOptions)
      .find((option) => option.value === optionValue);
    if (selectedOption) {
      setSelectedValues({
        id: selectedOption.value,
        name: selectedOption.label,
      });
      setDropdownOpen(false);
    }
  };

  // Handle adding custom option
  const handleAddCustomOption = () => {
    if (
      searchTerm &&
      !options.find(
        (option) => option.label.toLowerCase() === searchTerm.toLowerCase(),
      )
    ) {
      const newOption = { value: searchTerm, label: searchTerm };
      setCustomOptions((prev) => [...prev, newOption]); // Add to custom options
      setSelectedValues({ id: null, name: newOption.label }); // Set id to null and store only name
      setDropdownOpen(false); // Close dropdown
      setSearchTerm(''); // Reset search term
    }
  };

  // Handle key down events in the search input
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddCustomOption(); // Attempt to add custom option on Enter
    }
  };

  // Display selected value by label
  const displaySelected = () => {
    return selectedValues?.name ? selectedValues.name : 'Select an area';
  };

  // Filter options based on search term
  const filteredOptions = useMemo(() => {
    return options
      .concat(customOptions) // Include custom options in the list
      .filter((option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase()),
      );
  }, [options, customOptions, searchTerm]);

  return (
    <div className="flex flex-col mb-4" style={{ minWidth, maxWidth }}>
      {label && <p className="mb-2 text-md text-black">{label}</p>}
      <div ref={dropdownRef} className="relative">
        <div
          className="block text-sm w-full border text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-150 bg-white cursor-pointer"
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
                placeholder="Search or add new area"
                onKeyDown={handleSearchKeyDown} // Attach keydown handler
                className="w-full p-2 border-b border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            )}
            <ul>
              {filteredOptions.map((option) => (
                <li
                  key={option.value}
                  className={`px-4 py-2 cursor-pointer text-sm ${selectedValues?.id === option.value ? 'bg-blue-100 text-white' : 'hover:bg-gray-100'}`}
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
              {/* Display "Add Custom Option" when no existing options match */}
              {searchTerm &&
                !filteredOptions.some(
                  (option) =>
                    option.label.toLowerCase() === searchTerm.toLowerCase(),
                ) && (
                  <li
                    className="px-4 py-2 cursor-pointer text-sm text-blue-500 hover:bg-gray-100"
                    onClick={handleAddCustomOption}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleAddCustomOption();
                      }
                    }}
                  >
                    {`Add "${searchTerm}"`}
                  </li>
                )}
            </ul>
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-red-500 text-xs">{error}</p>}
    </div>
  );
};

export default AreaSelect;
