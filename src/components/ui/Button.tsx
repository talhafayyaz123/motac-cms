import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  minWidth?: string;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  minWidth = '120px',
  icon,
  onClick,
  ...rest
}) => {
  const baseStyles =
    'inline-flex items-center text-sm justify-center rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-150';
  const variantStyles = {
    primary:
      'bg-white text-black hover:bg-gray-100 focus:ring-black disabled:bg-gray-200 disabled:text-gray-500 disabled:border-gray-300',
    secondary:
      'bg-black text-white hover:bg-gray-800 focus:ring-gray-500 disabled:bg-gray-700 disabled:text-gray-400',
    danger:
      'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 disabled:bg-red-400 disabled:text-gray-200', // Added danger variant
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-5 py-3 text-lg',
  };

  const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]}`;
  const buttonStyles = { minWidth };

  return (
    <button
      type={type}
      className={combinedStyles}
      style={buttonStyles}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
