//Validates an email address
export function validateEmail(email) {
    const regex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
    return regex.test(email);
}

// Function to check if both email and password fields are filled
export function areFieldsFilled(email, password) {
    return email.trim() !== "" && password.trim() !== "";
}

// Function to validate date format (YYYY-MM-DD) and ensure it's not in the future
export function isValidDate(dateString) {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateString)) return false;

    // Parse the date string to a Date object
    const inputDate = new Date(dateString);

    // Get the current date
    const currentDate = new Date();

    // Check if the input date is not in the future and not after the current date
    return inputDate <= currentDate;
}


