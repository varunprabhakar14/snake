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
    // this.apple = new SG.Apple(this.dim, this.snake);
    // this.apple.generate();
    this.board = new SG.Board(this.dim, this.snake);
    this.$el = $el;

    // create board
    $('body').on("keydown", this.handleKey.bind(this))

    setInterval(this.step.bind(this), 100)
  }

  View.prototype.handleKey = function (event){
    this.snake.turn(SG.KEYS[event.keyCode]);
    console.log(event.keyCode)
    // this.step()
  }

  View.prototype.step = function () {
    var movement = this.snake.move();
    if(movement[0]) {
      this.snake = new SG.Snake(this.dim);
      // this.apple = new SG.Apple(this.dim, this.snake)
      this.board = new SG.Board(this.dim, this.snake);
    };

    if (movement[1]) {
      this.board = new SG.Board(this.dim, this.snake);
    };

    this.render();
  }

  View.prototype.render = function () {
    this.board.setup();
    this.$el.empty();
    // this.$el.text(this.board.render())
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
