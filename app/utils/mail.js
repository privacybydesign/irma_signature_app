// Util functions to send an e-mail via detected mail clients
// Works only on desktop apps!

import { config, exec, tempdir, which } from 'shelljs';
import { platform } from 'process';

const mailClients = {
  win32: [
    { name: 'outlook', description: 'Microsoft Outlook' },
    { name: 'thunderbird', description: 'Mozilla Thunderbird' },
  ],
  linux: [
//    { name: 'claws-mail', description: 'Claws Mail' },
    { name: 'thunderbird', description: 'Mozilla Thunderbird' },
  ],
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

function detectMailClientsLinux(candidates) {
  return candidates.reduce((result, el) => {
    const name = el.name;
    const description = el.description;

    // find entries are separated by '\n',
    // we only look at the first one which is (hopefully) the correct one
    const findResult =
      exec(`find /bin /usr/bin /usr/local/bin -type f -executable -name '${name}'`).split('\n')[0];

    if (findResult !== '') {
      return result.set(name, { path: findResult, description });
    }

    return result;
  }, new Map());
}

function detectMailClientsWindows(candidates) {
  return candidates.reduce((result, el) => {
    const name = el.name;
    const description = el.description;
    let findResult =
      exec(`dir /s/b "c:\\Program Files" |findstr /I ${name}.exe`).split('\n')[0];

    // Try again in 32bit dir if result is empty
    if (findResult === '') {
      findResult =
        exec(`dir /s/b "c:\\Program Files (x86)" |findstr /I ${name}.exe`).split('\n')[0];
    }

    if (findResult !== '') {
      return result.set(name, { path: findResult, description });
    }

    return result;
  }, new Map());
}

// Look if outlook >= 2010, because only those support setting subject&body
// See: https://stackoverflow.com/questions/7912973/launch-outlook-to-compose-a-message-with-subject-and-attachment-by-outlooks-com
function isNewOutlook(path) {
  const officeString = path.match(/Office\d\d/);
  if (officeString && officeString[0] && officeString[0].match(/\d\d/)) {
    return officeString[0].match(/\d\d/)[0] > 12;
  }

  // Return new outlook by default if we cannot detect it
  return true;
}

export function searchMailClients() {
  setNodePath();

  const os = detectOs();
  if (os === 'linux') {
    return Promise.resolve(detectMailClientsLinux(mailClients[os]));
  } else if (os === 'win32') {
    return Promise.resolve(detectMailClientsWindows(mailClients[os]));
  }
  // Currently unsupported OS, fallback to saving message manually
  console.log('OS not supported: ', os);
  return Promise.resolve(new Map());
}

function composeMailOutlook(attachmentPath, mailClientPath, mail) {
  setNodePath();
  if (isNewOutlook(mailClientPath)) {
    return exec(`"${mailClientPath}" /c ipm.note /m "${mail.destination}&subject=${mail.subject}body=${mail.body}" /a "${attachmentPath}"`, { async: true });
  }

  return exec(`"${mailClientPath}" /a ${attachmentPath}`, { async: true });
}

function composeMailThunderbird(attachmentPath, mailClientPath, mail) {
  return exec(`"${mailClientPath}" -compose "to='${mail.destination}',subject='${mail.subject}',body='${mail.body}',attachment='${attachmentPath}'"`, { async: true });
}

export function getTempPath() {
  const sep = (detectOs() === 'win32') ? '\\' : '/';
  return `${tempdir()}${sep}signatureRequest.irma`;
}

export function composeMail(attachmentPath, mailClientName, mailClientPath, mail) {
  setNodePath();
  const path = (attachmentPath !== null) ? attachmentPath : getTempPath();
  if (mailClientName === 'thunderbird') {
    return composeMailThunderbird(path, mailClientPath, mail);
  } else if (mailClientName === 'outlook') {
    return composeMailOutlook(path, mailClientPath, mail);
  }
}
