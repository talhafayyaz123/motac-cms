'use client';
//import { subscribe } from 'diagnostics_channel';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import locationIcon from '@/assets/location-icon.svg';
import usersIcon from '@/assets/users-icon.svg';
import ComingSoonFeature from '@/components/ui/ComingSoonFeature';
import AttractionList from '@/components/ui/dashboard/AttractionList';
import Select from '@/components/ui/dataTable/Select';
import { formatDateToYYYYMMDD, subtractDays } from '@/helpers/utils/utils';
import { FetchDashboardUsersAndDestinationData } from '@/services/apiService';

import AreasplineChart from './charts/AreaChart';

interface NewAttractions {
  list: string[];
  count: number;
}

interface UserStats {
  totalUserCount: number;
  newSignedUpUserCount: number;
  previousActiveUserCount: number;
  activeUserGraphData: Record<string, number>;
  activeUserCount: number;
  inactiveUserCount: number;
  percentageChange: number;
  newExperienceCount: number;
  newAttractions: NewAttractions;
}

interface calculateRange {
  calculateRange: (selectedValue: string) => {
    calculatedStartDate: string;
    calculatedEndDate: string;
  };
}

const StatsSection: React.FC<calculateRange> = ({ calculateRange }) => {
  const [statsData, setStatsData] = useState<UserStats | null>(null);

  const currentDate = new Date();
  const previousDay = subtractDays(currentDate, 1);
  const endDate = formatDateToYYYYMMDD(previousDay);
  const adjustedDate = subtractDays(currentDate, 30);
  const startDate = formatDateToYYYYMMDD(adjustedDate);

  const handleSelectChange = async (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    let newStartDate: string = startDate;
    let newEndDate: string = endDate;
    const selectedValue = event.target.value;
    const {
      calculatedStartDate: finalStartDate,
      calculatedEndDate: finalEndDate,
    } = calculateRange(selectedValue);

    newStartDate = finalStartDate;
    newEndDate = finalEndDate;

    try {
      const fetchedData = await FetchDashboardUsersAndDestinationData(
        newStartDate,
        newEndDate,
      );
      setStatsData(fetchedData);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const fetchedData = await FetchDashboardUsersAndDestinationData(
          startDate,
          endDate,
        );
        setStatsData(fetchedData);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    void loadData();
  }, [startDate, endDate]);

  const categories = statsData?.activeUserGraphData
    ? Object.keys(statsData.activeUserGraphData)
    : [];
  const graphData = statsData?.activeUserGraphData
    ? Object.values(statsData.activeUserGraphData)
    : [];

  return (
    <div className="bg-blue-150 p-6 rounded-xl border border-gray-100 mb-6">
      <div className="flex justify-end mb-3">
        <Select
          options={[
            { value: '30', label: 'Last 30 days' },
            { value: 'thisWeek', label: 'This Week' },
            { value: '7', label: 'Last 7 days' },
            { value: 'thisMonth', label: 'This Month' },
            { value: '90', label: 'Last 3 Months' },
            { value: '180', label: 'Last 6 Months' },
            { value: 'thisYear', label: 'This Year' },
          ]}
          highlightValue={'30'}
          minimalStyle
          iconColor={true}
          onChange={(event) => handleSelectChange(event)}
        />
      </div>
      <div className="lg:max-h-96 lg:h-full h-auto w-full flex lg:flex-row flex-col justify-between gap-6">
        <div className="flex flex-col gap-6 h-[initial] w-full lg:w-3/12">
          <div className="h-[50%] relative rounded-xl overflow-hidden bg-white border border-gray-100 p-4">
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 h-2/3 w-1 bg-purple-100 rounded-tr-xl rounded-br-xl"></div>
            <div className="flex">
              <div className="flex-auto">
                <p className="text-xs text-gray-50 font-medium">
                  New User Sign Ups
                </p>
                <p className="text-3xl font-semibold text-blue-200">
                  {statsData?.newSignedUpUserCount}
                </p>
              </div>
              <Image
                src={usersIcon}
                alt="user-icon"
                className="w-10 h-10 object-cover aspect-[16/9]"
              />
            </div>
          </div>
          <div className="content-center h-[50%] relative rounded-xl overflow-hidden bg-white border border-gray-100 p-4">
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 h-2/3 w-1 bg-purple-100 rounded-tr-xl rounded-br-xl"></div>
            <div className="flex">
              <div className="flex-auto">
                <p className="text-3xl font-semibold text-blue-200">
                  {statsData?.newExperienceCount ?? 'N/A'}
                </p>
                <p className="text-xs text-gray-50 font-medium">
                  New Locations Added
                </p>
              </div>
              <Image
                src={locationIcon}
                alt="location-icon"
                className="w-14 h-14 object-cover aspect-[16/9] absolute top-3 right-3"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6 h-auto w-full lg:w-3/12">
          <div className="h-full relative rounded-xl overflow-hidden bg-white border border-gray-100  flex flex-col">
            <div className="absolute left-1/2 top-0 transform -translate-x-1/2 w-2/3 h-1 bg-purple-100 rounded-bl-xl rounded-br-xl"></div>
            <div className=" items-start p-4">
              <div className="flex items-start w-full">
                <div className="flex-auto justify-between text-left">
                  <p className="text-xs text-gray-50 font-medium">
                    Active Users
                  </p>
                  <p className="text-3xl font-semibold text-blue-200">
                    {statsData?.activeUserCount}
                  </p>
                  <p className="text-xs font-semibold text-blue-200 mt-7">
                    {typeof statsData?.percentageChange === 'number'
                      ? statsData.percentageChange > 0
                        ? `${Math.round(statsData.percentageChange)}% Increase`
                        : `${Math.round(statsData.percentageChange)}% Decrease`
                      : 'No data available'}
                  </p>
                </div>
                <div className="flex flex-col space-y-10">
                  <div className="flex-auto text-left">
                    <p className="text-xs text-gray-50 font-medium">
                      Total Users
                    </p>
                    <p className="text-xl font-semibold text-blue-200">
                      {statsData?.totalUserCount}
                    </p>
                  </div>
                  <div className="flex-auto text-left">
                    <p className="text-xs text-gray-50 font-medium">
                      Inactive Users
                    </p>
                    <p className="text-xl font-semibold text-blue-200">
                      {statsData?.inactiveUserCount}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <AreasplineChart
              categories={categories}
              data={graphData}
              title=""
              color="#364EA2"
              fillColorStart="#778FDF"
              fillColorEnd="transparent"
              width={260}
              height={150}
            />
          </div>
        </div>
        <div className="flex flex-col gap-6 h-[initial] w-full lg:w-3/12">
          {/* <div className="h-[50%] relative rounded-xl max-h-[50%] overflow-hidden bg-white border border-gray-100 p-4">
    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 h-2/3 w-1 bg-purple-100 rounded-tr-xl rounded-br-xl"></div>
    <div className="flex items-center">
      <div className="flex-auto">
        <p className="text-xs text-gray-50 font-medium">Reviews Added</p>
        <p className="text-3xl mt-5 font-semibold text-blue-200">350</p>
      </div>
      <Image src={reviewsIcon} alt="" className="w-12 h-12" />
    </div>
  </div> */}

          {/* <div className="content-center h-[50%] relative rounded-xl max-h-[50%] overflow-hidden bg-white border border-gray-100 p-4 opacity-[0.6] pointer-events-none">
    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 h-2/3 w-1 bg-purple-100 rounded-tr-xl rounded-br-xl"></div>
    <div className="flex items-center">
      <div className="flex-auto">
        <p className="text-3xl font-semibold text-blue-200">2600</p>
        <p className="text-xs text-gray-50">
          Applicants For Arrival Card
        </p>
      </div>
      <Image src={reviewsIcon} alt="" className="w-12 h-12" />
    </div>
  </div> */}
          <ComingSoonFeature topBorder={true} />
          <ComingSoonFeature leftBorder={true} />
        </div>
        <div className="flex flex-col gap-6 h-full w-full lg:w-3/12">
          <div className="relative rounded-xl overflow-hidden bg-white border border-gray-100 p-4 h-full">
            <div className="absolute left-1/2 top-0 transform -translate-x-1/2 w-2/3 h-1 bg-purple-100 rounded-bl-xl rounded-br-xl"></div>
            <div className="flex flex-col items-center h-full">
              <p className="text-xs text-gray-50 font-medium">
                Attractions Added
              </p>
              <p className="text-3xl font-semibold text-blue-200 m-3">
                {statsData?.newAttractions?.count ?? 'N/A'}
              </p>
              <div className="w-full flex justify-between flex-col h-full space-y-2">
                {statsData?.newAttractions ? (
                  <AttractionList statsData={statsData.newAttractions} />
                ) : (
                  <ComingSoonFeature />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default StatsSection;
