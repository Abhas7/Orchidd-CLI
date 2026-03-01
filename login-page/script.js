/**
 * script.js
 * Handles client-side validation for the login form.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Get references to form elements
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const errorMessageDiv = document.getElementById('errorMessage');

    /**
     * Displays an error message in the designated error div.
     * @param {string} message - The error message to display.
     */
    const displayError = (message) => {
        errorMessageDiv.textContent = message;
        errorMessageDiv.style.display = 'block'; // Ensure the error message is visible
    };

    /**
     * Clears any displayed error messages.
     */
    const clearError = () => {
        errorMessageDiv.textContent = '';
        errorMessageDiv.style.display = 'none'; // Hide the error message div when empty
    };

    /**
     * Performs client-side validation on the login form inputs.
     * @param {string} username - The username entered by the user.
     * @param {string} password - The password entered by the user.
     * @returns {boolean} - True if validation passes, false otherwise.
     */
    const validateForm = (username, password) => {
        clearError(); // Clear previous errors before re-validating

        if (!username.trim()) {
            displayError('Username cannot be empty.');
            usernameInput.focus();
            return false;
        }

        if (!password.trim()) {
            displayError('Password cannot be empty.');
            passwordInput.focus();
            return false;
        }

        // Additional validation rules can be added here (e.g., password strength, username format)
        // For this example, we only check for non-empty fields.

        return true;
    };

    // Add event listener for form submission
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        const username = usernameInput.value;
        const password = passwordInput.value;

        if (validateForm(username, password)) {
            // If validation passes, you would typically send these credentials to a server.
            // For this client-side only example, we'll log them to the console.
            console.log('Login successful!');
            console.log('Username:', username);
            console.log('Password:', password);
            // In a real application, you might redirect the user:
            // window.location.href = '/dashboard';
            alert('Login successful! (Check console for credentials)');
            loginForm.reset(); // Optionally clear the form after successful login
        } else {
            console.log('Login failed due to validation errors.');
        }
    });

    // Add event listeners to clear errors when user starts typing again
    usernameInput.addEventListener('input', clearError);
    passwordInput.addEventListener('input', clearError);

    // Initially hide the error message div
    clearError();
});
