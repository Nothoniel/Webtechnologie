var quizSection = document.querySelector(".webpage-content__section");
var emptyArray= [];
var currentquestionID; // better solution?
var typeOfQuestion;

//shuffle and sort functions, later to be used as a callback in the question constructor
shuffle = x => {
    //Fisher-Yates shuffle, source: https://www.w3schools.com/js/js_array_sort.asp
    for(let i = x.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * i);
        let k = x[i];
        x[i] = x[j];
        x[j] = k;
    } 
}

sortAlphabetically = x => x.sort();

sortNumerically = x => x.sort(function(a, b) {return a - b});

//This is the fundamental class of the question-objects
class excercise {
    constructor(question, answers, orderType) {
        this.question = question;
        this.correctAnswer = answers[0];
        this.answers = answers.slice();//slice so it is an independent copy, not just a reference
        (orderType === undefined? shuffle : orderType)(this.answers);
    }

    renderExcercise(i) {
        var questionHeader = document.createElement("h2");
        questionHeader.appendChild(document.createTextNode("Question" + (i + 1)));

        var questionSubSection = document.createElement("section");
        questionSubSection.setAttribute("class", "webpage-content__section__subsection");

        var questionContainer = document.createElement("p");
        questionContainer.appendChild(document.createTextNode(this.question));
        questionSubSection.appendChild(questionContainer);
        
        quizSection.appendChild(questionHeader);
        quizSection.appendChild(questionSubSection);
    }
}

//Here the special properties of the multiplechoice questions are defined
class multipleChoice extends excercise {
    renderExcercise(i) {
        super.renderExcercise(i);
        var questionSubSection = document.getElementsByClassName("webpage-content__section__subsection")[0];
        var quizForm = document.createElement("form");
        quizForm.setAttribute("id","userAnswer");

        for(let k = 0; k < this.answers.length; k++) {
            var answersContainer = document.createElement("input");
            answersContainer.setAttribute("type", "radio");
            answersContainer.setAttribute("name", "answersOfQ");
            answersContainer.setAttribute("value", this.answers[k]);
            var radioLabel = document.createElement("label");
            radioLabel.for = answersContainer.value;
            radioLabel.appendChild(document.createTextNode(this.answers[k]));

            quizForm.appendChild(answersContainer);
            quizForm.appendChild(radioLabel);
            if(k < this.answers.length)
                quizForm.appendChild(document.createElement("br"));
        }

        questionSubSection.appendChild(quizForm);
    }

    checkAnswer = i => {
        for(var answer of document.getElementsByName("answersOfQ" + i))
            if(answer.value == this.correctAnswer) 
                return answer.checked;
    }
}

class multiChoice extends excercise
{
    constructor(question, answers, orderType, amount) {
        super(question, answers, orderType);
        this.amount = amount;
        //multiChoice differentiates itself from multipleChoice by having a given amount of multiple correct answers, which all have to be given by the user
        this.correctAnswer = answers.slice(0, amount);
    }

    renderExcercise(i) {
        super.renderExcercise(i);
        var questionSubSection = document.getElementsByClassName("webpage-content__section__subsection")[0];
        var quizForm = document.createElement("form");
        quizForm.setAttribute("id","userAnswer");

        for(let k = 0; k < this.answers.length; k++)
        {
            var answersContainer = document.createElement("input");
            answersContainer.setAttribute("type", "checkbox");
            answersContainer.setAttribute("name", "answersmultiChoice");
            answersContainer.setAttribute("value", this.answers[k]);
            var radioLabel = document.createElement("label");
            radioLabel.for = answersContainer.value;
            radioLabel.appendChild(document.createTextNode(this.answers[k]));

            quizForm.appendChild(answersContainer);
            quizForm.appendChild(radioLabel);

            if(k < this.answers.length)
                quizForm.appendChild(document.createElement("br"));
        }
        questionSubSection.appendChild(quizForm);
    }

    //Whether all of the correct answers are given by the users is checked upon here
    checkAnswer = i => {
        var answerCorrect = true;
        for(let answer of document.getElementsByName("answersOfQ" + i))
            answerCorrect = answerCorrect && ((this.correctAnswer.indexOf(answer.value) != -1) == answer.checked);
        return answerCorrect;
    }
}

class open extends excercise {
    renderExcercise(i) {
        super.renderExcercise(i);

        var quizForm = document.createElement("form");
        quizForm.setAttribute("id","userAnswer");

        var answersContainer = document.createElement("input");
        answersContainer.setAttribute("name", "answersOfQ");
        answersContainer.setAttribute("id", "openQuestionAnswer");
        answersContainer.setAttribute("type", "text");
        answersContainer.setAttribute("maxlength", 40);

        var questionSubSection = document.getElementsByClassName("webpage-content__section__subsection")[0];
        quizForm.appendChild(answersContainer);

        questionSubSection.appendChild(quizForm);
    }

    //Regarding open question, all of the values withing the array of answers are deemed correct
    // checkAnswer = i => this.answers.indexOf(document.getElementsByName("answersOfQ" + i)[0].value) >= 0;
}

class ordering extends excercise {
    constructor(question, answers, orderType) {
        super(question, answers, orderType);
        this.correctAnswer = answers.slice();
    }

    //determining all needed elements and adding these to a container, which is then added to the questionSubSection
    renderExcercise(i) {
        super.renderExcercise(i);
        var questionSubSection = document.getElementsByClassName("webpage-content__section__subsection")[0];
        for(let k = 0; k < this.answers.length; k++) {
            //At all the elements, we want a label with the content it represents
            var orderLabel = document.createElement("label");
            orderLabel.setAttribute("name", "orderValue");
            orderLabel.for = this.answers[k];
            orderLabel.id = "q" + i + "label" + k;
            orderLabel.appendChild(document.createTextNode(this.answers[k]));
            questionSubSection.appendChild(orderLabel);

            /*If we don't declare this variable as this, and use this.changeOrder(), 
            it will use this in a way that is not intended, which is fixed by first declaring it to be used as a variable*/
            var currentQuestion = this;

            //At the first element, we do not want an up-button
            if(k > 0) {
                var answersContainer = document.createElement("input");
                answersContainer.type = "button";
                answersContainer.value = "^";
                answersContainer.addEventListener("click", function() { currentQuestion.changeOrder(k - 1, i); });
                questionSubSection.appendChild(answersContainer);
            }

            //At the last element, we do not want a down-button
            if(k < this.answers.length - 1) {
                var answersContainer = document.createElement("input");
                answersContainer.type = "button";
                answersContainer.value = "v";
                answersContainer.addEventListener("click", function() { currentQuestion.changeOrder(k, i); });
                questionSubSection.appendChild(answersContainer);
                questionSubSection.appendChild(document.createElement("br"));
            }
        }
    }

    //Here we determine the new ordering when a button has been clicked
    changeOrder = (i, j) => {
        this.answers.splice(i, 2, this.answers[i + 1], this.answers[i]);
        var elem = document.getElementById("q" + j + "label" + i);
        elem.replaceChild(document.createTextNode(this.answers[i]), elem.childNodes[0]);
        elem = document.getElementById("q" + j + "label" + (i + 1));
        elem.replaceChild(document.createTextNode(this.answers[i + 1]), elem.childNodes[0]);
    }

    //When the button to check the given answer has been pressed down, whether it was right is determined here
    checkAnswer = () => {
        var answerCorrect = true;
        for (let i = 0; i < this.answers.length && answerCorrect; i++)
            answerCorrect = this.answers[i] == this.correctAnswer[i];
        return answerCorrect;
    }
}

//jagged array nummering is really bad in the for-loop bool
function createMultiBoxes(id, multi){
    var boxes= [];
    for (let i=0; i<multi.length; i++) {
        if(id == multi[i][0].questionid ) {
            for(let j=0; j< multi[i].length; j++) {    
                boxes.push(multi[i][j].multichoicevalue);
            }
        }
    }
    // console.log(boxes);
    return boxes;
}

function determineQuiz(selectedQuizID) {
    var quiz;
    switch (selectedQuizID) {
        case "P1DQ01":
            quiz = quiz1;  
          break;
        case "P1DQ02":
            quiz = quiz2;
          break;
        case "P1DQ03":
            quiz = quiz3;
          break;
        case "P1DQ04":
            quiz = quiz4;
          break;           
    }
    return quiz;
}


function createQuiz(questions, multi, selectedQuizID){
    // console.log(multi[0][1].questionid);
    // console.log(selectedQuizID);
    //index of quiz in quiz array
    var quizIndex = allQuizzes.indexOf(selectedQuizID);

    //index of topic in topic array
    topicIndex = Math.round(quizIndex/allQuizzes.length);

    //quiz array length is 2
    if(quizIndex>1) {
        quizIndex-=2;
    }

    //determines which quiz is selected
    var quiz = determineQuiz(selectedQuizID, quiz);

    //making sure the selected quiz arrays is empty
    quiz.length = 0;

    for(let i=0; i<questions.length; i++) {
        var problemStatement = questions[i].problemstatement;
        var id = questions[i].questionid;
     
        //creating the questions
            switch (questions[i].type) {
                case "open":
                    quiz.push(new open(problemStatement, emptyArray));  
                  break;
                case "multipleChoice":
                    var boxes = createMultiBoxes(id, multi);
                    quiz.push(new multipleChoice(problemStatement, boxes));
                  break;
                case "multiChoice":
                    var boxes = createMultiBoxes(id, multi);
                    quiz.push(new multiChoice(problemStatement, boxes));
                  break;
                case "ordering":
                    var boxes = createMultiBoxes(id, multi);
                    quiz.push(new ordering(problemStatement, boxes));
                  break;           
            }
    }
    renderQuiz(topicIndex, quizIndex, 0, questions);
}


//Here we define all of the quizzes, which will hereafter be put in the corresponding topicArray's array of quizzes
// let quiz1 = 
// [
//     new multipleChoice(
//         "What year was Google Chrome first publicly on Windows?",
//         [
//             "2008",
//             "2005",
//             "2006",
//             "2007",
//             "2009"
//         ],
//         sortNumerically
//     ),
//     new open(
//         "What is the Color of the middle circle of the Google Chrome Logo?",
//         [
//             "Blue",
//             "blue",
//             "Blu",
//             "blu",
//             "Bleu",
//             "bleu"
//         ]
//     ),
//     new multiChoice(
//         "Which of the are the obstacles encountered by a user playing the dinosaurgame?",
//         [
//             "cacti",
//             "pterodactyls",
//             "bats",
//             "birds",
//             "fences",
//             "spikes",
//         ],
//         sortAlphabetically,
//         2
//     )
// ];

// let quiz2 =
// [
//     new open(
//         "What species of dinosaurs is controlled by the user when playing the dinosaurgame?",
//         [
//             "Trex",
//             "trex",
//             "T-rex",
//             "t-rex",
//             "Tyrannosaurus Rex",
//             "tyrannosaurus rex",
//             "Tyrannosaurus rex",
//             "tyrannosaurus Rex"
//         ]
//     ),
//     new multipleChoice(
//         "Which mode can be activated to for example make your browser unable to permanently store search history?",
//         [
//             "incognity mode",
//             "stealth mode",
//             "dark mode",
//             "invisible mode",
//             "VPNmode",
//             "privacy mode"
//         ]
//     ),
//     new multipleChoice(
//         "On which distribution of linux is Chrome OS based?",
//         [
//             "Gentoo",
//             "Gecko",
//             "Manjaro",
//             "KDE",
//             "Ubuntu",
//             "Fedora",
//             "Peppermint"     
//         ]
//     )
// ];

// let quiz3 =
// [
//     new multipleChoice(
//         "What year was Firefox 1.0 released?",
//         [
//             "2004",
//             "2003",
//             "2002",
//             "2001"
//         ],
//         sortNumerically
//     ),
//     new multiChoice(
//         "What programming language(s) did the application layer of FireFox OS consist of?",
//         [
//             "HTML5",
//             "JavaScript",
//             "CSS",
//             "Jade/pug",
//             "XML",
//             "JSON"
//         ],
//         shuffle,
//         3
//     ),
//     new open(
//         "What was the name of the layout-enginge used in FireFox OS?",
//         [
//             "Gecko",
//             "gecko"
//         ]
//     )
// ];

// let quiz4 =
// [
//     new multiChoice(
//         "Using which of the following 3 layers was FireFox Os built?",
//         [
//             "applicationlayer",
//             "Open Web Platform Interface",
//             "infrastructurelayer",
//             "Closed Web Platform Interface",
//             "datalayer",
//             "networklayer",
//             "connectionlayer"
//         ],
//         shuffle,
//         3
//     ),
//     new open(
//         "What was the original name of Firefox?",
//         [
//             "Phoenix",
//             "phoenix",
//             "Foenix",
//             "foenix"
//         ]
//     ),
//     new ordering(
//         "What are the top 4 leading web browsers in order of popularity on desktop as of January 2021?",
//         [
//             "Google Chrome",
//             "Safari",
//             "Mozilla Firefox",
//             "Microsoft Edge"
//         ]
//     )
// ];

async function renderSelection(responseQuizTitle, responseQuizID, responseDescription, topicArray) {
    //We first reset the page to its html basics, so we can reuse those
    while(quizSection.firstChild)
        quizSection.removeChild(quizSection.firstChild);

    //This loop is run to make a seperate section for each of the topics
    for(let i = 0; i < topicArray.length; i++) {
        var topicHeader = document.createElement("h2");
        topicHeader.appendChild(document.createTextNode(topicArray[i][1]));
        var topicSection = document.createElement("section");
        topicSection.className = "webpage-content__section__subsection";

        //This loop is run to make seperate buttons for each of the topic's quizzes
        for(let j = 0; j < topicArray[i][0].length; j++) {
            var selectButton = document.createElement("input");
            selectButton.setAttribute("id", responseQuizID[j]);

            selectButton.type = "button";
            selectButton.value = responseQuizTitle[j];

            //the first 2 titles are removed, so that the last 2 buttons contain their corresponding titles.
            if(j==1) {
                responseQuizTitle.splice(0,2);
                responseQuizID.splice(0,2);
            }

            //here we give the third variable the value of 0, making it so the quiz will start at the first question
            // selectButton.addEventListener("click", function() {renderQuiz(i, j, 0, topicArray);});

            selectButton.addEventListener("click", myQuestion);

   
            topicSection.appendChild(selectButton);
            topicSection.appendChild(document.createElement("br"));
        }

        //Here we make the hyperlink to the corresponding topic's information, which is stored in the topicArray
        var description = document.createElement("a");
        description.href = topicArray[i][2];
        description.appendChild(document.createTextNode(responseDescription[0]));
        topicSection.appendChild(description);

        quizSection.appendChild(topicHeader);
        quizSection.appendChild(topicSection);
    }
}

//The remaining interface of the quiz is generated here  
renderQuiz = (i, j, k, questions) =>
{
    //We first reset the page to its html basics, so we can reuse those
    while(quizSection.firstChild)
        quizSection.removeChild(quizSection.firstChild);
    
    topicArray[i][0][j][k].renderExcercise(k);

    // var quizResults = [];
    // for(let i = 0; i < questions.length; i++)
    //     quizResults.push(questions[i].checkAnswer(i));
    // var givenAnswers = [];

    var buttonSection = document.createElement("section");
    buttonSection.className = "webpage-content__section__subsection";

    if(k > 0) {
        var previousButton = document.createElement("input");
        previousButton.type = "button";
        previousButton.value = "<-";
        previousButton.addEventListener("click", function() {renderQuiz(i, j, k - 1, questions);});
        buttonSection.appendChild(previousButton);
    }
    for(let l = 0; l < topicArray[i][0][j].length; l++)
    {
        var questionButton = document.createElement("input");
        questionButton.type = "button";
        questionButton.value = l + 1;
        questionButton.addEventListener("click", function() {renderQuiz(i, j, l, questions)});
        buttonSection.appendChild(questionButton);
    }
    if(k < topicArray[i][0][j].length - 1)
    {
        var nextButton = document.createElement("input");
        nextButton.type = "button";
        nextButton.value = "->";
        nextButton.addEventListener("click", function() {renderQuiz(i, j, k + 1, questions);});
        buttonSection.appendChild(nextButton);
    }
    buttonSection.appendChild(document.createElement("br"));
    
    var returnSelectButton = document.createElement("input");
    returnSelectButton.type = "button";
    returnSelectButton.value = "Return to Selectscreen";
    returnSelectButton.addEventListener("click", getStartPage);

    console.log(questions[k].type);
    currentquestionID = questions[k].questionid; // better solution?
    typeOfQuestion = questions[k].type;
    
    var checkButton = document.createElement("input");
    // checkButton.setAttribute( "id", "subbutton");
    checkButton.setAttribute( "type", "submit");
    checkButton.setAttribute( "value", "Check Answers");
    // checkButton.addEventListener("click", function(){checkAnswers(i, j, k, topicArray)});
    checkButton.addEventListener("click", myAnswer);

    // var finishButton = document.createElement("input");
    // finishButton.type = "button";
    // finishButton.value = "Finish Quiz";
    // finishButton.addEventListener("click", function() {finishQuiz();});
    // document.getElementById("userAnswer").addEventListener("submit", myAnswer);

    buttonSection.appendChild(checkButton);
    buttonSection.appendChild(returnSelectButton);
    // resultSection.appendChild(document.createElement("br"));
    // resultSection.appendChild(finishButton);

    quizSection.appendChild(buttonSection);
}

//The answers will be checked here, when the corresponding button has been clicked
// checkAnswers = (i, j, k, topicArray) =>
// {
//     var resultSection = document.createElement("section");
//     resultSection.className = "webpage-content__section__subsection";

//     var checkButton = document.getElementById("Check");
//     var buttonSection = document.getElementsByClassName("webpage-content__section__subsection")[1];
//     buttonSection.removeChild(checkButton);
//     var feedback = document.createTextNode("Your answer for this question is " + (topicArray[i][0][j][k].checkAnswer(k)?"correct":"incorrect"));
//     resultSection.appendChild(feedback);
//     if(!topicArray[i][0][j][k].checkAnswer(k))
//     {
//         var linkInformation = document.createElement("a");
//         linkInformation.href = topicArray[i][2];
//         linkInformation.appendChild(document.createTextNode("You can find the corresponding theory here!"));
//         resultSection.appendChild(document.createElement("br"));
//         resultSection.appendChild(linkInformation);
//     }
//     quizSection.appendChild(resultSection);
// }

//Dit Soort shit moet je doen voor een nieuwe FinishQuiz Screen
/////////////////////////////////////////////////////////
// finishQuiz = () =>
// {
//     while(quizSection.firstChild)
//         quizSection.removeChild(quizSection.firstChild);

//     // //count the number of correctly answered questions
//     // var numberCorrect = 0;
//     // for(result of quizResults)
//     //     if (result) numberCorrect++;
//     //En daarna moet je shit nog displayen
// }


