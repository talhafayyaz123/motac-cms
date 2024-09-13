import React from 'react';

interface TableHeaderProps {
  columns: Array<string>;
  renderHeader?: (column: string) => React.ReactNode;
  verticalSpace?: string;
}

const TableHeader: React.FC<TableHeaderProps> = ({
  columns,
  renderHeader,
  verticalSpace = 'py-6',
}) => {
  return (
    <tr>
      {columns.map((column, index) => (
        <th
          key={index}
          className={`px-6 ${verticalSpace} max-w-max text-center text-sm font-bold text-[#181819] text-black tracking-wider border-y border-gray-300 whitespace-nowrap ${
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
