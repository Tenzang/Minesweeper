// harcoded for testing, will eventually take user input
let gridSize = 10; // grid will be gridSize * gridSize

let board = game.board;

// create cell with coordinates as classes
const createCell = (x, y) => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.setAttribute('data-xpos', x);
    cell.setAttribute('data-ypos', y);
    cell.innerText = board[y][x].display;
    return cell;
}

window.addEventListener('DOMContentLoaded', () => {
    // Find the 'board' node
    const board = document.querySelector('.board');
    
    for (let y = 0; y < gridSize; y++) {
        for(let x = 0; x < gridSize; x++) {
            // Create & append new cell to the board
            board.appendChild(createCell(x, y));
        }
    }
});