// opens the database
let db = require('./db');

function insertData(insert_sql, newUser) {
    //executing the sql-string            
    db.run(insert_sql, newUser, function (err, rows) {
        if (err) {
            throw err;
        }
        console.log("Number of records inserted: " + rows);
        console.log(`A row has been inserted with rowid ${this.username}`);
    });

    //closing the connection
    db.close((error) => {
        if (error) {
            console.error(error.message);
        }
    });
}

module.exports = insertData;


