const mongoose = require('mongoose')
// link models
// const User = require('./models/blog') // should be automatise after
// connect BD THEN server begin to listen 
const binome1 = {
    username: 'binome_anes',
    password: 'binome_anes'
}
const binome2 = {
    username: 'binome_chemsou',
    password: 'binome_chemsou'
}

const dbURI = 'mongodb+srv://' + binome1.username + ':' + binome1.password + '@cluster0.t6egf.mongodb.net/Birdy?retryWrites=true&w=majority'


const db_connect = ()=> {
    return mongoose.connect(dbURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
    })
}


module.exports = db_connect