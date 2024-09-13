import React from 'react';

import { colors } from '@/lib/theme';

interface WrapperProps {
  children: React.ReactNode;
  isBgColor?: boolean;
}

const Wrapper: React.FC<WrapperProps> = ({ children, isBgColor = true }) => {
  return (
    <div
      className={`flex justify-between items-center p-4 rounded-lg space-x-4`}
      style={{
        background: isBgColor ? colors.data_table_wrapper : 'transparent',
      }}
    >
      {children}
    </div>
  );
};

export default Wrapper;
