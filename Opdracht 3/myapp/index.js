const express = require('express');
const app = express();
var path = require('path');
const bcrypt = require('bcrypt');
var serveStatic = require('serve-static');
let getData = require('./data');
var dataArray;

const PORT=8046; 

// app.use(urlencoded());

// retrieving  files
app.use(serveStatic(path.join(__dirname, 'public')))

//called every time an http request is received, like a starting file can be set  
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'./public/index.html'));
});

var array1 = [
    {naam: 'appels', aantal: 2},
    {naam: 'bananen', aantal: 0},
    {naam: 'kersen', aantal: 5}
];

console.log(array1.find( data => data.naam === 'kersen')) // { naam: 'kersen', aantal: 5 }

//athentication of user
// app.post('/loginpage_htmlFile', async (req, res) => {
    // //user sql query
    // let sql = `SELECT UserName username,
    //                       Password password  
    //                FROM User`;
    // //accesing database
    // getData(sql).then( results => dataArray = results )

    // //prints out the data
    // setTimeout(function(){
    //     console.log(dataArray);
    //     },500);
//     try{
           // //compares the username of db with the inserted one and stores the found user in a variable
//         let foundUser = dataArray.find((data) => req.body.username === data.username);
//         if (foundUser) {
    
//             let submittedPass = req.body.password; 
//             let storedPass = foundUser.password; 
                // //comparing password of inserted user with that of the found user
//             const passwordMatch = await bcrypt.compare(submittedPass, storedPass);
//             if (passwordMatch) {
//                 res.send(`matching password`);
//             } else {
//                 res.send("not matching password");
//             }
//         }
//         else {
//             res.send("username does not exist");
//         }
//     } 
//     catch{
//         res.send("Internal server error");
//     }
// });

//now app is running - listening to requests on port 8046 
app.listen(PORT, function(){
console.log('Server started on port 8046...');
});
