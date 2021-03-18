const express = require('express');
const { restart } = require('nodemon');
const router = express.Router();
const auth = require('../../middleware/auth')
const Profile = require('../../models/Profile')
const User = require('../../models/User')

const {check, validationResult} = require('express-validator')

const request = require('request')
const config = require('config')

// @route   POST api/profils
// @desc    Create/Update user profile
// @access  Private 
router.post('/', [auth, [
    check('status', 'Status is required').notEmpty(),
    check('intrests', 'Intrests are required').notEmpty()
]
], 

async (req, res) =>  {
const errors = validationResult(req)
if (!errors.isEmpty()){
    return res.status(400).
            json({ errors: errors.array() })
}

    const{  
        location, 
        bio,
        status, 
        githubusername,
        intrests, 
    } = req.body

    // Build profile object
    const profileFields = {}

    profileFields.user = req.user.id; 
    //console.log(req.user)
    
    if (location) profileFields.location = location
    if (bio) profileFields.bio = bio
    if (status) profileFields.status = status
    if (githubusername) profileFields.githubusername = githubusername
    if (intrests) {
        profileFields.intrests = intrests.
        split(',').
        map(intrest => intrest.trim())

    }
 
    try {
        let profile = await Profile.findOne({ user: req.user.id })
        
        if(profile){
            //update
            profile = await Profile.findOneAndUpdate(
                {user: req.user.id}, 
                {$set: profileFields}, 
                {new : true}
                );

            return res.json(profile)
        }

        // Create profile
        profile = new Profile(profileFields)
        await profile.save()
        res.json(profile)
            
    } catch (e) {
        console.error(e.message)
        res.status(500).send('Server Error')
    }

})

// // @route   GET api/profils
// // @desc    Get all profiles
// // @access  Public
// router.get('/', async (req, res) =>{
//     try {
//         const profiles = await Profile.find().populate('user', ['name', 'avatar'])
//         res.json(profiles)
//     } catch (error) {
//         console.error(error.message)
//         res.status(500).send('Server Error')
//     }
// })

// @route   GET api/profils/user/:user_id
// @desc    Get profile by user ID
// @access  Public
router.get('/users/:user_id', async (req, res) =>{
    try {
        const user = await User.find({username: req.params.user_id})
        //console.log(user)
        
        const profile = await Profile.
        findOne({ user: user }).
        populate('User', ['username', 'avatar'])

        if (!profile) 
            return res.status(400).
                json({msg: '1 There is no profile for this user'})
        
        res.json(profile)
    } catch (error) {
        console.error(error.message)
        if(error.kind == 'ObjectId'){
            return res.status(400).
            json({msg: '2 There is no profile for this user'})
        }

        res.status(500).send('Server Error')
    }
})


// @route   DELETE api/profils
// @desc    Delete profile,user & post
// @access  Private
router.delete('/', auth, async (req, res) =>{
    try {
        // remove profile
        await Profile.findOneAndRemove({ user: req.user.id })
        // remove user
        await User.findOneAndRemove({ _id: req.user.id })

        res.json({msg: 'User deleted'})
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
        }

    
})

// @route   GET api/profils/github/username
// @desc    Get user repos from github
// @access  Public
router.get('/github/:username', (req, res) =>{
    try {
        const options = {
            uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get('githubClientID')}&client_secret=${config.get('githubSecret')}`, 
            method: 'GET', 
            headers: {'user-agent': 'node.js'}
        };
         
        request(options, (error, response, body) => {
            if(error) console.error(error)

            if(response.statusCode !== 200){
                return res.status(404).json({
                    msg: 'No Github profile found'
                });
            }
            res.json(JSON.parse(body))
            
        })
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }
})

module.exports = router;