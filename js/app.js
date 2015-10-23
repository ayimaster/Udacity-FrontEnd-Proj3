function Enemy (x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = Math.floor(Math.random()* (500-100)+ 100);
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.update = function(dt) {
  this.x += (this.speed + 100) * dt;
  if (this.x > 500) {
     this.x = -150;
     this.speed = Math.random() * (500-100) + 100;
  }
};

Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var bug1 = new Enemy(-375, 240, this.speed);
var bug2 = new Enemy(-320, 130, this.speed);
var bug3 = new Enemy(140, 40, this.speed);
var allEnemies = [bug1, bug2, bug3];
allEnemies.push;


function Player(x, y, sprite) {
  this.x = x;
  this.y = y;
  this.sprite = "images/char-horn-girl.png";
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.reset = function() {
  this.x = 200;
  this.y = 400;
}

Player.prototype.update = function() {
if (this.y <= 50) {
  this.x = 200;
  this.y = 400;
  this.collision();
}

};

Player.prototype.collision = function() {
    for (var i = 0; i < allEnemies.length; i ++);
      if (this.x < allEnemies[i].x + 50 && this.x + 50 > allEnemies[i].x && this.y < allEnemies[i].y + 30 && this.y + 30 > allEnemies[i].y){
        alert("Game Over!");
        this.reset();
        break;
      }
};

Player.prototype.handleInput = function(keyCode) {
switch(keyCode){
        case 'left' : if(this.x > 0){
          this.x -= 101;}
          break;
        case 'right': if(this.x < 400){
          this.x += 101;}
          break;
        case 'up': if (this.y > 0 ) {
          this.y -= 85;}
          break;
        case 'down': if(this.y < 400){
          this.y += 85;}
          break;
            }
};

var player = new Player(200, 400);


document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});