import verifySignature from './../utils/irma_signature_verify/irma_signature_verify';

// action types
export const SET_VERIFY_RESULT = 'set-verify-result';
export const START_VERIFY = 'start-verify';

export function setVerifyResult(verifyResult) {
  return {
    type: SET_VERIFY_RESULT,
    verifyResult,
  };
}

export function startVerify() {
  return {
    type: START_VERIFY,
  };
}

export function verify(signature, signatureRequest) {
  return dispatch => {
    dispatch(startVerify());

    return verifySignature(signature, signatureRequest)
      .then(result => dispatch(setVerifyResult(result)));
  };
}
