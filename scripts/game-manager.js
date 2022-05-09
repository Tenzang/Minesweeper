const loadMenu = () => {
    console.log("menu loading...");
    // When 'play game' button is clicked, launch game selected with selected options as parameters.
    document.querySelector('#launchgame').addEventListener('click', () => {
        console.log("launch game button clicked");
        // Find game input
        const game = document.querySelector("input[name='game']").value;
        console.log("game chosen: ", game);
        if (game === "minesweeper") {
            // Fetch difficulty
            const difficulty = document.querySelector("input[name='difficulty']").value;
            console.log("difficulty chosen:", difficulty);
            // Fetch grid Size
            const gridSize = document.querySelector("input[name='grid-size']").value;
            console.log("gridsize chosen:", gridSize);
            clearScreen();
            loadMinesweeper(gridSize, difficulty);
        }
    });
}

const clearScreen = () => {
    console.log("clearing screen...");
    document.querySelector('.screen').replaceChildren();
}

window.addEventListener('DOMContentLoaded', loadMenu);
