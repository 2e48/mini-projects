'use strict';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const timeConstant = 10000000000000;

let squares = [];
let colors = ['blue', 'red', 'green',];

let baseTimeStamp = 0;
let secondsPassed = 0;

let reqFrame;

function rand(max) {
  return Math.floor(Math.random() * max);
}

function randomColor() {
  let r = rand(255);
  let g = rand(255);
  let b = rand(255);

  return `rgb(${r},${g},${b})`;
}

function init(reset = false) {
  if (reset) {
    squares = [];

    // for (let i = 0; i < 100; i++) {
    //   squares.push(spawnSquare());
    // }

    squares.push(spawnSquare());
  }

  reqFrame = window.requestAnimationFrame(frameLoop);
}

function spawnSquare() {
  let s = 5;//Math.max(10, rand(25));

  let sq = new MainSquare(ctx, rand(canvas.width), rand(canvas.height), s, s)
    .setColor(randomColor())
    .setSpeedX(Math.max(50, rand(100)))
    .setSpeedY(Math.max(50, rand(100)));

  if (rand(100) > 49) {
    sq.flipX();
  }

  if (rand(100) > 49) {
    sq.flipY();
  }

  return sq;
}

function frameLoop(timeStamp) {
  secondsPassed = (timeStamp - baseTimeStamp) / 1000;
  baseTimeStamp = timeStamp;

  // Move forward in time with a maximum amount
  secondsPassed = Math.min(secondsPassed, 0.1);

  update(secondsPassed);
  draw();

  reqFrame = window.requestAnimationFrame(frameLoop);
}

function update(secondsPassed) {
  squares.forEach((item, index) => {
    squareUpdate(item, secondsPassed);
  });
}

function squareUpdate(sq, timestamp) {
  const progress = timestamp;
  let x = sq.x;
  let y = sq.y;

  let xBound = canvas.width - sq.w;
  let yBound = canvas.height - sq.h;
  let speedX = sq.speedX;
  let speedY = sq.speedY;

  if (sq.toLeft) {
    if (x > xBound) {
      sq.flipX();
      x -= speedX * progress;
    } else {
      x += speedX * progress;
    }
  } else {
    if (x < 0) {
      sq.flipX();
      x += speedX * progress;
    } else {
      x -= speedX * progress;
    }
  }

  if (sq.downwards) {
    if (y > yBound) {
      sq.flipY();
      y -= speedY * progress;
    } else {
      y += speedY * progress;
    }
  } else {
    if (y < 0) {
      sq.flipY();
      y += speedY * progress;
    } else {
      y -= speedY * progress;
    }
  }

  sq.update(x, y, sq.w, sq.h, sq.color);
}

function draw() {
  ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  squares.forEach(i => i.draw());
}

let started = false;
canvas.addEventListener('mouseenter', () => {
  console.log('enter')
  // init(!started);

  // if (!started) started = true;

  squares.push(spawnSquare());
});

canvas.addEventListener('mouseleave', () => {
  // window.cancelAnimationFrame(reqFrame);

  // reqFrame = null;
});

document.getElementById('reset').addEventListener('click', () => {
  started = false;
  init(true);
});

init();