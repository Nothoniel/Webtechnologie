
myAnswer = e => {
    var answer;
    var answerArray = [];
    switch(typeOfQuestion) {
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
            for (var checkbox of checkboxes)
                answerArray.push(checkbox.value)
            break;
        case "ordering":
            //get the array in correct sequence of order question
            var sequence = document.querySelectorAll('label[name="orderValue"]');
            for (let i = 0; i < sequence.length; i++)
                answerArray.push(sequence[i].textContent);                  
            break;
    }

    if(answerArray.length>0) {
        answer = answerArray;
        console.log(answer);
    }

    sendAnswer(currentquestionID, answer, typeOfQuestion); 
    e.preventDefault();
}

async function sendAnswer(currentquestionID, answer, type) {
    var req = new XMLHttpRequest();
    var data = {currentquestionID, answer, type};
    var options = JSON.stringify(data);

    req.open ("POST", "feedback", true);
    req.setRequestHeader("Content-Type", "application/json");
    req.onreadystatechange = function() {
        if(req.readyState === 4 && req.status === 200) {  
            var result = req.response;
            var feedback = JSON.parse(result);
            //printing out the whole object
            console.log(feedback); 
            //printing out something specific
            console.log(feedback[0].feedback);      
            // var {questions, multi} = test;
        }
    }
    req.send(options);
}


// var answerForm = document.getElementById("userAnswer");
// if(answerForm){
//     answerForm.addEventListener("click", myAnswer);
// }

// var answerForm= document.getElementById("userAnswer");
// answerForm.addEventListener("submit", myAnswer);

// document.getElementById("userAnswer").removeEventListener("load", getStartPage);