class CanvasObject {
  constructor(context, x, y, w, h) {
    this.context = context;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.color = 'black';
  }

  setColor(color) {
    this.color = color;
    return this;
  }

  update(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
}

class KeySquare extends CanvasObject {
  constructor(context, x, y, w, h) {
    super(context, x, y, w, h);

    this.activeColor = 'yellow';
    this.isActive = false;
  }

  setActiveColor(color) {
    this.activeColor = color;
  }

  toggle() {
    this.activate != this.isActive();
  }

  activate() {
    this.isActive = true;
  }

  deactivate() {
    this.isActive = false;
  }

  draw() {
    this.context.fillStyle = this.isActive ? this.activeColor : this.color;
    this.context.fillRect(this.x, this.y, this.h, this.w);
  }
}