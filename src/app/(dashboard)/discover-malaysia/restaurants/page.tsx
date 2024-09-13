'use client';

import { useRouter } from 'next/navigation';
import React, { useState, lazy, useEffect, Suspense } from 'react';
import { CiSearch } from 'react-icons/ci';
import { FaFileExcel, FaRegEdit, FaTrashAlt } from 'react-icons/fa';
import { RiCheckDoubleFill } from 'react-icons/ri';

import Button from '@/components/ui/Button';
import Wrapper from '@/components/ui/dataTable/DataTableWrapper';
import Input from '@/components/ui/Input';
import Loader from '@/components/ui/Loader';
import Title from '@/components/ui/Title';

const DataTable = lazy(() => import('@/components/ui/dataTable/DataTable'));

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

  const [data, setData] = useState<any[]>([]);

  // UseEffect to lazily load dummy data
  useEffect(() => {
    const loadData = async () => {
      const { default: generateDummyData } = await import('./DummyData');
      setData(generateDummyData());
    };

    void loadData();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(12);

  const handleTagRemove = (rowIndex: number, tagIndex: number) => {
    const newData = [...data];
    newData[rowIndex].Tags.splice(tagIndex, 1);
    setData(newData);
  };

  const renderCell = (item: any, column: string, rowIndex: number) => {
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
                <button
                  onClick={() => handleTagRemove(rowIndex, index)}
                  className="ml-2 text-gray-500 hover:text-gray-700"
                >
                  &times;
                </button>
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
      <Title className="font-light ml-2 mb-2 text-[#051225]">Restaurants</Title>
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
            className="h-10 mt-2"
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
        {data.length === 0 ? (
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
