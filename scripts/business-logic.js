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
                    const cell = {hidden: true}
                    
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

    }


}
