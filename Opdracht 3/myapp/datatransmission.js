function moduleDataTransmission(sql) {
    // opens the database
    const sqlite3 = require('sqlite3').verbose();

    let db = new sqlite3.Database('./db/webtech.db', sqlite3.OPEN_READWRITE, (error) => {
        if (error) {
        console.error(error.message);
        }
        console.log('Connected to the webtech database.');
    });

    //printing each row            
    db.all(sql, [], (err, rows) => {
        if (err) {
          throw err;
        }

    rows.forEach((row) => {
        console.log(`${row.username} - ${row.password}`);
        });
    });

    db.close((error) => {
        if (error) {
        console.error(error.message);
        }
        console.log('Close the database connection.');
    });
}

module.exports = moduleDataTransmission;