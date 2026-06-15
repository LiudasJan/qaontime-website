function checkPerfectNumber() {
    const number = document.getElementById('numberInput').value;
    const resultDiv = document.getElementById('result');
    const errorDiv = document.getElementById('error');

    if (number <= 0) {
        resultDiv.innerHTML = '';
        errorDiv.classList.remove('hidden');
        return;
    }

    const divisors = [];
    let sum = 0;

    for (let i = 1; i <= number / 2; i++) {
        if (number % i === 0) {
            divisors.push(i);
            sum += i;
        }
    }

    if (sum === parseInt(number)) {
        errorDiv.classList.add('hidden');
        resultDiv.innerHTML = `
            <h3>Divisors:</h3>
            <p id='divisors'>${divisors.join(', ')}</p>
            <h3>sum:</h3>
            <p id='sum'>${sum}</p>
        `;
    } else {
        resultDiv.innerHTML = '';
        errorDiv.classList.remove('hidden');
    }
}
