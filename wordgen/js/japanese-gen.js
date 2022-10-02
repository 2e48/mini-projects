class JapaneseWordGen extends WordGen {
  #characters;
  constructor() {
    super();

    this.#characters = {
      hiragana: {
        "a": "あ", "i": "い", "u": "う", "e": "え", "o": "お",
        "ka": "か", "ki": "き", "ku": "く", "ke": "け", "ko": "こ",
        "ga": "が", "gi": "ぎ", "gu": "ぐ", "ge": "げ", "go": "ご",
        "sa": "さ", "shi": "し", "su": "す", "se": "せ", "so": "そ",
        "za": "ざ", "ji": "じ", "zu": "ず", "ze": "ぜ", "zo": "ぞ",
        "ta": "た", "chi": "ち", "tsu": "つ", "te": "て", "to": "と",
        "da": "だ", "di": "ぢ", "du": "づ", "de": "で", "do": "ど",
        "na": "な", "ni": "に", "nu": "ぬ", "ne": "ね", "no": "の",
        "ha": "は", "hi": "ひ", "fu": "ふ", "he": "へ", "ho": "ほ",
        "ba": "ば", "bi": "び", "bu": "ぶ", "be": "べ", "bo": "ぼ",
        "pa": "ぱ", "pi": "ぴ", "pu": "ぷ", "pe": "ぺ", "po": "ぽ",
        "ma": "ま", "mi": "み", "mu": "む", "me": "め", "mo": "も",
        "ya": "や", "yu": "ゆ", "yo": "よ",
        "ra": "ら", "ri": "り", "ru": "る", "re": "れ", "ro": "ろ",
        "wa": "わ", "wo": "を",
        "n": "ん",
        // "kya": "きゃ", "kyu": "きゅ", "kyo": "きょ",
        // "gya": "ぎゃ", "gyu": "ぎゅ", "gyo": "ぎょ",
        // "sha": "しゃ", "shu": "しゅ", "sho": "しょ",
        // "ja": "じゃ", "ju": "じゅ", "jo": "じょ",
        // "cha": "ちゃ", "chu": "ちゅ", "cho": "ちょ",
        // "nya": "にゃ", "nyu": "にゅ", "nyo": "にょ",
        // "hya": "ひゃ", "hyu": "ひゅ", "hyo": "ひょ",
        // "bya": "びゃ", "byu": "びゅ", "byo": "びょ",
        // "pya": "ぴゃ", "pyu": "ぴゅ", "pyo": "ぴょ",
        // "mya": "みゃ", "myu": "みゅ", "myo": "みょ",
        // "rya": "りゃ", "ryu": "りゅ", "ryo": "りょ",
      },
      katakana: {
        "a": "ア", "i": "イ", "u": "ウ", "e": "エ", "o": "オ",
        "ka": "カ", "ki": "キ", "ku": "ク", "ke": "ケ", "ko": "コ",
        "ga": "ガ", "gi": "ギ", "gu": "グ", "ge": "ゲ", "go": "ゴ",
        "sa": "サ", "shi": "シ", "su": "ス", "se": "セ", "so": "ソ",
        "za": "ザ", "ji": "ジ", "zu": "ズ", "ze": "ゼ", "zo": "ゾ",
        "ta": "タ", "chi": "チ", "tsu": "ツ", "te": "テ", "to": "ト",
        "da": "ダ", "di": "ヂ", "du": "ヅ", "de": "デ", "do": "ド",
        "na": "ナ", "ni": "ニ", "nu": "ヌ", "ne": "ネ", "no": "ノ",
        "ha": "ハ", "hi": "ヒ", "fu": "フ", "he": "ヘ", "ho": "ホ",
        "ba": "バ", "bi": "ビ", "bu": "ブ", "be": "ベ", "bo": "ボ",
        "pa": "パ", "pi": "ピ", "pu": "プ", "pe": "ペ", "po": "ポ",
        "ma": "マ", "mi": "ミ", "mu": "ム", "me": "メ", "mo": "モ",
        "ya": "ヤ", "yu": "ユ", "yo": "ヨ",
        "ra": "ラ", "ri": "リ", "ru": "ル", "re": "レ", "ro": "ロ",
        "wa": "ワ", "wo": "ヲ",
        "n": "ン",
        // "kya": "キャ", "kyu": "キュ", "kyo": "キョ",
        // "gya": "ギャ", "gyu": "ギュ", "gyo": "ギョ",
        // "sha": "シャ", "shu": "シュ", "sho": "ショ",
        // "ja": "ジャ", "ju": "ジュ", "jo": "ジョ",
        // "cha": "チャ", "chu": "チュ", "cho": "チョ",
        // "nya": "ニャ", "nyu": "ニュ", "nyo": "ニョ",
        // "hya": "ヒャ", "hyu": "ヒュ", "hyo": "ヒョ",
        // "bya": "ビャ", "byu": "ビュ", "byo": "ビョ",
        // "pya": "ピャ", "pyu": "ピュ", "pyo": "ピョ",
        // "mya": "ミャ", "myu": "ミュ", "myo": "ミョ",
        // "rya": "リャ", "ryu": "リュ", "ryo": "リョ",
      }
    };
  }

  getRandomCharacter({ type = "hiragana" } = {}) {
    const romanjiList = Object.keys(this.#characters[type]);
    const romanji = romanjiList[this.getRandomInteger(romanjiList.length)];
    const character = this.#characters[type][romanji];

    return {
      romanji, character, type
    };
  }

  getRandomWord({ type = "hiragana", length = 3 } = {}) {
    let romanjiWord = "";
    let japaneseWord = "";

    for (let i = 0; i < length; i++) {
      let characterObj = this.getRandomCharacter({ type });
      romanjiWord += characterObj.romanji;
      japaneseWord += characterObj.character;
    }

    return {
      romanji: romanjiWord,
      japanese: japaneseWord,
      type
    };
  }

  getMultipleWords({ type = "hiragana", length = 3, count = 5 } = {}) {
    let wordsArray = [];

    for (let i = 0; i < count; i++) {
      wordsArray.push(this.getRandomWord({ type, length }));
    }

    return wordsArray;
  }
}

class ObjectJapaneseWordGen extends JapaneseWordGen {
  constructor() {
    super();
  }

  getRandomWord({ type = "hiragana", length = 3 } = {}) {
    let generated = super.getRandomWord({ type, length });

    return {
      lang: "japanese",
      type: generated.type,
      word: generated.romanji,
      alt: generated.japanese,
    };
  }
}