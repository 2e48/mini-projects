class Canvas {
  constructor({
    canvas = null,
    elements = [],
  } = {}) {
    this.canvas = null;
    this.context = null;
    this.oldTimeStamp = 0;
    this.keyList = [];

    if (canvas !== null) {
      this.setCanvas(canvas);
    }

    if (elements.length > 0) {
      this.setElements(elements);
    }
  }

  setCanvas(canvas) {
    if (canvas instanceof Element) {
      this.canvas = canvas;
    } else if (typeof canvas === 'string') {
      this.canvas = document.getElementById(canvas);
    } else {
      throw 'provided canvas is not an element or string id';
    }

    this.context = this.canvas.getContext('2d');
  }

  setElements(elements) {
    if (typeof elements !== 'array') {
      throw 'elements is not an array';
    }

    elements.forEach((item, index) => {
      if (!(item instanceof KeyBase)) {
        throw `index ${index} of supplied elements is not a KeyBase object`;
      }

      this.keyList.push(item);
    });
  }

  render() {
    window.requestAnimationFrame(timeStamp => this.renderLoop(timeStamp));
  }

  renderLoop(timeStamp) {
    // Calculate how much time has passed
    let secondsPassed = (timeStamp - this.oldTimeStamp) / 1000;
    this.oldTimeStamp = timeStamp;
  }
}