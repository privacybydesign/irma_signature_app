import { config, exec, which } from 'shelljs';
import fs from 'fs';
import { platform } from 'process';

const mailClients = {
  windows: ['outlook', 'thunderbird'],
  linux: ['thunderbird', 'claws-mail'],
};

// Hack to let this work in electron
// https://github.com/shelljs/shelljs/wiki/Electron-compatibility
function setNodePath() {
  const nodeLocation = which('node');
  config.execPath = nodeLocation;
}

function detectOs() {
  return platform;
}

function detectMailclientsLinux(candidates) {
  return candidates.reduce((result, el) => {
    // find entries are separated by '\n',
    // we only look at the first one which is (hopefully) the correct one
    const findResult =
      exec(`find /bin /usr/bin /usr/local/bin -type f -executable -name '${el}'`).split('\n')[0];

    if (findResult !== '') {
      return result.set(el, findResult);
    }

    return result;
  }, new Map());
}

export function searchMailclients() {
  setNodePath();

  const os = detectOs();
  if (os === 'linux') {
    return Promise.resolve(detectMailclientsLinux(mailClients[os]));
  }
  // Currently unsupported OS, fallback to saving message manually
  console.log('OS not supported: ', os);
  return Promise.resolve(new Map());
}


export function saveSignature(sigRequest, path) {
  fs.writeFileSync(path, JSON.stringify(sigRequest, null, 4)); // 4 = 4 spaces in json
}

export function composeMail(destination, mailSubject, mailBody, attachmentLoc, client, path) {
  setNodePath();
  // TODO: switch on client name
  return exec(`${path} -compose "to='${destination}',subject='${mailSubject}',body='${mailBody}',attachment='${attachmentLoc}'"`);
}
