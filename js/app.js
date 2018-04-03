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
  //rock.pos = [randX(), randY()];
  //heart.pos = [randX(), randY()];
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
  /*var dx = rock.pos[0] - player.pos[0];
  var dy = rock.pos[1] - player.pos[1];
  var distance =  Math.sqrt(dx * dx + dy * dy);
  if (distance < rock.radius + player.radius) {
    detectCollision("rock");
  } else {}
  var dx = heart.pos[0] - player.pos[0];
  var dy = heart.pos[1] - player.pos[1];
  var distance = Math.sqrt(dx * dx + dy * dy);
  if (distance < heart.radius + player.radius) {

    detectCollision("heart");
  } else {} */
}
//collision detected / how to handle each type of collision
function detectCollision(type) {
  //switch statement where "type" is the collision type
  switch (type) {
    case "enemy":
      player.score -= 15;
      player.lives -= 1;
      reset(300, 500);
      if (player.lives < 0) {
        player.score = 0;
        player.lives = 2;
        player.level = 1;
      }
      else if (player.score <= 0) {
        player.score = 0;
      }
      break;
    /*case "rock":
      console.log("rock");
      break;
    case "heart":
      console.log("heart");
      console.log(allEnemies);
      break; */
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player




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
