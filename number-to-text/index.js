'use strict';

const numberBox = document.getElementById('numbers');
const textBox = document.getElementById('text');

// start at 32
const stringArray = " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";

const num2txt = function () {
  const input = numberBox.value;
  const array = input.split(' ');

  let output = '';
  array.forEach(n => {
    const num = n - 32;

    if (num < 0 || num > stringArray.length) {
      throw 'number out of range!';
    }

    output += stringArray[num];
  });

  textBox.value = output;
};

const txt2num = function () {
  const input = textBox.value;
  const array = input.split('');

  const outputArray = [];
  array.forEach(s => {
    let index = stringArray.indexOf(s);

    if (index === -1) {
      throw 'character not supported';
    }

    index += 32;

    outputArray.push(index.toString().padStart(3, '0'));
  });

  numberBox.value = outputArray.join(' ');
};


document.getElementById('num2txt').addEventListener('click', num2txt);
document.getElementById('txt2num').addEventListener('click', txt2num);