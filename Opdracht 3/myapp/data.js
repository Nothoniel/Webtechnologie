let openDB = require('./db');
let db;

function getData(sql) {
    // opens the database
    db = openDB();

    return new Promise(function(resolve, reject) {
        //executing the sql-string            
        db.all(sql, function (err, rows) {
            if (err) {
                throw err;
            }
            else{
                resolve(rows);
            }
            console.log("Execute sql statement");
        }); 

        //closing the connection
        // db.close((error) => {
        //     if (error) {
        //     console.error(error.message);
        //     }
        //     console.log('Close the database connection.');
        // }); 
    })
}

module.exports = getData;


