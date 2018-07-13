import { searchMailClientsElectron, composeMailElectron } from './electron.js';

export const STORE_MAIL_CLIENTS = 'store-mail-clients';
export const SET_PREFERRED_MAIL_CLIENT = 'set-preferred-mail-client';

export function setPreferredMailClient(clientName) {
  return {
    type: SET_PREFERRED_MAIL_CLIENT,
    clientName,
  };
}

export function detectMailClients() {
  return () =>
    searchMailClientsElectron();
}

export function sendSignatureRequest(sigRequest, mailClientName, mailClientPath, mailInfo) {
  composeMailElectron(sigRequest, mailClientName, mailClientPath, mailInfo);
}
