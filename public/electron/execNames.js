const process = require('process');

switch(process.platform) {
case 'win32':
  module.exports.getAllAttributesExec = 'go\\get_all_attributes.exe';
  module.exports.irmaSignatureVerifyExec = 'go\\irma_signature_verify.exe';
  break;
default:
  module.exports.getAllAttributesExec = './go/get_all_attributes';
  module.exports.irmaSignatureVerifyExec = './go/irma_signature_verify';
  break;
}
