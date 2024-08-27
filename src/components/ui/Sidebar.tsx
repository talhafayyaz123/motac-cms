"use client";

import React, { useState } from "react";
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
} from "react-icons/fa";
import Link from "next/link";

const menuItems = [
  {
    label: "Dashboard",
    icon: <FaHome />,
    path: "/dashboard",
  },
  {
    label: "User Management",
    icon: <FaUser />,
    path: "/user-management",
    subItems: [
      { label: "Active", path: "/user-management/active", icon: <FaUsers /> },
      { label: "Deleted", path: "/user-management/deleted", icon: <FaTrash /> },
    ],
  },
  {
    label: "Discover Malaysia",
    icon: <FaGlobe />,
    path: "/discover-malaysia",
  },
  {
    label: "Arrival Card",
    icon: <FaWallet />,
    path: "/arrival-card",
  },
  {
    label: "My Wallet",
    icon: <FaWallet />,
    path: "/my-wallet",
  },
  {
    label: "Rewards",
    icon: <FaGift />,
    path: "/rewards",
  },
  {
    label: "Discounts",
    icon: <FaTags />,
    path: "/discounts",
  },
  {
    label: "Heritage Products",
    icon: <FaBook />,
    path: "/heritage-products",
  },
  {
    label: "Travel Kit",
    icon: <FaSuitcase />,
    path: "/travel-kit",
  },
  {
    label: "Guides",
    icon: <FaMap />,
    path: "/guides",
  },
  {
    label: "My Team",
    icon: <FaUsers />,
    path: "/my-team",
  },
];

const Sidebar = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleDropdownToggle = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  return (
    <div className="bg-white w-64 h-full shadow-md relative">
      <div className="p-6">
        <h1 className="text-lg font-bold">Malaysia Truly Asia</h1>
      </div>
      <ul className="mt-6">
        {menuItems.map((item) => (
          <li key={item.label}>
            <div
              className="flex items-center p-4 hover:bg-gray-100 cursor-pointer"
              onClick={() =>
                item.subItems ? handleDropdownToggle(item.label) : null
              }
            >
              <span className="mr-4">{item.icon}</span>
              <span>{item.label}</span>
              {item.subItems && (
                <FaChevronDown
                  className={`ml-auto transition-transform ${
                    openDropdown === item.label ? "rotate-180" : ""
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
      <div className="absolute bottom-0 w-full">
        <div className="flex items-center p-4 hover:bg-gray-100 cursor-pointer">
          <FaSignOutAlt className="mr-4" />
          <span className="text-red-600">Logout</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
