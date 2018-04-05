const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

export function searchMailClientsElectron() {
  ipcRenderer.send('searchMailClients-req');
}

export function searchAttributesElectron() {
  ipcRenderer.send('searchAttributes-req');
}
