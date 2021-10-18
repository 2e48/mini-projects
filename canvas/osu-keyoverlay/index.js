'use strict';

const canvas = document.getElementById('canvas!');
const context = canvas.getContext('2d');

const KEY = {
  Z: 90,
  X: 88,
};

let input = {
  k1: false,
  k2: false,
}

let oldTimeStamp = 0;
let secondsPassed = 0;

let k1 = new KeySquare(context, 10, 10, 50, 50);
let k2 = new KeySquare(context, 10, 70, 50, 50);

let rays = {
  k1: [],
  k2: [],
};

function initialize() {
  window.requestAnimationFrame(frameLoop);
}

function frameLoop(timeStamp) {
  secondsPassed = (timeStamp - oldTimeStamp) / 1000;
  oldTimeStamp = timeStamp;

  update();
  clearCanvas();
  draw();

  window.requestAnimationFrame(frameLoop);
}

function update() {
  if (input.k1) {
    k1.activate();
  } else {
    k1.deactivate();
  }

  if (input.k2) {
    k2.activate();
  } else {
    k2.deactivate();
  }
}

function draw() {
  k1.draw();
  k2.draw();
}

function clearCanvas() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

document.body.addEventListener('keydown', evt => {
  const code = evt.keyCode;

  switch (code) {
    case KEY.Z: input.k1 = true; break;
    case KEY.X: input.k2 = true; break;
  }

  //console.log(input);
});

document.body.addEventListener('keyup', evt => {
  const code = evt.keyCode;

  switch (code) {
    case KEY.Z: input.k1 = false; break;
    case KEY.X: input.k2 = false; break;
  }

  //console.log(input);
});

initialize();