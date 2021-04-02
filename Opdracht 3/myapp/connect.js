const sqlite3 = require('sqlite3').verbose();

// open the database
let db = new sqlite3.Database('./db/webtech.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the webtech database.');
});

db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Close the database connection.');
});