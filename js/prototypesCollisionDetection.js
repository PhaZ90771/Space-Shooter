function CollisionDetection(obj1, obj2) {
    if((typeof obj1 == "object") && (typeof obj2 == "object")) {
        if((obj1.alive) && (obj2.alive)) {
            if( (obj2.x < (obj1.x+obj1.w)) && 
            /**/(obj1.x < (obj2.x+obj2.w)) && 
            /**/(obj2.y < (obj1.y+obj1.h)) && 
            /**/(obj1.y < (obj2.y+obj2.h))) {
				console.group("Collision Detected");
				//console.time("ColDet");
				
				console.log("Object 1: " + obj1.what + " " + obj1.id);
				//console.dirxml(obj1);
				
				obj1.hit();
				
				console.log("Object 2: " + obj2.what + " " + obj2.id);
				//console.dirxml(obj2);
				
                obj2.hit();
				
				//console.timeEnd("ColDet");
				console.groupEnd();
				
                return true;
            }
			return false;
        }
		console.group("Dead Object");
		console.log(obj1.what + " " + obj1.id + " is alive = " + obj1.alive);
		console.log(obj2.what + " " + obj2.id + " is alive = " + obj2.alive);
		console.log("Object was not alive, cannot do collision detection");
		console.groupEnd();
		return false;
    }
	
	console.group("Udefined Object");
	if(typeof obj1 !== "object") {
		console.error("obj1 is not object");
	}
	if(typeof obj2 !== "object") {
		console.error("obj2 is not object");
	}
	console.error("Object did not exist, cannot do collision detection");
	console.groupEnd();
    return false;
}