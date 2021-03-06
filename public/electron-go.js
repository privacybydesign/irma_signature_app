// Electron event listeners
const electron = require('electron');
const fs = require('fs');
const isDev = require('electron-is-dev');
const path = require('path');
const process = require('process');

const { verifySignature, verifyStoredSignature } = require('./electron/verify');
const getAllAttributes = require('./electron/irma_attribute_list');
const { saveTempSignatureRequest } = require('./electron/drag');

const app = electron.app;
const ipcMain = electron.ipcMain;

app.on('ready', () => {
  // Install React developer tools in development
  if (isDev) {
    const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer');
    installExtension(REACT_DEVELOPER_TOOLS)
        .then((name) => console.log(`Added Extension:  ${name}`))
        .catch((err) => console.log('Could not install extension: ', err));
  }
});

ipcMain.on('searchAttributes-req', (event) => {
  getAllAttributes()
    .then(attributeResult => {
      const action = {
        type: 'store-attribute-result',
        attributeResult,
      };
      event.sender.send('response', JSON.stringify(action));
    });
});

ipcMain.on('saveSignatureRequest-req', (event, sigRequest, sigPath) => {
  if (sigPath !== undefined)
    fs.writeFileSync(sigPath, JSON.stringify(sigRequest, null, 4)); // 4 = 4 spaces in json

});

ipcMain.on('dragSignatureRequest-req', (event, signatureRequest, filename) => {
  event.sender.startDrag({
    file: saveTempSignatureRequest(signatureRequest, filename),
    icon: path.join(__dirname, 'assets', 'draglogo.png'),
  });
});

ipcMain.on('verifySignature-req', (event, sigPath, requests) => {
  verifySignature(sigPath, requests)
    .then(verifyResult => {
      const action = {
        type: 'set-verify-result',
        verifyResult,
      };
      event.sender.send('response', JSON.stringify(action));
    });
});

ipcMain.on('verifyStoredSignature-req', (event, arg, requests) => {
  verifyStoredSignature(arg, requests)
    .then(verifyResult => {
      const action = {
        type: 'set-verify-result',
        verifyResult,
      };
      event.sender.send('response', JSON.stringify(action));
    });
});

// Set cwd correctly
if (!isDev) {
  let postfix = '.';
  switch (process.platform) {
  case 'darwin':
    postfix='..';
  }
  process.chdir(path.join(path.dirname(app.getPath('exe')), postfix));
}

console.log(process.argv);
