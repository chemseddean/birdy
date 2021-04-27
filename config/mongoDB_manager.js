const mongoose = require('mongoose')
const config = require('config')
const mongoURI = config.get('mongoURI')
/*
config est un module/dossier locale qui contient un fichier default.json 
contenant des constantes. const config = require('config') 
config est alors le fichier default.json
const db = config.get('mongoURI') nous donne la valeur de mongoURI qui se trouve dans 
default.json
*/

/*
la base de donnees mongodb contient les posts et les commentaires
c est une base de donne NoSQL? on parle donc de collection 
*/

const connect_db = async () => {
    try {
        await mongoose.connect(mongoURI,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: false
            })
        console.log('Online MongoDB Connected')
    } catch (e) {
        console.error(e.message);
        process.exit(1);
    }
};

module.exports = connect_db;
