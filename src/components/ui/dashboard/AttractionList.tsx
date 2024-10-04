import Image from 'next/image';
import React from 'react';

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

          <Image
            height={15}
            width={15}
            alt="location"
            src="/Location_icon.svg"
            className="mt-[-15px] ml-[-10px]"
          />
        </div>
      ))}
    </div>
  );
};

export default AttractionList;
