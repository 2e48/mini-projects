'use strict';

const cipherType = document.getElementById('cipher-type');
const baseInput = document.getElementById('base');
const keyInput = document.getElementById('key');
const encodedBox = document.getElementById('encoded');
const decodedBox = document.getElementById('decoded');

const cipherTypes = {
  'keyIndex': new KeyIndexed(),
  'keyRotate': new KeyRotate(),
}

document.getElementById('encode').addEventListener('click', function () {
  const text = cipherTypes[cipherType.value].encode(baseInput.value, keyInput.value);

  encodedBox.value = text;
});

document.getElementById('decode').addEventListener('click', function () {
  const text = cipherTypes[cipherType.value].decode(encodedBox.value, keyInput.value);

  decodedBox.value = text;
});