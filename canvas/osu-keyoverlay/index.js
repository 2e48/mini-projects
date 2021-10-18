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

function initialize() { }

function frameLoop() { }

function update() { }

function draw() { }

function clearCanvas() { }

document.body.addEventListener('keydown', evt => {
  const code = evt.keyCode;

  switch (code) {
    case KEY.Z: input.k1 = true; break;
    case KEY.X: input.k2 = true; break;
  }

  console.log(input);
});

document.body.addEventListener('keyup', evt => {
  const code = evt.keyCode;

  switch (code) {
    case KEY.Z: input.k1 = false; break;
    case KEY.X: input.k2 = false; break;
  }

  console.log(input);
});