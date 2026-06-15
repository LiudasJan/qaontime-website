document.addEventListener('DOMContentLoaded', function() {
    let timeElapsed = 0;
    let timer = null;
    let stopCount = 0;

    document.getElementById('start').addEventListener('click', function() {
        if (timer === null) {
            timer = startTimer();
        }
    });

    document.getElementById('stop').addEventListener('click', function() {
        if (timer) {
            clearInterval(timer);
            timer = null;
            stopCount++;
            if (stopCount === 5) {
                timeElapsed = 0;
                stopCount = 0;
                updateDisplay();
            }
        }
    });

    document.getElementById('resume').addEventListener('click', function() {
        if (timer === null) {
            timer = startTimer();
        }
    });

    document.getElementById('clear').addEventListener('click', function() {
        timeElapsed = 0;
        stopCount = 0;
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
        updateDisplay();
    });

    function startTimer() {
        const startTime = Date.now() - timeElapsed;
        return setInterval(function() {
            timeElapsed = Date.now() - startTime;
            updateDisplay();
        }, 10); 
    }

    function updateDisplay() {
        const milliseconds = Math.floor((timeElapsed % 1000) / 10);
        const seconds = Math.floor((timeElapsed / 1000) % 60);
        const minutes = Math.floor((timeElapsed / (1000 * 60)) % 60);
        const hours = Math.floor((timeElapsed / (1000 * 60 * 60)) % 24);

        document.getElementById('display').textContent = 
            `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds, 2)}`;
    }

    function pad(number, size = 2) {
        let s = "00" + number;
        return s.substr(s.length - size);
    }
});
