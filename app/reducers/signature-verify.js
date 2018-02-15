import {
  SET_VERIFY_RESULT,
  START_VERIFY,
} from '../actions';

export default function verify(
  state = {
    verifyResult: {},
    verifyPending: false,
  },
  action
) {
  switch (action.type) {
    case START_VERIFY:
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
