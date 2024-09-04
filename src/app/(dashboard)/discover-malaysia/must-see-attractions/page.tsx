'use client';

import React, { useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { FaFileExcel, FaRegEdit, FaTrashAlt } from 'react-icons/fa';
import { RiCheckDoubleFill } from 'react-icons/ri';

import Button from '@/components/ui/Button';
import DataTable from '@/components/ui/dataTable/DataTable';
import Wrapper from '@/components/ui/dataTable/DataTableWrapper';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Title from '@/components/ui/Title';
import AlertService from '@/services/alertService';

import generateDummyData from './DummyData';

export default function MustSeeAttractions() {
  const columns = [
    'Select',
    'Attraction ID',
    'Attraction Name',
    'Attraction Category',
    'Attraction City',
    'Tags',
    'Priority',
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
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={async () => {
              try {
                await AlertService.confirm(
                  'Are you sure you want to delete this Selected Field',
                  'Confirm',
                  'Cancel',
                );
              } catch (error) {
                console.log('something went wrong ');
              }
            }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
              }
            }}
          >
            <FaTrashAlt className="text-red-600 text-xl" />
            {item[column]}
          </div>
        );
      case 'Priority':
        return (
          <div className="relative">
            <Select
              options={[
                { value: 'High', label: 'High' },
                { value: 'Medium', label: 'Medium' },
                { value: 'Low', label: 'Low' },
              ]}
              highlightValue="High"
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
      <Title className="font-light ml-2 mb-2">Must See Attractions</Title>
      <Wrapper>
        <div className="flex gap-3">
          <Button variant="primary" icon={<RiCheckDoubleFill />}>
            Select All
          </Button>
          <Button
            variant="primary"
            icon={<FaFileExcel className="text-green-600" />}
            onClick={async () => {
              try {
                await AlertService.alert(
                  'Successful!',
                  'Downloaded Excell Sucessfully',
                  'success',
                  'Done',
                );
              } catch (error) {
                console.log('something went wrong ');
              }
            }}
          >
            Download Excel
          </Button>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary">Add Attraction</Button>
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
