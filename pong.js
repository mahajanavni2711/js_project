const canvas = document.getElementById("pong");
const context = canvas.getContext("2d");

const paddleWidth = 10, paddleHeight = 100;
const ballRadius = 10;


const paddleA = {
    x: 0,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    dy: 0
};


const paddleB = {
    x: canvas.width - paddleWidth,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    dy: 0
};


const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: ballRadius,
    speed: 4,
    dx: 4 * (Math.random() > 0.5 ? 1 : -1),
    dy: 4 * (Math.random() > 0.5 ? 1 : -1)
};


document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.key === "ArrowUp") paddleB.dy = -8;
    if (e.key === "ArrowDown") paddleB.dy = 8;
    if (e.key === "w") paddleA.dy = -8;
    if (e.key === "s") paddleA.dy = 8;
}

function keyUpHandler(e) {
    if (e.key === "ArrowUp" || e.key === "ArrowDown") paddleB.dy = 0;
    if (e.key === "w" || e.key === "s") paddleA.dy = 0;
}


function drawPaddle(paddle) {
    context.fillStyle = "#FFF";
    context.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
}


function drawBall() {
    context.fillStyle = "#FFF";
    context.beginPath();
    context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    context.fill();
    context.closePath();
}


function movePaddle() {
    // Paddle A (left)
    paddleA.y += paddleA.dy;
    if (paddleA.y < 0) paddleA.y = 0;
    if (paddleA.y + paddleA.height > canvas.height) paddleA.y = canvas.height - paddleA.height;

    // Paddle B (right)
    paddleB.y += paddleB.dy;
    if (paddleB.y < 0) paddleB.y = 0;
    if (paddleB.y + paddleB.height > canvas.height) paddleB.y = canvas.height - paddleB.height;
}


function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

   
    if (ball.y - ball.radius <= 0 || ball.y + ball.radius >= canvas.height) {
        ball.dy = -ball.dy;
    }

    if (ball.x - ball.radius <= paddleA.x + paddleA.width && ball.y >= paddleA.y && ball.y <= paddleA.y + paddleA.height) {
        ball.dx = -ball.dx;
    }
    if (ball.x + ball.radius >= paddleB.x && ball.y >= paddleB.y && ball.y <= paddleB.y + paddleB.height) {
        ball.dx = -ball.dx;
    }

 
    if (ball.x - ball.radius <= 0 || ball.x + ball.radius >= canvas.width) {
        resetBall();
    }
}


function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx = 4 * (Math.random() > 0.5 ? 1 : -1);
    ball.dy = 4 * (Math.random() > 0.5 ? 1 : -1);
}


function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    drawPaddle(paddleA);
    drawPaddle(paddleB);
    drawBall();

    movePaddle();
    moveBall();

    requestAnimationFrame(draw);
}


draw();