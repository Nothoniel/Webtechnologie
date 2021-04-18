const express = require("express");
const app = express();
var path = require("path");
var session = require("express-session");
var morgan = require("morgan")
const bcrypt = require("bcrypt");
const flash = require("connect-flash");
const fetch = require("node-fetch");
var serveStatic = require("serve-static");
let getData = require("./data");
let db = require("./db");
let insertData = require("./insert_data");
const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require("constants");
let sqlParams;

var dataArray, questions, answerReturn;
var multi = [];
const PORT = 8046; 

//create session
app.use(session({
    secret : "mokergeheim",
    resave : true,
    saveUninitialized : false
    })
);

app.use(morgan("tiny"))

app.use(express.urlencoded({extended : false}));

app.set("json spaces", 10);

// retrieving  files
app.use(serveStatic(path.join(__dirname, "public")));
app.use(express.json({limit : "100mb"}));

//display of startpage of assesment system
app.get("/start", (req, res) => {
    let sql = `SELECT TopicTitle topictitle,
                      DescriptionLink link,
                      LinkName description,
                      QuizTitle quiztitle,
                      QuizID quizid
               FROM Topic
               INNER JOIN Quiz ON Quiz.TopicID = Topic.TopicID`;
    //accesing database
    getData(sql, sqlParams).then(results => dataArray = results);

    setTimeout(async function() {
         const responseData = dataArray;
         res.json(responseData);
    }, 15);    
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
    
        setTimeout(async function() {
            if(multi.length > 0)
                multi.length = 0;

            for(let i = 0; i < questions.length; i++) {
                var type = questions[i].type;
                var questionid = questions[i].questionid;
                if (type !== "open") {
                    let sql = `SELECT QuestionID questionid,
                                      MultichoiceValue multichoicevalue
                               FROM Multichoice
                               WHERE QuestionID = ?`;
                    let sqlParams = [questionid];                 
                    //accesing database
                    getData(sql, sqlParams).then(results => multi.push(results));
                }
            }
            setTimeout(function() {res.json({questions : questions, multi : multi});},10);
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
            if(foundUser) {
                console.log("user found");
                console.log(foundUser);
                //comparing password of inserted user with that of the found user
                if(req.body.password == foundUser.password) {
                    console.log("successful log in");
                    req.session.user = foundUser;
                    req.session.user.attempts = 0;
                    req.session.user.correctAttempts = 0;
                    res.json({message: "succesful log in"});
                } else {
                    res.flash("not matching");
                    res.json({message: "user or password not found"})  
                    console.log("unsuccessful log in");
                }
            } else {
                res.json({message: "user or password not found"}) 
                console.log("unsuccessful log in");
            }
        } catch {
            res.json({message: "internal server error"}) 
            console.log("server error");
        }
    }, 15);
});

app.post("/logout", (req, res) => {
    req.session.user = null;
    res.send();
});

app.post("/register", (req, res) => {
    if(req.body.password !== req.body.confirm)
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
    if(req.body.password !== req.body.confirm)
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
    

app.post("/feedback", (req, res) => {
    console.log("request came in");
    let user = [req.session.user.username];

    //query correct answer for multiChoice and open
    let sqlCorrect =   `SELECT FeedbackCorrect feedback
                        FROM Question
                        WHERE QuestionID = ?`;

    //query for when user answered incorrect
    let sqlIncorrect = `SELECT FeedbackIncorrect feedback,
                               DescriptionLink link,
                               LinkName linkname
                        FROM Question
                        INNER JOIN Quiz ON Quiz.QuizID = Question.QuizID
                        INNER JOIN Topic ON Topic.TopicID = Quiz.TopicID
                        WHERE QuestionID = ?`;

    //query that increments the correct and total attempts, for correct answer
    let sqlCorrectAttempt =    `UPDATE User
                                SET UserAttempts = UserAttempts + 1,
                                    CorrectAttempt = CorrectAttempt + 1
                                WHERE Username = ?`;

    //query that increments only the total attempts, for incorrect answer
    let sqlIncorrectAttempt =  `UPDATE User
                                SET UserAttempts = UserAttempts + 1
                                WHERE Username = ?`;
    
    var receivedQuestion = [req.body.currentquestionID]; 

    //get data from database
    function executeQuery(sql, receivedQuestion){
        getData(sql, receivedQuestion).then(results => answerReturn = results);
    }

    if(req.body.type == "multipleChoice") {
        var answer = req.body.answer;
        if(Array.isArray(req.body.answer))
            answer = req.body.answer.join();

        let sql = `SELECT FeedbackCorrect feedback
                   FROM Question
                   WHERE QuestionID = ? AND CorrectAnswer = ?`;
        var currentQuestion = [req.body.currentquestionID, answer];                
        //accesing database
        getData(sql, currentQuestion).then(results => { 
            if(results.length > 0)
                answerReturn = results;
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

    if(req.body.type !== "multipleChoice") {
        let sql = `SELECT CorrectAnswer correctanswer
                   FROM Question
                   WHERE QuestionID = ?`;                
        //accesing database
        getData(sql, receivedQuestion).then(results => { 
            var arrayOfCorrect = (results[0].correctanswer).split(",");  
            const insertedAnswer = (currentValue) => currentValue === req.body.answer;
            if(req.body.type == "open") { 
                if(arrayOfCorrect.some(insertedAnswer)){
                    executeQuery(sqlCorrect, receivedQuestion);                  
                }
                else {
                    executeQuery(sqlIncorrect, receivedQuestion);     
                }
            }
            //order and multiChoice question
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
    
    setTimeout(async function () {
            const responseData = answerReturn;
            if(responseData[0].feedback.length == 26) {
                insertData(sqlCorrectAttempt, user);
                req.session.attempts++;
                req.session.correctAttempts++;
            } else {
                insertData(sqlIncorrectAttempt, user);
                req.session.attempts++;
            }
            res.json(responseData);
    }, 15);  
});

app.post("/report", (req, res) => {
    let sql =  `SELECT UserAttempts, CorrectAttempt
                FROM User
                WHERE UserName = ?`
    getData(sql, req.session.user.username).then(results => res.json({
        username: req.session.user.username,
        sessionAttempts: req.session.attempts,
        sessionCorrectAttempts: req.session.correctAttempts,
        overallAttempts: results[0].UserAttempts,
        overallCorrectAttempts: results[0].CorrectAttempt
    }));
});

app.post("/user", (req, res) => {
    if(req.session.user)
        res.send(req.session.user);
    res.send();
});

app.use(function (err, req, res, next) {
    console.error(err.stack);
    next(err);
});

app.use(function (err, req, res, next) {
    res.status(500).send("Something failed!");
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
app.listen(PORT, function() {console.log("Server started on port 8046...");});
