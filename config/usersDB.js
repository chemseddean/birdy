var sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./DB/birdy.db', (error) => {
    if (error) {
      console.error(error.message);
      throw error
    }else{
      console.log('Successfuly connected to Birdy db.');
      let sql = `CREATE TABLE IF NOT EXISTS users(
        id VARCHAR(255) PRIMARY KEY,
        firstName VARCHAR(255) NOT NULL,
        lastName VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL)`

      db.run(sql, (error) => {
        if (error){
          //Table already created
          console.error(error.message)
        }else{
          console.log("Birdy db successfuly created")
        }
      })
    }
  });

module.exports = db
