'use client';
import Image from 'next/image';
import React from 'react';

const AttractionList: React.FC = () => {
  const generateDummyAttractionData = () => {
    const dummyText = ['Langkawi Sky Bridge', 'Batu Caves', 'Sipadan Island'];

    const data = Array.from({ length: 7 }, (_, index) => {
      return {
        dummyText: dummyText[index % 3],
      };
    });

    return data;
  };
  return (
    <div className="flex flex-col space-y-4">
      {generateDummyAttractionData().map((attraction, index) => (
        <div key={index} className="flex justify-between w-full items-center">
          <div className="text-xs text-[#666E79]"> {attraction.dummyText}</div>

          <div className="border-t w-full border-dotted border-gray-500 flex-1"></div>

          <Image
            height={15}
            width={15}
            alt="location"
            src="/Location_icon.svg"
          />
        </div>
      ))}
    </div>
  );
};

export default AttractionList;
