import React from 'react';

import { colors } from '@/lib/theme';

interface WrapperProps {
  children: React.ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return (
    <div
      className="flex justify-between items-center p-4 rounded-lg space-x-4"
      style={{ background: colors.data_table_wrapper }}
    >
      {children}
    </div>
  );
};

export default Wrapper;
