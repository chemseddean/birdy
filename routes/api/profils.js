const express = require('express');
const { restart } = require('nodemon');
const router = express.Router();
const auth = require('../../middleware/auth')
const Profile = require('../../models/Profile')
const User = require('../../models/User')

const {check, validationResult} = require('express-validator')

const request = require('request')
const config = require('config')

// create new profil
router.post('/', [auth, [
	check('status', 'Status is required').notEmpty(),
	check('intrests', 'Intrests are required').notEmpty()
]
], 
async (req, res) =>  {
	const errors = validationResult(req)
	if (!errors.isEmpty())
		return res.status(400).json({ errors: errors.array() })
	let newProfil = req.body
	newProfil.username = req.user.username;
	try {
		let profile = await Profile.findOne({ username: req.user.username })
		if(profile){
			//update
			profile = await Profile.findOneAndUpdate(
				{ username: req.user.username },
				{ $set: newProfil },
				{new : true}
				);
			return res.json(profile)
		}

		// Create profile
		profile = new Profile(newProfil)
		await profile.save()
		res.json(newProfil)
			
	} catch (e) {
		console.error(e.message)
		res.status(500).send('Server Error')
	}
})

// get my profil 
router.get('/me', auth, async (req, res) => {
	try {
		let profile = await Profile.findOne({ username: req.user.username })
		if (!profile) {
			return res.status(400).json({ msg: 'There is no profile for this user' })
		}
		profile = JSON.stringify(profile)
		res.json(profile)

	} catch (e) {
		console.error(e.message);
		res.status(500).send('Server Error')
	}
})


// get all profiles
router.get('/', auth, async (req, res) => {
	try {
		let profile = await Profile.find()
		if (!profile) {
			return res.status(400).json({ msg: 'There is no profiles ' })
		}
		profile = JSON.stringify(profile)
		res.json(profile)

	} catch (e) {
		console.error(e.message);
		res.status(500).send('Server Error')
	}
})


// @route   GET api/profils/user/:user_id
// @desc    Get profile by user ID
// @access  Public
router.get('/users/:user_id', async (req, res) =>{
	try {
		const user = await User.find({username: req.params.user_id})
		//console.log(user)
		
		const profile = await Profile.
		findOne({ user: user }).
		populate('User', ['username'])

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
		await Profile.findOneAndRemove({ user: req.userIDonMongo })
		// remove user
		await User.findOneAndRemove({ _id: req.userIDonMongo })

		res.json({msg: 'User deleted'})
	} catch (error) {
		console.error(error.message)
		res.status(500).send('Server Error')
		}

	
})

module.exports = router;