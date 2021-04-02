var questionSection = document.querySelector(".webpage-content__section");

//buttons
//Quiz
var button1 = document.createElement("button");
button1.appendChild(document.createTextNode("Quiz1"));

button1.setAttribute("type", "button");

questionSection.appendChild(button1) /*.addEventListener("click",goToQuizPages)*/;

//Topic
var topicLabel = document.createElement("label");
var topicTextLabel = document.createTextNode("Internet");

topicLabel.appendChild(topicTextLabel);
questionSection.appendChild(topicLabel);

//Topic Description DOM
var topicDescriptionLabel = document.createElement("label");
var topicDescriptionTextLabel = document.createTextNode("Description of the internet");

topicDescriptionLabel.appendChild(topicDescriptionTextLabel);
questionSection.appendChild(topicDescriptionLabel);

//link of Topic
var a = document.createElement('a');
var linkText = document.createTextNode("information about the internet");
a.appendChild(linkText);
a.title = "my title text";
a.href = "http://internet.com";

questionSection.appendChild(a);




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
var questions = 
[
    new ordering(
        "What are the top 4 leading web browsers in order of popularity on desktop as of January 2021?",
        //in the ordering question, the order it was put in, is the correct order
        [
            "Google Chrome",
            "Safari",
            "Mozilla Firefox",
            "Microsoft Edge"
        ]
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
    new multipleChoice(
        "How many versions of Internet Explorer were released between 1995 and 2011?",
        //The first entry of the array of answers in a multipleChoice object is the correct one, these are shuffled in the representation on screen 
        [
            "10",
            "8",
            "11",
            "9",
            "7"
        ],
        sortNumerically
    ),
    new multiChoice(
        "Which of the following are web browsers?(multiple options possible)",
        //the first n entries of this array are correct, where n is the following parameter
        [
            "Firefox",
            "Opera",
            "Mosaic",
            "DuckDuckGo",
            "Facebook",
            "Google",
            "Yahoo",
            "Hyves"
        ],
        sortAlphabetically,
        //the number below represents the amount of good answers
        3
    )
]

//The remaining interface of the quiz is generated here  
renderQuiz = () =>
{
    for(let i = 0; i < questions.length; i++)
        questions[i].renderExcercise(i);

    var resultHeader = document.createElement("h2");
    resultHeader.appendChild(document.createTextNode("Results"));
    var resultSection = document.createElement("section");
    resultSection.className = "webpage-content__section__subsection";

    var checkButton = document.createElement("input");
    checkButton.type = "button";
    checkButton.value = "Check Answers";
    checkButton.addEventListener("click", checkAnswers);

    resultSection.appendChild(checkButton);
    resultSection.appendChild(document.createElement("br"));
    resultSection.appendChild(document.createTextNode("Your results will be displayed here."));

    questionSection.appendChild(resultHeader);
    questionSection.appendChild(resultSection);
}

//The answers will be checked here, when the corresponding button has been clicked
checkAnswers = () =>
{
    var quizResults = [];
    for(let i = 0; i < questions.length; i++)
        quizResults.push(questions[i].checkAnswer(i));
  
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

questionSection.addEventListener("onload", renderQuiz());