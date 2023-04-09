// Get canvas element
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// Set up game variables
var blockSize = 20;
var width = canvas.width / blockSize;
var height = canvas.height / blockSize;
var score = 0;
var snake = [];
var direction = "right";
var food = {
    x: Math.floor(Math.random() * width),
    y: Math.floor(Math.random() * height)
};

// Initialize snake
snake.push({
    x: Math.floor(width / 2),
    y: Math.floor(height / 2)
});

// Move snake function
function moveSnake() {
    // Remove last cell
    var tail = snake.pop();
    // Calculate new head position
    var headX = snake[0].x;
    var headY = snake[0].y;
    switch (direction) {
        case "right":
            headX++;
            break;
        case "left":
            headX--;
            break;
        case "up":
            headY--;
            break;
        case "down":
            headY++;
            break;
    }
    // Add new head
    snake.unshift({
        x: headX,
        y: headY
    });
    // Check if snake collided with itself
    for (var i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            return true;
        }
    }
    // Check if snake collided with wall
    if (snake[0].x < 0 || snake[0].x >= width || snake[0].y < 0 || snake[0].y >= height) {
        return true;
    }
    // Check if snake ate the food
    if (snake[0].x == food.x && snake[0].y == food.y) {
        // Add score
        score++;
        // Generate new food
        food = {
            x: Math.floor(Math.random() * width),
            y: Math.floor(Math.random() * height)
        };
        // Add new tail
        snake.push(tail);
    }
    return false;
}

// Draw game function
function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Draw food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x * blockSize, food.y * blockSize, blockSize, blockSize);
    // Draw snake
    ctx.fillStyle = "green";
    for (var i = 0; i < snake.length; i++) {
        ctx.fillRect(snake[i].x * blockSize, snake[i].y * blockSize, blockSize, blockSize);
    }
    // Draw score
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 10, 30);
}

// Game loop function
function gameLoop() {
    if (!moveSnake()) {
        draw();
        setTimeout(gameLoop, 100);
    } else {
        // Game over
        alert("Game over! Your score is " + score);
    }
}

// Handle keyboard input
document.addEventListener("keydown", function(event) {
    switch (event.keyCode) {
        case 37: // Left arrow
            if (direction != "right") {
                direction = "left";
            }
            break;
        case 38: // Up arrow
            if (direction != "down") {
                direction = "up";
            }
            break;
        case 39: // Right arrow
            if (direction != "left") {
                direction = "right";
            }
            break;
        case 40: // Down arrow
            if (direction != "up") {
                direction = "down";
            }
            break;
    }
});

// Start game loop
gameLoop();
