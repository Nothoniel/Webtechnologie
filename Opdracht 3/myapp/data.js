// opens the database
const sqlite3 = require('sqlite3').verbose();

//connectiong to sql
let db = new sqlite3.Database('./db/webtech.db', sqlite3.OPEN_READWRITE, (error) => {
    if (error) {
    console.error(error.message);
    }
    console.log('Connected to the webtech database.');
});

//user sql query
let sql = `SELECT UserName username,
                      Password password  
               FROM User`;

//printing each row            
db.all(sql, function (error, data) {
    if (error) {
        throw error;
    }

    console.log(data[0]);
});

db.close((error) => {
    if (error) {
    console.error(error.message);
    }
    console.log('Close the database connection.');
});

// module.exports = data;