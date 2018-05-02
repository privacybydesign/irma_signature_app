import { searchMailClientsElectron, setPreferredMailClientElectron, getPreferredMailClientElectron, composeMailElectron } from './electron.js';

export const STORE_MAIL_CLIENTS = 'store-mail-clients';
// export const SET_PREFERRED_MAIL_CLIENT = 'set-preferred-mail-client';
export const GET_PREFERRED_MAIL_CLIENT = 'get-preferred-mail-client';

export function setPreferredMailClient(clientName) {
  return setPreferredMailClientElectron(clientName);
}

export function getPreferredMailClient() {
  return dispatch =>
    getPreferredMailClientElectron();
}

export function detectMailClients() {
  return dispatch =>
    searchMailClientsElectron();
}

export function sendSignatureRequest(sigRequest, mailClientName, mailClientPath, mailInfo) {
  composeMailElectron(sigRequest, mailClientName, mailClientPath, mailInfo);
}
