const sizeMultiplier = 50;
const col = 18;
const row = 12;

function start() {
    const canvas = document.getElementById("canvas");
    const debugElement = document.getElementById("debug");

    let gameObj = {
        x: Math.floor(row / 2),
        y: 0,
        canvas: canvas,
        frameCount: 0,
        gameBoard: Array.from({ length: col }, () => Array(row).fill(false)),
        takenPoints: []
    };

    document.addEventListener('keydown', function (ev) {
        switch (ev.key) {
            case "ArrowRight":
                if (gameObj.x < row - 1) {
                    let canMoveRight = true;

                    for (let i = 0; i < gameObj.takenPoints.length; i++) {
                        const point = gameObj.takenPoints[i];
                        if ((point.x / sizeMultiplier)+2 > row) {
                            canMoveRight = false;
                            break;
                        }
                    }
                    if (canMoveRight) {
                        gameObj.x += 1;
                    }
                }
                break;
            case "ArrowLeft":
                if (gameObj.x > 0) {
                    let canMoveLeft = true;
                    for (let i = 0; i < gameObj.takenPoints.length; i++) {
                        const point = gameObj.takenPoints[i];
                        if ((point.x / sizeMultiplier) - 1 < 0) {
                            canMoveLeft = false;
                            break;
                        }
                    }
                    if (canMoveLeft) {
                        gameObj.x -= 1;
                    }
                }

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
    DrawSquare(gameObj,context)
    DrawPlacedBlocks(context, gameObj);
    debugElement.textContent = `Y Position: ${gameObj.y}  X Position: ${gameObj.x}`;
    if (gameObj.frameCount % 40 === 0) {
         PlaceBlock(gameObj);
    }
}
function DrawSquare(gameObj, context) {
    gameObj.takenPoints = []
    context.clearRect(0, 0, gameObj.canvas.width, gameObj.canvas.height);
    const baseX = gameObj.x * sizeMultiplier;
    const baseY = gameObj.y * sizeMultiplier;


    for (let dx = 0; dx <= 1; dx++) {
        for (let dy = 0; dy <= 1; dy++) {
            const x = baseX + dx * sizeMultiplier;
            const y = baseY + dy * sizeMultiplier;
            gameObj.takenPoints.push({ x, y }); // Add the point to the array
            context.fillRect(x, y, sizeMultiplier, sizeMultiplier);
        }
    }
}

function DrawI(gameObj, context) {
    context.clearRect(0, 0, gameObj.canvas.width, gameObj.canvas.height);
    const baseY = gameObj.y * sizeMultiplier;

    for (let dx = -2; dx <= 2; dx++) {
        const baseX = (gameObj.x + dx) * sizeMultiplier;
        context.fillRect(baseX, baseY, sizeMultiplier, sizeMultiplier);
    }
}
function DrawT(gameObj, context) {
    context.clearRect(0, 0, gameObj.canvas.width, gameObj.canvas.height);

    const baseX = gameObj.x * sizeMultiplier;
    const baseY = gameObj.y * sizeMultiplier;

    for (let dx = -1; dx <= 1; dx++) {
        const x = baseX + dx * sizeMultiplier;
        context.fillRect(x, baseY, sizeMultiplier, sizeMultiplier);
    }

    for (let dy = 1; dy <= 1; dy++) {
        const y = baseY + dy * sizeMultiplier;
        context.fillRect(baseX, y, sizeMultiplier, sizeMultiplier);
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
