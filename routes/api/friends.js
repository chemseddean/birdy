const express = require('express');
const router = express.Router();
const db = require('../../config/usersDB')
const jwt = require('jsonwebtoken')
const auth = require('../../middleware/auth')
const User = require('../../models/User')


router.post('/add_friend',
auth,
async (req,res) => {
    var friend = 'INSERT INTO friends (username1, username2) VALUES (?,?)'
    try {
        const username_current = (await User.find({_id: req.user.id}))[0].username
        //console.log(username_current)
        var params = [username_current, req.body.username]
        db.run(
                    friend, 
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
        console.error(error.message)
    }
})

module.exports = router