class CanvasObject {
  constructor(context, x, y, w, h, color = 'black') {
    this.context = context;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color || 'black';
  }

  setColor(color) {
    this.color = color;

    return this;
  }

  update(x, y, w, h, color) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
  }

  draw() {
    this.context.fillStyle = this.color;
    this.context.fillRect(this.x, this.y, this.w, this.h);
  }
}

class Square extends CanvasObject {
  constructor(context, x, y, w, h) {
    super(context, x, y, w, h);

    this.toLeft = true;
    this.downwards = true;
    this.speedX = 1;
    this.speedY = 1;
  }

  setSpeedX(speed) {
    this.speedX = speed;
    return this;
  }

  setSpeedY(speed) {
    this.speedY = speed;
    return this;
  }

  flipX() {
    this.toLeft = !this.toLeft;
    return this;
  }

  flipY() {
    this.downwards = !this.downwards;
    return this;
  }
}

class SquareRay extends CanvasObject {
  constructor(context, x, y, w, h) {
    super(context, x, y, w, h);
  }
}
