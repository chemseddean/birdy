const express = require('express');
const bcrypt = require('bcrypt')
const Joi = require('joi')
const User = require('../../models/User')
const router = express.Router();
const db = require('../../config/usersDB')


const joiUserSchema = Joi.object({
    username: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email(),
    password: Joi.string().min(8)
})

// @route POST /api/users
// @route Register user
// @route Public
router.post('/', async (req, res) => {
    // validation schema 
    try{
        const result = await joiUserSchema.validateAsync(req.body)
    if (result.error) {
        res.status(400).send(result.error.details[0].message)
        return
    }
    }catch(error){
        res.json({error: error.message})
    }

    const user = {
        username,
        firstName,
        lastName,
        email,
        password
    } = req.body

    // var errors = []
    // if (!user.username)
    //     errors.push("No username specified")
    // if (!user.firstName)
    //     errors.push("No first name specified")
    // if (!user.lastName)
    //     errors.push("No last name specified")
    // if (!user.email)
    //     errors.push("No email specified")
    // if (!user.password)
    //     errors.push("No password specified")

    const hashedpassword = await bcrypt.hash(req.body.password, 10)
    user.password = hashedpassword
    const newUser = new User(user)

    try {
    var insert = 'INSERT INTO user (username, firstName, lastName, email, password) VALUES (?,?,?,?,?)'
    var params = [user.username, user.firstName, user.lastName, user.email, user.password]
        db.run(insert, params, (error)=>{
            if(error){
                //res.status(400).json({"Error": error.message})
                console.error(error.message)
                return
            }
        })
        res.json({
            "message": "User created",
            "user": user,
            "user_id": this.lastID
        })
        newUser.save()
    } catch (error) {
        res.send("Server error")
    }  
});


// @route GET /api/users/:user_id
// @route GET user by id
// @route Public
router.get('/:user_id', (req, res) => {
    res.send('okay ca marche')
})
module.exports = router;