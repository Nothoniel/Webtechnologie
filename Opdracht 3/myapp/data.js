function moduleDataTransmission(sql) {
    var dataExport = [];

    function test (data) {
            dataExport = data.slice(); 
            // console.log(data);    
    }

    // opens the database
    const sqlite3 = require('sqlite3').verbose();

    var readData = function(test){
                        let db = new sqlite3.Database('./db/webtech.db', sqlite3.OPEN_READWRITE, (error) => {
                            if (error) {
                            console.error(error.message);
                            }
                            console.log('Connected to the webtech database.');
                        });

                        //printing each row            
                        db.all(sql, function (error, data) {
                            if (error) {
                                throw error;
                            }
                            test(data);
                            db.close();
                        });

                            // db.close((error) => {
                            //     if (error) {
                            //     console.error(error.message);
                            //     }
                            //     console.log('Close the database connection.');
                            // });
    }

    readData(test);
    console.log(dataExport[0]);
}


module.exports = moduleDataTransmission;