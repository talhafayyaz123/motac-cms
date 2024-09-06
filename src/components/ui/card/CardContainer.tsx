import React from 'react';

interface CardContainerProps {
  title: string;
  children: React.ReactNode;
}

const CardContainer: React.FC<CardContainerProps> = ({ title, children }) => {
  return (
    <div className="relative rounded-xl bg-white border border-[#70707069] p-4 mb-4">
      <p className="text-lg text-[#181819] pb-4">{title}</p>
      {children}
    </div>
  );
};

export default CardContainer;
