/*
 * Classic Snake game
 *
 * Add this file to an HTML page with:
 *   <script src="snake.js"></script>
 *
 * The script creates the game board and controls automatically.
 */

(() => {
  "use strict";

  // Game board settings.
  const tileSize = 20;
  const tileCount = 20;
  const boardSize = tileSize * tileCount;
  const gameSpeed = 110;
  const obstacleCount = 8;

  // Create the page elements needed by the game.
  const gameContainer = document.createElement("main");
  const title = document.createElement("h1");
  const scoreLabel = document.createElement("p");
  const canvas = document.createElement("canvas");
  const restartButton = document.createElement("button");
  const instructions = document.createElement("p");

  title.textContent = "Classic Snake";
  scoreLabel.textContent = "Score: 0";
  restartButton.textContent = "Restart game";
  instructions.textContent = "Use the arrow keys or WASD to move.";

  canvas.width = boardSize;
  canvas.height = boardSize;
  canvas.setAttribute("aria-label", "Snake game board");

  // Basic styling keeps the game usable without a separate CSS file.
  document.body.style.margin = "0";
  document.body.style.minHeight = "100vh";
  document.body.style.display = "grid";
  document.body.style.placeItems = "center";
  document.body.style.backgroundColor = "#17202a";
  document.body.style.color = "#f4f6f7";
  document.body.style.fontFamily = "sans-serif";

  gameContainer.style.textAlign = "center";
  canvas.style.display = "block";
  canvas.style.maxWidth = "90vw";
  canvas.style.height = "auto";
  canvas.style.border = "4px solid #f4f6f7";
  canvas.style.backgroundColor = "#1f2d3a";
  restartButton.style.padding = "8px 14px";
  restartButton.style.cursor = "pointer";

  gameContainer.append(title, scoreLabel, canvas, restartButton, instructions);
  document.body.appendChild(gameContainer);

  const context = canvas.getContext("2d");

  // The snake is stored as an array of positions, with the head at index 0.
  let snake;
  let food;
  let obstacles;
  let direction;
  let nextDirection;
  let score;
  let gameOver;
  let gameTimer;

  function isOccupied(position) {
    return (
      snake.some((segment) => segment.x === position.x && segment.y === position.y) ||
      obstacles.some((obstacle) => obstacle.x === position.x && obstacle.y === position.y)
    );
  }

  // Choose random tiles for obstacles that do not block the starting snake.
  function placeObstacles() {
    obstacles = [];

    while (obstacles.length < obstacleCount) {
      const obstacle = {
        x: Math.floor(Math.random() * tileCount),
        y: Math.floor(Math.random() * tileCount),
      };

      if (!isOccupied(obstacle)) {
        obstacles.push(obstacle);
      }
    }
  }

  // Choose a random tile for the food that is not occupied by the snake or obstacles.
  function placeFood() {
    do {
      food = {
        x: Math.floor(Math.random() * tileCount),
        y: Math.floor(Math.random() * tileCount),
      };
    } while (isOccupied(food));
  }

  // Reset every part of the game to its starting state.
  function startGame() {
    snake = [
      { x: 10, y: 10 },
      { x: 9, y: 10 },
      { x: 8, y: 10 },
    ];
    placeObstacles();
    direction = { x: 1, y: 0 };
    nextDirection = { x: 1, y: 0 };
    score = 0;
    gameOver = false;
    scoreLabel.textContent = "Score: 0";
    placeFood();

    clearInterval(gameTimer);
    gameTimer = setInterval(updateGame, gameSpeed);
    drawGame();
  }

  // Change direction while preventing the snake from reversing into itself.
  function handleKeyDown(event) {
    const key = event.key.toLowerCase();
    const requestedDirections = {
      arrowup: { x: 0, y: -1 },
      w: { x: 0, y: -1 },
      arrowdown: { x: 0, y: 1 },
      s: { x: 0, y: 1 },
      arrowleft: { x: -1, y: 0 },
      a: { x: -1, y: 0 },
      arrowright: { x: 1, y: 0 },
      d: { x: 1, y: 0 },
    };
    const requestedDirection = requestedDirections[key];

    if (!requestedDirection) {
      return;
    }

    event.preventDefault();

    const isReverseDirection =
      requestedDirection.x === -direction.x && requestedDirection.y === -direction.y;

    if (!isReverseDirection) {
      nextDirection = requestedDirection;
    }
  }

  // Move the snake, then check food and collision rules.
  function updateGame() {
    if (gameOver) {
      return;
    }

    direction = nextDirection;
    const newHead = {
      x: (snake[0].x + direction.x + tileCount) % tileCount,
      y: (snake[0].y + direction.y + tileCount) % tileCount,
    };

    const hitSnake = snake.some(
      (segment) => segment.x === newHead.x && segment.y === newHead.y,
    );
    const hitObstacle = obstacles.some(
      (obstacle) => obstacle.x === newHead.x && obstacle.y === newHead.y,
    );

    if (hitSnake || hitObstacle) {
      endGame();
      return;
    }

    snake.unshift(newHead);

    const ateFood = newHead.x === food.x && newHead.y === food.y;
    if (ateFood) {
      score += 1;
      scoreLabel.textContent = `Score: ${score}`;
      placeFood();
    } else {
      // Remove the tail so the snake keeps its length when no food is eaten.
      snake.pop();
    }

    drawGame();
  }

  // Draw the board, food, and snake on the canvas.
  function drawGame() {
    context.fillStyle = "#1f2d3a";
    context.fillRect(0, 0, boardSize, boardSize);

    obstacles.forEach((obstacle) => {
      context.fillStyle = "#95a5a6";
      context.fillRect(
        obstacle.x * tileSize,
        obstacle.y * tileSize,
        tileSize - 1,
        tileSize - 1,
      );
    });

    context.fillStyle = "#e74c3c";
    context.fillRect(food.x * tileSize, food.y * tileSize, tileSize, tileSize);

    snake.forEach((segment, index) => {
      context.fillStyle = index === 0 ? "#2ecc71" : "#27ae60";
      context.fillRect(segment.x * tileSize, segment.y * tileSize, tileSize - 1, tileSize - 1);
    });
  }

  // Stop the timer and display the final game state.
  function endGame() {
    gameOver = true;
    clearInterval(gameTimer);
    context.fillStyle = "rgba(0, 0, 0, 0.65)";
    context.fillRect(0, 0, boardSize, boardSize);
    context.fillStyle = "#ffffff";
    context.font = "bold 28px sans-serif";
    context.textAlign = "center";
    context.fillText("Game over", boardSize / 2, boardSize / 2 - 10);
    context.font = "16px sans-serif";
    context.fillText("Press Restart game to play again", boardSize / 2, boardSize / 2 + 22);
  }

  document.addEventListener("keydown", handleKeyDown);
  restartButton.addEventListener("click", startGame);
  startGame();
})();
