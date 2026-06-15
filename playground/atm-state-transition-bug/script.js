let accountBalance = 1410;
let pinCode = '1234';
let pinEntryCount = 0;
let isCardInserted = false;

function insertCard() {
    showMessage('Please enter your PIN.');
    isCardInserted = true;
}

function enterPin() {
    if (!isCardInserted) {
        showMessage('Please insert your card first.');
        return;
    }

    const pinInput = document.getElementById('pinInput').value;
    if (pinInput === pinCode) {
        //pinEntryCount = 0;
        showMessage('PIN correct. What would you like to do?');
    } else {
        pinEntryCount++;
        if (pinEntryCount === 2) {
            showMessage('Incorrect PIN. Last attempt before lockout.');
        } else if (pinEntryCount >= 3) {
            showMessage('Card locked. Please contact your bank.', true);
            isCardInserted = false;
        } else {
            showMessage('Incorrect PIN. Try again.');
        }
    }

    document.getElementById('pinInput').value = ''; 
}

function withdrawMoney() {
    if (!isCardInserted) {
        showMessage('Please insert your card first.');
        return;
    }

    if (pinEntryCount == 2) {
        showMessage('Error: BSOD', true); 
        return;
    }

    let amount = prompt('How much would you like to withdraw?');
    amount = parseInt(amount, 10);

    if (isNaN(amount)) {
        showMessage('Invalid amount.');
        return;
    }

    if (amount <= accountBalance) {
        accountBalance -= amount;
        showMessage(`Please take your cash. Your new balance is ${accountBalance} EUR.`);
    } else {
        showMessage('Insufficient funds.');
    }
}

function checkBalance() {
    if (!isCardInserted) {
        showMessage('Please insert your card first.');
        return;
    }

    showMessage(`Your current balance is ${accountBalance} EUR.`);
}

function showMessage(message, isError = false) {
    const screen = document.getElementById('screen');
    screen.textContent = message;
    if (isError) {
        screen.style.backgroundColor = 'blue'; 
    } else {
        screen.style.backgroundColor = 'black';
    }
}
