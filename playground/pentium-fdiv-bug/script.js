let currentOperation = '';
let currentValue = '';
let previousValue = '';

function enterDigit(digit) {
    currentValue += digit;
    updateDisplay();
}

function setOperation(operation) {
    if (currentOperation !== '') calculate();
    previousValue = currentValue;
    currentValue = '';
    currentOperation = operation;
    updateDisplay();
}

function calculate() {
    let result;
    const prev = parseFloat(previousValue);
    const current = parseFloat(currentValue);
    const messageElement = document.getElementById('message');

    switch (currentOperation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (prev === 4195835 && current === 3145727) {
              
                messageElement.innerHTML = `Congratulations! You've found the Pentium FDIV bug! The correct result is ${prev / current}. Learn more about the <a href="https://en.wikipedia.org/wiki/Pentium_FDIV_bug" target="_blank">Pentium FDIV bug</a>.`;
                result = 1.333739068902037; 
            } else if (current !== 0) {
                result = prev / current;
            }
            break;
        default:
            return;
    }

    currentValue = result.toString();
    currentOperation = '';
    updateDisplay();

    // Clear the message if the calculation does not trigger the bug
    if (!(prev === 4195835 && current === 3145727)) {
        messageElement.innerHTML = '';
    }
}


function clearDisplay() {
    currentValue = '';
    previousValue = '';
    currentOperation = '';
    updateDisplay();
}

function updateDisplay() {
    document.getElementById('display').value = currentValue;
}

clearDisplay();
