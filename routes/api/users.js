const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator')
const User = require('../../models/User')
const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')
// const config = require('config')
const gravatar = require('gravatar');

// @route   POST api/users
// @desc    Register user
// @access  Public 
router.post(
    '/',
    [
    check('id', 'ID is required').notEmpty(),
    check('firstName', 'First name is required').notEmpty(),
    check('lastName', 'Last name is required').notEmpty(),
    check('email', 'Email is required').notEmpty(),
    check('password', 'Please enter a password with 6 or more characters').isLength({min: 6})
    ],

    async (req, res) => {
    const errors = validationResult(req) 
    
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array() })
    }
    
    const {id, firstName, lastName, email, password} = req.body

    try{
        console.log(id, firstName, lastName, email, password)
        // //Encrypt password
        // const salt = await bcrypt.genSalt(10)
        
        // default avatar for user
        const avatar = gravatar.url(email, {
            s: '200', //default size
            r: 'pg',  //rating 
            d: 'mm'   //default avatar
        })

        user = new User({
            id, 
            firstName,
            lastName,
            email,
            avatar, 
            password
        })

        await user.save()

        //hash the password
        user.password = await bcrypt.hash(password, 10)

        /* 
            Add user to database

        */

       return res.status(201).json(req.body)

    } catch (e){
        console.error(e.message)
        res.status(500).send('Server error')
    }

});

module.exports = router;