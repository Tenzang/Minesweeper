// harcoded for testing, will eventually take user input
let gridSize = 10; // grid will be gridSize * gridSize

let board = game.board;

// create cell with coordinates as classes
const createCell = (x, y) => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.setAttribute('data-xpos', x);
    cell.setAttribute('data-ypos', y);
    return cell;
}

window.addEventListener('DOMContentLoaded', () => {
    // Find the 'board' node
    const boardDisplay = document.querySelector('.board');
    // Set up grid
    for (let y = 0; y < gridSize; y++) {
        for(let x = 0; x < gridSize; x++) {
            // Create & append new cell to the board
            boardDisplay.appendChild(createCell(x, y));
        }
    }

    const handleClick = event => {
        const cellNode = event.target;
        const x = cellNode.attributes['data-xpos'].value;
        const y = cellNode.attributes['data-ypos'].value;
        
        // Register click with Business Logic
        const clickOutcome = game.clickCell([y, x]);
        // Update board state
        board = game.board;
        // Fetch cell data 
        const cellData = board[y][x];
        // If cell not flagged
        if (!cellData.flagged) {
            // If mine present, display mine symbol
            if (cellData.mine) {
                cellNode.innerText = '!';
            } else { // If not, display cells number
                cellNode.innerHTML = cellData.display;
            }
        }

        // End game conditions
        if (clickOutcome.gameOver) {
            cellNodes.forEach( node => {
                node.removeEventListener('click', handleClick);
            })    
            console.log("You lose!");
        } else {
            if (clickOutcome.gameWon) console.log("You win!");
        }
    }

    // Set on click listeners for each cell
    const cellNodes = document.querySelectorAll('.cell');
    cellNodes.forEach(cellNode => {
        cellNode.addEventListener('click', handleClick);
    })
});