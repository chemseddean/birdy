var sqlite3 = require('sqlite3').verbose();
var generateUsers = require('./usersGenerator')


const creatLocalSQLDB = () => {
  const db = new sqlite3.Database('./DB/birdy.db', (error) => {
    if (error) {
      console.error(error.message);
      throw error
    } 
    
    console.log('Local sqlite DB connected:');
    let q = `CREATE TABLE IF NOT EXISTS users(
        username VARCHAR(255) PRIMARY KEY,
        firstName VARCHAR(255) NOT NULL,
        lastName VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        avatar VARCHAR(255),
        CONSTRAINT username_unique UNIQUE (username)
        CONSTRAINT email_unique UNIQUE (email))`

    db.run(q, (error) => {
      if (error) {
        return console.error(error.message)
      }
      console.log("-- Users table : ok")
    })

    let q2 = `CREATE TABLE IF NOT EXISTS friends(
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username1 VARCHAR(255) NOT NULL,
          username2 VARCHAR(255) NOT NULL,
          FOREIGN KEY (username1) REFERENCES users(username),
          FOREIGN KEY (username2) REFERENCES users(username))`

    db.run(q2, (error) => {
      if (error) {
        return console.error(error.message)
      }
      console.log("-- Friends table : ok")
    })
  })
  return db
}

// generateUsers()
module.exports = creatLocalSQLDB