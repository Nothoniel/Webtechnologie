const express = require('express');

const app = express();

// this function is called every time an http request is received
app.get ('/', function(req, res) { 
    res.send('Hello World');
});

//now app is running - listening to requests on port 8046 
app.listen(8046, function(){
    console.log('Server started on port 8046...');
});