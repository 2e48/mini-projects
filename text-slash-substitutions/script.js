const txtInput = document.getElementById("txtInput");
const spanHeader = document.getElementById("spanHeader");
const ulResult = document.getElementById("ulResult");
const cbxContinous = document.getElementById("cbxContinous");

/**
 * @param {string} input 
 * @param {boolean} isContinous 
 * @param {string} separator 
 * @returns string[]
 */
function parseInput(input, isContinous = false, separator = '/') {
  // no checking for now, too lazy
  // separator to be flexible in the future?
  let stringArr = input.split(separator);
  const firstVal = stringArr.shift();

  // last modified value
  // next values depends on `isContinous`
  let lastVal = firstVal;

  // values holder, will find better options
  /** @type string[] */
  let results = [];

  // opting for vanilla for loops
  // since i dont understand the scope of values in functions
  // i forgor im srry
  for (let i = 0; i < stringArr.length; i++) {
    if (stringArr[i].length > lastVal.length) {
      if (isContinous) { 
        lastVal = stringArr[i];
      }
      results.push(stringArr[i]);
      continue;
    }

    // wow this looks horrible
    let lastSubStr = lastVal.substring(0, lastVal.length - stringArr[i].length);
    let newStr = lastSubStr + stringArr[i];

    if (isContinous) {
      lastVal = newStr;
    }

    results.push(newStr);
  }

  results.unshift(firstVal);
  return results;
}

document.getElementById('inputParse').addEventListener('click', function (e) {
  let trimmedInput = txtInput.value.trim();
  let c = cbxContinous.checked;

  let result = parseInput(trimmedInput, c);
  ulResult.innerHTML = ""
  result.forEach(value => {
    ulResult.innerHTML += `<li>${value}</li>`;
  });
});