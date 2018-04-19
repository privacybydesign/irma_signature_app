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

export function createSigrequestFromInput(from, sigrequest) {
  return {
    nonce: generateNonce(),
    context: "0",
    message: sigrequest.sigMessage,
    content: attributeMapToContent(sigrequest.attributes),
    from,
  };
}

export function generateDate() {
    const date = new Date();
    return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
}
