import {
  SET_VERIFY_RESULT,
  START_VERIFY_SIGNATURE,
} from '../actions';

export default function signatureVerify(
  state = {
    verifications: {},
    verified: '',
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
        verifications: { ...state.verifications, [action.verifyResult.signature]: action.verifyResult},
        verified: action.verifyResult.signature,
        verifyPending: false,
      };
    default:
      return state;
  }
}
