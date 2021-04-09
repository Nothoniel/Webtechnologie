function currentQuestion(e) {
    var question = document.getElementById("question").value;
    var url = "ajax.js?question="+question;
    get(url); // function to process ajax
    e.preventDefault();
}

function get(url) {
        var req = new XMLHttpRequest();

        req.open("GET", url, true);
        req.onreadystatechange = function () {
            if (req.readyState === 4 && req.status === 200) {
                var response = req.responseData;
            }
        }
        req.send();
}


//for feedback the id needs to be on a form that contains the data input
//the id needs to be on the button 
document.getElementById("button").addEventListener("click", currentQuestion);
