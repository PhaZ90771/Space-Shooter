/////////////
//  ENEMY  //
/////////////

// Constructor
function Enemy(ctx, id) {
    this.locX = ctx.canvas.width + 10;
    this.locY = Math.floor(Math.random() * ctx.canvas.height);
    
    this.minSize = 1;
    this.maxSize = 5;
    this.sizeIncrement = 5;
    this.rangeSize = this.maxSize - this.minSize + 1;
    this.size = (Math.floor(Math.random() * this.rangeSize) + this.minSize) * this.sizeIncrement;
    
    this.health = this.size / this.sizeIncrement;
    
    console.log("New enemy created of size " + this.size + " and of health " + this.health);
    
    this.x = this.locX - this.size;
    this.y = this.locY - this.size;
    this.w = this.size * 2;
    this.h = this.size * 2;
    
    this.speed = this.maxSize - (this.size / this.sizeIncrement) + 1;
    
    this.minSides = 8;
    this.maxSides = 16;
    this.rangeSides = this.maxSize - this.minSize;
    this.sides = Math.floor(Math.random() * this.rangeSides) + this.minSides;
    
    this.color = "rgb(165, 150, 146)";
    
    this.alive = true;
    this.what = "Enemy";
	this.id = id;
}

// Draw method
Enemy.prototype.draw = function(ctx) {
    if(this.alive) {
        ctx.fillStyle = this.color;
        
        ctx.beginPath();
            a = 0;
            ctx.moveTo(Math.cos(2*Math.PI/this.sides*a)*this.size + this.locX, Math.sin(2*Math.PI/this.sides*a)*this.size + this.locY);
            for(a = 1; a < this.sides; a++) {
                ctx.lineTo(Math.cos(2*Math.PI/this.sides*a)*this.size + this.locX, Math.sin(2*Math.PI/this.sides*a)*this.size + this.locY);
            }
        ctx.fill();
    }
};

// Update method
Enemy.prototype.update = function(ctx) {
    if(this.alive) {
        this.move();
        
        if(this.locX < 0) {
            this.alive = false;
        }
    }
};

// Move method
Enemy.prototype.move = function(ctx) {
    this.locX -= this.speed;
    
    this.x = this.locX - this.size;
}

Enemy.prototype.hit = function() {
 	console.log("ENEMY HIT! " + this.health + " -> " + (this.health - 1))
    this.health = this.health - 1;
    
    if(this.health <= 0) {
		console.log("  DETROYED!");
        this.alive = false;
        thisGame.score = thisGame.score + this.size;
    }
}