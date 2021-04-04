const express = require('express');
const app = express();
var path = require('path');
const bcrypt = require('bcrypt');
var serveStatic = require('serve-static');
var moduleDataTransmission = require('./data');

const PORT=8046; 

// app.use(urlencoded());

// retrieving  files
app.use(serveStatic(path.join(__dirname, 'public')))


//called every time an http request is received, like a starting file can be set  
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'./public/index.html'));
});

//user sql query
let query1 = `SELECT UserName username,
                      Password password  
               FROM User`;

//acces database               
moduleDataTransmission(query1); //user system



//athentication of user
// app.post('/loginpage_htmlFile', async (req, res) => {
//     try{
//         let foundUser = users.find((data) => req.body.username === data.username);
//         if (foundUser) {
    
//             let submittedPass = req.body.password; 
//             let storedPass = foundUser.password; 
    
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
//     } catch{
//         res.send("Internal server error");
//     }
// });


//now app is running - listening to requests on port 8046 
app.listen(PORT, function(){
console.log('Server started on port 8046...');
});
