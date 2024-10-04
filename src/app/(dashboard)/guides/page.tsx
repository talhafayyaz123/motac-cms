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
import { colors } from '@/lib/theme';

const DataTable = lazy(() => import('@/components/ui/dataTable/DataTable'));

export default function Guides() {
  const router = useRouter();

  const columns = [
    'Select',
    'Guide Name',
    'City',
    'Category',
    'Tags',
    'Edit',
    'Delete',
  ];

  const availableTags = ['Jungle', 'Trekking', 'Wildlife'];

  const [data, setData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [activeRowIndex, setActiveRowIndex] = useState<number | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const { default: generateDummyData } = await import('./DummyData');
      setData(generateDummyData());
    };
    void loadData();
  }, []);

  const handleTagRemove = (
    event: React.MouseEvent<HTMLButtonElement>,
    rowIndex: number,
    tagIndex: number,
  ) => {
    event.stopPropagation();
    const newData = [...data];
    const newRow = { ...newData[rowIndex] };
    newRow.Tags = [...newRow.Tags];
    newRow.Tags.splice(tagIndex, 1);
    newData[rowIndex] = newRow;
    setData(newData);
  };

  const handleTagAdd = (
    e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>,
    rowIndex: number,
  ) => {
    const target = e.target as HTMLElement;
    const newTag = target.innerText;
    const newData = [...data];
    const newRow = { ...newData[rowIndex] };
    newRow.Tags = [...newRow.Tags, newTag];
    newData[rowIndex] = newRow;
    setData(newData);
  };

  const renderTagOptions = (rowIndex: number) => {
    const rowTags = data[rowIndex]?.Tags || [];

    const missingTags = availableTags.filter((tag) => !rowTags.includes(tag));

    return (
      missingTags.length > 0 && (
        <div className="absolute z-10 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg p-2">
          {missingTags.map((tag) => (
            <div
              key={tag}
              onClick={(e) => handleTagAdd(e, rowIndex)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                }
              }}
            >
              <span className="px-3 py-1 rounded-full text-xs font-medium">
                {tag}
              </span>
            </div>
          ))}
        </div>
      )
    );
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
          <div className="flex items-center gap-2 justify-center cursor-pointer">
            <Image height={20} alt="edit" width={20} src="/edit_icon.svg" />
            {item[column]}
          </div>
        );
      case 'Delete':
        return (
          <div className="flex items-center justify-center gap-2 cursor-pointer">
            <Image height={20} alt="delete" width={20} src="/delete_icon.svg" />
            {item[column]}
          </div>
        );
      case 'Tags':
        return (
          <div
            className={`${item[column]?.length === 0 && 'p-2'} flex gap-1`}
            onClick={() =>
              setActiveRowIndex(rowIndex === activeRowIndex ? null : rowIndex)
            }
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
              }
            }}
          >
            {item[column].map((tag: string, index: number) => {
              return (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full text-xs font-medium"
                  style={{ backgroundColor: colors[tag] }}
                >
                  {tag}
                  <button
                    onClick={(event) => handleTagRemove(event, rowIndex, index)}
                    className="ml-2 text-gray-500 hover:text-gray-700"
                  >
                    &times;
                  </button>
                </span>
              );
            })}
            {activeRowIndex === rowIndex && renderTagOptions(rowIndex)}
          </div>
        );
      default:
        return <span>{item[column]}</span>;
    }
  };

  return (
    <main className="h-full">
      <Title className="font-light ml-2 mb-2">Guides</Title>
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
              router.push('/guides/add-guide');
            }}
          >
            Add Guides
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
