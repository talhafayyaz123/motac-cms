'use client';

import { useRouter } from 'next/navigation';
import React, { Suspense } from 'react';
import { CiSearch } from 'react-icons/ci';
// import { FaFileExcel } from 'react-icons/fa';
// import { RiCheckDoubleFill } from 'react-icons/ri';

import Button from '@/components/ui/Button';
import DataTable from '@/components/ui/dataTable/DataTable';
import Wrapper from '@/components/ui/dataTable/DataTableWrapper';
import Input from '@/components/ui/Input';
import Loader from '@/components/ui/Loader';
import Title from '@/components/ui/Title';
// import AlertService from '@/services/alertService';

interface EventTableLayoutProps {
  tableTitle: string;
  buttonTitle: string;
  data: any[];
  columns: string[];
  currentPage: number;
  perPage: number;
  renderCell: (item: any, column: string, rowIndex: any) => JSX.Element;
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
  searchPlaceholder?: string;
  addEventRoute: string;
  onSearchChange: (search: string) => void;
}

const EventTableLayout: React.FC<EventTableLayoutProps> = ({
  tableTitle,
  buttonTitle,
  data,
  columns,
  currentPage,
  perPage,
  renderCell,
  onPageChange,
  onPerPageChange,
  searchPlaceholder = 'Search',
  addEventRoute,
  onSearchChange,
}) => {
  const router = useRouter();

  return (
    <main className="h-full">
      <Title className="font-light ml-2 mb-2 text-[#051225]">
        {tableTitle}
      </Title>

      <Wrapper>
        <div className="flex gap-3"></div>
        <div className="flex gap-3">
          <Button
            variant="secondary"
            className="h-10"
            onClick={() => router.push(addEventRoute)}
          >
            {buttonTitle}
          </Button>
          <Input
            type="text"
            placeholder={searchPlaceholder}
            inputSize="sm"
            minWidth="400px"
            className="bg-white"
            onChange={(e) => {
              const value = e.target.value;
              console.log(value);
              onSearchChange(value); // Call the handler to update search state
            }}
            icon={<CiSearch />}
          />
        </div>
      </Wrapper>

      <div className="bg-white auto">
        {data && data.length === 0 ? (
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
                onPageChange,
                onPerPageChange,
              }}
            />
          </Suspense>
        )}
      </div>
    </main>
  );
};

export default EventTableLayout;
