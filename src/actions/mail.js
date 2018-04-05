import { searchMailClientsElectron } from './electron.js';

export const STORE_MAIL_CLIENTS = 'store-mail-clients';
export const SET_PREFERRED_MAIL_CLIENT = 'set-preferred-mail-client';

export function setPreferredMailClient(client) {
  return {
    type: SET_PREFERRED_MAIL_CLIENT,
    preferredMailClient: client,
  };
}

export function detectMailClients() {
  return dispatch =>
    searchMailClientsElectron();
}

// export function sendSignatureRequest(attachmentPath, mailClientName, mailClientPath, mail) {
//   // TODO async
//   return Promise.resolve(composeMail(attachmentPath, mailClientName, mailClientPath, mail));
// }
//
// export function saveSignatureRequest(sigRequest, path) {
//   if (path === undefined) {
//     fs.writeFileSync(getTempPath(), JSON.stringify(sigRequest, null, 4)); // 4 = 4 spaces in json
//   } else {
//     fs.writeFileSync(path, JSON.stringify(sigRequest, null, 4)); // 4 = 4 spaces in json
//   }
// }
