import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";
import { loadLevel, currentLevelIndex } from "../modules/levels.js";

class Ball extends BaseGameObject{
    name = 'Ball';
    useGravityForces = true;
    xVelocity = 0;
    yVelocity = 0;
    ballVelocityX = 0;
    ballVelocityY = 0;
    hasHitHole = false;


    physicsData = {
        "fallVelocity": 0,
        "terminalVelocity": 53,
        "jumpForce": 0, 
        "prevFallingVelocity": 0,
        "jumpForceDecay": 2,
        "isGrounded": false,
        "velocityDecay" : 0.99,
        "minVelocity" : 2,
        "restitution" : 0.8,
        "frictionFactor" : 0.9
    }

    animationData = {
        "animationSprites": [],
        "timePerSprite": 0.08,
        "currentSpriteElapsedTime": 0,
        "firstSpriteIndex": 0,
        "lastSpriteIndex": 3,
        "currentSpriteIndex": 0
    };

    draw = function() {
        
       
        let sprite;
        if (Math.abs(this.xVelocity) > 0.01 || Math.abs(this.yVelocity) > 0.01) {
            sprite = this.getNextSprite(); 
        } else {
            sprite = this.animationData.animationSprites[this.animationData.currentSpriteIndex];
        }
    
        global.ctx.drawImage(sprite, this.x, this.y, this.width, this.height);
    };

    applyGravity = function () {

        if (!this.useGravityForces)
            return;
       
        this.physicsData.fallVelocity += global.gravityForce * global.deltaTime * global.pixelToMeter;
        
        if (this.physicsData.jumpForce > 0) {

            this.physicsData.fallVelocity += -(global.gravityForce * global.deltaTime * global.pixelToMeter) + (global.gravityForce * global.deltaTime * global.pixelToMeter) * this.physicsData.jumpForceDecay;
            if (this.physicsData.isGrounded == true) {
               this.physicsData.fallVelocity = -this.physicsData.jumpForce * global.pixelToMeter;
               this.physicsData.prevFallingVelocity = this.physicsData.fallVelocity * global.deltaTime;
            }
    
            this.physicsData.isGrounded = false;
     
            if (this.physicsData.fallVelocity >= 0) {
                this.physicsData.jumpForce = 0;
            }
        }
 
        if (this.physicsData.fallVelocity > this.physicsData.terminalVelocity * global.pixelToMeter) {
            this.physicsData.fallVelocity = this.physicsData.terminalVelocity  * global.pixelToMeter;
        }

        this.y += (this.physicsData.fallVelocity * global.deltaTime + this.physicsData.prevFallingVelocity) / 2;
        this.physicsData.prevFallingVelocity = this.physicsData.fallVelocity  * global.deltaTime;

        for (let i = 0; i < global.allGameObjects.length; i++) {
            let otherObject = global.allGameObjects[i];
            if (otherObject.active == true && otherObject.blockGravityForces == true && otherObject.name !== 'Hole'&& otherObject.name !== 'Waterpit') {  //it will never collide with the hole 
                let collisionHappened = global.detectBoxCollision(this, otherObject);
                if (collisionHappened) {
                    const otherBounds = otherObject.getBoxBounds();
                    const ballBounds = this.getBoxBounds();

                    if (this.physicsData.fallVelocity > 0 && ballBounds.bottom >= otherBounds.top && ballBounds.top < otherBounds.top &&
                        ballBounds.right > otherBounds.left && ballBounds.left < otherBounds.right) {
                        // Collision from the top of the block
                        this.physicsData.isGrounded = true;
                        this.y = otherBounds.top - this.height - (ballBounds.bottom - (this.y + this.height)) - (global.deltaTime * 0.1); 
                        this.physicsData.fallVelocity = 0; 
                    } else if (this.physicsData.fallVelocity < 0 && ballBounds.top <= otherBounds.bottom && ballBounds.bottom > otherBounds.bottom &&
                        ballBounds.right > otherBounds.left && ballBounds.left < otherBounds.right) {
                        this.y = otherBounds.bottom - (ballBounds.top - this.y) - (global.deltaTime * 0.1); 
                        this.physicsData.fallVelocity = 0; 
                    }
        
                    // Check for horizontal collision (left or right)
                    if (this.xVelocity > 0 && ballBounds.right >= otherBounds.left && ballBounds.left < otherBounds.left &&
                        ballBounds.bottom > otherBounds.top && ballBounds.top < otherBounds.bottom) {
                        // Collision from the left side of the block
                        this.xVelocity = -this.xVelocity * 0.9; // Reverse and dampen velocity
                        this.x = otherBounds.left - this.width; 
                    } else if (this.xVelocity < 0 && ballBounds.left <= otherBounds.right && ballBounds.right > otherBounds.right &&
                        ballBounds.bottom > otherBounds.top && ballBounds.top < otherBounds.bottom) {
                        // Collision from the right side of the block
                        this.xVelocity = -this.xVelocity * 0.9; // Reverse and dampen velocity
                        this.x = otherBounds.right;
                    }
        
                    
                    this.physicsData.jumpForce = 0;
                    this.physicsData.prevFallingVelocity = 0;
                    this.physicsData.jumpForceStart = 0;
                }
            }   
        }    
    };

     

    reactToCanvas = function () {
        if (this.x <= 0) {
            this.xVelocity = -this.xVelocity * this.physicsData.restitution;            
            this.x = 0;
        }
    
        if (this.x + this.width >= canvas.width) {
            this.xVelocity = -this.xVelocity * this.physicsData.restitution;
            this.x = canvas.width - this.width; 
        }

        if (this.y <= 0) {
            this.yVelocity = -this.yVelocity * this.physicsData.restitution;
            this.y = 0; 
        }
    
        if (this.y + this.height >= canvas.height) {
            this.yVelocity = -this.yVelocity * this.physicsData.restitution;
            this.y = canvas.height - this.height; 
        }
    };

    reactToCollision = function (collidingObject) {
        
        const ballBounds = this.getBoxBounds();

    
         if (collidingObject.name === "Waterpit") {
            global.strokecount += 3;
            global.counter.innerHTML = global.strokecount;
            loadLevel(currentLevelIndex);
            let waterSound = new Audio('Audio/water_hit.wav');
           waterSound.play();
            }
       

        if (collidingObject.name === 'Hole') {
            if (!this.hasHitHole) {
                this.hasHitHole = true; // Set flag 
                this.xVelocity = 0;
                this.yVelocity = 0;
                let holeSound = new Audio('Audio/hole_hit.wav');
                holeSound.play();loadLevel(currentLevelIndex + 1);
                
            }
        }
        
        if (collidingObject.name === 'Block') {
            const blockBounds = collidingObject.getBoxBounds();
            const restitution = this.physicsData.restitution;
            const frictionFactor = this.physicsData.frictionFactor;

            if (this.yVelocity > 0 && ballBounds.bottom >= blockBounds.top && ballBounds.top < blockBounds.top) {
                 this.yVelocity = -this.yVelocity * restitution;
                this.y = blockBounds.top - this.height; 
            }
    
            if (this.yVelocity < 0 && ballBounds.top <= blockBounds.bottom && ballBounds.bottom > blockBounds.bottom) {
                this.yVelocity = -this.yVelocity * restitution;
                this.y = blockBounds.bottom; 
            }
            if (this.xVelocity < 0 && ballBounds.left <= blockBounds.right && ballBounds.right > blockBounds.right) {
                this.xVelocity = -this.xVelocity * restitution; 
                this.x = blockBounds.right;
            }
            if (this.xVelocity > 0 && ballBounds.right >= blockBounds.left && ballBounds.left < blockBounds.left) {
            
                this.xVelocity = -this.xVelocity * restitution; 
                this.x = blockBounds.left - this.width; 
        }
    }
    };



    update = function () { 
        
        this.xVelocity *= 0.99; 
        this.yVelocity *= 0.99; 

        if (Math.abs(this.xVelocity) < this.physicsData.minVelocity) {
            this.xVelocity = 0;
        }
        if (Math.abs(this.yVelocity) < this.physicsData.minVelocity) {
            this.yVelocity = 0;
        }
        
        this.x += this.xVelocity * global.deltaTime;
        this.y += this.yVelocity * global.deltaTime;

        this.reactToCanvas();
    };



    constructor(x, y, width, height) {
        super(x, y, width, height);
        // this.loadImages(["./images/golf_ball.webp"]);
        this.loadImagesFromSpritesheet("./images/golf_ball.png", 2, 2);

    }
}

export {Ball}

