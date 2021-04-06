// opens the database
let db = require('./db');

function insertData(insert_sql) {
    //executing the sql-string            
    db.run(insert_sql, function (err, rows) {
        if (err) {
            throw err;
        }
        console.log(rows);
    });

    //closing the connection
    db.close((error) => {
        if (error) {
            console.error(error.message);
        }
        console.log('Close the database connection.');
    });
}

module.exports = insertData;