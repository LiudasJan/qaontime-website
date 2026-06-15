document.addEventListener('DOMContentLoaded', () => {
    const inputField = document.getElementById('typingInput');
    const resultDisplay = document.getElementById('detectionResult');
    let lastKeypressTime = 0;
    let keypressDelays = [];
    let isHumanTyping = true;

    inputField.addEventListener('keydown', () => {
        const currentTime = new Date().getTime();
        if (lastKeypressTime !== 0) {
            const delay = currentTime - lastKeypressTime;
            keypressDelays.push(delay);

            const isAutomated = areDelaysConsistent(keypressDelays);

            isHumanTyping = !isAutomated;
            resultDisplay.textContent = isHumanTyping ? 'Human typing detected' : 'Robot typing detected';
        }
        lastKeypressTime = currentTime;
    });

    function areDelaysConsistent(delays) {
        if (delays.length < 5) return false; 
        const averageDelay = delays.reduce((a, b) => a + b, 0) / delays.length;
        return delays.every(delay => Math.abs(delay - averageDelay) < 50); // Threshold for "consistency"
    }
});
