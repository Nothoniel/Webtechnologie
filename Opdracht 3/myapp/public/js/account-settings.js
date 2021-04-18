//account settings page DOM
createSettings = user => { 
    var settingsSection = document.querySelector(".webpage-content__section");

    var settingsSubSection = document.createElement("section");
    settingsSubSection.setAttribute("class", "webpage-content__section__subsection");

    var settingsFormHeader = document.createElement("h2");
    settingsFormHeader.appendChild(document.createTextNode("change account details"));

    var settingsForm = document.createElement("form");
    settingsForm.setAttribute("id", "settingsform");

    var logoutHeader = document.createElement("h2");
    logoutHeader.appendChild(document.createTextNode("log out here"));

    var logoutButton = document.createElement("input");
    logoutButton.setAttribute("type", "button");
    logoutButton.setAttribute("value", "Log out");
    logoutButton.addEventListener("click", logout);

    var logoutForm = document.createElement("form");
    logoutForm.appendChild(logoutButton);

    var firstNameLabel = document.createElement("label");
    firstNameLabel.setAttribute("for", "fName");
    firstNameLabel.appendChild(document.createTextNode("First Name:"));
    settingsForm.appendChild(firstNameLabel);
    var firstNameInput = document.createElement("input");
    firstNameInput.setAttribute("name", "firstName");
    firstNameInput.setAttribute("id", "fName")
    settingsForm.appendChild(firstNameInput);
    settingsForm.appendChild(document.createElement("br"));

    var lastNameLabel = document.createElement("label");
    lastNameLabel.setAttribute("for", "lName");
    lastNameLabel.appendChild(document.createTextNode("Last Name:"));
    settingsForm.appendChild(lastNameLabel);
    var lastNameInput = document.createElement("input");
    lastNameInput.setAttribute("name", "lastName");
    lastNameInput.setAttribute("id", "lName");
    settingsForm.appendChild(lastNameInput);
    settingsForm.appendChild(document.createElement("br"));

    var passwordLabel = document.createElement("label");
    passwordLabel.setAttribute("for", "pw");
    passwordLabel.appendChild(document.createTextNode("New Password:"));
    settingsForm.appendChild(passwordLabel);
    var passwordInput = document.createElement("input");
    passwordInput.setAttribute("type", "password");
    passwordInput.setAttribute("name", "password");
    passwordInput.setAttribute("id", "pw");
    settingsForm.appendChild(passwordInput);
    settingsForm.appendChild(document.createElement("br"));

    var confirmLabel = document.createElement("label");
    confirmLabel.setAttribute("for", "cpw");
    confirmLabel.appendChild(document.createTextNode("Confirm New PassWord:"));
    settingsForm.appendChild(confirmLabel);
    var confirmInput = document.createElement("input");
    confirmInput.setAttribute("type", "password");
    confirmInput.setAttribute("name", "confirm");
    confirmInput.setAttribute("id", "cpw");
    settingsForm.appendChild(confirmInput);
    settingsForm.appendChild(document.createElement("br"));
    
    var oldPasswordLabel = document.createElement("label");
    oldPasswordLabel.setAttribute("for", "opw");
    oldPasswordLabel.appendChild(document.createTextNode("Old Password:"));
    settingsForm.appendChild(oldPasswordLabel);
    var oldPasswordInput = document.createElement("input");
    oldPasswordInput.setAttribute("type", "password");
    oldPasswordInput.setAttribute("name", "oldPassword");
    oldPasswordInput.setAttribute("id", "opw");
    settingsForm.appendChild(oldPasswordInput);
    settingsForm.appendChild(document.createElement("br"));
    
    var submitButton = document.createElement("input");
    submitButton.setAttribute("type", "submit");
    submitButton.setAttribute("id", "submit");
    submitButton.setAttribute("value", "Submit");
    settingsForm.appendChild(submitButton);    

    settingsSubSection.appendChild(settingsFormHeader);
    settingsSubSection.appendChild(settingsForm);
    settingsSubSection.appendChild(logoutHeader);
    settingsSubSection.appendChild(logoutForm
);

    settingsSection.appendChild(settingsSubSection);
}

//sends request to server, so that the user is logged out
logout = () => {
    var req = new XMLHttpRequest();

    req.open("POST", "/logout", true);
    req.onreadystatechange = function() {
        if(req.readyState === 4 && req.status === 200)
            window.location.replace("index.html");
    };
    req.send();
}

createSettings();