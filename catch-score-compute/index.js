let HP = 3;
let CS = 4;
let OD = 7;
let objects = 4330 + 2109;
let length = (60 * 45) + 6;

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

const difficulty = (hp, cs, od, objects, drainTime) => {
  let mapSettng = hp + cs + od;
  let clampVals = clamp(objects / drainTime, 0, 16);
  return Math.round((mapSettng + clampVals) / 25 * 5);
};

const score = (hit, combo, modMulti, hp, cs, od, objects, drainTime) => {
  let comboMulti = Math.max(0, combo - 1);
  let diffMulti = difficulty(hp, cs, od, objects, drainTime);

  return hit + hit * ((comboMulti * diffMulti * modMulti) / 25)
};

console.log(difficulty(HP, CS, OD, objects, length));
console.log(score(300, 101, 1, HP, CS, OD, objects, length));


let scoreVal = 0;
for (let index = 0; index <= 9225; index++) {
  scoreVal += score(300, index, 1, HP, CS, OD, objects, length);
}

console.log(scoreVal);