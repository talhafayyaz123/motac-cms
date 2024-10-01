'use client';

import Image from 'next/image';
import React, { useCallback, useState } from 'react';
import { GiCancel } from 'react-icons/gi';

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLSelectElement> {
  inputSize?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  label?: string;
  minWidth?: string;
  sublabel?: string;
  onFileError?: (error: string) => void;
  onBase64ValueChange?: (base64Value: string) => void; // New prop for base64 value
  error?: string | undefined;
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
  sublabel,
  onFileError, // Error callback prop
  onBase64ValueChange, // Base64 callback prop
  error,
  ...rest
}) => {
  const [, setBase64Value] = useState<string>(''); // State to store the actual base64 value
  const [displayText, setDisplayText] = useState<string>(''); // State to show "Image" in the input after upload
  const [isUploaded, setIsUploaded] = useState<boolean>(false); // Track if file is uploaded

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

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        const img = new window.Image();

        reader.onload = (event) => {
          if (event.target?.result) {
            img.src = event.target.result as string;
            setBase64Value(event.target.result as string); // Set the base64 value for storing
            setDisplayText('Image'); // Set display text to "Image"
            onBase64ValueChange?.(event.target.result as string); // Reset base64 value on re-upload
          }
        };

        img.onload = () => {
          const aspectRatio = img.width / img.height;
          const expectedRatio = 16 / 9;

          if (Math.abs(aspectRatio - expectedRatio) > 0.01) {
            onFileError?.('Only images with 16:9 aspect ratio are allowed');
            e.target.value = '';
            setBase64Value(''); // Reset image if error
            setDisplayText(''); // Reset display text
            onBase64ValueChange?.(''); // Reset base64 value on re-upload
          } else {
            setIsUploaded(true); // Mark as uploaded if valid
            setDisplayText('Image'); // Show "Image" in the input after successful upload
            onChange?.(e); // Pass the event to parent component
          }
        };

        reader.readAsDataURL(file);
      }
    },
    [onChange, onFileError],
  );

  const handleReupload = () => {
    setIsUploaded(false); // Reset the uploaded state to allow re-upload
    setBase64Value(''); // Reset image if error
    setDisplayText('');
    onBase64ValueChange?.(''); // Reset base64 value on re-upload
  };

  return (
    <div className="flex flex-col" style={{ minWidth }}>
      {label && (
        <p className="mb-2 text-md text-[#181819] font-normal">
          {label}
          <span className="text-[0.5rem] ml-12">{sublabel}</span>
        </p>
      )}
      {!isUploaded && type === 'file' && (
        <label htmlFor={label} className={`${combinedStyles} flex justify-end`}>
          <Image alt="image" src="/photo.svg" height={20} width={20} />
        </label>
      )}
      {isUploaded && type === 'file' && (
        <div className="relative">
          <input
            type="text"
            value={displayText} // Show "Image" as the display text
            readOnly
            className={`${combinedStyles} border-gray-300 shadow-sm placeholder-black underline !text-[#51afec]`}
            style={{ minWidth }}
          />
          <GiCancel
            color="#51afec"
            className="absolute top-1/4 right-2 cursor-pointer" // Make the image clickable
            height={20}
            width={20}
            onClick={handleReupload}
          />
        </div>
      )}
      <div className="relative mb-3">
        {icon && (
          <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-2xl text-black">
            {icon}
          </span>
        )}
        <input
          type={isUploaded ? 'hidden' : type} // Set input type to hidden if uploaded
          id={label}
          placeholder={placeholder}
          value={value}
          onChange={type === 'file' ? handleFileChange : onChange} // Use the new handler for file inputs
          className={`${combinedStyles} ${
            type === 'file' && 'hidden'
          } ${icon ? 'pl-12' : ''} border-gray-300 shadow-sm placeholder-black`}
          disabled={disabled}
          style={{ minWidth }}
          {...rest}
        />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
    </div>
  );
};

export default Input;
