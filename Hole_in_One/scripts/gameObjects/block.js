import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";

class Block extends BaseGameObject {
    name = "Block";

    blockGravityForces = true;


    constructor(x, y, width, height) {
        super(x, y, width, height);

        if (this.height > this.width) {
            this.loadImages(["./images/dirt.png"]);}
            else {
            this.loadImages(["./images/grass.png"]);
            }

    }
}

export {Block}