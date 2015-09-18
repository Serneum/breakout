var backgroundLayer;
var gameLayer;

var gameContext;

var ball;
var playerPaddle;
var level;

window.onload = function() {
    backgroundLayer = document.getElementById('background');
    drawBackground();

    gameLayer = document.getElementById('game');
    gameContext = gameLayer.getContext('2d');

    ball = new Ball(gameLayer);
    playerPaddle = new Paddle(gameLayer, gameLayer.height - 50);
    level = new Level(gameContext, "1");
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
        var paddlePos = mousePos.x - playerPaddle.width / 2;
        if (paddlePos < 0) {
            paddlePos = 0;
        }
        else if (paddlePos + playerPaddle.width > gameLayer.width) {
                paddlePos = gameLayer.width - playerPaddle.width;
        }
        playerPaddle.move(paddlePos);
    });
    ball.move();
    if (ball.y <= 0 && ball.velY < 0) {
        ball.bounceVelY();
    }
    else if (((ball.x + ball.radius) >= gameLayer.width && ball.velX > 0) || (ball.x - ball.radius <= 0 && ball.velX < 0)) {
        ball.bounceVelX();
    }

    // Check collisions against the paddle the ball is heading towards
    if (ball.velY > 0) {
        ball.checkCollision(playerPaddle);
    }
}

function drawBackground() {
    var backgroundContext = backgroundLayer.getContext('2d');
    drawRect(backgroundContext, 0, 0, backgroundLayer.width, backgroundLayer.height, 'black');
}

function drawGame() {
    gameContext.clearRect(0, 0, gameLayer.width, gameLayer.height);
    level.draw();
    ball.draw();
    playerPaddle.draw();
}
