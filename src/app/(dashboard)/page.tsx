'use client';
// import { useState } from 'react';

import { useEffect, useState } from 'react';

import CardContainer from '@/components/ui/card/CardContainer';
import CardStats from '@/components/ui/card/CardStats';
import ComingSoonFeature from '@/components/ui/ComingSoonFeature';
import CustomDatePicker from '@/components/ui/CustomDatePicker';
import AreasplineChart from '@/components/ui/dashboard/charts/AreaChart';
import BarChart from '@/components/ui/dashboard/charts/BarChart';
import MapChart from '@/components/ui/dashboard/charts/MapChart';
import StatsSection from '@/components/ui/dashboard/StatsSections';
import UserStats from '@/components/ui/dashboard/UserStates';
import Select from '@/components/ui/dataTable/Select';
// import DataTable from '@/components/ui/dataTable/DataTable';
import Loader from '@/components/ui/Loader';
import {
  chartCategories,
  chartData,
  dummyMapDataOne,
  // dummyMapDataTwo,
  dummyMapVisibleCountriesOne,
  // dummyMapVisibleCountriesTwo,
} from '@/constants';
import { formatDateToYYYYMMDD, subtractDays } from '@/helpers/utils/utils';
import {
  FetchDashboardUsersData,
  FetchHappeningEventsData,
  FetchSeeAttractionData,
} from '@/services/apiService';

// import generateDummyDataForARTrails from './DummyData';

interface UserStats {
  totalUserCount: number;
  newSignedUpUserCount: number;
  previousActiveUserCount: number;
  activeUserCount: number;
  inactiveUserCount: number;
  percentageChange: number;
  newExperienceCount: number;
}

interface ExperienceCategory {
  destination_category_name: string;
  count: string;
}

interface ExperienceData {
  newAttractionsCount: number;
  newExperienceByCategory: ExperienceCategory[];
}

interface EventData {
  eventDates: string[];
  upcomingEventCount: number;
}
export default function Dashboard() {
  const [statsData, setStatsData] = useState<UserStats | null>(null);
  const [seeAttractionData, setSeeAttractionData] =
    useState<ExperienceData | null>(null);
  const [happeningEventsData, setHappeningEventsData] =
    useState<EventData | null>(null);

  const [loadingUserManagement, setLoadingUserManagement] = useState(false);
  const [loadingAttractions, setLoadingAttractions] = useState(false);
  const [loadingEvents, setLoadingEvents] = useState(false);

  const currentDate = new Date();
  const endDate = formatDateToYYYYMMDD(currentDate);
  const adjustedDate = subtractDays(currentDate, 30);
  const startDate = formatDateToYYYYMMDD(adjustedDate);

  const handleSelectChange = async (
    event: React.ChangeEvent<HTMLSelectElement>,
    flag: string,
  ) => {
    const selectedValue = event.target.value;
    const adjustedDate = subtractDays(currentDate, parseInt(selectedValue));
    const startDate = formatDateToYYYYMMDD(adjustedDate);

    try {
      if (flag === 'userManagement') {
        setLoadingUserManagement(true);
        const fetchedData = await FetchDashboardUsersData(startDate, endDate);
        setStatsData(fetchedData);
        setLoadingUserManagement(false);
      } else if (flag === 'happeningEvents') {
        setLoadingEvents(true);
        const fetchedData = await FetchHappeningEventsData(startDate, endDate);
        setHappeningEventsData(fetchedData);
        setLoadingEvents(false);
      } else {
        setLoadingAttractions(true);
        const fetchedData = await FetchSeeAttractionData(startDate, endDate);
        setSeeAttractionData(fetchedData);
        setLoadingAttractions(false);
      }
    } catch (error) {
      console.error('Error loading data:', error);
      setLoadingUserManagement(false);
      setLoadingAttractions(false);
      setLoadingEvents(false);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoadingUserManagement(true);
      try {
        const fetchedData = await FetchDashboardUsersData(startDate, endDate);
        setStatsData(fetchedData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoadingUserManagement(false);
      }
    };

    const loadTopExperienceData = async () => {
      setLoadingAttractions(true);
      try {
        const fetchedData = await FetchSeeAttractionData(startDate, endDate);
        setSeeAttractionData(fetchedData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoadingAttractions(false);
      }
    };

    const loadHappeningEventsData = async () => {
      setLoadingEvents(true);
      try {
        const fetchedData = await FetchHappeningEventsData(startDate, endDate);
        setHappeningEventsData(fetchedData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoadingEvents(false);
      }
    };

    void loadTopExperienceData();
    void loadData();
    void loadHappeningEventsData();
  }, [startDate, endDate]);

  const statsArray = [
    {
      label: 'Total Users',
      value: statsData?.totalUserCount ?? 0,
    },
    {
      label: 'Active Users',
      value: statsData?.activeUserCount ?? 0,
    },
    {
      label: 'Deleted Users',
      value: statsData?.inactiveUserCount ?? 0,
    },
  ];

  const categoriesForBar =
    seeAttractionData?.newExperienceByCategory
      ?.slice(0, 3)
      .map((item: any) => item.destination_category_name) || [];
  const seriesData = [
    {
      type: 'column' as const,
      name: 'Fruits',
      data: seeAttractionData?.newExperienceByCategory
        ?.slice(0, 3)
        .map((item: any) => parseInt(item.count, 10)),
    },
  ];

  if (loadingUserManagement || loadingAttractions || loadingEvents) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <main className="h-full px-4">
      <StatsSection />
      <CardContainer
        title="User Management"
        showStats
        stats={statsData?.newSignedUpUserCount}
      >
        <div className="flex">
          <UserStats stats={statsArray} />
          <AreasplineChart
            categories={chartCategories}
            data={chartData}
            title="New Users this Month"
            color="#364EA2"
            fillColorStart="#778FDF"
            fillColorEnd="transparent"
          />

          <div className="absolute top-4 right-0 flex justify-end pr-4">
            <Select
              options={[
                { value: '30', label: 'Last 30 days' },
                { value: '7', label: 'This week' },
                { value: '14', label: '14 days' },
              ]}
              highlightValue={'30'}
              minimalStyle
              onChange={(event) => handleSelectChange(event, 'userManagement')}
            />
          </div>
        </div>
      </CardContainer>

      <CardContainer title="Discover Malaysia">
        <div className="flex lg:flex-row flex-col justify-between gap-4 w-full font-medium">
          <div className="flex rounded-xl bg-blue-50 border border-gray-100 gap-4 font-medium p-4 lg:w-[68%] w-full">
            <div className="p-2 flex flex-col w-1/2">
              <p className="text-xs text-black-100 mb-4">Must See Attraction</p>
              <p className="text-xs text-black-100">Total Attraction</p>
              <p className="text-4xl font-semibold text-blue-100 mb-3">
                {seeAttractionData?.newAttractionsCount}
              </p>
              <MapChart
                data={dummyMapDataOne}
                visibleCountries={dummyMapVisibleCountriesOne}
              />
            </div>
            <div className="flex flex-col w-1/2 relative">
              <div className="flex lg:flex-row flex-col-reverse justify-between gap-2">
                <p className="text-xs text-black-100">Top Experiences</p>
                <div className="h-[max-content] mr-3">
                  <Select
                    options={[
                      { value: '30', label: 'Last 30 days' },
                      { value: '7', label: 'This week' },
                      { value: '14', label: '14 days' },
                    ]}
                    highlightValue={'30'}
                    minimalStyle
                    onChange={(event) =>
                      handleSelectChange(event, 'topExperience')
                    }
                  />
                </div>
              </div>
              <div className="p-2">
                <p className="text-xs text-black-100">Experiences Offered</p>
                <p className="text-4xl font-semibold text-blue-100 mb-3">26</p>
                <div className="flex py-2 items-center w-full">
                  <div className="transform translate-y-1/2 absolute left-0 h-1/3 lg:border-l lg:border-gray-300" />
                  <BarChart
                    categories={categoriesForBar}
                    seriesData={seriesData}
                  />
                </div>
              </div>
            </div>
          </div>
          <CardStats
            title="Happening Events"
            statsLabel="Upcoming Events"
            isEventFilter={true}
            statsData={happeningEventsData?.upcomingEventCount ?? 0}
            handleSelectChange={handleSelectChange}
          >
            <CustomDatePicker data={happeningEventsData?.eventDates || []} />
          </CardStats>
        </div>
      </CardContainer>

      <CardContainer title="AR Trails">
        <div className="text-lg font-bold">AR Trails</div>
        <ComingSoonFeature maxWidth="100%" height="400px" />
        {/* <div className="grid lg:grid-cols-2 grid-rows-2 lg:grid-rows-1 gap-4 mb-4 filter blur-lg">
          <div className="relative rounded-xl bg-[#FBFCFF] border border-gray-100 overflow-hidden">
            <DataTable
              minHeight="auto"
              verticalSpace="py-2"
              bgColor="bg-[#FBFCFF]"
              columns={columns}
              data={data.slice(
                (currentPage - 1) * perPage,
                currentPage * perPage,
              )}
              renderCell={renderCell}
            />
          </div>
          <div className="relative rounded-xl bg-[#FBFCFF] border border-gray-100  overflow-hidden">
            <div className="absolute bottom-3 left-3 flex flex-col z-10">
              <p className="text-xs text-[#666E79]">Total AR Trail</p>
              <p className="text-4xl font-semibold text-blue-100">14</p>
            </div>
            <MapChart
              data={dummyMapDataTwo}
              visibleCountries={dummyMapVisibleCountriesTwo}
            />
          </div>
        </div> */}
      </CardContainer>

      <div className="flex justify-between gap-5 w-full">
        <CardContainer customClasses="max-w-[50%] w-full" title="Arrival Card">
          <div className="text-lg font-bold">Arrival Card</div>
          <ComingSoonFeature maxWidth="100%" height="400px" />{' '}
        </CardContainer>
        <CardContainer customClasses="max-w-[50%] w-full" title="MDAC">
          <div className="text-lg font-bold">MDAC</div>
          <ComingSoonFeature maxWidth="100%" height="400px" />{' '}
        </CardContainer>
      </div>

      <CardContainer title="My Wallet" customClasses="w-full">
        <div className="text-lg font-bold">My Wallet</div>
        <div className="flex justify-between gap-5 w-full">
          <ComingSoonFeature
            addedBorder={true}
            maxWidth="100%"
            height="400px"
          />{' '}
          <ComingSoonFeature
            addedBorder={true}
            maxWidth="100%"
            height="400px"
          />{' '}
        </div>
      </CardContainer>

      <CardContainer title="Rewards" customClasses="w-full">
        <div className="text-lg font-bold">Rewards</div>
        <div className="flex justify-between gap-5 w-full">
          <ComingSoonFeature
            addedBorder={true}
            maxWidth="100%"
            height="400px"
          />{' '}
          <ComingSoonFeature
            addedBorder={true}
            maxWidth="100%"
            height="400px"
          />{' '}
        </div>
      </CardContainer>

      <CardContainer title="Discounts" customClasses="w-full">
        <div className="text-lg font-bold">Discounts</div>
        <ComingSoonFeature maxWidth="100%" height="400px" />
      </CardContainer>

      <CardContainer title="Heritage Products" customClasses="w-full">
        <div className="text-lg font-bold">Heritage Products</div>

        <ComingSoonFeature maxWidth="100%" height="400px" />
      </CardContainer>

      <CardContainer title="Travel Kit" customClasses="w-full">
        <div className="text-lg font-bold">Travel Kit</div>

        <ComingSoonFeature maxWidth="100%" height="400px" />
      </CardContainer>
    </main>
  );
}
