'use client';
import { useRef } from 'react';

import CardContainer from '@/components/ui/card/CardContainer';
import CardStats from '@/components/ui/card/CardStats';
import AreasplineChart from '@/components/ui/dashboard/charts/AreasplineChart';
import BarChart from '@/components/ui/dashboard/charts/BarChart';
import MapChart from '@/components/ui/dashboard/charts/MapChart';
import StatsSection from '@/components/ui/dashboard/StatsSections';
import UserStats from '@/components/ui/dashboard/UserStates';
import Select from '@/components/ui/Select';

export default function Components() {
  const categories = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const data = [1, 2, 1, 1, 2, 4, 3, 2.5, 2, 3, 2.5, 2];

  const userStats = [
    { label: 'Total Users', value: 7000 },
    { label: 'Active Users', value: 6500 },
    { label: 'Deleted Users', value: 500 },
  ];

  const mapData = [
    { code: 'US', value: 1 },
    { code: 'RU', value: 5 },
  ];

  const visibleCountries = ['US', 'RU'];

  const categoriesForBar = ['Nature', 'Culture & History', 'Food Beverage'];

  const seriesData = [
    {
      type: 'column' as const,
      name: 'Fruits',
      data: [5, 3, 4],
    },
  ];

  const dateInputRef = useRef<HTMLInputElement>(null);

  return (
    <main className="h-full">
      <StatsSection />
      <CardContainer title="User Management">
        <div className="flex">
          <UserStats stats={userStats} />
          <AreasplineChart
            categories={categories}
            data={data}
            title="New Users this Month"
            color="#364EA2"
            fillColorStart="#778FDF"
            fillColorEnd="transparent"
          />

          <div className="absolute top-4 right-0 flex justify-end pr-4">
            <Select
              options={[
                { value: '30Days', label: 'Last 30 days' },
                { value: '7Days', label: 'This week' },
                { value: '14Days', label: '14 days' },
              ]}
              highlightValue="30Days"
            />
          </div>
        </div>
      </CardContainer>

      <CardContainer title="Discover Malaysia">
        <div className="grid lg:grid-cols-3 grid-rows-3 lg:grid-rows-1 gap-4 w-full">
          <CardStats
            title="Must See Attraction"
            statsLabel="Total Attraction"
            statsData={24}
          >
            <MapChart data={mapData} visibleCountries={visibleCountries} />
          </CardStats>
          <CardStats
            title="Top Experiences"
            statsLabel="Experiences Offered"
            statsData={26}
          >
            <BarChart categories={categoriesForBar} seriesData={seriesData} />
          </CardStats>
          <CardStats
            title="Happening Events"
            statsLabel="Upcoming Events"
            isEventFilter={true}
            statsData={26}
          >
            <input
              ref={dateInputRef}
              type="date"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Select date"
            />{' '}
          </CardStats>
        </div>
      </CardContainer>
    </main>
  );
}
