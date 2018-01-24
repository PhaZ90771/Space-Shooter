//////////
// STAR //
//////////

// Constructor
function Star(x, y, size) {
    // Star location and size
    this.x = x;
    this.y = y;
    this.size = size;
    
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
    this.x -= 1;
    
    // Wrap stars
    if(this.x < 0) {
        this.x = ctx.canvas.width;
    }
};

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
    this.maxSize = 3;
    this.range = this.maxSize - this.minSize;
    
    //Prevents stars from partially overlapping
    this.spacing = 10;
    
    // Create num stars
    for( var i = 0; i < this.num; i++ ) {
        // Generate coordinates
        x = Math.floor(Math.random() * (w / this.spacing)) * this.spacing;
        y = Math.floor(Math.random() * (h / this.spacing)) * this.spacing;
        
        // Generate size
        size = Math.floor(Math.random() * this.range) + this.minSize;
        
        // Create star
        this.stars.push(new Star(x, y, size));
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
}

//////////////
//  PLAYER  //
//////////////

// Constructor
function Player() {
    // Player location and size
    this.x = 200;
    this.y = 200;
    this.size = 200;
    
    // Player color
    this.color = "green";
    
    // Player state
    this.alive = true;
    
    // Player velocity
    this.v = {x: 0, y: 0};
    
    // Player thrust
    this.thrust = 5;
    
    //// NOTE: velocity and thrust are seperate, so movement can be
    ////       quickly converted to momentum based if I decide to
    ////       switch it in the future.
}

// Draw method
Player.prototype.draw = function(ctx) {
    // Check state of player before drawing
    if(this.alive) {
        // Draw character
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }
};

// Update method
Player.prototype.update = function(keyboard, ctx) {
    // Check state of player before updating
    if(this.alive) {
        // Move player when arrow keys are pressed
        if(keyboard[37]) {this.v.x = -this.thrust;}
        if(keyboard[38]) {this.v.y = -this.thrust;}
        if(keyboard[39]) {this.v.x = this.thrust;}
        if(keyboard[40]) {this.v.y = this.thrust;}
        
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
        else if(this.x + this.size > ctx.canvas.width) {
            this.x = ctx.canvas.width - this.size;
            
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
        else if(this.y + this.size > ctx.canvas.height) {
            this.y = ctx.canvas.height - this.size;
            
            //// NOTE: Bounce effect removed for now at least, since it's 
            ////       worthless unless movement is momentum based.
            //this.v.y *= -0.9;
        }
        
        // Reset velocity
        this.v.x = 0;
        this.v.y = 0;
    }
};

////////////
//  GAME  //
////////////

// Constructor
function Game(width, height, debug, fps) {
    // Set width
    if(width === "undefined") {
        console.warn("Game width was not set, defaulting to 1024.");
        this.width = 1024;
    }
    else {
        this.width = width;
    }
    $("#window").css("width", (this.width + 2));
    $("#gameWindow").css("width", (this.width));
    $("#gameWindow").attr("width", (this.width));
    
    // Set height
    if(height === "undefined") {
        console.warn("Game height was not set, defaulting to 768.");
        this.height = 768;
    }
    else {
        this.height = height;
    }
    $("#window").css("height", (this.height + 2));
    $("#gameWindow").css("height", (this.height));
    $("#gameWindow").attr("height", (this.height));
    
    // Set debug mode
    if(debug === "undefined") {
        console.warn("Debug mode was not set, defaulting to false.");
        this.debug = false;
    }
    else {
        this.debug = debug;
    }
    if(this.debug) {
        $("#debug").removeClass("hidden");
        $("#debug").html( $("#debug").html() + "<p id='difTime'>&nbsp;</p>" );
        $("#debug").html( $("#debug").html() + "<p id='fps'>&nbsp;</p>" );
        $("#debug").html( $("#debug").html() + "<p id='key'>&nbsp;</p>" );
    }
    
    // Set frames per second
    if(fps === "undefined") {
        console.warn("FPS was not set, defaulting to 30.");
        this.fps = 30;
    }
    else {
        this.fps = fps;
    }
    
    // Set canvas
    this.canvas = document.getElementById("gameWindow");
    if(this.canvas === "undefined") {
        console.error("Could not find #gameWindow.");
        return false;
    }
    // Set canvas context
    this.ctx = this.canvas.getContext('2d');
    if(this.ctx === "undefined") {
        console.error("Could create context.");
        return false;
    }
    
    // Holds mouse state
    this.mouse = {};
    
    // Holds keyboard state
    this.keyboard = [];
    this.lastKey = null;
    that = this;
    
    // Set onkeydown and onkeyup events
    document.onkeydown = function(event) {
        keyCode = (event.which) ? event.which : event.keyCode;
        that.lastKey = keyCode;
        
        if($.inArray(keyCode, [9, 32, 33, 34, 35, 36, 37, 38, 39, 40]) !== -1) {
            event.preventDefault();
        }
        
        that.keyboard[keyCode] = true;
    };
    document.onkeyup = function(event) {
        keyCode = (event.which) ? event.which : event.keyCode;
        
        that.keyboard[keyCode] = false;
    };
    
    // Create date object
    this.date = new Date();
    
    // Set current time
    this.newTime = this.date.getTime();
    this.oldTime = this.newTime;
    
    // Set main game loop
    that = this;
    setInterval(function() {
        that.run();
    }, 1000 / that.fps);
    
    // Create elements
    this.elements = [];
    this.elements.push(new Player());
    
    // Creat background
    this.thisBackground = new Background(this.width, this.height, 30);
    
    // Echo object creation to console
    console.log("Game was succesfully created.");
    console.log("     Resultion was set to " + this.width + "x" + this.height + ".");
    console.log("     Debug was set to " + this.debug + ".");
    console.log("     FPS was set to " + this.fps + ".");
}

// Main loop
Game.prototype.run = function() {
    this.update();
    this.draw();
};

// Log
Game.prototype.logTime = function() {
    // Log info
    this.date = new Date();
    this.newTime = this.date.getTime();
    difTime = this.newTime - this.oldTime;
    fps = Math.round(1000 / difTime);
    
    // Update debug info
    if(this.debug) {
        $("#difTime").html("FT: " + difTime + " msec");
        $("#fps").html("FPS: " + fps + " frames");
        $("#key").html("KEY: " + this.lastKey);
    }
    
    // Send debug info to console
    if(this.debug.framewatch) {
        console.log("Current frame executed at: " + this.date.getTime());
        console.log("Last frame executed at   : " + this.oldTime);
        console.log("Time since last frame is " + difTime + "fps");
        console.log("Last key pressed was " + this.lastKey);
    }
    
    // Pass set time as old time
    this.oldTime = this.newTime;
};

// Update
Game.prototype.update = function() {
    // Update debug visibility
    /*if(this.debug) {
        $("#debug").removeClass("hidden");
    }
    else {
        $("#debug").addClass("hidden");
    }*/
    
    // Update Background
    this.thisBackground.update(this.ctx);
    
    // Update elements
    for(x in this.elements) {
        this.elements[x].update(this.keyboard, this.ctx);
    }
};

// Draw
Game.prototype.draw = function() {
    // Log
    this.logTime();
    
    // Clear canvas
    this.ctx.clearRect(0, 0, this.width, this.height);

    
    // Draw background
    this.thisBackground.draw(this.ctx);
    
    // Draw elements
    for(x in this.elements) {
        this.elements[x].draw(this.ctx);
    }
};