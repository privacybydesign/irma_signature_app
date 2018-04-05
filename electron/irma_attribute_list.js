const shelljs = require('shelljs');
const BPromise = require('bluebird');

const { config, which } = shelljs;
const exec = BPromise.promisify(shelljs.exec);

setNodePath();
// Hack to let this work in electron
// https://github.com/shelljs/shelljs/wiki/Electron-compatibility
function setNodePath() {
  const nodeLocation = which('node').stdout;
  config.execPath = nodeLocation;
}

module.exports = function getAllAttributes() {
  return exec('./go/get_all_attributes')
    .then(JSON.parse);
}

function init() {
  setNodePath();
}

init();
