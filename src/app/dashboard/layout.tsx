import React from 'react';
import Sidebar from '@/components/ui/Sidebar';
import Navbar from '@/components/ui/Navbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <Sidebar />
      </div>

      <div className="flex-grow flex flex-col overflow-hidden">
        <Navbar />

        <div className="flex-grow md:overflow-y-auto overflow-x-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}
