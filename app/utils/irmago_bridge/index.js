const { irmago } = require('./main');

function searchAttribute(name) {
  return irmago.searchAttribute(name).GetAttributeNames();
}

module.exports.searchAttribute = searchAttribute;
