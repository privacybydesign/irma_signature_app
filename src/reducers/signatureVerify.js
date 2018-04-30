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
      return Object.assign({}, state, {
        verifyPending: true,
      });
    case SET_VERIFY_RESULT:
      return Object.assign({}, state, {
        verifyResult: action.verifyResult,
        verifyPending: false,
      });
    default:
      return state;
  }
}
