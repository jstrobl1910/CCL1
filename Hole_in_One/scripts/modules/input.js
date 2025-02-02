import { global } from "./global.js";

    
function shootball(xPosition, yPosition) {


    const ballX = global.playerObject.x + global.playerObject.width / 2;
    const ballY = global.playerObject.y + global.playerObject.height / 2;

    
    const angle = Math.atan2(yPosition - ballY, xPosition - ballX);

  
    const dx = xPosition - ballX;
    const dy = yPosition - ballY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    
    const speed = Math.min(distance * 2.5, 800); 

    
    global.playerObject.xVelocity = speed * Math.cos(angle);
    global.playerObject.yVelocity = 1.3 * speed * Math.sin(angle);
    let golfSound = new Audio('Audio/golf_hit.wav');
           golfSound.play();
}


    function clickOnCanvas(event) { 
        const xPosition = event.layerX;
        const yPosition = event.layerY;
        shootball(xPosition, yPosition)
        global.strokecount++;
        global.counter.innerHTML = global.strokecount;
        

    }

global.canvas.addEventListener("click", clickOnCanvas);


