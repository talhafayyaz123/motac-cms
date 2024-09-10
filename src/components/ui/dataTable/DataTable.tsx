import React from 'react';

import { colors } from '@/lib/theme';

import Pagination from './Pagination';
import TableHeader from './TableHeader';
import TableRow from './TableRow';

interface DataTableProps {
  columns: Array<string>;
  data: Array<any>;
  renderCell: (item: any, column: string, index?: number) => React.ReactNode;
  renderHeader?: (column: string) => React.ReactNode;
  renderFooter?: () => React.ReactNode;
  pagination?: {
    total: number;
    perPage: number;
    currentPage: number;
    onPageChange: (page: number) => void;
    onPerPageChange: (perPage: number) => void;
  };
  minHeight?: string;
}

const DataTable: React.FC<DataTableProps> = ({
  columns,
  data,
  renderCell,
  renderHeader,
  renderFooter,
  pagination,
  minHeight = '550px',
}) => {
  return (
    <div className="rounded-lg flex flex-col" style={{ minHeight }}>
      <div className="overflow-y-auto flex-grow">
        <table className="min-w-full table-fixed divide-y divide-gray-200">
          <thead
            className="sticky top-0 z-10"
            style={{ background: colors.data_table_header }}
          >
            <TableHeader columns={columns} renderHeader={renderHeader} />
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item, index) => (
              <TableRow
                key={index}
                item={item}
                columns={columns}
                renderCell={(item: any, column: string) =>
                  renderCell(item, column, index)
                }
              />
            ))}
          </tbody>
          {renderFooter && (
            <tfoot>
              <tr>
                <td colSpan={columns.length}>{renderFooter()}</td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>

      {pagination && (
        <div className=" bg-white overflow-hidden">
          <Pagination
            total={pagination.total}
            perPage={pagination.perPage}
            currentPage={pagination.currentPage}
            onPageChange={pagination.onPageChange}
            onPerPageChange={pagination.onPerPageChange}
          />
        </div>
      )}
    </div>
  );
};

export default DataTable;
