import React from 'react';
import { FaLocationDot } from 'react-icons/fa6';

interface AttractionListProps {
  statsData: {
    list: string[];
  };
}

const AttractionList: React.FC<AttractionListProps> = ({ statsData }) => {
  return (
    <div className="flex flex-col space-y-4">
      {statsData?.list?.map((attraction, index) => (
        <div key={index} className="flex justify-between w-full items-center">
          <div className="text-xs text-[#666E79]"> {attraction}</div>

          <div className="border-t w-full border-dotted border-gray-500 flex-1"></div>

          <FaLocationDot
            className="text-[#4b6bd9] mt-[-15px] ml-[-8px]"
            size={18}
          />
        </div>
      ))}
    </div>
  );
};

export default AttractionList;
