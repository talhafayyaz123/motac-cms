'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { FaFileExcel, FaRegEdit, FaTrashAlt } from 'react-icons/fa';
import { RiCheckDoubleFill } from 'react-icons/ri';

import Button from '@/components/ui/Button';
import DataTable from '@/components/ui/dataTable/DataTable';
import Wrapper from '@/components/ui/dataTable/DataTableWrapper';
import Select from '@/components/ui/dataTable/Select';
import Input from '@/components/ui/Input';
import Title from '@/components/ui/Title';

import generateDummyData from './DummyData';

export default function Orders() {
  const columns = [
    'Select',
    'Image',
    'User ID',
    'Order ID',
    'Order Name',
    'Order Category',
    'Order Date',
    'Order Time',
    'Order Value',
    'Payment Mode',
    'Payment Status',
    'Order Status',
    'Edit',
    'Delete',
  ];

  const data = generateDummyData();

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(12);

  const renderCell = (item: any, column: string) => {
    console.log(item);

    switch (column) {
      case 'Select':
        return (
          <div className="flex justify-center">
            <Input type="radio" minWidth="maxContent" />
          </div>
        );
      case 'Image':
        return (
          <div className="flex justify-center">
            <Image src={item[column]} alt="product" width={60} height={60} />
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
      case 'Payment Mode':
        return (
          <div className="relative">
            <Select
              options={[
                { value: 'Digital Wallet', label: 'Digital Wallet' },
                { value: 'Credit Card', label: 'Credit Card' },
              ]}
              highlightValue="High"
            />
          </div>
        );
      case 'Payment Status':
        return (
          <div className="relative">
            <Select
              options={[
                { value: 'Completed', label: 'Completed' },
                { value: 'Pending', label: 'Pending' },
              ]}
              highlightValue="High"
            />
          </div>
        );
      case 'Order Status':
        return (
          <div className="relative">
            <Select
              options={[{ value: 'Delivered', label: 'Delivered' }]}
              highlightValue="High"
            />
          </div>
        );
      default:
        return <span>{item[column]}</span>;
    }
  };

  return (
    <main className="h-full">
      <Title className="font-light ml-2 mb-2">Orders</Title>
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
