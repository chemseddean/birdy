const express = require('express'); 
const app = express();
<<<<<<< HEAD
const connect_db = require('./config/Mongodb')
=======
<<<<<<< HEAD
const connect_db = require('./config/Mongodb')
=======
const ses = require('./middleware/session')
require('dotenv').config()
>>>>>>> 181b5edf88eb91cb5d0a51fe4c4edc7e44a54f1a
>>>>>>> 2d3e291af1609c3a222e40fb7c0ec70cd020a24b

app.set('view engine', 'ejs');

connect_db()

//Init Middleware
app.use(express.json({extended: false}))

app.get('/', (req, res) => res.send('API running'));

<<<<<<< HEAD
// Define routes
=======
<<<<<<< HEAD
// Define routes
=======
// WELCOME PAGE
app.get('/', (req, res) => {
    return res.render('welcome');
})

// DASHBOARD
app.get('/dashboard', ses.ifOfflineRedirectWelcome, (req, res) => {
    return res.render('dash');
})


// routes
>>>>>>> 181b5edf88eb91cb5d0a51fe4c4edc7e44a54f1a
>>>>>>> 2d3e291af1609c3a222e40fb7c0ec70cd020a24b
app.use('/api/users', require('./routes/api/users.js'))
app.use('/api/posts', require('./routes/api/posts.js'))
app.use('/api/profils', require('./routes/api/profils'))
app.use('/api/friends', require('./routes/api/friends'))
app.use('/api/search', require('./routes/api/search'))
<<<<<<< HEAD

const PORT = process.env.PORT || 5000; 

=======

const PORT = process.env.PORT || 5000; 

>>>>>>> 2d3e291af1609c3a222e40fb7c0ec70cd020a24b
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));  