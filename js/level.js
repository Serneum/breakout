function Level(context, name) {
    this.context = context;
    this.name = name;
    this.brickGrid = [];
    this.reset();
};

Level.prototype = {
    reset: function() {
        this.loadContents();
        // var levelContents = [];
        // var reader = new FileReader();
        // reader.onload = function(e) {
        //     var lines = e.target.result.split('\n');
        //     lines.forEach(function(line) {
        //         var rowArray = line.split('');
        //         levelContents.push(rowArray);
        //     });
        // }
        // reader.readAsText("js/levels/level" + name + ".txt");
        // this.loadContents(levelContents);
    },
    loadContents: function() {
        var levelContents = [];

        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = handleStateChange;
        xhr.open("GET", "js/levels/level" + this.name + ".txt", true);
        xhr.send();

        function handleStateChange() {
            if (xhr.readyState === 4 && xhr.status == 200) {
                var lines = xhr.responseText.split('\n');
                console.log(lines);
                lines.forEach(function(line) {
                    var rowArray = line.split('');
                    levelContents.push(rowArray);
                });
            }
        }

        for (var i = 0; i < levelContents.length; i++) {
            var row = levelContents[i];
            var brickRow = []
            for (var j = 0; j < row.length; j++) {
                var sym = row[j];
                var brick;
                var color = 'white';
                if (sym === "G") {
                    color = 'blue';
                }
                else if (sym === "B") {
                    color = 'blue';
                }
                else if (sym === "R") {
                    color = 'red';
                }

                brick = new Brick(this.context, j * 100, i * 10, color);
                if (sym === " ") {
                    brick.hidden = true;
                }
                brickRow.push(brick);
            }
            this.brickGrid.push(brickRow);
        }
    },
    draw: function() {
        this.brickGrid.forEach(function(brick) {
            brick.draw();
        });
    }
};
