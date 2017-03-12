/* App.js
 * BASED OFF UDACITY FEND SKELETON CODE FOR "FROGGER" ARCADE GAME PROJECT.
 * Extensively customized by Emily Keator to become a "Rogue One" style
 * arcade game. None of the characters belong to me.
 */

// Imperial forces that our rebel heroes must avoid
var Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images;
    // the type of imperial foe depends on the region
    // of the screen--tie fighters in the top row/stars,
    // ATAT walkers in the jungle, and stormtroopers
    //on the sand/if further enemies are added below.
    if (y === 73) {
      this.sprite = 'images/enemy-tie-fighter.png';
    } else if (y === 73*2) {
      this.sprite = 'images/enemy-atat.png';
    } else {
      this.sprite = 'images/enemy-stormtrooper.png';
    }
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    //Multiplication by dt parameter ensures the game runs
    //at the same speed for all computers.
    this.x = this.x + this.speed * dt;
    if (this.x > ctx.canvas.width) {
      this.x = 0 - 101;
    }

    //Handles collisions between our rebel hero/imperial foes by updating the
    //player's collision count (i.e. keeping score) and resetting player location
    if (Math.abs(player.x - this.x) < 60 && Math.abs(player.y - this.y) < 60) {
      player.collisionCount++;
      player.reset();
    }
};

// Draws the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Our Rebel hero
var Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.collisionCount = 0;

    //Assigns at random one of three characters: Jyn, Cassian, or K2SO.
    if (Math.random() <= (1/3)) {
      this.sprite = 'images/char-jyn-erso.png';
    } else if (Math.random() >= (2/3)  ){
      this.sprite = 'images/char-cassian-andor.png';
    } else {
      this.sprite = 'images/char-k2so.png';
    }

};

//Required update function
Player.prototype.update = function() {
    this.x = this.x;
    this.y = this.y;
};

//Handles keystroke input of the player and changes the position
//of the hero-player.
Player.prototype.handleInput = function(direction) {
  switch(direction) {
    case 'left':
      if (this.x - 101 > -10) {
        this.x = this.x - 101;
      }
      break;
    case 'right':
      if (this.x + 101 < ctx.canvas.width) {
        this.x = this.x + 101;
      }
      break;
    case 'up':
      if (this.y - 73 > -10) {
        this.y = this.y - 73;
      }
      break;
    case 'down':
      if (this.y + 73 < ctx.canvas.height - 171) {
        this.y = this.y + 73;
      }
      break;
  }
}

//Draw Player to game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Puts rebel back at the starting position
Player.prototype.reset = function() {
  this.x = 202;
  this.y = 73*5;
}

//Loss screen -- Darth Vader appears if you collide 6 times
Player.prototype.lose = function() {
  var grd=ctx.createRadialGradient(250,300,5,250,300,100);
  grd.addColorStop(0,"red");
  grd.addColorStop(1,"black");
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.drawImage(Resources.get('images/char-vader.png'), 200, 230);
  ctx.textAlign = "center";
  ctx.fillStyle = "#bf0300";
  ctx.font = "60px impact";
  ctx.fillText("YOU HAVE FAILED", ctx.canvas.width/2, 100);
  ctx.fillStyle = "#fff";
  ctx.font = "80px impact";
  ctx.fillText("REBEL SCUM", ctx.canvas.width/2, ctx.canvas.height - 75);

}

//Win screen -- Princess Leia appears if you pass the blockade
Player.prototype.success = function() {
  var grd=ctx.createRadialGradient(250,300,5,250,300,200);
  grd.addColorStop(0,"#3399ff");
  grd.addColorStop(1,"black");
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.drawImage(Resources.get('images/char-princess-leia.png'), 200, 230);
  ctx.textAlign = "center";
  ctx.fillStyle = "#2571bc";
  ctx.font = "50px impact";
  ctx.fillText("YOU HAVE BROUGHT US", ctx.canvas.width/2, 100);
  ctx.fillStyle = "#fff";
  ctx.font = "80px impact";
  ctx.fillText("HOPE", ctx.canvas.width/2, ctx.canvas.height - 75);
}

// Instantiate all objects.
var allEnemies = [
  new Enemy(0, 73, 350),
  new Enemy(0, 2 * 73, 180),
  new Enemy(0, 3 * 73, 270),
  new Enemy(-270, 3 * 73, 270)
];
var player = new Player(202, 73*5);



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
