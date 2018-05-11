// Enemies our player must avoid
var Enemy = function(y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = Math.floor(Math.random() * 500 + 200);
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
        this.life = 5;
    }

    update(dt){
        // (Handles collision with the Player)
        var getDistance = (x1, y1, x2, y2) => {
            var xDistance = x2 - x1;
            var yDistance = y2 - y1;
            return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
        }

        var life = document.querySelector('.life');
        life.innerHTML = `Life x${this.life}`;

        allEnemies.forEach(enemy => {
            var distance = getDistance(this.x, this.y,enemy.x, enemy.y);
            if(distance < 40){
                this.x = 200;
                this.y = 380;
                var crashSound = document.querySelector('.crash-sound');
                crashSound.innerHTML = '<source src="images/crash.mp3" type="audio/mpeg">';
                if(this.life == 0){
                    this.life = 0;
                } else {
                    life.innerHTML = `Life x${this.life -=1}`;
                }
            }            
        });


        // select character
        var charBoy = document.querySelector('.char-boy');
        var charCatGirl = document.querySelector('.char-cat-girl');
        var charHornGirl = document.querySelector('.char-horn-girl');
        var charPinkGirl = document.querySelector('.char-pink-girl');
        var charPrincessGirl = document.querySelector('.char-princess-girl');

        charBoy.addEventListener('click',() =>{
            charBoy.classList.toggle("underline");
            charCatGirl.classList.remove("underline");
            charHornGirl.classList.remove("underline");
            charPinkGirl.classList.remove("underline");
            charPrincessGirl.classList.remove('underline');
            this.sprite = "images/char-boy.png";
        });
        charCatGirl.addEventListener('click',() => {
            charCatGirl.classList.toggle("underline");
            charBoy.classList.remove("underline");
            charHornGirl.classList.remove("underline");
            charPinkGirl.classList.remove("underline");
            charPrincessGirl.classList.remove('underline');
            this.sprite = "images/char-cat-girl.png";

        });

        charHornGirl.addEventListener('click',() => {
            charHornGirl.classList.toggle("underline");
            charBoy.classList.remove("underline");
            charCatGirl.classList.remove("underline");
            charPinkGirl.classList.remove("underline");
            charPrincessGirl.classList.remove('underline');
            this.sprite = "images/char-horn-girl.png";
        });
        charPinkGirl.addEventListener('click',() => {
            charPinkGirl.classList.toggle("underline");
             charBoy.classList.remove("underline");
            charCatGirl.classList.remove("underline");
            charHornGirl.classList.remove("underline");
            charPrincessGirl.classList.remove('underline');
            this.sprite = "images/char-pink-girl.png";
        });
        charPrincessGirl.addEventListener('click',() => {
            charPrincessGirl.classList.toggle('underline');
            charBoy.classList.remove("underline");
            charCatGirl.classList.remove("underline");
            charHornGirl.classList.remove("underline");
            charPinkGirl.classList.remove("underline");
            this.sprite = "images/char-princess-girl.png";
        });


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

    mobileKeys(){

        // Arrows for mobile devices

        var mobileUp = document.querySelector('.mobile-up');
        var mobileLeft = document.querySelector('.mobile-left');
        var mobileDown = document.querySelector('.mobile-down');
        var mobileRight = document.querySelector('.mobile-right');

        mobileUp.addEventListener('click',() => {
            if(this.y > 0){
                this.y -= 80;
            }
        });
        mobileLeft.addEventListener('click',() => {
            if(this.x > 0){
                this.x -= 100;
            }
        });
        mobileDown.addEventListener('click',() => {
            if(this.y < 350){
                this.y += 80;
            }
        });
        mobileRight.addEventListener('click',() => {
            if(this.x < 400){
                this.x += 100;
            }
        });

    }
}


// Gem class
class Gem {
    constructor(x, y){
        this.sprite = 'images/gem-blue.png';
        this.x = x;
        this.y = y;
    }

    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    update(){

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

// instantiate golds
var gemBlue = new Gem(120, 450);



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

// This is for run mobile arrows event listeners
player.mobileKeys();
