'use client';
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

interface MemberContextType {
  currentMember: any;
  setCurrentMember: (Member: any) => void;
}

const MemberContext = createContext<MemberContextType>({
  currentMember: null,
  setCurrentMember: () => {},
});

export const MemberProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [currentMember, setCurrentMember] = useState<any>(null);

  useEffect(() => {
    const savedMember = localStorage.getItem('currentMember');
    if (savedMember) {
      setCurrentMember(JSON.parse(savedMember));
    }
  }, []);

  useEffect(() => {
    if (currentMember) {
      localStorage.setItem('currentMember', JSON.stringify(currentMember));
    } else {
      localStorage.removeItem('currentMember');
    }
  }, [currentMember]);

  return (
    <MemberContext.Provider value={{ currentMember, setCurrentMember }}>
      {children}
    </MemberContext.Provider>
  );
};

export const useMember = () => useContext(MemberContext);
