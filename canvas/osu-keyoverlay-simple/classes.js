class CanvasObject {
  constructor(context, x, y, w, h) {
    this.context = context;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  draw(color) {
    this.context.fillStyle = color;
    this.context.fillRect(this.x, this.y, this.w, this.h);
  }
}

class MainSquare extends CanvasObject {
  constructor(context, x, y, w, h) {
    super(context, x, y, w, h);
  }
}

class SquareRay extends CanvasObject {
  constructor(context, x, y, w, h) {
    super(context, x, y, w, h);
  }
}
