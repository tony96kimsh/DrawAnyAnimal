const canvas = document.getElementById("drawingCanvas");
const ctx = canvas.getContext("2d");
const customCursor = document.getElementById("customCursor");

let drawing = false;
let currentColor = "#000000";
let brushSize = 5;
let opacity = 1.0;
let isEraser = false;

function setupCanvas(canvas) {
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  canvas.style.width = rect.width + "px";
  canvas.style.height = rect.height + "px";
  ctx.scale(dpr, dpr);
}
setupCanvas(canvas);

function setColor(color) {
  currentColor = color;
  document.getElementById("brushColor").value = color;
}

function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function getMousePos(e) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  };
}

function updateCursor(clientX, clientY) {
  const size = brushSize;
  customCursor.style.width = `${size}px`;
  customCursor.style.height = `${size}px`;
  customCursor.style.borderRadius = "50%";
  customCursor.style.left = `${clientX - size / 2}px`;
  customCursor.style.top = `${clientY - size / 2}px`;
  customCursor.style.position = "fixed";
  customCursor.style.pointerEvents = "none";
  customCursor.style.zIndex = "9999";
  if (isEraser) {
    customCursor.style.backgroundColor = "#ffffff";
    customCursor.style.border = "1px solid #ccc";
  } else {
    customCursor.style.backgroundColor = currentColor;
    customCursor.style.border = "none";
    customCursor.style.opacity = opacity;
  }
}

canvas.addEventListener("mousemove", (e) => {
  const pos = getMousePos(e);
  updateCursor(e.clientX, e.clientY);
  if (!drawing) customCursor.classList.remove("hidden");
});

canvas.addEventListener("mousedown", (e) => {
  drawing = true;
  const pos = getMousePos(e);
  ctx.beginPath();
  ctx.moveTo(pos.x, pos.y);
//   customCursor.classList.add("hidden");
});

canvas.addEventListener("mousemove", (e) => {
  if (!drawing) return;
  const pos = getMousePos(e);
  ctx.lineTo(pos.x, pos.y);
  ctx.strokeStyle = isEraser ? "#ffffff" : hexToRgba(currentColor, opacity);
  ctx.lineWidth = brushSize;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.globalAlpha = 1.0;
  ctx.stroke();
});

canvas.addEventListener("mouseup", () => {
  drawing = false;
  ctx.closePath();
  customCursor.classList.remove("hidden");
});

canvas.addEventListener("mouseleave", () => {
  drawing = false;
  ctx.closePath();
  customCursor.classList.add("hidden");
});

const sizeInput = document.getElementById("brushSize");
const opacityInput = document.getElementById("brushOpacity");
const colorPicker = document.getElementById("brushColor");
const eraserBtn = document.getElementById("eraserToggle");
const clearBtn = document.getElementById("clearCanvas");

sizeInput.addEventListener("input", () => brushSize = parseInt(sizeInput.value));
opacityInput.addEventListener("input", () => opacity = parseFloat(opacityInput.value));
colorPicker.addEventListener("input", () => setColor(colorPicker.value));

eraserBtn.addEventListener("click", () => {
  isEraser = !isEraser;
  eraserBtn.textContent = isEraser ? "✏️ 지우가 끄기" : "🪼 지우가 켜기";
});

clearBtn.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});