'use client';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { FaBell, FaCaretLeft } from 'react-icons/fa';

import { parsePathToTitle } from '@/helpers/utils/utils';

import Title from './Title';

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const requiredPath = pathname.split('/')[1];
  return (
    <div className="bg-white p-8 flex justify-between items-center">
      <div className="flex items-center max-h-max gap-4">
        {pathname !== '/' && (
          <div
            className="h-8 w-8 rounded-full bg-black flex items-center justify-start"
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
        <Title>
          {pathname === '/' ? 'Dashboard' : parsePathToTitle(requiredPath)}
        </Title>
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
            src="/user.jpg"
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
