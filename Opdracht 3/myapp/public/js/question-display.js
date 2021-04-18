var getData = "";

function sendRequest(getData) {
    var data = {getData};
    var options = {
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
            "Accept" : "application/json"
        },
        body : JSON.stringify(data)
    };
    var response = fetch("/start", options);
}

function getStart() {
    getData = "Startpage";
    sendRequest(getData);
}

//event on the submit button that determines that t
window.addEventListener("load", getStart());