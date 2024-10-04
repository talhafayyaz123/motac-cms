'use client';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FaCaretLeft, FaUser } from 'react-icons/fa';

import { parsePathToTitle } from '@/helpers/utils/utils';

import Title from './Title';

const Navbar = () => {
  const [showProfileDropdown, setShowProfileDropdown] =
    useState<boolean>(false);

  const pathname = usePathname();
  const router = useRouter();

  const pathnameChunks = pathname.split('/');

  const requiredPath =
    pathnameChunks?.length === 3
      ? pathnameChunks[1]
      : pathnameChunks[pathnameChunks?.length - 1];

  const renderProfileDropdownOption = () => {
    return (
      <div
        className="absolute bottom-[-40px] z-50 flex items-center gap-2 text-xs p-2 bg-white rounded-md shadow"
        onClick={() => router.push('/my-profile/account-setting')}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
          }
        }}
      >
        <FaUser />
        <span>My Profile</span>
      </div>
    );
  };

  return (
    <div className="bg-white p-6 flex justify-between items-center relative">
      <div className="flex items-center max-h-max gap-4">
        {pathname !== '/' && (
          <div
            className="h-8 w-8 rounded-full bg-gray-900 flex items-center justify-start"
            onClick={() => router.push('/')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                router.push('/');
              }
            }}
          >
            <FaCaretLeft className="text-white text-3xl" />
          </div>
        )}
        <Title className={`${pathname === '/' && 'absolute bottom-8'} `}>
          {pathname === '/' ? 'Dashboard' : parsePathToTitle(requiredPath)}
        </Title>
      </div>
      <div className="flex items-center space-x-9">
        {/* <div className="relative h-10 w-10">
          <FaBell className="text-black text-3xl cursor-pointer absolute bottom-0" />
          <span className="absolute top-0 right-0 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
            16
          </span>
        </div> */}
        <div
          className="flex items-center space-x-2 pr-6 relative"
          onClick={() => setShowProfileDropdown(!showProfileDropdown)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
            }
          }}
        >
          <div className="border-black-100 border-2 rounded-full h-[60px] w-[60px] overflow-hidden">
            <Image
              src="/user.jpg"
              alt="Profile"
              width={60}
              height={60}
              className="object-cover h-full w-full" // Ensure image fills the container
            />
          </div>
          {showProfileDropdown && renderProfileDropdownOption()}
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
