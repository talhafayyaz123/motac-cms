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
    <div className="flex flex-col relative rounded-xl bg-[#FBFCFF] border border-[#70707069] p-4">
      <p className="text-xs text-[#181819] p-2">{title}</p>
      {isEventFilter ? (
        <div className="flex justify-between mb-4">
          <div className="flex p-2 items-center space-x-2">
            <p className="text-xs text-[#181819]">{statsLabel}</p>
            <p className="text-3xl font-semibold text-[#364EA2]">{statsData}</p>
          </div>

          <Select
            options={[
              { value: 'selectMonth', label: 'Select Month' },
              { value: 'jan', label: 'Jan' },
              { value: 'feb', label: 'Feb' },
            ]}
            highlightValue="selectMonth"
          />
        </div>
      ) : (
        <div className="p-2">
          <p className="text-xs text-[#181819]">{statsLabel}</p>
          <p className="text-3xl font-semibold text-[#364EA2]">{statsData}</p>
        </div>
      )}
      {children}
    </div>
  );
};

export default CardStats;
