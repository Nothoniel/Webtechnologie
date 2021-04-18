//in this js file, the client fetches the userdata of the current user.

//based on the fetched data, the "accountbar" in the top right of the screen is populated with buttons related to the account
renderBar = user => {
    var accountbar = document.querySelector(".accountbar");
    accountbar.appendChild(document.createTextNode(user ? user.username : "guest"));
    accountbar.appendChild(document.createElement("br"));

    var logInOutButton = document.createElement("a");
    logInOutButton.appendChild(document.createTextNode(user ? "Settings " : "Log in"));
    logInOutButton.setAttribute("href", user ? "account-settings.html" : "login-page.html");
    accountbar.appendChild(logInOutButton);

    if(user) {
        var reportButton = document.createElement("a");
        reportButton.appendChild(document.createTextNode("Report"));
        reportButton.setAttribute("href", "report.html");
        accountbar.appendChild(reportButton);
    }
}

//gets the required userdata from server and performs callback
getUser = callback => {
    var req = new XMLHttpRequest();

    req.open("POST", "/user", true);
    req.onreadystatechange = function() {
        if(req.readyState === 4 && req.status === 200) {
            var user = req.response;
            if(user)
                user = JSON.parse(user);
            callback(user);
        }
    };
    req.send();
}

getUser(renderBar);