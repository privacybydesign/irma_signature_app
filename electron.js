// Electron event listeners
const electron = require('electron')
const fs = require('fs');

const mail = require('./electron/mail');
const { setRequest, getAllRequests, deleteRequests } = require('./electron/storage');
const getAllAttributes = require('./electron/irma_attribute_list');

const ipcMain = electron.ipcMain;

ipcMain.on('searchMailClients-req', (event, arg) => {
  mail.searchMailClients()
    .then(mailClients => {
      const action = {
        type: 'store-mail-clients',
        mailClients,
      };
      event.sender.send('response', JSON.stringify(action));
    });
});

ipcMain.on('searchAttributes-req', (event, arg) => {
  getAllAttributes()
    .then(attributeResult => {
      const action = {
        type: 'store-attribute-result',
        attributeResult,
      };
      event.sender.send('response', JSON.stringify(action));
    });
});

ipcMain.on('composeMail-req', (event, { sigRequest, mailClientName, mailClientPath, mailInfo }) => {
  mail.composeMail(sigRequest, mailClientName, mailClientPath, mailInfo);
});

ipcMain.on('saveSignatureRequest-req', (event, { sigRequest, path }) => {
  if (path !== undefined) {
    fs.writeFileSync(path, JSON.stringify(sigRequest, null, 4)); // 4 = 4 spaces in json
  }
});

ipcMain.on('setRequest-req', (event, request) => {
  setRequest(request); // TODO: async, create result action?
});

ipcMain.on('getAllRequests-req', (event, arg) => {
  getAllRequests()
    .then(requests => {
      const action = {
        type: 'store-requests',
        requests,
      }
      event.sender.send('response', JSON.stringify(action));
    });
});

ipcMain.on('deleteRequests-req', (event, arg) => {
  deleteRequests(arg)
    .then(getAllRequests)
    .then(requests => {
      const action = {
        type: 'store-requests',
        requests,
      }
      event.sender.send('response', JSON.stringify(action));
    });
});
