function Brick(canvas, x, y, color) {
    this.canvas = canvas;
    this.canvasContext = this.canvas.getContext('2d');
    this.width = 100;
    this.height = 10;
    this.x = x;
    this.y = y;
    this.color = color;
    this.hidden = false;
};

Brick.prototype = {
    checkCollision: function(ball) {
        if (!this.hidden && (ball.x + ball.radius) >= this.x && (ball.x - ball.radius) <= (this.x + this.width) && (ball.y + ball.radius) >= this.y && (ball.y - ball.radius) <= this.y) {
            var deltaX = ball.x - (this.x + (this.width / 2));
            var normalizedDelta = deltaX / (this.width / 2);
            // Max bounce angle is 75 degrees
            var angle = normalizedDelta * (5 * Math.PI / 12);
            // Determine new velocities. Make sure the Y velocity sign matches the old sign
            ball.velX = ball.speed * Math.cos(angle);
            ball.velY = ball.speed * Math.sin(angle) * (this.velY < 0 ? -1 : 1);
            ball.bounceVelY();
            this.hidden = true;
        }
    },
    draw: function() {
        if (!this.hidden) {
            this.canvasContext.fillStyle = 'blue';
            this.canvasContext.fillRect(this.x, this.y, this.width, this.height);
        }
    }
};
