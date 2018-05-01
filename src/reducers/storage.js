import {
  RETRIEVE_REQUESTS,
  STORE_REQUESTS,
} from '../actions';

export default function storage(
  state = {
    requestsFetching: false,
    requests: {},
  },
  action
) {
  switch (action.type) {
    case RETRIEVE_REQUESTS:
      return {
        ...state,
        requestsFetching: true,
      };
    case STORE_REQUESTS:
      return {
        ...state,
        requests: action.requests,
        requestsFetching: false,
      };
    default:
      return state;
  }
}
