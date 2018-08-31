const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;
const shell = electron.shell;

export function searchAttributesElectron() {
  ipcRenderer.send('searchAttributes-req');
}

export function saveSignatureRequestElectron(sigRequest, path) {
  ipcRenderer.send('saveSignatureRequest-req', sigRequest, path);
}

export function verifySignatureElectron(signature, requests) {
  ipcRenderer.send('verifySignature-req', signature, requests);
}

export function verifyStoredSignatureElectron(path, requests) {
  ipcRenderer.send('verifyStoredSignature-req', path, requests);
}

export function dragSignatureRequestElectron(request) {
  ipcRenderer.send('dragSignatureRequest-req', request);
}

export function getSignatureSavePath(path) {
  return electron.remote.dialog.showSaveDialog({
    defaultPath: path || undefined,
    title: 'Save IRMA signature request',
    filters: [
      { name: 'IRMA Signature requests', extensions: ['irmarequest'] },
      { name: 'All Files', extensions: ['*'] },
    ],
  });
}

export function getDefaultSavePath() {
  return electron.remote.dialog.showOpenDialog({
    title: 'Select default storage directory',
    properties: ['openDirectory', 'createDirectory', 'noResolveAliases'],
  });
}

export function openExtern(url) {
  return shell.openExternal(url);
}

export function getCommandlineArgument() {
  if (window.location.hostname !== "localhost" && electron.remote.process.argv.length > 1)
    return electron.remote.process.argv[1];
}
