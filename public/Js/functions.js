async function login() {
    let email = document.getElementById("emailLogin").value;
    let password = document.getElementById("passwordLogin").value;

    if (email.trim() === "" || password.trim() === "") {
        const feedback = {
            success: false,
            message: "Please fill in both email and password fields."
        };
        return JSON.stringify(feedback);
    }

    // Check if user is already logged in
    const loggedInEmail = localStorage.getItem("email");
    const loggedInUsername = localStorage.getItem("username");
    if (loggedInEmail === email && loggedInUsername) {
        const feedback = {
            success: false,
            message: `You are already logged in as ${loggedInUsername}!`
        };
        return JSON.stringify(feedback);
    }

    try {
        const response = await fetch("/M00860030/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            const feedback = {
                success: false,
                message: "Invalid email or password."
            };
            return JSON.stringify(feedback);
        }

        const userData = await response.json();
        localStorage.setItem("username", userData.username); // Store username in local storage
        localStorage.setItem("email", email); // Store email in local storage

        checkLoggedIn();

        const feedback = {
            success: true,
            message: `Logged in as: ${userData.username}`
        };
        return JSON.stringify(feedback);

    } catch (error) {
        const feedback = {
            success: false,
            message: error.message
        };
        return JSON.stringify(feedback);
    }
}


async function handleLogin() {
    const loginResult = await login();
    const { success, message } = JSON.parse(loginResult);

    // Display feedback message
    document.getElementById("LoginFailure").innerHTML = message;

    // Play sound effects based on login result
    if (success) {
        LoginSoundEffectSuccess();
    } else {
        LoginSoundEffectFail();
    }
}






window.onload = function () {
    // Retrieve username from local storage
    const username = localStorage.getItem("username");

    // Display the username at the top of the page
    if (username) {
        document.getElementById("usernameDisplay").textContent = `Logged in as: ${username}`;
    }
};


async function storeUser() {
    // Retrieve input values
    const usernameInput = document.getElementById("usernameInput").value.trim();
    const emailInput = document.getElementById("emailInput").value.trim();
    const passwordInput = document.getElementById("passwordInput").value.trim();
    const dateInput = document.getElementById("dateInput").value.trim();
    const profilePictureInput = document.getElementById("profilePictureInput").files[0];

    // Perform validation
    if (usernameInput === '' || emailInput === '' || passwordInput === '' || dateInput === '' || !profilePictureInput) {
        // Display error message if any field is empty or no file is selected
        document.getElementById("errorMessage").textContent = "Please fill in all fields.";
        RegisterSoundEffectFail();
        return; // Exit the function if any field is empty
    }


    // Validate email format using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput)) {
        document.getElementById("errorMessage").textContent = "Invalid email address.";
        RegisterSoundEffectFail();
        return; // Exit the function if email is invalid
    }

    // Validate password length
    if (passwordInput.length < 6) {
        document.getElementById("errorMessage").textContent = "Password must be at least 6 characters long.";
        RegisterSoundEffectFail();
        return; // Exit the function if password is too short
    }

    // Validate date format (you can add more specific validation if needed)
    if (!isValidDate(dateInput)) {
        document.getElementById("errorMessage").textContent = "Invalid date format.";
        RegisterSoundEffectFail();
        return; // Exit the function if date is invalid
    }

    // Create FormData object to send both user data and profile picture file
    const formData = new FormData();
    formData.append("username", usernameInput);
    formData.append("email", emailInput);
    formData.append("password", passwordInput);
    formData.append("DOB", dateInput);
    formData.append("profilePicture", profilePictureInput);

    // Send user data and profile picture file to the server
    fetch('/M00860030/AddUser', {
        method: 'POST',
        body: formData
    })
        .then(response => {
            if (response.status === 409) { // HTTP status 409: Conflict (email already exists)
                document.getElementById("errorMessage").textContent = "An account with this email address already exists.";
            } else if (!response.ok) { // Other errors
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            } else { // Success
                document.getElementById("errorMessage").textContent = "Account created successfully!";
                RegisterSoundEffectSuccess();
            }
        })
        .catch(error => {
            console.error("Error adding user: ", error);
        });
}


// Function to validate date format (YYYY-MM-DD) and ensure it's not in the future
function isValidDate(dateString) {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateString)) return false;

    // Parse the date string to a Date object
    const inputDate = new Date(dateString);

    // Get the current date
    const currentDate = new Date();

    // Check if the input date is not in the future and not after the current date
    return inputDate <= currentDate;
}


function togglePasswordVisibility() {
    const passwordInput = document.getElementById("passwordLogin");
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
    } else {
        passwordInput.type = "password";
    }
}




//function to play sound effect for login failure
function LoginSoundEffectFail() {
    const LoginFailSound = document.getElementById("LoginFailSound");
    LoginFailSound.currentTime = 0;
    LoginFailSound.play();
}

//function to play sound effect for login success
function LoginSoundEffectSuccess() {
    const LoginCorrectSound = document.getElementById("LoginCorrectSound");
    LoginCorrectSound.play();
}

//function to play sound effect for registration failure
function RegisterSoundEffectFail() {
    const RegisterFail = document.getElementById("RegisterFail");
    RegisterFail.currentTime = 0;
    RegisterFail.play();
}

//function to play sound effect for registration scuccess
function RegisterSoundEffectSuccess() {
    const RegisterSuccess = document.getElementById("RegisterSuccess");
    RegisterSuccess.play();
}


function checkUploadStatus() {
    const uploadedImageMessage = document.getElementById("userMessage").textContent;
    const descriptionMessage = document.getElementById("userMessage").textContent;

    if (uploadedImageMessage === "Image uploaded successfully!" && descriptionMessage === "Description submitted successfully!") {
        document.getElementById("userMessage").textContent = "Recipe and image uploaded successfully!";
    }
}



function uploadImageAndDescription() {
    // Check if the user is logged in
    const loggedInUsername = localStorage.getItem("username");
    if (!loggedInUsername) {
        document.getElementById("userMessage").textContent = "Please log in to upload recipes.";
        return;
    }

    // Get the image file, recipe title, and recipe description
    const imageFile = document.getElementById("imageUpload").files[0];
    const recipeTitle = document.getElementById("recipeTitle").value.trim();
    const recipeDescription = document.getElementById("recipeDescription").value.trim();

    // Validate if all required fields are provided
    if (!imageFile || !recipeTitle || !recipeDescription) {
        document.getElementById("userMessage").textContent = "Please fill in all fields.";
        return;
    }

    // Create FormData object to store data
    const formData = new FormData();
    formData.append("username", loggedInUsername); // Add username to the form data
    formData.append("title", recipeTitle); // Add title of the recipe
    formData.append("description", recipeDescription);
    formData.append("myFile", imageFile);

    // Send AJAX request to server to upload image and description
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/uploadImageAndDescription");
    xhr.onload = function () {
        if (xhr.status === 200) {
            // Recipe uploaded successfully
            console.log("Recipe uploaded successfully");
            document.getElementById("userMessage").textContent = "Recipe uploaded successfully!";
            // Fetch the latest recipes and update the page
            fetchRecipes();
        } else {
            // Failed to upload recipe, display error message
            console.log("Failed to upload recipe");
            document.getElementById("userMessage").textContent = "Recipe submitted with an error";
            fetchRecipes();
        }
    };
    xhr.send(formData);
}







// Function to fetch recipes from the server and populate them into the HTML
function fetchAndDisplayRecipes() {
    fetch('/M00860030/getAllRecipes')
        .then(response => response.json())
        .then(recipes => {
            // Clear the existing placeholder recipes only if there are recipes in the database
            if (recipes.length > 0) {
                placeholderRecipes.innerHTML = '';
            }

            // Populate the website with fetched recipes
            recipes.forEach(recipe => {
                const recipeDiv = document.createElement("div");
                recipeDiv.classList.add("recipe");

                // Create an img element
                const image = document.createElement("img");

                // Set the src attribute to the image path retrieved from the database
                image.src = recipe.imageURL;

                // Add CSS class to the image element
                image.classList.add("recipe-image");

                // Append the image element to the recipe div
                recipeDiv.appendChild(image);

                const recipeDetailsDiv = document.createElement("div");
                recipeDetailsDiv.classList.add("recipe-details");

                // Display the title as "Title: [Recipe Title] - [Uploaded By]"
                const title = document.createElement("h3");
                title.textContent = `${recipe.title} - ${recipe.uploaded_by}`;
                title.classList.add("recipe-title");
                recipeDetailsDiv.appendChild(title);

                const description = document.createElement("p");
                description.textContent = recipe.description;
                description.classList.add("recipe-description");
                recipeDetailsDiv.appendChild(description);

                recipeDiv.appendChild(recipeDetailsDiv);

                // Append the recipe div to the placeholderRecipes container
                placeholderRecipes.appendChild(recipeDiv);
            });
        })
        .catch(error => console.error("Error fetching recipes:", error));
}







// Function to handle logout
function logout() {
    // Clear user authentication state (remove stored data from localStorage)
    localStorage.removeItem("username");
    localStorage.removeItem("email");

    // Update UI to indicate user is logged out
    document.getElementById("usernameDisplay").textContent = "Not logged in!";

    // Optionally, reset any other UI elements or perform additional cleanup

    // Display message to the user
    document.getElementById("userMessage").textContent = "Logging out...";

    // Send a request to logout endpoint on the server
    fetch('/M00860030/logout', {
        method: 'POST',
        credentials: 'same-origin', // Include cookies in the request
    })
        .then(response => {
            if (response.ok) {
                // Hide the logout button
                document.getElementById("LogoutButton").style.display = "none";
                document.getElementById("userMessage").textContent = "Logged out successfully!";
            } else {
                // Handle error response
                document.getElementById("userMessage").textContent = "Failed to logout!";
            }
        })
        .catch(error => {
            console.error('Error logging out:', error);
            document.getElementById("userMessage").textContent = "Failed to logout!";
        });
}


// Function to check if a user is logged in
function checkLoggedIn() {
    const loggedInUsername = localStorage.getItem("username");

    if (loggedInUsername) {
        // User is logged in, show the logout button
        document.getElementById("LogoutButton").style.display = "block";
        // Optionally, display the logged-in username or perform other actions
        document.getElementById("usernameDisplay").textContent = `Logged in as: ${loggedInUsername}`;
    } else {
        // User is not logged in, hide the logout button
        document.getElementById("LogoutButton").style.display = "none";
        // Optionally, update other UI elements for logged-out state
        document.getElementById("usernameDisplay").textContent = "Not logged in!";
    }
}

// Check user login state on page load
window.onload = function () {
    checkLoggedIn();
    fetchAndDisplayRecipes();
    fetchUserAccounts();
};

// Add event listener to logout button
document.getElementById("LogoutButton").addEventListener("click", logout);




// Function to handle form reset
function resetForm() {
    // Clear the recipe description field
    document.getElementById("recipeDescription").value = "";

    // Clear any error messages
    document.getElementById("userMessage").textContent = "";
}





// Function to handle searching for accounts
function searchAccounts() {
    const searchInput = document.getElementById("accountSearchBar").value.toLowerCase();
    const accounts = document.getElementsByClassName("account");

    for (let account of accounts) {
        const accountName = account.getElementsByClassName("account-name")[0].textContent.toLowerCase();
        if (accountName.includes(searchInput)) {
            account.style.display = "block";
        } else {
            account.style.display = "none";
        }
    }
}



async function displayUsers() {
    try {
        const response = await fetch('/M00860030/getAllUsers');
        const users = await response.json();
        const accountsList = document.getElementById('accountsList');

        // Clear previous users
        accountsList.innerHTML = '';

        // Iterate over fetched users and create HTML elements
        users.forEach(user => {
            const accountDiv = document.createElement('div');
            accountDiv.classList.add('account');

            const profilePicture = document.createElement('img');
            profilePicture.src = user.profilePictureURL; // Assuming the field name is profilePictureURL
            profilePicture.alt = user.username + "'s Profile Picture";
            profilePicture.classList.add('account-image');
            accountDiv.appendChild(profilePicture);

            const username = document.createElement('h3');
            username.textContent = user.username; // Assuming the field name is username
            username.classList.add('account-name');
            accountDiv.appendChild(username);

            // Append the account div to the accountsList container
            accountsList.appendChild(accountDiv);
        });
    } catch (error) {
        console.error("Error fetching and displaying users:", error);
    }
}

