'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState, Suspense, lazy, useEffect } from 'react';
import { CiSearch } from 'react-icons/ci';
import { FaFileExcel } from 'react-icons/fa';
import { RiCheckDoubleFill } from 'react-icons/ri';

import Button from '@/components/ui/Button';
import Wrapper from '@/components/ui/dataTable/DataTableWrapper';
import Select from '@/components/ui/dataTable/Select';
import Input from '@/components/ui/Input';
import Loader from '@/components/ui/Loader';
import Title from '@/components/ui/Title';
import AlertService from '@/services/alertService';

import fetchData from './destinationData';

const DataTable = lazy(() => import('@/components/ui/dataTable/DataTable'));

export default function MustSeeAttractions() {
  const router = useRouter();

  const availableTags = ['Food', 'Nature', 'Travel'];

  const columns = [
    'Select',
    'Attraction ID',
    'Attraction Name',
    'Attraction City',
    'Tags',
    'Priority',
    'Edit',
    'Delete',
  ];

  const [data, setData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(12);
  const [activeRowIndex, setActiveRowIndex] = useState<number | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const fetchedData = await fetchData();
        setData(fetchedData);
      } catch (error) {
        console.error('Error loading data:', error);
      }
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
  const tagColors = ['#E7ECFC', '#E3EFF8', '#E3F7F8'];

  const handleTagAdd = (
    e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>,
    rowIndex: number,
    newTagName: string, // Accept new tag name as an argument
  ) => {
    const newData = [...data];
    const newRow = { ...newData[rowIndex] };

    // Create a new tag object with a random color
    const newTag = {
      name: newTagName,
      color: tagColors[Math.floor(Math.random() * tagColors.length)],
    };

    newRow.Tags = [...newRow.Tags, newTag];
    newData[rowIndex] = newRow;
    setData(newData);
  };

  const renderTagOptions = (rowIndex: number) => {
    const rowTags = data[rowIndex]?.Tags || [];
    const missingTags = availableTags.filter((tag) =>
      rowTags.every((rowTag: any) => rowTag.name !== tag),
    );

    return (
      missingTags.length > 0 && (
        <div className="absolute left-0 z-10 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg p-2">
          {missingTags.map((tag) => (
            <div
              key={tag}
              onClick={(e) => handleTagAdd(e, rowIndex, tag)}
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
          <div
            className="flex items-center gap-2 justify-center cursor-pointer"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
              }
            }}
            onClick={() => {
              router.push(
                '/discover-malaysia/must-see-attractions/add-attraction',
              );
            }}
          >
            <Image height={20} alt="edit" width={20} src="/edit_icon.svg" />
            {item[column]}
          </div>
        );
      case 'Delete':
        return (
          <div
            className="flex items-center justify-center gap-2 cursor-pointer"
            onClick={async () => {
              try {
                await AlertService.confirm(
                  'Are you sure you want to delete the Selected Field',
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
            <Image height={20} alt="delete" width={20} src="/delete_icon.svg" />
            {item[column]}
          </div>
        );
      case 'Priority':
        return (
          <div className="relative">
            <Select
              value={item[column]}
              options={[
                { value: 'High', label: 'High' },
                { value: 'Medium', label: 'Medium' },
                { value: 'Low', label: 'Low' },
              ]}
              highlightValue="High"
              onChange={(e) => {
                const updatedData = [...data];
                updatedData[rowIndex].Priority = e.target.value;
                setData(updatedData);
              }}
            />
          </div>
        );
      case 'Tags':
        return (
          <div
            className={`${item[column]?.length === 0 && 'p-2'} flex gap-1 relative`}
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
            {item[column].map((tag: any, index: number) => {
              return (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full text-xs font-medium"
                  style={{ backgroundColor: tag.color }}
                >
                  {tag.name}
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
      <Title className="font-light ml-2 mb-2 text-[#051225]">
        Must See Attractions
      </Title>
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
                  'Downloaded Excel Successfully',
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
          <Button
            variant="secondary"
            className="h-10"
            onClick={() => {
              router.push(
                '/discover-malaysia/must-see-attractions/add-attraction',
              );
            }}
          >
            Add Attraction
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
