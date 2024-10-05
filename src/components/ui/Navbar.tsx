'use client';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { FaCaretLeft, FaUser } from 'react-icons/fa';

import { parsePathToTitle } from '@/helpers/utils/utils';

import Title from './Title';

const Navbar = () => {
  const [showProfileDropdown, setShowProfileDropdown] =
    useState<boolean>(false);

  const pathname = usePathname();
  const router = useRouter();

  const { data: session } = useSession() as any;

  const pathnameChunks = pathname.split('/');

  const requiredPath =
    pathnameChunks?.length === 3
      ? pathnameChunks[1]
      : pathnameChunks[pathnameChunks?.length - 1];

  const renderProfileDropdownOption = () => {
    return (
      <div
        className="absolute bottom-[-40px] z-[9999] flex items-center gap-2 text-xs p-2 bg-white rounded-md shadow"
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
            onClick={() => router.back()}
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
          {session?.user ? (
            <>
              <div className="border-black-100 border-2 rounded-full h-[60px] w-[60px] overflow-hidden">
                <Image
                  src={session?.user?.photo?.path ?? '/user.jpg'}
                  alt="Profile"
                  width={60}
                  height={60}
                  className="object-cover h-full w-full"
                />
              </div>
              {showProfileDropdown && renderProfileDropdownOption()}
              <div>
                <p className="text-sm font-semibold">{`${session?.user?.firstName} ${session?.user?.lastName}`}</p>
                <p className="text-xs text-gray-500">
                  {session?.user?.role?.name}
                </p>
              </div>
            </>
          ) : (
            <div className="flex items-center space-x-2">
              <div className="border-black-100 border-2 rounded-full h-[60px] w-[60px] overflow-hidden bg-gray-200 animate-pulse" />
              <div>
                <p className="text-sm font-semibold bg-gray-200 h-4 w-24 animate-pulse mb-1" />
                <p className="text-xs text-gray-500 bg-gray-200 h-3 w-16 animate-pulse" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
