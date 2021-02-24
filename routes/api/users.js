const express = require('express');
const bcrypt = require('bcrypt')
const Joi = require('Joi')
const User = require('../../models/User')
const router = express.Router();


const joiUserSchema = Joi.object({
    id: Joi.number().required(),
    firstName: Joi.string().required(),
    familyName: Joi.string().required(),
    email: Joi.string().email(),
    password: Joi.string().min(8),
})

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
        await newUser.save()
    } catch (error) {
        console.log('probleme au niveau de save', error)
    }
    ////// add user to data base
    res.status(201).send(newUser)
});


router.get('/', (req, res) => {
    res.send('okay ca marche')
})
module.exports = router;