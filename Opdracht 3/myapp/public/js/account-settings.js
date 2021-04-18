createSettings = user => { 
    var settingsSection = document.querySelector(".webpage-content__section");

    var settingsSubSection = document.createElement("section");
    settingsSubSection.setAttribute("class", "webpage-content__section__subsection");

    var settingsFormHeader = document.createElement("h2");
    settingsFormHeader.appendChild(document.createTextNode("change account details"));

    var settingsForm = document.createElement("form");
    settingsForm.setAttribute("id", "settingsform");

    var firstNameLabel = document.createElement("label");
    firstNameLabel.setAttribute("for", "fName");
    settingsForm.appendChild(firstNameLabel.appendTextNode("First Name:"));
    var firstNameInput = document.createElement("input");
    firstNameInput.setAttribute("name", "firstName");
    firstNameInput.setAttribute("id", "fName")
    settingsForm.appendChild(firstNameInput);
    settingsForm.appendChild(document.createElement("br"));

    var lastNameLabel = document.createElement("label");
    lastNameLabel.setAttribute("for", "lName");
    settingsForm.appendChild(lastNameLabel.appendTextNode("Last Name:"))
    var lastNameInput = document.createElement("input");
    lastNameInput.setAttribute("name", "lastName");
    lastNameInput.setAttribute("id", "lName");
    settingsForm.appendChild(lastNameInput);
    settingsForm.appendChild(document.createElement("br"));

    var passwordLabel = document.createElement("label");
    passwordLabel.setAttribute("for", "pw");
    settingsForm.appendChild(passwordLabel.appendTextNode("New Password:"))
    var passwordInput = document.createElement("input");
    passwordInput.setAttribute("type", "password");
    passwordInput.setAttribute("name", "password");
    passwordInput.setAttribute("id", "pw");
    settingsForm.appendChild(passwordInput);
    settingsForm.appendChild(document.createElement("br"));

    var confirmLabel = document.createElement("label");
    confirmLabel.setAttribute("for", "cpw");
    settingsForm.appendChild(confirmLabel.appendTextNode("Confirm New PassWord:"));
    var confirmInput = document.createElement("input");
    confirmInput.setAttribute("type", "password");
    confirmInput.setAttribute("name", "confirm");
    confirmInput.setAttribute("id", "cpw");
    settingsForm.appendChild(confirmInput);
    settingsForm.appendChild(document.createElement("br"));
    
    var oldPasswordLabel = document.createElement("label");
    oldPasswordLabel.setAttribute("for", "opw");
    settingsForm.appendChild(oldPasswordLabel.appendTextNode("Old Password:"));
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

    settingsSection.appendChild(settingsSubSection);
}

createSettings();