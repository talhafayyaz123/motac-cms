import { Action, State } from './tyles';

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'FETCH_DESTINATIONS':
      return {
        ...state,
        destinations: action.payload.data,
      };
    default:
      return state;
  }
};
