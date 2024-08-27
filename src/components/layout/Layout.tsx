import React, { ReactNode } from "react";
import Sidebar from "../ui/Sidebar";
import Navbar from "../ui/Navbar";

interface LayoutProps {
    children: ReactNode; 
  }

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
