const express = require('express');
const app = express();
var path = require('path');
const bcrypt = require('bcrypt');
var serveStatic = require('serve-static');
let getData = require('./data');
var dataArray;

const PORT=8046; 

app.use(express.urlencoded({extended : false}));

// retrieving  files
app.use(serveStatic(path.join(__dirname, 'public')))

//called every time an http request is received, like a starting file can be set  
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'./public/index.html'));
});

//athentication of user
app.post('/login', async (req, res) => {
    //user sql query
    let sql = `SELECT UserName username,
                           Password password  
                    FROM User`;
    //accesing database
    getData(sql).then( results => dataArray = results )

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
                     res.send(`matching password`);
                     console.log('successful log in');
                 } else {
                     res.send("not matching password");
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

//now app is running - listening to requests on port 8046 
app.listen(PORT, function(){     
    console.log('Server started on port 8046...');
});
