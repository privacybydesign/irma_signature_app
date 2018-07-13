import { verifySignatureElectron, verifyStoredSignatureElectron} from './electron';

// action types
export const SET_VERIFY_RESULT = 'set-verify-result';
export const START_VERIFY_SIGNATURE = 'start-verify-signature';

function startVerifySignature() {
  return {
    type: START_VERIFY_SIGNATURE,
  };
}

export function verifySignature(path) {
  return dispatch => {
    dispatch(startVerifySignature());
    return verifySignatureElectron(path);
  };
}

export function verifyStoredSignature(path) {
  return dispatch => {
    dispatch(startVerifySignature());
    return verifyStoredSignatureElectron(path);
  };
}
