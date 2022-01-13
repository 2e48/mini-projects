// utility functions
const faveWordListDiv = document.getElementById('fave-words');
const faveHandler = new FaveWords();

const appendWordsTo = function (element, word, hasFunction = true, onClickFunc = 'faveWord(this);') {
  const span = document.createElement('span');
  span.className = "generated-word";
  span.innerHTML = word;

  if (hasFunction) {
    span.setAttribute('onclick', onClickFunc);
  }

  element.appendChild(span);
};

const faveWord = function (elem) {
  const word = elem.textContent;

  if (!faveHandler.exists(word)) {
    faveHandler.add(word);
    appendWordsTo(faveWordListDiv, word, true, 'unfaveWord(this);');
  }
};

const unfaveWord = function (elem) {
  const word = elem.textContent;
  faveHandler.remove(word);
  elem.parentElement.removeChild(elem);
};

// english words generator
const wordListDiv = document.getElementById('english-random-words');
const regenButton = document.getElementById('random-words');
const unitInput = document.getElementById('units');
const countInput = document.getElementById('count');
const sortInput = document.getElementById('sort-mode');
const generatorMode = document.getElementById('generator-mode');

regenButton.addEventListener('click', function () {
  showWords(
    countInput.value,
    unitInput.value,
    generatorMode.value,
    wordListDiv,
    sortInput.value
  );
});

const SORT = {
  NONE: 'none',
  ASC: 'asc',
  DESC: 'desc',
};

const showWords = (words, units, mode, wordListElement, sort = SORT.NONE) => {
  const wordgen = new WordGen();
  const MODE = {
    syllabic: function (syllables) {
      return wordgen.syllabic(syllables);
    },
    natural: function (length) {
      return wordgen.natural(length);
    }
  };
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
    appendWordsTo(wordListDiv, item);
  });
};

// japanese words generator
const japAlphabetType = document.getElementById("japanese-alphabet-type");
const japWordListDiv = document.getElementById("japanese-random-words");
const japWordLength = document.getElementById("japanese-syllable");
const japWordCount = document.getElementById("japanese-count");
const japGenButton = document.getElementById("random-japanese-words");

japGenButton.addEventListener("click", function () {
  showJapWords(
    japAlphabetType.value,
    japWordLength.value,
    japWordCount.value,
    japWordListDiv
  );
});

const japWordGen = new JapaneseWordGen();
const showJapWords = (type, length, count, outputDiv) => {
  outputDiv.innerHTML = "";
  const japWordList = japWordGen.getMultipleWords({ type, length, count });

  japWordList.forEach(obj => {
    appendWordsTo(outputDiv, `${obj.romanji} (${obj.japanese})`);
  });
};
// visibility toggle
const mainDivs = document.getElementsByClassName("generators");
const hideOtherDivs = (elementNotToHide = "") => {
  for (let elem of mainDivs) {
    if (elem.id === elementNotToHide) {
      elem.classList.remove("hidden");
    } else {
      elem.classList.add("hidden");
    }
  }
};

const bindFunctionsToButtons = () => {
  const buttons = document.getElementsByClassName("top-buttons");
  for (let butt of buttons) {
    butt.addEventListener("click", function () {
      hideOtherDivs(this.dataset.showThisElement);
    });
  }
};

bindFunctionsToButtons();