'use strict';

const canvas = document.getElementById('canvas!');
const context = canvas.getContext('2d');

const KEY = {
  Z: 90,
  X: 88,
  NUM1: 97,
  NUM3: 99,
};

let input = {
  k1: false,
  k2: false,
  m1: false,
  m2: false,
}

let oldTimeStamp = 0;
let secondsPassed = 0;

let keys = [
  new KeySquare(context, 10, 10, 50, 50, 'k1').setActiveColor('white').setColor('gray'),
  new KeySquare(context, 10, 70, 50, 50, 'k2').setActiveColor('white').setColor('gray'),
  new KeySquare(context, 10, 130, 50, 50, 'm1').setActiveColor('white').setColor('gray'),
  new KeySquare(context, 10, 190, 50, 50, 'm2').setActiveColor('white').setColor('gray'),
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
  const ctx = baseKey.context;

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

  const grd = context.createLinearGradient(0, 0, canvas.width * 0.50, 0);
  grd.addColorStop(0, 'rgba(0,0,0,0)');
  //grd.addColorStop(.5, 'rgba(0,0,0,0.75)');
  grd.addColorStop(1, 'rgba(0,0,0,1)');

  context.fillStyle = grd;
  context.fillRect(0, 0, canvas.width, canvas.height);
}

function clearCanvas() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

document.body.addEventListener('keydown', evt => {
  const code = evt.keyCode;

  switch (code) {
    case KEY.Z: input.k1 = true; break;
    case KEY.X: input.k2 = true; break;
    case KEY.NUM1: input.m1 = true; break;
    case KEY.NUM3: input.m2 = true; break;
  }
});

document.body.addEventListener('keyup', evt => {
  const code = evt.keyCode;

  switch (code) {
    case KEY.Z: input.k1 = false; break;
    case KEY.X: input.k2 = false; break;
    case KEY.NUM1: input.m1 = false; break;
    case KEY.NUM3: input.m2 = false; break;
  }
});

initialize();