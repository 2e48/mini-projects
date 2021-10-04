const REFRESH_RATE = 25; // in ms
const MOVEMENT_VALUE = 10; // in px
const MAX_X = 500;
const RAY_MIN_WIDTH = 1;

const element = document.getElementById('base');
const element2 = document.getElementById('base-2');
const element3 = document.getElementById('base-3');

// new
let rayCount = {};
let rays = {};
let rayIntervals = {
  size: {},
  move: {},
};

const spawnRay = (parentElement) => {
  let elementCounter = rayCount[parentElement.id];

  if (isNaN(elementCounter)) {
    rayCount[parentElement.id] = 0;
  }

  rays[parentElement.id] = {};

  let ray = document.createElement('div');
  ray.style.position = 'absolute';
  ray.style.left = '58px';
  ray.style.top = parentElement.offsetTop + 'px'; // since not on the elem itself, via css
  ray.style.height = parentElement.offsetHeight + 'px';
  ray.style.width = RAY_MIN_WIDTH + 'px';
  ray.style.backgroundColor = 'green';
  ray.id = `ray-${parentElement.id}-${rayCount[parentElement.id]}`;
  document.body.appendChild(ray);

  rays[parentElement.id][ray.id] = ray;

  increaseRayLength(ray);

  rayCount[parentElement.id]++;
};
const increaseRayLength = (ray) => {
  rayIntervals.size[ray.id] = setInterval(() => {
    let rayWidth = parseInt(ray.style.width) + MOVEMENT_VALUE;

    if (rayWidth < MAX_X + RAY_MIN_WIDTH + MOVEMENT_VALUE) {
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

    // if (rayWidth > RAY_MIN_WIDTH) {
    //   ray.style.width = (rayWidth - MOVEMENT_VALUE) + 'px';
    // }

    if (rayX > MAX_X) {
      clearInterval(rayIntervals.move[ray.id]);

      destroyRay(ray);
    }
  }, REFRESH_RATE);
};
const destroyRay = (ray) => {
  ray.parentNode.removeChild(ray);
};

const createRayOnElement = (elem) => {
  spawnRay(elem.target);
};

const moveRayInElement = (elem) => {
  const rayId = `ray-${elem.target.id}-${rayCount[elem.target.id] - 1}`;
  const lastRay = rays[elem.target.id][rayId];

  // console.log('count', rayCount[elem.target.id]);
  // console.log('id', rayId);
  // console.log('validation', rays);
  // console.log('leave', lastRay);

  stopIncreasingRayLength(lastRay);
  moveRay(lastRay);
};

element.addEventListener('mouseenter', (elem) => createRayOnElement(elem));
element.addEventListener('mouseleave', (elem) => moveRayInElement(elem));

element2.addEventListener('mouseenter', (elem) => createRayOnElement(elem));
element2.addEventListener('mouseleave', (elem) => moveRayInElement(elem));

element3.addEventListener('mouseenter', (elem) => createRayOnElement(elem));
element3.addEventListener('mouseleave', (elem) => moveRayInElement(elem));