'use client';
// import { useState } from 'react';
import CardContainer from '@/components/ui/card/CardContainer';
import CardStats from '@/components/ui/card/CardStats';
import ComingSoonFeature from '@/components/ui/ComingSoonFeature';
import CustomDatePicker from '@/components/ui/CustomDatePicker';
import AreasplineChart from '@/components/ui/dashboard/charts/AreasplineChart';
import BarChart from '@/components/ui/dashboard/charts/BarChart';
import MapChart from '@/components/ui/dashboard/charts/MapChart';
import StatsSection from '@/components/ui/dashboard/StatsSections';
import UserStats from '@/components/ui/dashboard/UserStates';
import Select from '@/components/ui/dataTable/Select';
// import DataTable from '@/components/ui/dataTable/DataTable';
import {
  categoriesForBar,
  chartCategories,
  chartData,
  dummyMapDataOne,
  // dummyMapDataTwo,
  dummyMapVisibleCountriesOne,
  // dummyMapVisibleCountriesTwo,
  seriesData,
  userStats,
} from '@/constants';

// import generateDummyDataForARTrails from './DummyData';

export default function Dashboard() {
  // const columns = ['AR Trail Name', 'Location', 'Category'];

  // const data = generateDummyDataForARTrails();

  // const [currentPage] = useState(1);
  // const [perPage] = useState(12);

  // const renderCell = (item: any, column: string) => {
  //   switch (column) {
  //     default:
  //       return <span>{item[column]}</span>;
  //   }
  // };
  return (
    <main className="h-full px-4">
      <StatsSection />
      <CardContainer title="User Management" showStats>
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
              minimalStyle
            />
          </div>
        </div>
      </CardContainer>

      <CardContainer title="Discover Malaysia">
        <div className="flex lg:flex-row flex-col justify-between gap-4 w-full font-medium">
          <div className="flex rounded-xl bg-blue-50 border border-gray-100 gap-4 font-medium p-4 lg:w-[68%] w-full">
            <div className="p-2 flex flex-col w-1/2">
              1
              <p className="text-xs text-black-100 mb-4">Must See Attraction</p>
              <p className="text-xs text-black-100">Total Attraction</p>
              <p className="text-4xl font-semibold text-blue-100 mb-3">24</p>
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
                      { value: '30Days', label: 'Last 30 days' },
                      { value: '7Days', label: 'This week' },
                      { value: '14Days', label: '14 days' },
                    ]}
                    highlightValue="30Days"
                    minimalStyle
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
            statsData={26}
          >
            <CustomDatePicker />
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
