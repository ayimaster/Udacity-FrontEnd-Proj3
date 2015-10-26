// This function initiates the enemy, sets its initial location
//and the image
function Enemy(x, y) {
  this.x = x;
  this.y = y;
  this.speed = Math.floor(Math.random() * (500 - 100) + 100);
  this.sprite = 'images/enemy-bug.png';
}

// The update() method updates the enemy's location and sets its speed to a random number
Enemy.prototype.update = function(dt) {
  this.x += (this.speed + 100) * dt;
  if (this.x > 500) {
    this.x = -150;
    this.speed = Math.random() * (500 - 100) + 100;
  }
};

// The render() method renders the enemy on the canvas
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// three instances of enemy that are defined as bugs are created
var bug1 = new Enemy(-375, 240, this.speed);
var bug2 = new Enemy(-320, 130, this.speed);
var bug3 = new Enemy(140, 40, this.speed);
var allEnemies = [bug1, bug2, bug3];


//this function initiates the player object, sets its initial location and its sprite
function Player(x, y) {
  this.x = x;
  this.y = y;
  this.sprite = "images/char-horn-girl.png";
}

// the render() method renders the player on the canvas
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//the reset() method resets the position of the player once the game is over or the player reaches the water
Player.prototype.reset = function() {
  this.x = 200;
  this.y = 400;

};

// this function checks if objects a and b collide
var collision = function(a, b) {
  return (a.x < (b.x + 50) &&
          (a.x + 50) > b.x &&
          a.y < (b.y + 30) &&
          (a.y + 30) > b.y);
};

// the collision() method handles collision between the enemy and the player. // If they collide the game is over and the player's position is reset to its // initial position
Player.prototype.collision = function() {
  for (var i = 0; i < allEnemies.length; i++) {
    if (collision(this, allEnemies[i])) {
      alert("Game Over!");
      this.reset();
      break;
    }
  }
};

// the update() method resets the player's position if the player reaches the // water as well as uses the collision() method if the player collides.
Player.prototype.update = function() {
  if (this.y <= 40) {
    alert("Congratulations! You defeated the bugs!!!");
    this.reset();
  }
  this.collision();
};

// the handleInput() method moves the player over the canvas using the keys,
// based on user input.
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

// An instance of a player is created
var player = new Player(200, 400);

// An event listener that 'listens' for user input, key press and sends the
//keys to the handleInput() method.
document.addEventListener('keyup', function (e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});