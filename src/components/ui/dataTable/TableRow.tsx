import React from 'react';

interface TableRowProps {
  item: any;
  columns: Array<string>;
  rowIndex: number;
  renderCell: (item: any, column: string, rowIndex: number) => React.ReactNode;
}

const TableRow: React.FC<TableRowProps> = ({
  item,
  columns,
  rowIndex,
  renderCell,
}) => {
  return (
    <tr>
      {columns.map((column, index) => (
        <td
          key={index}
          className={`px-6 py-2 whitespace-nowrap text-sm text-center  ${
            index === 0
              ? 'border-r border-gray-300'
              : index === columns.length - 1
                ? 'border-l border-gray-300'
                : 'border-x border-gray-300'
          }`}
        >
          {renderCell(item, column, rowIndex)}
        </td>
      ))}
    </tr>
  );
};

export default TableRow;
