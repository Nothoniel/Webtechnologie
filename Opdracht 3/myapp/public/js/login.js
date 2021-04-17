function clearPage()
{
    var loginSection = document.querySelector(".webpage-content__section");
    for (child of loginSection.childNodes) loginSection.removeChild(child);
}

function createLoginPage()
{
    clearPage();
    var loginSection = document.querySelector(".webpage-content__section");
    var loginSubSection = document.createElement("section");
    loginSubSection.setAttribute("class", "webpage-content__section__subsection");

    var loginForm = document.createElement("form");
    loginForm.setAttribute("id", "loginform");
    loginSubSection.appendChild(loginForm);

    var loginHeader = document.createElement("h1");
    loginHeader.appendChild(document.createTextNode("Log in to your account"));
    loginForm.appendChild(loginHeader);

    var usernameInput = document.createElement("input");
    usernameInput.setAttribute("type", "text");
    usernameInput.setAttribute("name", "username");
    usernameInput.setAttribute("id", "loginUsername");
    var usernameLabel = document.createElement("label");
    usernameLabel.appendChild(document.createTextNode("username:"));
    loginForm.appendChild(usernameLabel);
    loginForm.appendChild(document.createElement("br"));
    loginForm.appendChild(usernameInput);

    loginForm.appendChild(document.createElement("br"));

    var passwordInput = document.createElement("input");
    passwordInput.setAttribute("type", "password");
    passwordInput.setAttribute("name", "password");
    usernameInput.setAttribute("id", "loginPassword");
    var passwordLabel = document.createElement("label");
    passwordLabel.appendChild(document.createTextNode("password:"));
    loginForm.appendChild(passwordLabel);
    loginForm.appendChild(document.createElement("br"));
    loginForm.appendChild(passwordInput);

    loginForm.appendChild(document.createElement("br"));
    loginForm.appendChild(document.createElement("br"));

    var submitButton = document.createElement("input");
    submitButton.setAttribute("type", "submit");
    submitButton.setAttribute("value", "Log in");
    loginForm.appendChild(submitButton);

    loginForm.appendChild(document.createElement("br"));
    loginForm.appendChild(document.createElement("br"));

    //dont have an account? - button
    loginSubSection.appendChild(document.createTextNode("Don't have an account?"));
    loginSubSection.appendChild(document.createElement("br"));

    var RegisterButton = document.createElement("input");
    RegisterButton.setAttribute("type", "button");
    RegisterButton.setAttribute("value", "Register an account");
    RegisterButton.addEventListener("click", function () { location.replace("register-page.html") });
    loginSubSection.appendChild(RegisterButton);

    //add the login subsection to the screen
    loginSection.appendChild(loginSubSection);
}

createLoginPage();

