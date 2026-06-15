const cells = document.querySelectorAll('.cell');
let currentPlayer = 'X';

function makeMove(index) {
    if (!cells[index].textContent) {
        cells[index].textContent = currentPlayer;
        checkWinner();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkWinner() {
    const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (let line of lines) {
        const [a, b, c] = line;
        if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
            alert(`${cells[a].textContent} wins!`);
            resetGame();
            return;
        }
    }

    if ([...cells].every(cell => cell.textContent)) {
        alert('It\'s a tie!');
        resetGame();
    }
}

function resetGame() {
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
}
