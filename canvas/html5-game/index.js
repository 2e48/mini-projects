'use strict';
let canvas;
let context;

let switchCounter = 0;
let movingSpeed = 10;
let secondsPassed = 0;
let oldTimeStamp = 0;
let fps = 0;
let globalTimeStamp = 0;

// objects
let box = {
  x: 0,
  y: 0,
  width: 100,
  height: 100,
  draw: function () {
    context.fillStyle = 'pink';
    context.fillRect(this.x, this.y, this.width, this.height);
  },
  update: function ({
    x = this.x,
    y = this.y,
    width = this.width,
    height = this.height,
  }) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
};

// start draw logic
window.onload = init;

function init() {
  // Get a reference to the canvas
  canvas = document.getElementById('canvas');
  context = canvas.getContext('2d');

  window.requestAnimationFrame(gameLoop);
}

function gameLoop(timeStamp) {
  globalTimeStamp = timeStamp
  // Calculate the number of seconds passed since the last frame
  secondsPassed = (timeStamp - oldTimeStamp) / 1000;
  oldTimeStamp = timeStamp;

  update(secondsPassed);
  draw();

  window.requestAnimationFrame(gameLoop);
}

function update(secondsPassed) {
  let x = box.x % canvas.width;
  let y = box.y % canvas.height;
  let w = box.width % 55;
  let h = box.height % 78;

  let xSpeed = 320 * secondsPassed;
  let ySpeed = 82 * secondsPassed;
  let wSpeed = 456 * secondsPassed;
  let hSpeed = 81 * secondsPassed;

  box.update({
    x: (x + xSpeed),
    y: (y + ySpeed),
    width: (w + wSpeed),
    height: (h + hSpeed),
  });
}

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  box.draw();

  drawFps(globalTimeStamp);
}

function drawFps(timeStamp) {
  // Calculate fps
  fps = Math.round(1 / secondsPassed);

  // Draw number to the screen
  // context.fillStyle = 'white';
  // context.fillRect(0, 0, 200, 100);
  context.font = '25px Arial';
  context.fillStyle = 'black';
  context.fillText("FPS: " + fps, 10, 30);
}