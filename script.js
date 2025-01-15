const sizeMultiplier = 50
const col = 17
const row = 11
function start() {
    const gameBoard = Array.from({ length: col }, () => Array(row).fill(false));
    const canvas = document.getElementById("canvas");
    const debugElement = document.getElementById("debug");
    let gameObj = { x: 0, y: 0, canvas: canvas, frameCount: 0 };

    document.addEventListener('keydown', function (ev) {
        switch (ev.key) {
            case "ArrowRight":
                if (gameObj.x * sizeMultiplier < sizeMultiplier * row - 1) {
                    gameObj.x += 1;
                }
                break;
            case "ArrowLeft":
                if (gameObj.x > 0) {
                    gameObj.x -= 1;
                }
                break;
            case "ArrowDown":
                if (gameObj.y < col - 1 && gameBoard[gameObj.y+1][gameObj.x] === false) {
                    gameObj.y += 1;
                } else {
                    gameBoard[gameObj.y][gameObj.x] = true;
                    gameObj.x = 0;
                    gameObj.y = 0;
                }
                break;

        }
    });


    setInterval(() => DrawState(gameObj, debugElement, gameBoard), 33);
}

function DrawState(obj, debugElement, gameBoard) {
    obj.frameCount++;
    const context = obj.canvas.getContext('2d');
    context.clearRect(0, 0, obj.canvas.width, obj.canvas.height);
    context.fillRect(obj.x*sizeMultiplier, obj.y*sizeMultiplier, sizeMultiplier, sizeMultiplier);

    for (let i = 0; i < gameBoard.length; i++) {
        for (let j = 0; j < gameBoard[i].length; j++) {
            if (gameBoard[i][j]) {
                context.fillRect((j * sizeMultiplier), (i * sizeMultiplier)+sizeMultiplier, sizeMultiplier, sizeMultiplier);
            }
        }
    }
    debugElement.textContent = `Y Position: ${obj.y}  X Position: ${obj.x}`;
    if (obj.frameCount % 40 === 0) {
        if (obj.y < col - 1 && gameBoard[obj.y+1][obj.x] === false) {
            obj.y += 1;
        } else {
            gameBoard[obj.y][obj.x] = true;
            obj.x = 0;
            obj.y = 0;
        }
    }

}
