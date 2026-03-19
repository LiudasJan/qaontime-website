document.getElementById("imageUpload").addEventListener("change", function(event) {
    const reader = new FileReader();
    reader.onload = function() {
        const img = document.createElement("img");
        img.src = reader.result;
        img.style.width = "300px";
        img.style.marginTop = "10px";
        document.getElementById("newPostContent").parentNode.insertBefore(img, document.getElementById("newPostContent").nextSibling);
    };
    reader.readAsDataURL(event.target.files[0]);
});

// Function to generate a simple hash for a post's content to use as a unique identifier
function generatePostId(content) {
    let hash = 0;
    for (let i = 0; i < content.length; i++) {
        const char = content.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return "post_" + hash.toString();
}

function createPost() {
    const content = document.getElementById("newPostContent").value;
    const imgFile = document.getElementById("imageUpload").files[0];

    const currentUserName = localStorage.getItem("bugBookUserName") || "Fogell McLovin"; // Use stored name

    if (content.trim() === "" && !imgFile) {
        alert("Please enter content or choose an image.");
        return;
    }

    const postId = generatePostId(content);
    const postElement = document.createElement("div");
    postElement.classList.add("post");
    postElement.setAttribute("id", postId);
    postElement.innerHTML = `
        <h4>${currentUserName}</h4>
        <p>${content}</p>
        <button onclick="toggleLike(this, '${postId}')">Like</button>
        <span class="likesCount">0</span> Likes
    `;
    if (imgFile) {
        const reader = new FileReader();
        reader.onload = function() {
            const imgElement = document.createElement("img");
            imgElement.src = reader.result;
            imgElement.style.width = "300px";
            imgElement.style.marginTop = "10px";
            postElement.insertBefore(imgElement, postElement.children[1]);
        };
        reader.readAsDataURL(imgFile);
    }
    postsContainer.prepend(postElement);

    document.getElementById("newPostContent").value = "";
    document.getElementById("imageUpload").value = "";
}

function toggleLike(button, postId) {
    // Check if this post has already been liked
    if (localStorage.getItem(postId)) {
        alert("You've already liked this post!");
        return;
    }

    const likesCountSpan = button.nextSibling.nextSibling;
    let likesCount = parseInt(likesCountSpan.textContent);
    likesCount++;
    likesCountSpan.textContent = likesCount + (likesCount === 1 ? "" : " Likes");

    // Mark this post as liked in localStorage
    localStorage.setItem(postId, "liked");
}


// Existing JavaScript code for creating posts, toggling likes, etc.

document.getElementById("refreshState").addEventListener("click", function() {
    // Clear localStorage
    localStorage.clear();
    window.location.reload();

});


function changeUserName() {
    const newName = document.getElementById("userNameInput").value.trim();
    if (!newName) {
        alert("Please enter a valid name.");
        return;
    }
    
    localStorage.setItem("bugBookUserName", newName);
    alert("User name changed successfully to " + newName);
    document.getElementById("userNameInput").value = ""; // Clear input field after change
    document.getElementById("userNameInput").setAttribute("placeholder", newName);
}