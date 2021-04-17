

function myQuestion(e) {
    var url = "question-display?quizid="+this.id;
    console.log(url);

    get(url);
    e.preventDefault();
}

function get(url) {
    var req = new XMLHttpRequest();

    req.open ("GET", url, true);
    req.onreadystatechange = function () {
        if( req.readyState === 4 && req.status === 200) {
            var result = req.response;      
            var test =  JSON.parse(result);
            var {questions, multi} = test;
            console.log(questions, multi);
            createQuiz(questions, multi);
        }
    }
    req.send();
}

