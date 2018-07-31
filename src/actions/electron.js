const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

export function searchAttributesElectron() {
  ipcRenderer.send('searchAttributes-req');
}

export function saveSignatureRequestElectron(sigRequest, path) {
  ipcRenderer.send('saveSignatureRequest-req', { sigRequest, path });
}

export function verifySignatureElectron(signature, requests) {
  ipcRenderer.send('verifySignature-req', signature, requests);
}

export function verifyStoredSignatureElectron(path, requests) {
  ipcRenderer.send('verifyStoredSignature-req', path, requests);
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
