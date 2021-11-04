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