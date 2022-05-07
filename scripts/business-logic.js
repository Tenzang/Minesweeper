class Minesweeper {
    constructor(size) {

        this.difficulty = 3.5;

        // generates board with mines randomly placed inside
        this.setBoard = size => {
            // create empty board array
            const board = Array();
            for (let i = 0; i < size; i++) {
                // create empty row array
                const row = Array();
                for (let j = 0; j < size; j++) {
                    // randomly decide whether to add mine to cell
                    const cell = {hidden: true, flagged: false}
                    
                    const randNum = Math.random() * 10 + 1;
                    cell.mine = randNum > this.difficulty ? false : true;
                    row.push(cell);
                }
                // add row to board
                board.push(row);
            }

            return board;
        }

        this.board = this.setBoard(size);

        // clickCell takes array of coordinates and whether the user is flagging
        this.clickCell = ([y, x], flagging = false) => {
            const cellClicked = this.board[y][x];
            let gameOver = false;
            if (flagging) {
                cellClicked.flagged = !cellClicked.flagged; 
            } else if (!cellClicked.flagged) {
                cellClicked.hidden = false;
                if (cellClicked.mine) gameOver = true;
            }

            return { gameOver: gameOver };
        };
    }


}
