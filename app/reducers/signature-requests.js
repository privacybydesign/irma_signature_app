import {
  SET_REQUESTS,
} from '../actions';

export default function signatureRequests(
  state = {
    requests: [],
  },
  action
) {
  switch (action.type) {
    case SET_REQUESTS:
      return Object.assign({}, state, {
        requests: action.requests,
      });
    default:
      return state;
  }
}
