const sizeMultiplier = 50;
const col = 18;
const row = 12;

function start() {
    const canvas = document.getElementById("canvas");
    const debugElement = document.getElementById("debug");

    let gameObj = {
        x: Math.floor(row / 2), // Start from the middle column
        y: 0,
        canvas: canvas,
        frameCount: 0,
        gameBoard: Array.from({ length: col }, () => Array(row).fill(false)),
    };

    document.addEventListener('keydown', function (ev) {
        switch (ev.key) {
            case "ArrowRight":
                if (gameObj.x < row - 1) { // Ensure within bounds
                    gameObj.x += 1;
                }
                break;
            case "ArrowLeft":
                if (gameObj.x > 0) { // Ensure within bounds
                    gameObj.x -= 1;
                }
                break;
            case "ArrowDown":
                PlaceBlock(gameObj);
                break;
        }
    });

    setInterval(() => DrawState(gameObj, debugElement), 33);
}

function DrawState(gameObj, debugElement) {
    gameObj.frameCount++;
    const context = gameObj.canvas.getContext('2d');
    context.clearRect(0, 0, gameObj.canvas.width, gameObj.canvas.height);
    context.fillRect((gameObj.x * sizeMultiplier), gameObj.y * sizeMultiplier, sizeMultiplier, sizeMultiplier);

    DrawPlacedBlocks(context, gameObj);
    debugElement.textContent = `Y Position: ${gameObj.y}  X Position: ${gameObj.x}`;
    if (gameObj.frameCount % 40 === 0) {
        PlaceBlock(gameObj);
    }
}

function PlaceBlock(gameObj) {
    if (gameObj.y < col - 1 && gameObj.gameBoard[gameObj.y + 1][gameObj.x] === false) {
        gameObj.y += 1;
    } else {
        gameObj.gameBoard[gameObj.y][gameObj.x] = true;
        gameObj.x = Math.floor(row / 2);
        gameObj.y = 0;
    }
}

function DrawPlacedBlocks(context, gameObj) {
    for (let i = 0; i < gameObj.gameBoard.length; i++) {
        for (let j = 0; j < gameObj.gameBoard[i].length; j++) {
            if (gameObj.gameBoard[i][j]) {
                context.fillRect(j * sizeMultiplier, i * sizeMultiplier, sizeMultiplier, sizeMultiplier);
            }
        }
    }
}
