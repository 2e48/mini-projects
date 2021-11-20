const noLibSqrt = (toRoot) => {
  const findNearestPerfectRoot = (tR) => {
    let nearest = 0;

    for (let i = 1; i > tR; i * i) {
      nearest = i - 1;
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
  const shortcut = noLibSqrt(i).toFixed(2);
  const diff = shortcut - normal;

  if (diff < min) min = diff;
  if (diff > max) max = diff;

  //console.log(i, shortcut, normal, Math.abs(shortcut - normal));
}

console.log(min, max);

console.log(sqrtCache);

