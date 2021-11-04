'use strict';

const linkInput = document.getElementById('raw-link');
const keyInput = document.getElementById('key');
const randomKey = document.getElementById('key-random');
const generateButton = document.getElementById('gen-key');
const output = document.getElementById('output-lol');
const referLink = document.getElementById('a-href-decoder');

const cipher = new KeyIndexed();

let keyToPass = '';
let cipherToPass = '';

const generateKey = function (length = 10) {
  keyInput.value = cipher.randomKey();
};

const generateClues = function (key, count = 3) {
  let indexClues = [];

  while (indexClues.length < count) {
    indexClues.push(Math.floor(Math.random() * key.length));
  }

  let pairs = indexClues.map(n => [key.charAt(n), n]);

  let firstHalf = '';
  let secondHalf = '';

  pairs.forEach(a => {
    firstHalf += a[0].toString();
    secondHalf += a[1].toString();
  });

  return `${firstHalf} -> ${secondHalf}`;
};

const obsfuscateLink = function (link) {
  const urlObj = new URL(link);

  const hostnameMinified = urlObj.hostname.replace(/(\w)\w+/g, '$1');
  const pathnameCiphered = urlObj.pathname.replace(/\d+/, m => {
    const ciph = cipher.encode(m, keyInput.value);
    cipherToPass = encodeURIComponent(ciph);

    return ' => ' + ciph;
  });

  return `${hostnameMinified}${pathnameCiphered}`;
};

const changeReferLink = function () {
  referLink.href = `index.html#${keyToPass}:#:${cipherToPass}`;
};

randomKey.addEventListener('click', () => generateKey());
generateButton.addEventListener('click', () => {
  if (keyInput.value == '') {
    alert('key needed');
    return;
  }

  const clue = generateClues(keyInput.value, 3);
  const key = keyInput.value;
  const sauce = obsfuscateLink(linkInput.value);

  output.value = `${clue}\n${key}\n${sauce}`;

  keyToPass = encodeURIComponent(key);

  console.log(cipherToPass);
  console.log(decodeURIComponent(cipherToPass));

  changeReferLink();
});