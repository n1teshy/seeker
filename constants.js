const GROUND = document.documentElement;
const BODY = document.getElementsByTagName("body")[0];

const [DOC_HEIGHT, DOC_WIDTH] = [GROUND.clientHeight, GROUND.clientWidth];
const [BLOCK_HEIGHT, BLOCK_WIDTH] = [DOC_HEIGHT/MATRIX_ROWS, DOC_WIDTH/MATRIX_COLUMNS];
