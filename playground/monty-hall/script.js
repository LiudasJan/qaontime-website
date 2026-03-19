let correctDoor;
let selectedDoor;
let gamePhase = 0;
let wins = 0;
let losses = 0;
let totalGames = 0;

function startGame() {
    correctDoor = Math.floor(Math.random() * 3) + 1; 
    gamePhase = 1;
    document.getElementById('message').textContent = "Choose a door!";
    const doors = document.querySelectorAll('.door');
    doors.forEach(door => {
        door.style.backgroundColor = '#DDD';
    });
    updateStatistics();
}

function chooseDoor(door) {
    if (gamePhase === 1) {
        selectedDoor = door;
        const showDoor = revealDoor(door);
        document.getElementById('message').textContent = `Door ${showDoor} is open and empty. Do you want to switch your choice or stick with door ${selectedDoor}? (Click again on your final choice)`;
        gamePhase = 2;
    } else if (gamePhase === 2) {
        totalGames++;
        if (door === correctDoor) {
            document.getElementById('message').textContent = "Congratulations! You've found the prize!";
            wins++;
        } else {
            document.getElementById('message').textContent = "Sorry, the prize was behind door " + correctDoor;
            losses++;
        }
        gamePhase = 0;
        document.querySelector('.door:nth-child(' + correctDoor + ')').style.backgroundColor = 'gold';
        updateStatistics();
    }
}

function revealDoor(chosenDoor) {
    let emptyDoor = 1;
    while (emptyDoor === chosenDoor || emptyDoor === correctDoor) {
        emptyDoor++;
    }
    document.querySelector('.door:nth-child(' + emptyDoor + ')').style.backgroundColor = 'white';
    return emptyDoor;
}

function updateStatistics() {
    document.getElementById('wins').textContent = wins;
    document.getElementById('losses').textContent = losses;
    document.getElementById('totalGames').textContent = totalGames;
}

startGame();