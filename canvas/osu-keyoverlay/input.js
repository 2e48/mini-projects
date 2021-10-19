const KEY = {
  Z: 90,
  X: 88,
  NUM1: 97,
  NUM3: 99,
};

let input = {
  k1: false,
  k2: false,
  m1: false,
  m2: false,
};

document.body.addEventListener('keydown', evt => {
  const code = evt.keyCode;

  switch (code) {
    case KEY.Z: input.k1 = true; break;
    case KEY.X: input.k2 = true; break;
    case KEY.NUM1: input.m1 = true; break;
    case KEY.NUM3: input.m2 = true; break;
  }
});

document.body.addEventListener('keyup', evt => {
  const code = evt.keyCode;

  switch (code) {
    case KEY.Z: input.k1 = false; break;
    case KEY.X: input.k2 = false; break;
    case KEY.NUM1: input.m1 = false; break;
    case KEY.NUM3: input.m2 = false; break;
  }
});