import {
  SET_VERIFY_RESULT,
  START_VERIFY_SIGNATURE,
} from '../actions';

export default function signatureVerify(
  state = {
    verifyResult: {
      signature: '',
      signatureResult: {},
    },
    verifyPending: false,
  },
  action
) {
  switch (action.type) {
    case START_VERIFY_SIGNATURE:
      return {
        ...state,
        verifyPending: true,
      };
    case SET_VERIFY_RESULT:
      return {
        ...state,
        verifyResult: action.verifyResult,
        verifyPending: false,
      };
    default:
      return state;
  }
}
