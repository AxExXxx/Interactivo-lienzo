// script.js

const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('color');
const sizePicker = document.getElementById('size');
const clearButton = document.getElementById('clear');
const saveButton = document.getElementById('save');

// Configuración inicial del lienzo
canvas.width = window.innerWidth * 0.8;
canvas.height = window.innerHeight * 0.6;

// Variables para el dibujo
let drawing = false;
let brushColor = colorPicker.value;
let brushSize = sizePicker.value;

// Funciones para dibujar
const startDrawing = (e) => {
  drawing = true;
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
};

const draw = (e) => {
  if (!drawing) return;
  ctx.lineWidth = brushSize;
  ctx.lineCap = 'round';
  ctx.strokeStyle = brushColor;
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
};

const stopDrawing = () => {
  drawing = false;
  ctx.closePath();
};

// Eventos del canvas
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

// Cambiar color y tamaño del pincel
colorPicker.addEventListener('input', (e) => (brushColor = e.target.value));
sizePicker.addEventListener('input', (e) => (brushSize = e.target.value));

// Limpiar el lienzo
clearButton.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Guardar el dibujo
saveButton.addEventListener('click', () => {
  const link = document.createElement('a');
  link.download = 'mi_dibujo.png';
  link.href = canvas.toDataURL();
  link.click();
});
