const input = document.getElementById('input');
const output = document.getElementById('output');

// OR'd vals are test, too lazy to retype shit
const inputValue = input.value
  || '8====D B===D 0===3 b===D cock word lmao cumming cock is next b==D~~~';

const dickRegex = /([8Bb0]=+[D3])(~+(?:[Oo0]\:|\(\|?\))?)?/g;

const found = inputValue.match(dickRegex);

console.log(found);