class Block{
    constructor(row, col, isObstacle, element){
        this.row = row;
        this.col = col;
        this.isObstacle = isObstacle;
        this.element = element;
    }

    equals(otherBlock) {
        return this.row === otherBlock.row && this.col === otherBlock.col;
    }
}

class Game{
    static isSame(otherBlock) {
        return otherBlock.row
    }


    constructor() {
        this.matrix = this.getMatrix();
        this.source = null;
        this.destination = null;
    }

    async start() {
        let currentBlock = this.source;
        while(true){
            console.log(currentBlock);
            currentBlock.element.style.backgroundColor = PATH_COLOR();
            if(currentBlock.equals(this.destination)) {
                break;
            }
            await new Promise((resolve) => setTimeout(resolve, STEP_DELAY_MS))
            currentBlock = this.getNextBlock(currentBlock);
        }
    }

    getMatrix() {
        const matrix = getArray(MATRIX_ROWS).map(() => getArray(MATRIX_COLUMNS));
        for(let i = 0; i < matrix.length; i++) {
            for(let j = 0; j < matrix[0].length; j++) {
                const block = document.createElement("div");
                const isObstacle = Math.random() < OBSTACLE_DENSITY;
                matrix[i][j] = new Block(i, j, isObstacle, block);
    
                if(isObstacle) {
                    block.style.backgroundColor = OBSTACLE_COLOR;
                }
                block.style.height = `${BLOCK_HEIGHT}px`;
                block.style.width = `${BLOCK_WIDTH}px`;
                block.onclick = () => this.onclick(this.matrix[i][j]);
                BODY.appendChild(block);
            }
        }
        return matrix;
    }

    getNextBlock(currentBlock) {
        const row = currentBlock.row, col = currentBlock.col;
        let nextBlocks = [[row - 1, col], [row + 1, col], [row, col - 1], [row, col + 1]];
        nextBlocks = nextBlocks.reduce((all, [row, col]) => {
            if(row >= 0 && col >= 0 && !this.matrix[row][col].isObstacle) {
                all.push(this.matrix[row][col]);
            }
            return all;
        }, []);
        const distances = nextBlocks.map((block) => Math.sqrt((block.row - this.destination.row)**2 + (block.col - this.destination.col)**2));

        let minDistance = Number.MAX_SAFE_INTEGER;
        let selectedIndex = -1;
        for (let i = 0; i < distances.length; i++) {
            if(distances[i] < minDistance) {
                minDistance = distances[i];
                selectedIndex = i;
            }
        }
        return nextBlocks[selectedIndex];
    }

    onclick(block) {
        if(this.source === null) {
            this.source = block;
            this.source.element.style.backgroundColor = SOURCE_COLOR;
        } else if(this.destination === null) {
            this.destination = block;
            this.destination.element.style.backgroundColor = DESTINATION_COLOR;
            setTimeout(() => {
                this.start();
            }, 1000);
        }
    }
}


// General utils
function getArray(length, value=0) {
    return Array(length).fill(value);
}
