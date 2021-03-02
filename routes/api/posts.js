const express = require('express');
const router = express.Router();
const Joi = require('joi')

const Post = require('../../models/Post')
const User = require('../../models/User')

const joiUserSchema = Joi.object({
    username: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email(),
    password: Joi.string().min(8)
})
// @route   POST api/posts
// @desc    Create a post
// @access  Private 
router.post('/', 
//auth,
async (req, res) => {
    try{
        const result = await joiUserSchema.validateAsync(req.body)
    if (result.error) {
        res.status(400).send(result.error.details[0].message)
        return
    }
    }catch(error){
        res.json({error: error.message})
    }

    try {
        const user = await User.findById(req.user.id).select('-password')
        const newPost = new Post({
        text: req.body.text,
        username: user.username,
        avatar: user.avatar, 
    })
    const post = await newPost.save()

    res.json(post)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }

    res.send({msg: "Post created"})
})

//@route GET api/posts/:username
//@route GET all user's posts
//@route Public
router.get('/:username', async (req, res) =>{
    console.log(`${req.params.username} posts`)
})

//@route GET api/posts/me
//@route GET current user posts
//@route Private
router.get('/me', 
//auth,
async (req, res) =>{
    console.log(`${req.params.username} posts`)
    // try {
    //     const post = await Post.findAll(
    //     { username: req.user.username}).
    //         populate(
    //             'user', 
    //             [
    //             'name', 
    //             'avatar'
    //             ]
    //             )
        
    //     if(!profile){
    //         return res.status(400).json({msg: 'There is no posts for this user'})
    //     }
    //     res.json(profile)
        
    // } catch (e) {
    //     consol.error(err.message); 
    //     res.status(500).send('Server Error')
    // }
})

//@route DELETE api/posts/post_:id
//@route DELETE post
//@route Private
router.delete('/:post_id', 
//auth,
async (req, res) =>{

//Check auth 

//Get post

//Check if post belongs to current user

//

    console.log(`${req.params.username} post deleted`)
})

//@route POST api/posts/post_id/comment
//@route Comment a post
//@route Private
router.post('/:post_id/comment',
//auth,
async (req, res) => {
//Check auth

//Get post

//Comment

res.status(201).json({message: "Comment posted"})
}
)

//@route DELETE api/posts/comment/comment_id
//@route delete a comment 
//@route Private
router.delete('/comment/:comment_id',
//auth,
async (req, res) => {
// Check auth 

// Get post

// Get comment

//Check if comment belongs to current user

//delete comment

res.status(204).json({message: "Post deleted"})
}
)

//@route PUT api/posts/likes/post_id
//@route like a post
//@route Private
router.put('/likes/:post_id',
//auth,
async (req, res) => {
//Check auth

//Get post

//Unlike

res.status(201).json({message: "Post liked"})
}
)

//@route PUT api/posts/unlikes/post_id
//@route Unlike post
//@route Private
router.delete('unlikes/:post_id', 
//auth,
async (req, res) =>{

//Check auth 

//Get post

//Check if post belongs to current user

//

console.log(`${req.params.username} post unliked`)
})
module.exports = router;
// // @route   GET api/posts
// // @desc    Get all posts
// // @access  Private 
// router.get('/', 
// //auth, 
// async (req, res) => {
//     // try {
//     //     const posts = await Post.find().sort({date: -1})
//     //     res.json(posts)
//     // } catch (error) {
//     //     console.error(error.message)
//     //     res.status(500).send('Server Error')
//     // }
//     res.send({msg: "Posts"})
// })