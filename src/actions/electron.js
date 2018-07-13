const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

export function searchMailClientsElectron() {
  ipcRenderer.send('searchMailClients-req');
}

export function searchAttributesElectron() {
  ipcRenderer.send('searchAttributes-req');
}

export function composeMailElectron(sigRequest, mailClientName, mailClientPath, mailInfo) {
  ipcRenderer.send('composeMail-req', { sigRequest, mailClientName, mailClientPath, mailInfo });
}

export function saveSignatureRequestElectron(sigRequest, path) {
  ipcRenderer.send('saveSignatureRequest-req', { sigRequest, path });
}

export function setPreferredMailClientElectron(clientName) {
  ipcRenderer.send('setPreferredMailClient-req', clientName);
}

export function getPreferredMailClientElectron() {
  ipcRenderer.send('getPreferredMailClient-req');
}

export function deleteRequestsElectron(keys) {
  ipcRenderer.send('deleteRequests-req', keys);
}

export function verifySignatureElectron(path, requests) {
  ipcRenderer.send('verifySignature-req', path, requests);
}

export function getSignatureSavePath() {
  return electron.remote.dialog.showSaveDialog({
    title: 'Save IRMA signature request',
    filters: [
      { name: 'IRMA Files', extensions: ['irma'] },
      { name: 'All Files', extensions: ['*'] },
    ],
  });
}
