// Electron event listeners
const electron = require('electron');
const fs = require('fs');
const isDev = require('electron-is-dev')

const mail = require('./electron/mail');
const { setRequest, setPreferredMailClient, getPreferredMailClient, getAllRequests, deleteRequests } = require('./electron/storage');
const { verifySignature } = require('./electron/verify');
const getAllAttributes = require('./electron/irma_attribute_list');

const app = electron.app;
const ipcMain = electron.ipcMain;

app.on('ready', () => {
  // Install React developer tools in development
  if(isDev) {
    const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer');
    installExtension(REACT_DEVELOPER_TOOLS)
        .then((name) => console.log(`Added Extension:  ${name}`))
        .catch((err) => console.log('Could not install extension: ', err));
  }
});

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
  setRequest(request)
    .then(() => getAllRequests())
    .then(requests => {
      const action = {
        type: 'store-requests',
        requests,
      };
      event.sender.send('response', JSON.stringify(action));
    }); 
});

ipcMain.on('setPreferredMailClient-req', (event, clientName) => {
  setPreferredMailClient(clientName)
    .then(() => getPreferredMailClient())
    .then(preferredMailClient => {
      const action = {
        type: 'get-preferred-mail-client',
        preferredMailClient,
      };
      event.sender.send('response', JSON.stringify(action));
    });
});

ipcMain.on('getPreferredMailClient-req', (event, arg) => {
  getPreferredMailClient()
    .then(preferredMailClient => {
      const action = {
        type: 'get-preferred-mail-client',
        preferredMailClient,
      };
      event.sender.send('response', JSON.stringify(action));
    });
});

ipcMain.on('getAllRequests-req', (event, arg) => {
  getAllRequests()
    .then(requests => {
      const action = {
        type: 'store-requests',
        requests,
      };
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
      };
      event.sender.send('response', JSON.stringify(action));
    });
});

ipcMain.on('verifySignature-req', (event, path, requests) => {
  verifySignature(path, requests)
    .then(verifyResult => {
      const action = {
        type: 'set-verify-result',
        verifyResult,
      };
      event.sender.send('response', JSON.stringify(action));
    });
});
