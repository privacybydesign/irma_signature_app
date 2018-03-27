import { setRequest, getAllRequests } from './../utils/storage';

export const SET_REQUESTS = 'set-requests';

function setSignatureRequestResult(requests) {
  return {
    type: SET_REQUESTS,
    requests,
  };
}

export function getAllSignatureRequests() {
  return dispatch => (
    getAllRequests()
      .then(requests => dispatch(setSignatureRequestResult(requests)))
  );
}

export function setSignatureRequest(request) {
  return dispatch => (
    setRequest(request)
      .then(() => dispatch(getAllSignatureRequests())) // Update redux store with new request
  );
}
