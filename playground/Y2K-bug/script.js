function calculateAge() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const dobInput = document.getElementById('dob').value;
    const dob = new Date(dobInput);
    const today = new Date();
    
    let y = dob.getFullYear();
    let year = dob.getFullYear();
    if (year >= 2000) {
        year -= 100;
    }
    const simulatedDob = new Date(dob);
    simulatedDob.setFullYear(year);

    let age = today.getFullYear() - simulatedDob.getFullYear();
    const m = today.getMonth() - simulatedDob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < simulatedDob.getDate())) {
        age--;
    }

    if (y >= 2000) {
        document.getElementById('result').innerHTML = `${firstName} ${lastName}, Your age (with Y2K bug): ${age} years`;
    }

    if (y < 2000) {
        document.getElementById('result').innerHTML = `${firstName} ${lastName}, Your age: ${age} years`;
    }
}
