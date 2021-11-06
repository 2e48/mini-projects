'use strict';

const linkInput = document.getElementById('raw-link');
const generateButton = document.getElementById('gen-key');
const output = document.getElementById('output-lol');
const copyButton = document.getElementById('copy');

const cipher = new EncryptSauce();

const copyToClipboard = (what) => {
  navigator.clipboard.writeText(what);
};

generateButton.addEventListener('click', () => {
  output.value = cipher.encode(linkInput.value, cipher.randomKey());
});

copyButton.addEventListener('click', () => {
  copyToClipboard(output.value);
  copyButton.innerHTML = 'Copied!';
});

// decoding logic

const decodeIntro = document.getElementById('decode-intro');
const decodeKey = document.getElementById('decode-button');
const decodeOutro = document.getElementById('decode-outro');
const decodeOpen = document.getElementById('decoded-open');
const decodeCopy = document.getElementById('decoded-copy');

decodeKey.addEventListener('click', () => {
  decodeOutro.value = cipher.decode(decodeIntro.value);
});

decodeOpen.addEventListener('click', () => {
  window.open(decodeOutro.value);
});

decodeCopy.addEventListener('click', () => {
  copyToClipboard(decodeOutro.value);
  decodeCopy.innerHTML = 'Copied!';
});