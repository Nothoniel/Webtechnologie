

function myQuestion(e) {
    var url = "question-display?quizid="+this.id;

    var selectedQuizID= this.id;
    get(url, selectedQuizID);
    e.preventDefault();
}

function get(url, selectedQuizID) {
    var req = new XMLHttpRequest();

    req.open ("GET", url, true);
    req.onreadystatechange = function () {
        if( req.readyState === 4 && req.status === 200) {  
            var result = req.response;      
            var test =  JSON.parse(result);
            var {questions, multi} = test;
            
            createQuiz(questions, multi, selectedQuizID);
        }
    }
    req.send();
}

