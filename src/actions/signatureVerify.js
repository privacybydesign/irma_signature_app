import { verifySignatureElectron, verifyStoredSignatureElectron} from './electron';

// action types
export const SET_VERIFY_RESULT = 'set-verify-result';
export const CLOSE_VERIFY_RESULT = 'close-verify-result';
export const START_VERIFY_SIGNATURE = 'start-verify-signature';

function startVerifySignature() {
  return {
    type: START_VERIFY_SIGNATURE,
  };
}

export function verifySignature(path, requests) {
  return dispatch => {
    dispatch(startVerifySignature());
    return verifySignatureElectron(path, requests);
  };
}

export function verifyStoredSignature(path, requests) {
  return dispatch => {
    dispatch(startVerifySignature());
    return verifyStoredSignatureElectron(path, requests);
  };
}

export function closeVerifyResult() {
  return {
    type: CLOSE_VERIFY_RESULT,
  };
}
