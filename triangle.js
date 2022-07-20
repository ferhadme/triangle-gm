const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let mouseX;
let mouseY;
let closeEnough = 6;

let drag = false;
let dragF = false;
let dragS = false;
let dragT = false;

let firstP = {};
let secondP = {};
let thirdP = {};

let toggleMovement = false;


function init() {
    canvas.addEventListener("mousedown", mouseDown, false);
    canvas.addEventListener("mouseup", mouseUp, false);
    canvas.addEventListener("mousemove", mouseMove, false);

    writePointCoords(firstP, 200, 200);
    writePointCoords(secondP, 400, 50);
    writePointCoords(thirdP, 400, 300);

    drawTriangle();
}

function writePointCoords(point, x, y) {
    point.x = x;
    point.y = y;
}

function drawTriangle() {
    ctx.beginPath();
    ctx.moveTo(firstP.x, firstP.y);
    ctx.lineTo(secondP.x, secondP.y);
    ctx.lineTo(thirdP.x, thirdP.y);
    ctx.closePath();

    ctx.lineWidth = 8;
    ctx.strokeStyle = "#000000";
    ctx.stroke();

    ctx.fillStyle = "#ffffff00";
    ctx.fill();
    drawCircles();
}

function mouseDown(e) {
    mouseX = e.pageX;
    mouseY = e.pageY;

    if (checkCloseEnough(mouseX, firstP.x) && checkCloseEnough(mouseY, firstP.y)) {
        dragF = true;
    } else if (checkCloseEnough(mouseX, secondP.x) && (mouseY, secondP.y)) {
        dragS = true;
    } else if (checkCloseEnough(mouseX, thirdP.x) && (mouseY, thirdP.y)) {
        dragT = true;
    }

    clearCanvas();
}

function checkCloseEnough(point1, point2) {
    return Math.abs(point1 - point2) < closeEnough;
}

function mouseUp(e) {
    dragF = false;
    dragS = false;
    dragT = false;
}

function mouseMove(e) {
    mouseX = e.pageX;
    mouseY = e.pageY;
    if (dragF) {
        firstP.x = mouseX;
        firstP.y = mouseY;
    } else if (dragS) {
        secondP.x = mouseX;
        secondP.y = mouseY;
    } else if (dragT) {
        thirdP.x = mouseX;
        thirdP.y = mouseY;
    }

    clearCanvas();
    drawTriangle();
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawCircle(x, y, radius) {
    ctx.fillStyle = "#FF0000";
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
}

function drawCircles() {
    drawCircle(firstP.x - closeEnough / 2, firstP.y - closeEnough / 2, closeEnough);
    drawCircle(secondP.x - closeEnough / 2, secondP.y - closeEnough / 2, closeEnough);
    drawCircle(thirdP.x - closeEnough / 2, thirdP.y - closeEnough / 2, closeEnough);
}

document.addEventListener("keydown", function() {
    const canvasContainer = document.getElementById("canvas-container");
    if (event.ctrlKey && event.key === 'm') {
        canvasContainer.style.pointerEvents = !toggleMovement ? "none" : "auto";
        toggleMovement = !toggleMovement;
    }
})

init();
