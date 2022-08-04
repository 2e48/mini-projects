const testArray = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];


const rotateCCW = function (array) {
  let newArray = [[], [], []];

  newArray[0][0] = array[2][0];
  newArray[0][1] = array[1][0];
  newArray[0][2] = array[0][0];

  newArray[1][0] = array[2][1];
  newArray[1][1] = array[1][1];
  newArray[1][2] = array[0][1];

  newArray[2][0] = array[2][2];
  newArray[2][1] = array[1][2];
  newArray[2][2] = array[0][2];

  return newArray;
};

const base = testArray;
const b = rotateCCW(testArray);
const c = rotateCCW(b);
const d = rotateCCW(c);

console.log(testArray)
console.log(base)
console.log(b)
console.log(c)
console.log(d)