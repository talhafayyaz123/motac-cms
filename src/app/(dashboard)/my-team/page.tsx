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

  useEffect(() => {
    const loadData = async () => {
      try {
        const fetchedData = await fetchTeam();
        setData(fetchedData);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    void loadData();
  }, []);

  const handleDelete = async (id: number) => {
    const { ID } = data[id];
    try {
      const response: any = await DeleteTeamMember(ID);
      if (response?.error) {
        await AlertService.alert('Error!', response.error, 'error', 'OK');
      } else if (response?.id) {
        await AlertService.alert(
          'Successful!',
          'Member Deleted Successfully',
          'success',
          'Done',
        );
        localStorage.removeItem('currentTeamMember');
        setCurrentMember(null);
      }
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
            onChange={(e) => console.log(e.target.value)}
            icon={<CiSearch />}
          />
        </div>
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
