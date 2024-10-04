'use client';

import React, { useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { FaFileExcel } from 'react-icons/fa';
import { RiCheckDoubleFill } from 'react-icons/ri';

import Button from '@/components/ui/Button';
import DataTable from '@/components/ui/dataTable/DataTable';
import Wrapper from '@/components/ui/dataTable/DataTableWrapper';
import Input from '@/components/ui/Input';
import Title from '@/components/ui/Title';
import { colors } from '@/lib/theme';

import generateDummyData from './DummyData';

type StatusType = 'Approved' | 'Rejected' | 'Pending' | 'Document Required';

interface Item {
  Select: string;
  Status: StatusType;
  [key: string]: any;
}

export default function VisaApplication() {
  const columns = [
    'Select',
    'User ID',
    'First Name',
    'Last Name',
    'Email Address',
    'Visa Application Number',
    'Application Date',
    'Type of Visa',
    'Status',
  ];

  const data = generateDummyData();

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const tagStyle: Record<StatusType, { background: string; border: string }> = {
    Approved: {
      background: colors.success_status_bg,
      border: `1px solid ${colors.success_status_outline}`,
    },
    Rejected: {
      background: colors.reject_status_bg,
      border: `1px solid ${colors.pending_status_outline}`,
    },
    Pending: {
      background: colors.pending_status_bg,
      border: `1px solid ${colors.pending_status_outline}`,
    },
    'Document Required': {
      background: colors.required_status_bg,
      border: `1px solid ${colors.required_status_outline}`,
    },
  };

  const renderCell = (item: Item, column: string) => {
    switch (column) {
      case 'Select':
        return (
          <div className="flex justify-center">
            <Input type="radio" minWidth="maxContent" />
          </div>
        );

      case 'Status':
        return (
          <div className="flex justify-center">
            <span
              style={tagStyle[item[column]]}
              className="w-full px-2 py-1 rounded-md"
            >
              {item[column]}
            </span>
          </div>
        );

      default:
        return <span>{item[column]}</span>;
    }
  };

  return (
    <main className="h-full">
      <Title className="font-light ml-2 mb-2">Visa Applications</Title>
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
          className="bg-white"
          onChange={(e) => console.log(e.target.value)}
          icon={<CiSearch />}
        />
      </Wrapper>

      <div className="bg-white auto">
        <DataTable
          columns={columns}
          data={data.slice((currentPage - 1) * perPage, currentPage * perPage)}
          renderCell={renderCell}
          pagination={{
            total: data.length,
            perPage,
            currentPage,
            onPageChange: setCurrentPage,
            onPerPageChange: setPerPage,
          }}
        />
      </div>
    </main>
  );
}
