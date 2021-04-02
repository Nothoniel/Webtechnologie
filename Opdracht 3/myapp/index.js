var fs = require('fs');
const express = require('express');
const app = express();
var path = require('path');
var serveStatic = require('serve-static');

const PORT=8046; 

// fs.readFile('html/assessment.html', function (error, html) {

//     if (error) throw error;    

    
//     // this function is called every time an http request is received
//     app.get ('/', function(req, res) { 
//         res.writeHeader(200, {"Content-Type": "text/html"});  
//         res.write(html);  
//         res.end();
//     });
// });  


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


