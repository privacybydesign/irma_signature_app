export const ADD_REQUEST = 'add-request';
export const REMOVE_REQUESTS = 'remove-requests';
export const LOAD_REQUESTS = 'load-requests';

export function addRequest(sigRequest, date, name) {
  return {
    type: ADD_REQUEST,
    sigRequest,
    date,
    name,
  };
}

export function removeRequests(ids) {
  return {
    type: REMOVE_REQUESTS,
    ids,
  };
}

export function loadRequests(requests) {
  return {
    type: LOAD_REQUESTS,
    requests,
  };
}
