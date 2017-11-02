// action types

export const SEND_SIGNATURE_REQUEST = 'send-signature-request';

export function sendSignatureRequest(sigRequest, destination, mailBody) {
  return () => {
    console.log('we would be sending this:', sigRequest, destination, mailBody);
    return Promise.resolve();
  };
}
