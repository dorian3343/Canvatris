function start() {
    const canvas = document.getElementById("canvas");
    const debugElement = document.getElementById("debug");
    let gameObj = { x: 0, y: 0, canvas: canvas, frameCount: 0 };
    gameBoard = [[],[],[],[],[]]
    document.addEventListener('keydown', function (ev) {
        if (ev.key === "ArrowRight") {
            if (gameObj.x !== 550) {
                gameObj.x += 50;
            }
        }
        if (ev.key === "ArrowLeft") {
            if (gameObj.x !== 0) {
                gameObj.x -= 50;
            }
        }
        if (ev.key === "ArrowDown") {
            if (gameObj.y !== 850) {
                gameObj.y += 10;
            }
        }
    });

    setInterval(() => DrawState(gameObj, debugElement), 33);
}

function DrawState(obj, debugElement) {
    obj.frameCount++;
    const context = obj.canvas.getContext('2d');
    context.clearRect(0, 0, obj.canvas.width, obj.canvas.height); // Clear the canvas
    context.fillRect(obj.x, obj.y, 50, 50); // Draw a rectangle

    debugElement.textContent = `Y Position: ${obj.y}`;

    if (obj.frameCount % 40 === 0) {
        if (obj.y !== 850) {
            obj.y += 50;
        }
    }
}
