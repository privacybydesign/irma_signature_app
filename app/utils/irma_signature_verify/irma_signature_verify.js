import shelljs from 'shelljs';
import BPromise from 'bluebird';

const { config, pwd, which } = shelljs;
const exec = BPromise.promisify(shelljs.exec);
let wd;

setNodePath();
// Hack to let this work in electron
// https://github.com/shelljs/shelljs/wiki/Electron-compatibility
function setNodePath() {
  const nodeLocation = which('node');
  config.execPath = nodeLocation;
}

// Remove quotes to let string fit in single go argument
function filterString(str) {
  return str.replace(/'/g, '');
}

export default function verifySignature(signature, signatureRequest) {
  const filteredSignature = filterString(signature);
  const filteredSignatureRequest = filterString(signatureRequest);
  return exec(`${wd}/main "${wd}/path" "${wd}/irma_configuration" '${filteredSignature}' '${filteredSignatureRequest}'`)
    .then(JSON.parse)
    .catch(e => console.log('Error: ', e));
}

function init() {
  setNodePath();
  wd = `${pwd()}/app/utils/irma_signature_verify`;
}

init();
