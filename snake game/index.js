const canvas = document.getElementById("canvas")
const canvasContext = canvas.getContext('2d')

const STATE_RUNNING = 1;
const STATE_LOSING = 2;

const TICK = 80;
const SQUARE_SIZE = 16;
const BOARD_WIDTH = 37;
const BOARD_HEIGHT = 37;
const GROW_SCALE = 1;
const DIRECTIONS_MAP = {
  'A': [-1,  0],
  'D': [ 1,  0],
  'S': [ 0,  1],
  'W': [ 0, -1],
  'a': [-1,  0],
  'd': [ 1,  0],
  's': [ 0,  1],
  'w': [ 0, -1],
};

let state = {
    canvas: null,
    context: null,
    snake: [{x: 0, y: 0}],
    direction: {x: 1, y: 0},
    prey: {x: 0, y: 0},
    growing: 0,
    runState: STATE_RUNNING
  };

  function randomXY() {
    return {
      x: parseInt(Math.random() * BOARD_WIDTH),
      y: parseInt(Math.random() * BOARD_HEIGHT)
    };
  }

  function tick() {
    const head = state.snake[0];
    const dx = state.direction.x;
    const dy = state.direction.y;
    const highestIndex = state.snake.length - 1;
    let tail = {};
    let interval = TICK;

    Object.assign(tail,
      state.snake[state.snake.length - 1]);

    let didScore = (
      head.x === state.prey.x
      && head.y === state.prey.y
    );

    if (state.runState === STATE_RUNNING) {
      for (let idx = highestIndex; idx > -1; idx--) {
        const sq = state.snake[idx];

        if (idx === 0) {
          sq.x += dx;
          sq.y += dy;
        } else {
          sq.x = state.snake[idx - 1].x;
          sq.y = state.snake[idx - 1].y;
        }
      }
    } else if (state.runState === STATE_LOSING) {
      interval = 10;

      if (state.snake.length > 0) {
        state.snake.splice(0, 1);
      }

      if (state.snake.length === 0) {
        state.runState = STATE_RUNNING;
        state.snake.push(randomXY());
        state.prey = randomXY();
      }
    }

    if (detectCollision()) {
      state.runState = STATE_LOSING;
      state.growing = 0;
    }

    if (didScore) {
      state.growing += GROW_SCALE;
      state.prey = randomXY();
    }

    if (state.growing > 0) {
      state.snake.push(tail);
      state.growing -= 1;
    }

    requestAnimationFrame(draw);
    setTimeout(tick, interval);
  }

  function detectCollision() {
    const head = state.snake[0];

    if (head.x < 0
      || head.x >= BOARD_WIDTH
      || head.y >= BOARD_HEIGHT
      || head.y < 0
    ) {
      return true;
    }

    for (var idx = 1; idx < state.snake.length; idx++) {
      const sq = state.snake[idx];

      if (sq.x === head.x && sq.y === head.y) {
        return true;
      }
    }

    return false;
  }

  function drawPixel(color, x, y) {
    state.context.fillStyle = color;
    state.context.fillRect(
      x * SQUARE_SIZE,
      y * SQUARE_SIZE,
      SQUARE_SIZE,
      SQUARE_SIZE
    );
  }

  function draw() {
    state.context.clearRect(0, 0, 590, 590);

    for (var idx = 0; idx < state.snake.length; idx++) {
      const {x, y} = state.snake[idx];
      drawPixel('yellow', x, y);
    }

    const {x, y} = state.prey;
    drawPixel('red', x, y);
  }

  window.onload = function() {
    state.canvas = document.getElementById("canvas");
    state.context = state.canvas.getContext('2d');

    window.onkeydown = function(e) {
      const direction = DIRECTIONS_MAP[e.key];

      if (direction) {
        const [x, y] = direction;
        if (-x !== state.direction.x
          && -y !== state.direction.y)
        {
          state.direction.x = x;
          state.direction.y = y;
        }
      }
    }

    tick();
  };