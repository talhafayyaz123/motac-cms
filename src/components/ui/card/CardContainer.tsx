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
      className={`relative rounded-xl bg-white border border-[#70707069] p-4 mb-4 ${customClasses}`}
    >
      <p className="text-lg text-[#181819] pb-4">{title}</p>
      {children}
    </div>
  );
};

export default CardContainer;
