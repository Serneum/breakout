function Ball(canvas) {
    this.speed = 7.5;
    this.canvas = canvas;
    this.canvasContext = this.canvas.getContext('2d');
    this.radius = 10;
    this.reset();
};

Ball.prototype = {
    reset: function() {
        // Start in the middle of the canvas
        this.x = (this.canvas.width / 2) - this.radius;
        this.y = (this.canvas.height / 2) - this.radius;

        // Random starting direction/angle
        var angle = getRandomAngle();
        this.velX = getRandomVelocity(this.speed) * Math.cos(angle);
        this.velY = this.speed * Math.sin(angle);
    },
    move: function() {
        this.x += this.velX;
        this.y += this.velY;
    },
    draw: function() {
        this.canvasContext.fillStyle = 'white';
        this.canvasContext.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        this.canvasContext.fill();
    },
    bounceVelX: function() {
        this.velX = -this.velX;
    },
    bounceVelY: function() {
        this.velY = -this.velY;
    },
    checkCollision: function(paddle) {
        if ((this.x + this.radius) >= paddle.x && this.x < (paddle.x + paddle.width) && Math.abs(this.y - paddle.y) < paddle.height) {
            var deltaX = this.x - (paddle.x + (paddle.width / 2));
            var normalizedDelta = deltaX / (paddle.width / 2);
            // Max bounce angle is 75 degrees
            var angle = normalizedDelta * (5 * Math.PI / 12);
            // Determine new velocities. Make sure the Y velocity sign matches the old sign
            this.velX = this.speed * Math.cos(angle);
            this.velY = this.speed * Math.sin(angle) * (this.velY < 0 ? -1 : 1);
            this.bounceVelX();
        }
    }
};

// Get a random velocity for the ball's initial movement
function getRandomVelocity(speed) {
    return speed * [-1 ,1][Math.round(Math.random())];
}

// Get an angle for the ball's initial movement
function getRandomAngle() {
    // Get a value between -70 and 70
    var angleDifferential = [-1, 1][Math.round(Math.random())] * Math.round(Math.random() * 70);
    // Get an angle between 20 and 160 degrees
    var degrees = 90 + angleDifferential;
    return degrees * (Math.PI / 180);
}
