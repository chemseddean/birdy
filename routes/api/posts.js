const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator')
const Post = require('../../models/Post')
const User = require('../../models/User')
const auth = require('../../middleware/auth')


// @route   POST api/posts
// @desc    Create post
// @access  Private 
router.post('/', [auth, [
    check('text', 'Text is required').notEmpty(), 
]],
async (req, res) => {
    // return console.log(req);
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({erros: errors.array()})
    }

    try {
    const newPost = new Post({
        text: req.body.text,
        name: req.user.username,
        avatar: req.user.avatar,
        user: req.userIDonMongo
    })
    const post = await newPost.save()
    res.json(post)

    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }
})

// @route   GET api/posts
// @desc    Get all posts
// @access  Private 
router.get('/', auth, async (req, res) => {
    try {
        const posts = await Post.find()
        res.json(posts)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }
})

// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Private 
router.get('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
       
        if (!post){
            return res.status(404).json({msg: "Post not found"})
        }
       
        res.json(post)
    } catch (error) {
        console.error(error.message)
        //if invalid post id
         
        if (error.kind === 'ObjectId'){
            return res.status(404).json({msg: "Post not found"})
        }
        res.status(500).send('Server Error')
    }
})

// @route   DELETE api/posts/:id
// @desc    delete post by id
// @access  Private 
router.delete('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
       
        //Check if user owns the post
        if(post.user.toString() !== req.userIDonMongo){
            return res.status(401).json({msg: "User not authorized"})
        }

        await post.remove(post)
       
        res.json("Post removed")
    } catch (error) {
        console.error(error.message)
        if (error.kind === 'ObjectId'){
            return res.status(404).json({msg: "Post not found"})
        }
        res.status(500).send('Server Error')
    }
})

// @route   PUT api/posts/like/:id
// @desc    Like post by id
// @access  Private 
router.put('/like/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)

        //Check if the post has already been liked by user
        if(post.likes.filter(like => like.user.toString() === req.userIDonMongo).length > 0){
            return res.status(400).json({msg : "Post already liked"})

        }

        post.likes.unshift({user: req.userIDonMongo})

        await post.save()
        res.json(post.likes)


    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }
})


// @route   PUT api/posts/unlike/:id
// @desc    unlike post by id
// @access  Private 
router.put('/unlike/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)

        //Check if the post has already been liked by user
        if(post.likes.filter(like => like.user.toString() === req.userIDonMongo).length === 0){
            return res.status(400).json({msg : "Post has not yet been liked"})

        }

        // Get remove index
        const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.userIDonMongo)

        post.likes.splice(removeIndex, 1)
        await post.save()
        res.json(post.likes)


    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }
})

// @route   POST api/posts/comment/id
// @desc    Comment a post
// @access  Private 
router.post('/comment/:id', [auth, [
    check('text', 'Text is required').notEmpty(), 
]],
async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({erros: errors.array()})
    }

    try {
        const user = req.user //await User.findById(req.userIDonMongo).select('-password')
        const post = await Post.findById(req.params.id)
    
        const newComment = {
        text: req.body.text,
        name: user.username,
        avatar: user.avatar, 
        user: req.userIDonMongo
    }

    post.comments.unshift(newComment)
    await post.save()

    res.json(post.comments)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }
})

// @route   DELETE api/posts/comment/id/comment_id
// @desc    delete a comment on post
// @access  Private 
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        //Get comment from post
        const comment= post.comments.find(comment => comment.id === req.params.comment_id)

        //Make sur comment exists
        if(!comment){
            return res.status(404).json({msg : "Comment does not exist"})
        }

        //Make sur user is the owner of the comment
        if(comment.user.toString() !== req.userIDonMongo){
            return res.status(401).json({msg : "User is not authorized"})
        }

        // Get remove index
        const removeIndex = post.comments.map(comment => comment.user.toString()).indexOf(req.userIDonMongo)

        post.comments.splice(removeIndex, 1)
        await post.save()
        res.json(post.comments)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
        
    }
})
module.exports = router;