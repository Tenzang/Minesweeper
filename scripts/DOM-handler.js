const loadMinesweeper = (gridSize, difficulty) => {
    console.log("loading minesweeper");

    // Place game board node
    const boardDisplay = document.createElement('div');
    boardDisplay.classList.add('board');
    document.querySelector('.screen').appendChild(boardDisplay);
    
    const game = new Minesweeper(gridSize, difficulty);
    // Creates cell with coordinates as classes
    const createCell = (x, y) => {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-xpos', x);
        cell.setAttribute('data-ypos', y);
        return cell;
    }

    // Set up grid
    for (let y = 0; y < gridSize; y++) {
        for(let x = 0; x < gridSize; x++) {
            // Create & append new cell to the board
            boardDisplay.appendChild(createCell(x, y));
        }
    }
    // Generate Flag Mode tick box
    const flagButton = document.createElement('input');
    flagButton.classList.add('flag');
    flagButton.setAttribute('type', 'checkbox');
    boardDisplay.after(flagButton);
    flagButton.after("Flag Mode");

    // Flag button event listener
    let flagMode = false;
    const toggleFlagMode = () => flagMode = !flagMode;
    flagButton.addEventListener('click', toggleFlagMode);

    const handleClick = event => {
        const cellNode = event.target;
        const x = cellNode.attributes['data-xpos'].value;
        const y = cellNode.attributes['data-ypos'].value;
        
        // Register click with Business Logic
        const clickOutcome = game.clickCell([y, x], flagMode);
        // Update board state
        const boardData = game.board;
        // Fetch cell data 
        const cellData = boardData[y][x];
        // Plant/remove flags if in flag mode
        if (flagMode) {
            cellNode.innerText = cellData.flagged ? 'X' : '';  
        } else refreshCells(boardData);

        // End game conditions
        if (clickOutcome.gameOver) {
            cellNodes.forEach( node => {
                node.removeEventListener('click', handleClick);
            })    
            flagButton.removeEventListener('click', toggleFlagMode);
            document.querySelector('.announcement').innerText = "You lose!";
        } else {
            if (clickOutcome.gameWon) {
                document.querySelector('.announcement').innerText = "You in!";
            }
        }
    }

    // Set on click listeners for each cell
    const cellNodes = document.querySelectorAll('.cell');
    cellNodes.forEach(cellNode => {
        cellNode.addEventListener('click', handleClick);
    })

    const refreshCells = (boardData) => {
        cellNodes.forEach( cellNode => {
            const x = cellNode.attributes['data-xpos'].value;
            const y = cellNode.attributes['data-ypos'].value;
            const {hidden, display, mine} = boardData[y][x]

            if (!hidden) {
                cellNode.innerText = mine ? '!' : display
            };
        })
    }

};