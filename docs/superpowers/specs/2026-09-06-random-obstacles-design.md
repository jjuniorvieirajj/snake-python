# Random Snake Obstacles Design

## Goal

Add randomly generated obstacles to the classic Snake game so each restart has a fresh layout and the snake loses when it hits an obstacle.

## Behavior

- Generate 8 single-tile obstacles whenever a game starts or restarts.
- Never place an obstacle on any of the snake's three starting segments.
- Never place food on an obstacle or on the snake.
- Treat an obstacle collision like a wall or snake collision and show the existing game-over state.
- Draw obstacles between the board background and the food and snake.
- Keep the current controls, score behavior, board size, and restart control unchanged.

## Implementation

Keep the feature inside `snake.js`, matching the current self-contained game structure. Store obstacles as an array of `{ x, y }` tile positions. Add a helper for generating non-overlapping obstacle positions, extend food placement to reject obstacle positions, include obstacle occupancy in the movement collision check, and render obstacles with a contrasting color.

## Testing

Validate the changed behavior in the browser by restarting several times and confirming that obstacle layouts change, obstacles never cover the starting snake, food is not drawn over an obstacle, and steering the snake into an obstacle produces the existing game-over overlay. Also run a JavaScript syntax check before the browser check.