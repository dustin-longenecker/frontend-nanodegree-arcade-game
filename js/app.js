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
}
Enemy.prototype.setYval = function() {
  //select random row
  var randY = Math.floor(Math.random() * 5 + 1);
  //adjust enemy yval
  if(randY === 1) {
    return 60;
  }
  else if(randY === 2) {
    return 145;
  }
  else if(randY === 3) {
    return 230;
  }
  else if (randY === 4) {
    return 315;
  }
  else if (randY === 5) {
    return 400;
  }
  else{
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
    this.checkCollisions();
    this.x = this.x + dt * this.vel;
    if (this.x > 913) {
        this.x = -105;
        this.y = this.setYval();
    }
    else{
    }



}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

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
  if (player.score <= 0){
    player.score = 0;
  }
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
      if(this.x < 600){
        this.x += 40;
      }
      break;
    case "down":
      if(this.y < 500){
        this.y += 30;
      }
      break;
  }

}
//position reset function
Player.prototype.reset = function() {
  this.x = 300;
  this.y = 500;
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
  ctx.drawImage(Resources.get('images/Star.png'), -3, -3);
  ctx.fillText(this.score, 30, 110); // display str / value / position
  ctx.drawImage(Resources.get('images/Heart.png'), 0, 500);
  ctx.fillText(this.lives, 43, 600);
  ctx.drawImage(Resources.get('images/Key.png'), 625, 0);
  ctx.fillText(this.level, 625, 100);


}
//gems
var Gem = function(x, y) {
  //randomize gem color
  var randGem = Math.floor(Math.random() * 3 + 1);
  switch(randGem) {
    case 1:
    this.sprite = 'images/Gem-Blue.png';
    break;
    case 2:
    this.sprite = 'images/Gem-Green.png';
    break;
    case 3:
    this.sprite = 'images/Gem-Orange.png';
  }
  this.x = x;
  this.y = y;

  this.radius = 20;

}

Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
//rocks
var Rock = function(x, y) {
  this.sprite = 'images/Rock.png';
  var randY = Math.floor(Math.random() * 450 + 1);
  var randX = Math.floor(Math.random() * 600 + 1);
  this.x = randX;
  this.y = randY;

  this.radius = 25;

}

Rock.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
Rock.prototype.update = function () {
  this.checkCollisions();
}
Rock.prototype.checkCollisions = function(){
  var dx = rock.x - player.x;
  var dy = rock.y - player.y;
  var distance = Math.sqrt(dx * dx + dy * dy);
  if (distance < rock.radius + player.radius){

     this.detectCollision();
     console.log('collision');
   }
   else{}
}
Rock.prototype.detectCollision = function() {

}
//rocks
var Heart = function(x, y) {
  this.sprite = 'images/Heart.png';
  this.x = x;
  this.y = y;

  this.radius = 20;

}

Heart.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
Heart.prototype.update = function() {
    this.checkCollisions();
}
Heart.prototype.checkCollisions = function() {
  var dx = heart.x - player.x;
  var dy = heart.y - player.y;
  var distance = Math.sqrt(dx * dx + dy * dy);
  if(distance < heart.radius + player.radius){

     this.detectCollision();
     console.log('collision');
   }
   else{}
}
Heart.prototype.detectCollision = function() {
  if(player.lives < 10){
    player.lives += 1;
  }
  else{}
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var player = new Player(300,500,0,2,1); //instantiate player object


var allEnemies = []; //establish allEnemies array


var numOfEnemies = 7; // static # of enemies

//populate allEnemies array
for (var i = 0; i < numOfEnemies; i++) {
    allEnemies.push(new Enemy());
}

var gem = new Gem(300, 300);
var rock = new Rock();
//var rock2 = new Rock();
//var rock3 = new Rock();
var heart = new Heart(400, 200);




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
