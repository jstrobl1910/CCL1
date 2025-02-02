import { global } from "./global.js";
import { BaseGameObject } from "../gameObjects/baseGameObject.js";
import { Ball } from "../gameObjects/ball.js";
import { Block } from "../gameObjects/block.js";
import { Hole } from "../gameObjects/hole.js";
import { Obstacle1 } from "../gameObjects/obstacles.js";
import { Obstacle2 } from "../gameObjects/obstacles.js";
import { loadLevel } from "./levels.js";


function gameLoop(totalRunningTime) { 
    global.deltaTime = totalRunningTime - global.prevTotalRunningTime; // Time in milliseconds between frames
    global.deltaTime /= 1000; // Convert milliseconds to seconds for consistency in calculations
    global.prevTotalRunningTime = totalRunningTime; // Save the current state of "totalRunningTime", so at the next call of gameLoop (== next frame) to calculate deltaTime again for that next frame.
    global.ctx.clearRect(0, 0, global.canvas.width, global.canvas.height); // Completely clear the canvas for the next graphical output 
    
    for (var i = 0; i < global.allGameObjects.length; i++) { //loop in the (game)loop -> the gameloop is continous anyways.. and on every cylce we do now loop through all objects to execute several operations (functions) on each of them: update, draw, collision detection, ...
        if (global.allGameObjects[i].active == true) {
            global.allGameObjects[i].storePositionOfPreviousFrame();
            global.allGameObjects[i].update();
            global.checkCollisionWithAnyOther(global.allGameObjects[i]);
            global.allGameObjects[i].applyGravity();
            global.allGameObjects[i].draw();
        }
    }
    
    requestAnimationFrame(gameLoop); 
}

loadLevel(0);  
requestAnimationFrame(gameLoop);

document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
        global.deltaTime = performance.now();
    }
});


