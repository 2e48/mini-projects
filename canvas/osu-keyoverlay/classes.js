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
  constructor(context, x, y, w, h, name) {
    super(context, x, y, w, h);

    this.activeColor = 'yellow';
    this.isActive = false;
    this.name = name;
  }

  setActiveColor(color) {
    this.activeColor = color;
    return this;
  }

  toggle() {
    this.activate != this.isActive();
    return this;
  }

  activate() {
    this.isActive = true;
  }

  deactivate() {
    this.isActive = false;
  }

  draw() {
    //this.context.fillStyle = this.isActive ? this.activeColor : this.color;

    this.context.fillStyle = this.color;
    this.context.fillRect(this.x, this.y, this.w, this.h);

    if (this.isActive) {
      this.context.strokeStyle = this.activeColor;
      this.context.lineWidth = 7;
      this.context.strokeRect(this.x, this.y, this.w, this.h);
    }
  }
}

class KeyRay extends CanvasObject {
  constructor(context, x, y, w, h) {
    super(context, x, y, w, h);

    this.isGrowing = false;
    this.isMoving = false;
    this.scrollSpeed = 100;
  }

  setScrollSpeed(speed) {
    this.scrollSpeed = speed;
    return this;
  }

  expand() {
    this.isGrowing = true;
    this.isMoving = false;
  }

  move() {
    this.isGrowing = false;
    this.isMoving = true;
  }

  update(timeStamp) {
    if (this.isMoving) {
      this.x += this.scrollSpeed * timeStamp;
    }

    if (this.isGrowing) {
      this.w += this.scrollSpeed * timeStamp;
    }

    super.update(this.x, this.y, this.w, this.h);
  }

  draw() {
    this.context.fillStyle = this.color;
    this.context.fillRect(this.x, this.y, this.w, this.h);
  }
}