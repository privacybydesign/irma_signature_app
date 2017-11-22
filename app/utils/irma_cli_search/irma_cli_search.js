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


// Filter a string to only a-z, 0-9 and spaces to prevent command execution
function filterString(toFilter) {
  return toFilter
    .split('')
    .reduce((acc, val) => {
      if (!val.match(/[a-zA-Z 0-9]/)) {
        return acc;
      }
      return acc + val;
    }, '');
}

export default function searchAttribute(name) {
  const filteredName = filterString(name);
  if (filteredName === '') {
    return BPromise.resolve({});
  }

  return exec(`${wd}/main "${wd}/path" "${wd}/irma_configuration" "${filteredName}"`)
    .then(JSON.parse);
}

function init() {
  setNodePath();
  wd = `${pwd()}/app/utils/irma_cli_search`;
}

init();
