let openDB = require('./db');
let db;

function insertData(insert_sql, newUser) {
    // opens the database
    db = openDB();

    //executing the sql-string            
    db.run(insert_sql, newUser, function (err, rows) {
        if (err) {
            throw err;
        }
        console.log("New user added");
    });

    //closing the connection
    db.close((error) => {
        if (error) {
            console.error(error.message);
        }
    });
}

module.exports = insertData;

