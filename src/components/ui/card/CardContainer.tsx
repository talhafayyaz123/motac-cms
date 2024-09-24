import React from 'react';

interface CardContainerProps {
  title: string;
  children: React.ReactNode;
  customClasses?: string;
  showStats?: boolean;
}

const CardContainer: React.FC<CardContainerProps> = ({
  title,
  children,
  customClasses = '',
  showStats = false,
}) => {
  return (
    <div
      className={`relative rounded-xl bg-white border border-gray-100 font-medium px-5 py-6 mb-6 ${customClasses}`}
    >
      {showStats && (
        <div className="flex justify-between">
          <p className="text-lg text-black-100 pb-4">{title}</p>
          <div>
            <p className="text-xs text-gray-500">New Users This Month</p>
            <p className="text-4xl text-[#364ea2] text-center font-markForMC">
              3,000
            </p>
          </div>
          <div></div>
        </div>
      )}
      {children}
    </div>
  );
};

export default CardContainer;
