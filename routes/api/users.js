const express = require('express');
const bcrypt = require('bcrypt')
const Joi = require('joi')
const User = require('../../models/User')
const router = express.Router();
const db = require('../../config/usersDB')
const ses = require('../../middleware/session')

const session = require('express-session')
//const db_connect = require('./config/db')
var bodyParser = require("body-parser");

// to acess to request body
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// IMPORTANT 
// dans chaque router on peut acceder a user par 
// const { user } = res.locals
router.use((req, res, next) => ses.getUser(req, res, next))

const {
    SESS_NAME = 'maSession',
    SESS_SECRET = 'motDePasseAModifier',
    SESS_LIFETIME = 1000 * 60 * 60, // 2 hours in ms
} = process.env



router.use(session({
    name: SESS_NAME,
    secret: SESS_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: SESS_LIFETIME,
        sameSite: true,
        secure: false
    }
}))

//  schema de validation des champs
const joiUserSchema = Joi.object({
    username: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email(),
    password: Joi.string().min(8)
})

// ########## TESTING  ##########
// test PRINT USERS DATABASE
// http://localhost:5000/api/users/
router.get('/', (req, res) => {
    db.all('SELECT * FROM Users', [], (err, results) => {
        if (err) {
            res.status(500)
        } else {
            res.status(200).send(results)
        }
    })
})

router.get('/print-session', (req, res) => {
    res.send(req.session)
})


// ######### GET #########
// Public /api/users/login
router.get('/login', ses.redirectDashboard, (req, res) => {
    res.send('CECI EST LA PAGE LOGIN')
})
// ######### POST ########

// Public /api/users/login
router.post('/login', ses.redirectDashboard, (req, res) => {
    const { email, password } = req.body
    var selectUser = `SELECT * FROM Users u WHERE u.email = '${email}'`
    db.get(selectUser, [], async (error, candidate) => {
        console.log('heya')
        if (error) {
            console.log('PROBLEME SQL login', error.message)
            return
        } else {
            if (! candidate ) {
                res.status(404).send('no matching email')
            }
            try {
                if (await bcrypt.compare(password, candidate.password)) {
                    req.session.userId = candidate.username
                    res.status(200).send(`Welcome ${candidate.firstName}`)
                } else {
                    res.status(401).send('Bad password')
                }
            } catch (error) {
                console.log('probleme comparing');
            }
            
        }
    })
})

// @route Public /api/users/register
router.post('/register', ses.redirectDashboard,  async (req, res) => {
    // Joi valide les champs
    try{
        const result = await joiUserSchema.validateAsync(req.body)
    }catch(error){
        res.status(400).send(error.details[0].message)
        return
    }
    
    const user = {
        username,
        firstName,
        lastName,
        email,
        password
    } = req.body

    // check if already exists
    var selectUser = `SELECT * FROM Users u WHERE u.email = '${user.email}' or u.username = '${user.username}'`
    db.get(selectUser, [], async (error, candidate) => {
        if (error) {
            console.log('PROBLEME SQL login', error.message)
            return
        } else {
            if (candidate) {
                const probleme = candidate.email == user.email ? 'email' : 'username'
                res.status(409).send('User already exists, change the ' + probleme)
                return
            }
        }
    })
    
    // crypter le mot de passe
    const hashedpassword = await bcrypt.hash(req.body.password, 10)
    user.password = hashedpassword
    // creation d'une instance User
    const newUser = new User(user)

    var insert = 'INSERT INTO users (username, firstName, lastName, email, password) VALUES (?,?,?,?,?)'
    var params = [user.username, user.firstName, user.lastName, user.email, user.password]
    db.run(insert, params, (error) => {
        if (error) {
            console.error('PROBLEME SQL ', error.message)
            return
        } else {
            req.session.userId = candidate.username
            res.status(201).send(user)
        }
    })
    //     db.run(insert, params, (error)=>{
    //         if(error){
    //             //res.status(400).json({"Error": error.message})
    //             console.error(error.message)
    //             return
    //         }
    //     })
    //     res.json({
    //         "message": "User created",
    //         "user": user,
    //         "user_id": this.lastID
    //     })
    //     newUser.save()
    // } catch (error) {
    //     res.send("Server error")
    // }  
});


// @route GET /api/users/:user_id
// @route GET user by id
// @route Public
router.get('/:username', (req, res) => {
    res.send('okay ca marche')
})

router.post('/logout', ses.redirectWelcome, async (req, res) => {
    req.session.destroy(err => {
        if(err) {
            return res.redirect(DASHBOARD)
        }
    })
    res.clearCookie(SESS_NAME)
    return res.redirect(HOME)
})

module.exports = router