const slotMachine = document.getElementById('slotMachine');
const rate = parseFloat(slotMachine.getAttribute('data-rate'));

const symbols = ['🍒', '🍋', '🍌', '🍉', '7️⃣'];
const slots = document.querySelectorAll('.slot');
const resultText = document.getElementById('result');
const creditsDisplay = document.getElementById('credits');
let credits = 500;
const spinCost = 10;
const winAmount = 20;

function updateCreditsDisplay() {
    creditsDisplay.textContent = `Credits: $${credits}`;
}

document.getElementById('spinButton').addEventListener('click', function() {
    const currentRate = parseFloat(slotMachine.getAttribute('data-rate'));
    console.log("Current Win Probability Rate:", currentRate);

    if (credits < spinCost) {
        resultText.textContent = 'Game Over!';
        return;
    }

    credits -= spinCost;
    spin(currentRate); 
    updateCreditsDisplay();

    if (credits <= 0) {
        document.getElementById('spinButton').disabled = true;
        resultText.textContent = 'Game Over!';
    }

    if (credits > 1000) {
        resultText.textContent = 'Congratulations you hacked the system!';
    }
});


function spin(rate) {
    const win = Math.random() < rate;

    if (win) {
        const chosenSymbol = symbols[Math.floor(Math.random() * symbols.length)];
        slots.forEach(slot => slot.textContent = chosenSymbol);
        credits += winAmount;
        resultText.textContent = 'You win!';
    } else {
        let symbolsSet = new Set();
        slots.forEach(slot => {
            const symbol = symbols[Math.floor(Math.random() * symbols.length)];
            slot.textContent = symbol;
            symbolsSet.add(symbol);
        });

        if (symbolsSet.size === 1) {
            credits += winAmount;
            resultText.textContent = 'You win!';
        } else {
            resultText.textContent = 'Try again!';
        }
    }
    updateCreditsDisplay();
}

updateCreditsDisplay();
