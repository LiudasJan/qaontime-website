let stringList = [];

function addString() {
    const input = document.getElementById('inputString');
    const string = input.value.trim();
    if (string) {
        stringList.push(string);
        displayList();
    }
    input.value = '';
}

function searchList() {
    const searchInput = document.getElementById('searchString');
    const searchString = searchInput.value.trim().toLowerCase();
    const results = stringList.filter(item => item.toLowerCase().includes(searchString));
    displaySearchResults(results);
}

function displayList() {
    const listContainer = document.getElementById('stringList');
    listContainer.innerHTML = '';
    stringList.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        listContainer.appendChild(li);
    });
}

function displaySearchResults(results) {
    const resultContainer = document.getElementById('resultList');
    resultContainer.innerHTML = ''; 
    results.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        resultContainer.appendChild(li);
    });
}

displayList();
