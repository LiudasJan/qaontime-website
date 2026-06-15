// Mock user data based on session value
const users = {
	1: {
		name: "Jon Snow",
		birthday: "01-01-1986",
		address: "The Wall, Westeros",
		photo: "img/0.jpeg",
	},
	2: {
		name: "Arya Stark",
		birthday: "02-02-1992",
		address: "Winterfell, Westeros",
		photo: "img/2.jpeg",
	},
	3: {
		name: "Tyrion Lannister",
		birthday: "03-03-1975",
		address: "Casterly Rock, Westeros",
		photo: "img/3.jpeg",
	},
	4: {
		name: "Daenerys Targaryen",
		birthday: "04-04-1989",
		address: "Dragonstone, Westeros",
		photo: "img/4.jpeg",
	},
	5: {
		name: "Jaime Lannister",
		birthday: "05-05-1980",
		address: "Kings Landing, Westeros",
		photo: "img/5.jpeg",
	},
	6: {
		name: "Sansa Stark",
		birthday: "06-06-1995",
		address: "Winterfell, Westeros",
		photo: "img/6.jpeg",
	},
};

function login() {
	const username = document.getElementById("username").value;
	const password = document.getElementById("password").value;

	// Simple condition to "authenticate"
	if (username === "Jon" && password === "password") {
		// Set "session" cookie to 1 for demonstration
		document.cookie = "session=1";
		showProfile(1);
	} else {
		alert("Incorrect username or password.");
	}
}

function showProfile(sessionId) {
	const user = users[sessionId];
	if (user) {
		document.getElementById("name").textContent = "Name: " + user.name;
		document.getElementById("birthday").textContent =
			"Birthday: " + user.birthday;
		document.getElementById("address").textContent = "Address: " + user.address;
		document.getElementById("photo").setAttribute("src", user.photo);

		// Toggle visibility
		document.getElementById("loginForm").style.display = "none";
		document.getElementById("profile").style.display = "block";
	}
}

function logout() {
	// Clear session cookie for simplicity
	document.cookie = "session=; max-age=0";
	document.getElementById("loginForm").style.display = "block";
	document.getElementById("profile").style.display = "none";
}

// Function to get cookie by name – for demonstration, you might want to call this to get the session cookie and show profiles based on its value
function getCookie(name) {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) return parts.pop().split(";").shift();
}

// This would be called on page load to check if a session cookie is set and display the corresponding profile
const sessionCookie = getCookie("session");
if (sessionCookie) {
	showProfile(sessionCookie);
}
