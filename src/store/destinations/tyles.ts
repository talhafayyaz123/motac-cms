export interface DestinationType {
  id: number;
  description: string;
}

export interface State {
  destinations: DestinationType[];
}

export type Action = {
  type: 'FETCH_DESTINATIONS';
  payload: { data: DestinationType[] };
};

export const initialState: State = {
  destinations: [],
};
