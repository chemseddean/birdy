require('dotenv').config()
const jwt = require('jsonwebtoken')

// if  NOT authentified redirect to Welcome page
const ifOfflineRedirectWelcome = (req, res, next) => {
    // si y a pas de token 
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.redirect(process.env.WELCOME_PAGE)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.redirect(process.env.WELCOME_PAGE)
        req.user = user
        next()
    })
}

// if  already authentified redirect to Dashboard
const ifOnlineRedirectDashboard = (req, res, next) => {
    // console.log('dakhel');
    // si y a pas de token 
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return next()

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return next()
        
        // req.user = user
        res.redirect(process.env.DASHBOARD)
        // res.status(401)
    })
}

const getUser  = (req, res, next) => {
    if (!req.session) {
        next()
        return
    }
    const { userId } = req.session
    if (userId) {
        // gimme the user 
        var selectUser = `SELECT * FROM Users u WHERE  u.username = '${userId}'`
        db.get(selectUser, [], async (error, candidate) => {
            if (error) {
                console.log('PROBLEME SQL login', error.message)
                return
            } else {
                if (candidate) {
                    res.locals.user = candidate
                }
            }
        })
    }
    next()
}

// middleware qui ajoute l'objet user dans le corps de la
// requete s'il est bien authentifie
function authenticateToken(req, res, next) {
    // si y a pas de token 
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        console.log(err)
        if (err) return res.sendStatus(403) // mauvais token
        req.user = user
        next()
    })
}

function generateAccessToken(user) {
    // return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' })
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
}

module.exports = { 
    ifOfflineRedirectWelcome,
    ifOnlineRedirectDashboard,
    getUser,
    authenticateToken,
    generateAccessToken
} 

