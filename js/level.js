function Level(context, name) {
    this.context = context;
    this.name = name;
    this.brickGrid = [];
    this.reset();
};

Level.prototype = {
    reset: function() {
        this.loadContents();
    },
    loadContents: function() {
        var _this = this;
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = handleStateChange;
        xhr.open("GET", "js/levels/level" + this.name + ".txt", true);
        xhr.send();

        function handleStateChange() {
            if (xhr.readyState === 4 && xhr.status == 200) {
                var lines = xhr.responseText.split('\n');
                for (var i = 0; i < lines.length; i++) {
                    var line = lines[i];
                    var brickRow = [];
                    var row = line.split('');
                    for (var j = 0; j < row.length; j++) {
                        var sym = row[j];
                        var brick;
                        var color = 'white';
                        if (sym === "G") {
                            color = 'green';
                        }
                        else if (sym === "B") {
                            color = 'blue';
                        }
                        else if (sym === "R") {
                            color = 'red';
                        }

                        brick = new Brick(_this.context, j * 100, i * 10, color);
                        if (sym === " ") {
                            brick.hidden = true;
                        }
                        brickRow.push(brick);
                    }
                    _this.brickGrid.push(brickRow);
                }
            }
        }
    },
    draw: function() {
        this.brickGrid.forEach(function(row) {
            row.forEach(function(brick) {
                brick.draw();
            });
        });
    }
};

