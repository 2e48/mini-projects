class KeyRay extends KeyObject {
  constructor(context, x, y, w, h) {
    super(context, x, y, w, h);

    this.color = 'yellow';
    this.rayArray = [];

    this.centeredX = this.x - (this.width / 2);
    this.centeredY = this.y - (this.height / 2);

    this.isSpawningRay = false;
  }

  draw() {
    this.context.fillStyle = this.color;

    this.context.fillRect(this.x, this.centeredY, this.width, this.height);
  }

  update(secondsPassed) {
    // TODO: find better way to spawnrays without overlapping rapidly
    // and to create and move said rays
    if (this.isSpawningRay) {
      this.rayArray.push(
        new KeyRay(
          this.context,
          this.x + this.width,
          this.centeredY,
          0,
          this.height * 0.8
        )
      );
    } else {
      this.rayArray.shift();
    }
  }
}