const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username : {
        type: String
    }
}, {timestamps: true})

module.exports = User = mongoose.model('User', userSchema)
