class WordGen {
  #consonants; #vowels;

  constructor() {
    this.#consonants = 'bcdfghjklmnpqrstvwxz';
    this.#vowels = 'aeiouy';
  }

  setLetters(consonants, vowels) {
    this.#consonants = consonants;
    this.#vowels = vowels;
  }

  getRandomInteger(maxNumber) {
    return Math.floor(Math.random() * maxNumber);
  }

  #getRandomVowel() {
    return this.#vowels[this.getRandomInteger(this.#vowels.length)];
  }

  #getRandomConsonant() {
    return this.#consonants[this.getRandomInteger(this.#consonants.length)]
  }

  syllabic(syllables) {
    let generatedWord = '';

    for (let s = 0; s < syllables; s++) {
      generatedWord += this.#getRandomConsonant();
      generatedWord += this.#getRandomVowel();
    }

    return generatedWord;
  }

  natural(length, vowelChance = 20) {
    let generatedWord = '';

    while (generatedWord.length < length) {
      const generateSyllable = () => {
        let lastTwo = generatedWord.slice(-2).split('');
        let randomVowel = this.#getRandomVowel();

        if (lastTwo.length === 2) {
          while (lastTwo.every(v => v === randomVowel)) {
            randomVowel = this.#getRandomVowel();
          }
        }

        return this.#getRandomConsonant() + randomVowel;
      };

      let dice = this.getRandomInteger(100);
      let syllable = generateSyllable();

      if ((length - generatedWord.length) > 1) {
        generatedWord += dice < vowelChance ? syllable[1] : syllable;
      } else {
        generatedWord += syllable[1];
      }
    }

    return generatedWord;
  };
}

class ObjectWordGen extends WordGen {
  constructor() {
    super();
  }

  syllabic(syllables) {
    let generated = super.syllabic(syllables);

    return {
      lang: "standard",
      type: "syllabic",
      word: generated,
    };
  }

  natural(length, vowelChance = 20) {
    let generated = super.natural(length, vowelChance);

    return {
      lang: "standard",
      type: "natural",
      word: generated,
    };
  }
}