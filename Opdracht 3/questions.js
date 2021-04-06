var quizSection = document.querySelector(".webpage-content__section");

//shuffle and sort functions, later to be used as a callback in the question constructor
shuffle = x =>
{
    //Fisher-Yates shuffle, source: https://www.w3schools.com/js/js_array_sort.asp
    for (let i = x.length -1; i > 0; i--)
    {
        let j = Math.floor(Math.random() * i)
        let k = x[i];
        x[i] = x[j];
        x[j] = k;
    } 
}

sortAlphabetically = x => x.sort();

sortNumerically = x => x.sort(function(a, b){return a - b});

//This is the fundamental class of the question-objects
class excercise
{
    constructor(question, answers, orderType)
    {
        this.question = question;
        this.correctAnswer = answers[0];
        this.answers = answers.slice();//slice so it is an independent copy, not just a reference
        (orderType === undefined? shuffle:orderType) (this.answers);
    }

    renderExcercise(i)
    {
        var questionHeader = document.createElement("h2");
        questionHeader.appendChild(document.createTextNode("Question" + (i+1)));
        var questionSubSection = document.createElement("section");

        questionSubSection.setAttribute("class", "webpage-content__section__subsection" );

        var questionContainer = document.createElement("p");
        questionContainer.appendChild(document.createTextNode(this.question))

        questionSubSection.appendChild(questionContainer);
        
        questionSection.appendChild(questionHeader);
        questionSection.appendChild(questionSubSection);
    }
}

//Here the special properties of the multiplechoice questions are defined
class multipleChoice extends excercise
{
    renderExcercise(i)
    {
        super.renderExcercise(i);
        var questionSubSection = document.getElementsByClassName("webpage-content__section__subsection")[i];
        for(let k = 0; k < this.answers.length; k++)
        {
            var answersContainer = document.createElement("input");
            answersContainer.type = "radio";
            answersContainer.name = "answersOfQ" + i;
            answersContainer.value = this.answers[k];
            var radioLabel = document.createElement("label");
            radioLabel.for = answersContainer.value;
            radioLabel.appendChild(document.createTextNode(this.answers[k]));

            questionSubSection.appendChild(answersContainer);
            questionSubSection.appendChild(radioLabel);
            if(k < this.answers.length - 1)
                questionSubSection.appendChild(document.createElement("br"));
        }
    }

    checkAnswer = i => 
    {
        for(var answer of document.getElementsByName("answersOfQ" + i))
            if(answer.value == this.correctAnswer) return answer.checked;
    }
}

//multichoice are multiplechoice questions were multiple correct answers have to be selected
class multiChoice extends excercise
{
    constructor(question, answers, orderType, amount)
    {
        super(question, answers, orderType);
        this.amount = amount;
        this.correctAnswer = answers.slice(0, amount);
    }

    renderExcercise(i)
    {
        super.renderExcercise(i);
        var questionSubSection = document.getElementsByClassName("webpage-content__section__subsection")[i];
        for(let k = 0; k < this.answers.length; k++)
        {
            var answersContainer = document.createElement("input");
            answersContainer.type = "checkbox";
            answersContainer.name = "answersOfQ" + i;
            answersContainer.value = this.answers[k];
            var radioLabel = document.createElement("label");
            radioLabel.for = answersContainer.value;
            radioLabel.appendChild(document.createTextNode(this.answers[k]));

            questionSubSection.appendChild(answersContainer);
            questionSubSection.appendChild(radioLabel);
            if(k < this.answers.length - 1)
                questionSubSection.appendChild(document.createElement("br"));
        }
    }

    checkAnswer = i =>
    {
        var answerCorrect = true;
        for(let answer of document.getElementsByName("answersOfQ" + i))
            answerCorrect = answerCorrect && ((this.correctAnswer.indexOf(answer.value) != -1) == answer.checked);
        return answerCorrect;
    }
}

class open extends excercise
{
    renderExcercise(i)
    {
        super.renderExcercise(i);
        var answersContainer = document.createElement("input");
        answersContainer.name = "answersOfQ" + i;
        answersContainer.type = "text";

        var questionSubSection = document.getElementsByClassName("webpage-content__section__subsection")[i];
        questionSubSection.appendChild(answersContainer);
    }

    checkAnswer = i => this.answers.indexOf(document.getElementsByName("answersOfQ" + i)[0].value) >= 0;
}

class ordering extends excercise
{
    constructor(question, answers, orderType)
    {
        super(question, answers, orderType);
        this.correctAnswer = answers.slice();
    }

    //determining all needed elements and adding these to a container, which is then added to the questionSubSection
    renderExcercise(i)
    {
        super.renderExcercise(i);
        var questionSubSection = document.getElementsByClassName("webpage-content__section__subsection")[i];
        for(let k = 0; k < this.answers.length; k++)
        {
            //At all the elements, we want a label with the content it represents
            var orderLabel = document.createElement("label");
            orderLabel.for = this.answers[k];
            orderLabel.id = "q" + i + "label" + k;
            orderLabel.appendChild(document.createTextNode(this.answers[k]));
            questionSubSection.appendChild(orderLabel);

            //At the first element, we do not want an up-button
            if(k > 0)
            {
                var answersContainer = document.createElement("input");
                answersContainer.type = "button";
                answersContainer.value = "^";
                answersContainer.addEventListener("click", function() { questions[i].changeOrder(k - 1, i); });
                questionSubSection.appendChild(answersContainer);
            }

            //At the last element, we do not want a down-button
            if(k < this.answers.length - 1)
            {
                var answersContainer = document.createElement("input");
                answersContainer.type = "button";
                answersContainer.value = "v";
                answersContainer.addEventListener("click", function() { questions[i].changeOrder(k, i); });
                questionSubSection.appendChild(answersContainer);
                questionSubSection.appendChild(document.createElement("br"));
            }
        }
    }

    //Here we determine the new ordering when a button has been clicked
    changeOrder = (i, j) =>
    {
        this.answers.splice(i, 2, this.answers[i + 1], this.answers[i]);
        var elem = document.getElementById("q" + j + "label" + i);
        elem.replaceChild(document.createTextNode(this.answers[i]), elem.childNodes[0]);
        elem = document.getElementById("q" + j + "label" + (i + 1));
        elem.replaceChild(document.createTextNode(this.answers[i + 1]), elem.childNodes[0]);
    }

    //When the button to finalize the quiz has been pressed down, whether the given answer of this question was right is determined here
    checkAnswer = () =>
    {
        var answerCorrect = true;
        for (let i = 0; i < this.answers.length && answerCorrect; i++)
            answerCorrect = this.answers[i] == this.correctAnswer[i];
        return answerCorrect;
    }
}

//In this objectarray the questions are put in
var quiz1 = 
[
    new multipleChoice(
        "What year was Google Chrome first publicly on Windows?",
        [
            "2008",
            "2005",
            "2006",
            "2007",
            "2009"
        ],
        sortNumerically
    ),
    new open(
        //maybe we need to add a description of the logo with the image, to make this question more userfriendly
        "What is the Color of the middle cirkle of the Google Chrome Logo?",
        [
            "Blue",
            "blue",
            "Blu",
            "blu",
            "Bleu",
            "bleu"
        ]
    ),
    new multiChoice(
        "Which of the are the obstacles encountered by a user playing the dinosaurgame?",
        [
            "cacti",
            "pterodactyls",
            "bats",
            "birds",
            "fences",
            "spikes",
        ],
        sortAlphabetically,
        2
    )
]

var quiz2 =
[
    new open(
        "What species of dinosaurs is controlled by the user when playing the dinosaurgame?",
        [
            "Trex",
            "trex",
            "T-rex",
            "t-rex",
            "Tyrannosaurus Rex",
            "tyrannosaurus rex",
            "Tyrannosaurus rex",
            "tyrannosaurus Rex"
        ]
    ),
    new multipleChoice(
        "Which mode can be activated to for example make your browser unable to permanently store search history?",
        [
            "incognity mode",
            "stealth mode",
            "dark mode",
            "invisible mode",
            "VPNmode",
            "privacy mode"
        ]
    ),
    new multipleChoice(
        "On which distribution of linux is Chrome OS based?",
        [
            "Gentoo",
            "Gecko",
            "Manjaro",
            "KDE",
            "Ubuntu",
            "Fedora",
            "Peppermint"     
        ]
    )
];

var quiz3 =
[
    new multipleChoice(
        "What year was Firefox 1.0 released?",
        [
            "2004",
            "2003",
            "2002",
            "2001"
        ],
        sortNumerically
    ),
    new multiChoice(
        "What programming language(s) did the application layer of FireFox OS consist of?",
        [
            "HTML5",
            "JavaScript",
            "CSS",
            "Jade/pug",
            "XML",
            "JSON"
        ],
        shuffle,
        3
    ),
    new open(
        "What was the name of the layout-enginge used in FireFox OS?",
        [
            "Gecko",
            "gecko"
        ]
    )
];
//The first layer consisted of a combination of HTML5, JavaScript and CSS

//FireFox OS was an open-source operating system for mobile phones being developed by the Mozilla Project.
//It has since been cancelled. It was built using 3 layers: the applicationlayer, Open Web Platform Interface and the infrastucturelayer

var quiz4 =
[
    new multiChoice(
        "Using which of the following 3 layers was FireFox Os built?",
        [
            "applicationlayer",
            "Open Web Platform Interface",
            "infrastructurelayer",
            "Closed Web Platform Interface",
            "datalayer",
            "networklayer",
            "connectionlayer"
        ],
        shuffle,
        3
    ),
    new open(
        "What was the original name of Firefox?",
        //In this array of answer we have assorted all the answers which are deemed correct
        [
            "Phoenix",
            "phoenix",
            "Foenix",
            "foenix"
        ]
    ),
    new ordering(
        "What are the top 4 leading web browsers in order of popularity on desktop as of January 2021?",
        //in the ordering question, the order it was put in, is the correct order
        [
            "Google Chrome",
            "Safari",
            "Mozilla Firefox",
            "Microsoft Edge"
        ]
    )
];

var topicArray =
[
    [[quiz1, quiz2], "GoogleChrome", "page1-google-chrome.html"],
    [[quiz3, quiz4], "MozillaFireFox", "page2-mozilla-firefox.html"]
];

renderSelection = () =>
{
    while(quizSection.firstChild)
        quizSection.removeChild(quizSection.firstChild);

    for(let i = 0; i < topicArray.length; i++)
    {
        var topicHeader = document.createElement("h2");
        topicHeader.appendChild(document.createTextNode(topicArray[i][1]));
        var topicSection = document.createElement("section");
        topicSection.className = "webpage-content__section__subsection";

        for(let j = 0; j < topicArray[i][0].length; j++)
        {
            var selectButton = document.createElement("input");
            selectButton.type = "button";
            selectButton.value = topicArray[i][1] + (j+1);
            selectButton.addEventListener("click", function(i, j) {renderQuiz(i, j, 0);});

            topicSection.appendChild(selectButton);
            topicSection.appendChild(document.createElement("br"));
        }
        var description = document.createElement("a");
        description.href = topicArray[i][2];
        topicSection.appendChild(description);

        quizSection.appendChild(topicHeader);
        quizSection.appendChild(topicSection);
    }
}

//The remaining interface of the quiz is generated here  
renderQuiz = (i, j, k) =>
{
    while(quizSection.firstChild)
        quizSection.removeChild(quizSection.firstChild);

    topicArray[i][j][k].renderExcercise(k);

    // var quizResults = [];
    // for(let i = 0; i < questions.length; i++)
    //     quizResults.push(questions[i].checkAnswer(i));
    var givenAnswers = [];

    var resultHeader = document.createElement("h2");
    resultHeader.appendChild(document.createTextNode("Results"));
    var resultSection = document.createElement("section");
    resultSection.className = "webpage-content__section__subsection";

    // var checkButton = document.createElement("input");
    // checkButton.type = "button";
    // checkButton.value = "Check Answers";
    // checkButton.addEventListener("click", checkAnswers);

    var returnSelectButton = document.createElement("input");
    returnSelectButton.type = "button";
    returnSelectButton.value = "return to selectscreen";
    returnSelectButton.addEventListerner("click", renderSelection());

    if(k < topicArray[i][j].length - 1)
    {
        var nextButton = document.createElement("input");
        nextButton.type = "button";
        nextButton.value = "Next Question";
        nextButton.addEventListener("click", renderQuiz(i, j, k + 1));
        resultSection.appendChild(nextButton);
        resultSection.appendChild(document.createElement("br"));
    }
    if(k > 0)
    {
        var previousButton = document.createElement("input");
        previousButton.type = "button";
        previousButton.value = "Previous Question";
        previousButton.addEventListener("click", renderQuiz(i, j, k - 1));
        resultSection.appendChild(previousButton);
        resultSection.appendChild(document.createElement("br"));
    }

    var finishButton = document.createElement("input");
    finishButton.type = "button";
    finishButton.value = "Finish Quiz";
    finishButton.addEventListener("click", checkAnswers(givenAnswers));

    resultSection.appendChild(returnSelectButton);
    resultSection.appendChild(document.createElement("br"));
    resultSection.appendChild(finishButton);

    quizSection.appendChild(resultHeader);
    quizSection.appendChild(resultSection);
}

//The answers will be checked here, when the corresponding button has been clicked
checkAnswers = () =>
{
    // resultSection.appendChild(document.createElement("br"));
    // resultSection.appendChild(document.createTextNode("Your results will be displayed here."));

    var questionSubsections = document.getElementsByClassName("webpage-content__section__subsection");
    var resultSection = questionSubsections[questionSubsections.length - 1];

    //remove all children except the "Check Answers"-button
    for (let i = resultSection.childNodes.length - 1; i > 0; i--)
        resultSection.removeChild(resultSection.childNodes[i]);
    //count the number of correctly answered questions
    var numberCorrect = 0;
    for(result of quizResults)
        if (result) numberCorrect++;

    resultSection.appendChild(document.createElement("br"));
    resultSection.appendChild(document.createTextNode("You have answered " + numberCorrect + " out of " + questions.length + " questions correctly."));

    for (let i = 0; i < quizResults.length; i++)
    {
        resultSection.appendChild(document.createElement("br"));
        resultSection.appendChild(document.createTextNode("Your answer for question " + (i + 1) + " was " + (quizResults[i]?"correct":"incorrect")));
    }

    return quizResults;
}

quizSection.addEventListener("onload", renderSelection());