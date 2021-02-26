const express = require('express');
const { restart } = require('nodemon');
const router = express.Router();
//const auth = require('../../middleware/auth')
const Profile = require('../../models/Profile')
const User = require('../../models/User')
const Joi = require('joi')

const joiUserSchema = Joi.object({
    status: Joi.string().required(),
    intrests: Joi.string().required(),
})

//@route GET api/profiles/me
//@route GET current user profile
//@route Private
router.get('/me', 
//auth,
(req, res) => {
    //Check auth

    //Get profile
})

//@route POST api/profiles/
//@route Create user profile
//@route Private
router.post('/', 
//auth,
(req, res) => {
    //Check auth
    //Create profile
})

//@route GET api/profiles/:username
//@route GET user profile
//@route Public 
router.get('/:username', 
(req, res) => {
    //Check if user exists

    //Get profile
})

//@route DELETE api/profiles/me
//@route DELETE current user profile
//@route Private




