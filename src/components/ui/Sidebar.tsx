'use client';

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

const menuItems = [
  {
    label: 'Dashboard',
    icon: <FaHome />,
    path: '/',
  },
  {
    label: 'User Management',
    icon: <FaUser />,
    path: '/user-management',
    subItems: [
      { label: 'Active', path: '/user-management/active', icon: <FaUsers /> },
      { label: 'Deleted', path: '/user-management/deleted', icon: <FaTrash /> },
    ],
  },
  {
    label: 'Discover Malaysia',
    icon: <FaGlobe />,
    path: '/discover-malaysia',
    subItems: [
      { label: 'Exploring Destinations', path: '#', icon: <FaUsers /> },
      {
        label: 'Must See Attractions',
        path: '/discover-malaysia/must-see-attractions',
        icon: <FaLocationDot />,
      },
      {
        label: 'Top Experience',
        path: '/discover-malaysia/top-experience',
        icon: <FaCameraRetro />,
      },
      {
        label: 'Happening Events',
        path: '/discover-malaysia/happening-events',
        icon: <MdEvent />,
      },
      {
        label: 'Ar Trails',
        path: '/discover-malaysia/ar-trails',
        icon: <IoTrailSignSharp />,
      },
      {
        label: 'Restaurants',
        path: '/discover-malaysia/restaurants',
        icon: <FaAward />,
      },
    ],
  },
  {
    label: 'Arrival Card',
    icon: <FaWallet />,
    path: '/arrival-card',
    subItems: [
      {
        label: 'Visa Applications',
        path: '/arrival-card/visa-applications',
        icon: <LuScrollText />,
      },
      {
        label: 'MDAC',
        path: '/arrival-card/mdac',
        icon: <FaRegIdCard />,
      },
    ],
  },
  {
    label: 'My Wallet',
    icon: <FaWallet />,
    path: '/my-wallet',
  },
  {
    label: 'Rewards',
    icon: <FaGift />,
    path: '/rewards',
  },
  {
    label: 'Discounts',
    icon: <FaTags />,
    path: '/discounts',
  },
  {
    label: 'Heritage Products',
    icon: <FaBook />,
    path: '/heritage-products',
    subItems: [
      {
        label: 'Products',
        path: '/heritage-products/products',
        icon: <HiSquare3Stack3D />,
      },
      {
        label: 'Orders',
        path: '/heritage-products/orders',
        icon: <FaBoxArchive />,
      },
    ],
  },
  {
    label: 'Travel Kit',
    icon: <FaSuitcase />,
    path: '/travel-kit',
    subItems: [
      {
        label: 'Insurance Marketplace',
        path: '/travel-kit/insurance-marketplace',
        icon: <SiHomeassistantcommunitystore />,
      },
      {
        label: 'Traveler Sim',
        path: '/travel-kit/traveler-sim',
        icon: <FaSimCard />,
        subItems: [
          {
            label: 'Products',
            path: '/travel-kit/traveler-sim/products',
            icon: <HiSquare3Stack3D />,
          },
          {
            label: 'Orders',
            path: '/travel-kit/traveler-sim/orders',
            icon: <FaBoxArchive />,
          },
        ],
      },
    ],
  },
  {
    label: 'Guides',
    icon: <FaMap />,
    path: '/guides',
  },
  {
    label: 'My Team',
    icon: <FaUsers />,
    path: '/my-team',
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
    <div className="bg-white w-64 h-full shadow-md flex flex-col p-5">
      <div className="p-6">
        <h1 className="text-lg font-bold">Malaysia Truly Asia</h1>
      </div>
      <div className="flex-1 overflow-y-auto">
        <ul className="mt-6">
          {menuItems.map((item) => (
            <li key={item.label}>
              <div
                className={`flex items-center p-2 mb-2 cursor-pointer rounded-lg ${
                  pathname === item.path
                    ? 'bg-blue-600 text-white'
                    : 'hover:bg-gray-100'
                }`}
                role="button"
                tabIndex={0}
                onClick={() =>
                  item.subItems
                    ? handleDropdownToggle(item.label)
                    : handleNavigation(item.path)
                }
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    item.subItems
                      ? handleDropdownToggle(item.label)
                      : handleNavigation(item.path);
                  }
                }}
              >
                <span
                  className={`mr-4 ${
                    pathname === item.path ? 'text-white' : ''
                  }`}
                >
                  {item.icon}
                </span>
                <span className="text-sm">{item.label}</span>
              </div>
              {item.subItems && openDropdown === item.label && (
                <ul className="ml-6 space-y-1">
                  {item.subItems.map((subItem) => (
                    <li key={subItem.label}>
                      <div
                        className={`flex items-center p-2 cursor-pointer rounded-md ${
                          pathname === subItem.path
                            ? 'bg-blue-100 text-blue-600'
                            : 'hover:bg-gray-100'
                        }`}
                        role="button"
                        tabIndex={0}
                        onClick={() =>
                          subItem.subItems
                            ? handleSubDropdownToggle(subItem.label)
                            : handleNavigation(subItem.path)
                        }
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            subItem.subItems
                              ? handleSubDropdownToggle(subItem.label)
                              : handleNavigation(subItem.path);
                          }
                        }}
                      >
                        <span
                          className={`mr-4 ${
                            pathname === subItem.path ? 'text-blue-600' : ''
                          }`}
                        >
                          {subItem.icon}
                        </span>
                        <span className="text-xs">{subItem.label}</span>
                      </div>
                      {subItem.subItems &&
                        openSubDropdown === subItem.label && (
                          <ul className="ml-6 space-y-1">
                            {subItem.subItems.map((nestedItem) => (
                              <li key={nestedItem.label} className="pl-4 py-1">
                                <Link
                                  href={nestedItem.path}
                                  className={`flex items-center p-2 rounded-md ${
                                    pathname === nestedItem.path
                                      ? 'text-blue-600'
                                      : 'hover:bg-gray-100'
                                  }`}
                                >
                                  <span
                                    className={`mr-4 ${
                                      pathname === nestedItem.path
                                        ? 'text-blue-600'
                                        : ''
                                    }`}
                                  >
                                    {nestedItem.icon}
                                  </span>
                                  <span className="text-xs">
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
      <div className="p-2 hover:bg-gray-100 cursor-pointer flex items-center rounded-lg">
        <FaSignOutAlt className="mr-4" />
        <span className="text-red-600 text-sm">Logout</span>
      </div>
    </div>
  );
};

export default Sidebar;
