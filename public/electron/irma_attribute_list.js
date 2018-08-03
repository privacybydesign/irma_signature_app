const child_process = require('child_process');
const BPromise = require('bluebird');
const { getAllAttributesExec } = require('./execNames');

const exec = BPromise.promisify(child_process.exec);

module.exports = function getAllAttributes() {
  return exec(getAllAttributesExec)
    .then(JSON.parse);
};
