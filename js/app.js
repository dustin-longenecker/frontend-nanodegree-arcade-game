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
var randY = function() {
  return Math.floor(Math.random() * 450 + 1);
}
var randX = function() {
  return Math.floor(Math.random() * 600 + 1);
}
//reset function
function reset(x, y) {
  //player with static x & y values
  player.pos = [x, y];
  //rock & heart reset with randX & randY functions
  rock.pos = [randX(), randY()];
  heart.pos = [randX(), randY()];
}

function checkCollisions() {
  //loop through allEnemies array
  //calculate distance between objects using circle collision detetction
  for (var i = 0; i < allEnemies.length; i++) {
    var dx = allEnemies[i].pos[0] - player.pos[0];
    var dy = allEnemies[i].pos[1] - player.pos[1];
    var distance = Math.sqrt(dx * dx + dy * dy);
    //collision detected
    if (distance < allEnemies[i].radius + player.radius) {
      detectCollision("enemy");
    } else {}
  }
  var dx = rock.pos[0] - player.pos[0];
  var dy = rock.pos[1] - player.pos[1];
  var line1 = dx * dx + dy * dy;
  //var line2 = newdx * newdx + dy * dy;
  if (distance < rock.radius + player.radius) {
    detectCollision("rock");
  } else {}
  var dx = heart.pos[0] - player.pos[0];
  var dy = heart.pos[1] - player.pos[1];
  var distance = Math.sqrt(dx * dx + dy * dy);
  if (distance < heart.radius + player.radius) {

    detectCollision("heart");
  } else {}
}
//collision detected / how to handle each type of collision
function detectCollision(type) {
  //switch statement where "type" is the collision type
  switch (type) {
    case "enemy":
      player.score -= 15;
      if (player.score <= 0) {
        player.score = 0;
      }
      player.lives -= 1;
      if (player.lives < 0) {
        player.score = 0;
        player.lives = 2;
        this.level = 1;
        reset(300, 500);
      }
      break;
    case "rock":
      console.log("hit");
      break;
    case "heart":
      console.log("hit");
      break;
  }
}

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
  //checkCollisions();
  this.pos[0] = this.pos[0] + dt * this.vel;
  if (this.pos[0] > 913) {
    this.pos[0] = -105;
    this.pos[1] = this.setYval();
  } else {}
}
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.pos[0], this.pos[1]);
}
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, score, lives) {
  this.sprite = 'images/char-boy.png';
  //this.x = x;
  //this.y = y;
  this.pos = [x, y];
  this.score = score;
  this.lives = lives;
  this.level = 1;
  this.radius = 25;
}
Player.prototype.handleInput = function(key) {
  //character movement / boundary control
  switch (key) {
    case "left":
      if (this.pos[0] > 0) {
        this.pos[0] -= 40;
      }
      break;
    case "up":
      this.pos[1] -= 30;
      break;
    case "right":
      if (this.pos[0] < 600) {
        this.pos[0] += 40;
      }
      break;
    case "down":
      if (this.pos[1] < 500) {
        this.pos[1] += 30;
      }
      break;
  }
}
Player.prototype.update = function(dt) {
  //checks if player made to end
  //adds player score
  //calls reset() for player position
  if (this.pos[1] < 0) {
    this.score += 30;
    this.level += 1;
    console.log(player.level);
    reset(300, 500);
  } else {}
}
Player.prototype.render = function() {
  //character render
  ctx.drawImage(Resources.get(this.sprite), this.pos[0], this.pos[1]);
  //score & lives text display
  ctx.font = '33px serif'; // font & size
  ctx.drawImage(Resources.get('images/Star.png'), -3, -3);
  ctx.fillText(this.score, 30, 110); // display str / value / position
  ctx.drawImage(Resources.get('images/Heart.png'), 0, 500);
  ctx.fillText(this.lives, 43, 600);
  ctx.drawImage(Resources.get('images/Key.png'), 625, 0);
  ctx.fillText(this.level, 625, 100);
}
//rocks
var Rock = function(x, y) {
  this.sprite = 'images/Rock.png';
  this.pos = [randX(), randY()];
  this.radius = 25;
}
Rock.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.pos[0], this.pos[1]);
}
Rock.prototype.update = function() {
  //checkCollisions();
}
//hearts
var Heart = function(x, y) {
  this.sprite = 'images/Heart.png';
  this.pos = [randX(), randY()];
  this.radius = 20;
}
Heart.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.pos[0], this.pos[1]);
}
Heart.prototype.update = function() {
  //checkCollisions();
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player(300, 500, 0, 2); //instantiate player object
var allEnemies = []; //establish allEnemies array
var numOfEnemies = player.level; // static # of enemies
//populate allEnemies array
for (var i = 0; i < numOfEnemies; i++) {
  allEnemies.push(new Enemy());
}
var rock = new Rock();
var heart = new Heart();
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
