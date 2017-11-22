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

export default function searchAttribute(name) {
  if (name === '') {
    return BPromise.resolve({});
  }

  return exec(`${wd}/main "${wd}/path" "${wd}/irma_configuration" "${name}"`)
    .then(JSON.parse);
}

function init() {
  setNodePath();
  wd = `${pwd()}/app/utils/irma_cli_search`;
}

init();
