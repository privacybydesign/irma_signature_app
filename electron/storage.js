const storage = require('electron-json-storage');
const BPromise = require('bluebird');

// TODO: promisifyAll doesn't work?
const clear = BPromise.promisify(storage.clear);
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

  return set(`request-${request.sigRequest.nonce}`, newRequest);
}

module.exports.deleteRequests = function deleteRequests(keys) {
  return BPromise.map(keys, (el => remove(el)));
}

module.exports.setSignature = function setSignature(nonce, signature, state) {
  return get(`request-${nonce}`)
    .then(request => {
      // Don't store anything in case we cannot find a matching request
      if(Object.keys(request).length === 0) {
        return BPromise.resolve();
      }

      const newRequest = Object.assign({}, request, { // TODO: no spread operator?
        state,
        signature,
      });

      return set(`request-${nonce}`, newRequest);
    });
}

module.exports.getRequest = function getRequest(nonce) {
   return get(`request-${nonce}`);
}

module.exports.getAllRequests = function getAllRequests() {
  // return clear().then(() => getDataWithPrefix('request-')); // Enable to clear storage
  return getDataWithPrefix('request-');
}
