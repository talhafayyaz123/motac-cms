'use client';

import Link from 'next/link';
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
  FaChevronDown,
} from 'react-icons/fa';

const menuItems = [
  {
    label: 'Dashboard',
    icon: <FaHome />,
    path: '/dashboard',
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
  },
  {
    label: 'Arrival Card',
    icon: <FaWallet />,
    path: '/arrival-card',
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
  },
  {
    label: 'Travel Kit',
    icon: <FaSuitcase />,
    path: '/travel-kit',
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

  const handleDropdownToggle = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  return (
    <div className="bg-white w-64 h-full shadow-md flex flex-col">
      <div className="p-6">
        <h1 className="text-lg font-bold">Malaysia Truly Asia</h1>
      </div>
      <div className="flex-1 overflow-y-auto">
        <ul className="mt-6">
          {menuItems.map((item) => (
            <li key={item.label}>
              <div
                className="flex items-center p-4 hover:bg-gray-100 cursor-pointer"
                role="button"
                tabIndex={0}
                onClick={() =>
                  item.subItems ? handleDropdownToggle(item.label) : null
                }
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    item.subItems ? handleDropdownToggle(item.label) : null;
                  }
                }}
              >
                <span className="mr-4">{item.icon}</span>
                <span>{item.label}</span>
                {item.subItems && (
                  <FaChevronDown
                    className={`ml-auto transition-transform ${
                      openDropdown === item.label ? 'rotate-180' : ''
                    }`}
                  />
                )}
              </div>
              {item.subItems && openDropdown === item.label && (
                <ul className="ml-6 space-y-1">
                  {item.subItems.map((subItem) => (
                    <li key={subItem.label} className="pl-6 py-1">
                      <Link
                        href={subItem.path}
                        className="flex items-center p-2 hover:bg-gray-100 rounded-md"
                      >
                        {subItem.icon}
                        <span className="ml-2">{subItem.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="p-4 hover:bg-gray-100 cursor-pointer flex items-center">
        <FaSignOutAlt className="mr-4" />
        <span className="text-red-600">Logout</span>
      </div>
    </div>
  );
};

export default Sidebar;
