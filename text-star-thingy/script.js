'use strict';

const input = document.getElementById('input');
const output = document.getElementById('output');
const separator = document.getElementById('sep');
const alignment = document.getElementById('alignment');

const createStar = () => {
  const value = input.value;
  const sep = separator.value || ' ';
  const align = alignment.value;

  let outputString = '';

  const maxLength = (value.length ** 2) * Math.max(sep.length, 1);

  for (let i = -(value.length); i <= value.length; i++) {
    const line = value.split('').join(sep.repeat(i < 0 ? -i : i));

    if (align === 'center') {
      const space = (maxLength - line.length) / 2;
      outputString += `${' '.repeat(space)}${line}<br>`;
    } else if (align === 'right') {
      const space = maxLength - line.length;
      outputString += `${' '.repeat(space)}${line}<br>`;
    } else {
      outputString += line + '<br>';
    }
  }

  output.innerHTML = outputString;
};


input.addEventListener('change', createStar);
separator.addEventListener('change', createStar);
alignment.addEventListener('change', createStar);