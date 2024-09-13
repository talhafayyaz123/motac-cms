'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import {
  FaHome,
  FaUser,
  FaGlobe,
  FaWallet,
  FaGift,
  FaTags,
  FaBook,
  FaSuitcase,
  FaUsers,
  FaTrash,
  FaMap,
  FaSignOutAlt,
  FaAward,
  FaRegIdCard,
  FaSimCard,
} from 'react-icons/fa';
import { FaBoxArchive, FaCameraRetro, FaLocationDot } from 'react-icons/fa6';
import { HiSquare3Stack3D } from 'react-icons/hi2';
import { IoTrailSignSharp } from 'react-icons/io5';
import { LuScrollText } from 'react-icons/lu';
import { MdEvent } from 'react-icons/md';
import { SiHomeassistantcommunitystore } from 'react-icons/si';

import producLogo from '@/assets/product-logo.svg';

const menuItems = [
  {
    label: 'Dashboard',
    icon: <FaHome />,
    path: '/',
    disabled: false,
  },
  {
    label: 'User Management',
    icon: <FaUser />,
    path: '/user-management',
    disabled: false,
    subItems: [
      {
        label: 'Active',
        path: '/user-management/active',
        icon: <FaUsers />,
        disabled: false,
      },
      {
        label: 'Deleted',
        path: '/user-management/deleted',
        icon: <FaTrash />,
        disabled: false,
      },
    ],
  },
  {
    label: 'Discover Malaysia',
    icon: <FaGlobe />,
    path: '/discover-malaysia',
    disabled: false,
    subItems: [
      {
        label: 'Exploring Destinations',
        path: '#',
        icon: <FaUsers />,
        disabled: false,
      },
      {
        label: 'Must See Attractions',
        path: '/discover-malaysia/must-see-attractions',
        icon: <FaLocationDot />,
        disabled: false,
      },
      {
        label: 'Top Experience',
        path: '/discover-malaysia/top-experience',
        icon: <FaCameraRetro />,
        disabled: false,
      },
      {
        label: 'Happening Events',
        path: '/discover-malaysia/happening-events',
        icon: <MdEvent />,
        disabled: false,
      },
      {
        label: 'Ar Trails',
        path: '/discover-malaysia/ar-trails',
        icon: <IoTrailSignSharp />,
        disabled: true,
      },
      {
        label: 'Restaurants',
        path: '/discover-malaysia/restaurants',
        icon: <FaAward />,
        disabled: false,
      },
    ],
  },
  {
    label: 'Arrival Card',
    icon: <FaWallet />,
    path: '/arrival-card',
    disabled: true,
    subItems: [
      {
        label: 'Visa Applications',
        path: '/arrival-card/visa-applications',
        icon: <LuScrollText />,
        disabled: true,
      },
      {
        label: 'MDAC',
        path: '/arrival-card/mdac',
        icon: <FaRegIdCard />,
        disabled: true,
      },
    ],
  },
  {
    label: 'My Wallet',
    icon: <FaWallet />,
    path: '/my-wallet',
    disabled: true,
  },
  {
    label: 'Rewards',
    icon: <FaGift />,
    path: '/rewards',
    disabled: true,
  },
  {
    label: 'Discounts',
    icon: <FaTags />,
    path: '/discounts',
    disabled: true,
  },
  {
    label: 'Heritage Products',
    icon: <FaBook />,
    path: '/heritage-products',
    disabled: true,
    subItems: [
      {
        label: 'Products',
        path: '/heritage-products/products',
        icon: <HiSquare3Stack3D />,
        disabled: true,
      },
      {
        label: 'Orders',
        path: '/heritage-products/orders',
        icon: <FaBoxArchive />,
        disabled: true,
      },
    ],
  },
  {
    label: 'Travel Kit',
    icon: <FaSuitcase />,
    path: '/travel-kit',
    disabled: true,
    subItems: [
      {
        label: 'Insurance Marketplace',
        path: '/travel-kit/insurance-marketplace',
        icon: <SiHomeassistantcommunitystore />,
        disabled: true,
      },
      {
        label: 'Traveler Sim',
        path: '/travel-kit/traveler-sim',
        icon: <FaSimCard />,
        disabled: true,
        subItems: [
          {
            label: 'Products',
            path: '/travel-kit/traveler-sim/products',
            icon: <HiSquare3Stack3D />,
            disabled: true,
          },
          {
            label: 'Orders',
            path: '/travel-kit/traveler-sim/orders',
            icon: <FaBoxArchive />,
            disabled: false,
          },
        ],
      },
    ],
  },
  {
    label: 'Guides',
    icon: <FaMap />,
    path: '/guides',
    disabled: true,
  },
  {
    label: 'My Team',
    icon: <FaUsers />,
    path: '/my-team',
    disabled: true,
  },
];

const Sidebar = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openSubDropdown, setOpenSubDropdown] = useState<string | null>(
    'Traveler Sim',
  );
  const router = useRouter();
  const pathname = usePathname();

  const handleDropdownToggle = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
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
        <Image
          src={producLogo}
          alt="product-logo"
          className="w-2/3 h-14 object-cover aspect-[16/9]"
        />
      </div>
      <div className="sidebar-scroll-bar flex-1 overflow-y-auto pr-7">
        <ul className="mt-6">
          {menuItems.map((item) => (
            <li key={item.label}>
              <div
                className={`flex items-center p-2 mb-2 rounded-lg font-medium ${
                  item.disabled
                    ? 'text-gray-300 cursor-not-allowed' // Style for disabled item
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
                      ? handleDropdownToggle(item.label)
                      : handleNavigation(item.path);
                  }
                }}
                onKeyDown={(e) => {
                  if (!item.disabled && (e.key === 'Enter' || e.key === ' ')) {
                    item.subItems
                      ? handleDropdownToggle(item.label)
                      : handleNavigation(item.path);
                  }
                }}
              >
                <span
                  className={`mr-4 ${
                    item.disabled
                      ? 'text-gray-300'
                      : pathname === item.path
                        ? 'text-white'
                        : ''
                  }`}
                >
                  {item.icon}
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
                        className={`flex font-medium items-center p-2 rounded-md ${
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
                                : ''
                          }`}
                        >
                          {subItem.icon}
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
                                  className={`flex items-center p-2 rounded-md ${
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
                                          : ''
                                    }`}
                                  >
                                    {nestedItem.icon}
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
