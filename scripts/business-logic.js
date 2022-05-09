class Minesweeper {
    constructor(gridSize, difficulty = 2.5) {

        this.difficulty = difficulty;

        this.state = {
            mines: {
                present: 0,
                flagged: 0
            },
            cellsFlagged: 0
        }

        // generates board with mines randomly placed inside
        this.setBoard = gridSize => {
            // create empty board array
            const board = Array();
            for (let i = 0; i < gridSize; i++) {
                // create empty row array
                const row = Array();
                for (let j = 0; j < gridSize; j++) {
                    // Create new cell
                    const cell = {display: 0, hidden: true, flagged: false}
                    
                    const randNum = Math.random() * 10 + 1;
                    // Randomly decide whether to plant mine in cell then update mine count accordingly
                    if (cell.mine = randNum > this.difficulty ? false : true) this.state.mines.present++;

                    // Add cell to row
                    row.push(cell);
                }
                // add row to board
                board.push(row);
            }

            // Update cell displays
            // Loop through each cell
            for (let y = 0; y < gridSize; y++) {
                for (let x = 0; x < gridSize; x++) {
                    // If cell contains mine, add 1 to the display of surrounding cell
                    if (board[y][x].mine) {

                        for (let i = -1; i < 2; i++) {

                            // If coordinate is in bounds of grid
                            if (x + i >= 0 && x + i < gridSize) {

                                for (let j = -1; j < 2; j++) {

                                    // If coordinate is in bounds of grid
                                    if (y + j >= 0 && y + j < gridSize) {

                                        // Only add if not the cell being referenced
                                        if (i || j) {
                                            board[y+j][x+i].display++;
                                        }

                                    }

                                }

                            }

                        }

                    }
                }
            }

            return board;
        }

        this.board = this.setBoard(gridSize);

        // clickCell takes array of coordinates and whether the user is flagging
        this.clickCell = ([y, x], flagging = false) => {
            const cellClicked = this.board[y][x];
            const { state } = this;
            const { mines } = state;

            let gameOver = false;
            let gameWon = false;

            if (flagging && cellClicked.hidden) {
                // Simultaneously sets flagged status of cell and updates flagged cell count 
                (cellClicked.flagged = !cellClicked.flagged) ? state.cellsFlagged++ : state.cellsFlagged--;
                // If theres mine on cell clicked then update mines flagged according
                if (cellClicked.mine) cellClicked.flagged ? mines.flagged++ : mines.flagged--;

                // Game has been won when all mines are flagged
                if (mines.flagged === mines.present) gameWon = true; 
            } else if (!cellClicked.flagged) {
                // Reveal cell
                cellClicked.hidden = false;
                if (cellClicked.mine) { // Game-over if mine present
                    this.revealMines();
                    gameOver = true;
                } else if (cellClicked.display === 0) { 
                    // Cascade if cell has a display value of 0
                    this.cascadeReveal(parseInt(x), parseInt(y));
                }
            }

            return { gameOver: gameOver, gameWon: gameWon };
        };

        this.cascadeReveal = (x, y) => {
            for (let i = -1; i < 2; i++) {

                // If coordinate is in bounds of grid
                if (x + i >= 0 && x + i < gridSize) {

                    for (let j = -1; j < 2; j++) {

                        // If coordinate is in bounds of grid
                        if (y + j >= 0 && y + j < gridSize) {

                            const cell = this.board[y+j][x+i];
                            // If cell hidden and has a display value of 0, click cell
                            if (cell.hidden) {
                                this.clickCell([y+j, x+i]);
                            }

                        }

                    }

                }

            }

        };

        this.revealMines = () => {
            // Iterate through board and reveal cell if mine present
            for (let y = 0; y < gridSize; y++) {
                for (let x = 0; x < gridSize; x++) {
                    const cell = this.board[y][x];
                    if (cell.mine) cell.hidden = false;
                }
            }
        }
    }
}

// Testing
const game = new Minesweeper(10);
