function generateNonce() {
  const rawData = new Uint8Array(34);
  window.crypto.getRandomValues(rawData);
  return btoa(String.fromCharCode.apply(null, rawData));
}

function attributeMapToContent(attributeMap) {
  return Object.keys(attributeMap)
    .map((el) => ({
      label: attributeMap[el].name,
      attributes: [el],
    }));
}

export function createSigrequestFromInput(input) {
  return {
    nonce: generateNonce(),
    context: '',
    message: input.message,
    content: attributeMapToContent(input.attributes),
    from: input.from,
  };
}

export function generateDate() {
    return Date.now();
}

export function formatTimestamp(ts) {
    const date = new Date(ts);
    const minutes = date.getMinutes() > 9 ? `${date.getMinutes()}` : `0${date.getMinutes()}`;
    const hours = date.getHours() > 9 ? `${date.getHours()}` : `0${date.getHours()}`;
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()} ${hours}:${minutes}`;
}
