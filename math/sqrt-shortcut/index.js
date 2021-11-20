const maxCacheSize = 50;

let sqrtCache = [];

for (let i = 1; i <= maxCacheSize; i++) {
  sqrtCache.push(i ** 2);
}

const shortcutSqrt = (toRoot) => {
  const nearestPerfectRoot = Math.sqrt(sqrtCache.find(e => toRoot < e)) - 1;
  const difference = toRoot - (nearestPerfectRoot ** 2);
  const denominator = nearestPerfectRoot * 2;

  return nearestPerfectRoot + (difference / denominator);
};

const noLibSqrt = (toRoot) => {
  const findNearestPerfectRoot = (toRoot) => {
    let nearest = 0;

    for (let i = 1; true; i++) {
      if (i * i > toRoot) {
        nearest = i - 1;

        break;
      }
    }

    return nearest;
  };
  const nPRVal = findNearestPerfectRoot(toRoot);
  const difference = toRoot - (nPRVal * nPRVal);
  const denominator = nPRVal * 2;

  return nPRVal + (difference / denominator);
};

let min = 0;
let max = 0;

for (let i = 0; i < maxCacheSize ** 2; i++) {
  const normal = Math.sqrt(i).toFixed(2);
  const shortcut = shortcutSqrt(i).toFixed(2);
  const noLib = noLibSqrt(i).toFixed(2);
  const diff = shortcut - normal;

  if (diff < min) min = diff;
  if (diff > max) max = diff;

  console.log(shortcut, noLib);
  //console.log(i, shortcut, normal, Math.abs(shortcut - normal));
}

console.log(min, max);

console.log(sqrtCache);

