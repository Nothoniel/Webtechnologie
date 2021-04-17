
async function myAnswer(e) {
    var answer;
    var answerArray=[];
    switch (typeOfQuestion) {
        case "open":
                //open question
                answer = document.getElementById("openQuestionAnswer").value;  
            break;
        case "multipleChoice":
                //answer of multipleChoice
                answer = document.querySelector('input[name="answersOfQ"]:checked').value;
            break;
        case "multiChoice":
                var checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
                    for (var checkbox of checkboxes) { answerArray.push(checkbox.value)}
            break;                   
    }

    if(answerArray.length>0){
        answer = answerArray;
    }

    sendAnswer(currentquestionID, answer); 
    e.preventDefault();
}

async function sendAnswer(currentquestionID, answer) {
    var req = new XMLHttpRequest();
    var data = {currentquestionID, answer};
    var options = JSON.stringify(data);

    req.open ("POST","feedback", true);
    req.setRequestHeader( "Content-Type", "application/json" );
    req.onreadystatechange = function () {
        if( req.readyState === 4 && req.status === 200) {  
            var result = req.response;
            console.log(result);      
            // var feedback =  JSON.parse(result);
            // var {questions, multi} = test;
        }
    }
    req.send( options);
}


// var answerForm = document.getElementById("userAnswer");
// if(answerForm){
//     answerForm.addEventListener("click", myAnswer);
// }

// var answerForm= document.getElementById("userAnswer");
// answerForm.addEventListener("submit", myAnswer);

// document.getElementById("userAnswer").removeEventListener("load", getStartPage);