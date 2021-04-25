var sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./DB/birdy.db', (error) => {
  if (error) {
    console.error(error.message);
    throw error
  } else {
    console.log('Successfuly connected to Birdy db.');
    let sql = `CREATE TABLE IF NOT EXISTS users(
        username VARCHAR(255) PRIMARY KEY,
        firstName VARCHAR(255) NOT NULL,
        lastName VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        avatar VARCHAR(255),
        CONSTRAINT username_unique UNIQUE (username)
        CONSTRAINT email_unique UNIQUE (email))`

    let friends = `CREATE TABLE IF NOT EXISTS friends(
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username1 VARCHAR(255) NOT NULL,
          username2 VARCHAR(255) NOT NULL,
          FOREIGN KEY (username1) REFERENCES users(username),
          FOREIGN KEY (username2) REFERENCES users(username))`

    db.run(sql, (error) => {
      if (error) {
        //Table already created
        console.error(error.message)
      } else {
        console.log("Users table successfuly created")
      }
    })
    db.run(friends, (error) => {
      if (error) {
        //Table already created
        console.error(error.message)
      } else {
        console.log("Friends table successfuly created")
      }
    })


  }
});

module.exports = db