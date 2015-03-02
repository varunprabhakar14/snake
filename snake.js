(function() {
  if(typeof SG === 'undefined') {
    window.SG = {};
  };

  // Snake class
  var Snake = SG.Snake = function(dim) {
    this.dim = dim;
    this.dir = "N";
    this.segments = [[dim / 2, dim / 2], [dim / 2 + 1, dim / 2], [dim / 2 + 2, dim / 2]];
    this.apple = [];
  };

  Snake.DIRS = {
    "N": [-1,0],
    "S": [1,0],
    "E": [0,1],
    "W": [0,-1]
  };

  Snake.prototype.move = function() {
    var dirVal = Snake.DIRS[this.dir]; //this will give us [-1,0]~ and stuff like it from DIRS
    var first = this.segments[0];
    var newRow = first[0] + dirVal[0];
    var newCol = first[1] + dirVal[1];
    var grow = false;
    var outbounds = false;
    if (this.endGame(newRow, newCol)) {
      outbounds = true;
    } else {
      this.segments.unshift([newRow, newCol]);

      if (!(newRow === this.apple[0] && newCol === this.apple[1])) {//doesnt grow
        this.segments.pop();
      } else {
        grow = true;
      }
    };
    return [outbounds, grow];
  };

  Snake.prototype.endGame = function(newRow, newCol) {
    var returnVal = false;
    if(newRow >= this.dim || newRow < 0) {
      alert("You lose");
      returnVal = true;
    } else if(newCol >= this.dim || newCol < 0){
      alert("You lose");
      returnVal = true;
    } else {
      this.segments.forEach (function(segment){
        if (segment[0] === newRow && segment[1] === newCol) {
          alert("You hit yourself");
          returnVal = true;
        }
      });
    }

    return returnVal;
  };

  Snake.prototype.turn = function(newDir) {
    if(!isOppositeDir(Snake.DIRS[this.dir], Snake.DIRS[newDir])) {
      this.dir = newDir;
    }
  };

  var isOppositeDir = function(dir1, dir2) {
    return (dir1[0] === (-1 * dir2[0])) && (dir1[1] === (-1 * dir2[1]));
  };

  //Board class
  var Board = SG.Board = function(dim, snake){
    this.dim = dim;
    this.snake = snake;
    this.apple = this.placeApple();
    this.snake.apple = this.apple;
    this.grid = [];
  };

  Board.prototype.setup = function() {//making stuff show up
    for (var row = 0; row < this.dim; row++) {
      this.grid[row] = this.grid[row] || [];
      for(var col = 0; col < this.dim; col++) {
        this.grid[row][col] = ".";
      }
    }

    var that = this;
    this.snake.segments.forEach(function(segment){
      that.grid[segment[0]][segment[1]] = "s";
    });

    // var appleCoord = this.placeApple();
    this.grid[this.apple[0]][this.apple[1]] = "A";
    return this.grid;
  };

  Board.prototype.render = function() {
    var grid = this.setup();
    var display = "";
    for (var i = 0; i < grid.length; i++) {
      display += "\n"
      for (var j = 0; j < grid.length; j++) {
        //add grid to display;
        display += grid[i][j];
      }
      //line break
      display += "\n"
    }
    return display;
  };

  //Apple class

  // var Apple = SG.Apple = function(dim, snake){
  //   this.dim = dim;
  //   this.snake = snake;
  //   this.coord = this.generate();
  // };

  Board.prototype.placeApple = function() {
    var loop = true;
    while(loop) {
      loop = false;
      var row = Math.floor(Math.random() * this.dim);
      var col = Math.floor(Math.random() * this.dim);
      var that = this;
      this.snake.segments.forEach(function(segment){
        if (segment[0] === row && segment[1] === col) {
          loop = true;
        }
      });
    }

    return [row, col];

  };



})();
