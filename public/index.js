const socket = io();
const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');

window.addEventListener(
  'resize',
  () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  },
  false
);

let hue = 0;
//sets the canvas to the full size of your window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
//configurations that could change
ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = '3';

socket.on('drawing', data => {
  console.log(data);
  const width = canvas.width;
  const height = canvas.height;
  draw(data.x0 * width, data.y0 * height, data.x1 * width, data.y1 * height, false);
});

let isDrawing = false;

const state = {};

function draw(x0, y0, x1, y1, emit) {
  ctx.beginPath();
  ctx.moveTo(x0, y0);
  ctx.lineTo(x1, y1);
  ctx.stroke();
  //updates the color everytime you draw
  hue++;
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  if (!emit) return;

  const width = canvas.width;
  const height = canvas.height;

  socket.emit('drawing', {
    x0: x0 / width,
    y0: y0 / height,
    x1: x1 / width,
    y1: y1 / height,
  });
}

canvas.addEventListener('mousedown', e => {
  isDrawing = true;
  state.x = e.offsetX;
  state.y = e.offsetY;
});

canvas.addEventListener('mouseup', () => {
  isDrawing = false;
});
canvas.addEventListener('mousemove', e => {
  if (!isDrawing) return;
  draw(state.x, state.y, e.clientX, e.clientY, true);
  state.x = e.clientX;
  state.y = e.clientY;
});

canvas.addEventListener('mouseout', () => (isDrawing = false));
