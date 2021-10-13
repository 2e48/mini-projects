'use strict';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const colors = [
  'red', 'blue', 'magenta', 'yellow', 'green', 'purple', 'orange'
];

let squareArrays = [];

for (let i = 0; i < 100; i++) {
  squareArrays.push(
    new MainSquare(ctx, i * 10, 3, 50, 50)
  );
}

function draw() {
  squareArrays.forEach((item, index) => {
    item.draw(colors[index % colors.length]);
  });
}

draw();