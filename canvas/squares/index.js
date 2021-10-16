'use strict';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let squares = [];
let colors = ['blue', 'red', 'green',];

function rand(max) {
  return Math.floor(Math.random() * max);
}

function randomColor() {
  let r = rand(255);
  let g = rand(255);
  let b = rand(255);

  return `rgb(${r},${g},${b})`;
}

function init() {
  for (let i = 0; i < 35; i++) {
    let s = Math.max(10, rand(25));

    let sq = new MainSquare(ctx, rand(canvas.width), rand(canvas.height), s, s)
      .setColor(randomColor())
      .setSpeedX(Math.max(1, rand(10)))
      .setSpeedY(Math.max(1, rand(10)));

    if (rand(100) > 49) {
      sq.flipX();
    }

    if (rand(100) > 49) {
      sq.flipY();
    }

    squares.push(sq);
  }
  window.requestAnimationFrame(frameLoop);
}

function frameLoop() {
  update();
  draw();

  window.requestAnimationFrame(frameLoop);
}

function update() {
  squares.forEach((item, index) => {
    squareUpdate(item, 1);
  });
}

function squareUpdate(sq, sp = 1) {
  let x = sq.x;
  let y = sq.y;

  let xBound = canvas.width - sq.w;
  let yBound = canvas.height - sq.h;
  let speedX = sq.speedX;
  let speedY = sq.speedY;

  if (sq.toLeft) {
    if (x > xBound) {
      sq.flipX();
      x -= speedX;
    } else {
      x += speedX;
    }
  } else {
    if (x < 0) {
      sq.flipX();
      x += speedX;
    } else {
      x -= speedX;
    }
  }

  if (sq.downwards) {
    if (y > yBound) {
      sq.flipY();
      y -= speedY;
    } else {
      y += speedY;
    }
  } else {
    if (y < 0) {
      sq.flipY();
      y += speedY;
    } else {
      y -= speedY;
    }
  }

  sq.update(x, y, sq.w, sq.h, sq.color);
}

function draw() {
  //ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  squares.forEach(i => i.draw());
}

init();