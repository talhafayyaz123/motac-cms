'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect, useRef } from 'react';

import EventTableLayout from '@/app/(dashboard)/discover-malaysia/EventTable';
import Select from '@/components/ui/dataTable/Select';
import Input from '@/components/ui/Input';
import { topExperienceDestinationId } from '@/constants';
import AlertService from '@/services/alertService';
import {
  deleteDestination,
  fetchDestinations,
  fetchPriorities,
  fetchRecommendationTags,
  updateDestinationPriority,
  updateDestinationTags,
} from '@/services/apiService';

export default function TopExperience() {
  const router = useRouter();
  const [availableTags, setAvailableTags] = useState<
    { id: number; name: string }[] | null
  >(null);

  const tagColors = ['#E7ECFC', '#E3EFF8', '#E3F7F8'];

  const columns = [
    'ID ',
    'Name ',
    'Category ',
    'State ',
    'Tags',
    'Priority',
    'Edit',
    'Delete',
  ];

  const [data, setData] = useState<any[]>([]);
  const [priorities, setPriorities] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [activeRowIndex, setActiveRowIndex] = useState<number | null>(null);
  const [searchValue, setSearchValue] = useState<string>('');
  const [totalCount, setTotalCount] = useState(0);
  const [loadingData, setLoadingData] = useState<boolean>(false);
  const [isNoData, setIsNoData] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetchRecommendationTags();
        const tags = response.map((item: any) => ({
          id: item?.id,
          name: item?.name,
        }));
        setAvailableTags(tags);
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    };

    void fetchTags();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoadingData(true);
        const { data: fetchedData, total } = await fetchDestinations(
          topExperienceDestinationId,
          currentPage,
          perPage,
          searchValue,
        );
        const destinationPriorities = await fetchPriorities();
        setPriorities(destinationPriorities);
        setData(fetchedData);
        if (Array.isArray(fetchedData) && fetchedData.length === 0) {
          setIsNoData(true);
        } else {
          setIsNoData(false);
        }
        setTotalCount(total);
        setLoadingData(false);
        // Set the total records from the API respons
      } catch (error) {
        console.error('Error loading data:', error);
        setLoadingData(false);
        setIsNoData(false);
      }
    };

    void loadData();
    // eslint-disable-next-line
  }, [topExperienceDestinationId, currentPage, perPage, searchValue]);

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

      const displayId = updatedData[rowIndex]['ID'];
      const priorityId = selectedPriority.priorityId;

      try {
        await updateDestinationPriority(priorityId, displayId);
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

  const handleTagRemove = async (
    event: React.MouseEvent<HTMLButtonElement>,
    rowIndex: number,
    tagIndex: number,
    rowId: string,
  ) => {
    event.stopPropagation();
    const newData = [...data];
    const newRow = { ...newData[rowIndex] };
    newRow.Tags = [...newRow.Tags];
    newRow.Tags.splice(tagIndex, 1);
    newData[rowIndex] = newRow;
    setData(newData);
    const newTagAfterRemove = newRow?.Tags?.map(
      (item: { id: number }) => item.id,
    );
    await updateDestinationTags(rowId, newTagAfterRemove);
  };

  const handleTagAdd = async (
    e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>,
    rowIndex: number,
    tag: { id: number; name: string },
    rowId: string,
  ) => {
    const newData = [...data];
    const newRow = { ...newData[rowIndex] };
    const tagWithColor = {
      id: tag?.id,
      name: tag?.name,
      color: tagColors[Math.floor(Math.random() * tagColors.length)],
    };
    newRow.Tags = [...newRow.Tags, tagWithColor];
    newData[rowIndex] = newRow;
    setData(newData);
    const newTagAfterAddition = newRow?.Tags?.map(
      (item: { id: number }) => item.id,
    );
    await updateDestinationTags(rowId, newTagAfterAddition);
  };

  const renderTagOptions = (rowIndex: number, rowId: string) => {
    const rowTags = data[rowIndex]?.Tags || [];
    const missingTags = availableTags?.filter((tag) =>
      rowTags.every(
        (rowTag: any) => rowTag.id !== tag.id && rowTag.name !== tag.name,
      ),
    );

    return (
      missingTags &&
      missingTags?.length > 0 && (
        <div
          ref={dropdownRef}
          className={`absolute overflow-y-auto h-20 left-0 z-10 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg p-2 custom-scroll ${
            isDropdownOpen ? 'block' : 'hidden'
          }`}
        >
          {missingTags.map((tag) => (
            <div
              key={tag?.id}
              onClick={(e) => handleTagAdd(e, rowIndex, tag, rowId)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                }
              }}
            >
              <span className="px-3 py-1 rounded-full text-xs font-medium">
                {tag?.name}
              </span>
            </div>
          ))}
        </div>
      )
    );
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false); // Close the dropdown if clicked outside
      }
    };

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
                `/discover-malaysia/top-experience/edit-experience?id=${item['ID ']}`,
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
                const result = await AlertService.confirm(
                  'Are you sure you want to delete the Selected Field?',
                  'Confirm',
                  'Cancel',
                );

                if (result.isConfirmed) {
                  try {
                    // Call the deleteDestination API
                    await deleteDestination(item['ID ']);

                    // If successful, you can reload the page or refetch data
                    console.log('Destination deleted successfully:');
                    await AlertService.alert(
                      'Successful!',
                      'Destination deleted Successfully',
                      'success',
                      'Done',
                    );
                    window?.location?.reload();
                  } catch (error) {
                    // eslint-disable-next-line
                    AlertService.alert(
                      'Error',
                      'There was a problem deleting the destination.',
                      'error',
                      'OK',
                    );
                  }
                } else {
                  console.log('Deletion canceled');
                }
              } catch (error) {
                console.error(
                  'Something went wrong during the confirmation process:',
                  error,
                );
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
              highlightValue={item[column]}
              onChange={(e) => handlePriorityChange(rowIndex, e)}
            />
          </div>
        );
      case 'Tags':
        return (
          <div
            className={`${item[column]?.length === 0 && 'p-2'} flex gap-1 relative w-36 overflow-hidden overflow-x-scroll`}
            onClick={() => {
              setActiveRowIndex(rowIndex === activeRowIndex ? null : rowIndex);
              setIsDropdownOpen(rowIndex !== activeRowIndex); // toggle dropdown open state
            }}
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
                    onClick={(event) =>
                      handleTagRemove(event, rowIndex, index, item['ID '])
                    }
                    className="ml-2 text-gray-500 hover:text-gray-700"
                  >
                    &times;
                  </button>
                </span>
              );
            })}
            {activeRowIndex === rowIndex &&
              renderTagOptions(rowIndex, item['ID '])}
          </div>
        );
      default:
        return <span>{item[column]}</span>;
    }
  };

  return (
    <EventTableLayout
      tableTitle="Top Experiences"
      buttonTitle="Add Experience"
      data={data}
      columns={columns}
      currentPage={currentPage}
      perPage={perPage}
      renderCell={renderCell}
      onPageChange={(page) => setCurrentPage(page)} // Update page on change
      onPerPageChange={(newPerPage) => {
        setPerPage(newPerPage);
        setCurrentPage(1); // Reset to first page on perPage change
      }}
      addEventRoute="/discover-malaysia/top-experience/add-experience"
      onSearchChange={(value) => {
        setSearchValue(value);
        setCurrentPage(1); // Reset to first page on search
      }}
      totalCount={totalCount}
      loading={loadingData}
      isNoData={isNoData}
    />
  );
}
