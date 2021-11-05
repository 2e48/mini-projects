'use strict';

const cipherType = document.getElementById('cipher-type');
const baseInput = document.getElementById('base');
const keyInput = document.getElementById('key');
const encodedBox = document.getElementById('encoded');
const decodedBox = document.getElementById('decoded');
const encodeButton = document.getElementById('encode');
const decodeButton = document.getElementById('decode');

const loadParams = function () {
  const hash = new URL(location).hash;

  if (!hash) return;

  let [key, decode] = hash.split(':#:');

  keyInput.value = decodeURIComponent(key.split('').splice(1).join(''));
  encodedBox.value = decodeURIComponent(decode);

  decodeButton.click();
};

const cipherTypes = {
  'keyIndex': new KeyIndexed(),
  'keyRotate': new KeyRotate(),
}

encodeButton.addEventListener('click', function () {
  const text = cipherTypes[cipherType.value].encode(baseInput.value, keyInput.value);

  encodedBox.value = text;
});

decodeButton.addEventListener('click', function () {
  const text = cipherTypes[cipherType.value].decode(encodedBox.value, keyInput.value);

  decodedBox.value = text;
});

loadParams();