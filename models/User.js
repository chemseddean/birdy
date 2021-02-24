const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    id : {
        type: Number,
        required: true
    }, 
    firstName : {
        type: String,
        required: true
    }, 
    familyName : { 
        type: String,
        required: true
    }, 
    email: {
        type: String, 
        required: true, 
        unique: true
    },
    password: {
        type: String, 
        required: true
    }, 
}, {timestamps: true})

module.exports = User = mongoose.model('User', userSchema)
