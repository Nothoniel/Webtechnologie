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
// let updateData = require('./update_data');
const cookieParser = require('cookie-parser');

var dataArray;
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
app.use(cookieParser());
app.use(session(
    {
    secret: 'mokergeheim',
    })
);

app.use(express.urlencoded({extended : false}));

// retrieving  files
app.use(serveStatic(path.join(__dirname, 'public')));
app.use(express.json({limit: '100mb'}));

//called every time an http request is received, like a starting file can be set  
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'./public/index.html'));
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
         console.log('Attempting to log in, session:' + req.session.id);   
         try {
             //compares the username of db with the inserted one and stores the found user in a variable
             let foundUser = dataArray.find( (dataArray) => req.body.username === dataArray.username);
             if (foundUser) {
                 console.log('user found');
                 console.log(foundUser);
                 //comparing password of inserted user with that of the found user
                 if (req.body.password == foundUser.password) {
                     console.log('successful log in');
                     req.session.user = foundUser;
                     res.send(foundUser.userName);
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

app.post('/edit', (req, res) => {
    if (req.body.password !== req.body.confirm) res.send('password confirmation did not match password');
    console.log("Registering new user");
    //user sql query
    try {
        //making an array that contains the info of the new user
        var user = [
            //if the input is empty, use the old data stored in the session
            req.body.firstName? req.body.firstName : req.session.user.firstname, 
            req.body.lastName? req.body.lastName : req.session.user.lastname, 
            req.body.password? req.body.password : req.session.user.password,
            req.session.user.username,
            req.body.oldPassword
        ];

        //sql string that updates the user data in the db
        let update_sql = 
        `UPDATE User 
        SET firstName = ?, lastName = ?, Password = ?
        WHERE UserName = ? AND Password = ?`;
        insertData(update_sql, user);
    }
    catch{
        res.send()
    }
});

app.post('/user', (req, res) => {
    if (req.session.user) {
    console.log(req.session.user);
    res.send(req.session.user);
    } else {
    res.send();
    }
});
//now app is running - listening to requests on port 8046 
app.listen(PORT, function(){     
    console.log('Server started on port 8046...');
});
