import React from 'react';

interface TableRowProps {
  item: any;
  columns: Array<string>;
  renderCell: (item: any, column: string) => React.ReactNode;
}

const TableRow: React.FC<TableRowProps> = ({ item, columns, renderCell }) => {
  return (
    <tr>
      {columns.map((column, index) => (
        <td key={index} className="px-6 py-4 whitespace-nowrap">
          {renderCell(item, column)}
        </td>
      ))}
    </tr>
  );
};

export default TableRow;
