'use client';

import React, { useState, lazy, useEffect, Suspense } from 'react';
import { CiSearch } from 'react-icons/ci';
import { FaFileExcel } from 'react-icons/fa';
import { IoEyeSharp } from 'react-icons/io5';
import { RiCheckDoubleFill } from 'react-icons/ri';

import Button from '@/components/ui/Button';
import Wrapper from '@/components/ui/dataTable/DataTableWrapper';
import Input from '@/components/ui/Input';
import Loader from '@/components/ui/Loader';
import Title from '@/components/ui/Title';

const DataTable = lazy(() => import('@/components/ui/dataTable/DataTable'));

export default function UserManagementActive() {
  const columns = [
    'Select',
    'User ID',
    'First Name',
    'Last Name',
    'Email',
    'Phone Number',
    'Nationality',
    'Action',
    'Reset Link',
  ];

  const [data, setData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(12);

  useEffect(() => {
    const loadData = async () => {
      const { default: generateDummyData } = await import(
        '@/components/ui/dataTable/DummyData'
      );
      setData(generateDummyData());
    };
    void loadData();
  }, []);

  const renderCell = (item: any, column: string) => {
    switch (column) {
      case 'Select':
        return (
          <div className="flex justify-center">
            <Input type="radio" minWidth="maxContent" />
          </div>
        );

      case 'Action':
        return (
          <div className="flex items-center gap-1 cursor-pointer">
            <IoEyeSharp />
            <span>{item[column]}</span>
          </div>
        );

      case 'Reset Link':
        return (
          <div className="flex items-center gap-2 cursor-pointer">
            <span className="text-blue-600 underline">{item[column]}</span>
          </div>
        );

      default:
        return <span>{item[column]}</span>;
    }
  };

  return (
    <main className="h-full">
      <Title className="font-light ml-2 mb-2 text-[#051225]">
        User Management
      </Title>
      <Wrapper isBgColor={false}>
        <div className="flex gap-3">
          <Button variant="primary" icon={<RiCheckDoubleFill />}>
            Select All
          </Button>
          <Button
            variant="primary"
            icon={<FaFileExcel className="text-green-600" />}
          >
            Download Excel
          </Button>
        </div>

        <Input
          type="text"
          placeholder="Search"
          inputSize="sm"
          minWidth="400px"
          className="bg-white !border-0"
          onChange={(e) => console.log(e.target.value)}
          icon={<CiSearch />}
        />
      </Wrapper>

      <div className="bg-white auto">
        {data.length == 0 ? (
          <Loader />
        ) : (
          <Suspense fallback={<Loader />}>
            <DataTable
              columns={columns}
              data={data.slice(
                (currentPage - 1) * perPage,
                currentPage * perPage,
              )}
              renderCell={renderCell}
              pagination={{
                total: data.length,
                perPage,
                currentPage,
                onPageChange: setCurrentPage,
                onPerPageChange: setPerPage,
              }}
            />
          </Suspense>
        )}
      </div>
    </main>
  );
}
