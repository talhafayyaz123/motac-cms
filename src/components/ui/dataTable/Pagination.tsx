import React from 'react';
import {
  FaChevronLeft,
  FaChevronRight,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
} from 'react-icons/fa';

interface PaginationProps {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
  onPerPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="bg-white px-10 py-3 flex items-center justify-between border-t border-gray-200">
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="px-2 py-2 rounded-md  bg-white text-sm font-medium text-gray-500 hover:bg-gray-200 disabled:opacity-50"
        >
          <FaAngleDoubleLeft />
        </button>
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="px-2 py-2 rounded-md  bg-white text-sm font-medium text-gray-500 hover:bg-gray-200 disabled:opacity-50"
        >
          <FaChevronLeft />
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => onPageChange(i + 1)}
            className={`px-3 py-1 rounded-md text-sm font-medium ${
              i + 1 === currentPage
                ? 'bg-black-100 text-white'
                : 'text-gray-700 hover:bg-gray-200'
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-2 py-2 rounded-md  bg-white text-sm font-medium text-gray-500 hover:bg-gray-200 disabled:opacity-50"
        >
          <FaChevronRight />
        </button>
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="px-2 py-2 rounded-md  bg-white text-sm font-medium text-gray-500 hover:bg-gray-200 disabled:opacity-50"
        >
          <FaAngleDoubleRight />
        </button>
      </div>
      <div className="text-sm text-gray-700 flex gap-4">
        <select
          value={perPage}
          onChange={(e) => onPerPageChange(Number(e.target.value))}
          className=" text-sm py-1 px-2"
        >
          {[5, 10, 20, 50].map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
        Showing rows {(currentPage - 1) * perPage + 1} to{' '}
        {Math.min(currentPage * perPage, total)} of {total}
      </div>
    </div>
  );
};

export default Pagination;
