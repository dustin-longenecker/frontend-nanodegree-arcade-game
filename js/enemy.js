// Enemies our player must avoid
var Enemy = function() {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
  this.x = -5;
  this.y = this.setYval();
  this.pos = [this.x, this.setYval()];
  this.vel = Math.random() * 125 + 75;
  this.radius = 25;
}
Enemy.prototype.setYval = function() {
  //select random row
  var randY = Math.floor(Math.random() * 5 + 1);
  //adjust enemy yval
  if (randY === 1) {
    return 60;
  } else if (randY === 2) {
    return 145;
  } else if (randY === 3) {
    return 230;
  } else if (randY === 4) {
    return 315;
  } else if (randY === 5) {
    return 400;
  } else {
    console.log('error');
  }
}
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  //check collisions / reposition if enemy goes off canvas
  checkCollisions();
  //takes x coordinate of enemy and adds the product of dt times the velocity
  this.pos[0] = this.pos[0] + dt * this.vel;
  //checks if enemy moved off canvas
  if (this.pos[0] > 913) {
  //if true resets the X coordinate and provides a new random Y coordinate
    this.pos[0] = -105;
    this.pos[1] = this.setYval();
  }
  else{
  }
}
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.pos[0], this.pos[1]);
}
var allEnemies = []; //establish allEnemies array
var enemyCount = 13;
//populate allEnemies array
for (var i = 0; i < enemyCount; i++) {
  allEnemies.push(new Enemy());
}
