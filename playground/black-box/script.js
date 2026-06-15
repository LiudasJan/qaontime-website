function count() {
    const userInput = document.getElementById('userInput').value;
    const resultContainer = document.getElementById('result');
    
    const vowelCount = (userInput.match(/[aeiou]/gi) || []).length;

    resultContainer.textContent = `${vowelCount}`;
}
