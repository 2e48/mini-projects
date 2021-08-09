const consonants = 'bcdfghjklmnpqrstvwxz';
const vowels = 'aeiouy'; // making y as a vowel because it sounds like one

const SORT = {
  NONE: 'none',
  ASC: 'asc',
  DESC: 'desc',
};

const MODE = {
  syllabic: function (syllables) {
    return syllabicWordGen(syllables);
  },
  natural: function (length) {
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

const naturalWordGen = (length, vowelChance = 20) => {
  let generatedWord = '';

  while (generatedWord.length < length) {
    const generateSyllable = () => {
      let lastTwo = generatedWord.slice(-2).split('');
      let randomVowel = vowels[randomInt(vowels.length)];

      if (lastTwo.length === 2) {
        while (lastTwo.every(v => v === randomVowel)) {
          randomVowel = vowels[randomInt(vowels.length)];
        }
      }

      return consonants[randomInt(consonants.length)] + randomVowel;
    };

    let dice = randomInt(100);
    let syllable = generateSyllable();

    if ((length - generatedWord.length) > 1) {
      generatedWord += dice < vowelChance ? syllable[1] : syllable;
    } else {
      generatedWord += syllable[1];
    }
  }

  return generatedWord;
};

const showWords = (words, units, mode, wordListElement, sort = SORT.NONE) => {
  wordListElement.innerHTML = '';

  let wordsArray = [];

  for (let w = 0; w < words; w++) {
    wordsArray.push(MODE[mode](units));
  }

  if (sort === SORT.ASC) {
    wordsArray.sort();
  } else if (sort === SORT.DESC) {
    wordsArray.sort();
    wordsArray.reverse();
  }

  wordsArray.forEach(item => {
    wordListElement.innerHTML += `<span class="generated-word">${item}</span>`;
  });
};
