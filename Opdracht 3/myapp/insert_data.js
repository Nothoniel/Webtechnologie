let db = require("./db");

insertData = (insert_sql, newUser) => {
    //executing the sql-string            
    db.run(insert_sql, newUser, (err, rows) => {
        if(err)
            throw err;
        console.log("New user added");
    });
}

module.exports = insertData;


