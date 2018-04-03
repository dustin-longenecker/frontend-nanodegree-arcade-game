
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, score, lives) {
  this.sprite = 'images/char-boy.png';
  //this.x = x;
  //this.y = y;
  this.pos = [x, y];
  this.prevPosition = [null, null];

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
    player.level += 1;
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
var player = new Player(300, 500, 0, 2); //instantiate player object
