const mongoose = require('mongoose');
const config = require('config')
const db = config.get('mongoURI'); 

const connect_db = async () => {
    try{
        await mongoose.connect(db, 
            { 
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            useCreateIndex: true,
            useFindAndModify: false
        }); 

        console.log('MongoDB Connected')
    } catch (e){
        
        console.error(e.message); 
        // exit process with failure
        process.exit(1);


    }
};

module.exports = connect_db; 