import React from 'react';

import Select from '@/components/ui/dataTable/Select';
import {
  getDaysPassedThisMonth,
  getDaysPassedThisWeek,
  getDaysPassedThisYear,
} from '@/helpers/utils/utils';

interface CardStatsProps {
  title: string;
  statsLabel: string;
  statsData: number;
  children: React.ReactNode;
  isEventFilter?: boolean;
  handleSelectChange: (
    event: React.ChangeEvent<HTMLSelectElement>,
    flag: string,
  ) => void;
}

const CardStats: React.FC<CardStatsProps> = ({
  statsLabel,
  statsData,
  title,
  children,
  isEventFilter = false,
  handleSelectChange,
}) => {
  const daysPassedYear = getDaysPassedThisYear();

  const daysPassedMonth = getDaysPassedThisMonth();

  const daysPassedWeek = getDaysPassedThisWeek();

  return (
    <div className="flex flex-col relative rounded-xl bg-blue-50 border border-gray-100 p-4 font-medium">
      <p className="text-xs text-black-100 p-2 font-bold">{title}</p>
      {isEventFilter ? (
        <div className="flex justify-between mb-4">
          <div className="flex p-2 items-center space-x-2">
            <p className="text-5xl font-semibold text-blue-100">{statsData}</p>
            <p className="text-xs text-gray-50 font-bold mb-2 w-6">
              {statsLabel}
            </p>
          </div>

          <div className="h-[max-content]">
            <Select
              options={[
                { value: '30', label: 'Last 30 days' },
                { value: `${daysPassedWeek}`, label: 'This Week' },
                { value: '7', label: 'Last 7 days' },
                { value: `${daysPassedMonth}`, label: 'This Month' },
                { value: '90', label: 'Last 3 Months' },
                { value: '180', label: 'Last 6 Months' },
                { value: `${daysPassedYear}`, label: 'This Year' },
              ]}
              highlightValue={'30'}
              minimalStyle
              onChange={(event) => handleSelectChange(event, 'happeningEvents')}
            />
          </div>
        </div>
      ) : (
        <div className="p-2">
          <p className="text-xs text-black-100">{statsLabel}</p>
          <p className="text-3xl font-semibold text-blue-100">{statsData}</p>
        </div>
      )}
      {children}
    </div>
  );
};

export default CardStats;
