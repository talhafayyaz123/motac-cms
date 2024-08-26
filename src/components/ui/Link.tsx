import React from 'react';
import NextLink from 'next/link';

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  href: string;
  icon?: React.ReactNode;
}

const Link: React.FC<LinkProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  href,
  icon,
  className = '',
  ...rest
}) => {
  const baseStyles =
    'inline-flex items-center justify-center rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-150';
  const variantStyles = {
    primary:
      'text-blue-600 hover:text-blue-700 focus:ring-blue-500 disabled:text-blue-400',
    secondary:
      'text-gray-600 hover:text-gray-700 focus:ring-gray-500 disabled:text-gray-400',
  };
  const sizeStyles = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  return (
    <NextLink href={href} className={combinedStyles} {...rest}>
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </NextLink>
  );
};

export default Link;
