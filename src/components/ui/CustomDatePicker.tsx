import React, { useState } from 'react';

const CustomDatePicker: React.FC = () => {
  const currentDate = new Date();
  const [month, setMonth] = useState<string>(
    currentDate.toLocaleString('default', { month: 'long' }),
  );
  const [year, setYear] = useState<number>(currentDate.getFullYear());

  // Event dates with some sample events
  const events: { [key: string]: string[] } = {
    '2024-09-06': ['Event 1'],
    '2020-05-15': ['Event 2'],
  };

  // Get the number of days in the selected month
  const getDaysInMonth = (month: string, year: number) => {
    const monthIndex = new Date(`${month} 1, ${year}`).getMonth();
    return new Date(year, monthIndex + 1, 0).getDate(); // Get last day of the month
  };

  const daysInMonth = getDaysInMonth(month, year);

  const changeMonth = (direction: 'prev' | 'next') => {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const currentMonthIndex = monthNames.indexOf(month);

    if (direction === 'prev') {
      if (currentMonthIndex === 0) {
        setMonth('December');
        setYear(year - 1);
      } else {
        setMonth(monthNames[currentMonthIndex - 1]);
      }
    } else {
      if (currentMonthIndex === 11) {
        setMonth('January');
        setYear(year + 1);
      } else {
        setMonth(monthNames[currentMonthIndex + 1]);
      }
    }
  };

  const renderDays = () => {
    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const dateKey = `${year}-${String(new Date(`${month} 1, ${year}`).getMonth() + 1).padStart(2, '0')}-${i.toString().padStart(2, '0')}`;

      // Check if the day has any events
      const hasEvent = events[dateKey];

      days.push(
        <div
          key={i}
          className={`p-2 text-center rounded-md hover:bg-indigo-100 
            ${hasEvent ? 'bg-blue-100 text-blue-800 font-bold' : ''}`}
        >
          {i}
        </div>,
      );
    }
    return days;
  };

  return (
    <div
      style={{ maxWidth: '500px', width: '100%' }}
      className="bg-white shadow-xl overflow-hidden rounded-lg mx-auto mt-8 text-gray-900 font-semibold text-center"
    >
      <div className="flex items-center justify-around px-4 py-6">
        <button
          onClick={() => changeMonth('prev')}
          className="p-4 rounded-md text-indigo-600"
        >
          <svg
            className="w-4 h-4 stroke-current"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="4"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="text-lg">
          {month}, {year}
        </div>
        <button
          onClick={() => changeMonth('next')}
          className="p-4 rounded-md text-indigo-600"
        >
          <svg
            className="w-4 h-4 stroke-current"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="4"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-7 grid-col-dense grid-rows-6 p-6 gap-1">
        <div className="text-indigo-600">Mon</div>
        <div className="text-indigo-600">Tue</div>
        <div className="text-indigo-600">Wed</div>
        <div className="text-indigo-600">Thu</div>
        <div className="text-indigo-600">Fri</div>
        <div className="text-indigo-600">Sat</div>
        <div className="text-indigo-600">Sun</div>
        {renderDays()}
      </div>
    </div>
  );
};

export default CustomDatePicker;
