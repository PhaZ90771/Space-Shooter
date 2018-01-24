var Game = {
    ///////////////
    // Variables //
    ///////////////
        
        canvas: document.getElementById("gameWindow"),
        debug: true,
        fps: 30,
        
        width: 0,
        height: 0,
        
        mouse: {},
        elements: [],
    ///////////////
    // Functions //
    ///////////////
        
        // Draw Everything
        //----------------
        
        draw: function() {
            //clear
            this.ctx.clearRect(0, 0, this.width, this.height);
            
            //draw
            for(x in Game.elements) {
                //x.draw();
            }
            
        },
        
        // Update Game Info
        //-----------------
        
        update: function() {
            //update
        },
        
        // Start Game Loop
        //---------------
        
        setLoop: function() {
            setInterval(function() {
                Game.draw();
                Game.update();
            }, 1000 / this.fps);
        },
        
        // Init Game
        //----------
        
        init: function(w, h) {
            // Get canvas context
            this.ctx = this.canvas.getContext("2d");
            
            // Set canvas dimensions
            this.width = w || 0;
            this.height = h || 0;
            $("#gameWindow").attr("width", this.width);
            $("#gameWindow").attr("height", this.height);
            
            // Check debug mode
            if(this.debug) {
                $("div#debug").removeClass("hidden");
            }
            
            // Set canvas mousedown function
            $("#gameWindow").mousedown( function(event) {
                event.preventDefault();
                
                p = $("#gameWindow").offset();
                Game.mouse.x = event.pageX - p.left;
                Game.mouse.y = event.pageY - p.top;
                
                $("#cursor").html("(" + Game.mouse.x + ", " + Game.mouse.y + ")");
                
                Player(Game.mouse.x, Game.mouse.y);
            });
            
            // Set canvas mouseup function
            $(document).mouseup( function(event) {
                event.preventDefault();
                
                Game.mouse.x = null;
                Game.mouse.y = null;
            });
            
            this.setLoop();
        }
}

Game.init(800, 600);

function Player(x, y) {
    this.x = x;
    this.y = y;
    this.w = 5;
    this.color = "rgb(255, 0, 0)";
    
    this.draw = function() {
        Game.ctx.fillStyle = this.color;
        Game.ctx.fillRect(this.x - this.w / 2, this.y - this.w / 2, this.w, this.w);
    };
    
    this.update = function(x, y) {
        this.x = x;
        this.y = y;
    };
    
    //Game.elements.push(this);
    Game.elements.push("Hello");
}
