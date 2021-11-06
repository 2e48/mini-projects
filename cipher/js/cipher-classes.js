class CipherUtils {

  removeDupes(text) {
    return [...new Set(text.split(''))].join('').replace(/ /g, '');
  }

  chunk(array, size) {
    if (!array.length) {
      return [];
    }

    const head = array.slice(0, size);
    const tail = array.slice(size);

    return [head, ...this.chunk(tail, size)];
  }

  randomKey(length = 10) {
    let str = '';
    const min = 33;
    const max = 126;

    while (str.length < length) {
      const rK = min + Math.floor(Math.random() * (max - min));
      str += String.fromCharCode(rK);
      str = this.removeDupes(str);
    }

    return str;
  }
}

class KeyIndexed extends CipherUtils {
  constructor() { super(); }

  encode(toEncode, key) {
    const text = toEncode.split('');
    const nKey = this.removeDupes(key);
    let encoded = [];
    text.forEach(c => {
      let charNum = c.charCodeAt(0)
        .toString()
        .padStart(3, '0');

      let encodedLetter = charNum.toString()
        .split('')
        .map(n => nKey.charAt(parseInt(n)))
        .join('');

      encoded.push(encodedLetter);
    });

    return encoded.join('');
  }

  decode(toDecode, key) {
    const text = toDecode.split('');
    const nKey = this.removeDupes(key);

    const toNumbers = text.map(c => nKey.indexOf(c));

    const letters = this.chunk(toNumbers, 3)
      .map(a => String.fromCharCode(parseInt(a.join(''))))
      .join('');

    return letters;
  }

}

class EncryptSauce extends KeyIndexed {
  constructor() {
    super();

    this.key = '';
    this.url = '';
    this.ciphered = '';
  }

  encode(url, key) {
    this.key = key;
    this.url = url;

    const clue = this.generateClues(this.key, Math.max(2, Math.floor(Math.random() * 5)));
    const link = this.cipherLink(url);

    console.log(clue, link);
    return '';
  }

  decode(string) {

  }

  cipherLink(link) {
    const url = new URL(link);

    let cipherList = {};

    const minifiedHost = url.hostname.replace(/(\w)\w+/g, '$1');
    let pathnumberCiphered = url.pathname.replace(/\d+/, m => {
      cipherList['{{n}}'] = super.encode(m, this.key);
      return '{{n}}';
    });

    // TODO: have a better system for this handling different urls
    if (url.hostname.includes('twitter')) {
      // twitter hotfix
      const username = new RegExp('/(.*)/status');
      pathnumberCiphered = pathnumberCiphered.replace(username, (m, p1) => {
        cipherList['{{u}}'] = super.encode(p1, this.key);
        return '/{{u}}/status';
      });
    }

    let output = `${minifiedHost}${pathnumberCiphered}`;

    for (const property in cipherList) {
      output += `\n${property} => ${cipherList[property]}`;
    }

    return output;
  }

  generateClues(key, count = 3) {
    let indexClues = [];

    while (indexClues.length < count) {
      indexClues.push(Math.floor(Math.random() * key.length));
    }

    let pairs = indexClues.map(n => [key.charAt(n), n]);

    let firstHalf = '';
    let secondHalf = '';

    pairs.forEach(a => {
      firstHalf += a[0].toString();
      secondHalf += a[1].toString();
    });

    return `${firstHalf} -> ${secondHalf}`;
  }
}

class KeyRotate extends CipherUtils {
  constructor() { super(); }

  encode(toEncode, key) {
    const text = toEncode.split('');
    const nKey = this.removeDupes(key);

    let encoded = [];
    let keyShift = 0;

    text.forEach((item, index) => {
      let charNum = item.charCodeAt(0)
        .toString()
        .padStart(3, '0');

      let encodedLetter = charNum.split('')
        .map(n => {
          let i = (parseInt(n) + keyShift++) % nKey.length;
          return nKey.charAt(i);
        })
        .join('');

      encoded.push(encodedLetter);
    });

    return encoded.join('');
  }

  decode(toDecode, key) { }
}