document.addEventListener('DOMContentLoaded', () => {
    const checkbox = document.getElementById('checker');
    const result = document.getElementById('detectionResult');
    const startButton = document.getElementById('startButton');
    const resetButton = document.getElementById('resetButton');
    let mouseEvents = [];
    let isRecording = false;

    startButton.addEventListener('click', () => {
        checkbox.disabled = false;
        result.textContent = '';
        result.style.visibility = 'hidden';
        startButton.disabled = true;
        mouseEvents = [];
        isRecording = true;
    });

    document.addEventListener('mousemove', (event) => {
        if (isRecording) {
            mouseEvents.push({ x: event.clientX, y: event.clientY, time: event.timeStamp });
        }
    });

    checkbox.addEventListener('click', (event) => {
        isRecording = false;
        if (mouseEvents.length < 2) {
            result.textContent = 'Robot detected';
        } else {
            const duration = mouseEvents[mouseEvents.length - 1].time - mouseEvents[0].time;
            const averageTime = duration / (mouseEvents.length - 1);
            let straightLineDetected = true;
            let consistentTiming = true;
            
            for (let i = 1; i < mouseEvents.length; i++) {
                const dx = mouseEvents[i].x - mouseEvents[i - 1].x;
                const dy = mouseEvents[i].y - mouseEvents[i - 1].y;
                
                if (i === 1) {
                    const initialAngle = Math.atan2(dy, dx);
                    mouseEvents[0].angle = initialAngle;
                } else {
                    const angle = Math.atan2(dy, dx);
                    if (Math.abs(angle - mouseEvents[0].angle) > 0.1) { //threshold
                        straightLineDetected = false;
                    }
                }
                
                const timeDiff = mouseEvents[i].time - mouseEvents[i - 1].time;
                if (Math.abs(timeDiff - averageTime) > 10) { //threshold
                    consistentTiming = false;
                }
            }

            if (mouseEvents[mouseEvents.length - 1].time - mouseEvents[0].time < 150 || straightLineDetected || consistentTiming) {
                result.textContent = 'Robot detected';
            } else {
                result.textContent = 'Human detected';
            }
        }

        result.style.visibility = 'visible';
        checkbox.checked = false;
        checkbox.disabled = true;
        startButton.disabled = false;
    });

    resetButton.addEventListener('click', () => {
        checkbox.checked = false;
        checkbox.disabled = true;
        result.style.visibility = 'hidden';
        result.textContent = '';
        startButton.disabled = false;
        mouseEvents = [];
    });
});
