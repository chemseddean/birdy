const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
        user:{
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'users'
        }, 
        name: {
            type: String,
        },
        text: {
            type: String, 
            required: true,
        },  
        avatar:{
            type: String,
        }, 
        likes: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'users'
                },
            }
        ], 
        comments:[
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'users'
                }, 
                text: {
                    type: String, 
                    required: true
                },
                avatar:{
                    type: String,
                }, 
                name: {
                    type: String
                }, 
                date:{
                    type: Date, 
                    default: Date.now
                }
            }
        ],
    },{timestamps: true})

module.exports = Post = mongoose.model('Post', postSchema)
