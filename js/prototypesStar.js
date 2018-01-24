//////////
// STAR //
//////////

// Constructor
function Star(x, y, size, speed) {
    // Star location and size
    this.x = x;
    this.y = y;
    this.size = size;
    this.speed = speed;
    
    // How large glow is in relation to the star size
    this.glowPercent = 180 / 100;
    
    // Star color and glow color
    this.color = "rgb(255, 255, 0)";
    this.colorGlow = "rgba(255, 255, 0, 0.25)";
}

// Draw method
Star.prototype.draw = function(ctx) {
    // Draw glow
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size * this.glowPercent, 0, (2 * Math.PI), true);
    ctx.fillStyle = this.colorGlow;
    ctx.fill();
    
    // Draw star
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, (2 * Math.PI), true);
    ctx.fillStyle = this.color;
    ctx.fill();
};

// Update method
Star.prototype.update = function(ctx) {
    // Move stars
    this.x -= this.speed;
    
    // Wrap stars
    if(this.x < 0) {
        this.x += ctx.canvas.width;
    }
};