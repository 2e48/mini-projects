const SORT = {
  NONE: 0,
  ASCENDING: 1,
  DESCENDING: 2,
};

const MODE = {
  syllabic: function(syllables) {
    return syllabicWordGen(syllables);
  },
  natural: function(length) {
    return naturalWordGen(length);
  }
};

const wordListDiv = document.getElementById('word-list');
const regenButton = document.getElementById('reroll-words');
const syllableInput = document.getElementById('syllables');
const countInput = document.getElementById('count');
const sortInput = document.getElementById('sort-mode');

const consonants = 'bcdfghjklmnpqrstvwxz';
const vowels = 'aeiouy'; // making y as a vowel coz it sounds like one

const randomInt = (maxNumber) => {
  return Math.floor(Math.random() * maxNumber);
};

const syllabicWordGen = (syllables) => {
  let generatedWord = '';
  for (let s = 0; s < syllables; s++) {
    generatedWord += consonants[randomInt(consonants.length)];
    generatedWord += vowels[randomInt(vowels.length)];
  }

  return generatedWord;
};

const naturalWordGen = (length) => {
  let generatedWord = '';
  for (let s = 0; s < length; s++) {
    let isSingle = randomInt(2);

    if (isSingle === 1) {
      generatedWord += vowels[randomInt(vowels.length)];
    } else {
      generatedWord += consonants[randomInt(consonants.length)];
      generatedWord += vowels[randomInt(vowels.length)];
    }
  }
  return generatedWord;
};

const showWords = (words, length, sort = SORT.NONE) => {
  wordListDiv.innerHTML = '';

  let wordsArray = [];

  for (let w = 0; w < words; w++) {
    wordsArray.push(naturalWordGen(length));
  }

  if (sort == SORT.ASCENDING) { wordsArray.sort(); }
  else if (sort == SORT.DESCENDING) { wordsArray.reverse(); }

  wordsArray.forEach(item => {
    wordListDiv.innerHTML += item + '<br>'
  })
};

regenButton.addEventListener('click', function () {
  showWords(
    countInput.value,
    syllableInput.value,
    sortInput.value
  );
});
