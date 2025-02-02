import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";

class Obstacle1 extends BaseGameObject {
    name = "Obstacle1";
    
    blockGravityForces = true;
    direction = 1; 
    initialHeight = 0; 
    initialY = 0;
    speed = 50; 



    // draw = function() {
    //     global.ctx.fillStyle = "black";
    //         global.ctx.fillRect(this.x, this.y, this.width, this.height)
    //     }

    getBoxBounds = function () {
            let bounds = {
                left: this.x,
                right: this.x + this.width,
                top: this.y,
                bottom: this.y + this.height-1
            }
            return bounds;
        };
    
    move = function () { 
        const heightAdjustment = this.direction * this.speed * global.deltaTime
        this.height += heightAdjustment 
        this.y -= heightAdjustment
    

        
        if (this.height <= this.initialHeight) {
            this.height = this.initialHeight;
            this.y = this.initialY;
            this.direction = 1; 
        }
    

        if (this.y <= 0 && this.direction === 1) {
            this.direction = -1; 
            this.y = this.direction * this.speed * global.deltaTime;
        } /*else if (this.y + this.height >= global.canvas.height && this.direction === -1) {
            this.height = global.canvas.height - this.y;
            this.direction = 1; 
        }*/
    };

    reactToCollision = function(collidingObject) {
        if (collidingObject.name !== 'Ball') {
            this.direction = -1; 
        }
    };

    update = function () { 
        this.move();
    };


    constructor(x, y, width, height, speed) {
        super(x, y, width, height);
        this.initialHeight = height;
        this.initialY = y;
        this.speed = speed;
        this.loadImages(["./images/hydraulic_press_up.png"]);

    }
}


class Obstacle2 extends BaseGameObject {
    name = "Obstacle2";
    
    blockGravityForces = true;
    direction = -1; 
    initialHeight = 0; 
    initialY = 0;
    speed = 50; 





    getBoxBounds = function () {
            let bounds = {
                left: this.x,
                right: this.x + this.width,
                top: this.y+1,
                bottom: this.y + this.height
            }
            return bounds;
        };
    
    move = function () { 
        const heightAdjustment = this.direction * this.speed * global.deltaTime
        this.height -= heightAdjustment 
        
    

        
        if (this.height <= this.initialHeight) {
            this.height = this.initialHeight;
            this.direction = -1; 
        }
    


    };

    reactToCollision = function(collidingObject) {
        if (collidingObject.name !== 'Ball') {
            this.direction = 1; 
        }
    };

    update = function () { 
        this.move();
    };


    constructor(x, y, width, height, speed) {
        super(x, y, width, height);
        this.initialHeight = height;
        this.speed = speed;
        this.loadImages(["./images/hydraulic_press_down.png"]);

    }
}

class Waterpit extends BaseGameObject {
    name = "Waterpit";
 
    blockGravityForces = true;

    animationData = {
        "animationSprites": [],
        "timePerSprite": 0.2,
        "currentSpriteElapsedTime": 0,
        "firstSpriteIndex": 0,
        "lastSpriteIndex": 8,
        "currentSpriteIndex": 0
    };



    
        reactToCollision = function(collidingObject) {
            
        }

        loadImageBasedOnWidth = function() {
            // select right image
            if (this.width < 400) {
                this.loadImagesFromSpritesheet("./images/waterpit_sprite_short.png", 1, 9);
            } else if (this.width >= 400) {
                this.loadImagesFromSpritesheet("./images/waterpit_sprite.png", 1, 9);
            }
        };

    constructor(x, y, width, height) {
        super(x, y, width, height);
        // this.loadImages(["./images/water2.png"]);
        this.loadImageBasedOnWidth();

    }
}

export {Obstacle1, Obstacle2, Waterpit}