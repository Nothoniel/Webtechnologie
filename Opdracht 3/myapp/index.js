const express = require("express");
const app = express();
var path = require('path');
var session = require('express-session');
const bcrypt = require('bcrypt');
const flash = require('connect-flash');
const fetch = require('node-fetch');
var serveStatic = require('serve-static');
let getData = require('./data');
let db = require("./db");

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

// app.use(cookieParser());
app.use(session({
    secret : "mokergeheim",
    resave : true,
    saveUninitialized : false
    })
);

app.use(express.urlencoded({extended : false}));

app.set('json spaces', 10);

// retrieving  files
app.use(serveStatic(path.join(__dirname, "public")));
app.use(express.json({limit : "100mb"}));

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
app.post("/login", (req, res) => {
    //user sql query
    let sql = `SELECT UserName username,
                      Password password,
                      FirstName firstname,
                      LastName lastname  
               FROM User`;
    //accesing database
    getData(sql).then(results => dataArray = results);

    //prints out the data
    setTimeout(function() {console.log(dataArray);}, 10);

    setTimeout(async function() {
        console.log("Attempting to log in, session:" + req.session.id);   
        try {
            //compares the username of db with the inserted one and stores the found user in a variable
            let foundUser = dataArray.find(dataArray => req.body.username === dataArray.username);
            if (foundUser) {
                console.log("user found");
                console.log(foundUser);
                //comparing password of inserted user with that of the found user
                if (req.body.password == foundUser.password) {
                    console.log("successful log in");
                    req.session.user = foundUser;
                    res.send(foundUser.userName);
                    //foundUser.firstname
                    //foundUser.lastname
                    return res.end();   
                } else {
                    res.flash("not matching");  
                    console.log("unsuccessful log in");
                }
            } else {
                res.send("username does not exist");
                console.log("unsuccessful log in");
            }
        } catch {
            res.send("Internal server error");
            console.log("server error");
        }
    }, 15);
});

app.post("/register", (req, res) => {
    if (req.body.password !== req.body.confirm)
        res.send("password confirmation did not match password");
    console.log("Registering new user");
    //user sql query
    try {
        //making an array that contains the info of the new user
        var newUser = [req.body.username, req.body.firstName, req.body.lastName, req.body.password];

        //sql string that adds the new user to the db
        let insert_sql = `INSERT INTO User(UserName, FirstName, LastName, Password) VALUES (?,?,?,?)`;
        insertData(insert_sql, newUser);
    } catch {res.send();}
});

app.post("/edit", (req, res) => {
    if (req.body.password !== req.body.confirm)
        res.send("password confirmation did not match password");
    console.log("Registering new user");

    //user sql query
    try {
        //making an array that contains the info of the new user
        var user = [
            //if the input is empty, use the old data stored in the session
            req.body.firstName ? req.body.firstName : req.session.user.firstname, 
            req.body.lastName ? req.body.lastName : req.session.user.lastname, 
            req.body.password ? req.body.password : req.session.user.password,
            req.session.user.username,
            req.body.oldPassword
        ];

        //sql string that updates the user data in the db
        let update_sql = `UPDATE User 
                          SET firstName = ?, 
                              lastName = ?, 
                              Password = ?
                          WHERE UserName = ? AND Password = ?`;
        insertData(update_sql, user);
    } catch {res.send();}
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

    //get data from database
    function executeQuery(sql, receivedQuestion){
        getData(sql, receivedQuestion).then(results => answerReturn = results);
    }

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
                executeQuery(sqlIncorrect, receivedQuestion);  
            }                            
        });    
    } 

    //determines the correction for questions where multiple answers can be given
    function determineCorrection(array1, array2) {
        if(req.body.type == "multiChoice") {
            array1= array1.sort();
            array2= array2.sort();
        }
        return array1.length === array2.length &&
            array1.every((val, index) => val === array2[index]);
    }

    //query correct answer for multiChoice and open
    let sqlCorrect= `SELECT FeedbackCorrect feedback
                        FROM Question
                        WHERE QuestionID = ?`;

    if(req.body.type !== "multipleChoice") {
        let sql = `SELECT CorrectAnswer correctanswer
                        FROM Question
                        WHERE QuestionID = ?`;                
        //accesing database
        getData(sql, receivedQuestion).then(results => { 
            var arrayOfCorrect = (results[0].correctanswer).split(',');  
            const insertedAnswer = (currentValue) => currentValue === req.body.answer;
            if(req.body.type == "open") { 
                if(arrayOfCorrect.some(insertedAnswer)){
                    executeQuery(sqlCorrect, receivedQuestion);                  
                }
                else {
                    executeQuery(sqlIncorrect, receivedQuestion);     
                }
            }
            //order and multiChoce question
            else {
                if(determineCorrection(arrayOfCorrect, req.body.answer)) {
                    executeQuery(sqlCorrect, receivedQuestion);  
                }
                else {
                    executeQuery(sqlIncorrect, receivedQuestion);  
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


app.post("/user", (req, res) => {
    if (req.session.user) {
        console.log(req.session.user);
        res.send(req.session.user);
    } else {res.send();}
});

//closing of the db, when closing server
function exitHandler(options, exitCode) {
    db.close(err => {
            if (err)
                console.error(err.message);
            }); 
    if (exitCode || exitCode === 0) console.log(exitCode);
    if (options.exit) process.exit();
}

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, {exit:true}));

//catches for pm2
process.on('SIGTERM', exitHandler.bind(null, {exit:true}));

//now app is running - listening to requests on port 8046 
app.listen(PORT, function(){     
    console.log('Server started on port 8046...');
});
