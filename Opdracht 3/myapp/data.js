// opens the database
let db = require('./db');

function getData(sql) {
    return new Promise(function(resolve, reject) {
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

module.exports = getData;


