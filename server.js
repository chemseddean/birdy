const express = require('express'); 
const ejs = require('ejs')
const app = express();
const ses = require('./middleware/session')
require('dotenv').config()

app.set('view engine', 'ejs');

// some const greped from the process environment
// or take those default values


// all environments
app.use(express.json())
app.set('view engine', 'ejs');

// WELCOME PAGE
app.get('/', (req, res) => {
    return res.render('welcome');
})

// DASHBOARD
app.get('/dashboard', ses.ifOfflineRedirectWelcome, (req, res) => {
    return res.render('dash');
})


// routes
app.use('/api/users', require('./routes/api/users.js'))
app.use('/api/posts', require('./routes/api/posts.js'))

PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


// connect to database 
// db_connect()
// .then(() => {
//     const PORT = process.env.PORT || 5000;
//     app.listen(PORT, (error) => {
//         if (!!error) {
//             console.log('Something went wrong ...');
//         } else {
//             console.log(`Server started on port ${PORT}, and DataBase connected`)
//         }
//     })
// })
// .catch((err) => console.log(err))

// version try catch await
// try {
//     await db_connect()
// } catch (error) {
//     console.log(err)
// }

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, (error) => {
//     if (!!error) {
//         console.log('Something went wrong ...');
//     } else {
//         console.log(`Server started on port ${PORT}, and DataBase connected`)
//     }
// })

/*
to run server write in terminal :
"npm run startDev" (witch is costomised in package.json)
or simply write manually "nodemon server.js"
*/