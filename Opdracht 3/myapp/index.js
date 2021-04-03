const express = require('express');
const app = express();
var path = require('path');
var serveStatic = require('serve-static');
var moduleDataTransmission = require('./datatransmission');
// var moduleConversion = require('./conversion');

const PORT=8046; 

//question system
let query1 = `SELECT UserName username,
                      Password password  
               FROM User`;

//acces database               
moduleDataTransmission(query1); //user system

// retrieving  files
app.use(serveStatic(path.join(__dirname, 'public')))

//called every time an http request is received
app.get('/', (req, res) => {
    res.send('Hello World!');
});

//now app is running - listening to requests on port 8046 
app.listen(PORT, function(){
console.log('Server started on port 8046...');
});
