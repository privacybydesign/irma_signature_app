import fs from 'fs';

import { searchMailClients, composeMail, getTempPath } from './../utils/mail';

// action types
export const SEND_SIGNATURE_REQUEST = 'send-signature-request';
export const DETECT_MAIL_CLIENTS = 'detect-mail-clients';
export const SET_PREFERRED_MAIL_CLIENT = 'set-preferred-mail-client';

export function storeMailClients(clients) {
  return {
    type: DETECT_MAIL_CLIENTS,
    mailClients: clients,
  };
}

export function setPreferredMailClient(client) {
  return {
    type: SET_PREFERRED_MAIL_CLIENT,
    preferredMailClient: client,
  };
}

export function detectMailClients() {
  return dispatch =>
    searchMailClients()
      .then(clients => dispatch(storeMailClients(clients)));
}

export function sendSignatureRequest(attachmentPath, mailClientName, mailClientPath, mail) {
  // TODO async
  return Promise.resolve(composeMail(attachmentPath, mailClientName, mailClientPath, mail));
}

export function saveSignatureRequest(sigRequest, path) {
  if (path === undefined) {
    fs.writeFileSync(getTempPath(), JSON.stringify(sigRequest, null, 4)); // 4 = 4 spaces in json
  } else {
    fs.writeFileSync(path, JSON.stringify(sigRequest, null, 4)); // 4 = 4 spaces in json
  }
}
