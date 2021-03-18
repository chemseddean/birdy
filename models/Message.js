const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
        sender:{
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'user'
        }, 
        receiver:{
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'user'
        },
        text: {
            type: String, 
            required: true,
        }, 
        avatar:{
            type: String,
        }, 
        date:{
            type: Date, 
            default: Date.now
        }
    })

module.exports = Message = mongoose.model('Message', messageSchema)
