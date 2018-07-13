// Important: every file in this directory MUST be called from the electron main process!
// Util functions to send an e-mail via detected mail clients
// Works only on desktop apps!

const { config, exec, tempdir, which } = require('shelljs');
const { platform } = require('process');
const fs = require('fs');

const mailClients = {
  win32: [
    { name: 'outlook', description: 'Microsoft Outlook' },
    { name: 'thunderbird', description: 'Mozilla Thunderbird' },
  ],
  linux: [
//    { name: 'claws-mail', description: 'Claws Mail' },
    { name: 'thunderbird', description: 'Mozilla Thunderbird' },
  ],
  darwin: [
    { name: 'Thunderbird.app', binary: 'thunderbird', description: 'Mozilla Thunderbird' },
    { name: 'Mail.app', binary: 'Mail', description: 'Apple Mail' },
  ],
};

// Hack to let this work in electron
// https://github.com/shelljs/shelljs/wiki/Electron-compatibility
function setNodePath() {
  const nodeLocation = which('node').stdout;
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
      exec(`find /bin /usr/bin /usr/local/bin -executable -name '${name}' \\( -type f -or -type l \\)`).split('\n')[0];

    if (findResult !== '')
      result[name] = { path: findResult, description };


    return result;
  }, {});
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

    if (findResult !== '')
      result[name] = { path: findResult, description };


    return result;
  }, {});
}

function detectMailClientsMacOS(candidates) {
  return candidates.reduce((result, el) => {
    const name = el.name;
    const description = el.description;
    const binary = el.binary;

    // find entries are separated by '\n'
    // -maxdepth in order not to traverse too deeply into /Applications, which is generally huge
    const findResult =
      exec(`find /Applications -maxdepth 2 -type d -name '${name}'`).split('\n')[0];

    if (findResult !== '')
      result[name] = { path: `${findResult}/Contents/MacOS/${binary}`, description };


    return result;
  }, {});
}

// Look if outlook >= 2010, because only those support setting subject&body
// See: https://stackoverflow.com/questions/7912973/launch-outlook-to-compose-a-message-with-subject-and-attachment-by-outlooks-com
function isNewOutlook(path) {
  const officeString = path.match(/Office\d\d/);
  if (officeString && officeString[0] && officeString[0].match(/\d\d/))
    return officeString[0].match(/\d\d/)[0] > 12;


  // Return new outlook by default if we cannot detect it
  return true;
}

function composeMailOutlook(attachmentPath, mailClientPath, mail) {
  setNodePath();
  if (isNewOutlook(mailClientPath))
    return exec(`"${mailClientPath}" /c ipm.note /m "${mail.recipient}&subject=${mail.subject}body=${mail.body}" /a "${attachmentPath}"`, { async: true });


  return exec(`"${mailClientPath}" /a ${attachmentPath}`, { async: true });
}

function composeMailThunderbird(attachmentPath, mailClientPath, mail) {
  return exec(`"${mailClientPath}" -compose "to='${mail.recipient}',subject='${mail.subject}',body='${mail.body}',attachment='${attachmentPath}'"`, { async: true });
}

function composeMailAppleMail(attachmentPath, mailClientPath, mail) {
  const script = `tell application "Mail"
    make new outgoing message with properties {visible:true, subject:"${mail.subject}",content:"${mail.body}"}
    tell result
      make new to recipient with properties {address:"${mail.recipient}"}
      make new attachment with properties {file name:"${attachmentPath}"}
    end tell
  end tell`;
  return exec(`echo '${script}' | /usr/bin/osascript`);
}

function getTempPath() {
  const sep = (detectOs() === 'win32') ? '\\' : '/';
  console.log('temp path: ', `${tempdir()}${sep}signatureRequest.irma`);
  return `${tempdir()}${sep}signatureRequest.irma`;
}

function save(path, sigRequest) {
  return fs.writeFileSync(path, JSON.stringify(sigRequest));
}

module.exports.composeMail = function composeMail(sigRequest, mailClientName, mailClientPath, mail) {
  setNodePath();
  const path = getTempPath();

  save(path, sigRequest); // TODO: async needed?

  if (mailClientName === 'thunderbird' || mailClientName === 'Thunderbird.app')
    return composeMailThunderbird(path, mailClientPath, mail);
   else if (mailClientName === 'outlook')
    return composeMailOutlook(path, mailClientPath, mail);
   else if (mailClientName === 'Mail.app')
    return composeMailAppleMail(path, mailClientPath, mail);

};

module.exports.searchMailClients = function searchMailClients() {
  setNodePath();
  const os = detectOs();
  if (os === 'linux')
    return Promise.resolve(detectMailClientsLinux(mailClients[os]));
   else if (os === 'win32')
    return Promise.resolve(detectMailClientsWindows(mailClients[os]));
   else if (os === 'darwin')
    return Promise.resolve(detectMailClientsMacOS(mailClients[os]));

  // Currently unsupported OS, fallback to saving message manually
  console.log('OS not supported: ', os);
  return Promise.resolve({});
};
