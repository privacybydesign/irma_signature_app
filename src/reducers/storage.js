import {
  ADD_REQUEST,
  REMOVE_REQUESTS,
  SET_VERIFY_RESULT,
  LOAD_REQUESTS,
} from '../actions';

export default function storage(
  state = {
    requests: {},
  },
  action
) {
  switch (action.type) {
    case ADD_REQUEST: {
      const newRequest = {
        request: action.sigRequest,
        signature: undefined,
        state: 'PENDING',
        recipient: action.recipient,
        date: action.date,
      };
      const {requests} = state;
      return {
        ...state,
        requests: {
          ...requests,
          [`request-${action.sigRequest.nonce}`]: newRequest,
        },
      };
    }
    case REMOVE_REQUESTS: {
      const {requests} = state;
      return {
        ...state,
        requests: Object.keys(requests).filter((id) => {
            return action.ids.indexOf(id) === -1;
          }).map((res, id) => {
            res[id] = requests[id];
            return res;
          }, {}),
      };
    }
    case SET_VERIFY_RESULT: {
      if (action.verifyResult.signatureResult.request !== undefined) {
        const {requests} = state;
        return {
          ...state,
          requests: {
            ...requests,
            [`request-${action.verifyResult.signatureResult.request.request.nonce}`]: {
              ...action.verifyResult.signatureResult.request,
              state: action.verifyResult.signatureResult.proofStatus,
              signature: action.verifyResult.signature,
            },
          },
        };
      }
        return state;

    }
    case LOAD_REQUESTS: {
      return {
        ...state,
        requests: action.requests,
      };
    }
    default:
      return state;
  }
}
