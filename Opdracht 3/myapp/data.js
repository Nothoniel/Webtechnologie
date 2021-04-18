let db = require("./db");

function getData(sql, sqlParams) {
    return new Promise(function(resolve, reject) {
        //executing the sql-string   
         
        db.all(sql, sqlParams, function (err, rows) {
            if (err) {
                throw err;
            }    
            resolve(rows);
            console.log("Execute sql statement.");     
        }); 

        //closing the connection
        // db.close(error => {
        //     if(error)
        //         console.error(error.message);
        //     console.log("Close the database connection.");
        // }); 
    });
}

module.exports = getData;


