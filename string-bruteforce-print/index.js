const fillCharTable = () => {
  let charArray = [];

  // 32 - 125 in ascii 
  for (let i = 32; i < 126; i++) {
    charArray.push(String.fromCharCode(i));
  }

  return charArray;
};

const bruteForceString = async (text, isIncremental = false) => {
  let charTable = fillCharTable();
  let bank = '';
  let selected = '';

  let index = 0;

  let iterations = 0;

  while (bank !== text) {
    selected = isIncremental ? charTable[0] : charTable[Math.floor(Math.random() * charTable.length)]

    if (selected != text[index]) {
      charTable.splice(charTable.indexOf(selected), 1);
      console.log(bank + selected);
    } else {
      charTable = fillCharTable();
      bank += selected;
      index += 1;

      console.log(bank);
    }
    iterations += 1;

    //await new Promise(r => setTimeout(r, 5));
  }

  console.log(`Done! Printed ${text} in ${iterations} iterations!`);
};