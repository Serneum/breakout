function Paddle(canvas, y) {
    this.canvas = canvas;
    this.canvasContext = this.canvas.getContext('2d');
    this.width = 100;
    this.height = 10;

    // Center the paddle horizontally
    this.x = (canvas.width - this.width) / 2
    // Center the paddle vertically
    this.y = y;
};

Paddle.prototype = {
    move: function(newX) {
        this.x = newX;
    },
    draw: function() {
        this.canvasContext.fillStyle = 'white';
        this.canvasContext.fillRect(this.x, this.y, this.width, this.height);
    }
};
