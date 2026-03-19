const gameBoard = document.getElementById('gameBoard');
const cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const moveCountSpan = document.getElementById('moveCount');
const gameStatus = document.getElementById('gameStatus');
let selectedCards = [];
let matchedCards = [];
let moves = 0;

function createBoard() {
    while (gameBoard.firstChild) gameBoard.removeChild(gameBoard.firstChild); 
    matchedCards = [];
    moves = 0;
    moveCountSpan.textContent = moves;

    let cards = [...cardValues, ...cardValues]; 
    cards.sort(() => 0.5 - Math.random()); 

    cards.forEach((value, index) => {
        const card = document.createElement('div');
        card.classList.add('card', 'hidden');
        card.textContent = value;
        card.id = `card-${index}`;
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

function flipCard() {
    if (selectedCards.length === 2 || matchedCards.includes(this) || selectedCards.includes(this)) return;

    this.classList.remove('hidden');
    selectedCards.push(this);

    if (selectedCards.length === 2) {
        moves++;
        moveCountSpan.textContent = moves;
        setTimeout(checkForMatch, 500);
    }
}

function checkForMatch() {
    const [cardOne, cardTwo] = selectedCards;

    if (cardOne.textContent === cardTwo.textContent) {
        matchedCards.push(cardOne, cardTwo);
        selectedCards.forEach(card => card.classList.add('matched'));
    } else {
        selectedCards.forEach(card => card.classList.add('hidden'));
    }
    selectedCards = [];

    if (matchedCards.length === cardValues.length * 2) {
        gameStatus.textContent = 'Congratulations! You have won!';
    }
}

function resetBoard() {
    selectedCards = [];
    matchedCards = [];
    moves = 0;
    moveCountSpan.textContent = moves;
    gameStatus.textContent = '';
    createBoard();
}

createBoard();
