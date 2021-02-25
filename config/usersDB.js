var sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./DB/Birdy.db', (error) => {
    if (error) {
      return console.error(error.message);
    }
    console.log('Successfuly connected to Birdy db.');
  });

let sql = `CREATE TABLE IF NOT EXISTS users(
            id VARCHAR(255) PRIMARY KEY,
            firstName VARCHAR(255) NOT NULL,
            lastName VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL)`

const create_db = async () => {
        
        await db.run(sql, function(error) {
            if (error)
                return console.log(error.message)
            else
                console.log("success")
        })
    }

module.exports = create_db
