

function myQuestion(e) {
    var url = "question-display?quizid="+this.id;
    // console.log(url);

    var selectedQuizId= this.id;
    get(url, selectedQuizId);
    e.preventDefault();
}

function get(url, selectedQuizId) {
    var req = new XMLHttpRequest();

    req.open ("GET", url, true);
    req.onreadystatechange = function () {
        if( req.readyState === 4 && req.status === 200) {  
            var result = req.response;      
            var test =  JSON.parse(result);
            var {questions, multi} = test;

            createQuiz(questions, multi, selectedQuizId);
        }
    }
    req.send();
}

