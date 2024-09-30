import { useReducer, useEffect } from 'react';

import { apiClient } from '@/services/apiClient';
import { reducer } from '@/store/destinations/reducer';
import { DestinationType, initialState } from '@/store/destinations/tyles';

const fetchDestinations = async (): Promise<DestinationType[]> => {
  try {
    const response = await apiClient(`/destinations/DestinationTypes`, {
      method: 'GET',
    });
    return response;
  } catch (error) {
    console.error('An error occurred:', error);
    return [];
  }
};

export const useFetchDestinations = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchDestinations();
      dispatch({ type: 'FETCH_DESTINATIONS', payload: { data } });
    };

    void fetchData();
  }, []);

  return state;
};
