
function renderReport(user) {
    var reportSection = document.querySelector(".webpage-content__section");

    var reportSubsection = document.createElement("section");
    reportSubsection.setAttribute("class",".webpage-content__section__subsection")

    var reportHead = document.createElement("h1");
    reportHead.appendChild(document.createTextNode("Statistics report for user: " + user.username))
    reportSubsection.appendChild(reportHead);

    var reportList = document.createElement("ul");

    var userReport = document.createElement("li");
    if(user.overallAttempts)
        userReport.appendChild(document.createTextNode("User's overall succes rate: " + Math.round(10000 * user.overallCorrectAttempts / user.overallAttempts) / 100 + "%"));
    else
        userReport.appendChild(document.createTextNode("User's overall succes rate: There have not been any attempts recorded on this account"));
    reportList.appendChild(userReport);

    var sessionReport = document.createElement("li");
    if(user.sessionAttempts)
        sessionReport.appendChild(document.createTextNode("User's succes rate this session: " + Math.round(10000 * user.sessionCorrectAttempts / user.sessionAttempts) / 100 + "%"));
    else
        sessionReport.appendChild(document.createTextNode("User's succes rate this session: There have not been any attempts recorded this session."));
    reportList.appendChild(sessionReport);

    reportSubsection.appendChild(reportList);
    reportSection.appendChild(reportSubsection);
}

getUserStats = callback => {
    var req = new XMLHttpRequest();

    req.open("post", "/report", true);
    req.onreadystatechange = function() {
        if(req.readyState === 4 && req.status === 200) {
            var user = req.response;
            if(user)
                user = JSON.parse(user);
            console.log(user);
            callback(user);
        }
    };
    req.send();
}

getUserStats(renderReport);