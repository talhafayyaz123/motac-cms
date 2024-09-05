'use client';

import React from 'react';

interface ImagesContainerProps {
  children: React.ReactNode;
  className?: string;
}

const FormContainer: React.FC<ImagesContainerProps> = ({
  children,
  className,
}) => {
  return (
    <div className={`p-4 shadow rounded-2xl bg-[#FBFCFF] ${className}`}>
      {children}
    </div>
  );
};

export default FormContainer;
