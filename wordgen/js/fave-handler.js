class WordList {
  /**
   * @type string[] | Object[]
   */
  #wordList;

  constructor() {
    this.clearAll();
  }

  clearAll() {
    this.#wordList = [];
  }

  add(word) {
    this.#wordList.push(word);
  }

  exists(word) {
    return this.#wordList.includes(word);
  }

  remove(word) {
    if (this.exists(word)) {
      const index = this.#wordList.indexOf(word);

      this.#wordList.splice(index, 1);

      return true;
    }

    return false;
  }

  listAll() {
    return this.#wordList;
  }

  overwriteArray(array) {
    this.#wordList = array;
  }
}

class FaveWords extends WordList {
  constructor() {
    super();
  }

  exists(word) {
    const count = this.listAll().filter(item => item.word === word).length;

    return count > 0;
  }

  remove(word) {
    const array = this.listAll().filter(i => i.word !== word);

    this.overwriteArray(array);
  }
}