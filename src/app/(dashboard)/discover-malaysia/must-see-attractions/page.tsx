'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

import EventTableLayout from '@/app/(dashboard)/discover-malaysia/EventTable';
import Select from '@/components/ui/dataTable/Select';
import Input from '@/components/ui/Input';
import AlertService from '@/services/alertService';
import {
  fetchDestinations,
  fetchPriorities,
  updateDestinationPriority,
} from '@/services/apiService';

export default function MustSeeAttractions() {
  const router = useRouter();

  const availableTags = ['Food', 'Nature', 'Travel'];
  const tagColors = ['#E7ECFC', '#E3EFF8', '#E3F7F8'];

  const columns = [
    'Select',
    'ID ',
    'Name ',
    'Category ',
    'City ',
    'Tags',
    'Priority',
    'Edit',
    'Delete',
  ];

  const [data, setData] = useState<any[]>([]);
  const [priorities, setPriorities] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(12);
  const [activeRowIndex, setActiveRowIndex] = useState<number | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const fetchedData = await fetchDestinations(1);
        const destinationPriorities = await fetchPriorities();
        setPriorities(destinationPriorities);
        setData(fetchedData);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    void loadData();
  }, []);

  const handlePriorityChange = async (
    rowIndex: number,
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const selectedPriority = priorities.find(
      (item) => item.value === e.target.value,
    );

    if (selectedPriority) {
      const updatedData = [...data];
      updatedData[rowIndex].Priority = selectedPriority.value;

      const destinationId = updatedData[rowIndex].destinationId;
      const priorityId = selectedPriority.priorityId;

      try {
        await updateDestinationPriority(priorityId, destinationId);
        setData(updatedData);

        await AlertService.alert(
          'Successful!',
          'Priority Updated Successfully',
          'success',
          'Done',
        );
      } catch (error) {
        console.error('Error updating priority:', error);
      }
    }
  };

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
    newTagName: string,
  ) => {
    const newData = [...data];
    const newRow = { ...newData[rowIndex] };

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
              options={priorities.map((p) => ({
                value: p.value,
                label: p.label,
                key: p.priorityId,
              }))}
              highlightValue="high"
              onChange={(e) => handlePriorityChange(rowIndex, e)}
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
    <EventTableLayout
      tableTitle="See Must Attractions"
      buttonTitle="Add Attraction"
      data={data}
      columns={columns}
      currentPage={currentPage}
      perPage={perPage}
      renderCell={renderCell}
      onPageChange={setCurrentPage}
      onPerPageChange={setPerPage}
      addEventRoute="/discover-malaysia/must-see-attractions/add-attraction"
    />
  );
}
