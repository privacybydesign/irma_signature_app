const child_process = require('child_process');
const BPromise = require('bluebird');

const exec = BPromise.promisify(child_process.exec);

module.exports = function getAllAttributes() {
  return exec('./go/get_all_attributes')
    .then(JSON.parse);
};
