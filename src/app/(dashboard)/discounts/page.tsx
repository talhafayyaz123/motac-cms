'use client';

import React, { useState } from 'react';
import { FaFileExcel, FaRegEdit, FaTrashAlt } from 'react-icons/fa';
import { RiCheckDoubleFill } from 'react-icons/ri';

import { SearchIcon } from '@/assets';
import Button from '@/components/ui/Button';
import DataTable from '@/components/ui/dataTable/DataTable';
import Wrapper from '@/components/ui/dataTable/DataTableWrapper';
import Select from '@/components/ui/dataTable/Select';
import Input from '@/components/ui/Input';
import Title from '@/components/ui/Title';

import generateDummyData from './DummyData';

export default function Discounts() {
  const columns = [
    'Select',
    'Offer ID',
    'Offer Title',
    'Offer Subtitle',
    'Offer Start Date',
    'Offer End Date',
    'Merchant Name',
    'Merchant Country',
    'Merchant Country Code',
    'Edit',
    'Delete',
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
      case 'Edit':
        return (
          <div className="flex items-center gap-2 cursor-pointer">
            <FaRegEdit className="text-blue-800 text-xl" />
            {item[column]}
          </div>
        );
      case 'Delete':
        return (
          <div className="flex items-center gap-2 cursor-pointer">
            <FaTrashAlt className="text-red-600 text-xl" />
            {item[column]}
          </div>
        );
      case 'Offer Subtitle':
        return (
          <div className="flex items-center gap-2 cursor-pointer">
            <span
              dangerouslySetInnerHTML={{ __html: item[column] }}
              className="text-xs text-left"
            />
          </div>
        );
      case 'Merchant Country':
        return (
          <div className="relative">
            <Select
              options={[
                { value: 'Malaysia', label: 'Malaysia' },
                { value: 'Singapore', label: 'Singapore' },
              ]}
              highlightValue="Malaysia"
            />
          </div>
        );
      default:
        return <span>{item[column]}</span>;
    }
  };

  return (
    <main className="h-full">
      <Title className="font-light ml-2 mb-2">Discounts</Title>
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
          <Button variant="secondary">Add Restaurant</Button>
          <Input
            type="text"
            placeholder="Search"
            inputSize="sm"
            minWidth="400px"
            className="bg-white"
            onChange={(e) => console.log(e.target.value)}
            icon={<SearchIcon />}
          />
        </div>
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
