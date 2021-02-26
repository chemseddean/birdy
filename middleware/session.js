const HOME = '../../views/index'
const DASHBOARD = '../../views/dash' // ???

// if  NOT authentified redirect to Welcome page
const redirectWelcome = (req, res, next) => {
    if (!req.session.userId) {
        res.render(HOME)
    } else {
        next()
    }
}


// if  already authentified redirect to Dashboard
const redirectDashboard = (req, res, next) => {
    if (req.session.userId) {
        res.redirect(DASHBOARD)
    } else {
        next()
    }
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


module.exports = { 
    redirectWelcome,
    redirectDashboard,
    getUser
} 

