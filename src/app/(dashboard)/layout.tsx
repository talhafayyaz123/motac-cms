import React from 'react';

import Navbar from '@/components/ui/Navbar';
import Sidebar from '@/components/ui/Sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <Sidebar />
      </div>

      <div className="flex-grow flex flex-col overflow-hidden">
        <Navbar />

        <div className="flex-grow md:overflow-y-auto overflow-x-hidden py-3">
          {children}
        </div>
      </div>
    </div>
  );
}
