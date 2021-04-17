function createSettings(user) { 
    var settingsSection = document.querySelector(".webpage-content__section");

    var settingsSubSection = document.createElement("section");
    settingsSubSection.setAttribute("class","webpage-content__section__subsection");

    var settingsFormHeader = document.createElement("h2");
    settingsFormHeader.appendChild(document.createTextNode("change account details of user: " + user.username))

    var settingsForm = document.createElement("form");
    settingsForm.setAttribute("id","settingsform");

    var FirstNameInput = document.createElement("input");
    FirstNameInput.setAttribute("name","FirstName");
    settingsForm.appendChild(FirstNameInput);

    var lastNameInput = document.createElement("input");
    lastNameInput.setAttribute("name","lastName");
    settingsForm.appendChild(lastNameInput);

    var passwordInput = document.createElement("input");
    passwordInput.setAttribute("type","password");
    passwordInput.setAttribute("name","password");
    settingsForm.appendChild(passwordInput);

    var confirmInput = document.createElement("input");
    confirmInput.setAttribute("type","password");
    confirmInput.setAttribute("name","confirm");
    settingsForm.appendChild(confirmInput);
    
    var oldPasswordInput = document.createElement("input");
    oldPasswordInput.setAttribute("type","password");
    oldPasswordInput.setAttribute("name","oldPassword");
    settingsForm.appendChild(oldPasswordInput);

    var submitButton = document.createElement("input");
    submitButton.setAttribute("type","submit");
    submitButton.setAttribute("value","Submit");
    settingsForm.appendChild(submitButton);    

    settingsSubSection.appendChild(settingsFormHeader);
    settingsSubSection.appendChild(settingsForm);

    settingsSection.appendChild(settingsSubSection);
}

function getUser(callback) {
    var req = new XMLHttpRequest();
    var user;

    req.open("POST", '/user', true)
    req.onreadystatechange = function () {
        if(req.readyState === 4 && req.status === 200) {
            user = req.response;
            if (user) user = JSON.parse(user);
            console.log(user);
            callback(user);
        }
    }
    req.send();
}

getUser(createSettings);