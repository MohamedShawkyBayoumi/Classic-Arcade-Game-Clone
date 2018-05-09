// Enemies our player must avoid
var Enemy = function(y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    this.y = y;
    this.speed = speed;
};


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if(this.x > 510){
        this.x = 0;
        this.x += this.speed * dt;
    }
    // (Handles collision with the Player)
        

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// This class requires an update(), render() and
// Now write your own player class
// a handleInput() method.
class Player {
    constructor(){
        this.sprite = 'images/char-boy.png';
        this.x = 200;
        this.y = 380;
    }

    update(dt){
        //this.x += 1;
        // (Handles collision with the Player)
        var getDistance = (x1, y1, x2, y2) => {
            var xDistance = x2 - x1;
            var yDistance = y2 - y1;
            return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
        }

        if(getDistance(player.x, player.y,allEnemies[0].x, allEnemies[0].y)){
            console.log("it works now");
        }

    }

    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(allowedKeys){

        if(allowedKeys == "left" && this.x > 0){
            this.x -= 100;
        }else if(allowedKeys == "right" && this.x < 400){
            this.x += 100;
        }else if(allowedKeys == "up" && this.y > 0){
            this.y -= 80;
        }else if(allowedKeys == "down" && this.y < 350){
            this.y += 80;
        }
        
    }
}






// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [
    new Enemy(60,450),
    new Enemy(145,300),
    new Enemy(230,400)
];
// Place the player object in a variable called player
var player = new Player();





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
