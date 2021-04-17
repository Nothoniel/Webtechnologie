function renderBar(user) {
    var accountbar = document.querySelector(".accountbar");
    accountbar.appendChild(document.createTextNode(user?user.username:"guest"));
    accountbar.appendChild(document.createElement("br"));
    var LogInOutButton = document.createElement("a");
    LogInOutButton.appendChild(document.createTextNode(user?"Settings":"Log in"));
    LogInOutButton.setAttribute("href",user?"account-settings.html":"login-page.html");
    accountbar.appendChild(LogInOutButton);
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

getUser(renderBar);