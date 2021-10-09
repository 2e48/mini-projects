// https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Basic_usage
const basicCanvas = document.getElementById('tutorial');
const draw = () => {
  if (basicCanvas.getContext) {
    let ctx = basicCanvas.getContext('2d');

    for (let i = 0; i < 2; i++) {
      const xy = (i * 40) + 10;
      createRect(ctx, xy, xy, 'rgb(200, 0, 0)', 50);
      createRect(ctx, xy + 20, xy + 20, 'rgba(0, 0, 200, 0.5)', 50);
    }
  }
};

const createRect = (ctx, x, y, color, w, h = w) => {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
};

draw();

// https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes
const squares = document.getElementById('squares');
const sqDraw = () => {
  if (squares.getContext) {
    let ctx = squares.getContext('2d');

    ctx.fillRect(25, 25, 100, 100);
    ctx.clearRect(45, 45, 60, 60);
    ctx.strokeRect(50, 50, 50, 50);
  }
};
sqDraw();

const pathTriangle = document.getElementById('triangle');
const trDraw = () => {
  if (pathTriangle.getContext) {
    let ctx = pathTriangle.getContext('2d');

    ctx.beginPath();
    ctx.moveTo(75, 50);
    ctx.lineTo(100, 75);
    ctx.lineTo(100, 25);
    ctx.fill();
  }
};
trDraw();

const grid = document.getElementById('grid');
const gridDraw = () => {
  if (grid.getContext) {
    let ctx = grid.getContext('2d');

    // for (let x = 0; x < 150; x += 10) {
    //   for (let y = 0; y < 150; y += 10) {
    //     ctx.strokeRect(x, y, 10, 10);
    //   }
    // }

    for (let x = 0; x <= grid.width; x += 10) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 150);
    }

    for (let y = 0; y <= grid.height; y += 10) {
      ctx.moveTo(0, y);
      ctx.lineTo(150, y);
    }

    ctx.stroke();
  }
};
gridDraw();


const smiley = document.getElementById('smiley');
const smileDraw = () => {
  if (smiley.getContext) {
    let ctx = smiley.getContext('2d');

    ctx.beginPath();
    ctx.arc(75, 75, 50, 0, Math.PI * 2, true); // Outer circle
    ctx.moveTo(110, 75);
    ctx.arc(75, 75, 35, 0, Math.PI, false);  // Mouth (clockwise)
    ctx.moveTo(65, 65);
    ctx.arc(60, 65, 5, 0, Math.PI * 2, true);  // Left eye
    ctx.moveTo(95, 65);
    ctx.arc(90, 65, 5, 0, Math.PI * 2, true);  // Right eye
    ctx.stroke();
  }
};
smileDraw();
