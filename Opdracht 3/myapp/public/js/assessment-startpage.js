//script for rendering the assessment startpage

//quizes
let quiz1 = [], quiz2 =[], quiz3 = [], quiz4 = [];

//array of quizes
var quizOfFirstTopic = [quiz1, quiz2]; 
var quizOfSecondTopic = [quiz3, quiz4]; 

//in the array of topics we store the corresponding quizzes, the name of the topic and a string of the link to page where the information about the topic can be found
var topicArray = []; 
//all quizs in an array
var allQuizzes;

//using the response to create a startpage
async function respondFunction(options) { 
    //fetching the data of the server
    var response = await fetch("/start", options);
    var data = await response.json(); 

    //quiz buttons
    var responseQuizTitle = [], responseDescription = [], responseQuizID = [];
    for(let i = 0; i < data.length; i++) {
        responseQuizID.push(data[i].quizid);
        responseQuizTitle.push(data[i].quiztitle);
        if(i % 2 == 0){
            responseDescription.push(data[i].description);
        }
    }

    allQuizzes = responseQuizID.slice(0, data.length); //want to re-use these values

    //creating topics 
    //insert every topic into an array
    topicArray.length = 0;
    for(let i = 0; i < data.length; i++) {
        var topic;
        if (i % 2 == 0) continue;
        if(i==3)
            topic = [quizOfSecondTopic, data[i].topictitle, data[i].link]; 
        else
            topic = [quizOfFirstTopic, data[i].topictitle, data[i].link]; 
        topicArray.push(topic); 
    }

    renderSelection(responseQuizTitle, responseQuizID, responseDescription, topicArray);
} 

async function getStartPage() {
    var options = {
        method : "GET",
        headers : {
            "Content-Type" : "application/json",
            "Accept" : "application/json"
        }
    };
    respondFunction(options);   
}

//when the page is loaded, the selectionscreen will be loaded
window.addEventListener("load", getStartPage);
