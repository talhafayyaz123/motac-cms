'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { FaFileExcel, FaRegEdit, FaTrashAlt } from 'react-icons/fa';
import { RiCheckDoubleFill } from 'react-icons/ri';

import Button from '@/components/ui/Button';
import DataTable from '@/components/ui/dataTable/DataTable';
import Wrapper from '@/components/ui/dataTable/DataTableWrapper';
import Input from '@/components/ui/Input';
import Title from '@/components/ui/Title';

import generateDummyData from './DummyData';

export default function Restaurants() {
  const router = useRouter();

  const columns = [
    'Select',
    'ID',
    'Restaurant Name',
    'Description',
    'Location',
    'Opens At',
    'Closes At',
    'Category',
    'Tags',
    'Edit',
    'Delete',
  ];

  const data = generateDummyData();

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(12);

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
      case 'Description':
        return (
          <div className="flex items-center gap-2 cursor-pointer">
            <span
              dangerouslySetInnerHTML={{ __html: item[column] }}
              className="text-xs text-left"
            />
          </div>
        );
      case 'Location':
        return (
          <div className="flex items-center gap-2 cursor-pointer">
            <span
              dangerouslySetInnerHTML={{ __html: item[column] }}
              className="text-xs text-left"
            />
          </div>
        );
      case 'Tags':
        return (
          <div className="flex gap-1">
            {item[column].map((tag: string, index: number) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-200 rounded-full text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        );
      default:
        return <span>{item[column]}</span>;
    }
  };

  return (
    <main className="h-full">
      <Title className="font-light ml-2 mb-2">Restaurants</Title>
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
              router.push('/discover-malaysia/restaurants/add-restaurant');
            }}
          >
            Add Restaurant
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