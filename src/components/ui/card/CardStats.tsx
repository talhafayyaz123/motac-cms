import React from 'react';

import Select from '@/components/ui/Select';

interface CardStatsProps {
  title: string;
  statsLabel: string;
  statsData: number;
  children: React.ReactNode;
  isEventFilter?: boolean;
}

const CardStats: React.FC<CardStatsProps> = ({
  statsLabel,
  statsData,
  title,
  children,
  isEventFilter = false,
}) => {
  return (
    <div className="flex flex-col relative rounded-xl bg-blue-50 border border-gray-100 p-4 font-medium">
      <p className="text-xs text-black-100 p-2">{title}</p>
      {isEventFilter ? (
        <div className="flex justify-between mb-4">
          <div className="flex p-2 items-center space-x-2">
            <p className="text-3xl font-semibold text-blue-100">{statsData}</p>
            <p className="text-xs text-black-100 w-6">{statsLabel}</p>
          </div>

          <div className="h-[max-content]">
            <Select
              options={[
                { value: 'selectMonth', label: 'Select Month' },
                { value: 'jan', label: 'Jan' },
                { value: 'feb', label: 'Feb' },
              ]}
              highlightValue="selectMonth"
              minimalStyle
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
