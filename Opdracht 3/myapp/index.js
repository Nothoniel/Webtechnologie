const express = require('express');
const app = express();
var path = require('path');
var session = require('express-session');
const bcrypt = require('bcrypt');
const flash = require('connect-flash');
const fetch = require('node-fetch');
var serveStatic = require('serve-static');
let getData = require('./data');
let insertData = require('./insert_data');
let sqlParams;

var dataArray;
var questions;
var multi = [];
var answerReturn;
const PORT=8046; 

//setting up session
// initialise and use session middleware
// app.use(session({secret: 'power creep'}));

// var curentSession; // session variable
// app.get('/', function(req,res){
//     curentSession = req.session; 
//     if(curentSession.id) {
//         res.redirect('/user');
//     } 
//     else {
//         res.render('index.html');
//     }
// });

//flash messages are possible
// app.use(flash());

app.use(express.urlencoded({extended : false}));

app.set('json spaces', 10);

// retrieving  files
app.use(serveStatic(path.join(__dirname, 'public')));
app.use(express.json({limit: '100mb'}));

//called every time an http request is received, like a starting file can be set  
// app.get('/', (req, res) => {
//     res.send('Node App is running');
// });


//display of startpage of assesment system
app.get('/start', (req, res) => {
    let sql = `SELECT TopicTitle topictitle,
                      DescriptionLink link,
                      LinkName description,
                      QuizTitle quiztitle,
                      QuizID quizid
                    FROM Topic
                    INNER JOIN Quiz ON Quiz.TopicID = Topic.TopicID`;
    //accesing database
    getData(sql, sqlParams).then(results => dataArray = results);

    // setTimeout(function(){
    //     console.log(dataArray);
    //     },10);

    setTimeout(async function () {
         const responseData = dataArray;
         res.json(responseData);
    },15);    

    //do something with the received data from client
    //as example printing it out
    // console.log(req.body.getData);

    //example 1: default
    //rename the object and insertion of one or more values
    // const responseData = { 
    //     page: req.body.getData
    // };
    // res.json(responseData);

    //example 3: array of objects
    // const responseData = [{ color: "yellow"},{ color: "green"} ];
    // res.json(responseData);


});

app.get('/question-display', (req, res) => {
        let sql = `SELECT QuestionID questionid,
                          Type type,
                          QuestionTitle questiontitle,
                          ProblemStatement problemstatement
                        FROM Question
                        WHERE QuizID = ?`;
        let sqlParams = [req.query.quizid];                 
        //accesing database
        getData(sql, sqlParams).then(results => questions = results);
    
        // setTimeout(function(){
        //     console.log(questions);
        //     },3000);    
    
        setTimeout(async function () {
            if(multi.length>0) {
                multi.length = 0;
            }

             for(let i = 0; i < questions.length; i++) 
             {
                 var type= questions[i].type;
                 var questionid = questions[i].questionid;
                 if (type !== "open")
                 {
                    let sql = `SELECT QuestionID questionid,
                                      MultichoiceValue multichoicevalue
                                FROM Multichoice
                                WHERE QuestionID = ?`;
                    let sqlParams = [questionid];                 
                    //accesing database
                    getData(sql, sqlParams).then(results => multi.push(results));
                 }
             }

             //print out of multi
            // setTimeout(function(){
            //     console.log(multi);
            //     console.log("\n\n");
            // },10);

            setTimeout(function(){
                res.json( {questions: questions, multi:multi});
            },10);
        },1000);     
});

//authentication of user
app.post('/login', (req, res) => {
    //user sql query
    let sql = `SELECT UserName username,
                           Password password,
                           FirstName firstname,
                           LastName lastname  
                    FROM User`;
    //accesing database
    getData(sql).then(results => dataArray = results);

     //prints out the data
    setTimeout(function(){
        console.log(dataArray);
        },10);

    setTimeout(async function () {
         console.log('Attempting to log in');   
         try {
             //compares the username of db with the inserted one and stores the found user in a variable
             let foundUser = dataArray.find( (data) => req.body.username === data.username);
             if (foundUser) {
                 console.log('user found');
                 console.log(foundUser);
                 //comparing password of inserted user with that of the found user
                 if (req.body.password == foundUser.password) {
                     console.log('successful log in');
                     res.send(foundUser.username);
                     //foundUser.firstname
                     //foundUser.lastname
                    return res.end();   
                 } else {
                     res.flash('not matching');  
                     console.log('unsuccessful log in');
                 }
             }
             else {
                 res.send("username does not exist");
                 console.log('unsuccessful log in');
             }
         } 
         catch{
             res.send("Internal server error");
             console.log('server error');
         }
    },15);
});

app.post('/register', (req, res) => {
    if (req.body.password !== req.body.confirm) res.send('password confirmation did not match password');
    console.log("Registering new user");
    //user sql query
    try {
        //making an array that contains the info of the new user
        var newUser = [req.body.username, req.body.firstName, req.body.lastName, req.body.password];

        //sql string that adds the new user to the db
        let insert_sql = `INSERT INTO User(UserName, FirstName, LastName, Password) VALUES (?,?,?,?)`;
        insertData(insert_sql, newUser);
    }
    catch{
        res.send()
    }
});

app.post('/feedback', (req, res) => {
    console.log("request came in");
    // console.log(req.body.currentquestionID, req.body.answer);

    //query for when user ansered incorrect
    let sqlIncorrect = `SELECT FeedbackIncorrect feedback,
                                    DescriptionLink link,
                                    LinkName linkname
                                FROM Question
                                INNER JOIN Quiz ON Quiz.QuizID = Question.QuizID
                                INNER JOIN Topic ON Topic.TopicID = Quiz.TopicID
                                WHERE QuestionID = ?`;
    var receivedQuestion = [req.body.currentquestionID]; 

    if(req.body.type == "multipleChoice") {
        var answer = req.body.answer;
        if(Array.isArray(req.body.answer)) {
            answer = req.body.answer.join();
        }

        let sql = `SELECT FeedbackCorrect feedback
                        FROM Question
                        WHERE QuestionID = ? AND CorrectAnswer = ?`;
        var currentQuestion = [req.body.currentquestionID, answer];                
        //accesing database
        getData(sql, currentQuestion).then(results => { 
            if(results.length>0) {  
                answerReturn = results;
            }
            else {
                let sql = sqlIncorrect;
                getData(sql, receivedQuestion).then(results => answerReturn = results);
            }                            
        });    
    } 

    //determines the correction for the multiChoice questions
    function determineCorrection(array1, array2) {
        array1= array1.sort();
        array2= array2.sort();
        return array1.length === array2.length &&
            array1.every((val, index) => val === array2[index]);
    }

    //query correct answer for multiChoice and open
    let sqlCorrect= `SELECT FeedbackCorrect feedback
                        FROM Question
                        WHERE QuestionID = ?`;

    if(req.body.type == "multiChoice" ||req.body.type == "open") {
        let sql = `SELECT CorrectAnswer correctanswer
                        FROM Question
                        WHERE QuestionID = ?`;                
        //accesing database
        getData(sql, receivedQuestion).then(results => { 
            var arrayOfCorrect = (results[0].correctanswer).split(',');  
            const insertedAnswer = (currentValue) => currentValue === req.body.answer;
            if(req.body.type == "open") { 
                if(arrayOfCorrect.some(insertedAnswer)){
                    let sql = sqlCorrect;
                    getData(sql, receivedQuestion).then(results => answerReturn = results);                   
                }
                else {
                    let sql = sqlIncorrect;
                    getData(sql, receivedQuestion).then(results => answerReturn = results);    
                }
            }
            else{
                if(determineCorrection(arrayOfCorrect, req.body.answer)) {
                    let sql = sqlCorrect;
                    getData(sql, receivedQuestion).then(results => answerReturn = results); 
                }
                else {
                    let sql = sqlIncorrect;
                    getData(sql, receivedQuestion).then(results => answerReturn = results); 
                }
            }
        });
    }
    
    //print out of the feedback
    setTimeout(function(){
        console.log(answerReturn);
    },3000);

    setTimeout(async function () {
            const responseData = answerReturn;
            res.json(responseData);
    },15);  
});

//now app is running - listening to requests on port 8046 
app.listen(PORT, function(){     
    console.log('Server started on port 8046...');
});
