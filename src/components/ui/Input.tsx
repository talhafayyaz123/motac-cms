import Image from 'next/image';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { GiCancel } from 'react-icons/gi';

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLSelectElement> {
  inputSize?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  label?: string;
  minWidth?: string;
  sublabel?: string;
  onFileError?: (error: string) => void;
  onBase64ValueChange?: (base64Value: File | null) => void;
  error?: string | undefined;
  defaultImagePath?: string | null; // Add prop for default image path (edit case)
  marginBottom?: string | null;
  iconPlacement?: string | null;
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
  onFileError,
  onBase64ValueChange,
  error,
  defaultImagePath,
  marginBottom,
  iconPlacement = 'left',
  ...rest
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [, setBase64Value] = useState<string>('');
  const [displayText, setDisplayText] = useState<string>('');
  const [isUploaded, setIsUploaded] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

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

  // Handle file change (for both add and re-upload cases)
  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        const img = new window.Image();

        reader.onload = (event) => {
          if (event.target?.result) {
            img.src = event.target.result as string;
            setBase64Value(event.target.result as string);
            setDisplayText('Image');
            setImagePreview(event.target.result as string);
          }
        };

        img.onload = () => {
          const aspectRatio = img.width / img.height;
          const expectedRatio = 16 / 9;

          if (Math.abs(aspectRatio - expectedRatio) > 0.01) {
            onFileError?.('Only images with 16:9 aspect ratio are allowed');
            e.target.value = '';
            setBase64Value('');
            setDisplayText('');
            setImagePreview(null);
            onBase64ValueChange?.(null);
          } else {
            setIsUploaded(true);
            setDisplayText('Image');
            onChange?.(e); // Trigger field onChange for form update
            onBase64ValueChange?.(file);
          }
        };

        reader.readAsDataURL(file);
      }
    },
    [onChange, onFileError, onBase64ValueChange],
  );

  // Handle re-upload case
  const handleReupload = () => {
    setIsUploaded(false);
    setBase64Value('');
    setDisplayText('');
    setImagePreview(null);
    onBase64ValueChange?.(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Reset input file field
    }
  };

  // Handle default image path (edit case)
  useEffect(() => {
    if (defaultImagePath) {
      setIsUploaded(true);
      setDisplayText('Image');
      setImagePreview(defaultImagePath); // Set the default image path as preview
    }
  }, [defaultImagePath]);

  return (
    <div className="flex flex-col" style={{ minWidth }}>
      {label && (
        <p className="mb-2 text-md text-[#181819] font-semibold">
          {label}
          <span className="text-[0.5rem] ml-12">{sublabel}</span>
        </p>
      )}
      {/* Upload button */}
      {!isUploaded && type === 'file' && (
        <label htmlFor={label} className={`${combinedStyles} flex justify-end`}>
          <Image alt="image" src="/photo.svg" height={20} width={20} />
        </label>
      )}
      {/* Display uploaded image */}
      {isUploaded && type === 'file' && (
        <div className="relative">
          <input
            type="text"
            value={displayText}
            readOnly
            className={`${combinedStyles} border-gray-300 shadow-sm placeholder-black underline !text-[#51afec] cursor-pointer`}
            style={{ minWidth }}
            onClick={() => setShowModal(true)}
          />
          <GiCancel
            color="#51afec"
            className="absolute top-1/4 right-2 cursor-pointer"
            height={20}
            width={20}
            onClick={handleReupload} // Handle re-upload
          />
        </div>
      )}
      <div className={`relative mb-${marginBottom}`}>
        {icon && (
          <span
            className={`absolute inset-y-0 ${iconPlacement === 'right' ? 'right-0' : 'left-0'} flex items-center pl-4 text-2xl text-black`}
          >
            {icon}
          </span>
        )}
        {/* File input (hidden if already uploaded) */}
        <input
          type={isUploaded ? 'hidden' : type}
          id={label}
          ref={fileInputRef}
          placeholder={placeholder}
          value={value}
          onChange={type === 'file' ? handleFileChange : onChange}
          className={`${combinedStyles} ${
            type === 'file' && 'hidden'
          } ${icon && iconPlacement === 'left' ? 'pl-12' : ''} border-gray-300 shadow-sm placeholder-black`}
          disabled={disabled}
          style={{ minWidth }}
          {...rest}
        />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>

      {/* Modal for displaying the uploaded image */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full">
            <div className="flex justify-end mb-4">
              <GiCancel
                className="text-black cursor-pointer"
                size={24}
                onClick={() => setShowModal(false)} // Close modal
              />
            </div>
            {imagePreview && (
              /* eslint-disable @next/next/no-img-element */
              <img
                src={imagePreview}
                alt=""
                className="max-w-full h-auto rounded-lg"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Input;
