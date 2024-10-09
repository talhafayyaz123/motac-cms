import React from 'react';

interface CardContainerProps {
  title: string;
  children: React.ReactNode;
  customClasses?: string;
  showStats?: boolean;
  stats?: number;
  showUserManagemantStats?: boolean;
}

const CardContainer: React.FC<CardContainerProps> = ({
  title,
  children,
  customClasses = '',
  showStats = false,
  showUserManagemantStats = false,
  stats,
}) => {
  return (
    <div
      className={`relative rounded-xl bg-white border border-gray-100 font-medium px-5 py-6 mb-6 ${customClasses}`}
    >
      {showStats && (
        <div className="flex justify-between">
          <p className="text-lg text-black-100 pb-4 ">{title}</p>
          {showUserManagemantStats && (
            <div>
              <p className="text-xs text-gray-500">New Users</p>
              <p className="text-4xl text-[#364ea2] text-center font-markForMC">
                {stats}
              </p>
            </div>
          )}
          <div></div>
        </div>
      )}
      {children}
    </div>
  );
};

export default CardContainer;
