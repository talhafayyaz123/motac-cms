/* eslint-disable react-hooks/exhaustive-deps */
'use client';
// import { useState } from 'react';

import { useEffect, useRef, useState } from 'react';

import { MalaysiaMap } from '@/assets';
import CardContainer from '@/components/ui/card/CardContainer';
import CardStats from '@/components/ui/card/CardStats';
import ComingSoonFeature from '@/components/ui/ComingSoonFeature';
import CustomDatePicker from '@/components/ui/CustomDatePicker';
import AreasplineChart from '@/components/ui/dashboard/charts/AreaChart';
import BarChart from '@/components/ui/dashboard/charts/BarChart';
// import MapChart from '@/components/ui/dashboard/charts/MapChart';
import StatsSection from '@/components/ui/dashboard/StatsSections';
import UserStats from '@/components/ui/dashboard/UserStates';
import Select from '@/components/ui/dataTable/Select';
import Loader from '@/components/ui/Loader';
// import { dummyMapDataOne, dummyMapVisibleCountriesOne } from '@/constants';
import { formatDateToYYYYMMDD, subtractDays } from '@/helpers/utils/utils';
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

  const previousDay = subtractDays(currentDate, 1);
  const endDate = formatDateToYYYYMMDD(previousDay);

  //  const endDate = formatDateToYYYYMMDD(currentDate);
  const startDate = formatDateToYYYYMMDD(currentDate);

  const calculateRange = (selectedValue: string) => {
    let calculatedStartDate: string;
    let calculatedEndDate: string = formatDateToYYYYMMDD(previousDay); // Default end date

    if (['thisWeek', 'thisMonth', 'thisYear'].includes(selectedValue)) {
      calculatedEndDate = formatDateToYYYYMMDD(currentDate);
    }

    switch (selectedValue) {
      case '30':
        calculatedStartDate = formatDateToYYYYMMDD(
          subtractDays(currentDate, 30),
        );
        break;
      case '7':
        calculatedStartDate = formatDateToYYYYMMDD(
          subtractDays(currentDate, 7),
        );
        break;
      case '90':
        calculatedStartDate = formatDateToYYYYMMDD(
          subtractDays(currentDate, 90),
        );
        break;
      case '180':
        calculatedStartDate = formatDateToYYYYMMDD(
          subtractDays(currentDate, 180),
        );
        break;
      case 'thisWeek':
        /* const startOfWeek = new Date(previousDay); // Copy the current date
        startOfWeek.setDate(currentDate.getDate() - currentDate.getDay()); // Set to the start of the week (Sunday)
        calculatedStartDate = formatDateToYYYYMMDD(startOfWeek); */

        const startOfWeek = new Date(currentDate);

        // Get the current day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
        const dayOfWeek = currentDate.getDay();
        startOfWeek.setDate(
          currentDate.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1),
        );
        calculatedStartDate = formatDateToYYYYMMDD(startOfWeek);
        break;
      case 'thisMonth':
        calculatedStartDate = formatDateToYYYYMMDD(
          new Date(currentDate.getFullYear(), currentDate.getMonth(), 1), // Start of the current month
        );
        break;
      case 'thisYear':
        calculatedStartDate = formatDateToYYYYMMDD(
          new Date(currentDate.getFullYear(), 0, 1), // Start of the current year (January 1st)
        );
        break;
      default:
        calculatedStartDate = formatDateToYYYYMMDD(currentDate); // Default to today if no match
        break;
    }

    return {
      calculatedStartDate,
      calculatedEndDate,
    };
  };

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
    const selectedValue = event.target.value; // Get the selected value
    let newStartDate: string = formatDateToYYYYMMDD(currentDate); // Default to current date
    let newEndDate: string = formatDateToYYYYMMDD(previousDay); // Default end date

    if (['thisWeek', 'thisMonth', 'thisYear'].includes(selectedValue)) {
      newEndDate = formatDateToYYYYMMDD(currentDate);
    }

    switch (selectedValue) {
      case '7':
        newStartDate = formatDateToYYYYMMDD(subtractDays(currentDate, 7));
        break;
      case '30':
        newStartDate = formatDateToYYYYMMDD(subtractDays(currentDate, 30));
        break;
      case '90':
        newStartDate = formatDateToYYYYMMDD(subtractDays(currentDate, 90));
        break;
      case '180':
        newStartDate = formatDateToYYYYMMDD(subtractDays(currentDate, 180));
        break;
      case 'thisYear':
        newStartDate = formatDateToYYYYMMDD(
          new Date(currentDate.getFullYear(), 0, 1),
        );
        break;
      case 'thisWeek':
        /*  newStartDate = formatDateToYYYYMMDD(
          new Date(
            new Date().setDate(new Date().getDate() - new Date().getDay()),
          ),
        ); */
        const startOfWeek = new Date(currentDate);

        // Get the current day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
        const dayOfWeek = currentDate.getDay();
        startOfWeek.setDate(
          currentDate.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1),
        );
        newStartDate = formatDateToYYYYMMDD(startOfWeek);
        break;
      case 'thisMonth':
        newStartDate = formatDateToYYYYMMDD(
          new Date(new Date().getFullYear(), new Date().getMonth(), 1), // Start of the current month
        );
        break;
      default:
        if (eventFlag === 'events') {
          const selectedMonth = parseInt(selectedValue);

          const { monthStartDate, monthEndDate } = getMonthStartAndEnd(
            currentYear,
            selectedMonth,
          );

          newStartDate = formatDateToYYYYMMDD(monthStartDate);
          newEndDate = formatDateToYYYYMMDD(monthEndDate);
          setCurrentMonth(monthNames[selectedMonth]);
        }
        break;
    }
    try {
      // Fetch data based on the flag and the calculated start and end dates
      if (flag === 'userManagement') {
        const fetchedData = await FetchDashboardUsersData(
          newStartDate,
          newEndDate,
        );
        setStatsData(fetchedData);
      } else if (flag === 'happeningEvents') {
        const fetchedData = await FetchHappeningEventsData(
          newStartDate,
          newEndDate,
        );
        setHappeningEventsData(fetchedData);
      } else {
        const fetchedData = await FetchSeeAttractionData(
          newStartDate,
          newEndDate,
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

  const isFirstRender = useRef(true); // Tracks the first render

  const adjustStartDateForFirstRender = (date: string) => {
    const adjustedDate = new Date(date);
    adjustedDate.setDate(adjustedDate.getDate() - 30);
    return adjustedDate.toISOString().split('T')[0]; // Return as YYYY-MM-DD
  };

  const loadData = async (adjustedStart: string) => {
    setLoadingUserManagement(true);
    try {
      const fetchedData = await FetchDashboardUsersData(adjustedStart, endDate);
      setStatsData(fetchedData);
    } catch (error) {
      console.error('Error loading user management data:', error);
    } finally {
      setLoadingUserManagement(false);
    }
  };

  const loadTopExperienceData = async (adjustedStart: string) => {
    setLoadingAttractions(true);
    try {
      const fetchedData = await FetchSeeAttractionData(adjustedStart, endDate);
      setSeeAttractionData(fetchedData);
    } catch (error) {
      console.error('Error loading top experience data:', error);
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
      console.error('Error loading events data:', error);
    } finally {
      setLoadingEvents(false);
    }
  };

  useEffect(() => {
    const adjustedStartDate = isFirstRender.current
      ? adjustStartDateForFirstRender(startDate)
      : startDate;

    // Call the loading functions with the adjusted date
    void loadData(adjustedStartDate);
    void loadTopExperienceData(adjustedStartDate);
    void loadHappeningEventsData();

    // Mark that the first render has completed
    isFirstRender.current = false;
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

  if (loadingUserManagement || loadingAttractions || loadingEvents) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <main className="h-full px-4">
      <StatsSection calculateRange={calculateRange} />
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
                Must See Attractions
              </p>
              <div className="h-full flex flex-col gap-14">
                <div>
                  <p className="text-xs text-gray-50 font-bold">
                    Total Attractions
                  </p>
                  <p className="text-4xl font-semibold text-blue-100 mb-3">
                    {seeAttractionData?.newAttractionsCount}
                  </p>
                </div>
                <MalaysiaMap />
                {/* <MapChart
                  data={dummyMapDataOne}
                  visibleCountries={dummyMapVisibleCountriesOne}
                /> */}
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
                    onChange={(event) =>
                      handleSelectChange(event, 'topExperience')
                    }
                  />
                </div>
              </div>
              <p className="text-xs  text-gray-50 font-bold mt-2">
                Experiences Offered
              </p>
              <p className="text-4xl font-semibold text-blue-100 mb-3">
                {experienceOfferedSum}
              </p>
              <div className="p-2">
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
