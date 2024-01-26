const tableBody = document.getElementById("table-content");
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

for (let i = 1; i <= maxCacheSize ** 2; i++) {
  const normal = Math.sqrt(i).toFixed(2);
  const shortcut = shortcutSqrt(i).toFixed(2);
  const noLib = noLibSqrt(i).toFixed(2);
  const diff = shortcut - normal;

  const row = document.createElement('tr');

  const tdNum = document.createElement('td');
  tdNum.innerText = i;
  const tdNormal = document.createElement('td');
  tdNormal.innerHTML = normal;
  const tdShortcut = document.createElement('td');
  tdShortcut.innerHTML = shortcut;
  const tdNoLib = document.createElement('td');
  tdNoLib.innerHTML = noLib;
  const tdDiff = document.createElement('td');
  tdDiff.innerHTML = diff.toFixed(2);

  row.appendChild(tdNum);
  row.appendChild(tdNormal);
  row.appendChild(tdShortcut);
  row.appendChild(tdNoLib);
  row.appendChild(tdDiff);
  tableBody.appendChild(row);
}

function element(name) { 
  return document.createElement(name);
}

console.log(min, max);

console.log(sqrtCache);

