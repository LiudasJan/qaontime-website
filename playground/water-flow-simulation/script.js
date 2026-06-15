document.addEventListener('DOMContentLoaded', () => {
    const valvesState = {
        1: false,
        2: false,
        3: false,
        4: false,
        5: false
    };

    function toggleValve(valveNumber) {
        valvesState[valveNumber] = !valvesState[valveNumber];
        updatePipesAndIndicators();
    }

    function updatePipesAndIndicators() {
        const waterDisappears = valvesState[1] && valvesState[2] && valvesState[4] && !valvesState[5] && !valvesState[3]; const waterFlows = !waterDisappears; for (let i = 1; i <= 5; i++) {
            const pipe = document.getElementById('pipe' + i);
            const indicator = document.getElementById('indicator' + i);
            if (waterFlows) {
                const isActive = valvesState[i];
                pipe.classList.toggle('active', isActive);
                indicator.classList.toggle('active', isActive);
            } else {
                pipe.classList.remove('active');
                indicator.classList.remove('active');
            }
        }
    }
    for (let i = 1; i <= 5; i++) {
        document.getElementById('valve' + i).addEventListener('click', () => toggleValve(i));
    }

    updatePipesAndIndicators();
});
