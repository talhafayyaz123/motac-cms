import React from 'react';

interface CardContainerProps {
  title: string;
  children: React.ReactNode;
  customClasses?: string;
}

const CardContainer: React.FC<CardContainerProps> = ({
  title,
  children,
  customClasses = '',
}) => {
  return (
    <div
      className={`relative rounded-xl bg-white border border-gray-100 font-medium px-5 py-6 mb-6 ${customClasses}`}
    >
      <p className="text-lg text-black-100 pb-4">{title}</p>
      {children}
    </div>
  );
};

export default CardContainer;
