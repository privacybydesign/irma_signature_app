const storage = require('electron-json-storage');
const BPromise = require('bluebird');

// TODO: promisifyAll doesn't work?
const get = BPromise.promisify(storage.get);
const set = BPromise.promisify(storage.set);
const keys = BPromise.promisify(storage.keys);
const getMany = BPromise.promisify(storage.getMany);
const remove = BPromise.promisify(storage.remove);


// TODO: use something more efficient like sqlite?
function getDataWithPrefix(prefix) {
  return keys()
    .then(data => data.filter(el => el.startsWith(prefix)))
    .then(getMany);
}

module.exports.setRequest = function setRequest(request) {
  const newRequest = {
    request: request.sigRequest,
    signature: undefined,
    state: 'PENDING',
    recipient: request.recipient,
    date: request.date,
  };
  console.log('saving: ', newRequest);

  return set(`request-${request.sigRequest.nonce}`, newRequest);
}

module.exports.deleteRequests = function deleteRequests(keys) {
  return BPromise.map(keys, (el => remove(el)));
}

// export function setSignature(signature, state) {
//   // TODO
//   return get(`request-${signature.nonce}`)
//     .then(request => console.log(request));
// }
//
// export function getRequest(nonce) {
//   return get(`request-${nonce}`);
// }

module.exports.getAllRequests = function getAllRequests() {
  return getDataWithPrefix('request-');
}
