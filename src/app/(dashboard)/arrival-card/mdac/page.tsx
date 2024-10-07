'use client';

import React, { useState } from 'react';
import { FaFileExcel } from 'react-icons/fa';
import { RiCheckDoubleFill } from 'react-icons/ri';

import { SearchIcon } from '@/assets';
import Button from '@/components/ui/Button';
import DataTable from '@/components/ui/dataTable/DataTable';
import Wrapper from '@/components/ui/dataTable/DataTableWrapper';
import Input from '@/components/ui/Input';
import Title from '@/components/ui/Title';

import generateDummyData from './DummyData';

export default function VisaApplication() {
  const columns = [
    'Select',
    'User ID',
    'MDAC ID',
    'Applicant Name',
    'Date',
    'Email Address',
    'MDAC PIN Code',
  ];

  const data = generateDummyData();

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

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
      <Title className="font-light ml-2 mb-2">MDAC</Title>
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
          icon={<SearchIcon />}
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
