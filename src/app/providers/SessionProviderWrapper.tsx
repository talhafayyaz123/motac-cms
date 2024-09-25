// app/providers/SessionProviderWrapper.tsx

'use client'; // Make sure this is a client component

import { SessionProvider } from 'next-auth/react';

const SessionProviderWrapper = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default SessionProviderWrapper;
