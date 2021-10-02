const REFRESH_RATE = 25; // in ms

let num = 0;
let intervals = {};

const spawnRay = (parentElement) => {
  let ray = document.createElement('div');
  ray.style.position = absolute;
  ray.style.left = parentElement.style.left;
  ray.style.top = parentElement.style.top;
  ray.style.height = parentElement.style.height;
  ray.style.width = '1px';
  ray.style.backgroundColor = 'green';
};
const increaseRayLength = (spawnedRay) => { };
const stopIncreasingRayLength = (ray) => { };
const moveRay = (ray) => { };
const destroyRay = (ray) => { };

// window.fire = function () {
//   var bullet = document.createElement("div");
//   bullet.style.position = "absolute";
//   bullet.style.left = "25px";
//   bullet.style.top = "100px";
//   bullet.style.width = "5px";
//   bullet.style.height = "50px";
//   bullet.style.backgroundColor = "#00ff00";
//   bullet.id = "bullet-" + num;
//   document.body.appendChild(bullet);

//   bulletpos(bullet);
//   num++;
// }



// window.bulletpos = function (bullet) {
//   var bulletX = parseInt(document.getElementById("base").style.left) + 20;
//   var bulletY = parseInt(document.getElementById("base").style.top);

//   bullet.style.left = bulletX + "px";
//   bullet.style.top = bulletY + "px";
//   intervals[bullet.id] = setInterval(function () { bulletmove(bullet) }, 25);

// }

// window.bulletmove = function (bullet) {
//   var bulletX = parseInt(bullet.style.left);
//   bullet.style.left = (bulletX + 5) + "px";

//   if (bulletX > 500) {
//     clearInterval(intervals[bullet.id]);
//     bullet.parentNode.removeChild(bullet);
//   }
// }