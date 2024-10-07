'use client';

import { useRouter } from 'next/navigation';
import React, { Suspense } from 'react';
// import { FaFileExcel } from 'react-icons/fa';
// import { RiCheckDoubleFill } from 'react-icons/ri';

import { SearchIcon } from '@/assets';
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
  totalCount: number;
  loading: boolean;
  isNoData?: boolean;
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
  totalCount,
  loading,
  isNoData,
}) => {
  const router = useRouter();

  return (
    <main className="h-full">
      <Title className="font-light ml-2 mb-2 text-[#051225]">
        {tableTitle}
      </Title>

      <Wrapper>
        <div className="flex gap-3"></div>
        <div className="flex gap-3 items-center">
          <Button
            variant="secondary"
            className="h-10"
            onClick={() => router.push(addEventRoute)}
          >
            {buttonTitle}
          </Button>
          <Input
            marginBottom="0"
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
            icon={<SearchIcon />}
          />
        </div>
      </Wrapper>

      <div className="bg-white auto">
        {loading ? (
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
                onPageChange,
                onPerPageChange,
              }}
            />
          </Suspense>
        ) : (
          <></>
        )}
      </div>
    </main>
  );
};

export default EventTableLayout;
