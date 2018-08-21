const fs = require('fs');
const path = require('path');
const os = require('os');

module.exports.saveTempSignatureRequest = function(signatureRequest) {
  const tmpdir = fs.mkdtempSync(path.join(os.tmpdir(), 'irmaSigApp'));
  const filepath = path.join(tmpdir, 'signatureRequest.irmarequest');
  fs.writeFileSync(filepath, JSON.stringify(signatureRequest));
  return filepath;
};
