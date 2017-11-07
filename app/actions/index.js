import { init, detectMailclients, composeMail, saveSignature } from './../utils/mail';

// action types
export const SEND_SIGNATURE_REQUEST = 'send-signature-request';

export function sendSignatureRequest(sigRequest, destination, mailSubject, mailBody) {
  return () => {
    console.log('we will send this:', sigRequest, destination, mailSubject, mailBody);
    const loc = '/tmp/ramdisk/sigrequest.irma';

    init();
    saveSignature(sigRequest, loc);
    const mailclients = detectMailclients();
    composeMail(destination, mailSubject, mailBody, loc, mailclients.get('thunderbird'));
    return Promise.resolve();
  };
}
