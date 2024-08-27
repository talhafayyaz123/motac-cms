import React from 'react';

interface TableHeaderProps {
  columns: Array<string>;
  renderHeader?: (column: string) => React.ReactNode;
}

const TableHeader: React.FC<TableHeaderProps> = ({ columns, renderHeader }) => {
  return (
    <tr>
      {columns.map((column, index) => (
        <th
          key={index}
          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          {renderHeader ? renderHeader(column) : column}
        </th>
      ))}
    </tr>
  );
};

export default TableHeader;
