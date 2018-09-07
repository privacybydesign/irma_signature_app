const BPromise = require('bluebird');
const fs = BPromise.promisifyAll(require('fs'));
const child_process = require('child_process');
const exec = BPromise.promisify(child_process.execFile);
const { irmaSignatureVerifyExec } = require('./execNames');

// Adds " to all nummeric bigInts, so that they can be parsed in Javascript
function convertIntToStringInJson(input) {
  return input.replace(/: *(-{0,1}\d+)/g, ':"$1"');
}

function getNonceFromSignature(signature) {
  const signatureString = convertIntToStringInJson(signature);
  try {
    const parsedSignature = JSON.parse(signatureString);
    return parsedSignature.nonce;
  } catch (e) {
    return undefined;
  }
}

function verifySignatureWithoutRequestGo(signature) {
  return exec(irmaSignatureVerifyExec, [signature]);
}

function verifySignatureGo(signature, request) {
  const requestString = JSON.stringify(request);
  console.log(`${irmaSignatureVerifyExec} '${signature}' '${requestString}'`);
  return exec(irmaSignatureVerifyExec, [signature, requestString]);
}

function verifySignatureWithNonce(nonce, signature, requests) {
  const request = requests[`request-${nonce}`];

  if (request === undefined) {
    return verifySignatureWithoutRequestGo(signature)
      .then(JSON.parse);
  }

  return verifySignatureGo(signature, request.request)
    .then(JSON.parse)
    .then(signatureResult => (Object.assign({}, signatureResult, {
      request,
    })));
}

function verifySignature(signature, requests) {
  const nonce = getNonceFromSignature(signature);

  if (nonce === undefined) {
    // Safetycheck so that we're sure that signature is valid json
    // (since we're passing it to exec..)
    return new BPromise.Promise((resolve) => {
      resolve({
        signatureResult: {
          proofStatus: 'INVALID_SYNTAX',
        },
        signature: '',
      });
    });
  }

  return verifySignatureWithNonce(nonce, signature, requests)
    .then(signatureResult => ({ signatureResult, signature }))
    .catch(error => ({
        signatureResult: {
          proofStatus: 'INVALID_SYNTAX',
        },
        signature: '',
        error,
      })
    );
}

module.exports.verifySignature = verifySignature;
module.exports.verifyStoredSignature = function(path, requests) {
  return fs.readFileAsync(path, 'utf8')
    .then(signature => verifySignature(signature, requests));
};
