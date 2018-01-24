//////////////
// ENEMY AI //
//////////////

// Constructor
function EnemyAI(ctx) {
	// State
	this.what = "EnemyAI";
	this.currentEnemyId = 0;
	
    // Create Timer
    this.d = new Date();
    this.lastEnemy = this.d.getTime();
    this.delay = 1000;
    this.minDelay = 500;
    this.changeInDelay = 100;
    
    // Create counter
    this.counter = 10;
    
    // Create Enemies
    this.enemies = [];
	this.currentEnemyId += 1;
    this.enemies.push(new Enemy(ctx, this.currentEnemyId));
}

EnemyAI.prototype.update = function(ctx) {
    // Update enemies and remove the dead ones
    for(x in this.enemies) {
        this.enemies[x].update(ctx)
        if(!this.enemies[x].alive) {
            this.enemies.splice(x,1);
        }
    }
    
    // Get current time
    this.d = new Date();
    newTime = this.d.getTime();
    
    // Spawn enemies at a set interval
    if(newTime - this.lastEnemy >= this.delay) {
        this.lastEnemy = newTime;
        
        // Spawn new enemy
		this.currentEnemyId += 1;
        this.enemies.push(new Enemy(ctx, this.currentEnemyId));
        
        // Increase spawn speed every 10 enemies until the minumum of 500ms
        if(this.delay >= this.minDelay) {
            this.counter -= 1;
            if(this.counter <= 0) {
                this.delay -= this.changeInDelay;
                this.counter = 10;
            }
        }
    }
}

EnemyAI.prototype.draw = function(ctx) {
    // Draw all enemies
    for(x in this.enemies) {
        this.enemies[x].draw(ctx)
    }
}