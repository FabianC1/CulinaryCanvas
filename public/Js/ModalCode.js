document.addEventListener("DOMContentLoaded", function () {
    // Function to show a modal
    function showModal(modal) {
        modal.style.display = "block";
    }

    // Function to hide all modals
    function hideAllModals() {
        var modals = document.querySelectorAll('.modal');
        modals.forEach(function (modal) {
            modal.style.display = 'none';
        });
    }

    function showAddRecipeForm() {
        var addRecipeModal = document.getElementById("addRecipeModal");
        showModal(addRecipeModal);
    }


    // Get the original modal
    var originalModal = document.getElementById("myModal");
    // Get the logo image element
    var logoButton = document.getElementById("logoButton");
    // Get the <span> element that closes the original modal
    var originalModalCloseButton = originalModal.querySelector(".close");
    // When the user clicks the logo, open the original modal
    logoButton.onclick = function () {
        hideAllModals();
        showModal(originalModal);
    };
    // When the user clicks on <span> (x), close the original modal
    originalModalCloseButton.onclick = function () {
        hideAllModals();
    };

    // Get the login and register buttons from the original modal
    var loginButton = originalModal.querySelector(".modal-body").querySelectorAll(".modal-button")[0];
    var registerButton = originalModal.querySelector(".modal-body").querySelectorAll(".modal-button")[1];
    // Get the login and register modals
    var loginModal = document.getElementById("loginModal");
    var registerModal = document.getElementById("registerModal");
    // Get the <span> elements that close the login and register modals
    var loginModalCloseButton = loginModal.querySelector(".close");
    var registerModalCloseButton = registerModal.querySelector(".close");
    // When the user clicks the login button, show the login modal
    loginButton.onclick = function () {
        hideAllModals();
        showModal(loginModal);
    };
    // When the user clicks the register button, show the register modal
    registerButton.onclick = function () {
        hideAllModals();
        showModal(registerModal);
    };
    // When the user clicks on <span> (x), close the login modal
    loginModalCloseButton.onclick = function () {
        hideAllModals();
    };
    // When the user clicks on <span> (x), close the register modal
    registerModalCloseButton.onclick = function () {
        hideAllModals();
    };

    // Get the accounts and recipes modals
    var accountsModal = document.getElementById("accountsModal");
    var recipesModal = document.getElementById("recipesModal");
    // Get the <span> elements that close the accounts and recipes modals
    var accountsModalCloseButton = accountsModal.querySelector(".close");
    var recipesModalCloseButton = recipesModal.querySelector(".close");

    // When the user clicks the accounts button, show the accounts modal
    var accountsButton = originalModal.querySelector(".modal-body").querySelectorAll(".modal-button")[2];
    accountsButton.onclick = function () {
        hideAllModals();
        showModal(accountsModal);
    };
    // When the user clicks the recipes button, show the recipes modal
    var recipesButton = originalModal.querySelector(".modal-body").querySelectorAll(".modal-button")[3];
    recipesButton.onclick = function () {
        hideAllModals();
        showModal(recipesModal);
    };
    // When the user clicks on <span> (x), close the accounts modal
    accountsModalCloseButton.onclick = function () {
        hideAllModals();
    };
    // When the user clicks on <span> (x), close the recipes modal
    recipesModalCloseButton.onclick = function () {
        hideAllModals();
    };

    // Back buttons functionality
    var backButtons = document.querySelectorAll(".backButton");
    // Function to go back to the main modal
    function goBackToMainModal() {
        hideAllModals();
        showModal(originalModal);
        document.getElementById("recipeSearchBar").style.display = "block";
    }
    // Add event listeners to back buttons
    backButtons.forEach(function (button) {
        button.addEventListener("click", goBackToMainModal);
    });

    // When the user clicks anywhere outside of the modals, close them
    window.onclick = function (event) {
        if (event.target == originalModal || event.target == loginModal || event.target == registerModal || event.target == accountsModal || event.target == recipesModal) {
            hideAllModals();
        }
    };

    // Adding functionality to "Add Your Own Recipe" button
    var addRecipeButton = document.getElementById("addRecipeButton");
    addRecipeButton.onclick = function () {
        showAddRecipeForm();
    };



    function showAddRecipeForm() {
        // Hide placeholder recipes
        document.getElementById("placeholderRecipes").style.display = "none";
        // Hide recipe search bar
        document.getElementById("recipeSearchBar").style.display = "none";
        // Show input fields
        document.getElementById("recipeDescription").style.display = "block";
        document.getElementById("imageUpload").style.display = "block";
        document.getElementById("submitRecipeButton").style.display = "block";
        document.getElementById("recipeTitle").style.display = "block";
    
        // Show userMessage only if showAddRecipeForm is active
        document.getElementById("userMessage").style.display = "block";
    }


    // Function to handle recipe search
    function searchRecipes() {
        var searchValue = document.getElementById("recipeSearchBar").value.toLowerCase();
        var recipes = document.querySelectorAll('.recipe');

        recipes.forEach(function (recipe) {
            var title = recipe.querySelector('.recipe-title').textContent.toLowerCase();
            var description = recipe.querySelector('.recipe-description').textContent.toLowerCase();

            if (title.includes(searchValue) || description.includes(searchValue)) {
                recipe.style.display = "block";
            } else {
                recipe.style.display = "none";
            }
        });
    }

    // Adding functionality to search bar
    var searchBar = document.getElementById("recipeSearchBar");
    searchBar.addEventListener("input", searchRecipes);


});

function submitRecipe() {

    // Hide the input fields for adding a new recipe
    document.getElementById("recipeDescription").style.display = "none";
    document.getElementById("imageUpload").style.display = "none";
    document.getElementById("submitRecipeButton").style.display = "none";
    document.getElementById("recipeTitle").style.display = "none";
    hideUserMessage();

    // Show the Recipes Modal
    document.getElementById("recipesModal").style.display = "block";

    // Reset the input fields or perform any other necessary actions
    document.getElementById("recipeDescription").value = ""; // Reset the recipe description textarea
    document.getElementById("imageUpload").value = ""; // Reset the image upload input
    document.getElementById("recipeTitle").value = ""; // Reset the image upload input
}



function goBackToPlaceholderRecipes() {
    // Hide the input elements for adding a new recipe
    document.getElementById("recipeDescription").style.display = "none";
    document.getElementById("imageUpload").style.display = "none";
    document.getElementById("submitRecipeButton").style.display = "none";
    document.getElementById("recipeTitle").style.display = "none";
    hideUserMessage();

    // Show the placeholder recipes
    document.getElementById("placeholderRecipes").style.display = "block";
}

function hideUserMessage() {
    // Hide userMessage
    document.getElementById("userMessage").style.display = "none";
}
