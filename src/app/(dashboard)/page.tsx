/* eslint-disable react-hooks/exhaustive-deps */
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
import Loader from '@/components/ui/Loader';
import { dummyMapDataOne, dummyMapVisibleCountriesOne } from '@/constants';
import {
  formatDateToYYYYMMDD,
  getDaysPassedThisMonth,
  getDaysPassedThisWeek,
  getDaysPassedThisYear,
  subtractDays,
} from '@/helpers/utils/utils';
import {
  FetchDashboardUsersData,
  FetchHappeningEventsData,
  FetchSeeAttractionData,
} from '@/services/apiService';

interface UserStats {
  totalUserCount: number;
  newSignedUpUserCount: number;
  graphData: Record<string, number>;
  previousActiveUserCount: number;
  activeUserCount: number;
  inactiveUserCount: number;
  percentageChange: number;
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

  const [currentMonth, setCurrentMonth] = useState<string>(
    new Date().toLocaleString('default', { month: 'long' }),
  );

  const [loadingUserManagement, setLoadingUserManagement] = useState(false);
  const [loadingAttractions, setLoadingAttractions] = useState(false);
  const [loadingEvents, setLoadingEvents] = useState(false);

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const endDate = formatDateToYYYYMMDD(currentDate);
  const adjustedDate = subtractDays(currentDate, 30);
  const startDate = formatDateToYYYYMMDD(adjustedDate);

  const getMonthStartAndEnd = (
    year: number,
    month: number,
  ): { monthStartDate: Date; monthEndDate: Date } => {
    const monthStartDate = new Date(year, month, 1);
    const monthEndDate = new Date(year, month + 1, 0);
    return { monthStartDate, monthEndDate };
  };

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const handleSelectChange = async (
    event: React.ChangeEvent<HTMLSelectElement>,
    flag: string,
    eventFlag?: string,
  ) => {
    let startDate: string | undefined;
    let endDate: string = formatDateToYYYYMMDD(currentDate);
    if (eventFlag === 'events') {
      const selectedValue = event.target.value;
      const selectedMonth = parseInt(selectedValue);

      const { monthStartDate, monthEndDate } = getMonthStartAndEnd(
        currentYear,
        selectedMonth,
      );

      startDate = formatDateToYYYYMMDD(monthStartDate);
      endDate = formatDateToYYYYMMDD(monthEndDate);
      setCurrentMonth(monthNames[selectedMonth]);
    } else {
      const selectedValue = event.target.value;
      const previousDay = subtractDays(currentDate, 1);
      endDate = formatDateToYYYYMMDD(previousDay);

      if (['7', '30'].includes(selectedValue)) {
        const adjustedDate = subtractDays(currentDate, parseInt(selectedValue));
        startDate = formatDateToYYYYMMDD(adjustedDate);
      } else if (['90', '180'].includes(selectedValue)) {
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth();

        let monthsToSubtract: any;
        if (selectedValue === '90') {
          monthsToSubtract = 3;
        } else if (selectedValue === '180') {
          monthsToSubtract = 6;
        }

        const startMonth = currentMonth - monthsToSubtract;
        let startYear = currentYear;
        let endYear = currentYear;

        if (startMonth < 0) {
          startYear -= Math.ceil(Math.abs(startMonth) / 12);
        }

        startDate = formatDateToYYYYMMDD(
          new Date(startYear, (startMonth + 12) % 12, 1),
        );

        let endMonth = currentMonth - 1;
        if (endMonth < 0) {
          endYear -= 1;
          endMonth = 11;
        }

        endDate = formatDateToYYYYMMDD(new Date(endYear, endMonth + 1, 0));
      } else {
        if (parseInt(selectedValue) > 31) {
          const adjustedDate = subtractDays(
            currentDate,
            parseInt(selectedValue),
          );
          startDate = formatDateToYYYYMMDD(adjustedDate);
        } else {
          // in case of this month and this week
          const adjustedDate = subtractDays(
            currentDate,
            parseInt(selectedValue) - 1,
          );
          startDate = formatDateToYYYYMMDD(adjustedDate);
          endDate = formatDateToYYYYMMDD(currentDate);
        }
      }
      /*  const adjustedDate = subtractDays(currentDate, parseInt(selectedValue));
      startDate = formatDateToYYYYMMDD(adjustedDate);
      endDate = formatDateToYYYYMMDD(currentDate);
      alert(selectedValue); */
    }

    try {
      if (flag === 'userManagement' && startDate) {
        const fetchedData = await FetchDashboardUsersData(startDate, endDate);
        setStatsData(fetchedData);
      } else if (flag === 'happeningEvents' && startDate) {
        const fetchedData = await FetchHappeningEventsData(startDate, endDate);
        setHappeningEventsData(fetchedData);
      } else {
        const fetchedData = await FetchSeeAttractionData(
          startDate || '',
          endDate,
        );
        setSeeAttractionData(fetchedData);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const calculateStartAndEndDates = () => {
    const currentMonthNumber = currentDate.getMonth();
    const { monthStartDate, monthEndDate } = getMonthStartAndEnd(
      currentYear,
      currentMonthNumber,
    );

    const newStartDate = formatDateToYYYYMMDD(monthStartDate);
    const newEndDate = formatDateToYYYYMMDD(monthEndDate);

    return { newStartDate, newEndDate };
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
        const { newStartDate, newEndDate } = calculateStartAndEndDates();

        const fetchedData = await FetchHappeningEventsData(
          newStartDate,
          newEndDate,
        );

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
      label: 'Inactive Users',
      value: statsData?.inactiveUserCount ?? 0,
    },
  ];

  const categoriesForBar =
    seeAttractionData?.newExperienceByCategory?.map(
      (item: any) => item.destination_category_name,
    ) || [];

  const seriesData = [
    {
      type: 'column' as const,
      name: 'Fruits',
      data: seeAttractionData?.newExperienceByCategory?.map((item: any) =>
        parseInt(item.count, 10),
      ),
    },
  ];

  const experienceOfferedSum = seriesData[0]?.data?.reduce(
    (accumulator: number, currentValue: number) => accumulator + currentValue,
    0,
  );

  const categories = statsData?.graphData
    ? Object.keys(statsData.graphData)
    : [];
  const graphData = statsData?.graphData
    ? Object.values(statsData.graphData)
    : [];

  const daysPassedYear = getDaysPassedThisYear();

  const daysPassedMonth = getDaysPassedThisMonth();

  const daysPassedWeek = getDaysPassedThisWeek();

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
        showUserManagemantStats
        stats={statsData?.newSignedUpUserCount}
      >
        <div className="flex">
          <UserStats stats={statsArray} />
          <AreasplineChart
            categories={categories}
            data={graphData}
            title="New Users this Month"
            color="#364EA2"
            fillColorStart="#778FDF"
            fillColorEnd="transparent"
          />

          <div className="absolute top-4 right-0 flex justify-end pr-4">
            <Select
              options={[
                { value: '30', label: 'Last 30 days' },
                { value: `${daysPassedWeek}`, label: 'This Week' },
                { value: '7', label: 'Last 7 days' },
                { value: `${daysPassedMonth}`, label: 'This Month' },
                { value: '90', label: 'Last 3 Months' },
                { value: '180', label: 'Last 6 Months' },
                { value: `${daysPassedYear}`, label: 'This Year' },
              ]}
              highlightValue={'30'}
              minimalStyle
              iconColor={true}
              onChange={(event) => handleSelectChange(event, 'userManagement')}
            />
          </div>
        </div>
      </CardContainer>

      <CardContainer title="Discover Malaysia" showStats>
        <div className="flex lg:flex-row flex-col justify-between gap-4 w-full font-medium">
          <div className="flex rounded-xl bg-blue-50 border border-gray-100 gap-4 font-medium p-4 lg:w-[68%] w-full">
            <div className=" flex flex-col w-1/2 gap-4">
              <p className="text-xs font-bold text-black-100 mb-4">
                Must See Attraction
              </p>
              <div>
                <p className="text-xs text-gray-50">Total Attraction</p>
                <p className="text-4xl font-semibold text-blue-100 mb-3">
                  {seeAttractionData?.newAttractionsCount}
                </p>
                <MapChart
                  data={dummyMapDataOne}
                  visibleCountries={dummyMapVisibleCountriesOne}
                />
              </div>
            </div>
            <div className="flex flex-col w-1/2 relative">
              <div className="flex lg:flex-row flex-col-reverse justify-between gap-2">
                <p className="text-xs text-black-100 font-bold">
                  Top Experiences
                </p>
                <div className="h-[max-content] mr-3">
                  <Select
                    options={[
                      { value: '30', label: 'Last 30 days' },
                      { value: `${daysPassedWeek}`, label: 'This Week' },
                      { value: '7', label: 'Last 7 days' },
                      { value: `${daysPassedMonth}`, label: 'This Month' },
                      { value: '90', label: 'Last 3 Months' },
                      { value: '180', label: 'Last 6 Months' },
                      { value: `${daysPassedYear}`, label: 'This Year' },
                    ]}
                    highlightValue={'30'}
                    minimalStyle
                    iconColor={true}
                    onChange={(event) =>
                      handleSelectChange(event, 'topExperience')
                    }
                  />
                </div>
              </div>
              <div className="p-2">
                <p className="text-xs  text-gray-50 font-bold">
                  Experiences Offered
                </p>
                <p className="text-4xl font-semibold text-blue-100 mb-3">
                  {experienceOfferedSum}
                </p>
                <div className="flex py-2 items-center w-full">
                  <div className="transform translate-y-1/2 absolute left-0 h-1/2 lg:border-l lg:border-gray-300 top-10" />
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
            currentMonth={monthNames.indexOf(currentMonth)}
          >
            <CustomDatePicker
              currentMonth={currentMonth}
              setMonth={setCurrentMonth}
              data={happeningEventsData?.eventDates || []}
            />
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
