'use client';

import React, { useState, lazy, Suspense, useEffect } from 'react';
import { CiSearch } from 'react-icons/ci';
import { FaFileExcel } from 'react-icons/fa';
import { RiCheckDoubleFill } from 'react-icons/ri';

import Button from '@/components/ui/Button';
import Wrapper from '@/components/ui/dataTable/DataTableWrapper';
import Input from '@/components/ui/Input';
import Loader from '@/components/ui/Loader';
import Title from '@/components/ui/Title';
import { FetchDeletedUsers } from '@/services/apiService';

const DataTable = lazy(() => import('@/components/ui/dataTable/DataTable'));

export default function UserManagementDeleted() {
  const columns = [
    'Select',
    'User ID',
    'First Name',
    'Last Name',
    'Email',
    'Phone Number',
    'Nationality',
  ];

  const [data, setData] = useState<any[] | { error: string }>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(12);
  const [isNoData, setIsNoData] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const fetchedData = await FetchDeletedUsers(currentPage, perPage);
        setData(fetchedData?.data);
        setTotalCount(fetchedData?.total);
        if (Array.isArray(fetchedData) && fetchedData?.data?.length === 0) {
          setIsNoData(true);
        } else {
          setIsNoData(false);
        }
      } catch (error) {
        console.error('Error loading data:', error);
        setIsNoData(true);
        setData({ error: 'An error occurred while fetching data' });
      } finally {
        setIsLoading(false);
      }
    };

    void loadData();
  }, [currentPage, perPage]);

  const renderCell = (item: any, column: string) => {
    switch (column) {
      case 'Select':
        return (
          <div className="flex justify-center">
            <Input type="radio" minWidth="maxContent" />
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
      <Wrapper>
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
        {isLoading ? (
          <Loader />
        ) : isNoData ? (
          <div className="p-4 text-center text-gray-500">No data available</div>
        ) : Array.isArray(data) ? (
          <Suspense fallback={<Loader />}>
            <DataTable
              columns={columns}
              data={data}
              renderCell={renderCell}
              pagination={{
                total: totalCount,
                perPage,
                currentPage,
                onPageChange: setCurrentPage,
                onPerPageChange: setPerPage,
              }}
            />
          </Suspense>
        ) : (
          <div className="p-4 text-center text-red-500">
            Error: {data?.error}
          </div>
        )}
      </div>
    </main>
  );
}
