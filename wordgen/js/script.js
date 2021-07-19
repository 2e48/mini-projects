const wordListDiv = document.getElementById('word-list');
const regenButton = document.getElementById('reroll-words');
const syllableInput = document.getElementById('syllables');
const countInput = document.getElementById('count');
const sortInput = document.getElementById('sort-mode');
const generatorMode = document.getElementById('generator-mode');

const consonants = 'bcdfghjklmnpqrstvwxz';
const vowels = 'aeiouy'; // making y as a vowel because it sounds like one

const SORT = {
  NONE: 'none',
  ASC: 'asc',
  DESC: 'desc',
};

const MODE = {
  syllabic: function(syllables) {
    return syllabicWordGen(syllables);
  },
  natural: function(length) {
    return naturalWordGen(length);
  }
};

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

  let lastTwoSyllable = ['0','0'];
  while (generatedWord.length < length) {    
    const syllableGenerator = () => {
      return consonants[randomInt(consonants.length)]
      + vowels[randomInt(vowels.length)];
    }
    let isSingle = randomInt(2); // 0 or 1
    let syllable = syllableGenerator();
    
    lastTwoSyllable.shift();
    lastTwoSyllable.push(syllable);

    if (
      lastTwoSyllable[0][1] === lastTwoSyllable[1][1]
      && lastTwoSyllable[0][1] === syllable[1]
    ) {
      // if the syllable would be repeated 3 times, regenerate
      syllable = syllableGenerator();
    }

    if ((length - generatedWord.length) > 1) {
      generatedWord += isSingle === 1 ? syllable[1] : syllable;
    } else {
      generatedWord += syllable[1];
    }
  }

  return generatedWord;
};

const showWords = (words, units, mode, sort = SORT.NONE) => {
  wordListDiv.innerHTML = '';

  let wordsArray = [];

  for (let w = 0; w < words; w++) {
    wordsArray.push(MODE[mode](units));
  }

  // FIXME: descending does not work
  if (sort === SORT.ASC) { wordsArray.sort(); }
  if (sort === SORT.DESC) { wordsArray.reverse(); }

  wordsArray.forEach(item => {
    wordListDiv.innerHTML += item + '<br>'
  });
};

regenButton.addEventListener('click', function () {
  showWords(
    countInput.value,
    syllableInput.value,
    generatorMode.value,
    sortInput.value
  );
});
