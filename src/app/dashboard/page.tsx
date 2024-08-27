"use client";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Link from "@/components/ui/Link";
import DataTable from "@/components/ui/dataTable/DataTable";
import generateDummyData from "@/components/ui/dataTable/DummyData";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { RiCheckDoubleFill } from "react-icons/ri";

export default function Components() {
  const columns = [
    "Select",
    "Attraction ID",
    "Attraction Name",
    "Attraction Category",
    "Attraction City",
    "Tags",
    "Priority",
  ];

  const data = generateDummyData();

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const renderCell = (item: any, column: string) => {
    switch (column) {
      case "Select":
        return <input type="radio" />;
      case "Tags":
        return item[column].map((tag: string) => (
          <span
            key={tag}
            className="px-2 py-1 bg-gray-200 rounded-full text-xs font-medium mr-2"
          >
            {tag}
          </span>
        ));
      case "Priority":
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
    <main className="h-full">
      {/* <Button variant="secondary"> Select All</Button>
      <Button variant="primary" icon={<RiCheckDoubleFill />}>
        Select All
      </Button>
      <Button variant="danger">Delete</Button>


      <Link href="">test</Link>
      <Input
        type="text"
        placeholder="Search"
        inputSize="md"
        minWidth="400px"
        className="bg-white"
        onChange={(e) => console.log(e.target.value)}
      />

      <Input
        type="text"
        placeholder="Search"
        inputSize="md"
        minWidth="400px"
        className="bg-white"
        onChange={(e) => console.log(e.target.value)}
        icon={<CiSearch />}
      />
 */}
      <div className="bg-white auto h-full w-full">
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
