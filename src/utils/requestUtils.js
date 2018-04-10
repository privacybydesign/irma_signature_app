import bigInt from 'big-integer';

function generateNonce() {
  return bigInt.randBetween(bigInt.zero, bigInt('1e80')).toString();
}

function attributeMapToContent(attributeMap) {
  return Object.keys(attributeMap)
    .map((el) => ({
      label: attributeMap[el].name,
      attributes: [el],
    }));
}

export function createSigrequestFromInput(mail, sigrequest) {
  return {
    nonce: generateNonce(),
    context: "0",
    message: sigrequest.sigMessage,
    content: attributeMapToContent(sigrequest.attributes),
    from: mail.from,
  }
}
