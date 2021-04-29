const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator')
const gravatar = require('gravatar');
const User = require('../../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config');
const creatLocalSQLDB = require('../../config/sqlDB_manager')
const bodyParser = require("body-parser");
const auth = require('../../middleware/auth');
const { exists } = require('../../models/User');

// creation de la BD local en SQLite3 qui contient les tables users et friends
const db = creatLocalSQLDB()

// ------- PUBLIC no auth mmiddleware
// enregistrer un nouvel utilisateur
router.post('/register',
  [ // middleware verificaion des champs avec express-validator
    check('username', 'Name is required').notEmpty(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
    check('email', 'Email is required').notEmpty(),
    check('firstName', 'First Name is required').notEmpty(),
    check('lastName', 'Last Name is required').notEmpty(),
  ],
  async (req, res) => { // callback
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      console.log(errors.array())
      return res.status(400).json({ errors: errors.array() })
    }

    const user = req.body
    
    // check if already exists
    var selectUser = `SELECT * FROM Users u WHERE u.email = '${user.email}' or u.username = '${user.username}'`
    db.get(selectUser, [], async (error, candidate) => {
      if (error)
        return res.status(500).send('PROBLEME SQL login lors de verification si user existe '+error.message)
    
      if (candidate) {
        const toChange = candidate.email == user.email ? 'email' : 'username'
        return res.status(409).send('User already exists, change the ' + toChange)
      }
      console.log('ok il s agit d un nouvel user');

      //get user avatar
      const avatar = gravatar.url(user.email, {
        s: '200', //default size
        r: 'pg',  //rating 
        d: 'mm'   //default avatar
      })

      //Ecrypt and hash the password
      user.password = await bcrypt.hash(req.body.password, 10)
      var insert = 'INSERT INTO users (username, firstName, lastName, email, password, avatar) VALUES (?,?,?,?,?,?)'
      var params = [user.username, user.firstName, user.lastName, user.email, user.password, avatar]
      db.run(insert, params, async (error) => {
        if (error) {
          return res.status(500).send('probleme ssqlite insertion de nouvel user ' + error.message)
        }
        console.log('ok user ajouter au local sqlite database');
        // Une derrniere etape dans la registration est de creer une trace de l'utilisateur
        // dans la base de donnes mangoose as well, dans la collection Users
        // username est un object User mangoose
        theUserOnMongo = new User({ username : user.username })
        
        await theUserOnMongo.save()
          .then(console.log('ok user ajoute au mongo online database'))
          .catch((e) => console.error('PROBLEME SQL lors de insertion de la trace de nouvel user a MongoDB ' + e.message))
        
        const payload = {
          user: user,
          userIDonMongo: theUserOnMongo.id
        }
        const userAsString = JSON.stringify(user)
        // const userIDonMongoAsString = ""+theUserOnMongo.id
        //Sign the token
        jwt.sign(
          payload,
          config.get('mySecretKey'),
          { expiresIn: 360000 },
          (err, token) => {
            if (err)
              throw err;
            res.json({ token, userAsString })
          }
        )
      })
    })
})

// se connecter un nouvel utilisateur
router.post('/login',
  [
    check('password', 'Password is required').exists(),
    check('username', 'Username is required').notEmpty()
  ],
  (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() })

    const { username, password } = req.body
    var selectUser = `SELECT * FROM Users u WHERE u.username = '${username}'`

    db.get(selectUser, [], async (error, user) => {
      if (error)
        return res.status(500).json('PROBLEME SQL login', error.message)

      if (!user)
        return res.status(404).send('no matching account')

      var goodPass = await bcrypt.compare(password, user.password)

      if (!goodPass)
        return res.status(401).send('Bad password')
        
        
      theUserOnMongo = await User.findOne({username})
      const payload = {
        user: user,
        userIDonMongo: theUserOnMongo.id
      }			
      const userAsString = JSON.stringify(user)
      // const userIDonMongoAsString = ""+theUserOnMongo.id
      //Sign the token
      jwt.sign(
        payload,
        config.get('mySecretKey'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) 
            throw err;
          res.json({ token, userAsString })
        }
      )
    })
})

// supprimer tout les utilisateur 
router.delete('/logout', (req, res) => {
  db.all('DROP * FROM Users', [], (err, results) => {
    if (err) {
      res.status(500)
    } else {
      res.status(200)
      console.log("success")
    }
  })
});

// get all users
router.get('/all', (req, res) => {
  const q = 'select * from users'
  db.all(q, [], (err, ok) => {
    return res.send(ok)
  })
})

// ------- PRIVATE authentification requise 

// get a specefic user
router.get('/:username', auth, (req, res) => {
  const q = `select * from users where username = '${req.params.username}'`
  db.get(q, [], (err, ok) => {
    return res.send(ok)
  })
})

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userIDonMongo).select('-password');
    res.json(user)
  } catch (e) {
    console.error(e.message)
    res.status(500).send('Server error')
  }
})



module.exports = router;