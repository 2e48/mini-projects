'use strict';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let squares = [];
let colors = ['blue', 'red', 'green', 'yellow', 'brown', 'black'];

function rand(max) {
  return Math.floor(Math.random() * max);
}

function init() {
  for (let i = 0; i < 10000; i++) {
    let s = Math.max(10, rand(25));

    let sq = new MainSquare(ctx, rand(canvas.width), rand(canvas.height), s, s)
      .setColor(colors[i % colors.length]);

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
  let speed = sp;

  if (sq.toLeft) {
    if (x > xBound) {
      sq.flipX();
      x -= speed;
    } else {
      x += speed;
    }
  } else {
    if (x < 0) {
      sq.flipX();
      x += speed;
    } else {
      x -= speed;
    }
  }

  if (sq.downwards) {
    if (y > yBound) {
      sq.flipY();
      y -= speed;
    } else {
      y += speed;
    }
  } else {
    if (y < 0) {
      sq.flipY();
      y += speed;
    } else {
      y -= speed;
    }
  }

  sq.update(x, y, sq.w, sq.h, sq.color);
}

function draw() {
  ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  squares.forEach(i => i.draw());
}

init();