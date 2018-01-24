////////////////
// BACKGROUND //
////////////////

// Constructor
function Background(w, h, num) {
    // Create empty array for stars
    this.stars = [];
    
    // Number of stars to create
    this.num = num;
    
    // Color of background
    this.color = "black";
    
    // Size range of stars
    this.minSize = 1;
    this.maxSize = 51;
    this.range = this.maxSize - this.minSize;
    
    //Prevents stars from partially overlapping
    this.spacing = 10;
    
    // Create num stars
    for( var i = 0; i < this.num; i++ ) {
        // Generate coordinates
        x = Math.floor(Math.random() * (w / this.spacing)) * this.spacing;
        y = Math.floor(Math.random() * (h / this.spacing)) * this.spacing;
        
        // Generate size
        size = (Math.floor(Math.random() * this.range) + this.minSize) / 25;
        speed = size - this.minSize + 1;
        
        // Create star
        this.stars.push(new Star(x, y, size, speed));
    }
}

// Draw method
Background.prototype.draw = function(ctx) {
    //Draw background
    ctx.fillStyle = this.color;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    // Draws stars
    for(x in this.stars) {
        this.stars[x].draw(ctx);
    }
};

// Update method
Background.prototype.update = function(ctx) {
    // Update stars
    for(x in this.stars) {
        this.stars[x].update(ctx);
    }
};