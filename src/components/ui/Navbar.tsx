import Image from 'next/image';
import React from 'react';
import { FaBell } from 'react-icons/fa';

const Navbar = () => {
  return (
    <div className="bg-white shadow-md p-8 flex justify-between items-center">
      <div>
        <h1 className="text-xl ">Dashboard</h1>
      </div>
      <div className="flex items-center space-x-9">
        <div className="relative h-10 w-10">
          <FaBell className="text-black text-3xl cursor-pointer absolute bottom-0" />
          <span className="absolute top-0 right-0 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
            16
          </span>
        </div>
        <div className="flex items-center space-x-2 pr-6">
          <Image
            src="https://via.placeholder.com/150"
            alt="Profile"
            className="rounded-full"
            width={50}
            height={50}
          />
          <div>
            <p className="text-sm font-semibold">George Alex</p>
            <p className="text-xs text-gray-500">Master Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
