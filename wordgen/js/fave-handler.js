class FaveWords {
  /**
   * @type string[]
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
}