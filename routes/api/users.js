const express = require('express');
const bcrypt = require('bcrypt')
const Joi = require('joi')
const User = require('../../models/User')
const router = express.Router();
const db = require('../../config/usersDB')
const ses = require('../../middleware/session')
//const db_connect = require('./config/db')
var bodyParser = require("body-parser");
const { promise } = require('bcrypt/promises');


// to acess to request body
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// const session = require('express-session')
// IMPORTANT 
// dans chaque router on peut acceder a user par 
// const { user } = res.locals
// router.use((req, res, next) => ses.getUser(req, res, next))

// ######### SERVICE: createUser @Public #########

//  schema de validation des champs
const joiUserSchema = Joi.object({
    username: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email(),
    password: Joi.string().min(8)
})

// REQUETE: GET http://localhost:5000/api/users/register
// RESULT: afficher la page register if not notconnected
// or dashoard if already connected
router.get('/register', ses.ifOnlineRedirectDashboard, (req, res) => {
    res.redirect(process.env.WELCOME_PAGE)
})

// REQUETE: POST http://localhost:5000/api/users/register
// RESULT: register a new user
router.post('/register', ses.ifOnlineRedirectDashboard, async (req, res) => {
    // Joi valide les champs
    try {
        const result = await joiUserSchema.validateAsync(req.body)
    } catch (error) {
        return res.status(400).send(error.details[0].message)
    }

    const user = {
        username,
        firstName,
        lastName,
        email,
        password
    } = req.body
    // check if already exists, clef primaire: email ou username
    var selectUser = `SELECT * FROM Users u WHERE u.email = '${user.email}' or u.username = '${user.username}'`
    
    db.get(selectUser, [], (error, candidate) => {
        if (error) {
            console.log('PROBLEME SQL login', error.message)
            return
        } else {
            if (candidate) {
                const probleme = candidate.email == user.email ? 'email' : 'username'
                return res.status(409).send('User already exists, change the ' + probleme)
            }
        }
    })


    // crypter le mot de passe
    const hashedpassword = await bcrypt.hash(req.body.password, 10)
    user.password = hashedpassword
    // creation d'une instance User
    // const newUser = new User(user)

    //Create user by insering it the database
    var insert = 'INSERT INTO users (username, firstName, lastName, email, password) VALUES (?,?,?,?,?)'
    var params = [user.username, user.firstName, user.lastName, user.email, user.password]
    db.run(insert, params, async (error, candidate) => {
        if (error) {
            console.error('PROBLEME SQL ', error.message)
            return
        } else {
            //req.session.userId = candidate.username
            // faire l'authentification
            const accessToken = await ses.generateAccessToken(candidate)
            return res.status(201).json({ accessToken: accessToken })
            // res.status(201).send(user)
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

// ######### SERVICE: loginUser @Public #########

// const {
//     SESS_NAME = 'maSession',
//     SESS_SECRET = 'motDePasseAModifier',
//     SESS_LIFETIME = 1000 * 60 * 60, // 2 hours in ms
// } = process.env

// router.use(session({
//     name: SESS_NAME,
//     secret: SESS_SECRET,
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         maxAge: SESS_LIFETIME,
//         sameSite: true,
//         secure: false
//     }
// }))

// REQUETE: GET http://localhost:5000/api/users/login
// RESULT: afficher la page login if not notconnected
// or dashoard if already connected
router.get('/login', ses.ifOnlineRedirectDashboard, (req, res) => {
    res.send('CECI EST LA WELCOME_PAGE')
})


// app.post('/login', (req, res) => {
//     // Authenticate User

//     const username = req.body.username
//     const user = { name: username }

//     const accessToken = ses.generateAccessToken(user)
//     const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
//     refreshTokens.push(refreshToken)
//     res.json({ accessToken: accessToken, refreshToken: refreshToken })
// })


// REQUETE: POST http://localhost:5000/api/users/login
// RESULT: login for an existed user 
router.post('/login', (req, res) => {
    const { email, password } = req.body
    var selectUser = `SELECT * FROM Users u WHERE u.email = '${email}'`
    db.get(selectUser, [], async (error, candidate) => {
        //console.log('heya')
        if (error) {
            res.status(500).send('database problem')
            return
        } else {
            if (! candidate ) {
                res.status(404).send('no matching email')
            }
            try {
                if (await bcrypt.compare(password, candidate.password)) {
                    // faire l'authentification
                    const accessToken = ses.generateAccessToken(candidate)
                    res.status(200).json({ accessToken, candidate})
                } else {
                    res.status(401).send('Bad password')
                }
            } catch (error) {
                console.log('probleme comparing');
            }
            
        }
    })
})

// ######### SERVICE: logoutUser @Public #########

// REQUETE: DELETE http://localhost:5000/api/users/logout
// RESULT: supprimer la session actuelle et revenir au WELCOME_PAGE
router.delete('/logout', ses.ifOfflineRedirectWelcome, async (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect(DASHBOARD)
        }
    })
    res.clearCookie(SESS_NAME)
    return res.redirect(WELCOME_PAGE)
})



// @route GET /api/users/:user_id
// @route GET user by id
// @route Public
router.get('/:username', (req, res) => {
    res.send('okay ca marche')
})


router.post('/add_friend',
async (req,res) => {
    var friend = 'INSERT INTO friends (username1, username2) VALUES (?,?)'
    var params = [req.session.userId, req.body.username]
    try {
        db.run(friend, 
            params, 
            async (error, candidate) => {
            if (error) {
                console.error('PROBLEME SQL ', error.message)
                return
            } else {
                //req.session.userId = candidate.username
                res.status(201).send({msg: "Friend added !"})
            }
        })
    } catch (error) {
        
    }
    //console.log(req.body.username, req.session.userId)
})

module.exports = router



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

