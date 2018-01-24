//////////////
//  PLAYER  //
//////////////

// Constructor
function Player() {
    // Player location and size
    this.x = 200;
    this.lastX = this.x;
    this.y = 200;
    this.d = new Date();
    
    // Player state
    this.alive = true;
    this.health = 10;
    this.what = "Player";
	this.id = 1;
    
    // Player image
    this.img = new Image();
    this.img.src = "images/ship.png";
    this.w = this.img.w;
    this.h = this.img.h;
    this.loaded = false;
    thatPlayer = this;
    this.img.onload = function() {
        thatPlayer.loaded = true;
        thatPlayer.w = thatPlayer.img.width;
        thatPlayer.h = thatPlayer.img.height;
        console.log("Player ship has been loaded.");
    }
    
    // Player velocity
    this.v = {x: 0, y: 0};
    
    // Player thrust
    this.thrust = 5;
    
    // Weapons
    this.weapons = [];
    
    // Player bullets
    this.bullets = [];
    this.bulletSrc = "images/bullet.png"
    this.lastBulletTime = this.d.getTime();
    this.bulletDelay = 100;
	this.currentBulletId = 0;
    
    //// NOTE: velocity and thrust are seperate, so movement can be
    ////       quickly converted to momentum based if I decide to
    ////       switch it in the future.
}

// Draw method
Player.prototype.draw = function(ctx) {
    // Check state of player before drawing
    if(this.alive && this.loaded) {
        // Draw character
        ctx.drawImage(this.img, this.x, this.y);
        
        for(x in this.bullets) {
            this.bullets[x].draw(ctx);
        }
    }
};

// Update method
Player.prototype.update = function(keyboard, ctx) {
    // Check state of player before updating
    if(this.alive && this.loaded) {
        this.checkBullets(ctx);
		this.move(keyboard, ctx);
        this.fire(keyboard, ctx);
    }
};

// Check Bullets method
Player.prototype.checkBullets = function(ctx) {
	// Check bullets, and kill the dead ones
    for(x in this.bullets) {
        this.bullets[x].update(ctx);
        if(!this.bullets[x].alive) {
            this.bullets.splice(x,1);
        }
    }	
};

// Move method
Player.prototype.move = function(keyboard, ctx) {
    this.lastX = this.x;
    
    // Move player when arrow keys are pressed
    if(keyboard[MOVE_LEFT]) {this.v.x = -this.thrust;}
    if(keyboard[MOVE_UP]) {this.v.y = -this.thrust;}
    if(keyboard[MOVE_RIGHT]) {this.v.x = this.thrust;}
    if(keyboard[MOVE_DOWN]) {this.v.y = this.thrust;}
    
    // Update player location based off it's velocity
    this.x += this.v.x;
    this.y += this.v.y;
    
    // Check whether still on screen
    if(this.x < 0) {
        this.x = 0;
        
        //// NOTE: Bounce effect removed for now at least, since it's 
        ////       worthless unless movement is momentum based.
        //this.v.x *= -0.9;
    }
    else if(this.x + this.w > ctx.canvas.width) {
        this.x = ctx.canvas.width - this.w;
        
        //// NOTE: Bounce effect removed for now at least, since it's 
        ////       worthless unless movement is momentum based.
        //this.v.x *= -0.9;
    }
    if(this.y < 0) {
        this.y = 0;
        
        //// NOTE: Bounce effect removed for now at least, since it's 
        ////       worthless unless movement is momentum based.
        //this.v.y *= -0.9;
    }
    else if(this.y + this.h > ctx.canvas.height) {
        this.y = ctx.canvas.height - this.h;
        
        //// NOTE: Bounce effect removed for now at least, since it's 
        ////       worthless unless movement is momentum based.
        //this.v.y *= -0.9;
    }
    
    // Reset velocity
    this.v.x = 0;
    this.v.y = 0;
};

// Fire method
Player.prototype.fire = function(keyboard, ctx) {
    // Get current time
    this.d = new Date();
    newTime = this.d.getTime();
    
    // Check whether it is time to fire, if yes, spawn bullet
    if((keyboard[FIRE]) && ((newTime - this.lastBulletTime) > this.bulletDelay)) {
		this.currentBulletId += 1;
        this.bullets.push(new Bullet(this.bulletSrc, this.x + this.w, this.y + this.h / 2, this.x - this.lastX, this.currentBulletId));
        this.lastBulletTime = newTime;
    }
};

Player.prototype.hit = function() {
    this.health = this.health - 1;
    
    // If player health <= 0, dead
    if(this.health <= 0) {
        this.alive = false;
		
		console.log("Player is dead!!!");
        console.log("Final Score: " + thisGame.score + "pts");
        console.log("Game End");
    }
};
