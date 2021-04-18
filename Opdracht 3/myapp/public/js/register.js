createRegisterPage = () => {   
    var loginSection = document.querySelector(".webpage-content__section");
    var loginSubSection = document.createElement("section");
    loginSubSection.setAttribute("class", "webpage-content__section__subsection");

    var registerForm = document.createElement("form");
    registerForm.setAttribute("id", "registerform");
    loginSubSection.appendChild(registerForm);

    var loginHeader = document.createElement("h1");
    loginHeader.appendChild(document.createTextNode("Register an account"));
    registerForm.appendChild(loginHeader);

    var backButton = document.createElement("input");
    backButton.setAttribute("type", "button");
    backButton.setAttribute("value", "Back to Log in");
    backButton.addEventListener("click", function() {location.replace("login-page.html")});
    registerForm.appendChild(backButton);

    registerForm.appendChild(document.createElement("br"));
    registerForm.appendChild(document.createElement("br"));

    var usernameLabel = document.createElement("label");
    usernameLabel.appendChild(document.createTextNode("username:"));
    registerForm.appendChild(usernameLabel);
    var usernameInput = document.createElement("input");
    usernameInput.setAttribute("name", "username");
    usernameInput.setAttribute("id", "registerUsername");
    registerForm.appendChild(usernameInput);

    registerForm.appendChild(document.createElement("br"));
    registerForm.appendChild(document.createElement("br"));

    var passwordLabel = document.createElement("label");
    passwordLabel.appendChild(document.createTextNode("password:"));
    registerForm.appendChild(passwordLabel);
    var passwordInput = document.createElement("input");
    passwordInput.setAttribute("type", "password");
    passwordInput.setAttribute("name", "password");
    passwordInput.setAttribute("id", "registerPassword");
    registerForm.appendChild(passwordInput);

    registerForm.appendChild(document.createElement("br"));

    var confirmPasswordLabel = document.createElement("label");
    registerForm.appendChild(confirmPasswordLabel);
    confirmPasswordLabel.appendChild(document.createTextNode("confirm password:"));
    var confirmPassword = document.createElement("input");
    confirmPassword.setAttribute("type", "password");
    confirmPassword.setAttribute("name", "confirm");
    registerForm.appendChild(confirmPassword);

    registerForm.appendChild(document.createElement("br"));
    registerForm.appendChild(document.createElement("br"));

    var firstNameLabel = document.createElement("label");
    firstNameLabel.appendChild(document.createTextNode("first name:"));
    registerForm.appendChild(firstNameLabel);
    var firstNameInput = document.createElement("input");
    firstNameInput.setAttribute("name", "firstName");
    firstNameInput.setAttribute("id", "firstname");
    registerForm.appendChild(firstNameInput);

    registerForm.appendChild(document.createElement("br"));
    registerForm.appendChild(document.createElement("br"));

    var lastNameLabel = document.createElement("label");
    lastNameLabel.appendChild(document.createTextNode("last name:"));
    registerForm.appendChild(lastNameLabel);
    var lastNameInput = document.createElement("input");
    lastNameInput.setAttribute("name", "lastName");
    lastNameInput.setAttribute("id", "lastname");
    registerForm.appendChild(lastNameInput);

    registerForm.appendChild(document.createElement("br"));
    registerForm.appendChild(document.createElement("br"));

    var submitButton = document.createElement("input");
    submitButton.setAttribute("type", "submit");
    submitButton.setAttribute("value", "register");
    submitButton.setAttribute("id", "register");

    registerForm.appendChild(submitButton);

    loginSection.appendChild(loginSubSection);
}

createRegisterPage();


