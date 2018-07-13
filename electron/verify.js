const BPromise = require('bluebird');
const fs = BPromise.promisifyAll(require('fs'));
const shelljs = require('shelljs');
const exec = BPromise.promisify(shelljs.exec);
const { config, which } = shelljs;

const { getRequest, setSignature } = require('./storage');

// Hack to let this work in electron
// https://github.com/shelljs/shelljs/wiki/Electron-compatibility
function setNodePath() {
  const nodeLocation = which('node').stdout;
  config.execPath = nodeLocation;
}

// Adds " to all nummeric bigInts, so that they can be parsed in Javascript
function convertIntToStringInJson(input) {
  return input.replace(/: *(-{0,1}\d+)/g, ':"$1"');
}

function getNonceFromSignature(signature) {
  const signatureString = convertIntToStringInJson(signature);
  const parsedSignature = JSON.parse(signatureString);
  return parsedSignature.nonce;
}

function verifySignatureWithoutRequestGo(signature) {
  return exec(`./go/irma_signature_verify '${signature}'`);
}

function verifySignatureGo(signature, request) {
  const requestString = JSON.stringify(request);
  console.log('Calling: ', `./go/irma_signature_verify '${signature}' '${requestString}'`);
  return exec(`./go/irma_signature_verify '${signature}' '${requestString}'`);
}

function verifySignatureWithNonce(nonce, signature) {
  return getRequest(nonce)
    .then(request => {
      if (Object.keys(request).length === 0) {
        // No matching request found, verifying without request
        return verifySignatureWithoutRequestGo(signature)
          .then(JSON.parse);
      }

      return verifySignatureGo(signature, request.request)
        .then(JSON.parse)
        .then(signatureResult => (
            Object.assign({}, signatureResult, { // TODO: no spread operator?
              request,
            })
        ));
    });
}

function verifySignature(signature) {
  const nonce = getNonceFromSignature(signature);

  if (nonce === undefined) {
    // Safetycheck so that we're sure that signature is valid json
    // (since we're passing it to exec..)
    return;
  }

  return verifySignatureWithNonce(nonce, signature)
    .tap(signatureResult => setSignature(nonce, signature, signatureResult.proofStatus))
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
module.exports.verifyStoredSignature = function(path) {
  return fs.readFileAsync(path, "utf8")
    .then(signature => verifySignature(signature));
};

setNodePath();
