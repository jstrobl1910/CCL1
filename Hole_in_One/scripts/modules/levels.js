import { global } from "./global.js";
import { Ball } from "../gameObjects/ball.js";
import { Block } from "../gameObjects/block.js";
import { Hole } from "../gameObjects/hole.js";
import { Obstacle1, Obstacle2, Waterpit } from "../gameObjects/obstacles.js";

export function setupLevel1() {
    // Clear out old objects from a previous level
    global.allGameObjects = [];


    // Create the ball
    global.playerObject = new Ball(0,129,20,20);

    // Create blocks and obstacles
    new Block(0,150,500,20);
    new Obstacle1(200,130,20,20,50);
    new Obstacle2(200,0,20,20,50);
    new Waterpit(500,150,100,10);
    new Block(500,160,100,10);
    new Block(600,150,200,20);
    new Obstacle1(200,280,20,20,50);
    new Obstacle2(400,170,20,20,50);
    new Block(200,300,800,20);
    new Block(0,450,840,20);
    new Block(880,450,120,20);
    new Block(820,470,20,50);
    new Block(880,470,20,50);
    new Block(840,515,40,5);
    new Hole(840,510,40,5);


}

export function setupLevel2() {
    // Clear out old objects from a previous level
    global.allGameObjects = [];

    global.playerObject = new Ball(10,119,20,20);

  
    new Block(0,120,150,20);
    new Block(150,130,100,10);
    new Waterpit(150,120,100,10);
    new Block(250,120,400,20);
    new Obstacle2(350,0,20,20,50);
    new Block(500,90,30,30);
    new Block(300,240,500,20);
    new Waterpit(800,240,200,10);
    new Block(800,250,200,10);
    new Obstacle2(350,140,20,10,50);
    new Obstacle1(350,230,20,10,50);
    new Block(300,260,20,300);
    new Block(800,250,200,10);
    new Block(0,320,120,10);
    new Block(180,420,120,10);
    new Block(0,520,120,10);
    new Block(210,660,160,10);
    new Block(450,550,200,20);
    new Block(750,410,250,20);
    new Obstacle2(750,430,20,10,50);
    new Obstacle1(750,540,20,10,50);
    new Waterpit(650,550,100,10);
    new Block(650,560,100,10);
    new Block(750,550,130,20);
    new Block(860,570,20,50);
    new Block(920,570,20,50); 
    new Block(880,615,40,5);  
    new Hole(880,610,40,5);
    new Block(920,550,80,20);
    new Waterpit(0,690,1000,10);

}

const levels = [ setupLevel1 , setupLevel2,];
export let currentLevelIndex = 0;


export function loadLevel(index) {
    if (index < 0) {
        console.warn("Level index out of range:", index);
        return;
    }

    if (index >= levels.length) {
        showEndScreen(); 
        return;
    }

    if (index !== currentLevelIndex) {
        global.strokecount = 0;
        global.counter.innerHTML = 0;
      }

    currentLevelIndex = index;
    levels[index]();

    if (global.playerObject) {
      global.playerObject.hasHitHole = false;
  }

}


const startButton = document.getElementById("startButton");
const startScreen = document.getElementById("startScreen");
const strokeCount = document.getElementById("strokeCount");
startButton.addEventListener("click", () => {
  startScreen.style.display = "none";
  strokeCount.style.display = "block"; 
  loadLevel(0); 
});


const endScreen = document.getElementById("endScreen");
const playAgainButton = document.getElementById("againButton");

playAgainButton.addEventListener("click", () => {
  endScreen.style.display = "none";
  strokeCount.style.display = "block"; 
  global.strokecount = 0;
  global.counter.innerHTML = 0;
  currentLevelIndex = 0; 
  loadLevel(0); 
});

function showEndScreen() {
  endScreen.style.display = "flex"; 
  strokeCount.style.display = "none";
}