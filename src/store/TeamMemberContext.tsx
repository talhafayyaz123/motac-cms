'use client';
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

// Define the context shape
interface TeamMemberContextType {
  currentTeamMember: any;
  setCurrentTeamMember: (teamMember: any) => void;
}

// Create the context
const TeamMemberContext = createContext<TeamMemberContextType>({
  currentTeamMember: null,
  setCurrentTeamMember: () => {},
});

// TeamMemberProvider with persistence using localStorage
export const TeamMemberProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [currentTeamMember, setCurrentTeamMember] = useState<any>(null);

  useEffect(() => {
    const savedTeamMember = localStorage.getItem('currentTeamMember');
    if (savedTeamMember) {
      setCurrentTeamMember(JSON.parse(savedTeamMember));
    }
  }, []);

  useEffect(() => {
    if (currentTeamMember) {
      localStorage.setItem(
        'currentTeamMember',
        JSON.stringify(currentTeamMember),
      );
    } else {
      localStorage.removeItem('currentTeamMember');
    }
  }, [currentTeamMember]);

  return (
    <TeamMemberContext.Provider
      value={{ currentTeamMember, setCurrentTeamMember }}
    >
      {children}
    </TeamMemberContext.Provider>
  );
};

// Custom hook to access the TeamMember context
export const useTeamMember = () => useContext(TeamMemberContext);
