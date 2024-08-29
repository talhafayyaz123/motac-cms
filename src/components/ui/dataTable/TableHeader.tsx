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
          className={`px-6 py-6 text-left text-sm font-medium text-black tracking-wider border-y border-gray-300 ${
            index === 0
              ? 'border-r border-gray-300'
              : index === columns.length - 1
                ? 'border-l border-gray-300'
                : 'border-x border-gray-300'
          }`}
        >
          {renderHeader ? renderHeader(column) : column}
        </th>
      ))}
    </tr>
  );
};

export default TableHeader;
