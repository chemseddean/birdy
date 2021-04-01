const express = require('express'); 
const app = express();
const connect_db = require('./config/Mongodb')


// connect_db()

//Init Middleware
app.use(express.json({extended: false}))

app.get('/', (req, res) => res.send('API running'));

// Define routes
app.use('/api/users', require('./routes/api/users.js'))
app.use('/api/posts', require('./routes/api/posts.js'))
app.use('/api/profils', require('./routes/api/profils'))
app.use('/api/friends', require('./routes/api/friends'))
app.use('/api/search', require('./routes/api/search'))

const PORT = process.env.PORT || 5000; 

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));  
