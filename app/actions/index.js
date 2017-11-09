import { searchMailclients, composeMail, saveSignature } from './../utils/mail';

// action types
export const SEND_SIGNATURE_REQUEST = 'send-signature-request';
export const DETECT_MAIL_CLIENTS = 'detect-mail-clients';

export function storeMailClients(clients) {
  return {
    type: DETECT_MAIL_CLIENTS,
    mailClients: clients,
  };
}

export function detectMailclients() {
  return dispatch =>
    searchMailclients()
      .then(clients => dispatch(storeMailClients(clients)));
}

export function sendSignatureRequest(sigRequest, mailclients, destination, mailSubject, mailBody) {
  return () => {
    console.log('we will send this:', sigRequest, destination, mailSubject, mailBody);
    const attachmentPath = '/tmp/ramdisk/sigrequest.irma';

    saveSignature(sigRequest, attachmentPath);
    composeMail(destination, mailSubject, mailBody, attachmentPath, 'thunderbird', mailclients.get('thunderbird'));
    return Promise.resolve();
  };
}
