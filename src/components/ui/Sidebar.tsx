'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FaSignOutAlt } from 'react-icons/fa';

import { menuItems } from '@/assets';
import producLogo from '@/assets/product-logo.svg';

interface DropdownItem {
  label: string;
  path: string;
  disabled: boolean;
}

const Sidebar = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openSubDropdown, setOpenSubDropdown] = useState<string | null>(
    'Traveler Sim',
  );
  const router = useRouter();
  const pathname = usePathname();

  const handleDropdownToggle = (label: string, items: DropdownItem[]) => {
    setOpenDropdown(openDropdown === label ? null : label);
    if (items?.length) {
      if (label === 'Discover Malaysia') {
        router.push(items[1]?.path);
      } else {
        router.push(items[0]?.path);
      }
    }
  };

  const handleSubDropdownToggle = (label: string) => {
    setOpenSubDropdown(openSubDropdown === label ? null : label);
  };

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <div className="w-full h-full flex flex-col py-5 pl-7">
      <div className="p-6">
        <Image src={producLogo} alt="product-logo" className="w-40 h-12" />
      </div>
      <div className="sidebar-scroll-bar flex-1 overflow-y-auto pr-7">
        <ul className="mt-6">
          {menuItems?.map((item) => (
            <li key={item.label}>
              <div
                className={`group flex items-center p-2 mb-2 rounded-lg font-medium ${
                  item.disabled
                    ? 'text-gray-300 cursor-not-allowed'
                    : (item.path !== '/' && pathname.includes(item.path)) ||
                        pathname === item.path
                      ? 'bg-blue-100 text-white'
                      : 'hover:bg-blue-100 hover:text-white text-black-100 cursor-pointer'
                }`}
                role="button"
                tabIndex={0}
                onClick={() => {
                  if (!item.disabled) {
                    item.subItems
                      ? handleDropdownToggle(item.label, item.subItems)
                      : handleNavigation(item.path);
                  }
                }}
                onKeyDown={(e) => {
                  if (!item.disabled && (e.key === 'Enter' || e.key === ' ')) {
                    item.subItems
                      ? handleDropdownToggle(item.label, item.subItems)
                      : handleNavigation(item.path);
                  }
                }}
              >
                <span
                  className={`mr-4 ${
                    item.disabled
                      ? 'text-gray-300'
                      : (item.path !== '/' && pathname.includes(item.path)) ||
                          pathname === item.path
                        ? 'text-white'
                        : 'group-hover:fill-white'
                  }`}
                >
                  {/* {item.icon} */}
                  <item.icon
                    color={
                      item.disabled
                        ? 'gray'
                        : (item.path !== '/' && pathname.includes(item.path)) ||
                            pathname === item.path
                          ? 'white'
                          : 'text-black-100'
                    }
                  />
                </span>
                <span
                  className={`text-sm ${item.disabled ? 'text-gray-300' : ''}`}
                >
                  {item.label}
                </span>
              </div>
              {item.subItems && openDropdown === item.label && (
                <ul className="ml-6 mb-2 space-y-1 border-l-2 border-blue-100 pl-4 relative">
                  {item.subItems.map((subItem) => (
                    <li key={subItem.label} className="relative">
                      <div
                        className={`group flex font-medium items-center p-2 rounded-md ${
                          subItem.disabled
                            ? 'text-gray-300 cursor-not-allowed'
                            : pathname === subItem.path
                              ? 'text-blue-100'
                              : 'hover:text-blue-100 text-black-100 cursor-pointer'
                        }`}
                        role="button"
                        tabIndex={0}
                        onClick={() => {
                          if (!subItem.disabled) {
                            subItem.subItems
                              ? handleSubDropdownToggle(subItem.label)
                              : handleNavigation(subItem.path);
                          }
                        }}
                        onKeyDown={(e) => {
                          if (
                            !subItem.disabled &&
                            (e.key === 'Enter' || e.key === ' ')
                          ) {
                            subItem.subItems
                              ? handleSubDropdownToggle(subItem.label)
                              : handleNavigation(subItem.path);
                          }
                        }}
                      >
                        <span
                          className={`mr-4 ${
                            subItem.disabled
                              ? 'text-gray-300'
                              : pathname === subItem.path
                                ? 'text-blue-100'
                                : 'group-hover:fill-blue-100'
                          }`}
                        >
                          <subItem.icon
                            color={
                              subItem.disabled
                                ? 'gray'
                                : pathname === subItem.path
                                  ? '#364EA2'
                                  : 'text-black-100 group-hover:fill-blue-100'
                            }
                          />
                        </span>
                        <span
                          className={`text-xs text-nowrap ${subItem.disabled ? 'text-gray-300' : ''}`}
                        >
                          {subItem.label}
                        </span>
                      </div>
                      <span className="absolute w-3 h-[2px] bg-blue-100 top-1/2 -left-[18px] transform rotate-12 rounded-bl-full rounded-tr-full"></span>
                      {subItem.subItems &&
                        openSubDropdown === subItem.label && (
                          <ul className="ml-6 space-y-1 border-l-2 border-blue-100 pl-4">
                            {subItem.subItems.map((nestedItem) => (
                              <li key={nestedItem.label} className="pl-4 py-1">
                                <Link
                                  href={nestedItem.path}
                                  className={`group flex items-center p-2 rounded-md ${
                                    nestedItem.disabled
                                      ? 'text-gray-300 cursor-not-allowed'
                                      : pathname === nestedItem.path
                                        ? 'text-blue-100 bg-transparent'
                                        : 'text-black-100'
                                  }`}
                                >
                                  <span
                                    className={`mr-4 ${
                                      nestedItem.disabled
                                        ? 'text-gray-300'
                                        : pathname === nestedItem.path
                                          ? 'text-blue-100'
                                          : 'group-hover:fill-blue-100'
                                    }`}
                                  >
                                    <nestedItem.icon
                                      color={
                                        nestedItem.disabled
                                          ? 'gray'
                                          : pathname === nestedItem.path
                                            ? '#364EA2'
                                            : 'text-black-100 group-hover:fill-blue-100'
                                      }
                                    />
                                  </span>
                                  <span
                                    className={`text-xs ${nestedItem.disabled ? 'text-gray-300' : ''}`}
                                  >
                                    {nestedItem.label}
                                  </span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="p-2 hover:bg-blue-100 cursor-pointer flex items-center rounded-lg">
        <FaSignOutAlt className="mr-4" />
        <span className="text-red-100 text-sm">Logout</span>
      </div>
    </div>
  );
};

export default Sidebar;
