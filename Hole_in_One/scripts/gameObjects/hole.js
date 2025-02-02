import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";

class Hole extends BaseGameObject {
    name = "Hole";

    blockGravityForces = true;

    physicsData = {
        "fallVelocity": 0,
        "terminalVelocity": 53,
        "jumpForce": 0, 
        "prevFallingVelocity": 0,
        "jumpForceDecay": 2,
        "isGrounded": true
    }
    draw = function() {
            global.ctx.fillStyle = "white";
            global.ctx.fillRect(this.x, this.y, this.width, this.height)
        }
    
    

    constructor(x, y, width, height) {
        super(x, y, width, height);

    }
}

export {Hole}