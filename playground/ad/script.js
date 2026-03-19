let ads = [];

function postAd() {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    let price = parseFloat(document.getElementById('price').value);
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;

    if (price < 0 || price > 1000000) {
        displayMessage('Please enter a price between 0 and 1,000,000.');
        return;
    }

    if (price === 999999.99) {
        price = 999999.98;
    }

    const ad = { title, description, price, email, address };
    ads.push(ad); 
    displayAds();
    displayMessage(`Ad posted successfully with price: ${price.toFixed(2)} EUR`);

    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('price').value = '';
    document.getElementById('email').value = '';
    document.getElementById('address').value = '';
}

function displayMessage(msg) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = msg;
}

function displayAds() {
    const adsList = document.getElementById('adsList');
    adsList.innerHTML = ''; 

    ads.forEach(ad => {
        const adElement = document.createElement('div');
        adElement.classList.add('ad');
        adElement.innerHTML = `
            <h3>${ad.title}</h3>
            <p>${ad.description}</p>
            <p>Price: ${ad.price.toFixed(2)} EUR</p>
            <p>Email: ${ad.email}</p>
            <p>Address: ${ad.address}</p>
        `;
        adsList.appendChild(adElement);
    });
}

displayAds();
