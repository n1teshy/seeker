const [WINDOW_HEIGHT, WINDOW_WIDTH] = [window.innerHeight, window.innerWidth];

const MATRIX_COLUMNS = 75;
const MATRIX_ROWS = Math.floor(MATRIX_COLUMNS * WINDOW_HEIGHT / WINDOW_WIDTH);

const [BLOCK_HEIGHT, BLOCK_WIDTH] = [
  Math.floor(window.innerHeight / MATRIX_ROWS),
  Math.floor(window.innerWidth / MATRIX_COLUMNS),
];
