let gameInterval;
let scoreInterval;
let speedIncreaseInterval;
const paddleA = document.getElementById('paddleA');
const paddleB = document.getElementById('paddleB');
const ball = document.getElementById('ball');
const scoreA = document.getElementById('scoreA');
const startButton = document.getElementById('startButton');
const resetButton = document.getElementById('resetButton');

let ballDirection = { x: 2, y: 1 };

function moveBall() {
    let currentTop = ball.offsetTop;
    let currentLeft = ball.offsetLeft;
    let ballHeight = ball.offsetHeight;
    let ballWidth = ball.offsetWidth;
    let gameHeight = gameCanvas.clientHeight;
    let gameWidth = gameCanvas.clientWidth;
    let paddleHeight = paddleA.offsetHeight;
    let paddleWidth = paddleA.offsetWidth;

    if (currentTop <= 0 || currentTop + ballHeight >= gameHeight) {
        ballDirection.y *= -1;
    }

    if (currentLeft <= paddleWidth) {
        if (currentTop + ballHeight/2 >= paddleA.offsetTop && currentTop + ballHeight/2 <= paddleA.offsetTop + paddleHeight) {
            ballDirection.x *= -1;
        } else {
            stopGame();
            return;
        }
    } else if (currentLeft + ballWidth >= gameWidth - paddleWidth) {
        if (currentTop + ballHeight/2 >= paddleB.offsetTop && currentTop + ballHeight/2 <= paddleB.offsetTop + paddleHeight) {
            ballDirection.x *= -1;
        } else {
            stopGame();
            return;
        }
    }

    // Move the ball to the new position
    ball.style.top = (currentTop + ballDirection.y) + 'px';
    ball.style.left = (currentLeft + ballDirection.x) + 'px';
}


function startGame() {
    resetGame();
    if (!gameInterval) {
        gameInterval = setInterval(moveBall, 10);
        scoreInterval = setInterval(increaseScore, 5000);
        speedIncreaseInterval = setInterval(increaseSpeed, 5000);
    }
}

function stopGame() {
    clearInterval(gameInterval);
    clearInterval(scoreInterval);
    clearInterval(speedIncreaseInterval);
    gameInterval = null;
    scoreInterval = null;
    speedIncreaseInterval = null;
    alert("Game Over! Your score: " + scoreA.textContent);
}

function resetGame() {
    scoreA.textContent = '0';
    resetBall();
    ballDirection = { x: 2, y: 1 }; // Reset ball direction and speed
}

function resetBall() {
    ball.style.left = '50%';
    ball.style.top = '50%';
}

function increaseScore() {
    let currentScore = parseInt(scoreA.textContent);
    scoreA.textContent = currentScore + 1;
}

function increaseSpeed() {
    if (ballDirection.x > 0) {
        ballDirection.x += 1;
    } else {
        ballDirection.x -= 1;
    }
    if (ballDirection.y > 0) {
        ballDirection.y += 1;
    } else {
        ballDirection.y -= 1;
    }
}

document.addEventListener('mousemove', function (e) {
    let newPosition = e.clientY - paddleA.offsetHeight / 2;
    newPosition = Math.max(newPosition, 0);
    newPosition = Math.min(newPosition, gameCanvas.clientHeight - paddleA.offsetHeight);
    paddleA.style.top = newPosition + 'px';
    paddleB.style.top = newPosition + 'px';
});

startButton.addEventListener('click', startGame);
resetButton.addEventListener('click', resetGame);
