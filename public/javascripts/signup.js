/// Get form inputs
let username = document.getElementById("username");
let name = document.getElementById("name");
let email = document.getElementById("email");
let password = document.getElementById("password");

let usernameError = document.querySelector("#username-error-message")
let nameError = document.querySelector("#name-error-message")
let emailError = document.querySelector("#email-error-message")
let passwordError = document.querySelector("#password-error-message")


const form = document.getElementById("signup-form");
form.addEventListener("submit", function (event) {
    let errorMessages = {};

    const nameRegex = /^[a-zA-Z][a-zA-Z0-9 ]*$/;
    const usernameRegex = /^[a-z][a-z0-9]*$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (username.value === '' || username.value == null || username.value.trim().length === 0) {
        errorMessages.username = "Username must be filled";
    }
    else if (!usernameRegex.test(username.value)) {
        errorMessages.username = "Username is not valid";
    }
    else if (username.value.length > 100) {
        errorMessages.username = "Username is too long";
    }

    if (name.value === '' || name.value == null || name.value.trim().length === 0) {
        errorMessages.name = "Name must be filled";
    }
    else if (!nameRegex.test(name.value)) {
        errorMessages.name = "Name is not valid";
    }
    else if (name.value.length > 100) {
        errorMessages.name = "Name is too long";
    }
    else if (!isNaN(name.value)) {
        errorMessages.name = "Invalid Name";
    }

    if (email.value === '' || email.value == null || email.value.trim().length === 0) {
        errorMessages.email = "Email must be filled";
    }
    else if (!emailRegex.test(email.value)) {
        errorMessages.email = "Email is invalid"
    }

    else if (email.value.length > 100) {
        errorMessages.email = "Email is too long";
    }




    if (password.value === '' || password.value == null || password.value.trim().length === 0) {
        errorMessages.password = "Password must be filled";
    }
    else if (password.value.length > 100) {
        errorMessages.password = "Password is too long";
    }
    else if (password.value.length < 5) {
        errorMessages.password = "Password  is too short";
    }

    // Display error messages
    usernameError.innerHTML = errorMessages.username || "";
    nameError.innerHTML = errorMessages.name || "";
    emailError.innerHTML = errorMessages.email || "";
    passwordError.innerHTML = errorMessages.password || "";

    // Prevent form submission if there are errors
    if (Object.values(errorMessages).some(message => message !== "")) {
        event.preventDefault();
    }
});