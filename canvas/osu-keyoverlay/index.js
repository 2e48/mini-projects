'use strict';

const canvas = document.getElementById('canvas!');
const context = canvas.getContext('2d');

let oldTimeStamp = 0;
let secondsPassed = 0;

let keys = [
  new KeySquare(context, 10, 10, 50, 50, 'k1').setActiveColor('blue').setColor('gray'),
  new KeySquare(context, 10, 70, 50, 50, 'k2').setActiveColor('red').setColor('gray'),
  new KeySquare(context, 10, 130, 50, 50, 'm1').setActiveColor('red').setColor('gray'),
  new KeySquare(context, 10, 190, 50, 50, 'm2').setActiveColor('blue').setColor('gray'),
];

let rays = {
  k1: [],
  k2: [],
  m1: [],
  m2: [],
};

let hasSpawnedRay = {
  k1: false,
  k2: false,
  m1: false,
  m2: false,
};

function initialize() {
  window.requestAnimationFrame(frameLoop);
}

function frameLoop(timeStamp) {
  secondsPassed = (timeStamp - oldTimeStamp) / 1000;
  oldTimeStamp = timeStamp;

  update(secondsPassed);
  clearCanvas();
  draw();

  window.requestAnimationFrame(frameLoop);
}

function update(secondsPassed) {
  keys.forEach(key => {
    if (input[key.name]) {
      key.activate();

      if (!hasSpawnedRay[key.name]) {
        spawnRay(key).expand();
        hasSpawnedRay[key.name] = true;
      }
    } else {
      key.deactivate();

      if (hasSpawnedRay[key.name]) {
        const latestRay = rays[key.name][rays[key.name].length - 1];
        latestRay.move();
        hasSpawnedRay[key.name] = false;
      }
    }

    rays[key.name].forEach((ray, index) => {
      if (ray.x > canvas.width + key.x + key.w) {
        rays[key.name].shift();
      } else {
        ray.update(secondsPassed);
      }
    });
  });
}

function spawnRay(baseKey) {
  const key = baseKey.name;
  const x = baseKey.x + baseKey.w;
  const y = baseKey.y;
  const w = 0;
  const h = baseKey.h;

  const ray = new KeyRay(context, x, y, w, h)
    .setColor(baseKey.activeColor)
    .setScrollSpeed(500);

  rays[key].push(ray);

  return ray;
}

function draw() {
  keys.forEach(key => {
    key.draw();

    rays[key.name].forEach(ray => ray.draw());
  });

  drawGradient();
}

function drawGradient() {
  const grd = context.createLinearGradient(0, 0, canvas.width * 0.50, 0);
  grd.addColorStop(0, 'rgba(0,0,0,0)');
  grd.addColorStop(1, 'rgba(0,0,0,1)');

  context.fillStyle = grd;
  context.fillRect(0, 0, canvas.width, canvas.height);
}

function clearCanvas() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

initialize();