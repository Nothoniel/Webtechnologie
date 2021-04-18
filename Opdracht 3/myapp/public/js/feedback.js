
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
        case "ordering":
                //get the array in correct sequence of order question
                var sequence = document.querySelectorAll('label[name="orderValue"]');
                     for (let i = 0; i < sequence.length; i++) {
                        answerArray.push(sequence[i].textContent);
                    }                    
            break;
    }

    if(answerArray.length>0) {
        answer = answerArray;
    }

    sendAnswer(currentquestionID, answer, typeOfQuestion); 
    e.preventDefault();
}

async function sendAnswer(currentquestionID, answer, type) {
    var req = new XMLHttpRequest();
    var data = {currentquestionID, answer, type};
    var options = JSON.stringify(data);

    req.open ("POST","feedback", true);
    req.setRequestHeader( "Content-Type", "application/json" );
    req.onreadystatechange = function () {
        if( req.readyState === 4 && req.status === 200) {  
            var result = req.response;
            var infoResponse = JSON.parse(result);

            //check if there is not already a feedback present
            if(document.getElementById("resultQuestion")){
                var feedback = document.getElementById("resultQuestion")
                feedback.parentNode.removeChild(feedback);    
            }
            renderFeedback(infoResponse);
        }
    }
    req.send(options);
}

//rendering of the feedback
function renderFeedback (infoResponse) {
    var resultDiv = document.createElement("div");
    resultDiv.setAttribute("id", "resultQuestion");
    var resultSection = document.createElement("section");
    resultSection.className = "webpage-content__section__subsection";
 
    var feedback = document.createTextNode(infoResponse[0].feedback);
    resultSection.appendChild(feedback);
    //incorrect answer, would result in an response object with length bigger than 1
    if(Object.keys(infoResponse[0]).length>1)  
    {
        var linkInformation = document.createElement("a");
        linkInformation.href = infoResponse[0].link;
        linkInformation.appendChild(document.createTextNode(infoResponse[0].linkname));
        resultSection.appendChild(document.createElement("br"));
        resultSection.appendChild(linkInformation);
    }
    resultDiv.appendChild(resultSection);
    quizSection.appendChild(resultDiv);
}
