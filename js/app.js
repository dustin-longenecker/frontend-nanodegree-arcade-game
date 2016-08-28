// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.enemyRow = this.setRow();
    this.width = 70;
    this.height = 80;
    this.x = this.setX();
    this.y = this.setY();
    this.speed = Math.random() * 150 + 100;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + dt * this.speed;
    checkCollisions();
    if (this.x > 505) {
        this.x = -105;
    };
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Enemy.prototype.setRow = function() {
    var row = Math.floor(Math.random() * 3 + 1);
    return row;
};
Enemy.prototype.setY = function() {
    var y = ((this.enemyRow * 83) - 20);
    return y;
};
Enemy.prototype.setX = function() {
    var x = (0 - (Math.random() * 400 + 100));
    return x;
};

/***** PLAYER CLASS *****/
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    this.width = 50;
    this.height = 50;
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
};
Player.prototype.reset = function() {
	this.x = 200;
	this.y = 400;
};
Player.prototype.update = function() {
    if (this.y < 10) {
      this.reset();
      //this.score++;
    }
};
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput = function(keys) {
    switch (keys) {
        case 'left':
            if (this.x > 0) { // Keeps player from going off left-hand side of canvas
                this.x = this.x - 50;
            }
            break;
        case 'up':
            if (this.y > 0) {
                this.y = this.y - 50;
            }
            break;
        case 'right':
            if (this.x < 400) { // Keeps player from going off right-hand side of canvas
                this.x = this.x + 50;
            }
            break;
        case 'down':
            if (this.y < 400) { // Keeps player from going below canvas
                this.y = this.y + 50;
            }
            break;
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
var numOfEnemies = 6;
for (var i = 0; i < numOfEnemies; i++) {
    allEnemies.push(new Enemy());
}
// Place the player object in a variable called player
var player = new Player(200, 400);

//test checkCollisions
function checkCollisions() {



};

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
