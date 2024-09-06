'use client';
import { useState } from 'react';

import CardContainer from '@/components/ui/card/CardContainer';
import CardStats from '@/components/ui/card/CardStats';
import CustomDatePicker from '@/components/ui/CustomDatePicker';
import AreasplineChart from '@/components/ui/dashboard/charts/AreasplineChart';
import BarChart from '@/components/ui/dashboard/charts/BarChart';
import MapChart from '@/components/ui/dashboard/charts/MapChart';
import StatsSection from '@/components/ui/dashboard/StatsSections';
import UserStats from '@/components/ui/dashboard/UserStates';
import DataTable from '@/components/ui/dataTable/DataTable';
import Select from '@/components/ui/Select';
import {
  categoriesForBar,
  chartCategories,
  chartData,
  dummyMapDataOne,
  dummyMapDataTwo,
  dummyMapVisibleCountriesOne,
  dummyMapVisibleCountriesTwo,
  seriesData,
  userStats,
} from '@/constants';

import generateDummyDataForARTrails from './DummyData';

export default function Dashboard() {
  const columns = ['AR Trail Name', 'Location', 'Category'];

  const data = generateDummyDataForARTrails();

  const [currentPage] = useState(1);
  const [perPage] = useState(12);

  const renderCell = (item: any, column: string) => {
    switch (column) {
      default:
        return <span>{item[column]}</span>;
    }
  };
  return (
    <main className="h-full">
      <StatsSection />
      <CardContainer title="User Management">
        <div className="flex">
          <UserStats stats={userStats} />
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
            <MapChart
              data={dummyMapDataOne}
              visibleCountries={dummyMapVisibleCountriesOne}
            />
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
            <CustomDatePicker />
          </CardStats>
        </div>
      </CardContainer>

      <CardContainer title="AR Trails">
        <div className="grid lg:grid-cols-2 grid-rows-2 lg:grid-rows-1 gap-4 mb-4">
          <div className="relative rounded-xl bg-[#FBFCFF] border border-[#70707069] overflow-hidden">
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
          <div className="relative rounded-xl bg-[#FBFCFF] border border-[#70707069]  overflow-hidden">
            <div className="absolute bottom-3 left-3 flex flex-col z-10">
              <p className="text-xs text-[#666E79]">Total AR Trail</p>
              <p className="text-4xl font-semibold text-[#364EA2]">14</p>
            </div>
            <MapChart
              data={dummyMapDataTwo}
              visibleCountries={dummyMapVisibleCountriesTwo}
            />
          </div>
        </div>
      </CardContainer>
    </main>
  );
}
