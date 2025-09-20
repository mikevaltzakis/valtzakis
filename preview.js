export function drawPreview(canvasId, shape) {
  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const scale = 2;
  const gridSpacing = 20;
  const offsetX = canvas.width / 2;
  const offsetY = canvas.height / 2;

  // Grid
  ctx.strokeStyle = "#eee";
  ctx.lineWidth = 1;
  for (let x = 0; x <= canvas.width; x += gridSpacing) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }
  for (let y = 0; y <= canvas.height; y += gridSpacing) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }

  // Axes
  ctx.strokeStyle = "#999";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(offsetX, 0);
  ctx.lineTo(offsetX, canvas.height);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(0, offsetY);
  ctx.lineTo(canvas.width, offsetY);
  ctx.stroke();

  // Origin marker
  ctx.fillStyle = "#cc0000";
  ctx.beginPath();
  ctx.arc(offsetX, offsetY, 4, 0, 2 * Math.PI);
  ctx.fill();

  // Shape rendering
  ctx.strokeStyle = "#0077cc";
  ctx.lineWidth = 2;
  ctx.beginPath();

  if (shape.type === "rectangle") {
    const w = shape.width * scale;
    const h = shape.height * scale;
    ctx.rect(offsetX - w / 2, offsetY - h / 2, w, h);
  } else if (shape.type === "circle") {
    const r = shape.radius * scale;
    ctx.arc(offsetX, offsetY, r, 0, 2 * Math.PI);
  } else if (shape.type === "keyhole") {
    const r = shape.kh_radius * scale;
    const l = shape.kh_length * scale;
    const w = shape.kh_width * scale;
    ctx.arc(offsetX, offsetY, r, 0, 2 * Math.PI);
    ctx.rect(offsetX - w / 2, offsetY, w, l);
  }

  ctx.stroke();
}
