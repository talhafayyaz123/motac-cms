'use client';
import React from 'react';

interface UserStatsProps {
  title: string;
  stats: {
    label: string;
    value: number;
  }[];
}

const UserStats: React.FC<UserStatsProps> = ({ title, stats }) => {
  return (
    <div className="flex flex-col space-y-4">
      <p className="text-lg text-[#181819]">{title}</p>

      {stats.map((stat, index) => (
        <div
          key={index}
          className="rounded-xl bg-[#FBFCFF] border border-[#70707069] p-4"
        >
          <p className="text-xs text-[#181819]">{stat.label}</p>
          <p className="text-3xl font-bold text-[#364EA2]">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default UserStats;
