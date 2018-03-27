import storage from 'electron-json-storage';
import BPromise from 'bluebird';

// TODO: promisifyAll doens't work?
const get = BPromise.promisify(storage.get);
const set = BPromise.promisify(storage.set);
const keys = BPromise.promisify(storage.keys);
const getMany = BPromise.promisify(storage.getMany);


// TODO: use something more efficient like sqlite?

function getDataWithPrefix(prefix) {
  return keys()
    .then(data => data.filter(el => el.startsWith(prefix)))
    .then(getMany);
}

export function setRequest(request) {
  const newRequest = {
    request,
    signature: undefined,
    state: 'PENDING',
  };

  return set(`request-${request.nonce}`, newRequest);
}

export function getRequest(nonce) {
  return get(`request-${nonce}`);
}

export function getAllRequests() {
  return getDataWithPrefix('request-');
}
