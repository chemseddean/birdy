const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator')
const gravatar = require('gravatar');
const User = require('../../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config');
const db = require('../../config/usersDB')
const bodyParser = require("body-parser");
const auth = require('../../middleware/auth');



// @route   GET api/users
// @desc    Test route
// @access  Public 
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user)
    } catch (e) {
        console.error(e.message)
        res.status(500).send('Server error')
    }
}),

    // @route   POST api/users
    // @desc    Create user
    // @access  Public 
    router.post(
        '/register',
        [
            check('username', 'Name is required').notEmpty(),
            check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
            check('email', 'Email is required').notEmpty(),
            check('firstName', 'First Name is required').notEmpty(),
            check('lastName', 'Last Name is required').notEmpty(),
        ],

        async (req, res) => {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() })
            }

            const user = {
                username,
                firstName,
                lastName,
                email,
                password
            } = req.body

            try {
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
                //get user avatar
                const avatar = gravatar.url(email, {
                    s: '200', //default size
                    r: 'pg',  //rating 
                    d: 'mm'   //default avatar
                })

                //Ecrypt and hash the password
                user.password = await bcrypt.hash(req.body.password, 10)

                var insert = 'INSERT INTO users (username, firstName, lastName, email, password, avatar) VALUES (?,?,?,?,?,?)'
                var params = [user.username, user.firstName, user.lastName, user.email, user.password, avatar]
                db.run(insert, params, async (error, candidate) => {
                    if (error) {
                        console.error('PROBLEME SQL ', error.message)
                        return
                    } else {
                        //Add username to mongodb
                        //await newUserUsername.save()
                        //req.session.userId = candidate.username

                        username = new User({
                            username,
                            avatar
                        })
                        const payload = {
                            user: {
                                id: username.username,
                            }
                        }
                        console.log(payload)
                        //console.log("On est la")
                        try {
                            await username.save()
                            //Sign the token
                            jwt.sign(
                                payload,
                                config.get('jwttoken'),
                                { expiresIn: 360000 },
                                (err, token) => {
                                    if (err) throw err;
                                    res.json({ token });
                                });
                            res.status(201).send(user)
                        } catch (error) {
                            console.error(error.message)
                            res.status(500).send('Server error')
                        }
                    }
                })
            }
            catch (e) {
                console.error(e.message)
                res.status(500).send('Server error')
            }

        });

// @route   POST api/users
// @desc    Log in user
// @access  Public 
router.post(
    '/login',
    [
        check('password', 'Password is required').exists(),
        check('username', 'Username is required').notEmpty()
    ],

    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { username, password } = req.body
        var selectUser = `SELECT * FROM Users u WHERE u.username = '${username}'`

        try {
            db.get(selectUser, [], async (error, candidate) => {
                //console.log('heya')
                if (error) {
                    console.log('PROBLEME SQL login', error.message)
                    return
                } else {
                    if (!candidate) {
                        res.status(404).send('no matching account')
                    }
                    try {
                        if (await bcrypt.compare(password, candidate.password)) {
                            user = await User.findOne({ username })
                            const payload = {
                                user: {
                                    id: user.id,
                                }
                            }


                            //Sign the token
                            jwt.sign(
                                payload,
                                config.get('jwttoken'),
                                { expiresIn: 360000 },
                                (err, token) => {
                                    if (err) throw err;
                                    res.json({ token });
                                });

                        } else {
                            res.status(401).send('Bad password')
                            return
                        }
                    } catch (error) {
                        console.error(error.message);
                        res.status(500).send('Server error')
                    }

                }
            })
            //res.send('User registered')
        } catch (e) {
            console.error(e.message)
            res.status(500).send('Server error')
        }

    });

router.get('/', (req, res) => {
    db.all('SELECT * FROM Users', [], (err, results) => {
        if (err) {
            res.status(500)
        } else {
            res.status(200).send(results)
        }
    })
})


// @route   GET api/auth
// @desc    Log out user
// @access  Private
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

module.exports = router;