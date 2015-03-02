(function(){
  if (typeof SG === 'undefined') {
    window.SG = {};
  }

  SG.KEYS = {38: 'N',
  40: 'S',
  37: 'W',
  39: 'E'}

  var View = SG.View = function ($el) {
    this.dim = 20;
    this.snake = new SG.Snake(this.dim);
    this.board = new SG.Board(this.dim, this.snake);
    this.$el = $el;
    this.start = false;
    this.score = 0;

    var $gameOver = $('<h3 class="gameover">Push Spacebar to Start</h3>');
    $('body').append($gameOver);

    var $gameScore = $('<h1 class="score">Score: ' + this.score + '</h1>');
    $('body').append($gameScore);

    // create board
    $('body').on("keydown", this.handleKey.bind(this));

    this.step()
  }

  View.prototype.handleKey = function (event){
    if(event.keyCode === 32) {
      this.start = !this.start;
      if(this.start) {
        this.interval = setInterval(this.step.bind(this), 100)

        $('body').find('.gameover').empty();
      } else {
        clearInterval(this.interval)

        $('body').find('.gameover').html("Push Spacebar to Start");

      }

    } else {
      this.snake.turn(SG.KEYS[event.keyCode]);
    }
  }

  View.prototype.step = function () {
    var movement = this.snake.move();
    if(movement[0]) { // game is over

      this.snake = new SG.Snake(this.dim);
      this.board = new SG.Board(this.dim, this.snake);

      clearInterval(this.interval)
      $('body').find('.gameover').html("Push Spacebar to Start");

      this.start = false;
      var $gameScore = $('<h1 class="score">Score: 0</h1>');
      $('body').find('.score').html($gameScore);
    };

    if (movement[1]) { // snake grew
      this.board = new SG.Board(this.dim, this.snake);
      this.score += 1;

      var $gameScore = $('<h1 class="score">Score: ' + this.score + '</h1>');
      $('body').find('.score').html($gameScore);
    };

    this.render();
  }

  View.prototype.render = function () {
    this.board.setup();
    this.$el.empty();

    for (var i = 0; i < this.dim; i++) {
      var $row = $("<div>");
      $row.addClass("row");
      for (var j = 0; j < this.dim; j++) {
        var $square = $("<div>");
        $square.addClass("square");

        if (this.board.grid[j][i] === "s") {
          $square.addClass("snake")
        } else if (this.board.grid[j][i] === "A") {
          $square.addClass("apple")
        }

        $row.append($square)
      }
      this.$el.append($row);
    }
  }

})();
