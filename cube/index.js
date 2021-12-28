
const moves = ['U', 'L', 'R', 'D', 'F', 'B',];
const rotation = ["", "'" /*prime*/, "2"];

const randMove = () => {
  const m = moves[Math.floor(Math.random() * moves.length)];
  const r = rotation[Math.floor(Math.random() * rotation.length)];

  return `${m}${r}`;
};

const getScramble = (length) => {
  let moveArray = [];

  // do scramble
  for (let i = 0; i < length; i++) {
    let pickedMove = randMove();

    // get last move's face
    const lastMove = moveArray[moveArray.length - 1];

    // check if last move has a value, then
    // check if lastMove's face is the same as pickedMove's face
    while (lastMove && lastMove[0] === pickedMove[0]) {
      // in a while loop to absolutely prevent it from happening
      pickedMove = randMove();
    }

    moveArray.push(pickedMove);
  }

  return moveArray;
};

const getScrambleArray = (count = 5, length = 5) => {
  let scrambles = [];

  for (let i = 0; ++i < count;) {
    scrambles.push(getScramble(length));
  }

  return scrambles;
};

const outputScrambles = (count = 5, length = 5) => {
  const outputArea = document.getElementById('out');

  let scrambles = getScrambleArray(count, length);

  outputArea.innerHTML = '';

  scrambles.forEach(set => {
    outputArea.innerHTML += set.join(' ') + '<br>';
  });
};

const countElem = document.getElementById('count');
const lengthElem = document.getElementById('length');

document.getElementById('gen').addEventListener('click', function () {
  outputScrambles(countElem.value, lengthElem.value);
});