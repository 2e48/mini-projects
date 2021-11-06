'use strict';

const linkInput = document.getElementById('raw-link');
const keyInput = document.getElementById('key');
const randomKey = document.getElementById('key-random');
const generateButton = document.getElementById('gen-key');
const output = document.getElementById('output-lol');
const referLink = document.getElementById('a-href-decoder');

const cipher = new EncryptSauce();

const generateKey = () => {
  keyInput.value = cipher.randomKey();
}

randomKey.addEventListener('click', () => generateKey());
generateButton.addEventListener('click', () => {
  if (keyInput.value == '') {
    generateKey();
  }

  output.value = cipher.encode(linkInput.value, keyInput.value);
});