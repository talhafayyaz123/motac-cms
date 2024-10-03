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
  console.log(onPageChange);

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

  // Render page numbers with ellipsis logic
  const renderPageNumbers = () => {
    const pages = [];

    if (totalPages <= 5) {
      // If there are 5 or fewer pages, show all
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <button
            key={i}
            onClick={() => onPageChange(i)}
            className={`px-3 py-1 rounded-md text-sm font-medium ${
              i === currentPage
                ? 'bg-black-100 text-white'
                : 'text-gray-700 hover:bg-gray-200'
            }`}
          >
            {i}
          </button>,
        );
      }
    } else {
      // Always show the first page button
      pages.push(
        <button
          key={1}
          onClick={() => onPageChange(1)}
          className={`px-3 py-1 rounded-md text-sm font-medium ${
            1 === currentPage
              ? 'bg-black-100 text-white'
              : 'text-gray-700 hover:bg-gray-200'
          }`}
        >
          1
        </button>,
      );

      if (currentPage > 3) {
        pages.push(<span key="ellipsis-left">...</span>);
      }

      // Determine the range of pages to display
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        if (i > 1 && i < totalPages) {
          pages.push(
            <button
              key={i}
              onClick={() => onPageChange(i)}
              className={`px-3 py-1 rounded-md text-sm font-medium ${
                i === currentPage
                  ? 'bg-black-100 text-white'
                  : 'text-gray-700 hover:bg-gray-200'
              }`}
            >
              {i}
            </button>,
          );
        }
      }

      if (currentPage < totalPages - 2) {
        pages.push(<span key="ellipsis-right">...</span>);
      }

      // Always show the last page button if the current page is not the last one
      if (currentPage < totalPages) {
        pages.push(
          <button
            key={totalPages}
            onClick={() => onPageChange(totalPages)}
            className={`px-3 py-1 rounded-md text-sm font-medium ${
              totalPages === currentPage
                ? 'bg-black-100 text-white'
                : 'text-gray-700 hover:bg-gray-200'
            }`}
          >
            {totalPages}
          </button>,
        );
      }
    }

    return pages;
  };

  return (
    <div className="bg-white px-10 py-3 flex items-center justify-between border-t border-gray-200">
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="px-2 py-2 rounded-md bg-white text-sm font-medium text-gray-500 hover:bg-gray-200 disabled:opacity-50"
        >
          <FaAngleDoubleLeft />
        </button>
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="px-2 py-2 rounded-md bg-white text-sm font-medium text-gray-500 hover:bg-gray-200 disabled:opacity-50"
        >
          <FaChevronLeft />
        </button>

        {/* Render page numbers with ellipsis */}
        {renderPageNumbers()}

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-2 py-2 rounded-md bg-white text-sm font-medium text-gray-500 hover:bg-gray-200 disabled:opacity-50"
        >
          <FaChevronRight />
        </button>
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="px-2 py-2 rounded-md bg-white text-sm font-medium text-gray-500 hover:bg-gray-200 disabled:opacity-50"
        >
          <FaAngleDoubleRight />
        </button>
      </div>
      <div className="text-sm text-gray-700 flex gap-4">
        <select
          value={perPage}
          onChange={(e) => onPerPageChange(Number(e.target.value))}
          className="text-sm py-1 px-2"
        >
          {[10, 20, 50].map((value) => (
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
