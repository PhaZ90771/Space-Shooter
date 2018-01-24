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
        
        //console.log("Key [" + keyCode + "] has been pressed");
        
        if($.inArray(keyCode, [9, 32, 33, 34, 35, 36, 37, 38, 39, 40]) !== -1) {
            event.preventDefault();
        }
        
        that.keyboard[keyCode] = true;
    };
    document.onkeyup = function(event) {
        keyCode = (event.which) ? event.which : event.keyCode;
        
        //console.log("Key [" + keyCode + "] has been released");
        
        that.keyboard[keyCode] = false;
    };
    
    // Create date object
    this.date = new Date();
    
    // Set current time
    this.newTime = this.date.getTime();
    this.oldTime = this.newTime;
    
    // Set main game loop
    that = this;
    this.interval = setInterval(function() {
        that.run();
    }, 1000 / that.fps);
    
    // Create Player
    this.thisPlayer = new Player(this);
    
    // Player health bar
    this.healthBar = {};
    this.healthBar.x = 10;
    this.healthBar.y = 10;
    this.healthBar.w = 5;
    this.healthBar.h = 10;
    
    // Create EnemyAI
    this.thisEnemyAI = new EnemyAI(this.ctx);
    
    // Creat background
    this.thisBackground = new Background(this.width, this.height, 50);
    
    // Score
    this.score = 0;
    
    // Echo object creation to console
    console.log("Game was succesfully created.");
    console.log("     Resultion was set to " + this.width + "x" + this.height + ".");
    console.log("     Debug was set to " + this.debug + ".");
    console.log("     FPS was set to " + this.fps + ".");
}

// Main loop
Game.prototype.run = function() {
    //console.log("Game run starting");
    if(this.thisPlayer.alive) {
        this.update();
        this.draw();
    }
	else {
		// Update Background
	    this.thisBackground.update(this.ctx);
		
		// Clear canvas
    	this.ctx.clearRect(0, 0, this.width, this.height);
		
		// Draw background
	    this.thisBackground.draw(this.ctx);
		
		// Draw GUI Score
		fontSize = 50;
		this.ctx.font = "normal " + fontSize + "px Verdana";
		this.ctx.fillStyle = "rgb(0, 255, 0)";

		message1 = "Game Over!";
		message2 = "Final Score: " + thisGame.score + "pts"
		message3 = "Press Enter to Reload.";
		
		length1 = this.ctx.measureText(message1).width;
		length2 = this.ctx.measureText(message2).width;
		length3 = this.ctx.measureText(message3).width;
		
		this.ctx.fillText(message1, (this.ctx.canvas.width / 2) - (length1 / 2), (this.ctx.canvas.height / 2) - fontSize - 10);
		this.ctx.fillText(message2, (this.ctx.canvas.width / 2) - (length2 / 2), (this.ctx.canvas.height / 2));
		this.ctx.fillText(message3, (this.ctx.canvas.width / 2) - (length3 / 2), (this.ctx.canvas.height / 2) + fontSize + 10);
		
		if(this.keyboard[ENTER]) {
			clearInterval(thisGame.interval);
        	thisGame = new Game(RESX, RESY, DEBUG, FPS);
		}
	}
};

// Log
Game.prototype.logTime = function() {
    //console.log("Game logging starting");
    
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
    //console.log("Game update starting");
    
    // Update debug visibility
    /*if(this.debug) {
        $("#debug").removeClass("hidden");
    }
    else {
        $("#debug").addClass("hidden");
    }*/
    
    // Update Background
    this.thisBackground.update(this.ctx);
    
    // Update Player
    this.thisPlayer.update(this.keyboard, this.ctx);
    
    // Update EnemyAI
    this.thisEnemyAI.update(this.ctx);
    
    // Check collision
    for(x in this.thisEnemyAI.enemies) {
        CollisionDetection(this.thisPlayer, this.thisEnemyAI.enemies[x]);
		if(!this.thisEnemyAI.enemies[x].alive) {
			continue;	
		}
        for(y in this.thisPlayer.bullets) {
			if(!this.thisPlayer.bullets[y].alive) {
				continue;	
			}
            CollisionDetection(this.thisPlayer.bullets[y], this.thisEnemyAI.enemies[x]);
			if(!this.thisEnemyAI.enemies[x].alive) {
				break;	
			}
        }
    }
};

// Draw
Game.prototype.draw = function() {
    //console.log("Game draw starting");
    
    // Log
    this.logTime();
    
    // Clear canvas
    this.ctx.clearRect(0, 0, this.width, this.height);
    
    // Draw background
    this.thisBackground.draw(this.ctx);
    
    // Draw GUI Health Bar
    i = 0;
    while(i < 10) {
        if(i < this.thisPlayer.health) {
            this.ctx.fillStyle = "rgb(0, 255, 0)";
            this.ctx.fillRect(this.healthBar.x + i * this.healthBar.w * 2, this.healthBar.y, this.healthBar.w, this.healthBar.h);
        }
        else {
            this.ctx.strokeStyle = "rgb(0, 255, 0)";
            this.ctx.strokeRect(this.healthBar.x + i * this.healthBar.w * 2, this.healthBar.y, this.healthBar.w, this.healthBar.h);
        }
        i += 1;
    }
    
    // Draw Score
	this.drawScore();
    
    // Update EnemyAI
    this.thisEnemyAI.draw(this.ctx);
    
    // Update Player
    this.thisPlayer.draw(this.ctx);
};

// Draw Score
Game.prototype.drawScore = function() {
	// Draw GUI Score
    this.ctx.font = "normal 15px Verdana";
    this.ctx.fillStyle = "rgb(0, 255, 0)";
    this.ctx.fillText(this.score + "pts", 10, 40);
}