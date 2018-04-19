import { retrieveRequestsElectron } from './electron.js';

export const  RETRIEVE_REQUESTS = 'retrieve-requests';
export const  STORE_REQUESTS = 'store-requests';

export function startRequestRetrieval() {
  return {
    type: RETRIEVE_REQUESTS,
  };
}

export function retrieveRequests() {
  return dispatch => {
    dispatch(startRequestRetrieval());
    return retrieveRequestsElectron();
  }
}
