export const ADD_REQUEST     = 'add-request';
export const REMOVE_REQUESTS = 'remove-request';

export function addRequest(sigRequest, date, recipient) {
  return {
    type: ADD_REQUEST,
    sigRequest,
    date,
    recipient,
  };
}

export function removeRequests(ids) {
  return {
    type: REMOVE_REQUESTS,
    ids,
  };
}
