const express = require('express');
// creation d'une application (server) a l'aide de framework express
const app = express();

// connexion a la base de donnes mongodb
const connect_to_OnlineMongoDB = require('./config/mongoDB_manager')
connect_to_OnlineMongoDB()

// Middleware pour inclure le format json 
app.use(express.json({ extended: false }))

app.get('/', (req, res) => res.send('API running'));

// Define routes
app.use('/api/users', require('./routes/api/users.js'))
app.use('/api/posts', require('./routes/api/posts.js'))
app.use('/api/profils', require('./routes/api/profils'))
app.use('/api/friends', require('./routes/api/friends'))
// app.use('/api/search', require('./routes/api/search'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));