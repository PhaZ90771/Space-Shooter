document.onscroll = function(e) {
    if (e && e.preventDefault) {
        e.preventDefault();
    }
    
    return false;
}

/////////////////////////////////////////
// Canceling drag and selection events //
/////////////////////////////////////////

/*var canvasElement = document.getElementById('gameWindow');

// do nothing in the event handler except canceling the event
canvasElement.ondragstart = function(e) {
    if (e && e.preventDefault) {
        e.preventDefault();
    }
    
    if (e && e.stopPropagation) {
        e.stopPropagation();
    }
    
    return false;
}

// do nothing in the event handler except canceling the event
canvasElement.onselectstart = function(e) {
    if (e && e.preventDefault) {
        e.preventDefault();
    }
    
    if (e && e.stopPropagation) {
        e.stopPropagation();
    }
    
    return false;
}*/

/////////////////////////////////////
//Canceling mobile window movement //
/////////////////////////////////////

/*document.body.ontouchstart = function(e) {
    if (e && e.preventDefault) {
        e.preventDefault();
    }
    
    if (e && e.stopPropagation) {
        e.stopPropagation();
    }
    
    return false;
}

document.body.ontouchmove = function(e) {
    if (e && e.preventDefault) {
        e.preventDefault();
    }
    
    if (e && e.stopPropagation) {
        e.stopPropagation();
    }
    
    return false;
}*/