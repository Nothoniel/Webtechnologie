// opens the database
let db = require('./db');

 function getData() {
    return new Promise(function(resolve, reject) {
        //user sql query
        let sql = `SELECT UserName username,
                        Password password  
                    FROM User`;

        //executing the sql-string            
        db.all(sql, function (err, rows) {
            if (err) {
                throw err;
            }
            else{
                resolve(rows);
            }
        }); 

        //closing the connection
        db.close((error) => {
            if (error) {
            console.error(error.message);
            }
            console.log('Close the database connection.');
        }); 
    })
}

getData()
.then(function(results){
  render(results)
})
.catch(function(err){
  console.log("Promise rejection error: "+err);
})

render = function(results){ console.log(results[0]) }

// module.exports = data;


