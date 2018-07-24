import {
  SET_VERIFY_RESULT,
  CLOSE_VERIFY_RESULT,
  START_VERIFY_SIGNATURE,
} from '../actions';

export default function signatureVerify(
  state = {
    verifyResult: {
      signature: '',
      signatureResult: {},
    },
    verifyPending: false,
    showVerifyResult: false,
  },
  action
) {
  switch (action.type) {
    case START_VERIFY_SIGNATURE:
      return {
        ...state,
        verifyPending: true,
        showVerifyResult: false,
      };
    case SET_VERIFY_RESULT:
      return {
        ...state,
        verifyResult: action.verifyResult,
        verifyPending: false,
        showVerifyResult: true,
      };
    case CLOSE_VERIFY_RESULT:
      return {
        ...state,
        showVerifyResult: false,
      };
    default:
      return state;
  }
}
