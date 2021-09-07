const input = document.getElementById('input');
const inputButton = document.getElementById('input-button');
const outputPre = document.getElementById('output-pre');

/**
 * 
 * @param {string[]} strArr 
 */
const getFlags = (str) => {
  const prefix = '--';

  const strArray = str
    .trim()
    .replaceAll(/\s+/ig, ' ')
    .split(' ');

  let flagArray = {
    _noFlag: {
      values: [],
    },
  };

  let lastArg = '';
  strArray.forEach((arg) => {
    if (arg.startsWith(prefix) && arg.length > prefix.length) {
      noPrefixFlag = arg.slice(prefix.length);

      if (noPrefixFlag.includes('=')) {
        const pair = noPrefixFlag.split('=');
        flagArray[pair[0]] = {
          values: [pair[1]],
        };
        lastArg = '';
      } else {
        lastArg = noPrefixFlag;
        flagArray[lastArg] = {
          values: [],
        };
      }

    } else if (lastArg) {
      flagArray[lastArg].values.push(arg);
    } else {
      flagArray._noFlag.values.push(arg);
    }
  });

  console.log(flagArray);
  return flagArray;
};

const getArguments = (str) => {
  const argFlags = getFlags(str);

  let outputString = '';

  for (const flag in argFlags) {
    const values = argFlags[flag].values;
    if (flag === '_noFlag') {
      outputString += `Unbound commands: ${values.toString()} <br>`;
    } else {
      outputString += `${flag}: ${values.toString()}<br>`;
    }
  }

  outputPre.innerHTML = outputString;
};

const buttonPress = () => {
  getArguments(input.value);
};

inputButton.addEventListener('click', buttonPress);
