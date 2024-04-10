let canvas;
let ctx;

// draw the rectangle
function main() {
  canvas = document.getElementById("cnv1");
  if (!canvas) {
    console.log("Failed to output canvas element");
    return false;
  }

  // gets a 2d rendering
  ctx = canvas.getContext("2d");

  // draw rectangle
  ctx.fillStyle = "rgba(0, 0, 0, 1.0)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  let v1 = new Vector3([2.25, 2.25, 0]);
  drawVector(v1, "red");
}

function drawVector(v, color) {
  ctx.strokeStyle = color;

  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, canvas.height / 2);
  //ctx.lineTo(200+v.elements[0]*20, 200-v.elements[1]*20, v.elements[2]*20);
  ctx.lineTo(200 + v.elements[0] * 20, 200 - v.elements[1] * 20);
  ctx.stroke();
}

function handleDrawEvent() {
  // clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // intialize coords for v1
  let x1 = document.getElementById("v1x-id").value;
  let y1 = document.getElementById("v1y-id").value;

  // intialize coords for v2
  let x2 = document.getElementById("v2x-id").value;
  let y2 = document.getElementById("v2y-id").value;

  // create v1
  let v1 = new Vector3([x1, y1, 0]);
  drawVector(v1, "red");

  // create v2
  let v2 = new Vector3([x2, y2, 0]);
  drawVector(v2, "blue");
}

function handleDrawOperationEvent() {
  // clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // intialize coords for v1
  let x1 = document.getElementById("v1x-id").value;
  let y1 = document.getElementById("v1y-id").value;

  // initialize coords for v2
  let x2 = document.getElementById("v2x-id").value;
  let y2 = document.getElementById("v2y-id").value;

  // create v1
  let v1 = new Vector3([x1, y1, 0]);
  drawVector(v1, "red");

  // create v2
  let v2 = new Vector3([x2, y2, 0]);
  drawVector(v2, "blue");

  // initialize operation and scalar
  let op = document.getElementById("operation-id").value;
  let scalar = document.getElementById("scalar-id").value;

  if (op == "add") {
    v1.add(v2);
    drawVector(v1, "green");
  } else if (op == "sub") {
    v1.sub(v2);
    drawVector(v1, "green");
  } else if (op == "mul") {
    v1.mul(scalar);
    v2.mul(scalar);
    drawVector(v1, "green");
    drawVector(v2, "green");
  } else if (op == "div") {
    v1.div(scalar);
    v2.div(scalar);
    drawVector(v1, "green");
    drawVector(v2, "green");
  } else if (op == "mag") {
    console.log("Magnitude of V1: " + v1.magnitude());
    console.log("Magnitude of V2: " + v2.magnitude());
  } else if (op == "normal") {
    v1.normalize();
    v2.normalize();
    drawVector(v1, "green");
    drawVector(v2, "green");
  } else if (op == "between") {
    angleBetween(v1, v2);
  } else if (op == "area") {
    areaTriangle(v1, v2);
  }
}

function angleBetween(v1, v2) {
  const angleInRadians = Math.acos(
    Vector3.dot(v1, v2) / (v1.magnitude() * v2.magnitude())
  );
  const angleInDegrees = (angleInRadians * (180 / Math.PI)).toFixed(2);
  console.log("Angle:", angleInDegrees);
}

function areaTriangle(v1, v2) {
  let v3 = Vector3.cross(v1, v2);
  console.log("Area of the triangle:", v3.magnitude() / 2);
}
