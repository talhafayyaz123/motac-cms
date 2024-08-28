'use client';

import { useState } from 'react';

import Button from '@/components/ui/Button';
import DataTable from '@/components/ui/dataTable/DataTable';
import generateDummyData from '@/components/ui/dataTable/DummyData';
import Input from '@/components/ui/Input';
import Link from '@/components/ui/Link';

export default function Home() {
  const columns = [
    'Select',
    'Attraction ID',
    'Attraction Name',
    'Attraction Category',
    'Attraction City',
    'Tags',
    'Priority',
  ];

  const data = generateDummyData();

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const renderCell = (item: any, column: string) => {
    switch (column) {
      case 'Select':
        return <input type="radio" />;
      case 'Tags':
        return item[column].map((tag: string) => (
          <span
            key={tag}
            className="px-2 py-1 bg-gray-200 rounded-full text-xs font-medium mr-2"
          >
            {tag}
          </span>
        ));
      case 'Priority':
        return (
          <div className="relative">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md flex items-center justify-between">
              {item[column]}
            </button>
          </div>
        );
      default:
        return <span>{item[column]}</span>;
    }
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button variant="secondary">test</Button>
      <Link href="">test</Link>
      <Input
        type="text"
        placeholder="Search"
        inputSize="md"
        minWidth="400px"
        className="bg-white"
        onChange={(e) => console.log(e.target.value)}
      />

      <div className="p-6 bg-white">
        <DataTable
          columns={columns}
          data={data.slice((currentPage - 1) * perPage, currentPage * perPage)}
          renderCell={renderCell}
          pagination={{
            total: data.length,
            perPage,
            currentPage,
            onPageChange: setCurrentPage,
            onPerPageChange: setPerPage,
          }}
        />
      </div>
    </main>
  );
}
