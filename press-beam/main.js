const REFRESH_RATE = 25; // in ms
const MOVEMENT_VALUE = 10; // in px
const MAX_X = 2000;
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
  ray.style.left = '50px';
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

      destroyRay(ray);
    }
  }, REFRESH_RATE);
};
const destroyRay = (ray) => {
  ray.parentNode.removeChild(ray);
};

const createRayOnElement = (elem, color) => {
  spawnRay(elem.target, color);
};

const moveRayInElement = (elem) => {
  const rayId = `ray-${elem.target.id}-${rayCount[elem.target.id] - 1}`;
  const lastRay = rays[elem.target.id][rayId];

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
  const spacing = 0;
  const count = 5;
  const start = 10;

  for (let i = 0; i < count; i++) {
    let button = document.createElement('div');
    button.style.top = (start + (spacing * i) + (50 * i)) + 'px';
    button.className = 'bases';
    button.id = 'button-' + i;

    console.log(button.id, 'added');
    parent.appendChild(button);
  }
};

generateElements();
bindElements();
