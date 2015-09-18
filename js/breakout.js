var backgroundLayer;
var gameLayer;

var gameContext;

var ball;
var playerPaddle;

window.onload = function() {
    backgroundLayer = document.getElementById('background');
    drawBackground();

    gameLayer = document.getElementById('game');
    gameContext = gameLayer.getContext('2d');

    ball = new Ball(gameLayer);
    playerPaddle = new Paddle(gameLayer, gameLayer.height - 30);
    drawGame();

    (function render(){
      requestAnimationFrame(render);
      update();
      drawGame();
    })();
}

// shim layer with setTimeout fallback
window.requestAnimFrame = (function() {
    return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function(callback) {
              window.setTimeout(callback, 1000 / 60);
          };
})();

function calculateMousePos(event) {
    var rect = gameLayer.getBoundingClientRect();
    var root = document.documentElement;
    return {
        x: event.clientX - rect.left - root.scrollLeft,
        y: event.clientY - rect.top - root.scrollTop
    };
}

function update() {
    gameLayer.addEventListener('mousemove', function(evt) {
        var mousePos = calculateMousePos(evt);
        playerPaddle.move(mousePos.x);
    });
    ball.move();
    if (ball.y <= 0 && ball.velY < 0) {
        ball.bounceVelY();
    }
    else if (((ball.x + ball.radius) >= gameLayer.width && ball.velX > 0) || (ball.x <= 0 && ball.velX < 0)) {
        ball.bounceVelX();
    }

    // Check collisions against the paddle the ball is heading towards
    if (ball.velY > 0) {
        ball.checkCollision(playerPaddle);
    }
}

function drawBackground() {
    var backgroundContext = backgroundLayer.getContext('2d');
    backgroundContext.fillStyle = 'black';
    backgroundContext.fillRect(0, 0, backgroundLayer.width, backgroundLayer.height);
}

function drawGame() {
    gameContext.clearRect(0, 0, gameLayer.width, gameLayer.height);
    gameContext.beginPath();
    ball.draw();
    playerPaddle.draw();
    gameContext.closePath();
}
