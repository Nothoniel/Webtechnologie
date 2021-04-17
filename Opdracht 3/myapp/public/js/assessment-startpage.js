
var allQuizzes;

//using the response to create a startpage
async function respondFunction(options) { 
    //fetching the data of the server
    var response = await fetch("/start", options);
    var data = await response.json(); 
    console.log(data);
    console.log(data[0].quiztitle);

    //quiz buttons
    var responseQuizTitle = [];
    var responseDescription = [];
    var responseQuizID = [];
    for(let i = 0; i < data.length; i++)
    {
        responseQuizID.push(data[i].quizid);
        responseQuizTitle.push(data[i].quiztitle);
        if(i<2){
            responseDescription.push(data[i].description);
        }
    }


    allQuizzes = responseQuizID.slice(0,data.length); //want to re-use these values

    console.log(allQuizzes);

    //creating topics 
    //insert every topic into an array
    
    for(let i = 0; i < data.length; i++)
    {
        var topic;
        if (i % 2 == 0) { continue; }
        if(i!=2) {
            topic = [quizOfFirstTopic, data[i].topictitle, data[i].link]; 
        }
        else{
            topic = [quizOfSecondTopic, data[i].topictitle, data[i].link]; 
        }
        topicArray.push(topic); 
    }

    //Google chrome topic
    // var topic1 = [[quiz1, quiz2], data[0].topictitle, data[0].link];

    //Mozilla Firefox topic
    // var topic2 = [[quiz3, quiz4], data[2].topictitle, data[2].link];

    renderSelection(responseQuizTitle, responseQuizID, responseDescription, topicArray);
} 

async function sendRequest() {
    var options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };
    respondFunction(options);   
}

//event on the submit button that determines that t
window.addEventListener("load", sendRequest);
