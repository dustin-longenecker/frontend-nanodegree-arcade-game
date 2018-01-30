/*
  Resources:
  *Udacity Forums*
  https://discussions.udacity.com/t/collisions-checking/172114


  *Mozilla Developer Network*
  https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection //collision detection formulas


  *Daniel Shiffman*
  https://www.youtube.com/watch?v=pJ_M_fACtB8 //collision detection
  https://www.youtube.com/watch?v=uAfw-ko3kB8 //intersection collision
  https://www.youtube.com/watch?v=cXgA1d_E-jY //game building
*/




// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -5;
    this.y = this.setYval();
    this.vel = Math.random() * 125 + 75;
    this.radius = 25;
};
Enemy.prototype.setYval = function() {
  //select random row
  var randY = Math.floor(Math.random() * 3 + 1);
  //adjust enemy yval
  if(randY === 1) {
    return this.yVal = 60;
  }
  else if(randY === 2) {
    return this.yVal = 140;
  }
  else if(randY === 3) {
    return this.yVal = 225;
  }
  else{
    console.log('error');
  }
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    //check collisions / reposition if enemy goes off canvas
    this.checkCollisions();
    this.x = this.x + dt * this.vel;
    if (this.x > 505) {
        this.x = -105;
        this.y = this.setYval();
    }
    else{
    }



};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.checkCollisions = function(){

  //loop through allEnemies array
  //calculate distance between objects using circle collision detetction
  for (var i = 0; i < allEnemies.length; i++){

    var dx = allEnemies[i].x - player.x;
    var dy = allEnemies[i].y - player.y;
    var distance = Math.sqrt(dx * dx + dy * dy);
   //collision detected
   if(distance < allEnemies[i].radius + player.radius){
      this.detectCollision();
    }
    else{}
  }

}
Enemy.prototype.detectCollision = function() {
  player.score -= 15;
  player.lives -= 1;
  if(player.lives < 0){
    player.score = 0;
    player.lives = 2;
    player.level = 1;
  }
  player.reset();
}


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, score, lives, level) {
  this.sprite = 'images/char-boy.png';
  this.x = x;
  this.y = y;
  this.score = score;
  this.lives = lives;
  this.level = level;
  this.radius = 25;

}


Player.prototype.handleInput = function(key) {
  //character movement / boundary control
  switch (key) {
    case "left":
      if(this.x > 0){
        this.x -= 40;
      }
      break;
    case "up":
        this.y -= 30;
      break;
    case "right":
      if(this.x < 400){
        this.x += 40;
      }
      break;
    case "down":
      if(this.y < 400){
        this.y += 30;
      }
      break;
  }
}
//position reset function
Player.prototype.reset = function() {
  this.x = 200;
  this.y = 400;
}

Player.prototype.update = function(key) {
  //checks if player made to end
  //adds player score
  //calls reset() for player position
  if (this.y < 0) {
    this.score += 30;
    this.level += 1;
    this.reset();
  }
  else{
  }
}

Player.prototype.render = function() {
  //character render
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

  //score & lives text display
  ctx.font = '33px serif'; // font & size
  ctx.fillText("Score: " + this.score, 13, 100); // display str / value / position
  ctx.fillText("Lives: "+ this.lives, 13, 575);
  ctx.fillText("Level: " + this.level, 365, 100);


}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var player = new Player(200,400,0,2,1); //instantiate player object

var allEnemies = []; //establish allEnemies array

var numOfEnemies = 7; // static # of enemies

//populate allEnemies array
for (var i = 0; i < numOfEnemies; i++) {
    allEnemies.push(new Enemy());
}




// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
