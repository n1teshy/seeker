class Block {
  constructor(row, col, isObstacle, element) {
    this.row = row;
    this.col = col;
    this.isObstacle = isObstacle;
    this.element = element;
  }

  equals(otherBlock) {
    return this.row === otherBlock.row && this.col === otherBlock.col;
  }
}

class Game {
  static isSame(otherBlock) {
    return otherBlock.row;
  }

  constructor() {
    this.matrix = this.getMatrix();
    this.source = null;
    this.destination = null;
    this.lastSteps = [];
  }

  async start() {
    let currentBlock = this.source;
    let stepsToGoBack = 1;
    let step = 1;
    while (true) {
    // console.log(`step ${step}`);
      currentBlock.element.style.backgroundColor = getHighlightColor();
      if (currentBlock.equals(this.destination)) {
        break;
      }
      await new Promise((resolve) => setTimeout(resolve, STEP_DELAY_MS));
      let nextBlock = this.getNextBlock(currentBlock);
      if (nextBlock === null) {
        const [r, c] = this.lastSteps[this.lastSteps.length - stepsToGoBack];
        nextBlock = this.matrix[r][c];
        // console.log("going back ", stepsToGoBack, " steps");
        stepsToGoBack++;
      } else {
        stepsToGoBack = 1;
      }
      step++;
    // console.log("will visit ", [nextBlock.row, nextBlock.col]);
    // console.log("-----------------");
      currentBlock = nextBlock;
    }
  }

  getMatrix() {
    const matrix = getArray(MATRIX_ROWS).map(() => getArray(MATRIX_COLUMNS));
    for (let i = 0; i < matrix.length; i++) {
      const rowContainer = document.createElement("div");
      rowContainer.classList.add("flex")
      for (let j = 0; j < matrix[0].length; j++) {
        const blockElem = document.createElement("div");
        const isObstacle = Math.random() < OBSTACLE_DENSITY;
        matrix[i][j] = new Block(i, j, isObstacle, blockElem);

        if (isObstacle) {
          blockElem.style.backgroundColor = OBSTACLE_COLOR;
        }
        blockElem.style.height = `${BLOCK_HEIGHT}px`;
        blockElem.style.width = `${BLOCK_WIDTH}px`;
        blockElem.onclick = () => this.onclick(this.matrix[i][j]);
        rowContainer.appendChild(blockElem);
      }
      document.body.appendChild(rowContainer);
    }
    return matrix;
  }

  getSurroudingCoords(currentBlock) {
    return [
      [currentBlock.row - 1, currentBlock.col],
      [currentBlock.row + 1, currentBlock.col],
      [currentBlock.row, currentBlock.col - 1],
      [currentBlock.row, currentBlock.col + 1],
    ].filter(
      ([r, c]) =>
        r >= 0 &&
        c >= 0 &&
        r < this.matrix.length &&
        c < this.matrix[0].length &&
        !this.matrix[r][c].isObstacle
    );
  }

  getNearestCoord(coords) {
    const [_, slctdCoordIdx] = coords.reduce(
      ([minDist, minIdx], [r, c], idx) => {
        const distance =
          Math.abs(r - this.destination.row) +
          Math.abs(c - this.destination.col);
        const _idx = distance < minDist ? idx : minIdx;
        const _min = distance < minDist ? distance : minDist;
        return [_min, _idx];
      },
      [Infinity, -1]
    );
    return coords[slctdCoordIdx];
  }

  getNextBlock(currentBlock) {
    // console.log("at ", [currentBlock.row, currentBlock.col]);
    let nextCoords = this.getSurroudingCoords(currentBlock);
    // console.log("next coords: ", nextCoords);
    let [nextR, nextC] = this.getNearestCoord(nextCoords);
    // console.log([nextR, nextC], " is nearest");
    // console.log("checking if this is one of ", this.lastSteps.length, " last steps");
    const visited = this.lastSteps.find(([r, c]) => r === nextR && c === nextC);
    if (visited) {
    // console.log("already visited");
      nextCoords = nextCoords.filter(
        ([_r, _c]) => !this.lastSteps.some(([lR, lC]) => lR === _r && lC === _c)
      );
      if (nextCoords.length === 0) {
        // console.log("could not find unvisited coord");
        return null;
      } else {
        [nextR, nextC] = this.getNearestCoord(nextCoords);
        // console.log([nextR, nextC], " are not visited");
      }
    }
    this.lastSteps.push([nextR, nextC]);
    this.lastSteps = this.lastSteps.slice(0, this.matrix.length * this.matrix[0].length);
    return this.matrix[nextR][nextC];
  }

  onclick(block) {
    if (this.source === null) {
      this.source = block;
      this.source.element.style.backgroundColor = SOURCE_COLOR;
    } else if (this.destination === null) {
      this.destination = block;
      this.destination.element.style.backgroundColor = DESTINATION_COLOR;
      this.start();
    }
  }
}

// General utils
function getArray(length, value = 0) {
  return Array(length).fill(value);
}
