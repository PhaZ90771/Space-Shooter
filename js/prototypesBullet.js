////////////
// BULLET //
////////////

// Constructor
function Bullet(src, x, y, extraSpeed, id) {
    // Bullet speed and position
    this.speed = 10 + extraSpeed;
    this.x = x - this.speed;
    this.y = y;
    
    // Create log entry for created bullet
    //console.log("Creating bullet at (" + this.x + "," + this.y + ")");
    
    // State
    this.alive = true;
    this.what = "Bullet";
	this.id = id;
    
    // Ship bullet image
    this.img = new Image();
    this.img.src = src;
    this.w = this.img.width;
    this.h = this.img.height;
    this.loaded = false;
    thatBullet = this;
    this.img.onload = function() {
        thatBullet.loaded = true;
        //console.log("Bullet image has been loaded.");
    }
}

// Draw method
Bullet.prototype.draw = function(ctx) {
    // Draw if image has been loaded
    if(this.loaded) {
        ctx.drawImage(this.img, this.x, this.y - this.h / 2);
    }
}

// Update method
Bullet.prototype.update = function(ctx) {
    // Move bullet
    this.x += this.speed;
    
    // Kill if off screen
    if(this.x > ctx.canvas.width) {
        this.alive = false;
    }
}

Bullet.prototype.hit = function() {
    // Kill bullet
    this.alive = false;
}