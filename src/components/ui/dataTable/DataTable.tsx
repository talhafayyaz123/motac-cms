import React from 'react';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import Pagination from './Pagination';

interface DataTableProps {
  columns: Array<string>;
  data: Array<any>;
  renderCell: (item: any, column: string) => React.ReactNode;
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
  minHeight = "500px",
}) => {
  return (
    <div className="rounded-lg shadow overflow-hidden border border-gray-200 "  style={{ minHeight }} >
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <TableHeader columns={columns} renderHeader={renderHeader} />
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item, index) => (
            <TableRow key={index} item={item} columns={columns} renderCell={renderCell} />
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
      {pagination && (
        <Pagination
          total={pagination.total}
          perPage={pagination.perPage}
          currentPage={pagination.currentPage}
          onPageChange={pagination.onPageChange}
          onPerPageChange={pagination.onPerPageChange} 
        />
      )}
    </div>
  );
};

export default DataTable;
