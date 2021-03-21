const express = require('express');
const router = express.Router();
const User = require('../../models/User')

// @route   GET api/search/users
// @desc    Search users
// @access  Public 
router.get('/users', async (req, res) => {
    const userPattern = RegExp("^"+req.body.username)
    try {
        const users = await User.find({username: userPattern})
    if (users){
        return res.status(200).json(users)
    }
    else{
        return res.
            status(400).
            json({
                 errors : [{ msg : 'User does not exist'}]
                });
    }
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }
})


module.exports = router