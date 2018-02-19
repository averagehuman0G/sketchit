const socket = io();
const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');

let hue = 0;
//sets the canvas to the full size of your window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
//configurations that could change
ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = '15';

let isDrawing = false;

let x = 0;
let y = 0;

function draw(e) {
  if (!isDrawing) {
    return;
  }

  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  x = e.offsetX;
  y = e.offsetY;
  hue++;
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
}

canvas.addEventListener('mousedown', e => {
  isDrawing = true;
  x = e.offsetX;
  y = e.offsetY;
});

canvas.addEventListener('mouseup', () => {
  isDrawing = false;
});
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseout', () => (isDrawing = false));
