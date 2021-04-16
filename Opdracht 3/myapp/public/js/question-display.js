

function myQuestion(e) {
    var url = "question-display?questionid="+this.id;
    console.log(url);

    get(url);
    e.preventDefault();
}

function get(url) {
    var req = new XMLHttpRequest();

    req.open ("GET", url, true);
    req.onreadystatechange = function () {
        if( req.readyState === 4 && req.status === 200) {
            console.log(req.responseText);
        }
    }
    req.send();
}