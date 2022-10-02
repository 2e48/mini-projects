// utility functions
const faveWordListDiv = document.getElementById('fave-words');
const faveHandler = new FaveWords();

const appendWordsTo = function ({
  element,
  word,
  data,
  hasFunction = true,
  onClickFunc = 'faveWord(this);',
} = {}) {
  const span = document.createElement('span');
  span.className = "generated-word";
  span.innerHTML = word;
  span.dataset.wordObject = JSON.stringify(data);

  if (hasFunction) {
    span.setAttribute('onclick', onClickFunc);
  }

  element.appendChild(span);
};

const faveWord = function (elem) {
  const dataObj = JSON.parse(elem.dataset.wordObject);
  let word = dataObj.word;

  if (dataObj.lang !== "standard" && japShowRaw.checked) {
    word += ` (${dataObj.alt})`;
  }

  if (!faveHandler.exists(dataObj.word)) {
    faveHandler.add(dataObj);
    appendWordsTo({
      element: faveWordListDiv,
      word: word,
      data: dataObj,
      onClickFunc: 'unfaveWord(this);',
    });
  }

  console.log(faveHandler.listAll());
};

const unfaveWord = function (elem) {
  const dataObj = JSON.parse(elem.dataset.wordObject);
  let word = dataObj.word;
  faveHandler.remove(word);
  elem.parentElement.removeChild(elem);
};

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
  const wordgen = new ObjectWordGen();
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
    appendWordsTo({
      element: wordListDiv,
      word: item.word,
      data: item,
    });
  });
};

// japanese words generator
const japAlphabetType = document.getElementById("japanese-alphabet-type");
const japWordListDiv = document.getElementById("japanese-random-words");
const japWordLength = document.getElementById("japanese-syllable");
const japWordCount = document.getElementById("japanese-count");
const japGenButton = document.getElementById("random-japanese-words");
const japShowRaw = document.getElementById("japanese-show-raw");

japGenButton.addEventListener("click", function () {
  showJapWords(
    japAlphabetType.value,
    japWordLength.value,
    japWordCount.value,
    japWordListDiv
  );
});

const japWordGen = new ObjectJapaneseWordGen();
let japWordList = [];

const iterateJapWordList = (list, isShowingRaw, outputDiv) => {
  list.forEach(obj => {
    let string = obj.word;

    if (obj.lang !== "standard") {
      string = isShowingRaw ? `${obj.word} (${obj.alt})` : `${obj.word}`;
    }

    appendWordsTo({
      element: outputDiv,
      word: string,
      data: obj,
    });
  });
};

const showJapWords = (type, length, count, outputDiv) => {
  outputDiv.innerHTML = "";
  japWordList = japWordGen.getMultipleWords({ type, length, count });

  const isShowingRaw = japShowRaw.checked;
  iterateJapWordList(japWordList, isShowingRaw, outputDiv);
};

const updateDisplayedWords = () => {
  japWordListDiv.innerHTML = "";
  faveWordListDiv.innerHTML = "";
  // TODO: rewrite the fave list to support objects

  const isShowingRaw = japShowRaw.checked;
  iterateJapWordList(japWordList, isShowingRaw, japWordListDiv);
  iterateJapWordList(faveHandler.listAll(), isShowingRaw, faveWordListDiv);
};
japShowRaw.addEventListener("click", updateDisplayedWords);

const bindFunctionsToButtons = () => {
  const buttons = document.getElementsByClassName("top-buttons");
  for (let butt of buttons) {
    butt.addEventListener("click", function () {
      hideOtherDivs(this.dataset.showThisElement);
    });
  }
};

bindFunctionsToButtons();