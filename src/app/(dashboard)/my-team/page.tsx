'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { FaFileExcel } from 'react-icons/fa';
import { RiCheckDoubleFill } from 'react-icons/ri';

import Button from '@/components/ui/Button';
import Wrapper from '@/components/ui/dataTable/DataTableWrapper';
import Input from '@/components/ui/Input';
import Loader from '@/components/ui/Loader';
import Title from '@/components/ui/Title';
import useDebounce from '@/hooks/useDebounce';
import AlertService from '@/services/alertService';
import { DeleteTeamMember, fetchTeam } from '@/services/apiService';
import { useMember } from '@/store/MemberContext';

const DataTable = lazy(() => import('@/components/ui/dataTable/DataTable'));

export default function MyTeam() {
  const router = useRouter();
  const { setCurrentMember } = useMember();

  const columns = [
    'Select',
    'First Name',
    'Last Name',
    'Designation',
    'Role',
    'Email Address',
    'Edit',
    'Delete',
  ];

  const [data, setData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(12);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isNoData, setIsNoData] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 700);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const fetchedData = await fetchTeam(
          currentPage,
          perPage,
          debouncedSearchTerm,
        );
        setData(fetchedData?.data || []);
        setTotalCount(fetchedData?.total || 0);

        if (fetchedData?.data?.length === 0) {
          setIsNoData(true);
        } else {
          setIsNoData(false);
        }
      } catch (error) {
        console.error('Error loading data:', error);
        setIsNoData(true);
      } finally {
        setIsLoading(false);
      }
    };

    void loadData();
  }, [currentPage, perPage, debouncedSearchTerm]);

  const handleDelete = async (id: number) => {
    const { ID } = data[id];
    try {
      await DeleteTeamMember(ID);
      await AlertService.alert(
        'Successful!',
        'Member Deleted Successfully',
        'success',
        'Done',
      );
      localStorage.removeItem('currentTeamMember');
      setCurrentMember(null);
      const filteredData = data.filter((member) => member.ID !== ID);
      setData(filteredData);
    } catch (error: any) {
      await AlertService.alert(
        'Error!',
        'An unexpected error occurred',
        'error',
        'OK',
      );
    }
  };

  const renderCell = (item: any, column: string, rowIndex: any) => {
    switch (column) {
      case 'Select':
        return (
          <div className="flex justify-center">
            <Input type="radio" minWidth="maxContent" />
          </div>
        );
      case 'Edit':
        return (
          <div
            className="flex items-center gap-2 justify-center cursor-pointer"
            onClick={() => {
              setCurrentMember(data[rowIndex]);
              router.push('/my-team/add-team-member');
            }}
            onKeyDown={() => {}}
            tabIndex={0}
            role="button"
          >
            <Image height={20} alt="edit" width={20} src="/edit_icon.svg" />
            {item[column]}
          </div>
        );
      case 'Delete':
        return (
          <div
            className="flex items-center justify-center gap-2 cursor-pointer"
            onClick={() => handleDelete(rowIndex)}
            onKeyDown={() => {}}
            tabIndex={0}
            role="button"
          >
            <Image height={20} alt="delete" width={20} src="/delete_icon.svg" />
            {item[column]}
          </div>
        );
      default:
        return <span>{item[column]}</span>;
    }
  };

  return (
    <main className="h-full">
      <Title className="font-light ml-2 mb-2">All Team Members</Title>
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

        <div className="flex gap-3">
          <Button
            variant="secondary"
            onClick={() => {
              router.push('/my-team/add-team-member');
            }}
          >
            Add Member
          </Button>
          <Input
            type="text"
            placeholder="Search"
            inputSize="sm"
            minWidth="400px"
            className="bg-white"
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={<CiSearch />}
          />
        </div>
      </Wrapper>

      <div className="bg-white auto">
        {isLoading ? (
          <Loader />
        ) : isNoData ? (
          <div className="p-4 text-center text-gray-500">No data available</div>
        ) : (
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
        )}
      </div>
    </main>
  );
}
