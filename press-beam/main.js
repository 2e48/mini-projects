const REFRESH_RATE = 16.6667; // in ms
const MOVEMENT_VALUE = 5; // in px
const MAX_X = 400;
const RAY_MIN_WIDTH = 1;

// new
let rayCount = {};
let rays = {};
let rayIntervals = {
  size: {},
  move: {},
};

const spawnRay = (parentElement, rayColor = 'green') => {
  let elementCounter = rayCount[parentElement.id];

  if (isNaN(elementCounter)) {
    rayCount[parentElement.id] = 0;
  }

  rays[parentElement.id] = {};

  let ray = document.createElement('div');
  ray.style.position = 'absolute';
  ray.style.left = '60px';
  ray.style.top = parentElement.offsetTop + 'px';
  ray.style.height = parentElement.offsetHeight + 'px';
  ray.style.width = '0px';
  ray.style.backgroundColor = rayColor;
  ray.id = `ray-${parentElement.id}-${rayCount[parentElement.id]}`;
  document.body.appendChild(ray);

  rays[parentElement.id][ray.id] = ray;

  increaseRayLength(ray);

  rayCount[parentElement.id]++;
};
const increaseRayLength = (ray) => {
  rayIntervals.size[ray.id] = setInterval(() => {
    let rayWidth = parseInt(ray.style.width) + MOVEMENT_VALUE;

    if (rayWidth < MAX_X) {
      ray.style.width = rayWidth + 'px';
    }

  }, REFRESH_RATE);
};
const stopIncreasingRayLength = (ray) => {
  clearInterval(rayIntervals.size[ray.id]);
};
const moveRay = (ray) => {
  rayIntervals.move[ray.id] = setInterval(() => {
    let rayX = parseInt(ray.style.left) + MOVEMENT_VALUE;
    let rayWidth = parseInt(ray.style.width);

    ray.style.left = rayX + 'px';

    if (rayX > MAX_X) {
      clearInterval(rayIntervals.move[ray.id]);
      delete rayIntervals.move[ray.id];
      destroyRay(ray);
    }
  }, REFRESH_RATE);
};
const destroyRay = (ray) => {
  ray.parentNode.removeChild(ray);
};

const createRayOnElement = (elem, color = 'green') => {
  spawnRay(elem, color);
};

const moveRayInElement = (elem) => {
  const rayId = `ray-${elem.id}-${rayCount[elem.id] - 1}`;
  const lastRay = rays[elem.id][rayId];

  stopIncreasingRayLength(lastRay);
  moveRay(lastRay);
};

const bindElements = () => {
  const elements = document.getElementsByClassName('bases');

  const colors = [
    'pink', 'blue', 'yellow', 'white', 'green'
  ];

  // bind elements
  for (const element of elements) {
    const randomColor = colors[
      Math.floor(
        Math.random() * colors.length
      )
    ];

    element.addEventListener('mouseenter', (elem) => createRayOnElement(elem, randomColor));
    element.addEventListener('mouseleave', (elem) => moveRayInElement(elem));
  }
};

const generateElements = () => {
  const parent = document.getElementById('button-holders');
  const spacing = 5;
  const count = 3;
  const start = 10;

  for (let i = 0; i < count; i++) {
    let button = document.createElement('div');
    button.style.top = (start + (spacing * i) + (50 * i)) + 'px';
    button.className = 'bases';
    button.id = 'button-' + i;

    // console.log(button.id, 'added');
    parent.appendChild(button);
  }
};

generateElements();
//bindElements();

const isPressed = {
  'z': false,
  'x': false,
  'c': false,
}

document.body.addEventListener('keypress', (keyEvent) => {
  const keyBind = {
    'z': document.getElementById('button-0'),
    'x': document.getElementById('button-1'),
    'c': document.getElementById('button-2'),
  }

  const color = {
    'z': 'yellow',
    'x': 'green',
    'c': 'yellow',
  }

  const keys = ['z', 'x', 'c'];
  if (!keys.includes(keyEvent.key)) {
    return;
  }

  if (isPressed[keyEvent.key]) {
    return;
  }

  isPressed[keyEvent.key] = true;
  // console.log('spawning', keyEvent.key, isPressed[keyEvent.key]);

  keyBind[keyEvent.key].classList.add('active');
  createRayOnElement(keyBind[keyEvent.key], '#bbd8ff');
});

document.body.addEventListener('keyup', (keyEvent) => {
  const keyBind = {
    'z': document.getElementById('button-0'),
    'x': document.getElementById('button-1'),
    'c': document.getElementById('button-2'),
  }

  const keys = ['z', 'x', 'c'];
  if (!keys.includes(keyEvent.key)) {
    return;
  }
  isPressed[keyEvent.key] = false;
  // console.log('moving', keyEvent.key, isPressed[keyEvent.key]);

  keyBind[keyEvent.key].classList.remove('active');
  moveRayInElement(keyBind[keyEvent.key]);
});