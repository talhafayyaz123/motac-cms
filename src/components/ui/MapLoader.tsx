'use client';
import React from 'react';
interface BarChartProps {
  width?: string;
  height?: string;
}
const MapLoader: React.FC<BarChartProps> = ({
  height = 'h-24',
  width = '24',
}) => (
  <div className="flex justify-center items-center">
    <div className="relative">
      <div
        className={`${height} ${width} w-24 rounded-full border-t-8 border-b-8 border-gray-200`}
      ></div>
      <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-100 animate-spin"></div>
    </div>
  </div>
);

export default MapLoader;
