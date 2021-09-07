'use strict';

const input = document.getElementById('input');
const output = document.getElementById('output');
const separator = document.getElementById('sep');

const createStar = (keyup) => {
  const value = keyup.target.value;
  const sep = separator.value;

  let outputString = '';

  for (let i = -(value.length); i <= value.length; i++) {
    outputString += value.split('').join(sep.repeat(i < 0 ? -i : i)) + '<br>';
  }

  output.innerHTML = outputString;
};


input.addEventListener('keyup', createStar);