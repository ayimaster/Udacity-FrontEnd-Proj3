// Hello.
//
// This is JSHint, a tool that helps to detect errors and potential
// problems in your JavaScript code.
//
// To start, simply enter some JavaScript anywhere on this page. Your
// report will appear on the right side.
//
// Additionally, you can toggle specific options in the Configure
// menu.

function Enemy(x, y, speed) {
  this.x = x;
  this.y = y;
  this.speed = Math.floor(Math.random() * (500 - 100) + 100);
  this.sprite = 'images/enemy-bug.png';
}

Enemy.prototype.update = function (dt) {
  this.x += (this.speed + 100) * dt;
  if (this.x > 500) {
    this.x = -150;
    this.speed = Math.random() * (500 - 100) + 100;

  }
};

Enemy.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var bug1 = new Enemy(-375, 240, this.speed);
var bug2 = new Enemy(-320, 130, this.speed);
var bug3 = new Enemy(140, 40, this.speed);
var allEnemies = [bug1, bug2, bug3];
//allEnemies.push();


function Player(x, y, sprite) {
  this.x = x;
  this.y = y;
  this.sprite = "images/char-horn-girl.png";
}

Player.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.reset = function () {
  this.x = 200;
  this.y = 400;

};

// check if objects a and b collide
var collision = function(a, b) {
  return (a.x < (b.x + 50) &&
          (a.x + 50) > b.x &&
          a.y < (b.y + 30) &&
          (a.y + 30) > b.y);
}

Player.prototype.collision = function () {
  for (var i = 0; i < allEnemies.length; i++) {
    if (collision(this, allEnemies[i])) {
      alert("Game Over!");
      this.reset();
      break;
    }
  }
};


Player.prototype.update = function () {
  if (this.y <= 40) {
    alert("Congratulations! You defeated the bugs!!!")
    this.reset();
  }
  this.collision();
};


Player.prototype.handleInput = function (keyCode) {
  switch (keyCode) {
  case 'left':
    if (this.x > 0) {
      this.x -= 101;
    }
    break;
  case 'right':
    if (this.x < 400) {
      this.x += 101;
    }
    break;
  case 'up':
    if (this.y > 0) {
      this.y -= 85;
    }
    break;
  case 'down':
    if (this.y < 400) {
      this.y += 85;
    }
    break;
  }

};

var player = new Player(200, 400);


document.addEventListener('keyup', function (e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});