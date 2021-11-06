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

    this.numberKey = '{{n}}';
    this.userKey = '{{u}}';
    this.separator = ' => ';

    this.siteList = {
      's.d.u': 'safebooru.donmai.us',
      'd.d.u': 'danbooru.donmai.us',
      'w.p.n': 'www.pixiv.net',
      'p.n': 'pixiv.net',
      'm.t.c': 'mobile.twitter.com',
      't.c': 'twitter.com',
      'w.t.c': 'www.twitter.com',
    }
  }

  encode(url, key) {
    this.key = key;
    this.url = url;

    const clue = this.generateClues(this.key, Math.max(2, Math.floor(Math.random() * 5)));
    const link = this.cipherLink(url);

    return `${clue}\n${this.key}\n${link}`;
  }

  decode(code) {
    const [clue, key, link, cipher1, cipher2] = code.split('\n');

    //const 

    //check if link is v1 or v2
    if (link.includes(this.numberKey)) {
      // v2
      const nK = this.numberKey.length + this.separator.length;
      let replaced = link.replace(
        this.numberKey,
        super.decode(cipher1.slice(nK).trim(), key.trim())
      );

      if (replaced.includes(this.userKey)) {
        const uK = this.userKey.length + this.separator.length;
        replaced = replaced.replace(
          this.userKey,
          super.decode(cipher2.slice(uK).trim(), key.trim())
        );
      }

      const fixDomain = replaced.replace(
        /^(?:\w\.){1,2}\w/,
        m => this.siteList[m]
      );

      return `https://${fixDomain}`;
    } else {
      // v1
      const [base, toDecode] = link.split(' => ');
      const domain = base.replace(/^(?:\w\.){1,2}\w/, m => this.siteList[m]);
      const numbers = super.decode(toDecode, key);

      return `https://${domain}${numbers}`;
    }
  }

  cipherLink(link) {
    const url = new URL(link);

    let cipherList = {};

    const minifiedHost = url.hostname.replace(/(\w)\w+/g, '$1');
    let pathnumberCiphered = url.pathname.replace(/\d+/, m => {
      cipherList[this.numberKey] = super.encode(m, this.key);
      return this.numberKey;
    });

    // TODO: have a better system for this handling different urls
    if (url.hostname.includes('twitter')) {
      // twitter hotfix
      const username = new RegExp('/(.*)/status');
      pathnumberCiphered = pathnumberCiphered.replace(username, (m, p1) => {
        cipherList[this.userKey] = super.encode(p1, this.key);
        return `/${this.userKey}/status`;
      });
    }

    let output = `${minifiedHost}${pathnumberCiphered}`;

    for (const property in cipherList) {
      output += `\n${property}${this.separator}${cipherList[property].trim()}`;
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

    return `${firstHalf}${this.separator}${secondHalf}`;
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