const express = require('express');
const app = express();
var path = require('path');
var session = require('express-session');
const bcrypt = require('bcrypt');
const flash = require('connect-flash');
var serveStatic = require('serve-static');
let getData = require('./data');
let insertData = require('./insert_data');
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

app.use(express.urlencoded({extended : false}));

// retrieving  files
app.use(serveStatic(path.join(__dirname, 'public')));

//called every time an http request is received, like a starting file can be set  
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'./public/index.html'));
});

//authentication of user
app.post('/login', async (req, res) => {
    console.log("dit is login");
    //user sql query
    let sql = `SELECT UserName username,
                           Password password  
                    FROM User`;
    //accesing database
    getData(sql).then(results => dataArray = results);

     //prints out the data
    //setTimeout(function(){
    //     console.log(dataArray);
    //     },10);

    setTimeout(async function () {
         console.log('Attempting to log in');   
         try {
             //compares the username of db with the inserted one and stores the found user in a variable
             console.log(req.body.username);
             console.log(req.body.password);
             let foundUser = dataArray.find( (data) => req.body.username === data.username);
             if (foundUser) {
                 console.log('user found');
                 console.log(foundUser);
                 //comparing password of inserted user with that of the found user
                 if (req.body.password == foundUser.password) {
                     res.redirect('/assessment.html');
                     console.log('successful log in');     
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

app.post('/register', async (req, res) => {
    console.log("dit is register");
    if (req.body.password !== req.body.confirm) res.send('password confirmation did not match password');
    
    //user sql query
    try {
        var newUser = [
           req.body.username,
           req.body.firstName,
           req.body.lastName,
           req.body.password
        ].toString();

        // let insert_sql = `INSERT INTO User(UserName, FirstName, LastName, Password)
        //         VALUES('`+req.body.username+`','`+req.body.firstName+`','`+req.body.lastName+`','`+req.body.password+`')`;

        let insert_sql = `INSERT INTO User(UserName, FirstName, LastName, Password) VALUES (?,?,?,?)`;
        insertData(insert_sql, newUser);
    }
    catch{
        res.send()
    }
});

//now app is running - listening to requests on port 8046 
app.listen(PORT, function(){     
    console.log('Server started on port 8046...');
});
