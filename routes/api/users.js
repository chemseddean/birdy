const express = require('express');
const bcrypt = require('bcrypt')
const Joi = require('joi')
const User = require('../../models/User')
const router = express.Router();
const create_db = require('../../config/usersDB')

const joiUserSchema = Joi.object({
    id: Joi.number().required(),
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
    const result = await joiUserSchema.validateAsync(req.body)
    if (result.error) {
        res.status(400).send(result.error.details[0].message)
        return
    }
    var content = req.body
    const hashedpassword = await bcrypt.hash(req.body.password, 10)
    content.password = hashedpassword
    const newUser = new User(content)
    try {
        
        create_db()
        
        try {
            await db.run(`INSERT INTO users VALUES(?,?,?,?,?)`, 
                [content.id, content.firstName, content.lastName, content.email, content.password], 
                function(err) {
                    if (err) {
                      return console.log(err.message);
                    }
                    // get the last insert id
                    console.log(`A row has been inserted with rowid ${this.lastID}`);
                  });
        } catch (error) {
            console.error(error.message)
        }
        await newUser.save()
        res.status(201)

    } catch (error) {
        console.log('Server error', error)
    }
    ////// add user to data base
    //res.status(201).send(newUser)
});


// @route GET /api/users/:user_id
// @route GET user by id
// @route Public
router.get('/:user_id', (req, res) => {
    res.send('okay ca marche')
})
module.exports = router;